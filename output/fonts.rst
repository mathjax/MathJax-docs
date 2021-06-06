.. _font-support:

####################
MathJax Font Support
####################

MathJax version 3 currently supports only one font, the MathJax TeX
font.  Version 2 provides the following fonts:

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

MathJax 3 will support these fonts in a future version.


.. _user-defined-fonts:

Use of Other Fonts
==================

In version 2 of MathJax, it was difficult to adjust the fonts in use
(once loaded), or to replace individual or collections of characters
being used.  For example, switching the variables and function names
to use a sans-serif font rather than the standard serifed font is
quite difficult in version 2.  The structure of the font data in
version 3 has been completely redesigned to help make such changes
easier to make.

Since browsers do not provide APIs to access font metrics, MathJax has
to ship with the necessary font data; this font data is generated
during development and cannot be determined easily on the fly.  The
tools for creating the data needed by MathJax have not yet been
created for version 3 (the data for the MathJax TeX font was
converted from the version 2 format by hand).  These tools are high on
the list for inclusion in the next version of MathJax, which should
provide the additional fonts missing from the initial release of
version 3.  At that point, the details of how to mix-and-match font
characters, and how to create the data files for your own fonts for
use in MathJax, will be provided.


..
   Font configuration
   ==================

   Page authors can configure their font preference for each :ref:`output
   format <output-formats>` separately, see :ref:`HTML-CSS output
   processor <configure-HTML-CSS>` and :ref:`SVG output processor
   <configure-SVG>`. MathJax will download the necessary webfonts and
   fontdata dynamically and only those files necessary for the content.

   For the HTML-CSS output, MathJax will download webfonts in the
   appropriate webfont format (depending on the client browser); for the
   SVG output, MathJax will download path data that corresponds to the
   fonts.

   The :ref:`HTML-CSS output processor <configure-HTML-CSS>` will prefer
   locally installed copies of the webfonts to minimize page load. Page
   authors can set a preference via the ``availableFonts`` and
   ``preferredFont`` options and they can configure the webfont via the
   ``webFont`` option. Please note that except for STIX General, the
   usual distributions of the supported fonts do not work for technical
   reasons. You can download the webfonts from the `MathJax repository
   <https://github.com/mathjax/MathJax/tree/master/fonts/HTML-CSS>`_.

   The :ref:`SVG output processor <configure-SVG>` will not use fonts
   directly but rather uses derived SVG path data to draw paths
   corresponding to characters. The page author can configure the font
   via the ``font`` option.

   There is currently no method for switching fonts after MathJax has
   loaded.  Similarly, page users cannot change the font configuration at
   this time except by installing their preferred fonts locally.


.. _unknown-characters:

Character fallbacks
===================

No font contains a suitable glyph for every character specified in the
Unicode standard. When MathJax encounters a character that isn't in
the font that it is using, it will fall back to other fonts in a variety
of ways.

First, MathJax enhances Unicode coverage of its default TeX fonts,
e.g., combining two double integrals ``U+222C`` when a quadruple
integral ``U+2A0C`` is used. However, this cannot create every
character specified in Unicode. Next, MathJax will run through a
fallback chain within the configured fonts (e.g., upright Greek will
be substituted with italic Greek).

Finally, when all else fails, MathJax will ask the browser to provide
the glyph from a system font.  Since in that final case, MathJax will
not have the necessary data on the glyph's bounding box, MathJax will
guess these metrics.  When run in a browser, MathJax will be able to
determine the character's width, but not its height and depth, so it
will use default values these metrics.  Measuring the width can
negatively affect the rendering speed, and guessing the height and
depth can reduce the quality of the resulting output.  When used on a
server or in a command-line application, MathJax won't even be able to
determine the width, and that has an even more serous consequences for
the layout, in general.  Thus it is best to use only the characters
that are in the MathJax fonts when using server-side rendering.

|-----|
