class Auth {
	constructor(userService, sessionService) {
		this.userService = userService;
		this.sessionService = sessionService;
	}
	login(login, password) {
		let hash_password = password;
		const result = this.userService.login(login, hash_password);
		const answer = result != undefined;
		if (answer) {
			this.sessionService.save({ login: result.login });
		}
		return answer;
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
