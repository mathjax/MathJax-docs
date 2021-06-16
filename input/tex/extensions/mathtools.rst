.. _tex-mathtools:

#########
mathtools
#########


The `mathtools` extension implements the ``mathtools`` style package from
LaTeX. The package provides a number of tools for advanced mathematical
typesetting. See the `CTAN page <https://www.ctan.org/pkg/mathtools>`__ for
more information and documentation of `mathtools`.

This package is not autoloaded, so you must request it explicitly if you want to use it.
To load the `mathtools` extension, add ``'[tex]/mathtools'`` to the ``load`` array of the ``loader`` block of your
MathJax configuration, and add ``'mathtools'`` to the ``packages`` array of the ``tex`` block.


.. code-block:: javascript

   window.MathJax = {
     loader: {load: ['[tex]/mathtools']},
     tex: {packages: {'[+]': ['mathtools']}}
   };



Alternatively, use ``\require{mathtools}`` in a TeX expression to load it
dynamically from within the math on the page, if the `require`
extension is loaded.

-----


.. _tex-mathtools-options:


mathtools Options
-----------------

Adding the `mathtools` extension to the ``packages`` array defines an
``mathtools`` sub-block of the ``tex`` configuration block with the
following values:

.. code-block:: javascript

  MathJax = {
    tex: {
      mathtools: {
        multlinegap: '1em',
        multlined-pos: 'c',
        firstline-afterskip: '',
        lastline-preskip: '',
        smallmatrix-align: 'c',
        shortvdotsadjustabove: '.2em',
        shortvdotsadjustbelow: '.2em',
        centercolon: false,
        centercolon-offset: '.04em',
        thincolon-dx: '-.04em',
        thincolon-dw: '-.08em',
        use-unicode: false,
        prescript-sub-format: '',
        prescript-sup-format: '',
        prescript-arg-format: '',
        allow-mathtoolsset: true,
        pairedDelimiters: {},
        tagforms: {}
      }
    }
  };


.. _tex-mathtools-multlinegap:
.. describe:: multlinegap: '1em'

Horizontal space for multlined environments.

.. _tex-mathtools-multlined-pos:
.. describe:: multlined-pos: 'c'

Default alignment for multlined environments.

.. _tex-mathtools-firstline-afterskip:
.. describe:: firstline-afterskip: ''

Space for first line of multlined (overrides multlinegap).

.. _tex-mathtools-lastline-preskip:
.. describe:: lastline-preskip: ''

Space for last line of multlined (overrides multlinegap).

.. _tex-mathtools-smallmatrix-align:
.. describe:: smallmatrix-align: 'c'

Default alignment for smallmatrix environments.

.. _tex-mathtools-shortvdotsadjustabove:
.. describe:: shortvdotsadjustabove: '.2em'

Space to remove above ``\shortvdots``.

.. _tex-mathtools-shortvdotsadjustbelow:
.. describe:: shortvdotsadjustbelow: '.2em'

Space to remove below ``\shortvdots``.

.. _tex-mathtools-centercolon:
.. describe:: centercolon: false

True to have colon automatically centered.

.. _tex-mathtools-centercolon-offset:
.. describe:: centercolon-offset: '.04em'

Vertical adjustment for centered colons.

.. _tex-mathtools-thincolon-dx:
.. describe:: thincolon-dx: '-.04em'

Horizontal adjustment for thin colons (e.g., ``\coloneqq``).

.. _tex-mathtools-thincolon-dw:
.. describe:: thincolon-dw: '-.08em'

Width adjustment for thin colons.

.. _tex-mathtools-use-unicode:
.. describe:: use-unicode: false

True to use unicode characters rather than multi-character version for ``\coloneqq``, etc., when possible.

.. _tex-mathtools-prescript-sub-format:
.. describe:: prescript-sub-format: ''

Format for ``\prescript`` subscript.

.. _tex-mathtools-prescript-sup-format:
.. describe:: prescript-sup-format: ''

Format for ``\prescript`` superscript.

.. _tex-mathtools-prescript-arg-format:
.. describe:: prescript-arg-format: ''

Format for ``\prescript`` base.

.. _tex-mathtools-allow-mathtoolsset:
.. describe:: allow-mathtoolsset: true

True to allow ``\mathtoolsset`` to change settings.

.. _tex-mathtools-pairedDelimiters:
.. describe:: pairedDelimiters: {}

Predefined paired delimiters of the form ``name: [left, right, body, argcount, pre, post]``.

.. _tex-mathtools-tagforms:
.. describe:: tagforms: {}

Tag form definitions of the form ``name: [left, right, format]``.

-----


.. _tex-mathtools-commands:


mathtools Commands
------------------

The `mathtools` extension implements the following macros:
``\:``, ``\Aboxed``, ``\adjustlimits``, ``\ArrowBetweenLines``, ``\bigtimes``, ``\centercolon``, ``\clap``, ``\colonapprox``, ``\Colonapprox``, ``\coloneq``, ``\Coloneq``, ``\coloneqq``, ``\Coloneqq``, ``\colonsim``, ``\Colonsim``, ``\cramped``, ``\crampedclap``, ``\crampedllap``, ``\crampedrlap``, ``\crampedsubstack``, ``\dblcolon``, ``\DeclarePairedDelimiters``, ``\DeclarePairedDelimitersX``, ``\DeclarePairedDelimitersXPP``, ``\eqcolon``, ``\Eqcolon``, ``\eqqcolon``, ``\Eqqcolon``, ``\lparen``, ``\mathclap``, ``\mathllap``, ``\mathmakebox``, ``\mathmbox``, ``\mathrlap``, ``\mathtoolsset``, ``\MoveEqLeft``, ``\MTFlushSpaceAbove``, ``\MTFlushSpaceBelow``, ``\MTThinColon``, ``\ndownarrow``, ``\newtagform``, ``\nuparrow``, ``\ordinarycolon``, ``\overbracket``, ``\prescript``, ``\refeq``, ``\renewtagform``, ``\rparen``, ``\shortvdotswithin``, ``\shoveleft``, ``\shoveright``, ``\splitdfrac``, ``\splitfrac``, ``\textclap``, ``\textllap``, ``\textrlap``, ``\underbracket``, ``\usetagform``, ``\vdotswithin``, ``\xhookleftarrow``, ``\xhookrightarrow``, ``\xLeftarrow``, ``\xleftharpoondown``, ``\xleftharpoonup``, ``\xleftrightarrow``, ``\xLeftrightarrow``, ``\xleftrightharpoons``, ``\xmapsto``, ``\xmathstrut``, ``\xRightarrow``, ``\xrightharpoondown``, ``\xrightharpoonup``, ``\xrightleftharpoons``

And the following environments:
``bmatrix*``, ``Bmatrix*``, ``bsmallmatrix*``, ``Bsmallmatrix*``, ``bsmallmatrix``, ``Bsmallmatrix``, ``cases*``, ``crampedsubarray``, ``dcases*``, ``dcases``, ``drcases*``, ``drcases``, ``lgathered``, ``matrix*``, ``multlined``, ``pmatrix*``, ``psmallmatrix*``, ``psmallmatrix``, ``rcases*``, ``rcases``, ``rgathered``, ``smallmatrix*``, ``spreadlines``, ``vmatrix*``, ``Vmatrix*``, ``vsmallmatrix*``, ``Vsmallmatrix*``, ``vsmallmatrix``, ``Vsmallmatrix``


|-----|
