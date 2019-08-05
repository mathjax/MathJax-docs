.. _output-options:

########################
Output Processor Options
########################

There are a number of configuration options that are common to all the
output processors.  These are described following the links below,
which give the options that are specific to the particular output jax.

.. toctree::
    :maxdepth: 1

    chtml
    svg

-----

.. _output-common-options:

Options Common to All Output Processors
=======================================

The following options are common to all the output processors listed
above.  They are given here with their default values, using the
``chtml`` block as an example.

.. code-block:: javascript

    MathJax = {
      chtml: {
        scale: 1,                      // global scaling factor for all expressions
        minScale: .5,                  // smallest scaling factor to use
        matchFontHeight: true,         // true to match ex-height of surrounding font
        mtextInheritFont: false,       // true to make mtext elements use surrounding font
        merrorInheritFont: true,       // true to make merror text use surrounding font
        mathmlSpacing: false,          // true for MathML spacing rules, false for TeX rules
        skipAttributes: {},            // RFDa and other attributes NOT to copy to the output
        exFactor: .5,                  // default size of ex in em units
        displayAlign: 'center',        // default for indentalign when set to 'auto'
        displayIndent: '0'             // default for indentshift when set to 'auto'
      }
    };

-----


Option Descriptions
===================

.. _output-scale:
.. describe:: scale: 1

   The scaling factor for math comparied to the surrounding text.  The
   `CommonHTML` output processor tries to match the ex-size of the
   mathematics with that of the text where it is placed, but you may
   want to adjust the results using this scaling factor.  The user can
   also adjust this value using the contextual menu item associated
   with the typeset mathematics.

.. _output-minScale:
.. describe:: minScale: .5

   This gives a minimum scale factor for the scaling used by MathJax
   to match the equation to the surrounding text.  This will prevent
   MathJax from making the mathematics too small.

.. _output-matchFontHeight:
.. describe:: matchFontHeight: true

   This setting controls whether MathJax will scale the mathematics so
   that the ex-height of the math fonts matches the ex-height of the
   surrounding fonts.  This makes the math match the surroundings
   better, but if the surrounding font doesn't have its ex-height set
   properly (and not all fonts do), it can cause the math to *not*
   match the surrounding text.  While this will make the lower-case
   letters match the surrounding fonts, the upper case letters may not
   match (that would require the font height and ex-height to have the
   same ratio in the surrounding text as in the math fonts, which is
   unlikely).

.. _output-mtextInheritFont:
.. describe:: mtextInheritFont: false

   This setting controls whether ``<mtext>`` elements will be typeset
   using the math fonts or the font of the surrounding text.  When
   ``false``, the math fonts will be used, as they are for other token
   elements; when ``true``, the font will be inherited from the
   surrounding text, when possible, depending on the ``mathvariant``
   for the element (some math variants, such as ``fraktur`` can't be
   inherited from the surroundings).

.. _output-merrorInheritFont:
.. describe:: merrorInheritFont: false

   This setting controls whether the text for ``<merror>`` elements
   will be typeset using the math fonts or the font of the surrounding
   text.  When ``false``, the math fonts will be used, as they are for
   other token elements; when ``true``, the font will be inherited
   from the surrounding text, when possible, depending on the
   ``mathvariant`` for the element (some math variants, such as
   ``fraktur`` can't be inherited from the surroundings).

.. _output-mathmlSpacing:
.. describe:: mathmlSpacing: false

   This specifies whether to use TeX specing or MathML spacing when
   typesetting the math.  When ``true``, MathML spacing rules are
   used; when ``false``, the TeX rules are used.

.. _output-skipAttributes:
.. describe:: skipAttributes: {}

   This object gives a list of non-standard attributes (e.g., RFDa
   attributes) that will **not** be transfered from MathML element to
   their corresponding DOM elements in the typeset output.  For
   example, with

   .. code-block:: javascript

      skipAttributes: {
          data-my-attr: true
      }

   a MathML element like ``<mi data-my-attr="some data">x</mi>`` will
   not have the ``data-my-attr`` attribute on the ``<mjx-mi>`` element
   created by the CommonHTML output processor to represent the
   ``<mi>`` element (normally, any non-standard attributes are
   retained in the output).

.. _output-exFactor:
.. describe:: exFactor: .5

   This is the size of an ex in comparison to 1 em that is to be used
   when the ex-size can't be determined (e.g., when running in a Node
   application, where the size of DOM elements can't be determined).

.. _output-displayAlign:
.. describe:: displayAlign: 'center'

   This determines how displayed equations will be aligned (left,
   center, or right).  The default is ``'center'``.

.. _output-displayIndent:
.. describe:: displayIndent: 0

   This gives the amount of indentation that should be used for
   displayed equations.  The default is ``0``.  A value of ``'1em'``,
   for example, would introduce an extra 1 em of space from whichever
   margin the equation is aligned to, or an offset from the center
   position if the expression is centered.  Note that negative values
   are allowed.

-----

Developer Options
=================

In addition to the options listed above, low-level options intended
for developers include the following:

.. _output-wrapperFactory:
.. describe:: wrapperFactory: null

   The ``WrapperFactory`` object instance to use for creating wrappers
   for the internal MathML objects.  This allows you to create a
   subclass of ``WrapperFactory`` and pass that to the output jax.
   A ``null`` value means use the default ``WrapperFactory`` class and
   make a new instance of that.
   
.. _output-font:
.. describe:: font: null

   The ``FontData`` object instance to use for creating wrappers
   for the internal MathML objects.  This allows you to create a
   subclass of ``FontData`` and pass that to the output jax.
   A ``null`` value means use the default ``FontData`` class and
   make a new instance of that.
  
   
.. _output-cssStyles:
.. describe:: cssStyles: null

   The ``CssStyles`` object instance to use for creating wrappers
   for the internal MathML objects.  This allows you to create a
   subclass of ``CssStyles`` and pass that to the output jax.
   A ``null`` value means use the default ``CssStyles`` class and
   make a new instance of that.
   
-----

.. raw:: html

   <span></span>
