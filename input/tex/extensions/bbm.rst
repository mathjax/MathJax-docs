.. _tex-bbm:

###
bbm
###


The `bbm` extension implements the ``bbm`` style package from LaTeX,
which makes alternative blackboard-bold characters available in TeX.
See the `bbm CTAN page <https://www.ctan.org/pkg/bbm>`__ for more
information and documentation.

This extension defines the following commands:

.. describe:: \mathbbm{math}

   Typesets ``math`` using the bbm blackboard-bold fonts.

.. describe:: \mathbbmss{math}

   Typesets ``math`` using the bbm blackboard-bold sans-serif fonts.

.. describe:: \mathbbmtt{math}

   Typesets ``math`` using the bbm blackboard-bold typewriter fonts.

.. describe:: \mathversion{name}

   Specifies whether the use the bold or normal versions of the bbm
   fonts.  If ``name`` is ``bold``, the bold versions are used;
   anything else indicates the normal versions.  This is a global
   setting, whise default is given by the :data:`bbm.bold`` setting
   described :ref:`below <tex-bbm-options>`.

.. raw:: html

    <p>The normal versions of these fonts are shown below:</p>
    <p style="background-color: #DDD; padding: 1em 0; text-align: center">
    <iframe style='width: 25em; height: 20em; background-color: white' srcdoc='
      <!DOCTYPE html>
      <html>
      <head>
      <title>MathJax bbm Example</title>
      <script>
      MathJax = {
        loader: {load: ["[tex]/bbm"]},
        tex: {packages: {"[+]": ["bbm"]}}
      }
      </script>
      <script defer src="https://cdn.jsdelivr.net/npm/mathjax@4/tex-chtml.js">
      </script>
      </head>
      <body>
      <p><b>\mathbbm</b><br/>
      \(\mathbbm{ABCDEFGHIJKLMNOPQRSTUVWXYZ\\abcdefghijklmnopqrstuvwxyz\\0123456789}\)
      </p>
      <p><b>\mathbbmss</b><br/>
      \(\mathbbmss{ABCDEFGHIJKLMNOPQRSTUVWXYZ\\abcdefghijklmnopqrstuvwxyz\\0123456789}\)
      </p>
      <p><b>\mathbbmtt</b><br/>
      \(\mathbbmtt{ABCDEFGHIJKLMNOPQRSTUVWXYZ\\abcdefghijklmnopqrstuvwxyz\\0123456789}\)
      </p>
      </body>
      </html>
    '></iframe>
    </p>


This package is not autoloaded, so you must request it explicitly if
you want to use it.  To load the `bbm` extension, add ``'[tex]/bbm'``
to the :data:`load` array of the :data:`loader` block of your MathJax
configuration, and add ``'bbm'`` to the :data:`packages` array of the
:data:`tex` block.

.. code-block:: javascript

   window.MathJax = {
     loader: {load: ['[tex]/bbm']},
     tex: {packages: {'[+]': ['bbm']}}
   };

Alternatively, use ``\require{bbm}`` in a TeX expression to load it
dynamically from within the math on the page, if the :ref:`tex-require`
extension is loaded.

-----

.. _tex-bbm-options:

bbm Options
-----------

Adding the `bbm` extension to the :data:`packages` array defines an
:data:`bbm` sub-block of the :data:`tex` configuration block with the
following values:

.. code-block:: javascript

   MathJax = {
     tex: {
       bbm: {
         bold: false
       }
     }
   };


.. _tex-bbm-bold:
.. describe:: bold: false

   Specifies whether the bold versions of the bbm fonts are to be
   used.  The default is to use the normal versions.

-----

.. _tex-bbm-commands:

bbm Commands
------------

The `bbm` extension implements the following macros:
``\mathbbm``, ``\mathbbmss``, ``\mathbbmtt``, ``\mathversion``


|-----|

