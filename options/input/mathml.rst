.. _mathml-options:

##############################
MathML Input Processor Options
##############################

The options below control the operation of the :ref:`MathML input
processor <mathml-input>` that is run when you include
``'input/mml'`` in the ``load`` array of the ``loader`` block of
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
        },
        verify: {                            // parameters controling verification of MathML
          checkArity: true,                  //   check if number of children is correct
          checkAttributes: false,            //   check if attribute names are valid
          fullErrors: false,                 //   display full error messages or just error node
          fixMmultiscripts: true,            //   fix unbalanced mmultiscripts
          fixMtables: true                   //   fix incorrect nesting in mtables
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


.. _mathml-verify:
.. describe:: verify: {...}

   This object controls what verification/modifications are to be
   performed on the MathML that is being processed by MathJax.
   The values that can be included in the :attr:`verify` object are
   the following:

   .. _mathml-verify-checkArity:
   .. describe:: checkArity: true

      This specifies whether the number of children is verified or
      not.  The default is to check for the correct number of
      children.  If the number is wrong, the node is replaced by an
      ``<merror>`` node containing either a message indicating the
      wrong number of children, or the name of the node itself,
      depending on the setting of :attr:`fullErrors` below.

   .. _mathml-verify-checkAttributes:
   .. describe:: checkAttributes: false

      This specifies whether the names of all attributes are checked
      to see if they are valid on the given node (i.e., they have a
      default value, or are one of the standard attributes such as
      :attr:`style`, :attr:`class`, :attr:`id`, :attr:`href`, or a
      :attr:`data-` attribute.  If an attribute is in error, the node
      is either placed inside an ``<merror>`` node (so that it is
      marked in the output as containing an error), or is replaced by
      an ``<merror>`` containing a full message indicating the bad
      attribute, depending on the setting of :attr:`fullErrors` below.

      Currently only names are checked, not values.  Value
      verification may be added in a future release.

   .. _mathml-verify-fullErrors:
   .. describe:: fullErrors: false

      This specifies whether a full error message is displayed when a
      node produces an error, or whether just the node name is
      displayed (or the node itself in the case of attribute errors).

   .. _mathml-verify-fixMmultiscripts:
   .. describe:: fixMmultiscripts: true

      This specifies whether extra ``<none/>`` entries are added to
      ``<mmultiscripts>`` elements to balance the super- ans
      subscripts, as required by the specification, or whether to
      generate an error instead.

   .. _mathml-verify-fixMtables:
   .. describe:: fixMtables: true

      This specifies whether missing ``<mtable>``, ``<mtr>`` and
      ``<mtd>`` elements are placed around cells or not.  When
      ``true``, MathJax will attempt to correct the table structure if
      these elements are missing from the tree.  For example, an
      ``<mtr>`` element that is not within an ``<mtable>`` will have
      an ``<mtable>`` placed around it automatically, and an
      ``<mtable>`` containing an ``<mi>`` as a direct child node will
      have an ``<mtr>`` and ``<mtd>`` inserted around the ``<mi>``.


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
