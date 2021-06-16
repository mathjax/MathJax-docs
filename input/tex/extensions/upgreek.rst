.. _tex-upgreek:

#######
upgreek
#######

The `upgreek` extension implements the ``upgreek`` style package from LaTeX. It
provides upright Greek characters for both lower and upper cases.  See the `CTAN
page <https://www.ctan.org/pkg/upgreek>`__ for more information and
documentation of `upgreek`.

Note, that the extension does not implement the font selection options from the
LaTeX package.

This package is not autoloaded, so you must request it explicitly if you want to use it.
To load the `upgreek` extension, add ``'[tex]/upgreek'`` to the ``load`` array of the ``loader`` block of your
MathJax configuration, and add ``'upgreek'`` to the ``packages`` array of the ``tex`` block.

.. code-block:: javascript

   window.MathJax = {
     loader: {load: ['[tex]/upgreek']},
     tex: {packages: {'[+]': ['upgreek']}}
   };


You can configure the `autoload` extension to load `upgreek` via

.. code-block:: javascript

   window.MathJax = {
     tex: {
       autoload: {
         upgreek: ['upalpha', 'upbeta', 'upchi', 'updelta', 'Updelta', 'upepsilon',
                   'upeta', 'upgamma', 'Upgamma', 'upiota', 'upkappa', 'uplambda',
                   'Uplambda', 'upmu', 'upnu', 'upomega', 'Upomega', 'upomicron',
                   'upphi', 'Upphi', 'uppi', 'Uppi', 'uppsi', 'Uppsi', 'uprho',
                   'upsigma', 'Upsigma', 'uptau', 'uptheta', 'Uptheta', 'upupsilon',
                   'Upupsilon', 'upvarepsilon', 'upvarphi', 'upvarpi', 'upvarrho',
                   'upvarsigma', 'upvartheta', 'upxi', 'Upxi', 'upzeta']
       }
     }
   };


Alternatively, use ``\require{upgreek}`` in a TeX expression to load it
dynamically from within the math on the page, if the `require`
extension is loaded.

-----


.. _tex-upgreek-commands:


upgreek Commands
----------------

The `upgreek` extension implements the following macros:
``\upalpha``, ``\upbeta``, ``\upchi``, ``\updelta``, ``\Updelta``, ``\upepsilon``, ``\upeta``, ``\upgamma``, ``\Upgamma``, ``\upiota``, ``\upkappa``, ``\uplambda``, ``\Uplambda``, ``\upmu``, ``\upnu``, ``\upomega``, ``\Upomega``, ``\upomicron``, ``\upphi``, ``\Upphi``, ``\uppi``, ``\Uppi``, ``\uppsi``, ``\Uppsi``, ``\uprho``, ``\upsigma``, ``\Upsigma``, ``\uptau``, ``\uptheta``, ``\Uptheta``, ``\upupsilon``, ``\Upupsilon``, ``\upvarepsilon``, ``\upvarphi``, ``\upvarpi``, ``\upvarrho``, ``\upvarsigma``, ``\upvartheta``, ``\upxi``, ``\Upxi``, ``\upzeta``


|-----|
