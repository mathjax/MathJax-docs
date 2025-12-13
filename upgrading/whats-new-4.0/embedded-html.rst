.. _v4-embedded-html:

==================================
Support for HTML in MathML and TeX
==================================

.. _v4-html-in-mml:

HTML in MathML
==============

The HTML5 specification allows for mixing HTML nodes inside MathML
token nodes, and it is a long-standing request for MathJax to
implement that as well.  Version 4 finally does so.  You can now use
HTML nodes as children of token nodes, such as ``<mtext>``.  Thus

.. code-block:: html

   <mtext>a button <input type="button" value="Push Me"> to press</mtext>

is allowed, and would produce an ``<mtext>`` element containing a button
surrounded by some plain text.

Because the HTML is not currently sanitized (something that could be
added to the :ref:`safe-component` extension), allowing HTML in token
elements would be a security issue for sites that allow user-entered
MathML.  For this reason, the MathML input jax has a new option
:data:`allowHtmlInTokenNodes` to control whether to allow it, and it
is ``false`` by default, so you have to opt into this new feature if
you want to use it on your site.


.. _v4-html-in-tex:

HTML in TeX
===========

HTML is now allowed in TeX and LaTeX input as well.  This is handled
through the special ``<tex-html>`` node, which (unlike most HTML nodes)
can be included within the math delimiters.  So, for example

.. code-block::
   
   $$3 + <tex-html><input type="text" id="answer" size="10"></tex-html> = 10$$

would present an expression with an input box where a student could
fill in an answer.  This feature is implemented via the
:ref:`tex-texhtml` extension package for the TeX input jax, so you
would use a configuration like

.. code-block:: js

   MathJax = {
     loader: {load: ['[tex]/texhtml']}},
     tex: {
         allowTexHTML: true,
         packages: {'[+]': ['texhtml']}
     }
   };

to load it, add it to the packages to use, and enable it.

In its normal use case in the browser, the HTML will come from the DOM
already, and so MathJax doesn't include HTML sanitization in this
extension. Because of this, however, the :ref:`tex-texhtml` extension
does represent a security risk on sites that allow user content, if
they don't sanitize the user input themselves. For this reason, there
is an :attr:`allowTexHTML` option for the TeX input jax that must be
enabled in order for the ``<tex-html>`` elements to be used.  Note
that ``\require{}`` is configured *not* to load the :ref:`tex-texhtml`
package, so unless you explicitly load it yourself, there should be no
security issue.


.. _v4-html-size:

Specifying the size of the HTML
===============================

In a browser, MathJax can measure the size of the HTML so that it can
provide the proper amount of space for it within the equation, but in
node applications, that is not possible, so MathJax provides a method
for you to specify the size of the HTML explicitly.  To specify the
dimensions, add :attr:`data-mjx-hdw="H D W"` to the top-level HTML
element inside the MathML token element, where ``H``, ``D``, and ``W``
are the height, depth, and width of the HTML.  They can be in any
units, but ``em`` units will work best.

How this attribute is used is handled via a new option to the output
jax, :data:`htmlHDW`, which can be set to ``'auto'`` (the default),
``'ignore'``, ``'use'``, or ``'force'``.  When set to ``ignore``, the
:attr:`data-mjx-hdw` attribute is ignored, and MathJax will try to
measure the size of the HTML directly.  This works well in the
browser, but not in the liteDOM, jsdom, linkedom, or other non-browser
adaptors.  The ``force`` option means that MathJax will use the
:attr:`data-mjx-hdw` values and will surround the HTML with additional
nodes that force the HTML to have the given dimensions.  This would
make the browser and node both have the same representation, not
relying on the browser measurements.  The value ``use`` means that
MathJax will assume the :attr:`data-mjx-hdw` values are correct and
will use them without forcing the HTML to have the given dimensions.
Finally, ``auto`` means that MathJax will determine which to use; this
will be ``ignore`` when in the browser and ``force`` when in node
applications.

Having accurate values for the :attr:`data-mjx-hdw` attribute is
crucial to the quality of the output.  To that end, the following HTML
file computes the needed values.  These values depend on the
surrounding font, so there is a place to enter that, as well.  You can
also specify the font in the MathML token element that holds the HTML,
as in ``<mtext fontfamily="Arial"><div>...</div></mtext>`` or ``<mo
style="font-family: arial"><div>...</div></mo>``.  Otherwise, MathJax
will use the surrounding font.  The page below gives you a place to
enter the HTML you want to measure and the font to use.  Press the
``Compute HDW`` button and the HTML is shown below together with
modified HTML source that includes the needed :attr:`data-mjx-hdw`
attribute.  You can copy that and replace the original HTML will it.

-----

.. code-block:: html

   <!DOCTYPE html>
   <html>
   <head>
   <title>Compute HDW values for HTML in Token nodes</title>
   <script>
   function GetHDW() {
     const html = document.querySelector('mjx-html');
     const content = html.getBoundingClientRect();
     const baseline = document.querySelector('mjx-baseline').getBoundingClientRect();
     const em = parseFloat(window.getComputedStyle(html).fontSize);
     const h = baseline.top - content.top;
     const d = content.bottom - baseline.top;
     const w = content.right - content.left;
     return [h, d, w].map(x => (x / em).toFixed(3).replace(/\.?0+$/, '') + 'em').join(' ');
   }
   function ShowHDW() {
     const html = document.querySelector('#html').value;
     const content = document.querySelector('mjx-html');
     content.style.fontFamily = document.querySelector('#family').value;
     content.innerHTML = html
     const output = document.querySelector('#output');
     content.firstElementChild.setAttribute('data-mjx-hdw', GetHDW());
     output.innerHTML = content.innerHTML.replace(/</g, '&lt;');
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

.. raw:: html

    <p>You can use this code here:</p>
    <p style="background-color: #DDD; padding: 1em 0; text-align: center">
    <iframe style='width: 40em; height: 35em; background-color: white' srcdoc='
      <!DOCTYPE html>
      <html>
      <head>
      <title>Compute HDW values for HTML in Token nodes</title>
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
        content.innerHTML = html
        const output = document.querySelector("#output");
        content.firstElementChild.setAttribute("data-mjx-hdw", GetHDW());
        output.innerHTML = content.innerHTML.replace(/</g, "&amp;lt;");
      }
      </script>
      <style>
      body {
        background-color: #EEEEEE;
      }
      h1 {
        font-size: 150%;
      }
      h2 {
        font-size: 120%;
      }
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
    '></iframe>
    </p>


Of course, you can use the code above as a basis for automating the
process using something like puppeteer, if you wish.

|-----|
