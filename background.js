const DEFAULT_URL = "https://claude.ai/";

// Load the URL from storage and set the sidebar panel
async function updateSidebarPanel() {
  const result = await browser.storage.sync.get({ claudeUrl: DEFAULT_URL });
  browser.sidebarAction.setPanel({ panel: result.claudeUrl });
}

// Initialize on startup
updateSidebarPanel();

// Listen for settings changes
browser.runtime.onMessage.addListener((message) => {
  if (message.action === "updatePanel") {
    updateSidebarPanel();
  }
});

// Toggle sidebar on toolbar button click
browser.browserAction.onClicked.addListener(() => {
  browser.sidebarAction.toggle();
});
