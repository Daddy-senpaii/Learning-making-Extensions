chrome.runtime.onInstalled.addListener(() => {
    console.log("First time installed Successfully");
});

chrome.runtime.onMessage.addListener((data, sender, sendResponse) => {
    console.log("message data is ", data);

    const { tabName, pageDescription } = data;
    console.log(`The tab name is ${tabName} and description about page is ${pageDescription}`);

    if (data.action === "Delete Bookmark") {
        console.log("Message Passed down is Delete the bookmark of id", data.id);
        const deletedId = data.id;

        try {
            chrome.storage.local.get(["bookmarks"], (results) => {
                console.log("For deleted bookmarks we have", results);

                const found_Index = results.bookmarks.findIndex(result => result.id === deletedId);
                console.log("Deleted_Index found at:", found_Index);

                if (found_Index !== -1) {
                    results.bookmarks.splice(found_Index, 1);

                    chrome.storage.local.set({ bookmarks: results.bookmarks }, () => {
                        console.log("deleted successfully");

                        // Send response back to popup.js
                        sendResponse({
                            response: "Bookmark deleted successfully",
                            data: results.bookmarks
                        });
                    });
                } else {
                    sendResponse({
                        response: "Bookmark not found",
                        data: results.bookmarks
                    });
                }
            });
        } catch (error) {
            console.error("We have some error.", error);
            sendResponse({ response: "Error deleting bookmark" });
        }

        return true; // Keep the message channel open for async
    }

    // Default case: Add bookmark
    try {
        chrome.tabs.query({ active: true, currentWindow: true }, (tabData) => {
            console.log(tabData);

            const [tabInfo] = tabData;
            const { id, url } = tabInfo;

            chrome.storage.local.get(["bookmarks"], (results) => {
                const bookmarks = results.bookmarks || [];

                const newBookmark = {
                    id: bookmarks.length + 1,
                    bookMarkName: tabName,
                    bookMarkDescription: pageDescription,
                    tabId: id,
                    bookMarkUrl: url,
                };

                bookmarks.push(newBookmark);

                chrome.storage.local.set({ bookmarks }, () => {
                    sendResponse({
                        response: "Bookmark added successfully",
                        data: bookmarks
                    });
                });
            });
        });
    } catch (error) {
        console.error("Something went wrong:", error);
        sendResponse({ response: "Error adding bookmark" });
    }

    return true; // Keep channel open for async operations
});

chrome.storage.onChanged.addListener((changes, areaName) => {
    if (areaName === "local" && changes.bookmarks) {
        console.log("onUpdate code", changes.bookmarks.newValue);
    }
});
