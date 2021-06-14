.. _tex-cancel:

######
cancel
######

The `cancel` extension defines the following macros:

.. describe:: \\cancel{math}

    Strikeout ``math`` from lower left to upper right.

.. describe:: \\bcancel{math}

    Strikeout ``math`` from upper left to lower right.

.. describe:: \\xcancel{math}

    Strikeout ``math`` with an "X".

.. describe:: \\cancelto{value}{math}

    Strikeout ``math`` with an arrow going to ``value``.

This extension is loaded automatically when the `autoload` extension
is used.  To load the `cancel` extension explicitly, add
``'[tex]/cancel'`` to the ``load`` array of the ``loader`` block of
your MathJax configuration, and add ``'cancel'`` to the ``packages``
array of the ``tex`` block.

.. code-block:: javascript

   window.MathJax = {
     loader: {load: ['[tex]/cancel']},
     tex: {packages: {'[+]': ['cancel']}}
   };

Alternatively, use ``\require{cancel}`` in a TeX expression to load it
dynamically from within the math on the page, if the `require`
extension is loaded.

-----


.. _tex-cancel-commands:


cancel Commands
---------------

The `cancel` extension implements the following macros:
``\bcancel``, ``\cancel``, ``\cancelto``, ``\xcancel``


|-----|
