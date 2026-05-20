const db = require("../db");
const UserService = require("./user.service");
const AuthService = require("./auth.service");

const userService = new UserService(db);
module.exports = {
	userService: userService,
	authService: new AuthService(userService),
};
