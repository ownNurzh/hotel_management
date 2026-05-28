<script setup>
import { InfoFilled, UploadFilled } from "@element-plus/icons-vue";
const appConfig = useAppConfig();
const roomTypesFormRef = ref();

const roomTypesForm = reactive({
	name: "",
	price: 0,
	capacity: 0,
	fileList: [],
});

const RoomTypesFormRules = {
	name: [{ required: true, message: "Введите название", trigger: "blur" }],
	price: [{ required: true, message: "Введите цену", trigger: "blur" }],
	capacity: [
		{ required: true, message: "Введите вместимость", trigger: "blur" },
	],
	fileList: [{ required: true, message: "Выберите фото", trigger: "blur" }],
};

const RoomTypesDatas = ref([
	{
		id: 1,
		name: "Standard",
		price: 5000,
		capacity: 2,
	},
	{
		id: 2,
		name: "Lux",
		price: 10000,
		capacity: 4,
	},
	{
		id: 3,
		name: "Premium",
		price: 20000,
		capacity: 6,
	},
]);

async function refreshRoomTypes() {
	RoomTypesDatas.value = await window?.room?.getAllRoomTypes();
}
await refreshRoomTypes();

async function deleteRoomType(id) {
	const result = await window?.room?.deleteRoomTypeById(id);
	if (result) {
		ElMessage({
			message: `Вы успешно удалили тип комнаты с id=${id}!`,
			type: "success",
		});
		await refreshRoomTypes();
	} else {
		ElMessage({
			message: `Что то пошло не так!`,
			type: "warning",
		});
	}
}

const submitRoomTypeForm = (formEl) => {
	if (!formEl) return;
	formEl.validate(async (valid) => {
		if (valid) {
			try {
				const arrayBufferFiles = await Promise.all(
					roomTypesForm.fileList.map(async (f) => ({
						name: f.raw.name,
						type: f.raw.type,
						buffer: await f.raw.arrayBuffer(),
					})),
				);
				const result = await window?.room?.createRoomType(
					roomTypesForm.name,
					roomTypesForm.price,
					roomTypesForm.capacity,
					arrayBufferFiles,
				);
				if (result) {
					ElMessage({
						message: "Вы успешно создали тип комнаты!",
						type: "success",
					});
					await refreshRoomTypes();
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

const roomFormRef = ref();

const roomForm = reactive({
	room_number: "",
	room_type_id: 0,
});

const RoomFormRules = {
	room_number: [
		{
			required: true,
			message: "Введите номер физической комнаты",
			trigger: "blur",
		},
	],
	room_type_id: [
		{
			required: true,
			message: "Введите айди типа комнаты",
			trigger: "blur",
		},
	],
};

const RoomDatas = ref([
	{
		id: 1,
		room_number: "101",
		room_type_id: 1,
		status: 0,
	},
	{
		id: 2,
		room_number: "102",
		room_type_id: 2,
		status: 0,
	},
	{
		id: 3,
		room_number: "103",
		room_type_id: 1,
		status: 0,
	},
	{
		id: 4,
		room_number: "105",
		room_type_id: 3,
		status: 0,
	},
]);

async function refreshRooms() {
	RoomDatas.value = await window?.room?.getAllRooms();
}
await refreshRooms();

async function deleteRoom(id) {
	const result = await window?.room?.deleteRoomById(id);
	if (result) {
		ElMessage({
			message: `Вы успешно удалили комнату с id=${id}!`,
			type: "success",
		});
		await refreshRooms();
	} else {
		ElMessage({
			message: `Что то пошло не так!`,
			type: "warning",
		});
	}
}

const submitRoomForm = (formEl) => {
	if (!formEl) return;
	formEl.validate(async (valid) => {
		if (valid) {
			try {
				const result = await window?.room?.createRoom(
					roomForm.room_number,
					roomForm.room_type_id,
				);
				if (result) {
					ElMessage({
						message: "Вы успешно создали комнату!",
						type: "success",
					});
					await refreshRooms();
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
const updateRoomTypesDialogVisible = ref(false);
const updateRoomTypesFormRef = ref();
const updateRoomTypesForm = reactive({
	name: "",
	price: 0,
	capacity: 0,
	fileList: [],
});
function openRoomTypesUpdateDialog(row) {
	const raw = toRaw(row);
	Object.assign(updateRoomTypesForm, raw);
	updateRoomTypesDialogVisible.value = true;
}
const submitRoomTypesUpdateForm = (formEl) => {
	if (!formEl) return;
	formEl.validate(async (valid) => {
		if (valid) {
			try {
				const result = await window?.room?.updateRoomType(
					updateRoomTypesForm.id,
					updateRoomTypesForm.name,
					updateRoomTypesForm.price,
					updateRoomTypesForm.capacity,
				);
				if (result) {
					ElMessage({
						message: "Вы успешно обновили данные типа комнаты!",
						type: "success",
					});
					await refreshRoomTypes();
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

const updateRoomDialogVisible = ref(false);
const updateRoomFormRef = ref();
const updateRoomForm = reactive({
	room_number: "",
	room_type_id: 0,
	status: 0,
});
function openRoomUpdateDialog(row) {
	const raw = toRaw(row);
	Object.assign(updateRoomForm, raw);
	updateRoomDialogVisible.value = true;
}
const submitRoomUpdateForm = (formEl) => {
	if (!formEl) return;
	formEl.validate(async (valid) => {
		if (valid) {
			try {
				const result = await window?.room?.updateRoom(
					updateRoomForm.id,
					updateRoomForm.room_number,
					updateRoomForm.room_type_id,
					updateRoomForm.status,
				);
				if (result) {
					ElMessage({
						message: "Вы успешно обновили данные комнаты!",
						type: "success",
					});
					await refreshRooms();
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
const handleRemove = (uploadFile, uploadFiles) => {
	console.log(uploadFile, uploadFiles);
};
const dialogImageUrl = ref("");
const dialogUploadVisible = ref(false);
const handlePreview = (file) => {
	dialogImageUrl.value = file.url;
	dialogUploadVisible.value = true;
};
const handleChange = (uploadFile, uploadFiles) => {
	const fileFormats = ["image/png", "image/jpeg"];

	if (!fileFormats.includes(uploadFile.raw.type)) {
		ElMessage({ message: "Принимаются только png, jpeg.", type: "error" });
		roomTypesForm.fileList = uploadFiles.filter(
			(f) => f.uid !== uploadFile.uid,
		);
		return;
	}

	if (uploadFile.raw.size / 1024 / 1024 > 2) {
		ElMessage({ message: "Файл не должен превышать 2MB!", type: "error" });
		roomTypesForm.fileList = uploadFiles.filter(
			(f) => f.uid !== uploadFile.uid,
		);
		return;
	}

	ElMessage({ message: "Файл добавлен!", type: "success" });
};
</script>
<template>
	<el-row>
		<el-col :span="24">
			<el-card>
				<template #header>
					<h1 style="font-weight: bold; font-size: 20px">
						Типы комнат
					</h1>
				</template>
				<el-form
					ref="roomTypesFormRef"
					:model="roomTypesForm"
					:rules="RoomTypesFormRules"
					label-position="top"
					size="large"
					@submit.prevent="submitRoomTypeForm(roomTypesFormRef)"
				>
					<el-form-item label="Название" prop="name">
						<el-input
							v-model="roomTypesForm.name"
							placeholder="Введите название"
							:prefix-icon="InfoFilled"
							clearable
						/>
					</el-form-item>

					<el-form-item label="Цена" prop="price">
						<el-input-number v-model="roomTypesForm.price">
							<template #suffix>
								<span>KZT</span>
							</template>
						</el-input-number>
					</el-form-item>
					<el-form-item label="Вместимость" prop="capacity">
						<el-input-number v-model="roomTypesForm.capacity">
						</el-input-number>
					</el-form-item>
					<el-form-item label="Фото" prop="fileList">
						<el-upload
							v-model:file-list="roomTypesForm.fileList"
							action="#"
							:on-preview="handlePreview"
							:on-remove="handleRemove"
							:on-change="handleChange"
							list-type="picture-card"
							drag
							multiple
							:limit="3"
							:auto-upload="false"
						>
							<el-icon style="font-size: 50px"
								><UploadFilled style="color: gray"
							/></el-icon>
							<template #tip>
								<div>
									В формате jpg/png и с размером меньше чем
									2MB
								</div>
							</template>
						</el-upload>
						<el-dialog
							v-model="dialogUploadVisible"
							width="500px"
							align-center
						>
							<img
								w-full
								:src="dialogImageUrl"
								alt="Preview Image"
							/>
						</el-dialog>
					</el-form-item>
					<el-form-item>
						<el-button
							type="primary"
							@click="submitRoomTypeForm(roomTypesFormRef)"
						>
							Создать
						</el-button>
						<el-button
							type="danger"
							plain
							@click="roomTypesFormRef.resetFields()"
						>
							Очистить
						</el-button>
					</el-form-item>
				</el-form>
				<el-divider></el-divider>
				<el-table :data="RoomTypesDatas" stripe height="200px">
					<el-table-column type="selection" width="55" />
					<el-table-column prop="id" label="#" />
					<el-table-column prop="name" label="Название" />
					<el-table-column prop="price" label="Цена" />
					<el-table-column prop="capacity" label="Вместимость" />
					<el-table-column fixed="right" label="Операций">
						<template #default="{ row }">
							<el-button
								type="warning"
								size="small"
								@click="openRoomTypesUpdateDialog(row)"
							>
								Изменить
							</el-button>
							<el-button
								type="danger"
								size="small"
								@click="deleteRoomType(row.id)"
							>
								Удалить
							</el-button>
						</template>
					</el-table-column>
				</el-table>
			</el-card>
		</el-col>
	</el-row>
	<el-row>
		<el-col :span="24">
			<el-card>
				<template #header>
					<h1 style="font-weight: bold; font-size: 20px">Комнаты</h1>
				</template>
				<el-form
					ref="roomFormRef"
					:model="roomForm"
					:rules="RoomFormRules"
					label-position="top"
					size="large"
					@submit.prevent="submitRoomForm(roomFormRef)"
				>
					<el-form-item label="Номер комнаты" prop="room_number">
						<el-input
							v-model="roomForm.room_number"
							placeholder="Введите номер комнаты"
							:prefix-icon="InfoFilled"
							clearable
						/>
					</el-form-item>

					<el-form-item label="Тип комнаты" prop="room_type_id">
						<el-input-number v-model="roomForm.room_type_id">
						</el-input-number>
					</el-form-item>
					<el-form-item>
						<el-button
							type="primary"
							@click="submitRoomForm(roomFormRef)"
						>
							Создать
						</el-button>
						<el-button
							type="danger"
							plain
							@click="roomFormRef.resetFields()"
						>
							Очистить
						</el-button>
					</el-form-item>
				</el-form>
				<el-divider></el-divider>
				<el-table :data="RoomDatas" stripe height="300px">
					<el-table-column type="selection" width="55" />
					<el-table-column prop="id" label="#" />
					<el-table-column prop="room_number" label="Номер комнаты" />
					<el-table-column prop="room_type_id" label="Тип комнаты">
						<template #default="{ row }">
							{{ row.room_type_name }}({{ row.room_type_id }})
						</template>
					</el-table-column>
					<el-table-column prop="status" label="Статус">
						<template #default="{ row }">
							<el-tag
								:type="
									appConfig.roomStatus[row.status]?.type ||
									'info'
								"
								>{{
									appConfig.roomStatus[row.status]?.name ||
									"None"
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
						<template #default="{ row }">
							<el-button
								type="warning"
								size="small"
								@click="openRoomUpdateDialog(row)"
							>
								Изменить
							</el-button>
							<el-button
								type="danger"
								size="small"
								@click="deleteRoom(row.id)"
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
			v-model="updateRoomTypesDialogVisible"
			:title="`Изменить данные для id = ` + updateRoomTypesForm?.id"
			width="25%"
			center
		>
			<el-form
				ref="updateRoomTypesFormRef"
				:model="updateRoomTypesForm"
				:rules="RoomTypesFormRules"
				label-position="top"
				size="large"
				@submit.prevent="
					submitRoomTypesUpdateForm(updateRoomTypesFormRef)
				"
			>
				<el-form-item label="Название" prop="name">
					<el-input
						v-model="updateRoomTypesForm.name"
						placeholder="Введите название"
						:prefix-icon="InfoFilled"
						clearable
					/>
				</el-form-item>

				<el-form-item label="Цена" prop="price">
					<el-input-number v-model="updateRoomTypesForm.price">
						<template #suffix>
							<span>KZT</span>
						</template>
					</el-input-number>
				</el-form-item>
				<el-form-item label="Вместимость" prop="capacity">
					<el-input-number v-model="updateRoomTypesForm.capacity">
					</el-input-number>
				</el-form-item>
			</el-form>
			<template #footer>
				<div class="dialog-footer">
					<el-button @click="updateRoomTypesDialogVisible = false"
						>Отмена</el-button
					>
					<el-button
						type="primary"
						@click="
							updateRoomTypesDialogVisible = false;
							submitRoomTypesUpdateForm(updateRoomTypesFormRef);
						"
					>
						Сохранить
					</el-button>
				</div>
			</template>
		</el-dialog>
		<el-dialog
			align-center
			v-model="updateRoomDialogVisible"
			:title="`Изменить данные для id = ` + updateRoomForm?.id"
			width="25%"
			center
		>
			<el-form
				ref="updateRoomFormRef"
				:model="updateRoomForm"
				:rules="RoomFormRules"
				label-position="top"
				size="large"
				@submit.prevent="submitRoomUpdateForm(updateRoomFormRef)"
			>
				<el-form-item label="Номер комнаты" prop="room_number">
					<el-input
						v-model="updateRoomForm.room_number"
						placeholder="Введите номер комнаты"
						:prefix-icon="InfoFilled"
						clearable
					/>
				</el-form-item>

				<el-form-item label="Тип комнаты" prop="room_type_id">
					<el-input-number v-model="updateRoomForm.room_type_id">
					</el-input-number>
				</el-form-item>
				<el-tag
					v-for="(value, key) in appConfig.roomStatus"
					:key="key"
					:type="value.type"
					>{{ key }} : {{ value.name }}</el-tag
				>
				<el-form-item label="Статус" prop="status">
					<el-input-number v-model="updateRoomForm.status">
					</el-input-number>
				</el-form-item>
			</el-form>
			<template #footer>
				<div class="dialog-footer">
					<el-button @click="updateRoomDialogVisible = false"
						>Отмена</el-button
					>
					<el-button
						type="primary"
						@click="
							updateRoomDialogVisible = false;
							submitRoomUpdateForm(updateRoomFormRef);
						"
					>
						Сохранить
					</el-button>
				</div>
			</template>
		</el-dialog>
	</el-row>
</template>

<style scope>
.el-row {
	margin-bottom: 25px;
}
</style>
