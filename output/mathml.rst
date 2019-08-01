.. _mathml-output:

#############
MathML Output
#############



The **NativeMML output processor** uses the browser's internal MathML
support (if any) to render the mathematics.  Currently, Firefox has
native support for MathML, and IE has the `MathPlayer plugin
<http://www.dessci.com/en/products/mathplayer/>`_ for rendering
MathML.  Safari has some support for MathML since version 5.1, but the
quality is not as high as either Firefox's implementation or IE with
MathPlayer.  Chrome, Konqueror, and most other browsers don't support
MathML natively, but this may change in the future, since MathML is
part of the HTML5 specification.

The advantage of the NativeMML output processor is its speed, since
native MathML support is usually faster than converting to
HTML-with-CSS and SVG.  The disadvantage is that you are dependent on
the browser's MathML implementation for your rendering, and these vary
in quality of output and completeness of implementation.  MathJax
relies on features that are not available in some renderers (for
example, Firefox's MathML support does not implement the features
needed for labeled equations).  While MathJax's NativeMML output
processor works around various limitations of Firefox/Gecko and
Safari/WebKit, the results using the NativeMML output processor may
have spacing, font, or other rendering problems that are outside of
MathJax's control.

-----

.. raw:: html

   <span></span>
