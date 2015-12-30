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

Many screenreaders support MathML, MathJax's internal format. Some screenreaders like ChromeVox, JAWS (on IE), and Texthelp support MathJax out of the box while other screenreaders can be supported via the :ref:`AssistiveMML extension <assistive-mml>`.

The ``AssistiveMML`` extension embeds visually hidden MathML alongside MathJax's visual rendering while hiding the visual rendering from assistive technology (AT) such as screenreaders. This allows most MathML-enabled screenreaders to read out the underlying mathematics. It's important to note that Presentation MathML is usually not expressive enough to voice it which is why screenreaders have to rely on heuristics to analyze the MathML semantically.

For lack of web standards, MathJax cannot (yet) make its visual output fully accessible, e.g., embed the MathML structure within its visual output to enable synchronized highlighting and exploration of the visual output. We continue to work on better solutions as well as on improving the existing web standards.

Effectively, there are three MathML screenreader engines: MathPlayer (as a third party library, e.g., JAWS, NVDA, Texthelp), Google ChromeVox (Chrome, ChromeOS, Android) and its improved derivative SpeechRuleEngine, as well as Apple VoiceOver (iOS, OSX). The quality of the voicing varies greatly among these tools with different levels of MathML feature support, different speech rule sets, and different voicing technologies.

The "best in class" / expected result for MathJax given the current state of technology is roughly the following:

* the visually-hidden MathML is read out correctly by AT (i.e., not just the character strings but, e.g., ``<mfrac>`` leads to "fraction"; this will vary with the MathML support of the screenreader).
* the visual rendering is not read out by AT
* the MathJax Menu triggers AT to say "clickable" before each math element.

  * This allows keyboard users to enter the MathJax Menu via space or menu key.

* the visually hidden MathML does not get an outline (usually placed at an odd location due to the target of the outline being visually hidden).

  * except in iOS VoiceOver, where this allows to hook into VoiceOver's exploration features.

Support Matrix
--------------

Below is a summary of results from our tests as well as user reports.

.. raw:: html

  <table>
      <thead>
          <tr>
              <th>Screenreader</th>
              <th>Browser</th>
              <th>OS</th>
              <th>Usable?</th>
              <th>Bugs</th>
          </tr>
      </thead>
      <tbody>
          <tr>
              <td>ChromeVox</td>
              <td>Chrome</td>
              <td>any</td>
              <td>+1</td>
              <td>no bugs</td>
          </tr>
          <tr>
              <td>NVDA</td>
              <td>any</td>
              <td>WinXP</td>
              <td>DNA</td>
              <td><a href="https://github.com/nvaccess/nvda/issues/5555#issuecomment-160598962">MathPlayer 4 does not support WinXP</a></td>
          </tr>
          <tr>
              <td>NVDA</td>
              <td>Chrome</td>
              <td>any</td>
              <td>DNA</td>
              <td><a href="https://github.com/nvaccess/nvda/issues/5555#issuecomment-160503827">Chrome issues prevent MathML support by NVDA</a></td>
          </tr>
          <tr>
              <td>NVDA</td>
              <td>Firefox</td>
              <td>Win7</td>
              <td>+1</td>
              <td>no bugs</td>
          </tr>
          <tr>
              <td>NVDA</td>
              <td>Firefox</td>
              <td>Win8.1</td>
              <td>+1</td>
              <td>no bugs</td>
          </tr>
          <tr>
              <td>NVDA</td>
              <td>Firefox</td>
              <td>Win10</td>
              <td>+1</td>
              <td>no bugs</td>
          </tr>
          <tr>
              <td>NVDA</td>
              <td>MS Edge</td>
              <td>Win10</td>
              <td>DNA</td>
              <td><a href="https://github.com/nvaccess/nvda/issues/5555#issuecomment-160598962">Edge issues prevent MathML support by NVDA</a></td>
          </tr>
          <tr>
              <td>NVDA</td>
              <td>IE11</td>
              <td>Win8.1</td>
              <td>+1</td>
              <td>no bugs</td>
          </tr>
          <tr>
              <td>NVDA</td>
              <td>IE10</td>
              <td>Win7</td>
              <td>+1</td>
              <td>no bugs</td>
          </tr>
          <tr>
              <td>NVDA</td>
              <td>IE9</td>
              <td>Win7</td>
              <td>+1</td>
              <td>no bugs</td>
          </tr>
          <tr>
              <td>JAWS</td>
              <td>any</td>
              <td>WinXP</td>
              <td>DNA</td>
              <td><a href="http://www.freedomscientific.com/Downloads/jaws/jaws16features#JAWSXP">JAWS 15 was the last version to support Windows XP but MathML support in JAWS starts with JAWS 16</a></td>
          </tr>
          <tr>
              <td>JAWS</td>
              <td>Chrome</td>
              <td>any</td>
              <td>DNA</td>
              <td><a href="http://www.freedomscientific.com/Downloads/jaws/jaws16features">JAWS only supports IE and Firefox</a></td>
          </tr>
          <tr>
              <td>JAWS</td>
              <td>Firefox</td>
              <td>Win8.1</td>
              <td>+1</td>
              <td>no bugs</td>
          </tr>
          <tr>
              <td>JAWS</td>
              <td>Firefox</td>
              <td>Win7</td>
              <td>+1</td>
              <td>no bugs</td>
          </tr>
          <tr>
              <td>JAWS</td>
              <td>Firefox</td>
              <td>Win10</td>
              <td>+1</td>
              <td>no bugs</td>
          </tr>
          <tr>
              <td>JAWS</td>
              <td>MS Edge</td>
              <td>Win10</td>
              <td>DNA</td>
              <td><a href="http://www.freedomscientific.com/Downloads/jaws/jaws16features">JAWS only supports IE and Firefox</a></td>
          </tr>
          <tr>
              <td>JAWS</td>
              <td>IE11</td>
              <td>Win8.1</td>
              <td>+1</td>
              <td>no bugs</td>
          </tr>
          <tr>
              <td>JAWS</td>
              <td>IE10</td>
              <td>Win7</td>
              <td>+1</td>
              <td>no bugs</td>
          </tr>
          <tr>
              <td>JAWS</td>
              <td>IE9</td>
              <td>Win7</td>
              <td>+1</td>
              <td>no bugs</td>
          </tr>
          <tr>
              <td>VoiceOver</td>
              <td>Safari</td>
              <td>OSX</td>
              <td>+1</td>
              <td>see notes below</td>
          </tr>
          <tr>
              <td>VoiceOver</td>
              <td>Chrome</td>
              <td>OSX</td>
              <td>DNA</td>
              <td>Chrome and VoiceOver issues prevent MathML support in this combination.</td>
          </tr>
          <tr>
              <td>VoiceOver</td>
              <td>Firefox</td>
              <td>OSX</td>
              <td>DNA</td>
              <td>Chrome and Firefox issues prevent MathML support in this combination.</td>
          </tr>
          <tr>
              <td>Orca</td>
              <td>Firefox</td>
              <td>Ubuntu 15.10</td>
              <td>+1</td>
              <td>no bugs</td>
          </tr>
          <tr>
              <td>Orca</td>
              <td>Web</td>
              <td>Ubuntu 15.10</td>
              <td>DNA</td>
              <td><a href="https://mail.gnome.org/archives/orca-list/2015-July/msg00010.html">Chrome issues prevent MathML support by ORCA</a></td>
          </tr>
          <tr>
              <td>Orca</td>
              <td>Chrome(ium)</td>
              <td>Ubuntu 15.10</td>
              <td>DNA</td>
              <td><a href="https://mail.gnome.org/archives/orca-list/2015-July/msg00010.html">Chrome issues prevent MathML support by ORCA</a></td>
          </tr>
      </tbody>
  </table>

Notes on Apple VoiceOver
========================

* **VoiceOver** on OSX

  *  *Safari*. The visually-hidden MathML is read out and gets an outline. Visual rendering is ignored correctly. VoiceOver somtimes drops parts of the equation due to its partial MathML support.
  * *Chrome*. The visually-hidden MathML is detected but VoiceOver does not read it correctly (only e.g., "4 items detected; math"; this seems like a VO bug); an outline is added. Visual rendering is ignored correctly.
  * *Firefox*. The visually-hidden MathML is only read as string of contained characters; an outline is added. Visual rendering is ignored correctly.

* **VoiceOver** on iOS

  * The "slide two fingers from top to read screen" method will read the visually-hidden MathML. Visual rendering is ignored correctly.
  * Manual exploration.

    * Exploration by swiping left/right will read the visually-hidden MathML. Visual rendering is ignored correctly.
    * Tapping on an equation does not work due to the visually-hidden MathML being placed in a 1px box.


Notes on MathPlayer 4 and Internet Explorer 11
==============================================

Design Science suggests to always use IE's Enterprise mode for MathPlayer in IE11, `see their documentation <http://www.dessci.com/en/products/mathplayer/tech/default.htm#Enterprise_mode>`__.
However, it seems that this is only required for MathPlayer's visual rendering
to work and this additionally requires the MathPlayer BrowserHelperAddon to be
active in IE.

Unfortunately, the MathPlayer BrowserHelperAddon can lead to crashes. E.g., if
you switch MathJax's output to the NativeMML output, MathPlayer will crash IE 11; you'll have to clear the MathJax cookie to reset things. Also, in a plain MathML sample (without MathJax), clicking on the MathPlayer rendering will crash
IE11.

Using IE's Enterprise mode should work with NVDA and the AssistiveMML extension
but they don't seem to work with NVDA and plain MathML pages.

We suggest you do not switch on IE's Enterprise mode on pages using MathJax and
we also have to strongly suggest **not** to use the BrowserHelperAddon with MathJax
on IE 11.
