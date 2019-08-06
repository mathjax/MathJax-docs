.. _tex-options:

###########################
TeX Input Processor Options
###########################

The options below control the operation of the :ref:`TeX input
processor <tex-input>` that is run when you include ``'input/tex'``,
``'input/tex-full'``, or ``'input/tex-base'`` in the ``load`` array of
the ``loader`` block of your MathJax configuration, or if you load a
combined component that includes the TeX input jax.  They are listed
with their default values.  To set any of these options, include a
``tex`` section in your :data:`MathJax` global object.

-----

The Configuration Block
=======================

.. code-block:: javascript

    MathJax = {
      tex: {
        packages: ['base'],        // extensions to use
        inlineMath: [              // start/end delimiter pairs for in-line math
          ['\\(', '\\)']
        ],
        displayMath: [             // start/end delimiter pairs for display math
          ['$$', '$$'],
          ['\\[', '\\]']
        ],
        processEscapes: true,      // use \$ to produce a literal dollar sign
        processEnvironments: true, // process \begin{xxx}...\end{xxx} outside math mode
        processRefs: true,         // process \ref{...} outside of math mode
        skipTags: [                //  HTML tags that won't be searched for math
            'script', 'noscript', 'style', 'textarea', 'pre',
            'code', 'annotation', 'annotation-xml'
        ],
        includeTags: {             //  HTML tags that can appear within math
            br: '\n', wbr: '', '#comment': ''
        },
        ignoreClass: 'tex2jax_ignore',    //  class that marks tags not to search
        processClass: 'tex2jax_process',  //  class that marks tags that should be searched
        digits: /^(?:[0-9]+(?:\{,\}[0-9]{3})*(?:\.[0-9]*)?|\.[0-9]+)/,
                                   // pattern for recognizing numbers
        tags: 'none',              // or 'AMS' or 'all'
        TagSide: 'right',          // side for \tag macros
        TagIndent: '0.8em',        // amount to indent tags
        useLabelIds: true,         // use label name rather than tag for ids
        MultLineWidth: '85%',      // width of multline environment
        maxMacros: 1000,           // maximum number of macro substititions per expression
        maxBuffer: 5 * 1024,       // maximum size for the internal TeX string (5K)
        baseURL:                   // URL for use with links to tags (when there is a <base> tag in effect)
           (document.getElementsByTagName('base').length === 0) ?
            '' : String(document.location).replace(/#.*$/, ''))
      }
    };

Note that some extensions make additional options available.  See the
:ref:`tex-extension-options` section below for details.

-----


Option Descriptions
===================

.. _tex-packages:
.. describe:: packages: ['base']

   This array lists the names of the packages that should be
   initialized by the TeX input processor.  The :ref:`input/tex
   <tex-input>` and :ref:`input/tex-full <tex-input>` components
   automatically add to this list the packages that they load.  If you
   explicitly load addition tex extensions, you should add them to
   this list.  For example:

   .. code-block:: javascript

      MathJax = {
        loader: {load: ['[tex]/enclose']},
        tex: {
          packages: {'[+]': ['enclose']}
        }
      };

.. _tex-inlineMath:
.. describe:: inlineMath: [['\\\(','\\\)']]

    This is an array of pairs of strings that are to be used as
    in-line math delimiters.  The first in each pair is the initial
    delimiter and the second is the terminal delimiter.  You can have
    as many pairs as you want.  For example,

    .. code-block:: javascript

        inlineMath: [ ['$','$'], ['\\(','\\)'] ]

    would cause MathJax to look for ``$...$`` and ``\(...\)`` as
    delimiters for in-line mathematics.  (Note that the single dollar
    signs are not enabled by default because they are used too
    frequently in normal text, so if you want to use them for math
    delimiters, you must specify them explicitly.)

    Note that the delimiters can't look like HTML tags (i.e., can't
    include the less-than sign), as these would be turned into tags by
    the browser before MathJax has the chance to run.  You can only
    include text, not tags, as your math delimiters.

.. _tex-displayMath:
.. describe:: displayMath: [ ['$$','$$'], ['\\\[','\\\]'] ]

    This is an array of pairs of strings that are to be used as
    delimiters for displayed equations.  The first in each pair is the
    initial delimiter and the second is the terminal delimiter.  You
    can have as many pairs as you want.

    Note that the delimiters can't look like HTML tags (i.e., can't
    include the less-than sign), as these would be turned into tags by
    the browser before MathJax has the chance to run.  You can only
    include text, not tags, as your math delimiters.

.. _tex-processEscapes:
.. describe:: processEscapes: false

    When set to ``true``, you may use ``\$`` to represent a literal
    dollar sign, rather than using it as a math delimiter.  When
    ``false``, ``\$`` will not be altered, and its dollar sign may be
    considered part of a math delimiter.  Typically this is set to
    ``true`` if you enable the ``$ ... $`` in-line delimiters, so you
    can type ``\$`` and MathJax will convert it to a regular dollar
    sign in the rendered document.

.. _tex-processRefs:
.. describe:: processRefs: true

    When set to ``true``, MathJax will process ``\ref{...}`` outside 
    of math mode.

.. _tex-processEnvironments:
.. describe:: processEnvironments: true

    When ``true``, `tex2jax` looks not only for the in-line and
    display math delimiters, but also for LaTeX environments 
    (``\begin{something}...\end{something}``) and marks them for
    processing by MathJax.  When ``false``, LaTeX environments will
    not be processed outside of math mode.


.. _tex-digits:
.. describe:: digits: /^(?:[0-9]+(?:\{,\}[0-9]{3})*(?:\.[0-9]*)?|\.[0-9]+)/

   This gives a regular expression that is used to identify numbers
   during the parsing of your TeX expressions.  By default, the
   decimal point is ``.`` and you can use ``{,}`` between every three
   digits before that.  If you want to use ``{,}`` as the decimal
   indicator, use

   .. code-block:: javascript

      MathJax = {
        tex: {
          digits: /^(?:[0-9]+(?:\{,\}[0-9]*)?|\{,\}[0-9]+)/
        }
      };

.. _tex-tags:
.. describe:: tags: 'none'

   This controls whether equations are numbered and how.  By default
   it is set to ``'none'`` to be compatible with earlier versions of
   MathJax where auto-numbering was not performed (so pages will not
   change their appearance).  You can change this to ``'AMS'`` for
   equations numbered as the `AMSmath` package would do, or ``'all'``
   to get an equation number for every displayed equation.

.. _tex-TagSide:
.. describe:: TagSide: 'right'

    This specifies the side on which ``\tag{}`` macros will place the
    tags, and on which automatic equation numbers will appear.  Set it
    to ``'left'`` to place the tags on the left-hand side.

.. _tex-TagIndent:
.. describe:: TagIndent: "0.8em"

    This is the amount of indentation (from the right or left) for the
    tags produced by the ``\tag{}`` macro or by automatic equation
    numbers.

.. _tex-useLabelIds:
.. describe:: useLabelIds: true

   This controls whether element IDs for tags use the ``\label`` name
   or the equation number.  When ``true``, use the label, when
   ``false``, use the equation number.

.. _tex-MultLineWidth:
.. describe:: MultLineWidth: "85%"

    The width to use for the `multline` environment that is part of
    the :ref:`tex-ams` extension.  This width gives room for tags at
    either side of the equation, but if you are displaying mathematics
    in a small area or a thin column of text, you might need to change
    the value to leave sufficient margin for tags.

.. _tex-maxMacros:
.. describe:: maxMacros: 10000

    Because a definition of the form ``\def\x{\x} \x`` would cause MathJax 
    to loop infinitely, the ``maxMacros`` constant will limit the number of 
    macro substitutions allowed in any expression processed by MathJax.  

.. _tex-maxBuffer:
.. describe:: maxBuffer: 5 * 1024

    Because a definition of the form ``\def\x{\x aaa} \x`` would loop 
    infinitely, and at the same time stack up lots of a's in MathJax's 
    equation buffer, the ``maxBuffer`` constant is used to limit the size of 
    the string being processed by MathJax.  It is set to 5KB, which should 
    be sufficient for any reasonable equation.

.. raw:: html

   <style>
   .rst-content dl.describe > dt:first-child {
     margin-bottom: 0;
   }
   .rst-content dl.describe > dt + dt {
     margin-top: 0;
     border-top: none;
     padding-left: 6em;
   }
   .rst-content dl.describe > dt + dd {
     margin-top: 6px;
   }
   </style>

.. _tex-baseURL:
.. describe:: baseURL: (document.getElementsByTagName('base').length === 0) ?
                       '' : String(document.location).replace(/#.*$/, ''))

   This is the base URL to use when creating links to tagged equations
   (via ``\ref{}`` or ``\eqref{}``) when there is a ``<base>`` element
   in the document that would affect those links.  You can set this
   value by hjand if MathJax doesn't produce the correct link.


The remaining options are described in the
:ref:`input-common-options` section.

-----

Developer Options
=================

In addition to the options listed above, low-level options intended
for developers include the following:

.. _tex-FindTeX:
.. describe:: FindTeX: null

   The ``FindTeX`` object instance that will override the default
   one.  This allows you to create a subclass of ``FindTeX`` and
   pass that to the TeX input jax.  A ``null`` value means use the
   default ``FindTeX`` class and make a new instance of that.
              

-----

.. _tex-extension-options:

TeX Extension Options
=====================

Several of the TeX extensions make additional options available in the
``tex`` block of your MathJax configuration.  These are described
below.  Note that the :ref:`input/tex <tex-input>` component, and the
combined components that load the TeX input jax, include a number of
these extensions automatically, so some these options will be
available byu default.


.. _tex-configmacros-options:

ConfigMacros Options
--------------------

The :ref:`tex-configMacros` extension adds a ``macros`` option to the
``tex`` block that lets you pre-define macros.

.. _tex-macros-option:
.. describe:: macros: {}

    This lists macros to define before the TeX input processor begins.
    These are `name: value` pairs where the `name` gives the name of
    the TeX macro to be defined, and `value` gives the replacement
    text for the macro.  The `value` can be a simple repklacement
    string, or an array of the form `[value, n]`, where `value` is the
    replacement text and `n` is the number of parameters for the
    macro.  The array can have a third entry:  either a string that is
    the default value to give for an optional (bracketed) parameter
    when the macro is used, or an array consisting of template strings
    that are used to separate the various parameters.  The first
    template must preceed the first parameter, the second must preceed
    the second, and so on until the final which must end the last
    parameter to the macro.  See the examples below.

    Note that since the `value` is a javascript string,
    backslashes in the replacement text must be doubled to prevent
    them from acting as javascript escape characters.

    For example,

    .. code-block:: javascript
 
        macros: {
          RR: '{\\bf R}',                    // a simple string replacement
          bold: ['\\boldsymbol{#1}',1] ,     // this macro has one parameter
          ddx: ['\\frac{d#2}{d#1}', 2, 'x'], // this macro has an optional parameter that defaults to 'x'
          abc: ['(#1)', 1, [null, '\\cba']]  // equivalent to \def\abc#1\cba{(#1)}
        }

    would ask the TeX processor to define four new macros:  ``\RR``,
    which produces a bold-face "R", and ``\bold{...}``, which takes one
    parameter and sets it in the bold-face font, ``\ddx``, which has
    an optional (bracketed) parameter that defaults to ``x``, so that
    ``\ddx{y}`` produces ``\frac{dy}{dx}`` while ``\ddx[t]{y}``
    produces ``\frac{dy}{dt}``, and ``\abc`` that is equivalent to
    ``\def\abc#1\cba{(#1)}``.

.. _tex-require-options:

Require Options
---------------

The :ref:`tex-require` extension defines the (non-standard)
``\require{}`` macro for loading TeX extensions.  Adding it to the
``packages`` array defines a ``require`` sub-block of the ``tex``
configuration block with the following values:

.. code-block:: javascript

   MathJax = {
     tex: {
       require: {
         allow: {
           base: false,
           'all-packages': false
         },
         defaultAllow: true
      }
    };

.. _tex-require-allow:
.. describe:: allow: {...}

   This sub-object indicates which extensions can be loaded by
   ``\require``.  The keys are the package names, and the value is
   ``true`` to allow the extension to be loaded, and ``false`` to
   disallow it.  If an extension is not in the list, the default value
   is given by ``defaultAllow``, described below.

.. _tex-require-defaultAllow:
.. describe:: defaultAllow: true

   This is the value used for any extensions that are requested, but
   are not in the ``allow`` objecft described above.  If set to
   ``true``, any extension not listed in ``allow`` will be allowed;
   if ``false``, only the ones lised in ``allow`` (with value
   ``true``) will be allowed.

.. _tex-autoload-options:

Autoload Option
---------------

The :ref:`tex-autoload` extension creates macros that cause the
packages that define them to be loaded automatically when they are
furst used.  Adding it to the ``packages`` array defines an
``autoload`` sub-block to the ``tex`` configuration block.  This block
contains `key: value` pairs where the `key` is a TeX package name, and
the value is an array of macros that cause that package to be loaded,
or an array consisting of two arrays, the first giving names of macros
and the second names of environments; the first time any of them are
used, the extension will be loaded automatically.

The default autload definitions are the following:

.. code-block:: javascript

   MathJax = {
     tex: {
       autoload: expandable({
         action: ['toggle', 'mathtip', 'texttip'],
         amsCd: [[], ['CD']],
         bbox: ['bbox'],
         boldsymbol: ['boldsymbol'],
         braket: ['bra', 'ket', 'braket', 'set', 'Bra', 'Ket', 'Braket', 'Set', 'ketbra', 'Ketbra'],
         cancel: ['cancel', 'bcancel', 'xcancel', 'cancelto'],
         color: ['color', 'definecolor', 'textcolor', 'colorbox', 'fcolorbox'],
         enclose: ['enclose'],
         extpfeil: ['xtwoheadrightarrow', 'xtwoheadleftarrow', 'xmapsto',
                    'xlongequal', 'xtofrom', 'Newextarrow'],
         html: ['href', 'class', 'style', 'cssId'],
         mhchem: ['ce', 'pu'],
         newcommand: ['newcommand', 'renewcommand', 'newenvironment', 'renewenvironment', 'def', 'let'],
         unicode: ['unicode'],
         verb: ['verb']
       }
     }
   };

To prevent an extension from autoloading, set its value to an empty
array.  E.g., to not autoload the `color` extension, use

.. code-block:: javascript

   MathJax = {
     tex: {
       autoload: expandable({
         color: []
       }
     }
   };

If you define your own extensions, and they have a prefix other than
``[tex]``, then incldue that in the extension name.  For instance,

.. code-block:: javascript

   MathJax = {
     tex: {
       autoload: expandable({
         '[extensions]/myExtension' : ['myMacro', 'myOtherMacro']
       }
     }
   };

See the :ref:`loader-options` section for details about how to define
your own prefixes, like the ``[extensions]`` prefix used here.


.. _tex-tagformat-options:

TagFormat Options
-----------------

The :ref:`tex-tagFormat` extension allows you to control the dispolay
and linking of equation tags and numbers.  Adding this to the
``packages`` array adds a ``tagFormat`` sub-object to the ``tex``
configuration block with the following values:

.. code-block:: javascript

   tagFormat: {
      number: (n: number) => n.toString(),
      tag:    (tag: string) => '(' + tag + ')',
      id:     (id: string) => 'mjx-eqn-' + id.replace(/\s/g, '_'),
      url:    (id: string, base: string) => base + '#' + encodeURIComponent(id),
    }

.. describe:: number: function (n) {return n.toString()}

   A function that tells MathJax what tag to use for equation number
   ``n``.  This could be used to have the equations labeled by a
   sequence of symbols rather than numbers, or to use section and
   subsection numbers instead.

.. describe:: tag: function (n) {return '(' + n + ')'}

   A function that tells MathJax how to format an equation number for
   displaying as a tag for an equation.  This is what appears in the
   margin of a tagged or numbered equation.

.. describe:: id: function (n) {return 'mjx-eqn-' + n.replace(/\\s/g, '_')}

   A function that tells MathJax what ID to use as an anchor for the
   equation (so that it can be used in URL references).

.. describe:: url: function (id, base) {return base + '#' + encodeURIComponent(id)}

   A function that takes an equation ID and base URL and returns the
   URL to link to it.  The ``base`` value is taken from the
   :ref:`baseURL <tex-baseURL>` value, so that links can be make witin
   a page even if it has a ``<base>`` element that sets the base URL
   for the page to a different location.


.. _tex-color-options:

Color Options
-------------

The :ref:`tex-color` extension defines the LaTeX-compatible ``\color``
macro.  Adding it to the ``packages`` array defines a ``color``
sub-block of the ``tex`` configuration block with the following values:

.. code-block:: javascript

   MathJax = {
     tex: {
       color: {
         padding: '5px',
         borderWidth: '2px'
       }
     }
   };

.. _tex-color-padding:
.. describe:: padding: '5px'

   This gives the padding to use for color boxes with background colors.

.. _tex-color-borderWidth:
.. describe:: borderWidth: '2px'

   This gives the border width to use with framed color boxes produced
   by ``\fcolorbox``.


.. _tex-amscd-options:

AmsCD Options
-------------

The :ref:`tex-amscd` extension defines the `CD` environment for
commutative diagrams.  Adding it to the ``packages`` array defines an
``amsCd`` sub-block of the ``tex`` configuration block with the
following values:

.. code-block:: javascript

   MathJax = {
     tex: {
       amsCd: {
         colspace: '5pt',
         rowspace: '5pt',
         harrowsize: '2.75em',
         varrowsize: '1.75em',
         hideHorizontalLabels: false
       }
     }
   };

.. _tex-amscd-colspace:
.. describe:: colspace: '5pt'

   This gives the amount of space to use between columns in the
   commutative diagram.

.. _tex-amscd-rowspace:
.. describe:: rowspace: '5pt'

   This gives the amount of space to use between rows in the
   commutative diagram.

.. _tex-amscd-harrowsize:
.. describe:: harrowsize: '2.75em'

   This gives the minimum size for horizontal arrows in the
   commutative diagram.

.. _tex-amscd-varrowsize:
.. describe:: varrowsize: '1.75em'

   This gives the minimum size for vertical arrows in the
   commutative diagram.

.. _tex-amscd-hideHorizontalLabels:
.. describe:: hideHorizontalLabels: false

   This determines whether horiztonal arrows with labels above or
   below will use ``\smash`` in order to hide the height of the
   labels.  (Labels above or below horizontal arrows can cause excess
   space between rows, so setting this to ``true`` can improve the
   look of the diagram.)

|-----|
