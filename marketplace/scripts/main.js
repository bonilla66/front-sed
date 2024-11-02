let currentPage = 1;
const productsPerPage = 5;  // Número de productos a mostrar por página

function displayProducts(page) {
    const start = (page - 1) * productsPerPage;
    const end = start + productsPerPage;
    const productsContainer = document.getElementById("product-list");

    productsContainer.innerHTML = "";  // Limpiar productos anteriores

    // Mostrar productos de la página actual
    const productsToDisplay = products.slice(start, end);
    productsToDisplay.forEach(product => {
        const productDiv = document.createElement("div");
        productDiv.classList.add("product");

        productDiv.innerHTML = `
            <img src="${product.image}" alt="${product.name}">
            <h2>${product.name}</h2>
            <p>Precio: ${product.price}</p>
            <button>Comprar</button>
        `;

        productsContainer.appendChild(productDiv);
    });

    // Actualizar número de página
    document.getElementById("page-number").textContent = `Página ${page}`;
}

function nextPage() {
    if ((currentPage * productsPerPage) < products.length) {
        currentPage++;
        displayProducts(currentPage);
    }
}

function prevPage() {
    if (currentPage > 1) {
        currentPage--;
        displayProducts(currentPage);
    }
}
