
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

   import {startup} from '@mathjax/src/components/src/startup/init.js';
   import {Loader} from '@mathjax/src/js/components/loader.js';
   import {insert} from '@mathjax/src/js/util/Options.js';

   //
   // Load the components that we want to combine into one component
   //   (the ones listed in the preLoad() call below)
   //
   import '@mathjax/src/components/src/core/core.js';

   import '@mathjax/src/components/src/input/tex-base/tex-base.js';
   import '@mathjax/src/components/src/input/tex/extensions/ams/ams.js';
   import '@mathjax/src/components/src/input/tex/extensions/newcommand/newcommand.js';
   import '@mathjax/src/components/src/input/tex/extensions/configmacros/configmacros.js';
   import '@mathjax/src/components/src/ui/menu/menu.js';

   //
   // Load the output jax and the code for loading its font
   //
   import {loadFont} from '@mathjax/src/components/src/output/svg/svg.js';

   //
   // Load speech-generation code
   //
   import {checkSre} from '@mathjax/src/components/src/a11y/util.js';

   //
   // Mark the components that you have loaded
   //
   Loader.preLoad(
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
   // Update the configuration's mathjax path and add the loaded TeX packages
   //
   MathJax.config.loader.paths.mathjax = 'https://cdn.jsdelivr.net/npm/mathjax@4';
   insert(MathJax.config, {
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
   loadFont(checkSre(startup), true);


This loads the various components that we want to include in the
combined component, including the standard startup code so that the
usual startup process is included.

.. note::

   This file uses ES6 ``import`` commands to load the MathJax modules.
   It is possible to use ES5 ``require()`` calls instead, if you wish.
   For example,

   .. code-block:: javascript

      import {startup} from '@mathjax/src/components/src/startup/init.js';

   could be replaced by

   .. code-block:: javascript

      const {startup} = require('@mathjax/src/components/src/startup/init.js');

   and similary for the other ``import`` commands.  Note that the
   MathJax ``package.json`` file is set up to route
   ``@mathjax/src/js`` to the MathJax ``mjs`` directory when used in
   an ``import`` command, and to the ``cjs`` directory when used in a
   ``require()`` statement, so you can use the same path in either
   case.  Similarly ``@mathjax/src/components/src`` maps either to the
   ``components/mjs`` or ``components/cjs`` directory based on whether
   ``import`` or ``require()`` is used.


The Component Configuration File
================================

Next, create a file ``config.json`` that includes the
following:

.. code-block:: json

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
called automatically by the commands in teh following section.


Building the Component
======================

Once these two files are ready, you are ready to build the component.
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


Configuring the Component
=========================

Note that you can still include a  ``MathJax = {...}`` definition in
your web page before loading this custom MathJax build if you want to
customize the configuration for a specific page.  You could also
include configuration within the component itself, as we did for the
TeX ``packages`` array.  This will override any page-provided
configuration, however, so if you want to provide non-standard
defaults that can still be overridden in the page, use

.. code-block:: javascript

   MathJax.config = insert({
     // your default options here
   }, MathJax.config, false);

right after the :js:meth:`insert()` call that sets the TeX
``packages`` value.  This will update the TeX packages, and then merge
the user's configuration options into your defaults and set
:js:data:`MathJax.config` to the combined options.  For example, you
could set the default font via

.. code-block:: javascript

   MathJax.config = insert({
     output: {
       font: 'mathjax-fira'
     }
   }, MathJax.config, false);

and the page could still override that in its own configuration.

|-----|
