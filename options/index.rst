.. _configuring-mathjax:

###################
Configuring MathJax
###################

The various components of MathJax, including its input and output
processors, its extensions, and the MathJax core,
all can be configured though a :data:`MathJax` global object that
specifies the configuration you want to use.  The :data:`MathJax`
object consists of sub-objects that configure the individual
components of MathJax.  For example, the :ref:`input/tex <tex-input>`
component is configured through a ``tex`` block within the
:data:`MathJax` object, while the :ref:`startup-component` component
is configured through the ``startup`` block.

These blocks are JavaScript objects that includes ``name: value``
pairs giving the names of parameters and their values, with pairs
separated by commas.  Be careful not to include a comma after the last
value, however, as some browsers will fail to process the
configuration if you do.

Some blocks may contain further sub-blocks.  For example, the ``tex``
block can have a ``macros`` sub-block that pre-defines macros, and a
``tagformat`` block (when the :ref:`tex-tagformat` component is used)
to define how equation tags are displayed and handled.

For example,

.. code-block:: javascript

    window.MathJax = {
      loader: {
        load: ['[tex]/tagformat']
      },
      startup: {
        pageReady: () => {
          alert('Running MathJax');
          return MathJax.startup.defaultPageReady();
        }
      },
      tex: {
        packages: {'[+]': ['tagformat']},
        tagSide: 'left',
        macros: {
	  RR: '{\\bf R}',
	  bold: ['{\\bf #1}',1]
	},
        tagformat: {
           tag: (n) => '[' + n + ']'
        }
      }
    };

is a configuration that asks for the :ref:`tex-tagformat` extension to
be loaded, sets up the :ref:`startup-component` component to have a
function that it runs when the page (and MathJax) are ready (the
function issues an alert and then does the usual :meth:`pageReady()`
function, which typesets the page), configures the :ref:`TeX input
<tex-input>` component to use the `tagformat` extension, asks for
displayed equations to be typeset to the left (rather than centered),
defines two macros, and finally set the tagging so that it uses square
brackets rather than parentheses for equation numbers and tags.

Note the special notation used with the ``packages`` option above.
The ``packages`` property is an array of extension names, but the
configuration uses a special object to add to that array rather than
replace it.  If the option you are setting is an array, and you
provide an object that has a single properly whose name is ``'[+]'``
and whose value is an array, then that array will be appended to the
default value for the option you are setting.  So in the example
above, the ``'tagformat'`` string is added to the default ``packages``
array (without your needing to know what that default value is).

Similarly, if you use an object with a single property whose name is
``'[-]'`` and whose value is an array, the elements in that array are
*removed* from the default value of the option you are setting.  For
example,

.. code-block:: javascript

   packages: {'[-]': ['autoload', 'require']}

would **remove** the `autoload` and `require` packages from the default
``packages`` array.

Finally, you can combine ``'[+]'`` and ``'[-]'`` in one object to do
both actions.  E.g.,

.. code-block:: javascript

   packages: {'[+]': ['enclose'], '[-]': ['autoload', 'require']}

would remove the `autoload` and `require` packages from the default
``packages`` array, and add `enclose` to the result.

-----

In the links below, the various options are first listed with their
default values as a complete configuration block, and then each option
is explained further below that.

.. toctree::
   :caption: More Information
   :maxdepth: 2
   :titlesonly:

   input/index
   output/index
   document
   accessibility
   menu
   safe
   startup/index

|-----|
