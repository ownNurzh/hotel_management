const db = require("../db");
const UserService = require("./user.service");
const AuthService = require("./auth.service");
const SessionService = require("./session.service");
const RoomService = require("./room.service");

const userService = new UserService(db);
const sessionService = new SessionService();
const roomService = new RoomService(db);
module.exports = {
	userService: userService,
	authService: new AuthService(userService, sessionService),
	sessionService: sessionService,
	roomService: roomService,
};
