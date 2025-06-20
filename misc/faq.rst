.. _FAQ:

##################################
MathJax Frequently Asked Questions
##################################

* :ref:`faq-license`
* :ref:`faq-slow-no-math`
* :ref:`faq-ie-support`
* :ref:`faq-size-issues`
* :ref:`faq-safe`
* :ref:`faq-content-mml`
* :ref:`faq-create-math`
* :ref:`faq-report-issue`
* :ref:`faq-missing-macro`
* :ref:`faq-user-macros`

-----


.. _faq-license:

Which license is MathJax distributed under?
===========================================

MathJax is distributed under the `Apache License, Version
2.0 <https://github.com/mathjax/MathJax/blob/master/LICENSE>`__.


.. _faq-slow-no-math:

Will MathJax make my page load slower even if there's no math?
==============================================================

It depends on how you have configured and loaded MathJax.  The
combined component files like `tex-chtml.js` contain a full copy of
MathJax and all the components needed for it to process the given
input and output format, including much of the font data (but not the
actual fonts themselves).  So these files can be quite large, and can
take some time to download.  On the other hand, it is a single file
(unlike in version 2, where multiple files needed to be loaded), so
there should not be the delays associated with establishing multiple
connections to a server.  If you use the `defer` attribute on the
script that loads MathJax, that allows the browser to put off loading
and running MathJax until the rest of the page is ready, so that can
help speed up your initial page loading as well.


.. _faq-ie-support:

Mathematics is not rendering properly in IE. How do I fix that?
===============================================================

MathJax support for IE was dropped in MathJax v4.  MathJax may still
work in IE to some degree, but we no longer test in IE and will not
make modifications to accommodate it.  MathJax now uses ES6 features
that may not not available in IE without using a polyfill or shim
library.

MathJax version 3 only supports IE11, so if you are using an earlier
version of IE, you will need to update your copy, or use a different
browser.

If you are using IE11 with MathJax v3, then please open the MathJax
homepage at `www.mathjax.org <https://www.mathjax.org/#samples>`__ in
IE to see if that loads correctly.  If the MathJax website does not
display mathematics properly, there may be an issue with your security
settings in Internet Explorer. Please check the following settings:

-  "Active Scripting" under the Scripting section should be enabled, as
   it allows JavaScript to run.
-  "Run ActiveX controls and Plugins" should be enabled (or prompted) in
   the "ActiveX Controls and Plugins" section.
-  "Script ActiveX controls marked safe for scripting" needs to be
   enabled (or prompted) in the same "ActiveX Controls and Plugins"
   section. Note that it requires a restart of IE if you change this
   setting.
-  "Font Download" has to be enabled (or prompted) in the "Downloads"
   section. This is required for MathJax to use web-based fonts for
   optimal viewing experience.

You may need to select Custom Level security to make these changes. If
you have verified that the above settings are correct, tried clearing
your cache and restarting IE.  If the MathJax site *does* render
properly, this indicates that there may be something wrong with the
webpage you were trying to view initially.  If you manage that
website, then make sure that it is using :ref:`the latest version of
MathJax <mathjax-CDN>`.  If you *don't* manage the website yourself,
you may have to report the issue to the maintainers of the site in
order to have it resolved.


.. _faq-size-issues:

Some of my mathematics is too large or too small. How do I get it right?
========================================================================

MathJax renders mathematics dynamically so that formulas and symbols
are nicely integrated into the surrounding text --- with matching font
size, margins, and baseline.  In other words: it should look right. If
your mathematics is too large or too small in comparison to its
surroundings, you may be using the incorrect typesetting
style. Following LaTeX conventions, MathJax supports two typesetting
styles: in-line and "display" equations (one set off from the
paragraph as a separate line). For in-line equations, MathJax tries
hard to maintain the inter-line spacing. This means things like
fractions and roots are vertically compressed, and smaller fonts are
used. Display equations are shown as a separate paragraph and can be
rendered with more space and slightly larger fonts. The standard
delimiters for in-line equations in TeX notation are ``\(...\)``,
while those for display equations are ``$$...$$`` or ``\[...\]``, but
both types of delimiters can be customized. For how to configure
MathJax to scale all mathematics relative to the surrounding text,
check our documentation for :ref:`output-options`.

Some mobile browsers change the page's font size after the page is
loaded.  Since MathJax tries to match the font size, of that happens
after MathJax has run, it can mean that the math fonts are not the
right size (usually they are too small).  You can prevent the browser
from changing the font size by using the following ``<meta>`` tag in
the ``<head>`` section of your web page:

.. code-block:: html

   <meta name="viewport" content="width=device-width, initial-scale=1.0">

This will tell the browser to keep the original scaling.


.. _faq-safe:

My mathematics is private. Is it safe to use MathJax?
=====================================================

Yes. MathJax is JavaScript code that is runs within the user's
browser, so your site's actual content never leaves the browser while
MathJax is rendering. If you are using MathJax from a CDN, it
interacts with a web server to get font data and MathJax code, but
this is all put together in the browser of the reader. If you have
concerns about cross-site scripting, you can access the CDN service
using the secure ``https`` protocol to prevent tampering with the code
between the CDN and a browser; or, if you prefer, you can install
MathJax on your own web server, or for off-line use. MathJax does not
reference scripts from other websites. The MathJax code is, of course,
open source which means that you can `review it and inspect its
integrity <https://github.com/mathjax/MathJax-src>`__.


.. _faq-content-mml:

Does MathJax support Presentation and/or Content MathML?
========================================================

MathML comes in two types: Presentation MathML, which describes what
an equation looks like, and Content MathML, which describes what an
equation means. By default, MathJax works with Presentation MathML,
while v2 offers an extension for Content MathML ( see :ref:`the
documentation on MathML support <mathml-content-mathml>`), which has
not been converted to version 3 or above.

You can also convert your Content MathML expressions to Presentation
MathML using ``xslt``, see for example David Carlisle's `web-xslt
collection <https://github.com/davidcarlisle/web-xslt>`__. A more
detailed explanation of the difference between Content and
Presentation MathML can be found in the module `"Presentation MathML
Versus Content MathML" <https://cnx.org/content/m31620/latest/>`__ at
``cnx.org``.


.. _faq-create-math:

How do I create mathematical expressions for display with MathJax?
==================================================================

MathJax is a method to display mathematics. It is not an authoring
environment, and so you will need another program to create mathematical
expressions. The most common languages for mathematics on the computer
are (La)TeX and MathML, and there are many authoring tools for these
languages.

LaTeX code is essentially plain text, and so you do not need a special
program to write it (although complete LaTeX authoring environments do
exist). If you are not familiar with LaTeX, you will need some
determination to learn and master the language due to its specialized
nature and rich vocabulary of symbols. There are various good
tutorials on the net, but there is no one-size-fits-all best one. A
good starting point is the `TeX User Group
<http://www.tug.org/begin.html>`__, or have a look at the `LaTeX Wiki
book <http://en.wikibooks.org/wiki/LaTeX>`__.  The Mathematics
StackExchange site has a MathJax-specific `tutorial and quick
reference <https://math.meta.stackexchange.com/questions/5020/mathjax-basic-tutorial-and-quick-reference>`__
that illustrates many of the features of MathJax.

`MathML <http://www.w3.org/Math/>`__ is an XML-based web format for
mathematical expressions. MathML3, the latest version, has been an
official W3C recommendation since October 2010.  MathML4 is being
developed, and MathML-Core, a limited version of MathML, is currently
a working draft.  As of 2023, all the major browsers support
MathML-Core natively, though MathML-Core does not include all the
features that MathJax uses, so it is not sufficient to render
MathJax's MathML output in some cases.  MathML is widely supported by
Computer Algebra Systems and can be created with a choice of authoring
tools, including Microsoft Office with the `MathType
<http://www.dessci.com/en/products/MathType/>`__ equation editor. A
list of software the supports MathML may be found in `The W3C MathML
software list <http://www.w3.org/Math/wiki/Tools>`__.


.. _faq-report-issue:

I ran into a problem with MathJax. How do I report it?
======================================================

See the section on :ref:`reporting-issues` for the
steps to take when you think you have found a bug in MathJax.


.. _faq-missing-macro:

Why doesn't the TeX macro ``\something`` work?
==============================================

It really depends on what ``\something`` is. We have a full list of
the :ref:`tex-commands`. If the command you want
to use is not in this list, you may be able to define a TeX macro for
it yourself, or if you want to get really advanced, you can define
custom JavaScript that implements it (see the :ref:`Custom Extensions
<custom-extension>` section for details).

Keep in mind that MathJax is meant for typesetting **math** on the
web. It only replicates the math functionality of LaTeX and only a
limited amount of its text formatting capabilities.  Most text
formatting on the web should be done in HTML and CSS, not TeX. If you
would like to convert full TeX documents into HTML to publish online,
you should use a TeX to HTML converter like `LaTeXML
<http://dlmf.nist.gov/LaTeXML/>`__, `Tralics
<http://www-sop.inria.fr/apics/tralics/>`__, or `tex4ht
<https://tug.org/tex4ht/>`__, or more general conversion tools like
`PreTeXT <https://pretextbook.org>`__ or `pandoc
<https://pandoc.org>`__.  Note that TeX conversion tools may not
produce results as good as controlling the HTML and CSS source
yourself.


.. _faq-user-macros:

Does MathJax support user-defined TeX macros?
=============================================

Yes, you can define TeX macros in MathJax the same way you do in LaTeX
with ``\newcommand``, or ``\def``.  An example is
``\newcommand{\water}{{\rm H_{2}O}}``, which will output the chemical
formula for water when you use the ``\water`` command. The
``\renewcommand`` command works as well. You can also store macros in
the MathJax configuration. For more information, see the
:ref:`tex-macros` seection.

|-----|
