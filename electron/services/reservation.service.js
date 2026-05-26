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
	deleteReservationById(id) {
		return this.db.prepare("DELETE FROM reservations WHERE id = ?").run(id);
	}
}

module.exports = Reservation;
