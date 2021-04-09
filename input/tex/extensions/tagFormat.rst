.. _tex-tagformat:

#########
tagFormat
#########

The `tagFormat` extension provides the ability to customize the format
of the equation tags and automatic equation numbers.  You do this by
providing functions in the ``tagFormat`` object of the ``tex`` block
of your MathJax configuration.  The functions you can provide are
listed in the :ref:`tex-tagformat-options` section.

For example,

.. code-block:: javascript

    MathJax = {
      section: 1,
      tex: {
        tagFormat: {
	  number: (n) => MathJax.config.section + '.' + n,
          id: (tag) => 'eqn-id-' + tag
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

arranges for automatic equation numbers to be of the form ``1.n``, and
uses ids of the form ``eqn-id-1.n`` as the ``id`` attribute of the
tags within the web page.  It also sets up pre- and -post-filters for
the TeX input jax that arrange for the section number to be properly
handled for automatically numbered equations that contain forward
references to later expressions.  This example uses the modern
function notation (using ``=>``), but you could also use
``function (n) {return ...}``.

You can  adjust the  section numnber using  JavaScript by  setting the
``MathJax.config.section`` variable.  It is  also possible  to create
TeX macros for controlling the section number.  Here is one possibility:

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

(Of course, you will want to merge this configuration in with the rest
of your configuration options.)

This makes two new macros available: ``\nextSection``, which
increments the section counter, and ``\setSection{n}``, which sets the
section number to ``n``.  These must be issues within math delimiters
in order for MathJax to process them.  In order to prevent them from
producing any output in your page, you could enclose them within a
hidden element.  For example,

.. code-block:: html

   <span style="display: hidden">\(\nextSection\)</span>

or something similar.  

To load the `tagFormat` extension, add ``'[tex]/tagFormat'`` to the
``load`` array of the ``loader`` block of your MathJax configuration,
and add ``'tagFormat'`` to the ``packages`` array of the ``tex``
block.

.. code-block:: javascript

   window.MathJax = {
     loader: {load: ['[tex]/tagFormat']},
     tex: {packages: {'[+]': ['tagFormat']}}
   };

|-----|
