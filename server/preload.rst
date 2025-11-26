.. _node-preload:

##############################
Using Components Synchronously
##############################

MathJax components are designed to operate in a browser environment,
where loading components is inherently asynchronous as the browser has
to wait for files to be downloaded over the network.  This means that
using MathJax's promise-based typesetting and conversion functions is
generally required, and so the rest of your code needs to be designed
to handle the promises that are part of MathJax.  That can complicate
your code, and your work with other frameworks may require you to
operate synchronously.

In a `node` application, you can load components individually yourself
via node's ``import`` or ``require()`` commands, rather than relying
on MathJax's :ref:`loader-component`, which operates asynchronously.
With a little care, this can give you the ability to work with MathJax
synchronously (i.e., without the need to use promises).  It also gives
you more complete control over the loading of components, though in
this case you do need to handle loading dependencies yourself, and
make sure the components are loaded in the right order.

This approach lets you take advantage of using the convenient
packaging of MathJax into individual components, the configuration of
MathJax through the global :js:data:`MathJax` variable, and its automatic
creation of objects and methods by the :ref:`startup-component`
component, while still allowing you to work completely synchronously
with the MathJax code.

Note, however, that this means you will not be able to use the
``\require`` macro in TeX expressions, and that TeX extensions will
not be able to be auto-loaded, as those actions are asynchronous.

.. warning::

   In MathJax v4, with the introduction of new fonts that include many
   more characters than the original MathJax TeX fonts did, the fonts
   have been broken into smaller pieces so that your readers don't
   have to download the entire font and its data for characters that
   may never be used.  That means that typesetting mathematics may
   need to operate asynchronously even if the TeX *doesn't* include
   ``\require`` or any auto-loaded extensions, as the output itself
   could need extra font data files to be loaded.  Thus in version 4,
   it is always best to use the promise-based commands, when possible.

   The examples below show how to pre-load the needed font data so that
   you can still work synchronously even with the larger v4 fonts.

-----

.. _preload-basics:

The Basics of Pre-Loading Extensions
====================================

First, :ref:`get a copy of the MathJax code library <obtain-mathjax>`.
Here, we will assume you have used ``npm`` or ``pnpm`` to install the
``@mathjax/src@4`` package.  You will need to use ``@mathjax/src``,
not just ``mathjax``, since the examples given here rely on access to
the component definitions and other source code that is not part of
the ``mathjax`` package, which includes only the bundled files.

The examples linked below load the needed MathJax components my
hand, using the source files in MathJax's ``components`` directories
(the files used to create the bundled components found in the
``bundle`` directory).  The examples use the path
``@mathjax/src/components/js`` to access the component definitions, as
MathJax's :file:`package.json` file is set up to map this to the
``components/mjs`` directory when used in an ``import`` command, and
to ``components/cjs`` when used in a ``require()`` command, so the
same address will give you the proper ES or CommonJS module for the
mechanism you are using to load it.

All the examples begin with the following lines:

.. code-block:: javascript

   import {MathJax} from '@mathjax/src/js/components/global.js';
   import {insert} from '@mathjax/src/js/util/Options.js';
   import '@mathjax/src/js/components/startup.js';
   import '@mathjax/src/components/js/core/core.js';
   import '@mathjax/src/components/js/adaptors/liteDOM/liteDOM.js';

(or the equivalent using ``require()``).  The first line sets up the
global :js:data:`MathJax` variable, handling any existing
:js:data:`MathJax` value as a MathJax configuration (in case the
examples below are included in a larger application that sets up its
own configuration).  The second line obtains a utility for inserting
values into the MathJax configuration, overriding existing values, if
any.  The third line loads the :ref:`startup-component` component,
which will be called later to instantiate the needed MathJax objects
and create the various typeset and conversion functions.
The fourth line loads the core component, and the fifth loads
the :ref:`liteDOM-component` component, which implements a limited DOM
for use in node.  (You would not load this component if you were using
this technique to make a browser-based application, and there are
other alternative adaptors that could be used if you need a more
robust DOM implementation.)

Next we load the TeX components that we plan to use:

.. code-block:: javascript

   import '@mathjax/src/components/js/input/tex-base/tex-base.js';
   import '@mathjax/src/components/js/input/tex/extensions/ams/ams.js';
   import '@mathjax/src/components/js/input/tex/extensions/newcommand/newcommand.js';
   import '@mathjax/src/components/js/input/tex/extensions/color/color.js';

In this case, we use the `tex-base` component, which only includes the
`base` configuration, whereas the :ref:`tex-component` component
includes the :ref:`require <tex-require>` and the :ref:`autoload
<tex-autoload>` components, which we can't support synchronously.

We also load the :ref:`ams <tex-ams>`, :ref:`newcommand
<tex-newcommand>`, and :ref:`color <tex-color>` components.  These are
just for illustration; you can include whatever components you need
for the expressions you will be processing.

Next, we load the CommonHTML output jax

.. code-block:: javascript

   import '@mathjax/src/components/js/output/chtml/chtml.js';

though you could use the SVG output jax if you prefer.

Now that everything is loaded (though some of the examples load
additional items), we configure the TeX input jax to use the
pre-loaded extensions:

.. code-block:: javascript

   insert(MathJax.config, {
     tex: {
       packages: {'[+]': ['ams', 'newcommand', 'color']}
     }
   }, false);

This uses the :meth:`insert()` function that we loaded earlier.

Then we start up MathJax:

.. code-block:: javascript

   MathJax.config.startup.ready();

and finally process some math and print the results:

.. code-block:: javascript

   const math = process.argv[2] || '';
   const adaptor = MathJax.startup.adaptor;
   console.log(adaptor.outerHTML(MathJax.tex2chtml(math)));

Here, we take the math from the command line arguments, but you will
likely obtain the math to be processed from elsewhere in your code.
You may want to provide a :meth:`typeset()` function that encapsulates
the code to do the typesetting.

This is the outline that is illustrated in the examples below. They
include variations on this theme that show how to handle fonts
synchronously in several different ways.  There is also an example
that handles speech generation, though that requires one asynchronous
step, and only creates speech for the top-level element of the
resulting expression.

-----

.. _preload-import-tex:

Using the MathJax-TeX font
==========================

This example uses the ``mathjax-tex`` font, which is the original
font-set used by MathJax v2 and v3.  Because this font has limited
character coverage it is *not* broken into multiple pieces, so you
don't have to worry about dynamically loaded font data, so preloading
the TeX extensions is all you have to worry about in order to be able
to process math synchronously.

The lines that are required for this that differ from the outline
given above are highlighted below.

Note that you will need to use ``npm`` or ``pnpm`` to install the
``@mathjax/mathjax-tex-font`` package in order to use the
``mathjax-tex`` font.

.. code-block:: javascript
   :linenos:
   :emphasize-lines: 20-23, 32-34

   import {MathJax} from '@mathjax/src/js/components/global.js';
   import {insert} from '@mathjax/src/js/util/Options.js';
   import '@mathjax/src/js/components/startup.js';
   import '@mathjax/src/components/js/core/core.js';
   import '@mathjax/src/components/js/adaptors/liteDOM/liteDOM.js';

   //
   // Load the TeX components that we want to use
   //
   import '@mathjax/src/components/js/input/tex-base/tex-base.js';
   import '@mathjax/src/components/js/input/tex/extensions/ams/ams.js';
   import '@mathjax/src/components/js/input/tex/extensions/newcommand/newcommand.js';
   import '@mathjax/src/components/js/input/tex/extensions/color/color.js';

   //
   // Load the output jax
   //
   import '@mathjax/src/components/js/output/chtml/chtml.js';

   //
   // Load the mathjax-tex font
   //
   import {MathJaxTexFont} from '@mathjax/mathjax-tex-font/js/chtml.js';

   //
   // Add the pre-loaded TeX extensions here, and specify the font
   //
   insert(MathJax.config, {
     tex: {
       packages: {'[+]': ['ams', 'newcommand', 'color']}
     },
     chtml: {
       fontData: MathJaxTexFont
     }
   }, false);

   //
   // Start up MathJax
   //
   MathJax.config.startup.ready();

   //
   // Convert some math synchronously
   //
   const math = process.argv[2] || '';
   const adaptor = MathJax.startup.adaptor;
   console.log(adaptor.outerHTML(MathJax.tex2chtml(math)));


-----

.. _preload-import-newcm:

Using the MathJax-NewCM font
============================

This example uses the default font for MathJax v4, the
``mathjax-newcm`` font, which is based on the New Computer Modern
font.  Because ``mathjax-newcm`` has extensive character coverage, it
is broken into a number of separate files that are loaded dynamically
when needed.  That means producing output that uses ``mathjax-newcm``
can be asynchronous, as some character data may need to be loaded from
additional files.

To use this font synchronously, you need to pre-load the font data
files for the characters that you expect to need.  The example below
loads the calligraphic characters, but you could include additional
``import`` commands to load other ranges of characters.  These files
can be found in the
``node_modules/@mathjax/mathjax-tex-font/mjs/chtml/dynamic``
directory.

The ``mathjax-tex-font`` package should be installed automatically
when you install the ``@mathjax/src`` npm package, so you shouldn't
need to install it by hand, as you did for the ``mathjax-tex`` font in
the previous example.

The lines that are required for this that differ from the outline
given above are highlighted below.

.. code-block:: javascript
   :linenos:
   :emphasize-lines: 20-28, 37-39, 47-52

   import {MathJax} from '@mathjax/src/js/components/global.js';
   import {insert} from '@mathjax/src/js/util/Options.js';
   import '@mathjax/src/js/components/startup.js';
   import '@mathjax/src/components/js/core/core.js';
   import '@mathjax/src/components/js/adaptors/liteDOM/liteDOM.js';

   //
   // Load the TeX components that we want to use
   //
   import '@mathjax/src/components/js/input/tex-base/tex-base.js';
   import '@mathjax/src/components/js/input/tex/extensions/ams/ams.js';
   import '@mathjax/src/components/js/input/tex/extensions/newcommand/newcommand.js';
   import '@mathjax/src/components/js/input/tex/extensions/color/color.js';

   //
   // Load the output jax
   //
   import '@mathjax/src/components/js/output/chtml/chtml.js';

   //
   // Load the font to use, and any dynamic font files
   //
   import {MathJaxNewcmFont} from '@mathjax/mathjax-newcm-font/js/chtml.js';
   import '@mathjax/mathjax-newcm-font/js/chtml/dynamic/calligraphic.js';
     //
     // ... load any additional ones here, and add them to the array below.
     //
   const fontPreloads = ['calligraphic'];

   //
   // Add the pre-loaded TeX extensions here
   //
   insert(MathJax.config, {
     tex: {
       packages: {'[+]': ['ams', 'newcommand', 'color']}
     },
     chtml: {
       fontData: MathJaxNewcmFont
     }
   }, false);

   //
   // Start up MathJax
   //
   MathJax.config.startup.ready();

   //
   // Activate the dynamic font files
   //
   const font = MathJax.startup.document.outputJax.font;
   const dynamic = MathJaxNewcmFont.dynamicFiles;
   fontPreloads.forEach(name => dynamic[name].setup(font));

   //
   // Convert some math synchronously
   //
   const math = process.argv[2] || '';
   const adaptor = MathJax.startup.adaptor;
   console.log(adaptor.outerHTML(MathJax.tex2chtml(math)));

This approach could also be used to handle any of the MathJax fonts
available for v4 by first installing the needed font, and changing
lines 23 to 28, line 38, and line 51 to refer to the correct font.

Technically, lines 37 to 39 are not needed, since the
``mathjax-newcm`` font is the default for MathJax v4, but these lines
show how to configure MathJax for any font.

-----

.. _preload-require-newcm:

A CommonJS Example
==================

This example illustrates using ``require()`` rather than ``import`` in
a CommonJS module.  Because ``require()`` is synchronous, this makes
it possible to load the dynamic font files in a loop rather than
having to list them individually as we do above.  MathJax provides a
:js:meth:`loadDynamicFilesSync()` method for doing so, but it requires
that you specify a mechanism for loading the files.  This is usually
an asynchronous method, but since we are using ``require()``, we
indicate that it is actually synchronous.

The changes needed for this are highlighted below.  Of course, all the
``import`` commands have been changed to equivalent ``require()``
commands throughout.

.. code-block:: javascript
   :linenos:
   :emphasize-lines: 7-11, 30-34, 45-50

   const {MathJax, combineDefaults} = require('@mathjax/src/js/components/global.js');
   const {insert} = require('@mathjax/src/js/util/Options.js');
   require('@mathjax/src/js/components/startup.js');
   require('@mathjax/src/components/js/core/core.js');
   require('@mathjax/src/components/js/adaptors/liteDOM/liteDOM.js');

   //
   // Needed for asyncLoad below
   //
   const {mathjax} = require('@mathjax/src/js/mathjax.js');
   const {Package} = require('@mathjax/src/js/components/package.js');

   //
   // Load the TeX components that we plan to use
   //
   require('@mathjax/src/components/js/input/tex-base/tex-base.js');
   require('@mathjax/src/components/js/input/tex/extensions/ams/ams.js');
   require('@mathjax/src/components/js/input/tex/extensions/newcommand/newcommand.js');
   require('@mathjax/src/components/js/input/tex/extensions/color/color.js');

   //
   // Load the output jax
   //
   require('@mathjax/src/components/js/output/chtml/chtml.js');

   //
   // Set the font path and add the pre-loaded TeX extensions here
   //
   insert(MathJax.config, {
     loader: {
       paths: {
         'mathjax-newcm': '@mathjax/mathjax-newcm-font/js'
       }
     },
     tex: {
       packages: {'[+]': ['ams', 'newcommand', 'color']}
     }
   }, false);

   //
   // Start up MathJax
   //
   MathJax.config.startup.ready();

   //
   // Load the font dynamic files
   //
   mathjax.asyncLoad = (file) => require(Package.resolvePath(file));
   mathjax.asyncIsSynchronous = true;
   MathJax.startup.document.outputJax.font.loadDynamicFilesSync();

   //
   // Convert some math synchronously
   //
   const math = process.argv[2] || ''
   const adaptor = MathJax.startup.adaptor;
   console.log(adaptor.outerHTML(MathJax.tex2chtml(math)));

This example loads **all** the dynamic font files, so you don't have
to know which ones you will need.  Note, however, that that can be a
large number of files, with a large amount of data, much of which
likely will never be used.  This can increase the startup time for
your application, so you may want to use the technique of
individually loading only the files you actually need.

In an ES module, one could use

.. code-block:: javascript

   mathjax.asyncLoad = (file) => import(Package.resolvePath(file));
   await MathJax.startup.document.outputJax.font.loadDynamicFiles();

to load all the font files, but that is asynchronous, so you need to
use ``await`` to wait for the command to complete.  Be aware that that
means other parts of your code could run before that is completed, so
you will need to be careful not to call MathJax commands until after
the loading is complete.

-----

.. _preload-import-cjs:

Loading All Font Data Synchronously
===================================

In the previous example, we took advantage of ``require()`` to make
the :js:meth:`loadDynamicFilesSync()` method available to load all the
font data before processing any math.  Although ES modules (using
``import`` and ``export``) don't have a ``require()`` command, it is
possible to define one that can be used to load CommonJS modules.
MathJax provides a file that does that for you, so you don't need to
know the details of how that works.  This is done in line 12 below,
which is the only new line added to the CommonJS example above.

In order for this to work, you need to use the CommonJS versions of
all the MathJax modules.  That is done by changing the ``js`` directory
name to ``cjs`` everywhere it occurs in the ``import`` commands and the
loader path definition.

.. code-block:: javascript
   :linenos:
   :emphasize-lines: 12

   import {MathJax} from '@mathjax/src/cjs/components/global.js';
   import {insert} from '@mathjax/src/cjs/util/Options.js';
   import '@mathjax/src/cjs/components/startup.js';
   import '@mathjax/src/components/cjs/core/core.js';
   import '@mathjax/src/components/cjs/adaptors/liteDOM/liteDOM.js';

   //
   // Needed for asyncLoad below
   //
   import {mathjax} from '@mathjax/src/cjs/mathjax.js';
   import {Package} from '@mathjax/src/cjs/components/package.js';
   import '@mathjax/src/components/require.mjs';

   //
   // Load the TeX components that we want to use
   //
   import '@mathjax/src/components/cjs/input/tex-base/tex-base.js';
   import '@mathjax/src/components/cjs/input/tex/extensions/ams/ams.js';
   import '@mathjax/src/components/cjs/input/tex/extensions/newcommand/newcommand.js';
   import '@mathjax/src/components/cjs/input/tex/extensions/color/color.js';

   //
   // Load the output jax
   //
   import '@mathjax/src/components/cjs/output/chtml/chtml.js';

   //
   // Set the font path and add the pre-loaded TeX extensions here
   //
   insert(MathJax.config, {
     loader: {
       paths: {
         'mathjax-newcm': '@mathjax/mathjax-newcm-font/cjs'
       }
     },
     tex: {
       packages: {'[+]': ['ams', 'newcommand', 'color']}
     }
   }, false);

   //
   // Start up MathJax
   //
   MathJax.config.startup.ready();

   //
   // Load the font dynamic files
   //
   mathjax.asyncLoad = (file) => require(Package.resolvePath(file));
   mathjax.asyncIsSynchronous = true;
   MathJax.startup.document.outputJax.font.loadDynamicFilesSync();

   //
   // Convert some math synchronously
   //
   const math = process.argv[2] || '';
   const adaptor = MathJax.startup.adaptor;
   console.log(adaptor.outerHTML(MathJax.tex2chtml(math)));

If you don't use the ``cjs`` paths explicitly, the ``import`` commands
will load the ES Modules, while the ``asyncLoad`` command, using
``require()``, will load the CommonJS modules.  That will cause all of
MathJax to be loaded again from the ``cjs`` directories, and you will
have two copies of everything.  Then :js:meth:`loadDynamicFilesSync()`
will load the dynamic files into the ``cjs`` copies, while your
typesetting will be performed by the ``mjs`` versions, which don't
have the dynamic files loaded, and that will lead to a ``MathJax
retry`` error when any dynamic file is needed.  That is, your loading
of the dynamic files will have no effect, because they went into the
wrong copy of MathJax.

-----

.. _preload-import-speech:

Synchronous Typesetting with Speech
===================================

This example builds on the :ref:`preload-import-newcm` example by
adding the needed code for generating speech output for the resulting
expressions.  This is accomplished by include the speech-rule-engine
(SRE) code.  Unfortunately, the startup code for SRE is inherently
asynchronous, so you do need to handle one promise during
initialization and wait for that before performing any typesetting
operations, but once that one promise is resolved, you can work
synchronously from there.

Since SRE uses ``require()`` to load its dependencies when it is used
in node, we include the :file:`components/require.mjs` file to make
that available from our ES module.

Lines 7 through 13 are the import commands needed to load SRE and
other needed modules.

Lines 47 through 68 define a function that adds a speech string to the
root node of the internal MathML tree, and then adds a
``renderAction`` to the document options that performs the
:meth:`addSpeech()` action.  The ``aria-label`` attribute will be
included in the DOM elements generated by MathJax later in the
conversion step.

Lines 70 through 75 give the asynchronous code that must be used to
get SRE up and running before typesetting can be done synchronously.
This waits for SRE to set itself up, passing it the locale and
modality needed for the language specified as the second command-line
argument to this script, then waits for SRE to be ready before startup
up MathJax.

You may need to use ``npm`` or ``pnpm`` to install the
``speech-rule-engine`` npm module, if it isn't already installed.

.. code-block:: javascript
   :linenos:
   :emphasize-lines: 7-13, 47-68, 70-75

   import {MathJax} from '@mathjax/src/js/components/global.js';
   import {insert} from '@mathjax/src/js/util/Options.js';
   import '@mathjax/src/js/components/startup.js';
   import '@mathjax/src/components/js/core/core.js';
   import '@mathjax/src/components/js/adaptors/liteDOM/liteDOM.js';

   //
   // Load code for SRE
   //
   import '@mathjax/src/components/require.mjs';
   import '@mathjax/src/components/js/a11y/semantic-enrich/semantic-enrich.js';
   import {setupEngine, engineReady, toSpeech} from 'speech-rule-engine/js/common/system.js';
   import {STATE} from '@mathjax/src/js/core/MathItem.js';

   //
   // Load the TeX components that we want to use
   //
   import '@mathjax/src/components/js/input/tex-base/tex-base.js';
   import '@mathjax/src/components/js/input/tex/extensions/ams/ams.js';
   import '@mathjax/src/components/js/input/tex/extensions/newcommand/newcommand.js';
   import '@mathjax/src/components/js/input/tex/extensions/color/color.js';

   //
   // Load the output jax
   //
   import '@mathjax/src/components/js/output/chtml/chtml.js';

   //
   // Load the font to use, and any dynamic font files
   //
   import {MathJaxNewcmFont} from '@mathjax/mathjax-newcm-font/js/chtml.js';
   import '@mathjax/mathjax-newcm-font/js/chtml/dynamic/calligraphic.js';
     //
     // ... load any additional ones here, and add them to the array below.
     //
   const fontPreloads = ['calligraphic'];

   //
   // Add the pre-loaded TeX extensions here
   //
   insert(MathJax.config, {
     tex: {
       packages: {'[+]': ['ams', 'newcommand', 'color']}
     }
   }, false);

   //
   // Add a speech string to the root math element
   //
   function addSpeech(item) {
     const speech = toSpeech(MathJax.startup.toMML(item.root));
     item.root.attributes.set('aria-label', speech);
   }

   //
   // Add a render action that computes the speech
   //
   insert(MathJax.config, {
     options: {
       renderActions: {
         addSpeech: [
           STATE.COMPILED + 10,
           (doc) => {for (const item of doc.math) addSpeech(item)},
           (item, doc) => addSpeech(item)
         ]
       }
     }
   }, false);

   //
   // Start up SRE
   //
   const locale = process.argv[3] || 'en';
   const modality = locale === 'nemeth' || locale === 'euro' ? 'braille' : 'speech';
   await setupEngine({modality, locale}).then(() => engineReady());
   
   //
   // Start up MathJax
   //
   MathJax.config.startup.ready();

   //
   // Activate the dynamic font files
   //
   const font = MathJax.startup.document.outputJax.font;
   const dynamic = MathJaxNewcmFont.dynamicFiles;
   fontPreloads.forEach(name => dynamic[name].setup(font));

   //
   // Convert some math synchronously
   //
   const math = process.argv[2] || '';
   const adaptor = MathJax.startup.adaptor;
   console.log(adaptor.outerHTML(MathJax.tex2chtml(math)));

If you don't want to, or can't, use ``await``, you can add one more
``then()`` clause whose function starts up the main code for your
application instead.


-----

More examples are available in the `MathJax node demos
<https://github.com/mathjax/MathJax-demos-node#MathJax-demos-node>`__
for using MathJax from a node application.  In particular, see the
`preloading examples
<https://github.com/mathjax/MathJax-demos-node/tree/master/preload#preloaded-component-examples>`__
for illustrations of how to load MathJax components by hand in a
`node` application.


|-----|
