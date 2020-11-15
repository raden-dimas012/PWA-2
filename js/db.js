let dbPromise = idb.open("myfootball", 1, (upgradeDb) => {
    switch (upgradeDb.oldVersion) {
        case 0:
            upgradeDb.createObjectStore("teams", { keyPath: "id" });
    }
});

function insertTeam(team) {
    dbPromise
        .then(function (db) {
            let tx = db.transaction("teams", "readwrite");
            let store = tx.objectStore("teams");
            store.put(team);
            return tx.complete;
        })
        .then(function () {
            M.toast({ html: `${team.name} berhasil ditambahkan!` });
            const title = "Football Information";
            const options = {
                body: "Tim telah berhasil ditambahkan!",
            };
        })
        .catch((err) => {
            console.error("Tim gagal ditambahkan", err);
        });
}

function deleteTeam(teamId) {
    dbPromise
        .then(function (db) {
            let tx = db.transaction("teams", "readwrite");
            let store = tx.objectStore("teams");
            store.delete(teamId);
            return tx.complete;
        })
        .then(function () {
            M.toast({ html: "Tim berhasil dihapus!" });
            const title = "Football Information";
            const options = {
                body: "Tim telah berhasil dihapus!",
            };
            loadSavedTeams();
        })
        .catch((err) => {
            console.error("Error: ", err);
        });
}

function getSavedTeams() {
    return dbPromise.then(function (db) {
        let tx = db.transaction("teams", "readonly");
        let store = tx.objectStore("teams");
        return store.getAll();
    });
}

let listenerInsert = (teamId) => {
    let team = teamData.teams.filter((fil) => fil.id == teamId)[0];
    insertTeam(team);
    console.log(teamId + " ditambahkan ke favorite");
};

let listenerDelete = (teamId) => {
    const dialog = confirm("Kamu yakin menghapus team ini ?");
    if (dialog == true) {
        deleteTeam(teamId);
        console.log(teamId + " telah dihapus");
    }
};
