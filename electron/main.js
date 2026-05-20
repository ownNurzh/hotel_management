const { app, BrowserWindow, Menu, dialog } = require("electron/main");

const path = require("node:path");
const fs = require("node:fs");
const config = require("./config");
const initMenu = require("./menu");
const db = require("./db");
const authHandlers = require("./ipc/auth");

function initApp() {
	authHandlers(db);
	if (!fs.existsSync(config.userDataPath)) {
		fs.mkdirSync(config.userDataPath, { recursive: true });
	}
}
initMenu();
const createWindow = () => {
	const win = new BrowserWindow({
		width: 1200,
		height: 700,
		icon: config.appIconPath,
		webPreferences: {
			preload: path.join(__dirname, "preload.js"),
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
	initApp();
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
