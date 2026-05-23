<!-- <template>
	<AppLayout>
		<el-container direction="vertical">
			<AppHeader />
			<el-main><slot /></el-main>
			<AppFooter />
		</el-container>
	</AppLayout>
</template> -->
<script setup></script>
<template>
	<AppLayout>
		<el-container>
			<el-aside width="225px" style="height: 100vh"><Menu /></el-aside>
			<el-main><slot /></el-main>
		</el-container>
	</AppLayout>
</template>
