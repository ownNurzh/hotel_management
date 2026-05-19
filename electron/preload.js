const { contextBridge, ipcRenderer } = require("electron");

contextBridge.exposeInMainWorld("auth", {
	login: (login, password) => {
		ipcRenderer.invoke("auth:login", login, password);
	},
});
