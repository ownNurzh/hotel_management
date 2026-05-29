const db = require("../db");
const UserService = require("./user.service");
const AuthService = require("./auth.service");
const SessionService = require("./session.service");
const RoomService = require("./room.service");
const HotelService = require("./hotel.service");
const GuestService = require("./guest.service");
const ReservationService = require("./reservation.service");
const PaymentService = require("./payment.service");

const userService = new UserService(db);
const sessionService = new SessionService();
const roomService = new RoomService(db);
const guestService = new GuestService(db);
const paymentService = new PaymentService(db);
const reservationService = new ReservationService(
	db,
	paymentService,
	roomService,
);
module.exports = {
	userService: userService,
	authService: new AuthService(userService, sessionService),
	sessionService: sessionService,
	roomService: roomService,
	hotelService: new HotelService(),
	guestService: guestService,
	reservationService: reservationService,
	paymentService: paymentService,
};
