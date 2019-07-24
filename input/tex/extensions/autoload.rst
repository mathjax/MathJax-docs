.. _tex-autoload:

########
autoload
########

The `autoload-all` extension predefines all the macros from the
extensions above so that they autoload the extensions when first
used.  A number of macros already do this, e.g., ``\unicode``, but
this extension defines the others to do the same.  That way MathJax
will have access to all the macros that it knows about.

To use this extension in your own configurations, add it to the
`extensions` array in the TeX block.

.. code-block:: javascript

    TeX: {
      extensions: ["autoload-all.js"]
    }

This extension is **not** included in any of the combined configurations,
and will not be loaded automatically, so you must include it
explicitly in your configuration if you wish to use these commands.

Note that `autoload-all` redefines ``\color`` to be the one from the
`color` extension (the LaTeX-compatible one rather than the
non-standard MathJax version).  This is because ``\colorbox`` and
``\fcolorbox`` autoload the `color` extension, which will cause
``\color`` to be redefined, and so for consistency, ``\color`` is
redefined immediately.

If you wish to retain the original definition of ``\color``, then use
the following

.. code-block:: html

    <script type="text/x-mathjax-config">
    MathJax.Hub.Config({
      TeX: { extensions: ["autoload-all.js"] }
    });
    MathJax.Hub.Register.StartupHook("TeX autoload-all Ready", function () {
      var MACROS = MathJax.InputJax.TeX.Definitions.macros;
      MACROS.color = "Color";
      delete MACROS.colorbox;
      delete MACROS.fcolorbox;
    });
    </script>
