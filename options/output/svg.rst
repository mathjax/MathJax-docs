.. _svg-options:

############################
SVG Output Processor Options
############################

The options below control the operation of the :ref:`SVG output
processor <svg-output>` that is run when you include ``'output/svg'``
in the ``load`` array of the ``loader`` block of your MathJax
configuration, or if you load a combined component that includes the
CommonHTML output jax.  They are listed with their default values.  To
set any of these options, include an ``svg`` section in your
:data:`MathJax` global object.

-----

The Configuration Block
=======================

.. code-block:: javascript

    MathJax = {
      svg: {
        scale: 1,                      // global scaling factor for all expressions
        minScale: .5,                  // smallest scaling factor to use
        mtextInheritFont: false,       // true to make mtext elements use surrounding font
        merrorInheritFont: true,       // true to make merror text use surrounding font
        mathmlSpacing: false,          // true for MathML spacing rules, false for TeX rules
        skipAttributes: {},            // RFDa and other attributes NOT to copy to the output
        exFactor: .5,                  // default size of ex in em units
        displayAlign: 'center',        // default for indentalign when set to 'auto'
        displayIndent: '0',            // default for indentshift when set to 'auto'
        fontCache: 'local',            // or 'global' or 'none'
        localID: null,                 // ID to use for local font cache (for single equation processing)
        internalSpeechTitles: true,    // insert <title> tags with speech content
        titleID: 0                     // initial id number to use for aria-labeledby titles
      }
    };

-----


Option Descriptions
===================

.. _svg-fontCache:
.. describe:: fontCache: 'local'

   This setting determines how the SVG output jax manages characters
   that appear multiple times in an equation or on a page.  The SVG
   processor uses SVG paths to display the characters in your math
   expressions, and when a character is used more than once, it is
   possible to reuse the same path description; this can save space in
   the SVG image, as the paths can be quite complex.  When set to
   ``'local'``, MathJax will cache font paths on an express-by-expression
   (each expression has its own cache within the SVG image itself),
   which makes the SVG self-contained, but still allows for some
   savings if characters are repeated.  When set to ``'global'``, a
   single cache is used for all paths on the page; this gives the most
   savings, but makes the images dependent on other elements of the
   page.  When set to ``'none'``, no caching is done and explicit paths
   are used for every character in the expression.

.. describe:: internalSpeechTitles: true

   This tells the SVG output jax whether to put speech text into
   ``<title>`` elements within the SVG (when set to ``'true'``), or to
   use an ``aria-label`` attribute instead.  Neither of these control
   whether speech strings are generated (that is handled by the
   :ref:`semantic-enrich-options` settings); this setting only tells
   what to do with a speech string when it has been generated or
   included as an attribute on the root MathML element.


The remaining options are described in the
:ref:`output-common-options` section.

-----

Developer Options
=================

In addition to the options listed above, low-level options intended
for developers include the following:

.. _svg-localID:
.. describe:: localID: null

   This gives the ID prefix to use for the paths stored in a local
   font cache when :attr:`fontCache` is set to ``'local'``.  This is
   useful if you need to process multiple equations by hand and want
   to generate unique ids for each equation, even if MathJax is
   restarted between equations.  If set to ``null``, no prefix is
   used.

.. _svg-titleID:
.. describe:: titleID: 0

   This gives the initial number used to make unique ``<title>`` ids
   when :attr:`internalSpeechTitles` is ``true``.  This is useful if
   you need to process multiple equations by hand and want to generate
   unique ids for each equation, even if MathJax is restarted between
   equations.

|-----|
