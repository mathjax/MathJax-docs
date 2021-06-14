.. _tex-amscd:

#####
amscd
#####

The `amscd` extensions implements the `CD` environment for commutative
diagrams.  See the `AMScd guide
<http://www.jmilne.org/not/Mamscd.pdf>`__ for more information on how
to use the `CD` environment.

This extension is loaded automatically when the `autoload` extension
is used.  To load the `amscd` extension explicitly, add
``'[tex]/amscd'`` to the ``load`` array of the ``loader`` block of
your MathJax configuration, and add ``'amscd'`` to the ``packages``
array of the ``tex`` block.

.. code-block:: javascript

   window.MathJax = {
     loader: {load: ['[tex]/amscd']},
     tex: {packages: {'[+]': ['amscd']}}
   };

Alternatively, use ``\require{amscd}`` in a TeX expression to load it
dynamically from within the math on the page, if the `require`
extension is loaded.

-----


.. _tex-amscd-options:

amscd Options
-------------

Adding the `amscd` extension to the ``packages`` array defines an
``amscd`` sub-block of the ``tex`` configuration block with the
following values:

.. code-block:: javascript

   MathJax = {
     tex: {
       amscd: {
         colspace: '5pt',
         rowspace: '5pt',
         harrowsize: '2.75em',
         varrowsize: '1.75em',
         hideHorizontalLabels: false
       }
     }
   };

.. _tex-amscd-colspace:
.. describe:: colspace: '5pt'

   This gives the amount of space to use between columns in the
   commutative diagram.

.. _tex-amscd-rowspace:
.. describe:: rowspace: '5pt'

   This gives the amount of space to use between rows in the
   commutative diagram.

.. _tex-amscd-harrowsize:
.. describe:: harrowsize: '2.75em'

   This gives the minimum size for horizontal arrows in the
   commutative diagram.

.. _tex-amscd-varrowsize:
.. describe:: varrowsize: '1.75em'

   This gives the minimum size for vertical arrows in the
   commutative diagram.

.. _tex-amscd-hideHorizontalLabels:
.. describe:: hideHorizontalLabels: false

   This determines whether horizontal arrows with labels above or
   below will use ``\smash`` in order to hide the height of the
   labels.  (Labels above or below horizontal arrows can cause excess
   space between rows, so setting this to ``true`` can improve the
   look of the diagram.)


-----


.. _tex-amscd-commands:


amscd Commands
--------------

The `amscd` extension implements the following macros:
``@``, ``\minCDarrowheight``, ``\minCDarrowwidth``

And the following environments:
``CD``


|-----|
