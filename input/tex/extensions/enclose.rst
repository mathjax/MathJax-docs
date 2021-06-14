.. _tex-enclose:

#######
enclose
#######

The `enclose` extension gives you access to the MathML ``<menclose>``
element for adding boxes, ovals, strikethroughs, and other marks over
your mathematics.  It defines the following non-standard macro:

.. describe:: \\enclose{notation}[attributes]{math}

    Where ``notation`` is a comma-separated list of MathML
    ``<menclose>`` notations (e.g., ``circle``, ``left``,
    ``updiagonalstrike``, ``longdiv``, etc.), ``attributes`` are
    MathML attribute values allowed on the ``<menclose>`` element
    (e.g., ``mathcolor="red"``, ``mathbackground="yellow"``), and
    ``math`` is the mathematics to be enclosed. See the `MathML 3
    specification <http://www.w3.org/TR/MathML/chapter3.html#presm.menclose>`_
    for more details on ``<menclose>``.

For example

.. code-block:: latex

   \enclose{circle}[mathcolor="red"]{x}
   \enclose{circle}[mathcolor="red"]{\color{black}{x}}
   \enclose{circle,box}{x}
   \enclose{circle}{\enclose{box}{x}}

This extension is loaded automatically when the `autoload` extension
is used.  To load the `enclose` extension explicitly, add
``'[tex]/enclose'`` to the ``load`` array of the ``loader`` block of
your MathJax configuration, and add ``'enclose'`` to the ``packages``
array of the ``tex`` block.

.. code-block:: javascript

   window.MathJax = {
     loader: {load: ['[tex]/enclose']},
     tex: {packages: {'[+]': ['enclose']}}
   };

Alternatively, use ``\require{enclose}`` in a TeX expression to load it
dynamically from within the math on the page, if the `require`
extension is loaded.

-----


.. _tex-enclose-commands:


enclose Commands
----------------

The `enclose` extension implements the following macros:
``\enclose``


|-----|
