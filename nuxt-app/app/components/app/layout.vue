<script setup lang="ts">
import ru from "element-plus/es/locale/lang/ru";
import en from "element-plus/es/locale/lang/en";
import kk from "element-plus/es/locale/lang/kk";

type langsT = "ru" | "en" | "kk";
const langs = { ru, en, kk };
const locale = ref(ru);

const switchLang = (lang: langsT) => {
	locale.value = langs[lang];
};
</script>

<template>
	<el-config-provider :locale="locale">
		<slot />
	</el-config-provider>
</template>
