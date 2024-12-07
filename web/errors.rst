
.. _detecting-typeset-errors:

========================
Detecting Typeset Errors
========================

MathJax provides you with several ways to manage errors that occur
while processing your mathematical expressions.  Several of these are
listed below.

.. _handling-tex-errors:

Handling TeX Errors
===================

When the TeX input jax encounters a syntax error or other problem with
the TeX code that it is typesetting, it usually replaces the TeX with
an error message (in red on a yellow background) to inform you of the
problem.  The :ref:`tex-noundefined` and :ref:`tex-noerrors`
extensions modify that behavior, however.  The first prevents error
messages when an undefined macro is used (it displays the undefined
macro name in red as an indication of the problem), while the second
prevents error messages entirely, and simply displays the original TeX
code inside an outline box.  Note that the :ref:`tex-noundefined`
extension is included in the :ref:`combined components
<combined-components>`.

.. _tex-parse-errors:

Listing TeX Parse Errors
------------------------

If you wish to identify the TeX expressions that don't parse properly,
there are several approaches that could be taken.  First, you can
provide a :js:meth:`formatError()` function in the :js:data:`tex`
section of your MathJax configuration.

.. js:method:: formatError(jax, error)

   :param TeX jax: The TeX input jax that is processing the math.
   :param Error error: The error object that contains the message
                       indicating the problem with the TeX syntax.
   :return: The ``MmlNode`` object that should be used as the content
            of the ``math`` tag for this expression, usually an
            ``merror`` node.

You can use this function to track the errors in your TeX code.  The
``jax.latex`` value is the TeX string that is being typeset, while
``jax.parseOptions.mathItem`` is the ``MathItem`` object for the math
on the page.  This contains pointers into the DOM where the original
TeX code was, along with other information.  See the `MathItem
definition <https://github.com/mathjax/MathJax-src/blob/master/ts/core/MathItem.ts>`__
for details about this object.

.. _tex-error-report:

For example, you could use this to print information about the errors using

.. code-block:: javascript

   MathJax = {
     tex: {
       formatError(jax, error) {
         console.log(`TeX error in "${jax.latex}": ${error.message}`);
         return jax.formatError(error);
       }
     }
   }

which logs the message and then performs the usual action for
formatting the error.  Alternatively, you could use

.. code-block:: javascript

   MathJax = {
     tex: {
       formatError(jax, error) {
         const node = jax.parseOptions.nodeFactory.create('error', 'Error!');
         node.attributes.set('title', error.message);
         return node;
       }
     }
   }

to have just ``Error!`` show up as the error message, with the actual
error message stored in the ``title`` attribute of the ``merror`` node
so that a tooltip will pop up when you hover over the error message.


.. _listing-all-errors:

Listing All Math Errors
-----------------------

Another approach would be to look through the list of MathItems after
the typesetting is complete and filter out the ones that include
``merror`` nodes.

 .. code-block:: javascript

    const errorItems = Array.from(MathJax.startup.document.math).filter((item) => {
      const node = item.root?.childNodes?.[0]?.childNodes?.[0];
      return node && node.isKind('merror') && node.attributes.get('data-mjx-error');
    });
    for (const item of errorItems) {
      console.log(`Error in "${item.math}": ` +
                  item.root.childNodes[0].childNodes[0].attributes.get('data-mjx-error'));
    }

This turns the document's math list into an array and filters by a
function that looks through each MathItem's MathML tree (its ``root``
property) to see if it's first top-level item is an ``merror`` with a
``data-mjx-error`` attribute.  Note that the first child of the
top-level ``math`` element in the ``root`` is the inferred ``mrow``
element, which is explicit in the MathJax MathML tree, so the first
``.childNodes[0]`` is getting that inferred ``mrow``.

.. _report-undefined-macros:

Reporting Undefined Macros
--------------------------

If you are interested in obtaining a list of the macros that are
undefined on a page, here is one approach to doing that.

.. code-block:: javascript

   MathJax = {
     startup: {
       ready() {
         const {HandlerType, ConfigurationType} = MathJax._.input.tex.HandlerTypes;
         const {Configuration} = MathJax._.input.tex.Configuration;
         Configuration.create('record-undefined', {
           [ConfigurationType.FALLBACK]: {
             [HandlerType.MACRO]: (parser, name) => {
               console.log(`\\${name} undefined in "${parser.mathItem}"`);
               parser.Push(parser.create('token', 'mtext', {mathcolor: 'red'}, `\\${name}`));
             }
           }
         });
         MathJax.startup.defaultReady();
       }
     },
     tex: {
       packages: {
         '[+]': ['record-undefined'],
         '[-]': ['noundefined']
       }
     }
   }

Here, we create a new TeX configuration that has a fallback handler
for macros, meaning that it will be called whenever a macro is not
defined.  That handler logs the undefined macro and the TeX in which
it occurred, and then inserts the macro name into the output in red,
like the `noundefined` extension does.  The ``tex`` block's
``packages`` array is modified by adding the new configuration and
removing the ``noundefined`` extension that is part of the
pre-defined combined configurations.

-----

.. _handling-mathml-errors:

Handling MathML Errors
======================

MathML can contain errors, such as the wrong number of child nodes, or
improper nesting of nodes.  MathJax can run verification tests on the
MathML to check that it is properly formed, and to report problems
when they occur.  By default, MathJax will replace an incorrect node
by an ``merror`` node that lists the name of the node in red on a
yellow background, leaving the rest of the math untouched.  If you
hover over the node name, a tooltip will pop up listing the full
error.

.. _verifying-mathml:

Verifying MathML
----------------

There are a number of checks that MathJax can perform to verify the
structure of your MathML, and these can be controlled using
configuration options for the MathML input jax.  The options and their
defaults are given below:

.. code-block:: javascript

   MathJax = {
     mathml: {
       verify: {
         checkArity: true,         // check that the number of child nodes is correct
         checkAttributes: false,   // check that attribute names are valid
         checkMathvariants: true,  // check that the mathvariant value is valid
         fullErrors: false,        // show complete errors or just the name of the errant node
         fixMmultiscripts: true,   // add missing <none> elements in <mmultiscripts>
         fixMtables: true          // add missing <mrow> and <mtd> elements in <mtable>
       }
     }
   }

You can identify these errors in the internal MathML tree stored in a
MathItem's ``root`` property by looking for ``merror`` nodes with
``data-mjx-message`` attributes, which hold the full error message for
the node.  For example,

.. code-block:: javascript

   for (const mitem of MathJax.startup.document.math) {
     mitem.root.walkTree((node) => {
       if (node.isKind('merror') && node.attributes.get('data-mjx-message')) {
         console.log(`Error: "${node.attributes.get('data-mjx-message')}" in`, '\n', mitem.math);
       }
     });
   }

would report the MathML verification errors in all the math in the page.

See the :ref:`mathml-options` section for more details on the
verification configuration options.

.. _mathml-compilation-errors:

MathML Compilation Errors
-------------------------

The processing of a MathML expression can lead to compilation errors,
such as errors caused by text not enclosed in a token element tag, or
the presence of nodes that are not MathML nodes.  Such errors cause the
entire MathML tree to be replaced by an ``merror`` node containing the
error message describing the problem.

These errors can be trapped using the :js:meth:`compileError()`
function described in the section below.

-----

.. _trap-errors:

Trapping Compile and Typeset Errors
===================================

Sometimes compiling a TeX expression into the internal MathML
representation, or processing a MathML tree, can lead to an error
message "Math input error".  Hovering over this message should cause a
tooltip with a more detailed error message to appear.

You can trap such errors by specifying a :js:meth:`compileError()`
function in the :js:data:`options` section of your MathJax configuration.

.. js:function:: compileError(document, math, error)

   :param MathDocument document: The MathDocument containing the math.
   :param MathItem math: The MathItem representing the math that has
                         failed to process.
   :param Error error: The Error object containing the error message
                       for the problem that occurred.

The default action is to call :js:meth:`document.compileError(math,
error)`, which sets :js:data:`math.root` to a ``math`` node
containing an ``merror`` whose content is :js:data:`error.message`.
You can override that and do your own processing.  For example

.. code-block:: javascript

   MathJax = {
     options: {
       compileError(document, math, error) {
         console.log(`Error: "${error.message}" in`, '\n', math.math);
         document.compileError(math, error);
       }
     }
   }

will print the error message and offending TeX or MathML string to the
console, and then call the default ``compileError()`` function.

Similarly, it is possible that an error can occur during the process
of typesetting the math (that is, the conversion of the internal
MathML to the specified output format).  These produce a "Math output
error" message within the page; hovering over such a message will
produce a tooltip that details the cause of the problem.

As with compilation errors, there is a function that traps such
typesetting errors.

.. js:function:: typesetError(document, math, error)

   :param MathDocument document: The MathDocument containing the math.
   :param MathItem math: The MathItem representing the math that has
                         failed to process.
   :param Error error: The Error object containing the error message
                       for the problem that occurred.


|-----|
