// const baseUrl = 'https://mediacred-rswnzpohoq-ew.a.run.app/mediacredapi/';
const baseUrl = 'https://localhost:7220/mediacredapi/'
var selectedAuthor, activeTab;
var authorInformationValue = 1;
var inappropriatewordsValue = 1;
var referencesValue = 1;
var topicValue = 1;
var authorsValue = 1;
var backingsValue = 1;
var informationValue = 1
let credScore = 0;
let overallScore = 0;

/* #region SettingsEventListeners */

/* #endregion */
//GET url of active tab

//UNCOMMENT, for debugging purposes
function getCurrentTab() {
    return new Promise((resolve, reject) => {
        chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
            let currTab = tabs[0];
            activeTab = currTab.url;
            resolve(activeTab);
        });
    });
}

// Call getCurrentTab using async/await
async function fetchData() {
    activeTab = await getCurrentTab();
    // Use the value of activeTab here
}

await fetchData();
FetchClaimsValidity();

chrome.storage.sync.get(["userID"]).then((result) => {
    console.log(result.userID);

    const userData = {
        id: result.userID
    };

    //const addArticleReadUrl = baseUrl + "addarticleread?userid=" + result.userID + "&url="+ activeTab;
    const addArticleReadUrl = baseUrl + "addarticleread?userid="+ userData.id + "&url="+ activeTab;
    fetch(addArticleReadUrl, { headers: { "Content-Type": "application/json" }, method: 'POST' }).then(function (res) {
        if (res.status !== 200) {
            console.log(res.status);
        } else {
            res.json().then(data => {
                handleSuccess(data);
            })
        }
    });
});

function getUserID(callback) {
    chrome.storage.sync.get(["userID"], (result) => {
      callback(result.userID);
    });
  }

  function getUserData(callback) {
    chrome.storage.sync.get(["userID", "infoWeight", "topicWeight"], (result) => {
      callback(result);
    });
  }

/* #region CurrentArticleCredibilityToulmin */

//GET the toulmins fit of the current url
function getToulminFit(id) {
    const apiCall = baseUrl + "gettoulminstring?argid=" + id;

    return new Promise((resolve, reject) => {
        fetch(apiCall, { headers: { "Content-Type": "application/json" } })
            .then((res) => {
                if (res.status !== 200) {
                    resolve("nope");
                } else {
                    res.json().then((data) => {
                        resolve(data);
                    });
                }
            })
            .catch((error) => {
                // Handle the error
                console.error(error);
                reject(error);
            });
    });
}


/* #endregion linkCred*/



/* #region TabLogic */
document.getElementById("authorSearch").addEventListener("keyup", searchAuthors);
document.getElementById("CredButton").addEventListener("click", openTab);
document.getElementById("DataButton").addEventListener("click", openTab);
document.getElementById("AddArticleBtn").addEventListener("click", addArticle);
document.getElementById("AddAuthBtn").addEventListener("click", addAuthor);
document.getElementById("addAuthorToArticle").addEventListener("click", addAuthorToArticle);
document.getElementById("AddArgBtn").addEventListener("click", addArg);





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



function addArticle() {
    const addArticleData = {
        title: document.getElementById("articleTitle").value,
        publisher: document.getElementById("artPublisher").value,
        link: activeTab,
        inappropriateWords: document.getElementById("artInappropriate").value,
        references: document.getElementById("artRefs").value,
        topic: document.getElementById("artTopic").value

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




function addAuthor() {
    const addAuthorData = {
        Name: document.getElementById("authName").value,
        Age: document.getElementById("authAge").value,
        //Image: "image",
        Company: document.getElementById("authCompany").value,
        Education: document.getElementById("authEducation").value,
        PoliticalOrientation: document.getElementById("authOrientation").value,
        Bio: document.getElementById("authBio").value
        //AreaOfExpertise: "areaofexpertise"
    };
    const addAuthorUrl = baseUrl + "createAuthor?artLink="+activeTab;
    fetch(addAuthorUrl, { headers: { "Content-Type": "application/json" }, method: 'POST', body: JSON.stringify(addAuthorData) }).then(function (res) {
        if (res.status !== 200) {
            alert(res.status)
        } else {
            res.json().then(data => {

            })
        }
    });

}
function addArg() {
    const argData = {
        claim: document.getElementById("argClaim").value,
        ground: document.getElementById("argGround").value,
        warrant: document.getElementById("argWarrant").value,
        artlink: activeTab
    };
    fetch(baseUrl + "createargument", { headers: { "Content-Type": "application/json" }, method: 'POST', body: JSON.stringify(argData) }).then(function (res) {
        if (res.status !== 200) {
            alert(res.status)
        } else {
            res.json().then(data => {

            });
        }


    });
}



function addAuthorToArticle() {
    const addAuthorData = {
        link: activeTab,
        authorId: selectedAuthor
    };
    const addAuthorUrl = baseUrl + "AddAuthor";
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
await FetchArticleInfo();

function FetchArticleInfo() {
    chrome.storage.sync.get(["userID", "artInfoWeight", "topicWeight", "authorWeight", "iwWeight", "refWeight"]).then((result) => {
    const articleEvalData = {
        articleLink: activeTab,
        articleEvals: [
            { key: "information", value: result.artInfoWeight },
            { key: "inappropriatewords", value: result.iwWeight },
            { key: "references", value: result.refWeight },
            { key: "topic", value: result.topicWeight },
            { key: "author", value: result.authorWeight },
        ],
        authorEvals: [
            { key: "information", value: authorInformationValue },
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
                overallScore = calculateOverallScore(data);
                document.getElementById("overallScore").innerHTML = overallScore;
            })
        }
    });
});
}


/* #endregion */

/* #region authorSearch*/


function searchAuthors(evt) {
    var ul = document.getElementById("authorList");
    ul.innerHTML = "";
    var value = document.getElementById("authorSearch").value;
    var getSearchUrl = baseUrl + "AuthorFilterName?name=" + value;
    var ul = document.getElementById("authorList");

    var i;
    fetch(getSearchUrl, { headers: { "Content-Type": "application/json" }, method: 'GET' }).then(function (res) {
        if (res.status !== 200) {
        } else {
            res.json().then(data => {
                while (ul.firstChild) {
                    ul.removeChild(ul.firstChild);
                }
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
    var cardDiv = document.getElementById("card-holder");
    cardDiv.innerHTML = "";
    /*
            <div class="card -small -back -flipped">
                        <a class="card--title" href="#">Flipping card</a>
                        <p class="card--text">
                            hiding backface is the key
                        </p>
                    </div>
                    <div class="card -small -front -orange">
                        <p >front</p>
                    </div>
    */
    data.forEach(element => {
        const cardHolder = document.createElement("div");
        cardHolder.setAttribute("class", "card-holder");

        var card = document.createElement("div");
        card.setAttribute("class", "card -small -back -flipped");
        const a = document.createElement('a');
        a.setAttribute("class", "card--title");
        var p = document.createElement('p');
        p.innerHTML = element.Item3;
        p.setAttribute("class", "card--text");
        card.appendChild(a);
        card.appendChild(p);
        const cardFront = document.createElement('div');
        cardFront.setAttribute("class", "card -small -front -orange");
        const p2 = document.createElement('p');
        const p3 = document.createElement('p');
        p3.setAttribute("class", "card--text");
        p3.innerHTML = element.Item1;
        p2.setAttribute("class", "card--text");
        p2.innerHTML = element.Item4;
        cardFront.appendChild(p2);
        cardFront.appendChild(p3);

        cardHolder.appendChild(card);
        cardHolder.appendChild(cardFront);
        cardDiv.appendChild(cardHolder);
    });
}

function calculateOverallScore(scoreList) {
    let totalScore = 0;
    let totalWeight = 0;

    for (let i = 0; i < scoreList.length; i++) {
        let score = scoreList[i].Item1
        let weight = scoreList[i].Item2;

        totalScore += score * weight;
        totalWeight += weight;
    }

    return totalScore / totalWeight;
}





async function FetchClaimsValidity() {
    let url = activeTab;
    const getArgs = baseUrl + "GetArgsByArtLink?url=" + url;

    try {
        const res = await fetch(getArgs, { headers: { "Content-Type": "application/json" } });

        if (res.status !== 200) {
            alert(res.status);
        } else {
            const data = await res.json();
            let table = document.getElementById("claimsList");
            let tableActions = document.getElementById("claimsActions");

            let u = 100 / data.length;

            for (const x of data) {
                credScore += (u * x.weight);


                const newRow = table.insertRow();
                const claimCell = newRow.insertCell();
                claimCell.textContent = x.claim;
                const newRowActions = tableActions.insertRow();
                const claimCellActions = newRowActions.insertCell();
                claimCellActions.textContent = x.claim;


                let toulminfit = await getToulminFit(x.id);
                const fitCell = newRow.insertCell();
                fitCell.textContent = toulminfit;


                const argCell = newRowActions.insertCell();
                let argBtn = document.createElement('button');
                argBtn.textContent = "Back";
                argBtn.addEventListener('click', function () {
                    addArgBacking(x.id);
                });
                argCell.appendChild(argBtn);

                const idCell = newRowActions.insertCell();
                let idBtn = document.createElement('button');
                idBtn.textContent = "Get Id";
                idBtn.addEventListener('click', function () {
                    alert(x.id);
                });
                idCell.appendChild(idBtn);
                claimCell.addEventListener("click", function () {
                    showTree(x);
                });

                const disputeCell = newRowActions.insertCell();
                let disputeBtn = document.createElement('button');
                disputeBtn.textContent = "Dispute";
                disputeBtn.addEventListener('click', function () {
                    addArgDispute(x.id);

                });
                disputeCell.appendChild(disputeBtn);

                // Add button and event listener code here
            }
            document.getElementById("overallScoreContent").innerHTML = credScore;
            document.getElementById("finalScore").innerHTML = (credScore * 0.5) + (overallScore * 0.5);

        }
    } catch (error) {
        console.error(error);
        // Handle the error appropriately
    }
}


function acceptValidity(x) {
    getUserID((userID) => {
    fetch(baseUrl + "AcceptValidity?argInternalID=" + x + "&userID="+userID, { headers: { "Content-Type": "application/json" }, method: 'POST' }).then(function (res) {
        if (res.status != 200) {
            alert(res.status)
        } else {
            location.reload();
        }
    });
});
}

function addArgBacking(id) {
    chrome.storage.sync.get(["userID", "artInfoWeight", "topicWeight", "authorWeight", "iwWeight", "refWeight"]).then((result) => {
        const articleEvalData = {
            articleLink: activeTab,
            articleEvals: [
                { key: "information", value: result.artInfoWeight },
                { key: "inappropriatewords", value: result.iwWeight },
                { key: "references", value: result.refWeight },
                { key: "topic", value: result.topicWeight },
                { key: "author", value: result.authorWeight },
            ],
        authorEvals: [
            { key: "information", value: authorInformationValue },
        ]
    };
    const userInput = prompt("Enter Id of argument to back this");
    if (userInput) {
        getUserID((userID) => {
        fetch(baseUrl + "createbacking?backedById=" + userInput + "&backedID=" + id + "&userID="+userID, { headers: { "Content-Type": "application/json" }, method: 'POST', body: JSON.stringify(articleEvalData) }).then(function (res) {
            if (res.status !== 200) {
                alert(res.status)
            } else {
                res.json().then(data => {

                })
            }
        });
    });
    }
});
}

function addArgDispute(id) {
    chrome.storage.sync.get(["userID", "artInfoWeight", "topicWeight", "authorWeight", "iwWeight", "refWeight"]).then((result) => {
        const articleEvalData = {
            articleLink: activeTab,
            articleEvals: [
                { key: "information", value: result.artInfoWeight },
                { key: "inappropriatewords", value: result.iwWeight },
                { key: "references", value: result.refWeight },
                { key: "topic", value: result.topicWeight },
                { key: "author", value: result.authorWeight },
            ],
        authorEvals: [
            { key: "information", value: authorInformationValue },
        ]
    };
    const userInput = prompt("Enter Id of argument to dispute this");
    
    if (userInput) {
        getUserID((userID) => {
        fetch(baseUrl + "createrebuttal?disputedById=" + userInput + "&disputedID=" + id + "&userID="+ userID, { headers: { "Content-Type": "application/json" }, method: 'POST', body: JSON.stringify(articleEvalData) }).then(function (res) {
            if (res.status !== 200) {
                alert(res.status)
            } else {
                res.json().then(data => {

                })
            }
        });
        });
    }
});
}

function showTree(x) {
    //fetch(baseUrl + "ArgTree?argId=" + x.id + "&userID=AT1", { headers: { "Content-Type": "application/json" } }).then(function (res) {
        getUserID((userID) => {
            fetch(baseUrl + "ArgTree?argId=" + x.id + "&userID="+userID, { headers: { "Content-Type": "application/json" } }).then(function (res) {
                if (res.status != 200) {
                    alert(res.status)
                } else {
                    res.json().then(data => {
        
                        let chartData = {
                            nodes: data.nodes,
                            edges: data.edges
                        }
                        var chart = anychart.graph(chartData);
                        chart.title(x.claim);
                        var c = document.getElementById("container");
                        var nodes = chart.nodes();
                        nodes.selected(function (e) {
        
                        });
                        nodes.labels().enabled(true);
                        nodes.labels().format("{%ll}");
                        chart.container(c);
                        chart.draw();
                        chart.listen("click", function (e) {
                            var x = e.domTarget.tag.id;
                            acceptValidity(x)
                        });
        
        
        
                        document.getElementById("view1").hidden = true;
                        document.getElementById("view2").hidden = false;
                    });
                }
            });
          });
    


}
