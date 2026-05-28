const { contextBridge, ipcRenderer } = require("electron");

contextBridge.exposeInMainWorld("auth", {
	login: (login, password) => {
		return ipcRenderer.invoke("auth:login", login, password);
	},
});

contextBridge.exposeInMainWorld("session", {
	isLogged: () => {
		return ipcRenderer.invoke("session:isLogged");
	},
	get: () => {
		return ipcRenderer.invoke("session:get");
	},
	clear: () => {
		return ipcRenderer.invoke("session:clear");
	},
});

contextBridge.exposeInMainWorld("user", {
	getByLogin: (login) => {
		return ipcRenderer.invoke("user:getByLogin", login);
	},
	getAll: () => {
		return ipcRenderer.invoke("user:getAll");
	},
	deleteUserById: (id) => {
		return ipcRenderer.invoke("user:delete", id);
	},
	create: (first_name, second_name, login, password, roleId) => {
		return ipcRenderer.invoke(
			"user:create",
			first_name,
			second_name,
			login,
			password,
			roleId,
		);
	},
	update: (id, first_name, second_name, login, password, roleId) => {
		return ipcRenderer.invoke(
			"user:update",
			id,
			first_name,
			second_name,
			login,
			password,
			roleId,
		);
	},
});

contextBridge.exposeInMainWorld("room", {
	//room types
	getAllRoomTypes: () => {
		return ipcRenderer.invoke("roomTypes:get");
	},
	createRoomType: (name, price, capacity, arrayFileBuffers) => {
		return ipcRenderer.invoke(
			"roomTypes:create",
			name,
			price,
			capacity,
			arrayFileBuffers,
		);
	},
	updateRoomType: (id, name, price, capacity, arrayFileBuffers) => {
		return ipcRenderer.invoke(
			"roomTypes:update",
			id,
			name,
			price,
			capacity,
			arrayFileBuffers,
		);
	},
	deleteRoomTypeById: (id) => {
		return ipcRenderer.invoke("roomTypes:delete", id);
	},
	// room
	getAllRooms: () => {
		return ipcRenderer.invoke("room:get");
	},
	createRoom: (room_number, room_type_id) => {
		return ipcRenderer.invoke("room:create", room_number, room_type_id);
	},
	updateRoom: (id, room_number, room_type_id, status) => {
		return ipcRenderer.invoke(
			"room:update",
			id,
			room_number,
			room_type_id,
			status,
		);
	},
	deleteRoomById: (id) => {
		return ipcRenderer.invoke("room:delete", id);
	},
	getStatusCounts: () => {
		return ipcRenderer.invoke("room:getStatusCounts");
	},
});

contextBridge.exposeInMainWorld("hotel", {
	isExist: () => {
		return ipcRenderer.invoke("hotel:isExist");
	},
	get: () => {
		return ipcRenderer.invoke("hotel:get");
	},
	clear: () => {
		return ipcRenderer.invoke("hotel:clear");
	},
	save: (data) => {
		return ipcRenderer.invoke("hotel:save", data);
	},
});

contextBridge.exposeInMainWorld("guest", {
	create: (first_name, second_name, document_number) => {
		return ipcRenderer.invoke(
			"guest:create",
			first_name,
			second_name,
			document_number,
		);
	},
	getAll: () => {
		return ipcRenderer.invoke("guest:get");
	},
	deleteGuestById: (id) => {
		return ipcRenderer.invoke("guest:delete", id);
	},
});

contextBridge.exposeInMainWorld("reservation", {
	create: (guest_id, room_id, check_in, check_out) => {
		return ipcRenderer.invoke(
			"reservation:create",
			guest_id,
			room_id,
			check_in,
			check_out,
		);
	},
	update: (id, room_id, check_in, check_out, status) => {
		return ipcRenderer.invoke(
			"reservation:update",
			id,
			room_id,
			check_in,
			check_out,
			status,
		);
	},
	getAll: () => {
		return ipcRenderer.invoke("reservation:get");
	},
	deleteReservationById: (id) => {
		return ipcRenderer.invoke("reservation:delete", id);
	},
	getStatusCounts: () => {
		return ipcRenderer.invoke("reservation:getStatusCounts");
	},
});

contextBridge.exposeInMainWorld("app", {
	openWindowForClient: () => ipcRenderer.send("main:openWindowForClient"),
});
