.. _accessibility-features:

**********************************
Accessibility Features
**********************************

MathJax's mission is to provide the best tools for mathematics on the web. Naturally, this means for everyone and thus accessibility is an important concern for us.

.. _mathjax-ui-a11y:

MathJax User Interface
----------------------

The MathJax user interface consists of the :ref:`MathJax Menu <configure-MathMenu>` and the various MathJax Processing Messages, cf :ref:`the core configuration <configure-hub>`.

The user interface is localized to over 20 languages and many more partial localizations thanks to the fantastic support of `the community at TranslateWiki.net <https://translatewiki.net/wiki/Translating:MathJax>`__.

The MathJax Menu also follows WCAG 2.0 guidelines. Each MathJax fragment is included in the tab order; the menu can be triggered via the space or menu key; and navigation in the menu is possible using the arrow keys

.. _screenreader-support:

Screenreader Support
---------------------

Many screenreaders support MathML, MathJax's internal format. Some screenreaders like ChromeVox, JAWS (on IE), and Texthelp support MathJax out of the box while other screenreaders can be supported via the :ref:`AssitiveMML extension <assistive-mml>`.

The ``AssitiveMML`` extension embeds visually hidden MathML alongside MathJax's visual rendering while hiding the visual rendering from assistive technology (AT) such as screenreaders. This allows most MathML-enabled screenreaders to read out the underlying mathematics. It's important to note that Presentation MathML is usually not expressive enough to voice it which is why screenreaders have to rely on heuristics to analyze the MathML semantically.

For lack of web standards, MathJax cannot (yet) make its visual output fully accessible, e.g., embed the MathML structure within its visual output to enable synchronized highlighting and exploration of the visual output. We continue to work on better solutions as well as on improving the existing web standards.

Effectively, there are three MathML screenreader engines: MathPlayer (as a third party library, e.g., JAWS, NVDA, Texthelp), Google ChromeVox (Chrome, ChromeOS, Android) and its improved derivative SpeechRuleEngine, as well as Apple VoiceOver (iOS, OSX). The quality of the voicing varies greatly among these tools with different levels of MathML feature support, different speech rule sets, and different voicing technologies.

The "best in class" / expected result for MathJax given the current state of technology is roughly the following:

* the visually-hidden MathML is read out correctly by AT (i.e., not just the character strings but, e.g., ``<mfrac>`` leads to "fraction"; this will vary with the MathML support of the screenreader).
* the visual rendering is not read out by AT
* the MathJax Menu triggers AT to say "clickable" before each math element.

  * This allows keyboard users to enter the MathJax Menu via space or menu key.

* the visually hidden MathML does not get an outline (usually placed at an odd location due to the target of the outline being visually hidden).

  * except in iOS VoiceOver, where this allows to hook into VoiceOver's exploration features.

Test results
------------

Below is a summary of results from our tests as well as user reports.

* **NVDA**

  * *IE9*. The visually-hidden MathML is read out as MathML, can be navigated, and does not get an outline. Visual rendering is ignored correctly. No "clickable" etc is read.
  * *IE10+ without MathPlayer*. The visually-hidden MathML is read out as plain text and does not get an outline. Visual rendering is ignored correctly. No "clickable" is read.
  * *IE10+ with MathPlayer* (MathPlayer IE plugin should be disabled). The `aria-hidden` attribute is removed from the extension's output for unknown reasons, cf. `issue 1235 <https://github.com/mathjax/MathJax/issues/1235>`__. Accordingly, NVDA reads out both the visual rendering and the hidden MathML; the MathML is read correctly and no outlines are applied, no "clickable" is read.
  * *Firefox*. The visually-hidden MathML is read out, can be navigated, and does not get an outline. Visual rendering is ignored correctly; "clickable" is read.
  * *Chrome*. (Win7, Win8). Both the MathML and visual rendering is skipped completely.

* **Jaws 16**

  * *IE11*. The visually-hidden MathML is read out as MathML and does not get an outline. Visual rendering is ignored correctly. No immediate keyboard navigation within the equation but invoking JAWS's math viewer allows exploration; tabular math is only summarized in the page ("table with two columns and three rows; math content"). No "clickable" is read.
  * *Chrome*. MathJax output is skipped ("blank") during navigation. During JAWS say-all mode, the MathJax script-tag (with MathML/TeX/asciimath source) is sometimes read out.
  * *Firefox*. The visually-hidden MathML is read out and does not get an outline. Visual rendering is ignored correctly. No immediate keyboard navigation within the page but invoking the math viewer allows tabular exploration; tabular math is only outlined in the page ("table with two columns and three rows; math content"). "Clickable" is read at the end of each equation.

* **ChromeVox**

  * While exploring the page, the visually-hidden MathML is read out and gets an outline. Visual rendering is ignored correctly.
  * When selecting a larger segment to read, both MathML and visual rendering is ignored.
  * switching to semantic reading works on the hidden MathML.

* **VoiceOver** (OSX)

  *  *Safari*. The visually-hidden MathML is read out and gets an outline. Visual rendering is ignored correctly. VoiceOver somtimes drops parts of the equation (possibly due to its partial implementation).
  * *Chrome*. The visually-hidden MathML is detected but VoiceOver does not read it correctly (only e.g., "4 items detected; math"; this seems like a VO bug); an outline is added. Visual rendering is ignored correctly.
  * *Firefox*. The visually-hidden MathML is only read as string of contained characters; an outline is added. Visual rendering is ignored correctly.

* **VoiceOver** (iOS)

  * The "slide two fingers from top to read screen" method will read the visually-hidden MathML and give it an outline. Visual rendering is ignored correctly. The outline added to the visually-hidden MathML can be used to double-tap to open exploration mode. At that point, native Safari rendering takes over so visual rendering might be different.
  * Manual exploration.

    * Exploration by swiping left/right will read the visually-hidden MathML and give it an outline. Visual rendering is ignored correctly. The outline added to the visually-hidden MathML can be used to double-tap to open exploration mode. At that point, native Safari rendering takes over so visual rendering might be different.
    * Tapping on an equation does not work due to the visually-hidden MathML being placed in a 1px box.
