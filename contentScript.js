(() => {
    let currentMail = "";

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

        const aiBtnExists = document.getElementsByClassName("ai-btn")[0];

        if (!aiBtnExists) {

            // Create a wrapper div for the button
            const aiBtnWrapper = document.createElement("div");
            aiBtnWrapper.classList.add("ai-btn-wrapper"); // Class defined in CSS

            // Create the button
            const aiBtn = document.createElement("button");
            aiBtn.classList.add("ai-btn");  // Class defined in CSS
            aiBtn.setAttribute("title", "Let the Bot help you out!"); // Tooltip text

            // Use a Material Icon (e.g., "help_outline")
            const aiIcon = document.createElement("span");
            aiIcon.classList.add("material-icons");
            aiIcon.textContent = "support"; // Icon name from Material Icons

            // Append the icon to the button (not the wrapper)
            aiBtn.appendChild(aiIcon);

            // Find the parent element for the button (after the "Add reaction" button)
            const actionButtonContainer = document.querySelector(".amn");
            
            actionButtonContainer.appendChild(aiBtnWrapper);  // Append wrapper
            aiBtnWrapper.appendChild(aiBtn);  // Append button inside the wrapper

            // Add event listener to the AI button (for click functionality)
            aiBtn.addEventListener("click", () => {
                console.log("AI button clicked!");
            });
        }
    }

newMailLoaded();

})();
