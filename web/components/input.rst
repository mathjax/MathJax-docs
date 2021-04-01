
.. _input-components:

################
Input Components
################

Currently there are three MathJax input formats, each packaged into
its own component.

* :ref:`tex-component`
* :ref:`mathml-component`
* :ref:`asciimath-component`

These are described in more detail below.  See the
:ref:`input-options` section for details about configuring these
components.

-----


.. _tex-component:

input/tex
=========

The TeX input format is packaged in three different ways, depending on
which extensions are included in the component.  This gives you
several possible trade-offs between file size and feature
completeness.  See the :ref:`tex-input` section for details about the
TeX input processor.

When you include one of the TeX input components, MathJax will define
a function to convert TeX strings into the output format that
has been loaded.  See the :ref:`convert-math` section for details.

input/tex
---------

This is the standard TeX input component.  It includes the main
TeX/LaTeX input parser, along with the base definitions for the most
common macros and environments.  It also includes the :ref:`tex-ams`,
:ref:`tex-newcommand`, :ref:`tex-require`, :ref:`tex-autoload`,
:ref:`tex-configmacros`, and :ref:`tex-noundefined` extensions.  The
remaining extensions (other than :ref:`tex-physics` and
:ref:`tex-colorv2`) are loaded automatically when needed, or you can
use ``\require`` to load any of them explicitly.  This will cause the
extensions to be loaded dynamically, so if you are calling MathJax's
typesetting or conversion methods yourself, you should use the
promise-based versions in order to handle that properly.

See the :ref:`tex-options` section for information about
configuring this component.

input/tex-full
--------------

This is the most complete TeX input component.  It includes the main
TeX/LaTeX input parser, along with all the TeX extensions, and is
configured to enable all of them other than :ref:`tex-physics` and
:ref:`tex-colorv2`.  You can add these two to the ``packages`` array
in the ``tex`` section of your MathJax configuration, though you
should remove the :ref:`tex-color` extension if you add the
:ref:`tex-colorv2` extension, and should remove the :ref:`tex-braket`
extension if you enable the :ref:`tex-physics` package.

See the :ref:`tex-options` section for information about
configuring this component.

input/tex-base
--------------

This is a minimal TeX input component.  It includes the main TeX/LaTeX
input parser, along with the base definitions for the most common
macros and environments.  No other extensions are included, so no
extensions are autoloaded, and you can not use ``\require``.  For this
component, you must explicitly load the extensions you want to use,
and add them to the ``packages`` array.

See the :ref:`tex-options` section for information about
configuring this component.


TeX Extension Packages
----------------------

Each of the TeX extensions listed in the :ref:`extension-list` has its
own component.  The name of the component is the name of the extension
preceded by ``[tex]/``; so the component for the ``enclose``
extension is ``[tex]/enclose``.  You can include any of the extension
components in the ``load`` array of the ``loader`` section of your
MathJax configuration, and add the extension to the ``packages`` array
in the ``tex`` block.  For example:

.. code-block:: html

   window.MathJax = {
     loader: {load: ['[tex]/enclose']},
     tex: {
       packages: {'[+]', ['enclose']}
     }
   };

Of course, if you are using one of the packages that includes the
:ref:`tex-autoload` extension, then you don't have to load the
extensions explicitly (except for :ref:`tex-physics` and
:ref:`tex-colorv2`), as they will be loaded automatically when first
used.

In addition, there is a ``[tex]/all-packages`` component that includes
all the packages, and configures the TeX input processors to include
all of them except :ref:`tex-physics` and :ref:`tex-colorv2`.  The
`input/tex-base` and `[tex]/all-packages` components together are
effectively the same as the `input/tex-full` component.

See the :ref:`tex-extension-options` section for information about
configuring the TeX extensions.


-----


.. _mathml-component:

input/mml
============

The `input/mml` component contains the MathML input processor,
including the function that identifies MathML within the page.  See
the :ref:`mathml-input` section for details concerning the MathML
input processor.  When you include the `input/mml` component,
MathJax will define a function to convert serialized MathML strings
into the output format that has been loaded.  See the
:ref:`convert-math` section for details.

* See the :ref:`mathml-output` section for details about MathML output.

* See the :ref:`mathml-options` section for information about
  configuring this component.

-----


.. _asciimath-component:

input/asciimath
===============

The `input/asciimath` component contains the AsciiMath input
processor, including the function that identifies AsciiMath within the
page.  See :ref:`asciimath-input` section or details concerning the
AsciiMath input processor.  When you include the `input/asciimath`
component, MathJax will define a function to convert AsciiMath strings
into the output format that has been loaded.  See the
:ref:`convert-math` section for details.

See the :ref:`asciimath-options` section for information about
configuring this component.

.. note::

   The AsciiMath input jax has not been fully ported to version 3
   yet.  The AsciiMath component includes legacy MathJax 2 code
   patched into the MathJax 3 framework.  That makes the AsciiMath
   component larger than usual, and slower than the other input
   components.

|-----|
