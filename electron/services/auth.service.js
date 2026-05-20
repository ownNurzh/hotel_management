class Auth {
	constructor(userService) {
		this.userService = userService;
	}
	login(login, password) {
		let hash_password = password;
		return this.userService.login(login, hash_password);
	}
	register(first_name, second_name, login, password, role_id) {
		let hash_password = password;
		return this.userService.create(
			first_name,
			second_name,
			login,
			hash_password,
			role_id,
		);
	}
}

module.exports = Auth;
