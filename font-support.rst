.. _font-support:

********************
MathJax Font Support
********************

MathJax currently supports the following fonts:

* MathJax TeX fonts (default)
* STIX fonts
* Asana Math
* Neo Euler
* Gyre Pagella
* Gyre Termes
* Latin Modern.

Since the common distributions of the fonts listed above cannot be
used by MathJax for technical reasons, the MathJax distribution 
contains customized webfont versions of these fonts. In particular,
these customized versions are split over several files to minimize
the page load.

Since browsers do not provide APIs for font metrics, MathJax has
to download the necessary font data; this font data is generated in
development and cannot be generated on the fly which is why MathJax
cannot support arbitrary fonts.

******************
Font configuration
******************

The page author can configure their font preference for each 
:ref:`output format <output-formats>` separately, see :ref:`HTML-CSS output 
processor <configure-HTML-CSS>` and :ref:`SVG output processor 
<configure-SVG>`.

MathJax will download the necessary webfonts and fontdata dynamically
and only the fonts files necessary for the content. For the HTML-CSS 
output Jax, MathJax will download webfonts in the appropriate webfont 
format (depending on the browser); for the SVG output, MathJax will 
download path data that corresponds to the fonts.

The :ref:`HTML-CSS output processor <configure-HTML-CSS>` will prefer
locally installed copies of the webfonts to minimize page load (again note 
that the usual distributions of the fonts do not necessarily work); the 
page author can set a preference via the `availableFonts` and 
`preferredFont` options and they can configure the webfont via the 
`webFont` option.

The :ref:`SVG output processor <configure-SVG>` will not use fonts but
SVG path data to draw paths corresponding to characters. The page author
can configure the font via the `font` option.

*******************
Character fallbacks
*******************

No font contains a glyph for every character specified in the Unicode 
standard and almost no font contains the relevant mathematical characters,
in particular the combined characters for stretchy constructions. MathJax 
enhances Unicode coverage of the default TeX fonts. e.g., combining two 
double integrals `U+222C` when a quadrupel integral `U+2A0C` is used. 
However, this cannot create every character specified in Unicode.

When MathJax encounters a character the configured font does not 
support, it will ask the browser to provide the glyph from a system 
font. Since MathJax will not have the necessary data on the glyph's
bounding box, MathJax will estimate these metrics; this can negatively
affect layout.


****************
Adding new fonts
****************

As mentioned, MathJax needs pre-generated font data to support a fonts.
This font data can be generated using the `MathJax development tools 
<https://github.com/mathjax/MathJax-dev>`_.

***********
Font mixing
***********

Mixing multiple fonts is currently not supported. We hope to add
support in the future.

