// ==UserScript==
// @name           MathJax in Wikipedia
// @namespace      https://www.mathjax.org/
// @description    Insert MathJax into Wikipedia pages
// @include        https://*.wikipedia.org/wiki/*
// ==/UserScript==

// replace the images with MathJax scripts of type math/tex
if (window.MathJax) throw "MathJax already loaded!";
var imgs = document.querySelectorAll('img.mwe-math-fallback-image-inline')
if (!imgs.length) throw "no matches!";
imgs.forEach((img) => {
  var script = document.createElement("script");
  script.type = 'math/tex';
  script[window.opera ? 'innerHTML' : 'text'] = img.alt;
  img.parentNode.replaceChild(script, img);
})
// Load MathJax and have it process the page
var script = document.createElement('script');
script.type = 'text/javascript';
script.src = 'https://cdn.mathjax.org/mathjax/2.7-latest/MathJax.js?config=TeX-AMS-MML_HTMLorMML-full';
document.querySelector('head').appendChild(script);
