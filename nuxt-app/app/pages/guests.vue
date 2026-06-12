<script setup>
import { InfoFilled, Key } from "@element-plus/icons-vue";
const guestFormRef = ref();

const guestForm = reactive({
	first_name: "",
	second_name: "",
	document_number: "",
});

const guestFormRules = {
	first_name: [{ required: true, message: "Введите имя", trigger: "blur" }],
	second_name: [
		{ required: true, message: "Введите фамилию", trigger: "blur" },
	],
	document_number: [
		{
			required: true,
			message: "Введите иин,номер паспорта",
			trigger: "blur",
		},
	],
};

const guestsDatas = ref([
	{
		id: 1,
		first_name: "Admin",
		second_name: "Nurzh_name",
		document_number: "77777",
	},
	{
		id: 2,
		first_name: "test",
		second_name: "test_name",
		document_number: "555555",
	},
	{
		id: 3,
		first_name: "low",
		second_name: "232",
		document_number: "12345",
	},
]);

async function refreshGuests() {
	guestsDatas.value = await window?.guest?.getAll();
}
await refreshGuests();

async function deleteGuest(id) {
	const result = await window?.guest?.deleteGuestById(id);
	if (result) {
		ElMessage({
			message: `Вы успешно удалили гостю с id=${id}!`,
			type: "success",
		});
		await refreshGuests();
	} else {
		ElMessage({
			message: `Что то пошло не так!`,
			type: "warning",
		});
	}
}

const submitGuestsForm = (formEl) => {
	if (!formEl) return;
	formEl.validate(async (valid) => {
		if (valid) {
			try {
				const result = await window?.guest?.create(
					guestForm.first_name,
					guestForm.second_name,
					guestForm.document_number,
				);
				if (result) {
					ElMessage({
						message: "Вы успешно создали гостя!",
						type: "success",
					});
					await refreshGuests();
				} else {
					ElMessage({
						message:
							"Что то пошло не так.Проверьте данные еще раз.",
						type: "warning",
					});
				}
				console.log(result);
			} catch (e) {
				ElMessage({
					message: "Что то пошло не так.Проверьте данные еще раз.",
					type: "error",
				});
			}
		} else {
			console.log("error submit!");
		}
	});
};
const search = ref("");
const filterTableData = computed(() =>
	guestsDatas.value.filter((data) => {
		if (!search.value) return true;

		const query = search.value.toLowerCase();

		return (
			data.first_name.toLowerCase().includes(query) ||
			data.second_name.toLowerCase().includes(query) ||
			data.document_number.toLowerCase().includes(query)
		);
	}),
);
const reservationDialogVisible = ref(false);
const selectedGuestForReservation = ref(null);

const reservationFormRef = ref();

const reservationFormRules = {
	guest_id: [
		{
			required: true,
			message: "Введите айди гостя",
			trigger: "blur",
		},
	],
	room_id: [
		{
			required: true,
			message: "Введите айди комнаты",
			trigger: "blur",
		},
	],
	date: [
		{
			required: true,
			message: "Выберите дату",
			trigger: "blur",
		},
	],
};
const reservationDatas = reactive({
	guest_id: selectedGuestForReservation,
	room_id: "",
	date: [],
});
const submitReservationForm = (formEl) => {
	if (!formEl) return;
	formEl.validate(async (valid) => {
		if (valid) {
			try {
				const result = await window?.reservation?.create(
					reservationDatas.guest_id,
					reservationDatas.room_id,
					reservationDatas.date[0],
					reservationDatas.date[1],
				);
				ElMessage({
					message: result?.message,
					type: result?.status ? "success" : "error",
				});
			} catch (e) {
				ElMessage({
					message: "Что то пошло не так. Проверьте данные еще раз.",
					type: "error",
				});
				console.log(e);
			}
		} else {
			console.log("error submit!");
		}
	});
};
async function openWindowForClient() {
	console.log("OPEN");
	await window?.app?.openWindowForClient();
}
const openTour = ref(false);
const Ref1 = ref();
const Ref2 = ref();
const Ref3 = ref();
</script>
<template>
	<el-row>
		<el-col :span="24">
			<el-card>
				<template #header>
					<h1 style="font-weight: bold; font-size: 20px">
						Посетители
					</h1>
					<el-button
						type="primary"
						@click="openTour = true"
						plain
						size="small"
						>Мини гайд</el-button
					>
					<el-button
						type="primary"
						plain
						size="small"
						@click="openWindowForClient()"
					>
						Открыть окно для клиентов
					</el-button>
				</template>
				<el-form
					ref="guestFormRef"
					:model="guestForm"
					:rules="guestFormRules"
					label-position="top"
					size="large"
					@submit.prevent="submitGuestsForm(guestFormRef)"
				>
					<el-form-item label="Имя" prop="first_name">
						<el-input
							ref="Ref1"
							v-model="guestForm.first_name"
							placeholder="Введите имя"
							:prefix-icon="InfoFilled"
							clearable
						/>
					</el-form-item>

					<el-form-item label="Фамилия" prop="second_name">
						<el-input
							ref="Ref2"
							v-model="guestForm.second_name"
							placeholder="Введите фамилию"
							:prefix-icon="InfoFilled"
							clearable
						/>
					</el-form-item>
					<el-form-item
						label="Номер документа"
						prop="document_number"
					>
						<el-input
							ref="Ref3"
							v-model="guestForm.document_number"
							placeholder="Введите номер документа"
							:prefix-icon="Key"
							clearable
						/>
					</el-form-item>
					<el-form-item>
						<el-button
							type="primary"
							@click="submitGuestsForm(guestFormRef)"
						>
							Создать
						</el-button>
						<el-button
							type="danger"
							plain
							@click="guestFormRef.resetFields()"
						>
							Очистить
						</el-button>
					</el-form-item>
				</el-form>
				<el-tour v-model="openTour">
					<el-tour-step
						:target="Ref1?.$el"
						title="Имя"
						description="Укажите Имя посетителя который будет отображаться и по нему делаться поиск."
					/>

					<el-tour-step
						:target="Ref2?.$el"
						title="Фамилия"
						description="Укажите Фамилию посетителя который будет отображаться и по нему делаться поиск."
					/>
					<el-tour-step
						:target="Ref3?.$el"
						title="Номер документа"
						description="Укажите номер документа, идентифицирующего посетителя (паспорт, удостоверение личности или иной документ, удостоверяющий личность).
"
					/>
				</el-tour>
				<el-divider></el-divider>
				<el-table :data="filterTableData" stripe height="200px">
					<el-table-column type="selection" width="55" />
					<el-table-column prop="id" label="#" />
					<el-table-column prop="first_name" label="Имя" />
					<el-table-column prop="second_name" label="Фамилия" />
					<el-table-column
						prop="document_number"
						label="Номер документа"
					/>
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
								type="primary"
								size="small"
								plain
								@click="
									reservationDialogVisible = true;
									selectedGuestForReservation = row.id;
								"
							>
								Бронь
							</el-button>
							<el-button
								type="danger"
								size="small"
								@click="deleteGuest(row.id)"
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
			v-model="reservationDialogVisible"
			:title="
				'Бронирование для гостя с id = ' + selectedGuestForReservation
			"
			width="30%"
			center
			@closed="() => (selectedGuestForReservation = null)"
		>
			<el-form
				ref="reservationFormRef"
				:model="reservationDatas"
				:rules="reservationFormRules"
				label-position="top"
				size="large"
				@submit.prevent="submitReservationForm(reservationFormRef)"
			>
				<el-form-item label="Айди гостя" prop="guest_id">
					<el-input
						v-model="reservationDatas.guest_id"
						placeholder="Введите айди гостя"
						:prefix-icon="InfoFilled"
						clearable
						disabled
					/>
				</el-form-item>

				<el-form-item label="Айди комнаты" prop="room_id">
					<el-input
						v-model="reservationDatas.room_id"
						placeholder="Введите айди комнаты"
						:prefix-icon="InfoFilled"
						clearable
					/>
				</el-form-item>
				<el-form-item label="Дата" prop="date">
					<el-date-picker
						v-model="reservationDatas.date"
						type="daterange"
						range-separator="До"
						start-placeholder="Дата заселение"
						end-placeholder="Дата ухода"
						format="YYYY-MM-DD"
						value-format="YYYY-MM-DD"
					/>
				</el-form-item>
				<el-form-item>
					<el-button
						type="primary"
						@click="submitReservationForm(reservationFormRef)"
					>
						Сохранить
					</el-button>
					<el-button
						type="danger"
						plain
						@click="reservationFormRef.resetFields()"
					>
						Очистить
					</el-button>
				</el-form-item>
			</el-form>
		</el-dialog>
	</el-row>
</template>
