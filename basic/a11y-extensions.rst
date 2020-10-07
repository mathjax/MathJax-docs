.. |bkey| raw:: html

   <kbd>

.. |ekey| raw:: html

   </kbd>
                
.. raw:: html

  <style>
  kbd  {
    display: inline-block;
    padding: 3px 5px;
    font-size: 11px;
    line-height: 10px;
    color: #444d56;
    vertical-align: middle;
    background-color: #fafbfc;
    border: solid 1px #c6cbd1;
    border-bottom-color: #959da5;
    border-radius: 3px;
    box-shadow: inset 0 -1px 0 #959da5;
  }
  </style>
  <br/>


.. _a11y-extensions:

#######################
Accessibility Extension
#######################

MathJax offers accessibility support via its own built-in extension that
provides a choice of support options as well as a high degree of
personalization.  The extension can be activated either via the context menu,
which itself is fully accessible, or by default using configuration
options. Similarly its various features and options are best selected via the
:ref:`MathJax Menu <menu-options>` or programmatically using the
:ref:`accessibility options <accessibility-options>`.  We discuss
the different features of the accessibility tool at the hand of the context
menu, roughly in the order in which they appear.

Most features of the Accessibility extensions are based on technology provided by
the `Speech Rule Engine <https://speechruleengine.org>`__. For some more details
and information please also see there.

MathJax's supports the widest selection of browsers, operating systems, and
assistive technologies as they only require the use of well-supported web
standards such as WAI-ARIA, in particular labels and live regions.

Interactive Exploration
=======================

The main feature is an interactive exploration mode that allows a reader to
traverse and explore sub-expressions step-by-step. The explorer is activated in
the context menu by checking the `Activate` item in the `Accessibility`
sub-menu.


Once a math expression is focused, the explorer can be started by pressing the
|bkey| Enter |ekey| key. The cursor keys then allow traversal of the expression.


.. toctree::
   :maxdepth: 1
   
   Available keyboard commands <explorer-commands>


During traversal, focused sub-expressions are highlighted and optionally
magnified. In addition, an aural rendering is pushed to a screen reader, if one
is available, and a tactile rendering can be read on a Braille display, if one
is connected.


Speech & Braille Support
========================

Both aural and tactile rendering can be controlled via the options in the
`Speech` sub-menu. `Speech Output` and `Braille Output`, respectively,
control whether or not speech or Braille output is generated. If speech is
generated, it is by default also displayed in `Speech Subtitles`, which can be
switched off and hidden. Braille on the other hand is by default hidden but can
be displayed by switching on the `Braille Subtitles`.

Speech is generally generated with respect to the currently chosen locale (if it
is available).  In addition, there are a number of different rule sets that can
be chosen for translating math to text, where each can have a number of
different preferences for how a particular expression is spoken. By default, MathJax
uses the `MathSpeak` rule set in `Verbose` mode; however, the menu allows this
to be changed to either the `ClearSpeak` or `ChromeVox`. Each rule set has
several different preference settings; three in the case of MathSpeak, for example,
which primarily influence the length of produced text.  `ClearSpeak
<https://docs.wiris.com/en/mathtype/mathtype_desktop/accessibility/clearspeak>`__
on the other hand has a large number of preferences that allow very fine-tuned
control over how different types of expressions are spoken. The MathJax menu
allows a smart choice of preferences by only displaying the preferences that
are currently relevant for the sub-expression that is currently explored.
The `Select Preferences` option opens a selection box for all possible
ClearSpeak preference choices.

Some rule-set and preference settings can also be controlled by keyboard
commands. This allows the user to have the same expression read in different
variants without having to leave the exploration mode.  The |bkey| > |ekey| key
switches rule sets between MathSpeak and ClearSpeak if both are available for
the current locale. The |bkey| < |ekey| key cycles preferences for the currently
active rule set.  For ClearSpeak rules, preference cycling depends on the type
of the currently explored sub-expression, similar to smart selection of menu
entries.

The speech language can be adjusted in the `Language` sub-menu in the
`Speech` options.  MathJax currently only supports speech in English,
French, German, and Spanish.  The only available Braille output is
Nemeth. We are hoping to add more in the future.

In addition to voicing expressions, the explorer allows for queries on
sub-expression, such as getting positional information with respect to the
context, as well as summaries of the sub-expression currently explored.
   


Abstraction
===========

In addition to textual summaries of expressions, MathJax offers the
possibility to abstract certain sub-expressions so that the entire
sub-expression is visually replaced by a placeholder symbol and
interactive traversal treats it as a single element. This allows the
reader to abstract away details and to better observe the overall
structure of a formula.

Abstraction can be triggered either via mouse click on a collapsible
expression or via pressing the |bkey| Enter |ekey| key during keyboard
exploration. Expressions that can be abstracted can also be discovered
using some of the highlighting features.


Highlight
=========

During interactive exploration, the sub-expression that is explorered is
automatically highlighted, by default with a blue background color. The
highlighting can be customized by changing `Background` or `Foreground`
colors in in the `Highlight` sub-menu of the MathJax contextual menu.
In addition, the opacity of both `Background` and `Foreground` can be
adjusted by two slider bars underneath the respective sub-menus.

The `Highlight` sub-menu also provides a choice of highlighters for
marking collapsible sub-expressions: The `Flame` highligher permanently
colors collapsible sub-expressions while successively darkening the
background for nested collapsible expressions. The `Hover` highlighter
colors each collapsible sub-expression only when hovering over it with
the mouse pointer.

A final highlighting feature is `Tree Coloring`, in which expressions are
visually distinguished by giving neighbouring symbols different, ideally
contrasting foreground colors.
   

Magnification
=============

During exploration, the accessibility extension can optionally magnify
the sub-expression that is currently explored. The zoomed version of
the expression is overlayed on the original one when traversing the
formula. For keyboard exploration, this can be switched on in the
`Magnification` sub-menu by selecting the `Keyboard` option.

A similar effect can be achieved by exploring an expression with the mouse.
When using the `Mouse` option in the `Magnification` sub-menu, the
sub-expression over which the mouse pointer hovers is zoomed.

The zoom factor of the magnification can also be adjusted.  The values
available in the context menu are `200%`, `300%`, `400%`, and
`500%`.


Semantic Info
=============

The `Semantic Info` sub-menu contains a number of options that allow the reader to see
the semantic classifications MathJax applies to a particular sub-expression, by
hovering over it with the mouse pointer. The choices here are


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

