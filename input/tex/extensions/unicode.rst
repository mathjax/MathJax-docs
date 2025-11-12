.. _tex-unicode:

#######
unicode
#######

The `unicode` extension implements several macros for generating
character from their unicode code points: the standard ``\char``
control sequence, plus the non-standard ``\U{}`` and ``\unicode{}``
macros.

.. note::

   The ``\U`` and ``\char`` commands are new in version 4.

The ``\char`` command must be followed by a number giving the unicode
code point for the desired character.  As in actual TeX, that number
can be in hexadecimal if preceded by a quotation mark (``"``), or
octal if preceded by a single quote (``'``), or by a base-10 number,
or by a backtick (:literal:`\``) followed by a character or
single-character control sequence.  For example,

.. code-block:: latex

   \char65
   \char"41
   \char'101
   \char`A
   \char`\A

all produce the letter A.

The ``\unicode`` command takes an argument that is either a base-10
number or a hexadecimal number preceded by an ``x``.  You can specify
the height and depth of the character (the width is determined by the
browser), and the default font from which to take the character, using
optional bracketed arguments.

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

Finally, the ``\U`` command takes an argument that is a hexadecimal
number giving the unicode code point for the desired character.
Unlike ``\char`` and ``\unicode``, the resulting character is inserted
back into the TeX input string and processed by the TeX interpreter,
so ``\U{5C}sum`` would be equivalent to ``\sum`` since the backslash
is U+005C.

-----

This extension is loaded automatically when the :ref:`tex-autoload`
extension is used.  To load the `unicode` extension explicitly, add
``'[tex]/unicode'`` to the ``load`` array of the ``loader`` block of
your MathJax configuration, and add ``'unicode'`` to the ``packages``
array of the ``tex`` block.

.. code-block:: javascript

   window.MathJax = {
     loader: {load: ['[tex]/unicode']},
     tex: {packages: {'[+]': ['unicode']}}
   };

Alternatively, use ``\require{unicode}`` in a TeX expression to load
it dynamically from within the math on the page, if the
:ref:`tex-require` extension is loaded.

-----

.. _tex-unicode-commands:

unicode Commands
----------------

The `unicode` extension implements the following macros:
``\char``, ``\U``, ``\unicode``


|-----|
