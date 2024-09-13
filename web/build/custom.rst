
.. _custom-build:

A Custom MathJax Build
======================

It is possible to make a completely custom build of MathJax that is
not based on other MathJax components at all.  The following example
shows how to make a custom build that provides a function for
obtaining the speech string for a given TeX math string.  This example
is similar to one in the `MathJax web demos
<https://github.com/mathjax/MathJax-demos-web/blob/master/custom-build/custom-mathjax.html.md>`__
repository.

After downloading a copy of MathJax as described in the section on
:ref:`getting-ready`, create a directory called ``mathjax-speech`` and
``cd`` into it.

-----

The Custom Build File
---------------------

Create the custom MathJax file named ``mathjax-speech.js`` containing
the following:

.. code-block:: javascript

   //
   //  Load the desired components
   //
   import {mathjax} from '@mathjax/src/js/mathjax.js';                        // MathJax core
   import {TeX} from '@mathjax/src/js/input/tex.js';                          // TeX input
   import {MathML} from '@mathjax/src/js/input/mathml.js';                    // MathML input
   import {browserAdaptor} from '@mathjax/src/js/adaptors/browserAdaptor.js'; // browser DOM
   import {EnrichHandler} from '@mathjax/src/js/a11y/semantic-enrich.js';     // semantic enrichment
   import {RegisterHTMLHandler} from '@mathjax/src/js/handlers/html.js';      // the HTML handler
   import {STATE} from '@mathjax/src/js/core/MathItem.js';                    // the various states
   import {sreReady} from '@mathjax/src/js/a11y/sre.js';                      // Speech generation

   //
   //  Load the needed TeX extensions
   //
   import '@mathjax/src/js/input/tex/ams/AmsConfiguration.js';
   import '@mathjax/src/js/input/tex/newcommand/NewcommandConfiguration.js';
   import '@mathjax/src/js/input/tex/configmacros/ConfigMacrosConfiguration.js';

   //
   //  Register the HTML handler with the browser adaptor and add the semantic enrichment
   //
   EnrichHandler(RegisterHTMLHandler(browserAdaptor()), new MathML());

   //
   //  Initialize mathjax with a blank DOM.
   //
   const html = mathjax.document('', {
     sre: {
       speech: 'shallow', // add speech to the enriched MathML
     },
     InputJax: new TeX({
       packages: ['base', 'ams', 'newcommand', 'configmacros']
     })
   });

   //
   //  The user's configuration object
   //
   const CONFIG = window.MathJax || {};

   //
   //  The global MathJax object
   //
   window.MathJax = {
     version: mathjax.version,
     html: html,
     sreReady: sreReady,

     tex2speech(tex, display = true) {
       const math = new html.options.MathItem(tex, html.inputJax[0], display);
       return mathjax.handleRetriesFor(() => math.convert(html, STATE.ENRICHED)).then(() => {
         let speech = '';
         math.root.walkTree(node => {
           if (speech) return;
           const attributes = node.attributes.getAllAttributes();
           if (attributes['data-semantic-speech'] && !attributes['data-semantic-parent']) {
             speech = attributes['data-semantic-speech'];
           }
         });
         return speech;
       });
     }
   };

   //
   // Perform ready function, if there is one
   //
   if (CONFIG.ready) {
     sreReady().then(CONFIG.ready);
   }

Unlike the component-based example in the :ref:`custom-component`
section, this custom build calls on the MathJax source files directly.
The ``import`` commands at the beginning of the file load the needed
objects, and the rest of the code instructs MathJax to create a
``MathDocument`` object for handling the conversions that we will be
doing (using a TeX input jax), and then defines a global ``MathJax``
object that has the :meth:`tex2speech()` function that our custom
build offers.

.. note::

   This file uses ES6 ``import`` commands to load the MathJax modules.
   It is possible to use ES5 ``require()`` calls instead, if you wish.
   For example,

   .. code-block:: javascript

      import {mathjax} from '@mathjax/src/js/mathjax.js';

   could be replaced by

   .. code-block:: javascript

      const {mathjax} = require('@mathjax/src/js/mathjax.js');

   and similary for the other ``import`` commands.  Note that the
   MathJax ``package.json`` file is set up to route
   ``@mathjax/src/js`` to the MathJax ``mjs`` directory when used in
   an ``import`` command, and to the ``cjs`` directory when used in a
   ``require()`` statement, so you can use the same path in either
   case.  Similarly ``@mathjax/src/components/src`` maps either to the
   ``components/mjs`` or ``components/cjs`` directory based on whether
   ``import`` or ``require()`` is used.


The Custom Configuration File
-----------------------------

Next, create a file ``config.json`` that includes the
following:

.. code-block:: json

   {
     "webpack": {
       "name": "mathjax-speech",
       "dist": "."
     }
   }

This file gives the name that will be used for this component
(``mathjax-speech`` in this case), and the directory where we want the
final packaged build to go.  (``"."`` means the directory containing
the ``config.json`` file).  When the directory is the same as the one
containing the control file, the packed build file will end in
``.min.js`` rather than just ``.js``.

Most of the real work is done by the
``@mathjax/src/components/webpack.config.mjs`` file, which will be
called automatically by the commands in teh following section.


Building the Custom File
------------------------

Once these two files are ready, you are ready to make your custom
build.  First, make sure that you have obtained the needed tools as
described in :ref:`getting-ready` above.  Then you should be able to
use the command

.. code-block:: shell

   node ../node_modules/@mathjax/src/components/bin/makeAll

to process your custom build.

.. note::

   If you have changed the ``import`` commands to ``require()``, then
   you will need to use the command

   .. code-block:: shell

      node ../node_modules/@mathjax/src/components/bin/makeAll --cjs

   in order to tell ``makeAll`` to use MathJax's
   ``webpack.config.cjs`` file rather than the ``webpack.config.mjs``
   one.

You should end up with a file ``mathjax-speech.min.js`` in the
directory with the other files.  it will contain just the parts of
MathJax that are needed to implement the :meth:`MathJax.tex2speech()`
command defined in the file above.  Note that this is not enough to do
normal typesetting (for example, no output jax has been included), so
this is a minimal file for producing the speech strings from TeX
input.


Using the File in a Web Page
----------------------------

If you put the ``mathjax-speech.min.js`` file on your web server, you
can load it into your web pages in place of loading MathJax from a
CDN.  This file will include all that you need to use the
:meth:`MathJax.tex2speech()` command in your pages, provided they
don't need any additional TeX extensions.

.. note::

   If you do need additional extensions, you can add them into the
   ``mathjax-speech.js`` file above.  Add ``import`` commands for the
   extensions you need, and add them into the ``packages`` list in the
   ``new TeX()`` command.  Note that you can not use ``\require`` or
   autoload any extensions in this setup, since this is not a
   component-based implementation (it doesn't have the ``loader`` and
   ``startup`` modules needed for that), so every extension you plan
   to use must be loaded in advance.

To load your custom MathJax build, just add

.. code-block:: html

   <script defer src="mathjax-speech.min.js"></script>

to your page (adjust the URL to point to wherever you have placed the
``mathjax-speech.min.js`` file).  Then you can use javascript calls
like

.. code-block:: javascript

   const speech = await MathJax.tex2speech('\\sqrt{x^2+1}', true);

to obtain a text string that contains the speech text for the square
root given in the TeX string.

Alternatively, you can use the :meth:`then()` and :meth:`catch()`
methods of the promise that is returned by
:js:meth:`MathJax.tex2speech()`, as in

.. code-block:: javascript

   MathJax.tex2speech('\\sqrt{x^2+1}', true).then(
     (speech) => console.log(speech);
   }).catch((err) => console.error(err));

to produce and handle the speech.

|-----|
