import {insert} from '@mathjax/src/js/util/Options.js';

const GLOBAL = typeof window === 'undefined' ? global : window;

GLOBAL.MathJax = insert({
  loader: {
    paths: {
      mathjax: '../../node_modules/@mathjax/src/bundle',
    }
  },
  tex: {
    packages: ['base', 'ams', 'newcommand', 'configmacros'],
  },
/*
  options: {
    enableSpeech: false,
    enableBraille: false,
    menuOptions: {
      settings: {
        enrich: false,
      }
    },
  },
*/
}, GLOBAL.MathJax || {}, false);
