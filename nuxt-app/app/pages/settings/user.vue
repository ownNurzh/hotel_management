<script setup>
import { InfoFilled, Lock, Avatar } from "@element-plus/icons-vue";

const usersFormRef = ref();

const usersForm = reactive({
	first_name: "",
	second_name: "",
	login: "",
	password: "",
	role_id: 0,
});

const usersFormRules = {
	first_name: [{ required: true, message: "Введите имя", trigger: "blur" }],
	second_name: [
		{ required: true, message: "Введите фамилию", trigger: "blur" },
	],
	login: [{ required: true, message: "Введите логин", trigger: "blur" }],
	password: [{ required: true, message: "Введите пароль", trigger: "blur" }],
	role_id: [{ required: true, message: "Введите роль", trigger: "blur" }],
};

const usersDatas = ref([
	{
		id: 1,
		first_name: "first_name",
		second_name: "second_name",
		login: "login",
		password: "password",
		role_id: 0,
		role_name: "Test",
	},
	{
		id: 2,
		first_name: "first_name",
		second_name: "second_name",
		login: "login",
		password: "password",
		role_id: 0,
		role_name: "Test",
	},
	{
		id: 3,
		first_name: "first_name",
		second_name: "second_name",
		login: "login",
		password: "password",
		role_id: 0,
		role_name: "Test",
	},
	{
		id: 4,
		first_name: "first_name",
		second_name: "second_name",
		login: "login",
		password: "password",
		role_id: 0,
		role_name: "Test",
	},
]);

async function refreshUsers() {
	usersDatas.value = await window?.user?.getAll();
}
await refreshUsers();

async function deleteUserType(id) {
	const result = await window?.user?.deleteUserById(id);
	if (result) {
		ElMessage({
			message: `Вы успешно удалили пользователя с id=${id}!`,
			type: "success",
		});
		await refreshUsers();
	} else {
		ElMessage({
			message: `Что то пошло не так!`,
			type: "warning",
		});
	}
}

const submitUsersForm = (formEl) => {
	if (!formEl) return;
	formEl.validate(async (valid) => {
		if (valid) {
			try {
				const result = await window?.user?.create(
					usersForm.first_name,
					usersForm.second_name,
					usersForm.login,
					usersForm.password,
					usersForm.role_id,
				);
				if (result) {
					ElMessage({
						message: "Вы успешно создали пользователя!",
						type: "success",
					});
					await refreshUsers();
				} else {
					ElMessage({
						message: "Что то пошло не так.",
						type: "warning",
					});
				}
				console.log(result);
			} catch (e) {
				ElMessage({
					message: "Что то пошло не так.",
					type: "error",
				});
			}
		} else {
			console.log("error submit!");
		}
	});
};
const updateDialogVisible = ref(false);
const updateFormRef = ref();
const updateForm = reactive({
	first_name: "",
	second_name: "",
	login: "",
	password: "",
	role_id: 0,
});
function openUpdateDialog(row) {
	Object.assign(updateForm, toRaw(row));
	updateDialogVisible.value = true;
}
const submitUpdateForm = (formEl) => {
	if (!formEl) return;
	formEl.validate(async (valid) => {
		if (valid) {
			try {
				const result = await window?.user?.update(
					updateForm.id,
					updateForm.first_name,
					updateForm.second_name,
					updateForm.login,
					updateForm.password,
					updateForm.role_id,
				);
				if (result) {
					ElMessage({
						message: "Вы успешно обновили данные пользователя!",
						type: "success",
					});
					await refreshUsers();
				} else {
					ElMessage({
						message: "Что то пошло не так.",
						type: "warning",
					});
				}
				console.log(result);
			} catch (e) {
				ElMessage({
					message: "Что то пошло не так.",
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
					<h1 style="font-weight: bold; font-size: 20px">Юзеры</h1>
				</template>
				<el-form
					ref="usersFormRef"
					:model="usersForm"
					:rules="usersFormRules"
					label-position="top"
					size="large"
					@submit.prevent="submitUsersForm(usersFormRef)"
				>
					<el-form-item label="Имя" prop="first_name">
						<el-input
							v-model="usersForm.first_name"
							placeholder="Введите Имя"
							:prefix-icon="InfoFilled"
							clearable
						/>
					</el-form-item>

					<el-form-item label="Фамилия" prop="second_name">
						<el-input
							v-model="usersForm.second_name"
							placeholder="Введите Фамилию"
							:prefix-icon="InfoFilled"
							clearable
						/>
					</el-form-item>
					<el-form-item label="Логин" prop="login">
						<el-input
							v-model="usersForm.login"
							placeholder="Введите логин"
							:prefix-icon="Avatar"
							clearable
						/>
					</el-form-item>
					<el-form-item label="Пароль" prop="password">
						<el-input
							v-model="usersForm.password"
							placeholder="Введите пароль"
							:prefix-icon="Lock"
							clearable
						/>
					</el-form-item>
					<el-tag size="small">Admin: 1</el-tag><br />
					<el-tag size="small" type="warning">Reception: 2</el-tag>
					<el-form-item label="Роль" prop="role_id">
						<el-input-number
							v-model="usersForm.role_id"
						></el-input-number>
					</el-form-item>
					<el-form-item>
						<el-button
							type="primary"
							@click="submitUsersForm(usersFormRef)"
						>
							Создать
						</el-button>
						<el-button
							type="danger"
							plain
							@click="usersFormRef.resetFields()"
						>
							Очистить
						</el-button>
					</el-form-item>
				</el-form>
				<el-divider></el-divider>
				<el-table :data="usersDatas" stripe height="200px">
					<el-table-column type="selection" width="55" />
					<el-table-column prop="id" label="#" />
					<el-table-column prop="first_name" label="Имя" />
					<el-table-column prop="second_name" label="Фамилия" />
					<el-table-column prop="login" label="Логин" />
					<el-table-column prop="password" label="Пароль">
						<template #default="{ row }">
							<el-input
								type="password"
								show-password
								readonly
								v-model="row.password"
								>{{ row.password }}</el-input
							>
						</template>
					</el-table-column>
					<el-table-column prop="role_name" label="Роль">
						<template #default="{ row }">
							{{ row.role_name }}({{ row.role_id }})
						</template>
					</el-table-column>
					<el-table-column fixed="right" label="Операций">
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
								:disabled="row.id == 1"
								@click="deleteUserType(row.id)"
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
				<el-form-item label="Имя" prop="first_name">
					<el-input
						v-model="updateForm.first_name"
						placeholder="Введите Имя"
						:prefix-icon="InfoFilled"
						clearable
					/>
				</el-form-item>

				<el-form-item label="Фамилия" prop="second_name">
					<el-input
						v-model="updateForm.second_name"
						placeholder="Введите Фамилию"
						:prefix-icon="InfoFilled"
						clearable
					/>
				</el-form-item>
				<el-form-item label="Логин" prop="login">
					<el-input
						v-model="updateForm.login"
						placeholder="Введите логин"
						:prefix-icon="Avatar"
						clearable
					/>
				</el-form-item>
				<el-form-item label="Пароль" prop="password">
					<el-input
						v-model="updateForm.password"
						placeholder="Введите пароль"
						:prefix-icon="Lock"
						clearable
					/>
				</el-form-item>
				<el-tag size="small">Admin: 1</el-tag><br />
				<el-tag size="small" type="warning">Reception: 2</el-tag>
				<el-form-item label="Роль" prop="role_id">
					<el-input-number
						v-model="updateForm.role_id"
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

<style scope>
.el-row {
	margin-bottom: 25px;
}
</style>
