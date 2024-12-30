.. _tex-noundefined:

###########
noundefined
###########

The `noundefined` extension causes undefined control sequences to be
shown as their macro names rather than generating error messages. So
``$X_{\xyz}$`` would display as an "X" with a subscript consisting of the
text ``\xyz`` in red.

This extension is already loaded in all the components that include
the TeX input jax, other than ``input/tex-base``.  To load the `ams`
extension explicitly (when using ``input/tex-base`` for example), add
``'[tex]/noundefined'`` to the :data:`load` array of the
:data:`loader` block of your MathJax configuration, and add
``'noundefined'`` to the :data:`packages` array of the :data:`tex`
block.

.. code-block:: javascript

   window.MathJax = {
     loader: {load: ['[tex]/noundefined']},
     tex: {packages: {'[+]': ['noundefined']}}
   };

Since the `noundefined` extension is included in the combined
components that contain the TeX input jax, it may already be in
the package list.  In that case, if you want to disable it, you can
remove it:

.. code-block:: javascript

   window.MathJax = {
     tex: {packages: {'[-]': ['noundefined']}}
   };


-----

.. _tex-noundefined-options:

noundefined Options
-------------------

Adding ``'[tex]/noundefined'`` to the :data:`packages` array defines a
:data:`noundefined` sub-block of the :data:`tex` configuration block with the
following values:

.. code-block:: javascript

   MathJax = {
     tex: {
       noundefined: {
         color: 'red',
         background: '',
         size: ''
       }
     }
   };

.. _tex-noundefined-color:
.. describe:: color: 'red'

   This gives the color to use for the text of the undefined macro
   name, or an empty string to make the color the same as the
   surrounding mathematics.

.. _tex-noundefined-background:
.. describe:: background: ''

   This gives the color to use for the background for the undefined
   macro name, or an empty string to have no background color.

.. _tex-noundefined-size:
.. describe:: size: ''

   This gives the size to use for the undefined macro name (e.g.,
   ``90%`` or ``12px``), or an empty string to keep the size the same
   as the surrounding mathematics.


|-----|
