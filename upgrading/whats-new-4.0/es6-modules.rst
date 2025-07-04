.. _v4-es6-modules:

===================
MathJax ES6 Modules
===================

When MathJax was first released, the current version of JavaScript was
ES5, so when the code base was moved to Typescript for v3, it was
down-compiled to produce ES5 code.  Modern browsers support ES6, which
include many new features, such as true object ``class`` creation and
inheritance, proper ``import`` and ``export`` commands, ``Set`` and
``Map`` objects, promises, iterators, and many other features that
make JavaScript programs faster and more reliable.

Along with new language features, ES6 introduced a new module
structure that affects how individual javascript files obtain values
from other files, and how they make their own definitions available to
others.  ES6 modules (which we will refer to as `MJS` modules) use the
new ``import`` and ``export`` commands to do this, while the older
CommonJS module format (which we will call `CJS`) used ``require()``
and the :data:`module.exports` object to perform those functions.

MathJax v3 uses CommonJS modules with ES5 code (though this was not
quite pure ES5, since one of its dependencies was actually ES6), but
modern JavaScript applications are moving more and more to MJS format.
Beginning with version 4, MathJax offers both MJS and CJS versions,
with the MJS version being ES6, but the CJS version remaining ES5, as
in past versions.  The webpacked components for use in web pages are
now based on the MJS versions.


.. _v4-ESM-implications:

Implications for MathJax in Web Pages
=====================================

The webpacked MJS files are smaller than the earlier webpacked CJS
files, so that should mean faster download and compile times, and the
ES6 code is more efficient, so should run faster.  But since this
version is no longer ES5, the ``es5`` directory that was part of the
URLs for accessing MathJax from a CDN is no longer correct.  The
details of how the directories have been adjusted are given in the
next section, but for use on the web, the only important difference
introduced by the change to ES6 is that you simply remove the ``/es5``
from the url.  For example, you would use

.. code-block:: shell

   https://cdn.jsdelivr.net/npm/mathjax@4/tex-mml-chtml.js

to load the ``tex-mml-chtml.js`` combined component.

Support for IE11 has been dropped in v4, as it does not support enough
of the ES6 standards.  (It is possible to webpack the CJS versions, so
you can build your own ES5 version if that is necessary for you.  This
is described at the end of this section below.)  In version 3, we
recommended a link to ``polyfill.io`` in order to support IE11.  This
should now be removed since version 4 will not work with IE11 even
with the polyfill, and especially since the ``polyfill.io`` has been
bought by a Chinese entity that has used it to insert malignant code
into web sites that use it.

If your only usage is in a web browser, you can skip the :ref:`next
section <v4-accessing>`.


.. _v4-ESM-directory-structure:

New Directory Structure
=======================

MathJax's new dual distribution of both MJS and CJS modules requires a
new directory structure in the `mathjax/MathJax-src
<https://github.com/mathjax/MathJax-src>`__ repository and its
associated ``@mathjax/src`` npm package in order to accommodate both
versions.  In the past, the compiled JavaScript code was found in the
``js`` directory, and the webpacked components were in the ``es5``
directory.  Now that there are both CommonJS and ES-module versions of
the compiled code, these are stored in the ``cjs`` and ``mjs``
directories, respectively.

The webpacked components are now based on the new ``mjs`` files, hence
they are ES6 files, and so the ``es5`` directory has been removed,
with the components now being placed in the new generically named
``bundle`` directory.  That way, if there is a move to ES7 or higher,
the directory name doesn't need to change again.  The `mathjax/MathJax
<https://github.com/mathjax/MathJax>`__ repository and associated
``mathjax`` package have also eliminated the ``es5`` directory, and
the combined components and component directories are now at the top
level of the repository.  That means you can access them without the
need for ``/es5`` in the URL that was needed in v3.  (See the
:ref:`v4-accessing` section for more information on how to access v4.0
in a browser.)

Existing node applications that use MathJax (e.g., the v3 examples in
the `MathJax-demos-node
<https://github.com/mathjax/MathJax-demos-node>`__ repository) may
have code that refers to the ``mathjax-full/js``,
``mathjax-full/es5``, or ``mathjax/es5`` directories that no longer
exist.  To accommodate these, v4 includes an ``exports`` section in
its ``package.json`` file that maps these references to the proper new
locations.  In particular, references to ``@mathjax/src/es5`` are
routed to ``@mathjax/src/bundle`` automatically, and similarly,
``mathjax/es5`` is routed to ``mathjax``.  For the ``@mathjax/src/js``
directory, references will be routed to ``@mathjax/src/mjs`` or
``@mathjax/src/cjs`` depending on whether the reference is from an
``import`` statement or a ``require()`` call.  That means that ES
modules (using ``import``) will get the ``mjs`` versions, while
CommonJS modules (using ``require()``) will get the ``cjs`` ones.

The main ``package.json`` file now includes a ``"type": "module"``
line so that the ``.js`` files are considered to be MJS files
automatically.  The ``cjs`` directory (and other directories that need
to be marked as CJS files) contain separate ``package.json`` files
that set the type to ``commonjs`` so that the ``.js`` files they
contain will be treated as CJS files.

Similarly, the font directories in the font packages have ``mjs`` and
``cjs`` directories, with ``exports`` sections in their
``package.json`` files to route ``import`` to the former and
``require()`` to the latter.


.. _v4-ESM-components-src:

Changes to ``components/src``
=============================

The files that are used to create the webpacked component files are
ES6 modules, since they use ``import`` and ``export``, and in previous
versions of MathJax, you needed to use ``node -r esm`` to be able to
``require()`` these in your own programs as you can't use ``require()``
to load ES modules directly.  Although you could load the webpacked
versions of the component files in either MJS or CJS applications, the
fact that the source component files are MJS modules made it difficult
to use the source versions of the components in CJS applications.

Now that MathJax provides both MJS and CJS versions, the source
component files are made available in both forms as well.  Originally,
the component files were found in ``components/src``; with this beta
version, those are now in ``components/mjs``, since they are ES
modules.

Prior to version 4, MathJax used Babel to convert these to ES5 during
the webpack process, but since the webpacked versions are now ES6,
that is no longer necessary, and Babel is no longer needed as a
dependency for MathJax.  Instead, for those who wish to use the
components from source in a CommonJS node application, we use
Typescript to down-compile the ``components/mjs`` files into the
``components/cjs`` directory as CJS modules of ES5 code.

In previous versions, ``require('mathjax-full')`` would load
``components/src/node-main/node-main.js``, which would load the
components from source rather than the webpacked versions.  With the
``mathjax`` package, which only includes the webpacked versions,
``require('mathjax')`` would get ``es5/node-main.js``, the webpacked
version.  In version 4, the two have been standardized so that they
both load the webpacked version.  When used with ``require()``, you
will get ``bundle/node-main.cjs``, while ``import`` will load
``bundle/node-main.mjs``.  This is accomplished via the ``exports``
section of the ``package.json`` file.  Of course, you use
``@mathjax/src`` in place of ``mathjax-full``.

In order to get the source versions in ``@mathjax/src``, use

.. code-block:: js
                
   require('@mathjax/src/source').init(...)

or

.. code-block:: js

   import {init} from '@mathjax/src/source'

and then call ``init(...)``.  These load
``components/mjs/node-main/node-main.mjs`` or
``components/cjs/node-main/node-main.cjs``, respectively.

For those who have been using ``components/src`` to load individual
components from source, we map ``components/js`` to ``components/mjs``
when included via an ``import`` command, and to ``components/cjs``
when included via ``require()``, so you can use ``components/js`` to
get the correct files in either case.  For backward compatibility,
``components/src`` has been mapped the same way.

The end result is that you should always get an appropriate version
for your situation, whether you are importing MathJax into an MJS
application or requiring it into a CJS one.


.. _v4-ESM-more-issues:

More MJS/CJS Issues
===================

Since MathJax now needs to produce javascript files in two different
formats, we use different typescript configuration files for the
different setups.  These are stored in the ``tsconfig`` directory.  The
MJS files are produced using ``tsconfig/mjs.json`` and the CJS one use
``tsconfig/cjs.json``.  Both of these call in ``tsconfig/common.json`` to
set the parameters that are common to both, and then specify the
``target`` and ``module`` values to be correct for the desired JavaScript
version and module format.  The main ``tsconfig.json`` file simply calls
in ``tsconfig/mjs.def`` and is there as a convenience for tools that
expect a ``tsconfig.json`` file in the main directory.

In order to support both MJS and CJS versions, MathJax's dependencies
also must provide both versions.  The ``speech-rule-engine``,
``mj-context-menu``, and ``mhchemparser`` packages all now include
both module formats using dual directories similar to MathJax itself.
This means that the imports used by MathJax for these packages need to
change depending on which module version is being created.  In order
to accomplish this, the references to those packages are handled using
pseudo-package references that are remapped to the correct locations
via the ``tsconfig.json`` and ``package.json`` files.

To this end, MathJax now uses the ``#sre``, ``#menu``, and ``#mhchem``
pseudo-package names to refer to these packages.  The main
``package.json`` file uses the ``imports`` section to map these to the
actual package directories that contain their MJS JavaScript files.
E.g., ``#mhchem/*`` is mapped to ``mhchemparser/esm/*``, to obtain the
ES module versions of the parser.  Conversely, the ``package.json``
file that is placed in the ``cjs`` directory maps ``#mhchem/*`` to
``mhchemparser/js/*`` to obtain the CommonJS versions.  Similar
mappings are done for the other two packages.

In addition to the mappings in the ``package.json`` file to let node
(and webpack) know which directory to use, Typescript must also be
told where to look for the ``.d.ts`` files for these packages.  This
is accomplished through the ``tsconfig`` json files via the ``paths``
array.

MathJax takes its default font from one of the MathJax font packages,
and that also has separate MJS and CJS directories, so the MathJax
code uses a pseudo-package, ``#default-font``, to link to the proper
``mjs`` or ``cjs`` directory in the font package.  This also provides
a means of specifying what the default font is (``mathjax-newcm`` by
default), as changing the mappings in the ``package.json`` files and
the ``tsconfig`` files would change the default font.

For the most part, MathJax's typescript source code can be used to
produce either ES modules or CommonJS modules without alteration.  But
there are a few differences between MJS and CJS code that do need to
be taken into account.  For example, CommonJS code provides
``__dirname`` for the location of the file being compiled, but this is
not available in MJS modules; meanwhile, MJS files must use ``new
URL(import.meta.url).pathname`` to get that data, and ``import`` is
not available in CJS modules.  That means there is no common method
that can be used for this in both cases, and so MathJax has some
module-specific files to handle the few instances where
module-specific code is needed.

To accommodate this, we introduce additional pseudo-package names that
can be used to select between MJS and CJS files that export the needed
data using the module-specific mechanisms.  The ``#root`` and
``#mml3`` pseudo-package names are used for these two situations in
the Typescript code, and ``#js`` and ``#source`` are used in the
``components/mjs`` definitions to link to the ``mjs`` or ``cjs``
JavaScript code and to module-specific code for obtaining the
directory name.  These are mapped to the proper locations in the
``package.json`` files and the ``tsconfig`` files.  The
module-specific code that these link to are stored in ``mjs`` and
``cjs`` directories where they are needed, so that ``#root/root.js``
gets mapped to ``ts/components/mjs/root.js`` when MJS files are being
produced, but to ``ts/components/cjs/root.js`` for CJS files, and
similarly for ``#root/sre-root.js``.  The ``tsconfig`` files exclude
the directories for the other format so that they are not compiled
when not needed.

Finally, since modern browsers can import MJS files, it is possible to
load the MathJax files into a browser directly via a ``<script
type="module">`` tag.  To do so, however, you need to include a
``<script type="importmap">`` tag that tells the browser how to find
the pseudo-packages described above.  Something like

.. code-block:: html

   <script type="importmap">
   {
     "imports": {
       "#js/": "./node_modules/@mathjax/src/mjs/",
       "#source/source.cjs": "./node_modules/@mathjax/src/components/mjs/source-lab.js",
       "#root/": "./node_modules/@mathjax/src/mjs/components/mjs/",
       "#mml3/": "./node_modules/@mathjax/src/mjs/input/mathml/mml3/mjs/",
       "#default-font/": "./node_modules/mathjax-modern-font/mjs/",
       "#sre/": "./node_modules/speech-rule-engine/js/",
       "#menu/": "./node_modules/mj-context-menu/js/",
       "#mhchem/": "./node_modules/mhchemparser/esm/",
       "@mathjax/src/components/js/a11y/util.js": "./node_modules/@mathjax/src/components/mjs/a11y/util-lab.js",
       "@mathjax/src/components/js/": "./node_modules/@mathjax/mjs/components/mjs/",
       "@mathjax/src/js/": "./node_modules/@mathjax/src/mjs/",
       "@mathjax/src/": "./node_modules/@mathjax/src/"
     }
   }
   </script>

should do the trick.  Then you can set up your MathJax configuration
in a file ``mathjax-config.js`` as in

.. code-block:: js

   import {source} from '@mathjax/src/components/js/source.js';

   window.MathJax = {
     loader: {
       load: ['input/tex', 'output/chtml'],
       source: source
     }
   };

and then use

.. code-block:: html

   <script type="module">
     import './mathjax-config.js';
     import '@mathjax/src/components/js/startup/startup.js';
   </script>

to load MathJax components via their source code rather than webpacked
files.

This is useful for testing changes to MathJax, but should not be used
in production, as the number of files that will be loaded can be quite
large, and each file will need to be retrieved separately, making for
unneeded network overhead.


.. _v4-ESM-component-json:

Component JSON files
====================

In past versions of MathJax, the ``components/src`` directory
contained files that control the production of the webpacked component
files in the ``es5`` directory.  Each component had a subdirectory
that contained files that told the MathJax build tools how to
construct the component.  These included at least one ``.js`` file
that imported the needed MathJax modules and did any setup needed for
the component, along with one or more of ``build.json``,
``copy.json``, and ``webpack.config.js`` that contain the data needed
for the build tools to process the component.

In version 4, these three ``.json`` files have been combined into a
single ``config.json`` file that contains sections for each of the
three original ones.  The ``build`` property of ``config.json``
contains the data that used to be in ``build.json``, the ``copy``
property holds what was in ``copy.json``, and the ``webpack`` property
holds the data needed to pack the component.

The ``webpack`` data primarily consists of the data that used to be
passed to the :meth:`PACKAGE()` function in ``webpack.config.js``, but
as named properties, and only those that differ from the defaults need
to be included (unlike the calls to :meth:`PACKAGE()` where all
arguments were needed).  The defaults are set up so that most
properties don't need to be specified, just the name of the component
and the ``libs`` array, in most cases.  There are some additional
properties that control whether the default font should be included in
the packed file, or whether a function from an external file should be
called to modify the default webpack configuration after it has been
constructed.  See the ``config.json`` files in the various
``components/mjs`` subdirectories for examples.


.. _v4-ESM-build-mjs-cjs:

Building MJS and CJS versions
=============================

There are a large number of new package scripts used for building the
files used by MathJax.  The main changes are that there are separate
commands for building the MJS and CJS files, along with new commands
to make everything all in one step, and for making single components
individually.

The ``pnpm -s compile`` and ``pnpm -s make-components`` scripts
perform these steps for the MJS versions, and there is a new

.. code-block:: shell

   pnpm -s build

command that does both of these at once.  The command

.. code-block:: shell

   pnpm -s build-all

not only compiles and packs the MJS versions, but also compiles the
CJS versions.

Additional commands and details are given in the section on
:ref:`v4-build-tools`.


.. _v4-ESM-es5-webpack:

Reproducing the Old ES5 Webpack Files
=====================================

The webpacked components in the ``bundle`` directory are based on
the MJS files, which are ES6 JavaScript files.  In contrast, the
earlier versions of MathJax had CJS versions of ES5 code.  If you need
to support an ES5 environment, it is possible to build that using

.. code-block:: shell

   npm run -s compile-cjs
   npm run -s make-cjs-components

which will create a ``bundle-cjs`` directory that contains ES5 versions
of the webpacked components, comparable to the old ``es5`` directory.

The ``tsconfig.json`` file has the settings for the MJS versions of
the JavaScript files, and if you use an editor like ``emacs``, the
Typescript editing mode automatically compiles the ``.ts`` files based
on ``tsconfig.json`` into the ``mjs`` directory.  If you need to make
modifications to the typescript files and your application links to
the CJS versions of the compiled files, it may be convenient to switch
the ``tsconfig.json`` file to produce the CJS versions instead.  To do
that, use

.. code-block:: shell

   npm run -s use-cjs

which will point the ``tsconfig.json`` file to the parameters for
compiling into the ``cjs`` directory instead.  When you are done,

.. code-block::  shell

   npm run -s use-mjs

will set things back to the original arrangement.

|-----|
