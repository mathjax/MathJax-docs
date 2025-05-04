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
above.  These can be specified in the :data:`output` block of your
MathJax configuration (they apply to any output jax), or can be
included in the configuration for the specific output jax that you are
using.  It is best to use the :data:`output` section for these
options, since then if your reader uses the MathJax contextual menu to
switch renderers, they will apply to the new renderer as well.

The options are given here with their default values.

.. code-block:: javascript

    MathJax = {
      output: {
        scale: 1,                      // global scaling factor for all expressions
        minScale: .5,                  // smallest scaling factor to use
        mtextInheritFont: false,       // true to make mtext elements use surrounding font
        merrorInheritFont: false,      // true to make merror text use surrounding font
        mtextFont: '',                 // font to use for mtext, if not inheriting (empty means use MathJax fonts)
        merrorFont: 'serif',           // font to use for merror, if not inheriting (empty means use MathJax fonts)
        unknownFamily: 'serif',        // font to use for character that aren't in MathJax's fonts
        mathmlSpacing: false,          // true for MathML spacing rules, false for TeX rules
        skipAttributes: {},            // RFDa and other attributes NOT to copy to the output
        exFactor: .5,                  // default size of ex in em units
        displayAlign: 'center',        // default for indentalign when set to 'auto'
        displayIndent: '0',            // default for indentshift when set to 'auto'
        displayOverflow: 'overflow',   // default for overflow (scroll/scale/truncate/elide/linebreak/overflow)
        linebreaks: {                  // options for when overflow is linebreak
          inline: true,                // true for browser-based breaking of inline equations
          width: '100%',               // a fixed size or a percentage of the container width
          lineleading: .2,             // the default lineleading in em units
        },
        font: '',                      // the font component to load
        fontPath: FONTPATH,            // The path to the font definitions
        htmlHDW: 'auto',               // 'use', 'force', or 'ignore' data-mjx-hdw attributes
      }
    };

.. note::

   The ``matchFontHeight`` option is no longer available on the SVG
   output processor, so it is no longer listed here.  It is now
   described among the CommonHTML output options.

Other options specific to an output renderer are listed in the
sections linked at the top of this page.

-----


Option Descriptions
===================

.. _output-scale:
.. describe:: scale: 1

   The scaling factor for math compared to the surrounding text.  The
   MathJax output processors try to match the ex-size of the
   mathematics with that of the text where it is placed, so that the
   lower-case letters in the mathematics are the same height as
   lower-case letters in the surrounding text.  Note that this may
   mean that upper-case letters in the mathematics may not match those
   in the surrounding font, as not all fonts have the same height
   ratio between upper- and lower-case letters.  You may want to
   adjust the results using this scaling factor to suit your
   situation.  The user can also adjust this value using the
   contextual menu item associated with the typeset mathematics.

.. _output-minScale:
.. describe:: minScale: .5

   This gives a minimum scale factor for the scaling used by MathJax
   to match the equation to the surrounding text.  This will prevent
   MathJax from making the mathematics too small.

.. _output-mtextInheritFont:
.. describe:: mtextInheritFont: false

   This setting controls whether ``<mtext>`` elements will be typeset
   using the math fonts or the font of the surrounding text.  When
   ``false``, the :ref:`mtextFont <output-mtextFont>` will be used,
   unless it is blank, in which case math fonts will be used, as they
   are for other token elements; when ``true``, the font will be
   inherited from the surrounding text, when possible, depending on
   the ``mathvariant`` for the element (some math variants, such as
   ``fraktur`` can't be inherited from the surroundings).

.. _output-merrorInheritFont:
.. describe:: merrorInheritFont: false

   This setting controls whether the text for ``<merror>`` elements
   will be typeset using the math fonts or the font of the surrounding
   text.  When ``false``, the :ref:`merrorFont <output-merrorFont>`
   will be used; when ``true``, the font will be inherited from the
   surrounding text, when possible, depending on the ``mathvariant``
   for the element (some math variants, such as ``fraktur`` can't be
   inherited from the surroundings).

.. _output-mtextFont:
.. describe:: mtextFont: ''

   This specifies the font family to use for ``<mtext>`` elements when
   :ref:`mtextInheritFont <output-mtextInheritFont>` is ``false`` (and
   is ignored if it is ``true``).  It can be a comma-separated list of
   font-family names.  If it is empty, then the math fonts are used,
   as they are with other token elements.

.. _output-merrorFont:
.. describe:: merrorFont: 'serif'

   This specifies the font family to use for ``<merror>`` elements
   when :ref:`merrorInheritFont <output-merrorInheritFont>` is
   ``false`` (and is ignored if it is ``true``).  It can be a
   comma-separated list of font-family names.  If it is empty, then
   the math fonts are used, as they are with other token elements.

.. _output-unknownFamily:
.. describe:: unknownFamily: 'serif'

   This specifies the font family to use for characters that are not
   found in the MathJax math fonts.  For example, if you enter unicode
   characters directly, these may not be in MathJax's font, and so
   they will be taken from the font or fonts specified here.

.. _output-mathmlSpacing:
.. describe:: mathmlSpacing: false

   This specifies whether to use TeX spacing or MathML spacing rules
   when typesetting the math.  When ``true``, MathML spacing rules are
   used; when ``false``, the TeX rules are used.

.. _output-skipAttributes:
.. describe:: skipAttributes: {}

   This object gives a list of non-standard attributes (e.g., RFDa
   attributes) that will **not** be transferred from MathML element to
   their corresponding DOM elements in the typeset output.  For
   example, with

   .. code-block:: javascript

      skipAttributes: {
        'data-my-attr': true
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

.. _output-displayOverflow:
.. describe:: displayOverflow: 'overflow'

   This specifies how displayed equations that are too wide for their
   containers should be treated.  The possible values are:

   * ``'scroll'`` to use a horizontal scroll bar to allow the rest
     of the equation scroll into view.

   * ``'scale'`` to scale the equation until it fits into its container.

   * ``'truncate'`` to clip the expression at the container size.

   * ``'elide'`` is not yet implemented.

   * ``'linebreak'`` to insert line breaks to keep the expression within
     the container.

   * ``'overflow'``, to allow the expression to overflow the width of
     the container.  This is the default.

   Note that this option sets the :attr:`overflow` attribute of the
   underlying MathML expression, if there isn't one already.

   The user can change this value globally using the MathJax
   contextual menu.


.. _output-linebreaks:
.. describe:: linebreaks: {...}

   This block of options controls the line-breaking that is performed
   when the ``displayOverflow`` is set to ``'linebreak'`` or the user
   selects linebreaking in the MathJax contextual menu.  The options
   include:

   .. _linebreaks-inline:
   .. describe:: inline: true

      When set to true, in-line equations will be allowed to break (at
      locations that TeX would allow for linebreaks).  The browser
      will then break the mathematics when needed, if the expression
      extends beyond the container's width.

   .. _linebreaks-width:
   .. describe:: width: '100%'

      Gives the width for where displayed equations should be broken,
      either as a fixed size (e.g. ``'500px'`` or ``'20em'``), or as a
      percentage of the container's width (e.g., the default value of
      ``'100%'``).

   .. _linebreaks-lineleading:
   .. describe:: lineleading: .2

      The amount of extra vertical space, in em units, to be inserted
      between the lines of a displayed equation when it is broken.

   Note that in-line breaks can change when the window size changes,
   since they are handled by the browser; but displayed equations are
   broken when initially typeset, and the breaks are not altered after
   that unless you explicitly rerender the equation.

   See the :ref:`automatic-linebreaking` section for more details on
   controlling line breaking within expressions.

.. _output-font:
.. describe:: font: ''

   This specifies the font to use from among the fonts available in
   MathJax, either as a name like ``mathjax-stix2`` or as a path to
   the font npm package, like
   ``https://cdn.jsdelivr.net/npm/@mathjax/mathjax-stix2@4`` for
   in-browser use, or ``@mathjax/mathjax-stix2`` for use in node.

   See the :ref:`font-support` section for more details about the
   fonts available and how to use them.

.. _output-fontPath:
.. describe:: fontPath: FONTPATH

   This specifies the path for locating fonts by name.  The default is
   ``https://cdn.jsdelivr.net/npm/@mathjax/%%FONT%%-font`` in the
   MathJax components for the browser, and ``@mathjax/%%FONT%%-font``
   in node applications.  Any occurrences of ``%%FONT%%`` in the path
   will be replaced by the font name when the font is accessed.

.. _output-htmlHDW:
.. describe:: htmlHDW: 'auto'

   This controls how MathJax handles the size of HTML code embedded in
   your mathematics when its top-level element has an
   :attr:`data-mjx-hdw` attribute that gives the size of the content.
   The possible values are:

   * ``'ignore'`` to ignore the value of :attr:`data-mjs-hdw`.

   * ``'force'`` to use the :attr:`data-mjx-hdw` values to surround
     the HTML with additional nodes that force the HTML to have the
     given dimensions.  (This makes the result in node and the browser
     always be the same.)

   * ``'use'`` to assume the :attr:`data-mjx-hdw` values are correct
     so that MathJax will use them in its size computations without
     forcing the HTML to have the given dimensions.

   * ``'auto'`` to allow MathJax to determine which option to use;
     this will be ``ignore`` when in the browser and ``force`` when in
     node applications.

   See :ref:`specifying-htmlHDW` for more information, and for a tool
   for computing the values to use for the :attr:`data-mjx-hdw`
   attributes.

-----

Developer Options
=================

In addition to the options listed above, low-level options intended
for developers include the following:

.. _output-wrapperFactory:
.. describe:: wrapperFactory: null

   The ``WrapperFactory`` object instance to use for creating wrappers
   for the internal MathML objects.  This allows you to create a
   subclass of the ``WrapperFactory`` class, make an instance of it,
   and pass and instance of that to the output jax to use in place of
   the usual one.  A ``null`` value means use the default
   ``WrapperFactory`` class and make a new instance of that.
   
.. _output-fontData:
.. describe:: fontData: null

   The ``FontData`` object instance to use for the font to use.  This
   is usually obtained from a font package, such as
   :data:`MathJaxNewcmFont` imported from
   ``@mathjax/mathjax-newcm-font/js/chtml.js``.  This allows you to
   override the default font with a different one.  It is also
   possible to subclass one of the MathJax fonts, make an instance of
   that, and pass that to the output jax to use in place of its usual
   one.  A ``null`` value means use the default ``FontData`` class
   (the ``mathjax-newcm`` font) and make a new instance of that.
  
   
.. _output-cssStyles:
.. describe:: cssStyles: null

   The ``CssStyles`` object instance to use for collecting the CSS
   styles from the various MathML classes, the font, and so on.  This
   allows you to create a subclass of the ``CssStyles`` class, make an
   instance of it, and pass that to the output jax in place of the
   usual one.  A ``null`` value means use the default ``CssStyles``
   class and make a new instance of that.

.. _output-linebreaks.LinebreakVisitor:
.. describe:: linebreaks.LinebreakVisitor: null

   The ``LinebreakVisitor`` object class to use for breaking long
   displayed equations.  This allows you to create a subclass of the
   ``LinebreakVisitor`` class and pass that to the output jax in place
   of the usual one.  MathJax will make an instance of the class you
   pass it, or of its default class if this value is ``null``.

|-----|
