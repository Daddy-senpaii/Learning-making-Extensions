chrome.runtime.onInstalled.addListener(()=> {
    console.log("We are going to start baby");
})

chrome.runtime.onMessage.addListener(async(data)=> {
    console.log(data.message);
    chrome.tabs.query({},(tabs)=> {
        const domainGroup = {}
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

        
    })

})