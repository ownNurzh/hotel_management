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
			<el-aside
				width="225px"
				style="height: 100vh; background-color: #0f172a"
				><Menu
			/></el-aside>
			<el-main style="height: 100vh; overflow-y: auto"><slot /></el-main>
		</el-container>
	</AppLayout>
</template>
