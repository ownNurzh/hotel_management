const authHandlers = require("./auth");
const sessiongHandlers = require("./session");
const userHandlers = require("./user");
const roomHandlers = require("./room");
const hotelHandlers = require("./hotel");

module.exports = () => {
	authHandlers();
	sessiongHandlers();
	userHandlers();
	roomHandlers();
	hotelHandlers();
};
