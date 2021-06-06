.. _tex-macros:

###################
Defining TeX macros
###################

You can use the ``\def``, ``\newcommand``, ``\renewcommand``,
``\newenvironment``, ``\renewenvironment``, and ``\let`` commands to
create your own macros and environments.  Unlike actual TeX, however,
in order for MathJax to process such definitions, they must be 
enclosed in math delimiters (since MathJax only processes macros in 
math-mode).  For example

.. code-block:: latex

    \(
       \def\RR{{\bf R}}
       \def\bold#1{{\bf #1}}
    \)

would define ``\RR`` to produce a bold-faced "R", and ``\bold{...}``
to put its argument into bold face.  Both definitions would be
available throughout the rest of the page.

You can include macro definitions in the ``macros`` section of the
``tex`` blocks of your configuration, but they must be represented as
javascript objects.  For example, the two macros above can be
pre-defined in the configuration by

.. code-block:: javascript

    window.MathJax = {
      tex: {
        macros: {
	  RR: "{\\bf R}",
	  bold: ["{\\bf #1}", 1]
	}
      }
    };

Here you give the macro as a ``name: value`` pair, where the ``name``
is the name of the control sequence (without the backslash) that you
are defining, and ``value`` is either the replacement string for the
macro (when there are no arguments) or an array consisting of the
replacement string followed by the number of arguments for the macro
and, optionally, default values for optional arguments.

Note that the replacement string is given as a javascript string
literal, and the backslash has special meaning in javascript strings.
So to get an actual backslash in the string you must double it, as in
the examples above.

Similarly, you can create new environments with the ``environments``
section of the ``tex`` block of your configuration.

See :ref:`tex-configmacros-options` for more details on the ``macros``
and ``environments`` configuration blocks.

|-----|
