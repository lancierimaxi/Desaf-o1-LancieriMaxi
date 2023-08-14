const socket = io();

const input = document.getElementById("text");
const logM = document.getElementById("messages");

input.addEventListener("keyup", (e) => {
	if (e.key === "Enter") {
		socket.emit("message2", input.value);
		input.value = "";
	}
});

socket.on("log", (data) => {
	let logss = "";
	data.logs.forEach((log) => {
		logss += `<li>${log.socketId} dice: ${log.message} </li>`;
	});
	logM.innerHTML = logss;
});
