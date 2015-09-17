.. _localization-strings:

********************
Localization Strings
********************

In MathJax v2.2 and later, the user interface can be localized to use
languages other than English.  This includes all information strings,
menu items, warning messages, and so on.  To make this possible, each
string is given an ID that is used to obtain the localized version of
the string.  So the "File not found" message might have the ID
``NotFound``.  The localization data for each language associates the ID
``NotFound`` with the proper translation of the English phrase "File not
found".

Some of MathJax's functions, like :meth:`MathJax.Message.Set()`, can accept
localized strings as their parameters. To use a localized string in
this case, use an array consisting of the ID followed by the English
string (followed by any substitution arguments for the string, see
below).  For example,

.. code-block:: javascript

    MathJax.Message.Set(["NotFound","File not found"]);

would cause the "File not found" message to be displayed (in the
currently selected language) in the MathJax message area at the bottom
of left of the browser window.  Note that :meth:`MathJax.Message.Set()` can
still accept unlocalized strings, as it has traditionally:

.. code-block:: javascript

    MathJax.Message.Set("File not found");

Here the message will always be in English, regardless of the selected
language.

The reason that the English string is also given (in addition to the
ID), is because MathJax needs to have a fallback string to use in case
the localization data doesn't translate that ID, or if the localization
data has failed to load.  Providing the English string in addition to
the ID guarantees that a fallback is available.

MathJax's localization system is documented more fully in
the :ref:`Localization API <api-localization>` documentation.


Parameter Substitution
----------------------

Localized messages may need to include information, like file names,
that are not known until the message is needed.  In this case, the
message string acts as a template and MathJax will insert the needed
values into it at the appropriate places.  To use such substitutions,
you include the values in the localization string array following the
English phrase, and use the special sequences ``%1``, ``%2``, etc., to
refer to the parameters at the locations where they should appear in
the message.  For example,

.. code-block:: javascript

    MathJax.Message.Set(["NotFound","File %1 not found",filename]);

would cause the name stored in the variable ``filename`` to be
inserted into the localized string at the location of the ``%1``.
Note that the localized string could use the parameters in a different
order from how they appear in English, so MathJax can handle languages
where the word order is different.

Although it would be rare to need more than 9 substitution parameters,
you can use ``%10``, ``%11``, etc., to get the 10-th, 11-th, and so
on. If you need a parameter to be followed directly by a number, use
``%{1}0`` (rather than ``%10``) to get the first parameter followed
directly by a zero.

A ``%`` followed by anything other than a number or a ``{`` generates
just the character following the percent sign, so ``%%`` would produce
a single ``%``, and ``%:`` would produce just ``:``.


Plural forms
------------

Some languages handle plural forms differently from how English does.
In English, there are two forms: the one used for a single item, and
the one used for everything else.  For example, you would say "You
have one new message" for a single message, but "You have three new
messages" of there were three messages (or two, or zero, or anything
other than one).

To handle plurals, you use a special "plural" directive within your
message string.  The format is

.. code-block:: javascript

    %{plural:%n|text1|text2}

where ``%n`` is the reference to the parameter (which should be a
number) that controls which text to use.  For English, there would be
two texts, one (``text1``) for when the number is 1, and one
(``text2``) for when it is anything else.  Other languages may have
more forms (e.g., Welsh has six different plural forms, a different
one for 0 (zero), 1 (one), 2 (two), 3 (few), 6 (many), and anything
else, so Welsh translation plural forms would have six different
texts).  The details of how to map the numeric value to the text
strings is handled by the translation data for the selected language.

As an example, you might use

.. code-block:: javascript

    MathJax.Message.Set(["NewMessages","You have %1 new %{plural:%1|message|messages}",n]);

where ``n`` is a variable holding the number of new messages.

Alternatively, 

.. code-block:: javascript

    MathJax.Message.Set(["NewMessages","You have %{plural:%1|a new message|%1 new messages}",n]);

shows how you can do substitution within the plural texts themselves.

Note that the translation string may contain such constructs even if
the original English one doesn't. For example

.. code-block:: javascript

    MathJax.Message.Set(["alone","We are %1 in this family but alone in this World.",n]);

could be translated into French by

.. code-block:: javascript
   
    "Nous sommes %1 dans cette famille mais %{plural:%1|seul|seuls} en ce monde."

Note that if one of the options for the plural forms requires a
literal close brace, it can be quoted with a percent.  For instance, 

.. code-block:: javascript

    %{plural:%1|One {only%}|Two {or more%}}

would produce ``One {only}`` when the first argument is 1, and ``Two {or
more}`` otherwise.

If a message needs to include a literal string that looks like one of
these selectors, the original ``%`` can be quoted. So ``%%{plural:%%1|A|B}``
would be the literal string ``%{plural:%1|A|B}``.


Number forms
------------

Decimal numbers are represented differently in different languages.
For example, 3.14159 is an English representation of an approximation
to the mathematical constant pi, while in European countries, it would
be written 3,14159.  MathJax will convert a number to the proper
format before inserting it into a localized string.  For example

.. code-block:: javascript

    MathJax.Message.Set(["pi","The value of pi is approximately %1",3.14159]);

would show the value as ``3.14159`` in English, but ``3,14159`` if
French is the selected language.


ID's and Domains
----------------

Because MathJax consists of a number of separate components and can
be extended by third party code, it is possible for two different
components to want to use the same ID value for a string, leading to
an ID name collision.  To help avoid this, MathJax allows identifier
*domains* that are used to isolate collections of identifiers for one
component from those for another component. For example,
each input jax has its own domain, as do many of the MathJax
extensions. This means you only have to worry about collisions within
your own domain, and so can more easily manage the uniqueness if the
ID's in use.

To use a domain with your ID, replace the ID with an array consisting of the
domain and the ID. For example, the TeX input jax uses the domain
``TeX``, so

.. code-block:: javascript

    MathJax.Message.Set([["TeX","MissingBrace"],"Missing Close Brace"]);

would set the message to the translation associated with the ID
``MissingBrace`` in the ``TeX`` domain.

Some functions that take localization strings automatically prepend the
domain to the ID (if one isn't already given).  For example, the
:meth:`Error()` function of the TeX input jax uses the ``TeX`` domain if
one isn't supplied, so

.. code-block:: javascript

    TEX.Error(["MissingBrace","Missing Close Brace"]);

will generate the ``MissingBrace`` error from the ``TeX`` domain
without having to specify the ``TeX`` domain explicitly.


HTML Snippets
-------------

MathJax provides a means of specifiying HTML code in javascript called
:ref:`HTML snippets <html-snippets>`.  These frequently include text
that needs to be localized, so you can include localization strings
(like those described above) within an HTML snippet in any location
where you would normally have a regular text string.  For example, the
snippet

.. code-block:: javascript

    [
      "Follow this link: ",
      ["a",{href:"http://www.mathjax.org"},[
        ["img",{src:"external.gif"}]
      ]]
    ]

includes the text "Follow this link:" which should be localized.  You
can change it to a localization string to cause it to be translated to
the selected langauge:

.. code-block:: javascript

    [
      ["FollowLink","Follow this link"],": ",
      ["a",{href:"http://www.mathjax.org"},[
        ["img",{src:"external.gif"}]
      ]]
    ]

(Here we use the ID ``FollowLink`` to obtain the translation).  Note
that you can include substitution parameters as usual:

.. code-block:: javascript

    [
      ["ClickMessages","Click for %1 new %{plural:%1|messsage|messages}",n],": ",
      ["a",{href:"messages.html"},[
        ["img",{src:"external.gif"}]
      ]]
    ]

It is even possible to substitute HTML snippets into a localized
string (when it is within an HTML snippet):

.. code-block:: javascript

    [
      ["MathJaxLink","This is documented at the %1 website",[
        ["a",{href:"http://docs.mathjax.org"},["MathJax]]
      ]]
    ]

Note, however, that a better approach to this exampe is given in the
next section.

Since an HTML snippet might contain several strings that need to be
localized, you may want to be able to specify the domain to use for
*all* the strings within the snippet.  Within a snippet, you can use
an entry of the form ``[domain,snippet]`` to force the snippet to be
processed with default domain ``domain``.  E.g.

.. code-block:: javascript

    [
      ["TeX",[
        ["ul",{},[
          ["li",{},[["MissingBrace","Missing close brace"]]],
          ["li",{},[["ExtraBrace","Extra close brace"]]],
        ]]
      ]],
      ["MathML",[
        ["ul",{},[
          ["li",{},[["UnknownNode","Unknown node type: %1",type]]],
          ["li",{},[["BadAttribute","Illegal attribute: %1",attr]]],
        ]]
      ]
    ]

would create two undordered lists, one with translations from the
``TeX`` domain, and one from the ``MathML`` domain.

To summarize the format of an HTML snippet, it is an array
with each entry being one of the following:

*  A text string, which becomes text in the resulting HTML; this is
   untranslated.

*  An array of the form ``["tag"]``, ``["tag",{properties}]``, or
   ``["tag",{properties},HTML-snippet]``, which becomes the given HTML
   tag, with the given properties, containing the given HTML-snippet
   as its children.

*  An array of the form ``[id,message]`` or
   ``[id,message,parameters]``, which is first translated, then
   parameter substitution performed, and the result added to the
   HTML (either as text or as HTML tags if the message included
   Markdown syntax).  Note that the ``id`` can be either an id or an
   array ``[domain,id]``, and that the parameters could be HTML
   snippets themselves.

*  An array of the form ``[domain,HTML-snippet]``, which becomes
   the HTML-snippet with its localizations done from the given domain.


Markdown Notation
-----------------

HTML snippets allow you to create styled markup, like bold or italics,
but this requires breaking the text up into smaller strings that fall
in between HTML tags.  That makes it hard to translate, since the
strings are not full phrases.  To make the creation of strings with
bold, italics, and hyperlinks easier to localize, MathJax allows the
strings within HTML snippets to be written in a limited Markdown
syntax (*very* limited).  You can use ``*bold*``, ``**italics**``,
``***bold-italics***``, ``[link-text](url)``, and ```code``` to
obtain bold, italics, bold-italics, hyperlinks, and code blocks.  For
instance, the link example above could be more easily handled via

.. code-block:: javascript

    [
      ["MathJaxLink","This is documented at the [MathJax](%1) website",
                     "http://docs.mathjax.org"]
    ]

while

.. code-block:: javascript

    [
      ["Renderer","*Renderer*: lets you select the output renderer"]
    ]

will produce the equivalent of ``<b>Renderer</b>: lets you select the
output render`` in the appropriate language.
