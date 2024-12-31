.. _mathml-support:

##############
MathML Support
##############

The support for MathML in MathJax involves two functions: the first
looks for ``<math>`` tags within your document and marks them for
later processing by MathJax, and the second converts the MathML to the
internal format used by MathJax, where one of MathJax's output
processors then displays it in the web page.  In MathJax v2, these two
actions were perfromed by distinc components (the ``mml2jax``
preprocessor, and the MathML input jax); in v3 and above, the
``mml2jax`` functionality has been folded into the MathML input jax.

MathJax's internal format is essentially MathML (with a few
additions), implemented as javascript objects rather than DOM
elements, and MathJax's various input processors all convert their
original format into this internal MathML format; its output
processors take this MathML and produce the proper output from it.
Because the internal format is MathML-based, MathJax provides the
ability to convert to and from MathML notation.

Although modern browsers have native support for rendering MathML,
most implement the MathML-Core standard, which is a limited subset of
MathML.  Unfortunately, it does not include everything that MathJax
needs in order to produce the required output for its various input
formats.  For example, MathML-Core does not include the
``<mlabeledtr>`` element needed to produce equation numbers near the
margins, or the table attributes that full-fledged MathML uses for
making aligned equations.  Furthermore, the quality of the output
varies from browser to browser, and some systems require you to
download and install extra fonts to support the mathematical notation.

So even though MathML could be used in recent versions of most
browsers, MathJax makes it possible to view MathML notation in almost
*all* browsers, in a consistent and convenient way.

In addition, MathJax provides support for assistive technology, such
as screen readers and braille output devices, even when those tools
don't understand MathML directly.  MathJax can produce speech strings
from math in several formats, and in several languages, including
Braille.

.. _mathml-in-html:

MathML in HTML pages
====================

For MathML that is embedded in HTML pages, you should not use named
MathML entities, like ``&Integral;`` but rather use numeric entities like
``&#x221A;`` or unicode characters embedded in the page itself.  The
reason is that entities are replaced by the browser before MathJax
runs, and some browsers report errors for unknown entities.  For
browsers that are not MathML-aware, that may cause errors to be
displayed for the MathML entities.  While that might not occur in the
browser you are using to compose your pages, it can happen with other
browsers, so you should avoid the named entities whenever possible.
If you must use named entities, you may need to declare them in the
`DOCTYPE` specification by hand.

When you use MathML in an HTML document rather than an XHTML one
(MathJax will work with both), you should not use the "self-closing"
form for MathML tags with no content, but should use separate open and
close tags.  That is, use

.. code-block:: html

    <mspace width="thinmathspace"></mspace>

rather than ``<mspace width="thinmathspace" />``.  This is because
HTML does not have self-closing tags, and some browsers will get the
nesting of tags wrong if you attempt to use them.  For example, with
``<mspace width="1em" />``, since there is no closing tag, the rest of
the mathematics will become the content of the ``<mspace>`` tag; but
since ``<mspace>`` should have no content, the rest of the mathematics
will not be displayed.  This is a common error that should be avoided.
Modern browsers that support HTML5 should be able to handle
self-closing tags, but older browsers have problems with them, so if
you want your mathematics to be visible to the widest audience, do not
use the self-closing form in HTML documents.

If you are working in HTML rather than XHTML, you should not use a
namespace prefix like ``m:`` or ``mml:`` for your MathML elements.
That is, you shoud use ``<math>`` rather than ``<m:math>`` or
``<mml:math>``.  This is because HTML5 has deprecated namespaces, so
they are no longer necessary, and it makes it harder for MathJax to
identify the math when there are namespaces.  If you properly declare
the namespace in the ``<html>`` tag, MathJax will be able to find the
namespaced math tags, but if you don't then MathJax may miss them.


.. _mathml-tags:

Supported MathML tags
=====================

MathJax supports the `MathML3.0 <http://www.w3.org/TR/MathML3/>`_
mathematics tags, with some limitations.  The MathML
support is still under active development, so some tags are not yet
implemented, and some features are not fully developed, but are
coming.

The deficiencies include:

- No support for alignment groups in tables.

- Not all attributes are supported for tables.  E.g., ``columnspan``
  and ``rowspan`` are not implemented yet.

- Experimental support for the elementary math tags: ``mstack``, ``mlongdiv``,
  ``msgroup``, ``msrow``, ``mscarries``, and ``mscarry`` (via the ``mml3`` extension, see below).

- Experimental support for bidirectional mathematics (via the ``mml3`` extension, see below).

See the `results of the MathML3.0 test suite
<http://www.w3.org/Math/testsuite/results/tests.html>`_ for details.


.. _mathml-content-mathml:

Content MathML
==============

The version 2 ``content-mathml`` extension is not yet available in
version 3 and above.

..
   To use Content MathML in your documents, simply include
   ``"content-mathml.js"`` in the ``extensions`` array of your MathML
   configuration block.  For example

   .. code-block:: html

       <script type="text/x-mathjax-config">
       MathJax.Hub.Config({
         MathML: {
           extensions: ["content-mathml.js"]
         }
       });
       </script>

   Note that this script tag must come *before* the script that loads
   ``MathJax.js`` itself.

   For more information, see :doc:`options/extensions/Content-MathML`.


.. _mathml-mml3:

Experimental mml3 extension
===========================

MathML includes a number of tags that support elementary-school
mathematics, like ``<mstack>`` and ``<mlongdiv>``.  MathJax has only
experimental support for these tags via the `mml3` extension.  This
uses an XSLT transform to convert these tags into other presentation
MathML tags that MathJax has implemented. This does a reasonable job
for some constructs, and a poorer job for others, but it does make it
possible to process elementary math within MathJax.  Better support is
planned for the future.

To activate experimental features in your documents, simply include
``[mml]/mml3`` in the ``load`` array of the ``loader`` section of your
configuration:


.. code-block:: javascript

   MathJax = {
     loader: {load: ['[mml]/mml3']}
   };


This will install a pre-filter on the MathML input jax that performs
the XSLT transform before processing it.


.. _mathml-semantics-annotations:

Semantics and Annotations
=========================

Some popular annotation formats like TeX, Maple, or Content MathML are
often included in the MathML source via the ``semantics`` element.
This is particularly true of MathML that is generated by other
software, such as editors or computational tools.

MathJax provides access to these annotations through the ``"Show Math
As"`` menu, via the ``Annotations`` submenu.  See the `MathML
Annotation Framework
<http://www.w3.org/TR/MathML/chapter5.html#mixing.semantic.annotations>`_
documentation from the W3C, and the :ref:`menu-options` section of
this document for details.

|-----|
