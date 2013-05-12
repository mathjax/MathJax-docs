.. _whats-new-2.2:

**************************
What's New in MathJax v2.2
**************************

MathJax v2.2 includes a number of new features, as well a more than 40
important bug fixes.


Features:
=========

* Localization of MathJax user interface.  (German and French
  translations currently available in addition to English.)

* Commutative diagrams via the ``AMScd`` extension.

* New Safe-mode extension that allows you to restrict potentially
  dangerous features of MathJax when it is used in a shared
  environment (e.g., href to javascript, styles and classes, etc.)

* Improve MathML rendering for ``mfenced`` and ``mlabeldtr`` elements in
  browsers that don't support them well.

* Experimental Content MathML support.


TeX input:
==========

* Avoid potential infinite loops in ``\mathchoice`` constructs.
  (`Issue #373 <https://github.com/mathjax/MathJax/issues/373>`_)

* Add error message when an evironment closes with unbalanced braces.
  (`Issue #454 <https://github.com/mathjax/MathJax/issues/454>`_)

* Allow spaces in the RGB, rgb, and greyscale color specifications.
  (`Issue #446 <https://github.com/mathjax/MathJax/issues/446>`_)

* Process ``\$`` in ``\text`` arguements.  (ssue #349)

* Preserve spaces within ``\verb`` arguments.  (`Issue #381 <https://github.com/mathjax/MathJax/issues/381>`_)

* Make ``\smallfrown`` and ``\smallsmile`` come from the variant font so
  they have the correct size.  (`Issue #436 <https://github.com/mathjax/MathJax/issues/436>`_)

* Make the input TeX jax generate mrow plus mo elements rather than
  mfenced elements (for better compatibility with native MathML
  implementations).

* Make ``\big`` and its relatives use script or scriptscript fonts
  (although size is still absolute, as it is in TeX) so that it
  balances the text weight in scripts.  (`Issue #350 <https://github.com/mathjax/MathJax/issues/350>`_)

* Convert true and false attributes to booleans in ``\mmlToken``.
  (`Issue #451 <https://github.com/mathjax/MathJax/issues/451>`_)


AsciiMath:
==========

* Rename AsciiMath config option from ``decimal`` to ``decimalsign``.
  (`Issue #384 <https://github.com/mathjax/MathJax/issues/384>`_)


Fonts:
======

* Add Greek Delta to SVG fonts. (`Issue #347 <https://github.com/mathjax/MathJax/issues/347>`_)

* Fix monospace space character to be the same width as the other
  monospace characters.  (`Issue #380 <https://github.com/mathjax/MathJax/issues/380>`_)

* Better handling of unknown or invalid values for mathvariant or
  values not supported by generic fonts.


MathML:
=======

* Handle empty child nodes better.

* Improved MathML rendering for ``mfenced`` and ``mlabeldtr`` elements.

* Ignore ``linebreak`` attribute on ``mspace`` when dimensional attributes are
  set. (`Issue #388 <https://github.com/mathjax/MathJax/issues/388>`_)

* Implement ``rowspacing``/``columnspacing`` for ``mtable`` in native MathML
  output in Firefox using cell padding.


HTML-CSS/SVG output
===================

* Allow ``\color`` to override link color in SVG output.  (`Issue #427
  <https://github.com/mathjax/MathJax/issues/427>`_)

* Add min-width to displayed equations with labels so that they cause
  their containers to have non-zero width (like when they are in a
  table cell or an absolutlye positioned element).  (`Issue #428 <https://github.com/mathjax/MathJax/issues/428>`_)

* Fix a processing error with elements that contain hyperlinks.
  (`Issue #364 <https://github.com/mathjax/MathJax/issues/364>`_)

* Try to isolate MathJax from CSS transitions.  (`Issue #449 <https://github.com/mathjax/MathJax/issues/449>`_)

* Go back to using em's (rounded to nearest pixel) for Chrome.
  Rounding makes the placement work more reliably, while still being
  in relative units.  (`Issue #443 <https://github.com/mathjax/MathJax/issues/443>`_)

* Prevent error when math contains characters outside of the MathJax
  fonts.  (`Issue #441 <https://github.com/mathjax/MathJax/issues/441>`_)

* Make final math size be in relative units so that it prints even if
  print media has a different font size.  (`Issue #386 <https://github.com/mathjax/MathJax/issues/386>`_)

* Don't scale line thickness for ``menclose`` elements (so lines won't
  disapear in scripts).  (`Issue #414 <https://github.com/mathjax/MathJax/issues/414>`_)

* Fix ``fontdata.js`` to allow it to be included in combined configuration
  files.  (`Issue #413 <https://github.com/mathjax/MathJax/issues/413>`_)

* Makes math-based tooltips be spaced properly when rendered.  (`Issue
  #412 <https://github.com/mathjax/MathJax/issues/412>`_)

* Fix Math Processing Error when ``&ApplyFunction``; is used without
  preceeding content.  (`Issue #410 <https://github.com/mathjax/MathJax/issues/410>`_)

* Fix a problem using an empty table as a super- or subscript.
  (`Issue #392 <https://github.com/mathjax/MathJax/issues/392>`_)

* Handle the case where selection in maction is invalid or out of
  range.  (`Issue #365 <https://github.com/mathjax/MathJax/issues/365>`_)

* Add a pixel extra around the SVG output to accommodate antialiasing
  pixels.  (`Issue #383 <https://github.com/mathjax/MathJax/issues/383>`_)

* Fix Math Processing Error for ``msubsup``/``msub``/``msup`` elements.

* Limit the number of repetition to build stretchy chars in HTML-CSS.
  (`Issue #366 <https://github.com/mathjax/MathJax/issues/366>`_)

* Fix Math Processing Error in ``mmultiscripts``/``menclose``. (`Issue
  362) <https://github.com/mathjax/MathJax/issues/62)>`_


Interface:
==========

* Make zoom work properly with expressions that have full width (e.g.,
  tagged equations).

* Handle zooming when it is inside a scrollable element when it is not
  the main body element.  (`Issue #435 <https://github.com/mathjax/MathJax/issues/435>`_)

* Update math processing errors to include original format and actual
  error message in the "Show Math As" menu.  (`Issue #450 <https://github.com/mathjax/MathJax/issues/450>`_)

* Add a Help dialog box (rather than link to mathjax.org).

* Remove the v1.0 configuration warning.  (`Issue #445 <https://github.com/mathjax/MathJax/issues/445>`_)

* Trap errors while saving cookies (and go on silently).  (`Issue #374
  <https://github.com/mathjax/MathJax/issues/374>`_)

* Fix typo in IE warning message.  (`Issue #397 <https://github.com/mathjax/MathJax/issues/397>`_)

* Use UA string sniffing for identifying Firefox and handle detecting
  mobile versions better.

* Make MathML source show non-BMP characters properly.  (`Issue #361 <https://github.com/mathjax/MathJax/issues/361>`_)

* Make tool tips appear above zoom boxes.  (`Issue #351 <https://github.com/mathjax/MathJax/issues/351>`_)


Miscellaneous:
==============

* Allow preview for preprocessors to be just a plain string (rather
  than requiring ``[string]``).

* Remap back-tick to back-quote.  (`Issue #402 <https://github.com/mathjax/MathJax/issues/402>`_)

* Handle script tags in ``HTML.Element()`` so they work in IE.
  (`Issue #342 <https://github.com/mathjax/MathJax/issues/342>`_)

* Add the ``MathJax_Preview`` class to the ``ignoreClass`` list so that
  ``tex2jax`` and ``asciimath2jax`` won't process previews accidentally.
  (`Issue #378 <https://github.com/mathjax/MathJax/issues/378>`_)

* Fix processing errors with various table and menclose attributes.
  (`Issue #367 <https://github.com/mathjax/MathJax/issues/367>`_)

* Use ``hasOwnProperty()`` when checking file specification objects
  (prevents problems when ``Object.prototype`` has been modified).
  (`Issue #352 <https://github.com/mathjax/MathJax/issues/352>`_)
