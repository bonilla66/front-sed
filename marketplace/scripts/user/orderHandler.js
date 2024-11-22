const BASE_URL = 'http://192.168.77.28:3000/api/';
const TOKEN_KEY = "token";

document.addEventListener("DOMContentLoaded", function () {
    fetch('../components/footer.html')
        .then(response => response.text())
        .then(template => {
            document.body.insertAdjacentHTML('beforeend', template);
        });
});

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

        fetch('../components/order-row.html')
            .then(response => response.text())
            .then(rowTemplate => {
                orders.forEach(order => {
                    const productsHtml = order.productos.map(product => `
                        <div class="product">
                            <p class="product-title">${product.titulo}</p>
                            <span class="product-color">Color: ${product.color}</span>
                            <span class="product-size">Talla: ${product.talla}</span>
                            <span class="product-quantity">Cantidad: ${product.cantidad}</span>
                            <p class="product-total">Precio unitario: $${product.total.toFixed(2)}</p>
                        </div>
                    `).join('');

                    const rowHtml = rowTemplate
                        .replace(/\${orderNum}/g, order.orden_id)
                        .replace(/\${date}/g, new Date(order.fecha).toLocaleString()) 
                        .replace(/\${totalOrder}/g, order.total_orden.toFixed(2))
                        .replace(/\${products}/g, productsHtml); 

                    rowsContainer.insertAdjacentHTML('beforeend', rowHtml);
                });
            });
    } catch (error) {
        console.log(error);
    }
}

renderOrders();
