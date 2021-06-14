.. _tex-colorv2:

#######
colorv2
#######

The `colorv2` extension defines the ``\color`` macro to be the
non-standard macro that is the default in MathJax version 2, namely,
it takes two arguments, one the name of the color (or an HTML color of
the form ``#RGB`` or ``#RRGGBB``), and the second the math to be
colored.  This is in contrast to the standard LaTeX ``\color``
command, which is a switch that changes the color of everything that
follows it.

This extension is **not** loaded automatically when the `autoload`
extension is used.  To load the `color` extension explicitly, add
``'[tex]/color'`` to the ``load`` array of the ``loader`` block of
your MathJax configuration, and add ``'color'`` to the ``packages``
array of the ``tex`` block.

.. code-block:: javascript

   window.MathJax = {
     loader: {load: ['[tex]/colorv2']},
     tex: {packages: {'[+]': ['color']}}
   };

or, use ``\require{colorv2}`` in a TeX expression to load it
dynamically from within the math on the page, if the `require`
extension is loaded.

Alternatively, you can configure the `autoload` package to load
`colorv2` when ``\color`` is used rather than the (LaTeX-compatible)
`color` extension:

.. code-block:: javascript

   window.MathJax = {
     tex: {
       autoload: {
         color: [],            // don't autoload the color extension
         colorv2: ['color']    // autoload colorv2 on the first use of \color
       }
     }
   };

-----


.. _tex-colorv2-commands:


colorv2 Commands
----------------

The `colorv2` extension implements the following macros:
``\color``


|-----|
