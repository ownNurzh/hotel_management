const { contextBridge, ipcRenderer } = require("electron");

contextBridge.exposeInMainWorld("auth", {
	login: (login, password) => {
		return ipcRenderer.invoke("auth:login", login, password);
	},
});
