const BASE_URL = 'http://localhost:3000/api/';
const TOKEN_KEY = "token";

console.log(getUserId());

const getOrders = async () => {
    try {
        const response = await fetch(`${BASE_URL}ordenes`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${localStorage.getItem(TOKEN_KEY)}`,
            },
        });

        if (!response.ok) {
            throw new Error(`${response.status} ${response.statusText}`);
        }

        const responseData = await response.json();
        console.log(responseData)
        return responseData;
    } catch (error) {
        console.error(error);
    }
}

const renderOrders = async () => {
    try {
        const orders = await getOrders();
        const rowsContainer = document.getElementById('order-rows-container');

        if (orders.length === 0) {
            Swal.fire({
                title: "Aviso",
                text: "Aun no tienes ordenes. Realiza tu primera compra :)",
                icon: "warning",
                confirmButtonColor: "#3085d6",
            }).then((result) => {
                window.location.href = '../pages/products.html';
            });
        }

        /*fetch('../components/order-row.html')
            .then(response => response.text())
            .then(rowTemplate => {
                orders.forEach(order => {
                    const rowHtml = rowTemplate
                        .replace(/\${orderNum}/g, order.orden_id)
                        .replace(/\${date}/g, order.fecha)
                        .replace(/\${totalOrder}/g, order.total_orden.toFixed(2))
                    rowsContainer.insertAdjacentHTML('beforeend', rowHtml);
                });
            });*/

        fetch('../components/order-row.html')
            .then(response => response.text())
            .then(rowTemplate => {
                orders.forEach(order => {
                    // Construir HTML de los productos
                    const productsHtml = order.productos.map(product => `
                        <div class="product">
                            <p class="product-title">${product.titulo}</p>
                            <span class="product-color">Color: ${product.color}</span>
                            <span class="product-size">Talla: ${product.talla}</span>
                            <span class="product-quantity">Cantidad: ${product.cantidad}</span>
                            <p class="product-total">Precio unitario: $${product.total.toFixed(2)}</p>
                        </div>
                    `).join(''); // Combina todos los productos en un solo string

                    // Reemplazar valores en la plantilla de fila
                    const rowHtml = rowTemplate
                        .replace(/\${orderNum}/g, order.orden_id)
                        .replace(/\${date}/g, new Date(order.fecha).toLocaleString()) // Formato legible de fecha
                        .replace(/\${totalOrder}/g, order.total_orden.toFixed(2))
                        .replace(/\${products}/g, productsHtml); // Inserta los productos en la fila

                    // Agregar la fila al contenedor
                    rowsContainer.insertAdjacentHTML('beforeend', rowHtml);
                });
            });


        /*fetch('../components/pop-up.html')
            .then(response => response.text())
            .then(modalHtml => {
                document.body.insertAdjacentHTML('beforeend', modalHtml);
                const modal = document.getElementById('payment-modal');
                const btnBuy = document.getElementById('btn-buy');
                const closeModal = document.getElementsByClassName('close')[0];
                const buyCartBtn = document.getElementById('process-payment');

                btnBuy.onclick = function () {
                    modal.style.display = "block";
                }

                closeModal.onclick = function () {
                    modal.style.display = "none";
                }

                window.onclick = function (event) {
                    if (event.target == modal) {
                        modal.style.display = "none";
                    }
                }

                buyCartBtn.addEventListener('click', async (event) => {
                    event.preventDefault();
                    const cardNumber = document.getElementById("card-number").value;
                    const expiryDate = document.getElementById("expiry-date").value;
                    const cvv = document.getElementById("cvv").value;

                    if (cardNumber.trim() !== '' && expiryDate.trim() !== '' & cvv.trim() !== '') {
                        if (isNumberFromString(cardNumber) && isNumberFromString(cvv) && expiryDate[2] === '/') {
                            if (cardNumber.length === 16 && expiryDate.length === 5 && cvv.length === 3) {
                                await buyCart();
                            } else {
                                showErrorMessage("La longitud de uno o mas campos no es la esperada");
                            }
                        } else {
                            showErrorMessage("El formato de uno o mas campos no es el esperado")
                        }
                    } else {
                        showErrorMessage("Uno o mas campos estan vacios")
                    }
                })
            });*/
    } catch (error) {
        console.log(error);
    }
}

renderOrders();
