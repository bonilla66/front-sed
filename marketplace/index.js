const token = localStorage.getItem("token");
const usR = localStorage.getItem("usR");

if (token !== null && usR === "superAdmin") {
    fetch('./components/navbar-super.html')
        .then(response => response.text())
        .then(template => {
            document.body.insertAdjacentHTML('afterbegin', template);
            //const userIconBtn = document.getElementById('user-icon-btn');
            //const userDropdown = document.getElementById('user-dropdown');
            const logOutButton = document.getElementById("logout-button");

            if (token !== null) {
                const loginElement = document.getElementById("login");
                if (loginElement) {
                    loginElement.style.display = "none";
                }
            }

            /*userIconBtn.addEventListener('click', function (event) {
                userDropdown.classList.toggle('visible');
                event.stopPropagation();
            });*/

            logOutButton.addEventListener('click', function (event) {
                localStorage.setItem("token", null);
                localStorage.setItem("usR", null);
                Swal.fire({
                    title: 'Hasta pronto',
                    text: 'Cierre de sesion exitoso',
                    icon: 'info',
                    confirmButtonText: 'Ok'
                }).then((result) => {
                    if (result.isConfirmed) {
                        window.location.href = '../index.html';
                    }
                })
            });

            /*document.addEventListener('click', function (event) {
                if (!userDropdown.contains(event.target) && !userIconBtn.contains(event.target)) {
                    userDropdown.classList.remove('visible');
                }
            });*/
        });
} else if (token !== null && usR === "administrador") {
    fetch('./components/navbar-admin.html')
        .then(response => response.text())
        .then(template => {
            document.body.insertAdjacentHTML('afterbegin', template);
            //const userIconBtn = document.getElementById('user-icon-btn');
            //const userDropdown = document.getElementById('user-dropdown');
            const logOutButton = document.getElementById("logout-button");

            if (token !== null) {
                const loginElement = document.getElementById("login");
                if (loginElement) {
                    loginElement.style.display = "none";
                }
            }

            /*userIconBtn.addEventListener('click', function (event) {
                userDropdown.classList.toggle('visible');
                event.stopPropagation();
            });*/

            logOutButton.addEventListener('click', function (event) {
                localStorage.setItem("token", null);
                localStorage.setItem("usR", null);
                Swal.fire({
                    title: 'Hasta pronto',
                    text: 'Cierre de sesion exitoso',
                    icon: 'info',
                    confirmButtonText: 'Ok'
                }).then((result) => {
                    if (result.isConfirmed) {
                        window.location.href = '../index.html';
                    }
                })
            });

            /*document.addEventListener('click', function (event) {
                if (!userDropdown.contains(event.target) && !userIconBtn.contains(event.target)) {
                    userDropdown.classList.remove('visible');
                }
            });*/
        });
} else if (token !== null && usR === "usuario") {
    fetch('./components/navbaruser.html')
        .then(response => response.text())
        .then(template => {
            document.body.insertAdjacentHTML('afterbegin', template);
            //const userIconBtn = document.getElementById('user-icon-btn');
            //const userDropdown = document.getElementById('user-dropdown');
            const logOutButton = document.getElementById("logout-button");

            if (token !== null) {
                const loginElement = document.getElementById("login");
                if (loginElement) {
                    loginElement.style.display = "none";
                }
            }

            /*userIconBtn.addEventListener('click', function (event) {
                userDropdown.classList.toggle('visible');
                event.stopPropagation();
            });*/

            logOutButton.addEventListener('click', function (event) {
                localStorage.setItem("token", null);
                localStorage.setItem("usR", null);
                Swal.fire({
                    title: 'Hasta pronto',
                    text: 'Cierre de sesion exitoso',
                    icon: 'info',
                    confirmButtonText: 'Ok'
                }).then((result) => {
                    if (result.isConfirmed) {
                        window.location.href = '../index.html';
                    }
                })
            });

            /*document.addEventListener('click', function (event) {
                if (!userDropdown.contains(event.target) && !userIconBtn.contains(event.target)) {
                    userDropdown.classList.remove('visible');
                }
            });*/
        });
} else {
    fetch('./components/navbar.html')
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