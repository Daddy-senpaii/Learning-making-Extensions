console.log("Welcome to toggler sir");
const light_theme = document.getElementById("light-theme");
const dark_theme = document.getElementById("dark-theme");

light_theme.addEventListener("click", ()=> {
    console.log("light theme is pressed");
    // now when this is clicked we have to store it and pass it to content.js for switching up the theme

    chrome.storage.local.set({theme: "light_theme"});
    chrome.runtime.sendMessage({ message: `The theme is ${light_theme.textContent}` }, (response)=> {
        console.log(`Status is ${response.received} and theme is ${response.theme}`);
    });
    
});

dark_theme.addEventListener("click", ()=> {
    console.log("Dark theme is pressed");
    // now when this is clicked we have to store it and pass it to content.js for switching up the theme
    chrome.storage.local.set({theme: "dark_theme"});
    chrome.runtime.sendMessage({ message: `The theme is ${dark_theme.textContent}` }, (response)=> {
        console.log(`Status is ${response.received} and theme is ${response.theme}`);
    });

})