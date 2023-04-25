// const baseUrl = 'https://mediacredapi-ii7nr2dupa-ew.a.run.app/';
const baseUrl = 'https://localhost:7220/mediacredapi/'

chrome.runtime.onMessage.addListener(
    function (request, sender, sendResponse) {
        if (request.greeting == "hello") {
            alert("Hello");
        }
    }

);

function onBrowserOpen() {
    chrome.storage.sync.get(["userID"]).then((result) => {
        console.log(result.userID);

        const userData = {
            id: result.userID
        };
        const addArticleUrl = baseUrl + "getnudge?id=" + result.userID;
        fetch(addArticleUrl, { headers: { "Content-Type": "application/json" }, method: 'GET' }).then(function (res) {
            if (res.status !== 200) {
                console.log(res.status);
            } else {
                res.json().then(data => {
                    console.log(data);
                })
            }
        });
    });

}

function handleSuccess(data) {
    console.log(data);
    if (data) {
        chrome.windows.create({
            type: 'popup',
            url: 'nudge.html',
            width: 400,
            height: 300
        });
    }
}

// This event listener runs the createPopup function when the extension is first loaded
chrome.runtime.onInstalled.addListener(onBrowserOpen);
// chrome.windows.onCreated.addListener(createPopup);