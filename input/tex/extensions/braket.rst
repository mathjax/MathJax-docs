.. _tex-braket:

######
braket
######

The `braket` extension defines the following macros for producing the
`bra-ket notation <https://en.wikipedia.org/wiki/Bra–ket_notation>`__
and set notation used in quantum mechanics

  .. describe:: \\bra{math}
                \\ket{math}
                \\braket{math}
                \\set{math}
                \\Bra{math}
                \\Ket{math}
                \\Braket{math}
                \\Set{math}

and the non-standard macros

  .. describe:: \\ketbra{math}
                \\Ketbra{math}


See the documentation for the LaTeX `braket package
<https://ctan.org/pkg/braket?lang=en>`__ for details of how these are
used.

This extension is loaded automatically when the `autoload` extension
is used.  To load the `braket` extension explicitly (when using
``input/tex-base`` for example), add ``'[tex]/braket'`` to the
``load`` array of the ``loader`` block of your MathJax configuration,
and add ``'braket'`` to the ``packages`` array of the ``tex`` block.

.. code-block:: javascript

   window.MathJax = {
     loader: {load: ['[tex]/braket']},
     tex: {packages: {'[+]': ['braket']}}
   };

Alternatively, use ``\require{braket}`` in a TeX expression to load it
dynamically from within the math on the page, if the `require`
extension is loaded.

-----


.. _tex-braket-commands:


braket Commands
---------------

The `braket` extension implements the following macros:
``\|``, ``\bra``, ``\Bra``, ``\braket``, ``\Braket``, ``\ket``, ``\Ket``, ``\ketbra``, ``\Ketbra``, ``\set``, ``\Set``, ``|``


|-----|
