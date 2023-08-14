const socket = io();
function createProduct() {
	// deberiamos chequear que los inputs no esten vacios
	const titleInput = document.querySelector("#title");
	const descriptionInput = document.querySelector("#description");
	const priceInput = document.querySelector("#price");
	const codeInput = document.querySelector("#code");
	const stockInput = document.querySelector("#stock");
	const categoryInput = document.querySelector("#category");

	const productObject = {
		title: titleInput.value,
		description: descriptionInput.value,
		price: priceInput.value,
		code: codeInput.value,
		stock: stockInput.value,
		category: categoryInput.value,
	};

	socket.emit("product", productObject);

	titleInput.value = "";
	descriptionInput.value = "";
	priceInput.value = "";
	codeInput.value = "";
	stockInput.value = "";
	categoryInput.value = "";
}

socket.on("sendingProducts", (products) => {
	const productsDiv = document.querySelector("#products");
	let html = "";
	for (const prod in products) {
		if (products.hasOwnProperty(prod)) {
			const product = products[prod];
			html += `<div class="socket-product">
            <p>Title: ${product.title}</p>
            <p>Description: ${product.description}</p>
            <p>Price: ${product.price}</p>
            <p>Codigo: ${product.code}</p>
            <p>Stock: ${product.stock}</p>
            <p>Categoria: ${product.category}</p>
            </div>
            `;
		}
	}
	productsDiv.innerHTML = html; // Mostrar los productos en el div
});
/* title;
description;
price;
code;
stock;
category;
createProduct; */
//socket on para escuchar la recibida de datos
