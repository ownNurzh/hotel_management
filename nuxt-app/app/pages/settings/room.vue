<script setup>
import { InfoFilled } from "@element-plus/icons-vue";

const roomTypesFormRef = ref();

const roomTypesForm = reactive({
	name: "",
	price: 0,
	capacity: 0,
});

const RoomTypesFormRules = {
	name: [{ required: true, message: "Введите название", trigger: "blur" }],
	price: [{ required: true, message: "Введите цену", trigger: "blur" }],
	capacity: [
		{ required: true, message: "Введите вместимость", trigger: "blur" },
	],
};

const RoomTypesDatas = [
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
];

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

const RoomDatas = [
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
];
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
					@submit.prevent="submitForm(roomTypesFormRef)"
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
					<el-form-item>
						<el-button
							type="primary"
							@click="submitForm(roomTypesFormRef)"
						>
							Создать
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
						<template #default>
							<el-button type="danger" size="small"
								>Удалить</el-button
							>
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
					@submit.prevent="submitForm(roomFormRef)"
				>
					<el-form-item label="Название" prop="name">
						<el-input
							v-model="roomForm.name"
							placeholder="Введите название"
							:prefix-icon="InfoFilled"
							clearable
						/>
					</el-form-item>

					<el-form-item label="Цена" prop="price">
						<el-input-number v-model="roomForm.price">
							<template #suffix>
								<span>KZT</span>
							</template>
						</el-input-number>
					</el-form-item>
					<el-form-item label="Вместимость" prop="capacity">
						<el-input-number v-model="roomForm.capacity">
						</el-input-number>
					</el-form-item>
					<el-form-item>
						<el-button
							type="primary"
							@click="submitForm(roomFormRef)"
						>
							Создать
						</el-button>
					</el-form-item>
				</el-form>
				<el-divider></el-divider>
				<el-table :data="RoomDatas" stripe height="200px">
					<el-table-column type="selection" width="55" />
					<el-table-column prop="id" label="#" />
					<el-table-column prop="name" label="Название" />
					<el-table-column prop="price" label="Цена" />
					<el-table-column prop="capacity" label="Вместимость" />
					<el-table-column fixed="right" label="Операций">
						<template #default>
							<el-button type="danger" size="small"
								>Удалить</el-button
							>
						</template>
					</el-table-column>
				</el-table>
			</el-card>
		</el-col>
	</el-row>
</template>

<style scope>
.el-row {
	margin-bottom: 25px;
}
</style>
