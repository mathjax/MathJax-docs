.. _api-localization:

******************************
The MathJax.Localization Class
******************************

Beginning in version 2.2 of MathJax, all of MathJax's messages, menus,
dialog boxes, and so are are localizable (meaning they can be
presented in languages other than English).  This is accomplished
through the `MathJax.Localization` object.  This object stores the
data about the available languages, and the selected language,
together with the routines needed to obtain the translated strings for
the messages used by MathJax, and the ones used to register
translations with the system.

Localizable strings in MathJax are identified by a unique ID (a
character string used to obtain the translation), and MathJax has
functions that obtain the translated message associated with the ID.
Some messages need values inserted into them (like file names, or TeX
macro names), and MathJax can insert those values into the translated
string automatically.  The localization system has support for plural
and number forms, which differ from language to language.  These
issues are described in more detail in the :ref:`Localization Strings
<localization-strings>` documentation.

A number of MathJax's messaging functions handle localization of their
messages automatically.  For example, the :meth:`MathJax.Message.Set()`
function and the TeX input jax's :meth:`Error()` function both will look
up localization strings automatically. 

Because the localization data needs to be downloaded over the network,
MathJax only loads this data when it is actually needed (many users
will only see mathematical expressions and will never need an actual
translated message string, so there is no need to waste time
downloading the localization data for them).  Since MathJax loads
files asynchonously, there is a synchronization issue that you need to
be aware of when using localized message strings.  There are support
routines to help make this easier (these are described in more detail
below).

Finally, MathJax consists of a number of relatively separate
components, and can be extended by third-party plug-ins, it is
possible that there would be name collisions with the ID's used to
identify localizable strings. To make it easier to manage the string
ID's, and to break up the localization data into smaller chunks that
can be loaded quickly when needed, MathJax breaks up the messages into
`domains`, each with its own set of ID's for the messages in that
domain.  Typically, a component (like the math menu, or the TeX input
jax) has its own domain, so it can keep its message ID's separate from
other components.  


Getting a Translated String
===========================

The basic means of obtaining the string to use for a message to
display to the user is to call the `_()` method of the
`MathJax.Localization` object, passing the string id and the English
phrase. For example,

.. code-block:: javascript

    MathJax.Localization._("TC","Typsetting Complete");

would return the string for "Typesettings Complete" in the currently
selected language.  This can be facilitated by defining the function

.. code-block:: javascript

    var _ = function () {return MathJax.Localization._.apply(MathJax.Localization,arguments)}

so that you only need to use

.. code-block:: javascript

    _("TC","Typesetting Complete");

to obtain the translated string.

Both these examples take the translation from the default domain (the
``_`` domain), but most components will want to use their own
domain.  For example, the TeX input jax uses the ``TeX`` domain.  To
request a translation from a specific domain, replace the ID with an
array consisting of the domain and ID.  For example

.. code-block:: javascript

    MathJax.Localization._(["TeX","MissingBrace"],"Missing Close Brace");

would get the string associated with the ID ``MissingBrace`` from the
``TeX`` domain in the current language.  To make this easier, the TeX
input jax could define

.. code-block:: javascript

    var _ = function (id) {
      return  MathJax.Localization._.apply(MathJax.Localization,
                      [["TeX",id]].concat([].slice.call(arguments,1)));
    };

which appends the ``TeX`` domain automatically.  With this definition,
you could use the simpler form

.. code-block:: javascript

    _("MissingBrace","Missing Close Brace");

to get the ``MissingBrace`` message from the ``TeX`` domain.


Parameter Substitution
======================

Some messages may want to include values (like file names, or TeX
macro names) as part of their strings.  The MathJax localization
system provides a means of including such values in the translated
strings.  In addition to the ID and message strings, you pass the
values that need to be substituted into the message, and use the
special sequences ``%1``, ``%2``, etc. to indicate where they go
within the message.  For example

.. code-block:: javascript

    MathJax.Localization._("NotFound","File %1 not found",filename)

would obtain the translation for "File %1 not found" and insert the
filename at the location of `%1` in the translated string.

There are also mechanisms of handling plural forms (which differ from
language to language) and number forms.  See the :ref:`Localization
Strings <localization-strings>` documentation for complete details.


HTML Snippets
=============

MathJax allows you to encode HTML snippets using javascript data (see
the :ref:`HTML snippets <HTML-snippets>` documentation for details),
and these often contain textual data that needs to be localized.  You
can pass HTML snippets to the :meth:`_()` function and a domain in which
the strings are to be looked up.  You then use a localization string
(an array consisting of the ID and string, plus optional parameters to
be substituted into the string) in place of a normal string in the
HTML snippet.  For example,

.. code-block:: javascript

    [
      "Follow this link: ",
      ["a",{href:"http://www.mathjax.org"},[
        ["img",{src:"external.gif"}]
      ]]
    ]

could be localized as

.. code-block:: javascript

    MathJax.Localization._("myDomain",[
      ["FollowLink","Follow this link"],": ",
      ["a",{href:"http://www.mathjax.org"},[
        ["img",{src:"external.gif"}]
      ]]
    ])

where the ``FollowLink`` ID is looked up in the ``myDomain`` domain of
the current language.

See the HTML snippets section of the :ref:`Localization Strings
<localization-strings>` documentation for complete details.


Synchronization Issues
======================

Because the translation data are stored in files that are loaded only
when they are needed, and since file loading in MathJax is
asynchronous, you need to take this loading process into account when
you use :meth:`_()` to obtain a localized string.  If this is the first
string obtained from the language, or the first one from the requested
domain, MathJax may have to load the data file or that language or
domain (or both).  In that case, you need to be prepared to wait for
that file to load and retry obtaining the translation string.
The localization system provides you with two functions to make this
easier, but you do have to keep in mind that obtaining translation
strings may be an asynchronous action.

The first method is :meth:`MathJax.Localization.loadDomain()`, which takes a
domain name and an optional callback, and forces MathJax to load the
language data for that domain (and the main language data file, if
needed), then calls the callback.  In this way, the callback function
knows that the localization data that it needs will be available, and
it doesn't have to worry about the possibility that :meth:`_()` will start
a file loading operation.  The :meth:`loadDomain()` function returns the
callback object, which can be used in callback queues, for example, to
coordinate further actions.

For example, suppose you want to perform the check

.. code-block:: javascript

    if (!url.match(/^https?:/)) {
      alert("Your url must use the http protocol");
      url = null;
    }

and want to localize the error message.  The naive approach would be

.. code-block:: javascript

    if (!url.match(/^https?:/)) {
      alert(_("BadProtocol","Your url must use the http protocol"));
      url = null;
    }

(provided you have defined :meth:`_()` for your domain as described
above).  The problem is that :meth:`_()` might need to load the language
data for your message, and that causes :meth:`_()` to throw a restart
error.  That would cause an error message to appear on the javascript
console, and your alert would never occur.  Instead, you want to make
sure that the localization data are available before calling :meth:`_()`.

Suppose the domain for your message ID is ``myDomain``, then one way
to do this would be

.. code-block:: javascript

    if (!url.match(/^https?:/)) {
      MathJax.Localization.loadDomain("myDomain",function () {
        alert(_("BadProtocol","Your url must use the http or https protocol"));
      });
      url = null;
    }

This uses ``loadDomain`` to force the ``myDomain`` data to be loaded
before attemptin the :meth:`_()` call, so you are sure the call will
succeed.  If several localized string are needed, you may want to use
``loadDomain`` around the entire function:


.. code-block:: javascript

    MathJax.Localization.loadDomain("myDomain",function () {
      if (!url.match(/^https?:/)) {
        alert(_("BadProtocol","Your url must use the http or https protocol"));
        url = null;
      }
      if (url && !url.match(/\.js$/)) {
        alert(_("BadType","Your url should refer to a javascript file"));
      }
    });

It is also possible to use :meth:`loadDomain()` as part of a callback
queue:

.. code-block:: javascript

    MathJax.Callback.Queue(
      MathJax.Localization.loadDomain("myDomain"),
      function () {
        if (!url.match(/^https?:/)) {
          alert(_("BadProtocol","Your url must use the http or https protocol"));
          url = null;
        }
      }
    );

Here the function will not be performed until after the ``myDomain``
domain is loaded.

The second tool for synchronizing with the localization system is the
:meth:`MathJax.Localization.Try()` function.  This method takes a callback
specification (for example, a function, though it could be any valid
callback data) and runs the callback with error trapping.  If the
callback throws a restart error (due to loading a localization data
file), :meth:`Try()` will wait for that file to load, then rerun the
callback (and will continue to do so if there are additional file
loads).

Using this approach, you don't have to worry about loading the domains
explicitly, as :meth:`_()` will throw a restart error when one is needed,
and :meth:`Try()` will catch it and restart after the load.  For example,

.. code-block:: javascript

    MathJax.Localization.Try(function () {
      if (!url.match(/^https?:/)) {
        alert(_("BadProtocol","Your url must use the http or https protocol"));
        url = null;
      }
    });

Note that, as with :meth:`loadDomain()`, :meth:`Try()` may return before the
callback has been run successfully, so you should consider this to be
an asynchronous function.  You can use callbacks to synchronize with
other actions, if needed.

Also note that your function may be called multiple times before it
succeeds (if localization data needs to be loaded).  So you need to
write the function in such a way that it doesn't matter if it gets
partway through and fails.  For example, you might not want to create
structures or modify values that affect what happens if the function
has to be rerun from the beginning when one of its :meth:`_()` causes a
file load.

A number of functions in MathJax are able to accept localization
strings as their inputs, and these already take care of the
synchronization issues for you.  For example,
:meth:`MathJax.Message.Set()` can accept either a plain (untranslated)
string, or a localization string (array with ID, string, and
substitution parameters).  It uses :meth:`Try()` internally to make sure
your message is properly translated before posting it to the screen.
That means you don't have to worry about that yourself when you use
:meth:`MathJax.Message.Set()`, though you shoud be aware that the posting
of the message may be asynchronous, so the message might not be
visible when :meth:`Set()` returns.  Fortunately,
:meth:`MathJax.Message.Clear()` coordinates with :meth:`Set()` so that even if
you call :meth:`Clear()` before the original message posts, MathJax won't
get confused).  Similarly, the TeX input jax's :meth:`Error()` function
handles the calling of :meth:`_()` and its synchronization for you.


The Localization Data
=====================

The ``MathJax.Localization`` object holds the data for the various
translations, as well as the service routines for adding to the
translations and retrieving translations.

Methods
-------

The methods in ``MathJax.Localization`` include:

.. method:: _(id,message[,arguments])

    The function (described in detail above) that returns the translated
    string for a given `id`, substituting the given `arguments` as needed.

    :Parameters:
        - **id** --- the ID of the message to translate, or an array ``[domain,ID]``
        - **message** --- the English phrase to use as fallback if
          there is no translation, or an HTML snippet to be localized
        - **arguments** --- values to be inserted into the translated string
    :Returns: the translated string or HTML snippet


.. method:: setLocale(locale)

    Sets the selected locale to the given one, e.g.

    .. code-block:: javascript

        MathJax.Localization.setLocale("fr");

    :Parameters:
        - **locale** --- the two-character identifier for the desired locale
    :Returns: ``null``


.. method:: addTranslation(locale,domain,def)

    Defines (or adds to) the translation data for the given `locale` and
    `domain`. The `def` is the definition to be merged with the current
    translation data (if it exists) or to be used as the complete
    definition (if not). The data format is described below.

    :Parameters:
        - **locale** --- the two-letter identifier for the locale to update or create
        - **domain** --- the name of the domain to add or modify
        - **def** --- the definition of the domain (see below)
    :Returns: ``null``


.. method:: setCSS(div)

    Sets the CSS for the given `div` to reflect the needs of the
    locale.  In particular, it sets the font-family, if needed, and
    the direction (for right-to-left languages).

    :Parameters:
        - **div** --- the DOM element whose CSS is to be modified
    :Returns: the `div`


.. method:: fontFamily()

    Get the ``font-family`` needed to display text in the selected
    language. Returns ``null`` if no special font is required.


.. method:: fontDirection()

    Get the ``direction`` needed to display text in the selected
    language. Returns ``null`` if no special font is required.


.. method:: plural(n)

    The method that returns the index into the list of plural texts
    for the value `n`.  See the [CLDR
    rules](http://unicode.org/cldr/charts/supplemental/language_plural_rules.html)
    for more information.  This calls the locale's :meth:`plural()`
    method, if there is one, otherwise it defaults to the English version.


.. method:: number(n)

    The method that returns the localized version of the number `n`.
    This calls the locale's :meth:`number()` method, if there is one,
    otherwise it defaults to the English version.


.. method:: loadDomain(domain[,callback])

    This causes MathJax to load the data file for the given `domain`
    in the current language, and calls the `callback` when that is
    complete.  If the domain is already loaded, the `callback` is
    called immediately.  This lets you synchronize actions that
    require localization with the loading of the needed data so that
    you are sure that the needed translations are available.  See the
    section on synchonization above for details.

    :Parameters:
        - **domain** --- the name of the domain to load
        - **callback** --- the callback object to be run after loading
    :Returns: the callback object (or a blank one if none specified)


.. method:: Try(fn)

    This method runs the function `fn` with error trapping and if an
    asynchronous file load is performed (for loading localizaton
    data), reruns the function again after the file loads.  This lets
    you synchronize actions that require localization with the loading
    of the needed data (see the section on synchronization above for
    details).  Note that the function should be one that can be run
    multiple times, if needed.  Also note that :meth:`Try()` can return
    *before* the `fn` has been completed, so you should consider `fn`
    to be running asynchronously (you can use callbacks to synchronize
    with other actions, if needed).

    :Parameters:
        - **fn** --- a callback specification for a function that
          uses localization data
    :Returns: ``null``


Properties
----------

.. describe:: locale

    The currently selected locale, e.g., ``"fr"``. This is set by the
    :meth:`setLocale()` method, and should not be modified by hand.

.. describe:: directory

    The URL for the localization data files. This can be overridden for
    individual languages or domains (see below). The default is
    ``[MathJax]/localization``.

.. describe:: strings

    This is the main data structure that holds the translation
    strings. It consists of an entry for each language that MathJax
    knows about, e.g., there would be an entry with key ``fr`` whose
    value is the data for the French translation. Initially, these
    simply reference the files that define the translation data, which
    MathJax will load when needed. After the file is loaded, they will
    contain the translation data as well. This is described in more
    detail below.


Translation Data
----------------

Each language has its own data in the `MathJax.Localization.strings`
structure. This structure holds data about the translation, plus the
translated strings for each domain.

A typical example might be

.. code-block:: javascript

    fr: {
      menuTitle: "Fran\u00E7ais",                // title used in language menu
      version: "1.0",
      directory: "[MathJax]/localization/fr",    // optional
      file: "fr.js",                             // optional (file contains the data below)
      isLoaded: true,                            // set when loaded
      fontFamily: "...",                         // optional
      plural: function (n) {...},                // optional implementation of plural forms
      number: function (n) {...},                // optional implementation of number forms

      domains: {
        "_": {
          version: "1.0",
          file: "http://somecompany.com/MathJax/localization/fr/hub.js",  //  optional (contains the rest of the data)
          isLoaded: true,
          strings: {
            fnf: "File '%1' not found",
            fl: "%1 %{plural:%1|file|files|} loaded",
            ...
          }
        },
        TeX: {
          ...
        },
        MathMenu: {
          ...
        }
        ...
      }
    }

The fields have the following meanings:

.. describe:: menuTitle

    The string used for the menu item in the language submenu (it
    should be in the language itself, not English).


.. describe:: version

    The version of the translation data.


.. describe:: directory

    An optional value that can be used to override the directory where
    the translation files for this language are stored. The default is
    to add the locale identifier to the end of
    ``MathJax.Localization.directory``, so the value given in the
    example above is the default value, and could be omitted.


.. describe:: file

    The name of the file containing the translation data for this
    language. The default is the locale identifier with ``.js`` appended,
    so the value given in the example above is the default value, and
    could be omitted.


.. describe:: isLoaded

    This is set to ``true`` when MathJax has loaded the data for this
    language. Typically, when a language is registered with MathJax,
    the data file isn't loaded at that point. It will be loaded when
    it is first needed, and when that happens, this value is set.

.. describe:: fontFamily

    This is a CSS font-family (or list of font-families) that should
    be used when text in this language is displayed.  If not present,
    then no special font is needed.


.. describe:: fontDirection

    This is a string ``ltr`` or ``rtl`` that specifies if the language
    is left-to-right or right-to-left.  If not present, ``ltr`` will
    be assumed.


.. describe:: plural(n)

    This is an optional function that returns the index into the list
    of plural values apropriate for the given integer n.  If not
    provided, the English :meth:`plural()` function is used.


.. describe:: plural(n)

    This is an optional function that returns the index into the list
    of plural values apropriate for the given integer `n`.  If not
    provided, the English :meth:`plural()` function is used.


.. describe:: number(n)

    This is an optional function that returns the a string
    representing the decimal number `n` in the format used by the
    given locale.  If not provided, the English :meth:`number()` function
    is used.


.. describe:: domains

    This is an object that contains the translation strings for this
    language, grouped by domain. Each domain has an entry, and its
    value is an object that contains the translation strings for that
    domain. The format is described in more detail below.


Domain Data
-----------

Each domain for which there are translations has an entry in the
locale's domains object. These store the following information:

.. describe:: version

    The version of the data for this domain.

.. describe:: file

    If the domain data is stored in a separate file from the rest of
    the language's data (e.g., a third-party extension that is not
    stored on the CDN may have translation data that is provied by the
    thrid-party), this property tells where to obtain the translation
    data. In the example above, the data is provided by another
    company via a complete URL. The default value is the locale's
    directory with the domain name appended and `.js` appended to
    that.

.. describe:: isLoaded

    This is set to ``true`` when the data file has been loaded.

.. describe:: strings

    This is an object that contains that actual translated
    strings. The keys are the message identifiers described in the
    overview section above, and the values are the translations


Registering a Translation
=========================

Typically, for languages stored on the CDN, MathJax will register the
language with a call like

.. code-block:: javascript

    MathJax.Localization.addTranslation("fr",null,{});

which will create an ``fr`` entry in the localization data that will
be tied to the ``[MathJax]/localization/fr`` directory, and the
``[MathJax]/localization/fr/fr.js`` file. That directory could contain
individual files for the various domains, or the ``fr.js`` file itself
could contain combined data that includes the most common domains,
leaving only the lesser-used domains in separate files.

An example ``fr.js`` file could be

.. code-block:: javascript

    MathJax.Localization.addTranslation("fr",null,{
      menuTitle: "Fran\u00E7ais",
      version: "1.0",
      domains: {
        "_": {},
        TeX: {},
        MathMenu: {}
      }
    });

This would declare that there are translation files for the ``_``,
``TeX``, and ``MathMenu`` domains, and that these will be loaded
individually from their default file names in the default directory of
``[MathJax]/localization/fr``.  Other domains will not be translated
unless they register themselves via a command like

.. code-block:: javascript

    MathJax.Localization.addTranslation("fr","HelpDialog",{});

in which case the domain's data file will be loaded automatically when
needed.

One could preload translation strings by including them in the ``fr.js``
file:

.. code-block:: javascript

    MathJax.Localization.addTranslation("fr",null,{
      menuTitle: "Fran\u00E7ais",
      version: "1.0",
      domains: {
        "_": {
          isLoaded: true,
          strings: {
            'NotFound': "Fichier `%1` non trouvé",
            ...
          }
        },
        TeX: {
          isLoaded: true,
          strings: {
            'MissingBrace': "Accolade de fermeture manquante",
            ...
          }
        },
        MathMenu: {}
      }
    });

Here the ``_`` and ``TeX`` strings are preloaded, while the ``MathMenu`` strings will
be loaded on demand.

A third party extension could include

.. code-block:: javascript

    MathJax.Localization.addTranslation("fr","myExtension",{
      file: "http://myserver.com/MathJax/localization/myExtension/fr.js"
    });

to add French translations for the ``myExtension`` domain (used by the
extension) so that they would be obtained from the third-party server
when needed.

A third party could provide a translation for a language not covered
by the MathJax CDN by using

.. code-block:: javascript

    MathJax.Localization.addTranslation("kr",null,{
      menuTitle: "\uD55C\uAD6D\uB9D0",
      fontFamily: "Butang, 'Arial unicode MS', AppleMayungjo",
      directory: "http://mycompany.com/MathJax/localization/kr"
    });

and providing a ``kr.js`` file in their ``MathJax/localization/kr``
directory that defines the details of their translation.  If the
Korean (kr) locale is selected, MathJax will load
``http://mycompany.com/MathJax/localization/kr/kr.js`` and any other
domain files when they are needed.

See the subdirectories in the ``MathJax/localization`` directory for
examples of language files.  The English directory (en) is not
actually used by MathJax (because the English strings a built in), but
it can serve as an example and starting point for producing your own
translations.


The Translation Files
=====================

Version 2.2 of MathJax comes with translations for French and German.
Additional languages will be made available as they are developed.  We
hope to use community-based websites like Transifex to help produce
these translations.  Currently, however, the language data files are
not in a form that can be used by these sites, so the only way to
generate new translations is to copy the English data files and
modify them for the new language.

In the future, MathJax will provide conversion programs that create
the files needed for such sites in the formats they require (e.g.,
YAML), and that convert the translated versions back into the data
files needed by MathJax, but these programs are not yet ready.

In addition, there will be a program that scans the MathJax files to
obtain the ID's and English strings that are needed for the
translation files.  This will make maintenance of language files
easier in the future, but these are not available yet.
