.. _automatic-linebreaking:

#######################
Automatic Line Breaking
#######################

One of the important new features of MathJax version 4 is that
of automatic line breaking, which was missing in v3.  The
support in v4 is an improvement over that in v2 in a number of ways.
In particular, version 4 includes the option of breaking in-line
expressions so that long expressions near the end of a line will
automatically break and wrap to the next line.  This is accomplished
by allowing the browser to break the expressions where it needs to
(following TeX's rules for what constitutes a valid in-line
breakpoint).  For display equations, version 4 provides support not
only for automatic line breaking, but also for several other options
for handling wide equations, including scaling the equation (to fit
the container size), and scrolling if it is too wide.  The page author
can set the default, but there is also a new menu item where the
viewer can switch the overflow handling to match their preferences.
Version 4 also implements line-breaking of ``<mtext>`` elements (which
are created by ``\text{}`` and other text-mode macros) , so long
textual material can be broken automatically; this was not possible in
version 2.

As part of the line-breaking support, a number of new TeX macros have
been made available to control line breaks (to make them more or less
desirable, or force or prevent them entirely).  Also, support has been
added for additional `array` environment template patterns that can be
used to control the width and automatic line breaking of table
cells, as well as insert text before or after every cell in a column,
or adjust the spacing between columns.  New macros for creating boxes
of specific widths in which line breaking will occur are also
available, and there are options for controlling justification and
indentation of the text.  Such boxes are also available in MathML via
additional options for the ``mpadded`` element.

Finally, version 4 now attempts to break cells within tables based on
the size of table as a whole (whereas v2 broke cells only if they
individually were too wide for the container, and broke them to the
container width regardless of the size of the rest of the table).
Version 4 also includes the ability to control the vertical alignment
of cells that include line breaks, so that, for example, in an `align`
environment, if the left-hand side has line breaks, the cell will
align on its bottom line, while if the right-hand side has break, the
cell will align at its top line.  This makes the flow across the
columns more natural.

.. raw:: html

    <p>This is illustraated in the example below:</p>
    <p style="background-color: #DDD; padding: 1em 0; text-align: center">
    <iframe style='width: 25em; height: 7em; background-color: white' srcdoc='
      <!DOCTYPE html>
      <html>
      <head>
      <title>MathJax Line-breaking Examples</title>
      <script defer src="https://cdn.jsdelivr.net/npm/mathjax@4.0.0-beta.7/tex-chtml.js"></script>
      </head>
      <body>
      \begin{align}
      {a+b+c\\+d+e}&={A+B+C+D+E+F\\+G+H+I+J}
      \end{align}
      </body>
      </html>
    '></iframe>
    </p>

-----

.. _display-breaking:

Display breaking
================

The algorithm used in version 4 for breaking displayed equations is
based on the one from version 2, but is not identical to it.  Unlike
version 2, the results should be nearly identical between the CHTML
and SVG output renders, and the code is set up so that the algorithm
can be updated or even replaced much easier than in v2.  We do have
plans for improvements that we hope to make in the future.

The page author can control the way long expressions are handled using
the new :data:`displayOverflow` output jax configuration option, which
can be set to ``overflow``, ``scale``, ``scroll``, ``truncate``,
``linebreak``, or ``elide``, though the latter is not yet implemented.
The reader can override that default using the MathJax contextual
menu, which has a new item in the `Math Settings` submenu for handling
`Wide Expressions`.  For MathML input, MathJax version 4 now honors
the :attr:`overflow` attribute of the ``math`` element, so you can
mark a single long expression for line breaking, or for scrolling, for
example.

Note that there is now a new :data:`output` configuration block that
can be used to provide options that are common to both CHTML and SVG
output, so that you may have set for your default output jax will stay
in effect when the user changes renderers via the contextual menu.

When :data:`displayOverflow` is set to ``linebreak``, the breaking is
controlled by the settings in the :data:`linebreaks` sub-block of the
:data:`output` (or :data:`chtml` or :data:`svg`) block.  The default
settings are

.. code-block:: javascript

    MathJax = {
      output: {
        displayOverflow: 'linebreak',  // break long lines
        linebreaks: {                  // options for when overflow is linebreak
          inline: true,                   // true for browser-based breaking of in-line equations
          width: '100%',                  // a fixed size or a percentage of the container width
          lineleading: .2,                // the default lineleading in em units
          LinebreakVisitor: null,         // The LinebreakVisitor to use
        }
      }
    }

The last option is used to replace the line-breaking algorithm with a
new one, so is a developer option, but the others are author-level
settings that control things like how wide the lines are allowed to
be, and how much extra space to put between lines.

-----

.. _inline-breaking:

In-line Breaking
================

In version 4, in-line expressions can be allowed to break
automatically by the browser.  This is controlled via the
:data:`inline` option of the :data:`linebreaks` block described above.
When ``true`` (the default), MathJax will arrange for in-line
expressions to be broken into pieces so that the browser can move
parts of the equation onto the next line, if they would otherwise
extend beyond the width of the expression's container.  In version 2,
in-line expressions are only broken when the expression by itself
would be wider than the container, and in that case, the expression
would essentially act like it was inside a ``<div>`` element, so it
badly disrupts the flow of the paragraph, and could cause misleading
wrapping of text around the broken expression.  This is no longer the
case in version 4.

Note, however, that in order to do this, MathJax must make several
separate elements containing math, and for SVG output in particular,
several separate top-level ``<svg>`` elements.  For this reason, node
applications that are trying to create single SVG images for the
mathematics would want to set :data:`linebreaks.inline` to ``false``
to avoid that.

Finally, because the browser is doing the actual determination of the
locations for in-line breaks, these breaks are chosen purely by how
much of the expression can fit at the end of the line before the
break.  That is, the parameters that mark breakpoints as good or bad
(described below) are not taken into effect; however, forced breaks
and no-break markers are respected.

-----

.. _array-preamble:

TeX Array Line-Break Column Types
=================================

To help support line breaking within cells of wide tables, MathJax v4
includes support for the preamble column declarations defined in the
`array TeX package <https://www.ctan.org/pkg/array>`__.  These include
the traditional ``c``, ``l``, and ``r`` for alignment of the contents
of the cell (centered, left, or right), but adds support for
``p{width}``, ``m{width}``, and ``b{width}`` for vertical alignment of
a fixed-width column in which line-breaking will occur at the given
width, as well as ``w{align}{width}`` and ``W{align}{width}``.  There
is also new support for ``>{...}`` and ``<{...}`` for adding content
that is put before or after every entry in a column, as well as
``@{...}`` for replacing the inter-column space with the given
content, and ``!{...}`` for replacing inter-column rules.  Support for
``|`` and the non-standard ``:`` are improved so multiple copies of
``|`` and ``:`` now produce multiple rules that are close together.
The ``*{n}{...}`` option for repeating a column declaration `n` times
is also supported.  Finally, non-standard ``P{...}``, ``M{...}``, and
``B{...}`` are defined that produce math-mode versions of their
corresponding lower-case counterparts.  The ``\newcolumntype`` macro
for declaring new column specifications is also available.

Note that for ``p``, ``m``, ``b``, ``w``, ``W``, ``P``, ``M``, and
``B`` columns, line-breaking will occur within the given column only if
line-breaking is the active overflow setting.  Otherwise, wide content
will overflow the width, as in actual LaTeX.

-----

.. _linebreaking-macros:

Line-breaking macros in TeX
===========================

In MathML, ``<mo>`` and ``<mspace>`` items can be marked as either
good or bad breakpoint options via the :attr:`linebreak="goodbreak"`
or :attr:`linebreak="badbreak"` options, or linebreaks can be
prevented via :attr:`linebreak="nobreak"` or forced with
:attr:`linebreak="newline"`.  In TeX, these can be controlled via the
``\goodbreak``, ``\badbreak``, ``\nobreak``, and ``\break`` (or
``\\``) macros.  These will try to mark the operator that follows (or
in some case precedes) the macro using the appropriate
:attr:`linebreak` attribute.  If there is no operator, then an empty
one having the appropriate attribute will be introduced into the
expression at that location.  There is also the ``\allowbreak`` macro
that inserts a breakpoint that can be used if one is needed.

The ``\parbox[align]{width}{text}`` macro has been added in v4 to
provide a line-breaking context of a given width and vertical
alignment (``t``, ``b``, ``c`` for top, bottom, center (the default),
with ``m`` allowed as an alias for ``c``) for text-mode material.
Previous versions of MathJax include ``\vcenter{}`` for vertical
centering, and v4 adds ``\vtop{}`` and ``\vbox{}`` for material to be
aligned on the top line or bottom line of the contents.  In LaTeX,
their content is text-mode, but in MathJax, they are in math mode
(since MathJax mainly does math-mode, and for backward compatibility
with the original ``\vcenter{}`` implementation).  The width of these
boxes can be controlled using ``\hsize=<dimen>`` within the box, so
``\vtop{\hsize=10em ...}`` would make a box that is 10em wide whose
content is line broken and aligned on the baseline of the first line.
Finally, the ``\makebox[width][align]{text}`` macro can also be used
to produce a line-breaking text box of a given width and vertical
alignment.  (This complements the ``\mathmakebox[width][align]{math}``
macro already in the :ref:`tex-mathtools` package.)

In addition, version 4 introduces a new non-standard ``\breakAlign``
macro that can be used to set the vertical alignment for the various
cells, rows, or columns in the alignment.  The format is
``\breakAlign{type}{align}``, where ``type`` is one of ``c``, ``r``,
or ``t``, indicating whether the alignment is for the single cell in
which it occurs, the row in which it occurs, or for the entire table,
and ``align`` is one of ``t``, ``c``, ``m``, ``b``, for top, center,
middle, or bottom.  The difference between ``c`` and ``m`` is that
``c`` always centers the cell regardless of line breaks, while ``m``
only centers if there are line breaks, and otherwise aligns on the
cell baseline.  When type is ``r`` or ``t``, then ``align`` can be a
sequence of these letters giving the alignments to use in each entry
in the row, with the last one being repeated if there are more columns
than letters.  When type is ``t`` the alignments are applied as row
alignments to each row in the table.

For example, ``\breakAlign{t}{bt}`` could be used at the beginning of
an alignment to make the baseline of the bottom row of the first
column align with that of the top row of the second column.  This is
the default for `align` environments, as shown in the example above.

When line-breaking is enabled, you may want to have more control over
how long lines of an alignment are broken.  You can use ``\hbox`` or
``\mbox`` to avoid line breaks, but when you do allow breaks, you may
want more control over indenting and alignment in such settings.  For
this reason, MathJax v4 introduces a non-standard ``indentalign``
environment that can be used within a cell of a table (or in any
line-breaking context) to adjust the indentation amount and the
horizontal alignment of any wrapped lines:

.. code-block:: latex

   \begin{indentalign}[first][middle][last]{align}
     (long line of math)
   \end{indentalign}

where ``first``, ``middle``, and ``last`` are optional dimensions that
specify how much indentation to use for the first, middle, and last
lines (where middle is any but the first or last lines).  If only
``first`` and ``middle`` are provided, ``last`` will be the same as
``middle``, and if only ``first`` is given, all three will use the
same value.  The ``align`` argument is one to three letters, each
being one of ``l``, ``c``, or ``r``, and these represent the
alignments for the first, middle, and last lines.  So

.. code-block:: latex

   \begin{indentalign}[0em][2em]{l}
     x = A + B + C\\
       + D + E + F + G\\
       + H + I + J
   \end{indentalign}

would left align all lines, and indent the second and third lines
by 2em, when used in a context where line-breaking is in effect.

.. raw:: html

    <p style="background-color: #DDD; padding: 1em 0; text-align: center">
    <iframe style='width: 20em; height: 7em; background-color: white' srcdoc='
      <!DOCTYPE html>
      <html>
      <head>
      <title>MathJax Line-breaking Examples</title>
      <script defer src="https://cdn.jsdelivr.net/npm/mathjax@4.0.0-beta.7/tex-chtml.js"></script>
      </head>
      <body>
      \begin{indentalign}[0em][2em]{l}
        x = A + B + C\\
          + D + E + F + G\\
          + H + I + J
      \end{indentalign}
      </body>
      </html>
    '></iframe>
    </p>

-----

.. _mathml-linbreaking:

Breaking and Alignment in MathML
================================

Control of line-breaking and alignment like that in TeX can be
accomplished in MathML input using the new :attr:`data-break-align`
attribute on the ``mtable``, ``mtr``, or ``mlabeledtr`` elements, or
the :attr:`data-vertial-align` attribute for ``mtd`` elements.  These
can have values of ``top``, ``center``, ``middle``, or ``bottom``
(repeated and space-separated for tables and rows).

The :attr:`data-vertical-align` attribute can be used on ``msqrt``,
``mroot``, and ``mrow`` elements as well to adjust how they are
aligned when they contain line breaks. The default for roots is
``bottom``, so that if line-breaks occur within a root, the root will
align on its bottom line.

.. raw:: html

    <p style="background-color: #DDD; padding: 1em 0; text-align: center">
    <iframe style='width: 25em; height: 7em; background-color: white' srcdoc='
      <!DOCTYPE html>
      <html>
      <head>
      <title>MathJax Line-breaking Examples</title>
      <script defer src="https://cdn.jsdelivr.net/npm/mathjax@4.0.0-beta.7/mml-chtml.js"></script>
      </head>
      <body>
        <math xmlns="http://www.w3.org/1998/Math/MathML" display="block">
          <mtable displaystyle="true" columnalign="right left" columnspacing="0em" rowspacing="3pt" data-break-align="bottom top">
            <mtr>
              <mtd>
                <msqrt>
                  <mi>a</mi>
                  <mo>+</mo>
                  <mi>b</mi>
                  <mo>+</mo>
                  <mi>c</mi>
                  <mspace linebreak="newline"></mspace>
                  <mo>+</mo>
                  <mi>d</mi>
                  <mo>+</mo>
                  <mi>e</mi>
                </msqrt>
              </mtd>
              <mtd>
                <mstyle indentshift="2em">
                  <mi></mi>
                  <mo>=</mo>
                  <mrow data-mjx-texclass="ORD">
                    <mi>A</mi>
                    <mo>+</mo>
                    <mi>B</mi>
                    <mo>+</mo>
                    <mi>C</mi>
                    <mo>+</mo>
                    <mi>D</mi>
                    <mo>+</mo>
                    <mi>E</mi>
                    <mo>+</mo>
                    <mi>F</mi>
                    <mspace linebreak="newline"></mspace>
                    <mo>+</mo>
                    <mi>G</mi>
                    <mo>+</mo>
                    <mi>H</mi>
                    <mo>+</mo>
                    <mi>I</mi>
                    <mo>+</mo>
                    <mi>J</mi>
                  </mrow>
                </mstyle>
              </mtd>
            </mtr>
          </mtable>
        </math>
      </body>
      </html>
    '></iframe>
    </p>


In TeX there is no direct control over this attribute within roots.

-----

.. _mpadded-options:

Options for ``<mpadded>`` elements
==================================

The various line-breaking boxes described above for LaTeX expressions
are implemented via the MathML ``<mpadded>`` element.  In order to
facility that, MathJax v4 adds two non-standard attributes to the
``mpadded`` element: :attr:`data-overflow` and :attr:`data-align`.
When :attr:`data-overflow="linebreak"` is used, the contents performs
line-breaking to the width specified in the element's :attr:`width`
attribute.  (No other value for :attr:`data-linebreak` is
implemented).  The :attr:`data-align` attribute value can be ``left``,
``center`` or ``right``, to get the contents (line-broken or not)
aligned to the left, center, or right of the specified width.  You can
use an ``<mstyle>`` element within the ``<mpadded>`` element in order
to set the ``indentshift``, ``indentalign``, and similar attributes
(for first and last lines) of the content, or can specify those
attributes on the individual ``<mo>`` or ``<mspace>`` elements within
the ``<mpadded>`` container.

For example:

.. code-block:: xml

    <math xmlns="http://www.w3.org/1998/Math/MathML" display="block">
      <mpadded data-overflow="linebreak" data-align="right" width="5em" style="border: 2px solid lightgrey">
        <mi>x</mi>
        <mo>=</mo>
        <mi>A</mi>
        <mo>+</mo>
        <mi>B</mi>
        <mo>+</mo>
        <mi>C</mi>
        <mo>+</mo>
        <mi>D</mi>
        <mo>+</mo>
        <mi>E</mi>
        <mo>+</mo>
        <mi>F</mi>
        <mo>+</mo>
        <mi>G</mi>
      </mpadded>
    </math>

would show a box with a grey outline whose content is broken into
several right-aligned lines.

.. raw:: html

    <p style="background-color: #DDD; padding: 1em 0; text-align: center">
    <iframe style='width: 20em; height: 8em; background-color: white' srcdoc='
      <!DOCTYPE html>
      <html>
      <head>
      <title>MathJax Line-breaking Examples</title>
      <script defer src="https://cdn.jsdelivr.net/npm/mathjax@4.0.0-beta.7/mml-chtml.js"></script>
      </head>
      <body>
        <math xmlns="http://www.w3.org/1998/Math/MathML" display="block">
          <mpadded data-overflow="linebreak" data-align="right" width="5em" style="border: 2px solid lightgrey">
            <mi>x</mi>
            <mo>=</mo>
            <mi>A</mi>
            <mo>+</mo>
            <mi>B</mi>
            <mo>+</mo>
            <mi>C</mi>
            <mo>+</mo>
            <mi>D</mi>
            <mo>+</mo>
            <mi>E</mi>
            <mo>+</mo>
            <mi>F</mi>
            <mo>+</mo>
            <mi>G</mi>
          </mpadded>
        </math>
      </body>
      </html>
    '></iframe>
    </p>



|-----|
