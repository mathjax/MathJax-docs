.. _tex-begingroup:

##########
begingroup
##########

The `begingroup` extension has not yet been translated to version 3,
so currently it is not available.  It should be included in a future
release of MathJax.

..
   The `begingroup` extension implements commands that provide a
   mechanism for localizing macro definitions so that they are not
   permanent.  This is useful if you have a blog site, for example, and
   want to isolate changes that your readers make in their comments so
   that they don't affect later comments.

   It defines two new non-standard macros, ``\begingroup`` and
   ``\endgroup``, that are used to start and stop a local namespace for
   macros.  Any macros that are defined between the ``\begingroup`` and
   ``\endgroup`` will be removed after the ``\endgroup`` is executed.
   For example, if you put ``\(\begingroup\)`` at the top of each reader's
   comments and ``\(\endgroup\)`` at the end, then any macros they define
   within their response will be removed after it is processed.

   In addition to these two macros, the `begingroup` extension defines
   the standard ``\global`` and ``\gdef`` control sequences from TeX.
   (The ``\let``, ``\def``, ``\newcommand``, and ``\newenvironment``
   control sequences are already defined in the core TeX input jax.)

   To use this extension in your own configurations, add it to the
   `extensions` array in the TeX block.

   .. code-block:: javascript

       TeX: {
         extensions: ["begingroup.js"]
       }

   This extension is **not** included in any of the combined configurations,
   and will not be loaded automatically, so you must include it
   explicitly in your configuration if you wish to use these commands.

|-----|
