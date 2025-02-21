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
				影像監控
			</h1>
			<!-- List CTA -->
			<div v-for="(category, index) in categories" :key="index">
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
			<!-- IPC 網路攝影機 -->
			<div class="flex flex-col gap-[24px] md:gap-[36px] lg:gap-[48px]">
				<h2 class="text-center text-[24px] md:text-[36px] lg:text-[48px] font-bold py-[12px] md:py-[24px] border-b-2 border-black">IPC 網路攝影機</h2>
				<FilterSection v-for="(filter, index) in filters_01" :key="index" :name="filter.name" :options="filter.options" v-model="activeFilters[index]" />
			</div>

			<!-- NVR 網路錄影機 -->
			<div class="flex flex-col gap-[24px] md:gap-[36px] lg:gap-[48px]">
				<h2 class="text-center text-[24px] md:text-[36px] lg:text-[48px] font-bold py-[12px] md:py-[24px] border-b-2 border-black">IPC 網路攝影機</h2>
				<FilterSection v-for="(filter, index) in filters_02" :key="index" :name="filter.name" :options="filter.options" v-model="activeFilters[index]" />
			</div>

			<!-- 行為分析 -->
			<div class="flex flex-col gap-[24px] md:gap-[36px] lg:gap-[48px]">
				<!-- content -->
				<div class="flex flex-col md:flex-row justify-evenly items-center gap-[24px]">
					<!-- image -->
					<div class="bg-[#F3F5F7] w-[250px] md:w-[384px] aspect-square relative flex justify-center items-center">
						<span class="text-[16px] md:text-[21px] lg:text-[24px] absolute top-[12px] md:top-[24px] left-[12px] md:left-[24px]">iYS-BA04</span>
						<img class="w-[70%] aspect-square" src="/public/product/iYS-BA04.png" alt="iYS-BA04" />
					</div>
					<!-- text -->
					<div class="w-full lg:w-1/2 flex flex-col gap-[12px] lg:gap-[24px]">
						<h5 class="text-[24px] md:text-[36px] lg:text-[48px] font-bold text-center">行為分析</h5>
						<p class="text-[16px] lg:text-[24px]">
							具有行為分析的NVR，是基於深度學習算法，可檢測不戴安全帽，工作行為，街頭行為和周圍情況，並及時觸發警報，可有效提高各個地方的安全性。
						</p>
					</div>
				</div>
				<!-- features -->
				<div class="grid grid-cols-2 lg:grid-cols-4 gap-[24px]">
					<div v-for="category in features" :key="category.title" class="border-[1px] border-[#2A7797] aspect-square">
						<div class="w-full relative">
							<img class="w-full" :src="category.image" alt="" />
							<span class="text-white text-[16px] md:text-[24px] absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-2/3 whitespace-nowrap">
								{{ category.title }}
							</span>
						</div>
						<div v-for="item in category.items" :key="item.text" class="flex items-center gap-[8px] pt-[4px] md:pt-[8px] lg:pt-[12px] px-[16px]">
							<svg class="w-[24px] lg:w-[36px] aspect-square -rotate-6 flex-shrink-0" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
								<path
									d="M438.6 105.4c12.5 12.5 12.5 32.8 0 45.3l-256 256c-12.5 12.5-32.8 12.5-45.3 0l-128-128c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0L160 338.7 393.4 105.4c12.5-12.5 32.8-12.5 45.3 0z"
								/>
							</svg>
							<p class="text-[12px] md:text-[16px]">{{ item.text }}</p>
						</div>
					</div>
				</div>
			</div>
		</div>
		<!-- View More -->
		<div class="w-full overflow-hidden pt-[24px] md:pt-[48px]">
			<span class="text-[48px] lg:text-[96px] text-primary opacity-50 text-nowrap">OUR SERVICE OUR SERVICE OUR SERVICE</span>
			<div class="w-fit mx-auto grid grid-cols-2 lg:grid-cols-4 gap-[12px] md:gap-[24px] pt-[24px] md:pt-[48px]">
				<ButtonCTA label="可視對講" to="/products/Video-Intercom"></ButtonCTA>
				<ButtonCTA label="門禁管理" to="/products/Access-Control"></ButtonCTA>
				<ButtonCTA label="安全防護" to="/products/Security-Solutions"></ButtonCTA>
				<ButtonCTA label="其他設備" to="/products/Devices-Accessories"></ButtonCTA>
			</div>
		</div>
	</div>
</template>

<script setup>
// 可展開的 CTA 選單
const categories = [
	{
		id: "first",
		title: "IPC 網路攝影機",
		items: ["解析度", "特定功能", "特殊場景"]
	},
	{
		id: "second",
		title: "NVR 網路錄影機",
		items: ["基本款", "行為分析"]
	}
];

// 控制目前展開的選單
const active = ref("first");
const toggleActive = (id) => {
	active.value = active.value === id ? null : id;
};

// 設定篩選分類
const filters_01 = [
	{ name: "解析度", options: ["ALL", "2M", "4M", "8M", "12M"] },
	{ name: "特定功能", options: ["ALL", "車牌辨識", "客流統計", "測速功能", "變焦鏡頭"] },
	{ name: "特殊場景", options: ["ALL", "4G太陽能", "低溫", "魚眼", "微型", "電梯用"] }
];
const filters_02 = [{ name: "基本款", options: ["ALL", "小型系統", "中型系統", "大型系統"] }];

// 記錄當前選擇的篩選條件
const activeFilters = ref("ALL");

const features = [
	{
		title: "安全帽檢測",
		image: "/features/behavioral.png",
		items: [{ text: "不戴安全帽檢測" }, { text: "支持人臉識別功能" }]
	},
	{
		title: "工作行為分析",
		image: "/features/behavioral.png",
		items: [{ text: "缺勤/值班睡覺" }, { text: "人員滯留檢測" }, { text: "人數異常檢測" }, { text: "使用手機檢測" }]
	},
	{
		title: "街頭行為分析",
		image: "/features/behavioral.png",
		items: [{ text: "人群聚集檢測" }, { text: "人員奔跑檢測" }, { text: "劇烈運動檢測" }, { text: "跌倒檢測" }]
	},
	{
		title: "周界防護",
		image: "/features/behavioral.png",
		items: [{ text: "穿越線檢測" }, { text: "入侵檢測" }, { text: "區域入侵檢測" }, { text: "區域離開檢測" }]
	}
];
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
