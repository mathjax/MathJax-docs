.. _accessibility:

######################
Accessibility Features
######################

MathJax's mission is to provide the best tools for mathematics on the
web. Naturally, this means for everyone and thus accessibility is an
important concern for us.


.. _mathjax-ui-a11y:

MathJax User Interface
======================

The MathJax user interface currently consists of the :ref:`MathJax
Menu <menu-options>` and the various MathJax messages, such as
syntax error messages from the TeX input processor.

The user interface for version 2 was localized to over 20 languages
and many more partial localizations thanks to the fantastic support of
`the community at TranslateWiki.net
<https://translatewiki.net/wiki/Translating:MathJax>`__.  Localization
is not yet available in version 3, but is on the roadmap for a future
version.

The MathJax Menu follows WCAG 2.0 guidelines. Each MathJax fragment is
included in the tab order; the menu can be triggered via the space or
menu key; and navigation in the menu is possible using the arrow keys.


MathJax Accessibility Extensions
================================

The :ref:`MathJax Accessibility extensions <a11y-extensions>` provide
several tools and features that enable universal rendering of
mathematics on the web. They enhance rendering both visually and
aurally. In particular:

- An innovative responsive rendering of mathematical content through collapsing
  and exploration of subexpressions.
- An aural rendering tool providing on-the-fly speech-text for mathematical
  content and its subexpressions using various rule sets.
- Tactile rendering tool enabling Nemeth Braille output on a connecte Braille
  displays.
- An exploration tool, allowing for meaningful exploration of mathematical
  content including multiple highlighting features, magnification and
  synchronized aural rendering.

The Accessibility Extensions support the widest selection of browsers,
operating systems, and assistive technologies as they only require
the use of well-supported web standards such as WAI-ARIA, in
particular labels and live regions.

The Accessibility Extensions can be enabled using the MathJax
Contextual Menu (right-click on any typeset expression), and are
loaded automatically when enabled.  The contextual menu code is
included in all the combined MathJax components, such as ``tex-chtml``
and ``mml-svg``.  If you are making a custom configuration, you can
include ``ui/menu`` to enable the contextual menu, or you can include
any of the :ref:`a11y extensions <accessibility-components>` explicitly.

See the :ref:`accessibility-options` section for details about how to
configure the extensions.

.. _screenreader-support:

Screen Reader Support
=====================

Some screen readers support MathML, MathJax's internal format.
Screenreaders like ChromeVox, JAWS (on IE), and TextHelp support
MathJax directly (most only version 2); other screenreaders are
supported by the ``assistive-mml`` extension as of version 3.0.1.

The ``assistive-mml`` extension embeds visually hidden MathML alongside
MathJax's visual rendering while hiding the visual rendering from
assistive technology (AT) such as screenreaders. This allows most
MathML-enabled screenreaders to read out the underlying
mathematics. It's important to note that Presentation MathML is
usually not expressive enough to voice the mathematics properly in all
circumstances, which is why screenreaders have to rely on heuristics
to analyze the MathML semantically.

The quality of MathML support in screenreaders varies greatly, with
different levels of MathML feature support, different speech rule
sets, and different voicing technologies.

The expected result for MathJax given the current state of technology
is roughly the following:

* The visually-hidden MathML is read out correctly by AT (i.e., not
  just the character strings but, e.g., ``<mfrac>`` leads to
  "fraction"; this will vary with the MathML support of the
  screenreader).
* The visual rendering is not read out by AT
* The MathJax Menu triggers AT to say "clickable" before each math element.

  * This allows keyboard users to enter the MathJax Menu via space or menu key.

* The visually hidden MathML does not get an outline (usually placed
  at an odd location due to the target of the outline being visually
  hidden).

  * except in iOS VoiceOver, where this allows the user to hook into VoiceOver's exploration features.

-----

More Information
================

.. toctree::

   Accessibility extensions                <a11y-extensions>
   Available explorer keyboard commands    <explorer-commands>
   Legacy Assistive Support in v2          <legacy-accessibility>

|-----|
