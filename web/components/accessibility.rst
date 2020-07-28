.. _accessibility-components:

########################
Accessibility Components
########################

Currently, there are three components designed specifically to support
assistive technology.

* :ref:`semantic-enrich-component`
* :ref:`complexity-component`
* :ref:`explorer-component`
* :ref:`assistive-mml-component`

To load one of these components, include the component name in the
:attr:`load` array of the :attr:`loader` block of your MathJax
configuration.  For example:

.. code-block:: html

   <script>
   MathJax = {
     loader: {
       load: ['a11y/semantic-enrich']
     }
   }
   </script>

to load the `semantic-enrich` extension.

.. note::

   The `auto-collapse` extension has not yet been converted to version
   3, but will be in a future release.

.. note::

   The `assistive-menu` extension is now part of the standard
   :ref:`contextual menu extension <menu-component>`, so doesn't have
   to be loaded separately.

-----

.. _semantic-enrich-component:

a11y/semantic-enrich
====================

The `semantic-enrich` component connects MathJax with the `Speech
Rule Engine <https://github.com/zorkow/speech-rule-engine>`_, which
allows MathJax to generate speech strings for the mathematics that it
processes.  These can be attached to the output for use by screen
readers, or for use with the :ref:`explorer-component` component
described below.

See the :ref:`semantic-enrich-options` section for information about
configuring this component.

-----


.. _complexity-component:

a11y/complexity
===============

The `complexity` component computes a complexity measure for each
element within an expression, and allows complex expressions to
"collapse" to make them both shorter, and simpler to read.  The
collapsed portions can be expanded with a click of the mouse, or by
keyboard actions when using the :ref:`explorer-component` extension
described below.

See the :ref:`complexity-options` section for information about
configuring this component.

-----


.. _explorer-component:

a11y/explorer
=============

The `explorer` component allows readers to explore a mathematical
expression interactively.  When an expression is focused (by tabbing to
it, or by clicking on it), a reader can "enter" the expression by
pressing shift-space on the keyboard.  The arrow keys then move the
reader through the expression (down moves to more detail by selecting
the first subexpression of the selected expression, up moves to more
complete expressions, while left and right move through the
sub-expressions at the current level).  See the :ref:`accessibility`
section for more details about using the expression explorer and its
various features.

See the :ref:`explorer-options` section for information about
configuring this component.

-----


.. _assistive-mml-component:

a11y/assistive-mml
==================

The `assistive-mml` component embeds visually hidden MathML alongside
MathJax's visual rendering while hiding the visual rendering from
assistive technology (AT) such as screenreaders. This allows most
MathML-enabled screenreaders to read out the underlying
mathematics. It's important to note that Presentation MathML is
usually not expressive enough to voice the mathematics properly in all
circumstances, which is why screenreaders have to rely on heuristics
to analyze the MathML semantically.  See the
:ref:`screenreader-support` section for more details about screen
reader support via the `assistive-mml` extension.

See the :ref:`assistive-mml-options` section for information about
configuring this component.


|-----|
