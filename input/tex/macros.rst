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

.. _tex-startup-macros:

Configuring Macros at Startup
=============================

You can include macro definitions in the :data:`macros` section of the
:data:`tex` block of your configuration, but they must be represented as
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
the examples above, or use the javascript ``String.raw`` method for
specifying the string literal.

Similarly, you can create new environments with the
:data:`environments` section of the :data:`tex` block of your
configuration, and active characters (single characters that act as a
macro without the need for a backslash) using the :data:`active`
section of the :data:`tex` block of your configuration.

See :ref:`tex-configmacros-options` for more details on the
:data:`macros`, :data:`environments`, and :data:`active`
configuration blocks.

.. _tex-ready-macros:

Running TeX Code During Startup
===============================

Alternatively, you can use the :js:meth:`ready()` function in the
:data:`startup` block of your configuration to process a TeX
expression that defines the macros, as in the following example:

.. code-block::

   window.MathJax = {
     startup: {
       ready() {
         MathJax.startup.defaultReady();
         const {STATE} = MathJax._.core.MathItem;
         MathJax.tex2mml(String.raw`
           \newcommand{\RR}{\mathbf{R}}
           \newcommand{\bold}[1]{\mathbf{#1}}
           \let\star=\ast
         `);
       }
     }
   };

This allows you to use actual TeX commands, but without having to have
an actual TeX block within the page to make the definitions.

If you need to have definitions that are different for each page, then
you could include them in a script that specifies the definitions, and
then include that in the :js:meth:`ready()` call.  For example,

.. code-block::

   <script type="text/x-tex-macros">
     \newcommand{\RR}{\mathbf{R}}
     \newcommand{\bold}[1]{\mathbf{#1}}
     \let\star=\ast
   </script>
   <script>
     window.MathJax = {
       startup: {
         ready() {
           MathJax.startup.defaultReady();
           const {STATE} = MathJax._.core.MathItem;
           const defs = document.querySelector('script[type="text/x-tex-macros"]');
           MathJax.tex2mml(defs?.textContent || '');
         }
       }
     };
   </script>

will take the definitions from the first script, if any, and process
them during its startup phase.  You can have the first script be part
of the page, and the second be part of the scripts loaded into every
page, and that will allow you to have page-specific definitions.  It
would also be possible to use a regular ``<script>`` tag to set a
javascript variable (rather than using ``type="text/x-tex-macros"``)
and use that value in the :js:meth:`convert()` call that rather than
looking up the contents of a script.


|-----|
