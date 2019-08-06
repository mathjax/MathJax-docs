.. _tex-in-html:

###############################
TeX and LaTeX in HTML documents
###############################

.. _html-special-chars:

HTML Special Characters
=======================

Keep in mind that your mathematics is part of an HTML document, so you
need to be aware of the special characters used by HTML as part of its
markup.  There cannot be HTML tags within the math delimiters (other
than ``<br>``, ``<wbr>``, and HTML comments) as TeX-formatted math
does not include HTML tags.  Also, since the mathematics is initially
given as text in the page, you need to be careful that your
mathematics doesn't look like HTML tags to the browser, which parses
the page before MathJax gets to see it.  In particular, that means
that you have to be careful about things like less-than and
greater-than signs (``<`` and ``>``), and ampersands (``&``), which
have special meaning to web browsers.  For example,

.. code-block:: latex

	... when $x<y$ we have ...

will cause a problem, because the browser will think ``<y`` is the
beginning of a tag named ``y`` (even though there is no such tag in
HTML).  When this happens, the browser will think the tag continues up
to the next ``>`` in the document (typically the end of the next
actual tag in the HTML file), and you may notice that you are missing
part of the text of the document.  In the example above, the "``<y``"
and "``we have ...``" will not be displayed because the browser thinks
it is part of the tag starting at ``<y``.  This is one indication you
can use to spot this problem; it is a common error and should be
avoided.

Usually, it is sufficient simply to put spaces around these symbols to
cause the browser to avoid them, so

.. code-block:: latex

	... when $x < y$ we have ...

should work.  Alternatively, you can use the HTML entities ``&lt;``,
``&gt;`` and ``&amp;`` to encode these characters so that the browser
will not interpret them, but MathJax will.  E.g.,

.. code-block:: latex

	  ... when $x &lt; y$ we have ...

Finally, there are ``\lt`` and ``\gt`` macros defined to make it
easier to enter ``<`` and ``>`` using TeX-like syntax:

.. code-block:: latex

        ... when $x \lt y$ we have ...

Again, keep in mind that the browser interprets your text before
MathJax does.


.. _tex-markdown:

Interactions with Content-Management Systems
============================================

Another source of difficulty is when MathJax is used in
content-management systems that have their own document processing
commands that are interpreted before the HTML page is created.  For
example, many blogs and wikis use formats like Markdown to allow you
to create the content of your pages.  In Markdown, the underscore is
used to indicate italics, and this usage will conflict with MathJax's
use of the underscore to indicate a subscript.  Since Markdown is
applied to the page first, it may convert your subscript markers into
italics (inserting ``<i>`` or ``<em>`` tags into your mathematics,
which will cause MathJax to ignore the math).

Such systems need to be told not to modify the mathematics that
appears between math delimiters.  That usually involves modifying the
content-management system itself, which is beyond the means of most
page authors.  If you are lucky, someone else will already have done
this for you, and you may be able to find a MathJax plugin for your
system using a web search.

If there is no plugin for your system, or if the plugin doesn't handle
the subtleties of isolating the mathematics from the other markup that
it supports, then you may have to "trick" the content-management
system into leaving your mathematics untouched.  Most
content-management systems provide some means of indicating text that
should not be modified ("verbatim" text), often for giving code
snippets for computer languages.  You may be able use that to enclose
your mathematics so that the system leaves it unchanged and MathJax
can process it.  For example, in Markdown, the back-tick (`````) is
used to mark verbatim text, so

.. code-block:: latex

    ... we have `\(x_1 = 132\)` and `\(x_2 = 370\)` and so ...

may be able to protect the underscores from being processed by
Markdown.

Alternatively, some content-management systems use the backslash
(``\``) as a special character for "escaping" other characters, and
you may be able to use that to prevent it from converting underscores
to italics.  That is, you might be able to use

.. code-block:: latex

    ... we have $x\_1 = 132$ and $x\_2 = 370$ and so ...

to avoid the underscores from making ``1 = 132$ and $x`` into italics.

If your system uses backslashes in this way, that can help with
italics, but it also causes difficulties in other ways.  Because TeX
uses this character to indicate a macro name, you need to be able to
pass a backslash along to the page so that MathJax will be able to
identify macro names; but if the content-management system is using
them as escapes, it will remove the backslashes as part of its
processing, and they won't make it into the final web page.  In such
systems, you may have to double the backslashes in order to obtain a
single backslash in your HTML page.  For example, you may have to do

.. code-block:: latex

    \\begin{array}{cc}
      a & b \\\\
      c & c
    \\end{array}

to get an array with the four entries *a*, *b*, *c*, and *d* in two
rows.  Note in particular that if you want ``\\`` you will have to
double *both* backslashes, giving ``\\\\``.

That may also affect how you enter the math delimiters.  Since the
defaults are ``\(...\)`` and ``\[...\]``, if your system uses ``\`` as
an escape of its own, you may need to use ``\\(...\\)`` and
``\\[...\\]`` instead in order to get ``\(...\)`` and ``\[...\]`` into
the page where MathJax can process it.

Finally, if you have enabled single dollar signs as math delimiters
and you want to include a literal dollar sign in your web page (one
that doesn't represent a math delimiter), you will need to prevent
MathJax from using it as a math delimiter.  If you also enable the
``processEscapes`` configuration parameter (it is enabled by default),
then you can use ``\$`` in the text of your page to get a dollar sign
(without the backslash) in the end.  Alternatively, you can use
something like ``<span>$</span>`` to isolate the dollar sign so that
MathJax will not use it as a delimiter.

|-----|
