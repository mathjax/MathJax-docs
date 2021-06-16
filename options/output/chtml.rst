.. _chtml-options:

###################################
CommonHTML Output Processor Options
###################################

The options below control the operation of the :ref:`CommonHTML output
processor <html-output>` that is run when you include
``'output/chtml'`` in the ``load`` array of the ``loader`` block of
your MathJax configuration, or if you load a combined component that
includes the CommonHTML output jax.  They are listed with their default
values.  To set any of these options, include a ``chtml`` section in
your :data:`MathJax` global object.

-----

The Configuration Block
=======================

.. code-block:: javascript

    MathJax = {
      chtml: {
        scale: 1,                      // global scaling factor for all expressions
        minScale: .5,                  // smallest scaling factor to use
        mtextInheritFont: false,       // true to make mtext elements use surrounding font
        merrorInheritFont: true,       // true to make merror text use surrounding font
        mathmlSpacing: false,          // true for MathML spacing rules, false for TeX rules
        skipAttributes: {},            // RFDa and other attributes NOT to copy to the output
        exFactor: .5,                  // default size of ex in em units
        displayAlign: 'center',        // default for indentalign when set to 'auto'
        displayIndent: '0',            // default for indentshift when set to 'auto'
        matchFontHeight: true,         // true to match ex-height of surrounding font
        fontURL: '[mathjax]/components/output/chtml/fonts/woff-v2',   // The URL where the fonts are found
        adaptiveCSS: true              // true means only produce CSS that is used in the processed equations
      }
    };

-----


Option Descriptions
===================

.. _chtml-matchFontHeight:
.. describe:: matchFontHeight: true

   This setting controls whether MathJax will scale the mathematics so
   that the ex-height of the math fonts matches the ex-height of the
   surrounding fonts.  This makes the math match the surroundings
   better, but if the surrounding font does not have its ex-height set
   properly (and not all fonts do), it can cause the math to *not*
   match the surrounding text.  While this will make the lower-case
   letters match the surrounding fonts, the upper case letters may not
   match (that would require the font height and ex-height to have the
   same ratio in the surrounding text as in the math fonts, which is
   unlikely).

.. _chtml-fontURL:
.. describe:: fontURL: '[mathjax]/components/output/chtml/fonts/woff-v2'

   This is the URL to the location where the MathJax fonts are
   stored.  In the default, ``[mathjax]`` is replaced by the location
   from which you have loaded MathJax.  You should include a complete
   URL to the location of the fonts you want to use.

.. _chtml-adaptiveCSS:
.. describe:: adaptiveCSS: true

   This setting controls how the CommonHTML output jax handles the CSS
   styles that it generates.  When true, this means that only the CSS
   needed for the math that has been processed on the page so far is
   generated.  When false, the CSS needed for all elements and all
   characters in the MathJax font are generated.  This is an extremely
   large amount of CSS, and that can have an effect on the performance
   of your page, so it is best to leave this as ``true``.  You can
   reset the information about what CSS is needed by using the command

   .. code-block:: javascript

      MathJax.startup.document.output.clearCache();

   to clear the font cache.

The remaining options are described in the
:ref:`output-common-options` section.

|-----|
