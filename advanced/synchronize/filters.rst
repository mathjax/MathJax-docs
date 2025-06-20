.. _sync-filters:

=============================
MathJax Pre- and Post-Filters
=============================

Another means of hooking into MathJax's typesetting pipeline is via
pre- and post-filters associated with MathJax's input and output jax.
These are prioritized lists of functions that run either before or
after the jax processes a :data:`MathItem`, and they can be used to
pre-process or post-process MathJax's compiling and typesetting
functions.  Input jax have both pre- and post-filters, but output jax
have only post-filters; pre-filtering can be done by an input jax
post-filter, if needed.

To add a pre- or post-filter to an input jax use

.. js:function:: InputJax.preFilters.add(fn, priority)
                 InputJax.postFilters.add(fn, priority)

   :param (arg) => boolean|void: The filter function to be called.
                                 The :data:`arg` argument is an object
                                 with three keys: :data:`math`,
                                 :data:`document`, and :data:`data`.
                                 The values for these keys are the
                                 :data:`MathItem` being processed, the
                                 :data:`MathDocument` containing that
                                 math item, and jax-specific
                                 additional data.  If the function
                                 returns `false`, the any additional
                                 filters are cancelled.

   :param priority: The numeric priority of the filter, where lower
                    numbers are executed first.  This lets you insert
                    functions anywhere in the filter list.

For the TeX input jax, the :data:`data` item is the
:data:`ParseOptions` object for the input jax.

For the MathML input jax, the pre-filter only runs in the case that
the MathML is a serialized MathML string, as it is when converting a
MathML string, or when the :ref:`forceReparse <mathml-forceReparse>`
option is true.  The post-filter's :data:`data` is the root ``<math>``
element of the internal MathML tree of the MathML expression.  For the
MathML input jax, there is also a third filter:

.. js:function:: InputJax.mmlFilters.add(fn, priority)

This runs on the MathML DOM tree, either from the document itself, or
the one obtained by parsing a serialized MathML string, before the
input jax converts the MathML into MathJax's internal format.  The
:data:`data` in this case is the MathML DOM tree.

The AsciiMath input jax does not currently execute any pre- or
post-filters.

For an output jax, the post-filters can be added via

.. js:function:: OutputJax.postFilters.add(fn, priority)

with arguments as above.  In this case, the :data:`data` is the
``mjx-container`` node in which the output DOM elements have been
placed.  This will become the :data:`MathItem.typesetRoot` value, but
it has not yet been set when the post-filters run.

In an application that is using MathJax Components, the input jax can
be obtained from :data:`MathJax.startup.document.inputJax.tex` or
:data:`MathJax.startup.document.inputJax.mml`, and the output jax
from :data:`MathJax.startup.document.outputJax`.  For applications
using direct access to the MathJax modules, the input and output jax
will have been instantiated by hand, so you should already have access
to them; if not, then they can be obtained from the
:data:`MathDocument` instance returned by
:js:meth:`mathjax.document()` by using that in place of
:data:`MathJax.startup.document` above.

-----

.. _filter-number-space:

Allowing Spaces in Numbers
==========================

Here is an example of using a TeX input filter to allow numbers to be
entered that contain spaces, but where the spaces are removed in the
output.  That is, ``$12 345$`` will be parsed as a single number and
displayed as ``12345``.

.. code-block:: js

   MathJax = {
     tex: {
       numberPattern: /^(?:[0-9]+(?:(?: +|\{,\})[0-9]+)*(?:\.[0-9]*)?|\.[0-9]+)/
     },
     startup: {
       ready() {
         MathJax.startup.defaultReady();
         MathJax.startup.document.inputJax.tex.postFilters.add(({data}) => {
           for (const mn of data.getList('mn')) {
             const textNode = mn.childNodes[0];
             textNode.text = textNode.text.replace(/ /g, '');
           }
         });
       }
     }
   }

We set the :data:`numberPattern` option to allow spaces within the
number, and then use a post-filter to remove the spaces from the text
of any ``mn`` elements that were produced during the TeX processing.

-----

.. _filter-fullwidth:

Converting Full-Width Characters to ASCII Equivalents
=====================================================

This filter converts any character in the Unicode Full-Width character
range (U+FF01 -- U+FF5F) to their ASCII equivalent versions, leading
to better quality output.

.. code-block:: js

   MathJax = {
     startup: {
       ready() {
         MathJax.startup.defaultReady();
         MathJax.startup.document.inputJax.tex.preFilters.add(
           ({math}) => {
             math.math = math.math.replace(/[\uFF01-\uFF5E]/g,
               (c) => String.fromCodePoint(c.codePointAt(0) - 0xFF00 + 0x20));
           }
         );
       }
     }
   }

This uses a pre-filter to replace characters in the full-width range
by an equivalent one in the usual ASCII character range.  This will
allow numbers to be properly combined by TeX, for example, where the
full-width versions would be treated as individual characters.

-----

.. _filter-number-scripts:

Converting Unicode Numeric Superscripts to TeX Ones
===================================================

The following filter converts Unicode pseudo-script numbers (like
those in the Superscript and Subscripts block) to actual TeX super-
and subscripts.

.. code-block:: js

   MathJax = {
     startup: {
       ready() {
         //
         // Do usual setup
         //
         MathJax.startup.defaultReady();
         //
         // The pseudoscript numbers 0 through 9, and a pattern for plus-or-minus a number
         //
         const scripts = '\u2070\u00B9\u00B2\u00B3\u2074\u2075\u2076\u2077\u2078\u2079';
         const scriptRE = /([\u207A\u207B])?([\u2070\u00B9\u00B2\u00B3\u2074-\u2079]+)/g;
         //
         //  Add a TeX prefilter to convert pseudoscript numbers to actual superscripts
         //
         MathJax.startup.document.inputJax.tex.preFilters.add(({math}) => {
           math.math = math.math.replace(scriptRE, (match, pm, n) => {
             const N = n.split('').map(c => scripts.indexOf(c));  // convert digits
             pm === '\u207A' && N.unshift('+');     // add plus, if given
             pm === '\u207B' && N.unshift('-');     // add minus, if given
             return '^{' + N.join('') + '}';        // make it an actual power
           });
         });
       }
     }
   }

This uses a TeX input jax pre-filter to scan the TeX expression for
Unicode superscript numerals, with optional plus or minus signs, and
replace them with ASCII numerals inside braces with a ``^`` to make
them actual TeX superscripts.

The filter could be extended to process subscripts in a similar
fashion.

-----

.. _filter-svg-size:

Converting SVG Size from Ex to Px units
=======================================

The SVG output jax sets the ``<svg>`` element :attr:`width` and
:attr:`height` attributes using `ex` units, so the SVG will scale to
the size of the surrounding font automatically.  This filter converts
those measurements to `px` units instead.

.. code-block:: js

   MathJax = {
     startup: {
       ready() {
         MathJax.startup.defaultReady();
         const fixed = MathJax.startup.document.outputJax.fixed;
         MathJax.startup.document.outputJax.postFilters.add(({data}) => {
           const svg = data.querySelector('svg');
           if (svg?.hasAttribute('viewBox')) {
             const [ , , w, h] = svg.getAttribute('viewBox').split(/ /);
             const em = document.outputJax.pxPerEm / 1000;
             svg.setAttribute('width', fixed(w * em) + 'px');
             svg.setAttribute('height', fixed(h * em) + 'px');
           }
         });
       }
     }
   }

We use an output jax post-filter to modify the ``svg`` element's
attributes, taking advantage of the output jax's :meth:`fixed()`
method to obtain a limited number of decimal places.  The width and
height are determined from the :attr:`viewBox` attribute, whose values
correspond to ``em`` units in the SVG output.

-----

.. _filter-autobold:

An Autobold Filter
==================

This configuration implements a substitute for the v2 `autobold` extension.

.. code-block:: js

   MathJax = {
     startup: {
       ready() {
         MathJax.startup.defaultReady();
         MathJax.startup.document.inputJax.tex.preFilters.add(({math}) => {
           const styles = window.getComputedStyle(math.start.node.parentNode);
           if (styles.fontWeight >= 700) {
             math.math = '\\boldsymbol{' + math.math + '}';
           }
         });
       }
     }
   }

It uses a TeX input jax pre-filter that tests if the parent element of
the math string has CSS with ``font-weight`` of 700 or more (the
usual ``bold`` value), and if so, it wraps the TeX code in
``\boldsymbol{...}`` to make it bold.  Note, however, that if the
expression itself includes bold notation, that does not become extra
bold, so may not be distinguishable from the rest of the expression.

-----

.. _filter-mathvariant:

Convert Mathvariant to Unicode
==============================

This example is more complex, and demonstrates a way to convert the
use of the :attr:`mathvariant` attribute on the internal MathML token
elements to their Unicode equivalents in the Mathematical
Alphanumerics block.  Because MathML-Core (the version of MathML
implemented in most browsers) does not include support for
:attr:`mathvariant` (except as :attr:`mathvariant="normal" on
single-character ``mi`` elements to prevent the automatic
italicization of the character), this may be useful for cases where
you want to produce MathML expressions for use with a browser's native
MathML-Core support.  Using this together with the :ref:`native MathML
output <NativeMML>` example would make that output more effective in
browsers that implement MathML-Core.

.. code-block:: js

   MathJax = {
     startup: {
       ready() {
         //
         //  The numeric ranges for numbers, uppercase alphabet, lowercase alphabet,
         //  uppercase Greek, and lowercase Greek, with optional remapping of some
         //  characters into the (relative) positions used in the Math Alphanumeric block.
         //
         const ranges = [
           [0x30, 0x39],
           [0x41, 0x5A],
           [0x61, 0x7A],
           [0x391, 0x3A9, {0x3F4: 0x3A2, 0x2207: 0x3AA}],
           [0x3B1, 0x3C9, {0x2202: 0x3CA, 0x3F5: 0x3CB, 0x3D1: 0x3CC,
                           0x3F0: 0x3CD, 0x3D5: 0x3CE, 0x3F1: 0x3CF, 0x3D6: 0x3D0}],
         ];
         //
         //  The starting values for numbers, Alpha, alpha, Greek, and greek for the variants
         //
         const variants = {
           bold: [0x1D7CE, 0x1D400, 0x1D41A, 0x1D6A8, 0x1D6C2],
           italic: [0, 0x1D434, 0x1D44E, 0x1D6E2, 0x1D6FC, {0x68: 0x210E}],
           'bold-italic': [0, 0x1D468, 0x1D482, 0x1D71C, 0x1D736],
           script: [0, 0x1D49C, 0x1D4B6, 0, 0, {
             0x42: 0x212C, 0x45: 0x2130, 0x46: 0x2131, 0x48: 0x210B, 0x49: 0x2110,
             0x4C: 0x2112, 0x4D: 0x2133, 0x52: 0x211B, 0x65: 0x212F, 0x67: 0x210A,
             0x6F: 0x2134,
           }],
           'bold-script': [0, 0x1D4D0, 0x1D4EA, 0, 0],
           fraktur: [0, 0x1D504, 0x1D51E, 0, 0, {
             0x43: 0x212D, 0x48: 0x210C, 0x49: 0x2111, 0x52: 0x211C, 0x5A: 0x2128,
           }],
           'bold-fraktur': [0, 0x1D56C, 0x1D586, 0, 0],
           'double-struck': [0x1D7D8, 0x1D538, 0x1D552, 0, 0, {
             0x43: 0x2102, 0x48: 0x210D, 0x4E: 0x2115, 0x50: 0x2119, 0x51: 0x211A,
             0x52: 0x211D, 0x5A: 0x2124,
             0x393: 0x213E, 0x3A0: 0x213F, 0x3B3: 0x213D, 0x3C0: 0x213C,
           }],
           'sans-serif': [0x1D7E2, 0x1D5A0, 0x1D5BA, 0, 0],
           'bold-sans-serif': [0x1D7EC, 0x1D5D4, 0x1D5EE, 0x1D756, 0x1D770],
           'sans-serif-italic': [0, 0x1D608, 0x1D622, 0, 0],
           'sans-serif-bold-italic': [0, 0x1D63C, 0x1D656, 0x1D790, 0x1D7AA],
           monospace: [0x1D7F6, 0x1D670, 0x1D68A, 0, 0],
           '-tex-calligraphic': [0, 0x1D49C, 0x1D4B6, 0, 0, {
             0x42: 0x212C, 0x45: 0x2130, 0x46: 0x2131, 0x48: 0x210B, 0x49: 0x2110,
             0x4C: 0x2112, 0x4D: 0x2133, 0x52: 0x211B, 0x65: 0x212F, 0x67: 0x210A,
             0x6F: 0x2134,
           }, '\uFE00'],
           '-tex-bold-calligraphic': [0, 0x1D4D0, 0x1D4EA, 0, 0, {}, '\uFE00'],
         };
         //
         //  The filter function
         //
         function unicodeVariants(root) {
           //
           //  Walk the MathML tree for token nodes with mathvariant attributes
           //
           root.walkTree((node) => {
             if (!node.isToken || !node.attributes.isSet('mathvariant')) return;
             //
             //  Get the variant and the unicode characters of the element
             //
             const variant =
               node.attributes.get('data-mjx-variant') ?? node.attributes.get('mathvariant');
             const text = [...node.getText()];
             //
             //  Skip the only valid case in MathML-Core and any invalid variants
             //
             if (variant === 'normal' && node.isKind('mi') && text.length === 1) return;
             node.attributes.unset('mathvariant');
             node.attributes.unset('data-mjx-mathvariant');
             if (!Object.hasOwn(variants, variant)) return;
             //
             //  Get the variant data
             //
             const start = variants[variant];
             const remap = start[5] || {};
             const modifier = start[6] || '';
             //
             //  Convert the text of the child nodes
             //
             for (const child of node.childNodes) {
               if (child.isKind('text')) {
                 convertText(child, start, remap, modifier);
               }
             }
           });
         }
         //
         //  Convert the content of a text node
         //
         function convertText(node, start, remap, modifier) {
           //
           //  Get the text
           //
           const text = [...node.getText()]
           //
           //  Loop through the characters in the text
           //
           for (let i = 0; i < text.length; i++) {
             let C = text[i].codePointAt(0);
             //
             //  Check if the character is in one of the ranges
             //
             for (const j of [0, 1, 2, 3, 4]) {
               const [m, M, map = {}] = ranges[j];
               if (!start[j]) continue;
               if (C < m) break;
               //
               //  Set the new character based on the remappings and
               //  starting location for the range
               //
               if (map[C]) {
                 text[i] = String.fromCodePoint(map[C] - m + start[j]) + modifier;
                 break;
               } else if (remap[C] || C <= M) {
                 text[i] = String.fromCodePoint(remap[C] || C - m + start[j]) + modifier;
                 break;
               }
             }
           }
           //
           //  Put back the modified text content
           //
           node.setText(text.join(''));
         }
         //
         //  Add the input post-filters
         //
         MathJax.startup.defaultReady();
         for (jax of MathJax.startup.document.inputJax) {
           jax.postFilters.add(({data}) => unicodeVariants(data.root || data));
         }
       }
     }
   }

This example adds a post-filter to each of the input jax that are
loaded (so it will work with both the MathML input as well as TeX
input).  The filter walks the internal MathML tree looking for token
elements with :attr:`mathvariant` attributes, and then converts the
content of the child text nodes of those token nodes to use the proper
Unicode values for any alphabetic, numeric, or Greek characters that
can be represented using the Mathematical Alphanumeric and Letterlike
Symbols blocks.

The :data:`ranges` variable gives the character ranges that will be
converted, and the :data:`variants` object gives the data needed to
make those ranges to the various Mathematical Alphanumerics characters
for the different :attr:`mathvariant` values.

The special ``-tex-calligraphic`` and ``-tex-bold-calligraphic``
variants are used internally in MathJax to produce the Chancery
calligraphic variant (as opposed to the Roundhand script variant), but
Unicode does not distinguish between these two, and the result of the
``script`` and ``bold-script`` variants is font dependent.  The
`current mechanism <https://w3c.github.io/xml-entities/script.html>`__
to distinguish between these two in Unicode is to use the Unicode
variant selector codes U+FE00 and U+FE01.  The code here adds U+FE00
for the TeX calligraphic variants.  You may wish to add U+FE01 to the
script variants to explicitly request the Roundhand versions as well.
Note, however, that not all fonts support these variant specifiers, so
you may get the same characters in both cases, and which you get will
depend on the font.


|-----|
