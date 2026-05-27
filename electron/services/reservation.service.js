class Reservation {
	constructor(db) {
		this.db = db;
	}
	getAll() {
		return this.db.prepare("SELECT * FROM reservations").all();
	}
	create(guest_id, room_id, check_in, check_out) {
		return this.db
			.prepare(
				"INSERT INTO reservations (guest_id,room_id,check_in,check_out) VALUES (?, ?, ?,?)",
			)
			.run(guest_id, room_id, check_in, check_out);
	}
	update(id, room_id, check_in, check_out, status) {
		const sql = `
		UPDATE reservations
		SET room_id = ?, check_in = ?, check_out = ?, status = ?
		WHERE id = ?
	`;
		return this.db
			.prepare(sql)
			.run(room_id, check_in, check_out, status, id);
	}
	deleteReservationById(id) {
		return this.db.prepare("DELETE FROM reservations WHERE id = ?").run(id);
	}
	getStatusCounts() {
		const sql = `
        WITH statuses(s) AS (
            VALUES (0), (1), (2), (3)
        )
        SELECT s AS status, COUNT(r.id) AS count
        FROM statuses
        LEFT JOIN reservations r ON r.status = s
        GROUP BY s
    `;
		return this.db.prepare(sql).all();
	}
}

module.exports = Reservation;
