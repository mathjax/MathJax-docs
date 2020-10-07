.. _safe-options:

######################
Safe Extension Options
######################

The `ui/safe` component provides a means of filtering the various
attributes of the mathematics on the page so that certain limitations
on their content is enforced.  This allows you to prevent
``javascript:`` or ``data:`` URLs from appearing in :attr:`href`
attributes, for example, which would otherwise cause potential
security issues.

All mathematics processed by MathJax is converted into an internal
MathML structure, regardless of its initial format in the page.  The
`ui/safe` extension works by walking the internal MathML tree for the
mathematics and checking the attributes of the nodes in the tree to
maker sure they comply with the restrictions you specify.

To load the `ui/safe` extension, add ``'ui/safe'`` to the ``load``
array of the ``loader`` block of your MathJax configuration.

.. code-block:: javascript

   window.MathJax = {
     loader: {load: ['ui/safe']},
   };

The `ui/safe` extension can filter several classes of information:
URLs, class names, css IDs, and css style declarations.  The filtering
for these can each be set to one of three different values: ``'all'``,
``'safe'`` or ``'none'``.  When set to ``'all'`` no filtering is
performed (all values are allowed); when set to ``'none'`` the value
is always cleared (no value can be set for that attribute); and when
set to ``'safe'`` the values are filtered using additional criteria
given in the options, as listed below.

-----


The Configuration Block
=======================

.. code-block:: javascript

    MathJax = {
      options: {
        safeOptions: {
          allow: {
            //
            //  Values can be "all", "safe", or "none"
            //
            URLs:    'safe',   // safe are in safeProtocols below
            classes: 'safe',   // safe start with mjx- (can be set by pattern below)
            cssIDs:  'safe',   // safe start with mjx- (can be set by pattern below)
            styles:  'safe'    // safe are in safeStyles below
          },
          //
          //  Which URL protocols are allowed
          //
          safeProtocols: {
            http: true,
            https: true,
            file: true,
            javascript: false,
            data: false
          },
          //
          //  Which styles are allowed
          //
          safeStyles: {
            color: true,
            backgroundColor: true,
            border: true,
            cursor: true,
            margin: true,
            padding: true,
            textShadow: true,
            fontFamily: true,
            fontSize: true,
            fontStyle: true,
            fontWeight: true,
            opacity: true,
            outline: true
          },
          lengthMax: 3,                           // Largest padding/border/margin, etc. in em's
          scriptsizemultiplierRange: [.6, 1],     // Valid range for scriptsizemultiplier
          scriptlevelRange: [-2, 2],              // Valid range for scriptlevel
          classPattern: /^mjx-[-a-zA-Z0-9_.]+$/,  // Pattern for allowed class names
          idPattern: /^mjx-[-a-zA-Z0-9_.]+$/,     // Pattern for allowed ids
          dataPattern: /^data-mjx-/               // Pattern for data attributes
        }
      }
    };

-----


Option Descriptions
===================

.. _safe-allow:
.. describe:: allow: {...}

   These settings control what level of filtering to perform for each
   of the categories provided.  When set to ``'all'`` no filtering is
   performed (all values are allowed); when set to ``'none'`` the
   value is always cleared (no value can be set for that attribute);
   and when set to ``'safe'`` the values are filtered using additional
   criteria given in the remaining options.

.. _safe-safeProtocols:
.. describe:: safeProtocols: {...}

   This object controls which internet protocols are allowed to be
   used in URLs within the mathematics (in :attr:`href` and
   :attr:`src` attributes).  A protocol whose value is give as
   ``true`` will be allowed, and one given as ``false`` will not be.
   For example, the default is to allow ``http:``, ``https:``, and
   ``file:`` protocols, but not ``javascript:`` or ``data:``
   protocols.  A protocol that is not listed is considered to be
   ``false``.

.. _safe-safeStyles:
.. describe:: safeStyles: {...}

   This object specifies which CSS style properties are allowed to be
   specified in the :attr:`style` attribute of a MathML node.  When
   set to ``true`` that style (and any sub-styles of the style) are
   allowed; when ``false`` or not listed, the style is not allowed to
   be specified.  For example, since :attr:`border` is ``true``, the
   :attr:`style` attribute can include :attr:`border`,
   :attr:`border-top`, :attr:`border-top-width`, and so on.  Some
   style values may be further filtered based on other configuration
   options.

.. _safe-lengthMax:
.. describe:: lengthMax: 3

   This specifies the largest dimension allowed for styles like
   :attr:`padding`, :attr:`border`, :attr:`margin`, etc. These are
   limited in order to prevent users from making borders that are
   gigantic, for example.  The values of these attributes must have
   absolute value less than this value (in ems).
     
.. _safe-scriptsizemultiplierRange:
.. describe:: scriptsizemultiplierRange: [.6, 1]

   This specifies the range of values allowed for the
   :attr:`scriptsizemultiplier` MathML attribute (for ``<math>`` and
   ``<mstyle>`` nodes).  These are filtered to prevent users from
   making super- and subscripts too large (or too small).

.. _safe-scriptlevelRange:
.. describe:: scriptlevelRange: [-2, 2]

   This specifies the range of values allowd for the
   :attr:`scriptlevel` MathML attribute (for ``<math>`` and
   ``<mstyle>`` nodes).  These are filtered to prevent users from
   making text that is too large (via negative :attr:`scriptlevel`) or
   too small (via large :attr:`scriptlevel`).

.. _safe-classPattern:
.. describe:: classPattern: /^mjx-[-a-zA-Z0-9_.]+$/

   This gives a regular expression used to determine if a class name
   is allowed to be specified.  The default is to allow names starting
   with ``mjx-`` and containing letters, numbers, minus, period, and
   underscore.

.. _safe-idPattern:
.. describe:: idPattern: /^mjx-[-a-zA-Z0-9_.]+$/

   This gives a regular expression used to determine what node
   :attr:`id` values are allowed to be specified.  The default is to
   allow ids starting with ``mjx-`` and containing letters, numbers,
   minus, period, and underscore.

.. _safe-dataPattern:
.. describe:: dataPattern: /^data-mjx-/

   This gives a regular expression used to determine what :attr:`data-`
   attribute names are allowed to be specified.  The default is to
   allow :attr:`data-` attributes whose names begin with ``data-mjx-``.

-----


Developer Options
=================

.. code-block:: javascript

    MathJax = {
      options: {
        safeOptions: {
          //
          //  CSS styles that have Top/Right/Bottom/Left versions
          //
          styleParts: {
            border: true,
            padding: true,
            margin: true,
            outline: true
          },
          //
          //  CSS styles that are lengths needing max/min testing
          //    A string value means test that style value;
          //    An array gives [min,max] in em's
          //    Otherwise use [-lengthMax,lengthMax] from above
          //
          styleLengths: {
            borderTop: 'borderTopWidth',
            borderRight: 'borderRightWidth',
            borderBottom: 'borderBottomWidth',
            borderLeft: 'borderLeftWidth',
            paddingTop: true,
            paddingRight: true,
            paddingBottom: true,
            paddingLeft: true,
            marginTop: true,
            marginRight: true,
            marginBottom: true,
            marginLeft: true,
            outlineTop: true,
            outlineRight: true,
            outlineBottom: true,
            outlineLeft: true,
            fontSize: [.707, 1.44]
          }
        }
      }
    };

.. _safe-styleParts:
.. describe:: styleParts: {...}

   This object indicates which safe styles have
   ``Top``/``Right``/``Bottom``/``Left`` versions (so that the
   sub-parts can be properly checked).  If you extend the
   :attr:`safeStyles` to include others that have these four
   sub-properties, be sure to add them here.

.. _safe-styleLengths:
.. describe:: styleLengths: {...}

   This object lists the styles that are lengths that need to be
   tested.  A string value means test that style's value (e.g.,
   :attr:`borderTop` is set to ``'borderTopWidth'``, so the border's
   width is tested).  An array value gives the minimum and maximum
   value (in ems) that the property can have, and ``true`` means use
   ``[-lengthMax, lengthMax]`` using the :attr:`lengthMax` option
   listed above.


|-----|
