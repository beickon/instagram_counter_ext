window.username = '';
window.profilePic = '';
window.followersCount = 0;


function fetchData(username) {
    fetch(`http://www.instagram.com/${username}?__a=1`)
        .then(r => r.text())
        .then(result => {
            window.username = username;
            result = JSON.parse(result);
            window.profilePic = result.graphql.user.profile_pic_url;
            window.followersCount = result.graphql.user.edge_followed_by.count;
    });
}

function init() {
    username ? fetchData(username) : console.log('no user')
};

function setUsername() {
    chrome.storage.sync.get(['insta_username'], function (result) {
        username = result['insta_username'];
        init();
    });
}

chrome.storage.onChanged.addListener(function () {
    setUsername();
});

setUsername();
