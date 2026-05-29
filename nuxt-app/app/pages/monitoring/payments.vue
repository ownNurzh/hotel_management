<script setup>
const paymentsDatas = ref([
	{
		id: 1,
		reservation_id: 0,
		total_money: 5000,
		created_at: "",
	},
	{
		id: 1,
		reservation_id: 0,
		total_money: 5000,
		created_at: "",
	},
	{
		id: 1,
		reservation_id: 0,
		total_money: 5000,
		created_at: "",
	},
	{
		id: 1,
		reservation_id: 0,
		total_money: 5000,
		created_at: "",
	},
]);

const getSummaries = (param) => {
	const { columns, data } = param;
	const sums = [];
	columns.forEach((column, index) => {
		if (index === 0) {
			sums[index] = h("div", { style: { textDecoration: "underline" } }, [
				"&",
			]);
			return;
		}
		if (column.property != "total_money") {
			sums[index] = "N/A";
			return;
		}
		const values = data.map((item) => Number(item[column.property]));
		if (!values.every((value) => Number.isNaN(value))) {
			sums[index] = `${values.reduce((prev, curr) => {
				const value = Number(curr);
				if (!Number.isNaN(value)) {
					return prev + curr;
				} else {
					return prev;
				}
			}, 0)} KZT`;
		} else {
			sums[index] = "N/A";
		}
	});

	return sums;
};

async function refreshPayments() {
	paymentsDatas.value = await window?.payments?.getAll();
}
await refreshPayments();
</script>
<template>
	<el-row>
		<el-col :span="24">
			<el-card>
				<template #header>
					<h1 style="font-weight: bold; font-size: 20px">Платежи</h1>
				</template>
				<el-table
					:data="paymentsDatas"
					stripe
					height="500px"
					show-summary
					:summary-method="getSummaries"
				>
					<el-table-column type="selection" width="55" />
					<el-table-column prop="id" label="#" />
					<el-table-column prop="reservation_id" label="Айди брони" />
					<el-table-column
						prop="total_money"
						label="Оплачено"
						sortable
					/>
					<el-table-column
						prop="created_at"
						label="Дата создание"
						sortable
					/>
				</el-table>
			</el-card>
		</el-col>
	</el-row>
</template>
