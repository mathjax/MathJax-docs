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

.. code-block:: javascript

   window.MathJax = {
     loader: {load: ['[tex]/upgreek']},
     tex: {packages: {'[+]': ['upgreek']}}
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
