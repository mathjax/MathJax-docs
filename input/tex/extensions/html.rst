.. _tex-html:

####
html
####

The `html` extension gives you access to some HTML features like
styles, classes, element ID's, and clickable links.  It defines the
following non-standard macros:

.. describe:: \href{url}{math}

    Makes ``math`` be a link to the page given by ``url``.  Note that
    the url is not processed by TeX, but is given as the literal url.
    In actual TeX or LaTeX, special characters must be escaped; so,
    for example, a url containing a ``#`` would need to use ``\#`` in
    the url in actual TeX.  That is not necessary in MathJax, and if
    you do use ``\#``, it will produce ``/#`` in the url since the
    ``\`` will be inserted into the url verbatim, and browsers will
    convert that to ``/`` (thinking it is a DOS directory separator).

.. describe:: \class{name}{math}

    Attaches the CSS class ``name`` to the output associated with
    ``math`` when it is included in the HTML page.  This allows your
    CSS to style the element.

.. describe:: \cssId{id}{math}

    Attaches an id attribute with value ``id`` to the output
    associated with ``math`` when it is included in the HTML page.
    This allows your CSS to style the element, or your javascript to
    locate it on the page.

.. describe:: \style{css}{math}

    Adds the given ``css`` declarations to the element associated with
    ``math``.

.. describe:: \data{dataset}{math}

    Treats the ``dataset`` as a comma-separated list of `name=value`
    pairs and adds ``data-name`` attributes with the given values to
    the typeset ``math``.

For example:

.. code-block:: latex

    x \href{why-equal.html}{=} y^2 + 1

    (x+1)^2 = \class{hidden}{(x+1)(x+1)}

    (x+1)^2 = \cssId{step1}{\style{visibility:hidden}{(x+1)(x+1)}}

    \data{special=true}{x}  % output will have attribute data-special="true"

.. Note::

   For the ``\href`` macro, the `url` parameter is not processed
   further, as it is in actual TeX, so you do not need to quote special
   characters.  For example, ``\href{#section1}{x}`` is fine, but
   ``\href{\#section}{x}`` will not work as expected.

.. warning::

   You should not add styles or other values that change the size of
   the typeset math, other than via explicit borders or padding
   values.  MathJax needs to know the dimensions of the math it
   typesets in order to properly lay out any surrounding math (like
   fraction bars or square root symbols), and so it will not be able
   to take into account changes that occur due to inherited CSS, or by
   CSS values other than border and padding.

This extension is loaded automatically when the :ref:`tex-autoload`
extension is used.  To load the `html` extension explicitly, add
``'[tex]/html'`` to the :data:`load` array of the :data:`loader` block
of your MathJax configuration, and add ``'html'`` to the
:data:`packages` array of the :data:`tex` block.

.. code-block:: javascript

   window.MathJax = {
     loader: {load: ['[tex]/html']},
     tex: {packages: {'[+]': ['html']}}
   };

Alternatively, use ``\require{html}`` in a TeX expression to load it
dynamically from within the math on the page, if the :ref:`tex-require`
extension is loaded.

-----

.. _tex-html-commands:

html Commands
-------------

The `html` extension implements the following macros:
``\class``, ``\cssId``, ``\data``, ``\href``, ``\style``


|-----|
