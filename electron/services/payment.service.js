class Payment {
	constructor(db) {
		this.db = db;
	}
	create(reservation_id, total_price) {
		return this.db
			.prepare(
				"INSERT INTO payments (reservation_id,total_money) VALUES (?, ?)",
			)
			.run(reservation_id, total_price);
	}
	getAll() {
		return this.db.prepare("SELECT * FROM payments").all();
	}
}
module.exports = Payment;
