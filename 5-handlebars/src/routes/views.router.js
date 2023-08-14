import { Router } from "express";
import { users } from "../app.js";

const router = Router();

router.get("/", (req, res) => {
	res.render("register", {
		users,
	});
});

export default router;
