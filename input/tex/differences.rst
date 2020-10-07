.. _tex-differences:

###########################
Differences from Actual TeX
###########################

Since MathJax renders for the web and TeX is a print layout engine,
there are natural limitations to which parts of TeX can be supported
in a reasonable way. Accordingly, there are several differences
between "real" TeX/LaTeX systems and MathJax's TeX Input.

First and foremost, the TeX input processor implements **only** the
math-mode macros of TeX and LaTeX, not the text-mode macros.  MathJax
expects that you will use standard HTML tags to handle formatting the
text of your page; MathJax only handles the mathematics.  So, for
example, MathJax does not implement ``\emph`` or
``\begin{enumerate}...\end{enumerate}`` or other text-mode macros or
environments.  You must use HTML to handle such formatting tasks.  If
you need a LaTeX-to-HTML converter, you should consider `other options
<http://www.google.com/search?q=latex+to+html+converter>`_.

There are two exception to this rule. First, MathJax supports the
``\ref`` macro outside of math-mode. Second, MathJax supports some
macros that add text within math-mode (such as ``\text{}``) as well as
``$...$`` and ``\(...\)`` to switch back into math-mode, along with
``\$`` to escape a dollar sign.  MathJax does not perform other macros
inside these text blocks, however, in general.  So, for example,
``\text{some \textbf{bold} text}`` will produce the output "some
\\textbf{bold} text", not "some **bold** text".

There is an extension (new in version 3.1) that implements a numnber
of text-mode macros within the ``\text{}`` macro and other ones that
produce text-mode material.  See the :ref:`tex-textmacros`
documentation for details.

Second, some features in MathJax might be necessarily limited.  For
example, MathJax only implements a limited subset of the ``array``
environment's preamble; i.e., only the ``l``, ``r``, ``c``, and ``|``
characters alongside ``:`` for dashed lines --- everything else is
ignored.

|-----|
