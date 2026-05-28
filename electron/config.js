const path = require("node:path");
const fs = require("node:fs");
const { app } = require("electron/main");
const userDataPath = path.join(app.getPath("userData"), "UserData");
const uploads = path.join(userDataPath, "uploads");
const initFilePath = (filePath) => {
	if (!fs.existsSync(filePath)) {
		fs.mkdirSync(filePath, { recursive: true });
	}
};
initFilePath(userDataPath);
initFilePath(uploads);

module.exports = {
	appIconPath: path.join(__dirname, "images", "app-icon.png"),
	userDataPath: userDataPath,
	uploads: uploads,
};
