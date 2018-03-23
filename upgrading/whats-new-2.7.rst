.. _whats-new-2.7:

**************************
What's New in MathJax v2.7
**************************

MathJax v2.7 is primarily a bug-fix release with over 60 important bug
fixes, in particular to the CommonHTML output. In addition, this
release adds several new features as an opt-in. The following are some
of the highlights.

Features
--------

* *Common HTML output improvements* Several important bugs in the
  layout model have been fixed, in particular tabular layout is now
  much more robust.
* *Accessibility improvements.* After the completion of the MathJax
  Accessibility Extensions, we are integrating the opt-in for the
  MathJax menu into the core distribution. We are grateful to the web
  accessibility community for their guidance, support, and feedback in
  our efforts towards making MathJax completely accessible to all
  users. This allows end-users to opt into the following features via
  the MathJax Menu:

  * *Responsive Equations.* An innovative responsive rendering of
    mathematical content through collapsing and exploration of
    subexpressions.
  * *Universal aural Rendering.* An aural rendering tool providing
    on-the-fly speech-text for mathematical content and its
    subexpressions using various rule sets.
  * *Full Exploration.* A fully accessible exploration tool, allowing
    for meaningful exploration of mathematical content including
    multiple highlighting features and synchronized aural rendering.
  * For more information check the `release announcement
    <https://www.mathjax.org/mathjax-accessibility-extensions-v1-now-available/>`__
    and the dedicated repository at `mathjax/mathjax-a11y
    <https://github.com/mathjax/MathJax-a11y>`__.

For a detailed listing please check the `release milestone <https://github.com/mathjax/MathJax/milestone/14?closed=1>`__.


Accessibility
-------------

* `mathajx-dev/#20 <https://github.com/mathjax/MathJax-dev/issues/20>`__ Add the Menu extension from the `MathJax Accessibility tools <https://github.com/mathjax/MathJax-a11y>`__ to all combined configuration files.
* `#1465 <https://github.com/mathjax/MathJax/issues/1465>`__ CHTML and HTML-CSS output: do not add ``role=math`` by default.
* `#1483 <https://github.com/mathjax/MathJax/issues/1483>`__ Catch IE8 errors with inserting MathML from AssistiveMML extension.
* `#1513 <https://github.com/mathjax/MathJax/issues/1513>`__ Disable the AssistiveMML extension when the output renderer is PlainSource.

Interface
---------

* `#1463 <https://github.com/mathjax/MathJax/issues/1463>`__ Reset message strings for ``messageStyle=simple`` for each typeset.
* `#1556 <https://github.com/mathjax/MathJax/issues/1556>`__ Improve menu placement.
* `#1627 <https://github.com/mathjax/MathJax/issues/1627>`__ Add Accessibility submenu.

HTML/SVG/nativeMML display
------------------------------

* `#1454 <https://github.com/mathjax/MathJax/issues/1454>`__ SVG output: Use full location URL for ``xlink`` references in SVG ``<use>`` elements.
* `#1457 <https://github.com/mathjax/MathJax/issues/1457>`__ Common-HTML output: Fix problem with characters from Unicode Plane 1 not being mapped to the MathJax fonts properly
* `#1458 <https://github.com/mathjax/MathJax/issues/1458>`__ SVG output: Fix problem with container width when math is scaled.
* `#1459 <https://github.com/mathjax/MathJax/issues/1459>`__ CommonHTML output: Improve ``getNode()`` to fix processing errors when line-breaking.
* `#1460 <https://github.com/mathjax/MathJax/issues/1460>`__ HTML-CSS output: Adjust position of rule for square root when it is made via ``createRule()``.
* `#1461 <https://github.com/mathjax/MathJax/issues/1461>`__ HTML-CSS output: Make sure ``0`` remains ``0`` when rounding to pixels (plus a bit).
* `#1462 <https://github.com/mathjax/MathJax/issues/1462>`__ CommonHTML output: Bubble percentage widths up while line breaking.
* `#1475 <https://github.com/mathjax/MathJax/issues/1475>`__ PreviewHTML: Avoid error when ``\overset`` or ``\underset`` is empty.
* `#1479 <https://github.com/mathjax/MathJax/issues/1479>`__ All outputs: Properly determine (shrink-wrapping) container widths.
* `#1503 <https://github.com/mathjax/MathJax/issues/1503>`__ CommonHTML output: Handle adjusting table cell heights properly.
* `#1507 <https://github.com/mathjax/MathJax/issues/1507>`__ SVG output: Remove invalid ``src`` attribute from ``<mglyph>`` output.
* `#1510 <https://github.com/mathjax/MathJax/issues/1510>`__ CommonHTML output: Prevent CSS bleed-through for box-sizing.
* `#1512 <https://github.com/mathjax/MathJax/issues/1512>`__ CommonHTML output: make ``<mglyph>`` scale image size by hand.
* `#1530 <https://github.com/mathjax/MathJax/issues/1530>`__ All outputs: Fix problem with Safari inserting line breaks before in-line math.
* `#1533 <https://github.com/mathjax/MathJax/issues/1533>`__ CommonHTML output: improve aligning labels with their table rows.
* `#1534 <https://github.com/mathjax/MathJax/issues/1534>`__ CommonHTML output: ensure output stays a table-cell when focused.
* `#1538 <https://github.com/mathjax/MathJax/issues/1538>`__ All outputs: Don't let preview width interfere with the determination of the container width.
* `#1542 <https://github.com/mathjax/MathJax/issues/1542>`__ CommonHTML output: improve stretching ``<mover>`` in ``<mtd>`` elements.
* `#1547 <https://github.com/mathjax/MathJax/issues/1547>`__ HTML-CSS output: improve line breaks within fractions.
* `#1549 <https://github.com/mathjax/MathJax/issues/1549>`__ All outputs: Improve determination of line-breaking parent element.
* `#1550 <https://github.com/mathjax/MathJax/issues/1550>`__ CommonHTML output: Improve vector arrow positioning.
* `#1552 <https://github.com/mathjax/MathJax/issues/1552>`__ All outputs: Handle ``href`` correctly when line breaking.
* `#1574 <https://github.com/mathjax/MathJax/issues/1574>`__ HTML-CSS and SVG output: Use ``currentColor`` for ``menclose`` with no ``mathcolor``.
* `#1595 <https://github.com/mathjax/MathJax/issues/1595>`__ CommonHTML output: Properly scale elements with ``font-family`` specified.

TeX emulation
-------------

* `#1455 <https://github.com/mathjax/MathJax/issues/1455>`__ Fix ``TeX.Environment()`` to use the correct end environment.
* `#1464 <https://github.com/mathjax/MathJax/issues/1464>`__ Make sure ``resetEquationNumbers`` is always defined.
* `#1484 <https://github.com/mathjax/MathJax/issues/1484>`__ Mark accented operators as not having movable limits.
* `#1485 <https://github.com/mathjax/MathJax/issues/1485>`__ Allow line breaks within ``TeXAtom`` elements
* `#1508 <https://github.com/mathjax/MathJax/issues/1508>`__ Surround ``\middle`` with ``OPEN`` and ``CLOSE`` TeXAtoms to match TeX spacing
* `#1509 <https://github.com/mathjax/MathJax/issues/1509>`__ Make delimiters (in particular arrows) symmetric for ``\left`` and ``\right``.
* `#1514 <https://github.com/mathjax/MathJax/issues/1514>`__ Don't unwrap rows when creating fenced elements.
* `#1523 <https://github.com/mathjax/MathJax/issues/1523>`__ Don't copy environment into ``array`` environments.
* `#1537 <https://github.com/mathjax/MathJax/issues/1537>`__ mhchem: add config parameter to select mhchem v3.0.
* `#1596 <https://github.com/mathjax/MathJax/issues/1596>`__ Prevent ``\require{mhchem}`` to override one already loaded.
* `#1551 <https://github.com/mathjax/MathJax/issues/1551>`__ Allow ``<wbr>`` in TeX code.
* `#1565 <https://github.com/mathjax/MathJax/issues/1565>`__ Handle ``\+SPACE`` in macro definitions.
* `#1569 <https://github.com/mathjax/MathJax/issues/1569>`__ Treat control sequences as a unit when matching a macro template.
* `#1587 <https://github.com/mathjax/MathJax/issues/1587>`__ Make sure ``trimSpaces()`` doesn't remove tailing space in ``\+SPACE``.
* `#1602 <https://github.com/mathjax/MathJax/issues/>`__ Handle ``\ref`` properly when there is a ``<base>`` tag.


Asciimath
---------

* `asciimath/f649ba4 <https://github.com/asciimath/asciimathml/commit/f649ba49f639b7e5322d6552193226c03e88ba7e>`__ Add ``newsymbol`` command for adding a new symbol object


MathML
------

* `#1505 <https://github.com/mathjax/MathJax/issues/1505>`__ Handle ``rowlines=""`` and ``rowlines=" "`` like ``rowlines="none"``.
* `#1511 <https://github.com/mathjax/MathJax/issues/1511>`__ Don't convert attribute to boolean unless the default is a boolean.
* `#1526 <https://github.com/mathjax/MathJax/issues/1526>`__ Make minus in ``<mn>`` produce ``U+2212`` rather than ``U+002D``.
* `#1567 <https://github.com/mathjax/MathJax/issues/1567>`__ Fix spacing for initial fraction in exponent position.

Fonts
-----

* `#1521 <https://github.com/mathjax/MathJax/issues/1521>`__ STIX fonts: Make left arrow use combining left arrow for accents.
* `#1092 <https://github.com/mathjax/MathJax/issues/1092>`__ STIX fonts: Make ``U+222B`` (integral) stretchy.
* `#1154 <https://github.com/mathjax/MathJax/issues/1154>`__ STIX fonts: Remap ``|`` to variant form (with descender) and map variant to original form.
* `#1175 <https://github.com/mathjax/MathJax/issues/1175>`__ Use ``U+007C`` and ``U+2016`` for delimiters rather than ``U+2223`` and ``U+2225``.
* `#1421 <https://github.com/mathjax/MathJax/issues/1421>`__ MathJax TeX fonts: Fix SVG font data for stretchy characters.
* `#1418 <https://github.com/mathjax/MathJax/issues/1418>`__ Alias ``U+2206`` to ``U+0394`` and remove incorrect ``U+2206`` from SVG font files.
* `#1187 <https://github.com/mathjax/MathJax/issues/1187>`__ Make height and depth of minus match that of plus (needed for TeX-layout super/subscript algorithm to work properly), and adjust for that when it is used as an extender in stretchy characters.
* `#1546 <https://github.com/mathjax/MathJax/issues/1546>`__ MathJax TeX fonts: Add stretchy data for ``U+20D7``.



Localization
------------

* `#1604 <https://github.com/mathjax/MathJax/issues/1604>`__ Updated locales thanks to the contributors at Translatewiki.net; activate locale for Zazaki.

APIs
-----

* `#1504 <https://github.com/mathjax/MathJax/issues/1504>`__ Make ``getJaxForMath()`` work even during chunking.
* `#1522 <https://github.com/mathjax/MathJax/issues/1522>`__ Add Third Party Extensions Repository to the Ajax paths as ``[Contrib]``.
* `#1525 <https://github.com/mathjax/MathJax/issues/1525>`__ Allow MathJax root to be configured.

Misc.
-----

* `#1456 <https://github.com/mathjax/MathJax/issues/1456>`__ Prevent removal of DOM elements while MathJax is running from stopping processing, or to leaving duplicate math in place.
* `#1524 <https://github.com/mathjax/MathJax/issues/1524>`__ Prevent pre-processors from adding duplicate preview elements.
* `#1554 <https://github.com/mathjax/MathJax/issues/1554>`__ Safe extension: Add filtering of CSS styles like ``padding``, ``margin``.
* `#1590 <https://github.com/mathjax/MathJax/issues/1590>`__ Set previews to have ``display:none``.
* `#1591 <https://github.com/mathjax/MathJax/issues/1591>`__ Change ``rev=`` to ``V=`` in cache breaking code.

