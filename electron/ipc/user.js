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
	ipcMain.handle(
		"user:create",
		(event, first_name, second_name, login, password, roleId) => {
			const result = userService.create(
				first_name,
				second_name,
				login,
				password,
				roleId,
			);
			return result;
		},
	);
	ipcMain.handle(
		"user:update",
		(event, id, first_name, second_name, login, password, roleId) => {
			const result = userService.update(
				id,
				first_name,
				second_name,
				login,
				password,
				roleId,
			);
			return result;
		},
	);
	ipcMain.handle("user:delete", (event, id) => {
		const result = userService.deleteUserById(id);
		return result;
	});
};
