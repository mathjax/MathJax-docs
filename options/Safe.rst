.. _configure-Safe:

******************
The Safe extension
******************

The options below control the operation of the `Safe` extension that
is run when you include ``"Safe.js"`` in the `extensions` array of
your configuration, or include ``Safe`` in the ``config=`` options
when you load ``MathJax.js``.  They are listed with their default
values.  To set any of these options, include a ``Safe``
section in your :meth:`MathJax.Hub.Config()` call.  For example

.. code-block:: javascript

    MathJax.Hub.Config({
      Safe: {
        allow: {
          URLs: "safe",     
    	  classes: "safe", 
          cssIDs: "safe",  
          styles: "safe",   
          fontsize: "all",   
          require: "safe"
	}
      }
    });

would set the ``fontsize`` option to ``"all"``, and the others to
``"safe"`` (these are described below).

The Safe extension affects both the TeX input and MathML input jax.


.. describe:: allow: { ... }

    This block contains the flags that control what the Safe extension
    will allow, and what it will block.  The flags can be set to
    ``"all"``, ``"none"``, or ``"safe"``.  When set to ``"all"``, no
    filtering is done for these values (this gives MathJax's default
    behavior).  When set to ``"none"``, these values are always
    filtered out.  When set to ``"safe"``, then only some values are
    allowed, as described below.

    .. describe:: URLs: "safe"

        When set to ``"safe"`` only URL's with protocols that are
	listed in the ``safeProtocols`` property (see below) are
	allowed as targets of ``href`` attributes or the ``\href``
	macro.  By default, these are ``http://``, ``https://``, and
        ``file://`` URL's.

    .. describe:: classes: "safe"

        When set to ``"safe"``, only class names that begin with
        ``MJX-`` and contain only letters, numbers, or the characters
        ``-``, ``_``, or ``.`` are allowed.

    .. describe:: cssIDs: "safe"

        When set to ``"safe"``, only ID's that begin with
        ``MJX-`` and contain only letters, numbers, or the characters
        ``-``, ``_``, or ``.`` are allowed.

    .. describe:: styles: "safe"

        When set to ``"safe"``, only styles taken from a predefined
        set of styles are allowed to be given.  These are listed in
        the ``safeStyles`` property (see below).

    .. describe:: require: "safe"

        When set to ``"safe"``, only the extensions listed in the
        ``safeRequire`` property (see below) are allowed to be loaded
        by the ``\require{}`` macro.

    .. describe:: fontsize: "all"

       When set to ``"safe"``, MathJax will try to limit the font size
       to sizes between those given by the ``sizeMin`` and ``sizeMax``
       properties.  These are .7 and 1.44 by default, which means
       sizes between ``\scriptsize`` and ``\large`` are allowed.  This
       also filters MathML ``fontsize``, ``mathsize``, and
       ``scriptminsize`` attributes, but here, ``"safe"`` acts as
       ``"none"``, since they are given in sizes with units, and the
       actual size of the units is not determined at input time (it is
       part of the output processing).  In addition, the
       ``scriptlevel`` attribute is restricted to non-negative values
       (so scripts can't be made larger), and the
       ``scriptsizemultiplier`` is restricted to being no larger than
       1, and no less than .6.

.. describe:: sizeMin: .7

    This is the minimum font size (in em's) that the TeX input jax
    will allow when ``fontsize`` is set to ``"safe"`` above.  The
    default is the size of ``\scriptsize``.  Values less than this are
    set to this value.

.. describe:: sizeMax: 1.44

    This is the maximum font size (in em's) that the TeX input jax
    will allow when ``fontsize`` is set to ``"safe"`` above.  The
    default is the size of ``\large``.  Values larger than this are
    set to this value.

.. describe:: safeProtocols: {...}

    This is an object that lists the protocols that can be used in
    ``href`` attributes and the ``\href`` macro when ``URLs`` is set
    to ``"safe"`` above.  The default is

    .. code-block:: javascript

        safeProtocols: {
	  http: true,
	  https: true,
      	  file: true,
      	  javascript: false
        }

    Note that if a protocol doesn't appear in the list, it is assumed
    to be ``false``, so technically, ``javascript`` need not have been
    listed, but it is given to make it explicit that it should not be
    allowed.

.. describe:: safeStyles: {...}

    This is an object that lists the style properties that can be used
    in MathML ``style`` attributes and the ``\style`` and ``\bbox``
    macros when ``styles`` is set to ``"safe"`` in the ``allowed``
    property above.  The default is

    .. code-block:: javascript

        safeStyles: {
          color: true,
      	  backgroundColor: true,
      	  border: true,
      	  cursor: true,
      	  margin: true,
      	  padding: true,
      	  textShadow: true,
      	  fontFamily: true,
      	  fontSize: true,
      	  fontStyle: true,
      	  fontWeight: true,
      	  opacity: true,
      	  outline: true
   	}

    Any style property that doesn't appear on this list is not allowed
    to be entered and will be removed (silently) from the style
    definition.

.. describe:: safeRequire: {...}

    This is an object that lists the TeX extensions that can be loaded
    via the ``\require{}`` macro when ``require`` is set to
    ``"safe"`` in the ``allowed`` property above.  The default is

    .. code-block:: javascript

        safeRequire: {
          action: true,
      	  amscd: true,
      	  amsmath: true,
      	  amssymbols: true,
      	  autobold: false,
      	  "autoload-all": false,
      	  bbox: true,
      	  begingroup: true,
      	  boldsymbol: true,
      	  cancel: true,
      	  color: true,
      	  enclose: true,
      	  extpfeil: true,
      	  HTML: true,
      	  mathchoice: true,
      	  mhchem: true,
      	  newcommand: true,
      	  noErrors: false,
      	  noUndefined: false,
      	  unicode: true,
      	  verb: true
        }

These configuration options give you a lot of control over what
actions MathJax is allowed to take.  It is also possible override the
individual filtering functions in order to customize the filtering
even further, should that be needed.  See the code for the details of
the function names and their definitions.

