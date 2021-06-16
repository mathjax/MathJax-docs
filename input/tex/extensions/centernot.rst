.. _tex-centernot:

#########
centernot
#########

The `centernot` extension implements the ``centernot`` style package from
LaTeX. It provides the ``\centernot`` command which can be used as a replacement
of the standard ``\not`` command and generally leads to a better alignment of
the slash with the operator it negates. This can be observed with the following
two examples:


.. code-block:: latex

  \begin{array}{c}
    A \not\longrightarrow B\\
    A \centernot\longrightarrow B
  \end{array}


.. code-block:: latex

  \begin{array}{c}
    A \nparallel B\\
    A \not\parallel B\\
    A \centernot\parallel B
  \end{array}

See also the `CTAN page <https://www.ctan.org/pkg/centernot>`__ for more
information and documentation of `centernot`.

In addition to ``\centernot`` the package also implements the non-standard
``\centerOver``.

.. describe:: \centerOver{symbol1}{symbol2}

    Overlays ``symbol2`` centered on top of ``symbol1``.


This package is not autoloaded, so you must request it explicitly if you want to
use it.  To load the `centernot` extension, add ``'[tex]/centernot'`` to the
``load`` array of the ``loader`` block of your MathJax configuration, and add
``'centernot'`` to the ``packages`` array of the ``tex`` block.

.. code-block:: javascript

   window.MathJax = {
     loader: {load: ['[tex]/centernot']},
     tex: {packages: {'[+]': ['centernot']}}
   };



You can configure the `autoload` extension to load `centernot` via

.. code-block:: javascript

   window.MathJax = {
     tex: {
       autoload: {
         centernot: ['centernot', 'centerOver']
       }
     }
   };


Alternatively, use ``\require{centernot}`` in a TeX expression to load it
dynamically from within the math on the page, if the `require`
extension is loaded.

-----


.. _tex-centernot-commands:


centernot Commands
------------------

The `centernot` extension implements the following macros:
``\centernot``, ``\centerOver``


|-----|
