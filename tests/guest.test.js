const GuestService = require("../electron/services/guest.service");

describe("Guest", () => {
	let db;
	let guest;

	beforeEach(() => {
		db = {
			prepare: jest.fn(),
		};

		guest = new GuestService(db);
	});

	test("getAll возвращает гостей", () => {
		const sql = "SELECT * FROM guests";
		const allMock = jest.fn().mockReturnValue(true);

		db.prepare.mockReturnValue({
			all: allMock,
		});

		const result = guest.getAll();

		expect(db.prepare).toHaveBeenCalledWith(sql);
		expect(allMock).toHaveBeenCalled();
		expect(result).toBe(true);
	});
	test("deleteGuestById удаляет гостя по айди", () => {
		const id = 1;
		const sql = "DELETE FROM guests WHERE id = ?";
		const runMock = jest.fn().mockReturnValue(true);

		db.prepare.mockReturnValue({
			run: runMock,
		});

		const result = guest.deleteGuestById(id);

		expect(db.prepare).toHaveBeenCalledWith(sql);
		expect(runMock).toHaveBeenCalledWith(id);
		expect(result).toBe(true);
	});
	test("Create создает гостя", () => {
		const first_name = "nurzh_f";
		const second_name = "nurzh_s";
		const document_number = "f12323";
		const sql =
			"INSERT INTO guests (first_name,second_name,document_number) VALUES (?, ?, ?)";
		const runMock = jest.fn().mockReturnValue(true);

		db.prepare.mockReturnValue({
			run: runMock,
		});

		const result = guest.create(first_name, second_name, document_number);

		expect(db.prepare).toHaveBeenCalledWith(sql);
		expect(runMock).toHaveBeenCalledWith(
			first_name,
			second_name,
			document_number,
		);
		expect(result).toBe(true);
	});
});
