.. _tex-gensymb:

#######
gensymb
#######

The `gensymb` extension implements the ``gensymb`` style package from
LaTeX. It provides a number of macros for unit notation.  See the
`CTAN page <https://www.ctan.org/pkg/gensymb>`__ for more information
and documentation for `gensymb`.

Note that the ``mathjax-tex`` font (the original default font in v2
and v3) does not include several of these characters, so the output
will depend on the system fonts available to your reader, and will
vary from reader to reader.

This package is not autoloaded, so you must request it explicitly if
you want to use it.  To load the `gensymb` extension, add
``'[tex]/gensymb'`` to the :data:`load` array of the :data:`loader`
block of your MathJax configuration, and add ``'gensymb'`` to the
:data:`packages` array of the :data:`tex` block.

.. code-block:: javascript

   window.MathJax = {
     loader: {load: ['[tex]/gensymb']},
     tex: {packages: {'[+]': ['gensymb']}}
   };

You can configure the :ref:`tex-autoload` extension to load `gensymb`
via

.. code-block:: javascript

   window.MathJax = {
     tex: {
       autoload: {
         gensymb: ['celsius', 'degree', 'micro', 'ohm', 'perthousand']
       }
     }
   };

Alternatively, use ``\require{gensymb}`` in a TeX expression to load
it dynamically from within the math on the page, if the :ref:`tex-require`
extension is loaded.

-----

.. _tex-gensymb-commands:

gensymb Commands
----------------

The `gensymb` extension implements the following macros:
``\celsius``, ``\degree``, ``\micro``, ``\ohm``, ``\perthousand``


|-----|
