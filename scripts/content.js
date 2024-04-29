var script = document.createElement('script');
script.src = browser.runtime.getURL('scripts/inject.js');
var head = document.head || document.documentElement;
head.insertBefore(script, head.firstChild);