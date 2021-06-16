.. _lazy-typesetting:

################
Lazy Typesetting
################

MathJax offers an extension that is designed to improve the
performance of pages with large numbers of equations. It implements a
"lazy typesetting" approach that only processes an expression when it
comes into view.  This means that expressions will not be typeset when
they are not visible, and your readers will not have to wait for the
entire document to typeset, speeding up their initial view of the
page. Furthermore, any expressions that are never seen will not be
typeset, saving the processing time that would normally have been
spent on those expressions.

This also helps with the situation where you may link to a particular
location in your page (via a URL with a hash); typesetting the
material above that point can cause the browser to change the scroll
position, and so the user may not end up at the proper location in the
page. With the lazy extension, the material above that point is not
typeset until the user scrolls upwards, and so there is no position
change.

To use the lazy typesetting extension, simply add it to your
configuration as follows:

.. code-block:: latex

   MathJax = {
     loader: {load: ['ui/lazy']}
   };

This will adjust the typesetting pipeline to implement the
lazy-typesetting functionality.

Lazy typesetting works best with SVG output, but changes with the way
the CommonHTML output handles its stylesheet updates make the CHTML
output nearly as fast. With TeX input, the lazy extension makes sure
that previous expressions are processed by TeX (though not output to
the page) so that any macro definitions or automatic equation numbers
are in place when the visible expressions are processed. Currently,
documents that contain ``\ref`` or ``\eqref`` links may not yet work
properly, since target equations may not have been typeset, and so the
link location may not be marked in the document. In particular,
forward references are unlikely to work, and backward references will
work only if the target expression has already been typeset. We hope
to improve this situation in a future release.

|-----|
