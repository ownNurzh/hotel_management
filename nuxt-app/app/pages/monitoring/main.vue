<script setup>
const roomStats = [
	{ name: "Свободна", type: "success", value: 34 },
	{ name: "Занята", type: "danger", value: 86 },
	{ name: "Ремонт", type: "warning", value: 12 },
	{ name: "Неактивна", type: "info", value: 8 },
];

const reservationStats = [
	{ name: "Подтверждено", type: "primary", value: 78 },
	{ name: "Заселён", type: "success", value: 44 },
	{ name: "Отменено", type: "danger", value: 310 },
	{ name: "Завершено", type: "info", value: 3778 },
];

const totalRooms = roomStats.reduce((s, i) => s + i.value, 0);
const totalReservations = reservationStats.reduce((s, i) => s + i.value, 0);

const tagColorMap = {
	success: "#67C23A",
	danger: "#F56C6C",
	warning: "#E6A23C",
	info: "#909399",
	primary: "#409EFF",
};
</script>

<template>
	<el-row style="margin-bottom: 20px">
		<el-col :span="24">
			<span style="font-size: 20px; font-weight: 600">Мониторинг</span>
		</el-col>
	</el-row>

	<el-row style="margin-bottom: 6px" align="middle">
		<el-col :span="24">
			<el-space>
				<el-text type="info" size="small" style="font-weight: 500">
					Номера
				</el-text>
				<el-tag size="small" effect="plain"
					>Всего: {{ totalRooms }}</el-tag
				>
			</el-space>
		</el-col>
	</el-row>

	<el-row :gutter="12" style="margin-bottom: 20px">
		<el-col :span="6" v-for="s in roomStats" :key="s.name">
			<el-card shadow="hover" style="height: 100%">
				<el-row justify="space-between" align="top">
					<el-col :span="24">
						<el-row style="margin-bottom: 10px">
							<el-tag :type="s.type" size="small" effect="light">
								{{ s.name }}
							</el-tag>
						</el-row>
						<el-statistic :value="s.value" />
						<el-row style="margin-top: 8px">
							<el-text type="info" size="small">
								{{ Math.round((s.value / totalRooms) * 100) }}%
								от общего
							</el-text>
						</el-row>
					</el-col>
				</el-row>
				<el-row style="margin-top: 12px">
					<el-progress
						:percentage="Math.round((s.value / totalRooms) * 100)"
						:color="tagColorMap[s.type]"
						:show-text="false"
						style="width: 100%"
					/>
				</el-row>
			</el-card>
		</el-col>
	</el-row>
	<el-row style="margin-bottom: 6px" align="middle">
		<el-col :span="24">
			<el-space>
				<el-text type="info" size="small" style="font-weight: 500">
					Бронирования
				</el-text>
				<el-tag size="small" effect="plain">
					Всего: {{ totalReservations }}
				</el-tag>
			</el-space>
		</el-col>
	</el-row>

	<el-row :gutter="12">
		<el-col :span="6" v-for="s in reservationStats" :key="s.name">
			<el-card shadow="hover" style="height: 100%">
				<el-row justify="space-between" align="top">
					<el-col :span="24">
						<el-row style="margin-bottom: 10px">
							<el-tag :type="s.type" size="small" effect="light">
								{{ s.name }}
							</el-tag>
						</el-row>
						<el-statistic :value="s.value" />
						<el-row style="margin-top: 8px">
							<el-text type="info" size="small">
								{{
									Math.round(
										(s.value / totalReservations) * 100,
									)
								}}% от общего
							</el-text>
						</el-row>
					</el-col>
				</el-row>
				<el-row style="margin-top: 12px">
					<el-progress
						:percentage="
							Math.round((s.value / totalReservations) * 100)
						"
						:color="tagColorMap[s.type]"
						:show-text="false"
						style="width: 100%"
					/>
				</el-row>
			</el-card>
		</el-col>
	</el-row>
</template>

<style scoped></style>
