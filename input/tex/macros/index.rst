.. _tex-commands:

############################
Supported TeX/LaTeX commands
############################

This is a long list of the TeX macros supported by MathJax.  If the
macro is defined in an extension, the name of the extension follows
the macro name.  If the extension is in brackets, the extension will
be loaded automatically when the macro or environment is first used.

More complete details about how to use these macros, with examples and
explanations, is available at Carol Fisher's `TeX Commands Available
in MathJax
<http://www.onemathematicalcat.org/MathJaxDocumentation/TeXSyntax.htm>`_
page. (These were written for MathJax v2, but most of the information
is still correct for v3.)

In the following tables, the first column lists the macro (or
character, or environment), and the second column indicates which
package(s) defines the macro.  If none is listed, then it is in the
base package.  If the package name is in bold, then it is preloaded by
the components that include the TeX input jax (except for
``input/tex-base``, which only includes the base package).  If the
package name is in italics, then the package is *not* autoloaded by
the :ref:`tex-autoload` extension.

Note that most macros are not processed inside text-mode material
(such as that within ``\text{}`` and other similar macros).  The
:ref:`tex-textmacros` extension makes additional macros available in
text mode, as listed in the documentation for that extention.


.. raw:: html

   <style>
   .wy-table-responsive table {width: 100%}
   .rst-content .wy-table-responsive table code.literal {background: inherit}
   </style>


Symbols
=======

.. list-table::
   :widths: 70 30

   * - ``&``
     -
   * - ``#``
     -
   * - ``%``
     -
   * - ``^``
     -
   * - ``~``
     -
   * - ``_``
     -
   * - ``'``
     -
   * - ``’``
     -
   * - ``{``
     -
   * - ``}``
     -
   * - ``\``  (backslash-space)
     -
   * - ``\_``
     -
   * - ``\,``
     -
   * - ``\;``
     -
   * - ``\:``
     -
   * - ``\!``
     -
   * - ``\{``
     -
   * - ``\}``
     -
   * - ``\\``
     -
   * - ``\&``
     -
   * - ``\#``
     -
   * - ``\%``
     -
   * - ``\>``
     -
   * - ``\|``
     -
   * - ``\$``
     -


A
=

.. list-table::
   :widths: 70 30

   * - ``\above``
     -
   * - ``\abovewithdelims``
     -
   * - ``\abs``
     - *physics*
   * - ``\absolutevalue``
     - *physics*
   * - ``\acomm``
     - *physics*
   * - ``\acos``
     - *physics*
   * - ``\acosecant``
     - *physics*
   * - ``\acosine``
     - *physics*
   * - ``\acot``
     - *physics*
   * - ``\acotangent``
     - *physics*
   * - ``\acsc``
     - *physics*
   * - ``\acute``
     -
   * - ``\admat``
     - *physics*
   * - ``\aleph``
     -
   * - ``\alpha``
     -
   * - ``\amalg``
     -
   * - ``\And``
     -
   * - ``\angle``
     -
   * - ``\anticommutator``
     - *physics*
   * - ``\antidiagonalmatrix``
     - *physics*
   * - ``\approx``
     -
   * - ``\approxeq``
     - **ams**
   * - ``\arccos``
     - **base**, *physics*
   * - ``\arccosecant``
     - *physics*
   * - ``\arccosine``
     - *physics*
   * - ``\arccot``
     - *physics*
   * - ``\arccotangent``
     - *physics*
   * - ``\arccsc``
     - *physics*
   * - ``\arcsec``
     - *physics*
   * - ``\arcsecant``
     - *physics*
   * - ``\arcsin``
     - **base**, *physics*
   * - ``\arcsine``
     - *physics*
   * - ``\arctan``
     - **base**, *physics*
   * - ``\arctangent``
     - *physics*
   * - ``\arg``
     -
   * - ``\array``
     -
   * - ``\Arrowvert``
     -
   * - ``\arrowvert``
     -
   * - ``\asec``
     - *physics*
   * - ``\asecant``
     - *physics*
   * - ``\asin``
     - *physics*
   * - ``\asine``
     - *physics*
   * - ``\ast``
     -
   * - ``\asymp``
     -
   * - ``\atan``
     - *physics*
   * - ``\atangent``
     - *physics*
   * - ``\atop``
     -
   * - ``\atopwithdelims``
     -


B
=

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
   * - ``\bar``
     -
   * - ``\barwedge``
     - **ams**
   * - ``\Bbb``
     -
   * - ``\Bbbk``
     - **ams**
   * - ``\bbFont``
     -
   * - ``\bbox``
     - bbox
   * - ``\bcancel``
     - cancel
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
     -
   * - ``\Big``
     -
   * - ``\big``
     -
   * - ``\bigcap``
     -
   * - ``\bigcirc``
     -
   * - ``\bigcup``
     -
   * - ``\Bigg``
     -
   * - ``\bigg``
     -
   * - ``\Biggl``
     -
   * - ``\biggl``
     -
   * - ``\Biggm``
     -
   * - ``\biggm``
     -
   * - ``\Biggr``
     -
   * - ``\biggr``
     -
   * - ``\Bigl``
     -
   * - ``\bigl``
     -
   * - ``\Bigm``
     -
   * - ``\bigm``
     -
   * - ``\bigodot``
     -
   * - ``\bigoplus``
     -
   * - ``\bigotimes``
     -
   * - ``\Bigr``
     -
   * - ``\bigr``
     -
   * - ``\bigsqcup``
     -
   * - ``\bigstar``
     - **ams**
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
     - *physics*
   * - ``\boldsymbol``
     - boldsymbol
   * - ``\bot``
     -
   * - ``\bowtie``
     -
   * - ``\Box``
     - **ams**
   * - ``\boxdot``
     - **ams**
   * - ``\boxed``
     - **ams**
   * - ``\boxminus``
     - **ams**
   * - ``\boxplus``
     - **ams**
   * - ``\boxtimes``
     - **ams**
   * - ``\Bqty``
     - *physics*
   * - ``\bqty``
     - *physics*
   * - ``\Bra``
     - braket
   * - ``\bra``
     - braket, *physics*
   * - ``\brace``
     -
   * - ``\bracevert``
     -
   * - ``\brack``
     -
   * - ``\Braket``
     - braket
   * - ``\braket``
     - braket, *physics*
   * - ``\breve``
     -
   * - ``\buildrel``
     -
   * - ``\bullet``
     -
   * - ``\Bumpeq``
     - **ams**
   * - ``\bumpeq``
     - **ams**


C
=

.. list-table::
   :widths: 70 30

   * - ``\cal``
     -
   * - ``\cancel``
     - cancel
   * - ``\cancelto``
     - cancel
   * - ``\Cap``
     - **ams**
   * - ``\cap``
     -
   * - ``\cases``
     -
   * - ``\cdot``
     -
   * - ``\cdotp``
     -
   * - ``\cdots``
     -
   * - ``\ce``
     - mhchem
   * - ``\centerdot``
     - **ams**
   * - ``\cfrac``
     - **ams**
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
   * - ``\class``
     - html
   * - ``\clubsuit``
     -
   * - ``\colon``
     -
   * - ``\color``
     - color, *colorv2*
   * - ``\colorbox``
     - color
   * - ``\comm``
     - *physics*
   * - ``\commutator``
     - *physics*
   * - ``\complement``
     - **ams**
   * - ``\cong``
     -
   * - ``\coprod``
     -
   * - ``\cos``
     - **base**, *physics*
   * - ``\cosecant``
     - *physics*
   * - ``\cosh``
     - **base**, *physics*
   * - ``\cosine``
     - *physics*
   * - ``\cot``
     - **base**, *physics*
   * - ``\cotangent``
     - *physics*
   * - ``\coth``
     - **base**, *physics*
   * - ``\cp``
     - *physics*
   * - ``\cr``
     -
   * - ``\cross``
     - *physics*
   * - ``\crossproduct``
     - *physics*
   * - ``\csc``
     - **base**, *physics*
   * - ``\csch``
     - *physics*
   * - ``\cssId``
     - html
   * - ``\Cup``
     - **ams**
   * - ``\cup``
     -
   * - ``\curl``
     - *physics*
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
=

.. list-table::
   :widths: 70 30

   * - ``\dagger``
     -
   * - ``\daleth``
     - **ams**
   * - ``\dashleftarrow``
     - **ams**
   * - ``\dashrightarrow``
     - **ams**
   * - ``\dashv``
     -
   * - ``\dbinom``
     - **ams**
   * - ``\dd``
     - *physics*
   * - ``\ddagger``
     -
   * - ``\ddddot``
     - **ams**
   * - ``\dddot``
     - **ams**
   * - ``\ddot``
     -
   * - ``\ddots``
     -
   * - ``\DeclareMathOperator``
     - **ams**
   * - ``\def``
     - **newcommand**
   * - ``\definecolor``
     - color
   * - ``\deg``
     -
   * - ``\Delta``
     -
   * - ``\delta``
     -
   * - ``\derivative``
     - *physics*
   * - ``\det``
     - **base**, *physics*
   * - ``\determinant``
     - *physics*
   * - ``\dfrac``
     - **ams**
   * - ``\diagdown``
     - **ams**
   * - ``\diagonalmatrix``
     - *physics*
   * - ``\diagup``
     - **ams**
   * - ``\Diamond``
     - **ams**
   * - ``\diamond``
     -
   * - ``\diamondsuit``
     -
   * - ``\differential``
     - *physics*
   * - ``\digamma``
     - **ams**
   * - ``\dim``
     -
   * - ``\displaylines``
     -
   * - ``\displaystyle``
     -
   * - ``\div``
     - **base**, *physics*
   * - ``\divergence``
     - *physics*
   * - ``\divideontimes``
     - **ams**
   * - ``\dmat``
     - *physics*
   * - ``\dot``
     -
   * - ``\Doteq``
     - **ams**
   * - ``\doteq``
     -
   * - ``\doteqdot``
     - **ams**
   * - ``\dotplus``
     - **ams**
   * - ``\dotproduct``
     - *physics*
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
   * - ``\Downarrow``
     -
   * - ``\downarrow``
     -
   * - ``\downdownarrows``
     - **ams**
   * - ``\downharpoonleft``
     - **ams**
   * - ``\downharpoonright``
     - **ams**
   * - ``\dv``
     - *physics*
   * - ``\dyad``
     - *physics*


E
=

.. list-table::
   :widths: 70 30

   * - ``\ell``
     -
   * - ``\emptyset``
     -
   * - ``\enclose``
     - enclose
   * - ``\end``
     -
   * - ``\enspace``
     -
   * - ``\epsilon``
     -
   * - ``\eqalign``
     -
   * - ``\eqalignno``
     -
   * - ``\eqcirc``
     - **ams**
   * - ``\eqref``
     - **ams**
   * - ``\eqsim``
     - **ams**
   * - ``\eqslantgtr``
     - **ams**
   * - ``\eqslantless``
     - **ams**
   * - ``\equiv``
     -
   * - ``\erf``
     - *physics*
   * - ``\eta``
     -
   * - ``\eth``
     - **ams**
   * - ``\ev``
     - *physics*
   * - ``\eval``
     - *physics*
   * - ``\evaluated``
     - *physics*
   * - ``\exists``
     -
   * - ``\exp``
     - **base**, *physics*
   * - ``\expectationvalue``
     - *physics*
   * - ``\exponential``
     - *physics*
   * - ``\expval``
     - *physics*


F
=

.. list-table::
   :widths: 70 30

   * - ``\fallingdotseq``
     - **ams**
   * - ``\fbox``
     -
   * - ``\fcolorbox``
     - color
   * - ``\fderivative``
     - *physics*
   * - ``\fdv``
     - *physics*
   * - ``\Finv``
     - **ams**
   * - ``\flat``
     -
   * - ``\flatfrac``
     - *physics*
   * - ``\forall``
     -
   * - ``\frac``
     - **ams**, **base**
   * - ``\frak``
     -
   * - ``\frown``
     -
   * - ``\functionalderivative``
     - *physics*


G
=

.. list-table::
   :widths: 70 30

   * - ``\Game``
     - **ams**
   * - ``\Gamma``
     -
   * - ``\gamma``
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
   * - ``\grad``
     - *physics*
   * - ``\gradient``
     - *physics*
   * - ``\gradientnabla``
     - *physics*
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
=

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
     -
   * - ``\href``
     - html
   * - ``\hskip``
     -
   * - ``\hslash``
     - **ams**
   * - ``\hspace``
     -
   * - ``\Huge``
     -
   * - ``\huge``
     -
   * - ``\hypcosecant``
     - *physics*
   * - ``\hypcosine``
     - *physics*
   * - ``\hypcotangent``
     - *physics*
   * - ``\hypsecant``
     - *physics*
   * - ``\hypsine``
     - *physics*
   * - ``\hyptangent``
     - *physics*


I
=

.. list-table::
   :widths: 70 30

   * - ``\identitymatrix``
     - *physics*
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
     - **base**, *physics*
   * - ``\imaginary``
     - *physics*
   * - ``\imat``
     - *physics*
   * - ``\imath``
     -
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
     - *physics*
   * - ``\int``
     -
   * - ``\intercal``
     - **ams**
   * - ``\intop``
     -
   * - ``\iota``
     -
   * - ``\it``
     -


J
=

.. list-table::
   :widths: 70 30

   * - ``\jmath``
     -
   * - ``\Join``
     - **ams**


K
=

.. list-table::
   :widths: 70 30

   * - ``\kappa``
     -
   * - ``\ker``
     -
   * - ``\kern``
     -
   * - ``\Ket``
     - braket
   * - ``\ket``
     - braket, *physics*
   * - ``\Ketbra``
     - braket
   * - ``\ketbra``
     - braket, *physics*


L
=

.. list-table::
   :widths: 70 30

   * - ``\label``
     -
   * - ``\Lambda``
     -
   * - ``\lambda``
     -
   * - ``\land``
     -
   * - ``\langle``
     -
   * - ``\laplacian``
     - *physics*
   * - ``\LARGE``
     -
   * - ``\Large``
     -
   * - ``\large``
     -
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
     -
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
   * - ``\llap``
     -
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
     - **base**, *physics*
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
     - **base**, *physics*
   * - ``\logarithm``
     - *physics*
   * - ``\Longleftarrow``
     -
   * - ``\longleftarrow``
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
   * - ``\Longrightarrow``
     -
   * - ``\longrightarrow``
     -
   * - ``\longRightleftharpoons``
     - *mhchem*
   * - ``\longrightleftharpoons``
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
   * - ``\lrcorner``
     - **ams**
   * - ``\Lsh``
     - **ams**
   * - ``\lt``
     -
   * - ``\ltimes``
     - **ams**
   * - ``\lVert``
     - **ams**
   * - ``\lvert``
     - **ams**
   * - ``\lvertneqq``
     - **ams**


M
=

.. list-table::
   :widths: 70 30

   * - ``\maltese``
     - **ams**
   * - ``\mapsto``
     -
   * - ``\mathbb``
     -
   * - ``\mathbf``
     -
   * - ``\mathbin``
     -
   * - ``\mathcal``
     -
   * - ``\mathchoice``
     -
   * - ``\mathclose``
     -
   * - ``\mathfrak``
     -
   * - ``\mathinner``
     -
   * - ``\mathit``
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
   * - ``\mathrm``
     -
   * - ``\mathscr``
     -
   * - ``\mathsf``
     -
   * - ``\mathstrut``
     -
   * - ``\mathtip``
     - action
   * - ``\mathtt``
     -
   * - ``\matrix``
     -
   * - ``\matrixdeterminant``
     - *physics*
   * - ``\matrixel``
     - *physics*
   * - ``\matrixelement``
     - *physics*
   * - ``\matrixquantity``
     - *physics*
   * - ``\max``
     -
   * - ``\mbox``
     -
   * - ``\mdet``
     - *physics*
   * - ``\measuredangle``
     - **ams**
   * - ``\mel``
     - *physics*
   * - ``\mho``
     - **ams**
   * - ``\mid``
     -
   * - ``\middle``
     -
   * - ``\min``
     -
   * - ``\minCDarrowheight``
     - amscd
   * - ``\minCDarrowwidth``
     - amscd
   * - ``\mit``
     -
   * - ``\mkern``
     -
   * - ``\mmlToken``
     -
   * - ``\mod``
     -
   * - ``\models``
     -
   * - ``\moveleft``
     -
   * - ``\moveright``
     -
   * - ``\mp``
     -
   * - ``\mqty``
     - *physics*
   * - ``\mskip``
     -
   * - ``\mspace``
     -
   * - ``\mu``
     -
   * - ``\multimap``
     - **ams**


N
=

.. list-table::
   :widths: 70 30

   * - ``\nabla``
     -
   * - ``\natural``
     -
   * - ``\naturallogarithm``
     - *physics*
   * - ``\ncong``
     - **ams**
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
     -
   * - ``\neq``
     -
   * - ``\newcommand``
     - **newcommand**
   * - ``\newenvironment``
     - **newcommand**
   * - ``\Newextarrow``
     - extpfeil
   * - ``\newline``
     -
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
   * - ``\nLeftarrow``
     - **ams**
   * - ``\nleftarrow``
     - **ams**
   * - ``\nLeftrightarrow``
     - **ams**
   * - ``\nleftrightarrow``
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
   * - ``\nobreakspace``
     - **ams**
   * - ``\nolimits``
     -
   * - ``\nonumber``
     -
   * - ``\norm``
     - *physics*
   * - ``\normalsize``
     -
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
   * - ``\nRightarrow``
     - **ams**
   * - ``\nrightarrow``
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
   * - ``\nVDash``
     - **ams**
   * - ``\nVdash``
     - **ams**
   * - ``\nvDash``
     - **ams**
   * - ``\nvdash``
     - **ams**
   * - ``\nwarrow``
     -


O
=

.. list-table::
   :widths: 70 30

   * - ``\odot``
     -
   * - ``\oint``
     -
   * - ``\oldstyle``
     -
   * - ``\Omega``
     -
   * - ``\omega``
     -
   * - ``\omicron``
     -
   * - ``\ominus``
     -
   * - ``\op``
     - *physics*
   * - ``\operatorname``
     - **ams**
   * - ``\oplus``
     -
   * - ``\order``
     - *physics*
   * - ``\oslash``
     -
   * - ``\otimes``
     -
   * - ``\outerproduct``
     - *physics*
   * - ``\over``
     -
   * - ``\overbrace``
     -
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
   * - ``\overwithdelims``
     -
   * - ``\owns``
     -


P
=

.. list-table::
   :widths: 70 30

   * - ``\parallel``
     -
   * - ``\partial``
     -
   * - ``\partialderivative``
     - *physics*
   * - ``\paulimatrix``
     - *physics*
   * - ``\pb``
     - *physics*
   * - ``\pderivative``
     - *physics*
   * - ``\pdv``
     - *physics*
   * - ``\perp``
     -
   * - ``\phantom``
     -
   * - ``\Phi``
     -
   * - ``\phi``
     -
   * - ``\Pi``
     -
   * - ``\pi``
     -
   * - ``\pitchfork``
     - **ams**
   * - ``\pm``
     -
   * - ``\pmat``
     - *physics*
   * - ``\pmatrix``
     -
   * - ``\pmb``
     -
   * - ``\pmod``
     -
   * - ``\Pmqty``
     - *physics*
   * - ``\pmqty``
     - *physics*
   * - ``\pod``
     -
   * - ``\poissonbracket``
     - *physics*
   * - ``\pqty``
     - *physics*
   * - ``\Pr``
     - **base**, *physics*
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
   * - ``\prime``
     -
   * - ``\principalvalue``
     - *physics*
   * - ``\Probability``
     - *physics*
   * - ``\prod``
     -
   * - ``\projlim``
     - **ams**
   * - ``\propto``
     -
   * - ``\Psi``
     -
   * - ``\psi``
     -
   * - ``\pu``
     - mhchem
   * - ``\PV``
     - *physics*
   * - ``\pv``
     - *physics*


Q
=

.. list-table::
   :widths: 70 30

   * - ``\qall``
     - *physics*
   * - ``\qand``
     - *physics*
   * - ``\qas``
     - *physics*
   * - ``\qassume``
     - *physics*
   * - ``\qc``
     - *physics*
   * - ``\qcc``
     - *physics*
   * - ``\qcomma``
     - *physics*
   * - ``\qelse``
     - *physics*
   * - ``\qeven``
     - *physics*
   * - ``\qfor``
     - *physics*
   * - ``\qgiven``
     - *physics*
   * - ``\qif``
     - *physics*
   * - ``\qin``
     - *physics*
   * - ``\qinteger``
     - *physics*
   * - ``\qlet``
     - *physics*
   * - ``\qodd``
     - *physics*
   * - ``\qor``
     - *physics*
   * - ``\qotherwise``
     - *physics*
   * - ``\qq``
     - *physics*
   * - ``\qqtext``
     - *physics*
   * - ``\qquad``
     -
   * - ``\qsince,``
     - *physics*
   * - ``\qthen``
     - *physics*
   * - ``\qty``
     - *physics*
   * - ``\quad``
     -
   * - ``\quantity``
     - *physics*
   * - ``\qunless``
     - *physics*
   * - ``\qusing``
     - *physics*


R
=

.. list-table::
   :widths: 70 30

   * - ``\raise``
     -
   * - ``\rangle``
     -
   * - ``\rank``
     - *physics*
   * - ``\rbrace``
     -
   * - ``\rbrack``
     -
   * - ``\rceil``
     -
   * - ``\Re``
     - **base**, *physics*
   * - ``\real``
     - *physics*
   * - ``\ref``
     -
   * - ``\renewcommand``
     - **newcommand**
   * - ``\renewenvironment``
     - **newcommand**
   * - ``\require``
     - **require**
   * - ``\Res``
     - *physics*
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
   * - ``\rightleftarrows``
     - **ams**
   * - ``\rightleftharpoons``
     - **ams**, **base**
   * - ``\rightrightarrows``
     - **ams**
   * - ``\rightsquigarrow``
     - **ams**
   * - ``\rightthreetimes``
     - **ams**
   * - ``\risingdotseq``
     - **ams**
   * - ``\rlap``
     -
   * - ``\rm``
     -
   * - ``\rmoustache``
     -
   * - ``\root``
     -
   * - ``\Rrightarrow``
     - **ams**
   * - ``\Rsh``
     - **ams**
   * - ``\rtimes``
     - **ams**
   * - ``\Rule``
     -
   * - ``\rule``
     -
   * - ``\rVert``
     - **ams**
   * - ``\rvert``
     - **ams**


S
=

.. list-table::
   :widths: 70 30

   * - ``\S``
     -
   * - ``\sbmqty``
     - *physics*
   * - ``\scr``
     -
   * - ``\scriptscriptstyle``
     -
   * - ``\scriptsize``
     -
   * - ``\scriptstyle``
     -
   * - ``\searrow``
     -
   * - ``\sec``
     - **base**, *physics*
   * - ``\secant``
     - *physics*
   * - ``\sech``
     - *physics*
   * - ``\Set``
     - braket
   * - ``\set``
     - braket
   * - ``\setminus``
     -
   * - ``\sf``
     -
   * - ``\sharp``
     -
   * - ``\shortmid``
     - **ams**
   * - ``\shortparallel``
     - **ams**
   * - ``\shoveleft``
     - **ams**
   * - ``\shoveright``
     - **ams**
   * - ``\sideset``
     - **ams**
   * - ``\Sigma``
     -
   * - ``\sigma``
     -
   * - ``\sim``
     -
   * - ``\simeq``
     -
   * - ``\sin``
     - **base**, *physics*
   * - ``\sine``
     - *physics*
   * - ``\sinh``
     - **base**, *physics*
   * - ``\skew``
     -
   * - ``\SkipLimits``
     - **ams**
   * - ``\small``
     -
   * - ``\smallfrown``
     - **ams**
   * - ``\smallint``
     -
   * - ``\smallmatrixquantity``
     - *physics*
   * - ``\smallsetminus``
     - **ams**
   * - ``\smallsmile``
     - **ams**
   * - ``\smash``
     -
   * - ``\smdet``
     - *physics*
   * - ``\smile``
     -
   * - ``\smqty``
     - *physics*
   * - ``\Space``
     -
   * - ``\space``
     -
   * - ``\spadesuit``
     -
   * - ``\sphericalangle``
     - **ams**
   * - ``\sPmqty``
     - *physics*
   * - ``\spmqty``
     - *physics*
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
   * - ``\stackrel``
     -
   * - ``\star``
     -
   * - ``\strut``
     -
   * - ``\style``
     - html
   * - ``\Subset``
     - **ams**
   * - ``\subset``
     -
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
   * - ``\Supset``
     - **ams**
   * - ``\supset``
     -
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
     - *physics*
   * - ``\swarrow``
     -


T
=

.. list-table::
   :widths: 70 30

   * - ``\tag``
     - **ams**
   * - ``\tan``
     - **base**, *physics*
   * - ``\tangent``
     - *physics*
   * - ``\tanh``
     - **base**, *physics*
   * - ``\tau``
     -
   * - ``\tbinom``
     - **ams**
   * - ``\TeX``
     -
   * - ``\text``
     -
   * - ``\textbf``
     -
   * - ``\textcolor``
     - color
   * - ``\textit``
     -
   * - ``\textrm``
     -
   * - ``\textsf``
     -
   * - ``\textstyle``
     -
   * - ``\texttip``
     - action
   * - ``\texttt``
     -
   * - ``\tfrac``
     - **ams**
   * - ``\therefore``
     - **ams**
   * - ``\Theta``
     -
   * - ``\theta``
     -
   * - ``\thickapprox``
     - **ams**
   * - ``\thicksim``
     - **ams**
   * - ``\thinspace``
     -
   * - ``\tilde``
     -
   * - ``\times``
     -
   * - ``\Tiny``
     -
   * - ``\tiny``
     -
   * - ``\to``
     -
   * - ``\toggle``
     - action
   * - ``\top``
     -
   * - ``\Tr``
     - *physics*
   * - ``\tr``
     - *physics*
   * - ``\Trace``
     - *physics*
   * - ``\trace``
     - *physics*
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
   * - ``\tripledash``
     - *mhchem*
   * - ``\tt``
     -
   * - ``\twoheadleftarrow``
     - **ams**
   * - ``\twoheadrightarrow``
     - **ams**


U
=

.. list-table::
   :widths: 70 30

   * - ``\ulcorner``
     - **ams**
   * - ``\underbrace``
     -
   * - ``\underleftarrow``
     -
   * - ``\underleftrightarrow``
     -
   * - ``\underline``
     -
   * - ``\underparen``
     -
   * - ``\underrightarrow``
     -
   * - ``\underset``
     -
   * - ``\unicode``
     - unicode
   * - ``\unlhd``
     - **ams**
   * - ``\unrhd``
     - **ams**
   * - ``\Uparrow``
     -
   * - ``\uparrow``
     -
   * - ``\Updownarrow``
     -
   * - ``\updownarrow``
     -
   * - ``\upharpoonleft``
     - **ams**
   * - ``\upharpoonright``
     - **ams**
   * - ``\uplus``
     -
   * - ``\uproot``
     -
   * - ``\Upsilon``
     -
   * - ``\upsilon``
     -
   * - ``\upuparrows``
     - **ams**
   * - ``\urcorner``
     - **ams**


V
=

.. list-table::
   :widths: 70 30

   * - ``\va``
     - *physics*
   * - ``\var``
     - *physics*
   * - ``\varDelta``
     - **ams**
   * - ``\varepsilon``
     -
   * - ``\varGamma``
     - **ams**
   * - ``\variation``
     - *physics*
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
   * - ``\varPhi``
     - **ams**
   * - ``\varphi``
     -
   * - ``\varPi``
     - **ams**
   * - ``\varpi``
     -
   * - ``\varprojlim``
     - **ams**
   * - ``\varpropto``
     - **ams**
   * - ``\varPsi``
     - **ams**
   * - ``\varrho``
     -
   * - ``\varSigma``
     - **ams**
   * - ``\varsigma``
     -
   * - ``\varsubsetneq``
     - **ams**
   * - ``\varsubsetneqq``
     - **ams**
   * - ``\varsupsetneq``
     - **ams**
   * - ``\varsupsetneqq``
     - **ams**
   * - ``\varTheta``
     - **ams**
   * - ``\vartheta``
     -
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
     - *physics*
   * - ``\vcenter``
     -
   * - ``\Vdash``
     - **ams**
   * - ``\vDash``
     - **ams**
   * - ``\vdash``
     -
   * - ``\vdot``
     - *physics*
   * - ``\vdots``
     -
   * - ``\vec``
     -
   * - ``\vectorarrow``
     - *physics*
   * - ``\vectorbold``
     - *physics*
   * - ``\vectorunit``
     - *physics*
   * - ``\vee``
     -
   * - ``\veebar``
     - **ams**
   * - ``\verb``
     - verb
   * - ``\Vert``
     -
   * - ``\vert``
     -
   * - ``\vmqty``
     - *physics*
   * - ``\vphantom``
     -
   * - ``\vqty``
     - *physics*
   * - ``\vu``
     - *physics*
   * - ``\Vvdash``
     - **ams**


W
=

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
=

.. list-table::
   :widths: 70 30

   * - ``\xcancel``
     - cancel
   * - ``\Xi``
     -
   * - ``\xi``
     -
   * - ``\xleftarrow``
     - **ams**, *mhchem*
   * - ``\xleftrightarrow``
     - *mhchem*
   * - ``\xLeftrightharpoons``
     - *mhchem*
   * - ``\xlongequal``
     - extpfeil
   * - ``\xmapsto``
     - extpfeil
   * - ``\xmat``
     - *physics*
   * - ``\xmatrix``
     - *physics*
   * - ``\xrightarrow``
     - **ams**, *mhchem*
   * - ``\xRightleftharpoons``
     - *mhchem*
   * - ``\xrightleftharpoons``
     - *mhchem*
   * - ``\xtofrom``
     - extpfeil
   * - ``\xtwoheadleftarrow``
     - extpfeil
   * - ``\xtwoheadrightarrow``
     - extpfeil


Y
=

.. list-table::
   :widths: 70 30

   * - ``\yen``
     - **ams**


Z
=

.. list-table::
   :widths: 70 30

   * - ``\zeromatrix``
     - *physics*
   * - ``\zeta``
     -
   * - ``\zmat``
     - *physics*


Environments
============

LaTeX environments of the form ``\begin{NAME} ... \end{NAME}`` are
provided where ``NAME`` is one of the following:

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
   * - ``Bmatrix``
     - **ams**
   * - ``bmatrix``
     - **ams**
   * - ``cases``
     - **ams**
   * - ``CD``
     - amscd
   * - ``eqnarray``
     -
   * - ``eqnarray*``
     - **ams**
   * - ``equation``
     -
   * - ``equation*``
     -
   * - ``gather``
     - **ams**
   * - ``gather*``
     - **ams**
   * - ``gathered``
     - **ams**
   * - ``matrix``
     - **ams**
   * - ``multline``
     - **ams**
   * - ``multline*``
     - **ams**
   * - ``pmatrix``
     - **ams**
   * - ``smallmatrix``
     - **ams**, *physics*
   * - ``split``
     - **ams**
   * - ``subarray``
     - **ams**
   * - ``Vmatrix``
     - **ams**
   * - ``vmatrix``
     - **ams**

|-----|
