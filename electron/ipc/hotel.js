const { ipcMain } = require("electron");

const { hotelService } = require("../services");

module.exports = () => {
	ipcMain.handle("hotel:save", (event, data) => {
		const result = hotelService.save(data);
		return result;
	});
	ipcMain.handle("hotel:isExist", (event, login, password) => {
		const result = hotelService.isExist();
		return result;
	});
	ipcMain.handle("hotel:get", (event) => {
		const result = hotelService.get();
		return result;
	});
	ipcMain.handle("hotel:clear", (event) => {
		return hotelService.clear();
	});
};
