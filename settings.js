const DEFAULT_URL = "https://claude.ai/";

function isValidUrl(url) {
  try {
    const parsed = new URL(url);
    return parsed.protocol === "https:";
  } catch {
    return false;
  }
}

function showStatus(message, isError) {
  const status = document.getElementById("status");
  status.textContent = message;
  status.className = isError ? "status error" : "status";
  status.style.display = "block";
  setTimeout(() => {
    status.style.display = "none";
  }, 3000);
}

// Load saved settings
async function loadSettings() {
  try {
    const result = await browser.storage.sync.get({ claudeUrl: DEFAULT_URL });
    document.getElementById("claudeUrl").value = result.claudeUrl;
  } catch (error) {
    console.error("Claude Sidebar: failed to load settings", error);
  }
}

// Save settings
async function saveSettings() {
  const url = document.getElementById("claudeUrl").value.trim() || DEFAULT_URL;

  if (!isValidUrl(url)) {
    showStatus("Please enter a valid HTTPS URL", true);
    return;
  }

  try {
    await browser.storage.sync.set({ claudeUrl: url });
    showStatus("Settings saved!", false);
    browser.runtime.sendMessage({ action: "updatePanel" });
  } catch (error) {
    console.error("Claude Sidebar: failed to save settings", error);
    showStatus("Failed to save settings", true);
  }
}

// Initialize when page loads
document.addEventListener("DOMContentLoaded", () => {
  loadSettings();

  // Save on button click
  document.getElementById("save").addEventListener("click", saveSettings);

  // Save on Enter key
  document.getElementById("claudeUrl").addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
      saveSettings();
    }
  });

  // Reset to default URL
  document.getElementById("resetDefault").addEventListener("click", (e) => {
    e.preventDefault();
    document.getElementById("claudeUrl").value = DEFAULT_URL;
  });
});
