.. _node-DOM-adaptor:

===============
The DOM Adaptor
===============

Because node applications don't have access to a built-in Document
Object Model (DOM), like browsers do, node applications must use an
alternative to a native DOM.  There are a naumber of node packages
that offer DOM substitutes, such as `jsDOM` and `linkedom`.  These
libraries generally provide implementations of the browser DOM in
javascript that include more functionality than is required by MathJax
in a node application, and so MathJax provides its own LiteDOM for
this purpose.  This is a minimal implementation of a DOM that includes
just enough for MathJax to do its job, so is light-weight and fast,
but MathJax can be made to work with most DOM implementations.  For
example, if your node application is already using a DOM library, you
may want to have MathJax work with that rather than its own LiteDOM.

The key to this is MathJax's concept of a `DOM adaptor`.  This is an
interface that standardizes the functionality that MathJax needs, and
that converts those actions into the corresponding calls appropriate
for the DOM implementation being used.  This makes it possible to use
MathJax with DOM-like data structures that don't implement the
HTMLElement interface (such as the LiteDOM), for example.

The interaction that MathJax does with DOM elements is mediated
through the DOM adaptor.  For example, creation of new DOM nodes is
handled through the :js:meth:`adaptor.node()` method, setting node
attributes is done through :js:meth:`adaptor.setAttribute()`, and
measuring the size of an element is accomplished via
:js:meth:`adaptor.nodeSize()`.  All MathJax modules use the DOM
adaptor whenever they create or manipulate DOM elements, expect those
modules that can run only in a browser setting, like the expression
explorer and the MathJax contextual menu.

When the initial :js:class:`MathDocument` is created, it gets a DOM
adaptor to handle interactions with the DOM that is part of the
document that the MathDocument controls.  This adaptor is passed on to
the output jax, and any other component that needs to handle the
document DOM.  If you are writing a MathJax component, you will want
to use the DOM adaptor rather than manipulate DOM elements directly if
your extension is meant to work within node applications and not just
the browser.  The examples in the `MathJax Node Demos
<https://github.com/mathjax/MathJax-demos-node#MathJax-demos-node>`__
repository all use the DOM adaptor to handle interaction with DOM
elements.

The interface for the DOM adaptor is given in the
`ts/core/DOMadaptor.ts
<https://github.com/mathjax/MathJax-src/blob/master/ts/core/DOMAdaptor.ts>`__
file, where you can see that methods that are available for you to
call from your own code.

MathJax includes DOM adaptors for the browser DOM and its own LiteDOM,
as well as for `jsDOM` and `linkedom`.  If you wish to create an
adaptor for another DOM implementation, you should look at the ones
found in the `ts/adaptors
<https://github.com/mathjax/MathJax-src/tree/master/ts/adaptors>`__
directory for examples.


|-----|
