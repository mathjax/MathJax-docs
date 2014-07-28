.. _font-support:

********************
MathJax Font Support
********************

MathJax currently supports the following fonts:

* MathJax TeX (default)
* STIX General
* Asana Math
* Neo Euler
* Gyre Pagella
* Gyre Termes
* Latin Modern

MathJax contains customized webfont versions of these fonts. In particular, 
these customized versions are split over several files to minimize the page 
load.

Since browsers do not provide APIs to access font metrics, MathJax has
to ship with the necessary font data; this font data is 
generated during development and cannot be generated on the fly. In addition, 
most fonts do not cover the relevant characters for mathematical layout. Finally, some 
fonts (e.g. Cambria Math) store important glyphs outside the Unicode range, making them 
inaccessible to JavaScript. These are the main reasons why MathJax 
is unable to support arbitrary fonts at this time.


Font configuration
==================

Page authors can configure their font preference for each 
:ref:`output format <output-formats>` separately, see :ref:`HTML-CSS output 
processor <configure-HTML-CSS>` and :ref:`SVG output processor 
<configure-SVG>`. MathJax will download the necessary webfonts and fontdata 
dynamically
and only those files necessary for the content. 

For the HTML-CSS 
output, MathJax will download webfonts in the appropriate webfont 
format (depending on the client browser); for the SVG output, MathJax will 
download path data that corresponds to the fonts.

The :ref:`HTML-CSS output processor <configure-HTML-CSS>` will prefer
locally installed copies of the webfonts to minimize page load. Page authors 
can set a preference via the ``availableFonts`` and 
``preferredFont`` options and they can configure the webfont via the 
``webFont`` option. Please note that except for STIX General, the usual 
distributions of the supported fonts do not work for technical reasons. You can
download the webfonts from the `MathJax repository 
<https://github.com/mathjax/MathJax/tree/master/fonts/HTML-CSS>`_.

The :ref:`SVG output processor <configure-SVG>` will not use fonts directly but
derived SVG path data to draw paths corresponding to characters. The page author
can configure the font via the ``font`` option.

There is currently no method for switching fonts after MathJax has loaded.
Similarly, page users cannot change the font configuration at this time
except by installing their preferred fonts locally.


Character fallbacks
===================

No font contains a suitable glyph for every character specified in the 
Unicode standard. MathJax enhances Unicode coverage of its default TeX fonts,
e.g., combining two double integrals ``U+222C`` when a quadrupel integral
``U+2A0C`` is used. However, this cannot create every character specified 
in Unicode.

When MathJax encounters a character the configured font does not 
support, it will ask the browser to provide the glyph from a system 
font. Since MathJax will not have the necessary data on the glyph's
bounding box, MathJax will estimate these metrics; this can negatively
affect layout.


Adding new fonts
================

As mentioned, MathJax needs pre-generated font data to support a fonts.
This font data can be generated using the `MathJax development tools 
<https://github.com/mathjax/MathJax-dev>`_.


Font mixing
===========

Mixing multiple fonts is currently not supported. We hope to add
support in the future.

