const BASE_URL = 'http://localhost:3000/api/';
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
   // window.location.href = '../pages/editing.html';
    window.location.href = `../pages/details.html`;
    return product;
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
        console.log(paginatedProducts);

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
        editButton();

    } catch (error) {
        console.error('Error rendering products:', error);
    }
};

function editButton() {
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

renderProducts();