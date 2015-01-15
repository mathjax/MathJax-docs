.. _configure-CHTML-preview:

*****************************
The CHTMLpreview extension
*****************************

The options below control the operation of the `CHTML-preview`
extension that is run when you include ``"CHTML-preview.js"`` in the
`extensions` array of your configuration.  They are listed with their
default values.  To set any of these options, include a
``CHTML-preview`` section in your :meth:`MathJax.Hub.Config()` call.
For example

.. code-block:: javascript

    MathJax.Hub.Config({
      "CHTML-preview": {
        Chunks: {EqnChunk: 10000, EqnChunkFactor: 1, EqnChunkDelay: 0},
        color: "inherit!important",
        updateTime: 30, updateDelay: 6,
        messageStyle: "none",
        disabled: false
      }
    });

would ask for the CommonHTML output to run as a preview (`disabled: false`), 
force inheritance of the surrounding text color, and set the `updateTime` and 
`updateDelay` to  low values (30ms / 6ms) to speed up
the preview pass. Furthermore, it configures the second pass to set the 
chunking (`Chunks`) to a reflow every 10,000 equations and disables the 
progress messages (`messageStyle`).

This extension provides a two-pass rendering mode. A **first**, fast-but-rough 
rendering is genereated as a preview, using the 
:ref:`configure-CommonHTML`, then a **second** pass using the 
configured output jax runs to update the preview output.

This two-pass mode will provide the reader with a quick, decent rendering to 
start reading immediately, while silently updating that rendering with the
high quality layout later.


.. describe:: EqnChunk: 10000
              EqnChunkFactor: 1
              EqnChunkDelay: 0

    These values control how "chunky" the **second** pass will be. For more 
    information see :ref:`configure-HTML-CSS` and :ref:`configure-SVG`.

.. describe:: color: "inherit!important"

    This value allows you to choose a text color for the **first** passs.

.. describe:: updateTime: 30
              updateDelay: 6

    These values control how often the **second** pass will pause to allow user
    interaction (e.g., scrolling).

.. describe:: messageStyle: "none"

    This value controls the verbosity of the processing messages during the
    the **second** pass; see :ref:`configure-hub` for more information.

.. describe:: disabled:false

    This value enables or disables the preview mode. In particular,
    it allows overriding a combined configuration file, cf. 
    :ref:`common-configurations`. The user can independently enable or disable 
    the fast preview via the MathJax Menu.