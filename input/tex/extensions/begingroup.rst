.. _tex-begingroup:

##########
begingroup
##########

The `begingroup` extension implements commands that provide a
mechanism for localizing macro definitions so that they are not
permanent.  This is useful if you have a blog site, for example, and
want to isolate changes that your readers make in their comments so
that they don't affect later comments.

It defines two new non-standard macros, ``\begingroup`` and
``\endgroup``, that are used to start and stop a local namespace for
macros.  Any macros that are defined between the ``\begingroup`` and
``\endgroup`` will be removed after the ``\endgroup`` is executed.
For example, if you put ``\(\begingroup\)`` at the top of each
reader's comments and ``\(\endgroup\)`` at the end, then any macros
they define within their response will be removed after it is
processed.  Note that ``\begingroup`` and ``\endgroup`` do not have to
appear within the same expression.

In addition to these two macros, the `begingroup` extension defines
the standard ``\global`` and ``\gdef`` control sequences from TeX.
(The ``\let``, ``\def``, ``\newcommand``, and ``\newenvironment``
control sequences are already defined in the :ref:`tex-newcommand`
package.)

The begingroup package also defines two non-standard macros:
``\begingroupReset`` and ``\begingroupSandbox``.  The first
effectively applies ``\endgroup`` to any open ``\begingroup`` macros,
returning the definitions to the ones that were in effect before the
first ``\begingroup``, plus any new ``\global`` definitions.

The ``\begingroupSandbox`` macro can be used to isolate the
definitions in one section of the page from those in another, so that
sites, such as question-and-anser sites, can use this between user
posts to make sure that one user's definitions won't affect any other
user's expressions.  The ``\begingroupSandbox`` macro can't be
redefined, and its action is to remove all the open ``\begingroup``
calls and then start a new local greoup (effectively doing
``\begingroupReset\begingroup``). This removes any previous user
definitions and makes a new group for the next user's definition.
Furthermore, ``\global`` definitions are put into the new
``\begingroup`` so that even if the math includes ``\global``
definitions, they will be removed when the next ``\begingroupSandbox``
command is performed, and will not pollute the next user's macro
namespace.

Any definitions made before the first ``\begingroupSandbox``
invocation is made will be available within all the sandboxes, but
once ``\begingroupSandbox`` is performed, there is no going back; the
original macro namespace is no longer accessible to new definitions.

-----

The `begingroup` package is not autoloaded, so you must request it
explicitly if you want to use it.  To load the `begingroup` extension
explicitly, add ``'[tex]/begingroup'`` to the :data:`load` array of
the :data:`loader` block of your MathJax configuration, and add
``'begingroup'`` to the :data:`packages` array of the :data:`tex`
block.

.. code-block:: javascript

   window.MathJax = {
     loader: {load: ['[tex]/begingroup']},
     tex: {packages: {'[+]': ['begingroup']}}
   };

Alternatively, use ``\require{begingroup}`` in a TeX expression to load it
dynamically from within the math on the page, if the :ref:`tex-require`
extension is loaded.

-----


.. _tex-begingroup-options:


begingroup Options
------------------

Adding the `begingroup` extension to the :data:`packages` array defines an
:data:`begingroup` sub-block of the :data:`tex` configuration block with the
following values:

.. code-block:: javascript

   MathJax = {
     tex: {
       begingroup: {
         allowGlobal: ["let", "def", "newcommand", "DeclareMathOperator", "Newextarrow"]
       }
     }
   };


.. _tex-begingroup-allowGlobal:
.. describe:: allowGlobal: ["let", "def", "newcommand", "DeclareMathOperator", "Newextarrow"]

   This lists the commands that can follow the ``\global`` command.
   Extensions may add to this if they include new macros that can
   define global values.  Alternatively, you can remove commands from
   the list to prevent users from making global definitions.

-----


.. _tex-begingroup-commands:


begingroup Commands
-------------------

The `begingroup` extension implements the following macros:
``\begingroup``, ``\begingroupReset``, ``\begingroupSandbox``, ``\endgroup``, ``\gdef``, ``\global``


|-----|
