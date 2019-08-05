.. _tex-tagformat:

#########
tagFormat
#########

The `tagFormat` extension provides the ability to customize the format
of the equation tags and automatic equation numbers.  You do this by
providing functions in the ``tagFormat`` object of the ``tex`` block
of your MathJax configuration.  The functions you can provide are
listed in the :ref:`tex-tagformat-options` section.

For example,

.. code-block:: javascript

    MathJax = {
      section: 1,
      tex: {
        tagFormat: {
	  number: (n) => MathJax.section + '.' + n,
          id: (n) => 'eqn-id-' + n
	}
      }
    };

arranges for automatic equation numbers to be of the form ``1.n``, and
uses ids of the form ``eqn-id-1.n`` as the ``id`` attribute of the
tags within the web page.  This example uses the modern function
notation (using ``=>``), but you could also use ``function (n) {return
...}``.

This extension is already loaded in all the components that
include the TeX input jax, other than ``input/tex-base``.  To load the
`tagFormat` extension explicitly (when using ``input/tex-base`` for
example), add ``'[tex]/tagFormat'`` to the ``load`` array of the
``loader`` block of your MathJax configuration, and add
``'tagFormat'`` to the ``packages`` array of the ``tex`` block.

.. code-block:: javascript

   window.MathJax = {
     loader: {load: ['[tex]/tagFormat']},
     tex: {packages: {'[+]': ['tagFormat']}}
   };
