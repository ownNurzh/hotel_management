const { contextBridge, ipcRenderer } = require("electron");

contextBridge.exposeInMainWorld("auth", {
	login: (login, password) => {
		return ipcRenderer.invoke("auth:login", login, password);
	},
});

contextBridge.exposeInMainWorld("session", {
	isLogged: () => {
		return ipcRenderer.invoke("session:isLogged");
	},
	get: () => {
		return ipcRenderer.invoke("session:get");
	},
	clear: () => {
		return ipcRenderer.invoke("session:clear");
	},
});
