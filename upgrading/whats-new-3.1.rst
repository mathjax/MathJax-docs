.. _whats-new-3.1:

##########################
What's New in MathJax v3.1
##########################

Version 3.1 includes a number of new features, as well as bug fixes
for several issues with version 3.0.  These are described below.

* :ref:`v3.1-tex-package-name-changes`
* :ref:`v3.1-tex-format-error`
* :ref:`v3.1-tex-noundefined-options`
* :ref:`v3.1-output-options`


------

.. _v3.1-tex-package-name-changes:

Tex Package Name Changes
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

Tex Error Formatting
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


|-----|
