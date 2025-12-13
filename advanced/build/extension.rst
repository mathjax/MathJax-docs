
.. _custom-extension:

==================
A Custom Extension
==================

Making a custom extension is very similar to making a custom combined
component.  The main difference is that the extension may rely on
other components, so you need to tell the build system about that so
that it doesn't include the code from those other components.  You
also don't load the extension file directly (like you do the combined
component above), but instead include it in the :data:`load` array of the
:data:`loader` configuration block, and MathJax loads it itself, as
discussed below.

For this example, we make a custom TeX extension that defines new TeX
commands implemented by javascript functions.

The commands implemented here provide the ability to generate MathML
token elements from within TeX by hand. This allows more control over
the content and attributes of the elements produced. The macros are
``\mi``, ``\mo``, ``\mn``, ``\ms``, and ``\mtext``, and they each take
an argument that is the text to be used as the content of the
corresponding MathML element. The text is not further processed by
TeX, but the extension does convert sequences of the form ``\UNNNN``
or ``\U{NNNN}`` (where the ``N`` are hexadecimal digits, exactly four
in the first case, or between 1 and 6 in the second) into the
corresponding unicode character; e.g., ``\mi{\U2460}`` would produce
U+2460, a circled digit 1, as the content of an ``mi`` element.

-----

The Extension File
==================

After downloading a copy of MathJax as described in the section on
:ref:`getting-ready`, create a directory for the extension named
``custom-extension`` and ``cd`` to it.  Then create the file ``mml.js``
containing the following text:

.. code-block:: javascript
   :caption: mml.js
   :linenos:

   import {HandlerType, ConfigurationType} from '@mathjax/src/js/input/tex/HandlerTypes.js';
   import {Configuration}  from '@mathjax/src/js/input/tex/Configuration.js';
   import {CommandMap} from '@mathjax/src/js/input/tex/TokenMap.js';
   import TexError from '@mathjax/src/js/input/tex/TexError.js';
   import {replaceUnicode} from '@mathjax/src/js/util/string.js';
   import {VERSION} from '@mathjax/src/js/components/version.js';
   import {Loader} from '@mathjax/src/js/components/loader.js';

   /**
    * Check that we are loaded from the right version of MathJax
    */
   Loader.checkVersion('[custom]/mml.min.js', VERSION, 'tex-extension');

   /**
    * This function prevents multi-letter mi elements from being
    *   interpreted as TEXCLASS.OP
    */
   function classORD(node) {
     this.getPrevClass(node);
     return this;
   }

   /**
    * Allowed attributes on any token element other than the ones with default values
    */
   const ALLOWED = new Set(['style', 'href', 'id', 'class']);

   /**
    * Parse a string as a set of attribute="value" pairs.
    */
   function parseAttributes(text, type) {
     const attr = {};
     if (text) {
       let match;
       while ((match = text.match(/^\s*((?:data-)?[a-z][-a-z]*)\s*=\s*(?:"([^"]*)"|(.*?))(?:\s+|,\s*|$)/i))) {
         const name = match[1];
         const value = match[2] || match[3];
         if (Object.hasOwn(type.defaults, name) || ALLOWED.has(name) || name.substr(0,5) === 'data-') {
           attr[name] = replaceUnicode(value);
         } else {
           throw new TexError('BadAttribute', 'Unknown attribute "%1"', name);
         }
         text = text.substr(match[0].length);
       }
       if (text.length) {
         throw new TexError('BadAttributeList', "Can't parse as attributes: %1", text);
       }
     }
     return attr;
   }

   /**
    * Create a MathML token element of the given type
    */
   function mmlToken(parser, name, type) {
     const typeClass = parser.configuration.nodeFactory.mmlFactory.getNodeClass(type);
     const def = parseAttributes(parser.GetBrackets(name), typeClass);
     const text = replaceUnicode(parser.GetArgument(name));
     const mml = parser.create('token', type, def, text);
     if (type === 'mi') {
       mml.setTeXclass = classORD;
     }
     parser.Push(mml);
   }

   /**
    *  The mapping of control sequence to function calls
    */
   const MmlMap = new CommandMap('mmlMap', {
     mi: [mmlToken, 'mi'],
     mo: [mmlToken, 'mo'],
     mn: [mmlToken, 'mn'],
     ms: [mmlToken, 'ms'],
     mtext: [mmlToken, 'mtext']
   });

   /**
    * The configuration used to enable the MathML macros
    */
   const MmlConfiguration = Configuration.create(
     'mml', {
       [ConfigurationType.HANDLER]: {
         [HandlerType.MACRO]: ['mmlMap']
       }
     }
   );

The comments explain what this code is doing.  The main piece needed
to make it a TeX extension is the ``Configuration`` created in the
last few lines.  It creates a TeX package named ``mml`` that handles
macros through a ``CommandMap`` named ``mmlMap`` that is defined just
above it. That command map defines five macros described at the
beginning of this section, each of which is tied to a function named
``mmlToken`` defined previously and the name of the MathML token
element to create.  The ``mmlToken`` function is the one that is
called by the TeX parser when the ``\mi`` and other macros are called;
it gets the argument to the macro from the TeX string, and any
optional attributes, and creates the MathML element with those
attributes, using the argument as the text of the element.

.. note::

   This file uses ES6 ``import`` commands to load the MathJax modules.
   It is possible to use ES5 ``require()`` calls instead, if you wish.
   For example,

   .. code-block:: javascript

      import {Configuration}  from '@mathjax/src/js/input/tex/Configuration.js';

   could be replaced by

   .. code-block:: javascript

      const {Configuration}  = require('@mathjax/src/js/input/tex/Configuration.js');

   and similarly for the other ``import`` commands.  Note that the
   MathJax ``package.json`` file is set up to route
   ``@mathjax/src/js`` to the MathJax ``mjs`` directory when used in
   an ``import`` command, and to the ``cjs`` directory when used in a
   ``require()`` statement, so you can use the same path in either
   case.  Similarly ``@mathjax/src/components/js`` maps either to the
   ``components/mjs`` or ``components/cjs`` directory based on whether
   ``import`` or ``require()`` is used.
   

The Extension Configuration File
================================

Next, create a file ``config.json`` that includes the
following:

.. code-block:: json
   :caption: config.json

   {
     "webpack": {
       "name": "mml",
       "libs": [
         "components/js/core/lib",
         "components/js/startup/lib",
         "components/js/input/tex-base/lib"
       ],
       "dist": "."
     }
   }

This file gives the name that will be used for this component (``mml``
in this case), an array of components that we assume are already
loaded when this one is loaded (the ``core``, ``startup``, and
``tex-base`` components in this case), and the directory where we want
the final packaged extension to go (``"."`` means the directory
containing the ``config.json`` file).  When the directory is the same
as the one containing the extension file, the packed extension file
will end in ``.min.js`` rather than just ``.js``.

Most of the real work is done by the
``@mathjax/src/components/webpack.config.mjs`` file, which will be
called automatically by the commands in the following section.


Building the Extension
======================

Once these two files are ready, you are ready to build the component.
First, make sure that you have obtained the needed tools as described
in :ref:`getting-ready` above.  Then you should be able to use the
command

.. code-block:: shell

   node ../node_modules/@mathjax/src/components/bin/makeAll

to process your custom build.  You should end up with a file
``mml.min.js`` in the directory with the other files.  If
you put this on your web server, you can load it as a component by
putting it in the :data:`load` array of the :data:`loader` block of your
configuration, as described in the next section.

.. note::

   If you have changed the ``import`` commands to ``require()``, then
   you will need to use the command

   .. code-block:: shell

      node ../node_modules/@mathjax/src/components/bin/makeAll --cjs

   in order to tell ``makeAll`` to use MathJax's
   ``webpack.config.cjs`` file rather than the ``webpack.config.mjs``
   one.

Loading the Extension
=====================

To load your custom extension, you will need to tell MathJax where it
is located, and include it in the list of files to be loaded on
startup.  MathJax allows you to define paths to locations where your
extensions are stored, and then you can refer to the extensions in
that location by using a prefix that represents that location.
MathJax has a pre-defined prefix, ``mathjax`` that is the default
prefix when none is specified explicitly, and it refers to the
location where the main MathJax file was loaded (e.g., the file
``tex-svg.js``, or ``startup.js``).

You can define your own prefix to point to the location of your
extensions by using the :data:`paths` object in the :data:`loader`
block of your configuration.  In our case (see code below), we add a
``custom`` prefix, and have it point to the URL of our extension (in
this case, the same directory as the HTML file that loads it,
represented by the URL ``.``).  We use the ``custom`` prefix to
specify ``[custom]/mml.min.js`` in the :data:`load` array so that our
extension will be loaded.

Finally, we add the ``mml`` extension to the :data:`packages` array in
the :data:`tex` block of our configuration via the special notation
``{'[+]': [...]}`` that tells MathJax to append the given array to the
existing :data:`packages` array that is already in the configuration by
default.  So this uses all the packages that were already specified,
plus our new ``mml`` package that is defined in our extension.

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
   <script defer src="https://cdn.jsdelivr.net/npm/mathjax@4/tex-chtml.js"></script>

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
   <script defer src="https://cdn.jsdelivr.net/npm/mathjax@4/startup.js"></script>

This example can be seen live in the `MathJax web demos
<https://github.com/mathjax/MathJax-demos-web/blob/master/custom-tex-extension/mml.html.md>`__
repository.

|-----|
