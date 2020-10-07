.. _node-preload:

####################################
Loading Components by Hand in NodeJS
####################################

**This page is still under construction.**

In a `node` application, you can load components individually yourself
via node's ``require()`` command, rather than relying on MathJax
:ref:`loader-component`, which operates asynchronously.  This gives
you the ability to work with MathJax synchronously (i.e., without the
need to use promises).  It also gives you more complete control over
the loading of components, though in this case you do need to take
care to load dependencies yourself, and to make sure the components
are loaded in the right order.

This approach lets you take advantage of using the convenient
packaging of MathJax into individual components, the configuration of
MathJax through the global :data:`MathJax` variable, and its automatic
creation of objects and methods by the :ref:`startup-component`
component, while still allowing you to work completely synchronously
with the MathJax code.  (Or you can still use promises as well ---
it's up to you!)

See the `MathJax node demos
<https://github.com/mathjax/MathJax-demos-node#MathJax-demos-node>`__ for
examples of how to use MathJax from a `node` application.  in
particular, see the `preloading examples
<https://github.com/mathjax/MathJax-demos-node/tree/master/preload#preloaded-component-examples>`__
for illustrations of how to load MathJax components by hand in a
`node` application.
  
More information will be coming to this section in the future.

|-----|
