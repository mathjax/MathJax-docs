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

.. note::

   MathJax's version 2 NativeMML output processor worked around
   various limitations of Firefox/Gecko and Safari/WebKit (e.g., to
   provide support for equation labels), but this approach does not,
   as it just uses the generic MathML.

.. _AssistiveMML:

MathJax version 2 also included an `AssistiveMML` extension that would
insert hidden MathML that could be read by screen readers.  This is no
longer part of MathJax version 3.  You can, however, implement your
own version of this, as in the example below:

.. code-block:: html

   <style>
   /*
    *  The MathML will be hidden from view for visual users, but available to
    *  assistive technology, like screen readers.
    */
   mjx-assistive-mml {
     position: absolute !important;
     top: 0px; left: 0px;
     clip: rect(1px, 1px, 1px, 1px);
     padding: 1px 0px 0px 0px !important;
     border: 0px !important;
     display: block !important;
     width: auto !important;
     overflow: hidden !important;
     /*
      *  Don't allow the assistive MathML become part of the selection
      */
     -webkit-touch-callout: none;
     -webkit-user-select: none;
     -khtml-user-select: none;
     -moz-user-select: none;
     -ms-user-select: none;
     user-select: none;
   }
   mjx-assistive-mml[display="block"] {
     width: 100% !important
   }
   </style>
   <script>
   function addAssistiveMML(math, doc) {
     const adaptor = doc.adaptor;
     //
     // Get the serialized MathML
     //
     const mml = MathJax.startup.toMML(math.root).replace(/\n */g, '').replace(/<!--.*?-->/g, '');
     //
     // Parse is as HTML and retrieve the <math> element
     //
     const mmlNodes = adaptor.firstChild(adaptor.body(adaptor.parse(mml, 'text/html')));
     //
     // Create a container for the hidden MathML
     //
     const node = adaptor.node('mjx-assistive-mml', {
       role: 'presentation', unselectable: 'on', display: (math.display ? 'block' : 'inline')
     }, [mmlNodes]);
     //
     // Hide the typeset math from assistive technology and append the MathML that is visually 
     //   hidden from other users
     //
     adaptor.setAttribute(math.typesetRoot, 'role', 'presentation');
     adaptor.setAttribute(adaptor.firstChild(math.typesetRoot), 'aria-hidden', 'true');
     adaptor.setStyle(math.typesetRoot, 'position', 'relative');
     adaptor.append(math.typesetRoot, node);
   }
   MathJax = {
     //
     //  Use dollar signs for in-line delimiters in addition to the usual ones
     //
     tex: {inlineMath: {'[+]': [['$', '$']]}},
     //
     //  Add a render action for adding the assistive MathML
     //
     options: {
       renderActions: {
         assistiveMML: [155, (doc) => {for (math of doc.math) addAssistiveMML(math, doc)}, addAssistiveMML]
       }
     }
   };
   </script>
   <script type="text/javascript" id="MathJax-script" async
     src="https://cdn.jsdelivr.net/npm/mathjax@3/es5/tex-chtml.js">

This example creates a function that adds the assistive MathML to a
math expression, and creates a new :ref:`render action
<document-renderActions>` that causes the function to be called as
part of the MathJax rendering process.

|-----|
