.. _loader-options:

##############
Loader Options
##############

The `loader` component is the one responsible for loading the
requested MathJax components.  It is configured using the ``loader``
block in your MathJax configuration object.  The ``loader`` block can
also contain sub-blocks of configuration options for individual
components, as described below in :ref:`loader-component-options`.

-----

The Configuration Block
=======================

In the example below, :data:`Loader` represents the
:attr:`MathJax.loader` object, for brevity.

.. code-block:: javascript

    MathJax = {
      loader: {
        load: [],                                    // array of components to load
        ready: Loader.defaultReady.bind(Loader),     // function to call when everything is loaded
        failed: function (error) {                   // function to call if a component fails to load
          console.log(`MathJax(${error.package || '?'}): ${error.message}`);
        },
        paths: {mathjax: Loader.getRoot()},          // the path prefixes for use in specifying components
        source: {},                                  // the URLs for components, when defaults aren't right
        dependencies: {},                            // arrays of dependencies for each component
        provides: {},                                // components provided by each component
        require: null,                               // function to use for loading components
        pathFlters: []                               // functions to use to process package names
      }
    };

-----


Option Descriptions
===================

.. _loader-load:
.. describe:: load: []

   This array lists the components that you want to load.  If you are
   using a combined component file, you may not need to request any
   additional components.  If you are using using the :ref:`startup-component`
   component explicitly, then you will need to list all the components
   you want to load.

.. _loader-ready:
.. describe:: ready: MathJax.loader.defaultReady.bind(MathJax.loader)

   This is a function that is called when all the components have been
   loaded successfully.  By default, it simply calls the
   :ref:`startup-component` component's :ref:`ready() <startup-ready>`
   function, if there is one.  You can override this with your own
   function, can can call :meth:`MathJax.loader.defaultReady()` after
   doing whatever startup you need to do.  See also the
   :ref:`loader-component-options` section for how to tie into
   individual components being loaded.

.. _loader-failed:
.. describe:: failed: (error) => console.log(`MathJax(${error.package || '?'}): ${error.message}`)}

   This is a function that is called if one or more of the components
   fails to load properly.  The default is to print a message to the
   console log, but you can override it to trap loading errors in
   MathJax components.  See also the :ref:`loader-component-options`
   section below for how to trap individual component errors.
   
.. _loader-paths:
.. describe:: paths: {mathjax: Loader.getRoot()}

   This object links path prefixes to their actual locations.  By
   default, the ``mathjax`` prefix is predefined to be the location
   from which the MathJax file is being loaded.  You can use
   ``[mathjax]/...`` to identify a component, and this prefix is
   prepended automatically for any that doesn't already have a
   prefix.  For example, ``input/tex`` will become
   ``[mathjax]/input/jax`` automatically.

   When the TeX :ref:`tex-require` extension is loaded, an additional
   ``tex`` path is created in order to be able to load the various TeX
   extensions.

   You can define your own prefixes, for example,

   .. code-block:: javascript

      MathJax = {
        loader: {
          paths: {custom: 'https://my.site.com/mathjax'},
          load: ['[custom]/myComponent']
        }
      };

   which defines a ``custom`` prefix that you can used to access
   custom extensions.  The URL can even be to a different server than
   where you loaded the main MathJax code, so you can host your own
   custom extensions and still use a CDN for the main MathJax code.

   You can define as many different paths as you need.  Note that
   paths can refer to other paths, so you could do
   
   .. code-block:: javascript

      MathJax = {
        loader: {
          paths: {
            custom: 'https://my.site.com/mathjax',
            extensions: '[custom]/extensions'
          },
          load: ['[extensions]/myExtension']
        }
      };

   to define the ``extensions`` prefix in terms of the ``custom`` prefix.

.. _loader-source:
.. describe:: source: {}

   This object allows you to override the default locations of
   components and provide a specific location on a
   component-by-component basis.  For example:

   .. code-block:: javascript

      MathJax = {
        loader: {
          source: {
            'special/extension': 'https://my.site.com/mathjax/special/extension.js'
          },
          load: ['special/extension']
        }
      };

   gives an explicit location to obtain the ``special/extension`` component.
   

.. _loader-dependencies:
.. describe:: dependencies: {}

   This object maps component names to arrays of names of components
   that must be loaded before the given one.  The
   :ref:`startup-component` component pre-populates this object with
   the dependencies among the MathJax components, but you can add your
   own dependencies if you make custom components that rely on others.
   For example, if you make a custom TeX extension that relies on
   another TeX component, you would want to indicate that dependency
   so that if your extension is loaded via ``\require``, for example,
   the loader will automatically load the dependencies first.

   .. code-block:: javascript

      MathJax = {
        loader: {
          source: {
            '[tex]/myExtension: 'https://my.site.com/mathjax/tex/myExtension.js'},
          },
          dependencies: {
            '[tex]/myExtension': ['input/tex-base', '[tex]/newcommand', '[tex]/enclose']
          }
        }
      };

   This would cause the :ref:`tex-newcommand` and :ref:`tex-enclose`
   components to be loaded prior to loading your extension, and would
   load your extension from the given URL even though you may be
   getting MathJax from a CDN.
   

.. _loader-provides:
.. describe:: provides: {}

   This object indicates the components that are provided by a
   component that may include several sub-components.  For example,
   the `input/tex` component loads the :ref:`tex-newcommand` component
   (and several others), so the ``provides`` object indicates that via

   .. code-block:: javascript

      loader: {
        provides: {
          'input/tex': [
            'input/tex-base',
            '[tex]/ams',
            '[tex]/newcommand',
            '[tex]/noundefined',
            '[tex]/require',
            '[tex]/autoload',
            '[tex]/configmacros'
          ]
        }
      }

   The :ref:`startup-component` component pre-populates this object
   with the dependencies among the MathJax components, but if you
   define your own custom components that include other components,
   you may need to declare the components that it provides, so that if
   another component has one of them as a dependency, that dependency
   will not be loaded again (since your code already includes it).

   For example, if your custom component `[tex]/myExtension` depends
   on the :ref:`tex-newcommand` and :ref:`tex-enclose` components,
   then

   .. code-block:: javascript

      MathJax = {
        loader: {
          source: {
            '[tex]/myExtension: 'https://my.site.com/mathjax/tex/myExtension.js'},
          },
          dependencies: {
            '[tex]/myExtension': ['input/tex-base', '[tex]/newcommand', '[tex]/enclose']
          },
          load: ['input/tex', '[tex]/myExtension']
        }
      };

      will load the `input/tex` component, which provides both
      `input/tex-base` and `[tex]/newcommand`, and then load
      `[tex]/enclose` before loading your `[tex]/myExtension`.

.. _loader-require:
.. describe:: require: null

   This is a function to use for loading components.  It should accept
   a string that is the location of the component to load, and should
   do whatever is needed to load that component.  If the loading is
   asynchronous, it should return a promise that is resolved when the
   component is loaded, ortherwise it should return nothing.  If there
   is an error loading the component, it should throw an error.
   
   If set ``null``, the default is to insert a ``<script>`` tag into
   the document that loads the component.

   For use in `node` applications, set this value to ``require``, which
   will use node's ``require`` command to load components.  E.g.

   .. code-block:: javascript

      MathJax = {
        loader: {
          require: require
        }
      };

.. _loader-pathFilters:
.. describe:: pathFilters: []

   This is an array of functions that are used to process the names of
   components to produce the actual URL used to locate the component.
   There are built-in filters that perform actions like converting the
   prefix ``[tex]`` to the path for the TeX extensions, and adding
   `.js` to the end of the name, and so on.  You can provide your own
   filters if you need to manage the URLs in a different way.  The
   array consists of entries that are either functions that take a
   data object as an argument, or an array consisting of such a
   function and a number representing its priority in the list of
   filters (lower numbers are earlier in the list).  The data object
   that is passed to these functions is

   .. code-block:: javascript

      {
        name: string,            // the current name for the package (this becomes the url in the end)
        original: string,        // the original package name (should not be modified)
        addExtension: boolean,   // true if .js should be added to this name at some stage in the filter list
      }

   The filter can change the `name` value to move it closer to the
   final URL used for loading the given package.  The `original`
   property should be the original name of the package, and should not
   be modified.

   The function should return ``true`` if the `name` should be futher
   processed by other filters in the list, and ``false`` to end
   processing with the `name` now representing the final URL for the
   component.

   There are three default filters: one that replaces `name` with its
   value in the ``source`` list, if any; one that normalizes package
   names by adding ``[mathjax]/`` if there is no prefix or protocol
   already, and adding ``.js`` if there is no extension; and one
   that replaced prefixes with their values in the ``paths`` list.
   These have priorities 0, 10, and 20, respectively, and you can use
   priorities (including negative ones) with your own functions to
   insert them into this list in any location.

-----


.. _loader-component-options:

Component Configuration
=======================

In addition to the options listed above, individual compoments can be
configured in the ``loader`` block by using a sub-block with the
component's name, and any of the options listed below.  For example,

.. code-block:: javascript

   MathJax = {
     loader: {
       load: ['input/tex'],
       'input/tex': {
         ready: (name) => console.log(name + ' ready'),
         failed: (error) => console.log(error.package + ' failed')
       }
     }
   };

which sets up ``ready()`` and ``failed()`` functions to process when
the `input/tex` component is either loaded successfully or fails to load.

.. _loader-component-ready:
.. describe:: ready: undefined

   This is a function that has an argument that is the name of the
   component being loaded, and is called when the component and all
   its dependencies are fully loaded.

   .. _loader-component-failed:
.. describe:: failed: undefined

   This is a function that has an argument that is a ``PackageError``
   object (which is a subclass of ``Error`` with an extra field, that
   being ``pacakge``, the name of the component being loaded).  It is
   called when the component fails to load (and that can be because
   one of its dependencies fails to load).

.. _loader-component-checkReady:
.. describe:: checkReady: undefined

   This is a function that takes no argument and is called when the
   component is loaded, but before the ``ready()`` function is
   called.  It can be used o do post-processing after the component is
   loaded, but before other components are signaled that it is ready.
   For example, it could be used to load other components; e.g., the
   `output/chtml` component can use its configuration to determine
   which font to load, and then load that.  If this function returns a
   promise object, the ``ready()`` function will not be called until
   the promise is resolved.

|-----|
