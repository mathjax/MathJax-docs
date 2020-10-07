.. _startup-loader-options:

##########################
Startup and Loader Options
##########################

MathJax's components system is based on two tools that handler loading
the various components and setting up the objects and methods needed
to use the loaded components.  They both use options to control their
actions, as described below.

.. toctree::
    :maxdepth: 1

    loader
    startup

-----

These modules use the global :data:`MathJax` object to determine what
you want loaded, and alter that object to include the methods and
objects that they set up.  The initial value of :data:`MathJax` is
saved as :attr:`MathJax.config`, and other properties are added to
:data:`MathJax` depending on the components that get loaded.  For
example, the `startup` component adds :meth:`MathJax.startup`, which
contains the objects that the `startup` module creates, like the input
and output jax, the math ocument object, the DOM adaptor, and so on.
See the :ref:`MathJax API <mathjax-api>` documentation for more
information.

The :data:`MathJax` variable can also contain configuration blocks
intended for individual components when they are loaded.  For example,
it can have a ``tex`` block to configure the :ref:`input/tex
<tex-input>` component.  See :ref:`configuration` for more details.

Note that you must set up the global :data:`MathJax` object **before**
loading MathJax itself.  If you try to that afterward, you will
overwrite the :data:`MathJax` variable, and all the values that
MathJax has set in them.  See the :ref:`configure-after-load` section
for more about how to change the configuration after MathJax is loaded
if you need to do that.

|-----|
