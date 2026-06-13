<script setup>
import { User, Lock } from "@element-plus/icons-vue";
import { ElMessage } from "element-plus";
definePageMeta({
	layout: "clean",
});

const formRef = ref();
const loading = ref(false);

const form = reactive({
	login: "",
	password: "",
});

const rules = {
	login: [{ required: true, message: "Введите логин", trigger: "blur" }],
	password: [{ required: true, message: "Введите пароль", trigger: "blur" }],
};

const submitForm = (formEl) => {
	if (!formEl) return;
	formEl.validate(async (valid) => {
		if (valid) {
			const result = await window?.auth?.login(form.login, form.password);
			if (result) {
				ElMessage({
					message: "Вы успешно вошли!",
					type: "success",
				});
				return navigateTo("/monitoring/main");
			}
			ElMessage({
				message: "Неверный пароль или такого аккаунта нет.",
				type: "error",
			});
			console.log(result);
		} else {
			console.log("error submit!");
		}
	});
};
</script>

<template>
	<el-row justify="center" align="middle" style="height: 100vh">
		<el-col :span="6">
			<el-card>
				<template #header>
					<div
						style="
							width: 100%;
							display: flex;
							align-items: center;
							justify-content: center;
						"
					>
						<img
							src="~/assets/app-icon-t.png"
							style="width: 80px; height: 80px"
						/>
						<el-divider direction="vertical"></el-divider>
						<span style="font-weight: bold">Вход в систему</span>
					</div>
				</template>

				<el-form
					ref="formRef"
					status-icon
					:model="form"
					:rules="rules"
					label-position="top"
					size="large"
					@submit.prevent="submitForm(formRef)"
				>
					<el-form-item label="Логин" prop="login">
						<el-input
							v-model="form.login"
							placeholder="Введите логин"
							:prefix-icon="User"
							clearable
						/>
					</el-form-item>

					<el-form-item label="Пароль" prop="password">
						<el-input
							v-model="form.password"
							type="password"
							placeholder="Введите пароль"
							:prefix-icon="Lock"
							show-password
							clearable
						/>
					</el-form-item>

					<el-form-item>
						<el-button
							type="primary"
							:loading="loading"
							style="width: 100%"
							@click="submitForm(formRef)"
						>
							{{ loading ? "Входим..." : "Войти" }}
						</el-button>
					</el-form-item>
				</el-form>
			</el-card>
		</el-col>
	</el-row>
</template>
