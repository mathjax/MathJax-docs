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
            colorv2: ['color']
          }
        }
      };


This extension is already loaded in all the components that
include the TeX input jax, other than ``input/tex-base``.  To load the
`autoload` extension explicitly (when using ``input/tex-base`` for
example), add ``'[tex]/autoload'`` to the ``load`` array of the
``loader`` block of your MathJax configuration, and add
``'autoload'`` to the ``packages`` array of the ``tex`` block.

.. code-block:: javascript

   window.MathJax = {
     loader: {load: ['[tex]/autoload']},
     tex: {packages: {'[+]': ['autoload']}}
   };

Since the `autoload` extension is included in the combined
components that contain the TeX input jax, it will already be in
the package list.  In that case, if you want to disable it, you can
remove it:

.. code-block:: javascript

   window.MathJax = {
     tex: {packages: {'[-]': ['autload']}}
   };

-----

.. _tex-autoload-options:

autoload Options
----------------

Adding the `autoload` extension to the ``packages`` array defines an
``autoload`` sub-block to the ``tex`` configuration block.  This block
contains `key: value` pairs where the `key` is a TeX package name, and
the `value` is an array of macros that cause that package to be loaded,
or an array consisting of two arrays, the first giving names of macros
and the second names of environments; the first time any of them are
used, the extension will be loaded automatically.

The default autoload definitions are the following:

.. code-block:: javascript

   MathJax = {
     tex: {
       autoload: expandable({
         action: ['toggle', 'mathtip', 'texttip'],
         amscd: [[], ['CD']],
         bbox: ['bbox'],
         boldsymbol: ['boldsymbol'],
         braket: ['bra', 'ket', 'braket', 'set', 'Bra', 'Ket', 'Braket', 'Set', 'ketbra', 'Ketbra'],
         cancel: ['cancel', 'bcancel', 'xcancel', 'cancelto'],
         color: ['color', 'definecolor', 'textcolor', 'colorbox', 'fcolorbox'],
         enclose: ['enclose'],
         extpfeil: ['xtwoheadrightarrow', 'xtwoheadleftarrow', 'xmapsto',
                    'xlongequal', 'xtofrom', 'Newextarrow'],
         html: ['href', 'class', 'style', 'cssId'],
         mhchem: ['ce', 'pu'],
         newcommand: ['newcommand', 'renewcommand', 'newenvironment', 'renewenvironment', 'def', 'let'],
         unicode: ['unicode'],
         verb: ['verb']
       }
     }
   };

To prevent an extension from autoloading, set its value to an empty
array.  E.g., to not autoload the `color` extension, use

.. code-block:: javascript

   MathJax = {
     tex: {
       autoload: expandable({
         color: []
       }
     }
   };

If you define your own extensions, and they have a prefix other than
``[tex]``, then include that in the extension name.  For instance,

.. code-block:: javascript

   MathJax = {
     tex: {
       autoload: expandable({
         '[extensions]/myExtension' : ['myMacro', 'myOtherMacro']
       }
     }
   };

See the :ref:`loader-options` section for details about how to define
your own prefixes, like the ``[extensions]`` prefix used here.

|-----|
