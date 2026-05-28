const { ipcMain } = require("electron");

const { roomService } = require("../services");

module.exports = () => {
	//room types
	ipcMain.handle(
		"roomTypes:create",
		(event, name, price, capacity, arrayFileBuffers) => {
			const result = roomService.createRoomType(
				name,
				price,
				capacity,
				arrayFileBuffers,
			);
			return result != null;
		},
	);
	ipcMain.handle("roomTypes:update", (event, id, name, price, capacity) => {
		const result = roomService.updateRoomType(id, name, price, capacity);
		return result != null;
	});

	ipcMain.handle("roomTypes:get", (event, login, password) => {
		return roomService.getAllRoomTypes();
	});
	ipcMain.handle("roomTypes:delete", (event, id) => {
		return roomService.deleteRoomTypeById(id);
	});
	// room
	ipcMain.handle("room:get", (event) => {
		return roomService.getAllRooms();
	});
	ipcMain.handle("room:create", (event, room_number, room_type_id) => {
		return roomService.createRoom(room_number, room_type_id);
	});
	ipcMain.handle(
		"room:update",
		(event, id, room_number, room_type_id, status) => {
			const result = roomService.updateRoom(
				id,
				room_number,
				room_type_id,
				status,
			);
			return result != null;
		},
	);
	ipcMain.handle("room:delete", (event, id) => {
		return roomService.deleteRoomById(id);
	});
	ipcMain.handle("room:getStatusCounts", (event) => {
		const result = roomService.getStatusCounts();
		return result;
	});
};
