.. _v4-breaking-changes:

======================
Breaking Changes in V4
======================

A number of breaking changes have already been mentioned elsewhere:

* :ref:`v4-scoped-packages` discusses the change to scoped npm
  packages, and in particular, moving from ``mathjax-full`` to
  ``@mathjax/src``.
* :ref:`v4-promises` discusses the greater need to use promises in v4.
* :ref:`v4-es6-modules` discusses the changes to the directory
  structure and the removal of the ``/es5`` from the URLs used to
  obtain MathJax from a CDN.
* :ref:`v4-tex-improvements` discusses some potentially breaking
  changes for some pages, including the fact that the the
  :ref:`tex-textmacros` extension is now included in all combined
  components, the update to the :ref:`tex-mathtools` extension to
  include the changes in the corresponding LaTeX package from 2022 and
  2024, and the change from :data:`digits` to :data:`numberPattern`
  for configuring the pattern used to identify a number in TeX input.

In addition to those, there are a number of other potentially breaking
changes, as described below.


.. _v4-all-packages:

Removal of AllPackages
======================

The ``AllPackages.ts`` file and the ``all-packages`` extension were
intended as a means of loading most of the TeX extensions up front so
that you did not need to worry about asynchronous loading of
extensions via the ``autoload`` package.  But now that MathJax's
output is also asynchronous, using ``AllPackages`` is no longer
sufficient to allow for synchronous processing.  As more extensions
have been created, they have not all been added to ``AllPackages.ts``,
and as the library of extensions, both core and third-party, grows, it
is impractical to keep all of them in one package.  So in this
release, these files have been removed.  For those employing MathJax
in node applications, you can use

.. code-block:: js
                
   import {source} from '@mathjax/src/components/js/source.js';
   const AllPackages = Object.keys(source).filter((name) => name.substring(0,6) === '[tex]/').sort();

to get a list of the main TeX packages.  For use on the web, you could use

.. code-block:: html

   <script type="importmap">
   {
     "imports": {
       "#source/source.cjs": "https://cdn.jsdelivr.net/npm/@mathjax/src@4/components/mjs/source-lab.js"
     }
   }
   </script>
   <script type="module">
   import {source} from 'https://cdn.jsdelivr.net/npm/@mathjax/src@4/components/mjs/source.js';
   const load = Object.keys(source).filter((name) => name.substring(0,6) === '[tex]/').sort();
   const packages = ['base'].concat(load.map((name) => name.substring(6)));
   window.MathJax = {
     loader: {load},
     tex: {packages}
   };
   </script>

to load all the extensions.  Add any other configuration options that
you need to the :data:`window.MathJax` variable.


.. _v4-breaking-speech:

Changes for Speech Generation
=============================

The :ref:`v4-api-changes` section describes the separation of the
semantic enrichment from the speech generation and the introduction of
a new `speech` component.  Because the speech is now generated within
a web worker or node worker thread, the speech-generation code is no
longer in the main MathJax components, but is in a separate file that
is run in the worker.  That means there is no more access to speech
generation directly within MathJax (it is only available in the
worker).  In particular, the ``ts/a11y/sre.ts`` file now only includes
the semantic-enrichment methods of the speech-rule engine, and
:js:meth:`Sre.toSpeech()` is no longer available.  In a node
application, you can load this function directly from the
speech-rule-engine's API, however.  Here is an example command-line
script that takes a TeX expression and returns its speech string using
this approach:

.. code-block:: js

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
   import '@mathjax/src/js/input/tex/noundefined/NoUndefinedConfiguration.js';

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

With the speech generation being performed in a worker, the process is
now inherently asynchronous, as the communication between the main
thread and the worker thread is mediated by promises.  That means that
speech generation can't be done synchronously, and you must use the
promise-based functions for handling typeset and conversion operations
that involve speech, unless you use a technique like the one above.

The speech-generation process now applies the speech attributes to the
DOM nodes themselves, rather than to the internal MathML structure (as
was done in v3), so serialized versions of the internal MathML will
not include the speech as they did in the past.


.. _v4-breaking-names:

Object and Type Name Changes
============================

Some name changes have occurred within the code to help clarify the
purpose of some objects or methods.  In particular, the
:js:meth:`Loader.preLoad()` method has been renamed
:js:meth:`Loader.preLoaded()` in order to make it clear that this does
not itself load the given components, but that your code has done that
and you are telling MathJax that they have already been loaded.

Another change involves the objects used to handle CSS styles.
MathJax has two object classes that deal with CSS definitions, one
that specifies CSS styles via object literals (essentially JSON
structures), and one that parses a CSS string into an object structure
that acts like a DOM element's :attr:`style` attribute.  Moreover both
modules declared a :data:`StyleList` type, and these were not
compatible.  That both caused confusion and complicated their use
together in the same module, so the names for these types and objects
have been changed in this release in order to make it clearer which is
which.

To accomplish this, the ``ts/util/CssStyles.js`` file was renamed to
``ts/util/StyleJson.js``, and with that, :data:`StyleList` is changed
to :data:`StyleJson`, :data:`StyleData` to :data:`StyleJsonData`, and
:data:`CssStyles` to :data:`StyleJsonSheet`.  This more accurately
describes what this object does (it is the one that takes JSON data),
and what the objects represent, while the ``ts/util/Style.ts`` file
implements (a subset of) the DOM object :attr:`style` attribute.

The move to ESM modules and compiling to ES6 rather than ES5 lead to
an issue with the webpacked versions of some component files that
would cause errors when they are loaded.  The source of the problem
was due to the use of a custom :data:`Symbol` class in MathJax's TeX
input jax that conflicts with the native javascript :data:`Symbol`
object.  This was not an issue in previous versions of MathJax, but
due to differences between how webpack handles CommonJS and ESM
modules, it caused problems with some TeX extension packages that use
the :data:`Symbol` class.  This has lead us to rename the custom
:data:`Symbol` class to :data:`Token`, and rename the ``Symbol.ts``
and ``SymbolMap.ts`` files to ``Token.ts`` and ``TokenMap.ts``.  This
is a potential breaking change to those who have created their own TeX
extension packages that load one of these files.

The names of a number of internal objects have been normalized to be
Pascal case (like camel case, but with an initial upper-case letter).
For example, the internal MathML items like ``CHTMLmath`` have been
renamed as ``ChtmlMath``.  Such changes would only affect those
writing their own extensions, but for those who do, you may need to
adjust the names of classes like this.

Finally, the ``latest.js`` file has been removed, as ``jsdelivr.net``
and other CDNs handle providing the latest version automatically, and
with more granularity than this file did.

|-----|
