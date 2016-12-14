.. _configure-mml2jax:

************************
The mml2jax Preprocessor
************************

The options below control the operation of the `mml2jax` preprocessor
that is run when you include ``"mml2jax.js"`` in the `extensions` array
of your configuration.  They are listed with their default values.  To
set any of these options, include a ``mml2jax`` section in your
:meth:`MathJax.Hub.Config()` call.  For example

.. code-block:: javascript

    MathJax.Hub.Config({
      mml2jax: {
        preview: "mathml"
      }
    });

would set the ``preview`` parameter to ``"mathml"``.

.. describe:: preview: "mathml"

    This controls whether `mml2jax` inserts ``MathJax_Preview`` spans to make a
    preview available, and what preview to use, when it locates
    mathematics on the page. Possible values are: ``"mathml"``, ``"alttext"``,
    , ``"altimg"``, ``"none"``, or an HTML snippet.
    
    The default is ``"mathml"``, in which case MathJax keeps the content of the
    ``<math>`` tag as the preview (until it is processed by MathJax).
    Set to ``"alttext"``, to use the ``<math>`` tag's ``alttext`` attribute
    as the preview, if the tag has one. Set to ``"altimg"`` to use an image
    described by the ``altimg*`` attributes of the ``<math>`` element.
    Set to ``"none"`` to prevent the previews from being inserted 
    (the math will simply disappear until it is typeset).
    Set to an array containing the description of an HTML snippet in order to
    use the same preview for all equations on the page (e.g., you could have
    it say ``"[math]"`` or load an image).

    Examples:

    .. code-block:: javascript

        preview: ["[math]"],     //  insert the text "[math]" as the preview

    .. code-block:: javascript

        preview: [["img",{src: "/images/mypic.jpg"}]],  // insert an image as the preview

    See the :ref:`description of HTML snippets <html-snippets>` for
    details on how to represent HTML code in this way.


