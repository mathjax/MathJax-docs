.. _tex-cancel:

######
cancel
######

The `cancel` extension implements the ``cancel`` package from LaTeX,
which provides a means of "crossing out" sub-expressions in various
ways.  See the `cancel CTAN page <https://www.ctan.org/pkg/bbm>`__ for
more information and documentation.  See also the :ref:`tex-enclose`
extension for some alternative approaches to crossing out
sub-expressions.

This package defines the following macros:

.. describe:: \cancel{math}

    Strikeout ``math`` from lower left to upper right.

.. describe:: \bcancel{math}

    Strikeout ``math`` from upper left to lower right.

.. describe:: \xcancel{math}

    Strikeout ``math`` with an "X".

.. describe:: \cancelto{value}{math}

    Strikeout ``math`` with an arrow going to ``value``.

.. raw:: html

    <p>Some examples are as follow:</p>
    <p style="background-color: #DDD; padding: 1em 0; text-align: center">
    <iframe style='width: 15em; height: 6em; background-color: white' srcdoc='
      <!DOCTYPE html>
      <html>
      <head>
      <title>MathJax cancel Examples</title>
      <script>
      MathJax = {
        loader: {load: ["[tex]/cancel"]},
        tex: {packages: {"[+]": ["cancel"]}}
      }
      </script>
      <script defer src="https://cdn.jsdelivr.net/npm/mathjax@4/tex-chtml.js">
      </script>
      </head>
      <body>
      $$\begin{array}{cc}
      \cancel{x+1} & \bcancel{x+1}\\
      \xcancel{x+1} & \cancelto{0}{x+1}
      \end{array}$$
      </body>
      </html>
    '></iframe>
    </p>


This extension is loaded automatically when the :ref:`tex-autoload`
extension is used.  To load the `cancel` extension explicitly, add
``'[tex]/cancel'`` to the :data:`load` array of the :data:`loader`
block of your MathJax configuration, and add ``'cancel'`` to the
:data:`packages` array of the :data:`tex` block.

.. code-block:: javascript

   window.MathJax = {
     loader: {load: ['[tex]/cancel']},
     tex: {packages: {'[+]': ['cancel']}}
   };

Alternatively, use ``\require{cancel}`` in a TeX expression to load it
dynamically from within the math on the page, if the :ref:`tex-require`
extension is loaded.

-----

.. _tex-cancel-commands:

cancel Commands
---------------

The `cancel` extension implements the following macros:
``\bcancel``, ``\cancel``, ``\cancelto``, ``\xcancel``


|-----|
