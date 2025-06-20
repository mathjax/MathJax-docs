.. _sync-renderActions:

======================
MathJax Render Actions
======================

A :data:`MathDocument` instance contains a sequence of functions
called :ref:`renderActions <document-renderactions>` that are used
during the typesetting process to perform the actions needed to locate
expressions in the page, compile them into the internal format, obtain
font metrics for the surrounding text, typeset the mathematics, insert
the typeset math back into the page, add menu actions, and so on.
Loading some components will add new functions into this list.  For
example, the :ref:`semantic-enrich-component` component adds a render
action that computes the semantic-enrichment for each expression.
All the typesetting and conversion functions listed above use this
collection of functions to perform their typesetting or conversion
operations.

The :ref:`renderActions <document-renderactions>` configuration option
provides a means of linking your own functions into this processing
pipeline at any point, replacing existing steps with your own custom
versions, or even removing them to trim down what MathJax does.

The :data:`renderActions` configuration object consists of one or more
``name: value`` pairs (separated by commas), where the :data:`name`
gives an identifier for the action, and the :data:`value` is an array
consisting of a number followed by zero, one, or two functions, and
an optional boolean, as described bellow.

The number gives the priority of the action in relation to the other
actions that are already defined.  The functions for the lowest
numbers are performed first.  The number may be negative, or have
decimal places.  The existing priorities are found in the
:data:`STATE` variable from the ``ts/core/MathItem.ts`` file or the
:data:`MathJax._.core.MathItem` object (when using MathJax
Components).  These include the following:

.. list-table::
   :header-rows: 1

   * - Name
     - Priority
     - Identifier
   * - UNPROCESSED
     - 0
     -
   * - FINDMATH
     - 10
     - find
   * - COMPILED
     - 20
     - compile
   * - CONVERT
     - 100
     -
   * - METRICS
     - 110
     - metrics
   * - RERENDER
     - 125
     -
   * - TYPESET
     - 150
     - typeset
   * - INSERTED
     - 200
     - update
   * - STYLES
     - 201
     - styles
   * - LAST
     - 10000
     -

Here, the `name` is the value's key in the :data:`STATE` object that
has the given `priority`.  The `identifier` is the key in the
:data:`renderAction` object for the action with the given priority.
Some states are for reference only and do not have associated actions;
e.g., ``CONVERT`` and ``RERENDER`` are only used to tell where a
:js:meth:`MathDocument.convert()` or
:js:meth:`MathDocument.rerender()` action should start in the list of
render actions, while ``UNPROCESSED`` and ``LAST`` mark the usual
start and end of the processing list, though values outside that range
are allowed.

Some extensions add new render actions.  These include

.. list-table::
   :header-rows: 1

   * - name
     - Priority
     - Identifier
     - Extension
   * - CONTEXT_MENU
     - 170
     - addMenu
     - ui/menu
   * -
     - 205
     - getMenu
     - ui/Menu
   * -
     - 1
     - checkLoading
     - ui/menu
   * - LAZYALWAYS
     - 13
     - lazyAlways
     - ui/lazy
   * - ENRICHED
     - 30
     - enrich
     - a11y/sementic-enrich
   * - ATTACHSPEECH
     - 210
     - attachSpeech
     - a11y/speech
   * - COMPLEXITY
     - 40
     - complexity
     - a11/complexity
   * - EXPLORER
     - 230
     - explorable
     - a11y/explorer

You may use these values to determine the appropriate priorities to
use for your own actions.  Actions with the same priority will be
performed in the order in which they were added to the render action
list for the document by you and the components you have loaded.  The
:js:meth:`newState()` function from the ``ts/core/MathItem.ts`` file
can be used to create a new named state value like the ones above.
Otherwise, you can give priorities as numeric values, or as an
existing :data:`STATE`, possibly value plus (or minus) a given number.

Following the priority in the action's definition array should be
zero, one, or two functions.  The first is called whenever the page is
typeset via a call to :js:meth:`MathJax.typeset()`,
:js:meth:`MathDocument.render()` or
:js:meth:`MathDocument.rerender()`, or their promise-based versions,
and is passed the :data:`MathDocument` object in which it is running.
Usually this function will loop through the :data:`MathItem` objects
stored in the :data:`MathDocument.math` list and perform its action on
each of those individually.

The second function is called whenever a math expression is updated
individually via its :meth:`rerender()` method (e.g., when a
subexpression is collapsed, or a toggle item is toggled, or the speech
ruleset is changed), or during a :js:meth:`MathDocument.convert()`
call is made, or any of the conversion functions based on it (e.g.,
:js:meth:`MathJax.tex2svg()`), or any of the promise-based versions of
this is called.  The function for this action is called with two
arguments: the :data:`MathItem` on which it is to operate, and the
:data:`MathDocument` that holds that item.

If either of these functions is given as an empty string, then that
action is not performed (that way, you can define a typeset action
without a rerender action, for example), and if it is a non-empty
string rather than a function, that is taken to be the name of a
method of the :data:`MathDocument` (for the first function) or
:data:`MathItem` (for the second function) to be called for that
action instead.  If the function is missing, then the identifier used
for the action in the :data:`renderAction` object is taken as the
method name to use.

Finally, the optional boolean value tells whether the second function is
to be use for both :meth:`convert()` and :meth:`rerender()` actions
(when ``true``, the default), or only for :meth:`rerender()` actions
(when ``false``).

To remove a render action, set its identifier to an empty array.
For example,

 .. code-block:: js

    MathJax = {
      option: {
        renderActions: {
          addMenu: [],
          getMenu: [],
          checkLoading: [],
        }
      }
    }

would disable all the MathJax menu actions.  This would disable to the
MathJax menu, though it is easier to set :data:`enableMenu` to
``false`` to accomplish that.

To replace a render action, set its identifier to the definition
you would like to use instead.  For example, you could replace the
:data:`typeset` action with one that generates MathML output in the
page rather than the CHTML or SVG output from MathJax.  The
:ref:`mathml-output` section for an example of how to do this.

-----

.. _renderaction-tooltip:

A Render Action for Tooltips
============================

Here is an example of defining your own render action that adds the
original TeX notation as a tooltip on the MathJax output:

.. code-block:: js

   MathJax = {
     addTooltip(item) {
       const adaptor = MathJax.startup.adaptor;
       adaptor.setAttribute(math.typesetRoot, 'title', item.math);
     },
     options: {
       renderActions: {
         addTooltip: [175,
           (doc) => {
             for (const item of doc.math) {
               MathJax.config.addTooltip(item);
             }
           },
           (math, doc) => MathJax.config.addTootip(math),
         ]
       }
     },
   }

This uses a function :meth:`addTooltip()` that is stored in the
MathJax configuration (and otherwise ignored by MathJax), and
specified a new :data:`addTooltip` render action at priority 175
(after typesetting by before inserting into the page).  The first
function of the action, which is called as part of a typeset action,
loops through the math items in the document and call the
:meth:`addTooltip()` function on each one.  The second, called during
a convert or rerender action, calls the :meth:`addTooltip()` function
on the math item that it was passed.

-----

.. _renderaction-collapse:

A Render Action to Collapse Complex Subexpressions
==================================================

This example loads the :ref:`complexity-component` component and
automatically collapses any subexpressions with complexity greater
than a given value (20 in this case).

.. code-block:: js

   MathJax = {
     options: {
       menuOptions: {
         settings: {
           collapsible: true
         }
       },
       renderActions: {
         collapse: [50,
           (doc) => {
             for (const math of doc.math) {
               if (!math.root || math.state > 50) continue;
               math.root.walkTree((node) => {
                 if (node.isKind('maction') && node.attributes.get('data-collapsible')) {
                   if (node.childNodes[1].attributes.get('data-semantic-complexity') > 20) {
                     node.attributes.set('selection', 1);
                   }
                 }
               });
               math.state(50);
             }
           },
           '',
           false
         ]
       }
     }
   };

Here we define an action that occurs after the math is compiled and
its complexity values have been computed, but before the math is
typeset.  The action only operates for typeset actions (not convert or
rerender calls), and it walks the MathML tree to find ``maction``
elements inserted by the `complexity` component that have complexity
greater than 20.  These get their selections set to 1, so they select
the collapsed version instead of the expanded ones.  Then the state is
set to 50 so that if the item is processed again (either because the
typesetting had to be restarted due to an asynchronous action later in
the render actions, or by a later typesetting call), this math item
will not be checked again.

-----

.. _renderaction-findtags:

A Render Action to use Tags for Math Delimiters
===============================================

This example replaces the usual ``find`` action with a custom one.
Instead of looking for the usual ``\(...\)``, ``\[...\]``, and
``$$...$$`` math delimiters, this render action will look for
``<tex>...</tex>`` and ``<dtex>...</dtex>`` elements for in-line and
display style TeX expressions.

.. code-block:: js

   MathJax = {
     options: {
       renderActions: {
         find: [10,
           (doc) => {
             for (const node of document.querySelectorAll('tex, dtex')) {
               if (node.childNodes.length !== 1 || node.firstChild.nodeName !== '#text') continue;
               const display = node.nodeName.toLowerCase() === 'dtex';
               const math = new doc.options.MathItem(node.textContent, doc.inputJax.tex, display);
               const text = document.createTextNode('');
               node.parentNode.replaceChild(text, node);
               math.start = {node: text, delim: '', n: 0};
               math.end = {node: text, delim: '', n: 0};
               doc.math.push(math);
             }
           },
           '',
           false
         ]
       }
     }
   };

Thius render action replaces the usual ``find`` action with one
that looks for all the ``<tex>`` and ``<dtex>`` elements in the
document, and checks that they have only one child that is a text
element.  If so, it creates a new :data:`MathItem` object with the
node's text content, using the TeX input jax, and marked as a display
expression if the tag was ``dtex``.  It then makes a new empty text
node and replaces the origianl node with that, then hooks the
:data:`MathItem` to the empty text node.  Finally, it pushes the new
:data:`MathItem` onto the document's math list.

The reason this render action replaces the usual one is because its
identifier is ``find``.  If you want to look for both the original
delimiters *and* these tags then you should use a different
identifier, like ``findTags``, instead.


|-----|
