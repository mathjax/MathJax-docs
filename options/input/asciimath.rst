.. _asciimath-options:

#################################
AsciiMath Input Processor Options
#################################

The options below control the operation of the :ref:`AsciiMath input
processor <asciimath-input>` that is run when you include
``'input/asciimath'`` in the in the ``load`` array of the ``loader``
block of your MathJax configuration, or if you load a combined
component that includes the AsciiMath input jax (none currently do,
since the AsciiMath input has not been fully ported to version 3).
They are listed with their default values.  To set any of these
options, include an ``asciimath`` section in your :data:`MathJax` global
object.

-----

The Configuration Block
=======================

.. code-block:: javascript

    MathJax = {
      asciimath: {
        fixphi: true,              // true for TeX mapping, false for unicode mapping
        displaystyle: true,        // true for displaystyle typesetting, false for in-line
        decimalsign: '.'           // character to use for decimal separator
      }
    };

-----


Option Descriptions
===================

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

The remaining options are described in the
:ref:`input-common-options` section.

-----


Developer Options
=================

In addition to the options listed above, low-level options intended
for developers include the following:

.. _asciimath-FindAsciiMath:
.. describe:: FindAsciiMath: null

   The ``FindAsciiMath`` object instance that will override the default
   one.  This allows you to create a subclass of ``FindAsciiMath`` and
   pass that to the AsciiMath input jax.  A ``null`` value means use the
   default ``FindAsciiMath`` class and make a new instance of that.

|-----|
