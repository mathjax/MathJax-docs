.. _tex-mhchem:

######
mhchem
######

The `mhchem` extensions implements the ``\ce`` and ``\pu``
chemical equation macros of the LaTeX `mhchem` package.  See the
`mhchem home page <https://mhchem.github.io/MathJax-mhchem/>`__ for more
information and documentation for `mhchem`.

For example

.. code-block:: latex

    \ce{C6H5-CHO}
    \ce{$A$ ->[\ce{+H2O}] $B$}
    \ce{SO4^2- + Ba^2+ -> BaSO4 v}

This extension is loaded automatically when the `autoload` extension
is used.  To load the `mhchem` extension explicitly, add
``'[tex]/mhchem'`` to the ``load`` array of the ``loader`` block of
your MathJax configuration, and add ``'mhchem'`` to the ``packages``
array of the ``tex`` block.

.. code-block:: javascript

   window.MathJax = {
     loader: {load: ['[tex]/mhchem']},
     tex: {packages: {'[+]': ['mhchem']}}
   };

Alternatively, use ``\require{mhchem}`` in a TeX expression to load it
dynamically from within the math on the page, if the `require`
extension is loaded.

.. note::

   The implementation of the `mhchem` extension was completely
   rewritten for MathJax by the author of the original LaTeX package.
   The older version was still available MathJax version 2.7, but it
   is no longer part of MathJax version 3.  Only the newer version of
   `mhchem` is available.

-----


.. _tex-mhchem-commands:


mhchem Commands
---------------

The `mhchem` extension implements the following macros:
``\ce``, ``\longleftrightarrows``, ``\longLeftrightharpoons``, ``\longrightleftharpoons``, ``\longRightleftharpoons``, ``\pu``, ``\tripledash``, ``\xleftarrow``, ``\xleftrightarrow``, ``\xLeftrightharpoons``, ``\xrightarrow``, ``\xrightleftharpoons``, ``\xRightleftharpoons``


|-----|
