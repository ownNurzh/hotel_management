<script setup>
import {
	Menu,
	Platform,
	Calendar,
	Avatar,
	Management,
	Setting,
	SwitchButton,
} from "@element-plus/icons-vue";
import { ElMessage } from "element-plus";
const sessionDatas = await window?.session?.get();
const userDatas = await window?.user?.getByLogin(sessionDatas.login);
async function leave() {
	await window?.session?.clear();
	ElMessage({
		message: "Вы вышли.",
		type: "info",
	});
	return navigateTo("/auth");
}
const profileVisible = ref(false);
</script>
<template>
	<el-menu
		default-active="/monitoring/main"
		router
		style="
			--el-menu-bg-color: #0f172a;
			--el-menu-text-color: #fff;
			--el-menu-active-color: #00bce4;
			height: 100%;
			display: flex;
			flex-direction: column;
		"
	>
		<span
			style="
				font-size: 25px;
				display: flex;
				justify-content: center;
				align-items: center;
				color: white;
				margin-bottom: 2px;
				gap: 3px;
			"
			>Hotel System<el-icon><Management /></el-icon
		></span>

		<el-sub-menu index="/monitoring">
			<template #title>
				<el-icon><Platform /></el-icon>
				<span>Мониторинг</span>
			</template>
			<el-menu-item-group title="Основные">
				<el-menu-item index="/monitoring/main">Общий</el-menu-item>
				<el-menu-item index="/monitoring/payments"
					>Платежи</el-menu-item
				>
			</el-menu-item-group>
		</el-sub-menu>
		<el-menu-item index="/reservation">
			<el-icon><Calendar /></el-icon>
			<span>Бронирование</span>
		</el-menu-item>
		<el-menu-item index="/guests">
			<el-icon><Avatar /></el-icon>
			<span>Гости</span>
		</el-menu-item>
		<el-sub-menu index="/settings">
			<template #title>
				<el-icon><Setting /></el-icon>
				<span>Настройки</span>
			</template>
			<el-menu-item-group title="Основные">
				<el-menu-item index="/settings/room">Комната</el-menu-item>
				<el-menu-item index="/settings/hotel">Отель</el-menu-item>
			</el-menu-item-group>
		</el-sub-menu>
		<div style="flex: 1" />
		<div
			@click="profileVisible = true"
			style="
				display: flex;
				align-items: center;
				gap: 10px;
				padding: 12px 16px;
				border-top: 1px solid #1e293b;
				cursor: pointer;
			"
		>
			<el-avatar style="background-color: #00bce4; flex-shrink: 0">
				<span style="font-weight: bold; text-transform: uppercase">{{
					userDatas.login.substring(0, 1)
				}}</span>
			</el-avatar>
			<el-divider direction="vertical" />
			<div style="overflow: hidden">
				<div
					style="
						color: #fff;
						font-size: 14px;
						font-weight: 500;
						white-space: nowrap;
						overflow: hidden;
						text-overflow: ellipsis;
					"
				>
					{{ userDatas.role_name }}
				</div>
				<div
					style="
						color: #94a3b8;
						font-size: 12px;
						white-space: nowrap;
						overflow: hidden;
						text-overflow: ellipsis;
					"
				>
					{{ userDatas.login }}
				</div>
			</div>
			<el-divider direction="vertical" />
			<el-button
				type="danger"
				:icon="SwitchButton"
				circle
				@click="leave()"
			/>
		</div>
		<el-dialog
			align-center
			v-model="profileVisible"
			:title="'Профиль - ' + userDatas.login"
			width="25%"
			center
		>
			<el-divider>
				<el-avatar
					size="large"
					style="background-color: #00bce4; font-size: 20px"
				>
					<span
						style="font-weight: bold; text-transform: uppercase"
						>{{ userDatas.login.substring(0, 1) }}</span
					>
				</el-avatar></el-divider
			>
			<el-descriptions border :column="1" style="margin-top: 50px">
				<el-descriptions-item
					v-for="(key, value) in userDatas"
					:label="key"
					:key="key"
					align="center"
				>
					{{ value }}
				</el-descriptions-item>
			</el-descriptions>
			<template #footer>
				<el-button type="danger" @click="leave()"
					>Выйти</el-button
				></template
			>
		</el-dialog>
	</el-menu>
</template>
