
chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
    if (changeInfo.status === 'complete' && /^http/.test(tab.url)) {
        chrome.scripting.executeScript({
            target: { tabId: tabId },
            files: ["./show_id.js"]
        })
            .then(() => {
                console.log("It is working");
            })
            .catch(err => console.log(err));
    }
});