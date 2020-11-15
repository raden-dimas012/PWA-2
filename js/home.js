function getResultStandingsJSON(data) {
    var tableStandingsHtml = "";

    data.standings.forEach(function (standing) {
        var tableDataStanding = "";

        standing.table.forEach(function (team) {
            team = JSON.parse(JSON.stringify(team).replace(/^http:\/\//i, 'https://'));

            tableDataStanding += `
                <tr>
                    <td class="center-align">${team.position}</td>
                    <td>      
                        <p style="display: flex; align-items: center;">
                            <img class="materialboxed" style="float:left; margin-right:20px" width="50" height="50" src="${team.team.crestUrl}">
                            ${team.team.name}
                        </p>
                    </td>
                    <td class="center-align">${team.playedGames}</td>
                    <td class="center-align">${team.won}</td>
                    <td class="center-align">${team.draw}</td>
                    <td class="center-align">${team.lost}</td>
                    <td class="center-align">${team.points}</td>
                    <td class="center-align">${team.goalsFor}</td>
                    <td class="center-align">${team.goalsAgainst}</td>
                    <td class="center-align">${team.goalDifference}</td>
                </tr>
            `;
        })

        tableStandingsHtml += `
            <div class="card">
                <div class="card-content">
                    <table class="responsive-table striped centered">
                        <thead>
                            <tr>
                                <th class="center-align">Position</th>
                                <th class="center-align">Team</th>
                                <th class="center-align">Played</th>
                                <th class="center-align">Won</th>
                                <th class="center-align">Draw</th>
                                <th class="center-align">Lost</th>
                                <th class="center-align">Points</th>
                                <th class="center-align">Goals For</th>
                                <th class="center-align">Goals Against</th>
                                <th class="center-align">Goals Difference</th>
                            </tr>
                        </thead>

                        <tbody>
                            ` + tableDataStanding + `
                        </tbody>
                    </table>
                </div>
            </div>
        `;
    });

    document.getElementById("standings").innerHTML = tableStandingsHtml;
    hideLoadingIndicator();
}