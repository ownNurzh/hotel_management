const AuthService = require("../electron/services/auth.service");

describe("Auth", () => {
	let userService;
	let sessionService;
	let auth;

	beforeEach(() => {
		userService = {
			login: jest.fn(),
			create: jest.fn(),
		};

		sessionService = {
			save: jest.fn(),
		};

		auth = new AuthService(userService, sessionService);
	});
	test("test", () => {
		expect(true).toBe(true);
	});
	test("Login успешно -> сохраняется сессия", () => {
		const login = "john";
		const password = "12345";
		userService.login.mockReturnValue({ login: login });

		const result = auth.login(login, password);

		expect(result).toBe(true);
		expect(userService.login).toHaveBeenCalledWith(login, password);
		expect(sessionService.save).toHaveBeenCalledWith({ login: login });
	});

	test("login провал -> сессия не сохраняется", () => {
		userService.login.mockReturnValue(undefined);

		const result = auth.login("john", "wrong");

		expect(result).toBe(false);
		expect(sessionService.save).not.toHaveBeenCalled();
	});
	test("test", () => {
		expect(true).toBe(true);
	});
});
