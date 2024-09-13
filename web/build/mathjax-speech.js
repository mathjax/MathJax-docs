//
//  Load the desired components
//
import {mathjax} from '@mathjax/src/js/mathjax.js';                        // MathJax core
import {TeX} from '@mathjax/src/js/input/tex.js';                          // TeX input
import {MathML} from '@mathjax/src/js/input/mathml.js';                    // MathML input
import {browserAdaptor} from '@mathjax/src/js/adaptors/browserAdaptor.js'; // browser DOM
import {EnrichHandler} from '@mathjax/src/js/a11y/semantic-enrich.js';     // semantic enrichment
import {RegisterHTMLHandler} from '@mathjax/src/js/handlers/html.js';      // the HTML handler
import {STATE} from '@mathjax/src/js/core/MathItem.js';                    // the various states
import {sreReady} from '@mathjax/src/js/a11y/sre.js';                      // Speech generation

//
//  Load the needed TeX extensions
//
import '@mathjax/src/js/input/tex/ams/AmsConfiguration.js';
import '@mathjax/src/js/input/tex/newcommand/NewcommandConfiguration.js';
import '@mathjax/src/js/input/tex/configmacros/ConfigMacrosConfiguration.js';

//
//  Register the HTML handler with the browser adaptor and add the semantic enrichment
//
EnrichHandler(RegisterHTMLHandler(browserAdaptor()), new MathML());

//
//  Initialize mathjax with a blank DOM.
//
const html = mathjax.document('', {
  sre: {
    speech: 'shallow', // add speech to the enriched MathML
  },
  InputJax: new TeX({
    packages: ['base', 'ams', 'newcommand', 'configmacros']
  })
});

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
  sreReady: sreReady,

  tex2speech(tex, display = true) {
    const math = new html.options.MathItem(tex, html.inputJax[0], display);
    return mathjax.handleRetriesFor(() => math.convert(html, STATE.ENRICHED)).then(() => {
      let speech = '';
      math.root.walkTree(node => {
        if (speech) return;
        const attributes = node.attributes.getAllAttributes();
        if (attributes['data-semantic-speech'] && !attributes['data-semantic-parent']) {
          speech = attributes['data-semantic-speech'];
        }
      });
      return speech;
    });
  }
};

//
// Perform ready function, if there is one
//
if (CONFIG.ready) {
  sreReady().then(CONFIG.ready);
}
