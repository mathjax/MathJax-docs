.. _tex-configmacros:

############
configmacros
############

The `configmacros` extension provides the ``macros`` configuration
option for the ``tex`` block of your MathJax configuration.  This
allows you to predefine custom macros for your page using javascript.
For example,

.. code-block:: javascript

    window.MathJax = {
      tex: {
        macros: {
	  RR: "{\\bf R}",
	  bold: ["{\\bf #1}", 1]
	}
      }
    };

defines a macro ``\RR`` that produces a bold "R", while
``\bold{math}`` typesets the ``math`` using the bold font.  See
:ref:`tex-macros` for more information.

This extension is already loaded in all the components that
include the TeX input jax, other than ``input/tex-base``.  To load the
`configmacros` extension explicitly (when using ``input/tex-base`` for
example), add ``'[tex]/configmacros'`` to the ``load`` array of the
``loader`` block of your MathJax configuration, and add
``'configmacros'`` to the ``packages`` array of the ``tex`` block.

.. code-block:: javascript

   window.MathJax = {
     loader: {load: ['[tex]/configmacros']},
     tex: {packages: {'[+]': ['configmacros']}}
   };

|-----|
