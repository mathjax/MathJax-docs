.. _platforms:

======================================
Using MathJax in popular web platforms
======================================

MathJax plugins are available for a growing number of wikis, blogs,
and other content-management systems.  

-  `MathJax-LaTeX`_, `Simple-MathJax`_ plug-ins for `WordPress`_.
-  `MathJax plugin for Drupal`_.
-  `Concrete5 MathJax plugin`_.
-  `MathJax plugins`_ for `Joomla`_.
-  `Sphinx extension: MathJax`_
-  `MathJax plugin for DokuWiki`_
-  `MediaWiki math extension used on Wikipedia`_, using MathJax since
   v1.20.
-  `Tiddlywiki plugin`_, `PluginMathJax`_ for TiddlyWiki.
-  `WikidPad`_, a plugin for the personal wiki platform.
-  `MathJax Extension`_ for the webbased SVG editor `SVG edit`_.
-  `Instantbird Extension`_ adds MathJax to the Mozilla-based chat
   client.
-  `MathJax plugin for
   Trac <https://trac-hacks.orgwiki/TracMathJaxPlugin>`__

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
.. _MathJax plugins: http://extensions.joomla.org/search?q=mathjax
.. _Joomla: http://www.joomla.org/
.. _WordPress: http://www.wordpress.org/

If the program you are using is not one of these, you might be able to 
use MathJax by modifying the theme or template for your wiki or blog,
as explained below.



Unofficial Tutorials
====================

-  `One Mathematical Cat's 
   tutorial <http://www.onemathematicalcat.org/MathJaxDocumentation/TeXSyntax.htm>`__
-  `Using MathJax on almost all blogging platforms
   <http://checkmyworking.com/2012/01/how-to-get-beautifully-typeset-maths-on-your-blog/>`__
   by Christian Perfect.
-  `Using Jekyll to generate fallback images in
   RSS <http://noamross.net/blog/2012/4/4/math-in-rss-feeds.html>`__ and
   use MathJax in html.
-  Using `MathJax on
   Posterous <http://korchkidu.posterous.com/test-mathjax>`__.
-  `Using MathJax in
   Blogger <http://holdenweb.blogspot.com/2011/11/blogging-mathematics.html>`__
-  `Using MathJax with Google Web Toolkit
   widgets <http://cs.jsu.edu/wordpress/?p=55>`__
-  `Using MathJax with
   Markdown <http://www.leancrew.com/all-this/2010/09/php-markdown-extra-math-mathjax-and-wordpress>`__.
   See also `notepag.es <http://notepag.es/introduction#>`__ for writing
   Markdown+MathJax.
-  `Posting to WordPress from LaTeX, using
   MathJax <http://www.russet.org.uk/blog/2010/08/latex-to-wordpress/>`__
-  `Converting Javadocs from LaTeXlet to
   MathJax <http://www.opengamma.com/blog/2012/04/12/converting-javadocs-from-latexlet-to-mathjax>`__
-  `Using iPython Notebooks with
   Mathjax+Markdown <http://williewong.wordpress.com/2012/07/24/using-ipython-notebook-for-manual-computations/>`__
-  `deck.js with MathJax
   <http://checkmyworking.com/2012/04/slides-about-the-princess-on-a-castle-puzzle/>`__
   (slide show / presentation software)
-  `Example of MathJax in Google’s
   html5slides <http://naoyat.github.io/slides/memo/html5slides%2BMathJax.html#1>`__,
   source `on
   github <https://github.com/naoyat/slides/tree/gh-pages/memo>`__



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
       src="httpsp://cdn.mathjax.org/mathjax/latest/MathJax.js?config=TeX-AMS-MML_HTMLorMML"></script>

either just before the ``</head>`` tag in your theme file, or at the end of
the file if it contains no ``</head>``. 

Keep in mind that this will enable MathJax for your current
theme/template only.  If you change themes or update your theme, you
will have to repeat these steps. We strongly suggest to use a plugin
or help the community of your favorite software by writing a plugin.
