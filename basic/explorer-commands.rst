.. _explorer-commands:

.. raw:: html

  <style>
  td.first {
    vertical-align: top;
    width: 7.5em;
  }
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

##########################
Keyboard Explorer Commands
##########################


The keyboard explorer is used to interact with a mathematical expression using
keyboard commands. Interaction allows a reader to traverse an expression in a
mathematical meaningful way, examining sub-expressions and diving into details as
they see fit.

The keyboard explorer supports multiple types of output: Speech and
Braille output for the sub-expression that is explored, magnification of that
sub-expression, and synchronised highlighting with the navigation.

Navigation can be started when a MathJax expression is focused and quit at any
time during the exploration.  When navigation is restarted, the application will
continue where the user has left off within the expression.


Overview of key bindings
========================

Essential Keys
--------------

.. _essential-keys:
.. raw:: html

        <table>
        <tr><td class="first"><kbd>Enter</kbd></td><td>Activate explorer. Requires math expression to have the focus.
        </td></tr>
        <tr><td class="first"><kbd>Escape</kbd></td><td>Leave exploration mode.
        </td></tr>
        <tr><td class="first">&emsp;</td></tr>
        
        <tr><td class="first"><kbd>Down</kbd></td><td>Explore next lower level of the formula
        by moving down in the sub-expression tree. Exploration will start at the
        left-most sub-expression on the level.</td></tr>
        
        <tr><td class="first"><kbd>Up</kbd></td><td>Move up the sub-expression tree.</td></tr>
        <tr><td class="first"><kbd>Right</kbd></td><td>Navigate the expression horizontally by moving to the next sub-expression on the current level.</td></tr>
        <tr><td class="first"><kbd>Left</kbd></td><td>Navigate the expression horizontally by moving to the previous sub-expression on the current level.</td></tr>
        </table>
        <br/>


An earcon is played as indicator that the boundary of an expression has been
reached in either direction.


Advanced Options
----------------

.. _advanced-options:
.. raw:: html

        <table>
        <tr><td class="first"><kbd>Tab</kbd></td><td>Repeat previous speech-text or announcement.</td></tr>
        <tr><td class="first"><kbd>Space</kbd></td><td>Get positional information; i.e., the current level in the sub-expression tree as well as collapsibility/expandability of the current subexpression.</td></tr>
        <tr><td class="first"><kbd>Enter</kbd></td><td>Collapse or expand expression under cursor, if possible.
        Speech-text is regenerated to match.</td></tr>
        <tr><td class="first"><kbd>Home</kbd></td><td>Navigate directly to top-most level of expression.</td></tr>
        <tr><td class="first"><kbd>X</kbd></td><td>Summarise the expression under cursor, without collapsing it.</td></tr>
        <tr><td class="first"><kbd>Z</kbd></td><td>Give detailed description of expression under cursor, without expanding it.</td></tr>
        <tr><td class="first"><kbd>V</kbd></td><td>Start new virtual cursor from the current position.</td></tr>
        <tr><td class="first"><kbd>P</kbd></td><td>Go to last position or previous virtual cursor</td></tr>
        <tr><td class="first"><kbd>U</kbd></td><td>Undo all virtual cursors; i.e.; go to position where first virtual cursor was started.</td></tr>
        <tr><td class="first"><kbd>&gt;</kbd></td><td>Switch rule sets between MathSpeak and ClearSpeak, if both are available for the current locale.</td></tr>
        <tr><td class="first"><kbd>&lt;</kbd></td><td>Cycle styles or preferences for the currently active rule sets.</td></tr>
        </table>
        <br/>


Special key combinations for navigating tables
----------------------------------------------

.. _special-keys:
.. raw:: html

        <table>
        <tr><td class="first"><kbd>Shift</kbd>+<kbd> Down</kbd></td><td>Move one cell vertically down in the table.</td></tr>
        <tr><td class="first"><kbd>Shift</kbd>+<kbd> Up</kbd></td><td>Move one cell vertically up in the table.</td></tr>
        <tr><td class="first"><kbd>Shift</kbd>+<kbd> Right</kbd></td><td>Move one cell horizontally right in the table.</td></tr>
        <tr><td class="first"><kbd>Shift</kbd>+<kbd> Left</kbd></td><td>Move one cell horizontally left in the table.</td></tr>
        <tr><td class="first">&emsp;</td></tr>
        <tr><td class="first"><kbd>0-9</kbd>+<kbd>0-9</kbd></td><td>Move directly to cell (n,m) if it exists.
            (0,0) is cell (10,10).</td></tr>
        </table>
        </br>
        

Special Notes
=============

.. note::

   Depending on the implementation quality of the particular
   browser/screenreader/OS combination (especially Chrome and IE), users might
   have to disable screenreader reading modes (e.g., "browse mode" in NVDA,
   "virtual cursor" in JAWS) before being able to launch the MathJax explorer application.



|-----|
