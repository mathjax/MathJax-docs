.. _accessibility-components:

########################
Accessibility Components
########################

Currently, there are five components designed specifically to support
assistive technology.

* :ref:`semantic-enrich-component`
* :ref:`speech-component`
* :ref:`explorer-component`
* :ref:`complexity-component`
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

The `semantic-enrich`, `speech`, and `explorer` components are part of
all the :ref:`combined components <combined-components>`, so if you
are using one of the those, you don't need to load these assistive
extensions yourself.

.. note::

   In v3, the `semantic-enrich` extension included both the semantic
   enrichment and the speech generation features of MathJax.  In v4,
   these functions are now accomplished by two distinct extensions,
   with the speech functionality being split off into a separate
   `speech` extension.

If you are not using a combined component, by are using the `ui/menu`
component, there are menu items that will cause these assistive
extensions to be loaded dynamically, so you don't need to load them
explicitly in that case.


.. note::

   The `auto-collapse` extension from version 2 has not yet been
   converted to the current version of MathJax, but will be in a
   future release.

.. note::

   The `assistive-menu` extension from version 2 is now part of the
   standard :ref:`contextual menu extension <menu-component>`, so
   doesn't have to be loaded separately.

-----

.. _semantic-enrich-component:

a11y/semantic-enrich
====================

The `semantic-enrich` component connects MathJax with the `Speech Rule
Engine <https://github.com/zorkow/speech-rule-engine>`_, which allows
MathJax to analyze the mathematics that it processes and add
attributes that represent the semantic structure of the mathematics.
The underlying MathML for each expression may be modified to better
represent that structure, improving line-breaking and speech
generation for the mathematics produced by MathJax.

See the :ref:`semantic-enrich-options` section for information about
configuring this component.

-----


.. _speech-component:

a11y/speech
===========

The `speech` component connects MathJax with the `Speech
Rule Engine <https://github.com/zorkow/speech-rule-engine>`_, which
allows MathJax to generate speech strings for the mathematics that it
processes.  These can be attached to the output for use by screen
readers, or for use with the :ref:`explorer-component` component
described below.

The speech component uses web-workers to do the speech computations
(which can be time-consuming) in a separate thread so that it doesn't
interfere with the responsiveness of your web pageor slow down the
display of the typeset math in your page.

See the :ref:`speech-options` section for information about
configuring this component.

-----


.. _explorer-component:

a11y/explorer
=============

The `explorer` component allows readers to explore a mathematical
expression interactively.  When an expression is focused by tabbing to
it, the expression can be explored usign the arrow keys, as described
below.  Clicking on a typeset expression will also enter the explorer
at the character that is clicked.

Once the explorer is activated, the arrow keys move the reader through
the expression: down moves to more detail by selecting the first
subexpression of the selected expression, up moves to more complete
expressions, while left and right move through the sub-expressions at
the current level.  See the :ref:`accessibility` section for more
details about using the expression explorer and its various features.

See the :ref:`explorer-options` section for information about
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
described above.

See the :ref:`complexity-options` section for information about
configuring this component.

-----


.. _assistive-mml-component:

a11y/assistive-mml
==================

The `assistive-mml` component embeds visually hidden MathML alongside
MathJax's visual rendering while hiding the visual rendering from
assistive technology (AT) such as screenreaders. This allows most
MathML-enabled screenreaders to read out the underlying
mathematics. It's important to note that Presentation MathML in not
expressive enough to voice the mathematics properly in all
circumstances, which is why screenreaders have to rely on heuristics
to analyze the MathML semantically.  See the
:ref:`screenreader-support` section for more details about screen
reader support via the `assistive-mml` extension.

See the :ref:`assistive-mml-options` section for information about
configuring this component.

.. note::

   In MathJax v2 and v3, the `assistive-mml` extension was loaded an
   enabled by default, but in v4, the `explorer` component has
   replaced it as the default assistive tool.  The explorer can be
   disabled, however, and the assistive MathML re-enabled using the
   MathJax contexutal menu on any typeset expression, and page
   author's can override the defaults in their MatghJax configuration
   objects, if they so desire.


|-----|
