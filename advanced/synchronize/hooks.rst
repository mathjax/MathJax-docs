.. _sync-startup:

==============================
MathJax Startup and Load Hooks
==============================

When you use MathJax Components, there are several methods of
synchronizing your code with the startup and loading actions used by
MathJax.  The first is through the :data:`startup` block of the
MathJax configuration object.  You can use its :js:meth:`ready()` and
:js:meth:`pageReady()` functions to link into MathJax's initialization
sequence. There is also the :js:data:`MathJax.startup.promise` can also
be used to queue actions that need to take place after MathJax has
performed its initial typesetting operation.  These functions and
promises are described in detail in the :ref:`startup-action` section.

The MathJax :ref:`loader <loader-options>` component also provides a
number of mechanisms for hookin into its actions.  The first is the
:ref:`loader.ready() <loader-ready>` and :ref:`loader.failed()
<loader-failed>` functions in the :data:`loader` block of your MathJax
configuration.  The first is called when the loader has loaded all the
components you ahve requested and is ready to call the startup
component to set up MathJax and do the initial typesetting.  You can
replace it with your own function, and can call
:js:meth:`MathJax.loader.defaultReady()` to perform the usual startup.

The :meth:`failed()` function is called if any of the components
causes an error, and is passed the :data:`Error` object containing the
error (with an extra :data:`package` property inidicating the name of
the package that caused the error, if known).  You can use this method
to obtain a full error stacktrace, for example, or to log load errors,
or process them in some other way.

In addition to these general hooks, the loader provides ready and
failed hooks on an individual-package basis.  This is done by making a
sub-block of the :data:`loader` configuration block with its name
being the name of the component and containing a :meth:`ready()`
and/or :meth:`failed()` function.  For example,

.. code-block:: js

   MathJax = {
     loader: {
       '[tex]/color': {
         ready() {console.log('The color extension has been loaded')},
         failed(err) {console.log('The color extension could not be loaded: ' + err.message)},
       }
     }
   };

would print a message when the color extension is loaded (for example,
if it is autoloaded when the ``\color`` TeX macro is first used, or if
loaded explicitly by ``\require{color}``), or if it failed to load for
some reason.

The package block can also contain a :meth:`checkReady()` function,
which can be used to perform other asynchronous actions that must be
completed when the package loads but before it is considered "ready".
For example, if a package being loaded should trigger some additional
JSON data to be loaded, the :meth:`checkReady()` function can start
that loading and return a promise that is resolved when the data is
available.  In this case, MathJax will wait for that promise before
indicating that the package is ready, and that typesetting should
continue.

.. note::

   MathJax uses the :meth:`checkReady()` mecahnism internally (to load
   the font data when an output jax is loaded, for example), and so
   you may need to be a bit careful in setting this options for some
   packages.


|-----|
