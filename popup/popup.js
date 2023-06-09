/* Major Features */

// 1. Display map markers for local crime data, each providing users with crime type, date, location, and CSI (crime severity index) score

// 2. Display map markers for local police stations, each providing users with station name, address, and phone number

/* **Note: IIFE not needed since using module syntax (`type="module"` in `index.html`), which creates local scope */

const tabs = await chrome.tabs.query({
  url: ['https://*.google.com/maps/*'],
});
