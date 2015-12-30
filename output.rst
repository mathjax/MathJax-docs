.. _output-formats:

**********************
MathJax Output Formats
**********************


MathJax Output Components
=========================


Currently, MathJax can render math in three ways:

- Using HTML-with-CSS to lay out the mathematics,
- Using :term:`SVG` to lay out the mathematics, or
- Using a browser's native MathML support.

These are implemented by the `CommonHTML`, `HTML-CSS`, and `PreviewHTML` output processors, the `SVG` output processor, and the `NativeMML` output processor respectively. In addition, the `PlainSource` output is a convenience and accessibility output, rendering the source as plain text.

If you are using one of the combined configuration files, then this will
select one of these output processors for you.  If the config file ends in
``_CHTML``, then it is the CommonHTML output processor, if it ends in ``_HTML``, then it is the HTML-CSS output processor, and if it ends in
``_SVG`` then the SVG output processor will be used.  If it ends in
``_HTMLorMML``, HTML-CSS output will be used except on Internet Explorer 9 or below with the MathPlayer plugin; cf. :ref:`mml-or-html`.

If you are performing your own in-line or file-based configuration,
you select which one you want to use by including either
``"output/HTML-CSS"``, ``"output/SVG"``, or ``"output/NativeMML"`` in
the `jax` array of your MathJax configuration.  For example

.. code-block:: javascript

    jax: ["input/TeX","output/HTML-CSS"]

would specify TeX input and HTML-with-CSS output for the mathematics
in your document.

The **CommonHTML output processor** produces high-quality output in all modern browsers, with results that are consistent across browsers and operating systems.  This is MathJax's primary output mode since MathJax v2.6. Its major advantage is its quality, consistency, and speed as well as support for server-side generation. Its browser supports starts with IE9 and equivalent browsers and it degrades gracefully on older browsers.
The CommonHTML output uses web-based fonts so that users don't have to have math fonts installed on their computers. It currently only supports MathJax's default TeX fonts.

The **HTML-CSS output processor** produces high-quality output in all
browsers, with results that are consistent across browsers and
operating systems.  This is MathJax's primary output mode.  Its major
advantage is its quality and consistency on legacy browsers starting with IE6.
The HTML-CSS output uses web-based
fonts so that users don't have to have math fonts installed on their
computers but can use locally installed fonts instead.

The **SVG output processor** uses `Scalable Vector Graphics` to render the mathematics on the page.
SVG is supported in all the major browsers and most mobile devices;
note, however, that Internet Explorer prior to IE9 does not support
SVG, and IE9 only does in "IE9 standards mode", nor its emulation
modes for earlier versions.  The SVG output mode is high quality and
slightly faster than HTML-CSS, and it does not suffer from some of the
font-related issues that HTML-CSS does, so prints well in all
browsers. Since it uses SVG data instead of font files, it is not affected by user based web-font blocking. The disadvantages of this mode are the following: first, it does not
take advantage of locally installed fonts, and so only has access to the characters
in its (pseudo) web-based fonts, and second, its variable-width tables become
fixed size once they are typeset, and don't rescale if the window size
changes (for example).  Since equation numbers are handled through
variable-width tables, that means equation numbers may not stay at the
edge of the window if it is resized.

The **NativeMML output processor** uses the browser's internal MathML
support (if any) to render the mathematics.  Currently, Firefox has
native support for MathML, and IE has the `MathPlayer plugin
<http://www.dessci.com/en/products/mathplayer/>`_ for rendering
MathML.  Opera has some built-in support for MathML that works well
with simple equations, but fails with more complex formulas, so we
don't recommend using the NativeMML output processor with Opera.
Safari has some support for MathML since version 5.1, but the quality
is not as high as either Firefox's implementation or IE with MathPlayer.
Chrome, Konqueror, and most other browsers don't support MathML
natively, but this may change in the future, since MathML is part of
the HTML5 specification.

The advantage of the NativeMML output processor is its speed, since
native MathML support is usually faster than converting to HTML-with-CSS and SVG
The disadvantage is that you are dependent on the browser's MathML
implementation for your rendering, and these vary in quality of output
and completeness of implementation.  MathJax relies on features that
are not available in some renderers (for example, Firefox's MathML
support does not implement the features needed for labeled equations).
While MathJax's NativeMML output processor works around various limitations of Firefox/Gecko and Safari/WebKit, the results using the NativeMML output processor may have spacing or
other rendering problems that are outside of MathJax's control.

The **PreviewHTML output processor** produces fast but low-quality output in all modern browsers. It is designed to serve as a fast preview mode as its layout quality is nowhere near the quality of the CommonHTML, HTML-CSS, and SVG output processors. Its major advantage is its speed. Its browser supports starts with IE8. It uses locally installed Times-like fonts and does not load any webfonts.

The **PlainSource output processor** injects the plain text source of the equations instead; if the input is MathML, the output processor will prefer TeX and AsciiMath notation (in that order) if it is available in ``<annotation>`` elements. This output is a convenience output for users who prefer raw source, e.g., users who need to copy&paste larger document fragments and users of assistive technologies.

.. _automatic-linebreaking:

Automatic Line Breaking
=======================

The CommonHTML, HTML-CSS, and SVG output processors implement (most of) the MathML3
automatic line-breaking specification.  (The NativeMML output
processor relies on the browser's native MathML support to handle line
breaking when it is used.)  Since line-breaking takes extra processing
and so can slow down the mathematical output, it is off by default,
but you can enable it by adding, e.g.,

.. code-block:: html

    <script type="text/x-mathjax-config">
    MathJax.Hub.Config({
      CommonHTML: { linebreaks: { automatic: true } },
      "HTML-CSS": { linebreaks: { automatic: true } },
             SVG: { linebreaks: { automatic: true } }
    });
    </script>

to your page just before the ``<script>`` tag that loads
``MathJax.js`` itself.

.. note::

    Line breaking only applies to displayed equations, not
    in-line equations (unless the in-line equation is itself longer than a
    line), and that the line-breaks are only computed once when the
    equation is initially typeset, and do not change if the user changes
    the window size, or if the container changes size for some other
    reason.

You can control what width is used to determine where the line breaks
shoud occur using the ``container`` parameter of the ``linebreaks``
block.  By default it is the width of the containing element, but you
can make it a fixed width, or make it a percentage of the container.
See the :ref:`CommonHTML configuration <configure-CommonHTML>`,
:ref:`HTML-CSS configuration <configure-HTML-CSS>`, or
:ref:`SVG configuration <configure-SVG>` pages for more details.

The line-breaking algorithm uses the nesting depth, the type of
operator, the size of spaces, and other factors to decide on the
breakpoints, but it does not know the meaning of the mathematics, and
may not choose the optimal breakpoints. We will continue to work on
the algorithm as we gain information from its actual use in the field.
If you are using :term:`MathML` as your input format, you can use the
``linebreak="goodbreak"`` and ``linebreak="badbreak"`` attributes on
``<mo>`` elements to help MathJax pick the best breakpoints for your
mathematics.


.. _automatic-output-switch:

Automatic Selection of the Output Processor
===========================================

Since not all browsers support MathML natively, it would be unwise to
choose the NativeMML output processor unless you are sure of your
audience's browser capabilities. Similarly, you might want more control over which platforms use which renderer.

While MathJax used to provide an extension to handle switching between HTML-CSS and NativeMML output, this limited extension was deprecated in MathJax v2.6.

Instead, you can use the regular MathJax configuration methods to define which output to use where.

In general, you can do the following:

.. code-block:: html

  <script type="text/x-mathjax-config">
  MathJax.Hub.Register.StartupHook("End Jax",function () {
    var BROWSER = MathJax.Hub.Browser;
    var jax = "HTML-CSS";
    if (BROWSER.isMSIE && BROWSER.hasMathPlayer) jax = "NativeMML";
    return MathJax.Hub.setRenderer(jax);
  });
  </script>

This does essentially what the ``MMLorHTML`` configuration did in its default settings.  You can, of course, substitute whatever output you want in place of `HTML-CSS` or `NativeMML,` and you can add other if-then statements for other browsers.  E.g.,

.. code-block:: html

  <script type="text/x-mathjax-config">
  MathJax.Hub.Register.StartupHook("End Jax",function () {
    var BROWSER = MathJax.Hub.Browser;
    var jax = "HTML-CSS";
    if (BROWSER.isMSIE && BROWSER.hasMathPlayer) jax = "NativeMML";
    if (BROWSER.isFirefox) jax = "SVG";
    if (BROWSER.isSafari && BROWSER.versionAtLeast("5.0")) jax = "NativeMML";
    return MathJax.Hub.setRenderer(jax);
  });
  </script>


This illustrates using `BROWSER.versionAtLeast()` to make some decisions.  You can, of course, be as complicated as you like about making the choices. For example, you could detect if a user is blocking web-fonts and switch to SVG output (which does not rely on fonts but SVG data files).

If you want something that is more backward compatible with `MMLorHTML` (i.e., if you have pages that configure `MMLorHTML` one way and other apges that configure it another way), here is a version that uses the old `MMLorHTML`'s `"prefer"` object, and only sets MathML mode if they browser can handle that.

.. code-block:: html

  <script type="text/x-mathjax-config">
  MathJax.Hub.Register.StartupHook("End Jax",function () {
    var BROWSER = MathJax.Hub.Browser;

    var canUseMML = (BROWSER.isFirefox && BROWSER.versionAtLeast("1.5")) ||
                    (BROWSER.isMSIE    && BROWSER.hasMathPlayer) ||
                    (BROWSER.isSafari  && BROWSER.versionAtLeast("5.0")) ||
                    (BROWSER.isOpera   && BROWSER.versionAtLeast("9.52") &&
                                         !BROWSER.versionAtLeast("14.0"));

    var CONFIG = MathJax.Hub.CombineConfig("MMLorHTML",{
      prefer: {
        MSIE:"MML", Firefox:"HTML", Opera:"HTML", Chrome:"HTML", Safari:"HTML",
        other:"HTML"
      }
    });

    var jax = CONFIG.prefer[BROWSER] || CONFIG.prefer.other;
    if (jax === "HTML") jax = "HTML-CSS"; else if (jax === "MML")  jax = "NativeMML";
    if (jax === "NativeMML" && !canUseMML) jax = CONFIG.prefer.other;
    return MathJax.Hub.setRenderer(jax);
  });
  </script>


The deprecated ``MMLorHTML`` extension also included version checking to see if MathJax is supported in the browser, but there shouldn't be a need for that any longer as those older browsers (IE5 and below) just aren't used any more.


.. _mml-or-html:

`HTMLorMML` extension (deprecated)
--------------------------------------

.. warning::

  This extension has been deprecated in MathJax v2.6.

With the decline of MathPlayer, the general lack of development of native MathML implementations, and the increase in output options in MathJax, we have decided to deprecate the ``HTMLorMML`` extension in MathJax v2.6.

Originally, a number of combined configuration files would select
NativeMML output when the browser supports it well enough, and
HTML-CSS output otherwise.  These are the configuration files that end
in ``_HTMLorMML``.

These configurations added the ``"MMLorHTML.js"`` extension to
your configuration's `config` array, and they would not include an output
processor in your `jax` array; MathJax will fill that in for you based on
the abilities of your user's browser.

By default, this extension would choose HTML-CSS in all browsers except for one case:  Internet Explorer 9 and below when the MathPlayer plugin is present.

In recent versions of MathJax, this extension would choose HTML-CSS in all Internet Explorer versions when the MathPlayer plugin is present. However, due to lack of support for MathPlayer in Internet Explorer 10 and above, we have restricted this further. In the v1.x releases, MathJax selected NativeMML output for Firefox as well, but we have found that there are too many rendering issues with Firefox's native MathML implementation, and so MathJax v2.0+ selected
HTML-CSS output for Firefox by default as well.

Users can still use the Mathjax contextual menu to select the NativeMML renderer if they wish to.

.. note::

  See the ``config/default.js`` file or the
  :ref:`Configuring MMLorHTML <configure-MMLorHTML>` section for further
  details.


HTML-CSS Extensions
===================

The HTML-CSS output jax uses elements with width set to 100% when it
typesets displayed equations.  If there are floating elements on the
left or right, this can mean that displayed mathematics isn't properly
centered, and can cause equation numbers to overlap the floating
content.  To avoid this, you can specify the `handle-floats` extension
in the `extensions` array of your `HTML-CSS` configuration block.

.. code-block:: javascript

    "HTML-CSS": {
      extensions: ["handle-floats.js"]
    }

This will use CSS that puts the displayed equations into elements that
work like tabel cells, and won't overlap the floaring content.
Because this is somewhat of a misuse of CSS, it is not used by
default, but it has proved successful in most situations, so you may
consider using it in pages that include material that floats to the
left or right of text containing displayed mathematics, especially
when equation numbers or tags are used.

See the :ref:`HTML-CSS configuration options <configure-HTML-CSS>` for
other options of the HTML-CSS output jax.


Viewport meta tag
=================

The meta viewport tag provides the browser with instructions regarding viewports and zooming. This way, web developers can control how a webpage is displayed on a mobile device.

Incorrect or missing viewport information can confuse MathJax's layout process, leading to very small font sizes. We recommend to use standard values such as the following:

.. code-block:: html

  <meta name="viewport" content="width=device-width, initial-scale=1">


.. _ie-emulation-modes:

Internet Explorer Emulation modes
=================================

Internet Explorer provides so-called emulation modes for backward compatibility to its legacy versions. These emulation modes have been deprecated since Internet Explorer 11, cf. `Microsoft documentation <https://msdn.microsoft.com/en-us/library/jj676915.aspx>`_.

MathJax is fastest when in the standards mode of each IE version, so it is best to force the highest mode possible. That can be accomplished by adding

.. code-block:: html

    <meta http-equiv="X-UA-Compatible" content="IE=edge">

at the top of the ``<head>`` section of your HTML documents.

.. note::

  This line must come at the beginning of the ``<head>``, before
  any stylesheets, scripts, or other content are loaded.

In early versions, we recommended forcing IE8 and IE9 into IE7-emulation
mode in order to get better performance.  That is no longer necessary.

.. _html-css-extensions:
