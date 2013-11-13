.. _configure-MatchWebFonts:

*****************************
The Match Web Fonts extension
*****************************

The options below control the operation of the `MatchWebFonts` extension that
is run when you include ``"MatchWebFonts.js"`` in the `extensions` array of
your configuration, or include ``MatchWebFonts`` in the ``config=`` options
when you load ``MathJax.js``.  They are listed with their default
values.  To set any of these options, include a ``MatchWebFonts``
section in your :meth:`MathJax.Hub.Config()` call.  For example

.. code-block:: javascript

    MathJax.Hub.Config({
      matchFor: {
        "HTML-CSS": true,
        NativeMML: false,
        SVG: false
      },
      fontCheckDelay: 2000,
      fontCheckTimeout: 30 * 1000
    });

would ask to apply font size matching for the `HTML-CSS` output mode but not for
the `NativeMML` or `SVG` modes. It would also ask to wait 2 seconds before starting the initial verification and to continue until a timeout of 30 seconds.

This extension is designed for authors using webfonts for the content surrounding MathJax output. This works around a basic problem of webfonts - a missing API. Webfonts are often delayed and the browser will substitute another font until the arrival; unfortunately there is no signal for when the font arrives. Since the arrival of the webfonts can significantly change ex and em sizes (and MathJax checks these to match them with its own font size), this MathJax extension will check for changes of em and ex sizes (indicating the arrival of webfonts) and rerender equations if necessary.

.. describe:: matchFor: { ... }

    This block controls whether to apply font size matching for each output mode.

    .. describe:: "HTML-CSS": "true"

       Whether to match the font size for the `HTML-CSS` output.

    .. describe:: NativeMML: "true"

       Whether to match the font size for the `NativeMML` output.

    .. describe:: SVG: "true"

       Whether to match the font size for the `SVG` output.

.. describe:: fontCheckDelay: 500

       Initial delay for the first check for web fonts (in milliseconds).

.. describe:: fontCheckTimeout: 15 * 1000

       How long to keep looking for fonts (in milliseconds).
