.. _startup-options:

###############
Startup Options
###############

The `startup` component is responsible for creating the objects needed
by MathJax to perform the mathematical typesetting of your pages, and
for setting up the methods you may need to call in order to do that.
It is configured using the :data:`startup` block in your configuration
object.

-----

The Configuration Block
=======================

In the example below, :data:`Startup` represents the
:attr:`MathJax.startup` object, for brevity.

.. code-block:: javascript

    MathJax = {
      startup: {
        elements: null,          // The elements to typeset (default is document body)
        typeset: true,           // Perform initial typeset?
        ready: Startup.defaultReady,          // Called when components are loaded
        pageReady: Startup.defaultPageReady,  // Called when MathJax and page are ready
        document: document,      // The document (or fragment or string) to work in
        invalidOption: 'fatal',  // Are invalid options fatal or produce an error?
        optionError: Startup.defaultOptionError,  // Function used to report invalid options
        input: [],               // The names of the input jax to use from among those loaded
        output: null,            // The name for the output jax to use from among those loaded
        handler: null,           // The name of the handler to register from among those loaded
        adaptor: null,           // The name for the DOM adaptor to use from among those loaded
        polyfillHasOwn: true,    // True if a polyfill for Object.hasOwn should be used when
                                 //   it is not available natively
      }
    };

-----


Option Descriptions
===================

.. _startup-elements:
.. describe:: elements: null

   This is either ``null`` or an array of DOM elements whose contents
   should be typeset.  The elements can either be actual DOM elements,
   or strings that give CSS selectors for the elements to typeset.

.. _startup-typeset:
.. describe:: typeset: true

   This determines whether the initial typesetting action should be
   performed when the page is ready.  Setting it to ``false`` means
   MathJax will not typeset automatically; you will have to call
   :js:meth:`MathJax.typesetPromise()` or a similar function yourself
   when you want the math to be processed.

.. _startup-ready:
.. describe:: ready: MathJax.startup.defaultReady

   This is a function that is called when MathJax is loaded and ready
   to go.  It is called by the :ref:`loader-component` when all the
   components are loaded.  The default action is to create all the
   objects needed for MathJax, and set up the call to the
   :meth:`pageReady()` function below.  You can override this function
   if you want to modify the setup process; see :ref:`startup-action`
   for more details.  Note that this function may be called before the
   page is complete, so unless you are modifying the objects created
   by the `startup` module, configuring :meth:`pageReady()` may be the
   better choice.

.. _startup-pageReady:
.. describe:: pageReady: MathJax.startup.defaultPageReady

   This is a function that is called when MathJax is ready to go and
   the page is ready to be processed.  The default action is to
   perform the initial typesetting of the page and return the promise
   that resolves when that is complete, but you can override it to do
   whatever you would like.  You should return the promise from
   the :meth:`MathJax.startup.defaultPageReady()` function if you call
   it.  See :ref:`startup-action` for more details and examples of how
   to do this.

.. _startup-document:
.. describe:: document: document

   This is the document (or fragment or string of serialized HTML)
   that you want to process.  By default (for in-browser use) it is
   the browser document.  When there is no global :data:`document`
   variable, it is an empty HTML document.

.. _startup-invalidOption:
.. describe:: invalidOption: 'fatal'   // or 'warn'

   This determines whether an invalid option will cause a fatal error
   (when set to ``'fatal'``) that stops MathJax from running, or a
   warning (when set to ``'warn'``) that allows MathJax to go on.
   Prior to version 3.2, invalid options were fatal, but this option
   now allows control over that behavior.

.. _startup-optionError:
.. describe:: optionError: Startup.defaultOptionError

   This option gives a function that is called whenever there is an
   invalid option provided by the user.  It takes two string
   arguments, the first being the message, and the second being the
   name of the invalid option.  The default function looks at the
   ``invalidOption`` value and if it is ``'fatal'`` it throws an error
   using the given message, otherwise it logs the message to the
   browser console, allowing further options to be processed.

.. _startup-input:
.. describe:: input: []

   This is an array of names of input processors that you want to use,
   from among the ones that have been loaded.  So if you have loaded
   the code for several input jax, but only want to use the ``tex``
   input jax, for example, set this to ``['tex']``.  If set to an
   empty array, then all loaded input jax are used.

.. _startup-output:
.. describe:: output: null

   This is the name of the output processor that you want to use,
   from among the ones that have been loaded.  So if you have loaded
   the code for several output jax, but only want to use the ``svg``
   output jax, for example, set this to ``'svg'``.  If set to ``null``
   or an empty string, then the first output jax that is loaded will
   be used.

.. _startup-handler:
.. describe:: handler: null

   This is the name of the document handler that you want to use,
   from among the ones that have been loaded.  Currently, there is
   only one handler, the HTML handler, so unless you are creating your
   own handlers, leave this as ``null``.

.. _startup-adaptor:
.. describe:: adaptor: null

   This is the name of the :ref:`DOM adaptor <node-DOM-adaptor>` that
   you want to use, from among the ones that have been loaded.  By
   default the components load the ``browser`` adaptor, but you can
   load the ``liteDOM`` adaptor for use in `node` applications; if you
   do, it will set this value so that it will be used automatically.
   There are several other DOM adaptors for use in `node`, as well.

.. _startup-polyfillHasOwn:
.. describe:: polyfillHasOwn: true

   This indicates whether MathJax should provide a polyfill for the
   :meth:`Object.hasOwn()` method when it is not available natively in
   the browser.  It is defined in all modern browsers, but some
   browsers that are several years old may not have an implementation
   for it, so MathJax will provide one when needed unless this option
   is set to ``false``.

|-----|
