// IIFE ensures service worker runs continuously in the background
(() => {
  // Checks if user's current (or most recently opened) tab is on Google Maps
  chrome.tabs.onUpdated.addListener((tabId, tab) => {
    if (tab.url && tab.url.includes('google.com/maps')) {
      // Sends message to `content-script.js` to run
      chrome.tabs.sendMessage(tabId, {
        type: 'NEW',
        message: 'howdy contentScript.js',
      });
    }
  });
})();
