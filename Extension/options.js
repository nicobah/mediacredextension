const saveOptions = () => {
    const userID = document.getElementById("userID").value;
    const authorWeight = document.getElementById("authorInformationWeight").value;
    const iwWeight = document.getElementById("InappropriateWeight").value;
    const refWeight = document.getElementById("referencesWeight").value;
    const topicWeight = document.getElementById("topicWeight").value;
    const artInfoWeight = document.getElementById("articleInformationWeight").value;

    chrome.storage.sync.set({ userID: userID, authorWeight: authorWeight, iwWeight: iwWeight, refWeight: refWeight, topicWeight: topicWeight, artInfoWeight: artInfoWeight }, () => {
        const status = document.getElementById("status");
        status.textContent = "Options saved.";
        setTimeout(() => {
            status.textContent = "";
        }, 750);
    }
    );
};


const restoreOptions = () => {
    chrome.storage.sync.get(["userID", "artInfoWeight", "topicWeight", "authorWeight", "iwWeight", "refWeight"], (result) => {
            document.getElementById('userID').value = result.userID;
            document.getElementById('authorInformationWeight').value = result.authorWeight;
            document.getElementById('InappropriateWeight').value = result.iwWeight;
            document.getElementById('referencesWeight').value = result.refWeight;
            document.getElementById('topicWeight').value = result.topicWeight;
            document.getElementById('articleInformationWeight').value = result.artInfoWeight;
        
    });
};

document.addEventListener('DOMContentLoaded', restoreOptions);
document.getElementById('save').addEventListener('click', saveOptions);

document.getElementById("authorInformationWeight").addEventListener("change", (e) => {
    if (e.target.value.length > 0) {
        authorInformationValue = e.target.value;
        FetchArticleInfo();
    } else {
        authorInformationValue = 1;
    }
})
document.getElementById("InappropriateWeight").addEventListener("change", (e) => {
    if (e.target.value.length > 0) {
        inappropriatewordsValue = e.target.value;
        FetchArticleInfo();
    } else {
        inappropriatewordsValue = 1;
    }
})
document.getElementById("referencesWeight").addEventListener("change", (e) => {
    if (e.target.value.length > 0) {
        referencesValue = e.target.value;
        FetchArticleInfo();
    } else {
        referencesValue = 1;
    }
})
document.getElementById("topicWeight").addEventListener("change", (e) => {
    if (e.target.value.length > 0) {
        topicValue = e.target.value;
        FetchArticleInfo();
    } else {
        topicValue = 1;
    }
})
document.getElementById("backingWeight").addEventListener("change", (e) => {
    if (e.target.value.length > 0) {
        backingsValue = e.target.value;
        FetchArticleInfo();
    } else {
        backingsValue = 1;
    }
})

document.getElementById("articleInformationWeight").addEventListener("change", (e) => {
    if (e.target.value.length > 0) {
        informationValue = e.target.value;
        FetchArticleInfo();
    } else {
        informationValue = 1;
    }
})