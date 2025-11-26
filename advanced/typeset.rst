.. _typeset-math:

##########################
MathJax in Dynamic Content
##########################

When MathJax is initially loaded, it will typeset any math that is
available in the page.  For static pages, that is all that you will
need to do to make your mathematics appear and be accessible.  Many
pages, however, load or create content dynamically, and if that new
material contains mathematics, MathJax will need to be told to typeset
that new mathematics, as that is not done automatically by MathJax.

The following sections show how this can be done within the
:ref:`mathjax-components` framework using the commands that are part
of the :data:`MathJax` global variable.  For node applications or
custom builds of MathJax that don't use MathJax Components, you would
need to use the lower-level direct calls to the MathJax
:data:`MathDocument` methods that correspond to those commands.


.. _dynamic-new-content:

Handling New Content
====================

If you are writing a dynamic web page where content containing
mathematics may appear after MathJax has already typeset the rest of
the page, then you will need to tell MathJax to look for mathematics
in the page again when that new content is produced.  To do that, you
need to use one of the :js:meth:`MathJax.typeset()` or
:js:meth:`MathJax.typesetPromise()` functions.  These cause MathJax
to look for unprocessed mathematics on the page and typeset it,
leaving unchanged any math that has already been typeset.

The first of these runs synchronously, but if the mathematics on the
page uses ``\require`` or causes an extension to be auto-loaded (via
the :ref:`tex-autoload` component), or needs characters from a region
of the font that hasn't already been loaded, this will cause the
:js:meth:`MathJax.typeset()` call to fail.  In this case, you should
use :js:meth:`MathJax.typesetPromise()` instead.  This returns a
promise that is resolves when the typesetting is complete.  See the
:ref:`typeset-async` section for more details.

.. note::

   The :js:meth:`MathJax.typeset()` command corresponds to

   .. code-block:: javascript

      (elements = null) => {
        const doc = MathJax.startup.document;
        doc.options.elements = elements;
        doc.reset();
        doc.render();
      }

   and :js:meth:`MathJax.typesetPromise()` corresponds to

   .. code-block:: javascript

      (elements = null) => {
        const doc = MathJax.startup.document;
        return doc.whenReady(async () => {
          doc.options.elements = elements;
          doc.reset();
          await doc.renderPromise();
        });
      }

   Those not using MathJax Components can use these definitions, where
   ``const doc = ...`` is replaced by your own :data:`MathDocument`
   object created by :js:meth:`mathjax.document()`.


.. _dynamic-changed-content:

Handling Content that Changes
=============================

Some web pages replace old content with new content in some
circumstances.  For example, a "book reader" may load individual pages
to be displayed in its main content area, with each new page replacing
the previously viewed one, or a page that allows users to enter
content may include an editor with a preview that updates as the user
types new content.

When the changing content includes typeset mathematics, special care
must be taken to inform MathJax that previously typeset mathematics is
being removed before doing so.  This is because MathJax keeps track of
the expressions that it typesets so that they can be updated if
changes are made to the menu settings.  For example, if the renderer
is changed, MathJax needs to go back and re-render all the
expressions, so it needs to know where they are in the page.

Information about the mathematics that MathJax has typeset is stored
in a list of :data:`MathItem` objects that is part of the
:data:`MathDocument` maintained by MathJax.  If content containing
typeset mathematics is removed from the page, the corresponding
:data:`MathItem` objects need to be removed from that list, otherwise
MathJax will think that math is still in the page, which can lead to
problems if MathJax tries to re-render those items.  It also means
that the list can grow unexpectedly large, and that the old typeset
expressions are not freed from memory, causing MathJax's memory usage
to grow.  In a situation like an editor with preview, where the
content is updated for each keystroke, that can lead to a rapid growth
in memory and a corresponding decrease in performance over time.

To deal with changing content, MathJax provides a function that tells
it to forget about math that it has previously typeset:

.. js:function:: MathJax.typesetClear(elements)

   :param HTMLElement[] elements: An optional array of HTML elements
                                  whose typeset math is to be
                                  forgotten.  If not given, all math
                                  items are forgotten (i.e., the
                                  entire list of items is removed).

If you are removing a portion of your document that may include
typeset mathematics, you should call this function **before** removing
the content from the DOM so that MathJax can determine which
expressions it contains and remove them from its internal list of
expressions.  If you fail to do this, MathJax's expression list will
contain orphan expressions that are no longer part of the DOM.

.. note::

   The :js:meth:`MathJax.typesetClear()` method corresponds to

   .. code-block:: js

      (elements = null) => {
        const doc = MathJax.startup.document;
        if (elements) {
          doc.clearMathItemsWithin(elements);
        } else {
          doc.clear();
        }
      }

   Those not using MathJax Components can use these definitions, where
   ``const doc = ...`` is replaced by your own :data:`MathDocument`
   object created by :js:meth:`mathjax.document()`.

Once you have called :js:meth:`MathJax.typesetClear()`, you can remove
the elements that you passed it or clear their contents and replace
them with other content.  Then call
:js:meth:`MathJax.typesetPromise()` to typeset that new content.

If your input format is LaTeX, then the new content will have access
to any macro definitions or labels that were defined in any previous
content, and automatic equation numbering will continue with the next
number, even if you remove equations with earlier numbers.  In an
editor setting, where the same content is typeset over and over, this
can lead to errors about multiply-defined labels, incorrect application
of macros before they are supposed to be defined, and equation numbers
going up on each re-rendering.

To overcome these problems, you can use the
:js:meth:`MathJax.texReset()` method to remove any previously-defined
labels, and optionally set the automatic equation numbering starting
value.

.. note::

   The :js:meth:`MathJax.texReset()` command corresponds to

   .. code-block:: javascript

      (...args) => {
        const jax = MathJax.startup.document.inputJax.tex;
        jax.reset(...args);
      }
      
   Those not using MathJax Components can use these definitions, where
   ``const jax = ...`` is replaced by your TeX input jax instance.

To reset macro definitions, you can use the
:ref:`tex-begingroup` extension to isolate the definitions used
for one typesetting pass from the following ones.  Its
``\begingroupSandbox`` is one way to do that, which you can process using

.. code-block:: js

   MathJax.tex2mml('\\begingroupSandbox');


These techniques are illustrated in the example in the next section.


.. _dynamic-preview-example:

Editor Preview Example
======================

The following code combines the mechanisms discussed above into an
example that implements a basic editor with a preview that is updated
on every change the the input area.  This example uses the HTML that
the user enters, updates an output area using that, and calls MathJax
to process the expressions it contains.  Of course, in practice, you
would want to sanitize the user input to prevent the user from
entering malicious code, so this is just the bare-bones version meant
to highlight how to handle the MathJax update portion of the editor
tasks.

The details are discussed after the code listing below.

.. code-block:: html
   :linenos:

   <!DOCTYPE html>
   <html>
   <head>
   <title>editor testing</title>
   <style>
   h1 {
     font-size: 133%;
     margin: 1em 0 .5em;
   }
   textarea {
     box-sizing: border-box;
     width: 100%;
     height: 15em;
     padding: 3px 5px;
   }
   #mathOutput {
     border: 1px solid #999;
     padding: 3px 5px;
   }
   </style>
   </head>
   <body>

   <h1>Enter HTML with mathematics here:</h1>
   <textarea id="mathInput" placeholder="Type your math here..."></textarea>

   <h1>Preview:</h1>
   <div id="mathOutput"></div>

   <script>
   (function () {
     //
     //  The input and output areas
     //
     const input = document.getElementById('mathInput');
     const output = document.getElementById('mathOutput');

     let mjRunning = true;           // true when MathJax is running
     let updatePending = false;      // true if an update is needed after MathJax completes

     //
     //  Add a listener that either runs MathJax if it isn't already running,
     //  or records that an update is needed if it already is running.
     //
     document.getElementById('mathInput').addEventListener('input', function() {
       if (mjRunning) {
         updatePending = true;
       } else {
         updatePreview();
       }
     });

     //
     //  Update the preview area and typeset any math it contains
     //
     function updatePreview() {
       //
       //  Record that we are running MathJax and that no additional update 
       //  is needed after that.
       //
       mjRunning = true;
       updatePending = false;
       //
       //  Forget about any old math expressions from the preview
       //
       MathJax.startup.document.clearMathItemsWithin([output]);
       //
       //  Reset any TeX labels or equation numbers
       //  Start a new sandbox for new macro definitions (and remove any old ones)
       //
       MathJax.texReset();
       MathJax.tex2mml('\\begingroupSandbox');
       //
       //  Update the preview HTML and typeset the math
       //
       output.innerHTML = input.value;
       MathJax.typesetPromise()
         .then(() => {
           //
           //  MathJax has completed, so is no longer running
           //  If an update was needed while MathJax was running, update the 
           //    preview again.
           //
           mjRunning = false;
           if (updatePending) updatePreview();
         })
         .catch((err) => console.error('Math typeset failed:', err));
     }

     //
     //  The MathJax configuration
     //
     window.MathJax = {
       loader: {load: ['[tex]/begingroup']},
       tex: {
         packages: {'[+]': ['begingroup']},
         inlineMath: {'[+]': [['$', '$']]},
       },
       startup: {
         pageReady() {
           //
           //  Do the initial typesetting and update the preview if
           //  the textarea already contains content (e.g., on a page reload).
           //
            return MathJax.startup.defaultPageReady().then(() => {
              mjRunning = false;
              if (input.value) updatePreview();
           });
         }
       }
     }; 
   })();
   </script>
   <script defer src="https://cdn.jsdelivr.net/npm/@mathjax@4/tex-chtml.js"></script>
   </body>
   </html>

The ``style`` element at lines 5 through 20 just set the look and size
of the input and output areas and header, which are found at lines 24
through 28.  The script that begins at line 30 defines the code that
runs the editor.  It is placed within a function that is called
immediately after it is defined in order to make the editor's
variables be local to the editor and not pollute the global namespace.

Lines 35 and 36 obtain the input and output elements for easy reference later.

Lines 38 and 39 define variables that are used to control when MathJax
is called to do more typesetting.  You don't want to call
:js:meth:`MathJax.typesetPromise()` on every keystroke, because if the
user is typing quickly, that could cause several typesetting calls to
be made while a typesetting action is already being performed, plus it
is not a good idea to change the DOM that MathJax is actively updating
while it is typesetting.

To avoid this, we use the variable :data:`mjRunning` to specify when
MathJax has been asked to typeset, but that typesetting hasn't
completed yet.  We won't queue any more typeset calls until the active
one has finished.  This is initially set to ``true`` so that no
updates are performed until MathJax is loaded and ready (it is set to
``false`` later).  The :data:`updatePending` variable is used to
specify that an update has been requested while MathJax is still
typesetting, which means that when MathJax finishes typesetting, we
should update again.  That update may include several new characters
that were entered while MathJax was typesetting, but we only update
once, and we only change the DOM when MathJax is idle.

Lines 45 through 51 add an event listener to the ``textarea`` element
that runs when its content changes (due to keystrokes, or copy and
paste, etc.).  If MathJax is currently running, we set the
:data:`updatePending` value so that we don't update now, but do so
when MathJax is finished.  Otherwise, we do the update immediately.

The :meth:`updatePreview()` function at lines 56 through 88 does the
work of updating the preview area and typesetting its mathematics.  It
sets :data:`mjRunning` to ``true`` so that if further changes occur to
the input area, updates will be put off until after MathJax has
typeset the current preview.  We set the :data:`updatePending` value
to ``false`` since we are doing an update, and so we can tell if any
updates are requested while MathJax is running.

Line 66 tells MathJax to forget about any mathematics that was
previously typeset in the preview area.  Without this, MathJax's list
of typeset math would grow with each character typed, as it holds onto
all the previous copies of the math that it had typeset in the past.
This call must come before the DOM is changed, so that MathJax can
tell which math is inside the material being removed.

Line 71 tells MathJax to forget about any `\label` commands that it
has processed in the past and to reset automatic equation numbering to
start at 1 again.  Line 72 tells MathJax to throw away any macro
definitions from the previous preview and start fresh.  (This doesn't
remove any macros defined by auto-loaded extensions or ones loaded
explicitly by `\require`, however).

Line 76 replaces the preview output area with the content of the input
area, and line 77 asks MathJax to typeset any mathematics it contains.
This is a promise-based call, so the typesetting doesn't start
immediately, and the function returns right away.  The ``.then()``
function is performed when the typesetting completes.  It sets the
:data:`mjRunning` variable to ``false`` and checks if any additional
updates were requested while MathJax was typesetting, and if so, it
does another :meth:`updatePreview()` call.  If an error occurred
during typesetting, line 87 traps that and reports the error.

The configuration at lines 93 through 111 tell MathJax to load the
`begingroup` TeX extension (needed for ``\begingroupSandbox``), and
adds that extension to the list of packages that TeX should use.  It
also adds single dollar signs as in-line math delimiters.  Finally, it
sets up a :js:meth:`pageReady()` function that does the normal
page-ready actions, unsets the :data:`mjRunning` variable, and then
checks if the input area has any content (as it will in some browsers
if the page is reloaded, for example), and if so, it updates the
preview to show that initial content.

Line 114 loads MathJax into the page.

|-----|
