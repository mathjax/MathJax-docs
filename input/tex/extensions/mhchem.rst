.. _tex-mhchem:

######
mhchem
######

The `mhchem` extension implements the ``\ce`` and ``\pu``
chemical equation macros of the LaTeX `mhchem` package.  See the
`mhchem home page <https://mhchem.github.io/MathJax-mhchem/>`__ for more
information and documentation for `mhchem`.

For example

.. code-block:: latex

    \ce{[AgCl2]-}
    \ce{$A$ ->[\ce{+H2O}] $B$}
    \ce{SO4^2- + Ba^2+ -> BaSO4 v}

.. raw:: html

    <p>render as:</p>
    <p style="background-color: #DDD; padding: 1em 0; text-align: center">
    <iframe style='width: 20em; height: 8em; background-color: white' srcdoc='
      <!DOCTYPE html>
      <html>
      <head>
      <title>MathJax mhchem Examples</title>
      <script>
      MathJax = {
        loader: {load: ["[tex]/mhchem"]},
        tex: {packages: {"[+]": ["mhchem"]}}
      }
      </script>
      <script defer src="https://cdn.jsdelivr.net/npm/mathjax@4/tex-chtml.js">
      </script>
      </head>
      <body>
        $$
        \ce{[AgCl2]-}\\[5px]
        \ce{$A$ ->[\ce{+H2O}] $B$}\\[5px]
        \ce{SO4^2- + Ba^2+ -> BaSO4 v}
        $$
      </body>
      </html>
    '></iframe>
    </p>

This extension is loaded automatically when the :ref:`tex-autoload`
extension is used.  To load the `mhchem` extension explicitly, add
``'[tex]/mhchem'`` to the :data:`load` array of the :data:`loader`
block of your MathJax configuration, and add ``'mhchem'`` to the
:data:`packages` array of the :data:`tex` block.

.. code-block:: javascript

   window.MathJax = {
     loader: {load: ['[tex]/mhchem']},
     tex: {packages: {'[+]': ['mhchem']}}
   };

Alternatively, use ``\require{mhchem}`` in a TeX expression to load it
dynamically from within the math on the page, if the :ref:`tex-require`
extension is loaded.

.. note::

   The implementation of the `mhchem` extension was written for
   MathJax by the author of the original LaTeX package.  An older
   version was available MathJax version 2.7, but it is no longer part
   of MathJax version 3 and above.  Only the newer version of `mhchem`
   is available.

-----

.. _tex-mhchem-commands:

mhchem Commands
---------------

The `mhchem` extension implements the following macros:
``\ce``, ``\longleftrightarrows``, ``\longLeftrightharpoons``, ``\longrightleftharpoons``, ``\longRightleftharpoons``, ``\pu``, ``\tripledash``, ``\xleftrightarrow``, ``\xLeftrightharpoons``, ``\xrightleftharpoons``, ``\xRightleftharpoons``


|-----|
