.. _localization:

********************
MathJax Localization
********************

As of version 2.2, MathJax's user interface (including its contextual
menu, its help and about dialog boxes, and its warning messages) can
all be localized to appear in languages other than English. For the 
available language options, see the `TranslateWiki.net interface
<https://translatewiki.net/wiki/Translating:MathJax>`_.

The language used by MathJax can be selected using the MathJax
contextual menu.  It includes a `Language` submenu that lists the
available languages; selecting one will change the MathJax user
interface to use that language.

.. The list includes those languages that are provided by MathJax, but
   third party developers may produce translations that have not yet
   been incorporated into an official MathJax release.  If you know
   the location of such a translation, you can use the `Load from
   URL...` item at the bottom of the language menu to provide a URL
   for the data file for that language (this will be supplied by the
   third party).

Page authors can select a default language for MathJax so that, for
example, a page that is written in French will have MathJax's user
interface also in French.  To do this, add ``&locale=XX`` after the
configuration file in the ``<script>`` tag that loads the MathJax.js
file, where ``XX`` is the two-letter code for the language. For 
example:

.. code-block:: html

    <script src="http://cdn.mathjax.org/mathjax/latest/MathJax.js?config=TeX-AMS_HTML&locale=fr"></script>

will load MathJax using the French language.  Users can still override
this setting using the `Language` submenu of the MathJax contextual
menu.  This submenu can be disabled, however, using the
:ref:`MathMenu configuration options <configure-MathMenu>`.

If you want to help in the translation process, please visit the 
`TranslateWiki.net interface
<https://translatewiki.net/wiki/Translating:MathJax>`_.  The page
`localization.html
<http://cdn.mathjax.org/mathjax/latest/test/localization.html>`_
is a convenient way to check the different translations.
