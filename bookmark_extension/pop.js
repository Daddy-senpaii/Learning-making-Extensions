// Existing variables
const bookmarksList = document.getElementById("bookmarksList");
const description = document.getElementById("description");
const submitButton = document.getElementById("addButton");

const links = document.getElementById("links");

// Function to render bookmarks array to DOM
function renderBookmarks(bookmarks) {
    
    bookmarksList.innerHTML = "";
    bookmarksList.style.display = "flex";
    bookmarksList.style.justifyContent = "center";
    bookmarksList.style.alignItems = "center";
    bookmarksList.style.flexWrap = "wrap";

    const newDataDiv = document.createElement("div");

    bookmarks.forEach((data) => {
    const dataElement = document.createElement("div");

    const linkElement = document.createElement("a");
    linkElement.href = data.bookMarkUrl;
    linkElement.target = "_blank";
    linkElement.style.color = "black";
    linkElement.style.textDecoration = "none";

    const bookMarkTitle = document.createElement("h2");
    bookMarkTitle.textContent = data.bookMarkName;

    const descriptionTitle = document.createElement("p");
    descriptionTitle.textContent = data.bookMarkDescription;

    const deleteButton = document.createElement("button");
    deleteButton.textContent = "Delete";
    deleteButton.id = "deleteBookmark";

    deleteButton.addEventListener("click", ()=> {
        console.log(`delete id is pressed of id ${data.id}`);

        // now pass this id to background script and find this object with this id and perform delete operation
        chrome.runtime.sendMessage({
            action: "Delete Bookmark",
            id: data.id
        })
    })



    
    linkElement.appendChild(bookMarkTitle);
    linkElement.appendChild(descriptionTitle);

    function styleDataElement(dataElement) {
    dataElement.style.backgroundColor = "#b9b8b8ff" // very light grey
    dataElement.style.borderRadius = "20px"; 
    dataElement.style.padding = "12px"; 
    dataElement.style.marginBottom = "10px"; 
    dataElement.style.boxShadow = "0 2px 6px rgba(0, 0, 0, 0.1)"; 
    dataElement.style.display = "flex"; 
    dataElement.style.justifyContent = "space-between";
    dataElement.style.alignItems = "center";
}

    dataElement.appendChild(linkElement);
    dataElement.appendChild(deleteButton);
    styleDataElement(dataElement);

    newDataDiv.append(dataElement);
});

    bookmarksList.append(newDataDiv);
}

chrome.storage.local.get(["bookmarks"], (result) => {
    const bookmarks = result.bookmarks || [];
    console.log(bookmarks);
    renderBookmarks(bookmarks);
});


submitButton.addEventListener("click", () => {
    const descriptionValue = description.value;
    const promptInput = window.prompt("Enter the name of Book Mark Page");

    chrome.runtime.sendMessage(
        { pageDescription: descriptionValue, tabName: promptInput },
        (responses) => {
            if (!responses) {
                console.error("No response from background script");
                return;
            }
            console.log(responses.response);
            console.log("responses data is", responses.data);
            renderBookmarks(responses.data); // reuse same render function
        }
    );
});
