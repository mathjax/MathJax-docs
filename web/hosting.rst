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

If you need access to the source code, as well, then instead use

.. code-block:: shell

   npm install @mathjax/src@4

which installs MathJax in the ``node_modules/@mathjax/src``
subdirectory, with the webpacked component files in the
``node_modules/@mathjax/src/bundle`` directory.  The Typescript source
code files are in ``node_modules/@mathjax/src/ts``, and pre-compiled
versions of this are available in two formats: as ES modules in the
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
components, then instead use

.. code-block:: shell

   git clone https://github.com/mathjax/MathJax-src.git mathjax

which will install the source code for MathJax in the ``mathjax``
sub-directory of your current directory.  In this case, you will need
to compile the typescript source files and build the component files
by hand, as they are not part of the repository itself.  To do this,
do the following:

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

If you don't want to build both ``cjs`` and ``mjs`` versions, then you can use

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

Making the Files Available
==========================

Once you have acquired the MathJax files by one of the methods
described above, you need to make the proper files available on your
web server.  Note that most of the files in the MathJax source
distribution are not needed on the server.  For example, the
``@mathjax/src/ts`` directory is typescript source code for MathJax,
and this is compiled into the javascript files found in the
``@mathjax/src/mjs`` or ``@mathjax/src/cjs`` directory.  But even
these are not the files you want on your server.  These javascript
files are further processed into the MathJax components stored in the
``@mathjax/src/bundle`` directory using the data in the
``@mathjax/src/components/mjs`` directory.

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

Linking to Your Copy of MathJax
===============================

You can include MathJax in your web page by putting

.. code-block:: html

    <script defer src="path-to-MathJax/tex-chtml.js"></script>

in your document's ``<head>`` block.  Here, :file:`tex-chtml.js` is the
combined component that you are loading, and this is just an example; you
will need to pick the one you want to use.  See the section on
:ref:`loading-mathjax` for more details.

The ``path-to-MathJax`` should be replaced by the URL for the main
MathJax directory, so if you have put the ``mathjax``
directory at the top level of you server's web site and named it
``mathjax``, you could use

.. code-block:: html

    <script defer src="/mathjax/tex-chtml.js"></script>

to load MathJax in your page.  For example, your page could look like

.. code-block:: html

    <!DOCTYPE html>
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

.. _obtaining-fonts:

Obtaining the Needed Fonts
==========================

In version 3, there was only one font (``mathjax-tex``) and it was
bundled with MathJax itself, so there when you installed MathJax, you
also git that font.  That is no longer the case with version 4, since
there is a choice of fonts, and they are made available in separate
pacakges.  Installing MathJax via ``npm`` or ``pnpm`` will get you the
default ``mathjax-mnewcm`` font, but if you plan to use a different
font and have that served from your server, you will need to load its
font package as well.  E.g.,

.. code-block:: shell

   pnpm install @mathjax/mathjax-stix2-font@4

to install the `mathjax-stix2` font.

You will need to move the ``node_modules/@mathjax/mathjax-stix2-font``
directory to a suitable location on your server, as you have the
MathJax files themselves.

In order to use the font you have loaded, you will need to configure
MathJax to tell it the font you need, and where the font fils are
located on your server.  For example:

.. code-block:: js

   MathJax = {
     output: {
       font: 'mathjax-stix2',
       fontPath: '<path-to-mathjax-stix2-font>',
     }
   };

where ``<path-to-mathjax-stix2-font>`` is the URL for where you have
places the ``@mathjax/mathjax-stix2-font`` folder.

In this case, your page might look like

.. code-block:: html

    <!DOCTYPE html>
    <html>
        <head>
            ...
            <script>
              MathJax = {
                output: {
                  font: 'mathjax-stix2',
                  fontPath: '/mathjax-strix2-font',
                }
              };
            </script>
            <script defer src="/mathjax/tex-chtml.js"></script>
        </head>
        <body>
            ...
        </body>
    </html>


_____

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
output mode uses this directive to load web-based math fonts into the
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

.. code-block::

    <FilesMatch "\.(woff|woff2)$">
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

.. code-block::

   Header set Access-Control-Allow-Origin "http://www.math.yourcollege.edu"

so that only pages at ``www.math.yourcollege.edu`` will be able to
download the fonts from this site. See the open font library
discussion of web-font linking for more details.

Note that the CDNs that host MathJax already have these settings in
place, so you can load fonts from them into your own pages without
having to worry about these issues.

For web servers other than Apache, you will need to consult the
server's documentation to determine how to specify the needed header
line for fonts on your system.

-----

.. _using-locally:

Using MathJax Locally
=====================

You can use MathJax locally without a connection to the internet by
following the basic outline above, and using ``file://`` URLs to
access your local files.  Note, however, that some browsers have
additional cross-origin restrictions for ``file://`` URLs, and that
may limit where you can place the MathJax files and font files.

In that case, you may need to run a local webserver for MathJax and
its files.  For example, if you have placed the ``mathjax`` and
``mathjax-newcm-font`` files in a directory called ``assets``, then if
do

.. code-block:: shell

   cd assets
   node serve --cors

and configure your page like

.. code-block:: html

    <!DOCTYPE html>
    <html>
        <head>
            ...
            <script>
              MathJax = {
                output: {
                  font: 'mathjax-stix2',
                  fontPath: 'http://localhost:3000/mathjax-strix2-font',
                }
              };
            </script>
            <script defer src="http://localhost:3000/mathjax/tex-chtml.js"></script>
        </head>
        <body>
            ...
        </body>
    </html>

then you should be able to load this file using a ``file://`` URL and
have MathJax served from the local pyhton server without the need for
any access to the internet. 


|-----|
