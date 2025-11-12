.. _output-formats:

######################
MathJax Output Formats
######################

Currently, MathJax can render math in three ways:

- Using HTML and CSS to lay out the mathematics,
- Using Scalable Vector Graphics (SVG) to lay out the mathematics, or
- As a serialized MathML string.

The first two are implemented by the ``CommonHTML`` and ``SVG`` output
processors.  The third is a consequence of the fact that MathJax uses
MathML as its internal format.  While MathJax version 2 included a
``NativeMML`` output processor that produced MathML notation for those
browsers that support it, this has been dropped from version 3 and
above.  See the :ref:`mathml-output` section for more information on
how to get MathML output.

If you are using one of the combined component files, then this will
select one of these output processors for you.  If the component file
ends in ``-chtml``, then it is the CommonHTML output processor, while
if it ends in ``-svg`` then the SVG output processor will be used.

If you are not using a combined component but instead are performing
your own in-line or file-based configuration, you select which
renderer you want to use by including either ``'output/chtml'`` or
``'output/svg'`` in the :data:`load` array of the :data:`loader`
section of your MathJax configuration.  For example

.. code-block:: javascript

   window.MathJax = {
     loader: {load: ["input/tex", "output/chtml"]}
   };

would specify TeX input and CommonHTML output for the mathematics
in your document.

.. warning::

   The ``PreviewHTML``, ``PlainSource``, and ``NativeMML`` output
   formats from version 2 are not available in version 3 and above.
   These may be available in future releases if there is demand for
   them.  For now, the plain source can be shown by entering

   .. code-block:: javascript

      MathJax.startup.document.state(0, true);

   in the browser's developer console.

-----

.. toctree::
   :caption: More Information
   :maxdepth: 1

   html
   svg
   mathml

|-----|
