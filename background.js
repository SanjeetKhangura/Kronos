chrome.runtime.onInstalled.addListener(() => {
    console.log("Service Worker Installed/Activated");
});

chrome.tabs.onUpdated.addListener((tabId, tab) => {
    
    if (tab.url && tab.url.includes("mail.google.com")) {

        console.log("Matched Gmail URL:", tab.url);

        const queryParameters = tab.url.split("#inbox/")[1];

        if (queryParameters) {

            const urlParameters = new URLSearchParams(queryParameters);

            console.log("URL KEY", queryParameters);
            console.log("URL PARAM", urlParameters);

            chrome.tabs.sendMessage(tabId, {
                type: "NEW",
                mailId: queryParameters, 
                urlParam: urlParameters
            });

        }
    }
})