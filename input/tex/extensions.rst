.. _tex-extensions:

########################
TeX and LaTeX extensions
########################

While MathJax includes nearly all of the Plain TeX math macros, and
many of the LaTeX macros and environments, not everything is
implemented in the core TeX input processor.  Some less-used commands
are defined in extensions to the TeX processor.  MathJax will load
some extensions automatically when you first use the commands they
implement (for example, the ``\color`` macro is implemented in the
``color`` extension, but MathJax loads this extension itself when you
use that macro).  While most extensions are set up to load
automatically, there are a few that you would need to load explicitly
yourself.  See the :ref:`tex-autoload` extension below for how to
configure which extensions to autoload.


.. _load-tex-extension:

Loading TeX Extensions
======================

To enable one of the TeX extensions you need to do two things: load
the extension, and configure TeX to include it in its package setup.
For the first, to load an extension as a component, add its name to
the ``load`` array in the ``loader`` block of your MathJax
configuration.  For example, to load the ``color`` extension, add
``'[tex]/color'`` to the load array, as in the example below.  To do
the second, add the extension name to ``packages`` array in the
``tex`` block of your configuration.  You can use the special
``'[+]'`` notation to append it to the default packages (so you don't
need to know what they are).  For example:

.. code-block:: javascript

   window.MathJax = {
     loader: {load: ['[tex]/color']},
     tex: {packages: {'[+]': ['color']}}
   };

will load the ``color`` extension and configure the TeX input jax to
enable it.

A number of extensions are already loaded and configured in the
components that contain the TeX extension.  The ``input/tex``, and the
combined components containing ``tex`` and not ending in ``-full``
include the ``ams``, ``newcommand``, ``noundefined``, ``require``,
``autoload``, and ``configmacros`` extensions, with the other
extensions being autoloaded as needed.  The ``input/tex-base``
component has no extensions loaded, while the ``input/tex-full`` and
the combined extensions ending in ``-full`` load all the extensions.

If you load a component that has an extension you don't want to use,
you can disable it by removing it from the ``package`` array in the
``tex`` block of your MathJax configuration.  For example, to disable
``\require`` and autoloading of extensions, use

.. code-block:: javascript

   window.MathJax = {
     tex: {packages: {'[-]': ['require', 'autoload']}}
   };

if you are using, for example, the ``tex-chtml.js`` combined component
file.


.. _extensions-at-runtime:

Loading Extensions at Run Time
==============================

You can also load these extensions from within a math expression using
the non-standard ``\require{extension}`` macro.  For example

.. code-block:: latex

    \(\require{color}\)

would load the `color` extension into the page.  This way you you can
load extensions into pages that didn't load them in their
configurations (and prevents you from having to load all the
extensions into all pages even if they aren't used).


.. _tex-configure-extension:

Configuring TeX Extensions
==========================

Some extensions have options that control their behavior.  For
example, the `color` extension allows you to set the padding and
border-width used for the ``\colorbox`` and ``\fcolorbox`` macros.
Such extensions are configured using a block within the ``tex``
configuration of your MathJax configuration object.  The block has the
same name as the extension, and contains the options you want to set
for that extension.  For example,

.. code-block:: javascript

   window.MathJax = {
     loader: {load: ['[tex]/color']},
     tex: {
       packages: {'[+]': ['color']},
       color: {
         padding: '5px'
       }
     }
   };

would set the padding for ``\colorbox`` to be 5 pixels.

See the :ref:`configuring-mathjax` section for details about how to
configure MathJax in general, and :ref:`tex-extension-options` for the
options for individual extensions.

For extensions that are not loaded explicitly but may be loaded via
the `autoload` package or the ``\require`` macro, you can't include
the configuration within the ``tex`` block, because MathJax will not
know the options that are available (since the extension hasn't been
loaded yet).  In that case, move the configuration block to the top
level of the MathJax configuration object and prefix it with
``[tex]/``, as in:

.. code-block:: javascript

   window.MathJax = {
     '[tex]/color': {
       padding: '5px'
     }
   };

|-----|
