.. _getting-started-components:

#######################################
Getting Started with MathJax Components
#######################################

MathJax allows you to include mathematics in your web pages, either
using LaTeX, MathML, or AsciiMath notation, and the mathematics will
be processed using JavaScript to produce HTML or SVG for viewing in
any modern browser.


.. _mathjax-components:

MathJax Components
==================

To make using MathJax easier in web pages, the various pieces that
make up MathJax have been packaged into separate files called
"components".  For example, there is a component for MathML input, and
one for SVG output, and the various TeX extensions are packaged as
separate components.  You can mix and match the various components to
customize MathJax to suit your particular needs (this is described in
detail in the section on :ref:`configure-mathjax` below); the
individual component files that you specify are loaded when MathJax
starts up.

There are also components that combine several others into one larger
file that loads everything you need to run MathJax all at once.  These
represent some of the standard combinations of input and output
formats, and you will probably find one of these that suits your
needs.  You can :ref:`configure <configure-mathjax>` the various
components in order to customize how they run, even when they are
loaded as part of a combined component.  For example, you can set the
delimiters to be used for in-line and displayed math for the TeX input
component whether the TeX component was loaded individually, or as
part of the ``tex-chtml`` component.

It is even possible for you to create your own components or custom
builds of MathJax, or incorporate the MathJax components into larger
files that contain other assets your website might need (see the
section on :ref:`web-custom-build` for more details).

-----

.. _accessing-mathjax:

Ways of Accessing MathJax
=========================

There are two ways to access MathJax for inclusion in web pages: link
to a content delivery network (CDN) like ``cdn.jsdelivr.net`` to obtain a
copy of MathJax, or download and install a copy of MathJax on your own
server (for network access) or hard disk (for local use without a
network connection).  The first method is described below, while the
second is discussed in the section on :ref:`web-hosting`.

This page gives the quickest and easiest ways
to get MathJax up and running on your web site, but you may want to
read the details in the linked sections in order to customize the
setup for your pages.


.. _mathjax-CDN:

Using MathJax from a Content Delivery Network (CDN)
---------------------------------------------------

The easiest way to use MathJax is to link directly to a public
installation available through a Content Distribution Network (CDN).
When you use a CDN, there is no need to install MathJax yourself, and
you can begin using MathJax right away.  The CDN will automatically
arrange for your readers to download MathJax files from a fast, nearby
server.

To use MathJax from a CDN, you need to do three things:

1.  Include a MathJax configuration in your page (this may be optional
    in some cases).

2.  Link to MathJax in the web pages that are to include mathematics.

3.  Put mathematics into your web pages so that MathJax can display
    it.

.. _cdn-list:

There are many free CDN services that provide copies of MathJax. Most
of them require you to specify a particular version of MathJax to
load, but some provide "rolling releases", i.e., links that update to
the latest available version upon release (note that we also provide a
means of obtaining the latest version automatically, described below).

- `jsdelivr.com <https://jsdelivr.com>`__  [latest or specific version] (recommended)
- `unpkg.com <https://unpkg.com/>`__ [latest or specific version]
- `cdnjs.com <https://cdnjs.com>`__
- `raw.githack.com <http://raw.githack.com>`__
- `gitcdn.xyz <http://gitcdn.xyz/>`__
- `cdn.statically.io <http://cdn.statically.io>`__
 

To jump start using ``jsdelivr``, you accomplish the first two steps by putting

.. code-block:: html

   <script type="text/javascript" id="MathJax-script" async
     src="https://cdn.jsdelivr.net/npm/mathjax@3/es5/tex-mml-chtml.js">
   </script>

into the ``<head>`` block of your document.  (It can also go in the
``<body>`` if necessary, but the head is to be preferred.)  This will
load the latest 3.x.x version of MathJax from the distributed server,
configure it to recognize mathematics in both TeX and MathML notation,
and ask it to generate its output using HTML with CSS (the CommonHTML
output format) to display the mathematics.

.. warning::

  The ``tex-mml-chtml.js`` file includes all the pieces needed for
  MathJax to process these two input formats and produce this
  output format.  There are several other choices with different
  input/output combinations, and and you can even configure MathJax to
  load components individually.

  We list this file here because it will get you started quickly with
  MathJax without having to worry too much about configurations; but
  since it is one of the most general of the combined component files,
  it is also one of the largest, so you might want to consider a
  smaller one that is more tailored to your needs.  See the section on
  :ref:`web-configuration` for more details on how this is done, and
  on :ref:`web-components` for information about the components
  themselves.

If you use the code snippet given above, you will not need to change
the URL whenever MathJax is updated and the version changes, because
``jsdelivr`` offers the ``mathjax@3`` notation for obtaining the
``tex-mml-chtml.js`` file from the latest version (3.x.x) available on
the CDN.

.. _latest-version:

Getting the Latest Version
--------------------------

Although ``jsdelivr`` provides a means of getting the latest version
automatically, as described above, not all CDNs have a mechanism for
that.  For such CDNs, MathJax provides a ``latest.js`` file that can
be used to obtain the latest (3.x.x) version of MathJax.  For example,
``cdnjs`` doesn't have a mechanism for getting the latest 3.x.x
version automatically, so you can use

.. code-block:: html

   <script type="text/javascript" id="MathJax-script" async
     src="https://cdnjs.cloudflare.com/ajax/libs/mathjax/3.0.0/es5/latest?tex-mml-chtml.js">
   </script>

to obtain the latest (3.x.x) version of the ``tex-mml-chtml``
component from ``cdnjs``; even though you have started by asking for
version 3.0.0, the ``latest.js`` script will switch to the latest
3.x.x version automatically.


.. _specific_version:

Getting a Specific Version
--------------------------

It is also possible to always use a specific version, regardless of
the current version of MathJax.  To do this, simply give the full
version number in the URL; for example:

.. code-block:: html

   <script id="MathJax-script" async
     src="https://cdn.jsdelivr.net/npm/mathjax@3.0.0/es5/tex-mml-chtml.js">
   </script>

will always load version 3.0.0 of the ``tex-mml-chtml.js`` combined
component file.

Other CDNs have slightly different formats for how to specify the
version number.  For example, ``cdnjs`` uses the following:

.. code-block:: html

   <script type="text/javascript" id="MathJax-script" async
     src="https://cdnjs.cloudflare.com/ajax/libs/mathjax/3.0.0/es5/tex-mml-chtml.js">
   </script>

to get the same file.


.. _polyfill:

Browser Compatibility
---------------------

MathJax supports all modern browsers (Chrome, Safari,
Firefox, Edge), and most mobile browsers.  Include the
`polyfill <https://polyfill.io/v3/>`__ library in order to support
earlier browser versions (see their `browser support
<https://polyfill.io/v3/supported-browsers/>`__ page for details).
In particular, to allow MathJax version 3 to work with IE11, include the line

.. code-block:: html

   <script src="https://polyfill.io/v3/polyfill.min.js?features=es6"></script>

before the script that loads MathJax.

-----


.. _configure-mathjax:

Configuring MathJax
===================

The combined component files, like ``tex-mml-chtml.js``, include default
settings for the various options available in MathJax.  You may need
to adjust those to suit your needs.  For example, the TeX input
component does not enable single dollar signs as delimiters for
in-line mathematics because single dollar signs appear frequently in
normal text, e.g. "The price is $50 for the first one, and $40 for
each additional one", and it would be confusing the have "50 for the
first one, and" be typeset as mathematics.

If you wish to enable single dollar signs as in-line math delimiters,
you need to tell MathJax that by providing an explicit MathJax
configuration.  That is accomplished by using a ``<script>`` tag to
set the ``MathJax`` global variable to hold a configuration for
MathJax and placing that script before the one that loads the MathJax
component file that you are using.  For example

.. code-block:: html

   <script>
   MathJax = {
     tex: {
       inlineMath: [['$', '$'], ['\\(', '\\)']]
     }
   };
   </script>
   <script id="MathJax-script" async
     src="https://cdn.jsdelivr.net/npm/mathjax@3/es5/tex-chtml.js">
   </script>

configures MathJax's TeX input component to use ``$...$`` and
``\(...\)`` as delimiters for inline-math (this enabling single
dollar signs as math delimiters), and then loads the ``tex-chtml.js``
component for TeX input and CommonHTML output.

There are many options that can be set in this way.  See the section
on :ref:`web-configuration` for more details, and on
:ref:`configuring-mathjax` for information on the available options
for the various components.

-----


.. _writing-mathematics:

Putting Mathematics in a Web Page
=================================

Once MathJax is configured and loaded, it will look through your web
page for mathematics for it to process.  There are three available
formats for that mathematics: TeX/LaTeX, MathML, and AsciiMath.  The
TeX/LaTeX and AsciiMath formats are plain text formats that use
special delimiter characters to separate the mathematics from the rest
of the text of your document, while the MathML format is an XML format
that uses "tags" (similar to HTML tags) to represent the mathematics.
TeX and AsciiMath are often written by hand, but MathML usually is
generated by mathematical software or specialized editors.

See the section on :ref:`basic-mathematics` for more details about how
to enter mathematics in these three formats.

Note that once MathJax has processed the page, it will not run
again without you explicitly telling it to.  For example, if you add
new mathematics to the page after MathJax has already run, that math
will not be processed by MathJax until you request that to happen.
See the section on :ref:`typeset-math` for details of how to do that.

-----


.. _web-what-now:

Where to Go from Here?
======================

If you have followed the instructions above, you should now have
MathJax installed and configured on your web server, and you should be
able to use it to write web pages that include mathematics.  At this
point, you can start making pages that contain mathematical content!

You could also read more about the details of how to :ref:`customize
MathJax <web-configuration>`.

You can also check out the :ref:`MathJax examples <web-examples>` for
illustrations of using MathJax.

..
   If you are trying to use MathJax in blog or wiki software or in some
   other content-management system, you might want to read about :ref:`using
   MathJax in popular platforms <platforms>`.

If you are working on dynamic pages that include mathematics, you
might want to read about the :ref:`MathJax Application Programming
Interface <mathjax-api>` (its API), so you know how to include
mathematics in your interactive pages.

Finally, if you have questions or comments, or want to help support
MathJax, you could visit the :ref:`MathJax community forums
<community-forums>` or the :ref:`MathJax bug tracker
<community-tracker>`.

|-----|
