console.log("helloooo vijay desuuu");
const   description = document.getElementById("description");
const submitButton = document.getElementById("addButton");


submitButton.addEventListener("click", ()=> {
    const descriptionValue = description.value ;
    const promptInput  = window.prompt("Enter the name of Book Mark Page");
    
    chrome.runtime.sendMessage({pageDescription: descriptionValue, tabName: promptInput}, (response)=> {
        console.log(response.response);
    })
    
    console.log(descriptionValue);
    console.log(promptInput);
    // setTimeout(() => {
    //     window.close();
    // }, 3000);
})

// input came up and now we will look to store it in storage of local and pass a message which will reflected in background .js

// first take all input and validate it and then pass to background services where it will track all thing

// pass the message so that we could aware about inputs