.. _svg-output:

###########
SVG Support
###########

The ``SVG`` output processor uses `Scalable Vector Graphics` to render
the mathematics on the page.  The SVG output mode offers high-quality
results, and displays and prints well in all browsers. Since it uses
SVG data instead of font files, it is not affected by user-based
web-font blocking, or other character-placement issues that sometimes
occur with the HTML-based output.

One advantage to the SVG output is that it is relatively
self-contained (it does not rely heavily on CSS, though it does use
some in certain circumstances), so it can be saved and used as an
independent image.  A disadvantage of this mode is that its
variable-width tables become fixed size once they are typeset, and
don't rescale if the window size changes (for example).

In version 2, equation tags and numbers where placed using the initial
window width as well, and were fixed at those positions, so the
equation number would not reposition with changes in window size.  In
version 3 and above, however, equation numbers now are relative to the
container size, and move with changes in its width, just as they do
with CommonHTML output.

Finally, because mathematical characters in SVG output are produced by
SVG paths, not characters in a font, they can't be copied and pasted,
as the output of the CommonHTML processor can.

The SVG output component (:ref:`svg-component`) is included in all
the :ref:`combined-components` that include `svg` in thier hames.
You can also load it explicitly by including ``output/svg`` in the
:data:`load` array of the :data:`loader` block of your MathJax
configuration.

.. code-block::

   MathJax = {
     loader: {
       load: ['output/svg']
     }
   };

See :ref:`svg-options` for information about the options that
control the SVG output.

|-----|
