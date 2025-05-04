.. _tex-texhtml:

#######
texhtml
#######

Normally, MathJax will not process math that includes HTML tags, other
than a few exceptions like ``<br>`` and HTML comments.  The `texhtml`
extension provides a method of including HTML tags within TeX
expressions.  For example, this can allow you to include form inputs
(like answer blanks or drop-down menus) in your expressions.

.. warning:: 

   Because the HTML within TeX expressions is not filtered in any way
   by MathJax, you should **not** use this extension in settings where
   your readers can enter expressions that are shown to other users.
   That would allow them to enter maliceous code (including script
   tags) that could compromise the security of your site.

   For this reason, you must not only load the `texhtml` extension,
   but must set the :data:`allowTexHTML` option in the :data:`tex`
   block of your MathJax configuration, as described in the
   configuration example below.

To include HTML tags within your expressions, enclose the HTML within
the special ``<tex-html>...</tex-html>`` tags.  For example,

.. code-block:: html

   when \(x=3\), \(x^2 + 3x + 1 =
   <tex-html><input type="text" id="answer" size="5"/></tex-html>\).

.. raw:: html

    <p>renders as follows:</p>
    <p style="background-color: #DDD; padding: 1em 0; text-align: center">
    <iframe style='width: 20em; height: 5em; background-color: white' srcdoc='
      <!DOCTYPE html>
      <html>
      <head>
      <title>MathJax texhtml Example</title>
      <script>
      MathJax = {
        loader: {load: ["[tex]/texhtml"]},
        tex: {packages: {"[+]": ["texhtml"]}, allowTexHTML: true}
      }
      </script>
      <script defer src="https://cdn.jsdelivr.net/npm/mathjax@4/tex-chtml.js">
      </script>
      </head>
      <body>
      <div style="text-align: center">
      <p>
      when \(x=3\), \(x^2 + 3x + 1 =
      <tex-html><input type="text" id="answer" size="5"/></tex-html>\).
      </p>
      </div>
      </body>
      </html>
    '></iframe>
    </p>

You could then use javascript to retrieve the value of the input
element with :attr:`id="answer"` and test if the solution is correct.

See the :ref:`specifying-htmlHDW` section for information about how
MathJax determines the size of HTML embedded in TeX expressions.

This package is not autoloaded, so you must request it explicitly if
you want to use it.  To load the `texhtml` extension explicitly, add
``'[tex]/texhtml'`` to the :data:`load` array of the :data:`loader`
block of your MathJax configuration, and add ``'texhtml'`` to the
:data:`packages` array of the :data:`tex` block.

.. _tex-texhtml-options:

.. code-block:: javascript

   window.MathJax = {
     loader: {load: ['[tex]/texhtml']},
     tex: {
       packages: {'[+]': ['texhtml']},
       allowTexHTML: true
     },
   };

Note that the `texhtml` extension is not allowed to be loaded with
``\require{texhtml}``.

-----

.. _tex-texhtml-commands:

texhtml Commands
----------------

The `texhtml` extension implements the following macros:
``<``


|-----|
