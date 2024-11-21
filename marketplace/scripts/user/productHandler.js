const BASE_URL = 'http://127.0.0.1:3000/api/';
const TOKEN_KEY = "token";
const container = document.getElementById('product-container');
const productList = document.getElementById('product-list');

function showErrorMessage(message) {
    Swal.fire({
        title: 'Error!',
        text: message,
        icon: 'error',
        confirmButtonText: 'Ok'
    })
}

const getAllProducts = async () => {
    try {
        const response = await fetch(`${BASE_URL}productos`, {
            method: 'GET'
        })

        if (!response.ok) {
            throw new Error(`${response.status} ${response.statusText}`);
        }

        const responseData = await response.json();
        return responseData;
    } catch (error) {
        console.error(error);
    }
}

const getOneProduct = async (productId) => {
    let productsData = await getAllProducts();
    let product = productsData.find(product => product._id === productId);
    console.log(product);
    localStorage.setItem('productToView', JSON.stringify(product));
    console.log(localStorage.getItem('productToView'));
    window.location.href = `../pages/details.html`;
    return product;
}

const addToCart = async (productId) => {
    try {
        let data = {
            cantidad: 1
        }
        let requestData = JSON.stringify(data);

        const response = await fetch(`${BASE_URL}carrito/${productId}`, {
            method: 'PUT',
            headers: {
                'Authorization': `Bearer ${localStorage.getItem(TOKEN_KEY)}`,
                'Content-Type': 'application/json'
            },
            body: requestData
        })

        const responseData = await response.json();

        if (!response.ok && response.status !== 200) {
            if (localStorage.getItem(TOKEN_KEY == null)) {
                Swal.fire({
                    title: 'Error',
                    text: 'Debe iniciar sesión para agregar productos al carrito',
                    icon: 'error',
                    confirmButtonText: 'Ok',
                }).then((result) => {
                    if (result.isConfirmed) {
                        localStorage.setItem(TOKEN_KEY, null);
                        window.location.href = '../pages/login.html';
                    }
                })
            } else if (responseData.message === "Token inválido o expirado") {
                Swal.fire({
                    title: 'Error',
                    text: 'Sesión expirada. Por favor inicie sesión nuevamente',
                    icon: 'error',
                    confirmButtonText: 'Ok',
                }).then((result) => {
                    if (result.isConfirmed) {
                        localStorage.setItem(TOKEN_KEY, null);
                        window.location.href = '../pages/login.html';
                    }
                })
            } else {
                showErrorMessage(responseData.message);
            }
            throw new Error(`${response.status} ${response.statusText}`);
        }

        Swal.fire({
            title: 'Éxito',
            text: 'Producto agregado al carrito',
            icon: 'success',
            showCancelButton: true,
            confirmButtonText: 'Ir al carrito',
            cancelButtonText: 'Ok',
            confirmButtonColor: "#133E87",
            cancelButtonColor: "#adadad",
            customClass: {
                confirmButton: 'order-1 right-gap',
                cancelButton: 'order-2',
                actions: 'my-actions',
            },
        }).then((result) => {
            if (result.isConfirmed) {
                window.location.href = '../pages/buying.html';
            }
        });
    } catch (error) {

    }
}

const renderProducts = async () => {
    try {
        const productsData = await getAllProducts();

        if (!productsData) {
            console.error('No se pudieron obtener los productos.');
            return;
        }

        const itemsPerPage = 12;
        let currentPage = 0;
        const startIndex = currentPage * itemsPerPage;
        const endIndex = startIndex + itemsPerPage;
        const paginatedProducts = productsData.slice(startIndex, endIndex);

        paginatedProducts.forEach(product => {
            fetch('../components/product-card.html')
                .then(response => response.text())
                .then(template => {
                    const card = template
                        .replace(/{{titulo}}/g, product.titulo)
                        .replace(/{{size}}/g, product.talla)
                        .replace(/{{precio}}/g, product.precio.toFixed(2))
                        .replace(/{{imagen}}/g, product.imagenes[0].url)
                        .replace(/{{id}}/g, product._id);
                    container.innerHTML += card;
                });
        });
        detailsButton();
        addToCartButton();

    } catch (error) {
        console.error('Error rendering products:', error);
    }
};

function detailsButton() {
    container.addEventListener('click', event => {
        if (event.target.classList.contains('details-button') || event.target.closest('.details-button')) {
            const card = event.target.closest('.product-card');
            if (card) {
                let productId = card.getAttribute('data-id');
                getOneProduct(productId);
            }
        }
    });
}

function addToCartButton() {
    container.addEventListener('click', event => {
        if (event.target.classList.contains('buy-button') || event.target.closest('.buy-button')) {
            const card = event.target.closest('.product-card');
            if (card) {
                let productId = card.getAttribute('data-id');
                addToCart(productId);
            }
        }
    });
}

renderProducts();