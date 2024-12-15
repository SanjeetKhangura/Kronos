chrome.tabs.onUpdated.addListener((tabId, tab) => {
    if (tab.url && tab.url.includes("mail.google.com/mail/u/0/#inbox")) {

        const queryParameters = tab.url.split("#inbox/")
        const urlParameters = new URLSearchParams(queryParameters);

        chrome.tabs,sendMessage(tabId, {
            type: "NEW",
            mailId: queryParameters 
        })

    }
})