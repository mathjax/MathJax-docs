.. _web-hosting:

################################
Hosting Your Own Copy of MathJax
################################

We recommend using a CDN service if you can, but you can also install
MathJax on your own server, or locally on your own hard disk.  You may
need to do this if you are :ref:`creating a custom build
<web-custom-build>` of MathJax, for example, or if you wish to use
MathJax off-line.


.. _obtain-mathjax:

Acquiring the MathJax Code
==========================

In order to host your own version of MathJax, you must first obtain a
copy of the MathJax code.  That can be done in several ways, the
easiest being to use ``npm`` (the node package manager), or ``git`` to
get MathJax from its GitHub development repository.


.. _mathjax-npm:

Getting MathJax via npm
-----------------------

To include MathJax in your project, use the command

.. code-block:: shell

   npm install mathjax@4

This will install MathJax in ``node_modules/mathjax`` subdirectory of
your current directory.

If you need access to the source code, as well.  Then use

.. code-block:: shell

   npm install @mathjax/src@4

which installs MathJax in the ``node_modules/@mathjax/src``
subdirectory, with the webpacked component files in the
``node_modules/@mathjax/src/bundle`` directory.  The Typescript source
code files are in ``node_modules/@mathjax/src/ts``, and pre-compiled
verions of this are available in two formats: as ES modules in the
``node_modules/@mathjax/src/mjs`` directory, and as CommonoJS modules
in ``node_modules/@mathjax/src/cjs``.  See the :ref:`node-start`
section for more details about how to use the MathJax source code in
your own javascript projects.

.. note::

   Version 4 of MathJax has moved to using scoped npm packages.  The
   version 3 package name ``mathjax-full`` is now ``@mathjax/src``.


.. _mathjax-git:

Getting MathJax via git
-----------------------

To obtain a copy of MathJax from the GitHub source repository, use the
command

.. code-block:: shell

   git clone https://github.com/mathjax/MathJax.git mathjax

This will install a copy of MathJax in the ``mathjax`` directory.

If you need access to the source code as well as the webpacked
components, then use

.. code-block:: shell

   git clone https://github.com/mathjax/MathJax-src.git mathjax

which will install the source code for MathJax in the
``mathjax`` sub-directory of your current directory.  You will need to
compile the typescript source files and build the component files by
hand, as they are not part of the repository itself.  To do this, do
the following:

.. code-block:: shell

   cd mathjax
   pnpm install
   pnpm -s build-all
   cd ..

This will compile the typescript source files from the
``@mathjax/src/ts`` directory into javascript files in the
``@mathjax/src/mjs`` and ``@mathjax/src/cjs`` directories, and then
will build the component files from ``@mathjax/src/components/mjs``
into the ``@mathjax/src/bundle`` directory.

.. note::

   MathJax version 4 has switched to using ``pnpm`` rather than
   ``npm``, so you will need to install that if you don't have it
   installed already, as the build scripts rely on it.  To do so,
   use

   .. code-block:: shell

      npm install -g pnpm

If you don't want to build both ``cjs`` and ``mjs`` verions, then you can use

.. code-block:: shell

   pnpm -s build

to build just the ``mjs`` versions, or

.. code-block:: shell

   pnpm -s build-cjs

to build just the ``cjs`` versions.

.. note::

   The directory structure and build process for MathJax version 4 has
   been significantly updated.  See the `Release notes for
   4.0.0-beta.2
   <https://github.com/mathjax/MathJax-src/releases/tag/4.0.0-beta.2#es6-modules>`__
   for a discussion of the new dual mjs/cjs structure.

-----

.. _serve-files:

Make the Files Available
========================

Once you have acquired the MathJax files by one of the methods
described above, you need to make the proper files available on your
web server.  Note that most of the files in the MathJax distribution
are not needed on the server.  For example, the ``@mathjax/src/ts``
directory is typescript source code for MathJax, and this is compiled
into the javascript files found in the ``@mathjax/src/mjs`` or
``@mathjax/src/cjs`` directory.  But even these are not the files you
want on your server.  These javascript files are further processed
into the MathJax components stored in the ``@mathjax/src/bundle``
directory using the data in the ``@mathjax/src/components/mjs``
directory.

It is the contents of the ``@mathjax/src/bundle`` directory that you
want to make available on your server, as these are the files that are
served from the CDNs that provide MathJax.  If you installed the plain
``mathjax@4`` npm package, that is the set of files you will have
obtained, as the ``mathjax`` package is just these bundled files.

You should move those files to a convenient location on your server.
This might be a top-level directory called ``mathjax``, for example,
or something like ``assets/mathjax`` in your application directory.

-----

.. _link-files:

Linking to you Your Copy of MathJax
===================================

You can include MathJax in your web page by putting

.. code-block:: html

    <script defer src="path-to-MathJax/tex-chtml.js"></script>

in your document's ``<head>`` block.  Here, ``tex-chtml.js`` is the
combined component that you are loading, and this is just an example; you
will need to pick the one you want to use.  See the section on
:ref:`web-configuration` for more details.

The ``path-to-MathJax`` should be replaced by the URL for the main
MathJax directory, so if you have put the ``mathjax``
directory at the top level of you server's web site and named it
``mathjax``, you could use

.. code-block:: html

    <script defer src="/mathjax/tex-chtml.js"></script>

to load MathJax in your page.  For example, your page could look like

.. code-block:: html

    <html>
        <head>
            ...
            <script defer src="/mathjax/tex-chtml.js"></script>
        </head>
        <body>
            ...
        </body>
    </html>

-----

.. _same-origin-policy:

Fonts on Shared Servers
=======================

Typically, you want to have MathJax installed on the same server as
your web pages that use MathJax. There are times, however, when that
may be impractical, or when you want to use a MathJax installation at
a different site. For example, a departmental server at
``www.math.yourcollege.edu`` might like to use a college-wide
installation at ``www.yourcollege.edu`` rather than installing a
separate copy on the departmental machine. MathJax can certainly be
loaded from another server, but there is one important caveat --- The
same-origin security policy for cross-domain scripting.

Some browsers' (e.g., Firefox's) interpretation of the same-origin
policy is more strict than other browsers, and it affects how fonts
are loaded with the ``@font-face`` CSS directive. MathJax’s CommonHTML
output mode use this directive to load web-based math fonts into the
web page when needed. These browsers' security policies, however, may
only allow this when the fonts come from the same server as the web
page itself, so if you load MathJax (and hence its web fonts) from a
different server, they won’t be able to access those web fonts. In
this case, MathJax’s CommonHTML output mode will not show the correct
fonts.

There is a solution to this, however, if you manage the server where
MathJax is installed, and if that server is running the Apache web
software. In the remote server’s MathJax folder, create a file called
``.htaccess`` that contains the following lines:

:: 

    <FilesMatch "\.(ttf|otf|eot|woff)$">
    <IfModule mod_headers.c>
    Header set Access-Control-Allow-Origin "*"
    </IfModule>
    </FilesMatch>

and make sure the permissions allow the server to read this file. (The
file’s name starts with a period, which causes it to be an "invisible"
file on unix-based operating systems. Some systems, particularly those
with graphical user interfaces, may not allow you to create such
files, so you might need to use the command-line interface to
accomplish this.)

This file should make it possible for pages at other sites to load
MathJax from this server in such a way that Firefox (and the other
browsers with similar same-origin policies that apply to fonts) will
be able to download the web-based fonts.

If you want to restrict the sites that can access the web fonts,
change the ``Access-Control-Allow-Origin`` line to something like:

::

   Header set Access-Control-Allow-Origin "http://www.math.yourcollege.edu"

so that only pages at ``www.math.yourcollege.edu`` will be able to
download the fonts from this site. See the open font library
discussion of web-font linking for more details.

Note that the CDNs that host MathJax already have these settings in
place, so you can load fonts from them into your own pages without
having to worry about these issues.

|-----|
