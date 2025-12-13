.. _chtml-options:

###################################
CommonHTML Output Processor Options
###################################

The options below control the operation of the :ref:`CommonHTML output
processor <html-output>` that is run when you include
``'output/chtml'`` in the :data:`load` array of the :data:`loader`
block of your MathJax configuration, or if you load a combined
component that includes the CommonHTML output jax.  They are listed
with their default values.  To set any of these options, include a
:data:`chtml` section in your :data:`MathJax` global object.

In addition to the options listed below, you can also include any of
the options from the :data:`output` block listed in the
:ref:`output-options` section.

-----

The Configuration Block
=======================

.. code-block:: javascript

    MathJax = {
      chtml: {
        matchFontHeight: true,  // True to scale the math to match the ex-height of the surrounding font
        fontURL: URL,           // The URL where the fonts are found
        dynamicPrefix: URL,     // The URL where dynamic ranges of the font data are located
        adaptiveCSS: true,      // true means only produce CSS that is used in the processed equations
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
   match the surrounding text.

   While a ``true`` value will make the lower-case letters match the
   surrounding fonts, the upper case letters may not match (that would
   require the font height and ex-height to have the same ratio in the
   surrounding text as in the math fonts, which is unlikely).

.. _chtml-fontURL:
.. describe:: fontURL: URL

   This is the URL to the location where the MathJax fonts are stored.
   The ``URL`` is set up by the default font to point to its CDN
   location.  For the ``mathjax-newcm`` font, the ``URL`` would be set
   to
   ``https://cdn.jsdelivr.net/npm/@mathjax/mathjax-newcm-font/chtml/woff2``,
   for example.

   While v3 included the fonts as part of the MathJax distribution, in
   v4, the fonts are in separate npm packages.  Each font sets up its
   own location when it is loaded, and the default is to take the
   fonts from ``cdn.jsdelivr.net``.  If you are serving your own copy
   of MathJax, you may want to include your own copy of the fonts, and
   so may need to set this value accordingly.


.. _chtml-dynamicPrefix:
.. describe:: dynamicPrefix: URL

   This is the location where MathJax should look for font data that
   has to be loaded dynamically.  The ``URL`` is set up by the default
   font to point to its CDN location.  For the ``mathjax-newcm`` font,
   the ``URL`` would be set to ``[mathjax-newcm]/chtml/dynamic``, for
   example, with the ``[mathjax-newcm]`` path being set to the CDN
   location.

   Version 3 included all the font data in one file, but in v4, where
   the fonts include much greater character coverage, the fonts are
   broken into several smaller pieces that are loaded only when
   needed.

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
