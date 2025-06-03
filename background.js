chrome.runtime.onInstalled.addListener(() => {
    chrome.contextMenus.create({
        id: "speedRead",
        title: "Speed read this",
        contexts: ["selection"]
    });
});

chrome.contextMenus.onClicked.addListener((info, tab) => {
    if (info.menuItemId === "speedRead") {
        console.log("Clicked")
        chrome.sidePanel.open({
            tabId: tab.id
        }).then(() => {
            // Listen for a response from the side panel indicating it's ready
            const listener = (message, sender, sendResponse) => {
                // Ensure the message is from the side panel and is the 'panelReady' type
                if (message.type === "panelReady" && sender.url && sender.url.includes('speedread.html')) {
                    chrome.runtime.onMessage.removeListener(listener); // Remove listener once ready
                    chrome.scripting.executeScript({
                        target: { tabId: tab.id },
                        function: () => window.getSelection().toString()
                    }, (results) => {
                        if (results && results[0] && results[0].result) {
                            const selectedText = results[0].result;
                            chrome.runtime.sendMessage({ type: "selectedText", text: selectedText });
                        }
                    });
                }
            };
            chrome.runtime.onMessage.addListener(listener);

            // Send a message to the side panel to check if it's ready
            // This message should be sent after the listener is set up.
            // Add a small delay to ensure the side panel's script has fully loaded.
            setTimeout(() => {
                chrome.runtime.sendMessage({ type: "panelReadyCheck" });
            }, 300);
        });
    }
});
