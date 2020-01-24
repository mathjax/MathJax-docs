.. _tex-support:

#####################
TeX and LaTeX Support
#####################

The support for `TeX` and `LaTeX` in MathJax involves two functions:
the first looks for mathematics within your web page (indicated by
math delimiters like ``$$...$$``) and marks the mathematics for later
processing by MathJax, and the second is what converts the TeX
notation into MathJax's internal format, where one of MathJax's output
processors then displays it in the web page.  In MathJax version 2,
these were separated into distinct components (the ``tex2jax``
preprocessor and the TeX input jax), but in version 3, the ``tex2jax``
functions have been folded into the TeX input jax.

The TeX input jax can be configured to look for whatever markers you
want to use for your math delimiters.  See the :ref:`TeX configuration
options <tex-options>` section for details on how to customize the
delimiters, and other options for TeX input.

The TeX input processor handles conversion of your mathematical
notation into MathJax's internal format (which is essentially MathML),
and so acts as a TeX to MathML converter.  The TeX input processor
can also be customized through the use of extensions that define
additional functionality (see the :ref:`tex-extensions` section).

Note: if you are not familiar with TeX/LaTeX, a good starting point is
the `LaTeX Wiki book <http://en.wikibooks.org/wiki/LaTeX>`_.

-----

.. toctree::
   :caption: More Information
   :maxdepth: 2

   differences
   delimiters
   html
   macros
   eqnumbers
   extensions

.. toctree::
   :maxdepth: 1

   extensions/index
   macros/index

|-----|
