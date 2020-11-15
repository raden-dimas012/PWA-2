const loadSavedTeams = () => {
    loadingIndicator();
    const teams = getSavedTeams();
    const teamElements = document.getElementById('body-content');

    teams.then(data => {
        teamData = data
        data == 0 ? teamElements.innerHTML = `<h6 class="center-align">No favorite team found!</6>` : data.forEach(team => {
            teamElements.innerHTML += `
            <div class="col s12 m7">
              <h2 class="header">${team.name}</h2>
              <div class="card horizontal">
                <div class="card-image">
                <img width="90" height="90" src="${team.crestUrl}">
                </div>
                <div class="card-stacked">
                  <div class="card-content">
                    <p><i class="material-icons">info_outline</i>\t${team.shortName}</p>
                    <p><i class="material-icons">place</i>\t${team.address}</p>
                    <p><i class="material-icons">email</i>\t${team.email}</p>
                    <p><i class="material-icons">phone</i>\t${team.phone}</p>
                    <a class="btn-floating halfway-fab waves-effect waves-light red" onClick="listenerDelete(${team.id})" id="saved">
                    <i class="material-icons">delete_forever</i></a>
                  </div>
                  <div class="card-action">
                    <a href="${team.website}">${team.website}</a>
                  </div>
                </div>
              </div>
            </div>
            `;
        })
        hideLoadingIndicator();
    })
}