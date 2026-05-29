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
const updateDialogVisible = ref(false);
const updateFormRef = ref();
const updateForm = reactive({
	room_id: "",
	date: [],
	status: 0,
});
function openUpdateDialog(row) {
	const raw = toRaw(row);
	Object.assign(updateForm, raw);
	updateForm.date[0] = raw.check_in;
	updateForm.date[1] = raw.check_out;
	updateDialogVisible.value = true;
}
const submitUpdateForm = (formEl) => {
	if (!formEl) return;
	formEl.validate(async (valid) => {
		if (valid) {
			try {
				const result = await window?.reservation?.update(
					updateForm.id,
					updateForm.room_id,
					updateForm.date[0],
					updateForm.date[1],
					updateForm.status,
				);
				if (result) {
					ElMessage({
						message: "Вы успешно обновили данные брони!",
						type: "success",
					});
					await refreshReservations();
				} else {
					ElMessage({
						message:
							"Что то пошло не так. Проверьте данные еще раз.",
						type: "warning",
					});
				}
				console.log(result);
			} catch (e) {
				ElMessage({
					message: "Что то пошло не так. Проверьте данные еще раз.",
					type: "error",
				});
			}
		} else {
			console.log("error submit!");
		}
	});
};
</script>
<template>
	<el-row>
		<el-col :span="24">
			<el-card>
				<template #header>
					<h1 style="font-weight: bold; font-size: 20px">Брони</h1>
				</template>
				<el-table :data="filterTableData" stripe height="500px">
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
										?.type || 'info'
								"
								>{{
									appConfig.reservationStatus[row.status]
										?.name || "None"
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
							<el-button
								type="warning"
								size="small"
								@click="openUpdateDialog(row)"
							>
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
		<el-dialog
			align-center
			v-model="updateDialogVisible"
			:title="`Изменить данные для id = ` + updateForm?.id"
			width="25%"
			center
		>
			<el-form
				ref="updateFormRef"
				:model="updateForm"
				:rules="usersFormRules"
				label-position="top"
				size="large"
				@submit.prevent="submitUpdateForm(updateFormRef)"
			>
				<el-form-item label="Айди комнаты" prop="room_id">
					<el-input
						v-model="updateForm.room_id"
						placeholder="Введите айди комнаты"
						:prefix-icon="InfoFilled"
						clearable
					/>
				</el-form-item>
				<el-form-item label="Дата" prop="date">
					<el-date-picker
						v-model="updateForm.date"
						type="daterange"
						range-separator="До"
						start-placeholder="Дата заселение"
						end-placeholder="Дата ухода"
						format="YYYY-MM-DD"
						value-format="YYYY-MM-DD"
					/>
				</el-form-item>
				<el-tag
					v-for="(value, key) in appConfig.reservationStatus"
					:key="key"
					:type="value.type"
					>{{ key }} : {{ value.name }}</el-tag
				>
				<el-form-item label="Статус" prop="status">
					<el-input-number
						v-model="updateForm.status"
					></el-input-number>
				</el-form-item>
			</el-form>
			<template #footer>
				<div class="dialog-footer">
					<el-button @click="updateDialogVisible = false"
						>Отмена</el-button
					>
					<el-button
						type="primary"
						@click="
							updateDialogVisible = false;
							submitUpdateForm(updateFormRef);
						"
					>
						Сохранить
					</el-button>
				</div>
			</template>
		</el-dialog>
	</el-row>
</template>
