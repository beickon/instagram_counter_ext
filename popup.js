document.addEventListener('DOMContentLoaded', function () {
    const bg = chrome.extension.getBackgroundPage();

    init();

    document.getElementById('settings').addEventListener('click', onclickSettings, false);

    function init() {
        chrome.storage.sync.get(['insta_username'], function (result) {
            result.insta_username ? setPopup() : requestUser();
        });
    }

    function setPopup() {
        document.getElementById('popup').style.display = 'grid';
        document.getElementById('new-user').style.display = 'none';

        setCount();
        setUsername();
        setProfilePic();
    }

    function requestUser() {
        document.getElementById('popup').style.display = 'none';
        document.getElementById('new-user').style.display = 'block';
    }

    function onclickSettings() {
        chrome.tabs.query({ currentWindow: true, active: true }, function (tabs) {
            chrome.tabs.create({
                url: './src/settings/settings.html'
            });
        });
    }
    
    function setCount () {
        document.getElementById('followers_count').innerHTML = `${bg.followersCount} followers`;
    }

    function setUsername () {
        document.getElementById('username').innerHTML = `<strong>${bg.username}<strong/>`;
    }

    function setProfilePic () {
        document.getElementById('profile_pic').innerHTML = `<img src="${bg.profilePic}" />`;
    }
}, false)
