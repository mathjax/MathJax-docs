.. _tex-ams:

###
ams
###

The `ams` extension implements AMS math environments and macros, and
macros for accessing the characters in the AMS symbol fonts.  This
extension is already loaded in all the components that include
the TeX input jax, other than ``input/tex-base``.  See the :ref:`list
of control sequences <tex-ams-commands>` for details about what commands
are implemented in this extension.

To load the `ams` extension explicitly (when using
``input/tex-base`` for example), add ``'[tex]/ams'`` to the
``load`` array of the ``loader`` block of your MathJax configuration,
and add ``'ams'`` to the ``packages`` array of the ``tex`` block.

.. code-block:: javascript

   window.MathJax = {
     loader: {load: ['[tex]/ams']},
     tex: {packages: {'[+]': ['ams']}}
   };

Alternatively, use ``\require{ams}`` in a TeX expression to load it
dynamically from within the math on the page, if the `require`
extension is loaded.

Since the `ams` extension is included in the combined
components that contain the TeX input jax, it will already be in
the package list.  In that case, if you want to disable it, you can
remove it:

.. code-block:: javascript

   window.MathJax = {
     tex: {packages: {'[-]': ['ams']}}
   };


-----


.. _tex-ams-options:


ams Options
-----------

Adding the `ams` extension to the ``packages`` array defines an
``ams`` sub-block of the ``tex`` configuration block with the
following values:

.. code-block:: javascript

  MathJax = {
    tex: {
      ams: {
        multlineWidth: '100%',
        multlineIndent: '1em'
      }
    }
  };


.. _tex-ams-multlineWidth:
.. describe:: multlineWidth: '100%'

The width to use for multline environments.

.. _tex-ams-multlineIndent:
.. describe:: multlineIndent: '1em'

The margin to use on both sides of multline environments.


.. note::

   The ``mutlineWidth`` option used to be in the main ``tex`` block,
   but as of version 3.2, it is now in the ``ams`` sub-block of the
   ``tex`` block.  Version 3.2 includes code to move the configuration
   from its old location to its new one, but that
   backward-compatibility code will be removed in a future version.


-----


.. _tex-ams-commands:


ams Commands
------------

The `ams` extension implements the following macros:
``\approxeq``, ``\backepsilon``, ``\backprime``, ``\backsim``, ``\backsimeq``, ``\barwedge``, ``\Bbbk``, ``\because``, ``\beth``, ``\between``, ``\bigstar``, ``\binom``, ``\blacklozenge``, ``\blacksquare``, ``\blacktriangle``, ``\blacktriangledown``, ``\blacktriangleleft``, ``\blacktriangleright``, ``\Box``, ``\boxdot``, ``\boxed``, ``\boxminus``, ``\boxplus``, ``\boxtimes``, ``\bumpeq``, ``\Bumpeq``, ``\Cap``, ``\centerdot``, ``\cfrac``, ``\checkmark``, ``\circeq``, ``\circlearrowleft``, ``\circlearrowright``, ``\circledast``, ``\circledcirc``, ``\circleddash``, ``\circledR``, ``\circledS``, ``\complement``, ``\Cup``, ``\curlyeqprec``, ``\curlyeqsucc``, ``\curlyvee``, ``\curlywedge``, ``\curvearrowleft``, ``\curvearrowright``, ``\daleth``, ``\dashleftarrow``, ``\dashrightarrow``, ``\dbinom``, ``\ddddot``, ``\dddot``, ``\DeclareMathOperator``, ``\dfrac``, ``\diagdown``, ``\diagup``, ``\Diamond``, ``\digamma``, ``\divideontimes``, ``\Doteq``, ``\doteqdot``, ``\dotplus``, ``\doublebarwedge``, ``\doublecap``, ``\doublecup``, ``\downdownarrows``, ``\downharpoonleft``, ``\downharpoonright``, ``\eqcirc``, ``\eqref``, ``\eqsim``, ``\eqslantgtr``, ``\eqslantless``, ``\eth``, ``\fallingdotseq``, ``\Finv``, ``\frac``, ``\Game``, ``\genfrac``, ``\geqq``, ``\geqslant``, ``\ggg``, ``\gggtr``, ``\gimel``, ``\gnapprox``, ``\gneq``, ``\gneqq``, ``\gnsim``, ``\gtrapprox``, ``\gtrdot``, ``\gtreqless``, ``\gtreqqless``, ``\gtrless``, ``\gtrsim``, ``\gvertneqq``, ``\hslash``, ``\idotsint``, ``\iiiint``, ``\impliedby``, ``\implies``, ``\injlim``, ``\intercal``, ``\Join``, ``\leadsto``, ``\leftarrowtail``, ``\leftleftarrows``, ``\leftrightarrows``, ``\leftrightharpoons``, ``\leftrightsquigarrow``, ``\leftthreetimes``, ``\leqq``, ``\leqslant``, ``\lessapprox``, ``\lessdot``, ``\lesseqgtr``, ``\lesseqqgtr``, ``\lessgtr``, ``\lesssim``, ``\lhd``, ``\llcorner``, ``\Lleftarrow``, ``\lll``, ``\llless``, ``\lnapprox``, ``\lneq``, ``\lneqq``, ``\lnsim``, ``\looparrowleft``, ``\looparrowright``, ``\lozenge``, ``\lrcorner``, ``\Lsh``, ``\ltimes``, ``\lvert``, ``\lVert``, ``\lvertneqq``, ``\maltese``, ``\mathring``, ``\measuredangle``, ``\mho``, ``\multimap``, ``\ncong``, ``\negmedspace``, ``\negthickspace``, ``\nexists``, ``\ngeq``, ``\ngeqq``, ``\ngeqslant``, ``\ngtr``, ``\nleftarrow``, ``\nLeftarrow``, ``\nleftrightarrow``, ``\nLeftrightarrow``, ``\nleq``, ``\nleqq``, ``\nleqslant``, ``\nless``, ``\nmid``, ``\nobreakspace``, ``\notag``, ``\nparallel``, ``\nprec``, ``\npreceq``, ``\nrightarrow``, ``\nRightarrow``, ``\nshortmid``, ``\nshortparallel``, ``\nsim``, ``\nsubseteq``, ``\nsubseteqq``, ``\nsucc``, ``\nsucceq``, ``\nsupseteq``, ``\nsupseteqq``, ``\ntriangleleft``, ``\ntrianglelefteq``, ``\ntriangleright``, ``\ntrianglerighteq``, ``\nvdash``, ``\nvDash``, ``\nVdash``, ``\nVDash``, ``\operatorname``, ``\pitchfork``, ``\precapprox``, ``\preccurlyeq``, ``\precnapprox``, ``\precneqq``, ``\precnsim``, ``\precsim``, ``\projlim``, ``\restriction``, ``\rhd``, ``\rightarrowtail``, ``\rightleftarrows``, ``\rightleftharpoons``, ``\rightrightarrows``, ``\rightsquigarrow``, ``\rightthreetimes``, ``\risingdotseq``, ``\Rrightarrow``, ``\Rsh``, ``\rtimes``, ``\rvert``, ``\rVert``, ``\shortmid``, ``\shortparallel``, ``\shoveleft``, ``\shoveright``, ``\sideset``, ``\SkipLimits``, ``\smallfrown``, ``\smallsetminus``, ``\smallsmile``, ``\sphericalangle``, ``\sqsubset``, ``\sqsupset``, ``\square``, ``\Subset``, ``\subseteqq``, ``\subsetneq``, ``\subsetneqq``, ``\substack``, ``\succapprox``, ``\succcurlyeq``, ``\succnapprox``, ``\succneqq``, ``\succnsim``, ``\succsim``, ``\Supset``, ``\supseteqq``, ``\supsetneq``, ``\supsetneqq``, ``\tag``, ``\tbinom``, ``\tfrac``, ``\therefore``, ``\thickapprox``, ``\thicksim``, ``\triangledown``, ``\trianglelefteq``, ``\triangleq``, ``\trianglerighteq``, ``\twoheadleftarrow``, ``\twoheadrightarrow``, ``\ulcorner``, ``\unlhd``, ``\unrhd``, ``\upharpoonleft``, ``\upharpoonright``, ``\upuparrows``, ``\urcorner``, ``\varDelta``, ``\varGamma``, ``\varinjlim``, ``\varkappa``, ``\varLambda``, ``\varliminf``, ``\varlimsup``, ``\varnothing``, ``\varOmega``, ``\varPhi``, ``\varPi``, ``\varprojlim``, ``\varpropto``, ``\varPsi``, ``\varSigma``, ``\varsubsetneq``, ``\varsubsetneqq``, ``\varsupsetneq``, ``\varsupsetneqq``, ``\varTheta``, ``\vartriangle``, ``\vartriangleleft``, ``\vartriangleright``, ``\varUpsilon``, ``\varXi``, ``\vDash``, ``\Vdash``, ``\veebar``, ``\Vvdash``, ``\xleftarrow``, ``\xrightarrow``, ``\yen``

And the following environments:
``align*``, ``align``, ``alignat*``, ``alignat``, ``aligned``, ``alignedat``, ``bmatrix``, ``Bmatrix``, ``cases``, ``eqnarray*``, ``gather*``, ``gather``, ``gathered``, ``matrix``, ``multline*``, ``multline``, ``pmatrix``, ``smallmatrix``, ``split``, ``subarray``, ``vmatrix``, ``Vmatrix``


|-----|
