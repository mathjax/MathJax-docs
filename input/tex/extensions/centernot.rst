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



.. code-block:: javascript

   window.MathJax = {
     loader: {load: ['[tex]/centernot']},
     tex: {packages: {'[+]': ['centernot']}}
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
