jest.mock("../electron/config", () => ({
	uploadsPath: "/tmp/test",
}));

jest.mock("fs");
const RoomService = require("../electron/services/room.service");
const fs = require("fs");
const config = require("../electron/config");
describe("Guest", () => {
	let db;
	let mainObj;

	beforeEach(() => {
		db = {
			prepare: jest.fn(),
		};

		mainObj = new RoomService(db);
	});
	test("test", () => {
		expect(true).toBe(true);
	});
	test("getAll возвращает тип комнат", () => {
		const sql = "SELECT * FROM room_types";
		const allMock = jest.fn().mockReturnValue([{ images: "[]" }]);

		db.prepare.mockReturnValue({
			all: allMock,
		});

		const result = mainObj.getAllRoomTypes();

		expect(db.prepare).toHaveBeenCalledWith(sql);
		expect(allMock).toHaveBeenCalled();
		expect(result).toEqual([{ images: [] }]);
	});
	test("getAll возвращает комнаты", () => {
		const sql = `
		SELECT 
			rooms.*,
			room_types.name AS room_type_name
		FROM rooms
		LEFT JOIN room_types ON room_types.id = rooms.room_type_id
`;
		const allMock = jest.fn().mockReturnValue(true);

		db.prepare.mockReturnValue({
			all: allMock,
		});

		const result = mainObj.getAllRooms();

		expect(db.prepare).toHaveBeenCalledWith(sql);
		expect(allMock).toHaveBeenCalled();
		expect(result).toBe(true);
	});
	test("test", () => {
		expect(true).toBe(true);
	});
});
