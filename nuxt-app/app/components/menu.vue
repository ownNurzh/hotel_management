<script setup>
import {
	Menu,
	Platform,
	Calendar,
	Avatar,
	Management,
	Setting,
} from "@element-plus/icons-vue";
</script>
<template>
	<el-menu
		default-active="/monitoring/main"
		router
		style="
			--el-menu-bg-color: #0f172a;
			--el-menu-text-color: #fff;
			--el-menu-active-color: #00bce4;
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
			"
			>HotelSys<el-icon><Management /></el-icon
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
		<el-menu-item index="/rooms">
			<el-icon><Menu /></el-icon>
			<span>Комнаты</span>
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
			<el-menu-item index="/settings/app">
				<span>Приложение</span>
			</el-menu-item>
		</el-sub-menu>
	</el-menu>
</template>
