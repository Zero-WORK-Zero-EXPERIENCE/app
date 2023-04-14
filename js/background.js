// IIFE ensures service worker runs continuously in the background
(() => {
  // Sets initial state or completes tasks when extension is installed
  chrome.runtime.onInstalled.addListener(() => {
    // Using extension badge on browser toolbar to check if extension is on or off
    chrome.action.setBadgeText({
      text: 'OFF',
    });
  });

  const mapsURL = 'https://www.google.com/maps/';

  // Listens for clicks on extension icon
  chrome.action.onClicked.addListener(async tab => {
    if (tab.url.startsWith(mapsURL)) {
      // Retrieves abovementioned badge
      const prevState = await chrome.action.getBadgeText({ tabId: tab.id });
      // Always the opposite of `prevState`
      const nextState = prevState === 'OFF' ? 'ON' : 'OFF';
    }

    // Inserts CSS/JS files when extension is on/off
    // to-do: add relevant CSS/JS files to `files` array
    if (nextState === 'ON') {
      await chrome.scripting.insertCSS({
        target: { tabId: tab.id },
        files: [],
      });

      await chrome.scripting.executeScript({
        target: { tabId: tab.id },
        files: [],
      });
    } else if (nextState === 'OFF') {
      await chrome.scripting.removeCSS({
        target: { tabId: tab.id },
        files: [],
      });

      await chrome.scripting.removeScript({
        target: { tabId: tab.id },
        files: [],
      });
    }
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
