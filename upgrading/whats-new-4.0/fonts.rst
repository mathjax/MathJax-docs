.. _v4-fonts:

=====================
Extended Font Support
=====================

MathJax v4 includes support for a number of new font sets for MathJax,
and changes the default font to ``mathjax-newcm``, one that is based
on the `New Computer Modern
<https://tug.org/FontCatalogue/newcomputermodernroman/>`__ fonts; it
offers support for a much larger range of characters than MathJax's
original TeX font set, but is consistent with the look-and-feel of the
original MathJax TeX fonts.  The new set is slightly lighter, so will
not seem so bold and will fit in better on Windows machines, without
losing too much on linux, Mac OS, and iOS displays.  The original
MathJax TeX font set is also available as an option, for those who are
unwilling to part with it.

There are 11 fonts available for MathJax v4:

+-----------------+---------------------------------------------------------------------+
| Font Name       |  Original Source                                                    |
+=================+=====================================================================+
| mathjax-asana   |  A version of the Asana-Math font                                   |
+-----------------+---------------------------------------------------------------------+
| mathjax-bonum   |  A version of the Gyre Bonum font                                   |
+-----------------+---------------------------------------------------------------------+
| mathjax-dejavu  |  A version of the Gyre DejaVu font                                  |
+-----------------+---------------------------------------------------------------------+
| mathjax-fira    |  A version of the Fira and Fira-Math fonts (a sans-serif font)      |
+-----------------+---------------------------------------------------------------------+
| mathjax-modern  |  A version of Latin-Modern                                          |
+-----------------+---------------------------------------------------------------------+
| mathjax-newcm   |  A version of New Computer Modern (the new default font in MathJax) |
+-----------------+---------------------------------------------------------------------+
| mathjax-pagella |  A version of the Gyre Pagella font                                 |
+-----------------+---------------------------------------------------------------------+
| mathjax-schola  |  A version of the Gyre Schola font                                  |
+-----------------+---------------------------------------------------------------------+
| mathjax-stix2   |  A version of the STIX2 font                                        |
+-----------------+---------------------------------------------------------------------+
| mathjax-termes  |  A version of the Gyre Termes font                                  |
+-----------------+---------------------------------------------------------------------+
| mathjax-tex     |  The original MathJax TeX font                                      |
+-----------------+---------------------------------------------------------------------+

In addition, there is an extension that can be loaded on top of any of these fonts:

+-----------------+---------------------------------------------------+
| Font Name       |  Original Source                                  |
+=================+===================================================+
| mathjax-euler   | A version of the Neo Euler font as an extension   |
+-----------------+---------------------------------------------------+

There are also several font extensions used internally to handle some LaTeX packages:

+-----------------+-------------------------------------------+
| Font Name       |  TeX extension using this font extension  |
+=================+===========================================+
| mathjax-bbm     | The :ref:`tex-bbm`    TeX extension       |
+-----------------+-------------------------------------------+
| mathjax-bboldx  | The :ref:`tex-bboldx` TeX extension       |
+-----------------+-------------------------------------------+
| mathjax-dsfont  | The :ref:`tex-dsfont` TeX extension       |
+-----------------+-------------------------------------------+
| mathjax-mhchem  | The :ref:`tex-mhchem` TeX extension       |
+-----------------+-------------------------------------------+

These are managed by the TeX packages that implement their associated
macros, so you won't need to load these yourself.  They are listed
here only for completeness.

.. _v4-font-selection-web:

Specifying a Font to Use on the Web
===================================

You can specify the font you want to use by setting the :data:`font`
option in the new :data:`output` block of your MathJax configuration
(where options common to all output renders can be placed).  For
example,

.. code-block:: js

   MathJax = {
     output: {
       font: 'mathjax-stix2'
     }
   };

will select the ``mathjax-stix2`` font.  For in-browser use, this will
obtain the font and its data from ``cdn.jsdelivr.net`` and no other
configuration is necessary.  It is also possible to configure the path
to the fonts using the :data:`fontPath` option of the :data:`output`
block of your MathJax configuration.  This should be set to a string
that indicates where the font can be found; that string should include
``%%FONT%%`` in any part of the path where the font name needs to
appear.  For example,

.. code-block:: js

   MathJax = {
     output: {
       fontPath: '@mathjax/%%FONT%%-font'
     }
   };

is the default path in node applications.

It is also possible to specify an explicit URL as the font name in the
configuration:

.. code-block:: js

   MathJax = {
     output: {
        font: 'https://cdn.jsdelivr.net/npm/@mathjax/mathjax-stix2-font'
     }
   };

For those who wish to use the original MathJax font as it appears in
version 3, specify the font as ``mathjax-tex``.


.. _v4-font-selection-node:

Specifying a Font in Node Applications
======================================

For node applications, first install the font via something like

.. code-block:: shell

   npm install @mathjax/mathjax-stix2-font

by adding ``-font`` to the name of whichever font you want and install that
from the ``@mathjax`` scope.  Here we selected the STIX2 font.

For node applications that use the MathJax Components framework, fonts
are selected as described for web pages above; MathJax should find the
font in your ``node_modules/@mathjax`` folder automatically.

For applications that use direct access to the MathJax modules, you
should import the font you want and pass to the output jax using the
:data:`fontData` option when instantiating it.  For example

.. code-block:: js

   import {MathJaxStix2Font} from '@mathjax/mathjax-stix2-font/js/chtml.js';
   import {CHTML} from '@mathjax/src/js/output/chtml.js';

   const chtml = new CHTML({fontData: MathJaxStix2Font});

creates a CommonHTML output jax with the STIX2 fonts.  If you will be
packaging your application for use on the web, you may need to specify
the :data:`fontPath` to point to the location on the web where MathJax
should load additional font data, either a CDN, or your own server.
For example,

.. code-block:: js

   import {MathJaxStix2Font} from '@mathjax/mathjax-stix2-font/js/chtml.js';
   import {CHTML} from '@mathjax/src/js/output/chtml.js';

   const chtml = new CHTML({
     fontData: MathJaxStix2Font,
     fontPath: 'https://cdn.jsdelivr.net/npm/@mathjax/mathjax-stix2-font'
   });

uses the jsdelivr CDN to deliver the web fonts and dynamic character
data for the STIX2 font.


.. _v4-font-components:

Combined Components with Alternate Fonts
========================================

The combined component files, like ``tex-chtml.js`` and
``mml-svg.js``, include the new ``mathjax-newcm`` font as part of the
component so that only one file needs to be downloaded.  But if you
want to use a different font, you probably don't want to download
``mathjax-newcm`` first and then the font you actually want to use.
Instead, you should use a component ending in ``-nofont.js``, for
example, ``tex-chtml-nofont.js``, so that the initial download is
smaller as it doesn't include ``mathjax-newcm``.  See the section on
:ref:`v4-promises` for more details concerning the
proper handling of typesetting with the new fonts.

In addition, the font packages themselves include versions of the
``tex-mml-chtml.js`` and ``tex-mml-svg.js`` combined components that
include the given font instead of ``mathjax-newcm``.  See the section
on :ref:`v4-browser-fonts` for details on this.


.. _v4-font-tools:

The Font Tools
==============

The tools for building the data needed by MathJax for your own font
will be made available after version 4 is officially released.  They
were used to create these new fonts, but are not yet ready for public
use, as they need cleaning up and documentation.  But in the future,
you will be able to generate an extension to an existing font (for
example, to replace the letters and numbers with a different font
while leaving all the rest of the characters unchanged), or a
completely new font.  So look for that functionality in the future.


|-----|
