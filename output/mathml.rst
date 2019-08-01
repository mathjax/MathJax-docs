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
example that does so for TeX intput to MathML output.

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
     startup: {pageReady: () => MathJax.startup.document.render()},
     //
     //  Override the usual typeset render action with one that generates MathML output
     //
     options: {
       renderActions: {
         typeset: [150,
           //
           //  The function for rendering a document's math elements
           //
           (doc) => {
             const toMML = MathJax.startup.toMML;
             for (math of doc.math) {
               math.typesetRoot = document.createElement('mjx-container');
               math.typesetRoot.innerHTML = toMML(math.root);
               math.display && math.typesetRoot.setAttribute('display', 'block');
             }
           },
           //
           //  The function for rendering a single math expression
           //
           (math, doc) => {
             math.typesetRoot = document.createElement('mjx-container');
             math.typesetRoot.innerHTML = MathJax.startup.toMML(math.root);
             math.display && math.typesetRoot.setAttribute('display', 'block');
           }
         ]
       }
     }
   };
   </script>
   <script type="text/javascript" id="MathJax-script" async
     src="https://cdnjs.cloudflare.com/ajax/libs/mathjax/3.0.0/latest.js?startup.js">
   </script>

This example uses the :ref:`startup-component` component to load just
the :ref:`input/tex <tex-component>` and :ref:`contextual menu
<menu-component>` components, and defines a new render action that
replaces the standard ``typeset`` action with one that creates a
MathJax container element and stores it in :attr:`math.typesetRoot`,
then converts the internal format to a MathML string (via
:meth:`MathJax.startup.toMML()`) and has the browser parse that into
DOM elemente (via :attr:`innerHTML`).  A later render action will move
the container and its MathML contents into the DOM at the proper
location.  For math that is in display style, the container is marked
with an attribute so that CSS can be used to make the container be a
block-level element with some top and bottom margin.

.. note::

   MathJax's version 2 NativeMML output processor worked around
   various limitations of Firefox/Gecko and Safari/WebKit (e.g., to
   provide support for equation labels), but this approach does not,
   as it just uses the generic MathML.

-----

.. raw:: html

   <span></span>
