.. _v4-output-improvements:

===================
Output Improvements
===================

A new :data:`output` section has been added to the MathJax
configuration object that allows you to specify output options that
are common to both output renderers.  That way, if the user switches
the renderer via the MathJax contextual menu, the same settings will
be used in the new renderer without needing additional configuration.
The individual :data:`chtml` and :data:`svg` blocks then should only
include options that are specific to those output formats.


.. _v4-CHTML:

CHTML Improvements
==================

An important improvement has been made in v4 to the way the CHTML
output renderer handles stretchy delimiters.  In the past, the CHTML
output would use CSS transforms to stretch the extender to the needed
size.  This lead to alignment issues between the extenders and the end
pieces in some browsers, and in some cases, thin extenders disappeared
entirely.  In this version of MathJax, the extenders are made from
repeated copies of the extender piece, slightly overlapping, and
clipped to the proper size.  This makes for cleaner and more reliable
assemblies for stretched characters, both vertically and horizontally,
and should eliminate the rendering problems seen in v3.

The MathJax layout uses a font that has larger depth below the
baseline than most standard fonts.  When the MathJax characters are
drag selected, this leads to the selection bounding box being larger
than expected.  With this release, the CHTML output now uses clip
paths to restrict the bounding boxes, making for more accurate
selection backgrounds, and preventing unwanted vertical scroll bars in
some displayed equations.

An improvement has been made in a long-standing issue with the CHTML
output in WebKit-based browsers, like Safari, where characters
(particularly in runs of text) would not line up on the baseline
properly.  This is a bug in WebKit, but this version of MathJax
includes a work-around that should help with the alignment in
``\text{}``, ``\mathrm{}`` and similar macros, and other situations
where the characters
are grouped into a single MathML element.


.. _v4-SVG:

SVG Improvements
================

The SVG output jax has two new configuration options.  The first is
:data:`svg.blacker`, which is a number that indicates the stroke width
(in thousandths of an em) to use for the character paths.  Because
some parts of some characters are very thin, the default is 3 in an
attempt to help prevent those sections from disappearing at small
sizes.  Some page authors may wish to increase or decrease this in
order to help the weight of the MathJax fonts better match the
surrounding text font.  A value of up to 15 may make sense in those
situations.  Values above 30 will likely cause some characters to
render poorly.

The second is :data:`svg.useXlink`, which is either true or false, and
specifies whether the SVG elements should use ``xlink`` namespaces for
their ``href`` attributes.  In HTML5, the ``xlink`` namespace is no
longer necessary, but older systems may still require it, so the
option is available.  The default is ``true``.

The SVG output jax now groups characters that are not in the MathJax
fonts into a single ``<text>`` element.  That allows combining
characters to combine, so that languages and emojis that use multiple
characters to form a single glyph will be handled properly.  So use
``\text{}`` around such characters to allow them to combine properly.
Note that this was already being done for CHTML output, so this brings
the two in line with each other.


.. _v4-assisitve-mml:

Assistive MathML Size
=====================

In the past, the hidden MathML that is produced by the
:ref:`assistive-mml-component` extension could be rendered by the
browser larger than the math typeset by MathJax, which could interfere
with the size of the container for the expression.  Version 4 includes
additional CSS to resolve this problem.  Note, however, that the
`assistive-mml` extension is off by default in v4, and is only active
if the user enables it in the MathJax contextual menu, or if the page
author enables it in the MathJax configuration object.

|-----|
