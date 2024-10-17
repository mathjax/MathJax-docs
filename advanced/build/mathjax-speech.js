//
//  Load the desired components
//
import {mathjax} from '@mathjax/src/js/mathjax.js';                        // MathJax core
import {TeX} from '@mathjax/src/js/input/tex.js';                          // TeX input
import {Sre} from '@mathjax/src/js/a11y/sre.js';                           // Speech generation
import {browserAdaptor} from '@mathjax/src/js/adaptors/browserAdaptor.js'; // browser DOM
import {RegisterHTMLHandler} from '@mathjax/src/js/handlers/html.js';      // the HTML handler
import {STATE} from '@mathjax/src/js/core/MathItem.js';                    // the various states
import {SerializedMmlVisitor} from '@mathjax/src/js/core/MmlTree/SerializedMmlVisitor.js';

//
//  Load the needed TeX extensions
//
import '@mathjax/src/js/input/tex/ams/AmsConfiguration.js';
import '@mathjax/src/js/input/tex/newcommand/NewcommandConfiguration.js';
import '@mathjax/src/js/input/tex/configmacros/ConfigMacrosConfiguration.js';

//
//  Register the HTML handler with the browser adaptor
//
RegisterHTMLHandler(browserAdaptor());

//
//  Initialize mathjax with a blank DOM.
//
const html = mathjax.document('', {
  InputJax: new TeX({
    packages: ['base', 'ams', 'newcommand', 'configmacros']
  })
});

//
//  The visitor to produce serialized MathML
//
const visitor = new SerializedMmlVisitor();

//
//  The user's configuration object
//
const CONFIG = window.MathJax || {};

//
//  The global MathJax object
//
window.MathJax = {
  version: mathjax.version,
  html: html,
  Sre: Sre,

  //
  //  A function to serialize the internal MathML format
  //
  toMML(node) {
    return visitor.visitTree(node, this.html);
  },

  //
  //  A function to convert TeX/LaTeX to a speech string
  //
  tex2speech(tex, display = true) {
    return this.Sre.sreReady().then(() => {
      return mathjax.handleRetriesFor(() => 
        this.toMML(html.convert(tex, {format: 'TeX', end: STATE.COMPILED, display}))
      )
    }).then((mml) => this.Sre.toSpeech(mml));
  }
};

//
// Setup SRE's engine
//
Sre.setupEngine({domain: 'clearspeak', ...(CONFIG.sre || {})});

//
// Perform ready function, if there is one
//
if (CONFIG.ready) {
  Sre.sreReady().then(CONFIG.ready);
}
