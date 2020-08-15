.. _tex-bussproofs:

##########
bussproofs
##########

The `bussproofs` extension implements the ``bussproofs`` style package from
LaTeX. See the `Ctan page <https://www.ctan.org/pkg/bussproofs>`__ for
more information and documentation of `bussproofs`.

Note that there are a couple of important differences to the use of the actual
package: Proofs always have to be in a `prooftree` environment, i.e., inference
macros are only recognised if they are enclosed in `\begin{prooftree}` and
`\end{prooftree}`. Consequently the `\DisplayProof` command is not necessary.

Unlike in the LaTeX package, options for abbreviated inference rule macros do
not have to be manually set. All abbreviated macros are directly available. Thus
commands like `\BinaryInfC` and `\BIC` can be used immediately and
interchangeably.


For example

.. code-block:: latex

    \begin{prooftree}
    \AxiomC{}
    \RightLabel{Hyp$^{1}$}
    \UnaryInfC{$P$}
    \AXC{$P\to Q$}
    \RL{$\to_E$}
    \BIC{$Q^2$}
    \AXC{$Q\to R$} 
    \RL{$\to_E$} 
    \BIC{$R$} 
    \AXC{$Q$} 
    \RL{Rit$^2$} 
    \UIC{$Q$}
    \RL{$\wedge_I$} 
    \BIC{$Q\wedge R$} 
    \RL{$\to_I$$^1$} 
    \UIC{$P\to Q\wedge R$}
    \end{prooftree}

Also note that the `bussproofs` commands for sequent calculus derivations are
not yet fully implemented.

This extension is **not** loaded by the `autoload` extension is used.
To load the `bussproofs` extension explicitly, add
``'[tex]/bussproofs'`` to the ``load`` array of the ``loader`` block
of your MathJax configuration, and add ``'bussproofs'`` to the
``packages`` array of the ``tex`` block.

.. code-block:: javascript

   window.MathJax = {
     loader: {load: ['[tex]/bussproofs']},
     tex: {packages: {'[+]': ['bussproofs']}}
   };

Alternatively, use ``\require{bussproofs}`` in a TeX expression to
load it dynamically from within the math on the page, if the `require`
extension is loaded.

[more details, examples, etc., here]

|-----|
