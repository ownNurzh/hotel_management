const {
	app,
	BrowserWindow,
	Menu,
	dialog,
	protocol,
	ipcMain,
} = require("electron/main");

const path = require("node:path");
const fs = require("node:fs");
const config = require("./config");

const initMenu = require("./menu");

const allIpcHandlers = require("./ipc");

const initSeedDatas = require("./db/seed");

function initApp() {
	initSeedDatas();
	allIpcHandlers();
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
		win.loadFile(
			path.join(
				app.getAppPath(),
				"nuxt-app",
				".output",
				"public",
				"index.html",
			),
		);
		console.log("production");
	} else {
		win.loadURL("http://localhost:3000/");
		console.log("development");
	}
};
function createSecondWindow() {
	const win = new BrowserWindow({
		width: 1200,
		height: 700,
		icon: config.appIconPath,
		webPreferences: {
			preload: path.join(__dirname, "preload.js"),
		},
	});
	if (app.isPackaged) {
		win.loadFile(
			path.join(
				app.getAppPath(),
				"nuxt-app",
				".output",
				"public",
				"index.html",
			),
			{ hash: "/client" },
		);
	} else {
		console.log("CLIENT DEV");
		win.loadURL("http://localhost:3000/#client");
	}
}
app.disableHardwareAcceleration();
app.whenReady().then(() => {
	createWindow();
	initApp();
	app.on("activate", () => {
		if (BrowserWindow.getAllWindows().length === 0) {
			createWindow();
		}
	});
	protocol.registerFileProtocol("hotel", (request, callback) => {
		const filePath = request.url.replace("hotel://", "");
		callback(path.join(app.getPath("userData"), filePath));
	});
	ipcMain.on("main:openWindowForClient", () => {
		createSecondWindow();
	});
});

app.on("window-all-closed", () => {
	if (process.platform !== "darwin") {
		app.quit();
	}
});
