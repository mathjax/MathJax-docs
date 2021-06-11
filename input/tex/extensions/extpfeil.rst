.. _tex-extpfeil:

########
extpfeil
########

The `extpfeil` extension adds more macros for producing extensible
arrows, including ``\xtwoheadrightarrow``, ``\xtwoheadleftarrow``,
``\xmapsto``, ``\xlongequal``, ``\xtofrom``, and a non-standard
``\Newextarrow`` for creating your own extensible arrows.  The latter
has the form

.. describe:: \\Newextarrow{\\cs}{lspace,rspace}{unicode-char}

    where ``\cs`` is the new control sequence name to be defined,
    ``lspace`` and ``rspace`` are integers representing the amount of
    space (in suitably small units) to use at the left and right of
    text that is placed above or below the arrow, and ``unicode-char``
    is a number representing a unicode character position in either
    decimal or hexadecimal notation.

For example

.. code-block:: latex

   \Newextarrow{\xrightharpoonup}{5,10}{0x21C0}

defines an extensible right harpoon with barb up.  Note that MathJax
knows how to stretch only a limited number of characters, so you may
not actually get a stretchy character this way.  The characters that
can be stretched may also depend on the font you have selected.

This extension is loaded automatically when the `autoload` extension
is used.  To load the `extpfeil` extension explicitly, add
``'[tex]/extpfeil'`` to the ``load`` array of the ``loader`` block of
your MathJax configuration, and add ``'extpfeil'`` to the ``packages``
array of the ``tex`` block.

.. code-block:: javascript

   window.MathJax = {
     loader: {load: ['[tex]/extpfeil']},
     tex: {packages: {'[+]': ['extpfeil']}}
   };

Alternatively, use ``\require{extpfeil}`` in a TeX expression to load it
dynamically from within the math on the page, if the `require`
extension is loaded.

-----


.. _tex-extpfeil-commands:


extpfeil Commands
-----------------

The `extpfeil` extension implements the following macros:
``\Newextarrow``, ``\xlongequal``, ``\xmapsto``, ``\xtofrom``, ``\xtwoheadleftarrow``, ``\xtwoheadrightarrow``


|-----|
