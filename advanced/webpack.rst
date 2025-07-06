.. _web-custom-build:

################################
Making a Custom Build of MathJax
################################

MathJax provides a number of combined components that load everything
you need to run MathJax with a given input and output format.  Still,
you might find that none of the ones we provide fully suit your
needs, and that you would like to include additional components in the
build, or perhaps want to include customized configuration options.

You can use the MathJax component build tools to make your own custom
component that has exactly the pieces and configuration that you
want. You can also use them to make a custom extension, for example a
TeX input extension, that takes advantage of the components already
loaded, but implements additional functionality.
These possibilities are described in :ref:`custom-component` below.

It is also possible to make a completely custom build of MathJax that
doesn't use the MathJax components at all, but includes direct calls
to the MathJax source files.  This is described in :ref:`custom-build`
below.

If you wish to include MathJax as part of a larger project, you can
use either of the techniques to do that, and make a webpacked file
that includes your own project code as well as MathJax.


.. _getting-ready:

Getting Things Ready
====================

Your first step is to download a copy of MathJax via ``npm``,
``pnpm``, or ``git``, as described in the section on
:ref:`obtain-mathjax`.

* If you use ``npm`` or ``pnpm``, you may want to install the
  ``@mathjax/src`` package rather than the ``mathjax`` package, since
  the former includes all the source code, in both its original and
  compiled forms, along with the webpacked components.  If you are
  only going to use the webpacked components, then installing the
  ``mathjax`` package will be sufficient.

* If you use ``git``, be sure to run the commands to compile and make
  the components, as listed in :ref:`mathjax-git`.

In either case, you should have ``mjs``, ``cjs``, ``bundle``, and
``components`` directories, either in the
``node_modules/@mathjax/src`` directory (for ``npm`` installations) or
in the main directory (for ``git`` installations).

Your second step is to obtain the tools needed to package your custom
code using ``webpack``.  Use the commands

.. code-block:: shell

   npm install webpack
   npm install webpack-cli
   npm install terser-webpack-plugin

to install ``webpack`` and its needed libraries.  Once this is done,
you should be able to make the components described below.  The
building instructions assume you used ``npm`` to acquire MathJax; if
you used ``git``, then you will need to change
``node_modules/@mathjax/src`` in the paths that include them.

-----

.. _custom-component:

Building a Custom Component
===========================

MathJax comes with a number of predefined components, and you can use
`their definitions
<https://github.com/mathjax/MathJax-src/tree/master/components/mjs>`__ as a starting
point for your own custom component.  There are also custom component
examples (with documentation) in the `MathJax web demos repository
<https://github.com/mathjax/MathJax-demos-web#customization>`__, which are
similar to the ones described here.

There are several kinds of components you could build:

* A **combined component** that brings together several other
  components (the ``tex-chtml`` component is a combined component)

* An **extension component** that contains what is needed for one
  feature and can be loaded along with other components to add
  that feature to MathJax.

* A **custom build** of MathJax that uses only the pieces of MathJax
  that you need for a specialized setting.

We describe how you can create each of these in the links below.

-----

.. _customized-component-examples:

Customized Component Examples
=============================

.. toctree::

   build/component.rst
   build/extension.rst
   build/custom.rst

|-----|
