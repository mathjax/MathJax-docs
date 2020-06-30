.. _tex-bussproofs:

##########
bussproofs
##########

The `bussproofs` extension defines ...

[description here]

This extension is **not** loaded by the `autoload` extension is used.
To load the `bussproofs` extension explicitly, add
``'[tex]/bussproofs'`` to the ``load`` array of the ``loader`` block
of your MathJax configuration, and add ``'bussproofs'`` to the
``packages`` array of the ``tex`` block.

.. code-block:: javascript

   window.MathJax = {
     loader: {load: ['[tex]/bussproofs']},
     tex: {packages: {'[+]': ['bussproofs']}}
   };

Alternatively, use ``\require{bussproofs}`` in a TeX expression to
load it dynamically from within the math on the page, if the `require`
extension is loaded.

[more details, examples, etc., here]

|-----|
