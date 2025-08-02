console.log("this is content.js scripts for toggler");
chrome.storage.local.get((data)=> {
    console.log(data)
    const theme = data.theme;
    if (theme === "dark_theme"){
        // do this action
        console.log("Entered in dark theme");
        document.body.style.backgroundColor = "blue";
        document.body.style.color = "white";
    }
    if(theme === "light_theme"){
        // do this action
        console.log("Entered in light theme");
        document.body.style.backgroundColor = "white";
        document.body.style.color = "black";
    }
})
