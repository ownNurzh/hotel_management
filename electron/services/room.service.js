const path = require("path");
const fs = require("fs");
const config = require("../config");
class Room {
	constructor(db) {
		this.db = db;
	}

	createRoomType(name, price, capacity, arrayFileBuffers) {
		const savedPaths = [];
		if (arrayFileBuffers?.length > 0) {
			for (const [index, value] of arrayFileBuffers.entries()) {
				const ext = path.extname(value.name);

				const fileName = `roomtype_${name}_${index}${ext}`;
				fs.writeFileSync(
					path.join(config.uploadsPath, fileName),
					Buffer.from(value.buffer),
				);
				savedPaths.push(fileName);
			}
		}
		const jsonSavedPath = JSON.stringify(savedPaths);

		return this.db
			.prepare(
				"INSERT INTO room_types (name,price,capacity,images) VALUES (?, ?, ?,?)",
			)
			.run(name, price, capacity, jsonSavedPath);
	}
	updateRoomType(id, name, price, capacity) {
		const sql = `
		UPDATE room_types
		SET name = ?, price = ?, capacity = ?
		WHERE id = ?
	`;
		return this.db.prepare(sql).run(name, price, capacity, id);
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
	updateRoom(id, room_number, room_type_id, status) {
		const sql = `
		UPDATE rooms
		SET room_number = ?, room_type_id = ?, status = ?
		WHERE id = ?
	`;
		return this.db.prepare(sql).run(room_number, room_type_id, status, id);
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
