const { ipcMain } = require("electron");

const { authService } = require("../services");

module.exports = () => {
	ipcMain.handle("auth:login", (event, login, password) => {
		const result = authService.login(login, password);
		return result;
	});

	ipcMain.handle("auth:register", (event, login, password) => {
		return false;
	});
};
