.. _mathml-options:

##############################
MathML Input Processor Options
##############################

The options below control the operation of the :ref:`MathML input
processor <mathml-input>` that is run when you include ``'input/mml'``
in the :data:`load` array of the :data:`loader` block of your MathJax
configuration, or if you load a combined component that includes the
MathML input jax.  They are listed with their default values.  To set
any of these options, include an :data:`mml` section in your
:data:`MathJax` global object.

-----

The Configuration Block
=======================

.. code-block:: javascript

    MathJax = {
      mml: {
        parseAs: 'html',                     // or 'xml'
        forceReparse: false,                 // true to serialize and re-parse all MathML
        allowHtmlInTokenNodes: false,        // True if HTML is allowed in token nodes
        fixMisplacedChildren: true,          // True if we want to use heuristics to try to fix
                                             //   problems with the tree based on HTML not handling
                                             //   self-closing tags properly
        parseError: function (node) {        // function to process parsing errors
          this.error(this.adaptor.textContent(node).replace(/\n.*/g, ''));
        },
        verify: {                            // parameters controlling verification of MathML
          checkArity: true,                  //   check if number of children is correct
          checkAttributes: false,            //   check if attribute names are valid
          checkMathvariants: true,           //   check for valid mathvariant values
          fullErrors: false,                 //   display full error messages or just error node
          fixMmultiscripts: true,            //   fix unbalanced mmultiscripts
          fixMtables: true                   //   fix incorrect nesting in mtables
        },
        preFilters: [],                      // A list of pre-filters to add to the MathML input jax
        mmlFilters: [],                      // A list of mathml-filters to add to the MathML input jax
        postFilters: [],                     // A list of post-filters to add to the MathML input jax
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
   parser, which is the default.  In node applications (where the
   ``liteDOM`` is used), these both use the same parser, which is not
   very strict.

.. _mathml-forceReparse:
.. describe:: forceReparse: false

   Specifies whether MathJax will serialize and re-parse MathML found
   in the document.  This can be useful if you want to do XML parsing
   of the MathML from an HTML document.

.. _mathml-allowHtmlInTokenNodes:
.. describe:: allowHtmlInTokenNodes: false

   HTML5 specifies that HTML can be included within token nodes in
   MathML.  This is now supported in MathJax v4, so you can include
   images or form inputs, for example, in your mathematical
   expressions.  Because this HTML is not sanitized in any way by
   MathJax, it is a potential security risk for sites that allow
   user-supplied MathML.  For this reason, MathJax includes the
   :data:`allowHtmlInTokenNodes` option, which is ``false`` by
   default.  If you want to process HTML in MathML token nodes, set
   this option to ``true``.  See the :ref:`mathml-html-in-token-nodes`
   section for more details.

.. _mathml-fixMisplacedChildren:
.. describe:: fixMisplacedChildren: true

   Specifies whether MathJax should try to fix problems created by
   improper nesting of MathML tags.  This can be due to a missing or
   extra close tag, or by using self-closing tags in an HTML document,
   where some browsers require explicit close tags for MathML.

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
      :attr:`data-` attribute).  If an attribute is in error, the node
      is either placed inside an ``<merror>`` node (so that it is
      marked in the output as containing an error), or is replaced by
      an ``<merror>`` containing a full message indicating the bad
      attribute, depending on the setting of :attr:`fullErrors` below.

      Currently only names are checked, not values.  Value
      verification may be added in a future release.

   .. _mathml-verify-checkMathvariant:
   .. describe:: checkMathvariant: true

      This specifies whether the values for the :attr:`mathvariant`
      attributes are checked for validity.  If an invalid variant is
      used, MathJax can crash, so correct variants are important.

   .. _mathml-verify-fullErrors:
   .. describe:: fullErrors: false

      This specifies whether a full error message is displayed when a
      node produces an error, or whether just the node name is
      displayed (or the node itself in the case of attribute errors).

   .. _mathml-verify-fixMmultiscripts:
   .. describe:: fixMmultiscripts: true

      This specifies whether extra ``<none/>`` entries are added to
      ``<mmultiscripts>`` elements to balance the super- and
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

.. _mathml-preFilters:
.. describe:: preFilters: []

   This specifies a list of functions to run as pre-filters for the
   MathML input jax.  Each entry is either a function, or an array
   consisting of a function followed by a number, which is the
   priority of the pre-filter (lower priorities run first).  The
   functions are passed an object with three properties: :data:`math`,
   giving the :data:`MathItem` being processed, :data:`document`
   giving the :data:`MathDocument` for the math item, and :data:`data`
   giving the serialized MathML string to be parsed.  The pre-filters
   are executed only when the MathML input jax is asked to process a
   mathml string (such as when :js:meth:`MathJax.mathml2svg()` is
   called), or when the :ref:`forceReparse <mathml-forceReparse>`
   option is set.  When the MathML is taken directly from a document
   DOM, it is already parsed, and so is not a serialized MathML
   string.
   
   See the :ref:`sync-filters` section for examples of pre-filters.

.. _mathml-mmlFilters:
.. describe:: mmlFilters: []

   This specifies a list of functions to run as MathML-filters for the
   MathML input jax.  Each entry is either a function, or an array
   consisting of a function followed by a number, which is the
   priority of the pre-filter (lower priorities run first).  The
   functions are passed an object with three properties: :data:`math`,
   giving the :data:`MathItem` being processed, :data:`document`
   giving the :data:`MathDocument` for the math item, and :data:`data`
   giving the MathML DOM elements for the expression.  The
   MathML-filters are executed just before the MathML input jax
   converts the DOM elements into MathJax's internal format.  This can
   be used to manipualte the expression before it is processed.
 
.. _mathml-postFilters:
.. describe:: postFilters: []

   This specifies a list of functions to run as post-filters for the
   MathML input jax.  Each entry is either a function, or an array
   consisting of a function followed by a number, which is the
   priority of the pre-filter (lower priorities run first).  The
   functions are passed an object with three properties: :data:`math`,
   giving the :data:`MathItem` being processed, :data:`document`
   giving the :data:`MathDocument` for the math item, and :data:`data`
   giving the root of the internal representation of the MathML tree
   (the internal form of the top-level ``<math>`` node).  The
   post-filters are executed when the MathML input jax has finished
   converting it to the intermal MathML format, but before the
   MathItem's :data:`root` property is set.

   See the :ref:`sync-filters` section for examples of post-filters.


-----


Developer Options
=================

In addition to the options listed above, low-level options intended
for developers include the following:

.. _mathml-FindMathML:
.. describe:: FindMathML: null

   The :data:`FindMathML` object instance that will override the
   default one.  This allows you to create a subclass of the
   ``FindMathML`` class, create an instance of it, and pass that to
   the MathML input jax to use in place of the default one.  A
   ``null`` value means use the usual ``FindMathML`` class and make a
   new instance of that.

.. _mathml-MathMLCompile:
.. describe:: MathMLCompile: null

   The :data:`MathMLCompile` object instance that will override the
   default one.  This allows you to create a subclass of the
   ``MathMLCompile`` class, make an instance of it, and pass that to
   the MathML input jax to use in place of the default one.  A
   ``null`` value means use the usual ``MathMLCompile`` class and make
   a new instance of that.

.. _mathml-MmlFactory:
.. describe:: MmlFactory: null

   The :data:`MmlFactory` object instance the will override the
   default one.  This allows you to create a subclass of the
   ``MmlFactory`` class, make an instance of it, and pass that to the
   MathML input jax to use in place of the default one.  A ``null``
   value means use the usual ``MmlFactory`` class and make a new
   instance of that.
   
|-----|
