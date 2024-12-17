(() => {
    let currentMail = "";

    // Listen for messages from the background script
    chrome.runtime.onMessage.addListener((obj, sender, response) => {
        const { type, mailId, urlParam } = obj;

        if (type == "NEW") {
            currentMail = mailId;
            newMailLoaded();
        }
    });

    const newMailLoaded = () => {
        
        // Dynamically load the Google Material Icons stylesheet
        const materialIconsLink = document.createElement("link");
        materialIconsLink.href = "https://fonts.googleapis.com/icon?family=Material+Icons";
        materialIconsLink.rel = "stylesheet";
        document.head.appendChild(materialIconsLink);

        // Use a MutationObserver to wait for the action button container to appear
        const observer = new MutationObserver(() => {
            const actionButtonContainer = document.querySelector(".amn");

            if (actionButtonContainer) {
                console.log("Action Button Container Found:", actionButtonContainer);
                addAIButton(actionButtonContainer); // Add the AI button
                observer.disconnect(); // Stop observing once the button is added
            }
        });

        // Start observing changes in the DOM (child elements added/removed)
        observer.observe(document.body, { childList: true, subtree: true });
    };

    const addAIButton = (actionButtonContainer) => {
        const aiBtnExists = document.getElementsByClassName("ai-btn")[0];

        if (!aiBtnExists) {
            // Create a wrapper div for the button
            const aiBtnWrapper = document.createElement("div");
            aiBtnWrapper.classList.add("ai-btn-wrapper"); // Class defined in CSS

            // Create the button
            const aiBtn = document.createElement("button");
            aiBtn.classList.add("ai-btn"); // Class defined in CSS
            aiBtn.setAttribute("title", "Let the Bot help you out!"); // Tooltip text

            // Use a Material Icon (e.g., "help_outline")
            const aiIcon = document.createElement("span");
            aiIcon.classList.add("material-icons");
            aiIcon.textContent = "support"; // Icon name from Material Icons

            // Append the icon to the button (not the wrapper)
            aiBtn.appendChild(aiIcon);

            // Append the wrapper with the button into the Gmail action button container
            actionButtonContainer.appendChild(aiBtnWrapper);
            aiBtnWrapper.appendChild(aiBtn);

            // Add click functionality to the button
            aiBtn.addEventListener("click", () => {
                console.log("You just Clicked the Bot");
            });

            console.log("AI Button Added Successfully!");
        } else {
            console.log("AI Button Already Exists!");
        }
    };
    newMailLoaded();
})();
