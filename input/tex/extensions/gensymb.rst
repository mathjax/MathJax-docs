.. _tex-gensymb:

#######
gensymb
#######

The `gensymb` extension implements the ``gensymb`` style package from LaTeX. It
provides a number of macros for unit notation.  See the `CTAN page
<https://www.ctan.org/pkg/gensymb>`__ for more information and documentation of
`gensymb`.

Note that not all the characters for this package are yet included in the
MathJax fonts so output might vary on clients.

This package is not autoloaded, so you must request it explicitly if you want to use it.
To load the `gensymb` extension, add ``'[tex]/gensymb'`` to the ``load`` array of the ``loader`` block of your
MathJax configuration, and add ``'gensymb'`` to the ``packages`` array of the ``tex`` block.

.. code-block:: javascript

   window.MathJax = {
     loader: {load: ['[tex]/gensymb']},
     tex: {packages: {'[+]': ['gensymb']}}
   };


You can configure the `autoload` extension to load `gensymb` via

.. code-block:: javascript

   window.MathJax = {
     tex: {
       autoload: {
         gensymb: ['celsius', 'degree', 'micro', 'ohm', 'perthousand']
       }
     }
   };



Alternatively, use ``\require{gensymb}`` in a TeX expression to load it
dynamically from within the math on the page, if the `require`
extension is loaded.

-----


.. _tex-gensymb-commands:


gensymb Commands
----------------

The `gensymb` extension implements the following macros:
``\celsius``, ``\degree``, ``\micro``, ``\ohm``, ``\perthousand``


|-----|
