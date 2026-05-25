const Store = require("electron-store");
class Hotel {
	constructor() {
		this.store = new Store();
		this.hotelStoreName = "hotel";
	}
	save(data) {
		this.store.set(this.hotelStoreName, data);
	}

	get() {
		return this.store.get(this.hotelStoreName, null);
	}

	clear() {
		this.store.delete(this.hotelStoreName);
	}

	isExist() {
		return this.store.has(this.hotelStoreName);
	}
}
module.exports = Hotel;
