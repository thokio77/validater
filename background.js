chrome.tabs.onActivated.addListener((activeInfo) => {
    chrome.tabs.get(activeInfo.tabId, (tab) => {
      if (tab.url && tab.url.startsWith("https://")) {
        validateSSLCertificate(tab.url);
      }
    });
  });
  
  function validateSSLCertificate(url) {
    fetch(url, { method: "HEAD" })
      .then((response) => {
        const certificate = response.headers.get("strict-transport-security");
        if (certificate) {
          console.log(`SSL Certificate valid for ${url}`);
          updateIcon("secure");
        } else {
          console.warn(`SSL Certificate issue detected for ${url}`);
          updateIcon("insecure");
        }
      })
      .catch((error) => {
        console.error(`Error fetching SSL details for ${url}:`, error);
        updateIcon("error");
      });
  }
  
  function updateIcon(status) {
    let iconPath = "icons/icon16.png";
    if (status === "secure") iconPath = "icons/icon16-green.png";
    else if (status === "insecure") iconPath = "icons/icon16-yellow.png";
    else if (status === "error") iconPath = "icons/icon16-red.png";
  
    chrome.action.setIcon({ path: iconPath });
  }
  