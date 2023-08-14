import { Router } from "express";
import ProductManager from "../ProductManager.js";

const router = Router();
const productManager = new ProductManager("./src/data.json");

router.get("/", async (req, res) => {
	const products = await productManager.getProducts();
	res.send({ status: "success", payload: { products } });
});

router.post("/", async (req, res) => {
	const body = req.body;
	await productManager.addProduct(body);
	res.send({
		status: "success",
		message: `${Object.values(body)}`,
	});
});

export default router;
