.. _configure-handle-floats:

***************************
The handle-floats extension
***************************

The floats extension for the HTML-CSS output is run when you include 
``handle-floats.js`` in the ``extension`` array of the HTML-CSS section of your
:meth:`MathJax.Hub.Config()` call. For example,

.. code-block:: javascript

    MathJax.Hub.Config({
      "HTML-CSS": {
        extensions: ["handle-floats.js"]
      }
    });

This extension allows HTML-CSS output to deal with floating elements
better. In particular, when there are tags or equation numbers, these
would overlap floating elements, but with this extension, the width of
the line should properly correspond to the amount of space remaining.

The extension has no configuration options. 
