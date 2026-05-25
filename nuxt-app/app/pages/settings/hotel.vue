<script setup>
import { InfoFilled, Phone, Message, Location } from "@element-plus/icons-vue";
const hotelFormRef = ref();

const hotelFormRules = {
	name: [
		{
			required: true,
			message: "Введите название отеля",
			trigger: "blur",
		},
	],
	phone: [
		{
			required: true,
			message: "Введите номер телефона",
			trigger: "blur",
		},
	],
	email: [
		{
			required: true,
			message: "Введите почту отеля",
			trigger: "blur",
		},
	],
	addres: [
		{
			required: true,
			message: "Введите адрес отеля",
			trigger: "blur",
		},
	],
};
const hotelDatasInDb = await window?.hotel?.get();
const baseHotelDatas = {
	name: "",
	phone: "",
	email: "",
	addres: "",
};

const hotelDatas = ref(hotelDatasInDb || { ...baseHotelDatas });
const submitHotelForm = (formEl) => {
	if (!formEl) return;
	formEl.validate(async (valid) => {
		if (valid) {
			try {
				await window?.hotel?.save(toRaw(hotelDatas.value));

				ElMessage({
					message: "Вы успешно сохранили данные отеля!",
					type: "success",
				});
			} catch (e) {
				ElMessage({
					message: "Что то пошло не так. " + e,
					type: "error",
				});
			}
		} else {
			console.log("error submit!");
		}
	});
};
const clearHotelDatas = async (formEl) => {
	if (!formEl) return;
	formEl.resetFields();
	const result = await window?.hotel?.clear();
	if (result) {
		ElMessage({
			message: "Вы успешно очистили данные отеля!",
			type: "success",
		});
		hotelDatas.value = { ...baseHotelDatas };
	}
};
</script>
<template>
	<el-row>
		<el-col :span="24">
			<el-card>
				<template #header>
					<h1 style="font-weight: bold; font-size: 20px">
						Настройка отеля
					</h1>
				</template>
				<el-form
					ref="hotelFormRef"
					:model="hotelDatas"
					:rules="hotelFormRules"
					label-position="top"
					size="large"
					@submit.prevent="submitHotelForm(hotelFormRef)"
				>
					<el-form-item label="Название отеля" prop="name">
						<el-input
							v-model="hotelDatas.name"
							placeholder="Введите название отеля"
							:prefix-icon="InfoFilled"
							clearable
						/>
					</el-form-item>

					<el-form-item label="Номер телефона" prop="phone">
						<el-input
							v-model="hotelDatas.phone"
							placeholder="Введите номер телефона"
							:prefix-icon="Phone"
							clearable
						/>
					</el-form-item>
					<el-form-item label="Почта" prop="email">
						<el-input
							v-model="hotelDatas.email"
							placeholder="Введите почту"
							:prefix-icon="Message"
							clearable
						/>
					</el-form-item>
					<el-form-item label="Адрес" prop="addres">
						<el-input
							v-model="hotelDatas.addres"
							placeholder="Введите адрес"
							:prefix-icon="Location"
							clearable
						/>
					</el-form-item>
					<el-form-item>
						<el-button
							type="primary"
							@click="submitHotelForm(hotelFormRef)"
						>
							Сохранить
						</el-button>
						<el-button
							type="danger"
							plain
							@click="clearHotelDatas(hotelFormRef)"
						>
							Очистить
						</el-button>
					</el-form-item>
				</el-form>
			</el-card>
		</el-col></el-row
	>
</template>
