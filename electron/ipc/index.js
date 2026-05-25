const authHandlers = require("./auth");
const sessiongHandlers = require("./session");
const userHandlers = require("./user");
const roomHandlers = require("./room");
module.exports = () => {
	authHandlers();
	sessiongHandlers();
	userHandlers();
	roomHandlers();
};
