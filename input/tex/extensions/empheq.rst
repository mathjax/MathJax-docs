.. _tex-empheq:

######
empheq
######


The `empheq` extension partially implements the ``empheq`` style package from
LaTeX.  The package provides macros and environments for emphasising equations.
See the :ref:`list of control sequences <tex-empheq-commands>` for details about
what commands are implemented in this extension.  Note, that the current
implementation of the ``empheq`` environment supports only the ``left`` and
``right`` options. Also see the `CTAN page <https://www.ctan.org/pkg/empheq>`__
for more information and documentation of `empheq`.

This package is not autoloaded, so you must request it explicitly if you want to use it.
To load the `empheq` extension, add ``'[tex]/empheq'`` to the ``load`` array of the ``loader`` block of your
MathJax configuration, and add ``'empheq'`` to the ``packages`` array of the ``tex`` block.


.. code-block:: javascript

   window.MathJax = {
     loader: {load: ['[tex]/empheq']},
     tex: {packages: {'[+]': ['empheq']}}
   };


You can configure the `autoload` extension to load `empheq` when the
``empheq`` environment is first used via

.. code-block:: javascript

   window.MathJax = {
     tex: {
       autoload: {
         empheq: [[], ['empheq']]
       }
     }
   };



Alternatively, use ``\require{empheq}`` in a TeX expression to load it
dynamically from within the math on the page, if the `require`
extension is loaded.

-----


.. _tex-empheq-commands:


empheq Commands
---------------

The `empheq` extension implements the following macros:
``\empheqbigl``, ``\empheqbiglangle``, ``\empheqbiglbrace``, ``\empheqbiglbrack``, ``\empheqbiglceil``, ``\empheqbiglfloor``, ``\empheqbiglparen``, ``\empheqbiglvert``, ``\empheqbiglVert``, ``\empheqbigr``, ``\empheqbigrangle``, ``\empheqbigrbrace``, ``\empheqbigrbrack``, ``\empheqbigrceil``, ``\empheqbigrfloor``, ``\empheqbigrparen``, ``\empheqbigrvert``, ``\empheqbigrVert``, ``\empheql``, ``\empheqlangle``, ``\empheqlbrace``, ``\empheqlbrack``, ``\empheqlceil``, ``\empheqlfloor``, ``\empheqlparen``, ``\empheqlvert``, ``\empheqlVert``, ``\empheqr``, ``\empheqrangle``, ``\empheqrbrace``, ``\empheqrbrack``, ``\empheqrceil``, ``\empheqrfloor``, ``\empheqrparen``, ``\empheqrvert``, ``\empheqrVert``

And the following environments:
``empheq``


|-----|
