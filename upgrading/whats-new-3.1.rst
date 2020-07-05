.. _whats-new-3.1:

##########################
What's New in MathJax v3.1
##########################

Version 3.1 includes a number of new features, as well as bug fixes
for several issues with version 3.0.  These are described below.

* :ref:`v3.1-tex-package-name-changes`
* :ref:`v3.1-tex-format-error`
* :ref:`v3.1-tex-noundefined-options`
* :ref:`v3.1-tex-textmacros`
* :ref:`v3.1-safe`
* :ref:`v3.1-mathml-verify-options`
* :ref:`v3.1-output-options`
* :ref:`v3.1-startup-promise`
* :ref:`v3.1-typesetClear`
* :ref:`v3.1-getMathItemsWithin`

------

.. _v3.1-tex-package-name-changes:

TeX Package Name Changes
========================

The names of several tex packages have been changed to conform to a
new naming convention.  All package names are now entirely in lower
case.  The mixed case naming used in the past proved to be
problematic, and so four extensions have been renamed to all lower
case:  ``amscd``, ``colorv2``, ``configmacros``, and ``tagformat``.

If you are using the component system to load MathJax, the old names
will continue to work for now, but the backward-compatibility support
may be removed in the future, so you should change the names to their
lower case versions for protection against future changed.  Note that
the names need to be changed in not only in the :attr:`tex.packages`
array but also in the name of their configuration options, if any, and
in the `autoload` configuration (e.g., if you are disabling the
autoloading of the ``colorv2`` extension).

If you are using direct imports of the MathJax modules, you will need
to change to the new names now, as there is no backward-compatibility
option for that.

.. _v3.1-tex-format-error:

TeX Error Formatting
====================

There is a new :attr:`formatError` option for the TeX input jax that
provides a function that is called when a syntax or other error occurs
during the processing of a TeX expression.  This can be used to trap
the errors for reporting purposes, or to process the errors in other
ways.  See the :ref:`formatError <tex-formatError>` documenation.


.. _v3.1-tex-noundefined-options:

Noundefined Package Options
===========================

The ``noundefined`` package now has configuration options similar to
the ones available in the ones available in version 2.  These include
tha ability to set the text color, background color, and size of the
text to use for disoplaying undefined macro names within TeX formulas.
See the :ref:`noundefined options <tex-noundefined-options>` for
details.


.. _v3.1-tex-textmacros:

New `textmacros` Package
========================

There is a new `textmacros` package for the TeX input jax that
provides support for processing a number of text-mode macros when they
appear inside ``\text{}`` or other similar settings that produce
text-mode material.  This allows you to quote TeX special characters,
create accented characters, change fonts and sizes, add spacing, etc.,
within text-mode material.  See the :ref:`tex-textmacros` page
for complete details.


.. _v3.1-safe:

New Safe Extension
==================

The `Safe` extension hs now been ported from v2 to v3.  This
extensions allows you to filter the values used in the attributes of
the underlying MathML that is generated from the TeX, AsciiMath, or
MathML input.  This can be used to prevent certain URLs from being
used, or certain CSS styles from being used, etc.  See
:ref:`safe-typesetting` for more details.


.. _v3.1-mathml-verify-options:

MathML Verify Options
=====================

The MathML input jax has the ability to check and report or
(sometimes) correct errors in MathML trees, but the options that
control this checking were not documented, and could not be changed
easily.  Version 3.1 exposes these options so they can be set in the
configuration block for the MathML input jax.


.. _v3.1-output-options:

New Output Configuration Options
================================

There are two new output configuration options, and updated behavior
and defaults for two existing options.  These options control the
fonts used for ``<mtext>`` and ``<merror>`` elements.  The original
:attr:`mtextInheritFont` and :attr:`merrorInheritFont` properties
controlled whether these elements used the same font as the
surrounding text, but neither worked properly in version 3.0.  This
has been fixed in version 3.1 so these now properly cause the
surrounding font to be used for the contents of the specified elements
when set to ``true``.

If these are set to ``false``, the new :attr:`mtextFont` and
:attr:`merrorFont` properties specify a font family (or list of families)
to use fort the content of these elemements.  This allows you to force
a specific font to be used for the text within mathematics.  If these
are set to an empty string, then the MathJax fonts will be used.

The defaults for these are

.. code-block:: javascript

   mtextInheritFont: false,
   merrorInheritFont: false,
   mtextFont: '',
   merrorFont: 'serif',

which means that the MathJax fonts will be used for ``<mtext>``
elements, and the browser's serif font will be used for ``<merror>``
text.  See the :ref:`output-common-options` for more information.

**Note:** the default for :attr:`merrorInheritFont` has been changed from
``true`` to ``false`` now that :attr:`merrorFont` is available.


.. _v3.1-startup-promise:

Startup Promise Revisions
=========================

The :attr:`MathJax.startup.promise` now works in a more intuitive way.
In the past, it was initially set to be a promise that resolves when
MathJax is ready and the ``DOMContentLoaded`` event occurs, and was
changed by the :meth:`startup.pageReady()` function to one that
resolve when the initial typesetting is finished.  So you could not
use :attr:`MathJax.startup.promise` to tell when the initial
typesetting is complete without overriding the
:meth:`startup.pageReady()` method as well.

In version 3.1, the :attr:`MathJax.startup.promise` has been changed
to one that resolves when the action of the :meth:`startup.pageReady()`
method is finished (which includes the initial typesetting action).
That makes this promise a reliable way to determine when the initial
typesetting is finished.

See the sections on :ref:`startup-action`, on :ref:`typeset-async`,
and on the :ref:`pageReady() <startup-pageready>` for more
details.


.. _v3.1-typesetClear:

New API for Clearing Typeset Content
====================================

If you are dynamically adding and removing content from your page, you
need to tell MathJax abiout what you are doing so that it can typeset
any new mathematics, and forget about any old typeset mathematics that
you have removed.  In version 3.0, the :meth:`MathJax.typesetClear()`
method could be used to tell MathJax to forget about *all* the
mathematics that is ahs typeset, but if you only removed some of it,
there was no easy way to tell it to forget about only the math you
removed.  This situation has been improved in version 3.1 by allowing
the :meth:`MathJax.typesetClear()` method to accept an array of
elements whose contents should be forgotten.  See :ref:`typeset-clear`
for more details.


.. _v3.1-getMathItemsWithin:

New API for Getting Math within a Container
===========================================

MathJax keeps track of the math that you have typeset using a list of
objects called `MathItems`.  These store the original math string, the
locatino of the math in the document, the input jax used to process
it, and so on.  In the past, you had access to these through a list
stored in the `MathDocument` object stored at :attr:`MathJax.startup.document`, 
but it was not easy to get access to the individual MathItems in a
convenient way.  In v3.1 there is now a function
:meth:`MathJax.startup.document.getMathItemsWithin()` that returns all
the MathItems for the typeset math within a DOM container element (or
collection of DOM elements).  See :ref:`get-math-items` for details.


|-----|
