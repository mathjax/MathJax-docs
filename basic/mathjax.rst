.. _what-is-MathJax:

################
What is MathJax?
################

MathJax is an open-source JavaScript display engine for LaTeX, MathML,
and AsciiMath notation that works in all modern browsers.  It was
designed with the goal of consolidating the recent advances in web
technologies into a single, definitive, math-on-the-web platform
supporting the major browsers and operating systems, including those
on mobile devices.  It requires no setup on the part of the user (no
plugins to download or software to install), so the page author can
write web documents that include mathematics and be confident that
users will be able to view it naturally and easily.  One simply
includes MathJax and some mathematics in a web page, and MathJax does
the rest.

MathJax uses web-based fonts to produce high-quality typesetting that
scales and prints at full resolution, unlike mathematics included as
bitmapped images.  With MathJax, mathematics is text-based rather than
image-based, and so it is available for search engines, meaning that
your equations can be searchable, just like the text of your pages.
MathJax allows page authors to write formulas using TeX and LaTeX
notation, `MathML <http://www.w3.org/TR/MathML3>`__ (a World Wide Web
Consortium standard for representing mathematics in XML format), or
`AsciiMath <http://asciimath.org/>`__ notation.  MathJax can generate
output in several formats, including HTML with CSS styling, or
scalable vector graphics (SVG) images.

MathJax includes the ability to generate speakable text versions of
your mathematical expressions that can be used with screen readers,
providing accessibility for the visually impaired.  The assistive
support in MathJax also includes an interactive expression explorer
that helps these users to "walk through" an expression one piece at a
time, rather than having to listen to a complex expression all at
once, and the ability to "collapse" portions of the expressions to
allow a more simplified expression to be read, and only expanded if
more detail is desired.

MathJax is modular, so it can load components only when necessary, and
can be extended to include new capabilities as needed.  MathJax is
highly configurable, allowing authors to customize it for the special
requirements of their web sites.  Unlike earlier versions of MathJax,
version 3 can be packaged into a single file, or included as part of
larger bundles for those sites that manage their javascript assets in
that way.

Finally, MathJax has a rich application programming interface (API)
that can be used to make the mathematics on your web pages interactive
and dynamic.  Version 3 has been rewritten in ES6 using Typescript (a
version of javascript that includes type-checking and the ability to
transpile to ES5).  It was designed to be used as easily on a server
(as part of a ``node.js`` application) as it is in a browser.  This makes
pre-processing of web pages containing mathematics much easier than
with version 2, so web sites can perform all the math processing once
up front, rather than having the browser do it each time the page is
viewed.

|-----|
