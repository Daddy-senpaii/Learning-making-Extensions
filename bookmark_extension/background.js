chrome.runtime.onInstalled.addListener(()=> {
    console.log("First time installed Successfully");
})

chrome.runtime.onMessage.addListener((data, sender, sendResponse)=>{
    const {tabName, pageDescription} = data;
    console.log(`The tab name is ${tabName} and description about page is ${pageDescription}`);

    try {
    // Get the currently active tab in the current window
    chrome.tabs.query({ active: true, currentWindow: true }, (tabData) => {
        console.log(tabData);

        // Destructure the first tab from the tabData array
        const [tabInfo] = tabData;
        const { id, url } = tabInfo;

        // Get bookmarks from storage
        chrome.storage.local.get(["bookmarks"], (results) => {
            const bookmarks = results.bookmarks || [];

            // Assuming tabName and bookMarkDescription are defined somewhere (maybe from form input?)
            const newBookmark = {
                bookMarkName: tabName,
                bookMarkDescription: pageDescription,
                tabId: id,
                bookMarkUrl: url,
            };

            // Push the new bookmark to the array
            bookmarks.push(newBookmark);

            // Save the updated bookmarks array back to local storage
            chrome.storage.local.set({ bookmarks }, () => {
                console.log("Bookmark added successfully!");
            });
            
//             chrome.storage.local.get(["bookmarks"],(results)=> {
//     console.log("results are ",results);
// })
        });
    });
} catch (error) {
    console.error("Something went wrong:", error);
}

    sendResponse({
        response: "We are good to go"
    });
})

chrome.storage.onChanged.addListener((changes , areaName)=> {
    if(areaName === "local" && changes.bookmarks){
        console.log(changes.bookmarks.newValue);
    }
})

