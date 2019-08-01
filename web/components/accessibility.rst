.. _accessibility-components:

########################
Accessibility Components
########################

Currently, there are three components designed specifically to support
assistive technology.

* :ref:`semantic-enrich-component`
* :ref:`complexity-component`
* :ref:`explorer-component`

These are described below.

.. note::

   The `AssistiveMML` extension has not been ported to MathJax version
   3, and is unlikely to be in the future (but see the
   :ref:`mathml-output` section for some ideas about how to implement
   this functionality).  Also, the `auto-collapse` extension has not
   yet been converted to version 3, but will be in a future release.
   Finally, the `assistive-menu` extension is now part of the standard
   :ref:`contextual menu extension <menu-component>`, so doesn't have
   to be loaded separately.


.. _semantic-enrich-component:

a11y/semantic-enrich
====================

The `semantic-enrich` component connects MathJax with the `Speech
Rule Engine <https://github.com/zorkow/speech-rule-engine>`_, which
allows MathJax to generate speech strings for the mathematics that it
processes.  These can be attached to the output for use by screen
readers, or for use with the :ref:`explorer-component` component
described below.


.. _complexity-component:

a11y/complexity
===============

The `complexity` component computes a complecity measure for each
element within an expression, and allows complex epxressions to
"collapse" to make them both shorter, and simpler to read.  The
collapsed portions can be expanded with a click of the mouse, or by
keyboard actions when using the :ref:`explorer-component` extension
described below.


.. _explorer-component:

a11y/explorer
=============

The `explorer` component allows readers to explore a mathematical
expresion interactively.  When an expression is focused (by tabbing to
it, or by clicking on it), a reader can "enter" the expression by
pressing shift-space on the keyboard.  The arrow keys then move the
reader through the expression (down moves to more detail by selecting
the first subexpression of the selected expression, up moves to more
complete expressions, while left and right move through the
sub-expressions at the current level).  See the :ref:`accessibility`
section for more details about using the expression explorer and its
various features.

-----

.. raw:: html

   <span></span>
