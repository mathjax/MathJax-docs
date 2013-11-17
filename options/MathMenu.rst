.. _configure-MathMenu:

**********************
The MathMenu extension
**********************

The options below control the operation of the contextual menu that is
available on mathematics that is typeset by MathJax.
They are listed with their default values.  To set any of these
options, include a ``MathMenu`` section in your
:meth:`MathJax.Hub.Config()` call.  For example

.. code-block:: javascript

    MathJax.Hub.Config({
      MathMenu: {
        delay: 600
      }
    });

would set the ``delay`` option to 600 milliseconds.

.. describe:: delay: 150

    This is the hover delay for the display (in milliseconds) for
    submenus in the contextual menu:  when the mouse is over a submenu
    label for this long, the menu will appear.  (The submenu also will
    appear if you click on its label.)

.. describe:: helpURL: "http://www.mathjax.org/help/user/"

    This is the URL for the MathJax Help menu item.  When the user
    selects that item, the browser opens a new window with this URL.

.. describe:: showRenderer: true

    This controls whether the "Math Renderer" item will be displayed
    in the "Math Settings" submenu of the MathJax contextual menu.
    It allows the user to change between the `HTML-CSS`, `NativeMML`,
    and `SVG` output processors for the mathematics on the page.  Set
    to ``false`` to prevent this menu item from showing.
   
.. describe:: showFontMenu: false

    This controls whether the "Font Preference" item will be displayed
    in the "Math Settings" submenu of the MathJax contextual menu.
    This submenu lets the user select what font to use in the
    mathematics produced by the `HTML-CSS` output processor.  Note that
    changing the selection in the font menu will cause the page to
    reload.  Set to ``false`` to prevent this menu item from showing.

.. describe:: showLocale: true

    This controls whether the "Language" item will be displayed in the
    MathJax contextual menu.  This submenu allows the user to select
    the language to use for the MathJax user interface, including the
    contextual menu, the about and help dialogs, the message box at
    the lower left, and any warning messages produced by MathJax.  Set
    this to ``false`` to prevent this menu item from showing.  This
    will force the user to use the language you have set for MathJax.

.. describe:: showMathPlayer: true

    This controls whether the "MathPlayer" item will be displayed in
    the "Math Settings" submenu of the MathJax contextual menu.  This
    submenu lets the user select what events should be passed on to
    the `MathPlayer plugin
    <http://www.dessci.com/en/products/mathplayer/>`_, when it is
    present.  Mouse events can be passed on (so that clicks will be
    processed by MathPlayer rather than MathJax), and menu events can
    be passed on (to allow the user access to the MathPlayer menu).
    Set to ``false`` to prevent this menu item from showing.
   
.. describe:: showContext: false

    This controls whether the "Contextual Menu" item will be displayed
    in the "Math Settings" submenu of the MathJax contextual menu.
    It allows the user to decide whether the MathJax menu or the
    browser's default contextual menu will be shown when the context
    menu click occurs over mathematics typeset by MathJax.  Set to
    ``false`` to prevent this menu item from showing.

.. describe:: semanticsAnnotations: { ... }

    These are the settings for the Annotation submenu of the "Show
    Math As" menu. If the ``<math>`` root element has a
    ``<semantics>`` child that contains one of the following
    annotation formats, the source will be available via the "Show
    Math As" menu.  Each format has a list of possible encodings. For
    example, ``"TeX": ["TeX", "LaTeX", "application/x-tex"]`` will map
    an annotation with an encoding of ``"TeX"``, ``"LaTeX"``, or
    ``"application/x-tex"`` to the ``"TeX"`` menu.
   
.. describe:: windowSettings: { ... }

    These are the settings for the ``window.open()`` call that
    creates the `Show Source` window.  The initial width and height
    will be reset after the source is shown in an attempt to make the
    window fit the output better.

.. describe:: styles: {}

    This is a list of CSS declarations for styling the menu
    components.  See the definitions in ``extensions/MathMenu.js`` for
    details of what are defined by default.  See :ref:`CSS Style
    Objects <css-style-objects>` for details on how to specify CSS
    style in a JavaScript object.

