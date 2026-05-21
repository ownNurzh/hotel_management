const Store = require("electron-store");
class Session {
	constructor() {
		this.store = new Store();
		this.sessiongName = "session";
	}
	save(data) {
		this.store.set(this.sessiongName, data);
	}

	get() {
		return this.store.get(this.sessiongName, null);
	}

	clear() {
		this.store.delete(this.sessiongName);
	}

	isLogged() {
		return this.store.has(this.sessiongName);
	}
}
module.exports = Session;
