.. _v4-accessing:

====================
Accessing MathJax v4
====================

MathJax version 4.0 can be accessed via CDN as

.. code-block::

   https://cdn.jsdelivr.net/npm/mathjax@4/tex-mml-chtml.js

using any one of the :ref:`combined components <combined-components>`:

* ``tex-html.js``
* ``tex-svg.js``
* ``tex-mml-chtml.js``
* ``tex-mml-svg.js``
* ``mml-html.js``
* ``mml-svg.js``

Note that the ``/es5`` directory is no longer needed in the URL.  See
the :ref:`v4-es6-modules` section for more details on this change.

Each of the combined component files includes the ``mathjax-newcm``
font, but also comes in a version ending in ``-nofont.js`` (e.g.,
``tex-mml-chtml-nofont.js``) that does not include it, where you are
expected to specify the font using the ``output.font`` configuration
option.  This saves your readers from having to download the
``mathjax-newcm`` font that is not going to be used.  See the section
:ref:`v4-fonts` for details about the available fonts and how to
access them.

The other combined configurations from v3 have been removed, as they
were either redundant (now that the explorer is already included in
all combined components), or where the ones that included
``tex-full``.  The latter have been removed because you will need to
use the promise-based calls anyway, and that will handle the
autoloading of extensions as well, and since the ``all-packages``
extension doesn't include the newer packages, so isn't really "all"
packages anyway, it has also been removed.  See the section on
:ref:`v4-all-packages` for more information, and for an example of how
to implement an ``all-packages`` work-wround.


.. _v4-scoped-packages:

MathJax Scoped NPM Packages
===========================

With version 4, MathJax has moved to scoped packages for the source
and font npm packages.  The ``mathjax-full`` package is now
``@mathjax/scr``, and the font packages are
``@mathjax/mathjax-stix2-font``, ``@mathjax/mathjax-fira-font``, and
so on.  Future extensions and other packages will be in the
``@mathjax`` scope as well.  The only exception is that the
``mathjax`` package remains un-scoped.  Since the use of MathJax in
browsers is primarily through the ``mathjax`` package, that means the
URL for loading MathJax will remain the same, with only the version
number needing to be changed and the ``/es5`` directory removed.  That
is, you can use

.. code-block:: shell

   https://cdn.jsdelivr.net/npm/mathjax@4/tex-mml-chtml.js

to load the latest version 4 of MathJax.  To obtain the source version
to include in a node project, you would use

.. code-block:: shell

   pnpm install @mathjax/src@4
   pnpm install @mathjax/mathjax-newcm-font

and if you want a different font, a command like

.. code-block:: shell

   pnpm install @mathjax/mathjax-stix2-font

to get the latest `mathjax-stx2` font package.  The other fonts can be
obtained similarly.


.. _v4-browser-fonts:

Combined Components with Fonts
==============================

In a browser, when you specify the :data:`font` option in the
:data:`output` (or :data:`chtml` or :data:`svg`) block of the MathJax
configuration, MathJax should access the fonts from
``cdn.jsdelivr.net`` automatically.  But if you load a :ref:`combined
component <combined-components>` like ``tex-mml-chtml.js``, it will
include the ``mathjax-newcm`` font data, even if you are loading
another font.

You can overcome this by loading the ``-nofont`` version of the
combined configuration, but there is also another approach.  The font
packages include combined configuration files that are equivalent to
``tex-mml-chtml.js`` and ``tex-mml-svg.js``, but that include that
package's font rather than ``mathjax-newcm``.

For example, the ``mathjax-stix2-font`` package includes
``tex-mml-chtml-mathjax-stix2.js`` and
``tex-mml-svg-mathjax-stix2.js``, so you can use

.. code-block:: shell

   https://cdn.jsdelivr.net/npm/@mathjax/mathjax-stix2-font/tex-mml-chtml-mathjax-stix2.js

in order to get a single-file MathJax component that includes the
``mathjax-stix2`` font rather than ``mathjax-newcm``.

In particular, you can get the equivalent of the ``tex-mml-html.js``
file with the original MathJax TeX font all in one file using

.. code-block:: shell

   https://cdn.jsdelivr.net/npm/@mathjax/mathjax-tex-font/tex-mml-chtml-mathjax-tex.js

This font does not have dynamic ranges (all the font data is in one
file), so it should operate much the same as MathJax v3 in that
respect.

Similarly, you could use the SVG versions to get MathJax with a
specific font with SVG output.

|-----|
