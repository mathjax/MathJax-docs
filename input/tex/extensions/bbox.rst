.. _tex-bbox:

####
bbox
####

The `bbox` extension defines a new macro for adding background colors,
borders, and padding to your math expressions.

.. describe:: \\bbox[options]{math}

    puts a bounding box around ``math`` using the provided ``options``.
    The options can be one of the following:

    1.  A color name used for the background color.
    2.  A dimension (e.g., ``2px``) to be used as a padding around the
        mathematics (on all sides).
    3.  Style attributes to be applied to the mathematics (e.g.,
        ``border: 1px solid red``).
    4.  A combination of these separated by commas.

Here are some examples:

.. code-block:: latex

    \bbox[red]{x+y}      % a red box behind x+y
    \bbox[2pt]{x+1}      % an invisible box around x+y with 2pt of extra space
    \bbox[red,2pt]{x+1}  % a red box around x+y with 2pt of extra space
    \bbox[5px, border: 2px solid red]
                         % a 2px red border around the math 5px away

This extension is loaded automatically when the `autoload` extension
is used.  To load the `bbox` extension explicitly, add
``'[tex]/bbox'`` to the ``load`` array of the ``loader`` block of
your MathJax configuration, and add ``'bbox'`` to the ``packages``
array of the ``tex`` block.

.. code-block:: javascript

   window.MathJax = {
     loader: {load: ['[tex]/bbox']},
     tex: {packages: {'[+]': ['bbox']}}
   };

Alternatively, use ``\require{bbox}`` in a TeX expression to load it
dynamically from within the math on the page, if the `require`
extension is loaded.

-----


.. _tex-bbox-commands:


bbox Commands
-------------

The `bbox` extension implements the following macros:
``\bbox``


|-----|
