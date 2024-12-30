.. _tex-tagformat:

#########
tagformat
#########

The `tagformat` extension provides the ability to customize the format
of the equation tags and automatic equation numbers.  You do this by
providing functions in the :data:`tagformat` object of the :data:`tex` block
of your MathJax configuration.  The functions you can provide are
listed in the :ref:`tex-tagformat-options` section below.

To load the `tagformat` extension, add ``'[tex]/tagformat'`` to the
:data:`load` array of the :data:`loader` block of your MathJax configuration,
and add ``'tagformat'`` to the :data:`packages` array of the :data:`tex`
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

Adding the `tagformat` extension to the :data:`packages` array adds a
:data:`tagformat` sub-object to the :data:`tex` configuration block
with the following values:

.. code-block:: javascript

   tagformat: {
      number: (n) => n.toString(),
      tag: (tag) => '(' + tag + ')',
      ref: '', // means use the tag function
      id: (id) => 'mjx-eqn:' + id.replace(/\s/g, '_'),
      url: (id, base) => base + '#' + encodeURIComponent(id),
    }

.. describe:: number: (n) => n.toString()

   A function that tells MathJax what tag to use for equation number
   ``n``.  This could be used to have the equations labeled by a
   sequence of symbols rather than numbers, or to use section and
   subsection numbers instead, for example.

.. describe:: tag: (tag) => '(' + tag + ')'

   A function that tells MathJax how to format an equation number for
   displaying as a tag for an equation.  This is what appears in the
   margin of a tagged or numbered equation.

.. describe:: ref: ''

   A function that tells MathJax how to format a reference (e.g., from
   ``\ref``) to an equation number.  If set to an empty string,
   MathJax will call the ``tag`` function to get this value.


.. describe:: id: (id) => 'mjx-eqn:' + id.replace(/\s/g, '_')

   A function that tells MathJax what `id` attribute to use as an
   anchor for the equation (so that it can be used in URL references).

.. describe:: url: (id, base) => base + '#' + encodeURIComponent(id)

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
        tags: 'ams',
        tagformat: {
	  number: (n) => MathJax.config.section + '.' + n,
          id: (tag) => 'eqn-id:' + tag
	},
        packages: {'[+]': ['tagformat']}
      },
      loader: {load: ['[tex]/tagformat']},
      startup: {
        ready() {
          MathJax.startup.defaultReady();
          MathJax.startup.input.tex.preFilters.add(({math}) => {
            if (math.inputData.recompile) {
              MathJax.config.section = math.inputData.recompile.section;
            }
          });
          MathJax.startup.input.tex.postFilters.add(({math}) => {
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
contain forward references to later expressions.

You can adjust the section number using JavaScript by setting the
``MathJax.config.section`` variable.  It is also possible to create
TeX macros for controlling the section number.  Here is one
possibility:

.. code-block:: javascript

    MathJax = {
      tex: {
        packages: {'[+]': ['sections']},
      },
      startup: {
        ready() {
          const Configuration = MathJax._.input.tex.Configuration.Configuration;
          const CommandMap = MathJax._.input.tex.TokenMap.CommandMap;
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

Of course, you will want to merge this configuration in with the rest
of your configuration options.

.. warning::

   In v4 the :data:`SymbolMap` has been renamed :data:`TokenMap`, and
   that has been changed in the example above from the v3 version.

This makes two new macros available: ``\nextSection``, which
increments the section counter, and ``\setSection{n}``, which sets the
section number to ``n``.  Note that these must be issued within math
delimiters in order for MathJax to process them.  In order to prevent
them from producing any output in your page, you could enclose them
within a hidden element.  For example,

.. code-block:: html

   <span style="display: none">\(\nextSection\)</span>

or something similar.

Here is a complete example HTML document:

.. code-block:: html

   <!DOCTYPE html>
   <html>
   <head>
   <title>Section numbering example</title>
   <script>
   MathJax = {
     section: 1,
     tex: {
       tags: 'ams',
       packages: {'[+]': ['tagformat', 'sections']},
       tagformat: {
         number: (n) => MathJax.config.section + '.' + n,
         id: (tag) => 'eqn-id:' + tag
       }
     },
     loader: {load: ['[tex]/tagformat']},
     startup: {
       ready() {
         const Configuration = MathJax._.input.tex.Configuration.Configuration;
         const CommandMap = MathJax._.input.tex.TokenMap.CommandMap;
         new CommandMap('sections', {
           nextSection(parser, name) {
             MathJax.config.section++;
             parser.tags.counter = parser.tags.allCounter = 0;
           },
           setSection(parser, name) {
             const n = parser.GetArgument(name);
             MathJax.config.section = parseInt(n);
           }
         });
         Configuration.create(
           'sections', {handler: {macro: ['sections']}}
         );
         MathJax.startup.defaultReady();
         MathJax.startup.input.tex.preFilters.add(({math}) => {
           if (math.inputData.recompile) {
             MathJax.config.section = math.inputData.recompile.section;
           }
         });
         MathJax.startup.input.tex.postFilters.add(({math}) => {
           if (math.inputData.recompile) {
             math.inputData.recompile.section = MathJax.config.section;
           }
         });
       }
     }
   };</script>
   <script src="https://cdn.jsdelivr.net/npm/mathjax@4/tex-chtml.js"></script>
   </head>
   <body>

   <h1>Section 1</h1>

   <p>
   Equations in section 1:

   \begin{equation}
   E = mc^2
   \end{equation}

   and

   \begin{equation}\label{complex}
   e^{\pi i} + 1 = 0
   \end{equation}
   </p>
   <p>
   That is the end of section 1.
   </p>

   <hr/>

   <h1>Section 2</h1>
   <span style="display: none">\(\nextSection\)</span>

   <p>
   Equations in section 2:

   \begin{equation}
   y = \sqrt{1-x^2}
   \end{equation}

   and

   \begin{equation}
   \sum_{i=1}^n i = \frac{n(n+1)}{2}
   \end{equation}
   </p>
   <p>
   References to equations include section numbers: \ref{complex}.
   </p>

   </body>
   </html>

.. raw:: html

    <p>which renders as follows:</p>
    <p style="background-color: #DDD; padding: 1em 0; text-align: center">
    <iframe style='width: 30em; height: 35em; background-color: white' srcdoc='
      <!DOCTYPE html>
       <html>
       <head>
       <title>Section numbering example</title>
       <style>
       h1 {font-size: 120%}
       </style>
       <script>
       MathJax = {
         section: 1,
         tex: {
           tags: "ams",
           packages: {"[+]": ["tagformat", "sections"]},
           tagformat: {
             number: (n) => MathJax.config.section + "." + n,
             id: (tag) => "eqn-id:" + tag
           }
         },
         loader: {load: ["[tex]/tagformat"]},
         startup: {
           ready() {
             const Configuration = MathJax._.input.tex.Configuration.Configuration;
             const CommandMap = MathJax._.input.tex.TokenMap.CommandMap;
             new CommandMap("sections", {
               nextSection(parser, name) {
                 MathJax.config.section++;
                 parser.tags.counter = parser.tags.allCounter = 0;
               },
               setSection(parser, name) {
                 const n = parser.GetArgument(name);
                 MathJax.config.section = parseInt(n);
               }
             });
             Configuration.create(
               "sections", {handler: {macro: ["sections"]}}
             );
             MathJax.startup.defaultReady();
             MathJax.startup.input.tex.preFilters.add(({math}) => {
               if (math.inputData.recompile) {
                 MathJax.config.section = math.inputData.recompile.section;
               }
             });
             MathJax.startup.input.tex.postFilters.add(({math}) => {
               if (math.inputData.recompile) {
                 math.inputData.recompile.section = MathJax.config.section;
               }
             });
           }
         }
       };</script>
       <script src="https://cdn.jsdelivr.net/npm/mathjax@4/tex-chtml.js"></script>
       </head>
       <body>

       <h1>Section 1</h1>

       <p>
       Equations in section 1:

       \begin{equation}
       E = mc^2
       \end{equation}

       and

       \begin{equation}\label{complex}
       e^{\pi i} + 1 = 0
       \end{equation}
       </p>
       <p>
       That is the end of section 1.
       </p>
       
       <hr/>
       
       <h1>Section 2</h1>
       <span style="display: none">\(\nextSection\)</span>

       <p>
       Equations in section 2:

       \begin{equation}
       y = \sqrt{1-x^2}
       \end{equation}

       and

       \begin{equation}
       \sum_{i=1}^n i = \frac{n(n+1)}{2}
       \end{equation}
       </p>
       <p>
       References to equations include section numbers: \ref{complex}.
       </p>

       </body>
       </html>
    '></iframe>
    </p>


|-----|
