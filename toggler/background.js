chrome.runtime.onInstalled.addListener(()=> {
    console.log("This is chrome toggler extension");
})

chrome.runtime.onMessage.addListener((data, sender ,sendResponse)=> {
    console.log(data.message);
    sendResponse({received: true, theme : data.message});
    return true;
})