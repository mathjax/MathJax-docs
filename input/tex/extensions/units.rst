.. _tex-units:

#####
units
#####


The `units` extension implements the ``units`` style package from
LaTeX, which defines the ``\nicefrac``, ``\unitfrac`` and ``\units``
macros.  See the `units CTAN page <https://www.ctan.org/pkg/units>`__
for more information and documentation.

.. note::

   An implementation for MathJax of the ``siunitx`` LaTeX package is
   under development by a third party, and we hope to make it
   available soon.

This package is not autoloaded, so you must request it explicitly if
you want to use it.  To load the `units` extension explicitly, add
``'[tex]/units'`` to the :data:`load` array of the :data:`loader`
block of your MathJax configuration, and add ``'units'`` to the
:data:`packages` array of the :data:`tex` block.

.. code-block:: javascript

   window.MathJax = {
     loader: {load: ['[tex]/units']},
     tex: {packages: {'[+]': ['units']}}
   };

Alternatively, use ``\require{units}`` in a TeX expression to load it
dynamically from within the math on the page, if the :ref:`tex-require`
extension is loaded.

-----

.. _tex-units-options:

units Options
-------------

Adding the `units` extension to the :data:`packages` array defines an
:data:`units` sub-block of the :data:`tex` configuration block with the
following values:

.. code-block:: javascript

   MathJax = {
     tex: {
       units: {
         loose: false,
         ugly: false
       }
     }
   };

.. _tex-units-loose:
.. describe:: loose: false

   Determines whether fractions are loose (true) or tight (false), as
   described in the `units documentation
   <https://ctan.math.washington.edu/tex-archive/macros/latex/contrib/units/units.pdf>`__.

.. _tex-units-ugly:
.. describe:: ugly: false

   Determines whether fractions are ugly (true) or nice (false), as
   described in the `units documentation
   <https://ctan.math.washington.edu/tex-archive/macros/latex/contrib/units/units.pdf>`__.


-----

.. _tex-units-commands:

units Commands
--------------

The `units` extension implements the following macros:
``\nicefrac``, ``\unitfrac``, ``\units``


|-----|
