.. _mathml-output:

##############
MathML Support
##############

MathJax uses MathML as the basis for its internal format for
mathematical expressions, so MathML support is built into MathJax at a
fundamental level.  There is a :ref:`MathML input jax <mathml-input>`
for converting from MathML elements into the internal format
(javascript objects representing the MathML elements), and there is a
mechanism that can convert the internal format into a serialized
MathML string provided by :meth:`MathJax.startup.toMML()` (if you are
using MathJax components).

.. _NativeMML:

While MathJax version 2 included a `NativeMML` output jax for
producing MathML output in the web page, because MathML is not
available in the Chrome, Edge, and IE browsers, because the MathML
support in Safari and Firefox don't include all the features needed by
MathJax (e.g., the `<mlabeledtr>` element needed for labeled
equations), and because the quality of the results in Safari and
Firefox are not always comparable to the output from MathJax, the
`NativeMML` output jax is no longer provided in MathJax version 3.

You can, however, use MathJax's MathML serialization features to
implement your own native MathML output if you wish.  Here is one
example that does so for TeX input to MathML output.

.. code-block:: html

   <style>
   mjx-container[display="block"] {
     display: block;
     margin: 1em 0;
   }
   </style>
   <script>
   MathJax = {
     //
     //  Load only TeX input and the contextual menu
     //
     loader: {load: ['input/tex', 'ui/menu']},
     //
     //  When page is ready, render the math in the document
     //
     //
     //  When page is ready:
     //    disable the assistive-mathml menu item
     //    render the document, handling require and autoload calls
     //
     startup: {
       pageReady() {
         MathJax.startup.document.menu.menu.findID('Accessibility', 'AssistiveMml').disable();
         MathJax._.mathjax.mathjax.handleRetriesFor(() => MathJax.startup.document.render());
       }
     },
     //
     //  Override the usual typeset render action with one that generates MathML output
     //
     options: {
       renderActions: {
         assistiveMml: [],  // disable assistive mathml
         typeset: [150,
           (doc) => {for (math of doc.math) {MathJax.config.renderMathML(math, doc)}},
           (math, doc) => MathJax.config.renderMathML(math, doc)
         ]
       },
       menuOptions: {
         settings: {
           assistiveMml: false
         }
       }
     },
     //
     // The action to use for rendering MathML
     //
     renderMathML(math, doc) {
       math.typesetRoot = document.createElement('mjx-container');
       math.typesetRoot.innerHTML = MathJax.startup.toMML(math.root);
       math.display && math.typesetRoot.setAttribute('display', 'block');
     }
   };
   </script>
   <script type="text/javascript" id="MathJax-script" async
     src="https://cdn.jsdelivr.net/npm/mathjax@3/es5/startup.js">
   </script>

This example uses the :ref:`startup-component` component to load just
the :ref:`input/tex <tex-component>` and :ref:`contextual menu
<menu-component>` components, and defines a new render action that
replaces the standard ``typeset`` action with one that creates a
MathJax container element and stores it in :attr:`math.typesetRoot`,
then converts the internal format to a MathML string (via
:meth:`MathJax.startup.toMML()`) and has the browser parse that into
DOM element (via :attr:`innerHTML`).  A later render action will move
the container and its MathML contents into the DOM at the proper
location.  For math that is in display style, the container is marked
with an attribute so that CSS can be used to make the container be a
block-level element with some top and bottom margin.

The example also takes several steps to disable the Assistive MathML
extension that inserts hidden MathML for the usual output renders.
This is unneeded since we are generating MathML ourselves as the
primary output.  Setting the :attr:`menuOptions.settings.assistiveMml`
option to ``false`` turns off the assistive MathML in the contextual
menu. The :func:`pageReady()` function also includes a line that
disables the assistive-MathML item in the menu, so user's can't
accidentaly turn it on again.  Finally, the `assistiveMml` render
action is disabled, since it will never be activated (overkill
perhaps, but no need to run the usual code for nothing).

.. note::

   MathJax's version 2 NativeMML output processor worked around
   various limitations of Firefox/Gecko and Safari/WebKit (e.g., to
   provide support for equation labels), but this approach does not,
   as it just uses the generic MathML.

|-----|
