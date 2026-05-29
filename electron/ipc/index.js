const authHandlers = require("./auth");
const sessiongHandlers = require("./session");
const userHandlers = require("./user");
const roomHandlers = require("./room");
const hotelHandlers = require("./hotel");
const guestHandlers = require("./guest");
const reservationHandlers = require("./reservation");
const paymentHandlers = require("./payment");

module.exports = () => {
	authHandlers();
	sessiongHandlers();
	userHandlers();
	roomHandlers();
	hotelHandlers();
	guestHandlers();
	reservationHandlers();
	paymentHandlers();
};
