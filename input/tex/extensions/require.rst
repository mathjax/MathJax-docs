.. _tex-require:

#######
require
#######

The `require` extension defines the non-standard ``\require`` macro
that allows you to load extensions from within a math expression in a
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

Since the `require` extension is included in the combined
components that contain the TeX input jax, it may already be in
the package list.  In that case, if you want to disable it, you can
remove it:

.. code-block:: javascript

   window.MathJax = {
     tex: {packages: {'[-]': ['require']}}
   };


-----

.. _tex-require-options:

require Options
---------------

Adding the `require` extension to the ``packages`` array defines a
``require`` sub-block of the ``tex`` configuration block with the
following values:

.. code-block:: javascript

   MathJax = {
     tex: {
       require: {
         allow: {
           base: false,
           'all-packages': false
         },
         defaultAllow: true
      }
    };

.. _tex-require-allow:
.. describe:: allow: {...}

   This sub-object indicates which extensions can be loaded by
   ``\require``.  The keys are the package names, and the value is
   ``true`` to allow the extension to be loaded, and ``false`` to
   disallow it.  If an extension is not in the list, the default value
   is given by ``defaultAllow``, described below.

.. _tex-require-defaultAllow:
.. describe:: defaultAllow: true

   This is the value used for any extensions that are requested, but
   are not in the ``allow`` object described above.  If set to
   ``true``, any extension not listed in ``allow`` will be allowed;
   if ``false``, only the ones listed in ``allow`` (with value
   ``true``) will be allowed.

-----


.. _tex-require-commands:


require Commands
----------------

The `require` extension implements the following macros: ``\require``

|-----|
