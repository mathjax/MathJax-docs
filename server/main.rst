.. _node-main:

##################################
Experimenting with MathJax in Node
##################################

If you want to experiment with MathJax in node, that is not hard to
do using the approach described below.  Note that this approach can
not be used in a browser, but only for server-side or command-line
applications.  If you plan to bundle your MathJax code for use in a
larger browser-based application, you will need to use one of the
other methods described in the :ref:`node-start` section.

First :ref:`get a copy of the MathJax code library <obtain-mathjax>`.
Here, we will assume you have used ``npm`` or ``pnpm`` to install the
``@mathjax/src@4`` package.  You will need to change the ``require()``
or ``import`` statements accordingly in the examples below if you have
loaded ``mathjax@4`` or obtained MathJax from the ``MathJax-src``
GitHub repository.

-----

.. _node-first-program:

Your First MathJax Program
==========================

Create a file named :file:`test-mathjax.mjs` containing the following:

.. code-block:: javascript

   import {init} from "@mathjax/src";
   await init({loader: {load: ['input/tex']}});
   const mml = (await MathJax.tex2mmlPromise('x+y'));
   console.log(mml);

then run this file from the command line using

.. code-block:: shell

   node test-mathjax.mjs

It should produce the output

.. code-block::

   <math xmlns="http://www.w3.org/1998/Math/MathML" data-latex="x+y" display="block">
     <mi data-latex="x">x</mi>
     <mo data-latex="+">+</mo>
     <mi data-latex="y">y</mi>
   </math>

This is you first MathJax node program!

.. note::

   You could perform the same function from a CommonJS file rather
   than an ES6 module by creating :file:`test-mathjax.cjs` containing

   .. code-block:: javascript

      require("@mathjax/src").init({
        loader: {load: ['input/tex']}
      }).then(() => MathJax.tex2mmlPromise('x+y'))
        .then((mml) => console.log(mml));

   then run this file using

   .. code-block:: shell

     node test-mathjax.cjs


The :meth:`init()` function above takes as its argument a MathJax
configuration object just like the ones used to configure MathJax in a
browser.  (See the :ref:`configuring-mathjax` pages for more details.)
It returns a promise that is resolved when MathJax has loaded the
needed components and is ready to process mathematics, at which point
the global :js:data:`MathJax` variable will be set up for use.

In the program above, we use the ``await`` command to wait for that
promise to resolve, and then wait for the
:js:meth:`MathJax.tex2mmlPromise()` call to convert a TeX or LaTeX
expression into the corresponding MathML tree.  The result is then
printed.

Once you have initialized MathJax, you should be able to use MathJax
in much the same way as you would in a browser.  Note, however, that
stand-alone node applications don't have a browser DOM, so don't have
a :js:data:`window` or :js:data:`document` variable.  Because of this,
MathJax in node doesn't produce DOM elements, but rather uses its own
``liteDOM`` replacement for the browser DOM.  See
:ref:`node-DOM-adaptor` section for more details about how you
interact with the ``liteDOM``.

-----

.. _node-main-source:

Loading MathJax from Source
===========================

The examples above load MathJax from the bundled versions in the
``@mathjax/src/bundle`` directory, which are the files that would be
used if you obtained MathJax from a server in a web page viewed by a
browser.  It is possible to use MathJax from the source ``.js`` files
instead, however; for example, if you are making changes to the
MathJax source code and want to check it quickly without having to
repack your whole project.

To do so, use either

.. code-block:: javascript

   import {init} from '@mathjax/src/source';

or

.. code-block:: javascript

   require('@mathjax/src/source').init({...}).then((MathJax) => {
      ... // code that uses MathJax here
   });

when loading MathJax.

|-----|
