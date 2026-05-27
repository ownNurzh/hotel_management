class User {
	constructor(db) {
		this.db = db;
	}
	getAll() {
		const sql = `
        SELECT
			users.*,
            roles.name AS role_name
        FROM users
        JOIN roles ON users.role_id = roles.id
    `;

		return this.db.prepare(sql).all();
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
	getByLogin(login) {
		const sql = `
        SELECT 
            users.id,
            users.first_name,
            users.second_name,
            users.login,
            roles.name AS role_name
        FROM users
        JOIN roles ON users.role_id = roles.id
        WHERE users.login = ?
    `;
		return this.db.prepare(sql).get(login);
	}
	deleteUserById(id) {
		return this.db.prepare("DELETE FROM users WHERE id = ?").run(id);
	}
}

module.exports = User;
