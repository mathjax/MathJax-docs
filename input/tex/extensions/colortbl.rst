.. _tex-colortbl:

########
colortbl
########

.. code-block:: javascript

   window.MathJax = {
     loader: {load: ['[tex]/colortbl']},
     tex: {packages: {'[+]': ['colortbl']}}
   };



Alternatively, use ``\require{colortbl}`` in a TeX expression to load it
dynamically from within the math on the page, if the `require`
extension is loaded.

-----


.. _tex-colortbl-commands:


colortbl Commands
-----------------

The `colortbl` extension implementes the following macros:
``\cellcolor``, ``\columncolor``, ``\rowcolor``


|-----|