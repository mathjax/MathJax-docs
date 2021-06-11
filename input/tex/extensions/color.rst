.. _tex-color:

#####
color
#####

The `color` extension defines the ``\color`` macro as in the LaTeX
`color` package, along with ``\colorbox``, ``\fcolorbox``, and
``\definecolor``.  It declares the standard set of colors (`Apricot`,
`Aquamarine`, `Bittersweet`, and so on), and provides the RGB, rgb,
and grey-scale color spaces in addition to named colors.

This extension is loaded automatically when the `autoload` extension
is used.  To load the `color` extension explicitly, add
``'[tex]/color'`` to the ``load`` array of the ``loader`` block of
your MathJax configuration, and add ``'color'`` to the ``packages``
array of the ``tex`` block.

.. code-block:: javascript

   window.MathJax = {
     loader: {load: ['[tex]/color']},
     tex: {packages: {'[+]': ['color']}}
   };

Alternatively, use ``\require{color}`` in a TeX expression to load it
dynamically from within the math on the page, if the `require`
extension is loaded.

.. note::

   In version 2, a non-standard ``\color`` macro was the default
   implementation, but in version 3, the standard LaTeX one is now the
   default.  The difference between the two is that the standard
   ``\color`` macro is a switch (everything that follows it is in the
   new color), whereas the non-standard version 2 ``\color`` macro
   takes an argument that is the mathematics to be colored.  That is,
   in version 2, you would do

   .. code-block:: latex

      \color{red}{x} + \color{blue}{y}

   to get a red *x* added to a blue *y*.  But in version 3 (and in
   LaTeX itself), you would do
   
   .. code-block:: latex

      {\color{red} x} + {\color{blue} y}

   If you want the old version 2 behavior, use the :ref:`tex-colorv2`
   extension instead.

-----


.. _tex-color-options:

color Options
-------------

Adding the `color` extension to the ``packages`` array defines a
``color`` sub-block of the ``tex`` configuration block with the
following values:

.. code-block:: javascript

   MathJax = {
     tex: {
       color: {
         padding: '5px',
         borderWidth: '2px'
       }
     }
   };

.. _tex-color-padding:
.. describe:: padding: '5px'

   This gives the padding to use for color boxes with background colors.

.. _tex-color-borderWidth:
.. describe:: borderWidth: '2px'

   This gives the border width to use with framed color boxes produced
   by ``\fcolorbox``.

-----


.. _tex-color-commands:


color Commands
--------------

The `color` extension implements the following macros:
``\color``, ``\colorbox``, ``\definecolor``, ``\fcolorbox``, ``\textcolor``


|-----|
