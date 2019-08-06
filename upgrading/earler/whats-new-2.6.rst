.. _whats-new-2.6:

**************************
What's New in MathJax v2.6
**************************

MathJax v2.6 includes a number of new features, as well a more than 30 important bug fixes. The following are some of the highlights.

Features
--------

* *Improved CommonHTML output.* The CommonHTML output now provides the same layout quality and MathML support as the HTML-CSS and SVG output. It is on average 40% faster than the other outputs and the markup it produces are identical on all browsers and thus can also be pre-generated on the server via MathJax-node. The fast preview mechanism introduced in v2.5 continues to develop as a separate output as `PreviewHTML` and the `fast-preview` extension.
* *Accessibility improvements.* We thank the AT community for their guidance, support, and feedback in our efforts towards making MathJax completely accessible to all users.

  * *Screenreader compatibility.* The new ``AssistiveMML`` extension enables compatibility with most MathML-capable screenreaders by inserting visually-hidden MathML alongside MathJax's visual output. See `screenreader support` for details on the expected behavior as well as background on the limitations due to lack of web standards and browser/OS technology.
  * *Accesssible UI.* We have improved the accessibility of the MathJax menu to enable assistive technology users to easily access its features, cf. `MathJax UI`.
* *PlainSource Output.* The new PlainSource output will revert the rendering back to the input format; in the case of MathML, the output will prefer TeX and AsciiMath from ``<annotation-xml>`` elements. This helps with accessibility and copy&paste of document fragments.
* *Semi-slim MathJax repository for bower*. You can now use ``bower install components/MathJax`` to install a fork of MathJax without PNG fonts. **Many thanks** to `@minrk <https://github.com/minrk>`__ from the IPython/Jupyter team and to the team at `components <https://github.com/components>`__!
* *MathJax via npm*. You can now use ``npm install mathjax`` to install a copy of MathJax without PNG fonts.
* *Deprecated: MMLorHTML extension.* We have deprecated the ``MMLorHTML`` extension. For a detailed guide on configuring MathJax to choose different outputs on different browsers, please see `Automatic Selection of the Output Processor` for more information.

Numerous bugs and issues have also been resolved; for a detailed listing please check the `release milestone <https://github.com/mathjax/MathJax/issues?q=milestone%3A%22MathJax+v2.6%22+is%3Aclosed>`__.


Interface
---------

*   `#938 <https://github.com/mathjax/MathJax/issues/938>`__ Expose MathML for accessibility; cf. `screenreader support`.
*   `#939 <https://github.com/mathjax/MathJax/issues/939>`__ Make MathJax contextual menu properly accessible.
*   `#1088 <https://github.com/mathjax/MathJax/issues/1088>`__  MathJax Menu: drop PNG images in menu.
*   `#1210 <https://github.com/mathjax/MathJax/issues/1210>`__  Update ``MathZoom.js``: global border-box support. **Special thanks** to `@CalebKester <https://github.com/CalebKester>`__
*   `#1273 <https://github.com/mathjax/MathJax/issues/1273>`__  Improve handling of hash in URL.


HTML/SVG/nativeMML display
------------------------------

*   `#1095 <https://github.com/mathjax/MathJax/issues/1095>`__ HTML-CSS output: prevent collapse of table borders.
*   `#596 <https://github.com/mathjax/MathJax/issues/596>`__ SVG Output: Fix overlapping equation labels in SVG output
*   `#994 <https://github.com/mathjax/MathJax/issues/994>`__ SVG Output: Change default ``blacker`` setting to `1`.
*   `#995 <https://github.com/mathjax/MathJax/issues/995>`__ SVG output: fix baseline alignment issues.
*   `#995 <https://github.com/mathjax/MathJax/issues/995>`__ SVG output: fix failure to scale all but the first glyph in a fraction when ``useFontCache=false``.
*   `#1035  <https://github.com/mathjax/MathJax/issues/1035>`__ PreviewHTML output: fix fractions formatting in WebKit and IE.
*   `#1233  <https://github.com/mathjax/MathJax/issues/1233>`__ SVG output: make maligngroup and malignmark produce no output.
*   `#1282  <https://github.com/mathjax/MathJax/issues/1282>`__ HTML-CSS output: reduce "bumpiness" of focus outline.
*   `#1314  <https://github.com/mathjax/MathJax/issues/1314>`__ HTML-CSS output: prevent clipping of extremely long strings.
*   `#1316  <https://github.com/mathjax/MathJax/issues/1316>`__ SVG output: preserve non-breaking space in ``mtext`` elements.
*   `#1332  <https://github.com/mathjax/MathJax/issues/1332>`__ HTML-CSS output: fix width calculations for mrows with embellished operators  that could stretch but don't actually.

TeX emulation
-------------

*   `#567 <https://github.com/mathjax/MathJax/issues/567>`__ Add macro for ``overparen`` and ``underparen`` to provide stretchy arcs above/below
*   `#956 <https://github.com/mathjax/MathJax/issues/956>`__ Simplify the ``mhchem`` extension to use multiscripts, cf. #1072.
*   `#1028 <https://github.com/mathjax/MathJax/issues/1028>`__ Fix spacing in ``\alignedat``.
*   `#1194 <https://github.com/mathjax/MathJax/issues/1194>`__ Fix problem where automatic numbering affects ``\binom`` and friends.
*   `#1199 <https://github.com/mathjax/MathJax/issues/1199>`__ Fix problem with dot delimiter not being recognized as a delimiter.
*   `#1224 <https://github.com/mathjax/MathJax/issues/1224>`__ Handle braces properly in text mode when looking for matching math delimiters.
*   `#1225 <https://github.com/mathjax/MathJax/issues/1225>`__ Fix ``\operatorname`` not ignoring ``\limits`` that follow immediately after.
*   `#1229 <https://github.com/mathjax/MathJax/issues/1229>`__ Fix wrong spacing of trailing binary operators.
*   `#1272 <https://github.com/mathjax/MathJax/issues/1272>`__ Fix spacing of ``\eqnarray`` environment.
*   `#1295 <https://github.com/mathjax/MathJax/issues/1295>`__ Handle ``scriptlevel`` set on arrays via an ``mstyle`` node (affects ``\smallmatrix``).
*   `#1312 <https://github.com/mathjax/MathJax/issues/1312>`__ Improve heuristics for adding U+2061 (invisible function application).

Asciimath
---------

* `asciimath/#31 <https://github.com/asciimath/asciimathml/issues/31>`__ Add support for ``overparen``, ``underparen`` to produce ``mover`` and ``munder`` constructs.
* `asciimath/#35 <https://github.com/asciimath/asciimathml/issues/35>`__ Add support for ``bowtie``, ``ltimes`` and ``rtimes``.
* `asciimath/#40 <https://github.com/asciimath/asciimathml/issues/40>`__ Improve parsing of brackets within brackets.
* `asciimath/#43 <https://github.com/asciimath/asciimathml/issues/43>`__ Improve detection of non-matrices.


MathML
------

*   `#1072 <https://github.com/mathjax/MathJax/issues/1072>`__ Right-justify prescripts in ``mmultiscript`` elements (after clarification in MathML 3 editors' draft); cf. #956.
*   `#1089  <https://github.com/mathjax/MathJax/issues/1089>`__ Fix ``toMathML`` from changing ``<maligngroup>`` to ``<malign>``
*   `#1188  <https://github.com/mathjax/MathJax/issues/1188>`__ Fix ``mmultiscripts`` with odd number of post-scripts not rendering correctly.
*   `#1231  <https://github.com/mathjax/MathJax/issues/1231>`__ Fix ``<math>`` element not being treated as an ``<mrow>`` for embellished operator spacing.
*   `#1233  <https://github.com/mathjax/MathJax/issues/1233>`__ Make ``<maligngroup>`` and ``<malignmark>`` be self-closing in MathML input.
*   `#1238  <https://github.com/mathjax/MathJax/issues/1238>`__ Fix Content MathML extension not handling namespace prefixes.
*   `#1257  <https://github.com/mathjax/MathJax/issues/1257>`__ Improve ``mml3.js``: better RTL support in HTML-CSS; improved IE/Edge compatibility.
*   `#1323  <https://github.com/mathjax/MathJax/issues/1323>`__ Content-mathml extension: improve handling of empty Presentation MathML nodes.

Fonts
-----

*   `#928 <https://github.com/mathjax/MathJax/issues/928>`__ Add data for stretchy ``U+2322 (FROWN)``, ``U+2323 (SMILE)``, and also ``U+2312 (ARC)`` to be aliases for the top and bottom parentheses. This enables stretchy constructions; cf. also #567.
*   `#1211 <https://github.com/mathjax/MathJax/issues/1211>`__ Fix web font detection for Gyre-Pagella etc. in IE10+.
*   `#1251 <https://github.com/mathjax/MathJax/issues/1251>`__ Fix primes in STIX-web font being too small in SVG output.

Localization
------------

*   `#1248 <https://github.com/mathjax/MathJax/issues/1248>`__ Updated locales thanks to the contributors at Translatewiki.net; activate locales for Bulgarian, Sicilian, Lithuanian, and Laki.

APIs
-----

*   `#1216 <https://github.com/mathjax/MathJax/issues/1216>`__ Add debugging tips to console output.

Misc.
-----

*   `#1074 <https://github.com/mathjax/MathJax/issues/1074>`__ Fix regression in v2.5 regarding MathPlayer on IE9.
*   `#1036  <https://github.com/mathjax/MathJax/issues/1036>`__ Improve CDN rollover behavior.
*   `#1085 <https://github.com/mathjax/MathJax/issues/1085>`__ Fix detection of Windows Phone mobile IE.
*   `#1155 <https://github.com/mathjax/MathJax/issues/1155>`__ Work around websites using user agent filtering
*   `#1173 <https://github.com/mathjax/MathJax/issues/1173>`__ Avoid warning message in debug mode.
*   `#1208 <https://github.com/mathjax/MathJax/issues/1208>`__ Fix CHTML preview from setting chunking parameters even when disabled.
*   `#1214 <https://github.com/mathjax/MathJax/issues/1214>`__ semi-slim official MathJax repository for bower; use ``bower install components/MathJax`` for a copy without PNG fonts. Special thanks to `@minrk <https://github.com/minrk>`__ from the IPython/Jupyter team and to the team at `components <https://github.com/components>`__!
*   `#1254 <https://github.com/mathjax/MathJax/issues/1254>`__ Improve examples in ``/test``: add viewport meta tags, improve dynamic examples.
*   `#1328 <https://github.com/mathjax/MathJax/issues/1328>`__ Add package.json for publishing on npm, excluding PNG fonts.
