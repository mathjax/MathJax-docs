.. _accessibility:

######################
Accessibility Features
######################

MathJax's mission is to provide the best tools for mathematics on the
web. Naturally, this means for everyone, and thus accessibility is an
important concern for us.


.. _mathjax-ui-a11y:

MathJax User Interface
======================

The MathJax user interface currently consists of the :ref:`MathJax
Menu <menu-component>` and the various MathJax messages, such as
syntax error messages from the TeX input processor.

The MathJax Menu follows WCAG 2.0 guidelines. Each expression typeset
by MathJax is included in the tab order by default (though this can be
disabled via a menu option).  When an expression is focused, the menu
can be triggered via the space or menu key and navigation in the menu
is possible using the arrow keys.  A menu selection can be made using
the |bkey| Enter |ekey| or |bkey| Return |ekey| key, and the menu can
be close without making a selection using the |bkey| Escape |ekey| or
|bkey| Esc |ekey| key.

.. note::

   The user interface for version 2 was localized to over 20 languages
   and many more partial localizations thanks to the fantastic support
   of `the community at TranslateWiki.net
   <https://translatewiki.net/wiki/Translating:MathJax>`__.
   Localization is not yet available in version 3, but is on the
   roadmap for a future version.


MathJax Accessibility Extensions
================================

The :ref:`MathJax accessibility extensions <a11y-extensions>` provide
several tools and features that enable universal rendering of
mathematics on the web. They enhance rendering both visually and
aurally. In particular, they provide:

- An innovative responsive rendering of mathematical content through
  collapsing and exploration of subexpressions.

- An aural rendering tool providing on-the-fly speech-text for
  mathematical content and its subexpressions using several
  user-selectable rule sets.

- Tactile rendering enabling Nemeth or Euro Braille output on a
  connected Braille display.

- An exploration tool, allowing for meaningful exploration of
  mathematical content including multiple highlighting features,
  magnification, and synchronized aural rendering.

The accessibility extensions attempt to support the widest selection
of browsers, operating systems, and assistive technologies, as they
only require the use of well-supported web standards such as WAI-ARIA,
in particular, the :attr:`aria-label` and :attr:`aria-braillelabel`
attributes, among others.  We test the assistive tools on 13 different
browser/os/screen-reader combinations to ensure that the user
experience is an seamless as possible.

In version 4, the extensions for generating speech and exploring
expressions are included an enabled in all the :ref:`combined
components <combined-components>` so that your pages should be
accessible to users with screen or Braille readers automatically in
that case. (In version 3, the user had to activate the accessibility
features to turn them on.)

If you are making a custom configuration, you can include ``ui/menu``
to enable the contextual menu, or you can include any of the
:ref:`a11y extensions <accessibility-components>` explicitly.  In
particular, the :ref:`explorer-component` component makes expression
exploration possible, and it loads the :ref:`speech-component`
component automatically.

See the :ref:`accessibility-options` section for details about how to
configure the extensions.

.. note::

   In v3, the :ref:`assistive-mml-component` was included and enabled
   in the combined components.  That is no longer the case in v4,
   which now uses the speech and explorer components instead.  Users
   can still use the MathJax contextual menu to turn on the hidden
   MathML and turn off the semantic enrichment that underlies the
   speech and explorer components if they want to have a similar
   experience to the one from v3.


.. _screenreader-support:

Screen Reader Support
=====================

Screen reader support in Mathjax v3 was based on the
:ref:`assistive-mml-component` component, which embedded a MathML
representation of each expression that was visually hidden, but
available to screen readers, in addition to its typeset version that
was visible for sighted users, but hidden from screen readers.
The quality of MathML support in screenreaders varies greatly, with
different levels of MathML feature support, different speech rule
sets, and different voicing technologies.

This approach only worked with those screen readers that understand
MathML, and even then, the experience was different depending on the
screen reader and browser that was being used.  As screen-reader and
browser versions changed, they sometimes failed to work properly with
the hidden MathML, and it was difficult to maintain this feature.

In version 4, screen reader support is now being handled through the
:ref:`explorer-component` and :ref:`speech-component` components of
MathJax.  These tools generate speech strings from the math
expressions in the page and inserts them via :attr:`aria-label` and
:attr:`aria-braillelabel` attributes so that screen readers will be
able to voice the mathematics regardless of whether they understand
MathML or not.  The :ref:`semantic-enrich-component` component
analyses the expression and improves the internal representation to
make screen reading and line breaking more accurate.

The explorer component then makes it possible to investigate an
expression interactively by allow the user to descend into the
expression and read it term by term rather than all at once.  The code
that handles the exploration has been rewritten in v4 to make it more
compliant with the ARIA standards, and to make it work more reliably
across browsers, operating systems, and screen readers so that
everyone should have an effective experience.

The explorer is designed to:

* Work across the major browser/OS/screen-reader combinations.

* Properly read the full expression when reading the whole page or
  stepping through the page sentence-by-sentence (or by other units).

* Automatically enter "focus mode" when the expression is focused via
  tabbing or clicking, in screen readers that have separate
  focus/browser modes.

* Allow control over the description of the math (e.g., "clickable
  math") used during reading and focusing (via a menu option).

* Voice the phrase "press H for help" when the math is first focused
  (but this can be turned off by a menu preference).


-----

.. toctree::
   :caption: More Information

   Accessibility extensions                <a11y-extensions>
   Available explorer keyboard commands    <explorer-commands>

|-----|
