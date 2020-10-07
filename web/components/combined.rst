.. _combined-components:

###################
Combined Components
###################

Currently there are eight combined components, whose contents are
described below:

* :ref:`tex-chtml-component`
* :ref:`tex-chtml-full-component`
* :ref:`tex-svg-component`
* :ref:`tex-svg-full-component`
* :ref:`tex-mml-chtml-component`
* :ref:`tex-mml-svg-component`
* :ref:`mml-chtml-component`
* :ref:`mml-svg-component`

The combined components include everything needed to run MathJax in
your web pages.  Each includes at least one input processor, an output
processor, the data needed for the MathJax TeX font, the contextual
menu code, and the :ref:`startup-component` component.

Unlike the other components, these combined components should be
loaded directly via a `<script>` tag, not through the ``load`` array
in your MathJax configuration.  So a typical use would be

.. code-block:: html

   <script>
   MathJax = {
     // your configuration here, if needed
   };
   </script>
   <script type="text/javascript" id="MathJax-script" async
     src="https://cdn.jsdelivr.net/npm/mathjax@3/es5/tex-chtml.js">
   </script>

to load the `tex-chtml` component, for example.

-----


.. _tex-chtml-component:

tex-chtml
=========

The `tex-chtml` component loads the :ref:`input/tex <tex-component>`
component and the :ref:`output/chtml <chtml-component>`, along with
the contextual menu component, and the startup component.

The `input/tex` component loads the :ref:`tex-ams`, :ref:`tex-newcommand`,
:ref:`tex-require`, :ref:`tex-autoload`, :ref:`tex-configmacros`, and
:ref:`tex-noundefined` extensions, which that means most other extensions
will be loaded automatically when needed, or you can use the
``\require`` macro to load them explicitly.

-----


.. _tex-chtml-full-component:

tex-chtml-full
==============

The `tex-chtml-full` component loads the :ref:`input/tex-full
<tex-component>` component and the :ref:`output/chtml
<chtml-component>`, along with the contextual menu component, and the
startup component.

The `input/tex-full` component loads the the code for all the TeX
extensions, and configures TeX to use all but the :ref:`tex-physics`
and :ref:`tex-colorv2` extensions.

-----


.. _tex-svg-component:

tex-svg
=======

The `tex-svg` component loads the :ref:`input/tex <tex-component>`
component and the :ref:`output/svg <svg-component>`, along with
the contextual menu component, and the startup component.

The `input/tex` component loads the :ref:`tex-ams`, :ref:`tex-newcommand`,
:ref:`tex-require`, :ref:`tex-autoload`, :ref:`tex-configmacros`, and
:ref:`tex-noundefined` extensions, which that means most other extensions
will be loaded automatically when needed, or you can use the
``\require`` macro to load them explicitly.

-----


.. _tex-svg-full-component:

tex-svg-full
============

The `tex-svg-full` component loads the :ref:`input/tex-full
<tex-component>` component and the :ref:`output/svg <svg-component>`,
along with the contextual menu component, and the startup component.

The `input/tex-full` component loads the the code for all the TeX
extensions, and configures TeX to use all but the :ref:`tex-physics`
and :ref:`tex-colorv2` extensions.

-----


.. _tex-mml-chtml-component:

tex-mml-chtml
=============

The `tex-mml-chtml` component loads the :ref:`input/tex
<tex-component>` and :ref:`mathml-component` components and the
:ref:`output/chtml <chtml-component>`, along with the contextual menu
component, and the startup component.

The `input/tex` component loads the :ref:`tex-ams`, :ref:`tex-newcommand`,
:ref:`tex-require`, :ref:`tex-autoload`, :ref:`tex-configmacros`, and
:ref:`tex-noundefined` extensions, which that means most other extensions
will be loaded automatically when needed, or you can use the
``\require`` macro to load them explicitly.

-----


.. _tex-mml-svg-component:

tex-mml-svg
===========

The `tex-mml-svg` component loads the :ref:`input/tex
<tex-component>` and :ref:`mathml-component` components and the
:ref:`output/svg <svg-component>`, along with the contextual menu
component, and the startup component.

The `input/tex` component loads the :ref:`tex-ams`, :ref:`tex-newcommand`,
:ref:`tex-require`, :ref:`tex-autoload`, :ref:`tex-configmacros`, and
:ref:`tex-noundefined` extensions, which that means most other extensions
will be loaded automatically when needed, or you can use the
``\require`` macro to load them explicitly.

-----


.. _mml-chtml-component:

mml-chtml
=========

The `mml-chtml` component loads the :ref:`mathml-component` component
and the :ref:`output/chtml <chtml-component>`, along with the
contextual menu component, and the startup component.

-----


.. _mml-svg-component:

mml-svg
=======

The `mml-svg` component loads the :ref:`mathml-component` component
and the :ref:`output/svg <svg-component>`, along with the
contextual menu component, and the startup component.

|-----|
