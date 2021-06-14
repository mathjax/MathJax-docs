.. _tex-boldsymbol:

##########
boldsymbol
##########

The `boldsymbol` extension defines the ``\boldsymbol`` LaTeX macro
that produces a bold version of its argument, provided bold versions
of the required characters are available.

This extension is loaded automatically when the `autoload` extension
is used.  To load the `boldsymbol` extension explicitly (when using
``input/tex-base`` for example), add ``'[tex]/boldsymbol'`` to the
``load`` array of the ``loader`` block of your MathJax configuration,
and add ``'boldsymbol'`` to the ``packages`` array of the ``tex`` block.

.. code-block:: javascript

   window.MathJax = {
     loader: {load: ['[tex]/boldsymbol']},
     tex: {packages: {'[+]': ['boldsymbol']}}
   };

Alternatively, use ``\require{boldsymbol}`` in a TeX expression to load it
dynamically from within the math on the page, if the `require`
extension is loaded.

-----


.. _tex-boldsymbol-commands:


boldsymbol Commands
-------------------

The `boldsymbol` extension implements the following macros:
``\boldsymbol``


|-----|
