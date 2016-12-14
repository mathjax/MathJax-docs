.. _configure-PlainSource:

********************************
The PlainSource output processor
********************************

The PlainSource output processor displays plain text input when possible. 
I.e., it will display the raw input data from TeX or Asciimath input, 
embedded TeX or AsciiMath annotations from MathML input, and MathML if
neither annotation format is found.

The options below control the operation of the PlainSource output
processor that is run when you include ``"output/PlainSource"`` in the
`jax` array of your configuration.  They are listed with their default
values.  To set any of these options, include an ``PlainSource`` section
in your :meth:`MathJax.Hub.Config()` call.  For example

.. code-block:: javascript

    MathJax.Hub.Config({
      PlainSource: {
        styles: {
          ".MathJax_PlainSource_Display": {
            "text-align": "center",
            margin: ".75em 0px",
            "white-space":"pre"
          }
        }
      }
    });

would configure some CSS properties of the resulting HTML markup.

.. describe:: styles: {}

    This is a list of CSS declarations for styling the PlainSource output.
    See the definitions in ``jax/output/SVG/config.js`` for some
    examples of what are defined by default.  See :ref:`CSS Style
    Objects <css-style-objects>` for details on how to specify CSS
    style in a JavaScript object.
