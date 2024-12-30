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

Specifying the size of the HTML
===============================

In a browser, MathJax can measure the size of the HTML so that it can
provide the proper amount of space for it within the equation, but in
node applications not running in a browser, that is not possible, so
MathJax provides a method for you to specify the size of the HTML
explicitly.  To specify the dimensions, add :attr:`data-mjx-hdw="H D W"`
to the top-level HTML element inside the MathML token element, where
``H``, ``D``, and ``W`` are the height, depth, and width of the
HTML. They can be in any units, but em units will work best.

 For example,

.. code-block:: html

   \(x + <tex-html><span data-mjx-hdw=".75em .25em 1em">
   <img src="mypic.png" style="width: 1em; height: 1em; vertical-align: -.25em" />
   </span></tex-html> + y\)

could be used to insert an image with a given size into an expression.

How this attribute is used is handled via a new option to the output
jax, :data:`htmlHDW`, which can be set to ``'auto'`` (the default),
``'ignore'``, ``'use'``, or ``'force'``.  When set to ``ignore``, the
:attr:`data-mjx-hdw` attribute is ignored and MathJax will try to
measure the size of the HTML directly.  This works well in the
browser, but not in the liteDOM, jsdom, linkedom, or other non-browser
adaptors. The ``force`` option means that MathJax will use the
:attr:`data-mjx-hdw` values and will surround the HTML with additional
nodes that force the HTML to have the given dimensions.  This would
make the browser and node both have the same representation, not
relying on the browser measurements.  The value ``use`` means that
MathJax will assume the :attr:`data-mjx-hdw` values are correct and
will use them in its size computations without forcing the HTML to
have the given dimensions.  Finally, ``auto`` means that MathJax will
determine which option to use; this will be ``ignore`` when in the
browser and ``force`` when in node applications.

Having accurate values for the :data:`data-mjx-hdw` attribute is
crucial to the quality of the output.  To that end, the following HTML
file computes the needed values.  These values depend on the
surrounding font; the page below gives you a place to enter the HTML
you want to measure and the font to use.  Press the "Compute HDW" and
the HTML is shown below together with modified HTML source that
includes the needed :attr:`data-mjx-hdw` attribute. You can copy that
and replace the original HTML will it.  The original HTML is displayed
with red lines at the right and left indicating the height and depth
of the HTML, and with horizontal lines indicating the baseline
position.

.. raw:: html

    <p style="background-color: #DDD; padding: 1em 0; text-align: center">
    <iframe style='width: 40em; height: 40em; background-color: white' srcdoc='
      <!DOCTYPE html>
      <html>
      <head>
      <title>Compute HDW values for HTML in Token nodes</title>
      <style>
      h1 {font-size: 120%}
      </style>
      <script>
      function GetHDW() {
        const html = document.querySelector("mjx-html");
        const content = html.getBoundingClientRect();
        const baseline = document.querySelector("mjx-baseline").getBoundingClientRect();
        const em = parseFloat(window.getComputedStyle(html).fontSize);
        const h = baseline.top - content.top;
        const d = content.bottom - baseline.top;
        const w = content.right - content.left;
        return [h, d, w].map(x => (x / em).toFixed(3).replace(/\.?0+$/, "") + "em").join(" ");
      }
      function ShowHDW() {
        const html = document.querySelector("#html").value;
        const content = document.querySelector("mjx-html");
        content.style.fontFamily = document.querySelector("#family").value;
        content.innerHTML = html;
        const output = document.querySelector("#output");
        if (content.childNodes.length > 1) {
          const div = document.createElement("div");
          while (content.childNodes.length) {
            div.append(content.lastChild);
          }
          content.append(div);
        }
        content.firstChild.setAttribute("data-mjx-hdw", GetHDW());
        output.innerHTML = content.innerHTML.replace(/&/g, "&amp;amp;").replace(/</g, "&amp;lt;");
      }
      </script>
      <style>
      mjx-measure {
        display: inline-block;
        border-left: 2px solid red;
        border-right: 2px solid red;
      }
      mjx-baseline {
        display: inline-block;
        height: 0;
        width: 0;
      }
      mjx-html {
        display: inline-block;
      }
      mjx-line {
        display: inline-block;
        height: 0;
        width: 1em;
        border-top: 1px solid blue;
      }
      #input {
        display: inline-block;
      }
      #input textarea {
        margin-bottom: 3px;
      }
      #input input[type="button"] {
        float: right;
      }
      </style>
      </head>
      <body>

      <h1>Compute HDW values for HTML in Token nodes</h1>

      <p id="input">
      <textarea id="html" cols="80" rows="10">
      <div>HTML</div>
      </textarea><br>
      Font family: <input type="text" id="family">
      <input type="button" value="Compute HDW" onclick="ShowHDW()">
      </p>
      <h2>The HTML:</h2>
      <p>
      <mjx-line></mjx-line><mjx-measure><mjx-baseline></mjx-baseline><mjx-html>
      &#xA0;
      </mjx-html></mjx-measure><mjx-line></mjx-line>
      </p>
      <h2>The HTML with the HDW attribute:</h2>
      <p id="output">
      </p>

      <script>
      document.getElementById("html").value = "<div>HTML</div>";
      </script>
      </body>
      </html>
    '></iframe>
    </p>

The code for this tool is the following:

.. code-block:: html

      <!DOCTYPE html>
      <html>
      <head>
      <title>Compute HDW values for HTML in Token nodes</title>
      <style>
      h1 {font-size: 120%}
      </style>
      <script>
      function GetHDW() {
        const html = document.querySelector("mjx-html");
        const content = html.getBoundingClientRect();
        const baseline = document.querySelector("mjx-baseline").getBoundingClientRect();
        const em = parseFloat(window.getComputedStyle(html).fontSize);
        const h = baseline.top - content.top;
        const d = content.bottom - baseline.top;
        const w = content.right - content.left;
        return [h, d, w].map(x => (x / em).toFixed(3).replace(/\.?0+$/, "") + "em").join(" ");
      }
      function ShowHDW() {
        const html = document.querySelector("#html").value;
        const content = document.querySelector("mjx-html");
        content.style.fontFamily = document.querySelector("#family").value;
        content.innerHTML = html;
        const output = document.querySelector("#output");
        if (content.childNodes.length > 1) {
          const div = document.createElement("div");
          while (content.childNodes.length) {
            div.append(content.lastChild);
          }
          content.append(div);
        }
        content.firstChild.setAttribute("data-mjx-hdw", GetHDW());
        output.innerHTML = content.innerHTML.replace(/&/g, "&amp;").replace(/</g, "&lt;");
      }
      </script>
      <style>
      mjx-measure {
        display: inline-block;
        border-left: 2px solid red;
        border-right: 2px solid red;
      }
      mjx-baseline {
        display: inline-block;
        height: 0;
        width: 0;
      }
      mjx-html {
        display: inline-block;
      }
      mjx-line {
        display: inline-block;
        height: 0;
        width: 1em;
        border-top: 1px solid blue;
      }
      #input {
        display: inline-block;
      }
      #input textarea {
        margin-bottom: 3px;
      }
      #input input[type="button"] {
        float: right;
      }
      </style>
      </head>
      <body>

      <h1>Compute HDW values for HTML in Token nodes</h1>

      <p id="input">
      <textarea id="html" cols="80" rows="10">
      <div>HTML</div>
      </textarea><br>
      Font family: <input type="text" id="family">
      <input type="button" value="Compute HDW" onclick="ShowHDW()">
      </p>
      <h2>The HTML:</h2>
      <p>
      <mjx-line></mjx-line><mjx-measure><mjx-baseline></mjx-baseline><mjx-html>
      &#xA0;
      </mjx-html></mjx-measure><mjx-line></mjx-line>
      </p>
      <h2>The HTML with the HDW attribute:</h2>
      <p id="output">
      </p>

      </body>
      </html>

-----

This package is not autoloaded, so you must request it explicitly if
you want to use it.  To load the `texhtml` extension explicitly, add
``'[tex]/texhtml'`` to the :data:`load` array of the :data:`loader`
block of your MathJax configuration, and add ``'texhtml'`` to the
:data:`packages` array of the :data:`tex` block.


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
