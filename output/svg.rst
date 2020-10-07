.. _svg-output:

###########
SVG Support
###########

The ``SVG`` output processor uses `Scalable Vector Graphics` to render
the mathematics on the page.  SVG is supported in all the major
browsers and most mobile devices; note, however, that Internet
Explorer prior to IE9 does not support SVG (MathJax version 3 doesn't
support these in any case), and IE9 only does in "IE9 standards mode",
not its emulation modes for earlier versions.  The SVG output mode is
high quality, and displays and prints well in all browsers. Since it
uses SVG data instead of font files, it is not affected by user-based
web-font blocking, or other character placement issues that sometimes
occur with the HTML-based output.

One advantage to the SVG output is that it is relatively
self-contained (it does not rely heavily on CSS, though it does use
some in certain circumstances), so it can be saved and used as an
independent image.  One disadvantage of this mode is that its
variable-width tables become fixed size once they are typeset, and
don't rescale if the window size changes (for example).

In version 2, equation tags and numbers where produced using a fixed
width as well, so the equation number would not change with changes in
window size.  In version 3, however, equation numbers now are based on
the container size, and move with changes in its size, just as they do
with CommonHTML output.

Finally, because mathematical characters in SVG output are produced by
SVG paths, not characters in a font, they can't be copy and pasted, as the
output of the CommonHTML processor can.

See :ref:`svg-options` for information about the options that
control the SVG output.

|-----|
