.. _tex-ams:

###
ams
###

The `ams` extension implements AMS math environments and macros, and
macros for accessing the characters in the AMS symbol fonts.  This
extension is already loaded in all the components that include
the TeX input jax, other than ``input/tex-base``.  See the :ref:`list
of control sequences <tex-commands>` for details about what commands
are implemented in this extension.

To load the `ams` extension explicitly (when using
``input/tex-base`` for example), add ``'[tex]/ams'`` to the
``load`` array of the ``loader`` block of your MathJax configuration,
and add ``'ams'`` to the ``packages`` array of the ``tex`` block.

.. code-block:: javascript

   window.MathJax = {
     loader: {load: ['[tex]/ams']},
     tex: {packages: {'[+]': ['ams']}}
   };

Alternatively, use ``\require{ams}`` in a TeX expression to load it
dynamically from within the math on the page, if the `require`
extension is loaded.
