.. _v4-ui-updates:

==============================
MathJax User-Interface Updates
==============================

Since MathJax v4 includes a significant rewrite of the expression
explorer, this has lead to a reorganization of the MathJax contextual
menu that moves the accessibility options to a more prominent position
for easier access and better control.  The top-level menu now includes
an `Accessibility` section with four submenus — `Speech`, `Braille`,
`Explorer`, and `Options` — rather than an accessibility submenu as in
previous versions.  The Speech menu allows you to enable/disable
speech generation and its associated visual output, and to turn on or
off auto voicing.  It also provides control over the speech rule-set
to use, the verbosity of the set in use, and the language to use for
the speech.  Similarly, the Braille menu allows you to enable/disable
Braille generation and display, as well as to select the type of
Braille to generate.

The explorer controls for magnification and highlighting have been
moved to the `Explorer` menu, and other accessibility options have
been moved from the `Math Settings` and old `Accessibility` submenus
to the `Options` menu.  A new `Semantic Enrichment` option controls
whether the accessibility features are available or not (unchecking
it disables speech and Braille generation and the explorer).

Several new items have been added to the `Show Math As` and `Copy to
Clipboard` submenus of the MathJax contextual menu.  These include:

* `Speech Text`, which is the generated speech string for the
  mathematical expression.
* `Braille Code`, which is the Braille string for the mathematical
  expression.
* `SVG Image`, which is a serialized SVG object representing the
  expression, which can be pasted into a stand-alone image file for
  use elsewhere.
* `Error Message`, which is the full error message when there is a TeX
  or MathML input error, or an internal MathJax error.  In particular,
  when the TeX :ref:`tex-noerrors` extension is used (so that error
  messages are not displayed within the page), this can give you the
  actual error message for an expression that doesn't typeset.

Note that `Speech Text` and `Braille Code` are only available when
their associated menu items in the accessibility section are enabled
(as is the case for the default combined components).  Similarly,
`SVG Image` is only available when the SVG output jax is available
(either in a configuration that loads it, or if the user changes to
SVG output in the contextual menu).

There is also a new `MathML/SVG has` entry in the `Math Settings`
submenu that controls what attributes are included in the MathML and
SVG produced by the `Show Math As` and `Copy to Clipboard` menu items.
The `TeX hints` and `Original as annotation` items have been moved
there, and there are two new items: `Semantic attributes` and `LaTeX
attributes`.  The first controls whether to include the attributes
that have been added by the semantic enhancement; there are a lot of
these, and they can make the MathML hard to read, and generally are
not necessary for use outside of MathJax, so the default is to filter
these attributes, but you can uncheck that item if you want to include
them in the MathML output.  The second controls whether to include
the `data-latex` attributes that the TeX input jax adds to the
internal MathML to indicate the LaTeX commands that generated the
given MathML.  These are included by default, but can be turned off
with this menu item.

|-----|
