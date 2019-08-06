.. _output-components:

#################
Output Components
#################

Currently there are two MathJax output formats, each packaged into
its own component.

* :ref:`chtml-component`
* :ref:`svg-component`

These are described in more detail below.

.. note::

   The `NativeMML` output jax from version 2 has not been ported to
   version 3, and is unlikely to be.  See the :ref:`mathml-output`
   section for details.

-----


.. _chtml-component:

output/chtml
============

The `output/chtml` component includes the CommonHTML output processor.
When loaded, it causes data for handling the MathJax TeX font to be
loaded as well (via a separate component).  Currently, this is the
only font available in version 3 (see the :ref:`font-support` section
for more information).  The `output/chtml/fonts/tex` component holds
the font data.

* See the :ref:`html-output` section for details on the CommonHTML
  output processor.

* See the :ref:`chtml-options` section for information about
  configuring this component.

-----


.. _svg-component:

output/svg
==========

The `output/svg` component includes the SVG output processor.
When loaded, it causes data for handling the MathJax TeX font to be
loaded as well (via a separate component).  Currently, this is the
only font available in version 3 (see the :ref:`font-support` section
for more information).  The `output/svg/fonts/tex` component holds
the font data.

* See the :ref:`svg-output` section for details on the CommonHTML
  output processor.

* See the :ref:`svg-options` section for information about
  configuring this component.

|-----|
