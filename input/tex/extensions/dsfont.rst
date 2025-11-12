.. _tex-dsfont:

######
dsfont
######


The `dsfont` extension implements the ``dsfont`` style package from
LaTeX.  See the `dsfont CTAN page <https://www.ctan.org/pkg/dsfont>`__
for more information and documentation.

This extension defines the following commands:

.. describe:: \mathds{math}

   Typesets ``math`` using the dsfont blackboard-bold fonts.

The dsfonts come in two forms: serifed and san-serif; which one is
used is determined by an option described :ref`below
<tex-dsfont-options>`.

.. raw:: html

    <p>The normal version of these fonts is shown below:</p>
    <p style="background-color: #DDD; padding: 1em 0; text-align: center">
    <iframe style='width: 25em; height: 8em; background-color: white' srcdoc='
      <!DOCTYPE html>
      <html>
      <head>
      <title>MathJax dsfont Example</title>
      <script>
      MathJax = {
        loader: {load: ["[tex]/dsfont"]},
        tex: {packages: {"[+]": ["dsfont"]}}
      }
      </script>
      <script defer src="https://cdn.jsdelivr.net/npm/mathjax@4/tex-chtml.js">
      </script>
      </head>
      <body>
      <p><b>\mathds</b><br/>
      \(\mathds{ABCDEFGHIJKLMNOPQRSTUVWXYZ\\abcdefghijklmnopqrstuvwxyz\\0123456789}\)
      </p>
      </body>
      </html>
    '></iframe>
    </p>

.. raw:: html

    <p>The sans-serif version of these fonts is shown below:</p>
    <p style="background-color: #DDD; padding: 1em 0; text-align: center">
    <iframe style='width: 25em; height: 8em; background-color: white' srcdoc='
      <!DOCTYPE html>
      <html>
      <head>
      <title>MathJax dsfont Example</title>
      <script>
      MathJax = {
        loader: {load: ["[tex]/dsfont"]},
        tex: {
          packages: {"[+]": ["dsfont"]},
          dsfont: {sans: true}
        }
      }
      </script>
      <script defer src="https://cdn.jsdelivr.net/npm/mathjax@4/tex-chtml.js">
      </script>
      </head>
      <body>
      <p><b>\mathds</b><br/>
      \(\mathds{ABCDEFGHIJKLMNOPQRSTUVWXYZ\\abcdefghijklmnopqrstuvwxyz\\0123456789}\)
      </p>
      </body>
      </html>
    '></iframe>
    </p>


This package is not autoloaded, so you must request it explicitly if
you want to use it.  To load the `dsfont` extension, add
``'[tex]/dsfont'`` to the :data:`load` array of the :data:`loader`
block of your MathJax configuration, and add ``'dsfont'`` to the
:data:`packages` array of the :data:`tex` block.

.. code-block:: javascript

   window.MathJax = {
     loader: {load: ['[tex]/dsfont']},
     tex: {packages: {'[+]': ['dsfont']}}
   };

Alternatively, use ``\require{dsfont}`` in a TeX expression to load it
dynamically from within the math on the page, if the :ref:`tex-require`
extension is loaded.

-----

.. _tex-dsfont-options:

dsfont Options
--------------

Adding the `dsfont` extension to the :data:`packages` array defines an
:data:`dsfont` sub-block of the :data:`tex` configuration block with the
following values:

.. code-block:: javascript

   MathJax = {
     tex: {
       dsfont: {
         sans: false
       }
     }
   };

.. _tex-dsfont-sans:
.. describe:: sans: false

   Determines whether the sans-serif font is used rather than the
   serifed version.

-----

.. _tex-dsfont-commands:

dsfont Commands
---------------

The `dsfont` extension implements the following macros:
``\mathds``


|-----|
