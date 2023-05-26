// const baseUrl = 'https://mediacredapi-ii7nr2dupa-ew.a.run.app/';
const baseUrl = 'https://localhost:7220/mediacredapi/'

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
                    handleSuccess(data);
                })
            }
        });
    });

}


function handleSuccess(data) {
    var link = data.Link;
    chrome.storage.sync.set({ "Nudge": link }, function () {
        console.log('Value is set.');
    });
    var title = data.Title;
    chrome.storage.sync.set({ "Title": title }, function () {
        console.log('Value is set.');
    });
    chrome.windows.create({
        type: 'popup',
        url: 'nudge.html',
        width: 400,
        height: 300
    });
}

// This event listener runs the createPopup function when the extension is first loaded
// chrome.runtime.onInstalled.addListener(onBrowserOpen);
chrome.windows.onCreated.addListener(onBrowserOpen);