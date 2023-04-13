// IIFE to avoid global scope pollution (https://developer.mozilla.org/en-US/docs/Glossary/IIFE)
(() => {
  // Receives message from `background.js` to run
  chrome.runtime.onMessage.addListener((obj, sender, response) => {
    if (obj.type === 'NEW') {
      newMapLoaded();
    }
  });
})();
