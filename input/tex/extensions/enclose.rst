.. _tex-enclose:

#######
enclose
#######

The `enclose` extension gives you access to the MathML ``<menclose>``
element for adding boxes, ovals, strikethroughs, and other marks over
your mathematics.  It defines the following non-standard macro:

.. describe:: \enclose{notation}[attributes]{math}

    Where ``notation`` is a comma-separated list of MathML
    ``<menclose>`` notations (e.g., ``circle``, ``left``,
    ``updiagonalstrike``, ``longdiv``, etc.), ``attributes`` are
    optional MathML attribute values allowed on the ``<menclose>``
    element (e.g., ``mathcolor="red"``, ``mathbackground="yellow"``),
    and ``math`` is the mathematics to be enclosed. See the `MathML 3
    specification
    <https://www.w3.org/TR/MathML/chapter3.html#presm.menclose>`_ for
    more details on ``<menclose>``.

For example

.. code-block:: latex

   \enclose{circle}[mathcolor=red]{x}
   \enclose{circle}[mathcolor=red]{\color{black}{x}}
   \enclose{circle,box}{x}
   \enclose{circle}{\enclose{box}{x}}

.. raw:: html

    <p>which render as follows:</p>
    <p style="background-color: #DDD; padding: 1em 0; text-align: center">
    <iframe style='width: 15em; height: 5em; background-color: white' srcdoc='
      <!DOCTYPE html>
      <html>
      <head>
      <title>MathJax enclose Examples</title>
      <script>
      MathJax = {
        loader: {load: ["[tex]/enclose"]},
        tex: {packages: {"[+]": ["enclose"]}}
      }
      </script>
      <script defer src="https://cdn.jsdelivr.net/npm/mathjax@4/tex-chtml.js">
      </script>
      </head>
      <body>
      \[\enclose{circle}[mathcolor=red]{x} \quad
      \enclose{circle}[mathcolor=red]{\color{black}{x}} \quad
      \enclose{circle,box}{x} \quad
      \enclose{circle}{\enclose{box}{x}}\]
      </body>
      </html>
    '></iframe>
    </p>

This extension is loaded automatically when the :ref:`tex-autoload`
extension is used.  To load the `enclose` extension explicitly, add
``'[tex]/enclose'`` to the :data:`load` array of the :data:`loader`
block of your MathJax configuration, and add ``'enclose'`` to the
:data:`packages` array of the :data:`tex` block.

.. code-block:: javascript

   window.MathJax = {
     loader: {load: ['[tex]/enclose']},
     tex: {packages: {'[+]': ['enclose']}}
   };

Alternatively, use ``\require{enclose}`` in a TeX expression to load it
dynamically from within the math on the page, if the :ref:`tex-require`
extension is loaded.

-----

.. _tex-enclose-commands:

enclose Commands
----------------

The `enclose` extension implements the following macros:
``\enclose``


|-----|
