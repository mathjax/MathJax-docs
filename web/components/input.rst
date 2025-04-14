
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

The TeX input format is packaged in two different ways, depending on
which extensions are included in the component.  This gives you
several possible trade-offs between file size and feature
completeness.  See the :ref:`tex-input` section for details about the
TeX input processor.

.. note::

   As the number of TeX extensions available in MathJax has grown, and
   with the availability of third-party extensions, it is impractical
   to include all of them in one components.  Thus the
   `input/tex-full` extension has been dropped from version 4.

When you include one of the TeX input components, MathJax will define
functions to convert TeX strings into the output format that has been
loaded and into the MathML format.  See the :ref:`convert-math`
section for details.


input/tex
---------

This is the standard TeX input component.  It includes the main
TeX/LaTeX input parser, along with the base definitions for the most
common macros and environments.  It also includes the :ref:`tex-ams`,
:ref:`tex-newcommand`, :ref:`tex-require`, :ref:`tex-autoload`,
:ref:`tex-configmacros`, and :ref:`tex-noundefined` extensions.  Most
of the remaining extensions are loaded automatically when needed, or
you can use ``\require`` to load any of them explicitly.  This will
cause the extensions to be loaded dynamically, so if you are calling
MathJax's typesetting or conversion methods yourself, you should use
the promise-based versions in order to handle that properly.

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

-----

TeX Extension Packages
----------------------

Each of the TeX extensions listed in the :ref:`extension-list` has its
own component.  The name of the component is the name of the extension
preceded by ``[tex]/`` so the component for the ``enclose``
extension is ``[tex]/enclose``.  You can include any of the extension
components in the :js:data:`load` array of the :js:data:`loader` section of your
MathJax configuration, and add the extension to the :js:data:`packages` array
in the :js:data:`tex` block.  For example:

.. code-block:: html

   window.MathJax = {
     loader: {load: ['[tex]/enclose']},
     tex: {
       packages: {'[+]', ['enclose']}
     }
   };

Of course, if you are using one of the packages that includes the
:ref:`tex-autoload` extension, then you don't have to load most of the
extensions explicitly, as they will be loaded automatically when first
used.  You can also use ``\require`` to load an extension explicitly,
if needed.

See the :ref:`tex-extension-options` section for information about
configuring the TeX extensions.

.. note::

   Version 3 included a ``[tex]/all-packages`` components that
   included most of the TeX extension packages.  Due to the growing
   number of extensions, including third-party extensions, the
   ``all-packages`` extension has been dropped from v4.

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
component, MathJax will define functions to convert AsciiMath strings
into the output format that has been loaded, and into the MathML
format.  See the :ref:`convert-math` section for details.

See the :ref:`asciimath-options` section for information about
configuring this component.

.. note::

   The AsciiMath input jax has not been fully ported to v3/v4
   yet.  The AsciiMath component includes legacy MathJax 2 code
   patched into the new MathJax framework.  That makes the AsciiMath
   component larger than usual, and slower than the other input
   components.

|-----|
