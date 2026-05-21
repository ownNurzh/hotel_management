<script setup>
const isLogged = await window?.session?.isLogged();
if (isLogged) {
	navigateTo("home");
} else {
	navigateTo("auth");
}
</script>
<template></template>
