.. _tex-centernot:

#########
centernot
#########

The `centernot` extension implements the ``centernot`` style package
from LaTeX. It provides the ``\centernot`` command which can be used
as a replacement of the standard ``\not`` command and generally leads
to a better alignment of the slash with the operator it negates. This
can be observed with the following two examples:

.. code-block:: latex

  \begin{array}{c}
    A \not\longrightarrow B\\
    A \centernot\longrightarrow B
  \end{array}

.. code-block:: latex

  \begin{array}{c}
    A \nparallel B\\
    A \not\parallel B\\
    A \centernot\parallel B
  \end{array}

.. raw:: html

    <p>These render as follows:</p>
    <p style="background-color: #DDD; padding: 1em 0; text-align: center">
    <iframe style='width: 20em; height: 12em; background-color: white' srcdoc='
      <!DOCTYPE html>
      <html>
      <head>
      <title>MathJax centernot Examples</title>
      <script>
      MathJax = {
        loader: {load: ["[tex]/centernot"]},
        tex: {packages: {"[+]": ["centernot"]}}
      }
      </script>
      <script defer src="https://cdn.jsdelivr.net/npm/mathjax@4/tex-chtml.js">
      </script>
      </head>
      <body>
      $$\begin{array}{c}
        A \not\longrightarrow B\\
        A \centernot\longrightarrow B
      \end{array}$$
      $$\begin{array}{c}
        A \nparallel B\\
        A \not\parallel B\\
        A \centernot\parallel B
      \end{array}$$
      </body>
      </html>
    '></iframe>
    </p>


See also the `centernot CTAN page
<https://www.ctan.org/pkg/centernot>`__ for more information and
documentation.

In addition to ``\centernot`` the package also implements the
non-standard ``\centerOver``.

.. describe:: \centerOver{symbol1}{symbol2}

    Overlays ``symbol2`` centered on top of ``symbol1``.  The result
    has the width and TeX class of ``symbol1``.

For example, the following produces a circle around a triangle:

.. code-block::

   \centerOver{\bigcirc}{\small\triangle}

.. raw:: html

    <p>This renders between two *x* as follows:</p>
    <p style="background-color: #DDD; padding: 1em 0; text-align: center">
    <iframe style='width: 10em; height: 4em; background-color: white' srcdoc='
      <!DOCTYPE html>
      <html>
      <head>
      <title>MathJax centerOver Example</title>
      <script>
      MathJax = {
        loader: {load: ["[tex]/centernot"]},
        tex: {packages: {"[+]": ["centernot"]}}
      }
      </script>
      <script defer src="https://cdn.jsdelivr.net/npm/mathjax@4/tex-chtml.js">
      </script>
      </head>
      <body>
      $$x \centerOver{\bigcirc}{\small\triangle} x$$
      </body>
      </html>
    '></iframe>
    </p>


This package is not autoloaded, so you must request it explicitly if
you want to use it.  To load the `centernot` extension, add
``'[tex]/centernot'`` to the :data:`load` array of the :data:`loader`
block of your MathJax configuration, and add ``'centernot'`` to the
:data:`packages` array of the :data:`tex` block.

.. code-block:: javascript

   window.MathJax = {
     loader: {load: ['[tex]/centernot']},
     tex: {packages: {'[+]': ['centernot']}}
   };

You can configure the :ref:`tex-autoload` extension to load
`centernot` via

.. code-block:: javascript

   window.MathJax = {
     tex: {
       autoload: {
         centernot: ['centernot', 'centerOver']
       }
     }
   };

Alternatively, use ``\require{centernot}`` in a TeX expression to load
it dynamically from within the math on the page, if the :ref:`tex-require`
extension is loaded.

-----

.. _tex-centernot-commands:

centernot Commands
------------------

The `centernot` extension implements the following macros:
``\centernot``, ``\centerOver``


|-----|
