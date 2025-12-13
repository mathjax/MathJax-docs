.. _tex-cases:

#####
cases
#####


The `cases` extension implements the ``cases`` style package from
LaTeX.  It provides environments ``numcases`` and ``subnumcases`` for
formulas with separately enumerated cases.  See the `cases CTAN page
<https://www.ctan.org/pkg/cases>`__ for more information and
documentation.

An example of the ``numcases`` environment is:

.. code-block:: latex

   \begin{numcases} {|x|=}
     x, & for $x \geq 0$\\
     -x, & for $x < 0$
   \end{numcases}

.. raw:: html

    <p>which renders as:</p>
    <p style="background-color: #DDD; padding: 1em 0; text-align: center">
    <iframe style='width: 20em; height: 5em; background-color: white' srcdoc='
      <!DOCTYPE html>
      <html>
      <head>
      <title>MathJax numcases Example</title>
      <script>
      MathJax = {
        loader: {load: ["[tex]/cases", "[tex]/empheq"]},
        tex: {packages: {"[+]": ["cases", "empheq"]}, tags: "ams"}
      }
      </script>
      <script defer src="https://cdn.jsdelivr.net/npm/mathjax@4/tex-chtml.js">
      </script>
      </head>
      <body>
      <p>
      \begin{numcases} {|x|=}
        x, & for $x \geq 0$\\
        -x, & for $x < 0$
      \end{numcases}
      </p>
      </body>
      </html>
    '></iframe>
    </p>


This package is not autoloaded, so you must request it explicitly if
you want to use it.  To load the `cases` extension, add
``'[tex]/cases', '[tex]/empheq'`` to the :data:`load` array of the
:data:`loader` block of your MathJax configuration, and add ``'cases',
'empheq'`` to the :data:`packages` array of the :data:`tex` block.
Note that the :ref:`tex-empheq` package is required when you load `cases`.

.. code-block:: javascript

   window.MathJax = {
     loader: {load: ['[tex]/cases', '[tex]/empheq']},
     tex: {packages: {'[+]': ['cases', 'empheq']}}
   };

You can configure the :ref:`tex-autoload` extension to load `cases`
via

.. code-block:: javascript

   window.MathJax = {
     tex: {
       autoload: {
         cases: [[], ['numcases', 'subnumcases']]
       }
     }
   };

Alternatively, use ``\require{cases}`` in a TeX expression to load it
dynamically from within the math on the page, if the :ref:`tex-require`
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
