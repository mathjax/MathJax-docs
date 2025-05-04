.. _font-support:

####################
MathJax Font Support
####################

MathJax version 4 includes support for a number of new font sets for
MathJax, and changes the default font to one based on the New Computer
Modern fonts, which offer support for a much larger range of characters
than MathJax's original TeX font set, but is consistent with the
look-and-feel of the original MathJax TeX fonts.  The new set is
slightly lighter, so will not seem so bold and will fit in better on
Windows machines, without losing too much on linux, Mac OS, and iOS
displays.  The original MathJax TeX font set is also available as an
option, for those who are unwilling to part with it.

There are 11 fonts available for MathJax v4:

+-----------------+--------------------------------------------------------+
| Font Name       | Original Source                                        |
+=================+========================================================+
| mathjax-newcm   | Based on New Computer Modern (now the default font)    |
+-----------------+--------------------------------------------------------+
| mathjax-asana   | A version of the Asana-Math font                       |
+-----------------+--------------------------------------------------------+
| mathjax-bonum   | A version of the Gyre Bonum font                       |
+-----------------+--------------------------------------------------------+
| mathjax-dejavu  | A version of the Gyre DejaVu font                      |
+-----------------+--------------------------------------------------------+
| mathjax-fira    | A version of the Fira and Fira-Math fonts              |
+-----------------+--------------------------------------------------------+
| mathjax-modern  | A version of Latin-Modern                              |
+-----------------+--------------------------------------------------------+
| mathjax-pagella | A version of the Gyre Pagella font                     |
+-----------------+--------------------------------------------------------+
| mathjax-schola  | A version of the Gyre Schola font                      |
+-----------------+--------------------------------------------------------+
| mathjax-stix2   | A version of the STIX2 font                            |
+-----------------+--------------------------------------------------------+
| mathjax-termes  | A version of the Gyre Termes font                      |
+-----------------+--------------------------------------------------------+
| mathjax-tex     | The original MathJax TeX font                          |
+-----------------+--------------------------------------------------------+

You can specify the font you want to use by setting the :data:`font`
option in the new :data:`output` block of your MathJax configuration
(where options common to both output renderers can be placed).  For
example,

.. code-block:: javascript

    MathJax = {
      output: {
        font: 'mathjax-stix2'
      }
    };

will select the ``mathjax-stix2`` font.  For in-browser use, this will
obtain the font and its data from ``cdn.jsdelivr.net`` and no other
configuration is necessary.  For node applications, first install the
font via

.. code-block:: shell

   npm install @mathjax/mathjax-stix2-font

(add ``-font`` to the name of whichever font you want, and obtain it
from the ``@mathjax`` scope); MathJax should find the font in your
:file:`node_modules/@mathjax` folder.  It is also possible to
configure the path to the fonts using the :data:`fontPath` option of
the :data:`output` block.  This should be set to a string that
indicates where the font can be found; that string should include
``%%FONT%%`` in any part of the path where the font name needs to
appear.  For example,

.. code-block:: javascript

    MathJax = {
      output: {
        fontPath: '@mathjax/%%FONT%%-font'
      }
    };

is the default path in node applications.

It is also possible to specify an explicit URL as the font name in the
configuration:

.. code-block:: javascript

    MathJax = {
      output: {
         font: 'https://cdn.jsdelivr.net/npm/@mathjax/mathjax-stix2-font'
      }
    };

For those who wish to use the original MathJax font as it appears in
version 3, specify the font as ``mathjax-tex``.

The combined component files, like ``tex-chtml.js`` and
``mml-svg.js``, include the new ``mathjax-newcm`` font as part of the
component so that only one file needs to be downloaded.  But if you
want to use a different font, you probably don't want to download
``mathjax-newcm`` first and then the font you actually want to use.
Instead, you should use a component ending in ``-nofont.js``, for
example, ``tex-chtml-nofont.js``, so that the initial download is
smaller, as it doesn't include ``mathjax-newcm``.

-----

.. _font-extensions:

Font Extensions
===============

MathJax v4 also includes the ability to add new ranges of characters
to an existing font, or to replace some characters with alternative
ones.  An extension may only apply to a specific font (if it relies
on the existing characters to make stretchy assemblies, for example),
but others may be able to apply to any font.

Currently, there are four extensions, and all can be applied to any of
the fonts listed above.

+-----------------+---------------------------------+
| Font Name       | Original Source                 |
+=================+=================================+
| mathjax-euler   | A version of the Neo Euler font |
+-----------------+---------------------------------+
| mathjax-bbm     | The bbm double-struck fonts     |
+-----------------+---------------------------------+
| mathjax-bboldx  | The bboldx double-struck fonts  |
+-----------------+---------------------------------+
| mathjax-dsfont  | The dsfont double-struck fonts  |
+-----------------+---------------------------------+

The last three of these are loaded automatically by the
:ref:`tex-bbm`, :ref:`tex-bboldx`, and :ref:`tex-dsfont` extensions,
respectively, when they are added to the :data:`load` array in the
:data:`loader` section of your configuration, or if you use
``\require`` to load the extension.  They don't actually replace the
original double-struck characters, but instead, place the new ones in
a separate *pseudo-variant* used internally by MathJax, so are
available only through the macros provided by the corresponding TeX
extension.

For ``mathjax-euler``, configure MathJax to load the given extension.
For example,

.. code-block:: javascript

   MathJax = {
     loader: {
       paths: {font: 'https://cdn.jsdelivr.net/npm/@mathjax'},
       load: ['[font]/mathjax-euler-font']
     }
   };

would load the ``mathjax-euler`` font extension onto the default font
being used.

-----

.. _unknown-characters:

Character Fallbacks
===================

No font contains a suitable glyph for every character specified in the
Unicode standard.  When MathJax encounters a character that isn't in
the font that it is using, it will fall back to other fonts in a
variety of ways.

First, MathJax can enhance the coverage in a particular font by
combining characters that already exist in order to form new ones.
For example, in the ``mathjax-tex`` font, which has a double integral
(U+222C) but no quadruple integral (U+2A0C), MathJax an use two copies
of the double integral to generate a quadruple integral.

If MathJax can't find or create a needed character in its fonts, it
will look through a fallback chain for the font variant in use.  For
example, if an expression requests a double-struck letter for which no
double-struck glyph is available, a bold-faced one will be used, if
possible, otherwise, the normal version will be shown, if there is
one.

When a character is not available anywhere in the fallback chain,
MathJax will ask the browser to provide the glyph from a system font.
Since in that final case, MathJax will not have the necessary data on
the glyph's bounding box, MathJax will guess these metrics.  When run
in a browser, MathJax will be able to determine the character's width,
but not its height and depth, so it will use default values for these
metrics.  Measuring the width can negatively affect the rendering
speed, and guessing the height and depth can reduce the quality of the
resulting output.  When used on a server or in a command-line
application, MathJax won't even be able to determine the width, and
that has even more serous consequences for the layout, in general.
Thus it is best to use only the characters that are in the MathJax
fonts when using server-side rendering.

Fortunately, the new fonts in v4 all have much greater character
coverage than the original ``mathjax-tex`` font, so there should be
far fewer instances where the fallback mechanisms come into play.

-----

Dynamically Loaded Font Ranges
==============================

Because the new MathJax fonts include more extensive character
coverage, meaning much more data is required, the fonts have been
broken down into smaller pieces that can be loaded dynamically, rather
than being one big data file, as was the case with version 3. This
allows the initial download of MathJax to be smaller, while still
accommodating rarely used glyphs for those who need them.

As a result, however, when the data for one of these ranges is needed,
MathJax will pause and wait for the data to arrive from the CDN or
from your server.  That means that producing MathJax output is now
potentially an asynchronous process, which was not the case in v3.

In version 3, as long as you pre-loaded all the TeX extensions that
you needed, you could use synchronous calls to
:js:meth:`MathJax.typeset()`, :js:meth:`MathJax.tex2svg()`, or the
other similar functions.  With the new (larger) dynamic fonts in
version 4, that is no longer guaranteed to work.  Instead, if you are
using a font other than ``mathjax-tex``, you should use the
promise-based versions of these calls, like
:js:meth:`MathJax.typesetPromise()` or
:js:meth:`MathJax.tex2svgPromise()`, in order to properly handle the
potential for dynamically loaded font data.  Without this, you may get
a :ref:`"retry" error <retry-error>`, which is what MathJax uses to
mediate its asynchronous loading actions.

If you can not avoid using synchronous calls, then you may need to
load all the font dynamic data up front using a single promise-based
call before you start using MathJax synchronously.  This can be done
using

.. code-block:: javascript

   MathJax.startup.document.outputJax.font.loadDynamicFiles();

to load all the font dynamic data. This function returns a promise,
and you should wait for it to resolve before calling any MathJax
conversion functions using either ``await`` or the promise's
:meth:`then()` method.  For example, with the configuration

.. code-block:: javascript

   MathJax = {
     startup: {
       pageReady() {
         return MathJax.startup.document.outputJax.font
           .loadDynamicFiles()
           .then(() => MathJax.startup.defaultPageReady());
       }
     }
   };

you will be able to use synchronous calls once the
:js:data:`MathJax.startup.promise` resolves, so you will only have to
handle one asynchronous call and the rest can be synchronous.

Note, however, that this approach will load a *lot* of font data, and
this can greatly slow down your initial page processing, especially on
slow network connections like those for mobile devices.  Only do this
if you absolutely have to.  It is *far better* to use the
promise-based typesetting and conversion functions if you can.

If you know which font ranges you will need, it is possible to load
only the ones you will be using, which will still allow synchronous
typesetting, but not incur the startup penalty of loading *all* the
data files.  Here is a configuration that implements that approach:

.. code-block:: javascript

   MathJax = {
     fontFiles: ['calligraphic'],  // The dynamic font files to load
     startup: {
       pageReady() {
         const font = MathJax.startup.document.outputJax.font;
         const prefix = font.options.dynamicPrefix;
         const dynamic = font.constructor.dynamicFiles;
         const files = MathJax.config.fontFiles;
         return MathJax.loader
           .load(...(files.map((name) => `${prefix}/${name}`)))
           .then(() => files.forEach((name) => dynamic[name].setup(font)))
           .then(() => MathJax.startup.defaultPageReady());
       }
     }
   };

This example loads the ``calligraphic`` range at startup so that
``\mathcal{}`` can be used with synchronous typesetting calls.  You
can add more ranges to the :data:`fontFiles` lists as needed.  You
can find the names of the font ranges (which vary from font to font),
by entering

.. code-block:: javascript

   Object.keys(MathJax.startup.document.outputJax.font.constructor.dynamicFiles)

in the browser's developer console.

An alternative approach would be to create a custom build of MathJax
that preloads additional ranges of characters.  Examples based on
MathJax components are given in the :ref:`node-preload` section, and
ones that use direct calls to the MathJax modules are given in the
:ref:`node-direct` section.  These are node-based examples, but they
can be modified for browser use.

-----

.. _font-tools:

The MathJax Font Tools
======================

MathJax needs to know a lot of information about each of the
characters in the fonts that it uses, so MathJax has to provide the
necessary font data; this font data is generated during the creation
of the font npm packages and cannot be determined easily on the fly
within a browser.

The tools for building the data needed by MathJax for your own font or
font extension will be made available after version 4 is officially
released.  They were used to create these new fonts, but are not yet
ready for public release, as they need cleaning up and documentation.
But in the future, you will be able to generate an extension to an
existing font (for example, to replace the letters and numbers with a
different font while leaving all the rest of the characters
unchanged), or produce a completely new font.  So look for that
functionality in the future.


|-----|
