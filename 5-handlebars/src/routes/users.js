import { Router } from "express";
import { users } from "../app.js";

const router = Router();

router.post("/", (req, res) => {
	const { name, email, password } = req.body;
	users.push({ name, email, password });
	res.send("Usuario creado exitosamente!");
	//res.redirect("/"); //Redirige al home una vez realizada la accion
});

export default router;
