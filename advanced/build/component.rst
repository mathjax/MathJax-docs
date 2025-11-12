
.. _custom-combined:

===========================
A Custom Combined Component
===========================

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

-----

The Component File
==================

Create a javascript file to house the component and call it
``custom-mathjax.js``.  The file should contain the following code (we
assume here that you used ``npm`` or ``pnpm`` to install MathJax.  If
not, you may need to adjust the locations in the :func:`import`
commands).

.. code-block:: javascript
   :caption: custom-mathjax.js
   :linenos:

   import {startup} from '@mathjax/src/components/js/startup/init.js';
   import {Loader} from '@mathjax/src/js/components/loader.js';
   import {insert} from '@mathjax/src/js/util/Options.js';

   //
   // Load the components that we want to combine into one component
   //   (listed in the preLoaded() call below)
   //
   import '@mathjax/src/components/js/core/core.js';

   import '@mathjax/src/components/js/input/tex-base/tex-base.js';
   import '@mathjax/src/components/js/input/tex/extensions/ams/ams.js';
   import '@mathjax/src/components/js/input/tex/extensions/newcommand/newcommand.js';
   import '@mathjax/src/components/js/input/tex/extensions/configmacros/configmacros.js';
   import '@mathjax/src/components/js/ui/menu/menu.js';

   //
   // Load the output jax and the code for loading its font
   //
   import {loadFont} from '@mathjax/src/components/js/output/svg/svg.js';

   //
   // Load speech-generation code
   //
   import '@mathjax/src/components/js/a11y/util.js';

   //
   // Mark the components that you have loaded
   //
   Loader.preLoaded(
     'loader', 'startup',
     'core',
     'input/tex-base',
     '[tex]/ams',
     '[tex]/newcommand',
     '[tex]/configmacros',
     'output/svg',
     'ui/menu'
   );

   //
   // Update the configuration's mathjax and sre paths and add the loaded TeX packages
   //
   insert(MathJax.config, {
     loader: {paths: {mathjax: 'https://cdn.jsdelivr.net/npm/mathjax@4'}},
     options: {worker: {path: https://cdn.jsdelivr.net/npm/mathjax@4/sre'}},
     tex: {
       packages: {'[+]': ['ams', 'newcommand', 'configmacros']}
     }
   });

   //
   // Mark the MathJax version being used for this combined configuration
   //
   Loader.saveVersion('custom-mathjax.js');

   //
   // Do the normal startup operations
   //
   loadFont(startup, true);


This loads the various components that we want to include in the
combined component, including the standard startup code so that the
usual startup process is included.

.. note::

   This file uses ES6 ``import`` commands to load the MathJax modules.
   It is possible to use ES5 ``require()`` calls instead, if you wish.
   For example,

   .. code-block:: javascript

      import {startup} from '@mathjax/src/components/js/startup/init.js';

   could be replaced by

   .. code-block:: javascript

      const {startup} = require('@mathjax/src/components/js/startup/init.js');

   and similarly for the other ``import`` commands.  Note that the
   MathJax ``package.json`` file is set up to route
   ``@mathjax/src/js`` to the MathJax ``mjs`` directory when used in
   an ``import`` command, and to the ``cjs`` directory when used in a
   ``require()`` statement, so you can use the same path in either
   case.  Similarly ``@mathjax/src/components/js`` maps either to the
   ``components/mjs`` or ``components/cjs`` directory based on whether
   ``import`` or ``require()`` is used.

Line 25 causes the accessibility tools to be included in this combined
component. For situations where these are not needed, leaving out
lines 22 through 25 would mean that they would not be bundled into
this component; but because the `ui/menu` component is included, its
default menu settings would cause the accessibility components to be
loaded individually at run time.  To prevent that, you would need to
change lines 46 to 50 to

.. code-block:: javascript

   insert(MathJax.config, {
     loader: {paths: {mathjax: 'https://cdn.jsdelivr.net/npm/mathjax@4'}},
     tex: {
       packages: {'[+]': ['ams', 'newcommand', 'configmacros']}
     },
     options: {
       enableSpeech: false,
       enableBraille: false,
       menuOptions: {
         settings: {
           enrich: false,
         }
       }
     },
   }, false);

This turns off semantic enrichment, and disables speech and Braille
generation.

Lines 45 and 56 hard codes the path to the location where MathJax
components are stored and where to get the webworker code for speech
generation; these would override those settings if they were part
of the MathJax configuration set by the page that loads this combined
component.  Similarly, the accessibility settings in the code snipped
above would override any settings made in the web page, and the three
TeX packages would always be included, even if the MathJax
configuration from the apge explicitly removed them.  This is because
the changes made by the ``insert()`` command are made *after* the page
configuration is moved to :data:`MathJax.config` (which occurs during
the first ``import`` at line 1), so these override the page settings.

It is possible to not overwrite these values, though it requires an
extra configuration file that you import before the other ``import``
commands.  (In the case where you are using ``require()`` rather than
``import``, you can put this code above the first `require()` in
`custom-mathjax.js` rather than using a separate file.)

If you create the file ``custom-mathjax-config.js`` given below:

.. code-block:: javascript
   :caption: custom-mathjax-config.js
   :linenos:

   import {insert} from '@mathjax/src/js/util/Options.js';

   const GLOBAL = typeof window === 'undefined' ? global : window;

   GLOBAL.MathJax = insert({
     loader: {
       paths: {
         mathjax: 'https://cdn.jsdelivr.net/npm/@mathjax@4',
       }
     },
     tex: {
       packages: ['base', 'ams', 'newcommand', 'configmacros'],
     },
     //
     // Uncomment this options block if you are NOT including the
     // accessibility extensions in the combined component.
     //
     /*
     options: {
       enableSpeech: false,
       enableBraille: false,
       menuOptions: {
         settings: {
           enrich: false,
         }
       },
     },
     */
   }, GLOBAL.MathJax || {}, false);

Here, we obtain the :meth:`insert()` function from the
``util/Options`` file, which combines user configurations with default
ones, and use it to set the global :data:`MathJax` configuration
variable to our default configuration with the user's :data:`MathJax`
values, if any, merged in.  We don't have to set the
:data:`worker.path` in this case, since it is determined from the
``mathjax`` path that we have already set.  (We needed to do it above
because the worker path was set using the original default value of
the ``mathjax`` path, not the new on at line 45.)

If you are removing the accessibility extensions from the combined
component (by not importing ``components/js/a11y/util.js``), uncomment
the :data:`options` block of the configuration to prevent the menu
extension from loading them individually at run time.

Once this file is created, import it before any other imports, and
remove the original lines 41 to 50, along with the import command that
obtains the ``insert`` function.  That should leave you with the following:

.. code-block:: javascript
   :caption: custom-mathjax.js
   :linenos:

   import './custom-mathjax-config.js';
   import {startup} from '@mathjax/src/components/js/startup/init.js';
   import {Loader} from '@mathjax/src/js/components/loader.js';

   //
   // Load the components that we want to combine into one component
   //   (listed in the preLoaded() call below)
   //
   import '@mathjax/src/components/js/core/core.js';

   import '@mathjax/src/components/js/input/tex-base/tex-base.js';
   import '@mathjax/src/components/js/input/tex/extensions/ams/ams.js';
   import '@mathjax/src/components/js/input/tex/extensions/newcommand/newcommand.js';
   import '@mathjax/src/components/js/input/tex/extensions/configmacros/configmacros.js';
   import '@mathjax/src/components/js/ui/menu/menu.js';

   //
   // Load the output jax and the code for loading its font
   //
   import {loadFont} from '@mathjax/src/components/js/output/svg/svg.js';

   //
   // Load speech-generation code
   //
   import '@mathjax/src/components/js/a11y/util.js';

   //
   // Mark the components that you have loaded
   //
   Loader.preLoaded(
     'loader', 'startup',
     'core',
     'input/tex-base',
     '[tex]/ams',
     '[tex]/newcommand',
     '[tex]/configmacros',
     'output/svg',
     'ui/menu'
   );

   //
   // Mark the MathJax version being used for this combined configuration
   //
   Loader.saveVersion('custom-mathjax.js');

   //
   // Do the normal startup operations
   //
   loadFont(startup, true);

This will allow the page that loads your combined configuration file
to have full control over the MathJax configuration.


The Component Configuration File
================================

Next, create a file ``config.json`` that includes the
following:

.. code-block:: json
   :caption: config.json

   {
     "webpack": {
       "name": "custom-mathjax",
       "dist": "."
     }
   }

This file gives the name that will be used for this component
(``custom-mathjax`` in this case), and where to put the webpacked file
(``"."`` means the directory containing the ``config.json`` file).
When the directory is the same as the one containing the component file,
the packed component file will end in ``.min.js`` rather than just
``.js``.

Most of the real work is done by the
``@mathjax/src/components/webpack.config.mjs`` file, which will be
called automatically by the commands in the following section.


Building the Component
======================

Once these files are created, you are ready to build the component.
First, make sure that you have obtained the needed tools as described
in :ref:`getting-ready` above.  Then you should be able to use the
command

.. code-block:: shell

   node ../node_modules/@mathjax/src/components/bin/makeAll

to process your custom build.  You should end up with a file
``custom-mathjax.min.js`` in the directory with the other files.

.. note::

   If you have changed the ``import`` commands to ``require()``, then
   you will need to use the command

   .. code-block:: shell

      node ../node_modules/@mathjax/src/components/bin/makeAll --cjs

   in order to tell ``makeAll`` to use MathJax's
   ``webpack.config.cjs`` file rather than the ``webpack.config.mjs``
   one.

If you put the ``custom-mathjax.min.js`` file somewhere on your web
server, you can load it into your web pages in place of loading
MathJax from a CDN.  This file will include all that you need to run
MathJax on your pages.  Just add

.. code-block:: html

   <script defer src="custom-mathjax.min.js"></script>

to your page and you should be in business (adjust the URL to point to
wherever you have placed the ``custom-mathjax.min.js`` file).


|-----|
