.. extension-writing:

****************************
Tutorial: Extension writing
****************************

MathJax is designed in a way that makes easy to write extensions.
Examples can be found in the `MathJax third party
extensions <https://github.com/mathjax/MathJax-third-party-extensions>`__
repository; see also :ref:`ThirdParty`.

In this tutorial, we are going to see how to write your own MathJax
extension. No specific prerequisites are assumed, except that you
already have a local :ref:`installation` and of course
some familiarity with how to use MathJax.

The Big Picture
---------------

We suppose that you have a copy of MathJax in a ``MathJax/`` directory
and that the URL ``http://localhost/MathJax/`` points to that directory.
We also assume that you have a local Web server running at
``http://localhost/`` ; this is not mandatory but will avoid issues with
the cross origin policy.

First, note that the source code of MathJax is "packed" so that the
Javascript files are smaller and take less time to download. These files
are not easy to read and edit, so for development purpose we will work
with the ``MathJax/unpacked/`` directory. Hence you should load the
unpacked ``MathJax.js`` to run MathJax on your pages. For example if you
write a file like

.. code-block:: html

       MathJax/unpacked/test0.html

       <!doctype html>
       <html>
         <head>
           <title>testcase</title>
           <meta charset="utf-8">
           <script type="text/javascript"
                   src="http://localhost/MathJax/unpacked/MathJax.js?config=TeX-MML-AM_HTMLorMML">
           </script>
         </head>
         <body>
           <p>TeX: \(\frac a b\)</p>
           <p>MathML: <math><msqrt><mi>x</mi></msqrt></math></p>
           <p>AsciiMath: `a^2 + b^2 = c^2`</p>
         </body>
       </html>

then the page ``http://localhost/MathJax/unpacked/test0.html`` should
contain formatted equations corresponding to the TeX, MathML and
AsciiMath sources.

``MathJax.js`` is the main file, initializes MathJax and loads all its
components. The most important ones are represented in the diagram
below. The input modes (in blue) are located in ``unpacked/jax/input/``
and transform the corresponding given input text into MathJax's internal
strutures (in red) located in ``unpacked/jax/element`` (only one format
at the moment, essentially "MathML"). Then this internal structure is
rendered by the output modes (in green) located in
``unpacked/jax/output``. The MathJax extensions are located in
``unpacked/extensions/`` and can modify or extend the MathJax
components.


.. image:: _static/components.svg
   :width: 50%
   :alt: MathJax components


One feature of MathJax is that other Javascript files are loaded only
when they are necessary. Extensions generally use other components so
you must be sure that they are already loaded before running the
extension. Similarly, the extension may need to indicate when it is
ready so that other components can use it. :ref:`synchronization` is
explained in the MathJax documentation but we will review the rules when
needed.

A Simple measureTime Extension
------------------------------

In this section, we are willing to write a small extension that
indicates at the bottom of the page how much time MathJax has taken to
typeset the page. First we create the following Javascript file:

.. code-block:: javascript

       // unpacked/extensions/measureTime.js

       MathJax.HTML.addElement(document.body, "div", {style: {color: "red"}}, ["Hello World!"]);
       MathJax.Ajax.loadComplete("[MathJax]/extensions/measureTime.js");

The first line is just using the convenient
:ref:`MathJax.HTML <api-html>` to
create a ``<div style="color: red;">Hello World!</div>`` element. The
second line will tell to MathJax that ``measureTime.js`` has been
successfully loaded. Again, we refer to :ref:`Synchronizing your code with
MathJax <synchronization>` for
details. Now modify test0.html and insert a ``text/x-mathjax-config``
script just before the one loading MathJax. Use that to add
``measureTime.js`` to the list of extensions to load:

.. code-block:: html

      <!-- MathJax/test/test1.html -->
      
      ...
          <script type="text/x-mathjax-config">
             MathJax.Hub.config.extensions.push("measureTime.js");
          </script>
          <script type="text/javascript"
                  src="http://localhost/MathJax/unpacked/MathJax.js?config=TeX-MML-AM_HTMLorMML">
      ...

The page ``http://localhost/MathJax/unpacked/test1.html`` should now
render the same as ``test0.html``, except that a red "Hello World!"
message is appended at the end of the page!

Our goal is now to replace that message by something like "Typeset by
MathJax in 2 second(s)". A quick look at the :ref:`MathJax Startup
Sequence <startup-sequence>` shows that the
extensions are loaded before the typesetting pass. Also, the typesetting
starts with a "Begin Typeset" signal and ends by a "End Typeset" signal.
The startup sequence ends by a final "End" signal. In order to add
listeners for these signals are sent, we use
``MathJax.Hub.Register.StartupHook``.

Writing the extension is now straighforward. We save the data specific
to the measureTime extension in a ``MathJax.Extension.measureTime``
object. When we listen the start and end typeset signals we set the
corresponding ``startTime`` and ``endTime`` members to the current time.
Finally when we listen the final End signal, we append the desired div
(note that the previous version appended it immediately):

.. code-block:: javascript

      // unpacked/extensions/measureTime.js

      MathJax.Extension.measureTime = {};

      MathJax.Hub.Register.StartupHook("Begin Typeset", function () {
        MathJax.Extension.measureTime.startTime = (new Date()).getTime();
      });
      
      MathJax.Hub.Register.StartupHook("End Typeset", function () {
        MathJax.Extension.measureTime.endTime = (new Date()).getTime();
      });
      
      MathJax.Hub.Register.StartupHook("End", function () {
        var delta = (MathJax.Extension.measureTime.endTime - MathJax.Extension.measureTime.startTime) / 1000.;
        MathJax.HTML.addElement(document.body, "div", null,
                                ["Typeset by MathJax in " + delta + " second(s)"]);
      });
      
      MathJax.Ajax.loadComplete("[MathJax]/extensions/measureTime.js");

Now load ``test1.html`` again (clearing the browser cache if necessary)
and verify if you see the desired "Typeset by MathJax in ... seconds"
message.

Note that this was a basic extension to demonstrate the extension
mechanism but it obviously has some limitations e.g. only the typeset
time is measured (not the whole MathJax execution time), the message is
not updated when you switch the rendering mode via the menu, the message
is not localizable etc

Extension to define TeX macros
------------------------------

TeX already has a macro mechanism to define new commands from those
already available. This mechanism exists in MathJax too and one can rely
on it to create a MathJax extension that defines a collection of TeX
macros. Consider the following example:

.. code-block:: javascript

      //unpacked/extensions/TeX/Taylor.js

      MathJax.Hub.Register.StartupHook("TeX Jax Ready", function () {
        MathJax.InputJax.TeX.Definitions.Add({
          macros: {
            expexpansion: ["Macro", "\\sum_{n=0}^{+\\infty} \\frac{x^n}{n!}"],
            taylor: ["Macro","\\sum_{n=0}^{+\\infty} \\frac{{#1}^{(n)} \\left({#2}\\right)}{n!} {\\left( {#3} - {#2} \\right)}^n", 3],
            taylorlog: ["Macro","\\sum_{n=1}^{+\\infty} {(-1)}^{n+1} \\frac{#1^n}{n}", 1],
            taylorsin: ["Macro","\\sum_{n=0}^{+\\infty} \\frac{{(-1)}^n}{(2n+1)!} {#1}^{2n+1}", 1]
          }
        });
      });
      
      MathJax.Ajax.loadComplete("[MathJax]/extensions/TeX/Taylor.js");

The structure is similar to the measureTime extension: we wait until the
TeX input is ready by listening the appropriate signal. Then we extend
the set of TeX macros with some definitions. For example

.. code-block:: javascript

      expexpansion: ["Macro", "\\sum_{n=0}^{+\\infty} \\frac{x^n}{n!}"]

will define a TeX command for the exponential series. Note these
definitions are given in Javascript string so you need to escape some
special characters: for example double backslashes are used. If your
macro has parameters you must specify the expected number thus the
"three" in

.. code-block:: javascript

      taylor: ["Macro","\\sum_{n=0}^{+\\infty} \\frac{{#1}^{(n)} \\left({#2}\\right)}{n!} {\\left( {#3} - {#2} \\right)}^n", 3],

You can finally use the Taylor extension in a test page:

.. code-block:: html

    <!--MathJax/unpacked/test2.html-->

    ...
    <script type="text/x-mathjax-config">
      MathJax.Hub.Config({ TeX: { extensions: ["Taylor.js"] }});
    </script>
    ...

    <body>
    \[ \exp(x) = \expexpansion \] 

    \[ f(x) = \taylor{f}{x}{a} \]


    \[ \log(1+h) = \taylorlog{h} \text{ for } |h| < 1 \]

    \[ \sin\left(\frac{\epsilon}{3}\right) =
       \taylorsin{\left(\frac{\epsilon}{3}\right)} \]
    </body>

Dealing with Dependencies
-------------------------

Suppose that we want to create another extension Taylor2.js that uses
some command from Taylor.js. Hence Taylor2 depends on Taylor and we
should do some synchronization. We have already seen that the Taylor
extension waits for the "TeX Jax Ready" signal before defining the
macros. In order to inform the Taylor2 extensions when it is ready, the
Taylor extension must itself send a "TeX Taylor Ready" signal. The
appropriate place for that is of course after the macros are defined:

.. code-block:: javascript

      // unpacked/extensions/TeX/Taylor.js

      MathJax.Hub.Register.StartupHook("TeX Jax Ready", function () {
        MathJax.InputJax.TeX.Definitions.Add({
    ...
        });
    MathJax.Hub.Startup.signal.Post("TeX Taylor Ready");
      });
      
      MathJax.Ajax.loadComplete("[MathJax]/extensions/TeX/Taylor.js");

Now define Taylor2.js as follows:

.. code-block:: javascript

      // unpacked/extensions/TeX/Taylor2.js

      MathJax.Hub.Register.StartupHook("TeX Jax Ready", function () {
        MathJax.InputJax.TeX.Definitions.Add({
          macros: {
            sinexpansion: ["Extension", "Taylor"]
          }
        });
      });
      
      MathJax.Hub.Register.StartupHook("TeX Taylor Ready", function () {
        MathJax.Hub.Insert(MathJax.InputJax.TeX.Definitions, {
          macros: {
            sinexpansion: ["Macro", "\\taylorsin{x}"]
          }
        });
      });

      MathJax.Ajax.loadComplete("[MathJax]/extensions/TeX/Taylor2.js");

When the input Jax is ready, ``\sinexpansion`` will be define as a
function that loads the Taylor extension and restarts the processing
afterward. When the Taylor extension is ready, ``\sinexpansion`` becomes
the wanted ``\\taylorsin{x}`` definition. Now, you can use this command
in a test3 page. Note that only only the Taylor2 extension is specified
in the list of extension to load.

.. code-block:: html

    <!--MathJax/unpacked/test3.html-->

    ...
    <script type="text/x-mathjax-config">
      MathJax.Hub.Config({ TeX: { extensions: ["Taylor2.js"] }});
    </script>
    ...

    <body>
    \[ \sin(x) = \sinexpansion \]
    ...

We won't give the details in this tutorial, but note that other MathJax
components have similar methods to stop, wait for an extension and
restart the execution again.

More Advanced Extensions
------------------------

In general, writing more sophisticated extensions require a good
understanding of the MathJax codebase. Although the :ref:`public MathJax
API <mathjax-api>` is available in the
documentation, this is not always the case of the internal code. The
rule of thumb is thus to read the relevant ``jax.js`` files in
``unpacked/jax`` (if necessary the Javascript file they can load too)
and to make your extension redefine or expand the code.

Here is an example. We modify the behavior of ``\frac`` so that the
outermost fractions are drawn normally but those that have a ``\frac``
ancestor are drawn bevelled. We also define a new command ``\bfrac``
that draws bevelled fractions by default. It has an optional parameter
to indicate whether we want a bevelled fraction and can take values
"auto" (like ``\frac``), "true" or "false". One has to read carefully
the TeX parser to understand how this extension is working.

.. code-block:: javascript

      //unpacked/extensions/bevelledFraction.js

      MathJax.Hub.Register.StartupHook("TeX Jax Ready", function () {
        MathJax.InputJax.TeX.Definitions.Add({
          macros: {
            frac: "Frac",
            bfrac: "BFrac"
          }
        }, null, true);
        MathJax.InputJax.TeX.Parse.Augment({
          Frac: function (name) {
      
            var old = this.stack.env.bevelled; this.stack.env.bevelled = true;
            var num = this.ParseArg(name);
            var den = this.ParseArg(name);
            this.stack.env.bevelled = old;
      
            var frac = MathJax.ElementJax.mml.mfrac(num, den);
            frac.bevelled = this.stack.env.bevelled;
            this.Push(frac);
          },
          BFrac: function (name) {
      
            var bevelled = this.GetBrackets(name);
            if (bevelled === "auto")
              bevelled = this.stack.env.bevelled;
            else
              bevelled = (bevelled !== "false");
      
            var old = this.stack.env.bevelled; this.stack.env.bevelled = true;
            var num = this.ParseArg(name);
            var den = this.ParseArg(name);
            this.stack.env.bevelled = old;

            var frac = MathJax.ElementJax.mml.mfrac(num, den);
            frac.bevelled = bevelled;
            this.Push(frac);
          }
        });
      
      });

      MathJax.Ajax.loadComplete("[MathJax]/extensions/TeX/mfracBevelled.js");
      
Again you can use this command in a ``test4`` page. 

.. code-block:: html

    <!--MathJax/unpacked/test4.html-->

    ...
    <script type="text/x-mathjax-config">
      MathJax.Hub.Config({ TeX: { extensions: ["mfracBevelled.js"] }});
    </script>
    ...

    \[ \frac a b \]
    \[ \frac {\frac a b}{\frac c d} \]
    \[ \bfrac a b \]
    \[ \bfrac[true] a b \]
    \[ \bfrac[false] a b \]
    \[ \bfrac[auto] a b \]
    \[ \frac {\bfrac[auto] a b}{\bfrac[false] a b} \]
    \[ \bfrac {\frac a b}{\bfrac[auto] a b} \]

    ...

