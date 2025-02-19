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
				可視對講
			</h1>
			<!-- List CTA -->
			<div
				@click="toggleActive('first')"
				:class="active === 'first' ? 'trapezoid-long' : 'trapezoid-short'"
				class="bg-gray-300 font-bold py-[8px] cursor-pointer transition-all duration-300"
			>
				可視對講機
			</div>
			<!-- List -->
			<div v-if="active === 'first'" class="flex flex-col gap-[12px] lg:gap-[24px] ps-[24px] md:ps-[36px] lg:ps-[48px] transition-discrete">
				<div class="text-[16px] md:text-[21px] lg:text-[24px]">- 大門口機</div>
				<div class="text-[16px] md:text-[21px] lg:text-[24px]">- 室內機</div>
				<div class="text-[16px] md:text-[21px] lg:text-[24px]">- 二線式</div>
			</div>
			<!-- List CTA -->
			<div
				@click="toggleActive('second')"
				:class="active === 'second' ? 'trapezoid-long' : 'trapezoid-short'"
				class="bg-gray-300 font-bold py-[8px] cursor-pointer transition-all duration-300"
			>
				管理中心主機
			</div>
		</div>
	</div>
	<!-- product -->
	<div class="w-full bg-white py-[48px] md:py-[144px]">
		<div class="container bg-white flex flex-col gap-[24px] md:gap-[36px] lg:gap-[48px]">
			<!-- 可視對講機 -->
			<h2 class="text-center text-[24px] md:text-[36px] lg:text-[48px] font-bold py-[12px] md:py-[24px] border-b-2 border-black">可視對講機</h2>
			<FilterSection v-for="(filter, index) in filters" :key="index" :name="filter.name" :options="filter.options" v-model="activeFilters[index]" />
			<!-- 管理中心主機 -->
			<h2 class="text-center text-[24px] md:text-[36px] lg:text-[48px] font-bold py-[12px] md:py-[24px] border-b-2 border-black">管理中心主機</h2>
			<div class="flex flex-col md:flex-row justify-evenly items-center gap-[24px]">
				<!-- image -->
				<div class="bg-[#F3F5F7] w-[250px] md:w-[384px] aspect-square relative flex justify-center items-center">
					<span class="text-[16px] md:text-[21px] lg:text-[24px] absolute top-[12px] md:top-[24px] left-[12px] md:left-[24px]">YS-9503</span>
					<img class="w-[70%] aspect-square" src="/public/product/YS-9503.png" alt="管理中心主機" />
				</div>
				<!-- features -->
				<div class="flex flex-col gap-[24px] justify-center">
					<h5 class="text-[21px] md:text-[28px] lg:text-[32px] text-center font-bold w-full">產品特點</h5>
					<div class="flex items-center gap-[12px] md:gap-[24px]">
						<img class="w-[36px] md:w-[60px] aspect-square" src="/public/features/ys-9503-01.png" alt="touchable" />
						<span class="text-[16px] md:text-[21px] lg:text-[24px]">高解析觸控螢幕，操作直觀便利</span>
					</div>
					<div class="flex items-center gap-[12px] md:gap-[24px]">
						<img class="w-[36px] md:w-[60px] aspect-square" src="/public/features/ys-9503-02.png" alt="touchable" />
						<span class="text-[16px] md:text-[21px] lg:text-[24px]">內建麥克風與喇叭，支援清晰的語音通訊</span>
					</div>
					<div class="flex items-center gap-[12px] md:gap-[24px]">
						<img class="w-[36px] md:w-[60px] aspect-square" src="/public/features/ys-9503-03.png" alt="touchable" />
						<span class="text-[16px] md:text-[21px] lg:text-[24px]">採用 Android 系統，支持多種智慧管理應用</span>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script setup>
// 預設第一個為「長」
const active = ref("first");

// 切換點擊的 CTA
const toggleActive = (type) => {
	active.value = type;
};

// 設定篩選分類
const filters = [
	{ name: "大門口機", options: ["ALL", "大樓用", "別墅用", "模組化", "雨遮"] },
	{ name: "室內機", options: ["ALL", "無影像", "4.3吋", "7吋", "10吋"] },
	{ name: "二線式", options: ["ALL", "大門口機", "室內機", "分佈器"] }
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
