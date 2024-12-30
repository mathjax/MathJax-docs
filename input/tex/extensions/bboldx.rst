.. _tex-bboldx:

######
bboldx
######


The `bboldx` extension implements the ``bboldx`` style package from
LaTeX, which makes alternative black-board bold characters available
in TeX.  This includes not just the alphabetic and numeric characters,
but also for some punctuation, and macros for Greek upper- and
lower-case letters, along with several delimiters.  See the `bboldx
CTAN page <https://www.ctan.org/pkg/bboldx>`__ for more information
and documentation.

This package redefines the ``\mathbb`` macro to use one of the bboldx
fonts, based on the options described :ref:`below
<tex-bboldx-options>`.  This will typeset letters, numbers, and some
punctuation using the bboldx fonts.  To get the Greek letters,
however, you must use macros like ``\bbGamma`` and ``\bbalpha``.  The
complete set is:

**Uppercase Greek:**

*  ``\bbGamma``
*  ``\bbDelta``
*  ``\bbTheta``
*  ``\bbLambda``
*  ``\bbXi``
*  ``\bbPi``
*  ``\bbSigma``
*  ``\bbUpsilon``
*  ``\bbPhi``
*  ``\bbPsi``
*  ``\bbOmega``

**Lower Case Greek**

*  ``\bbalpha``
*  ``\bbbeta``
*  ``\bbgamma``
*  ``\bbdelta``
*  ``\bbepsilon``
*  ``\bbzeta``
*  ``\bbeta``
*  ``\bbtheta``
*  ``\bbiota``
*  ``\bbkappa``
*  ``\bblambda``
*  ``\bbmu``
*  ``\bbnu``
*  ``\bbxi``
*  ``\bbpi``
*  ``\bbrho``
*  ``\bbsigma``
*  ``\bbtau``
*  ``\bbupsilon``
*  ``\bbphi``
*  ``\bbchi``
*  ``\bbpsi``
*  ``\bbomega``

**Dotless i and j**

*  ``\bbdotlessi``
*  ``\bbdotlessj``

If the :ref:`tex-textmacros` extension is loaded, then the `bboldx`
extension will define text-based versions of the Greek commands as
well, prefixed by ``txt`` and ``txtbf``.  E.g., ``\txtbbalpha`` and
``\txtbbfbbalpha`` can be used in ``\text{}`` to get bboldx versions
of the alpha in normal and bold styles.  The dotless i and j can be
obtained from ``\itextbb``, ``\itexstbfbb``, ``\jtextbb``, and
``\jtextbbf``.

The bboldx extension also creates the delimiters ``\bbLparen``,
``\bbRparen``, ``\bbLbrack``, ``\bbRbrack``, ``\bbLangle``, and
``\bbRangle``, but since the fonts don't include any of the larger
versions or the pieces needed to make stretchy assemblies, these
don't work with ``\left`` and ``\right``, and will just produce the
normal stretchy parentheses, brackets, and angle brackets.


.. raw:: html

    <p>The normal versions of these fonts are shown below:</p>
    <p style="background-color: #DDD; padding: 1em 0; text-align: center">
    <iframe style='width: 25em; height: 12em; background-color: white' srcdoc='
      <!DOCTYPE html>
      <html>
      <head>
      <title>MathJax bboldx Examples</title>
      <script>
      MathJax = {
        loader: {load: ["[tex]/bboldx"]},
        tex: {packages: {"[+]": ["bboldx"]}}
      }
      </script>
      <script defer src="https://cdn.jsdelivr.net/npm/mathjax@4/tex-chtml.js">
      </script>
      </head>
      <body>
      <p><b>\mathbb</b><br/>
      \(\mathbb{
         ABCDEFGHIJKLMNOPQRSTUVWXYZ\\
         abcdefghijklmnopqrstuvwxyz\\
         0123456789\\
         !@\#\$\%\&(\,){+}[\,]:\,;<,>.?/\\
         \bbGamma\bbDelta\bbTheta\bbLambda\bbXi\bbPi\bbSigma\bbUpsilon\bbPhi\bbPsi\bbOmega\\
         \bbalpha\bbbeta\bbgamma\bbdelta\bbepsilon\bbzeta\bbeta\bbtheta\bbiota\bbkappa
         \bblambda\bbmu\bbnu\bbxi\bbpi\bbrho\bbsigma\bbtau\bbupsilon\bbphi\bbchi\bbpsi\bbomega\\
         \bbdotlessi\bbdotlessj
      }\)
      </p>
      </body>
      </html>
    '></iframe>
    </p>

.. raw:: html

    <p>These are the bold versions:</p>
    <p style="background-color: #DDD; padding: 1em 0; text-align: center">
    <iframe style='width: 25em; height: 12em; background-color: white' srcdoc='
      <!DOCTYPE html>
      <html>
      <head>
      <title>MathJax bboldx Examples</title>
      <script>
      MathJax = {
        loader: {load: ["[tex]/bboldx"]},
        tex: {packages: {"[+]": ["bboldx"]}, bboldx: {bfbb: true}}
      }
      </script>
      <script defer src="https://cdn.jsdelivr.net/npm/mathjax@4/tex-chtml.js">
      </script>
      </head>
      <body>
      <p><b>\mathbb with bfbb = true</b><br/>
      \(\mathbb{
         ABCDEFGHIJKLMNOPQRSTUVWXYZ\\
         abcdefghijklmnopqrstuvwxyz\\
         0123456789\\
         !@\#\$\%\&(\,){+}[\,]:\,;<,>.?/\\
         \bbGamma\bbDelta\bbTheta\bbLambda\bbXi\bbPi\bbSigma\bbUpsilon\bbPhi\bbPsi\bbOmega\\
         \bbalpha\bbbeta\bbgamma\bbdelta\bbepsilon\bbzeta\bbeta\bbtheta\bbiota\bbkappa
         \bblambda\bbmu\bbnu\bbxi\bbpi\bbrho\bbsigma\bbtau\bbupsilon\bbphi\bbchi\bbpsi\bbomega\\
         \bbdotlessi\bbdotlessj
      }\)
      </p>
      </body>
      </html>
    '></iframe>
    </p>

    <p>These are the light versions:</p>
    <p style="background-color: #DDD; padding: 1em 0; text-align: center">
    <iframe style='width: 25em; height: 12em; background-color: white' srcdoc='
      <!DOCTYPE html>
      <html>
      <head>
      <title>MathJax bboldx Examples</title>
      <script>
      MathJax = {
        loader: {load: ["[tex]/bboldx"]},
        tex: {packages: {"[+]": ["bboldx"]}, bboldx: {light: true}}
      }
      </script>
      <script defer src="https://cdn.jsdelivr.net/npm/mathjax@4/tex-chtml.js">
      </script>
      </head>
      <body>
      <p><b>\mathbb with light = true</b><br/>
      \(\mathbb{
         ABCDEFGHIJKLMNOPQRSTUVWXYZ\\
         abcdefghijklmnopqrstuvwxyz\\
         0123456789\\
         !@\#\$\%\&(\,){+}[\,]:\,;<,>.?/\\
         \bbGamma\bbDelta\bbTheta\bbLambda\bbXi\bbPi\bbSigma\bbUpsilon\bbPhi\bbPsi\bbOmega\\
         \bbalpha\bbbeta\bbgamma\bbdelta\bbepsilon\bbzeta\bbeta\bbtheta\bbiota\bbkappa
         \bblambda\bbmu\bbnu\bbxi\bbpi\bbrho\bbsigma\bbtau\bbupsilon\bbphi\bbchi\bbpsi\bbomega\\
         \bbdotlessi\bbdotlessj
      }\)
      </p>
      </body>
      </html>
    '></iframe>
    </p>


This package is not autoloaded, so you must request it explicitly if
you want to use it.  To load the `bboldx` extension, add
``'[tex]/bboldx'`` to the :data:`load` array of the :data:`loader`
block of your MathJax configuration, and add ``'bboldx'`` to the
:data:`packages` array of the :data:`tex` block.

.. code-block:: javascript

   window.MathJax = {
     loader: {load: ['[tex]/bboldx']},
     tex: {packages: {'[+]': ['bboldx']}}
   };

Alternatively, use ``\require{bboldx}`` in a TeX expression to load it
dynamically from within the math on the page, if the :ref:`tex-require`
extension is loaded.

-----

.. _tex-bboldx-options:

bboldx Options
--------------

Adding the `bboldx` extension to the :data:`packages` array defines an
:data:`bboldx` sub-block of the :data:`tex` configuration block with the
following values:

.. code-block:: javascript

   MathJax = {
     tex: {
       bboldx: {
         bfbb: false,
         light: false
       }
     }
   };


.. _tex-bboldx-bfbb:
.. describe:: bfbb: false

   Specifies whether to use the bold-weight versions of the bboldx fonts.

.. _tex-bboldx-light:
.. describe:: light: false

   Specifies whether to use the light-weight versions of the bboldx fonts.

-----

.. _tex-bboldx-commands:

bboldx Commands
---------------

The `bboldx` extension implements the following macros:
``\bbalpha``, ``\bbbeta``, ``\bbchi``, ``\bbDelta``, ``\bbdelta``, ``\bbdotlessi``, ``\bbdotlessj``, ``\bbepsilon``, ``\bbeta``, ``\bbGamma``, ``\bbgamma``, ``\bbiota``, ``\bbkappa``, ``\bbLambda``, ``\bblambda``, ``\bbLangle``, ``\bbLbrack``, ``\bbLparen``, ``\bbmu``, ``\bbnu``, ``\bbOmega``, ``\bbomega``, ``\bbPhi``, ``\bbphi``, ``\bbPi``, ``\bbpi``, ``\bbPsi``, ``\bbpsi``, ``\bbRangle``, ``\bbRbrack``, ``\bbrho``, ``\bbRparen``, ``\bbSigma``, ``\bbsigma``, ``\bbtau``, ``\bbTheta``, ``\bbtheta``, ``\bbUpsilon``, ``\bbupsilon``, ``\bbXi``, ``\bbxi``, ``\bbzeta``, ``\bfbbalpha``, ``\bfbbbeta``, ``\bfbbchi``, ``\bfbbDelta``, ``\bfbbdelta``, ``\bfbbdotlessi``, ``\bfbbdotlessj``, ``\bfbbepsilon``, ``\bfbbeta``, ``\bfbbGamma``, ``\bfbbgamma``, ``\bfbbiota``, ``\bfbbkappa``, ``\bfbbLambda``, ``\bfbblambda``, ``\bfbbLangle``, ``\bfbbLbrack``, ``\bfbbLparen``, ``\bfbbmu``, ``\bfbbnu``, ``\bfbbOmega``, ``\bfbbomega``, ``\bfbbPhi``, ``\bfbbphi``, ``\bfbbPi``, ``\bfbbpi``, ``\bfbbPsi``, ``\bfbbpsi``, ``\bfbbRangle``, ``\bfbbRbrack``, ``\bfbbrho``, ``\bfbbRparen``, ``\bfbbSigma``, ``\bfbbsigma``, ``\bfbbtau``, ``\bfbbTheta``, ``\bfbbtheta``, ``\bfbbUpsilon``, ``\bfbbupsilon``, ``\bfbbXi``, ``\bfbbxi``, ``\bfbbzeta``, ``\imathbb``, ``\imathbfbb``, ``\jmathbb``, ``\jmathbfbb``, ``\mathbb``, ``\mathbfbb``

The `bboldx` extension implements the following text-mode macros when the :ref:`tex-textmacros` extension is loaded (these are only available inside ``\text{}`` or other text-mode macros):
``\itextbb``, ``\itextbfbb``, ``\jtextbb``, ``\jtextbfbb``, ``\textbb``, ``\textbfbb``, ``\txtbbalpha``, ``\txtbbbeta``, ``\txtbbchi``, ``\txtbbDelta``, ``\txtbbdelta``, ``\txtbbdotlessi``, ``\txtbbdotlessj``, ``\txtbbepsilon``, ``\txtbbeta``, ``\txtbbGamma``, ``\txtbbgamma``, ``\txtbbiota``, ``\txtbbkappa``, ``\txtbbLambda``, ``\txtbblambda``, ``\txtbbLangle``, ``\txtbbLbrack``, ``\txtbbLparen``, ``\txtbbmu``, ``\txtbbnu``, ``\txtbbOmega``, ``\txtbbomega``, ``\txtbbPhi``, ``\txtbbphi``, ``\txtbbPi``, ``\txtbbpi``, ``\txtbbPsi``, ``\txtbbpsi``, ``\txtbbRangle``, ``\txtbbRbrack``, ``\txtbbrho``, ``\txtbbRparen``, ``\txtbbSigma``, ``\txtbbsigma``, ``\txtbbtau``, ``\txtbbTheta``, ``\txtbbtheta``, ``\txtbbUpsilon``, ``\txtbbupsilon``, ``\txtbbXi``, ``\txtbbxi``, ``\txtbbzeta``, ``\txtbfbbalpha``, ``\txtbfbbbeta``, ``\txtbfbbchi``, ``\txtbfbbDelta``, ``\txtbfbbdelta``, ``\txtbfbbdotlessi``, ``\txtbfbbdotlessj``, ``\txtbfbbepsilon``, ``\txtbfbbeta``, ``\txtbfbbGamma``, ``\txtbfbbgamma``, ``\txtbfbbiota``, ``\txtbfbbkappa``, ``\txtbfbbLambda``, ``\txtbfbblambda``, ``\txtbfbbLangle``, ``\txtbfbbLbrack``, ``\txtbfbbLparen``, ``\txtbfbbmu``, ``\txtbfbbnu``, ``\txtbfbbOmega``, ``\txtbfbbomega``, ``\txtbfbbPhi``, ``\txtbfbbphi``, ``\txtbfbbPi``, ``\txtbfbbpi``, ``\txtbfbbPsi``, ``\txtbfbbpsi``, ``\txtbfbbRangle``, ``\txtbfbbRbrack``, ``\txtbfbbrho``, ``\txtbfbbRparen``, ``\txtbfbbSigma``, ``\txtbfbbsigma``, ``\txtbfbbtau``, ``\txtbfbbTheta``, ``\txtbfbbtheta``, ``\txtbfbbUpsilon``, ``\txtbfbbupsilon``, ``\txtbfbbXi``, ``\txtbfbbxi``, ``\txtbfbbzeta``


|-----|
