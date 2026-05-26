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
	deleteRoomTypeById(id) {
		return this.db.prepare("DELETE FROM room_types WHERE id = ?").run(id);
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
		const sql = `
		SELECT 
			rooms.*,
			room_types.name AS room_type_name
		FROM rooms
		LEFT JOIN room_types ON room_types.id = rooms.room_type_id
`;
		return this.db.prepare(sql).all();
	}
	deleteRoomById(id) {
		return this.db.prepare("DELETE FROM rooms WHERE id = ?").run(id);
	}
	getStatusCounts() {
		const sql = `
        WITH statuses(s) AS (
            VALUES (0), (1), (2), (3)
        )
        SELECT s AS status, COUNT(r.id) AS count
        FROM statuses
        LEFT JOIN rooms r ON r.status = s
        GROUP BY s
    `;
		return this.db.prepare(sql).all();
	}
}
module.exports = Room;
