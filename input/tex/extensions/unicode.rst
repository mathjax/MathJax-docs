.. _tex-unicode:

#######
unicode
#######

The `unicode` extension implements a (non-standard) ``\unicode{}``
macro that allows arbitrary unicode code points to be entered in your
mathematics.  You can specify the height and depth of the character
(the width is determined by the browser), and the default font from
which to take the character.

Examples:

.. code-block:: latex

    \unicode{65}                        % the character 'A'
    \unicode{x41}                       % the character 'A'
    \unicode[.55,0.05]{x22D6}           % less-than with dot, with height .55em and depth 0.05em
    \unicode[.55,0.05][Geramond]{x22D6} % same taken from Geramond font
    \unicode[Garamond]{x22D6}           % same, but with default height, depth of .8em,.2em

Once a size and font are provided for a given unicode point, they need
not be specified again in subsequent ``\unicode{}`` calls for that
character.

The result of ``\unicode{...}`` will have TeX class `ORD` (i.e., it
will act like a variable).  Use ``\mathbin{...}``, ``\mathrel{...}``,
etc., to specify a different class.

Note that a font list can be given in the ``\unicode{}`` macro.  If
not is provided, MathJax will use its own fonts, if possible, and then
the default font list for unknown characters if not.

.. note::

   In version 2, you could configure the default font to be used for
   ``\unicode`` characters if one wasn't given explicitly.  This has
   not been implemented in version 3.

This extension is loaded automatically when the `autoload` extension
is used.  To load the `unicode` extension explicitly, add
``'[tex]/unicode'`` to the ``load`` array of the ``loader`` block of
your MathJax configuration, and add ``'unicode'`` to the ``packages``
array of the ``tex`` block.

.. code-block:: javascript

   window.MathJax = {
     loader: {load: ['[tex]/unicode']},
     tex: {packages: {'[+]': ['unicode']}}
   };

Alternatively, use ``\require{unicode}`` in a TeX expression to load it
dynamically from within the math on the page, if the `require`
extension is loaded.

-----


.. _tex-unicode-commands:


unicode Commands
----------------

The `unicode` extension implements the following macros:
``\unicode``


|-----|
