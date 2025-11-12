.. raw:: html

  <style>
  .rst-content dl dt {
    float: left;
    width: 5em;
    text-align: center;
    margin: initial;
  }
  .rst-content dl dd {
    margin: 0 0 10px 5em;
  }
  #special-keys-for-navigating-tables dt {
    width: 10em;
  }
  #special-keys-for-navigating-tables dd {
    margin-left: 10em;
  }
  </style>

.. _explorer-commands:

##########################
Explorer Keyboard Commands
##########################

The expression explorer is used to interact with a mathematical
expression using keyboard commands. This allows a reader to traverse
an expression in a mathematical meaningful way, examining
sub-expressions and diving into details as they see fit.

The keyboard explorer supports multiple types of output: Speech and
Braille output for the sub-expression that is explored, magnification
of that sub-expression, and synchronised highlighting with the
navigation.

Navigation starts when a MathJax expression is focused and can be quit
at any time during the exploration.  When navigation is restarted, the
application will begin at the top level of the expression again.
There is a menu setting that instead causes the explorer to start
where the user has left off within the expression when it is
re-focused.  Note, however, that this may mean that only that
sub-expression will be read when the page is read as a whole.


Overview of key bindings
========================

.. _essential-keys:

Essential keys
--------------

|bkey| Down |ekey|
    Explore the next lower level of the formula by moving down in the
    sub-expression tree. Exploration will start at the left-most
    sub-expression on the level.

|bkey| Right |ekey|
    Navigate the expression horizontally by moving to the next
    sub-expression on the current level.

|bkey| Left |ekey|
    Navigate the expression horizontally by moving to the previous
    sub-expression on the current level.

|bkey| Up |ekey|
    Move up the sub-expression tree.

-----

|bkey| Tab |ekey|
    Move to the next focusable item in the page.

|bkey| Escape |ekey|
    Leave exploration mode while keeping the expression focused.

|bkey| Enter |ekey|
    Re-activate the explorer after leaving it, provided it still has
    the focus.

An earcon is played as indicator that the boundary of an expression
has been reached when moving in any direction.


.. _advanced-options:

Advanced Keys
-------------

|bkey| Space |ekey|
    Opens the MathJax contextual menu.

|bkey| Enter |ekey|
    Collapse or expand the expression under cursor, if
    possible. The speech-text is regenerated to match.

|bkey| Home |ekey|
    Jump directly to the top-most level of the expression.

-----

|bkey| S |ekey|
    Toggle auto-voicing with synchronous highlighting.  This uses the
    browser's speech synthesis API directly, so is available even
    without a screen reader.  This mode remains in effect until turned
    off.  It can also be controlled via the MathJax contextual menu.

|bkey| D |ekey|
    Get positional information; i.e., the current level in the
    sub-expression tree as well as collapsibility/expandability of the
    current subexpression.

|bkey| X |ekey|
    Summarise the selected sub-expression, without collapsing it.

|bkey| Z |ekey|
    Give a detailed description of the selected sub-expression,
    without expanding it.

-----

|bkey| V |ekey|
    Mark the current position for later retrieval.

|bkey| P |ekey|
    Go to the last marked position in the expression.  Repeated use
    cycles through the marked locations in the expression.

|bkey| U |ekey|
    Undo all marked locations, and go to the position where navigation
    was started.

-----

|bkey| > |ekey|
    Switch rule sets between MathSpeak and ClearSpeak, if both are
    available for the current locale.

|bkey| < |ekey|
    Cycle styles or preferences for the currently active rule sets.


.. _special-keys:

Special keys for navigating tables
----------------------------------

|bkey| Shift |ekey| + |bkey| Down |ekey|
    Move one cell vertically down in the table.

|bkey| Shift |ekey| + |bkey| Up |ekey|
    Move one cell vertically up in the table.

|bkey| Shift |ekey| + |bkey| Right |ekey|
    Move one cell horizontally right in the table.

|bkey| Shift |ekey| + |bkey| Left |ekey|
    Move one cell horizontally left in the table.

-----

|bkey| 0-9 |ekey| + |bkey| 0-9 |ekey|
     Jump directly to cell (n,m) if it exists.  (0,0) is cell (10,10).


Special Notes
=============

Some screen readers have separate "focus" and "browse" modes.
MathJax's explorer is set up to initiate focus mode when an expression
is focused, but in some situations that may not occur automatically.
In that case, you will have to enter focus mode manually in order to
use the explorer.  How this is done depends on the screen reader, so
consult its documentation for details.

Once the focus mode is started, you may need to exit focus mode
manually when you are done exploring the expression.  How that is done
depends on the screen reader, so consult the reader's documentation
for details on how to accomplish that.

|-----|
