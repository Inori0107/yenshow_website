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
		<div class="h-screen flex flex-col gap-[24px] md:gap-[36px] lg:gap-[48px]">
			<!-- title -->
			<h1 class="text-[48px] md:text-[64px] lg:text-[96px] xl:text-[128px] opacity-50 mt-[96px] md:mt-[48px] ms-[32px] md:ms-[48px] lg:ms-[64px] font-bold">
				門禁管理
			</h1>
			<!-- List CTA -->
			<div
				@click="toggleActive('first')"
				:class="active === 'first' ? 'trapezoid-long' : 'trapezoid-short'"
				class="bg-gray-300 font-bold py-[8px] cursor-pointer transition-all duration-300"
			>
				門禁控制
			</div>
			<!-- List -->
			<div v-if="active === 'first'" class="flex flex-col gap-[12px] lg:gap-[24px] ps-[24px] md:ps-[36px] lg:ps-[48px] transition-discrete">
				<div class="text-[16px] md:text-[21px] lg:text-[24px]">- 人臉識別機</div>
				<div class="text-[16px] md:text-[21px] lg:text-[24px]">- 多門控制器</div>
			</div>
			<!-- List CTA -->
			<div
				@click="toggleActive('second')"
				:class="active === 'second' ? 'trapezoid-long' : 'trapezoid-short'"
				class="bg-gray-300 font-bold py-[8px] cursor-pointer transition-all duration-300"
			>
				通關機、柵欄機
			</div>
			<!-- List -->
			<div v-if="active === 'second'" class="flex flex-col gap-[12px] lg:gap-[24px] ps-[24px] md:ps-[36px] lg:ps-[48px] transition-discrete">
				<div class="text-[16px] md:text-[21px] lg:text-[24px]">- 旋轉式</div>
				<div class="text-[16px] md:text-[21px] lg:text-[24px]">- 擺閘式</div>
				<div class="text-[16px] md:text-[21px] lg:text-[24px]">- 柵欄機</div>
			</div>
			<!-- List CTA -->
			<div
				@click="toggleActive('third')"
				:class="active === 'third' ? 'trapezoid-long' : 'trapezoid-short'"
				class="bg-gray-300 font-bold py-[8px] cursor-pointer transition-all duration-300"
			>
				訪客管理系統
			</div>
			<!-- List CTA -->
			<div
				@click="toggleActive('fourth')"
				:class="active === 'fourth' ? 'trapezoid-long' : 'trapezoid-short'"
				class="bg-gray-300 font-bold py-[8px] cursor-pointer transition-all duration-300"
			>
				電梯控制
			</div>
		</div>
	</div>
	<!-- product -->
	<div class="w-full bg-white py-[48px] md:py-[144px]">
		<div class="container bg-white flex flex-col gap-[24px] md:gap-[36px] lg:gap-[48px]">
			<!-- 門禁控制 -->
			<h2 class="text-center text-[24px] md:text-[36px] lg:text-[48px] font-bold py-[12px] md:py-[24px] border-b-2 border-black">門禁控制</h2>
			<FilterSection v-for="(filter, index) in filters" :key="index" :name="filter.name" :options="filter.options" v-model="activeFilters[index]" />
			<!-- 多門控制器 -->
			<h2 class="text-center text-[24px] md:text-[36px] lg:text-[48px] font-bold py-[12px] md:py-[24px] border-b-2 border-black">多門控制器</h2>
			<div class="flex flex-col md:flex-row justify-evenly items-center gap-[24px]">
				<!-- image -->
				<div class="bg-[#F3F5F7] w-[250px] md:w-[384px] aspect-square relative flex justify-center items-center">
					<span class="text-[16px] md:text-[21px] lg:text-[24px] absolute top-[12px] md:top-[24px] left-[12px] md:left-[24px]">YS-9503</span>
					<img class="w-[70%] aspect-square" src="/public/product/YS-K2600T.png" alt="多門控制器" />
				</div>
				<!-- features -->
				<div class="flex flex-col gap-[24px] justify-center">
					<h5 class="text-[21px] md:text-[28px] lg:text-[32px] text-center font-bold w-full">產品特點</h5>
					<div class="grid grid-cols-1 md:grid-cols-2 gap-[24px]">
						<div class="grid grid-cols-[60px_auto] items-center gap-[12px] md:gap-[24px]">
							<img class="w-[36px] md:w-[60px] aspect-square" src="/public/features/YS-K2600T-01.png" alt="touchable" />
							<span class="text-[16px] md:text-[21px] lg:text-[24px]">支援多門互鎖與防反潛</span>
						</div>

						<div class="grid grid-cols-[60px_auto] items-center gap-[12px] md:gap-[24px]">
							<img class="w-[36px] md:w-[60px] aspect-square" src="/public/features/YS-K2600T-02.png" alt="touchable" />
							<span class="text-[16px] md:text-[21px] lg:text-[24px]">數據加密，支持離線操作</span>
						</div>

						<div class="grid grid-cols-[60px_auto] items-center gap-[12px] md:gap-[24px]">
							<img class="w-[36px] md:w-[60px] aspect-square" src="/public/features/YS-K2600T-03.png" alt="touchable" />
							<span class="text-[16px] md:text-[21px] lg:text-[24px]">最多支持10萬張卡片</span>
						</div>

						<div class="grid grid-cols-[60px_auto] items-center gap-[12px] md:gap-[24px]">
							<img class="w-[36px] md:w-[60px] aspect-square" src="/public/features/YS-K2600T-04.png" alt="touchable" />
							<span class="text-[16px] md:text-[21px] lg:text-[24px]">斷電保存數據及防篡改功能</span>
						</div>
					</div>
				</div>
			</div>
			<!-- 通關機 -->
			<h2 class="text-center text-[24px] md:text-[36px] lg:text-[48px] font-bold py-[12px] md:py-[24px] border-b-2 border-black">通關機</h2>
			<div class="w-full flex flex-col md:flex-row gap-[16px] md:gap-[24px] justify-center">
				<!-- 擺閘式 -->
				<div class="w-full md:w-1/3 flex flex-row md:flex-col gap-[16px] md:gap-[24px]">
					<h4 class="vertical-text text-[21px] md:text-[24px] lg:text-[36px] text-center">擺閘式</h4>
					<!-- 預覽圖 -->
					<div class="hidden md:flex bg-[#F3F5F7] w-[250px] md:w-full aspect-square justify-center items-center">
						<img class="w-[60%] aspect-square" :src="selectedImage01" alt="預覽圖" />
					</div>
					<!-- 小圖滾動區 -->
					<div class="scroll-container w-full flex gap-[24px]">
						<div
							v-for="image in images01"
							:key="image"
							class="scroll-item w-[250px] md:w-[50%] aspect-square"
							:class="{ active: selectedImage01 === image }"
							@mouseenter="selectedImage01 = image"
						>
							<img class="w-3/5 aspect-square" :src="image" alt="產品圖片" />
						</div>
					</div>
				</div>
				<!-- 選配裝置 -->
				<div class="w-full md:w-1/3 flex flex-row md:flex-col gap-[16px] md:gap-[24px] overflow-auto">
					<h4 class="vertical-text text-[21px] md:text-[24px] lg:text-[36px] text-center">選配裝置</h4>
					<div class="scroll-container w-full h-[70%] flex md:flex-col gap-[24px] justify-center overflow-hidden">
						<div v-for="image in images03" :key="image" class="scroll-item w-[250px] aspect-square md:w-full">
							<img class="w-[50%] aspect-square" :src="image" alt="產品圖片" />
						</div>
					</div>
				</div>
				<!-- 旋轉式 -->
				<div class="w-full md:w-1/3 flex flex-row md:flex-col gap-[16px] md:gap-[24px]">
					<h4 class="vertical-text text-[21px] md:text-[24px] lg:text-[36px] text-center">旋轉式</h4>
					<!-- 小圖滾動區 -->
					<div class="scroll-container w-full flex gap-[24px]">
						<div
							v-for="image in images02"
							:key="image"
							class="scroll-item w-[250px] md:w-[50%] aspect-square"
							:class="{ active: selectedImage02 === image }"
							@mouseenter="selectedImage02 = image"
						>
							<img class="w-3/5 aspect-square" :src="image" alt="產品圖片" />
						</div>
					</div>
					<!-- 預覽圖 -->
					<div class="hidden md:flex bg-[#F3F5F7] w-[250px] md:w-full aspect-square justify-center items-center">
						<img class="w-[60%] aspect-square" :src="selectedImage02" alt="預覽圖" />
					</div>
				</div>
			</div>
			<!-- 柵欄機 -->
			<h2 class="text-center text-[24px] md:text-[36px] lg:text-[48px] font-bold py-[12px] md:py-[24px] border-b-2 border-black">柵欄機</h2>
			<div class="flex">
				<div></div>
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
	{ name: "人臉辨識機", options: ["ALL", "4.3吋", "7吋", "模組化", "雨遮"] },
	{ name: "配件＆設備", options: ["ALL", "導入機", "指紋", "刷卡"] }
];
const activeFilters = ref("ALL");

const images01 = ["/product/YS SG-3B411X.jpg", "/product/YS-K3B501SX.png", "/product/YS-K3B601.jpg", "/product/YS-K3B801.jpg", "/product/YS-K3Y501SX.png"];
const images02 = ["/product/YS-K3G411X.png", "/product/YS-K3G501.png", "/product/YS-K3H4410-120.png"];
const images03 = ["/product/YS-K7R83X.png", "/product/YS CRT-310.png"];

const selectedImage01 = ref(images01[0]);
const selectedImage02 = ref(images02[0]);
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
	align-items: center;
}

/* 選中圖片的 active 樣式 */
@media (min-width: 768px) {
	.active {
		border: 4px solid rgba(33, 42, 55, 0.8);
	}
}
</style>
