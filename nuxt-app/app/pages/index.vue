<script setup>
import { ElLoading } from "element-plus";

const openFullScreen = () => {
	const loading = ElLoading.service({
		lock: true,
		text: "Загружается...",
		background: "rgba(0, 0, 0, 1)",
	});
	setTimeout(() => {
		loading.close();
	}, 2000);
};
openFullScreen();
</script>
<template></template>
