.. _synchronization:

####################################
Synchronizing your code with MathJax
####################################

**This page is under construction**

MathJax version 2 used `queues`, `callbacks`, and `signals` as a means
of coordinating your code with the actions of MathJax.  Version 3 uses
the more modern tool know as a `promise
<https://developers.google.com/web/fundamentals/primers/promises>`__
to synchronize your code with MathJax.
See the :ref:`typeset-async` section for examples of typesetting using
promises.

In addition to promises, MathJax version 3 introduces
a :ref:`renderActions <document-renderactions>` configuration option
that provides a means of linking into MathJax's processing pipeline.
This is a priorities list of functions to call during processing,
which includes the default actions of finding the math in the page,
compiling it into the internal format, getting font metrics for the
surrounding text, typesetting the mathematics, inserting the math into
the page, adding menu actions, and so on.  You can insert your own
functions into this chain to add more functionality, or even remove
the existing steps to trim down what MathJax does.

More information will be coming to this section in the future.

|-----|
