const { ipcMain } = require("electron");

const { userService } = require("../services");

module.exports = () => {
	ipcMain.handle("user:getByLogin", (event, login) => {
		const result = userService.getByLogin(login);
		return result;
	});

	ipcMain.handle("user:getAll", (event) => {
		const result = userService.getAll();
		return result;
	});
};
