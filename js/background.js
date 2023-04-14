// // Loads environment variables from .env file
// require('dotenv').config();

// // Define API key as global variable
// window.API_key = process.env.API_KEY;

// IIFE ensures service worker runs continuously in the background
(() => {
  // Sets initial state or completes tasks when extension is installed
  chrome.runtime.onInstalled.addListener(() => {
    // Using extension badge on browser toolbar to check if extension is on or off
    chrome.browserAction.setBadgeText({
      text: 'OFF',
    });
  });

  const mapsURL = 'https://www.google.com/maps/';

  // Listens for clicks on extension icon
  chrome.browserAction.onClicked.addListener(async tab => {
    // Checks if user's current (or most recently opened) tab is on Google Maps
    // if (tab.url && tab.url.startsWith(mapsURL)) {
    // Sends message to `content-script.js` to run
    chrome.tabs.sendMessage(tab.id, 'toggleMaps');
    // }
  });
})();
