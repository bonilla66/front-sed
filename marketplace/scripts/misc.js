const urlParams = new URLSearchParams(window.location.search);
const productId = urlParams.get('id');

const product = JSON.parse(localStorage.getItem('productToView'));
//const product = products.find(p => p.id == productId);

if (product) {
    document.getElementById('product-name').textContent = product.titulo;
    document.getElementById('product-brand').textContent = `Marca: ${product.marca}`;
    document.getElementById('product-price').textContent = `$${product.precio.toFixed(2)}`;
    document.getElementById('product-status').textContent = product.descripcion;
    document.getElementById('product-size').textContent = `Talla: ${product.talla}`;
    document.getElementById('image-container').innerHTML = `<img src="${product.imagenes[0].url}" alt="${product.titulo}" class="product-image">`;
} else {
    document.getElementById('product-details').innerHTML = '<p>Producto no encontrado.</p>';
}

document.addEventListener("DOMContentLoaded", function () {
    fetch('../components/footer.html')
        .then(response => response.text())
        .then(template => {
            document.body.insertAdjacentHTML('beforeend', template);
        });


});

const token = localStorage.getItem("token");
const usR = localStorage.getItem("usR");

if (token !== null) {
    const loginElement = document.getElementById("loginLabel");
    if (loginElement) {
        loginElement.style.display = "none";
    }
}

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
} else if (usR !== null && usR === "usuario" || usR === "user") {
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