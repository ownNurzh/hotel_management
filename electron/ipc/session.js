const { ipcMain } = require("electron");

const { sessionService } = require("../services");

module.exports = () => {
	ipcMain.handle("session:isLogged", (event, login, password) => {
		const result = sessionService.isLogged();
		return result;
	});
};
