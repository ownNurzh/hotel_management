const { ipcMain } = require("electron");

const db = require("./db");

module.exports = (db) => {
	ipcMain.handle("auth:login", async (event, login, password) => {
		console.log(event);
		return false;
	});

	ipcMain.handle("auth:register", async (event, login, password) => {
		return false;
	});
};
