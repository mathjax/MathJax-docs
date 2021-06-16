.. _web-custom-build:

################################
Making a Custom Build of MathJax
################################

MathJax provides a number of combined components that load everything
you need to run MathJax with a given input and output format.  Still,
you might find that none of the ones we provide fully suit your
needs, and that you would like to include additional components in the
build, or perhaps want to include customized configuration options.

You can use the MathJax component build tools to make your own custom
component that has exactly the pieces and configuration that you
want. You can also use them to make a custom extension, for example a
TeX input extension, that takes advantage of the components already
loaded, but implements additional functionality.
These possibilities are described in :ref:`custom-component` below.  

It is also possible to make a completely custom build of MathJax that
doesn't use the MathJax components at all, but includes direct calls
to the MathJax source files.  This is described in :ref:`custom-build`
below.

If you wish to include MathJax as part of a larger project, you can
use either of the techniques to do that, and make a webpacked file
that includes your own project code as well as MathJax.


.. _getting-ready:

Getting Things Ready
====================

Your first step is to download a copy of MathJax via ``npm`` or
``git``, as described in the section on :ref:`obtain-mathjax`.

* If you use ``npm``, you will want to install the ``mathjax-full``
  package rather than the ``mathjax`` package, since the former
  includes all the source code, in both its original and compiled
  forms, along with the webpacked components.

..

* If you use ``git``, be sure to run the commands to compile and make
  the components, as listed in :ref:`mathjax-git`.

In either case, you should have a ``js``, an ``es5``, and a
``components`` directory, either in the ``node_modules/mathjax-full``
directory (for ``npm`` installations) or in the main directory (for
``git`` installations).

Your second step is to obtain the tools needed to package your custom
code using ``webpack``.  Use the commands

.. code-block:: shell

   npm install webpack
   npm install webpack-cli
   npm install terser-webpack-plugin
   npm install babel-loader
   npm install @babel/core
   npm install @babel/preset-env

to install ``webpack`` and its needed libraries.  Once this is done,
you should be able to make the components described below.  The
building instructions assume you used ``npm`` to aquire MathJax; if
you used ``git``, then you will need to remove
``node_modules/mathjax-full`` from the paths that incldue them.

-----


.. _custom-component:

Building a Custom Component
===========================

MathJax comes with a number of predefined components, and you can use
`their definitions
<https://github.com/mathjax/MathJax-src/tree/master/components/src>`__ as a starting
point for your own custom component.  There are also custom component
examples (with documentation) in the `MathJax web demos repository
<https://github.com/mathjax/MathJax-demos-web#customization>`__, which are
similar to the ones described here.

There are two kinds of components you could build:

* A **combined component** that brings together several other
  components (the ``tex-chtml`` component is a combined component)

..

* A **extension component** that contains what is needed for one
  feature and can be loaded along with other components to add
  that feature to MathJax.

We describe how you can create each of these below.  In both cases,
you should create a directory to hold your component's support files.
You will need the main control file for the component (that includes
the code that defines the component), and a webpack control file that
will tell MathJax's build tools how to handle your component.  These
will be discussed in the sections below.


.. _custom-combined:

A Custom Combined Component
---------------------------

After downloading a copy of MathJax as described in the section on
:ref:`getting-ready`, make the directory for your component and
``cd`` to that directory.  We will assume the directory is called
``custom-mathjax`` for this discussion.

For this example, we will create a custom build that has the TeX input
jax and the SVG output jax, and we will load the ``newcommand``,
``ams``, and ``configmacros`` extensions, but will not include
``require`` or ``autoload``, so the user will not be able load any
additional TeX extensions.  This component also includes the
contextual menu.


The Control File
................

Create a javascript file to house the component and call it
``custom-mathjax.js``.  The file should contain the following code (we
assume here that you used ``npm`` to install MathJax.  If not, you may
need to adjust the locations in the :func:`require()` commands).

.. code-block:: javascript

   //
   //  Initialize the MathJax startup code
   //
   require('mathjax-full/components/src/startup/lib/startup.js');

   //
   //  Get the loader module and indicate the modules that
   //  will be loaded by hand below
   //
   const {Loader} = require('mathjax-full/js/components/loader.js');
   Loader.preLoad(
     'loader', 'startup',
     'core',
     'input/tex-base',
     '[tex]/ams',
     '[tex]/newcommand',
     '[tex]/configmacros',
     'output/svg', 'output/svg/fonts/tex.js',
     'ui/menu'
   );

   //
   // Load the components that we want to combine into one component
   //   (the ones listed in the preLoad() call above)
   //
   require('mathjax-full/components/src/core/core.js');

   require('mathjax-full/components/src/input/tex-base/tex-base.js');
   require('mathjax-full/components/src/input/tex/extensions/ams/ams.js');
   require('mathjax-full/components/src/input/tex/extensions/newcommand/newcommand.js');
   require('mathjax-full/components/src/input/tex/extensions/configmacros/configmacros.js');

   require('mathjax-full/components/src/output/svg/svg.js');
   require('mathjax-full/components/src/output/svg/fonts/tex/tex.js');

   require('mathjax-full/components/src/ui/menu/menu.js');

   //
   // Update the configuration to include any updated values
   //
   const {insert} = require('mathjax-full/js/util/Options.js');
   insert(MathJax.config, {
     tex: {
       packages: {'[+]': ['ams', 'newcommand', 'configmacros']}
     }
   });

   //
   // Loading this component will cause all the normal startup
   //   operations to be performed
   //
   require('mathjax-full/components/src/startup/startup.js');


This loads the various components that we want to include in the
combined component, including the standard startup code so that the
usual startup process is included.


The Webpack Configuration
.........................

Next, create the file ``webpack.config.js`` that includes the
following:

.. code-block:: javascript

   const PACKAGE = require('mathjax-full/components/webpack.common.js');

   module.exports = PACKAGE(
     'custom-mathjax',                     // the name of the package to build
     '../node_modules/mathjax-full/js',    // location of the mathjax library
     [],                                   // packages to link to
     __dirname,                            // our directory
     '.'                                   // where to put the packaged component
   );

This file gives the name that will be used for this component
(``custom-mathjax`` in this case), a pointer to where the MathJax
javascript code is to be found (adjust this to suit your setup), an
array of components that we assume are already loaded when this one is
loaded (none in this case), the directory name we are working in
(always ``__dirname``), and the directory where we want the final
packaged component to go (the default is the
``mathjax-full/es5`` directory, but we set it to the directory
containing the source files, and the component will end with
``.min.js``).

Most of the real work is done by the
``mathjax-full/components/webpack.common.js`` file, which is included in
the first line here.


Building the Component
......................

Once these two files are ready, you are ready to build the component.
First, make sure that you have obtained the needed tools as described
in :ref:`getting-ready` above.  Then you should be able to use the
command

.. code-block:: shell

   node ../node_modules/mathjax-full/components/bin/makeAll

to process your custom build.  You should end up with a file
``custom-mathjax.min.js`` in the directory with the other files.  If
you put this on your web server, you can load it into your web pages
in place of loading MathJax from a CDN.  This file will include all
that you need to run MathJax on your pages.  Just add

.. code-block:: html

   <script src="custom-mathjax.min.js" id="MathJax-script" async></script>

to your page and you should be in business (adjust the URL to point to
wherever you have placed the ``custom-mathjax.min.js`` file).

Configuring the Component
.........................

Note that you can still include a  ``MathJax = {...}`` definition in
your web page before loading this custom MathJax build if you want to
customize the configuration for a specific page.  You could also
include configuration within the component itself, as we did for the
TeX ``packages`` array.  This will override any page-provided
configuration, however, so if you want to provide non-standard
defaults that can still be overridden in the page, use

.. code-block:: javascript

   //
   // Update the configuration to include any updated values
   //
   const {insert} = require('mathjax-full/js/util/Options.js');
   insert(MathJax.config, {tex: {packages: {'[+]': ['ams', 'newcommand', 'configmacros']}}}, false);
   MathJax.config = insert({
     // your default options here
   }, MathJax.config);

which will update the TeX packages, and then merge the user's
configuration options into your defaults and set
:attr:`MathJax.config` to the combined options.


Fonts for CommonHTML
....................

If you include the CommonHTML output jax in your custom build, the
actual web fonts are not included in the webpacked file, so you will
probably need to include `fontURL` in the `chtml`
block of your configuration and have it provide a URL where the fonts
can be found.  They are in the
``mathjax-full/es5/output/chtml/fonts/woff-v2`` directory, and
you can put them on your server, or simply point `fontURL` to one of
the CDN directories for the fonts.
 

.. _custom-extension:

A Custom Extension
------------------

Making a custom extension is very similar to making a custom combined
component.  The main difference is that the extension may rely on
other components, so you need to tell the build system about that so
that it doesn't include the code from those other components.  You
also don't load the extension file directly (like you do the combined
component above), but instead include it in the `load` array of the
`loader` configuration block, and MathJax loads it itself, as
discussed below.

For this example, we make a custom TeX extension that defines new TeX
commands implemented by javascript functions.

The commands implemented here provide the ability to generate
MathML token elements from within TeX by hand. This allows more
control over the content and attributes of the elements produced. The
macros are ``\mi``, ``\mo``, ``\mn``, ``\ms``, and ``\mtext``, and
they each take an argument that is the text to be used as the content
of the corresponding MathML element. The text is not further processed
by TeX, but the extension does convert sequences of the form
``\uNNNN`` (where the ``N`` are hexadecimal digits) into the
corresponding unicode character; e.g., ``\mi{\u2460}`` would produce
U+2460, a circled digit 1, as the content of an ``mi`` element.


The Extension File
..................

After downloading a copy of MathJax as described in the section on
:ref:`getting-ready`, create a directory for the extension named
``custom-extension`` and ``cd`` to it.  Then create the file ``mml.js``
containing the following text:

.. code-block:: javascript

    import {Configuration}  from '../node_modules/mathjax-full/js/input/tex/Configuration.js';
    import {CommandMap} from '../node_modules/mathjax-full/js/input/tex/SymbolMap.js';
    import TexError from '../node_modules/mathjax-full/js/input/tex/TexError.js';

    /**
     * This function prevents multi-letter mi elements from being
     *   interpreted as TEXCLASS.OP
     */
    function classORD(node) {
       this.getPrevClass(node);
       return this;
    }

    /**
     *  Convert \uXXXX to corresponding unicode characters within a string
     */
    function convertEscapes(text) {
       return text.replace(/\\u([0-9A-F]{4})/gi, (match, hex) => String.fromCharCode(parseInt(hex,16)));
    }

    /**
     * Allowed attributes on any token element other than the ones with default values
     */
    const ALLOWED = {
       style: true,
       href: true,
       id: true,
       class: true
    };

    /**
     * Parse a string as a set of attribute="value" pairs.
     */
    function parseAttributes(text, type) {
       const attr = {};
       if (text) {
          let match;
          while ((match = text.match(/^\s*((?:data-)?[a-z][-a-z]*)\s*=\s*(?:"([^"]*)"|(.*?))(?:\s+|,\s*|$)/i))) {
             const name = match[1], value = match[2] || match[3]
             if (type.defaults.hasOwnProperty(name) || ALLOWED.hasOwnProperty(name) || name.substr(0,5) === 'data-') {
                attr[name] = convertEscapes(value);
             } else {
                throw new TexError('BadAttribute', 'Unknown attribute "%1"', name);
             }
             text = text.substr(match[0].length);
          }
          if (text.length) {
             throw new TexError('BadAttributeList', 'Can\'t parse as attributes: %1', text);
          }
       }
       return attr;
    }

    /**
     *  The mapping of control sequence to function calls
     */
    const MmlMap = new CommandMap('mmlMap', {
       mi: ['mmlToken', 'mi'],
       mo: ['mmlToken', 'mo'],
       mn: ['mmlToken', 'mn'],
       ms: ['mmlToken', 'ms'],
       mtext: ['mmlToken', 'mtext']
    }, {
       mmlToken(parser, name, type) {
          const typeClass = parser.configuration.nodeFactory.mmlFactory.getNodeClass(type);
          const def = parseAttributes(parser.GetBrackets(name), typeClass);
          const text = convertEscapes(parser.GetArgument(name));
          const mml = parser.create('node', type, [parser.create('text', text)], def);
          if (type === 'mi') mml.setTeXclass = classORD;
          parser.Push(mml);
       }
    });

    /**
     * The configuration used to enable the MathML macros
     */
    const MmlConfiguration = Configuration.create(
       'mml', {handler: {macro: ['mmlMap']}}
    );


The comments explain what this code is doing.  The main piece needed
to make it a TeX extension is the ``Configuration`` created in the
last few lines.  It creates a TeX package named ``mml`` that handles
macros through a ``CommandMap`` named ``mmlMap`` that is defined just
above it. That command map defines five macros described at the
beginning of this section, each of which is tied to a method named
``mmlToken`` in the object that follows, passing it the name of the
MathML token element to create.  The ``mmlToken`` method is the one
that is called by the TeX parser when the ``\mi`` and other macros are
called.  It gets the argument to the macro, and any optional
attributes, and creates the MathML element with the attributes, using
the argument as the text of the element.


The Webpack Configuration
.........................

Next, create the file ``webpack.config.js`` that includes the
following:

.. code-block:: javascript

   const PACKAGE = require('mathjax-full/components/webpack.common.js');

   module.exports = PACKAGE(
     'mml',                                // the name of the package to build
     '../node_modules/mathjax-full/js',    // location of the mathjax library
     [                                     // packages to link to
        'components/src/core/lib',
        'components/src/input/tex-base/lib'
     ],
     __dirname,                            // our directory
     '.'                                   // where to put the packaged component
   );

This file gives the name that will be used for this component (``mml``
in this case), a pointer to where the MathJax javascript code is to be
found (adjust this to suit your setup), an array of components that we
assume are already loaded when this one is loaded (the ``core`` and
``tex-base`` components in this case), the directory name we are
working in (always ``__dirname``), and the directory where we want the
final packaged component to go (the default is the
``mathjax-full/es5`` directory, but we set it to the directory
containing the source files, and the component will end with
``.min.js``).

Most of the real work is done by the
``mathjax-full/components/webpack.common.js`` file, which is included in
the first line here.


Building the Extension
......................

Once these two files are ready, you are ready to build the component.
First, make sure that you have obtained the needed tools as described
in :ref:`getting-ready` above.  Then you should be able to use the
command

.. code-block:: shell

   node ../node_modules/mathjax-full/components/bin/makeAll

to process your custom build.  You should end up with a file
``mml.min.js`` in the directory with the other files.  If
you put this on your web server, you can load it as a component by
putting it in the ``load`` array of the ``loader`` block of your
configuration, as descrinbed below.


Loading the Extension
.....................

To load your custom extension, you will need to tell MathJax where it
is located, and include it in the file to be loaded on startup.
MathJax allows you to define paths to locations where your extensions
are stored, and then you can refer to the extensions in that location
by using a prefix that represents that location.  MathJax has a
pre-defined prefix, ``mathjax`` that is the default prefix when none
is specified explicitly, and it refers to the location where the main
MathJax file was loaded (e.g., the file ``tex-svg.js``, or
``startup.js``).

You can define your own prefix to point to the location of your
extensions by using the ``paths`` object in the ``loader`` block of
your configuration.  In our case (see code below), we add a ``custom``
prefix, and have it point to the URL of our extension (in this case,
the same directory as the HTML file that loads it, represented by the
URL ``.``).  We use the ``custom`` prefix to specify
``[custom]/mml.min.js`` in the ``load`` array so that our extension
will be loaded.

Finally, we add the ``mml`` extension to the ``packages`` array in the
``tex`` block of our configuration via the special notation ``{'[+]':
[...]}`` that tells MathJax to append the given array to the existing
``packages`` array that is already in the configuration by default.
So this uses all the packages that were already specified, plus our
new ``mml`` package that is defined in our extension.

The configuration and loading of MathJax now looks something like this:

.. code-block:: html

   <script>
   MathJax = {
      loader: {
         load: ['[custom]/mml.min.js'],
         paths: {custom: '.'}
      },
      tex: {
         packages: {'[+]': ['mml']}
      }
   };
   </script>
   <script type="text/javascript" id="MathJax-script" async
     src="https://cdn.jsdelivr.net/npm/mathjax@3/es5/tex-chtml.js">
   </script>

You should change the ``custom: '.'`` line to point to the actual URL for
your server.

This example loads the ``tex-chtml.js`` combined component, so the TeX
input is already loaded when our extension is loaded.  If you are
using ``startup.js`` instead, and including ``input/tex`` in the
``load`` array, you will need to tell MathJax that your extension
depends on the ``input/tex`` extension so that it waits to load your
extension until after the TeX input jax is loaded.  To do that, add a
``dependencies`` block to your configuration like the following:

.. code-block:: html

   <script>
   MathJax = {
      loader: {
         load: ['input/tex', 'output/chtml', '[custom]/mml.min.js'],
         paths: {custom: '.'},
         dependencies: {'[custom]/mml.min.js': ['input/tex']}
      },
      tex: {
         packages: {'[+]': ['mml']}
      }
   };
   </script>
   <script type="text/javascript" id="MathJax-script" async
     src="https://cdn.jsdelivr.net/npm/mathjax@3/es5/startup.js">
   </script>

This example can be seen live in the `MathJax 3 demos
<https://github.com/mathjax/MathJax-demos-web/blob/master/custom-tex-extension/mml.md>`__
repository.

-----


.. _custom-build:

A Custom MathJax Build
======================

It is possible to make a completely custom build of MathJax that is
not based on other MathJax components at all.  The following example
shows how to make a custom build that provides a function for
obtaining the speech string for a given TeX math string.  This example
is similar to one in the `MathJax3 demos
<https://github.com/mathjax/MathJax-demos-web/blob/master/custom-build/custom-mathjax.md>`__
repository.

After downloading a copy of MathJax as described in the section on
:ref:`getting-ready`, create a directory called ``mathjax-speech`` and
``cd`` into it.


The Custom Build File
---------------------

Create the custom MathJax file named ``mathjax-speech.js`` containing
the following:

.. code-block:: javascript

   //
   //  Load the desired components
   //
   const mathjax     = require('mathjax-full/js/mathjax.js').mathjax;      // MathJax core
   const TeX         = require('mathjax-full/js/input/tex.js').TeX;        // TeX input
   const MathML      = require('mathjax-full/js/input/mathml.js').MathML;  // MathML input
   const browser     = require('mathjax-full/js/adaptors/browserAdaptor.js').browserAdaptor; // browser DOM
   const Enrich      = require('mathjax-full/js/a11y/semantic-enrich.js').EnrichHandler;     // semantic enrichment
   const Register    = require('mathjax-full/js/handlers/html.js').RegisterHTMLHandler;      // the HTML handler
   const AllPackages = require('mathjax-full/js/input/tex/AllPackages').AllPackages;         // all TeX packages
   const STATE       = require('mathjax-full/js/core/MathItem.js').STATE;

   const sreReady    = require('mathjax-full/js/a11y/sre.js').sreReady();    // SRE promise;

   //
   //  Register the HTML handler with the browser adaptor and add the semantic enrichment
   //
   Enrich(Register(browser()), new MathML());

   //
   //  Initialize mathjax with a blank DOM.
   //
   const html = MathJax.document('', {
      sre: {
        speech: 'shallow',           // add speech to the enriched MathML
      },
      InputJax: new TeX({
         packages: AllPackages.filter((name) => name !== 'bussproofs'),  // Bussproofs needs an output jax
         macros: {require: ['', 1]}      // Make \require a no-op since all packages are loaded
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
         const math = new html.options.MathItem(tex, inputJax, display);
         math.convert(html, STATE.CONVERT);
         return math.root.attributes.get('data-semantic-speech') || 'no speech text generated';
      }
   }

   //
   // Perform ready function, if there is one
   //
   if (CONFIG.ready) {
      sreReady.then(CONFIG.ready);
   }

Unlike the component-based example above, this custom build calls on
the MathJax source files directly.  The ``require`` commands at the
beginning of the file load the needed objects, and the rest of the
code instructs MathJax to create a ``MathDocument`` object for
handling the conversions that we will be doing (using a TeX input
jax), and then defines a global ``MathJax`` object that has the
:meth:`tex2speech()` function that our custom build offers.

   
The Webpack Configuration
-------------------------

Next, create the file ``webpack.config.js`` that includes the
following:

.. code-block:: javascript

   const PACKAGE = require('mathjax-full/components/webpack.common.js');

   module.exports = PACKAGE(
     'mathjax-speech',                     // the name of the package to build
     '../node_modules/mathjax-full/js',    // location of the mathjax library
     [],                                   // packages to link to
     __dirname,                            // our directory
     '.'                                   // where to put the packaged component
   );

This file gives the name that will be used for this component
(``mathjax-speech`` in this case), a pointer to where the MathJax
javascript code is to be found (adjust this to suit your setup), an
array of components that we assume are already loaded when this one is
loaded (none, since this is a self-contained build), the directory
name we are working in (always ``__dirname``), and the directory where
we want the final packaged component to go (the default is the
``mathjax-full/es5`` directory, but we set it to the directory
containing the source files, and the component will end with
``.min.js``).

Most of the real work is done by the
``mathjax-full/components/webpack.common.js`` file, which is included in
the first line here.


Building the Custom File
------------------------

Once these two files are ready, you are ready to make your custom
build.  First, make sure that you have obtained the needed tools as
described in :ref:`getting-ready` above.  Then you should be able to
use the command

.. code-block:: shell

   node ../node_modules/mathjax-full/components/bin/makeAll

to process your custom build.  You should end up with a file
``mathjax-speech.min.js`` in the directory with the other files.  it
will contain just the parts of MathJax that are needed to implement
the :meth:`MathJax.tex2speech()` command defined in the file above.
Note that this is not enough to do normal typesetting (for example, no
output jax has been included), so this is a minimal file for producing
the speech strings from TeX input.


Using the File in a Web Page
----------------------------

If you put the ``mathjax-speech.min.js`` file on your web server, you
can load it into your web pages in place of loading MathJax from a
CDN.  This fill will include all that you need to use the
:meth:`MathJax.tex2speech()` command in your pages.  Just add

.. code-block:: html

   <script src="mathjax-speech.min.js" id="MathJax-script" async></script>

to your page (adjust the URL to point to wherever you have placed the
``custom-mathjax.min.js`` file).  Then you can use javascript calls
like

.. code-block:: javascript

   const speech = MathJax.tex2speech('\\sqrt{x^2+1}', true);

to obtain a text string that contains the speech text for the square
root given in the TeX string.

Note, however, that the Speech-Rule Engine (SRE) that underlies the
speech generation loads asynchronously, so you have to be sure that
SRE is ready before you make such a call.  The ``mathjax-speech.js``
file provides two ways of handling the synchronization with SRE.  The
first is to use the global ``MathJax`` variable to include a
:meth:`ready()` function that is called when SRE is ready.  For
example,

.. code-block:: javascript

   window.speechReady = false;
   window.MathJax = {
      ready: () => {
         window.speechReady = true;
      }
   };

would set the global variable :data:`speechReady` to true when SRE is
ready to run (so you can check that value to see if speech can be
generated yet).  A more sophisticated :meth:`ready()` function could
allow you to queue translations to be performed, and when SRE is ready,
it performs them.  Alternatively, if you have a user interface that
allows users to transform TeX expressions, for example, then you could
initially disable to buttons that trigger speech generation, and use
the :meth:`ready()` function to enable them.  That way, the user can't
ask for speech translation until it can be produced.

The second method of synchronizing with SRE is through the fact that
the code sets :attr:`MathJax.sreReady` to a promise that is resolves
when SRE is ready, which you can use to make sure SRE is ready when you
want to do speech generation.  For example

.. code-block:: javascript

   function showSpeech(tex, display = false) {
      MathJax.sreReady = MathJax.sreReady.then(() => {
        const speech = MathJax.tex2speech(tex, display);
        const output = document.getElementById('speech');
        output.innerHTML = '';
        output.appendChild(document.createTextNode(speech));
      });
   }

provides a function that lets you specify a TeX string to translate,
and then (asynchronously) generates the speech for it and displays it
as the contents of the DOM element with ``id="speech"`` in the page.

|-----|
