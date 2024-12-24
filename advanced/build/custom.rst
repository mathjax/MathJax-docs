
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
   import {Sre} from '@mathjax/src/js/a11y/sre.js';                           // Speech generation
   import {browserAdaptor} from '@mathjax/src/js/adaptors/browserAdaptor.js'; // browser DOM
   import {RegisterHTMLHandler} from '@mathjax/src/js/handlers/html.js';      // the HTML handler
   import {STATE} from '@mathjax/src/js/core/MathItem.js';                    // the various states
   import {SerializedMmlVisitor} from '@mathjax/src/js/core/MmlTree/SerializedMmlVisitor.js';

   //
   //  Load the needed TeX extensions
   //
   import '@mathjax/src/js/input/tex/ams/AmsConfiguration.js';
   import '@mathjax/src/js/input/tex/newcommand/NewcommandConfiguration.js';
   import '@mathjax/src/js/input/tex/configmacros/ConfigMacrosConfiguration.js';

   //
   //  Register the HTML handler with the browser adaptor
   //
   RegisterHTMLHandler(browserAdaptor());

   //
   //  Initialize mathjax with a blank DOM.
   //
   const html = mathjax.document('', {
     InputJax: new TeX({
       packages: ['base', 'ams', 'newcommand', 'configmacros']
     })
   });

   //
   //  The visitor to produce serialized MathML
   //
   const visitor = new SerializedMmlVisitor();

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
     Sre: Sre,

     //
     //  A function to serialize the internal MathML format
     //
     toMML(node) {
       return visitor.visitTree(node, this.html);
     },

     //
     //  A function to convert TeX/LaTeX to a speech string
     //
     tex2speech(tex, display = true) {
       return this.Sre.sreReady().then(() => {
         return mathjax.handleRetriesFor(() => 
           this.toMML(html.convert(tex, {format: 'TeX', end: STATE.COMPILED, display}))
         )
       }).then((mml) => this.Sre.toSpeech(mml));
     }
   };

   //
   // Setup SRE's engine
   //
   Sre.setupEngine({domain: 'clearspeak', ...(CONFIG.sre || {})});

   //
   // Perform ready function, if there is one
   //
   if (CONFIG.ready) {
     Sre.sreReady().then(CONFIG.ready);
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

   and similarly for the other ``import`` commands.  Note that the
   MathJax ``package.json`` file is set up to route
   ``@mathjax/src/js`` to the MathJax ``mjs`` directory when used in
   an ``import`` command, and to the ``cjs`` directory when used in a
   ``require()`` statement, so you can use the same path in either
   case.  Similarly ``@mathjax/src/components/js`` maps either to the
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
called automatically by the commands in the following section.


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


Configuring the Speech Generation
---------------------------------

The speech-generation software can produce strings in a variety of
languages, or in Braille notation, and this custom build of MathJax
allows you to specify which language to use, or set other parameters
of the speech-rule engine (SRE).  This is done by setting the
:js:data:`MathJax` variable to a configuration that includes an ``sre`` block
with the properties you want to customize.  For example:

.. code-block:: javascript

   MathJax = {
     sre: {
       locale: 'fr'
     }
   }

would tell the SRE to produce speech strings in the French language
rather than English.

The complete list of options for the ``sre`` block can be found in the
`Speech-Rule Engine documentation
<https://github.com/Speech-Rule-Engine/speech-rule-engine?tab=readme-ov-file#options>`__.

Here is a complete page that converts a math expression into Nemeth
Beaille.

.. code-block:: html

   <!DOCTYPE html>
   <html>
   <head>
   <meta charset="UTF-8" />
   <meta content="width=device-width, initial-scale=1" name="viewport" />
   <title>Use mathjax-speech to generate Braille</title>
   <script>
     MathJax = {
       sre: {
         modality: 'braille',
         locale: 'nemeth'
       }
     }
   </script>
   <script src="mathjax-speech.min.js" defer></script>
   <script type="module">
     console.log(await MathJax.tex2speech('\\sqrt{x^2+1}', true));
   </script>
   </head>
   <body>

Of course, you could create a more sophisticated version that takes an
expression typed by a user and processes that using
:meth:`MathJax.tex2speech()`, then displays the result in the web
page.  That is left as an exercise for the interested reader.


Performing Actions at Startup
-----------------------------

If you load ``mathjax-speech.min.js`` with the ``defer`` attribute,
then your own code would need to wait for ``mathjax-speech.js`` to
load before it can call :meth:`MathJax.tex2speech()`.  One way to do
that is to use a script with ``type="module"`` that follows the script
that loads ``mathjax-speech.js``, as is done in the example above.

Another way is to use the :meth:`ready()` function in the
:js:data:`Mathjax`, which will be run after the MathJax file has been
loaded, and SRE has been initialized.  For example

.. code-block:: javascript

   MathJax = {
     ready() {
       MathJax.tex2speech('\\sqrt{x^2+1}').then((speech) => console.log(speech));
     }
   }

could be used to perform the speech conversion after everything is ready.

|-----|
