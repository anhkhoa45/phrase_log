let phraseLogForm = document.getElementById("phraseLogForm");
let phraseInp = document.getElementsByName("phrase")[0];
let meanInp = document.getElementsByName("mean")[0];
let autoSyncInp = document.getElementsByName("auto_sync")[0];

chrome.tabs.executeScript(
    null,
    {code: "window.getSelection().toString();"},
    function (selection) {
        if(selection && selection[0]) {
            phraseInp.value = selection[0];
        }
        meanInp.focus();
    }
);

function newDictionary() {
    return {
        phrases: [],
        count: 0
    }
}

function addPhrase(dict, phrase, mean) {
    dict.phrases.push({
        phrase,
        mean
    });
    dict.count++;
}

function today() {
    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = today.getFullYear();

    return mm + '/' + dd + '/' + yyyy;
}

function saveToLocalStorage(phrase, mean) {
    chrome.storage.sync.get('dict', ({dict}) => {
        if(dict.count !== undefined) {
            addPhrase(dict, phrase, mean);
        } else {
            dict = newDictionary();
        }

        chrome.storage.sync.set({'dict': dict});
    });
}

function saveToServer(phrase, mean) {
    fetch('http://localhost:3000/phrases', {
        method: 'POST',
        mode: 'cors',
        credentials: 'include',
        cache: 'no-cache',
        headers: {
            'Content-Type': 'application/json',
        },
        referrer: 'client',
        referrerPolicy: 'origin',
        body: JSON.stringify({
            phrase: phrase,
            mean: mean
        })
    });
}

phraseLogForm.addEventListener('submit', e => {
    e.preventDefault();
    saveToLocalStorage(phraseInp.value, meanInp.value);

    if(autoSyncInp.value) {
        saveToServer(phraseInp.value, meanInp.value);
    }
});



