.. _tex-textmacros:

##########
textmacros
##########

The `textmacros` extension adds the ability to process some text-mode
macros within ``\text{}`` and other macros that produce text-mode
material.  See the :ref:`tex-differences` section for how text-mode is
handled without this extension.

This extension is already loaded in all the components that include
the TeX input jax, other than ``input/tex-base``.  To load the
`textmacros` extension explicitly (when using ``input/tex-base`` for
example), add ``'[tex]/textmacros'`` to the :data:`load` array of the
:data:`loader` block of your MathJax configuration, and add
``'textmacros'`` to the :data:`packages` array of the :data:`tex`
block.

.. code-block:: javascript

   window.MathJax = {
     loader: {load: ['[tex]/textmacros']},
     tex: {packages: {'[+]': ['textmacros']}}
   };

Alternatively, use ``\require{textmacros}`` in a TeX expression to load it
dynamically from within the math on the page, if the :ref:`tex-require`
extension is loaded.

Since the `textmacros` extension is included in the combined
components that contain the TeX input jax, it may already be in the
package list. In that case, if you want to disable it, you can remove
it:

.. code-block:: javascript

   window.MathJax = {
     tex: {packages: {'[-]': ['textmacros']}}
   };


Available Macros:
=================

The macros available in text mode with this extension are listed
below.  In addition, any macro that is defined via ``\def`` or
``\newcommand`` or in the :data:`macros` section of the :data:`tex`
configuration block will also be processed if they only contain macros
from the list below.  Some extensions (e.g., the :ref:`tex-bboldx` and
:ref:`tex-textcomp` packages) add more macros to this list when they
are loaded.

.. raw:: html

   <style>
   .wy-table-responsive table {width: 100%}
   .rst-content .wy-table-responsive table code.literal {background: inherit}
   </style>


Additional Special Characters
-----------------------------

.. list-table::

   * - ``~``
     - non-breaking space
   * - \`
     - open quote (use two for double quote)
   * - ``'``
     - close quote (use two for double quote)


Math Mode Delimiters
--------------------

.. list-table::

   * - ``$``
     - start/end math mode
   * - ``\(``
     - start math mode
   * - ``\)``
     - end math mode


Quoted Special Characters
-------------------------

.. list-table::

   * - ``\$``
     - literal dollar sign
   * - ``\_``
     - literal underscore
   * - ``\%``
     - literal percent
   * - ``\{``
     - literal open brace
   * - ``\}``
     - literal close brace
   * - ``\``  (backslash-space)
     - literal space
   * - ``\&``
     - literal ampersand
   * - ``\#``
     - literal hash mark
   * - ``\\``
     - literal backslash


Text Accents
------------

.. list-table::

   * - ``\'``
     - acute accent
   * - ``\’``
     - acute accent
   * - ``\```
     - grave accent
   * - ``\‘``
     - grave accent
   * - ``\^``
     - circumflex accent
   * - ``\"``
     - umlaut accent
   * - ``\~``
     - tilde accent
   * - ``\=``
     - macron accent
   * - ``\.``
     - over dot accent
   * - ``\u``
     - breve accent
   * - ``\v``
     - caron accent
   * - ``\underline``
     - underlined text


Font Control
------------

.. list-table::

   * - ``\emph``
     - emphasized text
   * - ``\rm``
     - roman text
   * - ``\mit``
     - math italic text
   * - ``\oldstyle``
     - oldstyle numerals
   * - ``\cal``
     - calligraphic text
   * - ``\it``
     - italic text
   * - ``\bf``
     - bold text
   * - ``\sf``
     - sans-serif text
   * - ``\tt``
     - typewriter text
   * - ``\frak``
     - Fraktur text
   * - ``\Bbb``
     - blackboard-bold text
   * - ``\textnormal``
     - normal text
   * - ``\textup``
     - upright text
   * - ``\textrm``
     - roman text
   * - ``\textit``
     - italic text
   * - ``\textbf``
     - bold text
   * - ``\textsf``
     - sans-serif text
   * - ``\texttt``
     - typewriter text


Size Control
------------

.. list-table::

   * - ``\tiny``
     - very tiny size
   * - ``\Tiny``
     - tiny size (non-standard)
   * - ``\scriptsize``
     - size of super- and subscripts
   * - ``\small``
     - small size
   * - ``\normalsize``
     - standard size
   * - ``\large``
     - large size
   * - ``\Large``
     - larger sizse
   * - ``\LARGE``
     - very large size
   * - ``\huge``
     - even larger size
   * - ``\Huge``
     - largest size


Special Characters
------------------

.. list-table::

   * - ``\dagger``
     - †
   * - ``\ddagger``
     - ‡
   * - ``\S``
     - §
   * - ``\AA``
     - Å
   * - ``\ldots``
     - ellipses
   * - ``\vdots``
     - three vertical dots


Spacing Commands
----------------

.. list-table::

   * - ``\,``
     - thin space
   * - ``\:``
     - medium space
   * - ``\>``
     - medium space
   * - ``\;``
     - thick space
   * - ``\!``
     - negative thin space
   * - ``\enspace``
     - en-space
   * - ``\quad``
     - quad space
   * - ``\qquad``
     - double quad space
   * - ``\thinspace``
     - thin space
   * - ``\negthinspace``
     - negative thin space
   * - ``\hskip``
     - horizontal skip (by following amount)
   * - ``\hspace``
     - horizontal space (of a given size)
   * - ``\kern``
     - kern (by a given size)
   * - ``\mspace``
     - horizontal space (of a given size)    
   * - ``\rule``
     - line of a given width and height
   * - ``\Rule``
     - box with given dimensions (non-standard)
   * - ``\Space``
     - space with given dimensions (non-standard)


Color Commands
--------------

.. list-table::

   * - ``\color``
     - set text color
   * - ``\textcolor``
     - set text color
   * - ``\colorbox``
     - make colored box
   * - ``\fcolorbox``
     - make framed colored box


HTML Commands
-------------

.. list-table::

   * - ``\href``
     - make hyperlink
   * - ``\style``
     - specify CSS styles
   * - ``\class``
     - specify CSS class
   * - ``\data``
     - specify data attribute
   * - ``\cssId``
     - specify CSS id


Character Creation
------------------

.. list-table::

   * - ``\char``
     - character from unicode value
   * - ``\U``
     - character from unicode value
   * - ``\unicode``
     - character from unicode value
   * - ``\mmlToken``
     - create MathML token element


Equation Numbers
----------------

.. list-table::

   * - ``\ref``
     - cite a labeled equation
   * - ``\eqref``
     -  cite a labeled equation with parentheses


Bounding Box Macros
-------------------

.. list-table::

   * - ``\llap``
     - overlap on the left
   * - ``\rlap``
     - overlap on the right
   * - ``\phantom``
     - empty space of the size of given math
   * - ``\vphantom``
     - 0-width box with height of given math
   * - ``\vphantom``
     - 0-height box with width of given math
   * - ``\smash``
     - math with zero height and depth

-----

Additional Packages
===================

You can configure the `textmacros` extension to use additional
packages, just as you can specify additional math TeX packages.
Normally, these should be packages designed for text mode, but it is
possible to load some of the regular TeX packages as text macros.  For
example

.. code:: javascript

   MathJax = {
     loader: {load: ['[tex]/textmacros', '[tex]/bbox']},
     tex: {
       packages: {'[+]': ['textmacros', 'bbox']},
       textmacros: {
         packages: {'[+]': ['bbox']}
       }
     }
   }

would make the :ref:`tex-bbox` extension available in text mode, so
you could use ``\bbox`` inside ``\text{}``, for example.  Not all
math-mode extensions are appropriate for textmode, but some can be
usefully employed in text mode.


|-----|
