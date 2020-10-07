.. _misc-components:

########################
Miscellaneous Components
########################

There are several miscellaneous components that don't fit into other
categories.  These are:

* :ref:`startup-component`
* :ref:`safe-component`
* :ref:`menu-component`
* :ref:`litedom-component`
* :ref:`core-component`
* :ref:`loader-component`

They are described in more detail below.

----


.. _startup-component:

startup
=======

The `startup` component is the one that you would use if you are not
using a :ref:`combined component <combined-components>`, but are using
the ``load`` array to specify the components you want to load.  Like a
combined component, you would load this directly via a `<script>` tag,
as in

.. code-block:: html

   <script type="text/javascript" id="MathJax-script" async
     src="https://cdn.jsdelivr.net/npm/mathjax@3/es5/startup.js">
   </script>

This is the component that manages the global :data:`MathJax` object.
It is responsible for creating the needed objects (like the input and
output jax), and for adding the typesetting and conversion methods
described in the :ref:`web-typeset` section.

See the :ref:`startup-options` section for information about
configuring this component.

-----


.. _safe-component:

ui/safe
=======

The `ui/safe` component is intended for use in situations where your
readers will be allowed to enter mathematical notation into your pages
themselves, such as a question-and-answer site, or a blog with user
comments.  It filters the mathematics on the page to make sure that
certain values within the mathematics are not misused by the reader to
cause problems on your page.  For example, the ``\href`` macro
normally could be used to insert ``javascript:`` URLs into the page;
the `ui/safe` extension can be used to prevent that.

See the :ref:`safe-options` section for more information on what is
filtered and how to control the level of filtering being performed.
See :ref:`safe-typesetting` for additional details.

-----


.. _menu-component:

ui/menu
=======

The `ui/menu` component implements the MathJax contextual menu, which
allows you to obtain the MathML or original format of the mathematics,
change parameters about the output renderer, enable accessibility
features, and so on.

See the :ref:`menu-options` section for information about
configuring this component.

-----


.. _litedom-component:

adaptors/liteDOM
================

The `adaptors/liteDOM` component implements an alternative to the
browser DOM that can be used to parse HTML pages outside of a
browser.  This can be used in Node applications that don't have access
to a browser DOM, or in webworkers that can't access the document DOM.

-----


.. _core-component:

core
====

The `core` component includes the code that is required for all other
components, including the base classes for input and output jax, math
documents, math items within those documents, DOM adaptors, and so
on.  This component is loaded automatically when needed, so you don't
usually have to load it yourself.  But you can include it if you are
creating your own combined component.

-----


.. _loader-component:

loader
======

The `loader` component contains the code needed to load other
components.  It is included automatically by the
:ref:`startup-component` component, but if you don't want the features
created by the `startup` module, you can use the `loader` component
instead to load the MathJax component you need.  You can even use it
as a general loader for other javascript, if you want.

See the :ref:`loader-options` section for information about
configuring this component.

|-----|
