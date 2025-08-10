console.log("Content js of bookmark");
chrome.storage.local.get(["bookmarks"], (result)=> {
    console.log("this is for bookmark apis",result);
    const datas = result.bookmarks;
    const currentUrl = window.location.href;
    console.log(datas,currentUrl);
    const isPresent = datas.some((data)=> {
        return data.bookMarkUrl == currentUrl
    })
    if(isPresent){
        console.log("current link is present in bookmark data");
        const star = document.createElement("span");
        star.textContent = "⭐";
        star.style.position = "fixed";
        star.style.top = "10px";
        star.style.right = "10px";
        star.style.fontSize = "50px";
        document.body.appendChild(star);

    }

})
