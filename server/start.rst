.. _node-start:

#########################
Getting Started with Node
#########################

There are several different ways to use MathJax in node applications,
as described in the links below.  The first is a simple way to get
started expermineting with MathJax in node, but is not designed to be
used in production applications, and can't be used in a browser
setting.

Another way is based on the idea of *MathJax components*, which are
the mechanism MathJax uses in browsers to break up MathJax into
smaller pieces that can be loaded individually as needed.  MathJax
components can be used in node just as they are in the browser, as
described in the second link below.

Loading MathJax components generally operates asynchronously, so if
you are processing expressions that need additional components to be
loaded dynamically, your code must take that into account via the use
of promises.  This can complicate your own code.  To overcome
this, you can pre-load any needed components, so that MathJax doesn't
need to do so dynamically while processing expressions.  The third
link below illustrates that.

The final method is to call on the MathJax code modules directly,
outside of the components framework.  This gives you the most direct
control over MathJax's functionality, but at the cost of not having
the convenience that MathJax components offer.  This approach is
described in the last link below.

Before you start, you should obtain a copy of MathJax, as described in
the section on :ref:`obtain-mathjax`.  Then you can follow one of the
links below to find out more about how to use MathJax in that way.

-----

* :ref:`Experimenting with MathJax     <node-main>`
* :ref:`Using MathJax Components       <node-components>`
* :ref:`Using Components Synchronously <node-preload>`
* :ref:`Linking to MathJax Directly    <node-direct>`

|-----|
