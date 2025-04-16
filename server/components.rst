.. _node-components:

################################
Using MathJax Components in Node
################################

It is possible to use MathJax in a node application in essentially the
same was that it is used in a browser.  In particular, you can load
MathJax components and configure MathJax using a global
:js:data:`MathJax` object and load a :ref:`combined component
<combined-components>` file or the :ref:`startup-component` component
via node's ``import`` or ``require()`` commands.

First :ref:`get a copy of the MathJax code library <obtain-mathjax>`.
Here, we will assume you have used ``npm`` or ``pnpm`` to install the
``@mathjax/src@4`` package.  You will need to change the ``require()``
or ``import`` statements accordingly in the examples below if you have
loaded ``mathjax@4`` or obtained MathJax from the ``MathJax-src``
GitHub repository.

In MathJax, the loading of components is asynchronous, and so you may
need to use promises or the ``await`` command to mediate the flow of
your program, particularly program startup. Once MathJax's components
are loaded, however, you can call the non-promise-based functions, but
should use the promise-based ones if you want to support autoloading
of extensions, the ``\require`` macro in TeX input, or the v4 fonts
with larger character coverage.

.. warning::

   In MathJax v4, with the introduction of new fonts that include many
   more characters than the original MathJax TeX fonts did, the fonts
   have been broken into smaller pieces so that your readers don't
   have to download the entire font and its data for characters that
   may never be used.  That means that typesetting mathematics may
   need to operate asynchronously even if the TeX *doesn't* include
   ``\require`` or any auto-loaded extensions, as the output itself
   could need extra font data files to be loaded.  Thus in version 4,
   it is always best to use the promise-based commands.

The :ref:`synchronous examples <node-preload>` show how to operate
synchronously from the outset, if that is required.

-----

Configuring and Loading Components in Node
==========================================

As with MathJax in a browser, using MathJax components in a node
application consists of two steps: configuring MathJax, and Loading a
MathJax combined component to process the configuration.  Just as in a
browser, the configuration is specified in the global
:js:data:`MathJax` variable.

.. _web-vs-node:

Configuration for Node vs. the Web
----------------------------------

If you are using MathJax components as part of a larger application
that will be bundled for use in a web browser, then your MathJax
configuration should be the same as the configuration you would use if
you were loading MathJax into the web page directly, with one
exception: you may need to provide the URL where MathJax should load
any extensions that are needed once MathJax is running.  Normally,
MathJax determines that URL based on the ``src`` attribute of the
``script`` tag that loaded it, but since MathJax is part of your
larger application, that URL is probably not appropriate, so you will
need to specify the correct one yourself.

This is done using the :js:data:`mathjax` property of the :js:data:`paths` section
in the :js:data:`loader` block of your MathJax configuration.  For example,

.. code-block:: javascript

   global.MathJax = {
     loader: {
       paths: {
         mathjax: 'https://cdn.jsdelivr.net/npm/mathjax@4'
       }
     }
   }

would set things up so that extensions would be loaded from the
``jsDelivr`` CDN.  You could, of course, make the extensions available
on your own server and set the URL to point to that.

If you are using MathJax components as part of a server-side or
command-line application, you should set the :js:data:`mathjax` path to
``@mathjax/src/bundle`` instead:

.. code-block:: javascript

   global.MathJax = {
     loader: {
       paths: {
         mathjax: '@mathjax/src/bundle'
       }
     }
   }

so that MathJax will take additional components from the ``bundle``
directory.

.. note::

   In version 4, the ``bundle`` directory replaces the ``es5`` directory from version 3.

For non-browser applications, there are two additional steps you need
to take. First, you must tell MathJax to use ``import()`` or
``require()`` as the mechanism for loading external files, and second,
you need to load a non-browser :ref:`DOM adaptor
<node-DOM-adaptor>`. MathJax provides a light-weight DOM
implementation (called `liteDOM`) that is sufficient for MathJax's
needs without unnecessary overhead, so you probably want to use
that. If you need a more full-featured DOM implementation, you can use
another one, such as ``jsdom`` or ``linkedom`` (MathJax does provide
adaptors for these).  It is even possible to use puppeteer with
headless Chrome in order to be able to access a full DOM
implementation from node.

Both of these features are set in the :js:data:`loader` block of your MathJax
configuration object, as illustrated in the sections below.


.. _node-import-configuration:

Configuring MathJax for Use with ``import``
-------------------------------------------

Because the configuration must be in place before the MathJax
component is loaded, if you are using ``import`` commands rather than
``require()``, that means you either need to put the MathJax
configuration into a separate file to be imported before MathJax
itself, or you need to use the promise-based ``import()`` function to
load MathJax.

So you could create a file called ``mathjax-config.mjs`` containing

.. code-block:: javascript

   global.MathJax = {
     loader: {
       paths: {mathjax: '@mathjax/src/bundle'},
       load: ['adaptors/liteDOM'],
       require: (file => import(file))
     },
     // additional configuration here
   };

and then use

.. code-block:: javascript

   import './mathjax-config.js';
   import '@mathjax/src/bundle/tex-chtml.js';
   await MathJax.startup.promise;
   
   // your code that uses MathJax here
   
   MathJax.done();

to load the ``tex-chtml`` combined component with that configuration,
and wait for MathJax to set itself up.

.. note::

   In MathJax v4, the speech generation is performed in web-workers
   (in the browser) or worker-threads (in node applications), and once
   these are started, they will prevent the node application from
   ending if they are not shut down.  So v4 includes the
   :js:meth:`MathJax.done()` function that terminates the workers,
   thus allowing the node program to end.  You should call this when
   your program is ready to end so that it can shut down properly.

Alternatively, you could do

.. code-block:: javascript

   global.MathJax = {
     loader: {
       paths: {mathjax: '@mathjax/src/bundle'},
       load: ['adaptors/liteDOM'],
       require: (file => import(file))
     },
     // additional configuration here
   };
   await import('@mathjax/src/bundle/tex-chtml.js');
   await MathJax.startup.promise;
   
   // your code that uses MathJax here
   
   MathJax.done();

to include the configuration in-line before loading the ``tex-chtml``
component.

.. note::
   
   ES6 modules usually use ``import``, and ``require()`` is not
   available, but it is possible to define ``require()`` if you are
   making a command-line or server-side application.  MathJax provides a
   file that does that for you, so if you add

   .. code-block:: javascript

      import '@mathjax/src/bundle/require.mjs';

   to your code, you can then use ``require()`` as described in the
   following section.

.. _node-locale-configuration:

Configuring the Speech Locale
-----------------------------

The default speech language is English, and the default Braille code
is Nemeth.  You can use the :js:data:`sre` block of the
:js:data:`options` section of your MathJax configuration to specify a
different locale or Braille version, as illustrated below.

.. code-block:: javascript

   import {mjxRoot} from '@mathjax/src/js/components/mjs/root.js';

   global.MathJax = {
     loader: {
       paths: {mathjax: mjxRoot()},
       load: ['adaptors/liteDOM'],
       require: (file) => import(file)
     },
     options: {
       sre: {
         locale: 'de'
       }
     }
     // additional configuration here
   };

   await import('@mathjax/src/bundle/tex-chtml.js');
   await MathJax.startup.promise;
   
   // your code that uses MathJax here
   
   MathJax.done();

which configures MathJax to produce speech strings in German rather
than English.


.. _node-cjs-configuration:

Configuring MathJax for Use with ``require()``
----------------------------------------------

To use MathJax components in a CommonJS module, first set up the
MathJax configuration, and then ``require()`` the combined component
you want to load.  So you can do

.. code-block:: javascript

   MathJax = {
     loader: {
       paths: {mathjax: '@mathjax/src/bundle'},
       load: ['adaptors/liteDOM'],
       require: require
     },
     // additional configuration here
   };
   require('@mathjax/src/bundle/tex-chtml.js');
   MathJax.startup.promise
     .then(() => {
       //your MathJax code here
     })
     .catch((err) => console.error(err.message))
     .then(() => MathJax.done());


to configure MathJax for use with the ``tex-chtml`` combined
component, and then wait for MathJax to start up, perform your
commands (with error trapping), and then shut down MathJax.


.. _node-startup-component:

Loading Individual Components
-----------------------------

If you are using MathJax components in a server-side or command-line
application, the combined components that MathJax provides may include
components that you don't need (such as the menu code and expression
explorer).  So you may want to configure MathJax explicitly to use
only the components that you need.  You do this by listing the needed
components in the ``load`` array of the ``loader`` section of the
MathJx configuration, and then load the ``startup.js`` module rather
than a combined component.

For example,

.. code-block:: javascript

   global.MathJax = {
     loader: {
       paths: {mathjax: '@mathjax/src/bundle'},
       load: ['input/tex', 'output/svg', 'adaptors/liteDOM'],
       require: (file => import(file)),
     },
     output: {font: 'mathjax-newcm'}
   }
   await import('@mathjax/src/bundle/startup.js');
   await MathJax.startup.promise;

would load only the TeX input jax and the SVG output jax, along with
the ``liteDOM`` adaptor, but without loading the menu code, the
assistive tools, or any other components.  Because the ``input/tex``
component includes the :ref:`require <tex-require>` and :ref:`autoload
<tex-autoload>` extensions, the TeX that you process could still load
TeX extensions that are needed.

Because the ``output/svg`` component does not include a font, you need
to configure that separately in the :js:data:`output` section of the
configuration, as shown.

.. _node-load-source:

Loading MathJax Components from Source
--------------------------------------

The examples above all load the webpacked versions of MathJax's
components.  It is possible to load the files from the source ``.js``
files in the ``mjs`` or ``cjs`` directories, which may be useful if
you are modifying the MathJax source files and want to test your
changes without having to repack all the components.

To do this, you should set the :js:data:`source` mapping in the
:js:data:`loader` section of the MathJax configuration, and then load
the combined component from its source file in the ``components``
directory rather than the ``bundle`` directory.  The :file:`source.js`
file in ``components/mjs`` or ``components/cjs`` directory contains
the mapping of component names to their source definitions, and you
can use that to set the :js:data:`source` field of your MathJax
configuration.

You can obtain the :file:`source.js` file using
:file:`@mathjax/src/components/js/source.js`, and it will select the
``mjs`` or ``cjs`` directory depending on whether you use ``import`` or
``require()`` to load it.  So for use in ES6 modules, you can do

.. code-block:: javascript

   import {source} from '@mathjax/src/components/js/source.js';
   import '@mathjax/src/bundle/require.mjs';  // needed by speech-rule engine

   global.MathJax = {
     loader: {
       paths: {mathjax: '@mathjax/src/bundle'},
       load: ['adaptors/liteDOM'],
       require: (file => import(file)),
       source: source
     }
     // additional configuration here
   }
   await import(source['tex-chtml']);
   await MathJax.startup.promise;

   // your code that uses MathJax here
   
   MathJax.done();

while for CommonJS modules, you can do

.. code-block:: javascript

   const {source} = require('@mathjax/src/components/js/source.js');

   MathJax = {
     loader: {
       paths: {mathjax: '@mathjax/src/bundle'},
       load: ['adaptors/liteDOM'],
       require: require,
       source: source
     }
     // additional configuration here
   }
   require(source['tex-chtml']);
   MathJax.startup.promise
     .then(() => {
       //your MathJax code here
     })
     .catch((err) => console.error(err.message))
     .then(() => MathJax.done());



-----

.. _node-load-component:

Calling MathJax from Components
===============================

Once you have loaded a combined component file (or the ``startup``
component), you can use the normal MathJax commands to typeset
mathematics.  For example, in a browser application, you can call
:js:meth:`MathJax.typesetPromise()` to typeset the page.

For a command-line application, you could do

.. code-block:: javascript

   const EM = 16;          // size of an em in pixels
   const EX = 8;           // size of an ex in pixels
   const WIDTH = 80 * EM;  // width of container for linebreaking
   
   function typeset(math, display = true) {
     return MathJax.tex2svgPromise(math, {
       display: display,
       em: EM,
       ex: EX,
       containerWidth: WIDTH
     }).then((node) => {
        const adaptor = MathJax.startup.adaptor;
        return(adaptor.serializeXML(adaptor.tags(node, 'svg')[0]));
     }).catch(err => console.error(err));
   }

to define a :meth:`typeset()` command that takes a TeX string and an
optional boolean that specifies whether the typesetting should be in
display mode or in-line mode and returns a promise that is resolved
when the typesetting is complete (while handling any waiting that had
to be done to load extensions, fonts, etc.).

The :meth:`typeset()` promise returns the serialized SVG output, so that you could do

.. code-block:: javascript

   const svg = await typeset('\\sqrt{1+x^2}');

to get the SVG output.  See the :ref:`stand-alone-svg` section for an
example of generating SVG images that handles the CSS needed by some
expressions in MathJax.

----

.. _node-component-example:

Examples of Components in Node
==============================

The following combines some of the ideas described above into a
single, complete example of a command-line tool that takes three
arguments: a TeX string to typeset, the language locale to use, and
the Braille format to use.  The last two are optional, and default to
``en`` and ``nemeth``.

.. code-block:: javascript
   :linenos:

   global.MathJax = {
     loader: {
       paths: {mathjax: '@mathjax/src/bundle'},
       load: ['adaptors/liteDOM'],
       require: (file) => import(file)
     },
     options: {
       sre: {
         locale: process.argv[3] || 'en',
         braille: process.argv[4] || 'nemeth'
       }
     }
     // additional configuration here
   };

   await import('@mathjax/src/bundle/tex-svg.js');
   await MathJax.startup.promise;

   const EM = 16;          // size of an em in pixels
   const EX = 8;           // size of an ex in pixels
   const WIDTH = 80 * EM;  // width of container for linebreaking

   function typeset(math, display = true) {
     return MathJax.tex2svgPromise(math, {
       display: display,
       em: EM,
       ex: EX,
       containerWidth: WIDTH
     }).then((node) => {
       const adaptor = MathJax.startup.adaptor;
       return(adaptor.serializeXML(adaptor.tags(node, 'svg')[0]));
     }).catch(err => console.error(err));
   }

   const math = process.argv[2] || '';
   const svg = await typeset(math);
   console.log(svg);

   MathJax.done();

See the :ref:`stand-alone-svg` section for an example of generating
SVG images that handles the CSS needed by some expressions in MathJax.

See the `MathJax node demos
<https://github.com/mathjax/MathJax-demos-node#MathJax-demos-node>`__ for
more examples of how to use MathJax from a node application.  In
particular, see the `component-based examples
<https://github.com/mathjax/MathJax-demos-node/tree/master/component#component-based-examples>`__
for illustrations of how to configure and load MathJax components.


|-----|
