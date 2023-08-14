class ProductManager {
	constructor() {
		this.products = [];
	}
	getProducts() {
		return this.products;
	}

	validateProduct(product) {
		let validationResult = true;

		if (!product) {
			validationResult = false;
			throw new Error("ERROR! POR FAVOR AGREGUE UN PRODUCTO!");
		}
		if (this.products.some((PRODUCT) => PRODUCT.code === product.code)) {
			validationResult = false;
			console.error();
			throw new Error("ERROR! YA HAY UN PRODUCTO CON ESTE CODE!");
		}
		for (let key in product) {
			if (!product[key]) {
				validationResult = false;
				throw new Error(`El dato ${key} es requerido`);
			}
		}

		return validationResult; //esto siempre va a devolver true siempre
	}

	addProduct(product) {
		const newProduct = {
			title: product.title,
			description: product.description,
			price: product.price,
			thumbnail: product.thumbnail,
			code: product.code,
			stock: product.stock,
		};

		const validationResult = this.validateProduct(newProduct);

		if (validationResult) {
			newProduct.id = this.products === 0 ? 1 : this.products.length + 1;
			this.products.push(newProduct);
		}
	}

	getProductById(productId) {
		if (productId <= 0 || productId > this.products.length) {
			throw new Error("ERROR: Producto no encontrado");
		} else {
			return this.products.find((product) => product.id === productId);
		}
	}
}
const productoVacio = {};
const producto = {
	title: "test",
	description: "testeando desc",
	price: 123,
	thumbnail: "https://url.com",
	code: "abc",
	stock: 123,
};
const producto2 = {
	title: "test",
	description: "testeando desc",
	price: 123,
	thumbnail: "https://url.com",
	code: "abc123",
	stock: 123,
};
const producto3 = {
	title: "",
	description: "testeando desc",
	price: 123,
	thumbnail: "https://url.com",
	code: "abc1234",
	stock: 123,
};

const productManager = new ProductManager();

console.log("=== empty getProducts ===>", productManager.getProducts());
console.log(" ");
console.log("=== Adding prodcuts ===");
//productManager.addProduct(productoVacio);
productManager.addProduct(producto);
productManager.addProduct(producto2);
//productManager.addProduct(producto3);
console.log("=== full getProducts ===>", productManager.getProducts());
console.log(" ");
console.log("=== getProductById ===>");
console.log(productManager.getProductById(1));
console.log("e", productManager.getProductById(-1));
