.. _web-components:

######################
The MathJax Components
######################

In order to make it possible to customize what parts of MathJax you
include in your web pages, the MathJax code has been broken into
individual pieces, called *components*.  These are designed to share
common code so that you don't download the same thing more than once,
while still making it possible to only download the parts that you
need.  There are individual components for the various input and
output processors in MathJax, for the individual TeX extensions, for
the various font selections, and for other specialized pieces, such as
the MathJax contextual menu and the assistive technology support.
These can be mixed and matched in whatever combinations you need.

There are some obvious combinations of components; for example, TeX
input together with SVG output, or MathML input with CommonHTML
output.  MathJax provides a number of these common combinations as
complete packages that contain almost everything you need to run
mathjax in your page in a single file, though you can also configure
additional extensions to be loaded as well, and MathJax may autoload
other components when they are needed.

.. note::

   In version 3, there were a number of combined components that
   included most of the TeX extensions.  These components ended in
   ``-full``.  Because the number of extensions has grown, and
   continues to do so, including with third-party extensions, it is
   impractical to include all the extensions in a single file.  In
   version 4, the ``-full`` versions have been removed, along with the
   ``all-packages`` extension.

Components provide a great deal of flexibility in determining the
pieces of MathJax that you use.  You can even make your own custom
builds of MathJax that package exactly the pieces that you want to
use.  See :ref:`web-custom-build` for more details about how to do
that.

See the :ref:`loading-mathjax` section for details about how to
specify and load MathJax components.

See the :ref:`configuring-mathjax` section for details about how to
configure the various MathJax components.

-----

.. toctree::
   :caption: The Components
   :maxdepth: 2

   combined

.. toctree::
   :maxdepth: 2

   input

.. toctree::
   :maxdepth: 2

   output

.. toctree::
   :maxdepth: 2

   accessibility

.. toctree::
   :maxdepth: 2

   misc

|-----|
