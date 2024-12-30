.. _tex-colortbl:

########
colortbl
########

The `colortbl` extension partially implements the ``colortbl`` style
package from LaTeX.  It allows coloring of rows, columns, and
individual cell of tables.  See the `colortbl CTAN page
<https://www.ctan.org/pkg/colortbl>`__ for more information and
documentation.  Note that MathJax currently does not implement any
commands for styling or coloring table boundaries. In addition,
MathJax implement some of the `colortbl` commands differently:

.. describe:: \rowcolor[model]{color}

   Specifies the color for a single row in a table. It needs to be used in the first
   cell of a row to color.  If used elsewhere, it will produce an error.

.. describe:: \columncolor[model]{color}

   Specifies the color for a single column.  It needs to be used in
   the first **cell** of the column to color, or in the table or array
   preamble. If used elsewhere, it will produce an error.

   In addition overhang arguments are currently not handled. That is MathJax
   ignores up to two optional bracketed arguments after the mandatory color
   argument.

.. describe:: \cellcolor[model]{color}

   Allows to color a single cell. It can be used anywhere in the cell to color.


.. note::

   In version 3, the ``\columncolor`` macro could not be used in the
   preamble for the table or array, but had to be in the cell of the
   column in the first row of the table.  In v4, you can use
   ``\columncolor`` in the preamble, but for backward compatibility,
   you can use it in the first row as well.
   
The order of precedence of the color commands is as follows:
``\cellcolor`` > ``\rowcolor`` > ``\columncolor``.  See the example
below for all three commands in action.

.. code-block:: latex

  \begin{array}{|>{\columncolor{red}}c|c|}
    \rowcolor[gray]{.5} one & two\\
    \rowcolor{lightblue} three & four\\\hline
    five & six \\
    \rowcolor{magenta} \cellcolor{green} \color{white}seven &eight
  \end{array}

.. raw:: html

    <p>This renders as follows:</p>
    <p style="background-color: #DDD; padding: 1em 0; text-align: center">
    <iframe style='width: 20em; height: 9em; background-color: white' srcdoc='
      <!DOCTYPE html>
      <html>
      <head>
      <title>MathJax colortbl Examples</title>
      <script>
      MathJax = {
        loader: {load: ["[tex]/colortbl"]},
        tex: {packages: {"[+]": ["colortbl"]}}
      }
      </script>
      <script defer src="https://cdn.jsdelivr.net/npm/mathjax@4/tex-chtml.js">
      </script>
      </head>
      <body>
      $$\begin{array}{|>{\columncolor{red}}c|c|}
        \rowcolor[gray]{.5} one & two\\
        \rowcolor{lightblue} three & four\\\hline
        five & six \\
        \rowcolor{magenta} \cellcolor{green} \color{white}seven &eight
      \end{array}$$
      </body>
      </html>
    '></iframe>
    </p>


This package is not autoloaded, so you must request it explicitly if
you want to use it.  To load the `colortbl` extension, add
``'[tex]/colortbl'`` to the :data:`load` array of the :data:`loader`
block of your MathJax configuration, and add ``'colortbl'`` to the
:data:`packages` array of the :data:`tex` block.

.. code-block:: javascript

   window.MathJax = {
     loader: {load: ['[tex]/colortbl']},
     tex: {packages: {'[+]': ['colortbl']}}
   };

You can configure the :ref:`tex-autoload` extension to load `colortbl`
via

.. code-block:: javascript

   window.MathJax = {
     tex: {
       autoload: {
         colortbl: ['cellcolor', 'columncolor', 'rowcolor']
       }
     }
   };

Alternatively, use ``\require{colortbl}`` in a TeX expression to load it
dynamically from within the math on the page, if the :ref:`tex-require`
extension is loaded.

-----

.. _tex-colortbl-commands:

colortbl Commands
-----------------

The `colortbl` extension implements the following macros:
``\cellcolor``, ``\columncolor``, ``\rowcolor``


|-----|
