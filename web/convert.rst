.. _convert-math:

=========================================
Converting a Math String to Other Formats
=========================================

An important use case for MathJax is to convert a string containing
mathematics (in one of the three forms that MathJax understands) and
convert it into another form (either MathML, or one of the output
formats that MathJax supports).  This was difficult to do in MathJax
version 2, but easy to do in current versions of MathJax.

-----

.. _conversion-methods:

Conversion Methods
==================

When MathJax starts up, it creates methods for converting from the
input format(s) to the output format(s) that you have loaded, and to
MathML format.  Depending on the input and output formats that you
have loaded, you will get the corresponding functions from the list
below:

.. js:function:: MathJax.tex2chtml(math[,options])
                 MathJax.tes2chtmlPromise(math[,options])
                 MathJax.tex2svg(math[,options])
                 MathJax.tes2svgPromise(math[,options])
                 MathJax.tex2mml(math[,options])
                 MathJax.tex2mmlPromise(math[,options])
                 
.. js:function:: MathJax.mathml2chtml(math[,options])
                 MathJax.mathml2chtmlPromise(math[,options])
                 MathJax.mathml2svg(math[,options])
                 MathJax.mathml2svgPromise(math[,options])
                 MathJax.mathml2mml(math[,options])
                 MathJax.mathml2mmlPromise(math[,options])
                 
.. js:function:: MathJax.asciimath2chtml(math[,options])
                 MathJax.asciimath2chtmlPromise(math[,options])
                 MathJax.asciimath2svg(math[,options])
                 MathJax.asciimath2svgPromise(math[,options])
                 MathJax.asciimath2mml(math[,options])
                 MathJax.asciimath2mmlPromise(math[,options])

   :param string math: The TeX, serialized MathML, or AsciiMath string
                       to be converted.
   :param OptionList options: Described in the section below.
   :return: The DOM tree (for CHTML or SVG output), a serialized MathML
            string, or a promise that returns one of these and that is
            resolved when the result is ready.

For example, if you have loaded the MathML input jax
and the SVG output jax (say by using the ``mml-svg`` component), then
MathJax will create the methods above that involve ``mathml`` and ``svg``.

The functions with names containing ``chtml`` or ``svg`` produce DOM
elements as the results of the conversion, with the promise version
passing that to its :meth:`then()` function as an argument, and the
non-promise versions returning them immediately.  You can insert these
DOM elements into the document directly, or you can use their
:attr:`outerHTML` property to obtain their serialized string form.
Note that you may need to run

.. code-block:: javascript

   MathJax.startup.document.reset();
   MathJax.startup.document.updateDocument();

in order to update the CSS needed for the output, especially for CHTML
output.

The functions that convert to MathML produce serialized MathML strings
automatically, rather than DOM elements.  You can use the browser's
:attr:`DOMParser` object to convert the string into a MathML DOM tree
if you need that instead.

The functions ending in ``Promise`` perform the conversion
asynchronously, and return promises, while the others operate
synchronously and return the converted form immediately.

Note that the synchronous functions only work if the math you typeset
doesn't require MathJax to load any extensions or data files (e.g.,
TeX input uses ``\require`` or macros that are autoloaded from an
extension).  If a file needs to be loaded, MathJax with throw a
``retry`` error, which will prevent the conversion from completing.
In that case, you should either switch to the promise-based versions
of the conversion function you are using, or preload the needed
component or data files.  See the :ref:`retry-error` section for more
details.

.. warning::

   In MathJax v4, with the introduction of new fonts that include many
   more characters than the original MathJax TeX fonts did, the fonts
   have been broken into smaller pieces so that your readers don't
   have to download the entire font and its data for characters that
   may never be used.  That means that typesetting mathematics may
   need to operate asynchronously even if the TeX *doesn't* include
   ``\require`` or any auto-loaded extensions, as the output itself
   could need extra font data files to be loaded.  Thus in version 4,
   it is always best to use the promise-based command, described
   below.

-----

.. _conversion-options:

Conversion Options
==================

All of the functions listed above require an argument that is the math
string to be converted (e.g., the serialized MathML string, the TeX or
LaTeX string, or the AsciiMath string).  You can also pass a second
argument that is an object containing options that control the
conversion process.  The options that can be included are:

* :attr:`display`, a boolean specifying whether the math is in
  display-mode or not (for TeX input).  Default is ``true``.
* :attr:`em`, a number giving the number of pixels in an ``em`` for
  the surrounding font.  Default is ``16``.
* :attr:`ex`, a number giving the number of pixels in an ``ex`` for
  the surrounding font.  Default is ``8``.
* :attr:`containerWidth`, a number giving the width of the container,
  in pixels.  Default is 80 times the :attr:`ex` value.
* :attr:`scale`, a number giving a scaling factor to apply to the
  resulting conversion.  Default is 1.
* :attr:`family`, a font family name to be used for ``mtext`` and
  ``merror`` elements when their fonts are set to be inherited (via
  the :attr:`mtextInheritFont` or :attr:`merrorInheritFont`).

For example,

.. code-block:: javascript

   const html = MathJax.tex2chtml('\\sqrt{x^2+1}', {em: 12, ex: 6, display: false});

would convert the TeX expression ``\sqrt{x^2+1}`` to HTML as an
in-line expression, with ``em`` size being 12 pixels and ``ex`` size
being 6 pixels.  The result will be a DOM element containing the HTML
for the expression.  Similarly,

.. code-block:: javascript
   
   const html = MathJax.tex2chtml('\\sqrt{x^2+1}', {em: 12, ex: 6, display: false});
   const text = html.outerHTML;

sets :data:`text` to be the serialized HTML string for the expression.

-----

.. _get-metrics:

Obtaining the Output Metrics
============================

Since the :attr:`em`, :attr:`ex`, and :attr:`containerWidth` all
depend on the location where the math will be placed in the document
(they are values based on the surrounding text font and the container
elements width), MathJax provides a method for obtaining these values
from a given DOM element.

.. js:function:: MathJax.getMetricsFor(node, display)

   :param HTMLElement node: The DOM node that is the container for the mathematics.
   :param boolean display: True if the math is in display mode, false if not.
   :return: An object containing ``em``, ``ex``, ``containerWidth``,
            ``scale``, and ``family`` values for the container,
            together with the ``display`` value.

This takes a DOM element (``node``) and a boolean (``display``), indicating
if the math is in display mode or not, and returns an object
containing the options listed above.  You can pass this
object directly to the conversion methods discussed above.  So you can
do something like

.. code-block:: javascript

   let node = document.querySelector('#math');
   let options = MathJax.getMetricsFor(node, true);
   let html = MathJax.tex2svg('\\sqrt{x^2+1}', options);
   node.appendChild(html);

in order to get the correct metrics for the (eventual) location of the
math that is being converted.  Of course, it would be easier to simply
insert the TeX code into the page and use
:js:meth:`MathJax.typesetPromise()` to typeset it, but this is just an
example to show you how to obtain the metrics from a particular
location in the page.

Note that obtaining the metrics causes a page refresh, so it is
expensive to do this.  If you need to get the metrics from many
different locations, there are more efficient ways, but these are
advanced topics to be dealt with elsewhere.

-----

.. _conversion-stylesheet:

Obtaining the Output Styles
===========================

The output from the SVG and CommonHTML output jax both depend on CSS
stylesheets in order to properly format their results.  You can obtain
the SVG stylesheet element by calling

.. js:function:: MathJax.svgStylesheet()

and the CommonHTML stylesheet from

.. js:function:: MathJax.chtmlStylesheet()

The CommonHTML output jax CSS can be quite large, so the output jax
tries to minimize the stylesheet by including only the styles that are
actually needed for the mathematics that has been processed by the
output jax.  That means you should request the stylesheet only *after*
you have typeset the mathematics itself.

Moreover, if you typeset several expressions, the stylesheet will
include everything needed for all the expressions you have typeset.
If you want to reset the stylesheet, then use

.. js:function::  MathJax.startup.output.clearCache()

if the output jax is the CommonHTML output jax.  So if you want to
produce the style sheet for a single expression, issue the
:js:meth:`Mathjax.startup.output.clearCache()` command just before the
:js:meth:`MathJax.tex2chtml()` call.

-----

.. _stand-alone-svg:

Creating Stand-Alone SVG Images
===============================

If you are using the SVG output jax to produce stand-alone SVG files,
then you should set the ``fontCache`` value in the ``svg`` section of
your MathJax configuration to be ``'local'``.  If set to ``global``,
then there will be a common global cache created for all the character
paths used in the expressions you typeset.  To clear that cache, use

.. js:function::  MathJax.startup.output.clearFontCache()

With a local font cache, the paths are stored within the SVG element
itself.  There will still be some dependencies on CSS, however.  You
can use the following to insert the needed style definitions directly
into the SVG image.

.. code-block:: javascript

   const svgCss = [
     'svg a{fill:blue;stroke:blue}',
     '[data-mml-node="merror"]>g{fill:red;stroke:red}',
     '[data-mml-node="merror"]>rect[data-background]{fill:yellow;stroke:none}',
     '[data-frame],[data-line]{stroke-width:70px;fill:none}',
     '.mjx-dashed{stroke-dasharray:140}',
     '.mjx-dotted{stroke-linecap:round;stroke-dasharray:0,140}',
     'use[data-c]{stroke-width:3px}'
   ].join('');
   const xmlDeclaration = '<?xml version="1.0" encoding="UTF-8" standalone="no"?>';

   async function getSvgImage(math, options = {}) {
     const adaptor = MathJax.startup.adaptor;
     const result = await MathJax.tex2svgPromise(math, options);
     let svg = adaptor.tags(result, 'svg')[0];
     svg = (svg.match(/^<svg.*?><defs>/)
       ? svg.replace(/<defs>/, `<defs><style>${svgCss}</style>`)
       : svg.replace(/^(<svg.*?>)/, `$1<defs><style>${svgCss}</style></defs>`));
    svg = svg.replace(/ (?:role|focusable|aria-hidden)=".*?"/g, '')
             .replace(/"currentColor"/g, '"black"');
    return xmlDeclaration + '\n' + svg;
  }   

This defines a function :meth:`getSvgImage()` that takes a math string
and returns a self-contained serialized SVG image of the math.

Note that in version 4, the MathJax contextual menu also includes a
``SVG Image`` option in the ``Show Math As`` menu that you can use to
obtain the SVG image directly.

|-----|
