.. _whats-new-2.3:

**************************
What's New in MathJax v2.3
**************************


MathJax v2.3 includes a number of new features, as well a more than 30 
important bug fixes.


Features:
=========

* *New webfonts:* MathJax v2.3 adds new webfonts for ``STIX``, ``Asana 
  Math``, ``Neo Euler``, ``Gyre Pagella``, ``Gyre Termes``, and 
  ``Latin Modern``.

* *Localization improvements:* MathJax has been accepted into 
  TranslateWiki.net. Thanks to the TWN community we could add
  12 complete and over 20 partial translations.

* *MathML improvements:* MathJax’s "Show Math as" menu will now expose
  the MathML annotation features. There are also two new preview
  options for the MathML input mode: ``mathml`` (now the default),
  which uses the original MathML as a preview, and ``altimage``, which
  uses the ``<math>`` element's ``altimg`` (if any) for the preview.

* *Miscellaneous improvements:* A new extension ``MatchWebFonts``
  improves the interaction with the surrounding content when that uses
  a webfont. A new configuration method allows configurations to be
  specified using a regular JavaScript variable ``window.MathJax``.
  
* MathJax is now available as a Bower package thanks to 
  community contributions.


TeX input:
==========

* Prevent the TeX pre-processor from rendering TeX in MathML
  annotation-xml elements.
  (`Issue #484 <https://github.com/mathjax/MathJax/issues/484>`_)
* Fix sizing issue in ``cases`` environment
  (`Issue #485 <https://github.com/mathjax/MathJax/issues/485>`_)


Fonts:
======

* Fix block-letter capital I (U+2111) appearing as J in MathJax font
  (`Issue #555 <https://github.com/mathjax/MathJax/issues/555>`_)


MathML:
=======

* Improved workarounds for MathML output on WebKit 
  (`Issue #482 <https://github.com/mathjax/MathJax/issues/482>`_)
* Handle empty ``multiscript``, ``mlabeledtr``, and other nodes in Native MathML output
  (`Issue #486 <https://github.com/mathjax/MathJax/issues/486>`_)
* Replace non-standard ``MJX-arrow`` class by new ``menclose`` notation
  (`Issue #481 <https://github.com/mathjax/MathJax/issues/481>`_)
* Fix incorrect widths in Firefox MathML output
  (`Issue #558 <https://github.com/mathjax/MathJax/issues/558>`_)
* Fix display math not being centered in XHTML
  (`Issue #650 <https://github.com/mathjax/MathJax/issues/650>`_)
* Fix problem when LaTeX code appears in ``annotation`` node
  (`Issue #484 <https://github.com/mathjax/MathJax/issues/484>`_)


HTML-CSS/SVG output
===================

* Fix MathJax not rendering in Chrome when sessionStorage is disabled
  (`Issue #584 <https://github.com/mathjax/MathJax/issues/584>`_)
* Fix ``\mathchoice`` error with linebreaking in SVG output
  (`Issue #604 <https://github.com/mathjax/MathJax/issues/604>`_)
* Fix poor linebreaking of "flat" MathML with unmatched parentheses
  (`Issue #523 <https://github.com/mathjax/MathJax/issues/523>`_)


Interface:
==========

* Fix Double-Click zoom trigger 
  (`Issue #590 <https://github.com/mathjax/MathJax/issues/590>`_)

Miscellaneous:
==============

* Localization: improved fallbacks for IETF tags
  (`Issue #492 <https://github.com/mathjax/MathJax/issues/492>`_)
* Localization: support RTL in messages
  (`Issue #627 <https://github.com/mathjax/MathJax/issues/627>`_)
* Improve PNG compression
  (`Issue #44 <https://github.com/mathjax/MathJax/issues/44>`_)
