const { ipcMain } = require("electron");

const { roomService } = require("../services");

module.exports = () => {
	ipcMain.handle("roomTypes:create", (event, name, price, capacity) => {
		const result = roomService.createRoomType(name, price, capacity);
		return result != null;
	});

	ipcMain.handle("roomTypes:get", (event, login, password) => {
		return roomService.getAllRoomTypes();
	});
};
