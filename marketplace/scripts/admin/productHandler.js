const BASE_URL = 'http://localhost:3000/api/';
const TOKEN_KEY = "token";
const productList = document.getElementById('product-list');
const addProductForm = document.getElementById("add-product");
const editProductForm = document.getElementById("edit-product");

function showErrorMessage(message) {
    Swal.fire({
        title: 'Error!',
        text: message,
        icon: 'error',
        confirmButtonText: 'Ok'
    })
}

function changePage(direction) {
    currentPage += direction;
    displayProducts();
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
    localStorage.setItem('productToEdit', JSON.stringify(product));
    console.log(localStorage.getItem('productToEdit'));
    window.location.href = '../pages/editing.html';
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
            fetch('../components/own-card.html')
                .then(response => {
                    if (!response.ok) {
                        throw new Error('La respuesta de la red no fue la esperada');
                    }
                    return response.text();
                })
                .then(template => {
                    const cardHTML = template
                        .replace(/{{titulo}}/g, product.titulo)
                        .replace(/{{marca}}/g, product.marca)
                        .replace(/{{color}}/g, product.color)
                        .replace(/{{talla}}/g, product.talla)
                        .replace(/{{precio}}/g, product.precio.toFixed(2))
                        .replace(/{{descripcion}}/g, product.descripcion)
                        .replace(/{{imagen}}/g, product.imagenes[0].url)
                        .replace(/{{id}}/g, product._id);

                    if (productList !== null)
                        productList.innerHTML += cardHTML;

                })
                .catch(error => console.error('Error fetching card template:', error));
        });

        editButton();
        deleteButton();

    } catch (error) {
        console.error('Error rendering products:', error);
    }
};

if (productList !== null) {
    renderProducts();
}

function editButton() {
    productList.addEventListener('click', event => {
        if (event.target.classList.contains('edit-button') || event.target.closest('.edit-button')) {
            const card = event.target.closest('.own-card');
            if (card) {
                let productId = card.getAttribute('data-id');
                getOneProduct(productId);
            }
        }
    });
}

function deleteButton() {
    productList.addEventListener('click', event => {
        if (event.target.classList.contains('delete-button') || event.target.closest('.delete-button')) {
            const card = event.target.closest('.own-card');
            if (card) {
                const productId = card.getAttribute('data-id');
                Swal.fire({
                    title: "Cuidado",
                    text: "Esta seguro/a de eliminar este producto? Esta accion es irreversible",
                    icon: "warning",
                    showCancelButton: true,
                    confirmButtonColor: "#3085d6",
                    cancelButtonColor: "#d33",
                }).then((result) => {
                    if (result.isConfirmed) {
                        deleteProduct(productId);
                    }
                });
            }
        }
    });
}

const deleteProduct = async (productId) => {
    try {
        const response = await fetch(`${BASE_URL}productos/${productId}`, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${localStorage.getItem(TOKEN_KEY)}`
            }
        })

        const responseData = await response.json();

        if (!response.ok && response.status !== 200) {
            showErrorMessage(responseData.message)
            throw new Error(`${response.status} ${response.statusText}`);
        }

        Swal.fire({
            title: 'Exito',
            text: 'Producto eliminado correctamente',
            icon: 'success',
            confirmButtonText: 'Ok'
        })

    } catch (error) {
        console.log(error);
    }
}

if (addProductForm !== null) {
    addProductForm.addEventListener("submit", async (event) => {
        event.preventDefault();
        let title = document.getElementById("title").value;
        let description = document.getElementById("description").value;
        let size = document.getElementById("size").value;
        let color = document.getElementById("color").value;
        let price = parseFloat(document.getElementById("price").value);
        let brand = document.getElementById("brand").value;
        let image = document.getElementById("image").value;

        if (title.trim() === '' || description.trim() === '' || size.trim() === '' || color.trim() === ''
            || price <= 0.00 || brand.trim() === '' || image.trim() === '') {
            const message = 'Campos vacios o solamente contienen espacios. Por favor verificar'
            showErrorMessage(message)
        } else {
            try {
                let data = {
                    titulo: title,
                    descripcion: description,
                    precio: price,
                    color: color,
                    talla: size,
                    marca: brand,
                    imagenes: [{
                        url: image
                    }]
                }
                let requestData = JSON.stringify(data);

                const response = await fetch(`${BASE_URL}productos`, {
                    method: 'POST',
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem(TOKEN_KEY)}`,
                        'Content-Type': 'application/json'
                    },
                    body: requestData
                })

                const responseData = await response.json();

                if (!response.ok && response.status !== 200) {
                    showErrorMessage(responseData.message)
                    throw new Error(`${response.status} ${response.statusText}`);
                }

                Swal.fire({
                    title: 'Exito',
                    text: 'Producto agregado correctamente',
                    icon: 'success',
                    confirmButtonText: 'Ok',
                    customClass: {
                        actions: 'my-actions',
                    },
                }).then((result) => {
                    if (result.isConfirmed) {
                        localStorage.setItem('productToEdit', null);
                        window.location.href = '../pages/all-products.html';
                    }
                })

            } catch (error) {
                console.error(error);
            }
        }
    });
} else if (editProductForm !== null) {
    document.addEventListener('DOMContentLoaded', () => {
        const productToEdit = JSON.parse(localStorage.getItem('productToEdit'));

        if (productToEdit) {
            document.getElementById('title').value = productToEdit.titulo;
            document.getElementById('description').value = productToEdit.descripcion;
            document.getElementById('price').value = productToEdit.precio;
            document.getElementById('brand').value = productToEdit.marca;
            document.getElementById('size').value = productToEdit.talla;
            document.getElementById('color').value = productToEdit.color;
            document.getElementById('image').value = productToEdit.imagenes[0].url;
        }
    });

    editProductForm.addEventListener("submit", async (event) => {
        event.preventDefault();
        const product = JSON.parse(localStorage.getItem('productToEdit'));

        let id = product._id;
        let title = document.getElementById("title").value;
        let description = document.getElementById("description").value;
        let size = document.getElementById("size").value;
        let color = document.getElementById("color").value;
        let price = parseFloat(document.getElementById("price").value);
        let brand = document.getElementById("brand").value;
        let image = document.getElementById("image").value;

        console.log(id);

        if (title.trim() === '' || description.trim() === '' || size.trim() === '' || color.trim() === ''
            || price <= 0.00 || brand.trim() === '' || image.trim() === '') {
            const message = 'Campos vacios o solamente contienen espacios. Por favor verificar'
            showErrorMessage(message)
        } else {
            try {
                let data = {
                    titulo: title,
                    descripcion: description,
                    precio: price,
                    color: color,
                    talla: size,
                    marca: brand,
                    imagenes: [{
                        url: image
                    }]
                }
                let requestData = JSON.stringify(data);

                const response = await fetch(`${BASE_URL}productos/${id}`, {
                    method: 'PUT',
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem(TOKEN_KEY)}`,
                        'Content-Type': 'application/json'
                    },
                    body: requestData
                })

                const responseData = await response.json();

                if (!response.ok && response.status !== 200) {
                    if (responseData.message === "Token inválido o expirado") {
                        Swal.fire({
                            title: 'Error',
                            text: 'Sesión expirada. Por favor inicie sesión nuevamente',
                            icon: 'success',
                            confirmButtonText: 'Ok',
                            /*customClass: {
                                actions: 'my-actions',
                            },*/
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
                    title: 'Exito',
                    text: 'Producto agregado correctamente',
                    icon: 'success',
                    confirmButtonText: 'Ok',
                    customClass: {
                        actions: 'my-actions',
                    },
                }).then((result) => {
                    if (result.isConfirmed) {
                        window.location.href = '../pages/all-products.html';
                    }
                })

            } catch (error) {
                console.error(error);
            }
        }
    });
}