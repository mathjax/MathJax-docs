.. _svg-options:

############################
SVG Output Processor Options
############################

The options below control the operation of the :ref:`SVG output
processor <svg-output>` that is run when you include ``'output/svg'``
in the :data:`load` array of the :data:`loader` block of your MathJax
configuration, or if you load a combined component that includes the
CommonHTML output jax.  They are listed with their default values.  To
set any of these options, include an :data:`svg` section in your
:data:`MathJax` global object.

In addition to the options listed below, you can also include any of
the options from the :data:`output` block listed in the
:ref:`output-options` section.

-----

The Configuration Block
=======================

.. code-block:: javascript

    MathJax = {
      svg: {
        blacker: 3,           // the stroke-width to use for SVG character paths
        fontCache: 'local',   // or 'global' or 'none'
        useXlink: true,       // true to include xlink namespace for <use> hrefs, false to not
      }
    };

.. note::

   The :data:`internalSpeechTitles` attriibute from v3 has been removed in v4.

-----


Option Descriptions
===================

.. _svg-blacker:
.. describe:: blacker: 3

   This specifies the stroke-width to use for SVG character paths in
   units that are 1/1000 of an em.  Enlarging this makes the
   characters a bit bolder, but can also cause them to render poorly,
   as some details may begin to overlap and become unreadable.  You
   probably don't want to go above 20 or so.

.. _svg-fontCache:
.. describe:: fontCache: 'local'

   This setting determines how the SVG output jax manages characters
   that appear multiple times in an equation or on a page.  The SVG
   processor uses SVG paths to display the characters in your math
   expressions, and when a character is used more than once, it is
   possible to reuse the same path description; this can save space in
   the SVG image, as the paths can be quite complex.  When set to
   ``'local'``, MathJax will cache font paths on an express-by-expression
   (each expression has its own cache within the SVG image itself),
   which makes the SVG self-contained, but still allows for some
   savings if characters are repeated.  When set to ``'global'``, a
   single cache is used for all paths on the page; this gives the most
   savings, but makes the images dependent on other elements of the
   page.  When set to ``'none'``, no caching is done and explicit paths
   are used for every character in the expression.

.. _svg-useXlink:
.. describe:: useXlink: true

   When a font cache is used, MathJax employs ``<use>`` tags to access
   the character path definitions.  Traditionally, the :attr:`href`
   attributes that reference the path IDs are required to be in the
   ``xlink`` namespace, and so appear as :attr:`xlink:href`.  HTML5
   has deprecated namespaces, so in HTML pages, they should appear as
   plain :attr:`href` attributes instead.  The ``useXlink`` attribute
   determines whether the ``xlink`` namespace should be included in
   the :attr:`href` attributes or not.


The remaining options are described in the
:ref:`output-common-options` section.

-----

Developer Options
=================

In addition to the options listed above, low-level options intended
for developers include the following:

.. _svg-localID:
.. describe:: localID: null

   This gives the ID prefix to use for the paths stored in a local
   font cache when :attr:`fontCache` is set to ``'local'``.  This is
   useful if you need to process multiple equations by hand and want
   to generate unique ids for each equation, even if MathJax is
   restarted between equations.  If set to ``null``, no prefix is
   used.


|-----|
