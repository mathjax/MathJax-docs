.. _tex-eq-numbers:

############################
Automatic Equation Numbering
############################

The TeX input processing in MathJax can be configured to add equation
numbers to displayed equations automatically.  This functionality is
turned off by default, but it is easy to configure MathJax to produce
automatic equation numbers by adding:

.. code-block:: javascript

    window.MathJax = {
      tex: {
        tags: 'ams'
      }
    };

to tell the TeX input processor to use the AMS numbering rules (where
only certain environments produce numbered equations, as they would be
in LaTeX).  It is also possible to set the tagging to ``'all'``, so that
every displayed equation will get a number, regardless of the
environment used.

You can use ``\notag`` or ``\nonumber`` to prevent
individual equations from being numbered, and ``\tag{}`` can be used
to override the usual equation number with your own symbol instead (or
to add an equation tag even when automatic numbering is off).

Note that the AMS environments come in two forms: starred and
unstarred.  The unstarred versions produce equation numbers (when
``tags`` is set to ``'ams'``) and the starred ones don't.  For example

.. code-block::  latex

    \begin{equation}
       E = mc^2
    \end{equation}

will be numbered, while

.. code-block::  latex

    \begin{equation*}
       e^{\pi i} + 1 = 0
    \end{equation*}

will not be numbered (when ``tags`` is ``'ams'``).

You can use ``\label`` to give an equation an identifier that you can
use to refer to it later, and then use ``\ref`` or ``\eqref`` within
your document to insert the actual equation number at that location,
as a reference. For example,

.. code-block:: latex

    In equation \eqref{eq:sample}, we find the value of an
    interesting integral:

    \begin{equation}
      \int_0^\infty \frac{x^3}{e^x-1}\,dx = \frac{\pi^4}{15}
      \label{eq:sample}
    \end{equation}

includes a labeled equation and a reference to that equation.  Note
that references can come before the corresponding formula as well as
after them.

You can configure the way that numbers are displayed and how the
references to them by including the ``tagformat`` extension, and
setting options within the ``tagformat`` block of your ``tex``
configuration.  See the :ref:`tex-tagformat` extension for more
details.

If you are using automatic equation numbering and modifying the page
dynamically, you can run into problems due to duplicate labels. See
:ref:`tex-reset` for how to address this.

|-----|
