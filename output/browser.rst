.. _browser-compatibility:

#####################
Browser Compatibility
#####################

Extensive browser support is an important goal for MathJax; at the
same time, MathJax does require a certain minimum level of browser
functionality.  While MathJax version 2 went to great lengths to
remain compatible with early versions of most browsers (even back to
IE6), MathJax version 3 and above relies on more modern browser
features, and so older browsers are no longer supported.

The CommonHTML and SVG output supports all modern browsers (Chrome, Safari,
Firefox, Edge), and most mobile browsers.

.. warning::

   While MathJax v3 still supported Internet Explorer version 11,
   MathJax v4 no longer supports any version of Internet Explorer.
   While IE may be able to handle some MathJax expressions, we no
   longer do any testing in IE, and make no accommodations to get
   MathJax to work with IE.

Please `file issues on GitHub
<https://github.com/mathjax/MathJax/issues>`__ if you notice
inaccuracies or problems.  It may help to add a screenshot; we
suggest services such as `browsershots.org
<https://browsershots.org>`__, `saucelabs.com <https://saucelabs.com>`__,
or `browserstack.com <https://browserstack.com>`__ for obtaining them.


.. _viewport-meta:

Viewport meta tag
=================

The viewport meta tag provides the browser with instructions regarding
viewports and zooming. This way, web developers can control how a
webpage is displayed on a mobile device.

Incorrect or missing viewport information can confuse MathJax's layout
process, leading to very small font sizes. We recommend that you use
standard values such as the following

.. code-block:: html

  <meta name="viewport" content="width=device-width, initial-scale=1">

at the top of the ``<head>`` section of your HTML pages.


|-----|
