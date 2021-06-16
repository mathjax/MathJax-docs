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
        digits: /^(?:[0-9]+(?:\{,\}[0-9]{3})*(?:\.[0-9]*)?|\.[0-9]+)/,
                                   // pattern for recognizing numbers
        tags: 'none',              // or 'ams' or 'all'
        tagSide: 'right',          // side for \tag macros
        tagIndent: '0.8em',        // amount to indent tags
        useLabelIds: true,         // use label name rather than tag for ids
        maxMacros: 1000,           // maximum number of macro substitutions per expression
        maxBuffer: 5 * 1024,       // maximum size for the internal TeX string (5K)
        baseURL:                   // URL for use with links to tags (when there is a <base> tag in effect)
           (document.getElementsByTagName('base').length === 0) ?
            '' : String(document.location).replace(/#.*$/, '')),
        formatError:               // function called when TeX syntax errors occur
            (jax, err) => jax.formatError(err)
      }
    };

Note that some extensions make additional options available.  See the
:ref:`tex-extension-options` section below for details.

.. note::

   The default for ``processEscapes`` has changed from
   ``false`` in version 2 to ``true`` in version 3.

.. note::

   Prior to version 3.2, the ``multlineWidth`` option used to be in the
   main ``tex`` block, but it is now in the ``ams`` sub-block of the
   ``tex`` block.  Version 3.2 includes code to move the configuration
   from its old location to its new one, but that
   backward-compatibility code will be removed in a future vesion.

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

   This loads the :ref:`tex-enclose` extension and acticates it by
   including it in the package list.

   You can remove packages from the default list using ``'[-]'``
   rather than ``[+]``, as in the followiong example:

   .. code-block:: javascript

      MathJax = {
        tex: {
          packages: {'[-]': ['noundefined']}
        }
      };

   This would disable the :ref:`tex-noundefined` extension, so that
   unknown macro names would cause error messages rather than be
   displayed in red.

   If you need to both remove some default packages and add new ones,
   you can do so by including both within the braces:

   .. code-block:: javascript

      MathJax = {
        loader: {load: ['[tex]/enclose']},
        tex: {
          packages: {'[-]': ['noundefined', 'autoload'], '[+]': ['enclose']}
        }
      };

   This disables the :ref:`tex-noundefined` and :ref:`tex-autoload`
   extensions, and adds in the :ref:`tex-enclose` extension.


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
    dollar sign, rather than using it as a math delimiter, and ``\\``
    to represent a literal backslash (so that you can use ``\\\$`` to
    get a literal ``\$`` or ``\\$...$`` to get a backslash jsut before
    in-line math).  When ``false``, ``\$`` will not be altered, and
    its dollar sign may be considered part of a math delimiter.
    Typically this is set to ``true`` if you enable the ``$ ... $``
    in-line delimiters, so you can type ``\$`` and MathJax will
    convert it to a regular dollar sign in the rendered document.

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
   change their appearance).  You can change this to ``'ams'`` for
   equations numbered as the `AMSmath` package would do, or ``'all'``
   to get an equation number for every displayed equation.

.. _tex-tagSide:
.. describe:: tagSide: 'right'

    This specifies the side on which ``\tag{}`` macros will place the
    tags, and on which automatic equation numbers will appear.  Set it
    to ``'left'`` to place the tags on the left-hand side.

.. _tex-tagIndent:
.. describe:: tagIndent: "0.8em"

    This is the amount of indentation (from the right or left) for the
    tags produced by the ``\tag{}`` macro or by automatic equation
    numbers.

.. _tex-useLabelIds:
.. describe:: useLabelIds: true

   This controls whether element IDs for tags use the ``\label`` name
   or the equation number.  When ``true``, use the label, when
   ``false``, use the equation number.

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
   value by hand if MathJax doesn't produce the correct link.

.. _tex-formatError:
.. describe:: formatError: (jax, err) => jax.formatError(err)

   This is a function that is called when the TeX input jax reports a
   syntax or other error in the TeX that it is processing.  The
   default is to generate an ``<merror>`` MathML element with the
   message indicating the error that occurred.  You can override the
   function to perform other tasks, like recording the message,
   replacing the message with an alternative message, or throwing the
   error so that MathJax will stop at that point (you can catch the
   error using promises or a ``try/carch`` block).


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
available by default.

For example, the :ref:`tex-configmacros` package adds a ``macros``
block to the ``tex`` configuration block that allows you to pre-define
macros for use in TeX espressions:

.. code-block:: javascript

   MathJax = {
     tex: {
       macros: {
         R: '\\mathbf{R}'
       }
     }
   }

The options for the various TeX packages (that have options) are
described in the links below:

* :ref:`tex-ams-options`
* :ref:`tex-amscd-options`
* :ref:`tex-autoload-options`
* :ref:`tex-color-options`
* :ref:`tex-configmacros-options`
* :ref:`tex-mathtools-options`
* :ref:`tex-noundefined-options`
* :ref:`tex-physics-options`
* :ref:`tex-require-options`
* :ref:`tex-setoptions-options`
* :ref:`tex-tagformat-options`

-----

Setting Options from within TeX Expressions
===========================================

It is sometimes convenient to be able to change the value of a TeX or
TeX extension option from within a TeX expression.  For example, you
might want to change the tag side for an individual expression.  The
:ref:`tex-setoptions` extension allows you to do just that.  It
defines a ``\setOptions`` macro that allows you to change the values
of options for the TeX parser, or the options for a given TeX package.

Because this functionality can have potential adverse consequences on
a page that allows community members to enter TeX notation, this
extension is not loaded by default, and can't be loaded by
`\require{}`.  You must load it and add it to the tex package list
explicitly in order to allow the options to be set.  The extension has
configuration parameters that allow you to control which packages and
options can be modified from within a TeX expression, and you may wish
to adjust those if you are using this macro in a community setting.


|-----|
