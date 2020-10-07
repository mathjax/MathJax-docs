.. _typeset-math:

##########################
MathJax in Dynamic Content
##########################

**This page is under construction**

If you are writing a dynamic web page where content containing
mathematics may appear after MathJax has already typeset the rest of
the page, then you will need to tell MathJax to look for mathematics
in the page again when that new content is produced.  To do that, you
need to use the :meth:`MathJax.typeset()` method.  This will cause
MathJax to look for unprocessed mathematics on the page and typeset
it, leaving unchanged any math that has already been typeset.

This command runs synchronously, but if the mathematics on the page
uses ``\require`` or causes an extension to be auto-loaded (via the
:ref:`tex-autoload` component), this will cause the typeset call to
fail.  In this case, you should use :meth:`MathJax.typesetPromise()`
instead.  This returns a promise that is resolves when the typesetting
is complete.

You should not start more than one typesetting operation at a time, so
if you are using :meth:`MathJax.typesetPromise()` and will be calling
it more than once, you may want to retain the promise it returns and
chain your subsequent typeset calls to it.  See the
:ref:`typeset-async` section for more details.

More information will be coming to this section in the future.

|-----|
