const { ipcMain } = require("electron");

const { reservationService } = require("../services");

module.exports = () => {
	ipcMain.handle(
		"reservation:create",
		(event, guest_id, room_id, check_in, check_out) => {
			const result = reservationService.create(
				guest_id,
				room_id,
				check_in,
				check_out,
			);
			return result;
		},
	);
	ipcMain.handle(
		"reservation:update",
		(event, id, room_id, check_in, check_out, status) => {
			const result = reservationService.update(
				id,
				room_id,
				check_in,
				check_out,
				status,
			);
			return result != null;
		},
	);

	ipcMain.handle("reservation:get", (event) => {
		const result = reservationService.getAll();
		return result;
	});
	ipcMain.handle("reservation:delete", (event, id) => {
		const result = reservationService.deleteReservationById(id);
		return result;
	});
	ipcMain.handle("reservation:getStatusCounts", (event) => {
		const result = reservationService.getStatusCounts();
		return result;
	});
};
