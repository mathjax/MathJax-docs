.. _tex-configmacros:

############
configmacros
############

The `configmacros` extension provides the ``macros`` configuration
option for the ``tex`` block of your MathJax configuration.  This
allows you to predefine custom macros for your page using javascript.
For example,

.. code-block:: javascript

    window.MathJax = {
      tex: {
        macros: {
	  RR: "{\\bf R}",
	  bold: ["{\\bf #1}", 1]
	}
      }
    };

defines a macro ``\RR`` that produces a bold "R", while
``\bold{math}`` typesets the ``math`` using the bold font.  See
:ref:`tex-macros` for more information.

This extension is already loaded in all the components that
include the TeX input jax, other than ``input/tex-base``.  To load the
`configmacros` extension explicitly (when using ``input/tex-base`` for
example), add ``'[tex]/configmacros'`` to the ``load`` array of the
``loader`` block of your MathJax configuration, and add
``'configmacros'`` to the ``packages`` array of the ``tex`` block.

.. code-block:: javascript

   window.MathJax = {
     loader: {load: ['[tex]/configmacros']},
     tex: {packages: {'[+]': ['configmacros']}}
   };

Since the `configmacros` extension is included in the combined
components that contain the TeX input jax, it may already be in
the package list.  In that case, if you want to disable it, you can
remove it:

.. code-block:: javascript

   window.MathJax = {
     tex: {packages: {'[-]': ['configmacros']}}
   };

-----


.. _tex-configmacros-options:

configmacros Options
--------------------

The `configmacros` extension adds a ``macros`` option to the
``tex`` block that lets you pre-define macros.

.. _tex-macros-option:
.. describe:: macros: {}

    This lists macros to define before the TeX input processor begins.
    These are `name: value` pairs where the `name` gives the name of
    the TeX macro to be defined, and `value` gives the replacement
    text for the macro.  The `value` can be a simple replacement
    string, or an array of the form `[value, n]`, where `value` is the
    replacement text and `n` is the number of parameters for the
    macro.  The array can have a third entry:  either a string that is
    the default value to give for an optional (bracketed) parameter
    when the macro is used, or an array consisting of template strings
    that are used to separate the various parameters.  The first
    template must precede the first parameter, the second must precede
    the second, and so on until the final which must end the last
    parameter to the macro.  See the examples below.

    Note that since the `value` is a javascript string,
    backslashes in the replacement text must be doubled to prevent
    them from acting as javascript escape characters.

    For example,

    .. code-block:: javascript
 
        macros: {
          RR: '{\\bf R}',                    // a simple string replacement
          bold: ['\\boldsymbol{#1}',1] ,     // this macro has one parameter
          ddx: ['\\frac{d#2}{d#1}', 2, 'x'], // this macro has an optional parameter that defaults to 'x'
          abc: ['(#1)', 1, [null, '\\cba']]  // equivalent to \def\abc#1\cba{(#1)}
        }

    would ask the TeX processor to define four new macros:  ``\RR``,
    which produces a bold-face "R", and ``\bold{...}``, which takes one
    parameter and sets it in the bold-face font, ``\ddx``, which has
    an optional (bracketed) parameter that defaults to ``x``, so that
    ``\ddx{y}`` produces ``\frac{dy}{dx}`` while ``\ddx[t]{y}``
    produces ``\frac{dy}{dt}``, and ``\abc`` that is equivalent to
    ``\def\abc#1\cba{(#1)}``.


|-----|
