const DEFAULT_URL = "https://claude.ai/";

function isValidUrl(url) {
  try {
    const parsed = new URL(url);
    return parsed.protocol === "https:";
  } catch {
    return false;
  }
}

// Load the URL from storage and set the sidebar panel
async function updateSidebarPanel() {
  try {
    const result = await browser.storage.sync.get({ claudeUrl: DEFAULT_URL });
    const url = isValidUrl(result.claudeUrl) ? result.claudeUrl : DEFAULT_URL;
    browser.sidebarAction.setPanel({ panel: url });
  } catch (error) {
    console.error("Claude Sidebar: failed to update panel", error);
    browser.sidebarAction.setPanel({ panel: DEFAULT_URL });
  }
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
