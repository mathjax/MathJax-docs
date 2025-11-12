.. _tex-configmacros:

############
configmacros
############

The `configmacros` extension provides the :data:`macros`,
:data:`environments`, and :data:`active` configuration options for the
:data:`tex` block of your MathJax configuration.  This allows you to
predefine custom macros and environments for your page using
the MathJax configuration object.  For example,

.. code-block:: javascript

    window.MathJax = {
      tex: {
        macros: {
	  RR: "{\\bf R}",
	  bold: ["{\\bf #1}", 1]
	},
        environments: {
          braced: ["\\left\\{", "\\right\\}"]
        },
        active: {
          '*': ["#1 \times #2", 2]
        }
      }
    };

defines a macro ``\RR`` that produces a bold "R", while
``\bold{math}`` typesets the ``math`` using the bold font (see
:ref:`tex-macros` for more information).  It also creates a ``braced``
environment that puts ``\left\{`` and ``\right\}`` around its
contents.  Finally, it makes ``*`` an active character that acts like
a macro (without the need for a backslash), which takes two arguments
and puts a "times" symbol between them.

This extension is already loaded in all the components that include
the TeX input jax, other than ``input/tex-base``.  To load the
`configmacros` extension explicitly (when using ``input/tex-base`` for
example), add ``'[tex]/configmacros'`` to the :data:`load` array of
the :data:`loader` block of your MathJax configuration, and add
``'configmacros'`` to the :data:`packages` array of the :data:`tex`
block.

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

The `configmacros` extension adds a :data:`macros` option to the
:data:`tex` block that lets you pre-define macros, a
:data:`environments` option that lets you pre-define your own
environments, and an :data:`active` option that lets you define active
characters.

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

    Note that since the `value` is a javascript string, backslashes in
    the replacement text must be doubled to prevent them from acting
    as javascript escape characters.  Alternatively, you can use the
    :data:`String.raw` syntax to create the string literals with
    single backslashes.

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

.. _tex-environments-option:
.. describe:: environments: {}

    This lists environments to define before the TeX input processor
    begins.  These are `name: value` pairs where the `name` gives the
    name of the environment to be defined, and `value` gives an array
    that defines the material to go before and after the content of
    the environment.  The array is of the form `[before, after, n,
    opt]` where `before` is the material that replaces the
    ``\begin{name}``, `after` is the material that replaces
    ``\end{name}``, `n` is the number of parameters that follow the
    ``\begin{name}``, and `opt` is the default value used for an
    optional parameter that would follow ``\begin{name}`` in brackets.
    The parameters can be inserted into the `before` string using
    ``#1``, ``#2``, etc., where ``#1`` is the optional parameter, if
    there is one.

    Note that since the `before` and `after` values are javascript
    strings, backslashes in the replacement text must be doubled to
    prevent them from acting as javascript escape characters.
    Alternatively, you can use the :data:`String.raw` syntax to create
    the string literals with single backslashes.

    For example,

    .. code-block:: javascript
 
       environments: {
         braced: ['\\left\\{', '\\right\\}'],
         ABC: ['(#1)(#2)(', ')', 2, 'X']
       }

    would define two environments, ``braced`` and ``ABC``, where

    .. code-block:: latex

       \begin{braced} \frac{x}{y} \end{braced}

    would produce the fraction `x`/`y` in braces that stretch to the
    height of the fraction, while
   
    .. code-block:: latex

       \begin{ABC}{Z} xyz \end{ABC}

    would produce ``(X)(Z)(xyz)``, and

    .. code-block:: latex

       \begin{ABC}[Y]{Z} xyz \end{ABC}

    would produce ``(Y)(Z)(xyz)``.
 
.. _tex-active-option:
.. describe:: active: {}

    This lists active characters to define before the TeX input
    processor begins.  These are `name: value` pairs where the `name`
    gives the (single) character to be defined, and `value` gives the
    replacement text for the active character.  The `value` can be a
    simple replacement string, or an array of the form `[value, n]`,
    where `value` is the replacement text and `n` is the number of
    parameters for the macro.  The array can have a third entry:
    either a string that is the default value to give for an optional
    (bracketed) parameter when the macro is used, or an array
    consisting of template strings that are used to separate the
    various parameters.  This works the same as for the :data:`macros`
    assignments above.

    Note that since the `value` is a javascript string, backslashes in
    the replacement text must be doubled to prevent them from acting
    as javascript escape characters.  Alternatively, you can use the
    :data:`String.raw` syntax to create the string literals with
    single backslashes.

    For example,

    .. code-block:: javascript
 
       active: {
         '*': ['#1 \\times #2', 2],
         '+': '\\boldsymbol{\\char`+}'
       }

    makes ``*`` be a macro that typesets a times symbol between the
    two arguments that follow it, while ``+`` will produce a bold plus
    sign.  Note that you don't want to use the symbol you are defining
    as part of the definition, as that would cause an infinite loop.
    Instead, we use the ``\char`` macro to insert the plus sign rather
    than using ``+`` directly.


|-----|
