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
MathML string provided by :meth:`MathJax.startup.toMML()`, if you are
using :ref:`MathJax components <getting-started-components>`.

.. _NativeMML:

While MathJax version 2 included a `NativeMML` output jax for
producing MathML output in the web page, support for MathmL in
browsers was spotty, and the results varied across browsers and
operating systems, sometimes requiring additional fonts or plugins to
be used.  This meant that the quality of the output could not be
assured, and for these reasons, the MathML output renderer was removed
in version 3.

Today, most modern browsers include support for MathML-Core, which is
a limited subset of the full MathML specification.  While this is an
improvement over the past, MathML-Core does not include some important
features that are needed by MathJax (the ``<mlabeledtr>`` element needed
for numbered equations, and most of the table attributes needed for
alignments, for example), so a native MathML output format is still not
included in version 4.

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
   <style id="mjx-explorer-styles"></style>
   <script>
   MathJax = {
     //
     //  Load only TeX input and the contextual menu
     //
     loader: {load: ['input/tex', 'a11y/explorer', 'ui/menu']},
     startup: {
       //
       //  Set the styles needed for the expression explorer
       //  and disable the assistive MathML menu
       //
       ready() {
         MathJax.startup.defaultReady();
         const doc = MathJax.startup.document;
         const {StyleJsonSheet} = MathJax._.util.StyleJson;
         const css = new StyleJsonSheet(doc.constructor.speechStyles);
         const sheet = document.getElementById('mjx-explorer-styles');
         sheet.textContent = css.cssText;
         doc.menu.menu.findID('Options', 'AssistiveMml').disable();
       },
       //
       //  Perform the initial typesetting (we don't have an output
       //  jax, so this isn't done automatically).
       //
       pageReady() {
         return MathJax.startup.document.renderPromise();
       }
     },
     options: {
       //
       //  Override the usual typeset render action with one that generates MathML output
       //
       renderActions: {
         assistiveMml: [],  // disable assistive mathml
         typeset: [150,
           (doc) => {for (math of doc.math) {MathJax.config.renderMathML(math, doc)}},
           (math, doc) => MathJax.config.renderMathML(math, doc)
         ]
       },
       //
       //  Don't add assistive MathML
       //
       menuOptions: {
         settings: {
           assistiveMml: false,
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
   <script defer src="https://cdn.jsdelivr.net/npm/mathjax@4/startup.js">
   </script>

This example uses the :ref:`startup-component` component to load just
the :ref:`input/tex <tex-component>`, :ref:`explorer-component`, and
:ref:`contextual menu <menu-component>` components, and defines a new
render action that replaces the standard ``typeset`` action with one
that creates a MathJax container element and stores it in
:data:`math.typesetRoot`, then converts the internal format to a
MathML string (via :meth:`MathJax.startup.toMML()`) and has the
browser parse that into DOM element (via :data:`innerHTML`).  A later
render action (already included by MathJax) will move the container
and its MathML contents into the DOM at the proper location.  For math
that is in display style, the container is marked with an attribute so
that CSS will make the container be a block-level element with some
top and bottom margin.

The :js:meth:`ready()` function is used to create the CSS needed by
the expression explorer.  This uses a predefined ``style`` element in
the page and populates it with the CSS defineitions contained in the
MathDocument's `speechStyles` property.

Because there is no actual output jax, the startup component doesn't
create the :js:meth:`MathJax.typesetPromise()` method and there is no
initial typeset action performed.  We use the :js:meth:`pageReady()`
function to do our own typesetting by calling the document's
:js:meth:`renderPromise()` function.

The example also takes several steps to disable the Assistive MathML
extension that inserts hidden MathML for the usual output renderers.
This is unneeded since we are generating MathML ourselves as the
primary output.  Setting the :data:`menuOptions.settings.assistiveMml`
option to ``false`` turns off the assistive MathML in the contextual
menu. The :js:meth:`ready()` function also includes a line that
disables the assistive-MathML item in the menu, so user's can't
accidentally turn it on again.  Finally, the ``assistiveMml`` render
action is disabled, since it will never be activated (overkill
perhaps, but no need to run the usual code for nothing).

Note that MathJax's internal MathML is based on the MathML3
specification.  Most browsers that support MathML implement
MathML-Core (which was developed several years after MathJax was
initially written).  The MathML-Core specification is more limited
than MathML3, and does not support all the features that MathJax uses.
For example, it does not include the :attr:`mathvariant` attribute in
most cases, and MathJax uses that to implement ``\mathbf``,
``\mathfrak``, ``\mathbb``, ``\mathcal``, and the other font variants.
That means that the output generated here may not produce the desired
variants when the MathML is displayed in a browser.  The
:ref:`filter-mathvariant` example provides a way to work around that
shortcoming in MathML-Core.  Other limitations remain, however, such
as the lack of support for most of the ``mtable`` element's
attributes, which are used to implement LaTeX's various alignment
environments, for example.  So while it is possible to produce MathML
output, the browser's native MathML rendering may not be up to the
task for displaying it as well as MathJax would.

.. note::

   MathJax's version 2 NativeMML output processor worked around
   various limitations of Firefox/Gecko and Safari/WebKit (e.g., to
   provide support for equation labels), but this example does not,
   as it just uses the generic MathML.  So the output generated here
   may not reproduce all the features available in the CHTML and SVG
   renderers.  One would need to replace
   :meth:`MathJax.startup.toMML()` by a more sophisticated version
   that works around the limitations in MathML-Core in order to
   faithfully reproduce those.

|-----|
