.. _tex-noundefined:

###########
noundefined
###########

The `noundefined` extension causes undefined control sequences to be
shown as their macro names rather than generating error messages. So
``$X_{\xyz}$`` would display as an "X" with a subscript consisting of the
text ``\xyz`` in red.

.. note::

   In version 2, the styling for the undefined macro could be
   configured.  In version 3, this is not yet implemented.

This extension is already loaded in the all the configurations that
include the TeX input jax, other than ``input/tex-base``.  To load the
`ams` extension explicitly (when using ``input/tex-base`` for
example), add ``'[tex]/noundefined'`` to the ``load`` array of the ``loader``
block of your MathJax configuration, and add ``'noundefined'`` to the
``packages`` array of the ``tex`` block.

.. code-block:: javascript

   window.MathJax = {
     loader: {load: ['[tex]/noundefined']},
     tex: {packages: {'[+]': ['noundefined']}}
   };
