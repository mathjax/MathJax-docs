.. _tex-amscd:

#####
amscd
#####

The `amscd` extensions implements the `CD` environment for commutative
diagrams.  See the `AMScd guide
<http://www.jmilne.org/not/Mamscd.pdf>`__ for more information on how
to use the `CD` environment.

This extension is loaded automatically when the `autoload` extension
is used.  To load the `amscd` extension explicitly, add
``'[tex]/amscd'`` to the ``load`` array of the ``loader`` block of
your MathJax configuration, and add ``'amscd'`` to the ``packages``
array of the ``tex`` block.

.. code-block:: javascript

   window.MathJax = {
     loader: {load: ['[tex]/amscd']},
     tex: {packages: {'[+]': ['amscd']}}
   };

Alternatively, use ``\require{amscd}`` in a TeX expression to load it
dynamically from within the math on the page, if the `require`
extension is loaded.

|-----|
