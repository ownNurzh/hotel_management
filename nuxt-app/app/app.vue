<script setup>
import { ElLoading } from "element-plus";

const openFullScreen = () => {
	const loading = ElLoading.service({
		lock: true,
		text: "Загружается...",
		background: "rgba(33, 61, 91, 1)",
		customClass: "hotel-loading",
	});
	setTimeout(() => {
		loading.close();
	}, 500);
};

onMounted(() => {
	openFullScreen();
});
</script>
<template>
	<NuxtLoadingIndicator color="#409EFF" />
	<NuxtLayout>
		<NuxtPage />
	</NuxtLayout>
</template>
<style>
.hotel-loading .el-loading-spinner .el-loading-text {
	font-weight: bold;
	color: white !important;
	margin-top: 10px;
}
.hotel-loading .el-loading-spinner {
	transform: scale(1.1);
}

.hotel-loading .el-loading-spinner .path {
	stroke: white !important;
	stroke-width: 3;
	stroke-linecap: round;
}
</style>
