.. _node-direct:

###################################
Linking to MathJax Directly in Node
###################################

The previous sections use the :ref:`MathJax components
<web-components>` framework to manage most of the details of setting
up and using MathJax.  That framework uses a global :js:data:`MathJax`
variable to configure MathJax, and to store the functions for
typesetting and converting math in web pages.

It is possible, however, to bypass the components layer and link to
the MathJax modules directly.  This provides the lowest-level access
to the MathJax code, and while it is more complicated than using
components, it gives you the greatest control over the details of
MathJax.  In this approach, you trade off ease of configuration and
use for more direct and granual command over MathJax's operations.

When you import MathJax code directly, the MathJax loader and startup
modules are not used, and since those underlie the dynamic loading of
MathJax code on the fly, that ability is more restricted in this
setting.  Some modules rely on that ability, however; in particular the
:ref:`require <tex-require>` and :ref:`autoload <tex-autoload>` TeX
extensions, and the MathJax menu code, all depend on the component
infrastructure, and so can not be used when importing the MathJax
modules directly.

With the direct approach, you must load all the MathJax code that you
will be using explicitly, and you will need to instantiate and
configure the MathJax objects (like the input and output jax, and the
MathDocument object) by hand, as the :ref:`startup-component` module
that performs those duties within the components framework, along with
the :js:data:`MathJax` configuration variable, are not used when
you load MathJax modules directly.

.. note::

   With a little care, it is possible to mix components and direct
   loading of modules.  This is illustrated in the :ref:`node-preload`
   section.  Although that shows how to use MathJax synchronously,
   those techniques can be used for asynchronous processing as well.
   This is also illustrated in the :ref:`direct-tex2chtml-mixed`
   example below.

Finally, MathJax v4 introduced new fonts that include many more
characters than the original MathJax TeX fonts, and these have been
broken into smaller pieces so that, in web pages, your readers don’t
have to download the entire font and its data for characters that may
never be used.  Font ranges are downloaded dynamically when needed,
but when you use direct access to MathJax, rather than the components
framework, that dynamic loading takes a bit more work.  You either
have to preload the ranges that you will need, or make provisions for
loading the ranges yourself when they are needed.  Both these
approaches are illustrated in the examples below.


-----

.. _direct-basics:

The Basics of Linking Directly to MathJax
=========================================

First, :ref:`get a copy of the MathJax code library <obtain-mathjax>`.
Here, we will assume you have used ``npm`` or ``pnpm`` to install the
``@mathjax/src@4`` package.  You will need to use ``@mathjax/src``,
not just ``mathjax``, since the latter only includes the bundled
component files, not the individual MathJax modules that you will be
importing directly.

The MathJax source code for v3 and earlier consisted of ES5 javascript
in CommonJS modules.  As of version 4, MathJax is compiled into both
ES5 CommonJS modules and the more modern ES6 Modules.  These are
stored in the ``cjs`` and ``mjs`` directories, respectively, of the
``@mathjax/src`` node package.  The MathJax :file:`package.json` file
is set up so that references to ``@mathjax/src/js`` will access the
``cjs`` directory when used in a ``require()`` command, and the
``mjs`` directory when used in an ``import`` command.  The examples
below will use ``import`` commands, but you can change them to the
corresponding ``require()`` commands without altering the file paths.

The original source code for MathJax is in Typescript, which is a form
of javascript that has additional information about the types of data
stored in variables, used for function arguments and return values,
and so on.  Those Typescript files are compiled into the ``cjs`` and
``mjs`` directories when MathJax is built.  The ``ts`` directory holds
the Typescript files, and those contain comments describing the
functions and objects they include.  You can refer to them to see
what can be imported from each of the compiled files in the ``cjs``
and ``mjs`` directories.

Most of the examples below begin with ``import`` commands like the
following:

.. code-block:: javascript

   import {mathjax} from '@mathjax/src/js/mathjax.js';
   import {TeX} from '@mathjax/src/js/input/tex.js';
   import {CHTML} from '@mathjax/src/js/output/chtml.js';
   import {liteAdaptor} from '@mathjax/src/js/adaptors/liteAdaptor.js';
   import {RegisterHTMLHandler} from '@mathjax/src/js/handlers/html.js';
   import '@mathjax/src/js/util/asyncLoad/esm.js';

These load the objects and classes needed to use MathJax's internal
structures.

The first obtains the :js:data:`mathjax` object, which
contains the version number, a function for creating a
:js:class:`MathDocument` instance that handles the typesetting and
conversion for a document, a function for handling asynchronous
actions by MathJax, and a function for loading external files
dynamically, among other things.

The next two lines load the class constructors for the input and
output jax. The fourth loads the LiteDOM adaptor that implements a
simple DOM replacement for use within node applications (since node
doesn't have a built-in DOM like browsers do).  See the
:ref:`node-DOM-adaptor` section for more details about the DOM
adaptors available in MathJax.

The fifth line loads a function that registers the code for handling
HTML documents, which is currently the only format MathJax understands
(but we hope to extend this to other formats like Markdown in the
future).

The last line tells MathJax to use ``import()`` commands to load
external files, when needed.  In a CommonJS module, you would use
``require()`` to load :file:`js/util/asyncLoad/node.js` rather than
:file:`js/util/asyncLoad/esm.js`, and would replace all the ``import``
commands by corresponding ``require()`` calls.

Most of the examples also load a number of TeX extensions:

.. code-block:: javascript

   import '@mathjax/src/js/input/tex/base/BaseConfiguration.js';
   import '@mathjax/src/js/input/tex/ams/AmsConfiguration.js';
   import '@mathjax/src/js/input/tex/newcommand/NewcommandConfiguration.js';
   import '@mathjax/src/js/input/tex/noundefined/NoundefinedConfiguration.js';

Here, we load the `base`, :ref:`tex-ams`, :ref:`tex-newcommand`, and
:ref:`tex-noundefined` extensions.  The names of these packages are
then added to the :js:data:`packages` array of the options passed to
the TeX input jax constructor when it is instantiated later on.  The
MathJax TeX extensions are in subdirectories of the ``ts/input/tex``
directory, so you can look there for the configuration files that you
can load.  See :ref:`extension-list` for more about the TeX
extensions.  Remember, you must load all the extensions explicitly
that you plan to use, and the :ref:`tex-autoload` and
:ref:`tex-require` extensions can't be used, as they rely on the
component framework.

Since node applications don't have a fully functional DOM (the LiteDOM
is very minimal), MathJax can't determine the font metrics like the
em- and ex-sizes, or the font in use, or the width of container
elements, as it can in a browser with a full DOM.  Thus the next lines
define default values for these:

.. code-block:: javascript

   const EM = 16;          // size of an em in pixels
   const EX = 8;           // size of an ex in pixels
   const WIDTH = 80 * EM;  // width of container for linebreaking

Then the examples create a DOM adaptor and inform MathJax that is
should recognize HTML documents:

.. code-block:: javascript

   const adaptor = liteAdaptor({fontSize: EM});
   RegisterHTMLHandler(adaptor);

Next, the examples create the input and output jax:

.. code-block:: javascript

   const tex = new TeX({
     packages: ['base', 'ams', 'newcommand', 'noundefined'],
     formatError(jax, err) {console.error(err.message); process.exit(1)},
     //
     // Other TeX configuration goes here
     //
   });
   const chtml = new CHTML({
     fontURL: 'https://cdn.jsdelivr.net/npm/@mathjax/mathjax-newcm-font/chtml/woff2',
     //
     // Any output options go here
     //
   });

Here, we create a TeX input jax instance and configure the
:js:data:`packages` array to include the packages that we loaded
above.  We also include a :js:meth:`formatError()` function that will
report the error and then stop the program from running.  Since we are
only going to process one equation in these examples, that makes it
easy to tell when the TeX input is faulty.

Next, we create a CommomHTML (CHTML) output jax, and configure the URL
where the font files will be found.  If you are hosting your own copy
of MathJax, you should replace this URL with the actual URL of where
you have placed the font files on your server.

You can include any additional configuration options for the input and
output jax, as well, in the indicated locations.  For example, if you
wanted to predefine some TeX macros, you could load the
:ref:`tex-configmacros` extension, add it to the :js:data:`packages`
list, and include a :js:data:`macros` block to the options for the TeX
input jax that defines the needed macros.

Similar commands could be used to create an MathML or AsciiMath input
jax, or an SVG output jax.

Once we have the input and output jax, we create the
:js:class:`MathDocument` instance:

.. code-block:: javascript

   const html = mathjax.document('', {
     InputJax: tex,
     OutputJax: chtml,
     //
     // Other document options go here
     //
   });

This specifies the input and output jax, and any other document
options that you need to set.  The content of the document is blank
due to the empty string as the first argument to
:js:meth:`mathjax.document()`.  Alternatively, you can pass a
serialized HTML string, or an actual DOM object or document fragment
to create a MathDocument to handle the given content.

After the document is created, we can use it to convert TeX
expressions into CHTML output.  The heart of this process is a command
like the following:

.. code-block:: javascript

   const node = html.convert(process.argv[2] || '', {
     display: true,
     em: EM,
     ex: EX,
     containerWidth: WIDTH
   });

This takes the command-line argument from :data:`process.argv[2]`
and treats it as a TeX expression, converting it to CHTML output.
The :data:`display` property indicates that it should be typeset as a
displayed equation rather than in-line (though you could make that a
command-line argument as well), and uses the em- and ex-sizes and
container width values defined earlier.  

.. js:method:: mathDocument.convert(math, [options])

   :param string math:  The TeX, MathML, or AsciiMath expression to be
                        converted.
   :param OptionList options:  The options for the conversion.  These can include:

      * **format**: the format of the input being passed (``'TeX'``,
        ``'MathML'``, or ``'AsciiMath'``).  The default is the name of
        the first input jax of the MathDocument.

      * **display**: Whether this should be typeset in display style
        or in-line style. The default is ``true``.  For MathML input,
        this option is ignored, as the ``<math>`` tag's
        :attr:`display` attribute is used to specify the display style.

      * **end**: The process state at which the conversion should end.
        The default is :data:`STATE.LAST`, meaning all render actions
        should be performed.  The initial list of states is in the
        :file:`ts/core/Mathitem.ts` file, though other files can
        augment that list.

      * **em**: The em-size of the surrounding font in pixels.  The default is 16.

      * **ex**: The ex-size of the surrounding font in pixels.  The default is 8.

      * **containerWidth**: The width of the surrounding container
        element in pixels.  The default is ``null``, meaning we
        consider the container to be infinitely wide.

      * **scale**: The scaling factor to be applied to the output.  The default is 1.

      * **family**: The name of the surrounding font (for when
        ``mtext`` or ``merror`` use the surrounding font).  The
        default is an empty string.

   :returns: The DOM node containing the typeset version of the mathematics.

You could provide the :attr:`display`, :attr:`ex`, :attr:`em`, and
other values from command-line arguments, for example, though we use
the defaults in these examples.

Note that there is also

.. js:method:: mathDocument.convertPromise(math, [options])

taking the same arguments as :js:meth:`mathDocument.convert()` above,
and returning a promise that resolves when the conversion is complete,
passing the generated node as the argument to its :meth:`then()`
method.  This function handles any asynchronous file loads, like those
needed for dynamic font ranges.  Some of the examples below use this
function for that purpose.

Finally, we output a JSON object that contains the serialized HTML
output along with the CSS stylesheet contents for the expression (this
will not be a minimal stylesheet, as, for example, it includes all the
web-font definitions, even if those fonts aren't used).

.. code-block:: javascript

   //
   // Generate a JSON object with the CHTML output and needed CSS
   //
   console.log(JSON.stringify({
     math: adaptor.outerHTML(node),
     css: adaptor.cssText(chtml.styleSheet(html))
   }));

Some examples generate other output (for instance, MathML code, or a complete HTML page).

-----

The Examples
============

In the examples below, the highlighted lines are the ones that differ
from the explanations above, or from previous examples.

* :ref:`direct-tex2mml`
* :ref:`direct-tex2chtml`

  * :ref:`direct-text2chtml-remove`
  * :ref:`direct-text2chtml-promise`
  * :ref:`direct-tex2chtml-font`

* :ref:`direct-tex2chtml-mixed`
* :ref:`direct-tex2speech`
* :ref:`direct-tex2svg-page`

-----

.. _direct-tex2mml:

Converting TeX to MathML
========================

This example combines the ideas from the previous sections into a
complete example.  In this case, it converts a LaTeX expression into a
corresponding MathML one.

.. code-block:: javascript
   :linenos:
   :emphasize-lines: 8, 9, 49-53, 63, 66-69
   :caption: tex2mml.mjs

   //
   //  Load the modules needed for MathJax
   //
   import {mathjax} from '@mathjax/src/js/mathjax.js';
   import {TeX} from '@mathjax/src/js/input/tex.js';
   import {liteAdaptor} from '@mathjax/src/js/adaptors/liteAdaptor.js';
   import {RegisterHTMLHandler} from '@mathjax/src/js/handlers/html.js';
   import {SerializedMmlVisitor} from '@mathjax/src/js/core/MmlTree/SerializedMmlVisitor.js';
   import {STATE} from '@mathjax/src/js/core/MathItem.js';

   //
   // Import the needed TeX packages
   //
   import '@mathjax/src/js/input/tex/base/BaseConfiguration.js';
   import '@mathjax/src/js/input/tex/ams/AmsConfiguration.js';
   import '@mathjax/src/js/input/tex/newcommand/NewcommandConfiguration.js';
   import '@mathjax/src/js/input/tex/noundefined/NoundefinedConfiguration.js';

   //
   // The em and ex sizes and container width to use during the conversion
   //
   const EM = 16;          // size of an em in pixels
   const EX = 8;           // size of an ex in pixels
   const WIDTH = 80 * EM;  // width of container for linebreaking

   //
   // Create DOM adaptor and register it for HTML documents
   //
   const adaptor = liteAdaptor({fontSize: EM});
   RegisterHTMLHandler(adaptor);

   //
   // Create input jax and a (blank) document using it
   //
   const tex = new TeX({
     packages: ['base', 'ams', 'newcommand', 'noundefined'],
     formatError(jax, err) {console.error(err.message); process.exit(1)},
     //
     // Other TeX configuration goes here
     //
   });
   const html = mathjax.document('', {
     InputJax: tex,
     //
     // Other document options go here
     //
   });

   //
   //  Create a MathML serializer
   //
   const visitor = new SerializedMmlVisitor();
   const toMathML = (node => visitor.visitTree(node, html));

   //
   // Convert the math from the command line
   //
   const mml = html.convert(process.argv[2] || '', {
     display: true,
     em: EM,
     ex: EX,
     containerWidth: WIDTH,
     end: STATE.CONVERT         // stop after conversion to MathML
   });

   //
   // Output the resulting MathML
   //
   console.log(toMathML(mml));

Here, line 9 loads the :js:data:`STATE` variable that is used in line
63 to stop the conversion process after the LaTeX is compiled into the
internal MathML format.

Lines 49 through 53 create a MathML serializer using the
:js:class:`SerializedMmlVisitor` loaded in line 8.  This is used in
line 69 to convert the internal MathML to a string form for output.

Running this command as

.. code-block:: shell

   node tex2mml.mjs '\sqrt{1-x^2}'

produces

.. code-block:: xml

   <math xmlns="http://www.w3.org/1998/Math/MathML" data-latex="\sqrt{1-x^2}" display="block">
     <msqrt data-latex="\sqrt{1-x^2}">
       <mn data-latex="1">1</mn>
       <mo data-latex="-">&#x2212;</mo>
       <msup data-latex="x^2">
         <mi data-latex="x">x</mi>
         <mn data-latex="2">2</mn>
       </msup>
     </msqrt>
   </math>

Note that the MathML includes :attr:`data-latex` attributes indicating
the LaTeX that produced each node.  If you don't want those
attributes, you can add

.. code-block:: javascript
   :linenos:
   :lineno-start: 66

   //
   // Remove data-latex and data-latex-item attributes, if any.
   //
   mml.walkTree((node) => {
     const attributes = node.attributes;
     attributes.unset('data-latex');
     attributes.unset('data-latex-item');
   });

at line 66 just before the final output is produced.  With this
change, the output above becomes

.. code-block:: xml

   <math xmlns="http://www.w3.org/1998/Math/MathML" display="block">
     <msqrt>
       <mn>1</mn>
       <mo>&#x2212;</mo>
       <msup>
         <mi>x</mi>
         <mn>2</mn>
       </msup>
     </msqrt>
   </math>


-----

.. _direct-tex2chtml:

Converting TeX to CHTML
=======================

This example puts together all the code blocks from
:ref:`direct-basics` section in order to give an illustration of the
complete process.  The only new lines are 56 through 59, which cause
all the font data to be loaded before the conversion is performed,
thus avoiding the need to have to handle dynamically loaded font
ranges.

.. code-block:: javascript
   :linenos:
   :emphasize-lines: 56-59
   :caption: tex2chtml.mjs

   //
   //  Load the modules needed for MathJax
   //
   import {mathjax} from '@mathjax/src/js/mathjax.js';
   import {TeX} from '@mathjax/src/js/input/tex.js';
   import {CHTML} from '@mathjax/src/js/output/chtml.js';
   import {liteAdaptor} from '@mathjax/src/js/adaptors/liteAdaptor.js';
   import {RegisterHTMLHandler} from '@mathjax/src/js/handlers/html.js';
   import '@mathjax/src/js/util/asyncLoad/esm.js';

   //
   // Import the needed TeX packages
   //
   import '@mathjax/src/js/input/tex/base/BaseConfiguration.js';
   import '@mathjax/src/js/input/tex/ams/AmsConfiguration.js';
   import '@mathjax/src/js/input/tex/newcommand/NewcommandConfiguration.js';
   import '@mathjax/src/js/input/tex/noundefined/NoundefinedConfiguration.js';

   //
   // The em and ex sizes and container width to use during the conversion
   //
   const EM = 16;          // size of an em in pixels
   const EX = 8;           // size of an ex in pixels
   const WIDTH = 80 * EM;  // width of container for linebreaking

   //
   //  Create DOM adaptor and register it for HTML documents
   //
   const adaptor = liteAdaptor({fontSize: EM});
   RegisterHTMLHandler(adaptor);

   //
   //  Create input and output jax and a (blank) document using them
   //
   const tex = new TeX({
     packages: ['base', 'ams', 'newcommand', 'noundefined'],
     formatError(jax, err) {console.error(err.message); process.exit(1)},
     //
     // Other TeX configuration goes here
     //
   });
   const chtml = new CHTML({
     fontURL: 'https://cdn.jsdelivr.net/npm/@mathjax/mathjax-newcm-font/chtml/woff2',
     //
     // Any output options go here
     //
   });
   const html = mathjax.document('', {
     InputJax: tex,
     OutputJax: chtml,
     //
     // Other document options go here
     //
   });

   //
   // Load all the font data
   //
   await chtml.font.loadDynamicFiles();

   //
   // Typeset the math from the command line
   //
   const node = html.convert(process.argv[2] || '', {
     display: true,
     em: EM,
     ex: EX,
     containerWidth: WIDTH
   });

   //
   // Generate a JSON object with the CHTML output and needed CSS
   //
   console.log(JSON.stringify({
     math: adaptor.outerHTML(node),
     css: adaptor.cssText(chtml.styleSheet(html))
   }));


.. _direct-text2chtml-remove:

Removing LaTeX Attributes from CHTML
------------------------------------

In the :ref:`tex2mml <direct-tex2mml>` example above, we saw that the
internal MathML contains :attr:`data-latex` attributes that indicate
the LaTeX commands that produce each MathML node.  Those attributes
are retained in the CHTML output.  If you want to remove them, we can
use a similar idea to the one above, but since we don't have direct
access to the MathML representation in this case, we need to hook into
the MathJax rendering pipeline in order to remove the attributes before
the CHTML output is created.  That can be done by configuring a
:js:data:`renderAction` in the document options when the :data:`html`
document is created.  This is illustrated below, with changes from the
previous example highlighted.

.. code-block:: javascript
   :linenos:
   :emphasize-lines: 46-58
   :caption: tex2chtml-remove.mjs

   //
   //  Load the modules needed for MathJax
   //
   import {mathjax} from '@mathjax/src/js/mathjax.js';
   import {TeX} from '@mathjax/src/js/input/tex.js';
   import {CHTML} from '@mathjax/src/js/output/chtml.js';
   import {liteAdaptor} from '@mathjax/src/js/adaptors/liteAdaptor.js';
   import {RegisterHTMLHandler} from '@mathjax/src/js/handlers/html.js';
   import {STATE} from '@mathjax/src/js/core/MathItem.js';
   import '@mathjax/src/js/util/asyncLoad/esm.js';

   //
   // Import the needed TeX packages
   //
   import '@mathjax/src/js/input/tex/base/BaseConfiguration.js';
   import '@mathjax/src/js/input/tex/ams/AmsConfiguration.js';
   import '@mathjax/src/js/input/tex/newcommand/NewcommandConfiguration.js';
   import '@mathjax/src/js/input/tex/noundefined/NoundefinedConfiguration.js';

   //
   // The em and ex sizes and container width to use during the conversion
   //
   const EM = 16;          // size of an em in pixels
   const EX = 8;           // size of an ex in pixels
   const WIDTH = 80 * EM;  // width of container for linebreaking

   //
   //  Create DOM adaptor and register it for HTML documents
   //
   const adaptor = liteAdaptor({fontSize: EM});
   RegisterHTMLHandler(adaptor);

   //
   //  Create input and output jax and a (blank) document using them
   //
   const tex = new TeX({
     packages: ['base', 'ams', 'newcommand', 'noundefined'],
     formatError(jax, err) {console.error(err.message); process.exit(1)},
   });
   const chtml = new CHTML({
     fontURL: 'https://cdn.jsdelivr.net/npm/@mathjax/mathjax-newcm-font/chtml/woff2',
   });
   const html = mathjax.document('', {
     InputJax: tex,
     OutputJax: chtml,
     renderActions: {
       removeLatex: [
         STATE.CONVERT + 1,
         () => {},
         (math, doc) => {
           math.root.walkTree(node => {
             const attributes = node.attributes;
             attributes.unset('data-latex');
             attributes.unset('data-latex-item');
           });
         }
       ]
     },
   });

   //
   // Load all the font data
   //
   await chtml.font.loadDynamicFiles();

   //
   // Typeset the math from the command line
   //
   const node = html.convert(process.argv[2] || '', {
     display: true,
     em: EM,
     ex: EX,
     containerWidth: WIDTH
   });

   //
   // Generate a JSON object with the CHTML output and needed CSS
   //
   console.log(JSON.stringify({
     math: adaptor.outerHTML(node),
     css: adaptor.cssText(chtml.styleSheet(html))
   }));

Here, lines 46 through 58 define a render action called
``removeLatex`` that occurs right after the conversion to MathML
(indicated by the ``STATE.CONVERT + 1``), and that performs the
tree-walking on :data:`math.root`, which is the internal MathML
representation of the expression.  Since we are only calling
:meth:`html.convert()` rather than rendering an entire page with
:meth:`html.render()`, we don't need to provide a document-level
function for this action, and so use ``() => {}`` for that.

.. _direct-text2chtml-promise:

Loading Font Ranges Dynamically
-------------------------------

In these past two examples, we used
:meth:`chtml.font.loadDynamciFiles()` to load all the font data, so
that dynamic loading would not need to occur during the conversion
process.  The font data in MathJax version 4 is much more extensive
than in v3, due to the more expansive character coverage of the v4
fonts, so loading *all* the data can be time-consuming, especially
when most of the data will never be used.

Instead, we can let MathJax load the data as needed.  Because loading
the data is asynchronous, this requires that we handle the
asynchronous nature of those file loads during the conversion process.
This is done via the :js:func:`mathDocument.convertPromise()`
function, which returns a promise that is resolved when the conversion
process completes, after handlign any asynchronous font file loading.
The example below shows how to accomplish that.

.. code-block:: javascript
   :linenos:
   :emphasize-lines: 37, 50, 55, 63
   :caption: tex2chtml-promise.mjs

   //
   //  Load the modules needed for MathJax
   //
   import {mathjax} from '@mathjax/src/js/mathjax.js';
   import {TeX} from '@mathjax/src/js/input/tex.js';
   import {CHTML} from '@mathjax/src/js/output/chtml.js';
   import {liteAdaptor} from '@mathjax/src/js/adaptors/liteAdaptor.js';
   import {RegisterHTMLHandler} from '@mathjax/src/js/handlers/html.js';
   import '@mathjax/src/js/util/asyncLoad/esm.js';

   //
   // Import the needed TeX packages
   //
   import '@mathjax/src/js/input/tex/base/BaseConfiguration.js';
   import '@mathjax/src/js/input/tex/ams/AmsConfiguration.js';
   import '@mathjax/src/js/input/tex/newcommand/NewcommandConfiguration.js';
   import '@mathjax/src/js/input/tex/noundefined/NoundefinedConfiguration.js';

   //
   // The em and ex sizes and container width to use during the conversion
   //
   const EM = 16;          // size of an em in pixels
   const EX = 8;           // size of an ex in pixels
   const WIDTH = 80 * EM;  // width of container for linebreaking

   //
   //  Create DOM adaptor and register it for HTML documents
   //
   const adaptor = liteAdaptor({fontSize: EM});
   RegisterHTMLHandler(adaptor);

   //
   // Create input and output jax and a (blank) document using them
   //
   const tex = new TeX({
     packages: ['base', 'ams', 'newcommand', 'noundefined'],
     formatError(jax, err) {throw err},
   });
   const chtml = new CHTML({
     fontURL: 'https://cdn.jsdelivr.net/npm/@mathjax/mathjax-newcm-font/chtml/woff2',
   });
   const html = mathjax.document('', {
     InputJax: tex,
     OutputJax: chtml,
   });

   //
   // Typeset the math from the command line
   //
   html.convertPromise(process.argv[2] || '', {
     display: true,
     em: EM,
     ex: EX,
     containerWidth: WIDTH
   }).then((node) => {
     //
     // Generate a JSON object with the CHTML output and needed CSS
     //
     console.log(JSON.stringify({
       math: adaptor.outerHTML(node),
       css: adaptor.cssText(chtml.styleSheet(html))
     }));
   }).catch((err) => console.error(err.message));

Here, we remove the :meth:`chtml.font.loadDynamicFiles()` call, and
replace :meth:`html.convert()` by :meth:`html.convertPromise()`, so
that if a font file needs to be loaded, that will be properly handled,
putting the rest of the code in its :meth:`then()` call.  Without
this, the :meth:`html.convert()` call could throw a :ref:`MathJax
retry <retry-error>` error; it is the :meth:`html.convertPromise()`
function that traps and processes those errors as part of the handling
of asynchronous file loads.

The other change is that the :meth:`formatError()` function now throws
the error it receives, which is then trapped by the :meth:`catch()`
call following the :meth:`html.convertPromise()` function and reported
there.  One could have used the original :meth:`formatError()`, but
this shows another approach to handling TeX errors.


.. _direct-tex2chtml-font:

Specifying The Font to Use
--------------------------

The examples so far, other than the first one, have all used the
default font, which is ``mathjax-newcm``, based on the New Computer
Modern font.  MathJax v4 provides a number of other fonts, however
(see the :ref:`font-support` section for details), and you can use any
of these to replace the default font.

In the example below, we use the ``mathjax-fira`` font, which is a
sans-serif font.  First, install the font using

.. code-block:: shell

   pnpm install @mathjax/mathjax-fira-font

(or use ``npm`` instead of ``pnpm``), and then modify the previous
example as indicated in the highlighted lines below.

.. code-block:: javascript
   :linenos:
   :emphasize-lines: 19-22, 45, 46
   :caption: tex2chtml-font.mjs

   //
   //  Load the modules needed for MathJax
   //
   import {mathjax} from '@mathjax/src/js/mathjax.js';
   import {TeX} from '@mathjax/src/js/input/tex.js';
   import {CHTML} from '@mathjax/src/js/output/chtml.js';
   import {liteAdaptor} from '@mathjax/src/js/adaptors/liteAdaptor.js';
   import {RegisterHTMLHandler} from '@mathjax/src/js/handlers/html.js';
   import '@mathjax/src/js/util/asyncLoad/esm.js';

   //
   // Import the needed TeX packages
   //
   import '@mathjax/src/js/input/tex/base/BaseConfiguration.js';
   import '@mathjax/src/js/input/tex/ams/AmsConfiguration.js';
   import '@mathjax/src/js/input/tex/newcommand/NewcommandConfiguration.js';
   import '@mathjax/src/js/input/tex/noundefined/NoundefinedConfiguration.js';

   //
   // Import the desired font
   //
   import {MathJaxFiraFont} from '@mathjax/mathjax-fira-font/js/chtml.js';

   //
   // The em and ex sizes and container width to use during the conversion
   //
   const EM = 16;          // size of an em in pixels
   const EX = 8;           // size of an ex in pixels
   const WIDTH = 80 * EM;  // width of container for linebreaking

   //
   //  Create DOM adaptor and register it for HTML documents
   //
   const adaptor = liteAdaptor({fontSize: EM});
   RegisterHTMLHandler(adaptor);

   //
   //  Create input and output jax and a (blank) document using them
   //
   const tex = new TeX({
     packages: ['base', 'ams', 'newcommand', 'noundefined'],
     formatError(jax, err) {throw err},
   });
   const chtml = new CHTML({
     fontData: MathJaxFiraFont,
     fontURL: 'https://cdn.jsdelivr.net/npm/@mathjax/mathjax-fira-font/chtml/woff2',
   });
   const html = mathjax.document('', {
     InputJax: tex,
     OutputJax: chtml,
   });

   //
   // Typeset the math from the command line
   //
   html.convertPromise(process.argv[2] || '', {
     display: true,
     em: EM,
     ex: EX,
     containerWidth: WIDTH
   }).then((node) => {
     //
     // Generate a JSON object with the CHTML output and needed CSS
     //
     console.log(JSON.stringify({
       math: adaptor.outerHTML(node),
       css: adaptor.cssText(chtml.styleSheet(html))
     }));
   }).catch((err) => console.error(err.message));

Here, line 22 imports the Fira font class, which is passed to the
CHTML output jax at line 45.  Line 46 now needs to point to the
``mathjax-fira-font`` directory on the CDN.

The earlier examples could be modified in a similar way, as well.

-----

.. _direct-tex2chtml-mixed:

Mixing Components and Direct Linking
====================================

One of the drawbacks to using direct loading of MathJax modules is
that you don't have the MathJax component framework to work with,
which means you can't use ``\require{}`` or autoloaded TeX components,
for example.  It is possible to use both together, however, by
importing the needed component definitions.  This is done in the
:ref:`node-preload` section to show how to handle synchronous
typesetting, but this technique also can be used more generally with
the promise-based commands, as illustrated in the example below.

.. code-block:: javascript
   :linenos:
   :emphasize-lines: 10-18, 20-28, 37-41, 54, 57, 58, 64
   :caption: tex2chtml-mixed.mjs

   //
   //  Load the modules needed for MathJax
   //
   import {mathjax} from '@mathjax/src/js/mathjax.js';
   import {TeX} from '@mathjax/src/js/input/tex.js';
   import {CHTML} from '@mathjax/src/js/output/chtml.js';
   import {liteAdaptor} from '@mathjax/src/js/adaptors/liteAdaptor.js';
   import {RegisterHTMLHandler} from '@mathjax/src/js/handlers/html.js';

   //
   // Load the component definitions
   //
   import {Loader} from '@mathjax/src/js/components/loader.js';
   import {Package} from '@mathjax/src/js/components/package.js';
   import '@mathjax/src/components/js/startup/init.js';
   import '@mathjax/src/components/js/core/lib/core.js';
   import '@mathjax/src/components/js/input/tex/tex.js';
   import '@mathjax/src/components/js/output/chtml/chtml.js';

   //
   // Record the pre-loaded component files
   //
   Loader.preLoaded(
     'loader', 'startup',
     'core',
     'input/tex',
     'output/chtml',
   );

   //
   // The em and ex sizes and container width to use during the conversion
   //
   const EM = 16;          // size of an em in pixels
   const EX = 8;           // size of an ex in pixels
   const WIDTH = 80 * EM;  // width of container for linebreaking

   //
   // Set up methods for loading dynamic files
   //
   MathJax.config.loader.require = (file) => import(file);
   mathjax.asyncLoad = (file) => import(Package.resolvePath(file));

   //
   //  Create DOM adaptor and register it for HTML documents
   //
   const adaptor = liteAdaptor({fontSize: EM});
   RegisterHTMLHandler(adaptor);

   //
   // Create input and output jax and a (blank) document using them
   //
   const tex = new TeX({
     formatError(jax, err) {throw err},
     ...(MathJax.config.tex || {})
   });
   const chtml = new CHTML({
     ...(MathJax.config.output || {}),
     ...(MathJax.config.chtml || {}),
     fontURL: 'https://cdn.jsdelivr.net/npm/@mathjax/mathjax-newcm-font/chtml/woff2',
   });
   const html = mathjax.document('', {
     InputJax: tex,
     OutputJax: chtml,
     ...(MathJax.config.options || {})
   });

   //
   // Typeset the math from the command line
   //
   html.convertPromise(process.argv[2] || '', {
     display: true,
     em: EM,
     ex: EX,
     containerWidth: WIDTH
   }).then((node) => {
     //
     // Generate a JSON object with the CHTML output and needed CSS
     //
     console.log(JSON.stringify({
       math: adaptor.outerHTML(node),
       css: adaptor.cssText(chtml.styleSheet(html))
     }));
   }).catch((err) => console.error(err.message));

Here, lines 10 through 18 load the component framework and definition
files.  The first two lines obtain the :js:class:`Loader` and
:js:class:`Package` class definitions, which are the heart of the
component framework.  The next line initializes the
:ref:`startup-component` component, which sets up some of the needed
component configuration.  The next line loads the core component
definition, and the final two lines load the input and output jax
component definitions for the ones we will be using.

Lines 20 through 28 register the pre-loaded components with the loader
so that it won't try to load them again.

Lines 37 through 41 define the methods needed for dynamic loading of
files.  The first tells MathJax to use ``import()`` to load files, and
the second tells MathJax to use ``Package.resolvePath()`` to process
file names before importing them.  That allows references like
``[tex]/cancel`` or ``[mathjax-fira]/chtml/dynamic/calligraphic`` to
be resolved to their full URLs before they are loaded.

Lines 54, 57, 58, and 64 incorporate the appropriate MathJax
configuration blocks into the options used for creating the input and
output jax and the math document.  The component files initialize some
of these values, and if the :file:`tex2chtml-mixed.mjs` file is
imported into another application, that would allow that application
to provide its own :js:data:`MathJax` configuration object, just like
in a web page, and its configuration would be incorporated into the
creation of the MathJax objects here.

Note that the ``import`` commands that loaded the TeX packages
(`base`, `ams`, `newcommand`, and `noundefined`) have been removed, as
the ``input/tex`` component loads those (and several others) itself.
Note also that the :js:data:`packages` array has been removed, as the
``input/tex`` component defines that itself, and already includes the
packages that it loads.

With these changes, the LaTeX being processed can now use
``\require``, and macros that autoload extensions will work as well.
So this gives you the best of both worlds: the convenience of MathJax
components, and the control of direct imports.

If you want to preload additional TeX packages, you can import them
and then push their names onto the :js:data:`tex.packages` array prior
to instantiating the TeX input jax.  For example

.. code-block:: javascript

   import '@mathjax/src/components/js/input/tex/extensions/mathtools/mathtools.js';
   import '@mathjax/src/components/js/input/tex/extensions/physics/physics.js';
   MathJax.config.tex.packages.push('mathtools', 'physics');
   Loader.preLoaded('[tex]/mathtools', '[tex]/physics');
   
could be added at line 19 in order to include the :ref:`tex-mathtools`
and :ref:`tex-physics` TeX packages.

-----

.. _direct-tex2speech:

Generating Speech Strings without Typesetting
=============================================

One of MathJax's most important features is the ability to generate
speech strings from mathematical notation.  MathJax uses the `Speech
Rule Engine <https://github.com/zorkow/speech-rule-engine>`_ (SRE) to
perform this function.

The example below is based on the :ref:`direct-tex2mml` code described
above, with the changes highlighted.

.. code-block:: javascript
   :linenos:
   :emphasize-lines: 11-15, 73-77, 79-82
   :caption: tex2speech.mjs

   //
   //  Load the modules needed for MathJax
   //
   import {mathjax} from '@mathjax/src/js/mathjax.js';
   import {TeX} from '@mathjax/src/js/input/tex.js';
   import {liteAdaptor} from '@mathjax/src/js/adaptors/liteAdaptor.js';
   import {RegisterHTMLHandler} from '@mathjax/src/js/handlers/html.js';
   import {SerializedMmlVisitor} from '@mathjax/src/js/core/MmlTree/SerializedMmlVisitor.js';
   import {STATE} from '@mathjax/src/js/core/MathItem.js';

   //
   // Import the speech-rule-engine
   //
   import '@mathjax/src/components/require.mjs';
   import {setupEngine, engineReady, toSpeech} from 'speech-rule-engine/js/common/system.js';

   //
   // Import the needed TeX packages
   //
   import '@mathjax/src/js/input/tex/base/BaseConfiguration.js';
   import '@mathjax/src/js/input/tex/ams/AmsConfiguration.js';
   import '@mathjax/src/js/input/tex/newcommand/NewcommandConfiguration.js';
   import '@mathjax/src/js/input/tex/noundefined/NoundefinedConfiguration.js';

   //
   // The em and ex sizes and container width to use during the conversion
   //
   const EM = 16;          // size of an em in pixels
   const EX = 8;           // size of an ex in pixels
   const WIDTH = 80 * EM;  // width of container for linebreaking

   //
   // Create DOM adaptor and register it for HTML documents
   //
   const adaptor = liteAdaptor({fontSize: EM});
   RegisterHTMLHandler(adaptor);

   //
   // Create input jax and a (blank) document using it
   //
   const tex = new TeX({
     packages: ['base', 'ams', 'newcommand', 'noundefined'],
     formatError(jax, err) {console.error(err.message); process.exit(1)},
     //
     // Other TeX configuration goes here
     //
   });
   const html = mathjax.document('', {
     InputJax: tex,
     //
     // Other document options go here
     //
   });

   //
   //  Create a MathML serializer
   //
   const visitor = new SerializedMmlVisitor();
   const toMathML = (node => visitor.visitTree(node, html));

   //
   // Convert the math from the command line
   //
   const mml = html.convert(process.argv[2] || '', {
     display: true,
     em: EM,
     ex: EX,
     containerWidth: WIDTH,
     end: STATE.CONVERT         // stop after conversion to MathML
   });

   //
   // Set up the speech engine to use English
   //
   const locale = process.argv[3] || 'en';
   const modality = locale === 'nemeth' || locale === 'euro' ? 'braille' : 'speech';
   await setupEngine({locale, modality}).then(() => engineReady());

   //
   // Produce the speech for the converted MathML
   //
   console.log(toSpeech(toMathML(mml)));

Here, line 15 loads the functions needed for speech generation.
Because SRE uses ``require()`` to load its dependencies when used from
node, line 14 makes that available before loading SRE.

Line 75 gets the locale (i.e., the language) to use for the speech,
and line 76 determines whether we are generating speech or Braille
strings.  Line 77 sets up SRE for the proper locale and modality, and
waits for the needed files to be loaded.

Finally, line 82 uses the :func:`toSpeech()` function from SRE to
convert the MathML generated from the TeX into the needed speech or
Braille string.

When this node application is run from the command line, the first
command line argument is the LaTeX string to convert, while the output
is the corresponding speech string.  For example,

.. code-block:: shell

   node tex2speech.mjs '\frac{a}{b}'

would generate the phrase

.. code-block::

   StartFraction a Over b EndFraction

SRE can generate speech in several languages; here, the default
language is English, but the second command-line argument can be used
to specify a different language locale.  For example,

.. code-block:: shell

   node tex2speech.mjs '\frac{a}{b}' de

would generate the German phrase

.. code-block::

   Anfang Bruch a durch b Ende Bruch

while

.. code-block:: shell

   node tex2speech.mjs '\frac{a}{b}' nemeth

would generate the Braille code

.. code-block::

   ⠹⠁⠌⠃⠼

The available locales can be found in the :file:`bundle/sre/mathmaps`
directory.

There are several different speech rulesets that SRE can use,
including `clearspeak`, `mathspeak`, and `chromvox` rules.  You can
add a :data:`domain` option to the list passed to
:func:`setupEngine()` in order to specify which of these rulesets to
use.  The default is `mathspeak`.


-----

.. _direct-tex2svg-page:

Pre-processing a Complete Page
==============================

All of the previous examples convert a single mathematical expression
at a time, but you may wish to preprocess an entire web page, rather
than individual expressions.  In that case, you would load the page's
text and use that when creating the math document, and then call
:meth:`html.renderPromise()` rather than :meth:`html.convertPromise()`.

This is illustrated with the example below, this time using SVG output
rather than CHTML output.

.. code-block:: javascript
   :linenos:
   :emphasize-lines: 1, 8, 32-36, 43, 48-54, 57, 63-66, 68-75, 77-81
   :caption: tex2svg-page.mjs

   import fs from 'fs';

   //
   //  Load the modules needed for MathJax
   //
   import {mathjax} from '@mathjax/src/js/mathjax.js';
   import {TeX} from '@mathjax/src/js/input/tex.js';
   import {SVG} from '@mathjax/src/js/output/svg.js';
   import {liteAdaptor} from '@mathjax/src/js/adaptors/liteAdaptor.js';
   import {RegisterHTMLHandler} from '@mathjax/src/js/handlers/html.js';
   import '@mathjax/src/js/util/asyncLoad/esm.js';

   //
   // Import the needed TeX packages
   //
   import '@mathjax/src/js/input/tex/base/BaseConfiguration.js';
   import '@mathjax/src/js/input/tex/ams/AmsConfiguration.js';
   import '@mathjax/src/js/input/tex/newcommand/NewcommandConfiguration.js';
   import '@mathjax/src/js/input/tex/noundefined/NoundefinedConfiguration.js';

   //
   // The em and ex sizes to use during the conversion
   //
   const EM = 16;          // size of an em in pixels
   const EX = 8;           // size of an ex in pixels

   //
   //  Create DOM adaptor and register it for HTML documents
   //
   const adaptor = liteAdaptor({fontSize: EM});
   RegisterHTMLHandler(adaptor);

   //
   //  Read the HTML file
   //
   const htmlfile = fs.readFileSync(process.argv[2] || 0, 'utf8');

   //
   //  Create input and output jax and a document using them on the HTML file
   //
   const tex = new TeX({
     packages: ['base', 'ams', 'newcommand', 'noundefined'],
     formatError(jax, err) {console.error(err.message); return jax.formatError(err)},
     //
     // Other TeX configuration goes here
     //
   });
   const svg = new SVG({
     fontCache: 'global',
     exFactor: EX / EM,
     //
     // Any output options go here
     //
   });
   const html = mathjax.document(htmlfile, {
     InputJax: tex,
     OutputJax: svg,
     //
     // Other document options go here
     //
   });

   //
   // Wait for the typesetting to finish
   //
   await html.renderPromise();

   //
   // If no math was found on the page, remove the stylesheet and font cache (if any)
   //
   if (Array.from(html.math).length === 0) {
     adaptor.remove(svg.svgStyles);
     const cache = adaptor.elementById(adaptor.body(html.document), 'MJX-SVG-global-cache');
     if (cache) adaptor.remove(cache);
   }

   //
   // Output the resulting HTML
   //
   console.log(adaptor.doctype(html.document));
   console.log(adaptor.outerHTML(adaptor.root(html.document)));

Here, line 1 loads the node ``fs`` library that is used in line 36 to
read the HTML file that is to be processed (either the one given as
the first command-line argument, or from standard input when the
script is run as a filter).

Line 8 loads the SVG output jax rather than the CHTML one, and lines
48 through 54 instantiate the output jax.  We set the
:data:`fontCache` to ``global`` so that all the SVG path data will be
stored in one place and can be shared among all the expressions on the
page rather than having individual copies for each expression.  We
also set up the ex-to-em factor, since we can't measure that directory
using the LiteDOM in node.  Line 57 uses the SVG output jax that we
just created rather than the CHTML one from previous examples.

Line 66 is the key change from the previous examples, which now uses
:meth:`html.renderPromise()` to process the entire page, rather than
just process a single expression.  We use the promise-based function
so that we handle any font data files that need to be loaded.

Lines 72 to 75 check to see that there is actually math that was
processed on the page, and if not, it removes the stylesheet and
font-cache ``<svg>`` element that it added to the page, leaving the
page essentially untouched.

Lines 80 and 81 produce the final output for the pre-processed page.

Finally, the :func:`formatError()` function on line 43 now logs the
error and then calls the default :meth:`formatError()` function, so
that the error will appear within the final HTML document as it would
in a web page.

Note that when pre-processing a page, there are a number of limitations:

* All the expressions will use the same ex-to-em factor, since MathJax
  can't measure the font metrics of the surrounding font in node.

* The handling of characters that are not in the MathJax fonts will be
  problematic, as MathJax can't measure their sizes, so will have to
  make assumptions that probably aren't right.  The output will try to
  use a fixed-width font in order to try to reduce its error, but that
  can produce ugly results.  Fortunately, the fonts in MathJax v4 have
  much greater coverage than in v3, so the problem should occur much
  less often.

* The menu code relies on MathJax actually being active in the page,
  and when the page is pre-processed in this way, that will not be the
  case.  So the menu is not available in pre-processed pages.  That
  means your readers won't be able to view or copy the math notation,
  change the renderer, or use any of the other features available in
  the MathJax contextual menu.

* The expression explorer also relies on MathJax being present, and so
  that feature will not be available in pre-processed pages.  You may
  wish to include the `assistive-mml` extension in order to help
  support users who require screen readers, as described below.
  
* Finally, since MathJax doesn't know the size of the screen that your
  user will be using when viewing your page, it is not able to do
  automatic line breaking of displayed equations, unless you configure
  the line-breaking width explicitly.  In-line breaks will still be
  possible, since they are determined by the browser at run time.

To include the `assistive-mml` extension, add the following ``import``
command

.. code-block:: javascript

   import {AssistiveMmlHandler} from '@mathjax/src/js/a11y/assistive-mml.js';

and change line 31 to be

.. code-block:: javascript

   AssistiveHandler(RegisterHTMLHandler(adaptor));

That will cause MathJax to include visually hidden MathML that can be
read by screen readers.


-----

More Examples
=============

See the `MathJax node demos
<https://github.com/mathjax/MathJax-demos-node#MathJax-demos-node>`__
for additional examples of how to use MathJax from a `node`
application.  In particular, see the `non-component-based examples
<https://github.com/mathjax/MathJax-demos-node/tree/master/direct#non-component-based-examples>`__
for more illustrations of how to use MathJax modules directly in a
`node` application, rather than using the pre-packaged components.


|-----|
