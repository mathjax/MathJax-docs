import {HandlerType, ConfigurationType} from '@mathjax/src/js/input/tex/HandlerTypes.js';
import {Configuration}  from '@mathjax/src/js/input/tex/Configuration.js';
import {CommandMap} from '@mathjax/src/js/input/tex/TokenMap.js';
import TexError from '@mathjax/src/js/input/tex/TexError.js';
import {replaceUnicode} from '@mathjax/src/js/util/string.js';
import {VERSION} from '@mathjax/src/js/components/version.js';
import {Loader} from '@mathjax/src/js/components/loader.js';

/**
 * Check that we are loaded from the right version of MathJax
 */
Loader.checkVersion('[custom]/mml.min.js', VERSION, 'tex-extension');

/**
 * This function prevents multi-letter mi elements from being
 *   interpreted as TEXCLASS.OP
 */
function classORD(node) {
  this.getPrevClass(node);
  return this;
}

/**
 * Allowed attributes on any token element other than the ones with default values
 */
const ALLOWED = new Set(['style', 'href', 'id', 'class']);

/**
 * Parse a string as a set of attribute="value" pairs.
 */
function parseAttributes(text, type) {
  const attr = {};
  if (text) {
    let match;
    while ((match = text.match(/^\s*((?:data-)?[a-z][-a-z]*)\s*=\s*(?:"([^"]*)"|(.*?))(?:\s+|,\s*|$)/i))) {
      const name = match[1];
      const value = match[2] || match[3];
      if (Object.hasOwn(type.defaults, name) || ALLOWED.has(name) || name.substr(0,5) === 'data-') {
        attr[name] = replaceUnicode(value);
      } else {
        throw new TexError('BadAttribute', 'Unknown attribute "%1"', name);
      }
      text = text.substr(match[0].length);
    }
    if (text.length) {
      throw new TexError('BadAttributeList', "Can't parse as attributes: %1", text);
    }
  }
  return attr;
}

/**
 * Create a MathML token element of the given type
 */
function mmlToken(parser, name, type) {
  const typeClass = parser.configuration.nodeFactory.mmlFactory.getNodeClass(type);
  const def = parseAttributes(parser.GetBrackets(name), typeClass);
  const text = replaceUnicode(parser.GetArgument(name));
  const mml = parser.create('token', type, def, text);
  if (type === 'mi') {
    mml.setTeXclass = classORD;
  }
  parser.Push(mml);
}


/**
 *  The mapping of control sequence to function calls
 */
const MmlMap = new CommandMap('mmlMap', {
  mi: [mmlToken, 'mi'],
  mo: [mmlToken, 'mo'],
  mn: [mmlToken, 'mn'],
  ms: [mmlToken, 'ms'],
  mtext: [mmlToken, 'mtext']
});

/**
 * The configuration used to enable the MathML macros
 */
const MmlConfiguration = Configuration.create(
  'mml', {
    [ConfigurationType.HANDLER]: {
      [HandlerType.MACRO]: ['mmlMap']
    }
  }
);

