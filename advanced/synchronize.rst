.. _synchronization:

####################################
Synchronizing your code with MathJax
####################################

MathJax provides several mecahnisms for synchronizing your code with
the actions taken by MathJax, including function that return promises,
a processing queue to which you can add your own actions, filter
queues for the input and output jax that allow you to run functions
before or after they process the math, and configuration options that
allow you to perform actions at startup when MathJax is ready to
process math.  All of these give you the ability to hook into
MathJax's workflow, as described in the sections below.

-----

.. toctree::
   :caption: Synchronization Methods
   :maxdepth: 1
   :titlesonly:

   synchronize/promises
   synchronize/renderactions
   synchronize/filters
   synchronize/hooks

|-----|
