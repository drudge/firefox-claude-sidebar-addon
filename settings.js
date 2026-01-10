const DEFAULT_URL = "https://claude.ai/";

// Load saved settings
async function loadSettings() {
  const result = await browser.storage.sync.get({ claudeUrl: DEFAULT_URL });
  document.getElementById("claudeUrl").value = result.claudeUrl;
}

// Save settings
async function saveSettings() {
  const url = document.getElementById("claudeUrl").value.trim() || DEFAULT_URL;

  await browser.storage.sync.set({ claudeUrl: url });

  // Show confirmation
  const status = document.getElementById("status");
  status.style.display = "block";
  setTimeout(() => {
    status.style.display = "none";
  }, 2000);

  // Update the sidebar panel immediately
  browser.runtime.sendMessage({ action: "updatePanel" });
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
