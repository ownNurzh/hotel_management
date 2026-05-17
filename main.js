const { app, BrowserWindow, Menu, dialog } = require("electron/main");

const path = require("node:path");

const isMac = process.platform === "darwin";

const appIconPath = path.join(__dirname, "electron", "app-icon.png");

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
						icon: appIconPath,
					});
				},
			},
			,
			{ type: "separator" },
			{ role: "quit" },
		],
	},
];

const menu = Menu.buildFromTemplate(menuTemplate);
Menu.setApplicationMenu(menu);

const createWindow = () => {
	const win = new BrowserWindow({
		width: 800,
		height: 600,
		icon: appIconPath,
		webPreferences: {
			preload: path.join(__dirname, "electron", "preload.js"),
		},
	});
	if (app.isPackaged) {
		//win.loadFile("")
		console.log("production");
	} else {
		win.loadURL("http://localhost:3000/");
		console.log("development");
	}
};

app.whenReady().then(() => {
	createWindow();

	app.on("activate", () => {
		if (BrowserWindow.getAllWindows().length === 0) {
			createWindow();
		}
	});
});

app.on("window-all-closed", () => {
	if (process.platform !== "darwin") {
		app.quit();
	}
});
