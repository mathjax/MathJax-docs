.. _web-typeset:

#######################
Typesetting Mathematics
#######################

There are two main uses for MathJax:

* Typesetting all the mathematics within a web page, and
* Converting a string containing mathematics into another form.

In version 2, MathJax could perform the first function very well, but
it was much harder to do the second.  The current version of MathJax
makes both easy to do.  Typesetting math is described below,
while converting math is described in the :ref:`next section
<convert-math>`.


.. _typeset-page:

Typesetting Math in a Web Page
==============================

MathJax makes it easy to typeset all the math in a web page, and in
fact it will do this automatically when it is first loaded unless you
configure it not to.  So this is one of the easiest actions to perform
in MathJax; if your page is static, there is nothing to do but load
MathJax.

If your page is dynamic, and you may be adding math after the page is
loaded, then you will need to tell MathJax to typeset the mathematics
once it has been inserted into the page.  There are two methods for
doing that: :js:meth:`MathJax.typeset()` and
:js:meth:`MathJax.typesetPromise()`.

The first of these, :js:meth:`MathJax.typeset()`, typesets the page,
and does so immediately and synchronously, so when the call finishes,
the page will have been typeset.  Note, however, that if the math
includes actions that require additional files to be loaded (e.g., TeX
input that uses ``\require``, or that includes autoloaded extensions),
then a ``retry`` error will be thrown.  In that case, you should use
the :js:meth:`MathJax.typesetPromise()` instead, as described below;
but note that this will make your typesetting asynchronous, and you
may need to take that into account in the rest of your code.  See also
:ref:`retry-error` section for more details.

.. warning::

   In MathJax v4, with the introduction of new fonts that include many
   more characters than the original MathJax TeX fonts did, the fonts
   have been broken into smaller pieces so that your readers don't
   have to download the entire font and its data for characters that
   may never be used.  That means that typesetting mathematics may
   need to operate asynchronously even if the TeX *doesn't* include
   ``\require`` or any auto-loaded extensions, as the output itself
   could need extra font data files to be loaded.  Thus in version 4,
   it is always best to use the promise-based command, described
   below.

The second method, :js:meth:`MathJax.typesetPromise()`, performs the
typesetting asynchronously, and returns a promise that is resolved
when the typesetting is complete.  This properly handles loading of
external files, so if you are expecting to process TeX input that can
include ``\require`` or autoloaded extensions, you should use this form
of typesetting.  Note that it can be used with ``await`` as part of a
larger ``async`` function.  If you are getting a ``retry`` error while
calling :js:meth:`MathJax.typeset()`, you should switch to using
:js:meth:`MathJax.typesetPromise()` instead.

Each of these functions take an optional argument, which is an array of
elements whose content should be processed.  An element can be either
an actual DOM element, or a CSS selector string for one or more DOM
elements.  Supplying an array of elements will restrict the
typesetting to the contents of those elements only.

.. js:function:: MathJax.typeset([elements])

   :param (string|HTMLElement)[] elements: An optional array of DOM
                                           elements or CSS selector
                                           strings that restricts
                                           the typesetting to the
                                           contents of the specified
                                           container elements.

.. js:function:: MathJax.typesetPromise([elements])

   :param (string|HTMLElement)[] elements: An optional array of DOM
                                           elements or CSS selector
                                           strings that restricts
                                           the typesetting to the
                                           contents of the specified
                                           container elements.
   :returns Promise: A promise that resolves when the typesetting is complete.

-----

.. _typeset-async:

Handling Asynchronous Typesetting
=================================

It is not recommended to perform multiple asynchronous typesetting
calls simultaneously, as these can interfere with one another while
they are waiting for files to load.  For this reason, MathJax uses the
:js:data:`MathJax.startup.promise` within the
:js:meth:`MathJax.typesetPromise()` function to make sure any previous
typeset calls are complete before starting the new one.  So if you do

.. code-block:: javascript

   MathJax.typesetPromise(["#container1"]);
   MathJax.typesetPromise(["#container2"]);

the second typeset operation will wait for the first one to complete
before it starts.  (This also applies to the promise-based conversion
functions described in the :ref:`next section <convert-math>`, which
also use the :js:data:`MathJax.startup.promise` to coordinate with
other typesetting and conversion operations.)

The value of :js:data:`MathJax.startup.promise` is updated by each
:js:meth:`MathJax.typesetPromise()` call (and by the promise-based
conversion calls), so you can always use
:js:data:`MathJax.startup.promise` as a means of waiting for all the
currently pending typesetting operations to complete.

.. warning::

   The inclusion of the :js:data:`MathJax.startup.promise` within
   :js:meth:`MathJax.typesetPromise()` and the promise-based
   conversion functions is new in version 4.  In version 3, you were
   expected to handle chaining of the typeset calls yourself, but most
   coders failed to do this, so MathJax v4 now handles that for you.

   The version 3 documentation recommended using and setting
   :js:data:`MathJax.startup.promise` yourself to make sure typeset
   calls were serialized; if you included that code pattern in your v3
   work-flow, you should remove it, otherwise you will likely cause a
   circular dependency where the typesetting will wait for the promise
   to be resolved, but it can't resolve until the typesetting
   completes.

Because :js:meth:`MathJax.typesetPromise()` returns a promise, you can
use that promise to synchronize the rest of your code with the actions
of MathJax.  For example,

.. code-block:: javascript

   MathJax.typesetPromise().then(() => {
     for (const eqn of MathJax.startup.document.math) {
       console.log(eqn.math);
     }
   });

would typeset the math on the page and then print the original TeX
code to the console for each of the expressions on the page.

It is also possible to use the ``await`` command to wait for the
promise to be resolved.  For example

.. code-block:: javascript

   async function reportMath() {
     await MathJax.typesetPromise();
     for (const eqn of MathJax.startup.document.math) {
       console.log(eqn.math);
     }
   }

would define an asynchronous function ``reportMath()`` that typesets
the page and then reports the original TeX for each expression,
similarly to the previous code example.

-----

.. _tex-reset:

Resetting Automatic Equation Numbering
======================================

The TeX input jax allows you to automatically number equations. When
modifying a page, this can lead to problems as numbered equations may
be removed and added; most commonly, duplicate labels lead to issues.

You can reset equation numbering using the command

.. js:function:: MathJax.texReset([start])

   :param number start: An optional number at which to start the
                         equation numbering.  The default is 1.

This can be used to start the equation numbering at a particular
number, or reset it to the default starting number of 1.

-----

.. _typeset-clear:

Updating Previously Typeset Content
===================================

MathJax keeps track of all the math that it has typeset within your
page.  This is so that if you change the output renderer (using the
MathJax contextual menu), it can be changed to use the new format, for
example; or if you change the accessibility settings, say to enable
the expression explorer, all the math can be updated to include the
speech strings that it uses.  If you modify the page to include new
mathematics and call :js:meth:`MathJax.typeset()` or
:js:meth:`MathJax.typesetPromise()`, the newly typeset mathematics will be
added to the list of already typeset mathematics, as you would expect.

If you modify the page to remove content that contains typeset
mathematics, you will need to tell MathJax about that so that it knows
the typeset math that you are removing is no longer on the page.  You
do this by using the following command:

.. js:function:: MathJax.typesetClear([elements])

   :param (string|HTMLElement)[] elements: An optional array of DOM
                                           elements or CSS selector
                                           strings that restricts
                                           the typesetting to the
                                           contents of the specified
                                           container elements.

When called with no arguments, :meth:`MathJax.typesetClear()` tells
MathJax to forget about all the math that has been typeset so far.
Note that the math will remain in the page as typeset math, but
MathJax will no longer know anything about it.  For example, that
means that changes to the output renderer or accessibility settings
will not affect any of the math that was typeset previously.

If you remove math from only a portion of the page, you can call
:meth:`MathJax.typesetClear()` passing it an array of container
elements that will be removed, or CSS selector strings for them, and
MathJax will forget about the math that is within those containers,
while remembering the rest of the math on the page.  Note that you
should call this function **before** you change the contents of the
containers.

For example, if you have an element with ``id="has-math"`` that you
have previously typeset, and you are planning to replace the contents
of this element with new content (stored in a variable ``new_html``)
that needs to be typeset, you might use something like:

.. code-block:: javascript

   MathJax.typesetClear([node]);
   node.innerHTML = new_html;
   MathJax.typesetPromise([node]).then(() => {
     // the new content has been typeset
   });

The argument passed to :js:meth:`MathJax.typesetClear()` can be an actual
DOM element, as in the example above, or a CSS selector string (e.g.,
``'#has-math'``), or an array of these.  The selector can specify more
than one container element (e.g., via a class selector).

If you are using automatic equation numbers and insert new content in
the middle of the page, that may require the equation numbers to be
adjusted throughout the page.  In that case, you can do

.. code-block:: javascript

   MathJax.startup.document.state(0);
   MathJax.texReset();
   MathJax.typesetPromise();

to force MathJax to reset the page to the state it was before MathJax
processed it (i.e., remove its typeset math), reset the TeX automatic
line numbering and labels, and then re-typeset the contents of the
page from scratch.

-----

.. _get-math-items:

Looking up the Math on the Page
===============================

MathJax saves its information about a particular expression that it
has typeset in an object called a ``MathItem``; each typeset
expression has an associated MathItem.  You can look up the MathItems
using the following command:

.. js:function:: MathJax.startup.document.getMathItemsWithin(elements)

   :param (string|HTMLElement)[] elements: An array of DOM elements or
                                           CSS selector strings that
                                           restricts the typesetting
                                           to the contents of the
                                           specified container
                                           elements.
   :return MathItem[]: The list of ``MathItem`` objects for the
                       expressions within the specified containers.
   
You pass this a container element (or a CSS selector for an
element or collection of elements, or an array of containers or
selectors) and it will return an array of the MathItems that are
within those containers.  E.g.,

.. code-block:: javascript

   MathJax.startup.document.getMathItemsWithin(document.body);

will return an array of all the MathItems for the typeset math on the
page.  See the `MathItem definition
<https://github.com/mathjax/MathJax-src/blob/master/ts/core/MathItem.ts>`__
for details on the contents of the MathItem structure.  The ``MathItem``
is the replacement for the v2 ``ElementJax`` object, and
:js:meth:`MathJax.startup.document.getMathItemsWithin()` performs a
similar function to the v2 function :js:meth:`MathJax.Hub.getAllJax()`.

-----

.. _safe-typesetting:

Typesetting User-Supplied Content
=================================

Mathematics formats like LaTeX and MathML allow a powerful range of
layout options, including access to hyperlinks, CSS styles, font
selection and sizing, spacing, and so on.  Such features give you a
great deal of flexibility in producing the mathematics for your pages;
but if your readers are allowed to enter mathematics into your pages
(e.g., for a question-and-answer site, or in comments on a blog),
these features can be abused to cause problems for other readers and
pose a potential security risk to them.  For example, the TeX
``\href`` command can be used to insert ``javascript:`` links into the
page, while the ``\style`` macro could be used to disrupt the user
interface or layout of your pages.

In order to limit the potential interference that could be caused by
the mathematics entered by your readers, MathJax provides the
`ui/safe` extension.  This extension filters the mathematics on the
page in order to try to remove problematic attributes, like javascript
links, or font sizes that are too large or too small, or style
settings that would be disruptive to the page layout.  If your page
allows your readers to post content that includes mathematics
processed by MathJax, you should strongly consider using the
`ui/safe` extension.

See the :ref:`safe-options` section for details of how to load and
configure the `ui/safe` extension.

-----

.. _retry-error:

The "Retry" Error
=================

MathJax has a large number of optional features, and not all of them
are included when you load MathJax into a web page.  If one of those
features is needed by your code, MathJax will suspend its operations
and attempt to load the needed extension for that feature.  Because
this process is asynchronous, MathJax must give up the CPU, wait for
the needed file to load, and restart the typesetting after it has
arrived.

This process is managed internally by MathJax setting up a promise for
when the file is loaded, and throwing an error so that code higher up
in the typesetting process can catch that error and know that it must
wait for the promise to resolve before retrying the typesetting that
was being performed.  This is an error with the message ``retry``.

The promise-based typesetting and conversion functions handle this
retry error automatically, and incorporate waiting for the
asynchronous file loading to complete into their own promises.  The
synchronous functions, however, can't do that, since the retry promise
would make them asynchronous.  If a retry is request during the
running of one of the synchronous functions, the retry error will not
be caught, and you will likely get an error report in the browser
console indicating an uncaught ``retry`` error.  That indicates that
you may need to rewrite your code to use the promise-based functions,
instead, which means your code will have to handle asynchronous
typesetting, and can't work synchronously as it stands.

If there is no promise-based version of the code you are running
(e.g., you are using :js:meth:`MathJax.startup.document.convert()`
directly), then you may be able to use the following function to
process the retry errors for you.

.. js:function:: mathjax.handleRetriesFor(function)

   :param ()=>any function: A function to run with retry errors being
                             trapped.  If one occurs, the function
                             will be called again after the promise
                             associated with the retry error's file
                             loading has been resolved.

   :return Promise: A promise that is resolved when the function
                     argument completes without a retry.
                     
From within a web page, you can obtain the ``mathjax`` variable via

.. code-block:: javascript

   const {mathjax} = MathJax._.mathjax;

For example, you might need to do something like the following:

.. code-block:: javascript

   const {mathjax} = MathJax._.mathjax;
   mathjax.handleRetriesFor(() => {
     return MathJax.startup.document.convert('\\color{red}{x+y}');
   }).then((node) => {
     document.body.append(node);
     MathJax.startup.document.reset();
     MathJax.startup.document.updateDocument();
   });

The ``convert()`` call would normally throw a ``retry`` error when
loading the `color` extension the first time it is used, but the
``handleRetriesFor()`` call traps that and handles it, eventually
typesetting the expression once the `color` extension has been loaded.
Then the result is appended to the document, and the document CSS is
updated to include any new CSS needed for the output.

Of course, it is better to insert the TeX code into the page and call
:js:meth:`MathJax.typesetPromise()` instead, but this is only meant as
an example of how ``mathjax.handleRetriesFor()`` works.

Some things that may initiate a ``retry`` error include:

* Using the ``\require`` macro in TeX code
* Using a macro that autoloads its definition (like ``\color`` or ``\bbox``)
* Using some named entities in MathML code in the conversion functions
* Generating output for characters whose data must be loaded dynamically.
* Loading of localization files for speech generation.

If you are trying to use synchronous calls, any of these situations
may lead to the ``retry`` error.  If you are unable to move to the
promise-based calls for some reason, then your only recourse is to
load any of the needed extensions before typesetting or converting the
math.

To do this, be sure to include any needed TeX extensions in the
``load`` array of the ``loader`` section of your MathJax
configuration.  To handle the entities in MathML, add the
``[mml]/entities`` extension to the ``load`` array.

You can load all the font data up front by setting the
``loadAlFontFiles`` option to ``true`` in the ``startup`` section of
your MathJax configuration.  This can cause *many* files to be loaded,
however, so should be avoided if at all possible.  It is much better
to move to the promise-based calls to handle this situation.  If you
must use ``loadAllFontFiles``, then you may want to pick a font with
less character coverage, such as ``mathjax-tex``, the original MathJax
TeX fonts that doesn't have any dynamically loaded data, rather than
the newer fonts for version 4, which have much higher coverage, and so
would involve loading more files.

|-----|
