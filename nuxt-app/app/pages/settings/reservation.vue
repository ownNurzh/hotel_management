<script setup>
const appConfig = useAppConfig();
const reservationDatas = ref([
	{
		id: 1,
		guest_id: 3,
		room_Id: "23232",
		status: 0,
		check_in: "2000-12-2",
		check_out: "2005-12-2",
		created_at: "",
	},
	{
		id: 1,
		guest_id: 3,
		room_Id: "23232",
		status: 0,
		check_in: "2000-12-2",
		check_out: "2005-12-2",
		created_at: "",
	},
	{
		id: 2,
		guest_id: 3,
		room_Id: "23232",
		status: 0,
		check_in: "2000-12-2",
		check_out: "2005-12-2",
		created_at: "",
	},
	{
		id: 3,
		guest_id: 3,
		room_Id: "23232",
		status: 0,
		check_in: "2000-12-2",
		check_out: "2005-12-2",
		created_at: "",
	},
]);
const search = ref("");
const filterTableData = computed(() =>
	reservationDatas.value.filter((data) => {
		if (!search.value) return true;

		const query = String(search.value).toLowerCase();

		return (
			String(data.guest_id).toLowerCase().includes(query) ||
			String(data.room_Id).toLowerCase().includes(query)
		);
	}),
);
async function refreshReservations() {
	reservationDatas.value = await window?.reservation?.getAll();
}
await refreshReservations();
async function deleteReservation(id) {
	const result = await window?.reservation?.deleteReservationById(id);
	if (result) {
		ElMessage({
			message: `Вы успешно удалили бронь с id=${id}!`,
			type: "success",
		});
		await refreshReservations();
	} else {
		ElMessage({
			message: `Что то пошло не так!`,
			type: "warning",
		});
	}
}
</script>
<template>
	<el-row>
		<el-col :span="24">
			<el-card>
				<template #header>
					<h1 style="font-weight: bold; font-size: 20px">Брони</h1>
				</template>
				<el-table :data="filterTableData" stripe height="200px">
					<el-table-column type="selection" width="55" />
					<el-table-column prop="id" label="#" />
					<el-table-column prop="guest_id" label="Айди гостя" />
					<el-table-column prop="room_id" label="Номер комнаты" />
					<el-table-column
						prop="check_in"
						label="Дата заселение"
						sortable
					/>
					<el-table-column
						prop="check_out"
						label="Дата ухода"
						sortable
					/>
					<el-table-column prop="status" label="Статус">
						<template #default="{ row }">
							<el-tag
								:type="
									appConfig.reservationStatus[row.status]
										.type || 'info'
								"
								>{{
									appConfig.reservationStatus[row.status]
										.name || "None"
								}}</el-tag
							>
						</template>
					</el-table-column>
					<el-table-column
						prop="created_at"
						label="Дата создание"
						sortable
					/>
					<el-table-column fixed="right" label="Операций">
						<template #header>
							<el-input
								v-model="search"
								placeholder="Введите для поиска"
							/>
						</template>
						<template #default="{ row }">
							<el-button type="warning" size="small" @click="">
								Изменить
							</el-button>
							<el-button
								type="danger"
								size="small"
								@click="deleteReservation(row.id)"
							>
								Удалить
							</el-button>
						</template>
					</el-table-column>
				</el-table>
			</el-card>
		</el-col>
	</el-row>
</template>
