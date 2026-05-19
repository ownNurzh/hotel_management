const { app, BrowserWindow, Menu, dialog } = require("electron/main");

const path = require("node:path");

const config = require("./config");

const aboutText = `
Project : ${app.getVersion()}v
Electron : ${process.versions.electron}v
Node : ${process.versions.node}v
-
Қонақ үйді брондау және басқару жүйесі.
Система бронирования и управления отелями
Hotel reservation and management system
`;
const menuTemplate = [
	{
		label: app.name,
		submenu: [
			{
				label: "О проекте",
				click: () => {
					dialog.showMessageBox({
						title: "About",
						message: app.name,
						detail: aboutText,
						buttons: ["OK"],
						icon: config.appIconPath,
					});
				},
			},
			{ type: "separator" },
			{ role: "reload" },
			{ role: "forceReload" },
			{ role: "togglefullscreen" },
			{ role: "toggleDevTools" },
			{ type: "separator" },
			{ role: "quit" },
		],
	},
];

const menu = Menu.buildFromTemplate(menuTemplate);

module.exports = () => {
	Menu.setApplicationMenu(menu);
};
