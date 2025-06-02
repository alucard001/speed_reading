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
        });

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
});
