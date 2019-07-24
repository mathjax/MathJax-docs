.. _browser-compatibility:

*********************
Browser Compatibility
*********************

Extensive browser support is an important goal for MathJax; at the
same time, MathJax does require a certain minimum level of browser
functionality.  While MathJax version 2 went to great lengths to
remain compatible with early versions of most browsers (even back to
IE6), MathJax version 3 relies on more modern browser features, and so
older browsers are no longer supported.

The CommonHTML and SVG output supports all modern browsers (Chrome, Safari,
Firefox, Edge), and most mobile browsers.  Include the
`polyfill <https://polyfill.io/v3/>`__ library in order to support
earlier browser versions (see their `browser support
<https://polyfill.io/v3/supported-browsers/>`__ page for details).
In particular, to allow MathJax version 3 to work with IE11, include the line

.. code-block:: html

   <script src="https://polyfill.io/v3/polyfill.min.js?features=es6"></script>

before the script that loads MathJax.

Please `file issues on GitHub
<https://github.com/mathjax/MathJax/issues>`__ if you notice
inaccuracies or problems.  It may help to add a screenshot; we
suggest services such as `browsershots.org
<http://browsershots.org>`__, `saucelabs.com <http://saucelabs.com>`__,
or `browserstack.com <http://browserstack.com>`__ for obtaining them.
