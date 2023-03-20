// const baseUrl = 'https://mediacred-rswnzpohoq-ew.a.run.app/mediacredapi/';
const baseUrl = 'https://localhost:7220/mediacredapi/'
var selectedAuthor, activeTab;
var authorInformationValue = 1;

document.getElementById("authorInformationWeight").addEventListener("change", (e) => {
    if (e.target.value.length > 0) {
        authorInformationValue = e.target.value;
        FetchAuthorInfo();
    } else {
        authorInformationValue = 1;
    }
})
//GET url of active tab

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
        authorId: selectedAuthor,
        publisher: document.getElementById("artPublisher").value,
        link: "placeholder"
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




const articleEvalData = {
    articleLink: "https://www.google.com/search?q=alexander+is+cool&sxsrf=AJOqlzWNaCaV7kNphpfRYNVKT88bYkHYnQ%3A1679050011600&source=hp&ei=G0UUZOOzIuyUxc8P7ZKsqAo&iflsig=AK50M_UAAAAAZBRTK7p2xWWfy-Qcz0mz0dhwABCHSdh1&ved=0ahUKEwijrf_b5OL9AhVsSvEDHW0JC6UQ4dUDCAc&uact=5&oq=alexander+is+cool&gs_lcp=Cgdnd3Mtd2l6EAMyBggAEBYQHjIGCAAQFhAeMgYIABAWEB4yBggAEBYQHjIGCAAQFhAeMgsIABAWEB4Q8QQQCjIGCAAQFhAeMgYIABAWEB4yBggAEBYQHjIGCAAQFhAeOgcIIxDqAhAnOg0ILhDHARCvARDqAhAnOgoILhDHARCvARAnOgQIIxAnOgQIABBDOgsIABCABBCxAxCDAToFCAAQgAQ6BQguEIAEOggILhCxAxCDAToICAAQgAQQsQM6EQguEIAEELEDEIMBEMcBENEDOgsILhCxAxCDARDUAjoECC4QQzoKCC4QsQMQgwEQQzoOCC4QgAQQsQMQgwEQ1AI6CggAELEDEIMBEEM6CwguEIAEELEDEIMBOggIABCxAxCDAToICC4QgAQQ1AI6CAguEIAEELEDOgcILhCxAxBDOgcILhDUAhBDOgcIABCxAxBDOg0ILhCxAxCDARDUAhBDOgsILhCABBCxAxDUAjoLCC4QgAQQxwEQrwE6CwguEIMBELEDEIAEOgsILhCABBDHARDRAzoICAAQgAQQywE6CAguEIAEEMsBOgoIABAWEB4QDxATOggIABAWEB4QEzoICAAQFhAeEA86CAgAEBYQHhAKUK0KWJwaYM0baAFwAHgAgAFOiAG1CZIBAjE3mAEAoAEBsAEK&sclient=gws-wiz",
    articleEvals: [
        { key: "information", value: 1 },
        { key: "inappropriatewords", value: 1 },
        { key: "references", value: 1 },
        { key: "topic", value: 1 },
        { key: "author", value: 1 },
        { key: "backing", value: 1 },
    ],
    authorEvals: [
        { key: "information", value: 1 },
    ]
};
const articleCredEval = baseUrl + "articlecredibility";

fetch(articleCredEval, { headers: { "Content-Type": "application/json" }, method: 'POST', body: JSON.stringify(articleEvalData) }).then(function (res) {
    if (res.status !== 200) {
        alert(res.status)
    } else {
        res.json().then(data => {
            //document.getElementById("authoreval").innerHTML = JSON.stringify(data[0].Item3);
            AddCredEvalToTable(data);

        })
    }
});

function FetchAuthorInfo() {
    const authorCredEval = baseUrl + "authorcredibility";

    const authorData = {
        authorId: "d92a8c46-f0e6-4cba-8db4-03bc883be0a2",
        evals: [
            { key: "information", value: authorInformationValue }
        ]
    };

    fetch(authorCredEval, { headers: { "Content-Type": "application/json" }, method: 'POST', body: JSON.stringify(authorData) }).then(function (res) {
        if (res.status !== 200) {
            alert(res.status)
        } else {
            res.json().then(data => {
                AddCredEvalToTable(data);
            })
        }
    });
}


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
                    li.id = data[i].id;
                    li.appendChild(document.createTextNode(data[i].name));
                    li.addEventListener("click", selectAuthor);
                    li.display = "block";
                    ul.appendChild(li);
                }
            })
        }
    });
}

function selectAuthor(evt) {
    var ul = document.getElementById("authorList");
    var listelements = ul.getElementsByTagName("li");
    for (let i = 0; i < listelements.length; i++) {
        listelements[i].style.border = "none";

    }
    selectedAuthor = evt.target.id;
    evt.target.style.border = "1px solid #000000";
}

/* #endregion */


function AddCredEvalToTable(data) {
    const table = document.getElementById("list");


    data.forEach(element => {
        const tr = document.createElement("tr");
        const td = document.createElement("td");
        const td2 = document.createElement("td");
        const td3 = document.createElement("td");
        const td4 = document.createElement("td");

        td.innerHTML += element.Item1 + ' ';
        td2.innerHTML += element.Item2 + ' ';
        td3.setAttribute("class", "info");
        td3.setAttribute("title", element.Item3);
        td4.innerHTML += element.Item4 + ' ';
        tr.appendChild(td4);
        tr.appendChild(td);
        tr.appendChild(td2);
        tr.appendChild(td3);
        table.appendChild(tr);
    });
}