.. _tex-autoload:

########
autoload
########

The `autoload` extension predefines all the macros from the extensions
that haven't been loaded already so that they automatically load the
needed extension when they are first used, with the exception of the
:ref:`tex-physics` package, since it redefines standard macros, and
the :ref:`tex-ams` package, due to the large number of macros it contains.

The `autoload` extension is loaded in all the components that include
the TeX input jax, other than ``input/tex-base``.  That means that the
TeX input jax essentially has access to all the extensions, even if
they aren't loaded initially, and you should never have to use
``\require`` or load other extensions (except `physics`) explicitly
unless you want to.

You can control which extensions `autoload` will load using the
``autoload`` object in the ``tex`` block of your MathJax
configuration.  This object contains `key: value` pairs where the
`key` is the name of an extension, and `value` is an array listing the
macro names that cause that extension to be loaded.  If environments
can also cause the extension to be loaded, `value` is an array
consisting of two sub-arrays, the first being the names of the macros
that cause the extension to autoload, and the second being the names
of the environments that cause the extension to be loaded.

For example,

.. code-block:: javascript

   window.MathJax = {
     tex: {
       autoload: {
         verb: ['verb']
       }
     }
   };

says that the ``\verb`` command should load the :ref:`tex-verb`
extension when it is first used.

If the array is empty, then that extension will not be loaded, so to
prevent `autoload` from loading an extension, assign it the empty
array.  E.g.,

.. code-block:: javascript

   window.MathJax = {
     tex: {
       autoload: {
         verb: []
       }
     }
   };

says that the `verb` extension will not be autoloaded.

.. note::
   
   The `autoload` extension defines ``\color`` to be the one from the
   :ref:`tex-color` extension (the LaTeX-compatible one rather than
   the non-standard MathJax version).  If you wish to use the
   non-standard version-2 ``\color`` macro from the :ref:`tex-colorv2`
   extension instead, use the following:

   .. code-block:: javascript

      window.MathJax = {
        tex: {
          autoload: {
            color: [],
            colorV2: ['color']
          }
        }
      };

|-----|
