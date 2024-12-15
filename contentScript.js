(() => {
    let mailActions, mailContent;
    let currentMail = "";

    chrome.runtime.onMessage.addListener((obj, sender, response) => {
        const { type, mailId } = obj;

        if (type == "NEW") {
            currentMail = mailId;
            newMailLoaded();
        }
    })

})();