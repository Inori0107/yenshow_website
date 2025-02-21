<template>
	<div class="w-full bg-white relative overflow-hidden">
		<!-- image -->
		<div class="w-[400px] md:w-2/3 aspect-square absolute right-0 bottom-0 lg:top-0 translate-x-1/3 lg:-translate-y-1/3">
			<span class="text-[24px] md:text-[36px] lg:text-[48px] absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">暢銷商品</span>
			<svg viewBox="0 0 800 800" class="circles">
				<!-- 內圍青綠色圓弧 -->
				<circle cx="400" cy="400" r="200" class="circle-inline dashed" />
				<!-- 外圍藍色圓弧 -->
				<circle cx="400" cy="400" r="400" class="circle-outline dashed" />
			</svg>
		</div>
		<!-- content -->
		<div class="min-h-screen flex flex-col gap-[24px] md:gap-[36px] lg:gap-[48px]">
			<!-- title -->
			<h1 class="text-[48px] md:text-[64px] lg:text-[96px] xl:text-[128px] opacity-50 mt-[96px] md:mt-[48px] ms-[32px] md:ms-[48px] lg:ms-[64px] font-bold">
				其他設備
			</h1>
			<!-- List CTA -->
			<div v-for="(category, index) in intercoms" :key="index">
				<div
					@click="toggleActive(category.id)"
					:class="active === category.id ? 'trapezoid-long' : 'trapezoid-short'"
					class="bg-gray-300 font-bold py-[8px] cursor-pointer transition-all duration-300"
				>
					{{ category.title }}
				</div>
				<!-- List -->
				<div
					v-if="active === category.id"
					class="flex flex-col gap-[12px] lg:gap-[24px] pt-[12px] lg:pt-[24px] ps-[24px] md:ps-[36px] lg:ps-[48px] transition-discrete"
				>
					<div v-for="item in category.items" :key="item" class="text-[16px] md:text-[21px] lg:text-[24px]">- {{ item }}</div>
				</div>
			</div>
		</div>
	</div>
	<!-- product -->
	<div class="w-full bg-white py-[48px] md:py-[144px]">
		<div class="container bg-white flex flex-col gap-[48px] md:gap-[96px] lg:gap-[144px]">
			<!-- 網路&軟體設備 -->
			<div class="flex flex-col gap-[24px] md:gap-[36px] lg:gap-[48px]">
				<h2 class="text-center text-[24px] md:text-[36px] lg:text-[48px] font-bold py-[12px] md:py-[24px] border-b-2 border-black">網路&軟體設備</h2>
				<!-- IP speaker -->
				<h4 class="text-[16px] md:text-[24px] lg:text-[36px]">IP speaker</h4>
				<div class="grid grid-cols-1 md:grid-cols-2 gap-[24px]">
					<div class="bg-[#F3F5F7] w-full relative flex justify-center items-center">
						<span class="text-[16px] md:text-[21px] lg:text-[24px] absolute top-[12px] md:top-[24px] left-[12px] md:left-[24px]">YS-PA0103-B</span>
						<span class="text-[16px] md:text-[21px] lg:text-[24px] absolute top-[32px] md:top-[56px] left-[12px] md:left-[24px]">IP 喇叭</span>
						<img class="w-2/5 aspect-square ms-[48px] md:ms-[96px]" src="/public/product/YS-PA0103-B.png" alt="YS-PA0103-B" />
					</div>
					<div class="bg-[#F3F5F7] relative flex justify-center items-center">
						<span class="text-[16px] md:text-[21px] lg:text-[24px] absolute top-[12px] md:top-[24px] right-[12px] md:right-[24px]">YS-QAZ1307G1T-E</span>
						<span class="text-[16px] md:text-[21px] lg:text-[24px] absolute top-[32px] md:top-[56px] right-[12px] md:right-[24px]">7W 網路喇叭</span>
						<img class="w-2/5 aspect-square me-[48px] md:me-[96px]" src="/public/product/YS-QAZ1307G1T-E.png" alt="YS-QAZ1307G1T-E" />
					</div>
				</div>
				<!-- PoE -->
				<FilterSection v-for="(filter, index) in PoE_filters" :key="index" :name="filter.name" :options="filter.options" v-model="activeFilters[index]" />
				<!-- 工作站 -->
				<h4 class="text-[16px] md:text-[24px] lg:text-[36px]">工作站</h4>
				<div class="grid grid-cols-1 md:grid-cols-2 gap-[24px]">
					<div class="bg-[#F3F5F7] w-full relative flex justify-center items-center">
						<span class="text-[16px] md:text-[21px] lg:text-[24px] absolute top-[12px] md:top-[24px] left-[12px] md:left-[24px]">YSCentral</span>
						<img class="w-2/5 aspect-square ms-[48px] md:ms-[96px]" src="/public/product/YSCentral.png" alt="YSCentral" />
					</div>
					<div class="bg-[#F3F5F7] relative flex justify-center items-center">
						<span class="text-[16px] md:text-[21px] lg:text-[24px] absolute top-[12px] md:top-[24px] right-[12px] md:right-[24px]">YS-11D-C_HW01 1U</span>
						<span class="text-[16px] md:text-[21px] lg:text-[24px] absolute top-[32px] md:top-[56px] right-[12px] md:right-[24px]">1U 機架服務器</span>
						<img class="w-2/5 aspect-square me-[48px] md:me-[96px]" src="/public/product/YS-11D-C_HW01 1U.png" alt="YS-11D-C_HW01 1U" />
					</div>
				</div>
			</div>
			<!-- 周邊設備 -->
			<div class="flex flex-col gap-[24px] md:gap-[36px] lg:gap-[48px]">
				<h2 class="text-center text-[24px] md:text-[36px] lg:text-[48px] font-bold py-[12px] md:py-[24px] border-b-2 border-black">周邊設備</h2>
				<!-- PoE -->
				<FilterSection v-for="(filter, index) in others_filters" :key="index" :name="filter.name" :options="filter.options" v-model="activeFilters[index]" />
			</div>
			<!-- 特殊應用 -->
			<div class="flex flex-col gap-[24px] md:gap-[36px] lg:gap-[48px]">
				<h2 class="text-center text-[24px] md:text-[36px] lg:text-[48px] font-bold py-[12px] md:py-[24px] border-b-2 border-black">特殊應用</h2>
				<!-- 手持智能數據機 -->
				<h4 class="text-[16px] md:text-[24px] lg:text-[36px]">手持智能數據機</h4>
				<div class="grid grid-cols-1 md:grid-cols-2 gap-[24px]">
					<div class="bg-[#F3F5F7] w-full relative flex justify-center items-center">
						<span class="text-[16px] md:text-[21px] lg:text-[24px] absolute top-[12px] md:top-[24px] left-[12px] md:left-[24px]">YS-MDT201</span>
						<span class="text-[16px] md:text-[21px] lg:text-[24px] absolute top-[32px] md:top-[56px] left-[12px] md:left-[24px]">手持式掃描儀</span>
						<img class="w-2/5 aspect-square ms-[48px] md:ms-[96px]" src="/public/product/YS-MDT201.png" alt="YS-MDT201" />
					</div>
					<div class="bg-[#F3F5F7] relative flex justify-center items-center">
						<span class="text-[16px] md:text-[21px] lg:text-[24px] absolute top-[12px] md:top-[24px] right-[12px] md:right-[24px]">YS MDT301</span>
						<span class="text-[16px] md:text-[21px] lg:text-[24px] absolute top-[32px] md:top-[56px] right-[12px] md:right-[24px]">鍵盤手持式掃描儀</span>
						<img class="w-2/5 aspect-square me-[48px] md:me-[96px]" src="/public/product/YS MDT301.png" alt="YS MDT301" />
					</div>
				</div>
				<!-- product -->
				<FilterSection
					v-for="(filter, index) in applications_filters"
					:key="index"
					:name="filter.name"
					:options="filter.options"
					v-model="activeFilters[index]"
				/>
			</div>
		</div>
		<!-- View More -->
		<div class="w-full overflow-hidden pt-[24px] md:pt-[48px]">
			<span class="text-[48px] lg:text-[96px] text-primary opacity-50 text-nowrap">OUR SERVICE OUR SERVICE OUR SERVICE</span>
			<div class="w-fit mx-auto grid grid-cols-2 lg:grid-cols-4 gap-[12px] md:gap-[24px] pt-[24px] md:pt-[48px]">
				<ButtonCTA label="可視對講" to="/products/Video-Intercom"></ButtonCTA>
				<ButtonCTA label="門禁管理" to="/products/Access-Control"></ButtonCTA>
				<ButtonCTA label="影像監控" to="/products/Surveillance-Monitoring"></ButtonCTA>
				<ButtonCTA label="安全防護" to="/products/Security-Solutions"></ButtonCTA>
			</div>
		</div>
	</div>
</template>

<script setup>
const intercoms = [
	{
		id: "first",
		title: "網路＆軟體設備",
		items: ["IP speaker", "PoE", "工作站"]
	},
	{
		id: "second",
		title: "周邊設備",
		items: ["支架", "出口按鈕"]
	},
	{
		id: "third",
		title: "特殊應用",
		items: ["手持式智能數據機", "LED", "支付機", "長照系列"]
	}
];
const active = ref("first");

const toggleActive = (id) => {
	active.value = active.value === id ? null : id;
};

// 設定篩選分類
const PoE_filters = [{ name: "PoE", options: ["ALL", "4-port", "8-port", "16-port", "24-port"] }];
const others_filters = [
	{ name: "支架", options: ["ALL", "桌上型", "落地型", "安裝支架"] },
	{ name: "出口按鈕", options: null }
];
const applications_filters = [
	{ name: "LED", options: null },
	{ name: "支付機", options: null },
	{ name: "長照系統", options: null }
];

// 記錄當前選擇的篩選條件
const activeFilters = ref("ALL");
</script>

<style scoped>
.trapezoid-short {
	width: 300px;
	clip-path: polygon(0 0, 100% 0, 90% 100%, 0% 100%);
	font-size: 24px;
	padding-left: 24px;
}
.trapezoid-long {
	width: 500px;
	clip-path: polygon(0 0, 100% 0, 90% 100%, 0% 100%);
	font-size: 36px;
	padding-left: 48px;
}

/* 1024px 以下的 RWD 調整 */
@media (max-width: 1024px) {
	.trapezoid-short {
		width: 210px;
		font-size: 18px;
		padding-left: 12px;
	}
	.trapezoid-long {
		width: 350px; /* 確保長版比短版大 */
		font-size: 28px;
		padding-left: 24px;
	}
}

/* 768px 以下的 RWD 調整 */
@media (max-width: 768px) {
	.trapezoid-short {
		width: 150px;
		font-size: 16px;
		padding-left: 8px;
	}
	.trapezoid-long {
		width: 250px; /* 確保長版比短版大 */
		font-size: 24px;
		padding-left: 16px;
	}
}

/* SVG 圖形設定 */
.circles {
	position: absolute;
	width: 100%;
	height: 100%;
}

/* 基礎圓弧 */
.circle-inline {
	fill: none;
	stroke: #66bab7;
	stroke-width: 2;
	stroke-dasharray: 150 50; /* 產生圓弧的破折線 */
}

.circle-outline {
	fill: none;
	stroke: #3a8fb7;
	stroke-width: 2;
	stroke-dasharray: 150 50; /* 產生圓弧的破折線 */
}
</style>
