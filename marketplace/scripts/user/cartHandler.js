const BASE_URL = 'http://localhost:3000/api/';
const TOKEN_KEY = "token";
const container = document.getElementById('product-container');
const emptyCartButton = document.getElementById('btn-empty');
const modal = document.getElementById('payment-modal');

function isNumberFromString(valueToParse) {
    if (parseInt(valueToParse) > 0) {
        return true;
    } else {
        return false;
    }
}

function isDateFromString(valueToParse) {
    const values = valueToParse.split("/");
    console.log(values);
}

function showErrorMessage(message) {
    Swal.fire({
        title: 'Error!',
        text: message,
        icon: 'error',
        confirmButtonText: 'Ok'
    })
}

const getCart = async () => {
    try {
        const response = await fetch(`${BASE_URL}carrito`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${localStorage.getItem(TOKEN_KEY)}`,
                'Content-Type': 'application/json'
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

const emptyCart = async () => {
    try {
        const response = await fetch(`${BASE_URL}carrito`, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${localStorage.getItem(TOKEN_KEY)}`
            },
        });

        const responseData = await response.json();

        if (!response.ok) {
            showErrorMessage(responseData.message);
            throw new Error(`${response.status} ${responseData.statusText}`);
        }

        Swal.fire({
            title: 'Éxito',
            text: 'Carrito vaciado correctamente',
            icon: 'success',
            confirmButtonText: 'Ok'
        }).then((result) => {
            if (result.isConfirmed) {
                window.location.href = '../pages/products.html';
            }
        });
    } catch (error) {
        console.log(error);
    }
}

const buyCart = async () => {
    try {
        const response = await fetch(`${BASE_URL}ordenes`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${localStorage.getItem(TOKEN_KEY)}`
            },
        });

        const responseData = await response.json();

        if (!response.ok) {
            showErrorMessage(responseData.message);
            throw new Error(`${response.status} ${responseData.statusText}`);
        }

        Swal.fire({
            title: 'Éxito',
            text: 'Orden procesada correctamente',
            icon: 'success',
            confirmButtonText: 'Ok'
        })
    } catch (error) {
        console.log(error);
    }
}

const renderCart = async () => {
    try {
        const productsOnCart = await getCart();
        const rowsContainer = document.getElementById('buying-rows-container');

        if (productsOnCart.length === 0) {
            Swal.fire({
                title: "Aviso",
                text: "El carrito de compras está vacío",
                icon: "warning",
                confirmButtonColor: "#3085d6",
            }).then((result) => {
                window.location.href = '../pages/products.html';
            });
        }

        fetch('../components/buying-row.html')
            .then(response => response.text())
            .then(rowTemplate => {
                productsOnCart.forEach(product => {
                    const rowHtml = rowTemplate
                        .replace(/\${title}/g, product.titulo)
                        .replace(/\${size}/g, product.talla)
                        .replace(/\${color}/g, product.color)
                        .replace(/\${description}/g, product.descripcion)
                        .replace(/\${price}/g, product.precio.toFixed(2))
                        .replace(/\${image}/g, product.imagen);
                    rowsContainer.insertAdjacentHTML('beforeend', rowHtml);
                });

                /*const buyingRows = document.querySelectorAll('.buying-row');
                buyingRows.forEach(row => {
                    const deleteButton = row.querySelector('.delete-button');
                    deleteButton.addEventListener('click', function () {
                        row.remove();
                    });
                });*/


            });

        fetch('../components/pop-up.html')
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
            });
    } catch (error) {
        console.log(error);
    }
}

renderCart();

emptyCartButton.addEventListener('click', async (event) => {
    event.preventDefault();
    Swal.fire({
        title: "Cuidado",
        text: "Esta seguro/a que desea vaciar su carrito?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
    }).then((result) => {
        if (result.isConfirmed) {
            emptyCart();
        }
    });
})