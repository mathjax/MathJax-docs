.. _whats-new-2.5:

**************************
What's New in MathJax v2.5
**************************

MathJax v2.5 includes a number of new features, as well a more than 70 important bug fixes. The following are some of the highlights.

Features
--------

* *Speed improvements.* The HTML-CSS output performance was improved by 30-40% (depending on content complexity, with higher gains in more complex content such as very long documents).
* *New output for fast preview.* The new CommonHTML output provides a rough but 10x-faster rendering. The ``CHTML-preview`` extension will use this fast output as a preview mode for HTML-CSS or SVG output.
* *Improved Content MathML support.* Content MathML is now fully supported via a new extension, in particular this allows customization of the conversion process.
* *Improved elementary math support* The experimental support for elementary math elements has been significantly improved special thanks to David Carlisle.
* *NodeJS compatibility*. Enable the implementation of a NodeJS API (released as `MathJax-node <https://github.com/mathjax/MathJax-node>`__).

Numerous display bugs, line-breaking problems, and interface issues have been resolved; for a detailed listing please check the `release milestone <https://github.com/mathjax/MathJax/issues?milestone=4&state=closed>`__.

Interface
---------

*   `#834 <https://github.com/mathjax/MathJax/issues/834>`__ Fix incorrect line-width when zooming which can cause line-breaking problems.
*   `#918 <https://github.com/mathjax/MathJax/issues/918>`__ Fix zoom box size in NativeMML output.
*   `#835 <https://github.com/mathjax/MathJax/issues/835>`__ Fix zoom for equations extending beyond their bounding box.
*   `#893 <https://github.com/mathjax/MathJax/issues/893>`__ Fix outdated ARIA values for HTML-CSS and SVG output.
*   `#860 <https://github.com/mathjax/MathJax/issues/860>`__, `#502 <https://github.com/mathjax/MathJax/issues/502>`__ Preserve RDFa, microdata, aria labels, and other attributes in HTML-CSS and SVG output.
*   `#935 <https://github.com/mathjax/MathJax/issues/935>`__ Escape special characters in TeX annotations.
*   `#912 <https://github.com/mathjax/MathJax/issues/912>`__ Fix missing ``mstyle`` attributes in ``toMathML`` output.
*   `#971 <https://github.com/mathjax/MathJax/issues/971>`__ Fix lost attributes when ``toMathML`` is restarted.

Line-breaking
-------------

*   `#949 <https://github.com/mathjax/MathJax/issues/949>`__ Fix processing error due to empty elements.

HTML-CSS/SVG/nativeMML display
------------------------------

*   `#863 <https://github.com/mathjax/MathJax/issues/863>`__ Fix broken MathML preview in MathML pre-processor.
*   `#891 <https://github.com/mathjax/MathJax/issues/891>`__ Fix deprecated regexp affecting mtable alignment.
*   `#323 <https://github.com/mathjax/MathJax/issues/323>`__ Improve MathPlayer compatibility on Internet Explorer 10+.
*   `#826 <https://github.com/mathjax/MathJax/issues/826>`__ Scale content in fallback fonts.
*   `#898 <https://github.com/mathjax/MathJax/issues/898>`__ Fix invalid SVG output when using fallback characters.
*   `#800 <https://github.com/mathjax/MathJax/issues/800>`__ Fix misplaced background color for stretched mphantom elements in SVG output.
*   `#490 <https://github.com/mathjax/MathJax/issues/490>`__ Fix ``\overline`` issues in combination with text-style limits.
*   `#829 <https://github.com/mathjax/MathJax/issues/829>`__ Implement ``\delimitershortfall``, ``\delimiterfactor``.
*   `#775 <https://github.com/mathjax/MathJax/issues/775>`__ Fix lost text content in SVG output.
*   `#917 <https://github.com/mathjax/MathJax/issues/>`__ Fix cases of incorrect bounding boxes in HTML-CSS output.
*   `#807 <https://github.com/mathjax/MathJax/issues/807>`__ Fix clipping of table columns in HTML-CSS output.
*   `#804 <https://github.com/mathjax/MathJax/issues/804>`__ Fix cases of uneven subscripts.
*   `#944 <https://github.com/mathjax/MathJax/issues/944>`__ Fix rendering error when scaling-all-math of labeled equations.
*   `#930 <https://github.com/mathjax/MathJax/issues/930>`__ Fix SVG output failure when ``<math>`` element has inline styles with border or padding.
*   `#931 <https://github.com/mathjax/MathJax/issues/931>`__ Fix baseline alignment in Safari 6.2/7.1/8.0.
*   `#937 <https://github.com/mathjax/MathJax/issues/937>`__ Fix incorrect width in MathJax font data affecting underlining.
*   `#966 <https://github.com/mathjax/MathJax/issues/966>`__ Fix SVG output overlapping when using prefix notation.
*   `#993 <https://github.com/mathjax/MathJax/issues/993>`__ Add workaround for Native MathML in Gecko to re-enable ``mlabeledtr`` etc.
*   `#1002 <https://github.com/mathjax/MathJax/issues/1002>`__ Enable SVG output to inherit surrounding text color.

TeX emulation
-------------

*   `#881 <https://github.com/mathjax/MathJax/issues/881>`__ Allow ``\newenvironment`` to process optional parameters.
*   `#889 <https://github.com/mathjax/MathJax/issues/889>`__ remove extra space around some parenthesis constructs.
*   `#856 <https://github.com/mathjax/MathJax/issues/856>`__ Recognize comma as decimal delimiter in units.
*   `#877 <https://github.com/mathjax/MathJax/issues/877>`__ Fix bug related to multiple accent having different width.
*   `#832 <https://github.com/mathjax/MathJax/issues/832>`__ Fix multline environment not being centered in HTML-CSS output.
*   `#776 <https://github.com/mathjax/MathJax/issues/776>`__ Fix stretchy delimiters of ``binom`` and ``choose``.
*   `#900 <https://github.com/mathjax/MathJax/issues/900>`__ Fix ``\buildrel`` getting TeX class ORD instead of REL.
*   `#890 <https://github.com/mathjax/MathJax/issues/890>`__ Enable px as dimension in ``\\[...]``.
*   `#901 <https://github.com/mathjax/MathJax/issues/901>`__ Allow ``\limits`` in more cases and add errors for some cases of multiple subscripts.
*   `#903 <https://github.com/mathjax/MathJax/issues/903>`__ Allow ``\hfill`` to set alignment in matrices and arrays (for old fashioned TeX layout).
*   `#902 <https://github.com/mathjax/MathJax/issues/902>`__ Convert ``\eqalignno`` and ``\leqalignno`` into ``mlabeledtr``.
*   `#906 <https://github.com/mathjax/MathJax/issues/906>`__ Allow comma separated parameters in ``\mmlToken``.
*   `#913 <https://github.com/mathjax/MathJax/issues/913>`__ Allow attributes in ``\mmlToken`` whose defaults are false or blank.
*   `#972 <https://github.com/mathjax/MathJax/issues/972>`__ Fix autoload of the ``color`` extension.
*   `#375 <https://github.com/mathjax/MathJax/issues/475>`__ Add ``\{``, ``\}``, and ``\\`` to macros working within ``\text{}`` etc.
*   `#969 <https://github.com/mathjax/MathJax/issues/969>`__ Fix incorrect spacing with some ``\frac`` constructs.
*   `#982 <https://github.com/mathjax/MathJax/issues/982>`__ Fix incorrect spacing in ``aligned`` environments.
*   `#1013 <https://github.com/mathjax/MathJax/issues/1013>`__ Fix processing error caused by ``'`` in commutative diagrams using ``AMScd.js``.
*   `#1005 <https://github.com/mathjax/MathJax/issues/1005>`__ Add ``wikipedia-texvc.js`` extension.

Asciimath
---------

*   `#851 <https://github.com/mathjax/MathJax/issues/851>`__ Prevent leading space in quote from causing processing errors.
*   `#431 <https://github.com/mathjax/MathJax/issues/431>`__ Fix handling of special characters in exponents.
*   `#741 <https://github.com/mathjax/MathJax/issues/741>`__ Add underbrace macro.
*   `#857 <https://github.com/mathjax/MathJax/issues/857>`__ Update AsciiMathML to 2.2; changes include `improve entity handling <https://github.com/mathjax/asciimathml/issues/2>`__, `add triangle macro <https://github.com/mathjax/asciimathml/issues/4>`__, `map ast to asterisk <https://github.com/mathjax/asciimathml/issues/6>`__, `allow input of row vectors <https://github.com/mathjax/asciimathml/issues/11>`__, `allow lamda <https://github.com/mathjax/asciimathml/issues/12>`__, `switch phi/varphi mapping <https://github.com/mathjax/asciimathml/issues/14>`__, `add underbrace macro <https://github.com/mathjax/asciimathml/issues/18>`__, `handle empty nodes better <https://github.com/mathjax/asciimathml/issues/24>`__, `add vector norm macro <https://github.com/mathjax/asciimathml/issues/26>`__, `improve @ macro <https://github.com/mathjax/asciimathml/issues/27>`__.

MathML Handling
---------------

*   `#847 <https://github.com/mathjax/MathJax/issues/847>`__ Fix line-breaks in annotation elements.
*   `#805 <https://github.com/mathjax/MathJax/issues/805>`__ Prevent empty annotation elements from causing math processing errors.
*   `#769 <https://github.com/mathjax/MathJax/issues/769>`__ Update ``indentshift`` implementation to meet clarified MathML specification.
*   `#768 <https://github.com/mathjax/MathJax/issues/768>`__ Fix processing of percentage values for ``indenshift``.
*   `#839 <https://github.com/mathjax/MathJax/issues/839>`__ Update inheritance of ``displaystyle`` in ``mtable`` to meet clarified MathML specification.
*   `#695 <https://github.com/mathjax/MathJax/issues/695>`__ Allow Content MathML converion to be customized.
*   `#964 <https://github.com/mathjax/MathJax/issues/964>`__ Move experimental support for elementary math and RTL to its own extension.

Fonts
-----

*   `#845 <https://github.com/mathjax/MathJax/issues/845>`__ Fix webfont bug in Safari 7.
*   `#950 <https://github.com/mathjax/MathJax/issues/950>`__ Fix webfont bug in IE 11.

Localization
------------

*   `#979 <https://github.com/mathjax/MathJax/issues/979>`__ Updated locales thanks to Translatewiki.net; activate locales for Scots and Southern Balochi.

APIs
-----

*   `#873 <https://github.com/mathjax/MathJax/issues/873>`__ Combine array of elements when typesetting.
*   `#693 <https://github.com/mathjax/MathJax/issues/693>`__ Add API to allow listeners to be cleared.


Misc.
-----

*   `#870 <https://github.com/mathjax/MathJax/issues/870>`__ Add Composer package information.
*   `#872 <https://github.com/mathjax/MathJax/issues/872>`__ Add small delay between input and output phase to prevent performance degredation.
*   `#1016 <https://github.com/mathjax/MathJax/issues/1016>`__ Fix bug related to ``<script>`` elements with namespace prefix, e.g., in xHTML.
