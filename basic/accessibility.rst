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

.. note::

    We strongly suggest that you use the MathJax Accessibility extensions to
    provide the best possible experience for all users.

The Accessibility Extensions can be enabled using the MathJax
Contextual Menu (right-click on any typeset expression), and are
loaded automatically when enabled.  The contextual menu code is
included in all the combined MathJax components, such as ``tex-chtml``
and ``mml-svg``.  If you are making a custom configuration, you can
include ``ui/menu`` to enable the contextual menu, or you can include
any of the :ref:`a11y extensions <accessibility-components>` explicitly.


.. _screenreader-support:

Legacy Support via AssistiveMML.js
==================================

Some screen readers support MathML, MathJax's internal format.
Screenreaders like ChromeVox, JAWS (on IE), and Texthelp support
MathJax directly; other screenreaders were supported in version 2 by
its AssistiveMML extension.

.. note::

   The AssistiveMML extension has not ben ported to version 3, but you
   can implement a work-alike, as described in the :ref:`AssistiveMML <AssistiveMML>`
   section.

The ``AssistiveMML`` extension embeds visually hidden MathML alongside
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

The expected result for MathJax given the current state of technology is roughly the following:

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

Support Matrix (AssistiveMML.js)
--------------------------------

Below is a summary of results for MathML enabled screenreaders and the
legacy AssistiveMML extension, based on tests as well as user reports.

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
  <br/>

Notes on Apple VoiceOver
------------------------

* **VoiceOver** on OSX

  * *Safari*. The visually-hidden MathML is read out and gets an
    outline. Visual rendering is ignored correctly. VoiceOver
    somtimes drops parts of the equation due to its partial MathML
    support.
  * *Chrome*. The visually-hidden MathML is detected but VoiceOver
    does not read it correctly (only e.g., "4 items detected; math";
    this seems like a VO bug); an outline is added. Visual rendering
    is ignored correctly.
  * *Firefox*. The visually-hidden MathML is only read as a string of
    contained characters; an outline is added. Visual rendering is
    ignored correctly.

* **VoiceOver** on iOS

  * The "slide two fingers from top to read screen" method will read
    the visually-hidden MathML. Visual rendering is ignored correctly.
  * Manual exploration.

    * Exploration by swiping left/right will read the visually-hidden MathML. Visual rendering is ignored correctly.
    * Tapping on an equation does not work due to the visually-hidden MathML being placed in a 1px box.


Notes on MathPlayer 4 and Internet Explorer 11
----------------------------------------------

Design Science suggests that you always use IE's Enterprise mode for
MathPlayer in IE11, `see their documentation
<http://www.dessci.com/en/products/mathplayer/tech/default.htm#Enterprise_mode>`__.
However, it seems that this is only required for MathPlayer's visual
rendering to work and this additionally requires the MathPlayer
BrowserHelperAddon to be active in IE.

Unfortunately, the MathPlayer BrowserHelperAddon can lead to
crashes. E.g., if you switch MathJax's output to the NativeMML output,
MathPlayer will crash IE11; you'll have to clear the MathJax cookie
to reset things. Also, in a plain MathML sample (without MathJax),
clicking on the MathPlayer rendering will crash IE11.

Using IE's Enterprise mode should work with NVDA and the AssistiveMML extension
but they don't seem to work with NVDA and plain MathML pages.

We suggest you do not switch on IE's Enterprise mode on pages using MathJax and
we also have to strongly suggest that you **not** use the BrowserHelperAddon with MathJax
on IE11.

-----

More Information
================

.. toctree::

   Accessibility extensions                <a11y-extensions>
   Available explorer keyboard commands    <explorer-commands>

|-----|
