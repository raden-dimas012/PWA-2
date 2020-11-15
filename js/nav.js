document.addEventListener("DOMContentLoaded", function () {
    const elems = document.querySelectorAll(".sidenav");
    M.Sidenav.init(elems);
    loadNav();

    function loadNav() {
        const xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function () {
            if (this.readyState === 4) {
                if (this.status !== 200) return;

                document.querySelectorAll(".topnav,.sidenav").forEach(function (el) {
                    el.innerHTML = xhttp.responseText;
                })

                document.querySelectorAll(".topnav a,.sidenav a").forEach(function (el) {
                    el.addEventListener('click', function (event) {
                        const sidenav = document.querySelector(".sidenav");
                        M.Sidenav.getInstance(sidenav).close();

                        page = event.target.getAttribute("href").substr(1);
                        loadedPage(page);
                    })
                })
            }
        }
        xhttp.open("GET", "nav.html", true);
        xhttp.send();
    }

    let page = window.location.hash.substr(1);
    if (page == "") page = "home"
    loadedPage(page);

    function loadedPage(page) {
        const xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function () {
            if (this.readyState === 4) {
                const content = document.querySelector("#body-content");
                if (page == "home") {
                    getStandings();
                } else if (page == "teams") {
                    getTeams();
                } else if (page == "savedTeams") {
                    loadSavedTeams();
                }

                if (this.status === 200) {
                    content.innerHTML = xhttp.responseText;
                } else if (this.status === 404) {
                    content.innerHTML = "<p>Halaman tidak ditemukan</p>";
                } else {
                    content.innerHTML = "<p>Ups.. halaman tidak dapat diakses</p>";
                }
            }
        }
        xhttp.open("GET", "pages/" + page + ".html", true);
        xhttp.send();

    }

})

const loadingIndicator = () => {
    const loading = document.getElementById('loading');
    loading.innerHTML = `
  <div class="progress">
      <div class="indeterminate"></div>
  </div>
    `;
}
const hideLoadingIndicator = function () {
    document.getElementById('loading').innerHTML = '';
}