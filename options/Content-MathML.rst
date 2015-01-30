.. _configure-Content-MathML:

****************************
The Content MathML extension
****************************

The options below control the operation of the Content MathML extension
that is run when you include ``"MathML/content-mathml.js"`` in the `extension`
array of your configuration.  They are listed with their default values.  To
set any of these options, include a ``Content-MathML`` section in your
:meth:`MathJax.Hub.Config()` call. 

.. code-block:: javascript

    MathJax.Hub.Config({
      "content-mathml": {
        collapsePlusMinus: true,
        cistyles: {
          vector: 'bold-italic',
          matrix: 'bold-upright'
        },
        symbols: {
          gamma: '\u03B3'
        }
      }
    });

These options allow the following.

.. describe:: collapsePlusMinus: true,

    Specifies whether a Plus followed by a Minus is collapsed, e.g.,
    `a+(-b)` simplified to `a-b`.

.. describe:: cistyles: {...}

    Specifies which mathvariant to use with corresponding <ci> type attribute.

.. describe:: symbols: {...}

    Specifies symbol names to translate to characters.

Further customization is possible by modifying its functions on the fly.