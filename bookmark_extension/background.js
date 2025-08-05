chrome.runtime.onInstalled.addListener(()=> {
    console.log("First time installed Successfully");
})

chrome.runtime.onMessage.addListener((data, sender, sendResponse)=>{
    console.log(data.message);
    sendResponse({
        response: "We are good to go";
    })
})