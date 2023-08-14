import { Router } from "express";
import { messages } from "../app.js";

const router = Router();

router.get("/", (req, res) => {
	res.render("index", {
		style: "index.css",
		existMessages: false,
		messages: messages,
	});
});

router.get("/realtimeproducts", async (req, res) => {
	res.render("realTimeProducts", {
		style: "index.css",
	});
});

export default router;
