.. _tex-centernot:

#########
centernot
#########

.. code-block:: javascript

   window.MathJax = {
     loader: {load: ['[tex]/centernot']},
     tex: {packages: {'[+]': ['centernot']}}
   };



Alternatively, use ``\require{centernot}`` in a TeX expression to load it
dynamically from within the math on the page, if the `require`
extension is loaded.

-----


.. _tex-centernot-commands:


centernot Commands
------------------

The `centernot` extension implementes the following macros:
``\centernot``, ``\centerOver``


|-----|