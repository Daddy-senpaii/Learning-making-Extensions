chrome.runtime.onInstalled.addListener(()=> {
    console.log("We are going to start baby");
})

const domainGroup = {}
const newIdStack = [];

chrome.tabs.onCreated.addListener((tab)=>{
    console.log("New tab is created: ", tab);
    newIdStack.push(tab.id);
});

// console.log("changeable stack is",newIdStack);

chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {

    chrome.storage.local.get("domainGroup", (result) => {
    const domainGroup = result.domainGroup || {}; 
    // console.log("Saved Groups:", domainGroup);

    if (newIdStack.includes(tabId) && changeInfo.url) {
        // console.log("Now changes are made in new tabs");

        const urls = new URL(changeInfo.url);
        const hostName = urls.hostname;
        // console.log("Host:", hostName);

        if (hostName in domainGroup) {
            domainGroup[hostName].push(tabId)
            chrome.tabs.group({tabIds: domainGroup[hostName]})
            const index = newIdStack.indexOf(tabId);
            if(index > -1){
                newIdStack.splice(index, 1);
            }
        } else {
            console.log("Hostname NOT found in domainGroup");
        }
    }
    });
});


chrome.runtime.onMessage.addListener(async(data)=> {
    console.log(data.message);
    chrome.tabs.query({},(tabs)=> {
        
        tabs.forEach((tab)=> {
            const url = new URL(tab.url);
            const domain = url.hostname;
            console.log(domain);

            if(!domainGroup[domain]){
                domainGroup[domain] = [];
            }
            domainGroup[domain].push(tab.id);
        });
        console.log(domainGroup);
        for(const domain in domainGroup){
            chrome.tabs.group({tabIds: domainGroup[domain]},(groupId)=> {
                console.log(groupId)
            })
        }
        chrome.storage.local.set({domainGroup}, ()=> {
            console.log("group saved");
        })

        
    })

})