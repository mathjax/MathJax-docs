.. _debugging-tips:

**********************
MathJax Debugging tips
**********************

This page documents basic tips for debugging MathJax in your application.


Using unpacked resources
========================

MathJax provides both packged (minified) and unpacked versions of all its components. For debugging, it is useful to switch to an unpacked versions.

For example, if your copy of MathJax lives at `https://example.com/MathJax.js` just add `unpacked/` before `MathJax.js`, e.g.,


.. code-block:: html

    <script type="text/javascript" async
      src="https://example.com/MathJax.js?config=TeX-MML-AM_CHTML">
    </script>

to


.. code-block:: html

    <script type="text/javascript" async
      src="https://example.com/unpacked/MathJax.js?config=TeX-MML-AM_CHTML">
    </script>


Getting traceback information
=============================

.. code-block:: javascript

  MathJax.Hub.lastError


MathJax stores the error object from the last `Math Processing Error` in `MathJax.Hub.lastError`. This allow developers to access the stack trace information when needed.


Add listener for MathJax errors
===============================

MathJax provides a detailed signaling infrastructure which a developers can hook into.

The following example hooks into Math Processing Errors.

.. code-block:: javascript

  MathJax.Hub.Register.MessageHook("Math Processing Error",function (message) {
    //  do something with the error.  message[2] is the Error object that records the problem.
  });


Another example hooks into TeX parsing errors.

.. code-block:: javascript

  MathJax.Hub.Register.MessageHook("TeX Jax - parse error",function (message) {
    // do something with the error.  message[1] will contain the data about the error.
  });

.. note::

  For more information, see :ref:`mathjax-api`.
