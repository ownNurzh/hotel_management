<script setup>
import {
	Money,
	HomeFilled,
	Connection,
	Calendar,
	Clock,
	Food,
} from "@element-plus/icons-vue";

definePageMeta({
	layout: "clean",
});

const spacer = h(ElDivider, { direction: "vertical" });

const RoomTypesDatas = ref([
	{
		id: 1,
		name: "Standard Room",
		price: 5000,
		capacity: 2,
		images: [
			"https://picsum.photos/1200/800?1",
			"https://picsum.photos/1200/800?2",
		],
	},
	{
		id: 2,
		name: "Lux Suite",
		price: 10000,
		capacity: 4,
		images: ["https://picsum.photos/1200/800?3", ""],
	},
]);
async function refreshRoomTypes() {
	RoomTypesDatas.value = await window?.room?.getAllRoomTypes();
}
await refreshRoomTypes();
</script>

<template>
	<el-carousel height="100vh" direction="vertical" :autoplay="false">
		<el-carousel-item v-for="room in RoomTypesDatas" :key="room.id">
			<el-row>
				<el-col :span="24" style="background-color: #409eff">
					<el-carousel
						height="70vh"
						arrow="always"
						trigger="click"
						autoplay
						style="width: 97%; margin: auto; margin-top: 25px"
					>
						<el-carousel-item
							v-for="(image, img_key) in room.images"
							:key="img_key"
						>
							<el-image
								:src="`hotel://UserData/uploads/${image}`"
								fit="cover"
								style="width: 100%; height: 100%"
							/>
						</el-carousel-item> </el-carousel
				></el-col>
			</el-row>
			<el-divider></el-divider>
			<el-row>
				<el-col :span="8"></el-col>
				<el-col :span="8">
					<el-card>
						<template #header>
							<div style="text-align: center">
								<span
									>Название -
									<strong>{{ room.name }}</strong>
								</span>
							</div>
						</template>
						<el-space
							wrap
							style="
								margin-bottom: 15px;
								display: flex;
								align-items: center;
								justify-content: center;
							"
							:spacer="spacer"
						>
							<el-tag type="success" effect="light">
								<el-icon><Money /></el-icon>
								Выгодная цена
							</el-tag>
							<el-tag type="primary" effect="light">
								<el-icon><HomeFilled /></el-icon>
								Современный интерфейс
							</el-tag>

							<el-tag type="warning" effect="light">
								<el-icon style="margin-right: 4px"
									><Food
								/></el-icon>
								Хорошая еда
							</el-tag>
							<el-tag type="info" effect="light">
								<el-icon style="margin-right: 4px"
									><Connection
								/></el-icon>
								Бесплатный Wi-Fi
							</el-tag>

							<el-tag type="danger" effect="light">
								<el-icon style="margin-right: 4px"
									><Calendar
								/></el-icon>
								Бесплатная отмена
							</el-tag>

							<el-tag type="success" effect="light">
								<el-icon style="margin-right: 4px"
									><Clock
								/></el-icon>
								Заселение 24/7
							</el-tag>
						</el-space>
						<el-space
							:spacer="spacer"
							style="
								display: flex;
								align-items: center;
								justify-content: center;
							"
						>
							<el-button type="success" dashed round
								>Всего за {{ room.price }} KZT</el-button
							>
							<el-button type="warning" dashed round
								>Можно жить до
								{{ room.capacity }} людей</el-button
							>
						</el-space>
					</el-card></el-col
				>
				<el-col :span="8"></el-col>
			</el-row>
		</el-carousel-item>
	</el-carousel>
</template>
