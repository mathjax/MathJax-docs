.. _FAQ:

**********************************
MathJax Frequently Asked Questions
**********************************


Which license is MathJax distributed under?
-------------------------------------------

MathJax is distributed under the `Apache License, Version
2.0 <http://cdn.mathjax.org/mathjax/2.0-latest/LICENSE>`__.

Will MathJax make my page load slower even if there's no math?
--------------------------------------------------------------

MathJax loads components only when needed so there is a big difference
between what is loaded on a page without mathematics and one that does
include mathematics. On a page with no mathematics, loading MathJax
requires two files: MathJax.js and a configuration file. If taken from
the MathJax CDN, the actual (compressed) data transferred for MathJax.js
will be about 14.4KB. The configuration file can vary greatly in size
depending on what is included; minimal configurations can be as small as
3.7KB, reasonable configurations vary between 25KB and 40KB -- bringing
us to a total of 18KB to 55KB, i.e., roughly a small to medium sized
image. To learn more about configuring MathJax, see :ref:`our
documentation <loading>`.

Mathematics is not rendering properly in IE. How do I fix that?
---------------------------------------------------------------

First, please open the MathJax homepage at
`www.mathjax.org <http://www.mathjax.org>`__ in IE to see if that loads
correctly. If it does, this indicates that there may be something wrong
with the webpage you were trying to view initially. If appropriate,
upgrade the website to `the latest version of
MathJax <http://www.mathjax.org/download/>`__. If the MathJax homepage 
does
not display mathematics properly, there may be an issue with your
security settings in Internet Explorer. Please check the following
settings:

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
your cache and restarting IE, and are still experiencing problems with
displaying mathematics on www.mathjax.org, we would appreciate it if you
reported the problem to the MathJax User Group so we can look into it.
Please follow the `guidelines for reporting
problems <#problem-report>`__ described below.

Some of my mathematics is too large or too small. How do I get it right?
------------------------------------------------------------------------

MathJax renders mathematics dynamically so that formulas and symbols are
nicely integrated into the surrounding text - with matching font size,
margins, and baseline. So, in other words: it should look right. If your
mathematics is too large or too small in comparison to its surroundings,
you may be using the incorrect typesetting style. Following LaTeX
conventions, MathJax supports two typesetting styles: inline and
paragraph (or "display") equations. For inline equations, MathJax tries
hard to maintain the inter-line spacing. This means things like
fractions and roots are vertically compressed, and smaller fonts are
used. Paragraph equations are shown as a separate paragraph and can be
displayed with more space and slightly larger fonts. The standard
delimiters for inline equations are ``\(...\)``, while for paragraph
equations they are ``$$...$$`` or ``\[...\]``, but they can be
customized. For how to configure MathJax to scale all mathematics
relative to the surrounding text, check our documentation for :ref:`the HTML
output <configure-HTML-CSS>` and
:ref:`the SVG output <configure-SVG>`.

How do I access the MathJax CDN using a https secure connection?
----------------------------------------------------------------

The MathJax CDN can be accessed via ``https``. We advise using the protocol 
agnostic ``//cdn.mathjax.org/mathjax/latest/MathJax.js``. For more 
information, see :ref:`our documentation <secure-cdn-access>`.

My mathematics is private. Is it safe to use MathJax?
-----------------------------------------------------

Yes. MathJax is JavaScript code that is run entirely within the browser
of the user, and so your site's actual content never leaves the browser
while MathJax is rendering. If you are using MathJax on the CDN, it
interacts with a web server to get font data but this is all put
together in the browser of the reader. In case you have concerns about
cross-site scripting, you can access the MathJax CDN service using the
secure ``https`` protocol to prevent tampering with the code between the
CDN and a browser. (Note, though, that this currently does not work with
the default url ``cdn.mathjax.org`` - see `this FAQ <#problem-https>`__
for more background and an alternative url). Or, if you prefer, you can
also install MathJax on your own web server. MathJax does not reference
script codes on other websites. The code is, of course, open source
which means that you can `review it and inspect its
integrity <https://github.com/mathjax/mathjax>`__.

Does MathJax support Presentation and/or Content MathML?
--------------------------------------------------------

MathML comes in two types: Presentation MathML, which describes what an
equation looks like, and Content MathML, which describes what an
equation means. By default, MathJax works with Presentation MathML
and offers an extension for Content MathML, see :ref:`the
documentation on MathML
support <content-mathml>`.
You can also convert your Content MathML expressions to
Presentation MathML yourself. A good way to do this conversion is with
an XSL transformation tool, see for example the `web-xslt
collection <http://code.google.com/p/web-xslt/wiki/Overview>`__. A more
detailed explanation of the difference between Content and Presentation
MathML can be found in the module `"Presentation MathML Versus Content
MathML" <http://cnx.org/content/m31620/latest/>`__ at cnx.org.

How do I create mathematical expressions for display with MathJax?
------------------------------------------------------------------

MathJax is a method to display mathematics. It is not an authoring
environment, and so you will need another program to create mathematical
expressions. The most common languages for mathematics on the computer
are (La)TeX and MathML, and there are many authoring tools for these
languages. MathJax is compatible with both MathML and (La)TeX. LaTeX
code is essentially plain text, and so you do not need a special program
to write LaTeX code (although complete authoring environments exist). If
you are not familiar with LaTeX, you will need some determination to
learn and master the language due to its specialized nature and rich
vocabulary of symbols. There are various good tutorials on the net, and
there is not a one-size-fits-all best one. A good starting point is the
`TeX User Group <http://www.tug.org/begin.html>`__, or have a look at
the `LaTeX Wiki book <http://en.wikibooks.org/wiki/LaTeX>`__.
`MathML <http://www.w3.org/Math/>`__ is an XML-based web format for
mathematical expressions. MathML3, the latest version, has been an
official W3C recommendation since October 2010. MathML is widely
supported by Computer Algebra Systems and can be created with a choice
of authoring tools, including Microsoft Office with the
`MathType <http://www.dessci.com/en/products/MathType/>`__ equation
editor. A list of software the supports MathML may be found in `The W3C
MathML software list <http://www.w3.org/Math/Software/>`__.

I ran into a problem with MathJax. How do I report it?
------------------------------------------------------

If you come across a problem with MathJax, please report it so that the
development team and other users are aware and can look into it. It is
important that you report your problem following the steps outlined here
because this will help us to rapidly establish the nature of the problem
and work towards a solution effectively. If you have are experiencing a
problem, please follow these steps:

-  Have you cleared your browser cache, quit your browser, and restarted
   it? If not, please do so first and check if the problem persists.
   `These
   instructions <http://www.wikihow.com/Clear-Your-Browser's-Cache>`__
   tell you how to clear your cache on the major browsers.
-  Have you turned of other extensions and plugins in your browser, and
   restarted it?
-  Have a look at the math rendering examples on
   `www.mathjax.org <http://www.mathjax.org>`__ to see if you experience
   problems there as well. This might help you to determine the nature
   of your problem.
-  If possible, check whether the problem has been solved in the latest
   MathJax release. The preferred way to do this is to invoke the most
   recent version of MathJax on the CDN by pointing to
   http://cdn.mathjax.org/mathjax/latest/MathJax.js. If you need to work
   locally, try a fresh install of the `latest
   release <http://www.mathjax.org/download/>`__.
-  Search through the `MathJax User
   Group <http://groups.google.com/group/mathjax-users>`__ to see if
   anyone else has come across the problem before.
-  Found a real and new problem? Please report it to the `MathJax User
   Group <http://groups.google.com/group/mathjax-users>`__ including the
   following information:

   -  A detailed description of the problem. What exactly is not working
      as you expected? What do you see?
   -  The MathJax version you are working with, your operating system,
      and full browser information including all version information.
   -  If at all possible, a pointer to a webpage that is publicly
      available and exhibits the problem. This makes sure that we can
      reproduce the problem and test possible solutions.

The MathJax font folder is too big. Is there any way to compress it?
--------------------------------------------------------------------

No, there is no simple way to make the fonts folder smaller. We have
tried to make the fonts folder as small as possible, but in order to
render math on some older browsers, you need image fonts, which take up
most of the space. This is because you need an individual image file for
each character in each font in each of a dozen different sizes, and each
file must be at least the block size of the hard drive it is stored on
(usually 4 kb). With nearly 30,000 separate image files, this adds up to
a lot. Some users have suggested using a "sprite font" that has all the
characters in a single image, from which MathJax could show only the
particular character it wants.  This is a nice idea, but it does not
work well in practice (at least not if you want it to work reliably
across multiple browsers).  Since the image fonts are intended as a last
resort for browsers whose functionality is not well behaved, relying on
fancy CSS tricks to clip large images is not going to be a viable
strategy.  This approach also has performance and printing problems.

The single-glyph-per-file approach has proven to be the only truly
reliable and maintainable approach that we have found. If you want to
disable image fonts altogether, however, in order to save space, you
can. **Note:** If you disable image fonts, MathJax might not work on
some users' browsers. With image fonts disabled, users must either have
the MathJax or STIX fonts on their computer or their browser must
support the @font-face CSS directive. This means IE6+, Chrome, Safari
3.1+, Firefox 3.5+, and Opera 10+, or other browsers based on their
rendering engines. On earlier browsers (without local fonts) or if 
webfonts are blocked , MathJax will not be able to render math reliably (though
it will try its best). To disable image fonts, edit the MathJax config
file at ``[MathJax]/config/MathJax.js`` or the custom config inside your
template's ``<script>`` tag and set imageFont to null.

::

      imageFont: null

This will tell MathJax that there are no image fonts available and it
will no longer look for them. You can then delete the
``[MathJax]/fonts/HTML-CSS/TeX/png/`` directory, which takes up the most
space in the fonts folder.  Do ***not*** delete the other directories,
as they are needed to handle @font-face for other browsers. For more
information, see `this
guide <https://github.com/mathjax/MathJax-docs/wiki/Guide%3A-reducing-size-of-a-mathjax-installation>`__.

Why is MathJax using image fonts instead of web fonts?
------------------------------------------------------

Web fonts are supported by all popular browsers (IE, Firefox, Chrome, Safari, 
Opera...) and they are scalable, which means much better display and print 
quality. Clearly, you want to make sure this is working on your install of 
MathJax. Here are several reasons web fonts might not be working for you:

-  **Config not specifying web fonts:** Web fonts are enabled by
   default, but double check your MathJax configuration if you have done
   any tweaking. The default config file is at
   ``[MathJax]/config/defaults.js``. Don't forget that you might have
   custom config in the ``<script>`` tag where you include MathJax in
   your template.  In your config, make sure you set ``webFont: "TeX"``.
   This will make MathJax try to load the TeX web font from the fonts
   folder.
-  **MathJax times out waiting for fonts to arrive:** You can tell by
   entering ``javascript:alert(MathJax.Message.Log())`` into the URL
   location type-in area (and pressing RETURN), and checking if there is
   a message about switching to image fonts. This can happen in
   particular if your network connection is relatively slow. In v2.0,
   the timeout was lengthened somewhat, and MathJax will switch only if
   the first font fails to arrive (if it succeeds in obtaining one font,
   it assumes it can get the rest).
-  **Missing font files:** In order for MathJax to send web font files
   to the client, the font files need to be in the right place on the
   server. Different browsers accept different font files, so there are
   different folders for the various font files. Make sure that the eot,
   otf, and svg folders are in the ``[MathJax]/fonts/HTML-CSS/TeX/``
   directory.
-  **Firefox local @font-face feature:** Firefox's interpretation of the
   same-origin security policy is more strict than most other browsers,
   and it applies to fonts loaded with the @font-face CSS directive.
   Firefox will not load such fonts if they are stored outside the
   directory containing the page that requests the fonts. That means
   that if your MathJax directory is in a higher-level directory,
   Firefox wont be able to read the font files from it when you load the
   file locally (this does not affect MathJax when used from an actual
   web server). In order to fix this, you can install the MathJax TeX
   fonts in the system fonts folder on the computer where you are
   viewing the files locally, or you can put the MathJax folder in the
   same directory as (or a subdirectory of) the web page you are
   viewing. A symbolic link to a MathJax installation at another
   location should be sufficient, but that will depend on the operating
   system. Neither of these is an ideal solution and we are looking for
   a better one, if you find one, please let us know.
-  **Firefox font preferences:** Firefox has a setting to disable the
   use of webfonts, which forces MathJax to fallback to picture fonts.
   You can change these settings under Edit => Preferences => Content =>
   Fonts => Advanced => "Allow pages to select their own fonts instead
   of my selections above".
-  **IIS configuration:** Microsoft's IIS web server by default doesn't
   recognize files with unknown extensions such as .otf and .svg, and
   doesn't know how to serve them. This results in a *HTTP Error 404.3 -
   Not Found* error message, causing MathJax to fall back to image
   fonts. If you are using IIS, you can enable the delivery of these
   file types by setting a custom mimetype configuration. See, for
   example, `Mads Kristensen's
   blog <http://madskristensen.net/post/Prepare-webconfig-for-HTML5-and-CSS3>`__
   and `Paul Irish's
   blog <http://www.paulirish.com/2010/font-face-gotchas/>`__ for
   instructions on how to do this (as well as more background
   information).
-  **Cross-domain access on shared installations:** When you are using a
   shared installation, where MathJax is installed on a different server
   than the webpages using it, Firefox’s and IE9’s same-origin security
   policy for cross-domain scripting may prevent MathJax from loading
   web fonts. This specific problem, and a possible resolution, are
   described in more detail in these :ref:`installation
   instructions <cross-domain-linking>`.
-  **Local pages on IE9:** IE9’s same-origin security policy, which also
   affects shared installations (see above), has implications for the
   viewing of local files (with a ``file://[filename]`` URL). See these
   :ref:`installation
   instructions <ie9-local-fonts-solution>`
   for details and a suggested resolution.

Why doesn't the TeX macro ``\something`` work?
----------------------------------------------

It really depends on what ``\something`` is. We have a full list of the
:ref:`supported TeX
commands <tex-commands>`. If the
command you want to use is not in this list, you may be able to define a
TeX macro for it, or if you want to get really advanced, you can define
custom JavaScript that implements it (see the files in the extensions
folder for some examples). Keep in mind that MathJax is meant for
typesetting **math** on the web. It only replicates the math
functionality of LaTeX and not the text formatting capabilities.  Any
text formatting on the web should be done in HTML and CSS, not TeX. If
you would like to convert full TeX documents into HTML to publish
online, you should use a TeX to HTML converter like
`LaTeXML <http://dlmf.nist.gov/LaTeXML/>`__,
`Tralics <http://www-sop.inria.fr/apics/tralics/>`__ or
`tex4ht <http://www.tug.org/applications/tex4ht/>`__, but you should
realize that TeX conversion tools will never produce results as good as
controlling the HTML and CSS source yourself.

What should IE's X-UA-Compatible meta tag be set to?
--------------------------------------------------------------

We strongly suggest to follow Microsoft's suggestion to use ``IE=edge``. That 
is, in the document ``<head>`` include

::

     <meta http-equiv="X-UA-Compatible" content="IE=edge">

This will force all IE versions to use their latest engine which is the 
optimal setting for MathJax. For more information, see the `Microsoft 
documentation on compatibility modes <https://www.modern.ie/en-us/performance/how-to-use-x-ua-compatible>`__.

Does MathJax support TeX macros?
--------------------------------

Yes. You can define TeX macros in MathJax the same way you do in LaTeX
with ``\newcommand{cmd}{args}{def}``. An example is
``\newcommand{\water}{H_{2}O}``, which will output the chemical formula
for water when you use the ``\water`` command. ``\renewcommand`` works
as well. You can also store macros in the MathJax configuration. For
more information, see :ref:`the
documentation <tex-macros>`.
