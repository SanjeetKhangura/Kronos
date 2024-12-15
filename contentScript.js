(() => {
    let mailActions, mailContent;
    let currentMail = "";

    chrome.runtime.onMessage.addListener((obj, sender, response) => {
        const { type, mailId, urlParam } = obj;

        if (type == "NEW") {
            currentMail = mailId;
            newMailLoaded();
        }
    });

    const newMailLoaded = () => {
        const aiBtnExists = document.getElementsByClassName("ai-btn") [0];

        console.log(aiBtnExists);
    }


})();