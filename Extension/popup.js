// const baseUrl = 'https://mediacred-rswnzpohoq-ew.a.run.app/mediacredapi/';
const baseUrl = 'https://localhost:7220/mediacredapi/'


//GET url of active tab
var activeTab;
//UNCOMMENT, for debugging purposes
// chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
//     activeTab = tabs[0];
// });


/* #region CurrentArticleCredibilityToulmin */

//GET the toulmins fit of the current url
const apiCall = baseUrl + "getlinktoulmin?url=localhost:6";

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



/* #region AddArticle */


document.getElementById("AddArticleBtn").addEventListener("click", addArticle);

function addArticle() {
    const addArticleData = {
        title: document.getElementById("articleTitle").value,
        publisher: document.getElementById("artPublisher").value,
        link: activeTab.url
    };
    const addArticleUrl = baseUrl + "createArticle";
    fetch(addArticleUrl, { headers: { "Content-Type": "application/json" }, method: 'POST', body: JSON.stringify(addArticleData) }).then(function (res) {
        if (res.status !== 200) {
            alert(res.status)
        } else {
            res.json().then(data => {

            })
        }
    });

}
/* #endregion */

/* #region AddAuthor */


document.getElementById("AddAuthBtn").addEventListener("click", addAuthor);


function addAuthor() {
    const addAuthorData = {
        Name: document.getElementById("authName").value,
        Age: document.getElementById("authAge").value,
        Image: "image",
        Company: document.getElementById("authCompany").value,
        Education: document.getElementById("authEducation").value,
        PoliticalOrientation: document.getElementById("authOrientation").value,
        Bio: document.getElementById("authBio").value,
        AreaOfExpertise: "areaofexpertise"
    };
    const addAuthorUrl = baseUrl + "createAuthor";
    fetch(addAuthorUrl, { headers: { "Content-Type": "application/json" }, method: 'POST', body: JSON.stringify(addAuthorData) }).then(function (res) {
        if (res.status !== 200) {
            alert(res.status)
        } else {
            res.json().then(data => {

            })
        }
    });

}
/* #endregion */

/* #region GET authorcredibility*/
//Get the authorCred eval

const authorCredEval = baseUrl + "authorcredibility";

const authorData = {
    authorId: 1,
    evals: [
        { key: "information", value: 1.23 },
    ]
};

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

/* #endregion */

/* #region authorSearch*/
document.getElementById("authorSearch").addEventListener("keyup", searchAuthors);

function searchAuthors(evt) {
    var ul = document.getElementById("authorList");
    ul.innerHTML = "";
    var value = document.getElementById("authorSearch").value;
    var getSearchUrl = baseUrl + "AuthorFilterName?name=" + value;
    var ul = document.getElementById("authorList");
    var i;
    fetch(getSearchUrl, { headers: { "Content-Type": "application/json" }, method: 'GET' }).then(function (res) {
        if (res.status !== 200) {
            alert(res.status)
        } else {
            res.json().then(data => {
                for (i = 0; i < data.length; i++) {
                    var li = document.createElement('li');
                    li.appendChild(document.createTextNode(data[i].name));
                    li.display = "block";
                    ul.appendChild(li);
                }
            })
        }
    });




}


/* #endregion */