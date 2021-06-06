.. _asciimath-support:

#################
AsciiMath Support
#################

The support for AsciiMath in MathJax involves two functions: the first
looks for mathematics within your web page (indicated by delimiters
like ```...```) and marks the mathematics for later processing by
MathJax, and the second is what converts the AsciiMath notation into
MathJax's internal format, where one of MathJax's output processors
then displays it in the web page.  In MathJax version 2, these were
separated into distinct components (the ``asciimath2jax`` preprocessor
and the AsciiMath input jax), but in version 3, the ``asciimath2jax``
functions have been folded into the AsciiMath input jax.

The AsciiMath input jax actually includes a copy of ``ASCIIMathML.js``
itself (see the `AsciiMath home page <http://asciimath.org>`__ for
details).  This means that the results of MathJax's AsciiMath
processing should be the same as using the actual ``ASCIIMathML.js``
package (at least as far as the MathML that it generates is
concerned).  Thanks go to David Lippman for writing the initial
version of the AsciiMath preprocessor and input jax and for the
ongoing improvements from the AsciiMath community.

The AsciiMath input jax handles only the original ASCIIMathML notation
(from ASCIIMathML v1.4.7), not the extended LaTeXMathML notation added
in version 2.0 of ASCIIMathML, though the AsciiMath input jax does
expose the tables that define the symbols that AsciiMath processes,
and so it would be possible to extend them to include additional
symbols.  In general, it is probably better to use MathJax's :ref:`TeX
input jax <TeX-support>` to handle LaTeX notation.

AsciiMath can be configured to look for whatever markers you want to
use for your math delimiters.  See the :ref:`AsciiMath
configuration options <asciimath-options>` section for details
on how to customize the action of the AsciiMath input jax.


.. _loading-asciimath:

Loading the AsciiMath Component
===============================

The AsciiMath input jax has not yet been fully ported to version 3.
Instead, the AsciiMath component uses the version 2 AsciiMath
input jax together with some of the legacy version 2 code patched into
the version 3 framework.  This is less efficient, and somewhat larger,
than a pure version-3 solution would be, and it can complicate
the configuration process.  A full version-3 port of AsciiMath is
planned for a future release.

Because AsciiMath hasn't been fully ported to version 3, none of the
combined components include it.  So in order to use AsciiMath
notation, you will need to configure MathJax to load it yourself by
adding ``input/asciimath`` to the ``load`` array in the ``loader``
block of your MathJax configuration.  For example,

.. code-block:: html

   <script>
   MathJax = {
     loader: {load: ['input/asciimath', 'output/chtml', 'ui/menu']},
   };
   </script>
   <script type="text/javascript" id="MathJax-script" async
     src="https://cdn.jsdelivr.net/npm/mathjax@3/es5/startup.js">
   </script>

would load the AsciiMath input jax, the CommonHTML output jax, and the
contextual menu component.


.. _asciimath-delimiters:

AsciiMath delimiters
====================

By default, the AsciiMath processor defines the back-tick
(`````) as the delimiters for mathematics in AsciiMath format.  It
does **not** define ``$...$`` as math delimiters.  That is because
dollar signs appear too often in non-mathematical settings, which
could cause some text to be treated as mathematics unexpectedly.  For
example, with single-dollar delimiters, "... the cost is $2.50 for the
first one, and $2.00 for each additional one ..." would cause the
phrase "2.50 for the first one, and" to be treated as mathematics
since it falls between dollar signs.  For this reason, if you want to
use single-dollars for AsciiMath notation, you must enable that
explicitly in your configuration:

.. code-block:: javascript

    window.MathJax = {
      loader: {
        load: ['input/asciimath']
      },
      asciimath: {
        delimiters: [['$','$'], ['`','`']]
      }
    });

Note that the dollar signs are frequently used as a delimiter for
mathematics in the TeX format, and you can not enable the dollar-sign
delimiter for both.  It is probably best to leave dollar signs for TeX
notation.

See the :ref:`asciimath-options` page, for additional configuration
parameters that you can specify for the AsciiMath input processor.


.. _asciimath-in-html:

AsciiMath in HTML documents
===========================

The AsciiMath syntax is described on the official `AsciiMath homepage
<http://asciimath.org>`_.

Keep in mind that your mathematics is part of an HTML document, so you
need to be aware of the special characters used by HTML as part of its
markup.  There cannot be HTML tags within the math delimiters (other
than ``<br>``, ``<wbr>``, and HTML comments) as AsciiMath-formatted
math does not include HTML tags.  Also, since the mathematics is
initially given as text in the page, you need to be careful that your
mathematics doesn't look like HTML tags to the browser, which parses
the page before MathJax gets to see it.  In particular, that means
that you have to be careful about things like less-than and
greater-than signs (``<`` and ``>``), and ampersands (``&``), which
have special meaning to web browsers.  For example,

.. code:: latex

	... when `x<y` we have ...

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

.. code:: latex

	... when `x < y` we have ...

should work.  Alternatively, you can use the HTML entities ``&lt;``,
``&gt;`` and ``&amp;`` to encode these characters so that the browser
will not interpret them, but MathJax will.  E.g.,

.. code-block:: html

	  ... when `x &lt; y` we have ...

Keep in mind that the browser interprets your text before MathJax
does.

|-----|
