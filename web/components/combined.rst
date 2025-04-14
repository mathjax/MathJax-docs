.. _combined-components:

###################
Combined Components
###################

Currently there are twelve combined components, whose contents are
described below:

* :ref:`tex-chtml-component`
* :ref:`tex-svg-component`
* :ref:`tex-mml-chtml-component`
* :ref:`tex-mml-svg-component`
* :ref:`mml-chtml-component`
* :ref:`mml-svg-component`

..

* :ref:`tex-chtml-nofont-component`
* :ref:`tex-svg-nofont-component`
* :ref:`tex-mml-chtml-nofont-component`
* :ref:`tex-mml-svg-nofont-component`
* :ref:`mml-chtml-nofont-component`
* :ref:`mml-svg-nofont-component`

The combined components include everything needed to run MathJax in
your web pages (though some TeX extensions and additional font data
may be loaded dynamically as needed).  Each includes at least one
input processor, an output processor, the basic data needed for the
mathjax-newcm font, the contextual menu code, the assistive tools, and
the :ref:`startup-component` component.

Unlike the other components, these combined components should be
loaded directly via a ``<script>`` tag, not through the
:js:data:`load` array in your MathJax configuration.  So a typical use
would be

.. code-block:: html

   <script>
   MathJax = {
     // your configuration here, if needed
   };
   </script>
   <script defer src="https://cdn.jsdelivr.net/npm/mathjax@4/tex-chtml.js"></script>

to load the `tex-chtml` component, for example.

.. warning::

   Version 3 used ``/es5`` just before the component name in the URL
   for obtaining the MathJax.  This is no longer the case for
   version 4.

-----


.. _tex-chtml-component:

tex-chtml
=========

The `tex-chtml` component includes the :ref:`input/tex <tex-component>`
component and the :ref:`output/chtml <chtml-component>` component
configured to use the ``mathjax-newcm`` font, along with the
contextual menu component, the assistive tools, and the startup
component.

The `input/tex` component includes the :ref:`tex-ams`, :ref:`tex-newcommand`,
:ref:`tex-require`, :ref:`tex-autoload`, :ref:`tex-configmacros`, and
:ref:`tex-noundefined` extensions, which means that most other extensions
will be loaded automatically when needed, or you can use the
``\require`` macro to load them explicitly.

-----


.. _tex-svg-component:

tex-svg
=======

The `tex-svg` component includes the :ref:`input/tex <tex-component>`
component and the :ref:`output/svg <svg-component>` component
configured to use the ``mathjax-newcm`` font, along with the
contextual menu component, the assistive tools, and the startup
component.

The `input/tex` component includes the :ref:`tex-ams`, :ref:`tex-newcommand`,
:ref:`tex-require`, :ref:`tex-autoload`, :ref:`tex-configmacros`, and
:ref:`tex-noundefined` extensions, which means that most other extensions
will be loaded automatically when needed, or you can use the
``\require`` macro to load them explicitly.

-----


.. _tex-mml-chtml-component:

tex-mml-chtml
=============

The `tex-mml-chtml` component includes the :ref:`input/tex
<tex-component>` and :ref:`mathml-component` components and the
:ref:`output/chtml <chtml-component>` component configured to use the
``mathjax-newcm`` font, along with the contextual menu component, the
assistive tools, and the startup component.

The `input/tex` component includes the :ref:`tex-ams`, :ref:`tex-newcommand`,
:ref:`tex-require`, :ref:`tex-autoload`, :ref:`tex-configmacros`, and
:ref:`tex-noundefined` extensions, which means that most other extensions
will be loaded automatically when needed, or you can use the
``\require`` macro to load them explicitly.

-----


.. _tex-mml-svg-component:

tex-mml-svg
===========

The `tex-mml-svg` component includes the :ref:`input/tex <tex-component>`
and :ref:`mathml-component` components and the :ref:`output/svg
<svg-component>` component configured to use the ``mathjax-newcm``
font, along with the contextual menu component, the assistive tools,
and the startup component.

The `input/tex` component includes the :ref:`tex-ams`, :ref:`tex-newcommand`,
:ref:`tex-require`, :ref:`tex-autoload`, :ref:`tex-configmacros`, and
:ref:`tex-noundefined` extensions, which means that most other extensions
will be loaded automatically when needed, or you can use the
``\require`` macro to load them explicitly.

-----


.. _mml-chtml-component:

mml-chtml
=========

The `mml-chtml` component includes the :ref:`mathml-component` component
and the :ref:`output/chtml <chtml-component>` component configured to
use the ``mathjax-newcm`` font, along with the contextual menu
component, the assistive tools, and the startup component.

-----


.. _mml-svg-component:

mml-svg
=======

The `mml-svg` component includes the :ref:`mathml-component` component
and the :ref:`output/svg <svg-component>` component configured to use the
``mathjax-newcm`` font, along with the contextual menu component, the
assistive tools, and the startup component.

-----

.. _tex-chtml-nofont-component:

tex-chtml-nofont
================

The `tex-chtml-nofont` component is the same as the `tex-chtml`
component, but configured without a font, with the expectation that
your configuration will specify the font explicitly.  This reduces the
size of the initial download when the ``mathjax-newcm`` font is going
to be replaced by one of the other fonts.

-----


.. _tex-svg-nofont-component:

tex-svg-nofont
==============

The `tex-svg` component is the same as the `tex-svg` component, but
configured without a font, with the expectation that your
configuration will specify the font explicitly.  This reduces the size
of the initial download when the ``mathjax-newcm`` font is going to be
replaced by one of the other fonts.

-----


.. _tex-mml-chtml-nofont-component:

tex-mml-chtml-nofont
====================

The `tex-mml-chtml` component is the same as the `tex-mml-chtml`
component, but configured without a font, with the expectation that
your configuration will specify the font explicitly.  This reduces the
size of the initial download when the ``mathjax-newcm`` font is going
to be replaced by one of the other fonts.

-----


.. _tex-mml-svg-nofont-component:

tex-mml-svg-nofont
==================

The `tex-mml-svg` component is the same as the `tex-mml-svg`
component, but configured without a font, with the expectation that
your configuration will specify the font explicitly.  This reduces the
size of the initial download when the ``mathjax-newcm`` font is going
to be replaced by one of the other fonts.

-----


.. _mml-chtml-nofont-component:

mml-chtml-nofont
================

The `mml-chtml` component is the same as the `mml-chtml` component,
but configured without a font, with the expectation that your
configuration will specify the font explicitly.  This reduces the size
of the initial download when the ``mathjax-newcm`` font is going to be
replaced by one of the other fonts.

-----


.. _mml-svg-nofont-component:

mml-svg-nofont
==============

The `mml-svg` component is the same as the `mml-svg` component, but
configured without a font, with the expectation that your
configuration will specify the font explicitly.  This reduces the size
of the initial download when the ``mathjax-newcm`` font is going to be
replaced by one of the other fonts.

|-----|
