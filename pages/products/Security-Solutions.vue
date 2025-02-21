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
				安全防護
			</h1>
			<!-- List CTA -->
			<div v-for="(category, index) in securityCategories" :key="index">
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
			<!-- 人體測溫 -->
			<div class="flex flex-col gap-[24px] md:gap-[36px] lg:gap-[48px]">
				<h2 class="text-center text-[24px] md:text-[36px] lg:text-[48px] font-bold py-[12px] md:py-[24px] border-b-2 border-black">可視對講機</h2>
				<!-- 監控平板 -->
				<div class="flex flex-col md:flex-row justify-evenly items-center gap-[24px]">
					<!-- image -->
					<div class="bg-[#F3F5F7] w-[250px] md:w-[384px] aspect-square relative flex justify-center items-center">
						<span class="text-[16px] md:text-[21px] lg:text-[24px] absolute top-[12px] md:top-[24px] left-[12px] md:left-[24px]">YS MT-01</span>
						<span class="text-[16px] md:text-[21px] lg:text-[24px] absolute top-[33px] md:top-[56px] left-[12px] md:left-[24px]">4.5吋人臉辨識門禁機</span>
						<img class="w-[70%] aspect-square" src="/public/product/YS MT-01.png" alt="監控平板" />
					</div>
					<!-- features -->
					<div class="flex flex-col gap-[24px] justify-center">
						<h5 class="text-[21px] md:text-[28px] lg:text-[32px] text-center font-bold w-full">監控平板</h5>
						<div class="grid grid-cols-1 lg:grid-cols-2 gap-[12px] lg:gap-[24px]">
							<div v-for="feature in features" :key="feature.text" class="flex items-center gap-[12px] md:gap-[24px]">
								<img class="w-[36px] md:w-[48px] lg:w-[60px] aspect-square" :src="feature.icon" alt="feature-icon" />
								<span class="text-[16px] md:text-[21px] lg:text-[24px]">{{ feature.text }}</span>
							</div>
						</div>
					</div>
				</div>
				<!-- product -->
				<div class="grid grid-cols-1 lg:grid-cols-2 gap-[16px] md:gap-[36px] lg:gap-[48px]">
					<div class="flex md:flex-col items-center gap-[24px] md:gap-[36px] lg:gap-[48px]">
						<h5 class="vertical-text text-[21px] md:text-[28px] lg:text-[36px]">門禁測溫</h5>
						<div class="scroll-container w-full flex gap-[16px] md:gap-[24px]">
							<div v-for="item in FTC" :key="item.image" class="scroll-item w-[250px] md:w-[50%] aspect-square relative">
								<img class="w-3/5 aspect-square mb-[12px] md:mb-[16px] lg:mb-[24px]" :src="item.image" alt="產品圖片" />
								<span class="text-[16px] md:text-[21px] lg:text-[24px] whitespace-pre-line absolute top-[12px] left-[12px] lg:top-[24px] lg:left-[24px]">
									{{ item.text }}
								</span>
							</div>
						</div>
					</div>
					<div class="flex md:flex-col items-center gap-[24px] md:gap-[36px] lg:gap-[48px]">
						<h5 class="vertical-text text-[21px] md:text-[28px] lg:text-[36px]">門禁測溫</h5>
						<div class="scroll-container w-full flex gap-[16px] md:gap-[24px]">
							<div v-for="item in TBC" :key="item.image" class="scroll-item w-[250px] md:w-[50%] aspect-square relative">
								<img class="w-3/5 aspect-square mb-[12px] md:mb-[16px] lg:mb-[24px]" :src="item.image" alt="產品圖片" />
								<span class="text-[16px] md:text-[21px] lg:text-[24px] whitespace-pre-line absolute top-[12px] left-[12px] lg:top-[24px] lg:left-[24px]">
									{{ item.text }}
								</span>
							</div>
						</div>
					</div>
				</div>
			</div>

			<!-- 無線警報 -->
			<div class="flex flex-col gap-[24px] md:gap-[36px] lg:gap-[48px]">
				<h2 class="text-center text-[24px] md:text-[36px] lg:text-[48px] font-bold py-[12px] md:py-[24px] border-b-2 border-black">無線警報</h2>
				<h3 class=""></h3>
				<img src="/public/features/YX PRO.png" alt="YX PRO" />
				<div class="flex flex-col md:flex-row justify-center gap-[24px] md:gap-[36px] lg:gap-[48px]">
					<div class="w-[250px] md:w-1/3 aspect-auto relative bg-[#f4f5f7] flex justify-center items-center">
						<img class="w-full aspect-auto" src="/public/product/YS-PWA64:96.png" alt="YX PRO" />
						<span class="text-[16px] md:text-[21px] lg:text-[24px] whitespace-pre-line absolute top-[12px] left-[12px] lg:top-[24px] lg:left-[24px]">
							YX PRO
						</span>
					</div>
					<div class="w-[250px] md:w-1/3 aspect-auto relative bg-[#f4f5f7] flex justify-center items-center">
						<img class="w-3/5 aspect-auto" src="/public/product/YS-PR1-WB.png" alt="YS PR1-WB" />
						<span class="text-[16px] md:text-[21px] lg:text-[24px] whitespace-pre-line absolute top-[12px] left-[12px] lg:top-[24px] lg:left-[24px]">
							YS PR1-WB
						</span>
					</div>
				</div>
				<!-- 警報設備 -->
				<FilterSection v-for="(filter, index) in filters_01" :key="index" :name="filter.name" :options="filter.options" v-model="activeFilters[index]" />
			</div>

			<!-- 火災預警 -->
			<div class="flex flex-col gap-[24px] md:gap-[36px] lg:gap-[48px]">
				<h2 class="text-center text-[24px] md:text-[36px] lg:text-[48px] font-bold py-[12px] md:py-[24px] border-b-2 border-black">火災預警</h2>
				<FilterSection v-for="(filter, index) in filters_02" :key="index" :name="filter.name" :options="filter.options" v-model="activeFilters[index]" />
				<!-- 防爆型 -->
				<div class="flex flex-col gap-[24px] md:gap-[36px] lg:gap-[48px]">
					<h4 class="text-[16px] md:text-[24px] lg:text-[36px]">防爆型</h4>
					<div class="flex flex-col md:flex-row justify-center items-center gap-[24px] md:gap-[36px] lg:gap-[48px]">
						<div class="w-[250px] md:w-1/2 lg:w-1/3 aspect-auto relative bg-[#f4f5f7] flex justify-center items-center">
							<img class="w-3/5 aspect-auto" src="/public/product/YS-EP-01.png" alt="YS-EP-01" />
							<span class="text-[16px] md:text-[21px] lg:text-[24px] whitespace-pre-line absolute top-[12px] left-[12px] lg:top-[24px] lg:left-[24px]">
								YS-EP-01
							</span>
						</div>
						<div class="w-[250px] md:w-1/2 lg:w-1/3 aspect-auto relative bg-[#f4f5f7] flex justify-center items-center">
							<img class="w-3/5 aspect-auto" src="/public/product/YS-EP-02.png" alt="YS-EP-02" />
							<span class="text-[16px] md:text-[21px] lg:text-[24px] whitespace-pre-line absolute top-[12px] left-[12px] lg:top-[24px] lg:left-[24px]">
								YS-EP-02
							</span>
						</div>
					</div>
				</div>
			</div>

			<!-- 金屬檢測門 -->
			<div class="flex flex-col gap-[24px] md:gap-[36px] lg:gap-[48px]">
				<h2 class="text-center text-[24px] md:text-[36px] lg:text-[48px] font-bold py-[12px] md:py-[24px] border-b-2 border-black">金屬檢測門</h2>
				<FilterSection v-for="(filter, index) in filters_03" :key="index" :name="filter.name" :options="filter.options" v-model="activeFilters[index]" />
			</div>
		</div>
		<!-- View More -->
		<div class="w-full overflow-hidden pt-[24px] md:pt-[48px]">
			<span class="text-[48px] lg:text-[96px] text-primary opacity-50 text-nowrap">OUR SERVICE OUR SERVICE OUR SERVICE</span>
			<div class="w-fit mx-auto grid grid-cols-2 lg:grid-cols-4 gap-[12px] md:gap-[24px] pt-[24px] md:pt-[48px]">
				<ButtonCTA label="可視對講" to="/products/Video-Intercom"></ButtonCTA>
				<ButtonCTA label="門禁管理" to="/products/Access-Control"></ButtonCTA>
				<ButtonCTA label="影像監控" to="/products/Surveillance-Monitoring"></ButtonCTA>
				<ButtonCTA label="其他設備" to="/products/Devices-Accessories"></ButtonCTA>
			</div>
		</div>
	</div>
</template>

<script setup>
const securityCategories = [
	{
		id: "first",
		title: "人體測溫",
		items: ["監控平板", "門禁測溫", "測溫攝影機"]
	},
	{
		id: "second",
		title: "無線警報",
		items: ["主機、中繼器", "佈防裝置", "輸入裝置", "輸出裝置"]
	},
	{
		id: "third",
		title: "火災預警",
		items: ["標準型", "防爆型"]
	},
	{
		id: "forth",
		title: "金屬檢測門",
		items: []
	}
];
const active = ref("first");

const toggleActive = (id) => {
	active.value = active.value === id ? null : id;
};

const features = [
	{ icon: "/features/monitor01.png", text: "與 FTC-06 視訊通話" },
	{ icon: "/features/monitor02.png", text: "遠程解鎖開門" },
	{ icon: "/features/monitor03.png", text: "查詢訪客體溫紀錄" },
	{ icon: "/features/monitor04.png", text: "支持有線/Wi-fi連接網路" }
];

const FTC = [
	{ image: "/product/YS 8113.png", text: "YS FTC-06 \n7吋人臉測溫門禁機" },
	{ image: "/product/YS 8213.png", text: "YS FTC-07 \n人臉測溫門禁機" },
	{ image: "/product/YS FTC-08.png", text: "YS FTC-08 \n4.3吋人臉測溫門禁機" }
];
const TBC = [
	{ image: "/product/YS TBC-01.png", text: "YS TBC-01 \n槍型雙鏡頭" },
	{ image: "/product/YS TTC-01.png", text: "YS TTC-01 \n砲塔型雙鏡頭" }
];

// 設定篩選分類
const filters_01 = [{ name: "警報設備", options: ["ALL", "佈防裝置", "輸入裝置(感測器)", "輸入裝置(可攜式)", "輸出裝置"] }];
const filters_02 = [{ name: "標準款", options: ["ALL", "槍型", "球機)", "立方"] }];
const filters_03 = [{ name: null, options: null }];

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
	.vertical-text {
		writing-mode: vertical-lr;
		letter-spacing: 10px;
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

/* 小圖滾動區 */
.scroll-container {
	overflow-x: auto;
	scroll-behavior: smooth;
	-webkit-overflow-scrolling: touch;
	scroll-snap-type: x mandatory;
}

/* 隱藏滾動軸 */
.scroll-container::-webkit-scrollbar {
	display: none;
}

.scroll-item {
	background: #f4f5f7;
	flex-shrink: 0;
	scroll-snap-align: start;
	cursor: pointer;
	display: flex;
	justify-content: center;
	align-items: end;
}
</style>
