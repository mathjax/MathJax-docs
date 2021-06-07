.. _tex-gensymb:

#######
gensymb
#######

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