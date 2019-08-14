.. _mathml-options:

##############################
MathML Input Processor Options
##############################

The options below control the operation of the :ref:`MathML input
processor <mathml-input>` that is run when you include
``'input/mathml'`` in the ``load`` array of the ``loader`` block of
your MathJax configuration, or if you load a combined component that
includes the MathML input jax.  They are listed with their default
values.  To set any of these options, include an ``mml`` section in
your :data:`MathJax` global object.

-----

The Configuration Block
=======================

.. code-block:: javascript

    MathJax = {
      mml: {
        parseAs: 'html',                     // or 'xml'
        forceReparse: false,                 // true to serialize and re-parse all MathML
        parseError: function (node) {        // function to process parsing errors
          this.error(this.adaptor.textContent(node).replace(/\n.*/g, ''));
        }
      }
    };

-----


Option Descriptions
===================

.. _mathml-parseAs:
.. describe:: parseAs: 'html'

   Specifies how MathML strings should be parsed:  as XML or as HTML.
   When set to ``'xml'``, the browser's XML parser is used, which is
   more strict about format (e.g., matching end tags) than the HTML
   parser, which is the default.  In node application (where the
   ``liteDOM`` is used), these both use the same parser, which is not
   very strict.

.. _mathml-forceReparse:
.. describe:: forceReparse: false

   Specifies whether MathJax will serialize and re-parse MathML found
   in the document.  This can be useful if you want to do XML parsing
   of the MathML from an HTML document.

.. _mathml-parseError:
.. describe:: parseError: (node) => {...}

   Specifies a function to be called when there is a parsing error in
   the MathML (usually only happens with XML parsing).  The ``node``
   is a DOM node containing the error text.  Your function can process
   that in any way it sees fit.  The default is to call the MathML
   input processor's error function with the text of the error (which
   will create an ``merror`` node with the error message).  Note that
   this function runs with ``this`` being the MathML input processor
   object.

-----


Developer Options
=================

In addition to the options listed above, low-level options intended
for developers include the following:

.. _mathml-FindMathML:
.. describe:: FindMathML: null

   The ``FindMathML`` object instance that will override the default
   one.  This allows you to create a subclass of ``FindMathML`` and
   pass that to the MathML input jax.  A ``null`` value means use the
   default ``FindMathML`` class and make a new instance of that.

.. _mathml-MathMLCompile:
.. describe:: MathMLCompile: null

   The ``MathMLCompile`` object instance that will override the
   default one.  This allows you to create a subclass of
   ``MathMLCompile`` and pass that to the MathML input jax.  A
   ``null`` value means use the default ``MathMLCompile`` class and
   make a new instance of that.

|-----|
