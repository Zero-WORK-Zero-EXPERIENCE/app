// IIFE ensures service worker runs continuously in the background
(() => {
  // Sets initial state or completes tasks when extension is installed
  chrome.runtime.onInstalled.addListener(() => {
    // Using extension badge on browser toolbar to indicate whether extension is on or off
    chrome.action.setBadgeText({
      text: 'OFF',
    });
  });

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
