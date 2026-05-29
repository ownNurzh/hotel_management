const { ipcMain } = require("electron");

const { paymentService } = require("../services");

module.exports = () => {
	ipcMain.handle("payment:get", (event) => {
		const result = paymentService.getAll();
		return result;
	});
};
