//
//  Initialize the MathJax startup code
//
const {startup} = require('mathjax-full/components/src/startup/init.js');

//
//  Get the loader module and indicate the modules that
//  will be loaded by hand below
//
const {Loader} = require('mathjax-full/js/components/loader.js');
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
// Load the components that we want to combine into one component
//   (the ones listed in the preLoad() call above)
//
require('mathjax-full/components/src/core/core.js');

require('mathjax-full/components/src/input/tex-base/tex-base.js');
require('mathjax-full/components/src/input/tex/extensions/ams/ams.js');
require('mathjax-full/components/src/input/tex/extensions/newcommand/newcommand.js');
require('mathjax-full/components/src/input/tex/extensions/configmacros/configmacros.js');

const {loadFont} = require('mathjax-full/components/src/output/svg/svg.js');

require('mathjax-full/components/src/ui/menu/menu.js');
require('mathjax-full/components/src/a11y/util.js');

//
// Update the configuration to include any updated values
//
const {insert} = require('mathjax-full/js/util/Options.js');
insert(MathJax.config, {
  loader: {paths: {mathjax: '../../node_modules/@mathjax/src/bundle'}},
  tex: {
    packages: {'[+]': ['ams', 'newcommand', 'configmacros']},
  }
}, false);

//
// Mark the MathJax version being used for this combined configuration
//
Loader.saveVersion('custom-mathjax.js');

//
// Do the normal startup operations
//
loadFont(startup, true);
