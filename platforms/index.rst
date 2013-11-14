.. _platforms:

======================================
Using MathJax in popular web platforms
======================================

MathJax plugins are available for a growing number of wikis, blogs,
and other content-management systems.  

-  `MathJax-LaTeX`_, `Simple-MathJax`_ plug-ins for `WordPress`_.
-  `MathJax plugin for Drupal`_.
-  `Concrete5 MathJax plugin`_.
-  `KaTeX`_, MathJax plugin for `Joomla`_.
-  `Sphinx extension: MathJax`_
-  `MathJax plugin for DokuWiki`_
-  `MediaWiki math extension used on Wikipedia`_, using MathJax since
   v1.20.
-  `Tiddlywiki plugin`_, `PluginMathJax`_ for TiddlyWiki.
-  `WikidPad`_, a plugin for the personal wiki platform.
-  `MathJax Extension`_ for the webbased SVG editor `SVG edit`_.
-  `Instantbird Extension`_ adds MathJax to the Mozilla-based chat
   client.

.. _WikidPad: http://trac.wikidpad2.webfactional.com/wiki/MathJaxPlugin
.. _MathJax-LaTeX: http://wordpress.org/extend/plugins/mathjax-latex/
.. _Simple-MathJax: http://wordpress.org/extend/plugins/simple-mathjax/
.. _MathJax plugin for Drupal: http://drupal.org/project/mathjax
.. _MathJax plugin for DokuWiki: https://www.dokuwiki.org/plugin:mathjax
.. _Concrete5 MathJax plugin: http://www.concrete5.org/marketplace/addons/load-mathjax/
.. _PluginMathJax: http://myweb.dal.ca/haines/#PluginMathJax
.. _`Sphinx extension: MathJax`: http://sphinx.pocoo.org/ext/math.html#module-sphinx.ext.mathjax
.. _MediaWiki math extension used on Wikipedia: http://www.mediawiki.org/wiki/Extension:Math#MathJax
.. _MathJax Extension: https://github.com/josegaert/ext-mathjax
.. _SVG edit: https://code.google.com/p/svg-edit/
.. _Instantbird Extension: https://addons.instantbird.org/en-US/instantbird/addon/340
.. _Tiddlywiki plugin: http://www.guyrutenberg.com/2011/06/25/latex-for-tiddlywiki-a-mathjax-plugin/
.. _KaTeX: http://extensions.joomla.org/extensions/extension-specific/kunena-forum-extensions/23540
.. _Joomla: http://www.joomla.org/
.. _WordPress: http://www.wordpress.org/

If the program you are using is not one of these, you might be able to 
use MathJax by modifying the theme or template for your wiki or blog,
as explained below.


Using MathJax in a Theme File
=============================

Most web-based content-management systems include a theme or template
layer that determines how the pages look, and that loads information
common to all pages.  Such theme files provide a way to
include MathJax in your web templates in the absence of
MathJax-specific plugins for the system you are using.  To take
advantage of this approach, you will need access to your theme files,
which probably means you need to be an administrator for the site; if
you are not, you may need to have an administrator do these steps for
you. You will also have to identify the right file if the theme
consists of multiple files.

To enable MathJax in your web platform, add the line::

    <script type="text/javascript" 
       src="http://cdn.mathjax.org/mathjax/latest/MathJax.js?config=TeX-AMS-MML_HTMLorMML"></script>

either just before the ``</head>`` tag in your theme file, or at the end of
the file if it contains no ``</head>``. 

Keep in mind that this will enable MathJax for your current
theme/template only.  If you change themes or update your theme, you
will have to repeat these steps. We strongly suggest to use a plugin
or help the community of your favorite software by writing a plugin.
