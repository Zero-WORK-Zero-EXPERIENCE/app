(() => {
  // Receives message from `background.js` to run
  chrome.runtime.onMessage.addListener(
    async (message, sender, sendResponse) => {
      // Loads Google Maps JavaScript API
      const script = document.createElement('script');
      script.src = `https://maps.googleapis.com/maps/api/js?key=${
        chrome.runtime
          .getManifest()
          .permissions.find(permission => permission.key === 'API_KEY')
          .matches[0]
      }`;
      document.head.appendChild(script);
      if (message === 'toggleMaps') {
        chrome.tabs.query(
          { active: true, currentWindow: true },
          function (tabs) {
            // Check if the current tab is a Google Maps page
            if (tabs[0].url.startsWith('https://www.google.com/maps')) {
              // Inject JavaScript code into the tab to add a marker
              chrome.scripting.executeScript({
                target: { tabId: tabs[0].id },
                func: function () {
                  // Get the map object
                  var map = window.google.maps.Map.prototype.getMaps()[0];

                  // Create a marker at a specific location
                  var marker = new google.maps.Marker({
                    position: { lat: 37.7749, lng: -122.4194 },
                    map: map,
                    title: 'San Francisco',
                  });
                },
              });
            }
          }
        );

        // Retrieves abovementioned badge
        const prevState = await chrome.action.getBadgeText({ tabId: tab.id });
        // Always the opposite of `prevState`
        const nextState = prevState === 'OFF' ? 'ON' : 'OFF';

        // Inserts CSS/JS files when extension is on/off
        // to-do: add relevant CSS/JS files to `files` array
        if (nextState === 'ON') {
          await chrome.scripting.insertCSS({
            target: { tabId: tabs[0].id },
            files: [],
          });
          await chrome.scripting.executeScript({
            target: { tabId: tabs[0].id },
            files: [],
          });
        } else if (nextState === 'OFF') {
          await chrome.scripting.removeCSS({
            target: { tabId: tabs[0].id },
            files: [],
          });
          await chrome.scripting.removeScript({
            target: { tabId: tabs[0].id },
            files: [],
          });
        }
      }
    }
  );
})();
