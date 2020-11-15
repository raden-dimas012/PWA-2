const base_url = "https://api.football-data.org/v2";
const api_token = "d6d7c05a129a4462a835cc8a0cd29885";
const id_liga = 2003;

const endpoint_standings = `${base_url}/competitions/${id_liga}/standings?standingType=TOTAL`;
const endpoint_teams = `${base_url}/competitions/${id_liga}/teams`;



function status(response) {
    if (response.status !== 200) {
        console.log(response.status);
        return Promise.reject(new Error(response.statusText));
    } else {
        return Promise.resolve(response);
    }
}
function json(response) {
    return response.json();
}

function error(error) {
    console.log(error);
}

function fetchAPI(endpoint) {
    return fetch(endpoint, {
        headers: {
            "X-Auth-Token": api_token
        }
    });
}

function getStandings() {
    return new Promise(function (resolve, reject) {
        loadingIndicator();
        if ("caches" in window) {
            caches.match(endpoint_standings).then(function (response) {
                if (response) {
                    response.json().then(function (data) {
                        getResultStandingsJSON(data);
                        resolve(data);
                    });
                }
            });
        }

        fetchAPI(endpoint_standings)
            .then(status)
            .then(json)
            .then(function (data) {
                getResultStandingsJSON(data);
                resolve(data);
            })
            .catch(error);
    });
}
function getTeams() {
    return new Promise(function (resolve, reject) {
        loadingIndicator();
        if ("caches" in window) {
            caches.match(endpoint_teams).then(function (response) {
                if (response) {
                    response.json().then(function (data) {
                        getResultTeamsJSON(data);
                        resolve(data);
                    });
                }
            });
        }

        fetchAPI(endpoint_teams)
            .then(status)
            .then(json)
            .then(function (data) {
                getResultTeamsJSON(data);
                resolve(data);
            })
            .catch(error);
    });
}