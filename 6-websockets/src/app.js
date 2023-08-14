import express from "express";
import __dirname from "./utils.js";
import handlebars from "express-handlebars";
import productsRouter from "./routes/products.router.js";
import userRouter from "./routes/users.router.js";
import viewsRouter from "./routes/views.router.js";

import { Server } from "socket.io";

//--------------------------------------------------------------------------------------------------- EXPRESS
const app = express();
app.use(express.json()); //esto captura request y las transforma en json
app.use(express.urlencoded({ extended: true })); // esto permite capturar parametros de forma dinamica que llega a traves de query.params
app.use(express.static(__dirname + "/public")); // establece el servidor estatico de archivos - necesario para tener archivos js y css en plantillas

//--------------------------------------------------------------------------------------------------- HANDLEBARS
app.engine("handlebars", handlebars.engine()); //inicializa el motor de plantillas
app.set("views", __dirname + "/views"); //establece ruta de las vistas
app.set("view engine", "handlebars"); //establece el motor de renderizado

//--------------------------------------------------------------------------------------------------- ROUTES
app.use("/api/usuarios", userRouter);
app.use("/api/products", productsRouter);
app.use("/", viewsRouter);

app.get("/chat", (req, res) => {
	res.render("chat", {});
});

app.get("/", (req, res) => {
	res.render("index", {});
});
//--------------------------------------------------------------------------------------------------- WEBSOCKETS
export const messages = [
	{
		socketId: 1,
		message: "hola mundo",
	},
];

// ----------------------------------------------- Variables
const httpServer = app.listen(8080, () => {
	//este es el server http
	console.log("Escuchando el puerto 8080");
});
const socketServer = new Server(httpServer); //server para trabajar con sockets

socketServer.on("connection", (socket) => {
	console.log("nuevo cliente conectado");
	console.log(socket.id);

	let logs = [];
	socket.on("message2", (data) => {
		console.log(data);
		logs.push({ socketId: socket.id, message: data });

		socketServer.emit("log", { logs });
	});
	const products = [];
	socket.on("product", (data) => {
		products.push(data);
		socketServer.emit("sendingProducts", products);
	});

	// socket.on("message", (data) => {
	// 	console.log(data);
	// });

	// socket.emit(
	// 	"evento-para-el-cliente",
	// 	"este mensaje lo recibio el cliente DESDE el servidor"
	// );

	// socket.broadcast.emit(
	// 	"evento-para-todos-menos-el-socket-actual",
	// 	"este mensaje sera recibido para todos salvo para el socket que refresco"
	// );

	// socketServer.emit(
	// 	"evento-para-todos",
	// 	"Este mensaje los reciben todos los sockets conectados"
	// );
});

//--------------------------------------------------------------------------------------------------- ROUTES

//localhost = 127.0.0.1
