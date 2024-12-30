.. _tex-differences:

###########################
Differences from Actual TeX
###########################

Since MathJax renders for the web, and TeX is a print layout engine,
there are natural limitations to which parts of TeX can be supported
in a reasonable way.  Accordingly, there are several differences
between "real" TeX/LaTeX systems and MathJax's TeX input jax.

First and foremost, the TeX input processor implements **only** the
math-mode macros of TeX and LaTeX, not the text-mode macros.  MathJax
expects that you will use standard HTML tags to handle formatting the
text of your page; MathJax only handles the mathematics.  So, for
example, MathJax does not implement ``\emph``,
``\begin{enumerate}...\end{enumerate}``,
``\begin{tabular}...\end{tabular}`` or other text-mode macros or
environments.  You must use HTML to handle such formatting tasks.  If
you need a LaTeX-to-HTML converter, you should consider `other options
<http://www.google.com/search?q=latex+to+html+converter>`_.

There are a few exception to this rule.  For one, MathJax supports the
``\ref`` macro outside of math-mode.  Also, MathJax supports some
macros that add text within math-mode (such as ``\text{}``) as well as
``$...$`` and ``\(...\)`` to switch back into math-mode, along with
``\$`` to escape a dollar sign.  MathJax does not perform other macros
inside these text blocks, however, in general.  So, for example,
``\text{some \textbf{bold} text}`` will produce the output "some
\\textbf{bold} text", not "some **bold** text".

There is an extension (new in version 3.1) that implements a number
of text-mode macros within the ``\text{}`` macro and other ones that
produce text-mode material.  See the :ref:`tex-textmacros`
documentation for details.

Second, because MathJax concentrates in math-mode, not text-mode, some
macros that initiate text-mode in actual TeX may stay in math-mode in
MathJax.  For example, the argument ``\llap{}`` and ``\rlap{}`` in
actual TeX is typeset in text-mode, but in MathJax, these remain in
math-mode so that you don't have to use dollar signs to go back into
math-mode as you would in actual TeX.

Third, TeX's rules about how arguments to macros are subtle and not
always consistent.  For example, ``\sqrt \frac a b`` will produce the
square root of the fraction *a*/*b*, but ``\hat \frac a b`` will
produce an error.  Both of these expressions represent poor practice,
as the arguments should be within braces to make the grouping clear:
``\sqrt{\frac{a}{b}}`` and ``\hat{\frac{a}{b}}``.  MathJax
standardizes the handling of braces more than TeX does, and sometimes
requires the braces when TeX may not.  So some expression that TeX or
LaTeX will accept will cause errors in MathJax if they don't include
the usual braces.

Finally, some features in MathJax might be more limited than in actual
LaTeX.  For example, MathJax doesn't implement the ``\multicolumn``,
``\multirow``, ``\omit``, ``\intertext``, or ``\vadjust`` macros, so
tale layout is more restricted in MathJax, currently.  Similarly,
``\hfil`` and related macros are only allowed at the left and
right-hand ends of the contents of a cell within a table.  


|-----|
