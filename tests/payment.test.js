const PaymentService = require("../electron/services/payment.service");

describe("Guest", () => {
	let db;
	let payment;

	beforeEach(() => {
		db = {
			prepare: jest.fn(),
		};

		payment = new PaymentService(db);
	});

	test("getAll возвращает платежи", () => {
		const sql = "SELECT * FROM payments";
		const allMock = jest.fn().mockReturnValue(true);

		db.prepare.mockReturnValue({
			all: allMock,
		});

		const result = payment.getAll();

		expect(db.prepare).toHaveBeenCalledWith(sql);
		expect(allMock).toHaveBeenCalled();
		expect(result).toBe(true);
	});
	test("Create создает гостя", () => {
		const reservation_id = 1;
		const total_price = 500;
		const sql =
			"INSERT INTO payments (reservation_id,total_money) VALUES (?, ?)";
		const runMock = jest.fn().mockReturnValue(true);

		db.prepare.mockReturnValue({
			run: runMock,
		});

		const result = payment.create(reservation_id, total_price);

		expect(db.prepare).toHaveBeenCalledWith(sql);
		expect(runMock).toHaveBeenCalledWith(reservation_id, total_price);
		expect(result).toBe(true);
	});
});
