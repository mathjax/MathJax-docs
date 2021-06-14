.. _tex-verb:

##########
verb
##########

The `verb` extension defines the ``\verb`` LaTeX macro that typesets
its argument "verbatim" (without further processing) in a monospaced
(typewriter) font.  The first character after the ``\verb`` command is
used as a delimiter for the argument, which is everything up to the
next copy of the delimiter character). E.g.

.. code-block:: latex

   \verb|\sqrt{x}|

will typeset ``\sqrt{x}`` as a literal string.

Note that, due to how MathJax locates math strings within the
document, the argument to ``\verb`` must have balanced braces, so
``\verb|{|`` is not valid in a web page (use ``\mathtt{\{}`` instead).
If you are passing TeX strings to :meth:`MathJax.tex2svg()` or
:meth:`MathJax.tex2chtml()`, however, braces don't have to be balanced.  So

.. code-block:: javascript

   const html = MathJax.tex2chtml('\\verb|{|');

is valid.

This extension is loaded automatically when the `autoload` extension
is used.  To load the `verb` extension explicitly (when using
``input/tex-base`` for example), add ``'[tex]/verb'`` to the
``load`` array of the ``loader`` block of your MathJax configuration,
and add ``'verb'`` to the ``packages`` array of the ``tex`` block.

.. code-block:: javascript

   window.MathJax = {
     loader: {load: ['[tex]/verb']},
     tex: {packages: {'[+]': ['verb']}}
   };

Alternatively, use ``\require{verb}`` in a TeX expression to load it
dynamically from within the math on the page, if the `require`
extension is loaded.

-----


.. _tex-verb-commands:


verb Commands
-------------

The `verb` extension implements the following macros:
``\verb``


|-----|
