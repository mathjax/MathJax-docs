.. _v4-tex-improvements:

==================
Input Improvements
==================

MathJax v4 includes several new features for the TeX input jax,
including updated Unicode positions for some macros, new macros for
characters that are now available in the fonts, updates to some TeX
extensions packages, new configuration parameters, the ability to
embed HTML within a TeX expression, and new macros for controlling
vertical alignment and line breaks.

The macros for line breaking and alignment are discussed in the
:ref:`v4-tex-linebreaking` section, while embedding HTML in TeX
expressions is described in the :ref:`v4-html-in-tex` section.
Support for additional ``array`` environment preamble column types is
discussed in the section on :ref:`v4-preamble`.  The other additions
and changes are described below.


.. _v4-textmacros:

Textmacros Enabled by Default
=============================

In previous versions of MathJax, the macros in text-mode material (in
``\text{}`` and similar macros) were not processed unless the
:ref:`tex-textmacros` extension was loaded and enabled.  This version
now includes the `textmacros` extension in all the combined components
that contain the TeX input jax (i.e., all the ones starting with
``tex-``).  This means that macros inside text-mode will be processed.
Because only a limited number of text-mode-macros are defined, this
can lead to errors in cases where the literal macro name would be
displayed in the past.  For example, prior to v4,

.. code-block:: latex

   \text{The \item macro is used in lists}

would produce the literal string ``The \item macro is used in lists``,
but in v4 and above, it will lead to an error message about ``\item``
being undefined.  So this may be a breaking change in some pages that
take advantage of the old behavior.

You can disable the `textmacros` extension in combined components that
include it by merging

.. code-block:: js

   MathJax = {
     tex: {
       packages: {'[-]': ['textmacros']}
     }
   };

into your MathJax configuration.


.. _v4-new-macros:

New and Updated Macros
======================

The Unicode characters produced by ``\vdash``, ``\models``, and
``\backslash`` have been adjusted to produce better results.  The
``\iddots``, ``\dddot``, ``\ddddot``, ``\oiint``, ``\oiiint``,
``\ointop``, and ``\AA`` macros have been added, as have the
``displaymath``, ``math``, and ``darray`` environments.

The non-standard ``\bbFont`` and ``\scr`` macros have been removed,
and the ``\frak`` macro has been made compatible with its usual LaTeX
version.

The ``\underline``, ``\llap``, ``\rlap``, ``\phantom``, ``\vphantom``,
``\hphantom``, ``\smash``, ``\mmlToken`` macros have been added to the
``textmacros`` package for use in text mode.

The ``\char`` macro is now available for inserting characters by their
Unicode character positions.  It produces an internal ``mn``, ``mi``,
``mo``, or ``mtext`` element depending on the character specified.
E.g., ``\char"61`` produces ``<mi>a</mi>`` internally.

A new non-standard macro ``\U`` is now available for inserting a
Unicode character into the TeX input string to be processed as though
it had been in the input stream originally.  It takes on argument,
which is the Unicode code point in hexadeciaml notation.  For example,
``\U{229E}`` would produce the character U+229E, a plus sign in a
square.  Note in particular that these macros can be used in the
second argument to ``\mmlToken``, as in ``\mmlToken{mi}{\U{213C}}``.

A new non-standard macro ``\breakAlign`` has been added to control the
vertical alignment of blocks that contain line breaks.  This and
several other new line breaking macros are discussed in the previous
section on :ref:`v4-tex-linebreaking` above.


.. _v4-new-packages:

New TeX Packages
================

The :ref:`tex-units` package has been added, which makes the ``\units``,
``\unitfrac``, and ``\nicefrac`` macros available, along with new
:data:`tex.units.loose` and :data:`tex.units.ugly` configuration
options.  Both are boolean values, and the first controls how large
the space is before units (``true`` is a large space, ``false`` a
smaller one), while the second determines whether ``\nicefrac``
produces bevelled fractions (``false``) or stacked fractions
(``true``).

MathJax v4 includes three new TeX packages that provide alternative
double-struck (i.e., blackboard bold) character sets:
:ref:`tex-dsfont`, :ref:`tex-bbm`, and :ref:`tex-bboldx`.  New font
extensions are now available for these packages, and these are loaded
automatically when the TeX package is loaded.  These extensions work
in cunjunction with any of the fonts available in v4.

The :ref:`tex-dsfont` package defines a macro ``\mathds`` that
provides access to its double-struck characters.  There is a
configuration option that controls whether the sans-serif version of
these fonts is used, or the roman versions:

.. code-block:: js

   MathJax = {
     tex: {
       dsfont: {
         sans: true   // default is false
       }
     }
   }

The :ref:`tex-bbm` package defines macros ``\mathbbm``,
``\mathmmbss``, and ``\mathbbmtt`` to generate its double-struck
characters, as well as a ``\mathversion`` macro that can be used to
select the version of the double-struck fonts to use (this is a global
setting).  Here, ``\mathversion{bold}`` selects the bold versions of
the double-struck characters, while any argument other than ``bold``
will select the normal versions of the fonts.

The :ref:`tex-bboldx` package redefines ``\mathbb`` to use the bboldx
double-struck characters, and adds ``\mathbfbb`` to access their
bold-face versions, plus ``\imathbb``, ``\jmathbb``, ``\imathbfbb``,
and ``\jmathbfbb`` for dotless ``i`` and ``j`` characters in these
fonts.  In addition, there are macros for upper- and lower-case Greek
letters, e.g., ``\bbGamma``, ``\bfbbsigma``, etc., and text-based
versions of these for use in ``\text{}``, e.g., ``\txtbbGamma``.  The
bold delimiters ``\bbLparen``, ``\bbRparen``, ``\bbLbrack``, ``\bbRbrack``,
``\bbLangle``, ``\bbRangle``, and the ``bfbb`` versions of these, are
defined as well.

One of the last remaining extensions from version 2 that was not
ported to v3 is now available in v4: the :ref:`tex-begingroup`
extension that allows you to create temporary macro definitions.  The
v4 version of `begingroup` defines two new non-standard macros:
``\begingroupReset`` and ``\begingroupSandbox``.  The first one ends
any open ``\begingroup`` macros, removing any of their temporary
macros or environments.  The second can be used to isolate the
definitions in one section of the page from those in another, so that
sites like StackExchange can use this between user posts to make sure
that one user doesn't redefine things to mess up another user.  The
``\begingroupSandbox`` macro can't be redefined, and its action is
essentially to do ``\begingroupReset\begingroup``. This removes any
previous user definitions and makes a new group for the next user's
definition.  It also directs any global definitions to this new group
so that a user can create global macros in their own sandbox, but they
are removed at the next ``\begingroupSandbox`` call.  Any macros or
environments created before the first ``\begingroupSandbox`` call are
shared definitions that are available in every sandbox.  Once
``\begingroupSandbox`` is performed, however, there is no going back; no
new shared definitions can be made.

Note that macros loaded by ``\require{}`` or by the
:ref:`tex-autoload` extension are not managed by the `begingroup`
extension, so are global and remain in effect even after an
``\endgroup`` or ``\begingroupSandbox`` call.


.. _v4-mathtools:

Updates to ``mathtools``
========================

The :ref:`tex-mathtools` extension has been updated to reflect the
changes to the actual LaTeX package that were made in 2022 and 2024.
In particular, there are some breaking changes to ``\coloneq`` and
three other colon macros, several new colon-like commands, and several
new extensible arrow macros, as described below.

The ``\coloneq``, ``\Coloneq``, ``\eqcolon`` and ``\Eqcolon`` macros
now use the 2022 and later definitions (they use ``=`` rather than
``-``, so ``\coloneq`` produces ``:=`` not ``:-`` as in the past).  A
new :data:`legacycolonsymbols` option controls which set to use (just
as in actual `mathtools`).  This can be set in the :data:`mathools`
section of the :data:`tex` block of your MathJax configuration, or via
the ``\mathtoolsset`` macro.  The new colon macros ``\approxcolon``,
``\Approxcolon``, ``\simcolon``, ``\Simcolon``, ``\colondash``,
``\Colondash``, ``\dashcolon``, and ``\Dashcolon`` are now defined,
and are available regardless of the setting of
:data:`legacycolonsymbols`.

The new extensible arrow macros are ``\xlongrightarrow``,
``\xlongleftarrow``, ``\xLongrightarrow``, and ``\xLongleftarrow``.

Support for ``\MakeAboxedCommand``, which was missing in the past, has
been added in this release. This includes a non-standard starred
version that handles box commands whose contents are in math-mode
rather than text-mode, like ``\bbox`` and ``\boxed`` versus ``\fbox``
and ``\fcolorbox``.

The ``\vcentercolon`` macro was incorrectly named ``\centercolon`` in
previous versions, and has been corrected here.  This is a breaking
change for pages that used the incorrect name, but you can always
define ``\centercolon`` to be ``\vcentercolon`` if that is an issue.

The :data:`mutlinedgap` configuration option has been renamed to
:data:`multlined-gap` to correspond better with other option names
(that all use dashes), and there is a new :data:`multlined-width`
option has been added to give the default width for ``multlined``
environments.


.. _v4-tex-package-updates:

Updates to Other Packages
=========================

For the :ref:`tex-mhchem` extension, several of the arrows were not
previously stretchy.  This release adds a new mhchem-specific font
that includes the characters needed to stretch all the arrows
available in `mhchem`, improving its output in both the CHTML and SVG
renderers.  Note, however, that these fonts match the
``mathjax-newcm`` font set, and are used no matter what font is
selected, so the arrows may not match other arrows used in the font if
you are using one other than ``mathjax-newcm``.

The :ref:`tex-configmacros` package now allows you to create active
characters that are bound to macros, so that

.. code-block:: js

   MathJax = {
     tex: {
       active: {
         'x': '\\mmlToken{mi}[mathvariant="bold"]{x}'
       }
     }
   }

defines ``x`` to always produce a boldface "x".

Note that you need to take care not to cause a loop by using the
character you are making active in its own definition.  In the example
above, since the argument to ``\mmlToken`` is not further processed as
TeX commands (except for instances of ``\U``), that is not the case
here.

A new :data:`formatRef` configuration option has been added to the
:ref:`tex-tagformat` package that allows you to specify how ``\eqref`` is
formatted.  It should be a function that takes one argument, the tag
associated with the specified label, and returns the string that
should be used in place of the ``\eqref``.  The default is to use the
result of :data:`formatTag`, which is the string that will be used for
the equation number on the equation itself.  The returned string will
be used as the link text for the link that targets the specified
expression.


.. _v4-tex-options:

New or Updated Configuration Options
====================================

A new :data:`tex.tagAlign` configuration option is now available that
specifies how tags should be vertically aligned compared to their
equations.  The default is to align on the baseline, but you can
specify ``top``, ``center``, ``bottom``, ``baseline``, or ``axis``.
One use case for this is when the equation is likely to have automatic
line breaks inserted, in which case the baseline will be the baseline
of the top line of the equation (in most cases), but you may want to
have the alignment be the center of the broken equation rather than
the baseline of the top line.  Setting :data:`tagAlign` to ``center`` would
make sense in this case, without harming the usual placement for most
equations.

A new :data:`tex.mathStyle` configuration parameter has been added to
control the italicization of variables in TeX expressions, as can be
done in LaTeX via the `math-style
<http://milde.users.sourceforge.net/LUCR/Math/math-font-selection.xhtml#math-style>`__
document setting.  This can be set to one of ``TeX``, ``ISO``,
``French``, or ``upright``.  The setting affects how upper- and
lower-case Latin and Greek letters are italicized.  ``TeX`` uses
italics for all but upper-case Greek, whereas ``ISO`` makes everything
italic, ``upright`` makes them all upright, and ``French`` makes
everything upright except lower-case Latin letters.

When converting TeX to MathJax's internal MathML format, the TeX input
jax will put multi-letter sequences into a single ``mi`` element when
they appear inside ``\mathrm``, ``\mathbf``, and related macros.  What
constitutes a "letter" in this setting is now configurable via the
:data:`tex.identifierPattern` configuration option, which is a regular
expression that indicates what characters should be combined into one
identifier.  The default value is ``/^[a-zA-Z]+/``, but it can be
extended to include other characters (e.g., numbers or accented
characters) via this configuration option.  Note that the pattern must
begin with ``^`` to tie it to the beginning of the string.

Similarly, there is now a configuration option
:data:`tex.ams.operatornamePattern` to specify what should be put into
a single ``mi`` within the argument to ``\operatorname``.  Because
LaTeX treats ``-`` and ``*`` as text characters (rather than
mathematical operators) within ``\operatorname``, the default for this
pattern is ``/^[-*a-zA-Z]+/``.  Again, the pattern should always begin
with ``^``.

The :data:`tex.digits` option has been renamed :data:`numberPattern`
to be more in line with the options above.  The :data:`tex.digits`
option is retained for backward compatibility, though it will likely
be removed in a future release.  A new :data:`tex.initialDigit`
pattern tells MathJax when to apply the number pattern.  This makes it
easier to change the number pattern to include other formats, like
Persian numerals, for example.

Similarlty, a new :data:`tex.initialLetter` pattern has been added
that is used to trigger when the the identifier pattern is used.  This
make using accented characters or other non-Latin characters for
multi-letter identifiers easier to configure.


.. _v4-tex-misc:

Other TeX Input Changes
=======================

In the past, if an array environment had lines around the outside of
the array, and there were mixed solid and dotted lines used, then
MathJax might change some of them so that they are all the same style.
This has been fixed in this version, so the boundary lines should now
have the correct style in all cases.

The checking for proper nesting of AMS environments has been
improved.  This may affect existing expressions that are improperly
nested but were not flagged by MathJax in the past.  Previously, there
was no check that these environments appeared at the top level of the
expression, so an ``align`` environment could be used inside an
``array``, for example; this now generates an error.  On the other
hand, ``gather`` should be allowed within ``align`` (but not another
``gather``), but was being flagged as erroneous nesting; this is now
allowed.

The TeX input jax now attaches :attr:`data-latex` attributes to the
MathML elements that it produces, indicating the TeX command from
which the element originated.  This information can be used by the
assistive tools to produce Braille output of the original LaTeX, for
example.  Since :attr:`data` attributes are transferred to the CHTML
and SVG output nodes, this information is available in MathJax's
output in the page, not just the internal MathML notation.

Because the MathML specification indicates that any ``mtext`` element
is "space-like", and since an operator in an ``mrow`` whose only other
elements are space-like is considered to be an "embellished operator"
that should be treated as an unbreakable unit, this can lead to
unexpected results.  When the operator is used for line breaking, the
line break must occur before or after the embellished operator as a
whole.  That is, ``{\text{A} + \text{B}}`` produces
``<mrow><mtext>A</mtext><mo>+</mo><mtext>B</mtext></mrow>``, making
the ``<mo>+</mo>`` an embellished operator; if a linebreak is to occur
at this ``+``, it will be done before the ``A`` or after the ``B``,
not at the ``+`` itself.  This is not what is usually intended for
this LaTeX expression.  Although the MathML specification is not clear
about why ``mtext`` elements are space-like, it is likely because these
are sometimes used to insert explicit spaces into the expression via
space characters, but *any* ``mtext`` is considered space-like
regardless of its content, leading to awkward situations like the one
described above.
    
In version 4, MathJax has parted from the specification in making an
``mtext`` element be space-like only if its contents consists solely
of space characters or is empty and it doesn't have a
:attr:`mathbackground` or :attr:`style` attribute.  Similarly, an
``mspace`` element is considered space-like only if it does not have
an explicit :attr:`linebreak`, :attr:`height`, :attr:`depth`,
:attr:`mathbackground` or :attr:`style` attribute.  With these
changes, TeX expressions will not generate unexpected embellished
operators that will affect their line breaking.

|-----|
