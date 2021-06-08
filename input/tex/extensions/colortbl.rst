.. _tex-colortbl:

########
colortbl
########

The `colortbl` extension partially implements the ``colortbl`` style package
from LaTeX. It allows coloring of rows, columns and individual cell of tables.
See the `CTAN page <https://www.ctan.org/pkg/colortbl>`__ for more information
and documentation of `colortbl`. But note that MathJax currently does not
implement any commands for styling or coloring table boundaries. In addition,
MathJax implement some of the `colortbl` commands differently:


.. describe:: \rowcolor[model]{color}

   Allows to color a single row in a table. It needs to be used in the first
   cell of a row to color. If used elsewhere an error is thrown.

.. describe:: \columncolor[model]{color}

   Allows to color a single column. It needs to be used in the first **cell** of
   the column to color. If used elsewhere an error is thrown.

   Note, that it is unlike its LaTeX counterpart that is used in the layout
   specification of a tabular environment. While MathJax will not throw an error
   of a ``\columncolor`` is used in the arguments of the tabular environment, it
   will be ignored.

.. describe:: \cellcolor[model]{color}

   Allows to color a single cell. It can be used anywhere in the cell to color.


The order of precendence of the color commands is as follows: ``\cellcolor > \rowcolor > \columncolor``.
See the example below for all three commands in action.

.. code-block:: latex

  \begin{array}{|l|c|}
    \rowcolor[gray]{.5}\columncolor{red} one & two\\
    \rowcolor{lightblue} three & four\\\hline
    five & six \\
    \rowcolor{magenta}seven & \cellcolor{green}eight
  \end{array}


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
