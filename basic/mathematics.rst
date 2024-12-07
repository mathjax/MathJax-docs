.. _basic-mathematics:

###############################
Writing Mathematics for MathJax
###############################


.. _math-in-html:

Putting mathematics in a web page
=================================

To put mathematics in your web page, you can use TeX and LaTeX
notation, `MathML <http://www.w3.org/TR/MathML3>`_ notation,
`AsciiMath <http://asciimath.org/>`__ notation, or a combination of
all three within the same page; the MathJax configuration tells
MathJax which you want to use, and how you plan to indicate the
mathematics when you are using TeX/LaTeX or AsciiMath notation.  These
three formats are described in more detail below.


.. _tex-input:

TeX and LaTeX input
-------------------

Mathematics that is written in TeX or LaTeX format is indicated using
*math delimiters* that surround the mathematics, telling MathJax what
part of your page represents mathematics and what is normal text.
There are two types of equations: ones that occur within a paragraph
(in-line mathematics), and larger equations that appear separated from
the rest of the text on lines by themselves (displayed mathematics).

The default math delimiters are ``$$...$$`` and ``\[...\]`` for
displayed mathematics, and ``\(...\)`` for in-line mathematics.  Note
in particular that TeX's ``$...$`` in-line delimiters are **not** used
by default.  That is because dollar signs appear too often in
non-mathematical settings, which could cause some text to be treated
as mathematics unexpectedly.  For example, with single-dollar
delimiters, "... the cost is $2.50 for the first one, and $2.00 for
each additional one ..." would cause the phrase "2.50 for the first
one, and" to be typeset as mathematics, since it falls between dollar
signs, and those dollar signs would be removed, as they would be
treated as math delimiters.  See the section on :ref:`TeX and LaTeX
Math Delimiters <tex-delimiters>` for more information on using dollar
signs as delimiters.

Here is a complete sample page containing TeX mathematics (see the
`MathJax Web Demos Repository <https://github.com/mathjax/MathJax-demos-web>`__
for more).

.. code-block:: html

    <!DOCTYPE html>
    <html>
    <head>
    <title>MathJax TeX Test Page</title>
    <script defer src="https://cdn.jsdelivr.net/npm/mathjax@4/tex-chtml.js">
    </script>
    </head>
    <body>
    When \(a \ne 0\), there are two solutions to \(ax^2 + bx + c = 0\) and they are
    $$x = {-b \pm \sqrt{b^2-4ac} \over 2a}.$$
    </body>
    </html>

.. raw:: html

    <p>This renders as shown below:</p>
    <p style="background-color: #DDD; padding: 1em 0; text-align: center">
    <iframe style='background-color: white' srcdoc='
      <!DOCTYPE html>
      <html>
      <head>
      <title>MathJax TeX Test Page</title>
      <script defer src="https://cdn.jsdelivr.net/npm/mathjax@4.0.0-beta.7/tex-chtml.js">
      </script>
      </head>
      <body>
      When \(a \ne 0\), there are two solutions to \(ax^2 + bx + c = 0\) and they are
      $$x = {-b \pm \sqrt{b^2-4ac} \over 2a}.$$
      </body>
      </html>
    '></iframe>
    </p>


.. _tex-html-markdown:
   
Since the TeX notation is part of the text of an HTML page, there are
some caveats that you must keep in mind when you enter your
mathematics. In particular, you need to be careful about the use of
less-than signs and ampersands, since those are what the browser uses
to indicate the start of a tag in HTML or a symbol entity
name. Putting a space on both sides of these characters should be
sufficient, but see :ref:`TeX and LaTeX support <tex-support>` for
more details.

If you are using MathJax within a blog, wiki, or other content
management system, the markup language used by that system may
interfere with the TeX notation used by MathJax.  For example, if your
blog uses Markdown notation for authoring your pages, the underscores
used by TeX to indicate subscripts may be confused with the use of
underscores by Markdown to indicate italics, and the two uses may
prevent your mathematics from being displayed.  See :ref:`TeX and
LaTeX support <tex-support>` for some suggestions about how to deal
with the problem.

There are a number of extensions for the TeX input processor that are
loaded by combined components that include the TeX input format (e.g.,
``tex-chtml.js``), and others that are loaded automatically when
needed.  See :ref:`TeX and LaTeX Extensions <tex-extensions>` for
details on TeX extensions that are available.


.. _mathml-input:

MathML input
------------

For mathematics written in MathML notation, you mark your mathematics
using standard ``<math>`` tags, where ``<math display="block">``
represents displayed mathematics and ``<math display="inline">`` or
just ``<math>`` represents in-line mathematics.

MathML notation will work with MathJax in HTML files, not just XHTML
files, even in older browsers, and the web page need not be served
with any special MIME-type.  Note, however, that in HTML (as opposed to
XHTML), you should **not** include a namespace prefix for your ``<math>``
tags; for example, you should not use ``<m:math>`` except in an XHTML file
where you have tied the ``m`` namespace to the MathML DTD by adding the
``xmlns:m="http://www.w3.org/1998/Math/MathML"`` attribute to your file's
``<html>`` tag.

In order to make your MathML work in the widest range of situations,
it is recommended that you include the
``xmlns="http://www.w3.org/1998/Math/MathML"`` attribute on all
``<math>`` tags in your document, although this is not strictly
required, and this is preferred to the use of a namespace prefix like
``m:`` above, since those are deprecated in HTML5.

Here is a complete sample page containing MathML mathematics (see the
`MathJax Web Demos Repository <https://github.com/mathjax/MathJax-demos-web>`__
for more).

.. code-block:: html

    <!DOCTYPE html>
    <html>
    <head>
    <title>MathJax MathML Test Page</title>
    <script defer src="https://cdn.jsdelivr.net/npm/mathjax@4/mml-chtml.js">
    </script>
    </head>
    <body>

    <p>
    When
    <math xmlns="http://www.w3.org/1998/Math/MathML">
      <mi>a</mi><mo>&#x2260;</mo><mn>0</mn>
    </math>,
    there are two solutions to
    <math xmlns="http://www.w3.org/1998/Math/MathML">
      <mi>a</mi><msup><mi>x</mi><mn>2</mn></msup>
      <mo>+</mo> <mi>b</mi><mi>x</mi>
      <mo>+</mo> <mi>c</mi> <mo>=</mo> <mn>0</mn>
    </math>
    and they are
    <math xmlns="http://www.w3.org/1998/Math/MathML" display="block">
      <mi>x</mi> <mo>=</mo>
      <mrow>
        <mfrac>
          <mrow>
            <mo>&#x2212;</mo>
            <mi>b</mi>
            <mo>&#x00B1;</mo>
            <msqrt>
              <msup><mi>b</mi><mn>2</mn></msup>
              <mo>&#x2212;</mo>
              <mn>4</mn><mi>a</mi><mi>c</mi>
            </msqrt>
          </mrow>
          <mrow>
            <mn>2</mn><mi>a</mi>
          </mrow>
        </mfrac>
      </mrow>
      <mtext>.</mtext>
    </math>
    </p>

    </body>
    </html>

.. raw:: html

    <p>This renders as shown below:</p>
    <p style="background-color: #DDD; padding: 1em 0; text-align: center">
    <iframe style='background-color: white' srcdoc='
      <!DOCTYPE html>
      <html>
      <head>
      <title>MathJax MathML Test Page</title>
      <script defer src="https://cdn.jsdelivr.net/npm/mathjax@4.0.0-beta.7/mml-chtml.js">
      </script>
      </head>
      <body>

      <p>
      When
      <math xmlns="http://www.w3.org/1998/Math/MathML">
        <mi>a</mi><mo>&#x2260;</mo><mn>0</mn>
      </math>,
      there are two solutions to
      <math xmlns="http://www.w3.org/1998/Math/MathML">
        <mi>a</mi><msup><mi>x</mi><mn>2</mn></msup>
        <mo>+</mo> <mi>b</mi><mi>x</mi>
        <mo>+</mo> <mi>c</mi> <mo>=</mo> <mn>0</mn>
      </math>
      and they are
      <math xmlns="http://www.w3.org/1998/Math/MathML" display="block">
        <mi>x</mi> <mo>=</mo>
        <mrow>
          <mfrac>
            <mrow>
              <mo>&#x2212;</mo>
              <mi>b</mi>
              <mo>&#x00B1;</mo>
              <msqrt>
                <msup><mi>b</mi><mn>2</mn></msup>
                <mo>&#x2212;</mo>
                <mn>4</mn><mi>a</mi><mi>c</mi>
              </msqrt>
            </mrow>
            <mrow>
              <mn>2</mn><mi>a</mi>
            </mrow>
          </mfrac>
        </mrow>
        <mtext>.</mtext>
      </math>
      </p>

      </body>
      </html>
    '></iframe>
    </p>

.. _mml-self-closing-tags:

When entering MathML notation in an HTML page (rather than an XHTML
page), you should **not** use self-closing tags, as these are not part
of HTML, but should use explicit open and close tags for all your math
elements.  For example, you should use

.. code-block:: html

    <mspace width="5pt"></mspace>

rather than ``<mspace width="5pt" />`` in an HTML document.  If you
use the self-closing form, some browsers will not build the math tree
properly, and MathJax will receive a damaged math structure, which
will not be rendered as the original notation would have been.
Typically, this will cause parts of your expression to not be
displayed. MathJax does try to unravel the broken DOM tree, but this
process is imperfect.  Unfortunately, there is little MathJax can do
about that, since the browser has incorrectly interpreted the tags
long before MathJax has a chance to work with them.

See the :ref:`MathML <mathml-support>` page for more on MathJax's
MathML support.


.. _asciimath-input:

AsciiMath input
---------------

MathJax v2.0 introduced a new input format, AsciiMath notation, by
incorporating `ASCIIMathML
<https://en.wikipedia.org/wiki/ASCIIMathML>`_ as one of its input
processors.  This has not been fully ported to MathJax version 3 and
above, but there is a version of it that uses the legacy v2 code to
patch it into MathJax v3 and v4.  None of the combined components
currently include it, so you would need to specify it explicitly in
your MathJax configuration in order to use it.  See the
:ref:`AsciiMath <asciimath-support>` page for more details.

By default, you mark mathematical expressions written in AsciiMath by
surrounding them in "back-ticks", i.e., ```...```.

Here is a complete sample page containing AsciiMath notation:

.. code-block:: html

    <!DOCTYPE html>
    <html>
    <head>
    <title>MathJax AsciiMath Test Page</title>
    <script>
    MathJax = {
      loader: {load: ["input/asciimath", "output/chtml", "ui/menu"]},
      output: {font: "mathjax-newcm"}
    }
    </script>
    <script defer src="https://cdn.jsdelivr.net/npm/mathjax@4/startup.js">
    </script>
    <body>

    <p>When `a != 0`, there are two solutions to `ax^2 + bx + c = 0` and
    they are</p>
    <p style="text-align:center">
      `x = (-b +- sqrt(b^2-4ac))/(2a) .`
    </p>

    </body>
    </html>

.. raw:: html

    <p>This renders as shown below:</p>
    <p style="background-color: #DDD; padding: 1em 0; text-align: center">
    <iframe style='background-color: white' srcdoc='
      <!DOCTYPE html>
      <html>
      <head>
      <title>MathJax AsciiMath Test Page</title>
      <script>
      MathJax = {
        loader: {load: ["input/asciimath", "output/chtml", "ui/menu"]},
        output: {font: "mathjax-newcm"}
      }
      </script>
      <script defer src="https://cdn.jsdelivr.net/npm/mathjax@4.0.0-beta.7/startup.js">
      </script>
      <body>

      <p>When `a != 0`, there are two solutions to `ax^2 + bx + c = 0` and
      they are</p>
      <p style="text-align:center">
        `x = (-b +- sqrt(b^2-4ac))/(2a) .`
      </p>

      </body>
      </html>
    '></iframe>
    </p>

Here we are loading the input and output components separately rather
than using a combined configuration file.  Since the ``output/chtml``
components does not have a font configured with it, we need to specify
the font explicitly in the ``output`` section of the MathJax
configuration.  It is also possible to load a combined component like
:file:`tex-chtml.js` rather than :file:`startup.js` and include
``input/asciimath`` in the ``load`` array of the ``loader`` block of
the configuration, in which case the ``mathjax-newcm`` font will
already be included, and won't need to be specified separately.

See the :ref:`AsciiMath support <AsciiMath-support>` page for more on
MathJax's AsciiMath support and how to configure it.


.. _math-in-strings:

Putting Math in Javascript Strings
==================================

If your are using javascript to process mathematics, and need to put a
TeX or LaTeX expression in a string literal, you need to be aware that
javascript uses the backslash (``\``) as a special character in
strings.  Since TeX uses the backslash to indicate a macro name, you
often need backslashes in your javascript strings.  In order to
achieve this, you must double all the backslashes that you want to
have as part of your javascript string.  For example,

.. code-block:: javascript

   const math = '\\frac{1}{\\sqrt{x^2 + 1}}';

This can be particularly confusing when you are using the LaTeX macro
``\\``, as both backslashes must be doubled as ``\\\\``.  So you would do

.. code-block:: javascript

   const array = '\\begin{array}{cc} a & b \\\\ c & d \\end{array}';

to produce an array with two rows.

It is also possible to use the ``String.raw`` constructor to create
strings with backslashes that don't need to be doubled.  For example,

.. code-block::

   const math = String.raw`\frac{1}{\sqrt{x^2 + 1}}`;

is equivalent to the first declaration above.


|-----|
