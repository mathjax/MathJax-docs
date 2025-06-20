import './custom-mathjax-config.js';
import {startup} from '@mathjax/src/components/js/startup/init.js';
import {Loader} from '@mathjax/src/js/components/loader.js';
import {insert} from '@mathjax/src/js/util/Options.js';

//
// Load the components that we want to combine into one component
//   (the ones listed in the preLoaded() call below)
//
import '@mathjax/src/components/js/core/core.js';

import '@mathjax/src/components/js/input/tex-base/tex-base.js';
import '@mathjax/src/components/js/input/tex/extensions/ams/ams.js';
import '@mathjax/src/components/js/input/tex/extensions/newcommand/newcommand.js';
import '@mathjax/src/components/js/input/tex/extensions/configmacros/configmacros.js';
import '@mathjax/src/components/js/ui/menu/menu.js';

//
// Load the output jax and the code for laoding its font
//
import {loadFont} from '@mathjax/src/components/js/output/svg/svg.js';

//
// Load speech-generation code
//
//import '@mathjax/src/components/js/a11y/util.js';

//
// Mark the components that you have loaded
//
Loader.preLoaded(
  'loader', 'startup',
  'core',
  'input/tex',
  'input/tex-base',
  '[tex]/ams',
  '[tex]/newcommand',
  '[tex]/configmacros',
  'output/svg',
  'ui/menu'
);

//
// Update the configuration's mathjax path and add the loaded TeX packages
//
/*
insert(MathJax.config, {
  loader: {paths: {mathjax: '../../node_modules/@mathjax/src/bundle'}},
  tex: {
    packages: {'[+]': ['ams', 'newcommand', 'configmacros']}
  },
  options: {
    worker: {path: '../../node_modules/@mathjax/src/bundle/sre'},
//    enableSpeech: false,
//    enableBraille: false,
//    menuOptions: {
//      settings: {
//        enrich: false,
//      }
//    }
  }
}, false);
*/

//
// Mark the MathJax version being used for this combined configuration
//
Loader.saveVersion('custom-mathjax.js');

//
// Do the normal startup operations
//
loadFont(startup, true);
