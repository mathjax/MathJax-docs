.. _tex-noerrors:

########
noerrors
########

The `noerrors` extension prevents TeX error messages from being
displayed and shows the original TeX code instead.

.. note::
   
   In version 2 of MathJax, you could configure the CSS that
   applied to the display of the original TeX.  In version 3, the
   original TeX is shown via an `merror` MathML element instead.

.. note::
   
   In version 2, this extension was included in all the combined
   configuration files that contain the TeX input jax, but in MathJax
   version 3, you must load it explicitly if you want to use it.

To load the `noerrors` extension, add ``'[tex]/noerrors'`` to the
``load`` array of the ``loader`` block of your MathJax configuration,
and add ``'noerrors'`` to the ``packages`` array of the ``tex`` block.

.. code-block:: javascript

   window.MathJax = {
     loader: {load: ['[tex]/noerrors']},
     tex: {packages: {'[+]': ['noerrors']}}
   };



|-----|
