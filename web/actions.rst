.. _startup-action:

#################################
Performing Actions During Startup
#################################

There are several ways to hook into the MathJax startup process so
that you can do additional configuration, perform actions after the
initial typesetting, and so on.  The primary way to do this is to use
one of two hooks that can be set in the :js:data:`startup` block
of your configuration: the :func:`ready()` function and the
:func:`pageReady()` function.

The :func:`ready()` function is what MathJax calls when all the
requested MathJax components have been loaded, and MathJax is ready to
set up the internal objects needed to process the mathematics on the
page (like the input and output jax).  This function builds those
structures, creates functions in the :js:data:`MathJax` object to make
typesetting and format conversion easy for you, sets up the
:js:meth:`pageReady()` call (described below), and creates a promise
for when that is complete.  You can override the :js:meth:`ready()`
function with one of your own to override the startup process
completely, or to perform actions before or after the usual
initialization.  For example, you could do additional setup before
MathJax creates the objects it needs, or you could hook into the
typesetting promise to synchronize other actions with the completion
of the initial typesetting.  Examples of these are given below.

The :js:meth:`pageReady()` function is performed when the HTML page is
loaded and ready to be typeset, and MathJax itself is ready (all its
components are loaded, and the internal objects have been created).
The default is for :js:meth:`pageReady()` to perform the initial
typesetting of the page, but you can override that to perform other
actions instead, such as delaying the initial typesetting while other
content is loaded dynamically, for example.  The :js:meth:`ready()`
function sets up the call to :js:meth:`pageReady()` as part of its
default action.

The return value of the default :js:meth:`pageReady()` is a promise
that is resolved when the initial typesetting is finished.  If you
override the :js:meth:`pageReady()` method, your function should
return a promise as well.  For example, if your function calls
:meth:`MathJax.startup.defaultPageReady()`, then you should return the
promise that it returns (or a promise obtained from its
:js:meth:`then()` or :js:meth:`catch()` methods).  If you don't, then
MathJax will think that the initial typesetting is complete even
though it isn't, which can lead to incorrect behavior if other
typesetting needs to be performed later.

Using these two functions separately or in combination gives you full
control over the actions that MathJax takes when it starts up, and
allows you to customize MathJax's startup process to suit your needs.
Several examples are given below for common situations.

-----

.. _initialization-actions:

Performing Actions During Initialization
========================================

If you want to perform actions after MathJax has loaded all the needed
components, you can set the :js:meth:`ready()` function to a function
that does the needed actions and calls
:meth:`MathJax.startup.defaultReady()` to perform the usual startup
process.

Actions coming before the :meth:`MathJax.startup.defaultReady()` call
are run before any initialization has been done.  In particular, this
is before any input or output jax are created, so this is where
customization of the MathJax object definitions could be performed.
For example, you could modify the configuration blocks at this point,
or you could create subclasses of the MathJax objects that override
some of their methods to produce custom behavior, and then register
those subclasses with MathJax so they will be used in place of the
originals.  It is also possible to create TeX extensions on the fly
and add them at this point.

Actions coming after the :meth:`MathJax.startup.defaultReady()` call
are run after initialization is complete.  In particular, all the
internal objects used by MathJax (e.g., the input and output jax, the
math document, the DOM adaptor, etc) will have been created, and the
typesetting and conversion methods will have been created in the
:js:data:`MathJax` object.

In addition, the variable :js:data:`MathJax.startup.promise` will hold
a promise that is resolved when the initial typesetting is complete,
but note that the typesetting has not yet been performed at this
point.  You can use this promise to set up actions that should occur
after the initial typesetting is complete.  This is discussed further
in the next section.

.. code-block:: javascript

   window.MathJax = {
     startup: {
       ready() {
         console.log("MathJax is loaded, but not yet initialized");
         MathJax.startup.defaultReady();
         console.log("MathJax is initialized and the initial typeset is queued, but hasn't run");
         MathJax.startup.promise.then(() => {
           console.log("The initial typesetting is complete");
         });
       }
     }
   };

The console messages above indicate the MathJax's state at each point
in the code.  For example, you can't do any typesetting in the section
before :js:meth:`MathJax.startup.defaultReady()`, while you
potentially could after it, thought it is better to wait for the
:js:data:`MathJax.startup.promise` before doing so, except in special
circumstances where you know that the typesetting will not cause any
extensions to be loaded dynamically.

.. _full-width-numbers:

Here is an example that uses the :js:meth:`ready()` function to
convert the numbers in the full-width Unicode block to their ASCII
counterparts for better formatting by MathJax.

.. code-block:: javascript

   MathJax = {
     startup: {
       ready() {
         MathJax.startup.defaultReady();
         MathJax.startup.document.inputJax.tex.preFilters.add(
           ({math}) => {
             math.math = math.math.replace(/[\uFF01-\uFF5E]/g,
               (c) => String.fromCodePoint(c.codePointAt(0) - 0xFF00 + 0x20));
           }
         );
       }
     }
   }

This configuration adds a pre-filter to the TeX input jax that
performs a substitution on the TeX source (``math.math``) for each
expression being processed that looks for full-width numerals and
replaces them with the corresponding ASCII numerals.

.. _print-all-math:

Here is an example that waits for the initial typesetting to complete
and then prints to the console the TeX code for all the expressions on
the page.

.. code-block:: javascript

   MathJax = {
     startup: {
       ready() {
         MathJax.startup.defaultReady();
         MathJax.startup.promise.then(() => {
           for (const item of MathJax.startup.document.math) {
             console.log(item.math);
           }
         });
       }
     }
   }

.. _asciimath-display-delimiters:

Finally, here is an example that modifies the AsciiMath input jax to
allow both in-line and display-mode equations by using ```...``` for
in-line delimiters and `````` ``...`` `````` for display-mode
delimiters.

.. code-block:: javascript

   MathJax = {
     loader: {load: ['input/asciimath', 'output/chtml']},
     asciimath: {
       delimiters: [['``','``'], ['`','`']]
     },
     startup: {
       ready() {
         const {AsciiMath} = MathJax._.input.asciimath_ts;
         Object.assign(AsciiMath.prototype, {
           _compile: AsciiMath.prototype.compile,
           compile(math, document) {
             math.display = (math.start?.delim === '``');
             const result = this._compile(math, document);
             const mstyle = result.childNodes[0].childNodes.pop();
             mstyle.childNodes.forEach(child => result.appendChild(child));
             if (math.display) {
               result.attributes.set('display', 'block');
             }
             return result;
           }
         });
         MathJax.startup.defaultReady();
       }
     }
   };

This saves the old AsciiMath ``compile()`` function and replaces it
with a new one that removes the original ``mstyle`` element created by
AsciiMath that sets the display mode, and sets the mode on the outer
``math`` tag depending on the delimiter used.

-----

.. _post-typesetting:

Performing Actions After Typesetting
====================================

Often, you may need to wait for MathJax to finish typesetting the page
before you perform some action.  To accomplish this, you can override
the :js:meth:`ready()` function, having it perform the
:js:meth:`MathJax.startup.defaultReady()` action, and then use the
:js:data:`MathJax.startup.promise` to queue your actions; these will be
performed after the initial typesetting is complete.

.. code-block:: javascript

   window.MathJax = {
     startup: {
       ready: () => {
         MathJax.startup.defaultReady();
         MathJax.startup.promise.then(() => {
           console.log('MathJax initial typesetting complete');
         });
       }
     }
   };

As an alternative, you can override the :js:meth:`pageReady()` function,
and use the promise returned from the
:meth:`MathJax.startup.defaultPageReady()` function:

.. code-block:: javascript

   window.MathJax = {
     startup: {
       pageReady: () => {
         return MathJax.startup.defaultPageReady().then(() => {
           console.log('MathJax initial typesetting complete');
         });
       }
     }
   };

Be sure that you return the promise that you obtain from
:js:meth:`then()` method, otherwise :js:data:`MathJax.startup.promise`
will resolve before the initial typesetting (and your code) has been
performed, which may cause other code to run too soon.

Our first example above shows how to use
:js:data:`MathJax.startup.promise` within the :js:meth:`ready()`
function, but that promise is set up as soon as MathJax is loaded, so
it can be used outside of the :js:meth:`ready()` function.  You must
be careful, however, that MathJax is loaded before you try to use it.
For example, if you use :attr:`defer` or :attr:`async` attributes on
the script tag that laods MathJax, then you need to be sure your code
that uses :js:meth:`MathJax.startup.promise` doesn't run until after
MathJax has been loaded.

One way to do that is to use :attr:`defer` on both the script that
loads MathJax and the one that uses
:js:data:`MathJax.startup.promise`, and to put your script **after**
the one that loads MathJax.  Since deferred scripts run in the order
they appeared in the HTML document, that will guarantee that
:js:data:`MathJax.startup.promise` will be defined when you use it.
For example,

.. code-block:: html

   <script defer src="https://cdn.jsdelivr.net/npm/mathjax@4/tex-mml-chtml.js"></script>
   <script defer src="mathjax-dependent-code.js"></script>

where the ``mathjax-dependent-code.js`` file contains the
:js:data:`MathJax.startup.promise` reference, such as

.. code-block:: javascript

   MathJax.startup.promise.then(() => {
     console.log('MathJax initial typesetting complete');
   });

In this case, the MathJax-dependent code won't run until after MathJax
is loaded.

You can't use the :attr:`defer` attribute on a script tag without a
:attr:`src` attribute, but if you want to use an in-line script that
uses :js:data:`MathJax.startup.promise`, then you can use a script
with :attr:`type="module"`, as these have the :attr:`defer` attribute
by default.  For example,

.. code-block:: html

   <script defer src="https://cdn.jsdelivr.net/npm/mathjax@4/tex-mml-chtml.js"></script>
   <script type="module">
   MathJax.startup.promise.then(() => {
     console.log('MathJax initial typesetting complete');
   });
   </script>

will work to guarantee that the promise is defined when the script is
executed.

-----

.. _actions-summary:

Summary
=======

The following terms were discussed above:

.. js:method:: ready()

               This is the function called when MathJax has loaded the
               needed components and is ready to start setting up the
               objects needed for typsetting the document.  You can
               override it in the ``startup`` section of the
               :js:data:`MathJax` configuration object in order to
               perform customization when MathJax loads, or to set up
               actions to perform after the initial typesetting is
               complete.

.. js:method:: MathJax.startup.defaultReady()

               This is the default for the :js:meth:`ready()` function
               above.  You can call it from your ``ready()`` function
               in order to perform the usual ``ready()`` action.

.. js:method:: pageReady()

               This is the function called when the page is loaded and
               MathJax is ready to perform typesetting.  You can
               override it in the ``startup`` section of the
               :js:data:`MathJax` configuration object in order to do
               your own processing, or to set up actions to perform
               after the initial typesetting is complete.

   :returns: A promise that resoloves when the actions taken by your
             function is complete.

.. js:method:: MathJax.startup.defaultPageReady()

               This is the default for the :js:meth:`pageReady()` function
               above.  You can call it from your ``pageReady()`` function
               in order to perform the usual ``pageReady()`` action.

   :returns: A promise that resolves when the initial page typesetting is complete.


.. js:attribute:: MathJax.startup.promise

                  A promise that resolves when MathJax completes its
                  initially typesetting.  If you use the
                  :js:meth:`MathJax.typesetPromise()` function, or any
                  of the promise-based conversion functions, they wait
                  for this promise to resolve before performing their
                  action, and then set this promise to one that
                  resolves when their typesetting or conversion action
                  is complete.



|-----|
