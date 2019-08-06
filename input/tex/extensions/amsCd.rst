.. _tex-amscd:

#####
amsCd
#####

The `amsCd` extensions implements the `CD` environment for commutative
diagrams.  See the `AMScd guide
<http://www.jmilne.org/not/Mamscd.pdf>`__ for more information on how
to use the `CD` environment.

This extension is loaded automatically when the `autoload` extension
is used.  To load the `amsCd` extension explicitly, add
``'[tex]/amsCd'`` to the ``load`` array of the ``loader`` block of
your MathJax configuration, and add ``'amsCd'`` to the ``packages``
array of the ``tex`` block.

.. code-block:: javascript

   window.MathJax = {
     loader: {load: ['[tex]/amsCd']},
     tex: {packages: {'[+]': ['amsCd']}}
   };

Alternatively, use ``\require{amsCd}`` in a TeX expression to load it
dynamically from within the math on the page, if the `require`
extension is loaded.

|-----|
