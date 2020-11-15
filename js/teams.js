function getResultTeamsJSON(data) {
  let html = "";
  let str = JSON.stringify(data).replace(/http:/g, "https:");
  data = JSON.parse(str);
  teamData = data;

  html += "";
  data.teams.forEach((team) => {
    html += `
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
          <a class="btn-floating halfway-fab waves-effect waves-light red" onClick="listenerInsert(${team.id})" id="save">
          <i class="material-icons">add</i></a>
        </div>
        <div class="card-action">
          <a href="${team.website}">${team.website}</a>
        </div>
      </div>
    </div>
  </div>
          `;
  });
  document.getElementById("teams").innerHTML = html;
  hideLoadingIndicator();
}





