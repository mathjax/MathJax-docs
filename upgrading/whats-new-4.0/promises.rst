.. _v4-promises:

=========================
MathJax v4.0 and Promises
=========================

Because the new MathJax fonts include more extensive character
coverage, meaning much more data is required, the fonts have been
broken down into smaller pieces that can be loaded dynamically, rather
than being one big data file, as was the case with version 3.  This
allows the initial download of MathJax to be smaller, while still
accommodating rarely used glyphs for those who need them.

As a result, however, when the data for one of these ranges is needed,
MathJax will pause and wait for the data to arrive from the CDN.  That
means that producing MathJax output is now potentially an asynchronous
process, which was not the case in v3 (where only the input processing
could be asynchronous).  In the past, as long as you pre-loaded all
the TeX extensions that you needed (e.g., with one of the ``-full``
components), you could use synchronous calls to
:js:meth:`MathJax.tex2svg()` or the other similar functions.  With the
new (larger) dynamic fonts, that is no longer guaranteed.  That means
you should instead use the promise-based versions of these calls, like
:js:meth:`MathJax.tex2svgPromise()`, in order to properly handle the
potential for dynamically loaded font data.

When using the synchronous calls, you may get errors indicating a
"MathJax retry", which is what MathJax uses to mediate its
asynchronous loading actions.  The promise-based functions handle
these retry errors automatically, but the synchronous functions expect
you to trap them and handle them yourself, usually through the
:js:meth:`mathjax.handleRetriesFor()` function.

Properly handling promises may mean reorganizing how your own code
works.  If you can not avoid using synchronous calls, then you may
need to load all the font dynamic data up front using a single
promise-based call before you start using MathJax synchronously.  This
can be done using

.. code-block:: js

   MathJax.startup.document.outputJax.font.loadDynamicFiles();

to load all the font dynamic data.  This function returns a promise,
and you should wait for it to resolve before calling any MathJax
conversion functions.  Note, however, that there can be a *lot* of
font data, and these fonts may include many characters that will never
get used, so only do this if you absolutely have to.  It is better to
use the promise-based conversion functions if you can.

For node applications, you can use

.. code-block:: js

   MathJax.startup.document.outputJax.font.loadDynamicFilesSync();

to load the font data synchronously, provided you have defined the
MathJax loading mechanism by importing
``@mathjax/src/js/util/asyncLoad/node.ts`` before hand.

|-----|
