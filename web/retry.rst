.. _retry-error:

=========================
The "MathJax Retry" Error
=========================

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
was being performed.  This is an error with the message ``MathJax
retry``.

The promise-based typesetting and conversion functions handle this
retry error automatically, and incorporate waiting for the
asynchronous file loading to complete into their own promises.  The
synchronous functions, however, can't do that, since the retry promise
would make them asynchronous.  If a retry is requested during the
running of one of the synchronous functions, the retry error will not
be caught, and you will likely get an error report in the browser
console indicating an uncaught ``MathJax retry`` error.  That
indicates that you may need to rewrite your code to use the
promise-based functions, instead, which means your code will have to
handle asynchronous typesetting, and can't work synchronously as it
stands.

If there is no promise-based version of the code you are running, then
you may be able to use the following function to process the retry
errors for you.

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
   MathJax.whenReady(mathjax.handleRetriesFor(async () => {
     const doc = MathJax.startup.doc;
     const dom = doc.convert('\\color{red}{x+y}');
     await doc.actionPromises();
     doc.clearPromises();
     return dom;
   })).then((node) => {
     document.body.append(node);
     MathJax.startup.document.reset();
     MathJax.startup.document.updateDocument();
   });

The ``convert()`` call would normally throw a ``MathJax retry`` error
when loading the `color` extension the first time it is used, but the
``handleRetriesFor()`` call traps that and handles it, eventually
typesetting the expression once the `color` extension has been loaded.
In addition, we wait for any promises that were created during the
``convert()`` call (e.g., the speech extension will add one that
resolves when the speech has been applied to the result), and the
promises are cleared.  Finally, when all the promises are resolved,
the ``.then()`` call runs, where the result is appended to the document,
and the document CSS is updated to include any new CSS needed for the
output.

Of course, it is better to insert the TeX code (with delimiters)
directly into the page and call :js:meth:`MathJax.typesetPromise()`
instead, but this is only meant as an example of how
:js:func:`mathjax.handleRetriesFor()` works.  MathJax v4 also includes
:js:meth:`MathJax.startup.document.convertPromise()` command that
includes the :js:meth:`mathjax.handleRetriesFor()` already, or you
could use the :js:meth:`MathJax.tex2chtmlPromise()` or
:js:meth:`MathJax.tex2svgPromise()` methods, depending on the output
format that you have available.

Some things that may initiate a ``MathJax retry`` error include:

* Using the ``\require`` macro in TeX code
* Using a macro that autoloads its definition (like ``\color`` or ``\bbox``)
* Using some named entities in MathML code in the conversion functions
* Generating output for characters whose data must be loaded dynamically.
* Loading of localization files for speech generation.

If you are trying to use synchronous calls, any of these situations
may lead to the ``MathJax retry`` error.  If you are unable to move to
the promise-based calls for some reason, then your only recourse is to
load any of the needed extensions before typesetting or converting the
math.

To do this, be sure to include any needed TeX extensions in the
``load`` array of the ``loader`` section of your MathJax
configuration.  To handle the entities in MathML, add the
``[mml]/entities`` extension to the ``load`` array.

You can load all the font data up front by setting the
``loadAllFontFiles`` option to ``true`` in the ``startup`` section of
your MathJax configuration.  This can cause *many* files to be loaded,
however, so should be avoided if at all possible.  It is much better
to move to the promise-based calls to handle this situation.  If you
must use ``loadAllFontFiles``, then you may want to pick a font with
less character coverage, such as ``mathjax-tex``, the original MathJax
TeX fonts that doesn't have any dynamically loaded data, rather than
the newer fonts for version 4, which have much higher coverage, and so
would involve loading more files.

|-----|
