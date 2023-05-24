
listenformessages();

function listenformessages() {

    chrome.storage.sync.get(["Title"]).then((result) => {

        document.getElementById("title").innerHTML = result.Title;
    });
    chrome.storage.sync.get(["Nudge"]).then((result) => {
        document.getElementById("link").innerHTML = result.Nudge;

    });
}
