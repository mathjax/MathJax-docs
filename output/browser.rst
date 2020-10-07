.. _browser-compatibility:

#####################
Browser Compatibility
#####################

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


.. _viewport-meta:

Viewport meta tag
=================

The viewport meta tag provides the browser with instructions regarding
viewports and zooming. This way, web developers can control how a
webpage is displayed on a mobile device.

Incorrect or missing viewport information can confuse MathJax's layout
process, leading to very small font sizes. We recommend that you use
standard values such as the following:

.. code-block:: html

  <meta name="viewport" content="width=device-width, initial-scale=1">


.. _ie-emulation-modes:

Internet Explorer Emulation modes
=================================

Internet Explorer provides so-called emulation modes for backward
compatibility to its legacy versions. These emulation modes have been
deprecated since Internet Explorer 11, cf. `Microsoft documentation
<https://msdn.microsoft.com/en-us/library/jj676915.aspx>`_.

MathJax is fastest when in the standards mode of each IE version, so
it is best to force the highest mode possible. That can be
accomplished by adding

.. code-block:: html

    <meta http-equiv="X-UA-Compatible" content="IE=edge">

at the top of the ``<head>`` section of your HTML documents.

.. note::

  This line must come at the beginning of the ``<head>``, before
  any stylesheets, scripts, or other content are loaded.

Note that versions of IE prior to 11 are no longer supported in
MathJax version 3.

|-----|
