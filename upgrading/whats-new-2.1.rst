.. _whats-new-2.1:

**************************
What's New in MathJax v2.1
**************************

MathJax v2.1 is primarily a bug-fix release.  Numerous display bugs, line-breaking problems, and interface issues have been resolved.  The following lists indicate the majority of the bugs that have been fixed for this release.


Interface
=========

* Make NativeMML output properly handle iOS double-tap-and-hold, and issue warning message when switching to NativeMML output.
* Use ``scrollIntoView`` to handle ``positionToHash`` rather than setting the document location to prevent pages from refreshing after MathJax finishes processing the math.
* Handle positioning to a hash URL when the link is to an element within SVG output.
* Make ``href``'s work in SVG mode in all browsers.
* Fix problem with opening the "Show Math As" window in WebKit (affected Chrome 18, and Safari 5.1.7).
* Use MathJax message area rather than window status line for ``maction`` with ``actiontype='statusline'`` to avoid security restrictions in some browsers.
* Fix issue where zoom box for math that has been wrapped to the beginning of a line would be positioned at the end of the previous line.
* Fix a problem where IE would try to typset the page before it was completely available, causing it to not typeset all the math on the page (or in some cases *any* of the math).
* Allow decimal scale values in the dialog for setting the scale.
* Fix SVG output so that setting the scale will rescale the existing mathematics.
* Add close button to About box and don't make clicking box close it (only clicking button).
* Make About box show 'woff or otf' when otf fonts are used (since both are requested).
* Have output jax properly skip math when the input jax has had an internal failure and so didn't produce any element jax.
* Produce ``MathJax.Hub`` signal when ``[Math Processing Error]`` is generated.


Line-breaking
=============

* Fix problem with SVG output disappearing during line breaks when equation numbers are also present.
* Fix problem with potential infinite loop when an ``<mspace>`` is an embellished operator that causes a linebreak to occur.
* Allow line breaks within the base of ``<msubsup>`` to work so that the super and subscripts stay with the last line of the base.
* Fix ``<mfenced>`` so that when it contains a line break the delimiters and separators are not lost.
* Allow line breaks at delimiters and separators in <mfenced> elements.
* Fix issue with line breaking where some lines were going over the maximum width.
* Fix problem with line breaking inside ``<semantics>`` elements.
* Fix problem with line breaking where the incorrect width was being used to determine breakpoint penalties, so some long lines were not being broken.


HTML-CSS/SVG display
====================

* Fix several Chrome alignment and sizing issues, including problems with horizontal lines at the tops of roots, fraction bars being too long, etc.
* Resolve a problem with how much space is reserved for math equations when a minimum font size is set in the browser.
* Force final math span to be remeasured so that we are sure the container is the right size.
* Fix alignment problem in ``<msubsup>``.
* Fix processing error when rowalign has a bad value.
* Fix a vertical placement problem with stretched elements in mtables in HTML-CSS, and improve performace for placeing the extension characters.
* Handle spacing for U+2061 (function apply) better.
* Better handling of primes and other pseudo scripts in HTML-CSS and SVG output.
* Fixed a problem with ``<mmultiscripts>`` in SVG mode that caused processing error messages.
* Fix misplaced ``\vec`` arrows in Opera and IE.
* Make ``<mi>`` with more than one letter have ``texClass`` OP rather than ORD in certain cases so it will space as a function.
* Make HTML snippet handler accept a string as contents, even if not enclosed in braces.
* Fix spacing for functions that have powers (e.g., ``\sin^2 x``).
* Fix problem with SVG handling of ``\liminf`` and ``\limsup`` where the second half of the function name was dropped.
* Fixed a problem where HTML-CSS and SVG output could leave partial equations in the DOM when the equation processing was interrupted to load a file.
* Fix problems with ``<mtable>``, ``<ms>``, and ``<mmultiscripts>`` which weren't handling styles.
* Make column widths and row heights take minsize into account in ``<mtable>``.
* Fix typo in ``handle-floats.js`` that caused it to not compile.
* Fix problem in HTML-CSS output with ``<msubsup>`` when super- or subscript has explicit style.


TeX emulation
=============

* Allow negative dimensions for ``\\[]`` but clip to 0 since this isn't really allowed in MathML.
* Fixed problem where \\ with whitespace followed by [ would incorrectly be interpretted as \\[dimen].
* Make ``jsMath2jax`` run before other preprocessors so that ``tex2jax`` won't grab environments from inside the jsMath spans and divs before jsMath2jax sees them.
* Fix issue with ``\vec`` not producing the correct character for ``\vec{\mathbf{B}}`` and similar constructs.
* Combine multiple primes into single unicode characters.
* Updated the unicode characters used for some accents and a few other characters to more appropriate choices.  See issues #116, #119, and #216 in the MathJax issue tracker on GitHub.
* Remove unwanted 'em' from ``eqnarray columnwidth`` values.
* Make eqnarray do equation numbering when numbering is enabled.
* Make vertical stretchy characters stand on the baseline, and improve spacing of some stretchy chars.
* Make ``mtextFontInherit`` use the style and weight indicated in the math, so that ``\textbf`` and ``\textit`` will work properly.
* Add ``\textcolor`` macro to the color extension.
* Added RGB color model to the color extension.
* Automatically load the AMSmath extension when needed by the ``mhchem`` extension.
* Add ``<<=>`` arrow to ``mhchecm`` extension
* Fix alignment of prescripts in ``mhchem`` to properly right-justify the scripts.
* Expose the CE object in the ``mhchem`` extension.
* Make ``autoload-all`` skip extensions that are already loaded, and not redefine user-defined macros.
* Fix most extensions to not overwrite user defined macros when the extension is loaded.
* Ignore ``\label{}`` with no label.
* Make ``\injlim`` and friends produce single ``<mi>`` elements for thier names rather than one for each letter.
* Handle primes followed by superscript as real TeX does in TeX input jax.
* Handle a few more negations (e.g., of arrows) to produce the proper Unicode points for these.
* Don't produce a processing error when ``\limits`` is used without a preceding operator.


MathML Handling
===============

* Prevent align attribute on ``<mtable>`` from applying to ``<mover>/<munder>/<munderover>`` elements.
* Ignore ``_moz-math-*`` attributes in MathML input so they don't appear in MathML output.
* Prevent duplicate ``xmlns`` attributes in "Show Math As -> MathML".
* Fixed a problem in MathML output where dimensions given to ``<mpadded>`` with leading +'s could lose the plus and become absolute rather than relative.
* Fix ``setTeXclass`` for ``TeXatom`` so that it handles the spacing for relations correctly.
* Add more CSS to isolate ``NativeMML`` output from page.
* Handle setup of MathPlayer better for IE10, and avoid some IE10 bugs in setting the document namespace for MathML.


Fonts
======

* Fix a problem where bold-script didn't work properly in STIX fonts.
* Work around Chrome bug with MathJax web fonts that affects some combining characters.
* Remove dependencies of TeX->MathML conversion on the choice of fonts (TeX versus STIX).
* For stretchy characters that don't have a single-character version in the MathJax fonts, make sure they are properly sized when not stretched or stretched to a small size.
* Fix an error with ``U+u005E`` (^) which caused it to show as a plus when used as a stretchy accent.
* Fix a problem with greek letters in STIX font producing the wrong letter (an offset was off by one).
* Handle more characters in sans-serif-italic and bold-italic STIX fonts.