.. _v4-api-changes:

===================
MathJax API Changes
===================

There are several MathJax API changes in this release, though most
should not be breaking changes, as described below.


.. _v4-api-promises:

New Promise-Based Functions
===========================

Some actions in MathJax require loading extra code from an extension,
which is an asynchronous action, as the browser must wait for the file
to be loaded before it can use it.  In MathJax v3, such asynchronous
actions were mostly associated with loading TeX extension packages,
and that could be avoided by pre-loading the extensions that are
needed, so that typesetting could be performed synchronously.  In v4,
with fonts that have much greater coverage than in v3, some font data
may need to be loaded asynchronously as well, and that means that
typesetting may be asynchronous even if all the needed TeX extensions
are pre-loaded.  As a result, the :js:meth:`MathJax.typesetPromise()`
function is more likely to be needed, and :js:meth:`MathJax.typeset()`
will only work if no font data needs to be loaded.  This is discussed
in more detail in the :ref:`v4-promises` section.

Because of this greater need to handle asynchronous file loading,
several new functions have been added to the :data:`MathDocument`
class to provide promise-based versions of the corresponding
synchronous calls.  These include
:js:meth:`mathDocument.convertPromise()`,
:js:meth:`mathDocument.renderPromise()`, and
:js:meth:`mathDocument.rerenderPromise()`, which wrap the
:js:meth:`mathDocument.convert()`, :js:meth:`mathDocument.render()`,
and :js:meth:`mathDocument.rerender()` methods in the needed
:js:meth:`mathjax.handleRetriesFor()` call and return its promise.
This makes it easier to perform these actions when font data or TeX
extensions need to be loaded than having to use
:js:meth:`mathjax.handlerRetriesFor()` yourself.

In the past, promise-based functions, like
:js:meth:`MathJax.typesetPromise()`,
:js:meth:`MathJax.tex2chtmlPromise()`, etc., could not be called while
another one was currently in effect.  That is, you needed to wait for
the promise from one such call to resolve before you could do the next
call, and the documentation encouraged you to use
:data:`MathJax.startup.promise` to help chain these calls together.
In v4, these functions now use an internal promise (associated with
the :data:`MathDocument`) to prevent more than one from running
concurrently, so these calls chain automatically.  In particular, you
should no longer use :data:`MathJax.startup.promise` yourself to
serialize your calls to these functions.

You may wish to use the new :data:`MathDocument` promise to
synchronize other code with MathJax's typesetting operations without
having to keep track of the promises returned by the various
promise-based functions.  For this reason, MathJax provides a new
:js:meth:`mathDocument.whenReady()` method of the :data:`MathDocument`
class.  It takes a function as its argument, and performs that action
when its internal promise is resolved; that is, when any previous
promise-based typesetting or conversion actions complete.  You can
think of :js:meth:`mathDocument.whenReady()` as queuing your action to
be performed whenever MathJax has finished anything that has been
queued previously.

The function you pass to :js:meth:`mathDocument.whenReady()` can
return a promise (if it starts any asynchronous actions of its own,
for example), in which case that promise must be fulfilled before any
further :js:meth:`mathDocument.whenReady()` actions will be
performed. For example

.. code-block:: js

   const doc = mathjax.document('', {});
   doc.whenReady(() => console.log('A'));
   doc.whenReady(() => {
     return new Promise((ok, fail) => {
       setTimeout(() => {
         console.log('B');
         ok();
       }, 1000);
     });
   });
   doc.whenReady(() => console.log('C'));

would print ``A`` to the developer console, then a second later print
``B`` followed by ``C``.


.. _v4-api-speech:

Changes to Speech Generation
============================

In v3, the speech generation was performed within the
:ref:`semantic-enrich-component` component along with the semantic
enrichment of the internal MathML representation of the mathematical
expressions that it processes.  In v4, these two functions have been
separated from each other, and the speech-generation functionality is
performed in a new :ref:`speech-component` component.  This is
included in all the combined components, but can be loaded
individually by including ``a11y/speech`` in the :data:`load` array of
the :data:`loader` block of your MathJax configuration.

The section on :ref:`v4-explorer-details` already mentions the new
:meth:`MathJax.done()` function that is used to shut down the
web-worker or node worker-thread that is created for speech
production.  There is a corresponding new
:js:meth:`mathDocument.done()` method for the :data:`MathDocument`
class that can be used in applications that don't use the MathJax
Component framework, but rather call on MathJax modules directly.


.. _v4-api-input-jax:

Named Access to Input Jax
=========================

A MathDocument's :data:`inputJax` array included any input jax that
you have loaded.  E.g., in the ``tex-mml-svg.js`` combined component,
it would contain entries for both the TeX and MathML input jax.
Because this is an array, it was not obvious in v3 which of the two
entries was which (you would need to check each entry's :data:`name`
property to see if it is the one you want).  In this release, the
:data:`inputJax` array also includes properties that point to the
input jax by name.  That is, :data:`mathDocument.inputJax.tex` will
point to the TeX input jax, if any, and similarly for
:data:`mathDocument.inputJax.mathml`.


.. _v4-api-modules:

Change to ES6 Modules
=====================

The fact that the webpacked components are now ES6 files (see the
section on :ref:`v4-es6-modules`) means that MathJax will no longer
run in IE11, so you should no longer include the ``polyfill.io``
script that was recommended in the documentation for IE11 support.

The ``es5`` directory has been removed from the MathJax distribution,
so the ``/es5`` should be removed from the URL used to access
MathJax's components.  In the ``mathjax`` npm package, the files from
the ``es5`` directory are now in the main directory, and for
``mathjax-full`` (now called ``@mathjax/src``), they are in the
generic ``bundle`` directory.


.. _v4-api-options:

Changes to Configuration Options
================================

The :data:`tex.skipHtmlTags` configuration property now includes
``select`` and ``option`` tags, since pop-up menu items can only
contain textual content, not other HTML tags.

In addition to the new configuration options discussed in other
sections, there are several additional options available in this
release:

* Two new settings in the :data:`options.menuOptions.settings`
  configuration object: :data:`showSRE` and :data:`showLatex`, which
  control whether to include the data attributes generated by the
  speech-rule-engine or the :attr:`data-latex` attributes in MathML
  and SVG output in the `Show Math As` and `Copy to Clipboard` menus.

* :data:`mathml.verify.checkMathvariants`, which controls whether the
  MathML input jax will check that :attr:`mathvariant` attribute
  values are valid math variants and report an error if not.  Invalid
  :attr:`mathvariant` values can cause MathJax to crash under some
  circumstances, so the default value of this option is ``true``, but
  this may cause current expressions with invalid math variant values
  that used to render to now show those nodes as having errors.

The :data:`lineWidth` property of the :data:`Metrics` object (used to
store information about the font metrics of the container surrounding
an expression) has been removed, as the line-breaking algorithm ended
up using the :data:`containerWidth` property directly.  That affects
functions that accept metric data as their inputs (such as
:js:meth:`mathDocument.convert()` and :js:meth:`MathJax.tex2chtml()`),
as these will no longer accept :data:`lineWidth` in the options passed
to them.

Some backward-compatibility code in v3 has been removed; e.g., when
the :data:`tex.multlineWidth` configuration option was moved to
:data:`tex.ams.multlineWidth` in an earlier version, there was code to move
the old value to the new location, but that code has been removed in
v4.


.. _v4-api-code:

Changes to the Code Base
========================

The MathJax code base has undergone a major cleanup effort for this
release, using ``eslint`` and ``prettier`` to format the code
consistently, and new life-cycle scripts to perform these actions have
been added to the ``package.json`` file.  Other modernizations, like
moving from :meth:`String.substr()` to :meth:`String.substring()` were
also performed.

A number of object name changes are listed in the
:ref:`v4-breaking-changes` section.

Finally, MathJax's test suite has been expanded to include more than
3,000 tests.  We have full coverage for the TeX input jax and the
``ts/util`` directories, but more tests need to be written for other
sections of the code base.  This is an ongoing project that will take
time to complete.

|-----|
