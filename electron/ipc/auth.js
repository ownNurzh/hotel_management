const { ipcMain } = require("electron");

const { authService } = require("../services");

module.exports = (db) => {
	ipcMain.handle("auth:login", (event, login, password) => {
		const result = authService.login(login, password);
		console.log(result);
		return result;
	});

	ipcMain.handle("auth:register", (event, login, password) => {
		return false;
	});
};
