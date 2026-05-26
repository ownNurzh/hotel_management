export default defineAppConfig({
	roomStatus: [
		{ name: "Свободна", type: "success" },
		{ name: "Занята", type: "danger" },
		{ name: "Ремонт", type: "warning" },
		{ name: "Неактивна", type: "info" },
	],
	reservationStatus: [
		{ name: "Подтверждено", type: "primary" },
		{ name: "Заселён", type: "success" },
		{ name: "Отменено", type: "danger" },
		{ name: "Завершено", type: "info" },
	],
});
