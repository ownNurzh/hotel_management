const db = require("../db");
const UserService = require("./user.service");
const AuthService = require("./auth.service");
const SessionService = require("./session.service");

const userService = new UserService(db);
const sessionService = new SessionService();
module.exports = {
	userService: userService,
	authService: new AuthService(userService, sessionService),
	sessionService: sessionService,
};
