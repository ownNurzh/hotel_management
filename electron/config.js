const path = require("node:path");
const { app } = require("electron/main");
module.exports = {
	appIconPath: path.join(__dirname, "electron", "images", "app-icon.png"),
	userDataPath: path.join(app.getPath("userData"), "UserData"),
};
