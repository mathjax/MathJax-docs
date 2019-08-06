.. _web-typeset:

######################################
Typesetting and Converting Mathematics
######################################

There are two main uses for MathJax:

* Typesetting all the mathematics within a web page, and
* Converting a string containing mathematics into another form.

In version 2, MathJax could perform the first function very well, but
it was much harder to do the second.  MathJax version 3 makes both
easy to do.  Both these tasks are described below.


.. _typeset-page:

Typesetting Math in a Web Page
==============================

MathJax makes it easy to typeset all the math in a web page, and in
fact it will dothis automatically when it is first loaded unless you
configure it not to.  So this is one of the easiest actions to perform
in MathJax; if your page is static, there is nothing to do but load
MathJax.

If your page is dynamic, and you may be adding math after the page is
loaded, then you will need to tell MathJax to typeset the mathematics
once it has been inserted into the page.  There are two methods for
doing that: :meth:`MathJax.typeset()` and
:meth:`MathJax.typesetPromise()`.

The first of these, :meth:`MathJax.typeset()`, typesets the page, and
does so immediately and synchronously, so when the call finishes, the
page will have been typeset.  Note, however, that if the math includes
actions that require additional files to be loaded (e.g., TeX input
that uses `\require`, or that includes autoloaded extensinos), then
an error will be thrown.  You can use the ``try/catch`` command to
trap this condition.

The second, :meth:`Mathjax.typesetPromise()`, performs the typesetting
asynchronously, and returns a promise that is resolved when the
typesetting is complete.  This properly handles loading of external
files, so if you are expecting to process TeX input that can include
`\require` or autoloaded extensions, you should use this form of
typesetting.  It can be used with ``await`` as part of a larger
``async`` function.

Both functions take an optional argument, which is an array of elements
whose content should be processed.  An element can be either an actual
DOM element, or a CSS selector string for an element or collection of
elements.  Supplying an array of elements will restrict the
typesetting to the contents of those elements only.

.. _typeset-async:

Handling Asynchronous Typesetting
---------------------------------

It is generally a bad idea to try to perform multiple asynchronous
typesetting calls simultaneously, so if you are using
:meth:`MathJax.typesetPromise()` to make several typeset calls, you
should chain them using the promises they return.  For example:

.. code-block:: javascript

   MathJax.typesetPromise().then(() => {
     // modify the DOM here
     MathJax.typesetPromise();
   }).catch((err) => console.log(err.message));

This approach can get complicated fast, however, so you may want to
maintian a promise that can be used to chain the later typesetting
calls.  For example,

.. code-block:: javascript

   let promise = Promise.resolve();  // Used to hold chain of typesetting calls

   function typeset(code) {
     promise = promise.then(() => MathJax.typesetPromise(code()))
                      .catch((err) => console.log('Typeset failed: ' + err.message));
     return promise;
   }

Then you can use :meth:`typeset()` to run code that changes the DOM
and typesets the result.  The :meth:`code` that you pass it does the
DOM modifications and returns the array of elements to typeset, or
:data:`null` to typeset the whole page.  E.g.,

.. code-block:: javascript

   typeset(() => {
     const math = document.querySelector('#math');
     math.innerHTML = '$$\\frac{a}{1-a^2}$$';
     return math;
   });

would replace the contents of the element with ``id="math"`` with the
specified fraction and have MathJax typeset it (asynmchronously).
Because the :meth:`then()` call returns the result of
:meth:`MathJax.typesetPromise()`, which is itself a promise, the
:meth:`then()` will not resolve until that promise is resolved; i.e.,
not until the typesetting is complete.  Finally, since the
:meth:`typeset()` function returns the :data:`promise`, you can use
``await`` in an ``async`` function to wait for the typesetting to
complete:

.. code-block:: javascript

   await typeset(...);

Note that this doesn't take the initial typesetting that MathJax
performs into account, so you might want to use
:attr:`MathJax.startup.promise` in place of :data:`promise` above.
I.e., simply use

.. code-block:: javascript

   function typeset(code) {
     MathJax.startup.promise = MathJax.startup.promise
       .then(() => MathJax.typesetPromise(code()))
       .catch((err) => console.log('Typeset failed: ' + err.message));
     return MathJax.startup.promise;
   }

This avoids the need for the global :data:`promise` variable, and
makes sure that your typesetting doesn't occur until the initial
typesetting is complete.

.. _tex-reset:

Resetting Automatic Equation Numbering
--------------------------------------

The TeX input jax allows you to automatically number equations. When
modifying a page, this can lead to problems as numbered equations may
be removed and added; most commonly, duplicate labels lead to issues.

You can reset equation numbering using the command

   .. describe:: MathJax.texReset([start])

where ``start`` is the number at which to start equation numbering.

If you have inserted new content, that may require the entire page to
be reprocessed in order to get the automatic numbering, labels, and
references to be correct.  In that case, you can do

.. code-block:: javascript

   MathJax.startup.document.state(0);
   MathJax.texReset();
   MathJax.typeset();

to force MathJax to reset the page to the state it was before MathJax
processed it, reset the TeX automatic line numbering and labels, and
then retypeset the contents of the page from scratch.


-----

.. _convert-math:

Converting a Math String to Other Formats
=========================================

An important use case for MathJax is to convert a string containing
mathematics (in one of the three forms that MathJax understands) and
convert it into another form (either MathML, or one of the output
formats that MathJax supports).  This was difficult to do in MathJax
version 2, but easy to do in version 3.

When MathJax startup up, it creates methods for converting from the
input format(s) to the output format(s) that you have loaded, and to
MathML format.  For example, if you have loaded the MathML input jax
and the SVG output jax (say by using the ``mml-svg`` component), then
MathJax will create the following conversion methods for you:

   .. describe:: MathJax.mathml2svg(math[,options])
                 MathJax.mathml2svgPromise(math[,options])
                 MathJax.mathml2mml(math[,options])
                 MathJax.mathml2mmlPromise(math[,options])

If you had loaded the TeX input jax as well, you would also get four
more methods, with ``tex`` in place of ``mathml``.

As the names imply, the ``Promise`` functions perform the conversion
asynchronously, and return promises, while the others opperate
synchronously and return the converted form immediately.  The first
two functions (and any others like them) produce DOM elements as the
results of the conversion, with the promise versions passing that to
their :meth:`then()` functions as their argumnent (see the section on
:ref:`convert-async` below), and the non-promise verions returning
them directly.  You can insert these DOM elements into the document
directly, or you can use their :attr:`outerHTML` property to obtain
their serialized string form.

The functions that convert to MathML produce serialized MathML strings
automatically, rather than DOM elements.  (You can use the browser's
:attr:`DOMParser` object to convert the string into a MathML DOM tree
if you need one.)


.. _conversion-options:

Conversion Options
------------------

All four of these functions require an argument that is the math
string to be converted (e.g., the serialzied MathML string, or in the
case of :meth:`tex2chtml()`, the TeX or LaTeX string).  You can also
pass a second argument that is an object containing options that
control the conversion process.  The options that can be included are:

* :attr:`display`, a boolean specifying whether the math is in
  display-mode or not (for TeX input).  Default is ``true``.
* :attr:`em`, a number giving the number of pixels in an ``em`` for
  the surrounding font.  Default is ``16``.
* :attr:`ex`, a number giving the number of pixels in an ``ex`` for
  the surrounding font.  Default is ``8``.
* :attr:`containerWidth`, a number giving the width of the container,
  in pixels.  Default is 80 times the :attr:`ex` value.
* :attr:`lineWidth'`, a number giving the line-breaking width in
  ``em`` units.  Default is a very large number (100000), so
  effectively no line breaking.
* :attr:`scale`, a number giving a scaling factor to apply to the
  resulting conversion.  Default is 1.

For example,

.. code-block:: javascript

   let html = MathJax.tex2chtml('\\sqrt{x^2+1}', {em: 12, ex: 6, display: false});

would convert the TeX expression ``\sqrt{x^2+1}`` to HTML as an
in0line expression, with ``em`` size being 12 pixels and ``ex`` size
being 6 pixels.  The result will be a DOM element containing the HTML
for the expression.  Similarly,

.. code-block:: javascript
   
   let html = MathJax.tex2chtml('\\sqrt{x^2+1}', {em: 12, ex: 6, display: false});
   let text = html.outerHTML;

sets :data:`text` to be the serialized HTML string for the expression.


.. _get-metrics:

Obtaining the Output Metrics
----------------------------

Since the :attr:`em`, :attr:`ex`, and :attr:`containerWidth` all
depend on the location where the math will be placed in the document
(they are values based on the surrounding text font and the container
elements width), MathJax provides a method for obtaining these values
from a given DOM element.  The method

   .. describe:: MathJax.getMetricsFor(node, display)

takes a DOM element (``node``) and a boolean (``display``), indicating
if the math is in display mode or not, and returns an object
containing all six of the options listed above.  You can pass this
object directly to the conversion methods discussed above.  So you can
do something like

.. code-block:: javascript

   let node = document.querySelector('#math');
   let options = MathJax.getMetricsFor(node, true);
   let html = MathJax.tex2svg('\\sqrt{x^2+1}', options);
   node.appendChild(html);

in order to get get the correct metrics for the (eventual) location of
the math that is being converted.  Of course, it would be easier to
simply insert the TeX code into the page and use
:meth:`MathJax.typeset()` to typeset it, but this is just an example
to show you how to obtain the metrics from a partoicular location in
the page.

Note that obtaining the metrics causes a page refresh, so it is
expensive to do this.  If you need to get the metrics from many
different locations, there are more efficient ways, but these are
advanced topics to be dealt with elsewhere.


.. _conversion-stylesheet:

Obtaining the Output Stylesheet
-------------------------------

The output from the SVG and CommonHTML output jax both depend on CSS
stylesheets in order to properly format their results.  You can obtain
the SVG stylesheet element by calling

.. code-block:: javascript

   MathJax.svgStylesheet();

and the HTML stylesheet from

.. code-block:: javascript

   MathJax.chtmlStylesheet();

The CommonHTML output jax CSS can be quite large, so the output jax
tries to minimize the stylesheet by including only the styles that are
actually needed for the mathematics that has been processed by the
output jax.  That means you should request the stylesheet only *after*
you have typeset the mathematics itself.

Moreover, if you typeset several expressions, the stylesheet will
include everything needed for all the expressions you have typeset.
If you want to reset the stylesheet, then use

.. code-block:: javascript

   MathJax.startup.output.clearCache();

if the output jax is the CommonHTML output jax.  So if you want to
produce the style sheet for a single expression, issue the
:meth:`clearCache()` command just before the :meth:`tex2chtml()` call.


.. _convert-async:

Asynchronous Conversion
-----------------------

If you are converting TeX or LaTeX that might use `\require` to load
extensions, or where extensions might be autoloaded, you will either
need to use one of the "full" components that include all the
extensions, or preload all the extensions you need if you plan to use
the synchronous calls listed above.  Otherwise, you can use the
promise-based calls, which handle the loading of extensions
transparently.

For example,

.. code-block:: javascript

   let node = document.querySelector('#math');
   let options = MathJax.getMetricsFor(node, true);
   MathJax.tex2chtmlPromise('\\require{bbox}\\bbox[red]{\\sqrt{x^2+1}}', options)
     .then((html) => {
       node.appendChild(html);
       let sheet = document.querySelector('#MJX-CHTML-styles');
       if (sheet) sheet.parentNode.removeChild(sheet);
       document.head.appendChild(MathJax.chtmlStylesheet());
     });

would get the metrics for the element with ``id="math"``, convert
the TeX expression using those metrics (properly handling the
asynchronous load needed for the ``\require`` command); then when the
expression is typeset, it is added to the document and the CHTML
stylesheet is updated.

|-----|
