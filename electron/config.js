const path = require("node:path");
const fs = require("node:fs");
const { app } = require("electron/main");
const userDataPath = path.join(app.getPath("userData"), "UserData");
if (!fs.existsSync(userDataPath)) {
	fs.mkdirSync(userDataPath, { recursive: true });
}
const uploads = path.join(userDataPath, "uploads");
module.exports = {
	appIconPath: path.join(__dirname, "images", "app-icon.png"),
	userDataPath: userDataPath,
	uploads: uploads,
};
