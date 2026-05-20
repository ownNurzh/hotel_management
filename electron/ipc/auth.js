const { ipcMain } = require("electron");

module.exports = () => {
	ipcMain.handle("auth:login", async (event, login, password) => {
		console.log(event, login, password);
		return false;
	});

	ipcMain.handle("auth:register", async (event, login, password) => {
		return false;
	});
};
