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

chrome.runtime.onMessage.addListener(function(request, sender, response){
    window.username = request.username;
    window.followersCount = request.followersCount;
});

chrome.runtime.onMessage.addListener(
    function (request, sender, sendResponse) {
        switch (request.type) {
            case 'fetchData':
                fetchData(request.username);
                sendResponse({ response: "FETCHED" });
                break;
            default:
                break;
        }
    }
);
