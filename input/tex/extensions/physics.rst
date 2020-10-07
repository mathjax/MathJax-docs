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

|-----|
