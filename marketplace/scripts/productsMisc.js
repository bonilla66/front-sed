const tkn = localStorage.getItem("token");
const usR = localStorage.getItem("usR");

if (tkn !== null) {
    const loginElement = document.getElementById("loginLabel");
    if (loginElement) {
        loginElement.style.display = "none";
    }
}

if (tkn !== null && usR === "superAdmin") {
    fetch('../components/navbar-super.html')
        .then(response => response.text())
        .then(template => {
            document.body.insertAdjacentHTML('afterbegin', template);
            const userIconBtn = document.getElementById('user-icon-btn');
            const userDropdown = document.getElementById('user-dropdown');
            const logOutButton = document.getElementById("logout-button");

            if (tkn !== null) {
                const loginElement = document.getElementById("login");
                if (loginElement) {
                    loginElement.style.display = "none";
                }
            }

            userIconBtn.addEventListener('click', function (event) {
                userDropdown.classList.toggle('visible');
                event.stopPropagation();
            });

            logOutButton.addEventListener('click', function (event) {
                localStorage.setItem("token", null);
                localStorage.setItem("usR", null);
                window.location.href = '../index.html';
            });

            document.addEventListener('click', function (event) {
                if (!userDropdown.contains(event.target) && !userIconBtn.contains(event.target)) {
                    userDropdown.classList.remove('visible');
                }
            });
        });
} else if (tkn !== null && usR === "administrador") {
    fetch('../components/navbar-admin.html')
        .then(response => response.text())
        .then(template => {
            document.body.insertAdjacentHTML('afterbegin', template);
            const userIconBtn = document.getElementById('user-icon-btn');
            const userDropdown = document.getElementById('user-dropdown');
            const logOutButton = document.getElementById("logout-button");

            if (token !== null) {
                const loginElement = document.getElementById("login");
                if (loginElement) {
                    loginElement.style.display = "none";
                }
            }

            userIconBtn.addEventListener('click', function (event) {
                userDropdown.classList.toggle('visible');
                event.stopPropagation();
            });

            logOutButton.addEventListener('click', function (event) {
                localStorage.setItem("token", null);
                localStorage.setItem("usR", null);
                window.location.href = '../index.html';
            });

            document.addEventListener('click', function (event) {
                if (!userDropdown.contains(event.target) && !userIconBtn.contains(event.target)) {
                    userDropdown.classList.remove('visible');
                }
            });
        });
} else if (tkn !== null && usR === "usuario" || usR === "user") {
    fetch('../components/navbaruser.html')
        .then(response => response.text())
        .then(template => {
            document.body.insertAdjacentHTML('afterbegin', template);
            const userIconBtn = document.getElementById('user-icon-btn');
            const userDropdown = document.getElementById('user-dropdown');
            const logOutButton = document.getElementById("logout-button");



            if (token !== null) {
                const loginElement = document.getElementById("login");
                if (loginElement) {
                    loginElement.style.display = "none";
                }
            }

            userIconBtn.addEventListener('click', function (event) {
                userDropdown.classList.toggle('visible');
                event.stopPropagation();
            });

            logOutButton.addEventListener('click', function (event) {
                localStorage.setItem("token", null);
                localStorage.setItem("usR", null);
                window.location.href = '../index.html';
            });

            document.addEventListener('click', function (event) {
                if (!userDropdown.contains(event.target) && !userIconBtn.contains(event.target)) {
                    userDropdown.classList.remove('visible');
                }
            });
        });
} else {
    fetch('../components/navbar.html')
        .then(response => response.text())
        .then(template => {
            document.body.insertAdjacentHTML('afterbegin', template);

            document.addEventListener('click', function (event) {
                if (!userDropdown.contains(event.target) && !userIconBtn.contains(event.target)) {
                    userDropdown.classList.remove('visible');
                }
            });
        });
}

fetch('../components/footer.html')
    .then(response => response.text())
    .then(template => {
        document.body.insertAdjacentHTML('beforeend', template);
    });