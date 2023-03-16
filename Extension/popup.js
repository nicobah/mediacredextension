
/* #region linkCred*/
//GET url of active tab

//UNCOMMENT, for debugging purposes
// chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
//     var activeTab = tabs[0];
//     document.getElementById("url").innerHTML = activeTab.url;
// });
//GET the toulmins fit of the current url
const apiCall = 'https://mediacred-rswnzpohoq-ew.a.run.app/mediacredapi/getlinktoulmin?url=localhost:6';

fetch(apiCall, { headers: { "Content-Type": "application/json" } }).then(function (res) {
    if (res.status !== 200) {
        alert(res.status)
    } else {
        res.json().then(data => {
            document.getElementById("linkCred").innerHTML = data;
        })
    }
});
/* #endregion linkCred*/



/* #region TabLogic */

document.getElementById("CredButton").addEventListener("click", openTab);
document.getElementById("DataButton").addEventListener("click", openTab);
document.getElementById("SettingsButton").addEventListener("click", openTab);

function openTab(evt) {
    console.log(evt.target.id);
    // Declare all variables
    var i, tabcontent;

    // Get all elements with class="tabcontent" and hide them
    tabcontent = document.getElementsByClassName("tabcontent");
    for (i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = "none";
    }

    var elem = document.getElementById(evt.target.id + "Content");
    elem.style.display = "block";
}
/* #endregion */


const authorCredEval = "https://localhost:7220/mediacredapi/authorcredibility";

// const authorCredEval = "https://mediacred-rswnzpohoq-ew.a.run.app/mediacredapi/authorcredibility";
const authorData = {
    authorId: 1,
    evals: [
        { key: "information", value: 1.23 },
    ]
};


//Get the authorCred eval
fetch(authorCredEval, { headers: { "Content-Type": "application/json" }, method: 'POST', body: JSON.stringify(authorData) }).then(function (res) {
    if (res.status !== 200) {
        alert(res.status)
    } else {
        res.json().then(data => {
            //document.getElementById("authoreval").innerHTML = JSON.stringify(data[0].Item3);
            const ul = document.getElementById("list");
            data.forEach(element => {
                const li = document.createElement('li');
                li.innerHTML = element.Item1;
                const li2 = document.createElement('li');
                li2.innerHTML = element.Item2;
                const li3 = document.createElement('li');
                li3.innerHTML = element.Item3;
                ul.appendChild(li);
                ul.appendChild(li2);
                ul.appendChild(li3);
            });
        })
    }
});