import {startup} from '@mathjax/src/components/js/startup/init.js';
import {Loader} from '@mathjax/src/js/components/loader.js';
import {insert} from '@mathjax/src/js/util/Options.js';

//
// Load the components that we want to combine into one component
//   (the ones listed in the preLoad() call below)
//
import '@mathjax/src/components/js/core/core.js';

import '@mathjax/src/components/js/input/tex-base/tex-base.js';
import '@mathjax/src/components/js/input/tex/extensions/ams/ams.js';
import '@mathjax/src/components/js/input/tex/extensions/newcommand/newcommand.js';
import '@mathjax/src/components/js/input/tex/extensions/configmacros/configmacros.js';
import '@mathjax/src/components/js/ui/menu/menu.js';

//
// Load the output jax and the code for loading its font
//
import {loadFont} from '@mathjax/src/components/js/output/svg/svg.js';

//
// Load speech-generation code
//
import {checkSre} from '@mathjax/src/components/js/a11y/util.js';

//
// Mark the components that you have loaded
//
Loader.preLoad(
  'loader', 'startup',
  'core',
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
MathJax.config.loader.paths.mathjax = 'https://cdn.jsdelivr.net/npm/mathjax@4.0.0-beta.7';
insert(MathJax.config, {
  tex: {
    packages: {'[+]': ['ams', 'newcommand', 'configmacros']}
  }
});

//
// Mark the MathJax version being used for this combined configuration
//
Loader.saveVersion('custom-mathjax.js');

//
// Do the normal startup operations
//
loadFont(checkSre(startup), true);
