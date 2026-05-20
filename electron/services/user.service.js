class User {
	constructor(db) {
		this.db = db;
	}
	getAll() {
		return this.db.prepare("SELECT * FROM users").all();
	}
	create(first_name, second_name, login, password, roleId) {
		return this.db
			.prepare(
				"INSERT INTO users (first_name,second_name,login, password, role_id) VALUES (?, ?, ?, ?, ?)",
			)
			.run(first_name, second_name, login, password, roleId);
	}
	login(login, password) {
		return this.db
			.prepare("SELECT * FROM users WHERE login = ? AND password = ?")
			.get(login, password);
	}
}

module.exports = User;
