.. _processing-model:

############################
The MathJax Processing Model
############################

The purpose of MathJax is to bring the ability to include mathematics
easily in web pages to as wide a range of browsers as possible.
Authors can specify mathematics in a variety of formats (e.g.,
:ref:`MathML <mathml-support>`, :ref:`LaTeX <tex-support>`, or
:ref:`AsciiMath <asciimath-support>`), and MathJax provides
high-quality mathematical typesetting even in those browsers that do
not have native MathML support.  This all happens without the need for
special downloads or browser plugins, or installation of fonts, etc.

MathJax is broken into several different kinds of components: page
handlers, input processors, output processors, and the MathJax object
classes that organize and connect the others.  The input and output
processors are called `jax`, and are described in more detail
below.

When MathJax runs, it looks through the page for special markers that
delimit/indicate mathematics; for each such marker, it locates an
appropriate input jax, which it uses to convert the mathematics into
an internal form (a MathML tree as javascript objects), and then calls
an output jax to transform the internal format into HTML content that
displays the mathematics within the page.  The page author configures
MathJax by indicating which input and output jax are to be used, and
which extensions should be included.

While MathML notation is an XML format that consists of tags like
those that make up the HTML language, it is not a format that is easy
for page authors to write by hand.  Many sites prefer to use a more
natural input format like LaTeX or AsciiMath, especially when the
sites allow readers to enter comments or post questions and answers.
In this case, the mathematics is regular text within the page, and the
author must indicate what parts of the text are mathematics by using
special `delimiters` to mark the start and of the expressions within
the text.  For example, LaTeX expressions may be delimited by
``\(...\)`` for in-line expressions, and ``\[...\]`` or ``$$...$$``
(though MathJax can be configured to use other ones as well).

See the :ref:`configuration` section for details about configuring the
math delimiters.  See the :ref:`tex-support`,
:ref:`asciimath-support`, or :ref:`mathml-support` sections for
information about using those formats, and for important caveats about
how to include mathematical expressions within an HTML page.

Internally, the processing of the page is mediated by an object called
a :data:`MathDocument`.  This receives the HTML document that it is to
process, and the input and output jax to be used in processing that
page, along with any configuration options to control that processing.
The individual expressions are representing internally using
:data:`MathItem` objects that hold pointers to the locations of the
math, the math strings to be processed, and other information needed
by MathJax to handle the individual expressions.

These :data:`MathItem` objects are stored in a list within the
:data:`MathDocument` so that they can be reprocessed, if needed. For
example, changes in the MathJax contextual menu may require that the
math be reprocessed, e.g., if the renderer is changed, of if speech
settings change.

This list must be kept up to date, so if you remove sections of the
page that may contain mathematics, you should inform MathJax of that
beforehand.  The :ref:`typeset-clear` section discusses this in more
detail.  Note that if you typeset expressions by hand using the
:ref:`conversion functions <convert-math>`, they will not be added
into the math list, and so will not participate in any changes request
by the contextual menu.


The components of MathJax
=========================

The main components of MathJax are its input and output jax, the
MathDocument, which coordinates the actions of the other components.

**Input jax**
    These are associated with the different input formats (TeX/LaTeX,
    MathML, and AsciiMath), and includes information about what
    delimiters it uses, and how to locate math within the document.
    The main role of the input jax is to convert the math notation
    entered by the author into the internal format used by MathJax,
    which is essentially MathML (represented as JavaScript objects).
    So an input jax acts as a translator of its mathematical notation
    into MathML.

**Input extensions**
    A number of extensions are available for the TeX input jax that
    implement optional LaTeX macros or features.  The MathJax
    configuration object can be used to load them explicitly, or the
    :ref:`tex-autoload` extension may load some of them automatically
    when they are needed.  The non-standard ``\require`` macro can be
    used to load an extension by name from within a typeset expression
    (see the :ref:`tex-require` page).  The :ref:`extension-list`
    gives the names of the various extensions and links to their
    descriptions and configuration options.  See the
    :ref:`tex-extensions` section for information about loading
    extensions and configuring the TeX input jax to include them.

    The MathML input jax also supports extensions, though there
    currently is only one, the `mml3` extension that gives
    experimental support for the MathML3 `elementary math
    <https://www.w3.org/TR/MathML3/chapter3.html#presm.elementary>`__
    tags.  See the :ref:`mml3 <mathml-mml3>` section for details.

**Output jax**
    These convert the internal MathML format into a specific output
    format.  For example, the CHTML output jax uses HTML with CSS
    styling to lay out the mathematics, while the SVG output jax use
    Scalable Vector Graphic (SVG) elements to do so.  Output jax could
    be produced that render the mathematics using HTML5 canvas
    elements, for example.  The MathJax contextual menu can be used to
    switch between the output jax that are available.

**Fonts**
    In v4, several different fonts are available for the output jax.
    See the :ref:`font-support` section for details.  The tools for
    creating the data needed by MathJax to support a font will be made
    available so that page authors can their own fonts or font
    extensions for use with MathJax.

**Contextual Menu**
    This component gives the reader access to several important
    informational options (such as viewing or copying the mathematical
    notation, or generating an SVG image from an expression), along
    with options that modify how MathJax operates.  These include
    control over how long lines are treated, which render to use, and
    whether speech or other assistive extensions are to be activated.
    While it is possible to disable the MathJax contextual menu, doing
    so will impair the ability of your users to control MathJax, and
    in particular, users with accessibility needs may not be able to
    make the changes they need to support their particular
    disabilities.

**MathDocument**
    This is the internal object that handles the coordination of all
    of MathJax actions on a particular HTML page.  It contains the
    input and output jax that are in use, and maintains a list of the
    expressions that have been typeset in the page.  It maintains a
    list of actions to take when the page, or a portion of it, is to
    be typeset (see the :ref:`renderActions <document-renderactions>`
    description for details).  For applications using the
    :ref:`MathJax Components framework <web-components>`,
    :data:`MathJax.startup.document` gives the :data:`MathDocument`
    instance being used.


.. _api-documentation:

The MathJax API Documentation
=============================

Many of the important details about the MathJax Application
Programming Interface (API) are described within these documentation
pages, but certainly not every function and object within the MathJax
code.

The :ref:`web-examples` and :ref:`node-examples` pages give links to
most of the examples within these documentation pages that illustrate
the MathJax API, along with links to repositories containing more
examples of web-based and node-based applications.

The MathJax `source code <https://github.com/mathjax/MathJax-src>`__
internals are documented using jsDoc comments, and the resulting HTML
pages are `available <https://mathjax.github.io/MathJax-src>`__ on
line.


|-----|
