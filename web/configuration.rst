.. _web-configuration:

###############################
Configuring and Loading MathJax
###############################

The configuration, loading, and startup processes for MathJax version
3 are different from those of version 2 in a number of ways.  Where
version 2 had several different methods for configuring MathJax,
version 3 streamlines the process and has only one, as described
below.  In version 2, you always loaded ``MathJax.js``, and added a
``config=...`` parameter to provide a combined configuration file, but
in version 3 you load one of several different files, depending on
your needs (so you can avoid multiple file transfers, and also use
MathJax synchronously, which was not possible in version 2).

If you use one of the combined component files in version 3, like
``mml-chtml``, you may not need to do any configuration at all.

-----

.. _configuration:

Configuring MathJax
===================

To configure MathJax, you use a global object named `MathJax` that
contains configuration data for the various components of MathJax.
For example, to configure the TeX input component to use single dollar
signs as in-line math delimiters (in addition to the usual ``\(...\)``
delimiters) and the SVG output component to use a global font cache
for all expressions on the page, you would use

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
each of the components, see the :ref:`configuration` pages.


.. _inline-configuration:

Configuration Using an In-Line Script
-------------------------------------

The easiest way to configure MathJax is to place the ``MathJax``
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
   <script type="text/javascript" id="MathJax-script" async
     src="https://cdn.jsdelivr.net/npm/mathjax@3/es5/tex-svg.js">
   </script>

This will configure the TeX input component to use single dollar
signs as in-line math delimiters, and the SVG output component to use
a global font cache (rather than a separate cache for each expression
on the page), and then loads the latest version of the ``tex-svg``
component file from the ``jsdelivr`` CDN.  This will typeset any TeX
mathematics on the page, producing SVG versions of the expressions.


.. _local-configuration-file:

Using a Local File for Configuration
------------------------------------

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

   <script src="mathjax-config.js" defer></script>
   <script type="text/javascript" id="MathJax-script" defer
     src="https://cdn.jsdelivr.net/npm/mathjax@3/es5/tex-svg.js">
   </script>

to first load your configuration file, and then load the ``tex-svg``
component from the ``jsdelivr`` CDN.

Note that here we use the ``defer`` attribute on both scripts so that
they will execute in order, but still not block the rest of the page
while the files are being downloaded to the browser.  If the ``async``
attribute were used, there is no guarantee that the configuration
would run first, and so you could get instances where MathJax doesn't
get properly configured, and they would seem to occur randomly.


.. _config-loads-mathjax:

Configuring and Loading in One Script
-------------------------------------

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
     script.src = 'https://cdn.jsdelivr.net/npm/mathjax@3/es5/tex-svg.js';
     script.async = true;
     document.head.appendChild(script);
   })();

and then simply link to that file via

.. code-block:: html

   <script src="load-mathjax.js" async></script>

This script can be ``async`` because it doesn't have to synchronize
with any other script.  This will allow it to run as soon as it loads
(since it is small, there is little cost to that), meaning the script
to load MathJax itself will be inserted as soon as possible, so that
MathJax can begin downloading as early as possible.  (If this script
were loaded with ``defer``, it would not run until the page was ready,
so the script to load MathJax would not be inserted until then, and
you would have to wait for MathJax to be downloaded before it could
run.)


.. _v2-to-v3-converter:

Converting Your v2 Configuration to v3
--------------------------------------

Because the version 3 configuration options are somewhat different
from their version 2 counterparts, we provide an automated
`configuration conversion tool
<https://mathjax.github.io/MathJax-demos-web/convert-configuration/convert-configuration.html>`__
to help you move from version 2 to version 3.  Simply paste your
current :meth:`MathJax.Hub.Config()` call into the converter, press
``Convert`` and you should get the equivalent version 3 configuration,
and comments about any options that could not be translated to version
3 (some options are not yet implements, others no longer make sense in
version 3).  See the instructions on the linked page for more details.

-----

.. _loading-mathjax:

Loading MathJax
===============

Once you have configured MathJax, you then load the MathJax component
file that you want to use.  Most often, this will mean you load a
combined component that loads everything you need to run MathJax with
a particular input and output format.  For example, the ``tex-svg``
component would allow you to process TeX input and produce SVG output.
To do so, use a script like the following

.. code-block:: html

   <script type="text/javascript" id="MathJax-script" async
     src="https://cdn.jsdelivr.net/npm/mathjax@3/es5/tex-svg.js">
   </script>

to get the latest (3.x.x) version of the ``tex-svg`` component in ES5
format (the only one currently available) from the ``jsdelivr`` CDN.
This takes advantage of the feature of ``jsdeliver`` that allows you
to get the latest version using the ``mathjax@3`` notation.  For a
specific version, you would use

.. code-block:: html

   <script type="text/javascript" id="MathJax-script" async
     src="https://cdn.jsdelivr.net/npm/mathjax@3.0.0/es5/tex-svg.js">
   </script>

to always get the 3.0.0 version of the ``tex-svg`` component.

Other CDNs have slightly different formats for how to specify the
version number.  For example, ``cdnjs`` uses the following:

.. code-block:: html

   <script type="text/javascript" id="MathJax-script" async
     src="https://cdnjs.cloudflare.com/ajax/libs/mathjax/3.0.0/es5/tex-svg.js">
   </script>

Some CDNs don't provide a means of getting the lastest version
automatically.  For these, MathJax provides a ``latest.js`` file that
will do that for you.  For example, ``cdnjs`` doesn't have a mechanism
for getting the latest 3.x.x version automtically.  If you want to do
that using ``cdnjs``, then use

.. code-block:: html

   <script type="text/javascript" id="MathJax-script" async
     src="https://cdnjs.cloudflare.com/ajax/libs/mathjax/3.0.0/es5/latest?tex-svg.js">
   </script>

to obtain the latest (3.x.x) version of the ``tex-svg`` component.

See :ref:`web-components` for a list of the various components you can
choose and descriptions of their contents.  See the :ref:`list of CDNs
<cdn-list>` for the URLs for a number of CDNs that serve MathJax.

Note that the script that loads the MathJax component file should
*follow* the script the configures MathJax (otherwise MathJax will not
know what configuration you need).  If you use one of the combined
component files in version 3, you may not need to do any configuration
at all.


.. _loader-load-explicit:

Loading Components Individually
-------------------------------

If none of the combined component files suits your needs, you can
specify the individual components you want by setting the ``load``
array in the ``loader`` section of your MathJax configuration and
loading the ``startup`` component.

For example

.. code-block:: html

   <script>
   MathJax = {
     loader: {
       load: ['input/tex-base', 'output/svg', 'ui/menu', '[tex]/require']
     },
     tex: {
       packages: ['base', 'require']
     }
   };
   </script>
   <script type="text/javascript" id="MathJax-script" async
     src="https://cdn.jsdelivr.net/npm/mathjax@3.0.0/es5/startup.js">
   </script>

would cause the base TeX input, the SVG output, the contextual menu
code, and the TeX ``\require`` macro extension components to be loaded
(and would tell TeX to use the ``require`` extension in addition to the
base TeX macros).  In this way, you can load exactly the components
you want.  Note, however, that each component will be loaded as a
separate file, so it is better to use a combined component file if
possible.


.. _loader-load-combined:

Loading Additional Components
-----------------------------

You can use the ``load`` array described in the previous section to
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
   <script type="text/javascript" id="MathJax-script" async
     src="https://cdn.jsdelivr.net/npm/mathjax@3.0.0/es5/tex-chtml.js">
   </script>

would load the version-2-compatible ``\color`` macro, inform TeX to
add that to the packages that it already has loaded, and not autoload
the default version 3 ``color`` (the LaTeX-compatible one).  This is
done on top of the ``tex-chtml`` combined configuration file, so the
TeX input and CommonHTML output formats are already included (as are
the contextual menu, and several TeX packages; see
:ref:`web-components` for details).


.. _startup-action:

Performing Actions During Startup
=================================

MathJax allows you several ways to hook into the MathJax startup
process so that you can do additional configuration, perform actions
after the initial typesetting, and so on.  Because MathJax version 3
uses *promises* for its synchronization, they are what MathJax
provides in order for you to hook into the startup process.  There are
two main hooks that you can set in the ``startup`` block of your
configuration: the :func:`ready()` function and the
:func:`pageReady()` function.

The :func:`ready()` function is what MathJax calls when all the
components of MathJax have been loaded.  It builds the internal
structures needed by MathJax, creates functions in the ``MathJax``
object to make typesetting and format conversion easy for you,
performs the initial typesetting call, and sets up a promise for when
that is complete.  You can override the :func:`ready()` function with
one of your own to override the startup process completely, or to
perform actions before or after the usual initialization.  For
example, you could do additional setup before MathJax created the
objects it needs, or you could hook into the typesetting promise to
synchronize other actions with the completion of the initial
typesetting.  Examples of these are given below.

The :func:`pageReady()` function is performed when MathJax is ready
(all its components are loaded, and the internal objects have been
created), and the page itself is ready (i.e., it is OK to typeset the
page).  The default is for :func:`pageReady()` to perform the initial
typesetting of the page, but you can override that to perform other
actions instead, such as delaying the initial typesetting while other
content is loaded dynamically, for example.  The :func:`ready()`
function sets up the call to :func:`pageReady()` as part of its
default action.

The return value of :func:`pageReady()` is a promise that is resolved
when the initial typesetting is finished (it is the return value of
the initial :meth:`MathJax.typesetPromise()` call).  If you override
the :func:`pageReady()` method, your function should return a promise
as well.  If your function calls
:meth:`MathJax.startup.defaultPageReady()`, then you should return the
promise that it returns (or a promise obtained from its :func:`then()`
or :func:`catch()` methods).  The :attr:`MathJax.startup.promise` will
resolve when the promise you return is resolved; if you don't return a
promise, :attr:`MathJax.startup.promise` will resolve immediately,
which may mean that it resolves too early.

Using these two functions separately or in combination gives you full
control over the actions that MathJax takes when it starts up, and
allows you to customize MathJax's startup process to suit your needs.
Several examples are given below for common situations.

.. _initialization-actions:

Performing Actions During Initialization
----------------------------------------

If you want to perform actions after MathJax has loaded all the needed
components, you can set the :func:`ready()` function to a function that does
the needed actions, and then calls
:meth:`MathJax.startup.defaultReady()` to perform the usual
startup process.

Actions coming before the :meth:`MathJax.startup.defaultReady()`
call are run before any initialization has been done.  In particular,
this is before any input or output jax are created, so this is where
customization of the MathJax object definitions could be performed.
For example, you could modify the configuration blocks at this point,
or you could create subclasses of the MathJax objects that override
some of their methods to produce custom behavior, and then register
those subclasses with MathJax so they will be used in place of the
originals.

Actions coming after the :meth:`MathJax.startup.defaultReady()`
call are run after initialization is complete.  In particular, all the
internal objects used by MathJax (e.g., the input and output jax, the
math document, the DOM adaptor, etc) will have been created, and the
typesetting and conversion methods will have been created in the
``MathJax`` object.  Also the :attr:`MathJax.startup.promise` value
will hold a promise that is resolved when the initial typesetting is
complete, but note that the typesetting has not yet been performed at
this point.

.. code-block:: javascript

   window.MathJax = {
     startup: {
       ready: () => {
         console.log('MathJax is loaded, but not yet initialized');
         MathJax.startup.defaultReady();
         console.log('MathJax is initialized, and the initial typeset is queued');
       }
     }
   };

The next section shows how to use the :attr:`MathJax.startup.promise`
to synchronize with the initial typesetting action.


.. _post-typesetting:

Performing Actions After Typesetting
------------------------------------

Often, you may need to wait for MathJax to finish typesetting the page
before you perform some action.  To accomplish this, you can override
the :func:`ready()` function, having it perform the
:meth:`MathJax.startup.defaultReady()` action, and then use the
:attr:`MathJax.startup.promise` to queue your actions; these will be
performed after the initial typesetting is complete.

.. code-block:: javascript

   window.MathJax = {
     startup: {
       ready: () => {
         MathJax.startup.defaultReady();
         MathJax.startup.promise.then(() => {
           console.log('MathJax initial typesetting complete');
         });
       }
     }
   };

As an alternative, you can override the :func:`pageReady()` function,
and use the promise returned from the
:meth:`MathJax.startup.defaultPageReady()` function:

.. code-block:: javascript

   window.MathJax = {
     startup: {
       pageReady: () => {
         return MathJax.startup.defaultPageReady().then(() => {
           console.log('MathJax initial typesetting complete');
         });
       }
     }
   };

Be sure that you return the promise that you obtain from
:func:`then()` method, otherwise :attr:`MathJax.startup.promise` will
resolve before the initial typesetting (and your code) has been
performed.

-----

.. _configure-after-load:

Configuring MathJax After it is Loaded
======================================

The global variable ``MathJax`` is used to store the configuration for
MathJax.  Once MathJax is loaded, however, MathJax changes the
``MathJax`` variable to contain the various methods needed to control
MathJax.  The initial configuration that you provided is moved to the
:attr:`MathJax.config` property so that its contents doesn't conflict
with the new values provides in ``MathJax``.  This occurs when the
MathJax component you have requested is loaded (and before the
:func:`ready()` function is called).

Once MathJax has created the objects that it needs (like the input and
output jax), changes to the configuration may not have any effect, as
the configuration values were used during the creation of the objects,
and that is already complete.  Most objects make a copy of their
configuration from your original ``MathJax`` object, so changing the
values in :attr:`MathJax.config` after the objects are created will
not change their configurations.  (You can change
:attr:`MathJax.config` values for objects that haven't been created
yet, but not for ones that have.)

For some objects, like input and output jax, document handlers, and
math documents, the local copies of the configuration settings are
stored in the :attr:`options` property of the object, and you may be
able to set the value there.  For example,
:attr:`MathJax.startup.output.options.scale` is the scaling value for
the output, and you can set that at any time to affect any subsequent
typeset calls.

Note that some options are moved to sub-objects when the main object
is created. For example, with the TeX input jax, the ``inlineMath``
and similar options are used to create a ``FindTeX`` object that is
stored at :attr:`MathJax.startup.input[0].findTeX`; but in this case, the
``FindTeX`` object uses the configuration once when it is created, so
changing :attr:`MathJax.startup.input[0].findTeX.options` will not affect
it.  (There is a :meth:`getPatterns()` method if the ``FindTeX``
object that could be used to refresh the object if the options are
changed, however.)

If you need to change the configuration for an object whose options
can't be changed once it is created, then you will need to create a
new version of that object after you change the configuration.  For
example, if you change :attr:`MathJax.config.tex.inlineMath` after
MathJax has started up, that will not affect the TeX input jax, as
described above.  In this case, you can call
:meth:`MathJax.startup.getComponents()` to ask MathJax to recreate all
the internal objects (like :attr:`MathJax.startup.input`).  This will
cause them to be created using the new configuration options.  Note,
however, that MathJax will no longer know about any mathematics that
has already been typeset, as that data was stored in the objects that
have been discarded when the new ones are created.

|-----|
