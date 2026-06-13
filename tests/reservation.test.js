const ReservationService = require("../electron/services/reservation.service");

describe("Guest", () => {
	let db;
	let mainObj;
	let paymentService;
	let roomService;

	beforeEach(() => {
		db = {
			prepare: jest.fn(),
		};
		paymentService = {
			create: jest.fn(),
		};
		roomService = {
			getRoomById: jest.fn(),
			getRoomTypeById: jest.fn(),
			updateRoom: jest.fn(),
		};

		mainObj = new ReservationService(db, paymentService, roomService);
	});
	test("test", () => {
		expect(true).toBe(true);
	});
	test("getAll возвращает брони", () => {
		const sql = "SELECT * FROM reservations";
		const allMock = jest.fn().mockReturnValue(true);

		db.prepare.mockReturnValue({
			all: allMock,
		});

		const result = mainObj.getAll();

		expect(db.prepare).toHaveBeenCalledWith(sql);
		expect(allMock).toHaveBeenCalled();
		expect(result).toBe(true);
	});
	test("Create создает бронь", () => {
		const guest_id = 1;
		const room_id = 1;
		const check_in = "2026-06-12";
		const check_out = "2026-06-15";
		const sql =
			"INSERT INTO reservations (guest_id,room_id,check_in,check_out) VALUES (?, ?, ?,?)";
		const runMock = jest.fn().mockReturnValue({ lastInsertRowid: 1 });
		roomService.getRoomById.mockReturnValue({
			status: 0,
			room_type_id: 1,
			id: 1,
			room_number: "test",
		});
		roomService.getRoomTypeById.mockReturnValue({ price: 500 });

		db.prepare.mockReturnValue({
			run: runMock,
		});

		const spy = jest.spyOn(mainObj, "getTotalPrice").mockReturnValue(1000);

		const result = mainObj.create(guest_id, room_id, check_in, check_out);
		expect(roomService.getRoomTypeById).toHaveBeenCalledWith(1);
		expect(roomService.updateRoom).toHaveBeenCalledWith(1, "test", 1, 1);
		expect(spy).toHaveBeenCalledWith(check_in, check_out, 500);
		expect(paymentService.create).toHaveBeenCalledWith(1, 1000);
		expect(result.status).toBe(true);
		expect(db.prepare).toHaveBeenCalledWith(sql);
		expect(runMock).toHaveBeenCalledWith(
			guest_id,
			room_id,
			check_in,
			check_out,
		);
	});
	test("deleteReservationById удаляет бронь", () => {
		const id = 1;
		const sql = "DELETE FROM reservations WHERE id = ?";
		const runMock = jest.fn().mockReturnValue(true);

		db.prepare.mockReturnValue({
			run: runMock,
		});

		const result = mainObj.deleteReservationById(id);

		expect(db.prepare).toHaveBeenCalledWith(sql);
		expect(runMock).toHaveBeenCalledWith(id);
		expect(result).toBe(true);
	});
	test("test", () => {
		expect(true).toBe(true);
	});
});
