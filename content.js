document.addEventListener('mouseup', () => {
  const selection = window.getSelection().toString().trim();
  if (selection.length > 0) {
    // Original working communication.
    chrome.storage.local.set({ selectedText: selection });

    // Direct communication to the open side panel.
    chrome.runtime.sendMessage({
      type: 'rongmeiSelection',
      text: selection
    }).catch(() => {});
  }
});
