.. _tex-cases:

#####
cases
#####


The `cases` extension implements the ``cases`` style package from LaTeX.  It
provides environments ``numcases`` and ``subnumcases`` for formulas with
separately enumerated cases.  See the `CTAN page
<https://www.ctan.org/pkg/cases>`__ for more information and documentation of
`cases`.

This package is not autoloaded, so you must request it explicitly if you want to use it.
To load the `cases` extension, add ``'[tex]/cases'`` to the ``load`` array of the ``loader`` block of your
MathJax configuration, and add ``'cases'`` to the ``packages`` array of the ``tex`` block.


.. code-block:: javascript

   window.MathJax = {
     loader: {load: ['[tex]/cases']},
     tex: {packages: {'[+]': ['cases']}}
   };


You can configure the `autoload` extension to load `cases` via

.. code-block:: javascript

   window.MathJax = {
     tex: {
       autoload: {
         cases: [[], ['numcases', 'subnumcases']]
       }
     }
   };


Alternatively, use ``\require{cases}`` in a TeX expression to load it
dynamically from within the math on the page, if the `require`
extension is loaded.

-----


.. _tex-cases-commands:


cases Commands
--------------

The `cases` extension implements the following macros:
``&``

And the following environments:
``numcases``, ``subnumcases``


|-----|
