.. _tex-newcommand:

##########
newcommand
##########

The `newcommand` extension provides the ``\def``, ``\newcommand``,
``\renewcommand``, ``\let``, ``\newenvironment``, and
``\renewenvironment`` macros for creating new macros and environments
in TeX.  For example,

.. code-block:: latex

    \(
       \def\RR{{\bf R}}
       \def\bold#1{{\bf #1}}
    \)

defines a macro ``\RR`` that produces a bold "R", while
``\bold{math}`` typesets its argument using a bold font.  See
:ref:`tex-macros` for more information, and for mechanisms for
pre-defining macros at startup.

This extension is already loaded in all the components that include
the TeX input jax, other than ``input/tex-base``.  To load the
`newcommand` extension explicitly (when using ``input/tex-base`` for
example), add ``'[tex]/newcommand'`` to the :data:`load` array of the
:data:`loader` block of your MathJax configuration, and add
``'newcommand'`` to the :data:`packages` array of the :data:`tex`
block.

.. code-block:: javascript

   window.MathJax = {
     loader: {load: ['[tex]/newcommand']},
     tex: {packages: {'[+]': ['newcommand']}}
   };

Alternatively, use ``\require{newcommand}`` in a TeX expression to
load it dynamically from within the math on the page, if the
:ref:`tex-require` extension is loaded.

Since the `newcommand` extension is included in the combined
components that contain the TeX input jax, it may already be in the
package list.  In that case, if you want to disable it, you can remove
it:

.. code-block:: javascript

   window.MathJax = {
     tex: {packages: {'[-]': ['newcommand']}}
   };

-----

.. _tex-newcommand-options:

newcommand Options
------------------

When the `newcommand` extension is added to the :data:`packages` array
for the :data:`tex` block of your MathJax configuration (as it is in
all the combined components), two new options are made available in
the :data:`tex` block:

.. code-block:: javascript

   MathJax = {
     tex: {
       maxMacros: 10000,                        // maximum number of macro substitutions per expression
       protectedMacros: ['begingroupSandbox'],  // macros that can't be redefined
     }
   };

.. _tex-maxMacros:
.. describe:: maxMacros: 10000

   Because a definition of the form ``\def\x{\x} \x`` would cause
   MathJax to loop infinitely, the ``maxMacros`` constant will limit
   the number of macro substitutions allowed in any expression
   processed by MathJax.

.. _tex-protectedMacros:
.. describe:: protectedMacros: ['begingroupSandbox']

   This array lists the macro names that can't be redefined by
   ``\let``, ``\def``, ``\newcommand``, or other commands the define
   TeX control sequences.  For example, in a question-and-answer
   website where users can enter mathemtical expressions, this
   protects the listed macro from being overwritten by a user,
   possibly interfering with another user.  See the
   :ref:`tex-begingroup` for more on isolating users from one
   another.

-----

.. _tex-newcommand-commands:

newcommand Commands
-------------------

The `newcommand` extension implements the following macros:
``\def``, ``\let``, ``\newcommand``, ``\newenvironment``, ``\renewcommand``, ``\renewenvironment``


|-----|
