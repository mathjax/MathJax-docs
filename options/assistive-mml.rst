.. _assistive-mml:

******************************
The AssistiveMML.js extension
******************************

The options below control the operation of the `AssistiveMML`
extension that is run when you include ``"AssistiveMML.js"`` in the
`extensions` array of your configuration.  They are listed with their
default values.  To set any of these options, include a
``AssistiveMML`` section in your :meth:`MathJax.Hub.Config()` call.

For example

.. code-block:: javascript

  MathJax.Hub.Config({
    "AssistiveMML.js": {
      disabled: false,
      styles: {
        ".MJX_Assistive_MathML": {
          position:"absolute!important",
          clip: (HUB.Browser.isMSIE && (document.documentMode||0) < 8 ?
                 "rect(1px 1px 1px 1px)" : "rect(1px, 1px, 1px, 1px)"),
          padding: "1px 0 0 0!important",
          border: "0!important",
          height: "1px!important",
          width: "1px!important",
          overflow: "hidden!important",
          display:"block!important"
        }
      }
    }
  })


would enable the extension and defines :ref:`CSS Style Objects <css-style-objects>` to define CSS applied to the MathML content embedded in the page.

The `AssistiveMML` extension embeds visually hidden MathML alongside MathJax's visual rendering while hiding the visual rendering from assistive technology (AT). This allows most math-enabled screenreaders to read out the underlying mathematics.

For lack of web standards, MathJax cannot (yet) make its visual output fully accessible, i.e., embed the MathML within its visual output to enable synchronized highlighting and exploration of the visual output. We continue to work on improving the existing web standards to improve this situation.

The "best"/expected result in the current state of technology is roughly the following:

* the visually-hidden MathML is read out correctly by AT (i.e., not as plain text)
* the visual rendering is not read out by AT
* the MathJax Menu triggers AT to say "clickable" before each math element.

  * This allows keyboard users to enter the MathJax Menu via space or othercontext-menu triggers.

* the visually hidden MathML does not get an outline (placed at an odd location due to the target of the outline being visually hidden)

  * except in iOS VoiceOver, where this allows to hook into VoiceOver's exploration features.

Below is a summary of compatible AT.

* Windows (7+)

  * NVDA (Windows 7 and 8.1)

    * IE9. The visually-hidden MathML is read out as MathML and does not get an outline. Visual rendering is ignored correctly. No "clickable" etc is read.
    * IE10+. Without MathPlayer, visually-hidden MathML is read out as plain text and does not get an outline. Visual rendering is ignored correctly. No "clickable" is read.
    * IE10+ with MathPlayer (but the IE plugin disabled). The `aria-hidden` attribute is removed from the extension's output for unknown reasons and cannot be re-applied. Accordingly, NVDA reads out both the visual rendering and the hidden MathML; the MathML is read correctly, no outlines are applied, no "clickable" is read.
    * FF 39. The visually-hidden MathML is read out and does not get an outline. Visual rendering is ignored correctly; "clickable" preceeds each equation.
    * Chrome. (Win7, Win8). Both the MathML and visual rendering is skipped completely (though the extension works as expected).

  * Jaws 16
    * IE11/Windows 8.1. The visually-hidden MathML is read out as MathML and does not get an outline. Visual rendering is ignored correctly. No immediate keyboard navigation within the page but invoking the math viewer allows tabular exploration; tabular math is only outlined in the page ("table with two columns and three rows; math content"). No "clickable" is read.
    * Chrome/Windows 8.1. MathJax output is skipped ("blank") during navigation. During say-all, the MathJax script-tag (with MathML/TeX/asciimath source) is sometimes read out.
    * Firefox/Windows 8.1.The visually-hidden MathML is read out and does not get an outline. Visual rendering is ignored correctly. No immediate keyboard navigation within the page but invoking the math viewer allows tabular exploration; tabular math is only outlined in the page ("table with two columns and three rows; math content"). "Clickable" is read at the end of each equation.

* ChromeVox

  * While exploring the page, the visually-hidden MathML is read out and gets an outline. Visual rendering is ignored correctly.
  * When selecting a larger segment to read, both MathML and visual rendering is ignored.
  * switching to semantic reading works on the hidden MathML.

* OSX VoiceOver

  *  Safari. The visually-hidden MathML is read out and gets an outline. Visual rendering is ignored correctly. VoiceOver somtimes drops parts of the equation (possibly due to its partial implementation).
  * Chrome. The visually-hidden MathML is detected but VoiceOver does not read it correctly (only e.g., "4 items detected; math"; this seems like a VO bug); an outline is added. Visual rendering is ignored correctly.
  * Firefox. The visually-hidden MathML is only read as string of contained characters; an outline is added. Visual rendering is ignored correctly.

* iOS VoiceOver

  * The "slide two fingers from top to read screen" method will read the visually-hidden MathML and give it an outline. Visual rendering is ignored correctly. The outline added to the visually-hidden MathML can be used to double-tap to open exploration mode. At that point, native Safari rendering takes over so visual rendering might be different.
  * Manual exploration.

    * Exploration by swiping left/right will read the visually-hidden MathML and give it an outline. Visual rendering is ignored correctly. The outline added to the visually-hidden MathML can be used to double-tap to open exploration mode. At that point, native Safari rendering takes over so visual rendering might be different.
    * Tapping on an equation does not work due to the visually-hidden MathML being placed in a 1px box.
