.. _tex-bussproofs:

##########
bussproofs
##########

The `bussproofs` extension implements the ``bussproofs`` style package from
LaTeX. See the `CTAN page <https://www.ctan.org/pkg/bussproofs>`__ for
more information and documentation of `bussproofs`.

Note that there are a couple of important differences between the use
of the package in MathJax compared to actual LaTeX.  First, proofs
always have to be in a `prooftree` environment, i.e., inference macros
are only recognised if they are enclosed in ``\begin{prooftree}`` and
``\end{prooftree}``. Consequently the ``\DisplayProof`` command is not
necessary.

Second, unlike in the LaTeX package, options for abbreviated inference
rule macros do not have to be manually set. All abbreviated macros are
directly available. Thus commands like ``\BinaryInfC`` and ``\BIC``
can be used immediately and interchangeably.


For example:

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


This extension is loaded automatically when the `autoload` extension
is used.  To load the `bussproofs` extension explicitly, add
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

-----


.. _tex-bussproofs-commands:


bussproofs Commands
-------------------

The `bussproofs` extension implements the following macros:
``\alwaysDashedLine``, ``\alwaysNoLine``, ``\alwaysRootAtBottom``, ``\alwaysRootAtTop``, ``\alwaysSingleLine``, ``\alwaysSolidLine``, ``\AXC``, ``\Axiom``, ``\AxiomC``, ``\BIC``, ``\BinaryInf``, ``\BinaryInfC``, ``\dashedLine``, ``\fCenter``, ``\LeftLabel``, ``\LL``, ``\noLine``, ``\QuaternaryInf``, ``\QuaternaryInfC``, ``\QuinaryInf``, ``\QuinaryInfC``, ``\RightLabel``, ``\RL``, ``\rootAtBottom``, ``\rootAtTop``, ``\singleLine``, ``\solidLine``, ``\TIC``, ``\TrinaryInf``, ``\TrinaryInfC``, ``\UIC``, ``\UnaryInf``, ``\UnaryInfC``

And the following environments:
``prooftree``


|-----|
