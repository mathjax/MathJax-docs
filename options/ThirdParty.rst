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
      MathJax.Ajax.config.path["Extra"] = "http://my.extra.com/mathjax/extra";
    </script>

or equivalently,

.. code-block:: javascript

    <script type="text/javascript">
      window.MathJax = {
        AuthorInit: function () {
              MathJax.Ajax.config.path["Extra"] = "http://my.extra.com/mathjax/extra";
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

We host a third-party extension repository on the MathJax CDN. This repository 
allows developers to make their custom extensions easily available to all
MathJax users.

The code of the repository is hosted on Github at `github.com/mathjax/MathJax-third-party-extensions 
<https://github.com/mathjax/MathJax-third-party-extensions>`_ and 
is mirrored to the CDN at `cdn.mathjax.org/mathjax/contrib/ 
<//cdn.mathjax.org/mathjax/contrib/>`_

To add your extension, please follow the guidelines of the repository. To add the third party repository to your configuration use

.. code-block:: javascript

    <script type="text/x-mathjax-config">
      MathJax.Ajax.config.path["Contrib"] = "//cdn.mathjax.org/mathjax/contrib";
    </script>

or equivalently,

.. code-block:: javascript

    <script type="text/javascript">
      window.MathJax = {
        AuthorInit: function () {
              MathJax.Ajax.config.path["Contrib"] = "//cdn.mathjax.org/mathjax/contrib";
            }
      };
    </script>
