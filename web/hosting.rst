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

   npm install mathjax@3

This will install MathJax in ``node_modules/mathjax`` subdirectory of
your current directory.  It will include the pre-built components in
the ``node_modules/mathjax/es5`` directory.  (Note that it is
important to use ``mathjax@3``, as we are still making v2 releases,
and so the latest mathjax npm package may not be the v3 one.  The
``latest`` version on ``npmjs.com`` appears to be chronological rather
than by version number.)

If you need access to the source code, as well.  Then use

.. code-block:: shell

   npm install mathjax-full@3

which installs MathJax in the ``node_modules/mathjax-full``
subdirectory, the source files for the components in
``node_modules/mathjax-full/components/src``, the typescript source
files for MathJax in ``node_modules/mathjax-full/ts``, and the
compiled javascript files from the typescript source in
``node_modules/mathjax-full/js``.


.. _mathjax-git:

Getting MathJax via git
-----------------------

To obtain a copy of MathJax from the GitHub component repository, use the
command

.. code-block:: shell

   git clone https://github.com/mathjax/MathJax.git mathjax

This will install a copy of MathJax in the ``mathjax/es5`` directory.

If you need access to the source code as well, then use

.. code-block:: shell

   git clone https://github.com/mathjax/MathJax-src.git mathjax

which will install the source code for MathJax in the
``mathjax`` sub-directory of your current directory.  You will need to
compile the typescript source files and build the component files by
hand, as they are not part of the repository itself.  To do this, do
the following:

.. code-block:: shell

   cd mathjax
   npm install
   npm run compile
   npm run make-components
   cd ..

This will compile the typescript source files from the ``mathjax/ts``
directory into javascript files in the ``mathjax/js`` directory, and
then will build the component files from ``mathjax/components/src``
into the ``mathjax/es5`` directory.


.. _serve-files:

Make the Files Available
========================

Once you have acquired the MathJax files by one of the methods
described above, you need to make the proper files available on your
web server.  Note that most of the files in the MathJax distribution
are not needed on the server.  For example, the ``mathjax/ts``
directory is typescript source code for MathJax, and this is compiled
into the javascript files found in the ``mathjax/js`` directory.  But
even these are not the files you want on your server.  These
javascript files are further processed into the MathJax components
stored in the ``mathjax/es5`` files using the data in the
``mathjax/components/src`` directory.

It is the contents of the ``mathjax/es5`` directory that
you want to make available on your server, as these are the files that
are served from the CDNs that provide MathJax.  You should move them
to a convenient location on your server.  This might be a top-level
directory called ``mathjax``, for example.


.. _link-files:

Linking to you Your Copy of MathJax
===================================

You can include MathJax in your web page by putting

.. code-block:: html

    <script src="path-to-MathJax/tex-chtml.js" id="MathJax-script" async></script>

in your document's ``<head>`` block.  Here, ``tex-chtml.js`` is the
combined component that you are loading, and this is just an example; you
will need to pick the one you want to use.  See the section on
:ref:`web-configuration` for more details.

The ``path-to-MathJax`` should be replaced by the URL for the main
MathJax directory, so if you have put the ``mathjax/es5``
directory at the top level of you server's web site and named it
``mathjax``, you could use

.. code-block:: html

    <script src="/mathjax/tex-chtml.js" id="MathJax-script" async></script>

to load MathJax in your page.  For example, your page could look like

.. code-block:: html

    <html>
        <head>
            ...
            <script src="/mathjax/tex-chtml.js" id="MathJax-script" async></script>
        </head>
        <body>
            ...
        </body>
    </html>


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
loaded from another server, but there is one important caveat ---
The same-origin security policy for cross-domain
scripting.

Some browsers' (e.g., Firefox's) interpretation of the same-origin
policy is more strict than most other browsers, and it affects how
fonts are loaded with the ``@font-face`` CSS directive. MathJax’s
CommonHTML output modes use this directive to load web-based math
fonts into a page when the user doesn’t have them installed locally on
their own computer. These browsers' security policies, however, only allow
this when the fonts come from the same server as the web page itself,
so if you load MathJax (and hence its web fonts) from a different
server, they won’t be able to access those web fonts. In this case,
MathJax’s CommonHTML output mode will not show the correct
fonts.

There is a solution to this, however, if you manage the server where
MathJax is installed, and if that server is running the Apache web
software. In the remote server’s MathJax folder, create a file
called ``.htaccess`` that contains the following lines:

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
be able to download the web-based fonts. If you want to restrict the
sites that can access the web fonts, change the
``Access-Control-Allow-Origin`` line to something like:

::

   Header set Access-Control-Allow-Origin "http://www.math.yourcollege.edu"

so that only pages at ``www.math.yourcollege.edu`` will be able to
download the fonts from this site. See the open font library
discussion of web-font linking for more details.


.. _firefox-local-fonts:

Firefox and Local Fonts
=======================

Firefox's same-origin security policy affects its ability to load
web-based fonts, as described above. This has implications not only to
cross-domain loading of MathJax, but also to using MathJax locally
from your hard disk. Firefox's interpretation of the same-origin
policy for local files used to be that the "same domain" for a page is
the directory where that page exists, or any of its subdirectories.
This allowed MathJax to be loaded from a subdirectory of the director
where the web page was loaded.

This is no longer the case with Firefox starting with version 68 and
going forward (see `their documentation
<https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS/Errors/CORSRequestNotHttp#Local_File_Security_in_Firefox_68>`__).
Now there is no same origin for a ``file://`` URL (the origin for a
page loaded from a ``file://`` URL is unique).

This means there are limited options for using MathJax in Firefox with
a local copy of MathJax.  The easiest option is to use the SVG output
renderer rather than the CommonHTML output, as that does not require
fonts to be loaded, so avoids the same-origin issue.  Alternatively,
you could install the MathJax TeX fonts as system fonts so that
Firefox doesn't hav to try to load them as web fonts.  

This is an unfortunate restriction for MathJax (though we understand
their reasoning), but it is a limitation imposed by Firefox's
security model that MathJax can not circumvent. Currently, this is not
a problem for other browsers, though there is no guarantee that it
won't be in the future.

|-----|
