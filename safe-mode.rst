.. _safe-mode:

*****************
MathJax Safe-mode
*****************

MathML includes the ability to include hyperlinks within your
mathematics, and such links *could* be made to ``javascript:`` URL's.
For example, the expression

.. code-block:: javascript

    <math>
      <mtext href="javascript:alert('Hello!')">Click Me</mtext>
    </math>

would display the words "Click Me" that when clicked would generate an
alert message in the browser.  This is a powerful feature that
provides authors the ability to tie actions to mathematical
expressions.

Similarly, MathJax provides an HTML extension for the TeX language
that allows you to include hyperlinks in your TeX formulas:

.. code-block:: latex

    $E \href{javascript:alert("Einstein says so!")}{=} mc^2$

Here the equal sign will be a link that pops up the message about
Einstein.

Both MathML and the HTML extension for TeX allow you to add CSS
styles, classes, and id's to your math elements as well.  These
features can be used to produce interactive mathematical expressions
to help your exposition, improve student learning, and so on.

If you are using MathJax in a community setting, however, like a
question-and-answer forum, a wiki, a blog with user comments, or
other situations where your readers can enter mathematics, then your
readers would be able to use such powerful tools to corrupt the page,
or fool other readers into giving away sensitive information, or
interrupt their reading experience in other ways.  In such
environments, you may want to limit these abilities so that your
readers are protected form these kinds of malicious actions.

(Authors who are writing pages that don't allow users to enter data on
the site do not have to worry about such problems, as the only
mathematical content will be their own.  It is only when users can
contribute to the page that you have to be careful.)

MathJax provides a `Safe` extension to help you limit your
contributors' powers.  There are two ways to load it.  The easiest is
to add ``,Safe`` after the configuration file when you are loading
``MathJax.js``:

.. code-block:: html

    <script src="http://cdn.mathjax.org/mathjax/latest/MathJax.js?config=TeX-AMS_HTML,Safe"></script>

This causes MathJax to load the ``TeX-AMS_HTML`` configuration file,
and then the ``Safe`` configuration, which adds the Safe extension to
your ``extensions`` array so that it will be loaded with the other
extensions.

Alternatively, if you are using in-line configuration, you could just
include ``"Safe.js"`` in your ``extensions`` array directly:

.. code-block:: html

    <script type="text/x-mathjax-config">
    MathJax.Hub.Config({
      jax: ["input/TeX","output/HTML-CSS"],
      extensions: ["tex2jax.js","Safe.js"]
    });
    </script>
    <script src="http://cdn.mathjax.org/mathjax/latest/MathJax.js"></script>

The Safe extension has a number of configuration options that let you
fine-tune what is allowed and what is not.  See the :ref:`Safe
extension options <configure-safe>` for details.
