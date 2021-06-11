.. _tex-physics:

#######
physics
#######

The `physics` extension implements much of the LaTeX `physics package
<https://ctan.org/pkg/physics?lang=en>`_, which defines simple, yet
flexible macros for typesetting equations via:

* Automatic bracing
* Vector notation
* Derivatives
* Dirac bra-ket notation
* Matrix macros
* Additional trig functions and other convenient operators
* Flat fractions and other useful miscellaneous math macros

See the `documentation
<http://mirrors.ctan.org/macros/latex/contrib/physics/physics.pdf>`_
for the LaTeX package for more information.

This package is not autoloaded, due to the fact that it redefines many
standard macros, so you must request it explicitly if you want to use
it.  To load the `physics` extension, add ``'[tex]/physics'`` to the
``load`` array of the ``loader`` block of your MathJax configuration,
and add ``'physics'`` to the ``packages`` array of the ``tex`` block.

.. code-block:: javascript

   window.MathJax = {
     loader: {load: ['[tex]/physics']},
     tex: {packages: {'[+]': ['physics']}}
   };

Alternatively, use ``\require{physics}`` in a TeX expression to load it
dynamically from within the math on the page, if the `require`
package is loaded.

-----


.. _tex-physics-options:


physics Options
---------------

Adding the `physics` extension to the ``packages`` array defines an
``physics`` sub-block of the ``tex`` configuration block with the
following values:

.. code-block:: javascript

  MathJax = {
    tex: {
      physics: {
        italicdiff: false,
        arrowdel: false
      }
    }
  };


.. _tex-physics-italicdiff:
.. describe:: italicdiff: false

This corresponds to the ``italicdiff`` option of the `physics` LaTeX package to
use italic form for the `d` in the ``\differential`` and ``\derivative```
commands.

.. _tex-physics-arrowdel:
.. describe:: arrowdel: false

This corresponds to the ``arrowdel`` option of the `physics` LaTeX package to
use vector notation over the nabla symbol.

Note, that the `physics` extension does not implement the `notrig` option.

-----


.. _tex-physics-commands:


physics Commands
----------------

The `physics` extension implements the following macros:
``\abs``, ``\absolutevalue``, ``\acomm``, ``\acos``, ``\acosecant``, ``\acosine``, ``\acot``, ``\acotangent``, ``\acsc``, ``\admat``, ``\anticommutator``, ``\antidiagonalmatrix``, ``\arccos``, ``\arccosecant``, ``\arccosine``, ``\arccot``, ``\arccotangent``, ``\arccsc``, ``\arcsec``, ``\arcsecant``, ``\arcsin``, ``\arcsine``, ``\arctan``, ``\arctangent``, ``\asec``, ``\asecant``, ``\asin``, ``\asine``, ``\atan``, ``\atangent``, ``\bmqty``, ``\bqty``, ``\Bqty``, ``\bra``, ``\braket``, ``\comm``, ``\commutator``, ``\cos``, ``\cosecant``, ``\cosh``, ``\cosine``, ``\cot``, ``\cotangent``, ``\coth``, ``\cp``, ``\cross``, ``\crossproduct``, ``\csc``, ``\csch``, ``\curl``, ``\dd``, ``\derivative``, ``\det``, ``\determinant``, ``\diagonalmatrix``, ``\diffd``, ``\differential``, ``\div``, ``\divergence``, ``\dmat``, ``\dotproduct``, ``\dv``, ``\dyad``, ``\erf``, ``\ev``, ``\eval``, ``\evaluated``, ``\exp``, ``\expectationvalue``, ``\exponential``, ``\expval``, ``\fderivative``, ``\fdv``, ``\flatfrac``, ``\functionalderivative``, ``\grad``, ``\gradient``, ``\gradientnabla``, ``\hypcosecant``, ``\hypcosine``, ``\hypcotangent``, ``\hypsecant``, ``\hypsine``, ``\hyptangent``, ``\identitymatrix``, ``\Im``, ``\imaginary``, ``\imat``, ``\innerproduct``, ``\ip``, ``\ket``, ``\ketbra``, ``\laplacian``, ``\ln``, ``\log``, ``\logarithm``, ``\matrixdeterminant``, ``\matrixel``, ``\matrixelement``, ``\matrixquantity``, ``\mdet``, ``\mel``, ``\mqty``, ``\naturallogarithm``, ``\norm``, ``\op``, ``\order``, ``\outerproduct``, ``\partialderivative``, ``\paulimatrix``, ``\pb``, ``\pderivative``, ``\pdv``, ``\pmat``, ``\pmqty``, ``\Pmqty``, ``\poissonbracket``, ``\pqty``, ``\Pr``, ``\principalvalue``, ``\Probability``, ``\pv``, ``\PV``, ``\qall``, ``\qand``, ``\qas``, ``\qassume``, ``\qc``, ``\qcc``, ``\qcomma``, ``\qelse``, ``\qeven``, ``\qfor``, ``\qgiven``, ``\qif``, ``\qin``, ``\qinteger``, ``\qlet``, ``\qodd``, ``\qor``, ``\qotherwise``, ``\qq``, ``\qqtext``, ``\qsince``, ``\qthen``, ``\qty``, ``\quantity``, ``\qunless``, ``\qusing``, ``\rank``, ``\Re``, ``\real``, ``\Res``, ``\Residue``, ``\sbmqty``, ``\sec``, ``\secant``, ``\sech``, ``\sin``, ``\sine``, ``\sinh``, ``\smallmatrixquantity``, ``\smdet``, ``\smqty``, ``\spmqty``, ``\sPmqty``, ``\svmqty``, ``\tan``, ``\tangent``, ``\tanh``, ``\tr``, ``\Tr``, ``\trace``, ``\Trace``, ``\va``, ``\var``, ``\variation``, ``\vb``, ``\vdot``, ``\vectorarrow``, ``\vectorbold``, ``\vectorunit``, ``\vmqty``, ``\vnabla``, ``\vqty``, ``\vu``, ``\xmat``, ``\xmatrix``, ``\zeromatrix``, ``\zmat``

And the following environments:
``smallmatrix``


|-----|
