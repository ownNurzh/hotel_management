class Guest {
	constructor(db) {
		this.db = db;
	}
	getAll() {
		return this.db.prepare("SELECT * FROM guests").all();
	}
	create(first_name, second_name, document_number) {
		return this.db
			.prepare(
				"INSERT INTO guests (first_name,second_name,document_number) VALUES (?, ?, ?)",
			)
			.run(first_name, second_name, document_number);
	}
	deleteGuestById(id) {
		return this.db.prepare("DELETE FROM guests WHERE id = ?").run(id);
	}
}

module.exports = Guest;
