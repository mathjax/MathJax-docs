.. _tex-boldsymbol:

##########
boldsymbol
##########

The `boldsymbol` extension defines the ``\boldsymbol`` LaTeX macro
that produces a bold version of its argument, provided bold versions
of the required characters are available.

This extension is loaded automatically when the :ref:`tex-autoload`
extension is used.  To load the `boldsymbol` extension explicitly
(when using ``input/tex-base`` for example), add
``'[tex]/boldsymbol'`` to the :data:`load` array of the :data:`loader`
block of your MathJax configuration, and add ``'boldsymbol'`` to the
:data:`packages` array of the :data:`tex` block.

.. code-block:: javascript

   window.MathJax = {
     loader: {load: ['[tex]/boldsymbol']},
     tex: {packages: {'[+]': ['boldsymbol']}}
   };

Alternatively, use ``\require{boldsymbol}`` in a TeX expression to load it
dynamically from within the math on the page, if the :ref:`tex-require`
extension is loaded.

-----

.. _tex-boldsymbol-commands:

boldsymbol Commands
-------------------

The `boldsymbol` extension implements the following macros:
``\boldsymbol``


|-----|
