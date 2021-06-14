.. _tex-action:

######
action
######

The `action` extension gives you access to the MathML ``<maction>``
element.  It defines three new non-standard macros:

.. describe:: \\mathtip{math}{tip}

    Use ``tip`` (in math mode) as tooltip for ``math``.

.. describe:: \\texttip{math}{tip}

    Use ``tip`` (plain text) as tooltip for ``math``.

.. describe:: \\toggle{math1}{math2}...\\endtoggle

    Show ``math1``, and when clicked, show ``math2``, and so on.
    When the last one is clicked, go back to ``math1``.

This extension is loaded automatically when the `autoload` extension
is used.  To load the `action` extension explicitly, add
``'[tex]/action'`` to the ``load`` array of the ``loader`` block of
your MathJax configuration, and add ``'action'`` to the ``packages``
array of the ``tex`` block.

.. code-block:: javascript

   window.MathJax = {
     loader: {load: ['[tex]/action']},
     tex: {packages: {'[+]': ['action']}}
   };

Alternatively, use ``\require{action}`` in a TeX expression to load it
dynamically from within the math on the page, if the `require`
package is loaded.

-----


.. _tex-action-commands:


action Commands
---------------

The `action` extension implements the following macros:
``\mathtip``, ``\texttip``, ``\toggle``


|-----|
