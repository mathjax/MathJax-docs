.. _configure-CommonHTML:

*******************************
The CommonHTML output processor
*******************************

The options below control the operation of the CommonHTML output
processor that is run when you include ``"output/CommonHTML"`` in the
`jax` array of your configuration or load a combined configuration
file that includes the CommonHTML output jax.  They are listed with their default
values.  To set any of these options, include an ``CommonHTML`` section
in your :meth:`MathJax.Hub.Config()` call.  For example

.. code-block:: javascript

    MathJax.Hub.Config({
      CommonHTML: {
        scale: 120
      }
    });

would set the ``scale`` option to 120%.

.. describe:: scale: 100

    The scaling factor (as a percentage) of math with respect to the
    surrounding text.  The `CommonHTML` output processor tries to match
    the ex-size of the mathematics with that of the text where it is
    placed, but you may want to adjust the results using this scaling
    factor.  The user can also adjust this value using the contextual
    menu item associated with the typeset mathematics.

.. describe:: minScaleAdjust: 50

   This gives a minimum scale (as a percent) for the scaling used by 
   MathJax to match the equation to the surrounding text.  This will 
   prevent MathJax from making the mathematics too small.

.. describe:: mtextFontInherit: false

    This setting controls whether ``<mtext>`` elements will be typeset
    using the math fonts or the font of the surrounding text.  When
    ``false``, the font for ``mathvariant="normal"`` will be used;
    when ``true``, the font will be inherited from the surrounding
    paragraph.

.. describe:: linebreaks: {}

    This is an object that configures automatic linebreaking in the
    CommonHTML output.  In order to be backward compatible with earlier
    versions of MathJax, only explicit line breaks are performed by
    default, so you must enable line breaks if you want automatic
    ones.  The object contains the following values:

    .. describe:: automatic: false

        This controls the automatic breaking of expressions: when
        ``false``, only ``linebreak="newline"`` is processed; when
        ``true``, line breaks are inserted automatically in long
        expressions.

    .. describe:: width: "container"

      This controls how wide the lines of mathematics can be.
      
      Use an explicit width like ``"30em"`` for a fixed width.
      Use ``"container"`` to compute the size from the containing
      element.
      Use ``"nn% container"`` for a portion of the container.
      Use ``"nn%"`` for a portion of the window size.
        
      The container-based widths may be slower, and may not produce
      the expected results if the layout width changes due to the
      removal of previews or inclusion of mathematics during
      typesetting.