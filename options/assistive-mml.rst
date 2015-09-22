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

See also :ref:`Screenreader support <assistive-technology-support>`.
