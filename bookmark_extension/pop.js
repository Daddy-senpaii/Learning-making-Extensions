console.log("helloooo vijay desuuu");
let  description = document.getElementById("description");
const submitButton = document.getElementById("addButton");


submitButton.addEventListener("click", ()=> {
    const promptInput  = window.prompt("Enter the name of Book Mark Page");
    console.log(promptInput)
    window.close();
})

