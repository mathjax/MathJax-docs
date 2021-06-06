.. _menu-options:

#######################
Contextual Menu Options
#######################

The `ui/menu` component implements the contextual menu that you get
when you right-click (or control-click) on a typeset expression.  The
settings in the menu are "sticky", which means that they are saved
from page to page and session to session (though they web-site
specific, so each web site has its own saved settings).

As a page author, you can alter the default settings of the menu by
using the ``menuOptions`` block of the ``options`` section of your
MathJax configuration, as described below.

The `ui/menu` component adds a render action called ``addMenu`` that
attaches the menu event handlers to the typeset output. (It also adds
a second render action called ``checkLoading`` that mediates the
loading of extensions needed by the contextual menu.  For example,
when the assistive :ref:`explorer-component` component is first
activated, MathJax may need to load the `a11y/explorer` component;
this render action makes sure that has happened before any math is
typeset.)

If you want to disable the contextual menu, you can set the
:attr:`enableMenu` option to ``false``:

-----

The Configuration Block
=======================

.. code-block:: javascript

    MathJax = {
      options: {
        enableMenu: true,          // set to false to disable the menu
        menuOptions: {
          settings: {
            texHints: true,        // put TeX-related attributes on MathML
            semantics: false,      // put original format in <semantic> tag in MathML
            zoom: 'NoZoom',        // or 'Click' or 'DoubleClick' as zoom trigger
            zscale: '200%',        // zoom scaling factor
            renderer: 'CHTML',     // or 'SVG'
            alt: false,            // true if ALT required for zooming
            cmd: false,            // true if CMD required for zooming
            ctrl: false,           // true if CTRL required for zooming
            shift: false,          // true if SHIFT required for zooming
            scale: 1,              // scaling factor for all math
            inTabOrder: true,      // true if tabbing includes math

            assistiveMml: true,    // true if hidden assistive MathML should be generated for screen readers
            collapsible: false,    // true if complex math should be collapsible
            explorer: false,       // true if the expression explorere should be active
          },
          annotationTypes: {
            TeX: ['TeX', 'LaTeX', 'application/x-tex'],
            StarMath: ['StarMath 5.0'],
            Maple: ['Maple'],
            ContentMathML: ['MathML-Content', 'application/mathml-content+xml'],
            OpenMath: ['OpenMath']
          }
        }
      }
    };

-----


Option Descriptions
===================

.. _menu-enableMenu:
.. describe:: enableMenu: true

   This controls whether the MathJax contextual menu will be added to
   the typeset mathematics or not.
   
.. _menu-settings:
.. describe:: settings: {...}

   These settings give the default menu settings for the page, though
   a user can change them using the menu.  These are described in the
   comments in the example above.

.. _menu-annotationTypes:
.. describe:: annotationTypes: {...}

   These are the settings for the "Annotation" submenu of the "Show
   Math As" menu. If the ``<math>`` root element has a ``<semantics>``
   child that contains one of the specified annotation formats, the
   source will be available via the "Show Math As" and "Copy to
   Clipboard" menus. Each format has a list of possible encodings. For
   example, the line

   .. code-block:: javascript
                   
      TeX: ['TeX', 'LaTeX', 'application/x-tex']

   maps an annotation with an encoding of ``TeX``, ``LaTeX``, or
   ``application/x-tex`` to the "TeX" entry in the "Annotation"
   sub-menus.

-----


Developer Options
=================

.. code-block:: javascript

    MathJax = {
      options: {
        MenuClass: Menu,
        menuOptions: {
          jax: {
            CHTML: null,
            SVG: null
          }
        }
      }
    };

.. _menu-MenuClass:
.. describe:: menuClass:  Menu

   The ``Menu`` object class to use for creating the menu.  This
   allows you to create a subclass of ``Menu`` and pass that to
   the document in pace of the default one.

.. _menu-jax:
.. describe:: jax: {CHTML: null, SVG: null}

   This lists the output jax instances to be used for the different
   output formats.  These will get set up automatically by the menu
   code if you don't specify one, so it is only necessary to set these
   if you want to manage the options specially.

|-----|
