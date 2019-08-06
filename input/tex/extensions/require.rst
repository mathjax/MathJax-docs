.. _tex-require:

#######
require
#######

The `require` extension defines the non-standard ``\require`` macro
tha allows you to load extensions from within a math expression in a
web page.  For example:

.. code-block:: latex

   \(\require{enclose} \enclose{circle}{x}\)

would load the :ref:`tex-enclose` extension, making the following
``\enclose`` command available for use.

An extension only needs to be loaded once, and then it is available
for all subsequent typeset expressions.

This extension is already loaded in all the components that
include the TeX input jax, other than ``input/tex-base``.  To load the
`require` extension explicitly (when using ``input/tex-base`` for
example), add ``'[tex]/require'`` to the ``load`` array of the
``loader`` block of your MathJax configuration, and add ``'require'``
to the ``packages`` array of the ``tex`` block.

.. code-block:: javascript

   window.MathJax = {
     loader: {load: ['[tex]/require']},
     tex: {packages: {'[+]': ['require']}}
   };

|-----|
