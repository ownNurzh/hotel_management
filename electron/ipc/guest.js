const { ipcMain } = require("electron");

const { guestService } = require("../services");

module.exports = () => {
	ipcMain.handle(
		"guest:create",
		(event, first_name, second_name, document_number) => {
			const result = guestService.create(
				first_name,
				second_name,
				document_number,
			);
			return result;
		},
	);

	ipcMain.handle("guest:get", (event) => {
		const result = guestService.getAll();
		return result;
	});
	ipcMain.handle("guest:delete", (event, id) => {
		const result = guestService.deleteGuestById(id);
		return result;
	});
};
