.. _sync-promises:

================
MathJax Promises
================


MathJax version 2 used `queues`, `callbacks`, and `signals` as a means
of coordinating your code with the actions of MathJax.  Version 3 and
above use the more modern tool know as a `promise
<https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise>`__
to synchronize your code with MathJax.  Many of the of MathJax's
functions return promises that you can use to tell when MathJax
completes the actions that you have requested, allowing you to perform
code that requires the results of those actions.  These functions include

* :js:meth:`MathJax.typesetPromise()`
* :js:meth:`MathJax.tex2mmlPromise()`
* :js:meth:`MathJax.tex2chtmlPromise()`
* :js:meth:`MathJax.tex2svgPromise()`
* :js:meth:`MathJax.mathml2chtmlPromise()`
* :js:meth:`MathJax.mathml2svgPromise()`
* :js:meth:`MathJax.asciimath2mmlPromise()`
* :js:meth:`MathJax.asciimath2chtmlPromise()`
* :js:meth:`MathJax.asciimath2svgPromise()`
* :js:meth:`MathJax.whenReady()`

for typesetting and converting math when you are using
:ref:`web-components` framework, either in web pages or in node
applications.  The first two and last one are described in the
:ref:`web-typeset` and :ref:`typeset-math` sections, with the
remaining eight are discussed in the :ref:`convert-math` section.

For node applications that use direct access to the
MathJax modules, there are

* :js:meth:`MathDocument.convertPromise()`
* :js:meth:`MathDocument.renderPromise()`
* :js:meth:`MathDocument.rerenderPromise()`
* :js:meth:`MathDocument.whenReady()`
* :js:meth:`mathjax.handleRetriesFor()`

as methods of the :data:`MathDocument` instance produced by a
:js:meth:`mathjax.document()` call.

The first of these (described in the :ref:`direct-basics` section), is
the function that underlies the eight conversion functions in the
first list above.  The second underlies the
:js:meth:`MathJax.typesetPromise()` call, and the third is used to
rerender the output without re-running the input processor (e.g., when
the output jax changes, or if the speech or explorer settings are
changed in the MathJax menu).  The :js:meth:`MathDocument.whenReady()`
method is called by :js:meth:`MathJax.whenReady()`, and can be used to
queue actions for MathJax to perform when it has finished any pending
actions that have already been queued.  This is described in more
detail in the :ref:`typeset-async` section.

All of these promise-based functions return a promise that completes
when the typesetting or conversion actions have completed.  You can
use that promise to synchronize your own code that relies on the
results of those actions with the MathJax calls that produce those
results.  That can be done by using a ``.then()`` clause on the
returned promise, or by using ``await`` in an ``async`` function to
wait for the promise to resolve before going on.

|-----|
