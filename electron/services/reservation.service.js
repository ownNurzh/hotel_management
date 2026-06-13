class Reservation {
	constructor(db, paymentService, roomService) {
		this.db = db;
		this.paymentService = paymentService;
		this.roomService = roomService;
	}
	getAll() {
		return this.db.prepare("SELECT * FROM reservations").all();
	}
	getTotalPrice(check_in, check_out, room_price) {
		const start = new Date(check_in);
		const end = new Date(check_out);

		const diffMs = end.getTime() - start.getTime();

		const diff = Math.floor(diffMs / (1000 * 60 * 60 * 24));
		return room_price * diff;
	}
	create(guest_id, room_id, check_in, check_out) {
		const room = this.roomService.getRoomById(room_id);
		if (!room) {
			return { status: false, message: "Такой комнаты не существует!" };
		}
		if (room.status !== 0) {
			return { status: false, message: "Комната не свободен" };
		}
		const roomType = this.roomService.getRoomTypeById(room.room_type_id);
		const result = this.db
			.prepare(
				"INSERT INTO reservations (guest_id,room_id,check_in,check_out) VALUES (?, ?, ?,?)",
			)
			.run(guest_id, room_id, check_in, check_out);

		const reservationId = result.lastInsertRowid;
		const totalPrice = this.getTotalPrice(
			check_in,
			check_out,
			roomType.price,
		);
		this.roomService.updateRoom(
			room.id,
			room.room_number,
			room.room_type_id,
			1,
		);
		this.paymentService.create(reservationId, totalPrice);
		return {
			status: true,
			message: `Бронь успешно создан! К оплате ${totalPrice}`,
		};
	}
	update(id, room_id, check_in, check_out, status) {
		const sql = `
		UPDATE reservations
		SET room_id = ?, check_in = ?, check_out = ?, status = ?
		WHERE id = ?
	`;
		return this.db
			.prepare(sql)
			.run(room_id, check_in, check_out, status, id);
	}
	deleteReservationById(id) {
		return this.db.prepare("DELETE FROM reservations WHERE id = ?").run(id);
	}
	getStatusCounts() {
		const sql = `
        WITH statuses(s) AS (
            VALUES (0), (1), (2), (3)
        )
        SELECT s AS status, COUNT(r.id) AS count
        FROM statuses
        LEFT JOIN reservations r ON r.status = s
        GROUP BY s
    `;
		return this.db.prepare(sql).all();
	}
}

module.exports = Reservation;
