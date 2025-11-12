.. _asciimath-options:

#################################
AsciiMath Input Processor Options
#################################

The options below control the operation of the :ref:`AsciiMath input
processor <asciimath-input>` that is run when you include
``'input/asciimath'`` in the in the :data:`load` array of the
:data:`loader` block of your MathJax configuration, or if you load a
combined component that includes the AsciiMath input jax (none
currently do, since the AsciiMath input has not been fully ported to
version 3 or above).  They are listed with their default values.  To
set any of these options, include an :data:`asciimath` section in your
:data:`MathJax` global object.

-----

The Configuration Block
=======================

.. code-block:: javascript

    MathJax = {
      asciimath: {
        delimiters: [['`', '`']],  // The start/end delimiter pairs for asciimath code
        fixphi: true,              // true for TeX mapping, false for unicode mapping
        displaystyle: true,        // true for displaystyle typesetting, false for in-line
        decimalsign: '.'           // character to use for decimal separator
      }
    };

Additional options are described in the :ref:`input-common-options`
section.

-----


Option Descriptions
===================

.. _asciimath-delimiters:
.. describe:: delimiters: [['`', '`']]

    This is an array of pairs of strings that are to be used as
    in-line math delimiters.  The first in each pair is the initial
    delimiter and the second is the terminal delimiter.  You can have
    as many pairs as you want.  For example,

    .. code-block:: javascript

        inlineMath: {'[+]': [['$','$']]}

    would add dollar sign delimiters to the default list, causing
    MathJax to look for ``$...$`` and :literal:`\`...\`` as delimiters
    for in-line mathematics.  Note that the single dollar signs are
    not enabled by default because they are used too frequently in
    normal text, so if you want to use them for math delimiters, you
    must specify them explicitly.

    .. warning::

       The delimiters can't look like HTML tags (i.e., can't include
       the less-than sign), as these would be turned into tags by the
       browser before MathJax has the chance to run.  You can only
       include text, not tags, as your math delimiters.  It is
       possible, however, to use a custom render action to look for
       such tags.  The :ref:`v2-api-changes` section includes an
       example of how to do this for the v2-style ``<script
       type="math/tex">``.
   
.. _asciimath-fixphi:
.. describe:: fixphi: true

   Determines whether MathJax will switch the Unicode values for
   ``phi`` and ``varphi``. If set to ``true`` MathJax will use the TeX
   mapping, otherwise the Unicode mapping.

.. _asciimath-displaystyle:
.. describe:: displaystyle: true

   Determines whether operators like summation symbols will have their
   limits above and below the operators (true) or to their right
   (false).  The former is how they would appear in displayed
   equations that are shown on their own lines, while the latter is
   better suited to in-line equations so that they don't interfere
   with the line spacing so much.

.. _asciimath-decimalsign:
.. describe:: decimalsign: "."

   This is the character to be used for decimal points in numbers.  If
   you change this to ``','``, then you need to be careful about
   entering points or intervals.  E.g., use ``(1, 2)`` rather than
   ``(1,2)`` in that case.

-----


Developer Options
=================

In addition to the options listed above, low-level options intended
for developers include the following:

.. _asciimath-FindAsciiMath:
.. describe:: FindAsciiMath: null

   The :data:`FindAsciiMath` object instance that will override the
   default one.  This allows you to create a subclass of the
   ``FindAsciiMath`` class and pass that to the AsciiMath input jax to
   use in place of the usual one.  A ``null`` value means use the
   default ``FindAsciiMath`` class and make a new instance of that.

|-----|
