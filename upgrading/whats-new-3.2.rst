.. _whats-new-3.2:

##########################
What's New in MathJax v3.2
##########################

Version 3.2 includes a number of new features, as well as bug fixes
for several issues with version 3.1.  The new features are described
below.

* :ref:`v3.2-lazy-typesetting`
* :ref:`v3.2-css-updates`
* :ref:`v3.2-tex-packages`
* :ref:`v3.2-mml3`
* :ref:`v3.2-hindi`
* :ref:`v3.2-other`

..

* :ref:`v3.2-breaking`


See also the `release notes
<https://github.com/mathjax/MathJax-src/releases/tag/3.2.0#bugs>`__
for the list of bugs that have been fixed in version 3.2.


------

.. _v3.2-lazy-typesetting:

Lazy Typesetting
================

Although MathJax version 3 is already an order of magnitude faster
than version 2, with version 3.2 we offer a new extension that is
designed to make pages with large numbers of equations perform even
better.  It implements a "lazy typesetting" approach that only
typesets an expression when it comes into view, which means that
expressions will not be typeset when they are not visible.  Your
readers will not have to wait for the entire document to typeset,
which can speed up their initial view of the page.  Furthermore, any
expressions that are never seen will not be typeset.  This also helps
with the situation where you may link to a particular location in your
page (via a URL with a hash); in version 2, typesetting the material
above that point can cause the browser to change the scroll position,
and so the user may not end up at the proper location in the page.
With the lazy extension, the material above that point is not typeset
until the user scrolls upwards, and so there is no position change.

Lazy typesetting works best with SVG output, but changes (discussed
below) with the way the CommonHTML output handles its stylesheet
updates make the CHTML output nearly as fast.  With TeX input, the
lazy extension makes sure that previous expressions are processed by
TeX (though not output to the page) so that any macro definitions or
automatic equation numbers are in place when the visible expressions
are processed.  Currently, documents that contain ``\ref`` or ``\eqref``
links may not yet work properly, since target equations may not have
been typeset, and so the link location may not be marked in the
document.  In particular, forward references are unlikely to work, and
backward references will work only if the target expression has
already been typeset.  We hope to improve this situation in a future
release.

See the :ref:`lazy-typesetting` documentation for information on how
to configure MathJax to use this new feature.

-----

.. _v3.2-css-updates:

CSS Updates
===========

MathJax's CHTML output handles the characters that appear in the math
on the page by storing information about their bounding boxes and text
content in a CSS stylesheet.  When additional math is typeset, this
stylesheet may need to be updated, and in previous versions, MathJax
would replace the entire stylesheet with a new one.  This can cause
visual flashing, and can be expensive as the browser must re-evaluate
all the rules and apply them again.  In version 3.2, the CHTML output
now adds rules to the stylesheet individually, so the older rules are
not replaced, and only the new rules must be evaluated and applied.
This makes updates must faster, and is of particular benefit to the
lazy-typesetting extension described above, as the page can be updated
many times as equations scroll into view.  This change makes the CHTML
output work almost as smoothly as SVG output with the lazy extension.

-----

.. _v3.2-tex-packages:

New TeX Packages
================

Version 3.2 includes nine new TeX extension packages:

* :ref:`tex-cases` — provides environments for individually numbered cases.
* :ref:`tex-centernot` — implements a centered `\not` command (and a non-standard `\centerOver` that places one symbol centered on top of another).
* :ref:`tex-colortbl` — provides macros for coloring cells of an array or alignment.
* :ref:`tex-empheq` — an environment for placing material to the left or right of an alignment that has individual equation numbers.
* :ref:`tex-gensymb` — provides macros for some specific units.
* :ref:`tex-mathtools` — offers a range of macros and environments for advanced mathematical typesetting.
* :ref:`tex-setoptions` — provides the ability to change some TeX input jax options from within an expression (e.g., to change the tag side).
* :ref:`tex-textcomp` — provides a range of macros for specifying various text characters.
* :ref:`tex-upgreek` — provides macros for upright Greek characters.

These are all included in the components that end in ``-full`` (and
include the TeX input jax), and you can load individual ones as you
would other tex packages.  Note, however, that none of these are
autoloaded, though you can configure the `autoload` extension to do
so, if you wish.  See the :ref:`tex-autoload` documentation for details.

In addition to these new packages, some of the older packages have been updated:

* The `ams` package now includes ``flalign``, ``xalign``, and ``xxalign``
  environments.  In addition, the ``multline`` extension has been made
  more compatible with actual LaTeX.  In the past, ``multline`` was set
  to be 85% of the container width, but now it is set to 100%, but
  with a 1em indent on both sides; when there is a tag, the indent on
  the tag side is increased by the width of the tag, as is the case in
  LaTeX.  The width was stored in the ``multlineWidth`` configuration
  option in the ``tex`` configuration block.  That has now been moved to
  the ``ams`` block in the ``tex`` configuration, and there is a new
  ``multlineIndent`` value.  These are set to ``100%`` and ``1em``
  respectively.  To obtain the old behavior, set them to ``85%`` and
  ``0``.  Currently, if ``multlineWidth`` is found in the main ``tex``
  option block, it will be moved to the ``ams`` block, but that
  backward-compatibility code will be removed in a future release.

..

* The `physics` package now implements all macros, even those that are
  not officially documented, but are nevertheless available in LaTeX.
  In addition, it now implements the ``italicdiff`` and ``arrowdel``
  options.

..

* The following macros have been added to the indicated package:
    * ``\overunderset`` (ams) — a combination of ``\overset`` and ``\underset``.
    * ``\stackbin`` (ams) — similar to ``\stackrel`` but produces a symbol with the spacing of a binary operator.
    * ``\nonscript`` (base) — apply the following spacing only when in display and text styles.
    * ``\boxed`` (base) — puts a frame around an expression.
    * ``\framebox`` (base) — puts a frame around a text argument.
    * ``\ip``, ``\Bqty``, ``\qsince``, ``\Residue`` (physics) — originally missing from the physics package.

-----

.. _v3.2-mml3:

MathML Extensions
=================

The MML3 extension from version 2 has been ported to version 3 and is
available to be included when you load the MathML input jax.  This
extension implements the MathML3 elementary math tags (like ``<mstack>``
and ``<mlongdiv>``) using an XSLT transform to convert these tags into
other presentation MathML tags that MathJax has implemented.  This
does a reasonable job for some constructs, and a poorer job for
others, but it does make it possible to process elementary math within
MathJax v3.  This is an experimental extension as a stop-gap measure
until these tags are fully implemented within core MathJax.

See the :ref:`mathml-mml3` documentation for information on how to
configure MathJax to use this new feature.

-----

.. _v3.2-hindi:

Explorer Update
===============

The Speech-Rule Engine (SRE) that underlies MathJax's assistive
technology support has been updated to the most recent version
(3.3.3).  This includes support for the Hindi language, so that the
expression explorer can generate speech in Hindi (as well as its other
languages: English, French, German, Italian, Spanish, together with
Braille support in Nemeth).

See the `SRE release notes <https://github.com/zorkow/speech-rule-engine/releases>`__ for details.

This release also ports the remaining missing features for the
explorer to v3.  This includes summarising expressions and navigation
of tabular expressions, like matrices or equation systems.  See the
:ref:`keyboard command <special-keys>` documentation for details.

-----

.. _v3.2-other:

Other New Features
==================

In addition to the major features listed above, there are some minor new features as well:

* Packages can now be specified for the `textmacros` extension to the
  TeX input jax.  This allows you to configure additional macros that
  can be processed within text mode.  See the :ref:`tex-textmacros`
  documentation for details.

..

* Processing of raw Unicode characters in TeX input has been improved.
  In the past, nearly all non-ASCII characters would be placed within
  an ``<mo>`` element, which is not always the best tag to use.  In
  version 3.2, processing of raw Unicode characters is more nuanced,
  so that letters are placed in ``<mi>`` elements and other symbols in
  ``<mo>``.  For example, a literal Greek alpha (U+03B1) will produce
  ``<mi>&#x03B1;</mi>`` (which is what is generated by ``\alpha``) rather
  than ``<mo>&#x03B1;</mo>`` as in earlier versions.  This should
  provide better results, though perhaps still not perfect in all
  cases.

..

* In the past, errors in the MathJax configuration options (such as an
  unknown option) would produce a fatal error and MathJax would not
  run.  In version 3.2, such errors now produce non-fatal warnings
  instead, and MathJax will continue to process the remaining options
  (and then typeset the page).  This means that changes to the options
  (like those described in the breaking changes section below)
  will not cause your pages to fail outright (though the old options
  will have no effect).  You can configure MathJax to make such errors
  fatal again, if you wish, and you can provide a function that will
  be called when there is an option error so that you can more easily
  trap such errors and handle them yourself.  See the :ref:`startup-options`
  for more details.

..

* The component loader uses a set of filters to convert a component
  specification (like ``[tex]/physics``) to the full URL for loading the
  extension.  In the past, it was difficult to hook into that
  filtering mechanism, but in version 3.2, you can now configure
  additional filters for the loader.  See the :ref:`loader-options`
  documentation for more details.

-----

.. _v3.2-breaking:

Breaking Changes in this Release
================================

Some of the changes made to the options to accommodate the updated
speech-rule engine are potentially breaking changes, in that the
previous options (``enrichSpeech``, ``a11y.locale``, ``a11y.speechRules``)
are no longer valid options.  Version 3.1.4 includes code to transfer
the old options to their new locations, but that code has been removed
in version 3.2.  As errors in options are no longer fatal (unless you
configure them to be), this change will no longer cause MathJax to
fail, but will cause warning messages in the browser console, so look
there for such error reports.

Similarly, the code that automatically renames the older TeX package
names to their current all-lower-case versions (e.g., ``configMacros``
to ``configmacros`` and ``colorV2`` to ``colorv2``) has been removed from
version 3.2.  If you are using old package names, you will need to
update your configuration.  This applies to ``\require{}`` macros that
refer to the older names as well as their names in the ``loader``
section, the ``tex.packages`` array, and the ``tex.autoload`` block.

Version 3.2 removes the ``matchFontHeight`` option for the SVG output
jax, since it only applies to the CommonHTML output, but was
previously allowed in the ``svg`` configuration block, while doing
nothing.

Version 3.2 removes of the ``toArray()`` method from the ``LinkedList``
class (and its subclasses), so any custom code that uses that should
switch to using ``Array.from(...)`` around the list instead.

Finally, the ``Box.ts`` and ``CssStyles.ts`` (and their associated ``.js``
files) have been moved from the ``output`` directories to the ``util``
directory.  Compatibility files were placed in the original locations
so that older code would continue to work, but these have been removed
in v3.2, so you should modify any custom code that loads these files
to obtain them from the ``util`` directory instead.



|-----|
