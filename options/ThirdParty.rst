.. _ThirdParty:

***********************************
Third-party Extensions
***********************************

MathJax can load extensions (and configurations) from arbitrary locations. 
This allows authors and developers to easily integrate custom code.

Custom extension path configuration
----------------------------------------

Usually, third-party extensions have to be specified with their full 
paths (and matching ``loadComplete`` calls); this limits portability. To
simplify this process, the MathJax configuration can include (possibly 
multiple) third-party locations for easier reference.

To specify the URL, set ``MathJax.Ajax.config.path["Extra"]`` in your
configuration file, for example,

.. code-block:: javascript

    <script type="text/x-mathjax-config">
      MathJax.Ajax.config.path["Extra"] = "https://my.extra.com/mathjax/extra";
    </script>

or equivalently,

.. code-block:: javascript

    <script type="text/javascript">
      window.MathJax = {
        AuthorInit: function () {
              MathJax.Ajax.config.path["Extra"] = "https://my.extra.com/mathjax/extra";
            }
      };
    </script>

Configuring this path will allow you to load extensions using the ``[Extra]`` 
prefix. To continue the example, the following configuration would then load 
``http://my.extra.com/mathjax/extra/spiffy.js``.

.. code-block:: javascript

    MathJax.Hub.Config({
      extensions: ["[Extra]/spiffy.js"]
    });

Note that the extension's ``loadComplete`` call needs to match this path, 
i.e., ``spiffy.js`` should end with

.. code-block:: javascript

    MathJax.Ajax.loadComplete("[Extra]/spiffy.js");


MathJax Third-Party extension repository
----------------------------------------

We collect a list of third-party extensions on Github at `github.com/mathjax/MathJax-third-party-extensions 
<https://github.com/mathjax/MathJax-third-party-extensions>`_. This repository 
allows developers to publicize their custom extensions easily.

.. note:: 

    The mirrored copy on the MathJax CDN at `cdn.mathjax.org/mathjax/contrib/ 
    <//cdn.mathjax.org/mathjax/contrib/>`_ has been retired alongside the MathJax CDN.


.. note::

  You can disable the ``[Contrib]`` path by loading MathJax with 
  ``noContrib`` in the query string, e.g., ``MathJax.js?config=...&noContrib``. 
  This is particularly necessary when using your own copy of MathJax with
  a combined configuration file bit without access to ``cdn.mathjax.org``.
