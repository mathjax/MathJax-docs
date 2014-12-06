.. _toMathML:

**************************************
Obtaining the MathML for an Expression
**************************************

The ``toMathML`` extension generates a string containing the MathML stored in MathJax's internal format. It is used in the MathJax Menu to generate MathML output for copy&paste under ``Show Math as -> MathML Code``. 

The ``toMathML`` extension generally works asynchronously because it potentially has to load additional files, in particular if the extension is used before MathJax has produced output rendering.

To use the extension, add ``"toMathML.js"`` to the `extensions` array of your configuration. For example,

.. code-block:: javascript

    MathJax.Hub.Config({
      extensions: ["toMathML.js"]
    });


The extension can be used by developers to access the MathML representation of an equation (e.g., to be stored for later use). Here is an example of how to make use of the ``toMathML.js``.

.. code-block:: javascript

    function getMathML(jax,callback) {
      var mml;
      try {
        //
        //  Try to produce the MathML (if an asynchronous
        //     action occurs, a reset error is thrown)
        //   Otherwise we got the MathML and call the
        //     user's callback passing the MathML.
        //
        mml = jax.root.toMathML("");
      } catch(err) {
        if (!err.restart) {throw err} // an actual error
        //
        //  For a delay due to file loading
        //    call this routine again after waiting for the
        //    the asynchronous action to finish.
        //
        return MathJax.Callback.After([getMathML,jax,callback],err.restart);
      }
      //
      //  Pass the MathML to the user's callback
      MathJax.Callback(callback)(mml);
    }


This will give you a function that you can pass an Element Jax and a callback function to.  The callback will be called with the MathML from the element.

Here is a complete example:

.. code-block:: html

    <!DOCTYPE html>
    <html>
    <head>
    <title>MathJax TeX to MathML Page</title>
    <script>
    function toMathML(jax,callback) {
      var mml;
      try {
        mml = jax.root.toMathML("");
      } catch(err) {
        if (!err.restart) {throw err} // an actual error
        return MathJax.Callback.After([toMathML,jax,callback],err.restart);
      }
      MathJax.Callback(callback)(mml);
    }
    </script>
    <script type="text/x-mathjax-config">
      MathJax.Hub.Config({
        tex2jax: {inlineMath: [​["$","$"],["\\\\​(","\\\\​)"]​]}
      });
      MathJax.Hub.Queue(
        function () {
          var jax = MathJax.Hub.getAllJax();
          for (var i = 0; i < jax.length; i++) {
            toMathML(jax[i],function (mml) {
              alert(jax[i].originalText + "\n\n=>\n\n"+ mml);
            });
          }
        }
      );
    </script>
    <script type="text/javascript" src="http://cdn.mathjax.org/mathjax/latest/MathJax.js?config=TeX-AMS_HTML-full"></script>
    </head>
    <body>
    <p>
    When $a \ne 0$, there are two solutions to \(ax^2 + bx + c = 0\) and they are
    $$x = {-b \pm \sqrt{b^2-4ac} \over 2a}.$$
    </p>
    </body>
    </html>

This example loops through the math elements on the page and displays the original TeX and the resulting MathML.

Note that using the callbacks is the only safe way to do this, as the ``jax.root.toMathML()`` call may signal that it needs to load a file by throwing the reset error.  If you do not take this into account, your code may work most of the time, but will cause errors in isolated circumstances.
