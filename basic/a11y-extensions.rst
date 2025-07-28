                
.. _a11y-extensions:

########################
Accessibility Extensions
########################

MathJax offers accessibility support via its own built-in extensions
that provide a choice of support options as well as a high degree of
personalization.  The extensions can be activated either via the
context menu, which itself is fully accessible, or a page author can
control the default settings using the Mathjax configuration object.
When the menu component is available, configuration should be done
using the :ref:`MathJax menu options <menu-options>`, otherwise use
the :ref:`accessibility options <accessibility-options>`.

Most features of the accessibility extensions are based on technology
provided by the `Speech Rule Engine <https://speechruleengine.org>`__,
a powerful tool for enhancing MathML expressions with additional
structural information, and for converting the enriched MathML into
speech text that can be read by a screen reader.

The accessibility features are controlled via the MathJax contextual
menu. In version 3, these were in an `Accessibility` sub-menu, but in
v4, there is a new `Accessibility` section in the main menu, with sub
menus for speech, Braille, the explorer, and other options.


.. _explorer-interaction:

Interactive Exploration
=======================

The main feature is an interactive exploration mode that allows a
reader to traverse and explore sub-expressions step-by-step.
Expressions typeset by MathJax are focusable, and when the user tabs
to or clicks on an expression, that starts the explorer, either on the
expression as a whole, or on the clicked sub-expression.
Double-clicking starts the explorer at the top level, just like
tabbing.

Exploration of the expression is performed using keyboard commands.
These are described in the :ref:`explorer-commands` section.  During
traversal, focused sub-expressions are highlighted and optionally
magnified; an aural rendering is pushed to a screen reader, and a
tactile rendering can be presented on a Braille display, if one is
connected, as described in the next section.

The `Explorer` sub-menu controls how the highlighting of the selected
sub-expression is performed.  Its `Highlight` sub-menu allows you to
select the background and foreground colors and their opacities.
Several other options are described in the :ref:`explorer-highlighting`
section.  The `Magnification` sub-menu is described below in the
:ref:`explorer-zoom` section.

The `Describe Math as` sub-menu lets you pick the phrase that will be
used when the screen reader voices a typeset expression, while `Help
message on focus` determines whether the "Press H for help" message is
read when the math is first focused.


.. _explorer-speech-and-braille:

Speech & Braille Support
========================


Both aural and tactile rendering can be controlled via the options in
the `Speech` and `Braille` sub-menus.  The `Generate` item in each
menu tells MathJax whether to include that format in its output, so
you can enable each form separately.  The `Show subtitles` item
determines whether the speech and/or Braille are shown on screen below
the expression as it is being explored.  This can even help sighted readers
to know how an expression should be pronounced.

The `Speech` sub-menu includes an option for `Auto Voicing` the
expression as it is navigated.  When this is selected, the expression
will be read by the browser's speech synthesis API, rather than a
screen reader, and the terms will be highlights as they are read.
This is useful, for example, for dyslexic users who benefit from the
synchronized highlighting.

There are a number of different rule sets that can be chosen for
translating math to text, where each can have a number of different
preferences for how a particular expression is spoken.  By default,
MathJax uses the `ClearSpeak`, however, the `Speech` sub-menu allows
also provides the `MathSpeak` option.

Each rule set has several different preference settings; three in the
case of MathSpeak, for example, which primarily influence the length
of produced text.  `ClearSpeak
<https://docs.wiris.com/en/mathtype/mathtype_desktop/accessibility/clearspeak>`__,
on the other hand, has a large number of preferences that allow very
fine-tuned control over how different types of expressions are
spoken. The MathJax menu allows a smart choice of preferences by only
displaying the preferences that are relevant for the sub-expression
that is currently selected.  The `Select Preferences` option opens a
selection box for all possible ClearSpeak preference choices.

Some rule-set and preference settings can be controlled by keyboard
commands. This allows the user to have the same expression read in
different variants without having to leave the exploration mode.  The
|bkey| > |ekey| key switches rule sets between MathSpeak and
ClearSpeak if both are available for the current locale. The |bkey| <
|ekey| key cycles preferences for the currently active rule set.  For
ClearSpeak rules, preference cycling depends on the type of the
currently explored sub-expression, similar to smart selection of menu
entries.

The language can be selected via the `Language` sub-menu in the
`Speech` menu.  MathJax currently supports speech in more than a dozen
languages, including English, French, German, Hindi, Spanish and
Korean.  Braille output is available in two forms: Nemeth and what we
call Eruo Braille.  The latter uses 8-dot Braille to represent the
underlying LaTeX expressions, when available, as is currently being
taught in gradeschools in a number of European countries.

In addition to voicing the sub-expressions during exploration, the
explorer allows for queries on sub-expression, such as getting
positional information with respect to the context, as well as
summaries of the sub-expression currently being explored.  See the
:ref:`explorer-commands` section for details.
   

.. _explorer-highlighting:

Highlighting
============

During interactive exploration, the sub-expression that is being
explorered is automatically highlighted, by default with a blue
background color. The highlighting can be customized by changing
`Background` or `Foreground` colors in in the `Highlight` sub-menu of
the `Explorer` section of the MathJax contextual menu.  In addition,
the opacity of both `Background` and `Foreground` can be adjusted by
two slider bars underneath the respective sub-menus.

The `Highlight` sub-menu also provides a choice of highlighters for
marking collapsible sub-expressions: the `Flame` highlighter
permanently colors collapsible sub-expressions while successively
darkening the background for nested collapsible expressions. The
`Hover` highlighter colors each collapsible sub-expression only when
the mouse pointer is hovering over it.

A final highlighting feature is `Tree Coloring`, in which expressions are
visually distinguished by giving neighbouring symbols different, ideally
contrasting foreground colors.
   

.. _explorer-zoom:

Magnification
=============

During expression exploration, the explorer can optionally magnify the
sub-expression that is currently selected. The zoomed version of the
expression is overlaid above the original one when traversing the
formula. For keyboard exploration, this can be switched on in the
`Magnification` sub-menu of the `Explorer` menu by selecting the
`Keyboard` option.

A similar effect can be achieved by exploring an expression with the
mouse.  When using the `Mouse` option in the `Magnification` sub-menu,
the sub-expression where the mouse is pointering is zoomed.

The zoom factor of the magnification can also be adjusted.  The values
available in the context menu are `200%`, `300%`, `400%`, and `500%`.


.. _explorer-semantic-info:

Semantic Info
=============

The `Semantic Info` sub-menu contains a number of options that allow the reader to see
the semantic classifications MathJax applies to a particular sub-expression, by
hovering over it with the mouse pointer. The choices here are:


* `Type`
  is an immutable property of an expression that is independent
  of its particular position in a formula. Note, however that types can change
  depending on the subject area of a document.
* `Role`
  is dependent on the context of a sub-expression in the overall expression.
* `Prefix`
  is information pertaining to the position of a
  sub-expression. Examples are ``'exponent'``, ``'radicand'``, etc. These would
  also be spoken during interactive exploration.
              
For more details on all of these concepts, see also the documentation of the
`Speech Rule Engine <https://speechruleengine.org>`__.


.. _explorer-collapse:

Collapsible Expressions
=======================

In addition to textual summaries of expressions, MathJax offers the
possibility to abstract certain sub-expressions so that the entire
sub-expression is visually replaced by a placeholder symbol and
interactive traversal treats it as a single element. This allows the
reader to abstract away details and to better observe the overall
structure of a formula.

Sub-expressions can be collapsed in this way either by clicking on
them with the mouse (the pointer should become a "pointing hand" when
that is possible), or by using the explorer to navigate to the
expression and then pressing the |bkey| Enter |ekey| or |bkey| Return
|ekey| key.  Clicking or pressing one of the these keys again will
return the expression to its original form.  Collapsible expressions
can also be discovered using some of the highlighting features, as
described above.

The ability to collapse sub-expressinos is controlled by the
`Collapsible Math` setting in the `Options` sub-menu of the MathJax
contextual menu.  This feature is off by default, but can be selected
by the user, or the default can be changed by the page author using
the :ref:`contextual menu configuration options <menu-options>`.

|-----|

