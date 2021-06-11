.. _tex-textcomp:

########
textcomp
########


The `textcomp` extension implements the ``textcomp`` style package from LaTeX.
**...Explanation...**
See the `CTAN page <https://www.ctan.org/pkg/textcomp>`__
for more information and documentation of `textcomp`.

This package is not autoloaded, so you must request it explicitly if you want to use it.
To load the `textcomp` extension, add ``'[tex]/'textcomp'`` to the ``load`` array of the ``loader`` block of your
MathJax configuration, and add ``'textcomp'`` to the ``packages`` array of the ``tex`` block.


.. code-block:: javascript

   window.MathJax = {
     loader: {load: ['[tex]/textcomp']},
     tex: {packages: {'[+]': ['textcomp']}}
   };



Alternatively, use ``\require{textcomp}`` in a TeX expression to load it
dynamically from within the math on the page, if the `require`
extension is loaded.

-----


.. _tex-textcomp-commands:


textcomp Commands
-----------------

The `textcomp` extension implements the following macros:
``\textacutedbl``, ``\textasciiacute``, ``\textasciibreve``, ``\textasciicaron``, ``\textasciicircum``, ``\textasciidieresis``, ``\textasciimacron``, ``\textasciitilde``, ``\textasteriskcentered``, ``\textbackslash``, ``\textbaht``, ``\textbar``, ``\textbardbl``, ``\textbigcircle``, ``\textblank``, ``\textborn``, ``\textbraceleft``, ``\textbraceright``, ``\textbrokenbar``, ``\textbullet``, ``\textcelsius``, ``\textcent``, ``\textcentoldstyle``, ``\textcircledP``, ``\textcolonmonetary``, ``\textcompwordmark``, ``\textcopyleft``, ``\textcopyright``, ``\textcurrency``, ``\textdagger``, ``\textdaggerdbl``, ``\textdegree``, ``\textdied``, ``\textdiscount``, ``\textdiv``, ``\textdivorced``, ``\textdollar``, ``\textdollaroldstyle``, ``\textdong``, ``\textdownarrow``, ``\texteightoldstyle``, ``\textellipsis``, ``\textemdash``, ``\textendash``, ``\textestimated``, ``\texteuro``, ``\textexclamdown``, ``\textfiveoldstyle``, ``\textflorin``, ``\textfouroldstyle``, ``\textfractionsolidus``, ``\textgravedbl``, ``\textgreater``, ``\textguarani``, ``\textinterrobang``, ``\textinterrobangdown``, ``\textlangle``, ``\textlbrackdbl``, ``\textleftarrow``, ``\textless``, ``\textlira``, ``\textlnot``, ``\textlquill``, ``\textmarried``, ``\textmho``, ``\textminus``, ``\textmu``, ``\textmusicalnote``, ``\textnaira``, ``\textnineoldstyle``, ``\textnumero``, ``\textohm``, ``\textonehalf``, ``\textoneoldstyle``, ``\textonequarter``, ``\textonesuperior``, ``\textopenbullet``, ``\textordfeminine``, ``\textordmasculine``, ``\textparagraph``, ``\textperiodcentered``, ``\textpertenthousand``, ``\textperthousand``, ``\textpeso``, ``\textpm``, ``\textquestiondown``, ``\textquotedblleft``, ``\textquotedblright``, ``\textquoteleft``, ``\textquoteright``, ``\textrangle``, ``\textrbrackdbl``, ``\textrecipe``, ``\textreferencemark``, ``\textregistered``, ``\textrightarrow``, ``\textrquill``, ``\textsection``, ``\textservicemark``, ``\textsevenoldstyle``, ``\textsixoldstyle``, ``\textsterling``, ``\textsurd``, ``\textthreeoldstyle``, ``\textthreequarters``, ``\textthreesuperior``, ``\texttildelow``, ``\texttimes``, ``\texttrademark``, ``\texttwooldstyle``, ``\texttwosuperior``, ``\textunderscore``, ``\textuparrow``, ``\textvisiblespace``, ``\textwon``, ``\textyen``, ``\textzerooldstyle``


|-----|