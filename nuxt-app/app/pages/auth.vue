<script setup lang="ts">
import { User, Lock } from "@element-plus/icons-vue";
import type { FormInstance, FormRules } from "element-plus";

definePageMeta({
	layout: "clean",
});

const formRef = ref<FormInstance>();
const loading = ref(false);

const form = reactive({
	login: "",
	password: "",
});

const rules: FormRules = {
	login: [{ required: true, message: "Введите логин", trigger: "blur" }],
	password: [{ required: true, message: "Введите пароль", trigger: "blur" }],
};

const submitForm = (formEl: FormInstance | undefined) => {
	if (!formEl) return;
	formEl.validate((valid) => {
		if (valid) {
			console.log("submit!");
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
					<el-text tag="b" size="large">Вход в систему</el-text>
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
