console.log("Welcome to the pop.js of tabs_grouping");
const btn = document.getElementById("btn");

btn.addEventListener("click", ()=> {
    console.log("button is clicked right know ", );

    chrome.runtime.sendMessage({action: "GroupTabs" , message: 'message that tell you to group the tabs'});
})