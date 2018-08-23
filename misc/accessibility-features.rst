.. _accessibility-features:

**********************************
Accessibility Features
**********************************

MathJax's mission is to provide the best tools for mathematics on the
web. Naturally, this means for everyone and thus accessibility is an
important concern for us.

.. _mathjax-ui-a11y:

MathJax User Interface
----------------------

The MathJax user interface consists of the :ref:`MathJax Menu
<configure-MathMenu>` and the various MathJax Processing Messages, cf
:ref:`the core configuration <configure-hub>`.

The user interface is localized to over 20 languages and many more
partial localizations thanks to the fantastic support of `the
community at TranslateWiki.net
<https://translatewiki.net/wiki/Translating:MathJax>`__.

The MathJax Menu also follows WCAG 2.0 guidelines. Each MathJax
fragment is included in the tab order; the menu can be triggered via
the space or menu key; and navigation in the menu is possible using
the arrow keys.

MathJax Accessibility Extensions
--------------------------------

.. note::

    We strongly suggest that you use the MathJax Accessibility extensions to
    provide the best possible experience for all users.

The :ref:`MathJax Accessibility extensions <a11y-extensions>` provide
several tools and features that enable universal rendering of
mathematics on the web. They enhance rendering both visually and
aurally. In particular:

- An innovative responsive rendering of mathematical content through collapsing and exploration of subexpressions.
- An aural rendering tool providing on-the-fly speech-text for
  mathematical content and its subexpressions using various rule sets.
- An exploration tool, allowing for meaningful exploration of
  mathematical content including multiple highlighting features and
  synchronized aural rendering.

The Accessibility Extensions support the widest selection of browsers,
operating systems, and assistive technologies as they only require
the use of well-supported web standards such as WAI-ARIA, in
particular labels and live regions.


.. _screenreader-support:

Legacy Support via AssistiveMML.js
----------------------------------

.. warning::

  We no longer recommend this approach as it separates visual from
  non-visual rendering and can have greatly varying results in terms of
  features and quality, depending on the assistive technologies (AT),
  browsers and OS used by end users. We strongly recommend the
  :ref:`MathJax Accessibility extensions <a11y-extensions>` instead
  which provide a reliable, high-quality solution that works with
  almost all AT.

Some screen readers have partial support for MathML, MathJax's internal
format. While the :ref:`MathJax Accessibility extensions <a11y-extensions>`
provide a universal solution that works with most assistive technologies (AT),
some users may benefit from the :ref:`AssistiveMML extension <assistive-mml>`.

The ``AssistiveMML`` extension embeds visually hidden MathML alongside
MathJax's visual rendering while hiding the visual rendering from
assistive technology such as screenreaders. This allows most
MathML-enabled screenreaders to read out the underlying
mathematics. It's important to note that Presentation MathML is
usually not expressive enough to voice the expressions properly in all
circumstances, which is why screenreaders have to rely on heuristics
to analyze the MathML semantically.

The quality of MathML support in screenreaders varies greatly, with
different levels of MathML feature support, different speech rule
sets, and different voicing technologies.

The expected result for the AssistiveMML extension given the current state
of technology is roughly as follows:

* The visually-hidden MathML is read out by AT, i.e., not
  just the text content but superscripts or fractions will be voiced as such.
  The quality will vary greatly with the MathML support of the  AT).
* The visual rendering is ignored by AT, in particular synchronous highlighting
  and other state-of-the-art features are not possible.
* The MathJax Menu triggers AT to say "clickable" before each math element.

  * This allows keyboard users to enter the MathJax Menu via space or menu key.

* The visually hidden MathML does not get an outline (usually placed
  at an odd location due to the target of the outline being visually
  hidden).

