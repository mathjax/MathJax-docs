.. _whats-new-3.0:

##########################
What's New in MathJax v3.0
##########################

MathJax version 3 is a complete rewrite from the ground up, with the
goal of modernizing MathJax’s internal infrastructure, bringing it
more flexibility for use with contemporary web technologies, making it
easier to use with NodeJS for pre-processing and server-side support,
and making it faster to render your mathematics.


.. _improved-speed:

Improved Speed
==============

There were a number of design goals to the version 3 rewrite.  A
primary one was to improve the rendering speed of MathJax, and we feel
we have accomplished that.  Because the two versions operate so
differently, it is difficult to make precise comparisons, but in tests
that render a complete page with several hundred expressions, we see
a reduction in rendering time of between 60 and 80 percent, depending
on the browser and type of computer.


.. _more-flexibility:

More Flexibility
================

Another goal was to make MathJax 3 more flexible for web developers
using MathJax as part of a larger framework, while still keeping it
easy to use in simple settings.  To that end, we have broken down the
actions that MathJax takes into smaller units than in version 2, and
made it possible to call on them individually, or replace them with
alternative versions of your own.  For example, the typesetting
process has been broken into a number of pieces, including finding the
math in the page, compiling it into the internal format (MathML),
getting metric data for the location of the math, converting the math
into the output format, inserting it into the page, adding menu event
handlers, and so on.  You have control over which of these to perform,
and can modify or remove the existing actions, or add new ones of your
own.  See the :ref:`renderActions <document-renderActions>`
documentation for details.


.. _synhronous-conversion:

Synchronous Conversion
======================

A key feature that we wanted to include in version 3 is the ability to
run MathJax synchronously, and in particular, to provide a function
that can translate an input string (say a TeX expression) into an
output DOM tree (say an SVG image).  This was not really possible in
version 2, since its operation was inherently asynchronous at a
fundamental level.  With MathJax version 3, this is straight-forward,
as we provide a synchronous typesetting path, both within the page,
and for individual expressions, provided you load all the components
you need ahead of time.  See :ref:`web-typeset` for details.


.. _no-queues-signals-callbacks:

No Queues, Signals, Callbacks
=============================

One of the more difficult aspects of working with MathJax version 2
was having to synchronize your actions with those of MathJax.  This
involved using `queues`, `callbacks`, and `signals` to mediate the
asynchronous actions of MathJax.  Since these were not standard
javascript paradigms, they caused confusion (and headaches) for many
developers trying to use MathJax.  With version 3, MathJax has the
option of working synchronously (as described above), but it still
allows for asynchronous operation (e.g., to allow TeX's ``\require``
command to load extensions dynamically) if you wish.  This no longer
relies on queues, callbacks, and signals, however.  Instead, these
actions are managed through the ES6 `promise
<https://developers.google.com/web/fundamentals/primers/promises>`__,
which is a javascript standard, and should make integrating MathJax
into your own applications more straight-forward.


.. _package-managers:

Package Manager Support
=======================

Because MathJax version 2 used its own loading mechanism for accessing
its components, and because there was no method for combining all the
pieces needed by MathJax into one file, MathJax did not work well with
javascript packaging systems like ``webpack``.  Version 3 resolves
that problem, so it should interoperate better with modern web
workflows.  You can make your own custom single-file builds of MathJax
(see :ref:`web-custom-build`) or can include it as one component of a
larger asset file.

.. _introducing-components:

MathJax Components
==================

MathJax 3 still provides a loading mechanism similar to the one from
version 2, however, so you can still customize the extensions that is
loads, so that you only load the ones you need (though this does
require that you use MathJax in its asynchronous mode).  The various
pieces of MathJax have been packaged into "components" that can be
mixed and matched as needed, and which you configure through a global
:data:`MathJax` variable (see :ref:`web-examples`).  This
is how MathJax is being distributed through the various CDNs that host
it.  When loaded this way, MathJax will automatically set up all the
objects and functions that you need to use the components you have
loaded, giving you easy access to typesetting and conversion functions
for the input and output formats you have selected.  See the section
on :ref:`web-components` for more information.  You can also create
your own custom components to complement or replace the ones provided
on the CDN (see :ref:`custom-extension` for more).

.. _startup-actions:

Startup Actions
===============

If you use any of the :ref:`combined component <combined-components>`
files, MathJax will perform a number of actions during its startup
process.  In particular, it will create the input and output jax, math
document, DOM adaptor, and other objects that are needed in order to
perform typesetting in your document.  You can access these through
the :attr:`MathJax.startup` object, if you need to.  MathJax will also
set up functions that perform typesetting for you, and conversion
between the various input and output formats that you have loaded.
This should make it easy to perform the most important actions
available in MathJax.  See :ref:`web-typeset` for more details.


.. _server-side-use:

Server-Side MathJax
===================

While MathJax 2 was designed for use in a web browser, an important
use case that this left unaddressed is pre-processing mathematics on a
server.  For version 2, we provided `mathjax-node
<https://github.com/mathjax/mathjax-node>`__ to fill this gap, but it
is not as flexible or easy to use as many would have liked.  MathJax 3
resolves this problem by being designed to work with `node`
applications in essentially the same way as in a browser.  That is,
you can load MathJax components, configure them through the
:data:`MathJax` global variable, and call the same functions for
typesetting and conversion as you do within a browser.  This makes
parallel development for both the browser and server much easier.

Moreover, node applications can access MathJax modules directly
(without the packaging used for MathJax components). This gives you
the most direct access to MathJax's features, and the most flexibility
in modifying MathJax's actions.  See :ref:`node-examples` for
examples of how this is done.


.. _ES6-typescript:

ES6 and Typescript
==================

MathJax 3 is written using ES6 modules and the `Typescript
<https://www.typescriptlang.org>`__ language.  This means the source
code includes type information (which improves the code reliability),
and allows MathJax to be down-compiled to ES5 for older browsers while
still taking advantage of modern javascript programming techniques.
It also means that you can produce pure ES6 versions of MathJax
(rather than ES5) if you wish; these should be smaller and faster than
their ES5 equivalents, though they will only run in modern browsers
that support ES6, and so limit your readership.  We may provide both
ES6 and ES5 versions on the CDN in the future.

-----

New Features for Existing Components
====================================

In addition to the new structure for MathJax described above, some new
features have been added to existing pieces of MathJax.

TeX Input Extensions
--------------------

There are two new TeX input extensions: :ref:`tex-braket` and
:ref:`tex-physics`.  Also, some functionality that was built into the TeX
input jax in version 2 has been moved into extensions in version 3.
This includes the :ref:`macros <tex-configmacros>` configuration
option, the :ref:`tag formatting <tex-tagformat>` configuration
options, and the :ref:`require <tex-require>` macro.  The new
:ref:`tex-autoload` extension replaces the older `autoload-all`
extension, is more configurable, and is included in the TeX input
components by default.  There a several extensions that are not yet
ported to version 3, including the `autobold`, `mediawiki-texvc`, and
the third-party extensions.  


SVG Output
----------

The SVG output for equations with labels has been improved so that the
positions of the labels now react to changes in the container width
(just like they do in the HTML output formats).


Improved Expression Explorer
----------------------------

The interactive expression explorer has been improved in a number of
ways.  It now includes better heuristics for creating the speech text
for the expressions you explore, provides more keyboard control of the
features in play during your exploration, adds support for braille
output, adds support for zooming on subexpressions, and more.  See the
:ref:`accessibility` page for more details.


|-----|
