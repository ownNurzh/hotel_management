const UserService = require("../electron/services/user.service");

describe("Guest", () => {
	let db;
	let mainObj;

	beforeEach(() => {
		db = {
			prepare: jest.fn(),
		};

		mainObj = new UserService(db);
	});
	test("test", () => {
		expect(true).toBe(true);
	});
	test("getAll возвращает пользователей", () => {
		const sql = `
        SELECT
			users.*,
            roles.name AS role_name
        FROM users
        JOIN roles ON users.role_id = roles.id
    `;
		const allMock = jest.fn().mockReturnValue(true);

		db.prepare.mockReturnValue({
			all: allMock,
		});

		const result = mainObj.getAll();

		expect(db.prepare).toHaveBeenCalledWith(sql);
		expect(allMock).toHaveBeenCalled();
		expect(result).toBe(true);
	});
	test("create создает пользователей", () => {
		const sql =
			"INSERT INTO users (first_name,second_name,login, password, role_id) VALUES (?, ?, ?, ?, ?)";
		const runMock = jest.fn().mockReturnValue(true);
		const first_name = "first_name";
		const second_name = "second_name";
		const login = "login";
		const password = "password";
		const roleId = 1;
		db.prepare.mockReturnValue({
			run: runMock,
		});

		const result = mainObj.create(
			first_name,
			second_name,
			login,
			password,
			roleId,
		);

		expect(db.prepare).toHaveBeenCalledWith(sql);
		expect(runMock).toHaveBeenCalledWith(
			first_name,
			second_name,
			login,
			password,
			roleId,
		);
		expect(result).toBe(true);
	});
	test("test", () => {
		expect(true).toBe(true);
	});
});
