// Automatically open the side panel if the extension toolbar action button is clicked
chrome.sidePanel
  .setPanelBehavior({ openPanelOnActionClick: true })
  .catch((error) => console.error(error));

// Keyboard shortcut event listener 
chrome.commands.onCommand.addListener((command, tab) => {
  if (command === "open_side_panel") {
    chrome.sidePanel.open({ windowId: tab.windowId });
  }
});