.. _loading-mathjax:

###############
Loading MathJax
###############

Once you have :ref:`configured <web-configuration>` MathJax, you can
then load the MathJax :ref:`component file <web-components>` that you
want to use.  Most often, this will mean you load a :ref:`combined
component <combined-components>` that loads everything you need to run
MathJax with a particular input and output format.  For example, the
``tex-svg`` component would allow you to process TeX/LaTeX input and
produce SVG output.  To do so, use a script like the following

.. code-block:: html

   <script defer src="https://cdn.jsdelivr.net/npm/mathjax@4/tex-svg.js"></script>

to get the latest (4.x.y) version of the ``tex-svg`` component from
the ``jsdelivr`` CDN.

.. warning::

   Version 3 used ``/es5`` just before the component name in the URL
   for obtaining the MathJax.  This is no longer the case for
   version 4.

The example above takes advantage of the feature of ``jsdeliver`` that
allows you to get the latest version using the ``mathjax@4`` notation.
To obtain a specific version, you would use a tag like

.. code-block:: html

   <script defer src="https://cdn.jsdelivr.net/npm/mathjax@4.0.0/tex-svg.js"></script>

to always get the 4.0.0 version of the ``tex-svg`` component, even
when later versions become available.

Other CDNs have slightly different formats for how to specify the
version number.  For example, ``cdnjs`` uses the following:

.. code-block:: html

   <script defer src="https://cdnjs.cloudflare.com/ajax/libs/mathjax/4.0.0/es5/tex-svg.js">
   </script>

Some CDNs don't provide a means of getting the latest version
automatically, so you should check the documentation for the CDN you
are planning to use to see if they support that, and how to indicate
it in your source URL.

See :ref:`web-components` for a list of the various components you can
choose and descriptions of their contents.  See the :ref:`list of CDNs
<cdn-list>` for the URLs for a number of CDNs that serve MathJax.

Note that the script that sets the :js:data:`MathJax` configuration variable
should come **before** the script that loads the MathJax component
file, otherwise MathJax will not know what configuration you need.  If
you use one of the combined component files, you may not need to do
any configuration at all.


.. _loader-load-explicit:

Loading Components Individually
===============================

If none of the combined component files suits your needs, you can
specify the individual components you want by setting the :js:data:`load`
array in the :js:data:`loader` section of your MathJax configuration, and
load the :js:data:`startup.js` component.

For example

.. code-block:: html

   <script>
   MathJax = {
     loader: {
       load: ['input/tex-base', 'output/svg', 'ui/menu', '[tex]/require']
     },
     output: {
       font: 'mathjax-newcm'
     },
     tex: {
       packages: {'[+]': ['require']}
     }
   };
   </script>
   <script defer src="https://cdn.jsdelivr.net/npm/mathjax@4/startup.js"></script>

would cause the base TeX input, the SVG output (with the
``mathjax-newcm`` font), the contextual menu code, and the TeX
``\require`` macro extension components to be loaded (and tells TeX to
use the ``require`` extension in addition to the base TeX macros).  In
this way, you can load exactly the components you want.  Note,
however, that each component will be loaded as a separate file, so it
is better to use a combined component file if possible.


.. _loader-load-combined:

Loading Additional Components
=============================

You can use the :js:data:`load` array described in the previous section to
load additional components even if you are using one of the combined
components.  For example

.. code-block:: html

   <script>
   MathJax = {
     loader: {
       load: ['[tex]/colorv2']
     },
     tex: {
       packages: {'[+]': 'colorv2'},
       autoload: {color: []}
     }
   };
   </script>
   <script defe src="https://cdn.jsdelivr.net/npm/mathjax@4/tex-chtml.js">
   </script>

would load the version-2-compatible ``\color`` macro, inform TeX to
add that to the packages that it already has loaded, and not autoload
the default version 3 ``color`` (the LaTeX-compatible one).  This is
done on top of the ``tex-chtml`` combined configuration file, so the
TeX input and CommonHTML output formats are already included (as are
the contextual menu, and several TeX packages; see
:ref:`web-components` for details).

-----

.. _load-for-math:

Loading MathJax Only on Pages with Math
=======================================

The MathJax combined configuration files are large, and so you may
wish to include MathJax in your page only if it is necessary.  If you
are using a content-management system that puts headers and footers
into your pages automatically, you may not want to include MathJax
directly, unless most of your pages include math, as that would load
MathJax on *all* your pages.  Once MathJax has been loaded, it should
be in the browser's cache and load quickly on subsequent pages, but
the first page a reader looks at will load more slowly, and some
mobile devices don't cache files that are larger than a certain limit.

In order to avoid that, you can use a script like the following one
that checks to see if the content of the page seems to include math,
and only loads MathJax if it does.  Note that this is not a very
sophisticated test, and it may think there is math in some cases when
there really isn't but it should reduce the number of pages on which
MathJax will have to be loaded.

Create a file called :file:`check-for-tex.js` containing the following:

.. code-block:: javascript

   (function () {
     const body = document.body.textContent;
     if (body.match(/(?:\$|\\\(|\\\[|\\begin\{.*?})/)) {
       if (!window.MathJax) {
         window.MathJax = {
           tex: {
             inlineMath: {'[+]': [['$', '$']]}
           }
         };
       }
       const script = document.createElement('script');
       script.src = 'https://cdn.jsdelivr.net/npm/mathjax@4/tex-chtml.js';
       document.head.appendChild(script);
     }
   })();

and then use

.. code-block:: html

   <script src="check-for-tex.js" defer></script>

in order to load the script when the page content is ready.  Note that
you will want to include the path to the location where you stored
:file:`check-for-tex.js`, that you should change :file:`tex-chtml.js` to
whatever combined-component file you want to use, and that the
:js:data:`window.MathJax` value should be set to whatever
configuration you want to use.  In this case, it just adds dollar
signs to the in-line math delimiters.  Finally, adjust the
:js:meth:`body.match()` regular expression to match whatever you are
using for math delimiters.

This simply checks if there is something that looks like a TeX in-line
or displayed math delimiter, and loads MathJax if there is.  If you
are using different delimiters, you will need to change the pattern to
include those (and exclude any that you don't use).  If you are using
AsciiMath instead of TeX, then change the pattern to look for the
AsciiMath delimiters.

If you are using MathML, you may want to use

.. code-block:: javascript

   if (document.body.querySelector('math')) {...}

for the test instead (provided you aren't using namespace prefixes,
like ``<m:math>``).

|-----|
