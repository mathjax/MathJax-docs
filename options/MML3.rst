.. _configure-mml3:

******************
The MML3 extension
******************

The **experimental** MML3 extension is run when you include ``mml3.js`` in the
``extension`` array of the MathML section of your :meth:`MathJax.Hub.Config()` 
call. For example,

.. code-block:: javascript

    MathJax.Hub.Config({
      MathML: {
        extensions: ["mml3.js"]
      }
    });

The extension provides experimental support for the so-called elementary math 
elements as well as experimental support for bidirectional math.

The extension has no configuration options. 