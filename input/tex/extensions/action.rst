.. _tex-action:

######
action
######

The `action` extension gives you access to the MathML ``<maction>``
element.  It defines three new non-standard macros:

.. describe:: \mathtip{math}{tip}

    Use ``tip`` (in math mode) as tooltip for ``math``.

.. describe:: \texttip{math}{tip}

    Use ``tip`` (plain text) as tooltip for ``math``.

.. describe:: \toggle{math1}{math2}...\endtoggle

    Show ``math1``, and when clicked, show ``math2``, and so on.
    When the last one is clicked, go back to ``math1``.

.. raw:: html

    <p>Some examples are given below:</p>
    <p style="background-color: #DDD; padding: 1em 0; text-align: center">
    <iframe style='width: 35em; height: 13em; background-color: white' srcdoc='
      <!DOCTYPE html>
      <html>
      <head>
      <title>MathJax action Examples</title>
      <script>
      MathJax = {
        loader: {load: ["[tex]/action"]},
        tex: {packages: {"[+]": ["action"]}}
      }
      </script>
      <script defer src="https://cdn.jsdelivr.net/npm/mathjax@4/tex-chtml.js">
      </script>
      </head>
      <body>
      <p>
      <tt>\mathtip{x}{x=2} + \mathtip{y}{y=3}=5<tt><br/>
      \(\mathtip{x}{x=2} + \mathtip{y}{y=3}=5\)
      </p>
      <p>
      <tt>\texttip{F}{force} = \texttip{m}{mass}\texttip{a}{acceleration}</tt><br/>
      \(\texttip{F}{force} = \texttip{m}{mass}\texttip{a}{acceleration}\)
      </p>
      <p>
      <tt>(x+1)^2 = \toggle{(x+1)(x+1)}{x^2 + 2x + 1}\toggle</tt></br>
      \((x+1)^2 = \toggle{(x+1)(x+1)}{x^2 + 2x + 1}\endtoggle\)
      </p>
      </body>
      </html>
    '></iframe>
    </p>

This extension is loaded automatically when the :ref:`tex-autoload`
extension is used.  To load the `action` extension explicitly, add
``'[tex]/action'`` to the :data:`load` array of the :data:`loader`
block of your MathJax configuration, and add ``'action'`` to the
:data:`packages` array of the :data:`tex` block.

.. code-block:: javascript

   window.MathJax = {
     loader: {load: ['[tex]/action']},
     tex: {packages: {'[+]': ['action']}}
   };

Alternatively, use ``\require{action}`` in a TeX expression to load it
dynamically from within the math on the page, if the :ref:`tex-require`
extension is loaded.

-----

.. _tex-action-commands:

action Commands
---------------

The `action` extension implements the following macros:
``\mathtip``, ``\texttip``, ``\toggle``


|-----|
