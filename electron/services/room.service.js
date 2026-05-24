class Room {
	constructor(db) {
		this.db = db;
	}
	createRoomType(name, price, capacity) {
		return this.db
			.prepare(
				"INSERT INTO room_types (name,price,capacity) VALUES (?, ?, ?)",
			)
			.run(name, price, capacity);
	}
	getAllRoomTypes() {
		return this.db.prepare("SELECT * FROM room_types").all();
	}
	//
	createRoom(room_number, room_type_id) {
		return this.db
			.prepare(
				"INSERT INTO rooms (room_number,room_type_id) VALUES (?, ?)",
			)
			.run(room_number, room_type_id);
	}
	getAllRooms() {
		return this.db.prepare("SELECT * FROM rooms").all();
	}
}
module.exports = Room;
