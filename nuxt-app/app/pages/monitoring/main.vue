<script setup>
const appConfig = useAppConfig();

const roomStats = ref([]);

const reservationStats = ref([]);
const totalRooms = ref(0);
const totalReservations = ref(0);
async function refreshDatas() {
	roomStats.value = await window?.room?.getStatusCounts();
	reservationStats.value = await window?.reservation?.getStatusCounts();
	totalRooms.value = roomStats.value.reduce((s, i) => s + i.count, 0);
	totalReservations.value = reservationStats.value.reduce(
		(s, i) => s + i.count,
		0,
	);
}
await refreshDatas();

const tagColorMap = {
	success: "#67C23A",
	danger: "#F56C6C",
	warning: "#E6A23C",
	info: "#909399",
	primary: "#409EFF",
};
const hotelDatasInDb = await window?.hotel?.get();
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
		<el-col :span="6" v-for="obj in roomStats" :key="obj.status">
			<el-card shadow="hover" style="height: 100%">
				<el-row justify="space-between" align="top">
					<el-col :span="24">
						<el-row style="margin-bottom: 10px">
							<el-tag
								:type="appConfig.roomStatus[obj.status].type"
								size="small"
								effect="light"
							>
								{{ appConfig.roomStatus[obj.status].name }}
							</el-tag>
						</el-row>
						<el-statistic :value="obj.count" />
						<el-row style="margin-top: 8px">
							<el-text type="info" size="small">
								{{
									Math.round((obj.count / totalRooms) * 100)
								}}% от общего
							</el-text>
						</el-row>
					</el-col>
				</el-row>
				<el-row style="margin-top: 12px">
					<el-progress
						:percentage="Math.round((obj.count / totalRooms) * 100)"
						:color="
							tagColorMap[appConfig.roomStatus[obj.status].type]
						"
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
		<el-col :span="6" v-for="obj in reservationStats" :key="obj.status">
			<el-card shadow="hover" style="height: 100%">
				<el-row justify="space-between" align="top">
					<el-col :span="24">
						<el-row style="margin-bottom: 10px">
							<el-tag
								:type="
									appConfig.reservationStatus[obj.status].type
								"
								size="small"
								effect="light"
							>
								{{
									appConfig.reservationStatus[obj.status].name
								}}
							</el-tag>
						</el-row>
						<el-statistic :value="obj.count" />
						<el-row style="margin-top: 8px">
							<el-text type="info" size="small">
								{{
									Math.round(
										(obj.count / totalReservations) * 100,
									)
								}}% от общего
							</el-text>
						</el-row>
					</el-col>
				</el-row>
				<el-row style="margin-top: 12px">
					<el-progress
						:percentage="
							Math.round((obj.count / totalReservations) * 100)
						"
						:color="
							tagColorMap[
								appConfig.reservationStatus[obj.status].type
							]
						"
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
					Данные отеля
				</el-text>
			</el-space>
		</el-col>
	</el-row>

	<el-row>
		<el-col :span="24">
			<el-descriptions border column="2">
				<el-descriptions-item
					v-if="hotelDatasInDb != null"
					v-for="(key, value) in hotelDatasInDb"
					:label="value"
					:key="key"
					align="center"
				>
					{{ key }}
				</el-descriptions-item>
			</el-descriptions>
		</el-col>
	</el-row>
</template>

<style scoped></style>
