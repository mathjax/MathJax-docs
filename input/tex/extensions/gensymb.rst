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

.. code-block:: javascript

   window.MathJax = {
     loader: {load: ['[tex]/gensymb']},
     tex: {packages: {'[+]': ['gensymb']}}
   };



Alternatively, use ``\require{gensymb}`` in a TeX expression to load it
dynamically from within the math on the page, if the `require`
extension is loaded.

-----


.. _tex-gensymb-commands:


gensymb Commands
----------------

The `gensymb` extension implementes the following macros:
``\celsius``, ``\degree``, ``\micro``, ``\ohm``, ``\perthousand``


|-----|
