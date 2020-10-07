.. _legacy_accessibility:

##############################
Legacy Assistive Support in v2
##############################

Interactions between screen readers and MathJax are delicate and vary
from browser to broswer, operating system to operating system, and
screen reader to screen reader.  The following information was
gathered over time for version 2 of MathJax and various
broser/operating-system/screen-reader combinations.  The information
is several years old, and my no longer be completely accurate, as
features in browsers and screen readers change regularly.  Because
this inforamtion changes regularly with updates to browsers and screen
readers, we are unable to maintin a table like this for version 3.

Support Matrix (AssistiveMML.js)
================================

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
========================

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
==============================================

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

|-----|
