.. _configuration:

#####################
Configuration Objects
#####################

The various components of MathJax, including its input and output
processors, its extensions, and the MathJax core,
all can be configured though a :data:`MathJax` global object that
specifies the configuration you want to use.  The :data:`MathJax`
object consists of sub-objects that configure the individual
components of MathJax.  For example, the :ref:`intpu/tex <tex-input>`
component is configured through a ``tex`` block within the
:data:`MathJax` object, while the :ref:`startup-component` component
is configured through the ``startup`` block.

These blocks are javascript objects that includes ``name: value``
pairs giving the names of parameters and their values, with pairs
separated by commas.  Be careful not to include a comma after the last
value, however, as some browsers will fail to process the
configuration if you do.

Some blocks may contain further sub-blocks.  For example, the ``tex``
block can have a ``macros`` sub-block that pre-defines macros, and a
``tagFormat`` block (when the :ref:`tagformat-component` component is used)
to define how equation tags are displayed and handled.

For example,

.. code-block:: javascript

    window.MathJax = {
      loader: {
        load: ['[tex]/tagFormat']
      },
      startup: {
        pageReady: () => {
          alert('Running MathJax')l;
          return MathJax.startup.defaultPageReady();
        }
      },
      tex: {
        packages: {'[+]': ['tagFormat']},
        tagSide: 'left',
        macros: {
	  RR: '{\\bf R}',
	  bold: ['{\\bf #1}',1]
	},
        tagFormat: {
           tag: (n) => '[' + n + ']'
        }
      }
    };

is a configuration that asks for the :ref:`tex-tagformat` extension to
be loaded, sets up the :ref:`startup-component` component to have a
function that it runs when the page (and MathJax) are ready (the
function issues an alert and then does the usual :meth:`pageReady()`
function, which typesets the page), configures the :ref:`TeX input
<tex-input>` component to use the `tagFormat` extension, asks for
displayed equations to be typeset to the left (rather than centered),
defines two macros, and finally set the tagging so that it uses square
brackets rather than parentheses for equation numbers and tags.

-----

.. toctree::
   :caption: More Information
   :maxdepth: 2

   input/index
   output/index
   accessibility
   menu
   startup

-----

.. raw:: html

   <span></span>


