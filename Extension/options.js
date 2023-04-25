const saveOptions = () => {
    const userID = document.getElementById("userID").value;

    chrome.storage.sync.set({ userID: userID }, () => {
        const status = document.getElementById("status");
        status.textContent = "Options saved.";
        setTimeout(() => {
            status.textContent = "";
        }, 750);
    }
    );
};


const restoreOptions = () => {
    chrome.storage.sync.get(
        { userID: "" },
        (items) => {
            document.getElementById('userID').value = items.userID;
        }
    );
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