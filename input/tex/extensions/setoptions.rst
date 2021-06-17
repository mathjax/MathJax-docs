.. _tex-setoptions:

##########
setoptions
##########

The `setoptions` extension implements a non-standard ``\setOptions``
macro that allows you to change the options for a TeX package, or for
the TeX input jax itself, from within a TeX expression.

.. describe:: \setOptions[package]{options}

    Sets the options for `package` to the ones given in `options`.
    Here, `options` is a collection of space-separated option names
    (to be set to ``true``) or `option=value` declarations, where the
    given option will get the specified value.  If the value contains
    spaces, it can be enclosed in braces, which will not become part
    of the value.

For example:

.. code-block:: latex

   \[
     \setOptions{tagSide=left}
     E = mc^2 \tag{1}
   \]
   
   \[
     \setOptions{tagSide=right}
     e^{\pi 1} + 1 = 0 \tag{2}
   \]

would typeset the first expression with its tag on the left, and the
second (and subsequent) expressions with tags on the right.

To change a package setting, use the package name as an optional
bracket argument:

.. code-block:: latex

   \[
     \setOptions[physics]{arrowdel=true}
     \grad
     \setOptions[physics]{arrowdel=false}
   \]

Here the gradient symbol with have an arrow, but subsequent ones will not.

Note that any changes made by ``\setOptions`` are global, so will
affect all the following expressions.  If you want a local change,
you will need to set the value back to its original one explicitly.


Because changing the option settings can cause adverse consequences,
and so could be misused in a setting where users are provided the TeX
content for your site, the `setoptions` package is not autoloaded,
it does not appear in the list of all packages, and it can not be
loaded with ``\require{}``.  You must include it in the package list
explicitly if you want to allow its use.

To load the `setoptions` extension, add ``'[tex]/setoptions'`` to the
``load`` array of the ``loader`` block of your MathJax configuration, and add
``'setoptions'`` to the ``packages`` array of the ``tex`` block.

.. code-block:: javascript

   window.MathJax = {
     loader: {load: ['[tex]/centernot']},
     tex: {packages: {'[+]': ['centernot']}}
   };


-----

.. _tex-setoptions-require:

The \require command with setoptions
------------------------------------

If the `require` package is enabled, `setoptions` modifies
``\require`` to allow passing of options for the required package (and
makes the original ``\require`` macro available as ``\Require``).  So
the new syntax is:

.. describe:: \require[options]{package}

where `options` is a list of options in the same format as used by
``\setOptions``, and ``package`` is the name of the extension to load.
This command is equivalent to:

.. code-block:: latex

   \Require{package}\setOptions[package]{options}

meaning that the package is loaded and then its options are set.

For example:

.. code-block:: latex

   \require[harrowsize=3em]{amscd}

would load the `amscd` extension and then set its ``harrowsize``
option to ``3em``.

Note that the same rules apply to which options can be set for which
package as those that govern ``\setOptions`` itself.


-----

.. _tex-setoptions-options:


setoptions Options
------------------

Adding the `setoptions` extension to the ``packages`` array defines a
``setoptions`` sub-block of the ``tex`` configuration block with the
following values:

.. code-block:: javascript

  MathJax = {
    tex: {
      setoptions: {
        filterPackage: SetOptionsUtil.filterPackage,  // filter for whether a package can be configured
        filterOption: SetOptionsUtil.filterOption,    // filter for whether an option can be set
        filterValue: SetOptionsUtil.filterValue,      // filter for the value to assign to an option
        allowPackageDefault: true,       // default for allowing packages when not explicitly set in allowOptions
        allowOptionsDefault: true,       // default for allowing option that isn't explicitly set in allowOptions
        allowOptions: {                  // list of packages to allow/disallow, and their options to allow/disallow
          //
          //  top-level tex items can be set, but not these ones
          //    (that leaves digits and the tagging options that can be set)
          //
          tex: {
            FindTeX: false,
            formatError: false,
            package: false,
            baseURL: false,
            tags: false,          // would require a new TeX input jax instance
            maxBuffer: false,
            maxMaxros: false,
            macros: false,
            environments: false
          },
          //
          // These packages can't be configured at all
          //
          setoptions: false,
          autoload: false,
          require: false,
          configmacros: false,
          tagformat: false
        }
      }
    }
  };


.. _tex-setoptions-filterPackage:
.. describe:: filterPackage: SetOptionsUtil.filterPackage

   This is a function that is called to determine if a package can
   have its options set or not.  It is passed the TeX parser and the
   name of the extension as its arguments, and returns true if the
   package allows its options to be configured and false otherwise.
   The default is to first check that the named package exists, then
   check if the package is explicitly allowed by its entry in the
   ``allowOptions`` property being either ``true`` or a list of the
   ``allowOptions`` property. The entry can either be ``true``, allowing all options of the package to be set, or a list of the options that are allowed to be set. If the entry is
   explicitly ``false`` or the ``allowPackageDefault`` option is
   ``false``, an error is issued.  You can supply your own function to
   process the package names in another way if you wish.

.. _tex-setoptions-filterOption:
.. describe:: filterOption: SetOptionsUtil.filterOption

   This is a function that is called to determine whether an option
   can be set for a given package.  It is passed the TeX parser, the
   package name, and the option name as its arguments, and returns
   true if that option can be set for that package, and false
   otherwise.  The default is to check if the option is listed
   explicitly in the list of options for the given package in the
   ``allowOptions``. If the value is explicitly false, or if it is
   not listed and the ``allowOptionDefault`` is false, then produce an
   error. Otherwise check that the option actually exists for the
   package, and report an error if not, otherwise allow the option to
   be set.  You can supply your own function to process the option
   names in another way if you wish.

.. _tex-setoptions-filterValue:
.. describe:: filterValue: SetOptionsUtil.filterValue

   This is a function that is called to check the value provided for a
   given option is allowed.  It is passed the TeX parser, the package
   name, the option name, and the new option value as its arguments,
   and it returns the value to be used for the option.  The default is
   simply to return the value it is given, but you can use this to
   alter the value, or to produce an error if the value is not valid.

.. _tex-setoptions-allowPackageDefault:
.. describe:: allowPackageDefault: true

   This indicates how to handle packages that are not listed
   explicitly in the ``allowOptions`` list.  If ``true``, packages
   that are not listed are allowed to have their options set. If the value is
   ``false``, only the packages that are listed as ``true`` or have
   explicit option lists can have their options set.
   
.. _tex-setoptions-allowOptionsDefault:
.. describe:: allowOptionsDefault: true

   This indicates how to handle options that are not listed explicitly
   in the ``allowOptions`` list for a given package.  If ``true``,
   options that are not listed are allowed to be set, and if ``false``,
   only the options that are listed explicitly as ``true`` for the given
   package can have their options set.

.. _tex-setoptions-allowOptions:
.. describe:: allowOptions: {...}

   This is a list of the packages that indicates whether their options
   can be set or not, and which options can be set.  If a package name
   appears and is explicitly set to ``false``, that package's options
   can't be set.  If it is ``true`` and ``allowOptionsDefault`` is
   true, then any of its options can be set.  If it is an explicit
   list of options, then if the option is listed as ``true``, it can
   be set, and if ``false`` it can not.  If an option is not listed,
   then the value of ``allowOptionsDefault`` is used to determine
   whether it can be set or not.  If a package does not appear
   explicitly in the list, then the value of ``allowPackageDefault``
   is used to determine if the package's options can be set or not.

   You can include additional package names and their options in this
   list.  The defaults are set to allow reasonable security without
   having to list every single option that can be set.
              
-----


.. _tex-setoptions-commands:


setoptions Commands
-------------------

The `setoptions` extension implements the following macros:
``\setOptions``

|-----|
