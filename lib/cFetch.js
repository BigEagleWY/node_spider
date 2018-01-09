var fetch = require("isomorphic-fetch");
function Fetch(url, callback) {
    fetch(url)
        .then(function (response) {
            if (response.status == 200) {
                return response.json();
            } else if (response.status == 401) {
                goToLogin();
            } else {
                catchError(response);
            }
        })
        .then(function (data) {
            if (callback) {
                callback(data);
            }
        });
}

function goToLogin() {}

function catchError(response) {}

module.exports = Fetch;