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
preprocessor and the TeX input jax), but in version 3 and above, the
``tex2jax`` functions have been folded into the TeX input jax itself.

The TeX input jax can be configured to look for whatever textual
markers you want to use for your math delimiters.  See the :ref:`TeX
configuration options <tex-options>` section for details on how to
customize the delimiters, and other options for TeX input.  You can
not configure the TeX input jax to use HTML tags as TeX math
delimiters, though it is possible to use a custom render action to
look for such tags.  The :ref:`v2-api-changes` section
includes an example of how to do this for the v2-style ``<script
type="math/tex">`` tags, for example.

The TeX input processor handles conversion of your mathematical
notation into MathJax's internal format, which is essentially MathML,
and so acts as a TeX to MathML converter.  The TeX input processor
can also be customized through the use of extensions that define
additional functionality (see the :ref:`tex-extensions` section).

Note that MathJax's TeX input processor is *not* actual LaTeX, it is
an implementation of a subset of the LaTeX macros in javascript in a
browser.  Not all LaTeX macros and control sequences are available,
and there are some differences in how MathJax interprets some
expressions, as described in the first link below.  Not all LaTeX
packages are available in MathJax; see the sections on extension
below.

If you are not familiar with TeX/LaTeX, a good starting point is the
`LaTeX Wiki book <https://en.wikibooks.org/wiki/LaTeX>`_.

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
