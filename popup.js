document.addEventListener("DOMContentLoaded", () => {
    const statusDiv = document.getElementById("status");
  
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      const currentTab = tabs[0];
      statusDiv.innerHTML = `<p>Validating certificate for: ${currentTab.url}</p>`;
      // Call background function to validate SSL details
    });
  });
  