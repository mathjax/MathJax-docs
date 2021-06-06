.. _tex-tagformat:

#########
tagformat
#########

The `tagformat` extension provides the ability to customize the format
of the equation tags and automatic equation numbers.  You do this by
providing functions in the ``tagformat`` object of the ``tex`` block
of your MathJax configuration.  The functions you can provide are
listed in the :ref:`tex-tagformat-options` section.

To load the `tagformat` extension, add ``'[tex]/tagformat'`` to the
``load`` array of the ``loader`` block of your MathJax configuration,
and add ``'tagformat'`` to the ``packages`` array of the ``tex``
block.

.. code-block:: javascript

   window.MathJax = {
     loader: {load: ['[tex]/tagformat']},
     tex: {packages: {'[+]': ['tagformat']}}
   };


-----

.. _tex-tagformat-options:

tagformat Options
-----------------

Adding the `tagformat` extension to the ``packages`` array adds a
``tagformat`` sub-object to the ``tex`` configuration block with the
following values:

.. code-block:: javascript

   tagformat: {
      number: (n) => n.toString(),
      tag:    (tag) => '(' + tag + ')',
      id:     (id) => 'mjx-eqn:' + id.replace(/\s/g, '_'),
      url:    (id, base) => base + '#' + encodeURIComponent(id),
    }

.. describe:: number: function (n) {return n.toString()}

   A function that tells MathJax what tag to use for equation number
   ``n``.  This could be used to have the equations labeled by a
   sequence of symbols rather than numbers, or to use section and
   subsection numbers instead.

.. describe:: tag: function (n) {return '(' + n + ')'}

   A function that tells MathJax how to format an equation number for
   displaying as a tag for an equation.  This is what appears in the
   margin of a tagged or numbered equation.

.. describe:: id: function (n) {return 'mjx-eqn:' + n.replace(/\\s/g, '_')}

   A function that tells MathJax what ID to use as an anchor for the
   equation (so that it can be used in URL references).

.. describe:: url: function (id, base) {return base + '#' + encodeURIComponent(id)}

   A function that takes an equation ID and base URL and returns the
   URL to link to it.  The ``base`` value is taken from the
   :ref:`baseURL <tex-baseURL>` value, so that links can be make within
   a page even if it has a ``<base>`` element that sets the base URL
   for the page to a different location.

-----

.. _tex-tagformat-section-numbers:

Example: Section Numbering
--------------------------

This example shows one way to provide section numbers for the
automatic equation numbers generated when the ``tags`` option in the
``tex`` configuration block is set to ``'ams'`` or ``'all'``.

.. code-block:: javascript

    MathJax = {
      section: 1,
      tex: {
        tagformat: {
	  number: (n) => MathJax.config.section + '.' + n,
          id: (tag) => 'eqn-id:' + tag
	}
      },
      startup: {
        ready() {
          MathJax.startup.defaultReady();
          MathJax.startup.input[0].preFilters.add(({math}) => {
            if (math.inputData.recompile) {
              MathJax.config.section = math.inputData.recompile.section;
            }
          });
          MathJax.startup.input[0].postFilters.add(({math}) => {
            if (math.inputData.recompile) {
              math.inputData.recompile.section = MathJax.config.section;
            }
          });
        }
      }
    };

This arranges for automatic equation numbers to be of the form
``1.n``, and uses ids of the form ``eqn-id:1.n`` as the ``id``
attribute of the tags within the web page.  It also sets up pre- and
post-filters for the TeX input jax that arrange for the section number
to be properly handled for automatically numbered equations that
contain forward references to later expressions.  This example uses
the modern function notation (using ``=>``), but you could also use
``function (n) {return ...}``.

You can adjust the section number using JavaScript by setting the
``MathJax.config.section`` variable.  It is also possible to create
TeX macros for controlling the section number.  Here is one
possibility:

.. code-block:: javascript

    MathJax = {
      startup: {
        ready() {
          const Configuration = MathJax._.input.tex.Configuration.Configuration;
          const CommandMap = MathJax._.input.tex.SymbolMap.CommandMap;
          new CommandMap('sections', {
            nextSection: 'NextSection',
            setSection: 'SetSection',
          }, {
            NextSection(parser, name) {
              MathJax.config.section++;
              parser.tags.counter = parser.tags.allCounter = 0;
            },
            SetSection(parser, name) {
              const n = parser.GetArgument(name);
              MathJax.config.section = parseInt(n);
            }
          });
          Configuration.create(
            'sections', {handler: {macro: ['sections']}}
          );
          MathJax.startup.defaultReady();
        }
      }
    };

Of course, you will want to merge this configuraiton in with the rest
of your configuration options.

This makes two new macros available: ``\nextSection``, which
increments the section counter, and ``\setSection{n}``, which sets the
section number to ``n``.  Note that these must be issued within math
delimiters in order for MathJax to process them.  In order to prevent
them from producing any output in your page, you could enclose them
within a hidden element.  For example,

.. code-block:: html

   <span style="display: hidden">\(\nextSection\)</span>

or something similar.  

|-----|
