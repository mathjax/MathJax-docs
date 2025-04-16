.. _tex-commands:

############################
Supported TeX/LaTeX commands
############################

This is a long list of the TeX macros supported by MathJax.

Information about how to use LaTeX macros can be found on a variety of
websites, including:

* A basic tutorial is available on the `Mathematics StackExchange
  <https://math.meta.stackexchange.com/questions/5020/mathjax-basic-tutorial-and-quick-reference>`__.
  This is for v2, but the information mostly still applies to v3 and
  above, though it won't include the features that are new in later
  versions.

..

* More complete details, with examples and explanations, are available
  at Carol Fisher's `TeX Commands Available in MathJax
  <http://www.onemathematicalcat.org/MathJaxDocumentation/TeXSyntax.htm>`_
  page.  These were written for MathJax v2, but most of the
  information is still correct for v3 and above.

..

* The `LaTeX Wikibook <https://en.wikibooks.org/wiki/LaTeX>`__
  sections in `Mathematics
  <https://en.wikibooks.org/wiki/LaTeX/Advanced_Mathematics>`__ and
  `Advanced Mathematics
  <https://en.wikibooks.org/wiki/LaTeX/Advanced_Mathematics>`__ also
  have good information about using LaTeX, but remember that MathJax
  mostly deals with the math-mode macros, not text-mode layout, and
  this wikibook is about LaTeX in general, not about MathJax
  specifically.


In the following tables, the first column lists the macro (or
character, or environment), and the second column indicates which
package(s) defines the macro.  If none is listed, then it is in the
base package.  If the package name is in bold, then it is preloaded by
the components that include the TeX input jax (except for
``input/tex-base``, which only includes the base package).  If the
package name is in italics, then the package is autoloaded by the
:ref:`tex-autoload` extension, otherwise the extension must be loaded
explicitly in your configuration.  If a macro from the base package
is redefined by an extension, then **base** is included in the second
column along with the package name that redefines it.

Note that most macros are not processed inside text-mode material
(such as that within ``\text{}`` and other similar macros).  The
:ref:`tex-textmacros` extension makes additional macros available in
text mode, as listed in the documentation for that extension.  These
are marked here as being in the *text-base* package.


.. raw:: html

   <style>
   .wy-table-responsive table {width: 100%}
   .rst-content .wy-table-responsive table code.literal {background: inherit}
   </style>


Symbols
-------

.. list-table::
   :widths: 70 30

   * - ``_``
     - **base**, text-base
   * - ``.``
     -
   * - ``'``
     - **base**, text-base
   * - ``’``
     -
   * - ``(``
     - **base**, physics
   * - ``)``
     - **base**, physics
   * - ``[``
     - **base**, physics
   * - ``]``
     - **base**, physics
   * - ``{``
     - **base**, text-base
   * - ``}``
     - **base**, text-base
   * - ``@``
     - *amscd*
   * - ``/``
     -
   * - ``\``  (backslash-space)
     - **base**, text-base
   * - ``\_``
     - **base**, text-base
   * - ``\,``
     - **base**, text-base
   * - ``\;``
     - **base**, text-base
   * - ``\:``
     - **base**, mathtools, text-base
   * - ``\!``
     - **base**, text-base
   * - ``\.``
     - text-base
   * - ``\'``
     - text-base
   * - ``\‘``
     - text-base
   * - ``\’``
     - text-base
   * - ``\"``
     - text-base
   * - ``\(``
     - text-base
   * - ``\{``
     - **base**, text-base
   * - ``\}``
     - **base**, text-base
   * - ``\*``
     -
   * - ``\\``
     - **base**, text-base
   * - ``\&``
     - **base**, text-base
   * - ``\#``
     - **base**, text-base
   * - ``\%``
     - **base**, text-base
   * - ``\```
     - text-base
   * - ``\^``
     - text-base
   * - ``\=``
     - text-base
   * - ``\>``
     - **base**, text-base
   * - ``\|``
     - **base**, *braket*
   * - ``\~``
     - text-base
   * - ``\$``
     - **base**, text-base
   * - ``&``
     - **base**, cases, text-base
   * - ``#``
     - **base**, text-base
   * - ``%``
     - **base**, text-base
   * - :literal:`\``
     - text-base
   * - ``^``
     - **base**, text-base
   * - ``<``
     - **base**, texhtml
   * - ``>``
     -
   * - ``|``
     - **base**, *braket*, physics
   * - ``~``
     - **base**, text-base
   * - ``$``
     - text-base


A
-

.. list-table::
   :widths: 70 30

   * - ``\AA``
     - **base**, text-base
   * - ``\above``
     -
   * - ``\abovewithdelims``
     -
   * - ``\Aboxed``
     - mathtools
   * - ``\abs``
     - physics
   * - ``\absolutevalue``
     - physics
   * - ``\acomm``
     - physics
   * - ``\acos``
     - physics
   * - ``\acosecant``
     - physics
   * - ``\acosine``
     - physics
   * - ``\acot``
     - physics
   * - ``\acotangent``
     - physics
   * - ``\acsc``
     - physics
   * - ``\acute``
     -
   * - ``\adjustlimits``
     - mathtools
   * - ``\admat``
     - physics
   * - ``\aleph``
     -
   * - ``\allowbreak``
     -
   * - ``\alpha``
     -
   * - ``\alwaysDashedLine``
     - *bussproofs*
   * - ``\alwaysNoLine``
     - *bussproofs*
   * - ``\alwaysRootAtBottom``
     - *bussproofs*
   * - ``\alwaysRootAtTop``
     - *bussproofs*
   * - ``\alwaysSingleLine``
     - *bussproofs*
   * - ``\alwaysSolidLine``
     - *bussproofs*
   * - ``\amalg``
     -
   * - ``\And``
     -
   * - ``\angle``
     -
   * - ``\anticommutator``
     - physics
   * - ``\antidiagonalmatrix``
     - physics
   * - ``\approx``
     -
   * - ``\approxeq``
     - **ams**
   * - ``\arccos``
     - **base**, physics
   * - ``\arccosecant``
     - physics
   * - ``\arccosine``
     - physics
   * - ``\arccot``
     - physics
   * - ``\arccotangent``
     - physics
   * - ``\arccsc``
     - physics
   * - ``\arcsec``
     - physics
   * - ``\arcsecant``
     - physics
   * - ``\arcsin``
     - **base**, physics
   * - ``\arcsine``
     - physics
   * - ``\arctan``
     - **base**, physics
   * - ``\arctangent``
     - physics
   * - ``\arg``
     -
   * - ``\array``
     -
   * - ``\ArrowBetweenLines``
     - mathtools
   * - ``\arrowvert``
     -
   * - ``\Arrowvert``
     -
   * - ``\asec``
     - physics
   * - ``\asecant``
     - physics
   * - ``\asin``
     - physics
   * - ``\asine``
     - physics
   * - ``\ast``
     -
   * - ``\asymp``
     -
   * - ``\atan``
     - physics
   * - ``\atangent``
     - physics
   * - ``\atop``
     -
   * - ``\atopwithdelims``
     -
   * - ``\AXC``
     - *bussproofs*
   * - ``\Axiom``
     - *bussproofs*
   * - ``\AxiomC``
     - *bussproofs*


B
-

.. list-table::
   :widths: 70 30

   * - ``\backepsilon``
     - **ams**
   * - ``\backprime``
     - **ams**
   * - ``\backsim``
     - **ams**
   * - ``\backsimeq``
     - **ams**
   * - ``\backslash``
     -
   * - ``\badbreak``
     -
   * - ``\bar``
     -
   * - ``\barwedge``
     - **ams**
   * - ``\bbalpha``
     - bboldx
   * - ``\Bbb``
     - **base**, text-base
   * - ``\bbbeta``
     - bboldx
   * - ``\Bbbk``
     - **ams**
   * - ``\bbchi``
     - bboldx
   * - ``\bbDelta``
     - bboldx
   * - ``\bbdelta``
     - bboldx
   * - ``\bbdotlessi``
     - bboldx
   * - ``\bbdotlessj``
     - bboldx
   * - ``\bbepsilon``
     - bboldx
   * - ``\bbeta``
     - bboldx
   * - ``\bbGamma``
     - bboldx
   * - ``\bbgamma``
     - bboldx
   * - ``\bbiota``
     - bboldx
   * - ``\bbkappa``
     - bboldx
   * - ``\bbLambda``
     - bboldx
   * - ``\bblambda``
     - bboldx
   * - ``\bbLangle``
     - bboldx
   * - ``\bbLbrack``
     - bboldx
   * - ``\bbLparen``
     - bboldx
   * - ``\bbmu``
     - bboldx
   * - ``\bbnu``
     - bboldx
   * - ``\bbOmega``
     - bboldx
   * - ``\bbomega``
     - bboldx
   * - ``\bbox``
     - *bbox*
   * - ``\bbPhi``
     - bboldx
   * - ``\bbphi``
     - bboldx
   * - ``\bbPi``
     - bboldx
   * - ``\bbpi``
     - bboldx
   * - ``\bbPsi``
     - bboldx
   * - ``\bbpsi``
     - bboldx
   * - ``\bbRangle``
     - bboldx
   * - ``\bbRbrack``
     - bboldx
   * - ``\bbrho``
     - bboldx
   * - ``\bbRparen``
     - bboldx
   * - ``\bbSigma``
     - bboldx
   * - ``\bbsigma``
     - bboldx
   * - ``\bbtau``
     - bboldx
   * - ``\bbTheta``
     - bboldx
   * - ``\bbtheta``
     - bboldx
   * - ``\bbUpsilon``
     - bboldx
   * - ``\bbupsilon``
     - bboldx
   * - ``\bbXi``
     - bboldx
   * - ``\bbxi``
     - bboldx
   * - ``\bbzeta``
     - bboldx
   * - ``\bcancel``
     - *cancel*
   * - ``\because``
     - **ams**
   * - ``\begin``
     -
   * - ``\beta``
     -
   * - ``\beth``
     - **ams**
   * - ``\between``
     - **ams**
   * - ``\bf``
     - **base**, text-base
   * - ``\bfbbalpha``
     - bboldx
   * - ``\bfbbbeta``
     - bboldx
   * - ``\bfbbchi``
     - bboldx
   * - ``\bfbbDelta``
     - bboldx
   * - ``\bfbbdelta``
     - bboldx
   * - ``\bfbbdotlessi``
     - bboldx
   * - ``\bfbbdotlessj``
     - bboldx
   * - ``\bfbbepsilon``
     - bboldx
   * - ``\bfbbeta``
     - bboldx
   * - ``\bfbbGamma``
     - bboldx
   * - ``\bfbbgamma``
     - bboldx
   * - ``\bfbbiota``
     - bboldx
   * - ``\bfbbkappa``
     - bboldx
   * - ``\bfbbLambda``
     - bboldx
   * - ``\bfbblambda``
     - bboldx
   * - ``\bfbbLangle``
     - bboldx
   * - ``\bfbbLbrack``
     - bboldx
   * - ``\bfbbLparen``
     - bboldx
   * - ``\bfbbmu``
     - bboldx
   * - ``\bfbbnu``
     - bboldx
   * - ``\bfbbOmega``
     - bboldx
   * - ``\bfbbomega``
     - bboldx
   * - ``\bfbbPhi``
     - bboldx
   * - ``\bfbbphi``
     - bboldx
   * - ``\bfbbPi``
     - bboldx
   * - ``\bfbbpi``
     - bboldx
   * - ``\bfbbPsi``
     - bboldx
   * - ``\bfbbpsi``
     - bboldx
   * - ``\bfbbRangle``
     - bboldx
   * - ``\bfbbRbrack``
     - bboldx
   * - ``\bfbbrho``
     - bboldx
   * - ``\bfbbRparen``
     - bboldx
   * - ``\bfbbSigma``
     - bboldx
   * - ``\bfbbsigma``
     - bboldx
   * - ``\bfbbtau``
     - bboldx
   * - ``\bfbbTheta``
     - bboldx
   * - ``\bfbbtheta``
     - bboldx
   * - ``\bfbbUpsilon``
     - bboldx
   * - ``\bfbbupsilon``
     - bboldx
   * - ``\bfbbXi``
     - bboldx
   * - ``\bfbbxi``
     - bboldx
   * - ``\bfbbzeta``
     - bboldx
   * - ``\BIC``
     - *bussproofs*
   * - ``\big``
     -
   * - ``\Big``
     -
   * - ``\bigcap``
     -
   * - ``\bigcirc``
     -
   * - ``\bigcup``
     -
   * - ``\bigg``
     -
   * - ``\Bigg``
     -
   * - ``\biggl``
     -
   * - ``\Biggl``
     -
   * - ``\biggm``
     -
   * - ``\Biggm``
     -
   * - ``\biggr``
     -
   * - ``\Biggr``
     -
   * - ``\bigl``
     -
   * - ``\Bigl``
     -
   * - ``\bigm``
     -
   * - ``\Bigm``
     -
   * - ``\bigodot``
     -
   * - ``\bigoplus``
     -
   * - ``\bigotimes``
     -
   * - ``\bigr``
     -
   * - ``\Bigr``
     -
   * - ``\bigsqcup``
     -
   * - ``\bigstar``
     - **ams**
   * - ``\bigtimes``
     - mathtools
   * - ``\bigtriangledown``
     -
   * - ``\bigtriangleup``
     -
   * - ``\biguplus``
     -
   * - ``\bigvee``
     -
   * - ``\bigwedge``
     -
   * - ``\BinaryInf``
     - *bussproofs*
   * - ``\BinaryInfC``
     - *bussproofs*
   * - ``\binom``
     - **ams**
   * - ``\blacklozenge``
     - **ams**
   * - ``\blacksquare``
     - **ams**
   * - ``\blacktriangle``
     - **ams**
   * - ``\blacktriangledown``
     - **ams**
   * - ``\blacktriangleleft``
     - **ams**
   * - ``\blacktriangleright``
     - **ams**
   * - ``\bmod``
     -
   * - ``\bmqty``
     - physics
   * - ``\boldsymbol``
     - *boldsymbol*
   * - ``\bot``
     -
   * - ``\bowtie``
     -
   * - ``\Box``
     - **ams**
   * - ``\boxdot``
     - **ams**
   * - ``\boxed``
     - **base**, **ams**
   * - ``\boxminus``
     - **ams**
   * - ``\boxplus``
     - **ams**
   * - ``\boxtimes``
     - **ams**
   * - ``\bqty``
     - physics
   * - ``\Bqty``
     - physics
   * - ``\bra``
     - *braket*, physics
   * - ``\Bra``
     - *braket*
   * - ``\brace``
     -
   * - ``\bracevert``
     -
   * - ``\brack``
     -
   * - ``\braket``
     - *braket*, physics
   * - ``\Braket``
     - *braket*
   * - ``\break``
     -
   * - ``\breakAlign``
     -
   * - ``\breve``
     -
   * - ``\buildrel``
     -
   * - ``\bullet``
     -
   * - ``\bumpeq``
     - **ams**
   * - ``\Bumpeq``
     - **ams**


C
-

.. list-table::
   :widths: 70 30

   * - ``\cal``
     - **base**, text-base
   * - ``\cancel``
     - *cancel*
   * - ``\cancelto``
     - *cancel*
   * - ``\cap``
     -
   * - ``\Cap``
     - **ams**
   * - ``\cases``
     -
   * - ``\cdot``
     -
   * - ``\cdotp``
     -
   * - ``\cdots``
     -
   * - ``\ce``
     - *mhchem*
   * - ``\cellcolor``
     - colortbl
   * - ``\celsius``
     - gensymb
   * - ``\centercolon``
     - mathtools
   * - ``\centerdot``
     - **ams**
   * - ``\centernot``
     - centernot
   * - ``\centerOver``
     - centernot
   * - ``\cfrac``
     - **ams**
   * - ``\char``
     - *unicode*, text-base
   * - ``\check``
     -
   * - ``\checkmark``
     - **ams**
   * - ``\chi``
     -
   * - ``\choose``
     -
   * - ``\circ``
     -
   * - ``\circeq``
     - **ams**
   * - ``\circlearrowleft``
     - **ams**
   * - ``\circlearrowright``
     - **ams**
   * - ``\circledast``
     - **ams**
   * - ``\circledcirc``
     - **ams**
   * - ``\circleddash``
     - **ams**
   * - ``\circledR``
     - **ams**
   * - ``\circledS``
     - **ams**
   * - ``\clap``
     - mathtools
   * - ``\class``
     - *html*, text-base
   * - ``\clubsuit``
     -
   * - ``\colon``
     -
   * - ``\colonapprox``
     - mathtools
   * - ``\Colonapprox``
     - mathtools
   * - ``\coloneq``
     - mathtools
   * - ``\Coloneq``
     - mathtools
   * - ``\coloneqq``
     - mathtools
   * - ``\Coloneqq``
     - mathtools
   * - ``\colonsim``
     - mathtools
   * - ``\Colonsim``
     - mathtools
   * - ``\color``
     - *color*, colorv2, text-base
   * - ``\colorbox``
     - *color*, text-base
   * - ``\columncolor``
     - colortbl
   * - ``\comm``
     - physics
   * - ``\commutator``
     - physics
   * - ``\complement``
     - **ams**
   * - ``\cong``
     -
   * - ``\coprod``
     -
   * - ``\cos``
     - **base**, physics
   * - ``\cosecant``
     - physics
   * - ``\cosh``
     - **base**, physics
   * - ``\cosine``
     - physics
   * - ``\cot``
     - **base**, physics
   * - ``\cotangent``
     - physics
   * - ``\coth``
     - **base**, physics
   * - ``\cp``
     - physics
   * - ``\cr``
     -
   * - ``\cramped``
     - mathtools
   * - ``\crampedclap``
     - mathtools
   * - ``\crampedllap``
     - mathtools
   * - ``\crampedrlap``
     - mathtools
   * - ``\crampedsubstack``
     - mathtools
   * - ``\cross``
     - physics
   * - ``\crossproduct``
     - physics
   * - ``\csc``
     - **base**, physics
   * - ``\csch``
     - physics
   * - ``\cssId``
     - *html*, text-base
   * - ``\cup``
     -
   * - ``\Cup``
     - **ams**
   * - ``\curl``
     - physics
   * - ``\curlyeqprec``
     - **ams**
   * - ``\curlyeqsucc``
     - **ams**
   * - ``\curlyvee``
     - **ams**
   * - ``\curlywedge``
     - **ams**
   * - ``\curvearrowleft``
     - **ams**
   * - ``\curvearrowright``
     - **ams**


D
-

.. list-table::
   :widths: 70 30

   * - ``\dagger``
     - **base**, text-base
   * - ``\daleth``
     - **ams**
   * - ``\dashedLine``
     - *bussproofs*
   * - ``\dashleftarrow``
     - **ams**
   * - ``\dashrightarrow``
     - **ams**
   * - ``\dashv``
     -
   * - ``\data``
     - *html*, text-base
   * - ``\dbinom``
     - **ams**
   * - ``\dblcolon``
     - mathtools
   * - ``\dd``
     - physics
   * - ``\ddagger``
     - **base**, text-base
   * - ``\ddddot``
     - **base**, **ams**
   * - ``\dddot``
     - **base**, **ams**
   * - ``\ddot``
     -
   * - ``\ddots``
     -
   * - ``\DeclareMathOperator``
     - **ams**
   * - ``\DeclarePairedDelimiter``
     - mathtools
   * - ``\DeclarePairedDelimiterX``
     - mathtools
   * - ``\DeclarePairedDelimiterXPP``
     - mathtools
   * - ``\def``
     - **newcommand**
   * - ``\definecolor``
     - *color*
   * - ``\deg``
     -
   * - ``\degree``
     - gensymb
   * - ``\delta``
     -
   * - ``\Delta``
     -
   * - ``\derivative``
     - physics
   * - ``\det``
     - **base**, physics
   * - ``\determinant``
     - physics
   * - ``\dfrac``
     - **ams**
   * - ``\diagdown``
     - **ams**
   * - ``\diagonalmatrix``
     - physics
   * - ``\diagup``
     - **ams**
   * - ``\diamond``
     -
   * - ``\Diamond``
     - **ams**
   * - ``\diamondsuit``
     -
   * - ``\diffd``
     - physics
   * - ``\differential``
     - physics
   * - ``\digamma``
     - **ams**
   * - ``\dim``
     -
   * - ``\displaylines``
     -
   * - ``\displaystyle``
     -
   * - ``\div``
     - **base**, physics
   * - ``\divergence``
     - physics
   * - ``\divideontimes``
     - **ams**
   * - ``\divisionsymbol``
     - physics
   * - ``\divsymbol``
     - physics
   * - ``\dmat``
     - physics
   * - ``\dot``
     -
   * - ``\doteq``
     -
   * - ``\Doteq``
     - **ams**
   * - ``\doteqdot``
     - **ams**
   * - ``\dotplus``
     - **ams**
   * - ``\dotproduct``
     - physics
   * - ``\dots``
     -
   * - ``\dotsb``
     -
   * - ``\dotsc``
     -
   * - ``\dotsi``
     -
   * - ``\dotsm``
     -
   * - ``\dotso``
     -
   * - ``\doublebarwedge``
     - **ams**
   * - ``\doublecap``
     - **ams**
   * - ``\doublecup``
     - **ams**
   * - ``\downarrow``
     -
   * - ``\Downarrow``
     -
   * - ``\downdownarrows``
     - **ams**
   * - ``\downharpoonleft``
     - **ams**
   * - ``\downharpoonright``
     - **ams**
   * - ``\dv``
     - physics
   * - ``\dyad``
     - physics


E
-

.. list-table::
   :widths: 70 30

   * - ``\ell``
     -
   * - ``\emph``
     - text-base
   * - ``\empheqbigl``
     - empheq
   * - ``\empheqbiglangle``
     - empheq
   * - ``\empheqbiglbrace``
     - empheq
   * - ``\empheqbiglbrack``
     - empheq
   * - ``\empheqbiglceil``
     - empheq
   * - ``\empheqbiglfloor``
     - empheq
   * - ``\empheqbiglparen``
     - empheq
   * - ``\empheqbiglvert``
     - empheq
   * - ``\empheqbiglVert``
     - empheq
   * - ``\empheqbigr``
     - empheq
   * - ``\empheqbigrangle``
     - empheq
   * - ``\empheqbigrbrace``
     - empheq
   * - ``\empheqbigrbrack``
     - empheq
   * - ``\empheqbigrceil``
     - empheq
   * - ``\empheqbigrfloor``
     - empheq
   * - ``\empheqbigrparen``
     - empheq
   * - ``\empheqbigrvert``
     - empheq
   * - ``\empheqbigrVert``
     - empheq
   * - ``\empheql``
     - empheq
   * - ``\empheqlangle``
     - empheq
   * - ``\empheqlbrace``
     - empheq
   * - ``\empheqlbrack``
     - empheq
   * - ``\empheqlceil``
     - empheq
   * - ``\empheqlfloor``
     - empheq
   * - ``\empheqlparen``
     - empheq
   * - ``\empheqlvert``
     - empheq
   * - ``\empheqlVert``
     - empheq
   * - ``\empheqr``
     - empheq
   * - ``\empheqrangle``
     - empheq
   * - ``\empheqrbrace``
     - empheq
   * - ``\empheqrbrack``
     - empheq
   * - ``\empheqrceil``
     - empheq
   * - ``\empheqrfloor``
     - empheq
   * - ``\empheqrparen``
     - empheq
   * - ``\empheqrvert``
     - empheq
   * - ``\empheqrVert``
     - empheq
   * - ``\emptyset``
     -
   * - ``\enclose``
     - *enclose*
   * - ``\end``
     -
   * - ``\enspace``
     - **base**, text-base
   * - ``\epsilon``
     -
   * - ``\eqalign``
     -
   * - ``\eqalignno``
     -
   * - ``\eqcirc``
     - **ams**
   * - ``\eqcolon``
     - mathtools
   * - ``\Eqcolon``
     - mathtools
   * - ``\eqqcolon``
     - mathtools
   * - ``\Eqqcolon``
     - mathtools
   * - ``\eqref``
     - **ams**, text-base
   * - ``\eqsim``
     - **ams**
   * - ``\eqslantgtr``
     - **ams**
   * - ``\eqslantless``
     - **ams**
   * - ``\equiv``
     -
   * - ``\erf``
     - physics
   * - ``\eta``
     -
   * - ``\eth``
     - **ams**
   * - ``\ev``
     - physics
   * - ``\eval``
     - physics
   * - ``\evaluated``
     - physics
   * - ``\exists``
     -
   * - ``\exp``
     - **base**, physics
   * - ``\expectationvalue``
     - physics
   * - ``\exponential``
     - physics
   * - ``\expval``
     - physics


F
-

.. list-table::
   :widths: 70 30

   * - ``\fallingdotseq``
     - **ams**
   * - ``\fbox``
     -
   * - ``\fCenter``
     - *bussproofs*
   * - ``\fcolorbox``
     - *color*, text-base
   * - ``\fderivative``
     - physics
   * - ``\fdv``
     - physics
   * - ``\Finv``
     - **ams**
   * - ``\flat``
     -
   * - ``\flatfrac``
     - physics
   * - ``\forall``
     -
   * - ``\frac``
     - **base**, **ams**
   * - ``\frak``
     - **base**, text-base
   * - ``\framebox``
     -
   * - ``\frown``
     -
   * - ``\functionalderivative``
     - physics


G
-

.. list-table::
   :widths: 70 30

   * - ``\Game``
     - **ams**
   * - ``\gamma``
     -
   * - ``\Gamma``
     -
   * - ``\gcd``
     -
   * - ``\ge``
     -
   * - ``\genfrac``
     - **ams**
   * - ``\geq``
     -
   * - ``\geqq``
     - **ams**
   * - ``\geqslant``
     - **ams**
   * - ``\gets``
     -
   * - ``\gg``
     -
   * - ``\ggg``
     - **ams**
   * - ``\gggtr``
     - **ams**
   * - ``\gimel``
     - **ams**
   * - ``\gnapprox``
     - **ams**
   * - ``\gneq``
     - **ams**
   * - ``\gneqq``
     - **ams**
   * - ``\gnsim``
     - **ams**
   * - ``\goodbreak``
     -
   * - ``\grad``
     - physics
   * - ``\gradient``
     - physics
   * - ``\gradientnabla``
     - physics
   * - ``\grave``
     -
   * - ``\gt``
     -
   * - ``\gtrapprox``
     - **ams**
   * - ``\gtrdot``
     - **ams**
   * - ``\gtreqless``
     - **ams**
   * - ``\gtreqqless``
     - **ams**
   * - ``\gtrless``
     - **ams**
   * - ``\gtrsim``
     - **ams**
   * - ``\gvertneqq``
     - **ams**


H
-

.. list-table::
   :widths: 70 30

   * - ``\hat``
     -
   * - ``\hbar``
     -
   * - ``\hbox``
     -
   * - ``\hdashline``
     -
   * - ``\heartsuit``
     -
   * - ``\hfil``
     -
   * - ``\hfill``
     -
   * - ``\hfilll``
     -
   * - ``\hline``
     -
   * - ``\hom``
     -
   * - ``\hookleftarrow``
     -
   * - ``\hookrightarrow``
     -
   * - ``\hphantom``
     - **base**, text-base
   * - ``\href``
     - *html*, text-base
   * - ``\hsize``
     -
   * - ``\hskip``
     - **base**, text-base
   * - ``\hslash``
     - **ams**
   * - ``\hspace``
     - **base**, text-base
   * - ``\huge``
     - **base**, text-base
   * - ``\Huge``
     - **base**, text-base
   * - ``\hypcosecant``
     - physics
   * - ``\hypcosine``
     - physics
   * - ``\hypcotangent``
     - physics
   * - ``\hypsecant``
     - physics
   * - ``\hypsine``
     - physics
   * - ``\hyptangent``
     - physics


I
-

.. list-table::
   :widths: 70 30

   * - ``\iddots``
     -
   * - ``\identitymatrix``
     - physics
   * - ``\idotsint``
     - **ams**
   * - ``\iff``
     -
   * - ``\iiiint``
     - **ams**
   * - ``\iiint``
     -
   * - ``\iint``
     -
   * - ``\Im``
     - **base**, physics
   * - ``\imaginary``
     - physics
   * - ``\imat``
     - physics
   * - ``\imath``
     -
   * - ``\imathbb``
     - bboldx
   * - ``\imathbfbb``
     - bboldx
   * - ``\impliedby``
     - **ams**
   * - ``\implies``
     - **ams**
   * - ``\in``
     -
   * - ``\inf``
     -
   * - ``\infty``
     -
   * - ``\injlim``
     - **ams**
   * - ``\innerproduct``
     - physics
   * - ``\int``
     -
   * - ``\intercal``
     - **ams**
   * - ``\intop``
     -
   * - ``\iota``
     -
   * - ``\ip``
     - physics
   * - ``\it``
     - **base**, text-base
   * - ``\itextbb``
     - text-bboldx
   * - ``\itextbfbb``
     - text-bboldx


J
-

.. list-table::
   :widths: 70 30

   * - ``\jmath``
     -
   * - ``\jmathbb``
     - bboldx
   * - ``\jmathbfbb``
     - bboldx
   * - ``\Join``
     - **ams**
   * - ``\jtextbb``
     - text-bboldx
   * - ``\jtextbfbb``
     - text-bboldx


K
-

.. list-table::
   :widths: 70 30

   * - ``\kappa``
     -
   * - ``\ker``
     -
   * - ``\kern``
     - **base**, text-base
   * - ``\ket``
     - *braket*, physics
   * - ``\Ket``
     - *braket*
   * - ``\ketbra``
     - *braket*, physics
   * - ``\Ketbra``
     - *braket*


L
-

.. list-table::
   :widths: 70 30

   * - ``\label``
     -
   * - ``\lambda``
     -
   * - ``\Lambda``
     -
   * - ``\land``
     -
   * - ``\langle``
     -
   * - ``\laplacian``
     - physics
   * - ``\large``
     - **base**, text-base
   * - ``\Large``
     - **base**, text-base
   * - ``\LARGE``
     - **base**, text-base
   * - ``\LaTeX``
     -
   * - ``\lbrace``
     -
   * - ``\lbrack``
     -
   * - ``\lceil``
     -
   * - ``\ldotp``
     -
   * - ``\ldots``
     - **base**, text-base
   * - ``\le``
     -
   * - ``\leadsto``
     - **ams**
   * - ``\left``
     -
   * - ``\Leftarrow``
     -
   * - ``\leftarrow``
     -
   * - ``\leftarrowtail``
     - **ams**
   * - ``\leftharpoondown``
     -
   * - ``\leftharpoonup``
     -
   * - ``\LeftLabel``
     - *bussproofs*
   * - ``\leftleftarrows``
     - **ams**
   * - ``\Leftrightarrow``
     -
   * - ``\leftrightarrow``
     -
   * - ``\leftrightarrows``
     - **ams**
   * - ``\leftrightharpoons``
     - **ams**
   * - ``\leftrightsquigarrow``
     - **ams**
   * - ``\leftroot``
     -
   * - ``\leftthreetimes``
     - **ams**
   * - ``\leq``
     -
   * - ``\leqalignno``
     -
   * - ``\leqq``
     - **ams**
   * - ``\leqslant``
     - **ams**
   * - ``\lessapprox``
     - **ams**
   * - ``\lessdot``
     - **ams**
   * - ``\lesseqgtr``
     - **ams**
   * - ``\lesseqqgtr``
     - **ams**
   * - ``\lessgtr``
     - **ams**
   * - ``\lesssim``
     - **ams**
   * - ``\let``
     - **newcommand**
   * - ``\lfloor``
     -
   * - ``\lg``
     -
   * - ``\lgroup``
     -
   * - ``\lhd``
     - **ams**
   * - ``\lim``
     -
   * - ``\liminf``
     -
   * - ``\limits``
     -
   * - ``\limsup``
     -
   * - ``\ll``
     -
   * - ``\LL``
     - *bussproofs*
   * - ``\llap``
     - **base**, text-base
   * - ``\llcorner``
     - **ams**
   * - ``\Lleftarrow``
     - **ams**
   * - ``\lll``
     - **ams**
   * - ``\llless``
     - **ams**
   * - ``\lmoustache``
     -
   * - ``\ln``
     - **base**, physics
   * - ``\lnapprox``
     - **ams**
   * - ``\lneq``
     - **ams**
   * - ``\lneqq``
     - **ams**
   * - ``\lnot``
     -
   * - ``\lnsim``
     - **ams**
   * - ``\log``
     - **base**, physics
   * - ``\logarithm``
     - physics
   * - ``\longleftarrow``
     -
   * - ``\Longleftarrow``
     -
   * - ``\Longleftrightarrow``
     -
   * - ``\longleftrightarrow``
     -
   * - ``\longleftrightarrows``
     - *mhchem*
   * - ``\longLeftrightharpoons``
     - *mhchem*
   * - ``\longmapsto``
     -
   * - ``\longrightarrow``
     -
   * - ``\Longrightarrow``
     -
   * - ``\longrightleftharpoons``
     - *mhchem*
   * - ``\longRightleftharpoons``
     - *mhchem*
   * - ``\looparrowleft``
     - **ams**
   * - ``\looparrowright``
     - **ams**
   * - ``\lor``
     -
   * - ``\lower``
     -
   * - ``\lozenge``
     - **ams**
   * - ``\lparen``
     - mathtools
   * - ``\lrcorner``
     - **ams**
   * - ``\Lsh``
     - **ams**
   * - ``\lt``
     -
   * - ``\ltimes``
     - **ams**
   * - ``\lvert``
     - **ams**
   * - ``\lVert``
     - **ams**
   * - ``\lvertneqq``
     - **ams**


M
-

.. list-table::
   :widths: 70 30

   * - ``\makebox``
     -
   * - ``\maltese``
     - **ams**
   * - ``\mapsto``
     -
   * - ``\mathbb``
     - **base**, bboldx
   * - ``\mathbbm``
     - bbm
   * - ``\mathbbmss``
     - bbm
   * - ``\mathbbmtt``
     - bbm
   * - ``\mathbf``
     -
   * - ``\mathbfbb``
     - bboldx
   * - ``\mathbfcal``
     -
   * - ``\mathbffrak``
     -
   * - ``\mathbfit``
     -
   * - ``\mathbfscr``
     -
   * - ``\mathbfsf``
     -
   * - ``\mathbfsfit``
     -
   * - ``\mathbfsfup``
     -
   * - ``\mathbfup``
     -
   * - ``\mathbin``
     -
   * - ``\mathcal``
     -
   * - ``\mathchoice``
     -
   * - ``\mathclap``
     - mathtools
   * - ``\mathclose``
     -
   * - ``\mathds``
     - dsfont
   * - ``\mathfrak``
     -
   * - ``\mathinner``
     -
   * - ``\mathit``
     -
   * - ``\mathllap``
     - mathtools
   * - ``\mathmakebox``
     - mathtools
   * - ``\mathmbox``
     - mathtools
   * - ``\mathnormal``
     -
   * - ``\mathop``
     -
   * - ``\mathopen``
     -
   * - ``\mathord``
     -
   * - ``\mathpunct``
     -
   * - ``\mathrel``
     -
   * - ``\mathring``
     - **ams**
   * - ``\mathrlap``
     - mathtools
   * - ``\mathrm``
     -
   * - ``\mathscr``
     -
   * - ``\mathsf``
     -
   * - ``\mathsfit``
     -
   * - ``\mathsfup``
     -
   * - ``\mathstrut``
     -
   * - ``\mathtip``
     - *action*
   * - ``\mathtoolsset``
     - mathtools
   * - ``\mathtt``
     -
   * - ``\mathup``
     -
   * - ``\mathversion``
     - bbm
   * - ``\matrix``
     -
   * - ``\matrixdeterminant``
     - physics
   * - ``\matrixel``
     - physics
   * - ``\matrixelement``
     - physics
   * - ``\matrixquantity``
     - physics
   * - ``\max``
     -
   * - ``\mbox``
     -
   * - ``\mdet``
     - physics
   * - ``\measuredangle``
     - **ams**
   * - ``\mel``
     - physics
   * - ``\mho``
     - **ams**
   * - ``\micro``
     - gensymb
   * - ``\mid``
     -
   * - ``\middle``
     -
   * - ``\min``
     -
   * - ``\minCDarrowheight``
     - *amscd*
   * - ``\minCDarrowwidth``
     - *amscd*
   * - ``\mit``
     - **base**, text-base
   * - ``\mkern``
     - **base**, text-base
   * - ``\mmlToken``
     - **base**, text-base
   * - ``\mod``
     -
   * - ``\models``
     -
   * - ``\MoveEqLeft``
     - mathtools
   * - ``\moveleft``
     -
   * - ``\moveright``
     -
   * - ``\mp``
     -
   * - ``\mqty``
     - physics
   * - ``\mskip``
     - **base**, text-base
   * - ``\mspace``
     - **base**, text-base
   * - ``\MTFlushSpaceAbove``
     - mathtools
   * - ``\MTFlushSpaceBelow``
     - mathtools
   * - ``\MTThinColon``
     - mathtools
   * - ``\mu``
     -
   * - ``\multimap``
     - **ams**


N
-

.. list-table::
   :widths: 70 30

   * - ``\nabla``
     -
   * - ``\natural``
     -
   * - ``\naturallogarithm``
     - physics
   * - ``\ncong``
     - **ams**
   * - ``\ndownarrow``
     - mathtools
   * - ``\ne``
     -
   * - ``\nearrow``
     -
   * - ``\neg``
     -
   * - ``\negmedspace``
     - **ams**
   * - ``\negthickspace``
     - **ams**
   * - ``\negthinspace``
     - **base**, text-base
   * - ``\neq``
     -
   * - ``\newcolumntype``
     -
   * - ``\newcommand``
     - **newcommand**
   * - ``\newenvironment``
     - **newcommand**
   * - ``\Newextarrow``
     - *extpfeil*
   * - ``\newline``
     -
   * - ``\newtagform``
     - mathtools
   * - ``\nexists``
     - **ams**
   * - ``\ngeq``
     - **ams**
   * - ``\ngeqq``
     - **ams**
   * - ``\ngeqslant``
     - **ams**
   * - ``\ngtr``
     - **ams**
   * - ``\ni``
     -
   * - ``\nicefrac``
     - units
   * - ``\nleftarrow``
     - **ams**
   * - ``\nLeftarrow``
     - **ams**
   * - ``\nleftrightarrow``
     - **ams**
   * - ``\nLeftrightarrow``
     - **ams**
   * - ``\nleq``
     - **ams**
   * - ``\nleqq``
     - **ams**
   * - ``\nleqslant``
     - **ams**
   * - ``\nless``
     - **ams**
   * - ``\nmid``
     - **ams**
   * - ``\nobreak``
     -
   * - ``\nobreakspace``
     - **ams**
   * - ``\nolimits``
     -
   * - ``\noLine``
     - *bussproofs*
   * - ``\nonscript``
     -
   * - ``\nonumber``
     -
   * - ``\norm``
     - physics
   * - ``\normalsize``
     - **base**, text-base
   * - ``\not``
     -
   * - ``\notag``
     - **ams**
   * - ``\notChar``
     -
   * - ``\notin``
     -
   * - ``\nparallel``
     - **ams**
   * - ``\nprec``
     - **ams**
   * - ``\npreceq``
     - **ams**
   * - ``\nrightarrow``
     - **ams**
   * - ``\nRightarrow``
     - **ams**
   * - ``\nshortmid``
     - **ams**
   * - ``\nshortparallel``
     - **ams**
   * - ``\nsim``
     - **ams**
   * - ``\nsubseteq``
     - **ams**
   * - ``\nsubseteqq``
     - **ams**
   * - ``\nsucc``
     - **ams**
   * - ``\nsucceq``
     - **ams**
   * - ``\nsupseteq``
     - **ams**
   * - ``\nsupseteqq``
     - **ams**
   * - ``\ntriangleleft``
     - **ams**
   * - ``\ntrianglelefteq``
     - **ams**
   * - ``\ntriangleright``
     - **ams**
   * - ``\ntrianglerighteq``
     - **ams**
   * - ``\nu``
     -
   * - ``\nuparrow``
     - mathtools
   * - ``\nvdash``
     - **ams**
   * - ``\nvDash``
     - **ams**
   * - ``\nVdash``
     - **ams**
   * - ``\nVDash``
     - **ams**
   * - ``\nwarrow``
     -


O
-

.. list-table::
   :widths: 70 30

   * - ``\odot``
     -
   * - ``\ohm``
     - gensymb
   * - ``\oiiint``
     -
   * - ``\oiint``
     -
   * - ``\oint``
     -
   * - ``\ointop``
     -
   * - ``\oldstyle``
     - **base**, text-base
   * - ``\omega``
     -
   * - ``\Omega``
     -
   * - ``\omicron``
     -
   * - ``\ominus``
     -
   * - ``\op``
     - physics
   * - ``\operatorname``
     - **ams**
   * - ``\oplus``
     -
   * - ``\order``
     - physics
   * - ``\ordinarycolon``
     - mathtools
   * - ``\oslash``
     -
   * - ``\otimes``
     -
   * - ``\outerproduct``
     - physics
   * - ``\over``
     -
   * - ``\overbrace``
     -
   * - ``\overbracket``
     - mathtools
   * - ``\overleftarrow``
     -
   * - ``\overleftrightarrow``
     -
   * - ``\overline``
     -
   * - ``\overparen``
     -
   * - ``\overrightarrow``
     -
   * - ``\overset``
     -
   * - ``\overunderset``
     -
   * - ``\overwithdelims``
     -
   * - ``\owns``
     -


P
-

.. list-table::
   :widths: 70 30

   * - ``\parallel``
     -
   * - ``\parbox``
     -
   * - ``\partial``
     -
   * - ``\partialderivative``
     - physics
   * - ``\paulimatrix``
     - physics
   * - ``\pb``
     - physics
   * - ``\pderivative``
     - physics
   * - ``\pdv``
     - physics
   * - ``\perp``
     -
   * - ``\perthousand``
     - gensymb
   * - ``\phantom``
     - **base**, text-base
   * - ``\phi``
     -
   * - ``\Phi``
     -
   * - ``\pi``
     -
   * - ``\Pi``
     -
   * - ``\pitchfork``
     - **ams**
   * - ``\pm``
     -
   * - ``\pmat``
     - physics
   * - ``\pmatrix``
     -
   * - ``\pmb``
     -
   * - ``\pmod``
     -
   * - ``\pmqty``
     - physics
   * - ``\Pmqty``
     - physics
   * - ``\pod``
     -
   * - ``\poissonbracket``
     - physics
   * - ``\pqty``
     - physics
   * - ``\Pr``
     - **base**, physics
   * - ``\prec``
     -
   * - ``\precapprox``
     - **ams**
   * - ``\preccurlyeq``
     - **ams**
   * - ``\preceq``
     -
   * - ``\precnapprox``
     - **ams**
   * - ``\precneqq``
     - **ams**
   * - ``\precnsim``
     - **ams**
   * - ``\precsim``
     - **ams**
   * - ``\prescript``
     - mathtools
   * - ``\prime``
     -
   * - ``\principalvalue``
     - physics
   * - ``\Probability``
     - physics
   * - ``\prod``
     -
   * - ``\projlim``
     - **ams**
   * - ``\propto``
     -
   * - ``\psi``
     -
   * - ``\Psi``
     -
   * - ``\pu``
     - *mhchem*
   * - ``\pv``
     - physics
   * - ``\PV``
     - physics


Q
-

.. list-table::
   :widths: 70 30

   * - ``\qall``
     - physics
   * - ``\qand``
     - physics
   * - ``\qas``
     - physics
   * - ``\qassume``
     - physics
   * - ``\qc``
     - physics
   * - ``\qcc``
     - physics
   * - ``\qcomma``
     - physics
   * - ``\qelse``
     - physics
   * - ``\qeven``
     - physics
   * - ``\qfor``
     - physics
   * - ``\qgiven``
     - physics
   * - ``\qif``
     - physics
   * - ``\qin``
     - physics
   * - ``\qinteger``
     - physics
   * - ``\qlet``
     - physics
   * - ``\qodd``
     - physics
   * - ``\qor``
     - physics
   * - ``\qotherwise``
     - physics
   * - ``\qq``
     - physics
   * - ``\qqtext``
     - physics
   * - ``\qquad``
     - **base**, text-base
   * - ``\qsince``
     - physics
   * - ``\qthen``
     - physics
   * - ``\qty``
     - physics
   * - ``\quad``
     - **base**, text-base
   * - ``\quantity``
     - physics
   * - ``\QuaternaryInf``
     - *bussproofs*
   * - ``\QuaternaryInfC``
     - *bussproofs*
   * - ``\QuinaryInf``
     - *bussproofs*
   * - ``\QuinaryInfC``
     - *bussproofs*
   * - ``\qunless``
     - physics
   * - ``\qusing``
     - physics


R
-

.. list-table::
   :widths: 70 30

   * - ``\raise``
     -
   * - ``\rangle``
     -
   * - ``\rank``
     - physics
   * - ``\rbrace``
     -
   * - ``\rbrack``
     -
   * - ``\rceil``
     -
   * - ``\Re``
     - **base**, physics
   * - ``\real``
     - physics
   * - ``\ref``
     - **base**, text-base
   * - ``\refeq``
     - mathtools
   * - ``\renewcommand``
     - **newcommand**
   * - ``\renewenvironment``
     - **newcommand**
   * - ``\renewtagform``
     - mathtools
   * - ``\require``
     - **require**
   * - ``\Res``
     - physics
   * - ``\Residue``
     - physics
   * - ``\restriction``
     - **ams**
   * - ``\rfloor``
     -
   * - ``\rgroup``
     -
   * - ``\rhd``
     - **ams**
   * - ``\rho``
     -
   * - ``\right``
     -
   * - ``\Rightarrow``
     -
   * - ``\rightarrow``
     -
   * - ``\rightarrowtail``
     - **ams**
   * - ``\rightharpoondown``
     -
   * - ``\rightharpoonup``
     -
   * - ``\RightLabel``
     - *bussproofs*
   * - ``\rightleftarrows``
     - **ams**
   * - ``\rightleftharpoons``
     - **base**, **ams**
   * - ``\rightrightarrows``
     - **ams**
   * - ``\rightsquigarrow``
     - **ams**
   * - ``\rightthreetimes``
     - **ams**
   * - ``\risingdotseq``
     - **ams**
   * - ``\RL``
     - *bussproofs*
   * - ``\rlap``
     - **base**, text-base
   * - ``\rm``
     - **base**, text-base
   * - ``\rmoustache``
     -
   * - ``\root``
     -
   * - ``\rootAtBottom``
     - *bussproofs*
   * - ``\rootAtTop``
     - *bussproofs*
   * - ``\rowcolor``
     - colortbl
   * - ``\rparen``
     - mathtools
   * - ``\Rrightarrow``
     - **ams**
   * - ``\Rsh``
     - **ams**
   * - ``\rtimes``
     - **ams**
   * - ``\rule``
     - **base**, text-base
   * - ``\Rule``
     - **base**, text-base
   * - ``\rvert``
     - **ams**
   * - ``\rVert``
     - **ams**


S
-

.. list-table::
   :widths: 70 30

   * - ``\S``
     - **base**, text-base
   * - ``\sbmqty``
     - physics
   * - ``\scriptscriptstyle``
     -
   * - ``\scriptsize``
     - **base**, text-base
   * - ``\scriptstyle``
     -
   * - ``\searrow``
     -
   * - ``\sec``
     - **base**, physics
   * - ``\secant``
     - physics
   * - ``\sech``
     - physics
   * - ``\set``
     - *braket*
   * - ``\Set``
     - *braket*
   * - ``\setminus``
     -
   * - ``\setOptions``
     - setoptions
   * - ``\sf``
     - **base**, text-base
   * - ``\sharp``
     -
   * - ``\shortmid``
     - **ams**
   * - ``\shortparallel``
     - **ams**
   * - ``\shortvdotswithin``
     - mathtools
   * - ``\shoveleft``
     - **ams**, mathtools
   * - ``\shoveright``
     - **ams**, mathtools
   * - ``\sideset``
     - **ams**
   * - ``\sigma``
     -
   * - ``\Sigma``
     -
   * - ``\sim``
     -
   * - ``\simeq``
     -
   * - ``\sin``
     - **base**, physics
   * - ``\sine``
     - physics
   * - ``\singleLine``
     - *bussproofs*
   * - ``\sinh``
     - **base**, physics
   * - ``\skew``
     -
   * - ``\small``
     - **base**, text-base
   * - ``\smallfrown``
     - **ams**
   * - ``\smallint``
     -
   * - ``\smallmatrixquantity``
     - physics
   * - ``\smallsetminus``
     - **ams**
   * - ``\smallsmile``
     - **ams**
   * - ``\smash``
     - **base**, text-base
   * - ``\smdet``
     - physics
   * - ``\smile``
     -
   * - ``\smqty``
     - physics
   * - ``\solidLine``
     - *bussproofs*
   * - ``\Space``
     - **base**, text-base
   * - ``\space``
     -
   * - ``\spadesuit``
     -
   * - ``\sphericalangle``
     - **ams**
   * - ``\splitdfrac``
     - mathtools
   * - ``\splitfrac``
     - mathtools
   * - ``\spmqty``
     - physics
   * - ``\sPmqty``
     - physics
   * - ``\sqcap``
     -
   * - ``\sqcup``
     -
   * - ``\sqrt``
     -
   * - ``\sqsubset``
     - **ams**
   * - ``\sqsubseteq``
     -
   * - ``\sqsupset``
     - **ams**
   * - ``\sqsupseteq``
     -
   * - ``\square``
     - **ams**
   * - ``\stackbin``
     -
   * - ``\stackrel``
     -
   * - ``\star``
     -
   * - ``\strut``
     -
   * - ``\style``
     - *html*, text-base
   * - ``\subset``
     -
   * - ``\Subset``
     - **ams**
   * - ``\subseteq``
     -
   * - ``\subseteqq``
     - **ams**
   * - ``\subsetneq``
     - **ams**
   * - ``\subsetneqq``
     - **ams**
   * - ``\substack``
     - **ams**
   * - ``\succ``
     -
   * - ``\succapprox``
     - **ams**
   * - ``\succcurlyeq``
     - **ams**
   * - ``\succeq``
     -
   * - ``\succnapprox``
     - **ams**
   * - ``\succneqq``
     - **ams**
   * - ``\succnsim``
     - **ams**
   * - ``\succsim``
     - **ams**
   * - ``\sum``
     -
   * - ``\sup``
     -
   * - ``\supset``
     -
   * - ``\Supset``
     - **ams**
   * - ``\supseteq``
     -
   * - ``\supseteqq``
     - **ams**
   * - ``\supsetneq``
     - **ams**
   * - ``\supsetneqq``
     - **ams**
   * - ``\surd``
     -
   * - ``\svmqty``
     - physics
   * - ``\swarrow``
     -
   * - ``\symbb``
     -
   * - ``\symbf``
     -
   * - ``\symbfcal``
     -
   * - ``\symbffrak``
     -
   * - ``\symbfit``
     -
   * - ``\symbfscr``
     -
   * - ``\symbfsf``
     -
   * - ``\symbfsfit``
     -
   * - ``\symbfsfup``
     -
   * - ``\symbfup``
     -
   * - ``\symcal``
     -
   * - ``\symfrak``
     -
   * - ``\symit``
     -
   * - ``\symnormal``
     -
   * - ``\symrm``
     -
   * - ``\symscr``
     -
   * - ``\symsf``
     -
   * - ``\symsfit``
     -
   * - ``\symsfup``
     -
   * - ``\symtt``
     -
   * - ``\symup``
     -


T
-

.. list-table::
   :widths: 70 30

   * - ``\tag``
     - **ams**
   * - ``\tan``
     - **base**, physics
   * - ``\tangent``
     - physics
   * - ``\tanh``
     - **base**, physics
   * - ``\tau``
     -
   * - ``\tbinom``
     - **ams**
   * - ``\TeX``
     -
   * - ``\text``
     -
   * - ``\textacutedbl``
     - textcomp
   * - ``\textasciiacute``
     - textcomp
   * - ``\textasciibreve``
     - textcomp
   * - ``\textasciicaron``
     - textcomp
   * - ``\textasciicircum``
     - textcomp
   * - ``\textasciidieresis``
     - textcomp
   * - ``\textasciimacron``
     - textcomp
   * - ``\textasciitilde``
     - textcomp
   * - ``\textasteriskcentered``
     - textcomp
   * - ``\textbackslash``
     - textcomp
   * - ``\textbaht``
     - textcomp
   * - ``\textbar``
     - textcomp
   * - ``\textbardbl``
     - textcomp
   * - ``\textbb``
     - text-bboldx
   * - ``\textbf``
     - **base**, text-base
   * - ``\textbfbb``
     - text-bboldx
   * - ``\textbigcircle``
     - textcomp
   * - ``\textblank``
     - textcomp
   * - ``\textborn``
     - textcomp
   * - ``\textbraceleft``
     - textcomp
   * - ``\textbraceright``
     - textcomp
   * - ``\textbrokenbar``
     - textcomp
   * - ``\textbullet``
     - textcomp
   * - ``\textcelsius``
     - textcomp
   * - ``\textcent``
     - textcomp
   * - ``\textcentoldstyle``
     - textcomp
   * - ``\textcircledP``
     - textcomp
   * - ``\textclap``
     - mathtools
   * - ``\textcolonmonetary``
     - textcomp
   * - ``\textcolor``
     - *color*, text-base
   * - ``\textcompwordmark``
     - textcomp
   * - ``\textcopyleft``
     - textcomp
   * - ``\textcopyright``
     - textcomp
   * - ``\textcurrency``
     - textcomp
   * - ``\textdagger``
     - textcomp
   * - ``\textdaggerdbl``
     - textcomp
   * - ``\textdegree``
     - textcomp
   * - ``\textdied``
     - textcomp
   * - ``\textdiscount``
     - textcomp
   * - ``\textdiv``
     - textcomp
   * - ``\textdivorced``
     - textcomp
   * - ``\textdollar``
     - textcomp
   * - ``\textdollaroldstyle``
     - textcomp
   * - ``\textdong``
     - textcomp
   * - ``\textdownarrow``
     - textcomp
   * - ``\texteightoldstyle``
     - textcomp
   * - ``\textellipsis``
     - textcomp
   * - ``\textemdash``
     - textcomp
   * - ``\textendash``
     - textcomp
   * - ``\textestimated``
     - textcomp
   * - ``\texteuro``
     - textcomp
   * - ``\textexclamdown``
     - textcomp
   * - ``\textfiveoldstyle``
     - textcomp
   * - ``\textflorin``
     - textcomp
   * - ``\textfouroldstyle``
     - textcomp
   * - ``\textfractionsolidus``
     - textcomp
   * - ``\textgravedbl``
     - textcomp
   * - ``\textgreater``
     - textcomp
   * - ``\textguarani``
     - textcomp
   * - ``\textinterrobang``
     - textcomp
   * - ``\textinterrobangdown``
     - textcomp
   * - ``\textit``
     - **base**, text-base
   * - ``\textlangle``
     - textcomp
   * - ``\textlbrackdbl``
     - textcomp
   * - ``\textleftarrow``
     - textcomp
   * - ``\textless``
     - textcomp
   * - ``\textlira``
     - textcomp
   * - ``\textllap``
     - mathtools
   * - ``\textlnot``
     - textcomp
   * - ``\textlquill``
     - textcomp
   * - ``\textmarried``
     - textcomp
   * - ``\textmho``
     - textcomp
   * - ``\textminus``
     - textcomp
   * - ``\textmu``
     - textcomp
   * - ``\textmusicalnote``
     - textcomp
   * - ``\textnaira``
     - textcomp
   * - ``\textnineoldstyle``
     - textcomp
   * - ``\textnormal``
     - **base**, text-base
   * - ``\textnumero``
     - textcomp
   * - ``\textohm``
     - textcomp
   * - ``\textonehalf``
     - textcomp
   * - ``\textoneoldstyle``
     - textcomp
   * - ``\textonequarter``
     - textcomp
   * - ``\textonesuperior``
     - textcomp
   * - ``\textopenbullet``
     - textcomp
   * - ``\textordfeminine``
     - textcomp
   * - ``\textordmasculine``
     - textcomp
   * - ``\textparagraph``
     - textcomp
   * - ``\textperiodcentered``
     - textcomp
   * - ``\textpertenthousand``
     - textcomp
   * - ``\textperthousand``
     - textcomp
   * - ``\textpeso``
     - textcomp
   * - ``\textpm``
     - textcomp
   * - ``\textquestiondown``
     - textcomp
   * - ``\textquotedblleft``
     - textcomp
   * - ``\textquotedblright``
     - textcomp
   * - ``\textquoteleft``
     - textcomp
   * - ``\textquoteright``
     - textcomp
   * - ``\textrangle``
     - textcomp
   * - ``\textrbrackdbl``
     - textcomp
   * - ``\textrecipe``
     - textcomp
   * - ``\textreferencemark``
     - textcomp
   * - ``\textregistered``
     - textcomp
   * - ``\textrightarrow``
     - textcomp
   * - ``\textrlap``
     - mathtools
   * - ``\textrm``
     - **base**, text-base
   * - ``\textrquill``
     - textcomp
   * - ``\textsection``
     - textcomp
   * - ``\textservicemark``
     - textcomp
   * - ``\textsevenoldstyle``
     - textcomp
   * - ``\textsf``
     - **base**, text-base
   * - ``\textsixoldstyle``
     - textcomp
   * - ``\textsterling``
     - textcomp
   * - ``\textstyle``
     -
   * - ``\textsurd``
     - textcomp
   * - ``\textthreeoldstyle``
     - textcomp
   * - ``\textthreequarters``
     - textcomp
   * - ``\textthreesuperior``
     - textcomp
   * - ``\texttildelow``
     - textcomp
   * - ``\texttimes``
     - textcomp
   * - ``\texttip``
     - *action*
   * - ``\texttrademark``
     - textcomp
   * - ``\texttt``
     - **base**, text-base
   * - ``\texttwooldstyle``
     - textcomp
   * - ``\texttwosuperior``
     - textcomp
   * - ``\textunderscore``
     - textcomp
   * - ``\textup``
     - **base**, text-base
   * - ``\textuparrow``
     - textcomp
   * - ``\textvisiblespace``
     - textcomp
   * - ``\textwon``
     - textcomp
   * - ``\textyen``
     - textcomp
   * - ``\textzerooldstyle``
     - textcomp
   * - ``\tfrac``
     - **ams**
   * - ``\therefore``
     - **ams**
   * - ``\theta``
     -
   * - ``\Theta``
     -
   * - ``\thickapprox``
     - **ams**
   * - ``\thicksim``
     - **ams**
   * - ``\thinspace``
     - **base**, text-base
   * - ``\TIC``
     - *bussproofs*
   * - ``\tilde``
     -
   * - ``\times``
     -
   * - ``\tiny``
     - **base**, text-base
   * - ``\Tiny``
     - **base**, text-base
   * - ``\to``
     -
   * - ``\toggle``
     - *action*
   * - ``\top``
     -
   * - ``\tr``
     - physics
   * - ``\Tr``
     - physics
   * - ``\trace``
     - physics
   * - ``\Trace``
     - physics
   * - ``\triangle``
     -
   * - ``\triangledown``
     - **ams**
   * - ``\triangleleft``
     -
   * - ``\trianglelefteq``
     - **ams**
   * - ``\triangleq``
     - **ams**
   * - ``\triangleright``
     -
   * - ``\trianglerighteq``
     - **ams**
   * - ``\TrinaryInf``
     - *bussproofs*
   * - ``\TrinaryInfC``
     - *bussproofs*
   * - ``\tripledash``
     - *mhchem*
   * - ``\tt``
     - **base**, text-base
   * - ``\twoheadleftarrow``
     - **ams**
   * - ``\twoheadrightarrow``
     - **ams**
   * - ``\txtbbalpha``
     - text-bboldx
   * - ``\txtbbbeta``
     - text-bboldx
   * - ``\txtbbchi``
     - text-bboldx
   * - ``\txtbbDelta``
     - text-bboldx
   * - ``\txtbbdelta``
     - text-bboldx
   * - ``\txtbbdotlessi``
     - text-bboldx
   * - ``\txtbbdotlessj``
     - text-bboldx
   * - ``\txtbbepsilon``
     - text-bboldx
   * - ``\txtbbeta``
     - text-bboldx
   * - ``\txtbbGamma``
     - text-bboldx
   * - ``\txtbbgamma``
     - text-bboldx
   * - ``\txtbbiota``
     - text-bboldx
   * - ``\txtbbkappa``
     - text-bboldx
   * - ``\txtbbLambda``
     - text-bboldx
   * - ``\txtbblambda``
     - text-bboldx
   * - ``\txtbbLangle``
     - text-bboldx
   * - ``\txtbbLbrack``
     - text-bboldx
   * - ``\txtbbLparen``
     - text-bboldx
   * - ``\txtbbmu``
     - text-bboldx
   * - ``\txtbbnu``
     - text-bboldx
   * - ``\txtbbOmega``
     - text-bboldx
   * - ``\txtbbomega``
     - text-bboldx
   * - ``\txtbbPhi``
     - text-bboldx
   * - ``\txtbbphi``
     - text-bboldx
   * - ``\txtbbPi``
     - text-bboldx
   * - ``\txtbbpi``
     - text-bboldx
   * - ``\txtbbPsi``
     - text-bboldx
   * - ``\txtbbpsi``
     - text-bboldx
   * - ``\txtbbRangle``
     - text-bboldx
   * - ``\txtbbRbrack``
     - text-bboldx
   * - ``\txtbbrho``
     - text-bboldx
   * - ``\txtbbRparen``
     - text-bboldx
   * - ``\txtbbSigma``
     - text-bboldx
   * - ``\txtbbsigma``
     - text-bboldx
   * - ``\txtbbtau``
     - text-bboldx
   * - ``\txtbbTheta``
     - text-bboldx
   * - ``\txtbbtheta``
     - text-bboldx
   * - ``\txtbbUpsilon``
     - text-bboldx
   * - ``\txtbbupsilon``
     - text-bboldx
   * - ``\txtbbXi``
     - text-bboldx
   * - ``\txtbbxi``
     - text-bboldx
   * - ``\txtbbzeta``
     - text-bboldx
   * - ``\txtbfbbalpha``
     - text-bboldx
   * - ``\txtbfbbbeta``
     - text-bboldx
   * - ``\txtbfbbchi``
     - text-bboldx
   * - ``\txtbfbbDelta``
     - text-bboldx
   * - ``\txtbfbbdelta``
     - text-bboldx
   * - ``\txtbfbbdotlessi``
     - text-bboldx
   * - ``\txtbfbbdotlessj``
     - text-bboldx
   * - ``\txtbfbbepsilon``
     - text-bboldx
   * - ``\txtbfbbeta``
     - text-bboldx
   * - ``\txtbfbbGamma``
     - text-bboldx
   * - ``\txtbfbbgamma``
     - text-bboldx
   * - ``\txtbfbbiota``
     - text-bboldx
   * - ``\txtbfbbkappa``
     - text-bboldx
   * - ``\txtbfbbLambda``
     - text-bboldx
   * - ``\txtbfbblambda``
     - text-bboldx
   * - ``\txtbfbbLangle``
     - text-bboldx
   * - ``\txtbfbbLbrack``
     - text-bboldx
   * - ``\txtbfbbLparen``
     - text-bboldx
   * - ``\txtbfbbmu``
     - text-bboldx
   * - ``\txtbfbbnu``
     - text-bboldx
   * - ``\txtbfbbOmega``
     - text-bboldx
   * - ``\txtbfbbomega``
     - text-bboldx
   * - ``\txtbfbbPhi``
     - text-bboldx
   * - ``\txtbfbbphi``
     - text-bboldx
   * - ``\txtbfbbPi``
     - text-bboldx
   * - ``\txtbfbbpi``
     - text-bboldx
   * - ``\txtbfbbPsi``
     - text-bboldx
   * - ``\txtbfbbpsi``
     - text-bboldx
   * - ``\txtbfbbRangle``
     - text-bboldx
   * - ``\txtbfbbRbrack``
     - text-bboldx
   * - ``\txtbfbbrho``
     - text-bboldx
   * - ``\txtbfbbRparen``
     - text-bboldx
   * - ``\txtbfbbSigma``
     - text-bboldx
   * - ``\txtbfbbsigma``
     - text-bboldx
   * - ``\txtbfbbtau``
     - text-bboldx
   * - ``\txtbfbbTheta``
     - text-bboldx
   * - ``\txtbfbbtheta``
     - text-bboldx
   * - ``\txtbfbbUpsilon``
     - text-bboldx
   * - ``\txtbfbbupsilon``
     - text-bboldx
   * - ``\txtbfbbXi``
     - text-bboldx
   * - ``\txtbfbbxi``
     - text-bboldx
   * - ``\txtbfbbzeta``
     - text-bboldx


U
-

.. list-table::
   :widths: 70 30

   * - ``\U``
     - *unicode*, text-base
   * - ``\u``
     - text-base
   * - ``\UIC``
     - *bussproofs*
   * - ``\ulcorner``
     - **ams**
   * - ``\UnaryInf``
     - *bussproofs*
   * - ``\UnaryInfC``
     - *bussproofs*
   * - ``\underbrace``
     -
   * - ``\underbracket``
     - mathtools
   * - ``\underleftarrow``
     -
   * - ``\underleftrightarrow``
     -
   * - ``\underline``
     - **base**, text-base
   * - ``\underparen``
     -
   * - ``\underrightarrow``
     -
   * - ``\underset``
     -
   * - ``\unicode``
     - *unicode*, text-base
   * - ``\unitfrac``
     - units
   * - ``\units``
     - units
   * - ``\unlhd``
     - **ams**
   * - ``\unrhd``
     - **ams**
   * - ``\upalpha``
     - upgreek
   * - ``\uparrow``
     -
   * - ``\Uparrow``
     -
   * - ``\upbeta``
     - upgreek
   * - ``\upchi``
     - upgreek
   * - ``\updelta``
     - upgreek
   * - ``\Updelta``
     - upgreek
   * - ``\updownarrow``
     -
   * - ``\Updownarrow``
     -
   * - ``\upepsilon``
     - upgreek
   * - ``\upeta``
     - upgreek
   * - ``\upgamma``
     - upgreek
   * - ``\Upgamma``
     - upgreek
   * - ``\upharpoonleft``
     - **ams**
   * - ``\upharpoonright``
     - **ams**
   * - ``\upiota``
     - upgreek
   * - ``\upkappa``
     - upgreek
   * - ``\uplambda``
     - upgreek
   * - ``\Uplambda``
     - upgreek
   * - ``\uplus``
     -
   * - ``\upmu``
     - upgreek
   * - ``\upnu``
     - upgreek
   * - ``\upomega``
     - upgreek
   * - ``\Upomega``
     - upgreek
   * - ``\upomicron``
     - upgreek
   * - ``\upphi``
     - upgreek
   * - ``\Upphi``
     - upgreek
   * - ``\uppi``
     - upgreek
   * - ``\Uppi``
     - upgreek
   * - ``\uppsi``
     - upgreek
   * - ``\Uppsi``
     - upgreek
   * - ``\uprho``
     - upgreek
   * - ``\uproot``
     -
   * - ``\upsigma``
     - upgreek
   * - ``\Upsigma``
     - upgreek
   * - ``\upsilon``
     -
   * - ``\Upsilon``
     -
   * - ``\uptau``
     - upgreek
   * - ``\uptheta``
     - upgreek
   * - ``\Uptheta``
     - upgreek
   * - ``\upuparrows``
     - **ams**
   * - ``\upupsilon``
     - upgreek
   * - ``\Upupsilon``
     - upgreek
   * - ``\upvarepsilon``
     - upgreek
   * - ``\upvarphi``
     - upgreek
   * - ``\upvarpi``
     - upgreek
   * - ``\upvarrho``
     - upgreek
   * - ``\upvarsigma``
     - upgreek
   * - ``\upvartheta``
     - upgreek
   * - ``\upxi``
     - upgreek
   * - ``\Upxi``
     - upgreek
   * - ``\upzeta``
     - upgreek
   * - ``\urcorner``
     - **ams**
   * - ``\usetagform``
     - mathtools


V
-

.. list-table::
   :widths: 70 30

   * - ``\v``
     - text-base
   * - ``\va``
     - physics
   * - ``\var``
     - physics
   * - ``\varDelta``
     - **ams**
   * - ``\varepsilon``
     -
   * - ``\varGamma``
     - **ams**
   * - ``\variation``
     - physics
   * - ``\varinjlim``
     - **ams**
   * - ``\varkappa``
     - **ams**
   * - ``\varLambda``
     - **ams**
   * - ``\varliminf``
     - **ams**
   * - ``\varlimsup``
     - **ams**
   * - ``\varnothing``
     - **ams**
   * - ``\varOmega``
     - **ams**
   * - ``\varphi``
     -
   * - ``\varPhi``
     - **ams**
   * - ``\varpi``
     -
   * - ``\varPi``
     - **ams**
   * - ``\varprojlim``
     - **ams**
   * - ``\varpropto``
     - **ams**
   * - ``\varPsi``
     - **ams**
   * - ``\varrho``
     -
   * - ``\varsigma``
     -
   * - ``\varSigma``
     - **ams**
   * - ``\varsubsetneq``
     - **ams**
   * - ``\varsubsetneqq``
     - **ams**
   * - ``\varsupsetneq``
     - **ams**
   * - ``\varsupsetneqq``
     - **ams**
   * - ``\vartheta``
     -
   * - ``\varTheta``
     - **ams**
   * - ``\vartriangle``
     - **ams**
   * - ``\vartriangleleft``
     - **ams**
   * - ``\vartriangleright``
     - **ams**
   * - ``\varUpsilon``
     - **ams**
   * - ``\varXi``
     - **ams**
   * - ``\vb``
     - physics
   * - ``\vbox``
     -
   * - ``\vcenter``
     -
   * - ``\vdash``
     -
   * - ``\vDash``
     - **ams**
   * - ``\Vdash``
     - **ams**
   * - ``\vdot``
     - physics
   * - ``\vdots``
     - **base**, text-base
   * - ``\vdotswithin``
     - mathtools
   * - ``\vec``
     -
   * - ``\vectorarrow``
     - physics
   * - ``\vectorbold``
     - physics
   * - ``\vectorunit``
     - physics
   * - ``\vee``
     -
   * - ``\veebar``
     - **ams**
   * - ``\verb``
     - *verb*
   * - ``\Vert``
     -
   * - ``\vert``
     -
   * - ``\vmqty``
     - physics
   * - ``\vnabla``
     - physics
   * - ``\vphantom``
     - **base**, text-base
   * - ``\vqty``
     - physics
   * - ``\vtop``
     -
   * - ``\vu``
     - physics
   * - ``\Vvdash``
     - **ams**


W
-

.. list-table::
   :widths: 70 30

   * - ``\wedge``
     -
   * - ``\widehat``
     -
   * - ``\widetilde``
     -
   * - ``\wp``
     -
   * - ``\wr``
     -


X
-

.. list-table::
   :widths: 70 30

   * - ``\xcancel``
     - *cancel*
   * - ``\xhookleftarrow``
     - mathtools
   * - ``\xhookrightarrow``
     - mathtools
   * - ``\xi``
     -
   * - ``\Xi``
     -
   * - ``\xleftarrow``
     - **ams**
   * - ``\xLeftarrow``
     - mathtools
   * - ``\xleftharpoondown``
     - mathtools
   * - ``\xleftharpoonup``
     - mathtools
   * - ``\xleftrightarrow``
     - mathtools, *mhchem*
   * - ``\xLeftrightarrow``
     - mathtools
   * - ``\xleftrightharpoons``
     - mathtools
   * - ``\xLeftrightharpoons``
     - *mhchem*
   * - ``\xlongequal``
     - *extpfeil*
   * - ``\xmapsto``
     - *extpfeil*, mathtools
   * - ``\xmat``
     - physics
   * - ``\xmathstrut``
     - mathtools
   * - ``\xmatrix``
     - physics
   * - ``\xrightarrow``
     - **ams**
   * - ``\xRightarrow``
     - mathtools
   * - ``\xrightharpoondown``
     - mathtools
   * - ``\xrightharpoonup``
     - mathtools
   * - ``\xrightleftharpoons``
     - mathtools, *mhchem*
   * - ``\xRightleftharpoons``
     - *mhchem*
   * - ``\xtofrom``
     - *extpfeil*
   * - ``\xtwoheadleftarrow``
     - *extpfeil*
   * - ``\xtwoheadrightarrow``
     - *extpfeil*


Y
-

.. list-table::
   :widths: 70 30

   * - ``\yen``
     - **ams**


Z
-

.. list-table::
   :widths: 70 30

   * - ``\zeromatrix``
     - physics
   * - ``\zeta``
     -
   * - ``\zmat``
     - physics


Environments
------------

.. list-table::
   :widths: 70 30

   * - ``align``
     - **ams**
   * - ``align*``
     - **ams**
   * - ``alignat``
     - **ams**
   * - ``alignat*``
     - **ams**
   * - ``aligned``
     - **ams**
   * - ``alignedat``
     - **ams**
   * - ``array``
     -
   * - ``bmatrix``
     - **ams**
   * - ``Bmatrix``
     - **ams**
   * - ``bmatrix*``
     - mathtools
   * - ``Bmatrix*``
     - mathtools
   * - ``bsmallmatrix``
     - mathtools
   * - ``Bsmallmatrix``
     - mathtools
   * - ``bsmallmatrix*``
     - mathtools
   * - ``Bsmallmatrix*``
     - mathtools
   * - ``cases``
     - **ams**
   * - ``cases*``
     - mathtools
   * - ``CD``
     - *amscd*
   * - ``crampedsubarray``
     - mathtools
   * - ``darray``
     -
   * - ``dcases``
     - mathtools
   * - ``dcases*``
     - mathtools
   * - ``displaymath``
     -
   * - ``drcases``
     - mathtools
   * - ``drcases*``
     - mathtools
   * - ``empheq``
     - empheq
   * - ``eqnarray``
     -
   * - ``eqnarray*``
     - **ams**
   * - ``equation``
     -
   * - ``equation*``
     - **ams**
   * - ``flalign``
     - **ams**
   * - ``flalign*``
     - **ams**
   * - ``gather``
     - **ams**
   * - ``gather*``
     - **ams**
   * - ``gathered``
     - **ams**
   * - ``indentalign``
     -
   * - ``lgathered``
     - mathtools
   * - ``math``
     -
   * - ``matrix``
     - **ams**
   * - ``matrix*``
     - mathtools
   * - ``multline``
     - **ams**
   * - ``multline*``
     - **ams**
   * - ``multlined``
     - mathtools
   * - ``numcases``
     - cases
   * - ``pmatrix``
     - **ams**
   * - ``pmatrix*``
     - mathtools
   * - ``prooftree``
     - *bussproofs*
   * - ``psmallmatrix``
     - mathtools
   * - ``psmallmatrix*``
     - mathtools
   * - ``rcases``
     - mathtools
   * - ``rcases*``
     - mathtools
   * - ``rgathered``
     - mathtools
   * - ``smallmatrix``
     - **ams**, physics
   * - ``smallmatrix*``
     - mathtools
   * - ``split``
     - **ams**
   * - ``spreadlines``
     - mathtools
   * - ``subarray``
     - **ams**
   * - ``subnumcases``
     - cases
   * - ``vmatrix``
     - **ams**
   * - ``Vmatrix``
     - **ams**
   * - ``vmatrix*``
     - mathtools
   * - ``Vmatrix*``
     - mathtools
   * - ``vsmallmatrix``
     - mathtools
   * - ``Vsmallmatrix``
     - mathtools
   * - ``vsmallmatrix*``
     - mathtools
   * - ``Vsmallmatrix*``
     - mathtools
   * - ``xalignat``
     - **ams**
   * - ``xalignat*``
     - **ams**
   * - ``xxalignat``
     - **ams**


|-----|
