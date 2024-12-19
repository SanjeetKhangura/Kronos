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

        const materialIconsLink = document.createElement("link");
        materialIconsLink.href = "https://fonts.googleapis.com/icon?family=Material+Icons";
        materialIconsLink.rel = "stylesheet";
        document.head.appendChild(materialIconsLink);

        const observerForBtn = new MutationObserver(() => {
            const actionButtonContainer = document.querySelector(".amn");

            if (actionButtonContainer) {
                console.log("Action Button Container Found:", actionButtonContainer);
                addAIButton(actionButtonContainer);
                observerForBtn.disconnect();
            }
        });

        observerForBtn.observe(document.body, { childList: true, subtree: true });
    };

    const addAIButton = (actionButtonContainer) => {
        const aiBtnExists = document.getElementsByClassName("ai-btn")[0];

        if (!aiBtnExists) {
            const aiBtnWrapper = document.createElement("div");
            aiBtnWrapper.classList.add("ai-btn-wrapper");

            const aiBtn = document.createElement("button");
            aiBtn.classList.add("ai-btn");
            aiBtn.setAttribute("title", "Let the Bot help you out!");

            const aiIcon = document.createElement("span");
            aiIcon.classList.add("material-icons");
            aiIcon.textContent = "support"; // Icon name

            aiBtn.appendChild(aiIcon);
            aiBtnWrapper.appendChild(aiBtn);
            actionButtonContainer.appendChild(aiBtnWrapper);

            aiBtn.addEventListener("click", () => {
                console.log("AI Button clicked. Creating the popup...");
                createPopup(aiBtn); // Trigger popup creation
            });
        }
    };

    const createPopup = (button) => {
        console.log("createPopup function called");
    
        // Ensure any existing popup is removed before creating a new one
        const existingPopup = document.querySelector(".ai-popup");
        if (existingPopup) {
            console.log("Existing popup found, removing it.");
            existingPopup.remove();
        }
    
        // Create popup wrapper
        const popupWrapper = document.createElement("div");
        popupWrapper.classList.add("ai-popup");
        console.log("Popup wrapper created.");
    
        // Create the "Summarize" button
        const summarizeBtn = document.createElement("button");
        summarizeBtn.textContent = "Summarize";
        summarizeBtn.classList.add("popup-btn");
        summarizeBtn.addEventListener("click", () => {
            console.log("Summarize button clicked.");
            // Add the summarize action here
        });
    
        // Create the "Formal Reply" button
        const replyBtn = document.createElement("button");
        replyBtn.textContent = "Formal Reply";
        replyBtn.classList.add("popup-btn");
        replyBtn.addEventListener("click", () => {
            console.log("Formal Reply button clicked.");
            // Add the formal reply action here
        });
    
        // Add buttons to the popup
        popupWrapper.appendChild(summarizeBtn);
        popupWrapper.appendChild(replyBtn);
    
        // Attach the popup to the button wrapper (parent)
        const buttonWrapper = button.parentElement;
        if (!buttonWrapper) {
            console.error("Failed to attach popup: button has no parent element.");
            return;
        }
    
        // Ensure the button's parent wrapper is relatively positioned
        buttonWrapper.style.position = "relative";
    
        // Position the popup dynamically
        popupWrapper.style.position = "absolute"; // Position relative to the wrapper
        popupWrapper.style.top = `${button.offsetTop + button.offsetHeight}px`; // Below the button
        popupWrapper.style.left = `0px`; // Aligned to the left of the wrapper
    
        // Append the popup to the wrapper (not the document body)
        buttonWrapper.appendChild(popupWrapper);
    
        console.log("Popup successfully attached to the button wrapper.");
    };    
    newMailLoaded();
})();