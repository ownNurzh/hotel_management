<script setup>
const isLogged = await window?.session?.isLogged();
if (isLogged) {
	navigateTo("/monitoring/main");
} else {
	navigateTo("auth");
}
</script>
<template></template>
