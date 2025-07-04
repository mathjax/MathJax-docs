.. _v4-build-tools:

==========================
Changes to the Build Tools
==========================

With the v4 release, MathJax has switched to the ``pnpm`` package
manager rather than ``npm``.  This speeds up installation and improves
script handling.  Although you can still use ``npm``, some of the
scripts in ``package.json`` call ``pnpm``, so you will need to have
``pnpm`` installed to use those scripts.  Fortunately, this only
affects those who are compiling and packaging MathJax, so unless you
are working with the MathJax source files, you should not be affected
by this change.  If you are only using MathJax in web pages via a CDN,
for example, you will not need to worry about ``pnpm`` (or ``npm``).

To install ``pnpm`` you can use

.. code-block:: shell

   npm install -g pnpm

The tools used for creating the webpacked component files have been
significantly updated for v4.  Partly this is to accommodate the
changes needed for the production of the dual MJS/CJS files, and
partly in order to make it easier to do individual steps of the build
process in isolation.  There are now package scripts for performing
most of the development tasks that you might need to do if you are
modifying MathJax or building your own components.

In the past, to compile the typescript files into javascript, you
would use ``pnpm -s compile``, and to build the webpacked component
files, you did ``pnpm -s make-components``.  These commands are still
available, but there is a new

.. code-block:: shell

   pnpm -s build

command that does both at once.

Because we now make both MJS and CJS versions of the MathJax files,
there are commands to make each type.  The commands above make the MJS
versions, but there are also module-specific commands that make the
MJS and CJS versions separately.

.. code-block:: shell

   pnpm -s compile-cjs
   pnpm -s compile-mjs

   pnpm -s make-cjs-components
   pnpm -s make-mjs-components

   pnpm -s build-cjs
   pnpm -s build-mjs

The generic versions are just aliases for the MJS-specific ones.  Note
that because the webpacked versions use the MJS JavaScript files, the
``make-cjs-components`` script is never run, but if you want to make
ES5-based versions of the webpacked files,

.. code-block:: shell

   pnpm -s compile-cjs
   pnpm -s make-cjs-components

will create a ``bundle-cjs`` directory containing the ES5 webpacked
files comparable to the ones that used to be in the ``es5`` directory.

There is also

.. code-block:: shell

   pnpm -s build-all

that does both the ``build-mjs`` and ``build-cjs`` actions, creating
all the files in the ``mjs``, ``cjs``, ``bundle`` and
``components/cjs`` directories.

Because the ``make-components`` action webpacks *all* the components, a
time consuming process, there is a ``make-one`` script that webpacks
only one component.  The format for this is

.. code-block:: shell

   pnpm -s make-one <component> <module-type>

where ``<component>`` is the name of the directory in ``components/mjs``
that defines the component, and ``<module-type>`` is either ``mjs`` or
``cjs``.  For example

.. code-block:: shell

   pnpm -s make-one input/tex mjs

would pack only the TeX input component.

These commands all rely on the ``components/bin/makeAll`` script,
which has been enhanced for version 4.  It now has a number of
command-line options to control its functions, including:

* ``--no-subdirs`` to prevent it from processing all the subdirectories
  of the given directory.
* ``--cjs`` to process using CJS rules.
* ``--mjs`` to process using MJS rules (the default).
* ``--terse`` to only print the main headings rather than the file
  details like the files included in a webpacked version.
* ``--build`` to only perform the build steps (i.e., creating the ``lib``
  directories used for shared imports).
* ``--copy`` to only perform the copy steps (e.g., copying the CHTML
  woff files into place).
* ``--pack`` to only do the webpack steps.
* ``--bundle-cjs`` to webpack into the ``bundle-cjs`` directory rather
  than the ``bundle`` directory.

These can also be passed to ``pnpm -s -- make-one`` if you want to
restrict the steps performed (it already uses ``--no-subdirs`` and one
of ``--cjs`` or ``--mjs``).

These changes mean you only need to use ``makeAll``, since it handles
calling ``components/bin/build``, ``components/bin/copy`` and
``components/bin/pack`` itself.  The arguments for these sub-programs
have changed in this version, particularly for ``components/bin/pack``,
so you should not call these by hand yourself unless you have looked
at the internals of them carefully.

|-----|
