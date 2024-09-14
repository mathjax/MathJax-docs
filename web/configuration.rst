.. _web-configuration:

###################
Configuring MathJax
###################

MathJax provides a number of combined component files, like
``tex-chtml.js``, that group various components that are commonly used
together into a single file.  If you use one of the combined component
files, you may not need to do any configuration at all.  You can
modify the default configuration by using a javascript variable that
you define before loading the combined configuration file, as
described below.

.. note::
   
   The configuration, loading, and startup processes for MathJax
   versions 3 and 4 are different from those of version 2 in a number
   of ways.  Where version 2 had several different methods for
   configuring MathJax, v3 and v4 streamline the process and have only
   one.  In version 2, you always loaded ``MathJax.js``, and added a
   ``config=...`` parameter to provide a combined configuration file,
   but in version 3 and above you load one of several different files,
   depending on your needs, avoiding the multiple file transfers that
   was required in v2.


.. _configuration:

The Configuration Variable
==========================

To configure MathJax, you use a global javascript object named
`MathJax` that contains configuration data for the various components
of MathJax.  For example, to configure the TeX input component to use
single dollar signs as in-line math delimiters (in addition to the
usual ``\(...\)`` delimiters) and the SVG output component to use a
global font cache for all expressions on the page, you would use

.. code-block:: javascript

   MathJax = {
     tex: {
       inlineMath: [['$', '$'], ['\\(', '\\)']]
     },
     svg: {
       fontCache: 'global'
     }
   };

The sections below describe the different places you could put such a
configuration.  For information on the options that you can set for
each of the components, see the :ref:`configuring-mathjax` pages.


.. _inline-configuration:

Configuration Using an In-Line Script
=====================================

The easiest way to configure MathJax is to place the :js:data:`MathJax`
object in a ``<script>`` tag just before the script that loads MathJax
itself.  For example:

.. code-block:: html

   <script>
   MathJax = {
     tex: {
       inlineMath: [['$', '$'], ['\\(', '\\)']]
     },
     svg: {
       fontCache: 'global'
     }
   };
   </script>
   <script defer src="https://cdn.jsdelivr.net/npm/mathjax@3/es5/tex-svg.js"></script>

This will configure the TeX input component to use single dollar
signs as in-line math delimiters, and the SVG output component to use
a global font cache (rather than a separate cache for each expression
on the page), and then loads the latest version of the ``tex-svg``
component file from the ``jsdelivr`` CDN.  This will typeset any TeX
mathematics on the page, producing SVG versions of the expressions.


.. _local-configuration-file:

Using a Local File for Configuration
====================================

If you are using the same MathJax configuration over multiple pages,
you may find it convenient to store your configuration in a separate
JavaScript file that you load into the page.  For example, you could
create a file called ``mathjax-config.js`` that contains

.. code-block:: javascript

   window.MathJax = {
     tex: {
       inlineMath: [['$', '$'], ['\\(', '\\)']]
     },
     svg: {
       fontCache: 'global'
     }
   };

and then use

.. code-block:: html

   <script defer src="mathjax-config.js"></script>
   <script defer src="https://cdn.jsdelivr.net/npm/mathjax@4/tex-svg.js"></script>

to first load your configuration file, and then load the ``tex-svg``
component from the ``jsdelivr`` CDN.

Note that here we use the :attr:`defer` attribute on both scripts so that
they will execute in order, but still not block the rest of the page
while the files are being downloaded to the browser.  If the :attr:`async`
attribute were used, there is no guarantee that the configuration
would run first, and so you could get instances where MathJax doesn't
get properly configured, and they would seem to occur randomly.


.. _config-loads-mathjax:

Configuring and Loading in One Script
=====================================

It is possible to have the MathJax configuration file also load
MathJax as well, which would be another way to handle the problem of
synchronizing the two scripts described above.  For example, you could
make the file ``load-mathjax.js`` containing

.. code-block:: javascript

   window.MathJax = {
     tex: {
       inlineMath: [['$', '$'], ['\\(', '\\)']]
     },
     svg: {
       fontCache: 'global'
     }
   };
   
   (function () {
     var script = document.createElement('script');
     script.src = 'https://cdn.jsdelivr.net/npm/mathjax@4/tex-svg.js';
     script.defer = true;
     document.head.appendChild(script);
   })();

and then simply link to that file via

.. code-block:: html

   <script src="load-mathjax.js" async></script>

This script can be :attr:`async` because it doesn't have to synchronize
with any other script.  This will allow it to run as soon as it loads
(since it is small, there is little cost to that), meaning the script
to load MathJax itself will be inserted as soon as possible, so that
MathJax can begin downloading as early as possible.  (If this script
were loaded with :attr:`defer`, it would not run until the page was ready,
so the script to load MathJax would not be inserted until then, and
you would have to wait for MathJax to be downloaded before it could
run.)


.. _configure-after-load:

Configuring MathJax After it is Loaded
======================================

As described above, the global variable :js:data:`MathJax` is used to
store the configuration for MathJax.  Once MathJax is loaded, however,
MathJax changes the :js:data:`MathJax` variable to contain the various
methods needed to control MathJax.  The initial configuration that you
provided is moved to the :js:data:`MathJax.config` property so that
its contents doesn't conflict with the new values provides in
:js:data:`MathJax`.  This occurs when the MathJax component you have
requested is loaded (and before the ``startup`` :js:func:`ready()`
function is called).

Once MathJax has created the objects that it needs (like the input and
output jax), changes to the configuration may not have any effect, as
the configuration values were used during the creation of the objects,
and that is already complete.  Most objects make a copy of their
configuration from your original :js:data:`MathJax` object, so
changing the values in :js:data:`MathJax.config` after the objects are
created will not change their configurations.  (You can change
:js:data:`MathJax.config` values for objects that haven't been created
yet, but not for ones that have.)

For some objects, like input and output jax, document handlers, and
math documents, the local copies of the configuration settings are
stored in the :js:data:`options` property of those object, and you may
be able to set the value there.  For example,
:js:data:`MathJax.startup.output.options.scale` is the scaling value
for the output, and you can set that at any time to affect any
subsequent typeset calls.

Note that some options are moved to sub-objects when the main object
is created. For example, with the TeX input jax, the
:js:data:`inlineMath` and similar options are used to create a
:js:data:`FindTeX` object that is stored at
:js:data:`MathJax.startup.document.inputJax.tex.findTeX`; but in this
case, the :js:data:`FindTeX` object uses the configuration once when
it is created, so changing
:js:data:`MathJax.startup.document.inputJax.tex.findTeX.options` will
not affect it.  (There is a :js:meth:`getPatterns()` method if the
:js:data:`FindTeX` object that could be used to refresh the object if
the options are changed, however.)

If you need to change the configuration for an object whose options
can't be changed once it is created, then you will need to create a
new version of that object after you change the configuration.  For
example, if you change :js:data:`MathJax.config.tex.inlineMath` after
MathJax has started up, that will not affect the TeX input jax, as
described above.  In this case, you can call
:js:meth:`MathJax.startup.getComponents()` to ask MathJax to recreate
all the internal objects (like :js:data:`MathJax.startup.document`),
and this will cause them to be created using the new configuration
options.  Note, however, that MathJax will no longer know about any
mathematics that has already been typeset, as that data was stored in
the objects that have been discarded when the new ones are created.
This includes the data about the global font cache for SVG output, and
the CHTML CSS cache, so this is not something you should do lightly.

.. _v2-to-v3-converter:

Converting your old Configuration to v4
=======================================

The configuration options for v4 are basically the same as for v3,
with some new ones added, you should be able to use your current v3
configuration in v4 without change.  The only major caveat is if you
have used a :js:meth:`ready()` function in the ``startup`` section of
your configuration to make modifications ro additions to MathJax's
code, in which case, those might need to be adjusted.  See the
:ref:`whats-new-in-mathjax` section for more details.

Because the current MathJax configuration options are somewhat
different from their version 2 counterparts, we provide an automated
`configuration conversion tool
<https://mathjax.github.io/MathJax-demos-web/convert-configuration/convert-configuration.html>`__
to help you move from version 2 to the current version.  Simply paste
your current :js:meth:`MathJax.Hub.Config()` call into the converter,
press ``Convert`` and you should get the equivalent v3/v4
configuration, and comments about any options that could not be
translated to the current version (some options are not yet implements,
others no longer make sense in version 4).  See the instructions on
the converter page for more details.

|-----|
