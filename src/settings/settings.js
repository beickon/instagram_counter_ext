document.addEventListener('DOMContentLoaded', function () {

    let username;
    // clearUsername();
    setUsernameOnInput();
    displayMessageCard('error-card', 'none');
    displayMessageCard('success-card', 'none');
    document.getElementById('save-button').addEventListener('click', onClickSave, false);

    //TODO create a util file with this function
    function setUsernameOnInput () {
        chrome.storage.sync.get(['insta_username'], function (result) {
            if (result.insta_username) document.getElementById('username').value = result.insta_username;
        });
    }
    
    function onClickSave() {
        username = document.getElementById('username').value;

        checkIfAccountExists();
    }

    function checkIfAccountExists() {
        fetch(`http://www.instagram.com/${username}?__a=1`)
            .then(r => r.text())
            .then(result => {
                result = JSON.parse(result);
                usernameExist(!!result.graphql);
            })
            .catch(() => {
                usernameExist(false);
            });
    }

    function usernameExist(exists) {
        let card = 'error-card';

        if(exists) {
            card = 'success-card';
            chrome.storage.sync.set({ insta_username: username }, () => {});
        }

        displayMessageCard(card, 'block');
        setTimeout(() => { displayMessageCard(card, 'none'); }, 5000);

    }

    function displayMessageCard(id, display) {
        document.getElementById(id).style.display = display;
    }

    function clearUsername() {
        chrome.storage.sync.clear(function () {
            console.log('cleared')
        });
    }

}, false)
