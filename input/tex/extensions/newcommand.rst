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
:ref:`tex-macros` for more information.

This extension is already loaded in all the components that
include the TeX input jax, other than ``input/tex-base``.  To load the
`newcommand` extension explicitly (when using ``input/tex-base`` for
example), add ``'[tex]/newcommand'`` to the ``load`` array of the
``loader`` block of your MathJax configuration, and add
``'newcommand'`` to the ``packages`` array of the ``tex`` block.

.. code-block:: javascript

   window.MathJax = {
     loader: {load: ['[tex]/newcommand']},
     tex: {packages: {'[+]': ['newcommand']}}
   };

Alternatively, use ``\require{newcommand}`` in a TeX expression to load it
dynamically from within the math on the page, if the `require`
package is loaded.

Since the `nnewcommand` extension is included in the combined
components that contain the TeX input jax, it may already be in
the package list.  In that case, if you want to disable it, you can
remove it:

.. code-block:: javascript

   window.MathJax = {
     tex: {packages: {'[-]': ['newcommand']}}
   };


-----


.. _tex-newcommand-commands:


newcommand Commands
-------------------

The `newcommand` extension implements the following macros:
``\def``, ``\let``, ``\newcommand``, ``\newenvironment``, ``\renewcommand``, ``\renewenvironment``


|-----|
