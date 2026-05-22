<template>
	<AppLayout>
		<el-container>
			<el-aside
				width="500px"
				style="background-color: #0f172a; height: 100vh"
				><Menu
			/></el-aside>
			<el-main><slot /></el-main>
		</el-container>
	</AppLayout>
</template>
