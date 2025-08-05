chrome.runtime.onInstalled.addListener(()=> {
    console.log("We are going to start baby");
})

chrome.runtime.onMessage.addListener((data)=> {
    console.log(data);

})