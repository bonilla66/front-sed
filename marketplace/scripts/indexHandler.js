const BASE_URL = 'http://127.0.0.1:3000/api/';
const container = document.getElementById("product-container");
const productList = document.getElementById('product-list');
const logOutBtn = document.getElementById("logout-button");

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
    window.location.href = `./pages/details.html`;
    return product;
}

const renderProducts = async () => {
    try {
        const productsData = await getAllProducts();

        if (!productsData) {
            console.error('No se pudieron obtener los productos.');
            return;
        }

        productsData.forEach(product => {
            fetch('./components/product-index.html')
                .then(response => {
                    if (!response.ok) {
                        throw new Error('La respuesta de la red no fue la esperada');
                    }
                    return response.text();
                })
                .then(template => {
                    container.insertAdjacentHTML('beforeend', template);
                    const productCard = container.lastElementChild;
                    productCard.querySelector('.product-image').src = product.imagenes[0].url;
                    productCard.querySelector('.product-image').alt = `Imagen de ${product.titulo}`;
                    productCard.querySelector('.product-title').textContent = product.titulo;
                    productCard.querySelector('.product-color').textContent = `Color: ${product.color}`;
                    productCard.querySelector('.product-size').textContent = `Talla: ${product.talla}`;
                    productCard.querySelector('.product-price').textContent = `$${product.precio.toFixed(2)}`;
                    productCard.querySelector('.view-details').addEventListener('click', function () {
                        getOneProduct(product._id);
                    });
                })
                .catch(error => console.error('Error:', error))
        })

    } catch (error) {
        console.error('Error al renderizar los productos:', error);
    }
}

renderProducts();

/*logOutBtn.addEventListener('click', event => {
    event.preventDefault();
    console.log("yass")
    localStorage.setItem("token", null);
    localStorage.setItem("usR", null);
    window.location.href = '../index.html';
})*/