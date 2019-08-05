.. _document-options:

################
Document Options
################

The options below conrol the operation of the ``MathDocument`` object
created by MathJax to process the mathematics in your web page.  They
are listed with their default values.  To set any of these options,
include an ``options`` section in your :data:`MathJax` global object.

-----

The Configuration Block
=======================

.. code-block:: javascript

    MathJax = {
      options: {
        compileError: function (doc, math, err) {doc.compileError(math, err)},
        typesetError: function (doc, math, err) {doc.typesetError(math, err)},
        renderActions: {...}
      }
    };

-----


Option Descriptions
===================

.. _document-compileError:
.. describe:: compileError: function (doc, math, err) {doc.compileError(math, err)}

   This is the function called whenever there is an uncaught error
   while an input jax is running (i.e., during the document's
   :meth:`compile()` call).  The arguments are the ``MathDocument`` in
   which the error occurred, the ``MathItem`` for the expression where
   it occurred, and the ``Error`` object for the uncaught error.  The
   default action is to call the document's default
   :meth:`compileError()` function, which sets :attr:`math.root` to a
   math element containing an error message (i.e.,
   ``<math><merror><mtext>Math input error<mtext></merror></math>``).
   You can replace this with your own function for trapping run-time
   errors in the input processors.

.. _document-typesetError:
.. describe:: typesetError: function (doc, math, err) {doc.typesetError(math, err)}

   This is the function called whenever there is an uncaught error
   while an output jax is running (i.e., during the document's
   :meth:`typeset()` call).  The arguments are the ``MathDocument`` in
   which the error occurred, the ``MathItem`` for the expression where
   it occurred, and the ``Error`` object for the uncaught error.  The
   default action is to call the document's default
   :meth:`typesetError()` function, which sets
   :attr:`math.typesetRoot` to a ``<span>`` element containing the
   text ``Math output error``.  You can replace this with your own
   function for trapping run-time errors in the output processors.

.. _document-renderActions:
.. describe:: renderActions: {...}

   This is an object that specifies the actions to take during the
   :meth:`MathJax.typeset()` (and its underlying
   :meth:`MathJax.startup.document.render()` call), and the various
   conversion functions, such as :meth:`MathJax.tex2svg()` (and their
   underlying :meth:`MathJax.startup.document.convert()` call).  The
   structure of the object is ``name: value`` pairs separated by
   commas, where the ``name`` gives an identifier for each action, and
   the ``value`` is an array consisting of a number and zero, one, or two
   functions, followed optionally by a boolean value.

   The number gives the priority of the action (lower numbers are
   executed first when the actions are performed).  The first function
   gives the action to perform when a document is rendered as a whole,
   and the second a function to perform when an individual expression
   is converted or rerendered.  These can be given either as an
   explicit function, or as a string giving the name of a method to
   call (the first should be a method of a ``MathDocument``, and the
   second of a ``MathItem``).  If either is an empty string, that
   action is not performed.  If the function is missing, the method
   name is taken from the ``name`` of the action.  The boolean value
   tells whether the second function should be performed during a
   :meth:`convert()` call (when true) or only during a
   :meth:`rerender()` call (when false).

   For example,

   .. code-block:: javascript

      MathJax = {
        options: {
          renderActions: {
            compile: [MathItem.STATE.COMPILED],
            metrics: [MathItem.STATE.METRICS, 'getMetrics', '', false]
          }
        }
      };

   specifies two actions, the first called ``compile`` that uses the
   :meth:`compile()` method of the ``MathDocument`` and ``MathItem``,
   and the second called ``metrics`` that uses the :meth:`getMetric()`
   call for the ``MathDocument`` when the document is rendered, but
   does nothing during a :meth:`rerender()` or :meth:`convert()` call
   or an individual ``MathItem``.

   If the first function is given explicitly, it should take one
   argument, the ``MathDocument`` on which it is running.  If the
   second function is given explicitly, it should take two arguments,
   the ``MathItem`` that is being processed, and the ``MathDocument``
   in which it exists.

   The default value includes actions for the main calls needed to
   perform rendering of math: ``find``, ``compile``, ``metrics``,
   ``typeset``, ``update``, and ``reset``.  These find the math in the
   document, call the input jax on the math that was located, obtain
   the metric information for the location of the math, call the
   output jax to convert the internal format to the output format,
   insert the output into the document, and finally reset the internal
   flags so that a subsequent typesetting action will process
   properly.

   You can add your own actions by adding new named actions to the
   ``renderActions`` object, or override existing ones by re-using an
   existing name from above.  See the :ref:`mathml-output` section for
   an example of doing this.  The priority number tells where in the
   list your actions will be performed.

   Loading extensions may cause additional actions to be inserted into
   the list.  For example, the :ref:`menu-component` component inserts
   an action to add the menu event handlers to the math after it is
   inserted into the page.

-----

Developer Options
=================

.. _document-OutputJax:
.. describe:: OutputJax: null

   The ``OutputJax`` object instance to use for this
   ``MathDocument``.  If you are using MathJax components, the
   :ref:`startup-component` component will create this automatically.
   If you are writing a Node application accessing MathJax code
   directly, you will need to create the output jax yourself and pass
   it to the document through this option.

.. _document-InputJax:
.. describe:: InputJax: null

   The ``InputJax`` object instance to use for this
   ``MathDocument``.  If you are using MathJax components, the
   :ref:`startup-component` component will create this automatically.
   If you are writing a Node application accessing MathJax code
   directly, you will need to create the input jax yourself and pass
   it to the document through this option.

.. _document-MmlFactory:
.. describe:: MmlFactory: null

   The ``MmlFactory`` object instance to use for creating the internal
   MathML objects. This allows you to create a subclass of
   ``MmlFactory`` and pass that to the document.  A ``null`` value
   means use the default ``MmlFactory`` class and make a new instance
   of that.

.. _document-MathList:
.. describe:: MathList: DefaultMathList

   The ``MathList`` object class to use for managing the list of
   ``MathItem`` objects associated with the ``MathDocument``.  This
   allows you to create a subclass of ``MathList`` and pass that to
   the document.
   
.. _document-MathItem:
.. describe:: MathItem: DefaultMathItem

   The ``MathItem`` object class to use for maintaining the
   information about a single expression in a ``MathDocument``.  This
   allows you to create a subclass of ``MathItem`` and pass that to
   the document.  The document ``Handler`` object may define its own
   subclass of ``MathItem`` and use that as the default instead.  For
   example, the HTML handler uses ``HTMLMathItem`` objects for this
   option.
   
-----

.. raw:: html

   <span></span>
