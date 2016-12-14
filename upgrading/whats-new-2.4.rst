.. _whats-new-2.4:

**************************
What's New in MathJax v2.4
**************************



MathJax v2.4 is primarily a bug fix release. Over 80 display bugs,
line-breaking problems, and interface issues have been resolved; for a
detailed listing please check the `release
milestone <https://github.com/mathjax/MathJax/issues?milestone=2&state=closed>`__.
The following are some of the highlights.

Security
========

-  `#256 <https://github.com/mathjax/MathJax/issues/256>`__ Enable
   Content Security Policy compatibility.

Interface
=========

-  `#240 <https://github.com/mathjax/MathJax/issues/240>`__ prevent two
   identical uses of ``\tag`` to cause identical element id.
-  `#348 <https://github.com/mathjax/MathJax/issues/348>`__ fix
   ``Show Math as`` window crashing in IE8.
-  `#559 <https://github.com/mathjax/MathJax/issues/559>`__ remove user
   cookie configuration.
-  `#821 <https://github.com/mathjax/MathJax/issues/821>`__ resolve 
   cookie-related error in sandboxed iframes on Chrome.
-  `#623 <https://github.com/mathjax/MathJax/issues/623>`__ fix
   localization on IE6--8.
-  `#685 <https://github.com/mathjax/MathJax/issues/685>`__ fix MathMenu
   and MathZoom extensions loading when ``showMathMenu`` set to false.
-  `#734 <https://github.com/mathjax/MathJax/issues/734>`__ compress
   menu PNGs.
-  `#814 <https://github.com/mathjax/MathJax/issues/814>`__ add
   TeX/Asciimath as annotation-xml to MathML output.

Line-breaking
=============

-  `#617 <https://github.com/mathjax/MathJax/issues/617>`__ add
   linebreaking support for ``mmultiscript`` elements.
-  `#687 <https://github.com/mathjax/MathJax/issues/687>`__ fix forced
   line breaking aligning badly.
-  `#707 <https://github.com/mathjax/MathJax/issues/707>`__ fix ignored
   line breaks between two ``mtext`` elements.

HTML-CSS/SVG/nativeMML display
==============================

-  `#387 <https://github.com/mathjax/MathJax/issues/387>`__ fix missing
   styling for ``merror`` in SVG output.
-  `#391 <https://github.com/mathjax/MathJax/issues/391>`__ fix
   linebreaking within fractions in SVG output.
-  `#423 <https://github.com/mathjax/MathJax/issues/423>`__,
   `#460 <https://github.com/mathjax/MathJax/issues/460>`__,
   `#749 <https://github.com/mathjax/MathJax/issues/749>`__,
   `#824 <https://github.com/mathjax/MathJax/issues/824>`__ Zoom
   improvements: fix zoom box overflow in mobile Safari, fix zoom box
   for widths in ``px``, fix zoom box overlay in Chrome.
-  `#470 <https://github.com/mathjax/MathJax/issues/470>`__ fix AMScd
   rendering in native MathML output.
-  `#473 <https://github.com/mathjax/MathJax/issues/473>`__ override
   ``text-ident`` of enclosing paragraph.
-  `#476 <https://github.com/mathjax/MathJax/issues/476>`__ improve big
   /Downarrows.
-  `#580 <https://github.com/mathjax/MathJax/issues/580>`__ prevent CSS
   from overriding MathJax's em/ex detection.
-  `#619 <https://github.com/mathjax/MathJax/issues/619>`__ fix:
   vertical stretching arrows in table cells can cause extra space
   between rows.
-  `#699 <https://github.com/mathjax/MathJax/issues/699>`__ fix table
   column spacing in NativeMathML output on Firefox.
-  `#701 <https://github.com/mathjax/MathJax/issues/701>`__ fix clipping
   of stretched delimiters in HTML-CSS output.
-  `#703 <https://github.com/mathjax/MathJax/issues/703>`__ fix math
   axis not scaled in script sizes.
-  `#715 <https://github.com/mathjax/MathJax/issues/715>`__ fix hat
   ``^`` too large with local STIX fonts in HTML-CSS.
-  `#744 <https://github.com/mathjax/MathJax/issues/744>`__ improve root
   symbol rendering in ever-changing but always buggy Chrome.
-  `#770 <https://github.com/mathjax/MathJax/issues/770>`__ add support
   for dotted borders to SVG output.
-  `#820 <https://github.com/mathjax/MathJax/issues/820>`__ fix integral
   overlapping with superscript using STIX fonts.
-  `#813 <https://github.com/mathjax/MathJax/issues/813>`__ remove
   some redundant fixes for Native MML on Firefox 29+.

TeX emulation
=============

-  `#367 <https://github.com/mathjax/MathJax/issues/376>`__ prevent
   ``\mmltoken`` from creating ``annotation`` elements.
-  `#377 <https://github.com/mathjax/MathJax/issues/377>`__ improve
   ``&nbsp;`` handling.
-  `#389 <https://github.com/mathjax/MathJax/issues/389>`__ fix
   operating spacing in ``\split`` and ``\multiline`` environments.
-  `#477 <https://github.com/mathjax/MathJax/issues/477>`__,
   `#459 <https://github.com/mathjax/MathJax/issues/459>`__ add
   ``\textsf`` and ``\texttt`` macros and enable ``mtextInheritFont``
   for them.
-  `#547 <https://github.com/mathjax/MathJax/issues/547>`__ fix
   misalignment in nested fractions in HTML-CSS and SVG output.
-  `#624 <https://github.com/mathjax/MathJax/issues/624>`__ fix AMScd on
   IE6--7.
-  `#632 <https://github.com/mathjax/MathJax/issues/632>`__ fix ``\Big``
   not accepting delimiters in braces
-  `#667 <https://github.com/mathjax/MathJax/issues/667>`__ fix loop in
   ``bbox``.
-  `#691 <https://github.com/mathjax/MathJax/issues/691>`__ enable
   multiple ``\label`` in multiline environments like ``align``,
   ``eqnarray``, and ``gather``.
-  `#719 <https://github.com/mathjax/MathJax/issues/719>`__ empty array
   lines should get correct height.
-  `#739 <https://github.com/mathjax/MathJax/issues/739>`__ fix
   ``\operatorname*`` and ``\DeclareMathOperator*``.
-  `#746 <https://github.com/mathjax/MathJax/issues/746>`__ fix spacing
   for ``\left ... \right``.
-  `#793 <https://github.com/mathjax/MathJax/issues/793>`__ allow
   unmatched groups in ``\begin`` \\end\` substitutions.
-  `#794 <https://github.com/mathjax/MathJax/issues/794>`__ fix spacing
   for ``\bmod``.

Asciimath
=========

-  `#353 <https://github.com/mathjax/MathJax/issues/353>`__ add option
   for TeX-like ``\phi`` and ``\varphii`` behavior.
-  `#743 <https://github.com/mathjax/MathJax/issues/743>`__ add
   ``mmlSpacing`` option and set to true.
-  `#747 <https://github.com/mathjax/MathJax/issues/747>`__ fix
   processing error with invisible grouping.

MathML Handling
===============

-  `#328 <https://github.com/mathjax/MathJax/issues/328>`__ remove
   ``_moz-*``-attributes and improve MathML processing in Firefox.
-  `#460 <https://github.com/mathjax/MathJax/issues/469>`__ fix default
   value of ``mo@symmetric``.
-  `#478 <https://github.com/mathjax/MathJax/issues/478>`__ make
   ``mfenced`` element equivalent to its expanded form
-  `#561 <https://github.com/mathjax/MathJax/issues/561>`__ implement
   ``menclose`` notation ``phaseorangle``.
-  `#578 <https://github.com/mathjax/MathJax/issues/578>`__ fix quote
   attributes for ``ms`` elements.
-  `#614 <https://github.com/mathjax/MathJax/issues/614>`__ handle
   nested ``math`` elements better.
-  `#684 <https://github.com/mathjax/MathJax/issues/684>`__ fix handling
   of double primes in superscripts.
-  `#691 <https://github.com/mathjax/MathJax/issues/696>`__,
   `#692 <https://github.com/mathjax/MathJax/issues/692>`__, update
   Content MathML extension: fix IE11, plus with leading negative
   number.
-  `#763 <https://github.com/mathjax/MathJax/issues/763>`__ fix
   ``mglyph`` elements rendering too small.

Fonts
=====

-  `#501 <https://github.com/mathjax/MathJax/issues/501>`__ add
   workaround for broken Fedora STIX fonts configuration.
-  `#517 <https://github.com/mathjax/MathJax/issues/517>`__ reset
   min/max width for MathJax font test.
-  `#576 <https://github.com/mathjax/MathJax/issues/576>`__ improve font
   matching.
-  `#615 <https://github.com/mathjax/MathJax/issues/615>`__ check
   validity of font names.
-  `#681 <https://github.com/mathjax/MathJax/issues/681>`__ fix MathJax
   font test breaking responsive layout.
-  `#711 <https://github.com/mathjax/MathJax/issues/711>`__ detect new
   webfonts when locally installed.
-  `#697 <https://github.com/mathjax/MathJax/issues/697>`__ fix
   bold-italic for new webfonts.

Localization
============

-  `#753 <https://github.com/mathjax/MathJax/issues/753>`__ update
   locales from translatewiki.net; add Vietnamese, Asturia, Polish,
   Catalan, Czech, Kannada locales.
-  `#777 <https://github.com/mathjax/MathJax/issues/777>`__ fix menu
   orientation for RTL languages.

Misc.
=====

-  `#586 <https://github.com/mathjax/MathJax/issues/586>`__ add all
   input processors to ``default.js``.
-  `#658 <https://github.com/mathjax/MathJax/issues/658>`__ fix IE 11
   recognized as Firefox.
-  `#730 <https://github.com/mathjax/MathJax/issues/730>`__ ignore
   rendering targets that have been removed from document.
-  `#735 <https://github.com/mathjax/MathJax/issues/735>`__ work around
   webfont bug in Chrome 32+.
-  `#738 <https://github.com/mathjax/MathJax/issues/738>`__ improve
   workaround for fixed position bug in old IE versions.
-  `#737 <https://github.com/mathjax/MathJax/issues/737>`__ add
   third-party path variable (for centralized custom extension hosting).
