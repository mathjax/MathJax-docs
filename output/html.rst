.. _html-output:

############
HTML Support
############

The `CommonHTML` output processor renders your mathematics using HTML
with CSS styling.  It produces high-quality output in all modern
browsers, with results that are consistent across browsers and
operating systems.  This is MathJax's primary output mode since
MathJax version 2.6. Its major advantage is its quality, consistency,
and the fact that its output is independent of the browser, operating
system, and user environment.  This means you can pre-process
mathematics on a server, without needing to know the browser, what
fonts are available, and so on.  (In version 2, both the ``HTML-CSS``
and ``NativeMML`` processors produced different output for different
browsers and user environments.)

The CommonHTML output uses web-based fonts so that users don't have to
have math fonts installed on their computers, but will use locally
installed ones if they are available. It currently only supports
MathJax's default TeX fonts (see the :ref:`font-support` section for
more information).

See :ref:`chtml-options` for information about the options that
control the CommonHTML output.

|-----|
