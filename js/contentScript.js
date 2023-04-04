(() => {
  // Receives message from background.js to run
  chrome.runtime.onMessage.addListener((obj, sender, response) => {
    if (obj.type === "NEW") {
      newMapLoaded();
    }
  });
})();
