.. _tex-delimiters:

#############################
TeX and LaTeX math delimiters
#############################

By default, the TeX processor uses the LaTeX math delimiters, which
are ``\(...\)`` for in-line math, and ``\[...\]`` for displayed
equations.  It also recognizes the TeX delimiters ``$$...$$`` for
displayed equations, but it does **not** define ``$...$`` as in-line
math delimiters.  That is because dollar signs appear too often in
non-mathematical settings, which could cause some text to be treated
as mathematics unexpectedly.  For example, with single-dollar
delimiters, "... the cost is $2.50 for the first one, and $2.00 for
each additional one ..." would cause the phrase "2.50 for the first
one, and" to be treated as mathematics since it falls between dollar
signs.  For this reason, if you want to use single dollar signs for
in-line math mode, you must enable that explicitly in your
configuration:

.. code-block:: javascript

    window.MathJax = {
      tex: {
        inlineMath: [['$', '$'], ['\\(', '\\)']]
      }
    };

You can use ``\$`` to prevent a dollar sign from being treated as a
math delimiter within the text of your web page, e.g., use "... the
cost is \$2.50 for the first one, and \$2.00 for each additional one
..." to prevent these dollar signs from being used as math delimiters
in a web page where dollar signs have been configured to be in-line
delimiters.

Note that, as opposed to true LaTeX, MathJax processes all
environments when wrapped inside math delimiters, even those like
``\begin{equation}...\end{equation}`` that are supposed to be used to
initiate math mode.  By default, MathJax will also render all
environments outside of delimiters, e.g.,
``\begin{matrix}...\end{matrix}`` would be processed even if it is not
in math mode delimiters, though you are encouraged to use proper
delimiters for these cases to make your files more compatible with
actual LaTeX.  This functionality can be controlled via the
``processEnvironments`` option in the :ref:`tex configuration options
<tex-options>`.

See the :ref:`tex configuration options <tex-options>` page, for
additional configuration parameters that you can specify for the
TeX input processor.

|-----|
