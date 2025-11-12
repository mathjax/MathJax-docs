.. _tex-empheq:

######
empheq
######

The `empheq` extension partially implements the ``empheq`` style
package from LaTeX.  The package provides macros and environments for
emphasising equations.  See the :ref:`list of control sequences
<tex-empheq-commands>` for details about what commands are implemented
in this extension.  Note, that the current implementation of the
``empheq`` environment supports only the ``left`` and ``right``
options. Also see the `empheq CTAN page
<https://www.ctan.org/pkg/empheq>`__ for more information and
documentation.

As an example, you could do:

.. code-block:: latex

   \begin{empheq}[left=\empheqlbrace, right=\empheqrbrace]{align}
   E&=mc^2 \\
   Y&= \sum_{n=1}^\infty \frac{1}{n^2}
   \end{empheq}

.. raw:: html

    <p>which renders as follows:</p>
    <p style="background-color: #DDD; padding: 1em 0; text-align: center">
    <iframe style='width: 25em; height: 8em; background-color: white' srcdoc='
      <!DOCTYPE html>
      <html>
      <head>
      <title>MathJax empheq Examples</title>
      <script>
      MathJax = {
        loader: {load: ["[tex]/empheq"]},
        tex: {packages: {"[+]": ["empheq"]}, tags: "ams"}
      }
      </script>
      <script defer src="https://cdn.jsdelivr.net/npm/mathjax@4/tex-chtml.js">
      </script>
      </head>
      <body>
      \begin{empheq}[left=\empheqlbrace, right=\empheqrbrace]{align}
      E&=mc^2 \\
      Y&= \sum_{n=1}^\infty \frac{1}{n^2}
      \end{empheq}
      </body>
      </html>
    '></iframe>
    </p>


This package is not autoloaded, so you must request it explicitly if
you want to use it.  To load the `empheq` extension, add
``'[tex]/empheq'`` to the :data:`load` array of the :data:`loader`
block of your MathJax configuration, and add ``'empheq'`` to the
:data:`packages` array of the :data:`tex` block.

.. code-block:: javascript

   window.MathJax = {
     loader: {load: ['[tex]/empheq']},
     tex: {packages: {'[+]': ['empheq']}}
   };

You can configure the :ref:`tex-autoload` extension to load `empheq`
when the ``empheq`` environment is first used via

.. code-block:: javascript

   window.MathJax = {
     tex: {
       autoload: {
         empheq: [[], ['empheq']]
       }
     }
   };

Alternatively, use ``\require{empheq}`` in a TeX expression to load it
dynamically from within the math on the page, if the :ref:`tex-require`
extension is loaded.

-----

.. _tex-empheq-commands:

empheq Commands
---------------

The `empheq` extension implements the following macros:
``\empheqbigl``, ``\empheqbiglangle``, ``\empheqbiglbrace``, ``\empheqbiglbrack``, ``\empheqbiglceil``, ``\empheqbiglfloor``, ``\empheqbiglparen``, ``\empheqbiglvert``, ``\empheqbiglVert``, ``\empheqbigr``, ``\empheqbigrangle``, ``\empheqbigrbrace``, ``\empheqbigrbrack``, ``\empheqbigrceil``, ``\empheqbigrfloor``, ``\empheqbigrparen``, ``\empheqbigrvert``, ``\empheqbigrVert``, ``\empheql``, ``\empheqlangle``, ``\empheqlbrace``, ``\empheqlbrack``, ``\empheqlceil``, ``\empheqlfloor``, ``\empheqlparen``, ``\empheqlvert``, ``\empheqlVert``, ``\empheqr``, ``\empheqrangle``, ``\empheqrbrace``, ``\empheqrbrack``, ``\empheqrceil``, ``\empheqrfloor``, ``\empheqrparen``, ``\empheqrvert``, ``\empheqrVert``

And the following environments:
``empheq``


|-----|
