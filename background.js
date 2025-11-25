browser.sidebarAction.setPanel({ panel: "https://claude.ai/" });

browser.browserAction.onClicked.addListener(() => {
  browser.sidebarAction.toggle();
});
