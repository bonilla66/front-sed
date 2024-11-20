function decodeJWT(token) {
    try {
        const [, payload] = token.split('.');
        const decodedPayload = JSON.parse(atob(payload.replace(/-/g, '+').replace(/_/g, '/')));
        return decodedPayload;
    } catch (error) {
        console.error('Error al decodificar el JWT:', error);
        return null;
    }
}

function getUserRole() {
    const token = localStorage.getItem('token');
    if (!token) return null;

    const payload = decodeJWT(token);
    return payload?.rol || null;
}

function getUserId() {
    const token = localStorage.getItem('token');
    if (!token) return null;

    const payload = decodeJWT(token);
    return payload?.userId || null;
}

function verifyAccess(requiredRoles) {
    const userRole = getUserRole();
    if (!userRole) {
        alert("Acceso denegado. Inicia sesión para continuar.");
        window.location.href = '/marketplace/pages/login.html';
        return;
    }

    if (!requiredRoles.includes(userRole)) {
        alert("No tienes permiso para acceder a esta página.");
        window.location.href = '/marketplace/pages/unauthorized.html';
        return;
    }
}

const token = localStorage.getItem("token");
const usR = localStorage.getItem("usR");

if (usR !== null && usR === "superAdmin") {
    fetch('../components/navbar-super.html')
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
} else if (usR !== null && usR === "administrador") {
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
} else if (usR !== null && usR === "user" || usR === "usuario") {
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