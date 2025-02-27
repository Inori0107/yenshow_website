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
				門禁管理
			</h1>
			<!-- List CTA -->
			<div v-for="(category, index) in accessControl" :key="index">
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
			<!-- 門禁控制 -->
			<div class="flex flex-col gap-[24px] md:gap-[36px] lg:gap-[48px]">
				<h2 class="text-center text-[24px] md:text-[36px] lg:text-[48px] font-bold py-[12px] md:py-[24px] border-b-2 border-black">門禁控制</h2>
				<FilterSection v-for="(filter, index) in filters" :key="index" :name="filter.name" :options="filter.options" v-model="activeFilters[index]" />
			</div>

			<!-- 多門控制器 -->
			<div class="flex flex-col gap-[24px] md:gap-[36px] lg:gap-[48px]">
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
						<div class="grid grid-cols-1 md:grid-cols-2 gap-[8px] md:gap-[12px] lg:gap-[24px]">
							<!-- 使用 v-for 渲染產品特點 -->
							<div
								v-for="feature in multi_door_features"
								:key="feature.text"
								class="grid grid-cols-[60px_auto] items-center gap-[8px] md:gap-[12px] lg:gap-[24px]"
							>
								<img class="w-[36px] md:w-[48px] lg:w-[60px] aspect-square" :src="feature.icon" alt="feature-icon" />
								<span class="text-[16px] lg:text-[24px]">{{ feature.text }}</span>
							</div>
						</div>
					</div>
				</div>
			</div>

			<!-- 通關機 -->
			<div class="flex flex-col gap-[24px] md:gap-[36px] lg:gap-[48px]">
				<h2 class="text-center text-[24px] md:text-[36px] lg:text-[48px] font-bold py-[12px] md:py-[24px] border-b-2 border-black">通關機</h2>
				<div class="w-full flex flex-col md:flex-row gap-[16px] md:gap-[24px] justify-center">
					<!-- 擺閘式 -->
					<div class="w-full md:w-1/3 flex flex-row md:flex-col gap-[16px] md:gap-[24px]">
						<h4 class="vertical text-[21px] md:text-[24px] lg:text-[36px] text-center">擺閘式</h4>
						<!-- 預覽圖 -->
						<div class="hidden md:flex bg-[#F3F5F7] w-[250px] md:w-full aspect-square justify-center items-center">
							<img class="w-[60%] aspect-square" :src="selectedImage01" alt="預覽圖" />
						</div>
						<!-- 小圖滾動區 -->
						<div class="scroll-container w-full flex gap-[24px]">
							<div
								v-for="item in images01"
								:key="item.image"
								class="scroll-item w-[250px] md:w-[50%] aspect-square relative"
								:class="{ active: selectedImage01 === item.image }"
								@mouseenter="selectedImage01 = item.image"
							>
								<img class="w-3/5 aspect-square mt-[12px] md:mt-[16px] lg:mt-[24px]" :src="item.image" alt="產品圖片" />
								<span
									class="text-[16px] md:text-[21px] lg:text-[24px] absolute top-[12px] left-[12px] md:top-[16px] md:left-[16px] lg:top-[24px] lg:left-[24px"
								>
									{{ item.text }}
								</span>
							</div>
						</div>
					</div>
					<!-- 選配裝置 -->
					<div class="w-full md:w-1/3 flex flex-row md:flex-col gap-[16px] md:gap-[24px] overflow-auto">
						<h4 class="vertical text-[21px] md:text-[24px] lg:text-[36px] text-center">選配裝置</h4>
						<div class="scroll-container w-full h-[70%] flex md:flex-col gap-[24px] md:justify-center">
							<div v-for="item in images03" :key="item.image" class="scroll-item w-[250px] aspect-square md:w-full relative">
								<img class="w-[50%] aspect-square" :src="item.image" alt="產品圖片" />
								<span
									class="text-[16px] md:text-[21px] lg:text-[24px] absolute top-[12px] left-[12px] md:top-[16px] md:left-[16px] lg:top-[24px] lg:left-[24px"
								>
									{{ item.text }}
								</span>
							</div>
						</div>
					</div>
					<!-- 旋轉式 -->
					<div class="w-full md:w-1/3 flex flex-row md:flex-col gap-[16px] md:gap-[24px]">
						<h4 class="vertical text-[21px] md:text-[24px] lg:text-[36px] text-center">旋轉式</h4>
						<!-- 小圖滾動區 -->
						<div class="scroll-container w-full flex gap-[24px]">
							<div
								v-for="item in images02"
								:key="item.image"
								class="scroll-item w-[250px] md:w-[50%] aspect-square relative"
								:class="{ active: selectedImage02 === item.image }"
								@mouseenter="selectedImage02 = item.image"
							>
								<img class="w-3/5 aspect-square mt-[12px] md:mt-[16px] lg:mt-[24px]" :src="item.image" alt="產品圖片" />
								<span
									class="text-[16px] md:text-[21px] lg:text-[24px] absolute top-[12px] left-[12px] md:top-[16px] md:left-[16px] lg:top-[24px] lg:left-[24px"
								>
									{{ item.text }}
								</span>
							</div>
						</div>
						<!-- 預覽圖 -->
						<div class="hidden md:flex bg-[#F3F5F7] w-[250px] md:w-full aspect-square justify-center items-center">
							<img class="w-[60%] aspect-square" :src="selectedImage02" alt="預覽圖" />
						</div>
					</div>
				</div>
			</div>

			<!-- 柵欄機 -->
			<div class="flex flex-col gap-[24px] md:gap-[36px] lg:gap-[48px]">
				<div class="flex flex-col gap-[24px] md:gap-[36px] lg:gap-[48px]">
					<h2 class="text-center text-[24px] md:text-[36px] lg:text-[48px] font-bold py-[12px] md:py-[24px] border-b-2 border-black">柵欄機</h2>
					<div class="flex gap-[24px]">
						<div class="bg-[#F3F5F7] w-1/2 aspect-square lg:aspect-auto relative flex justify-center items-center">
							<span class="text-[16px] md:text-[21px] lg:text-[24px] absolute top-[12px] md:top-[24px] left-[12px] md:left-[24px]">YS-TMG4BX</span>
							<img class="w-[60%] aspect-square" src="/public/product/YS-TMG4BX.png" alt="柵欄機" />
						</div>
						<div class="bg-[#F3F5F7] w-1/2 aspect-square lg:aspect-auto relative flex justify-center items-center">
							<span class="text-[16px] md:text-[21px] lg:text-[24px] absolute top-[12px] md:top-[24px] right-[12px] md:right-[24px]">YS-TMG52X</span>
							<img class="w-[60%] aspect-square" src="/public/product/YS-TMG52X.png" alt="柵欄機" />
						</div>
					</div>
				</div>
			</div>

			<!-- 訪客管理 -->
			<div class="flex flex-col gap-[24px] md:gap-[36px] lg:gap-[48px]">
				<h2 class="text-center text-[24px] md:text-[36px] lg:text-[48px] font-bold py-[12px] md:py-[24px] border-b-2 border-black">訪客管理</h2>
				<!-- feature -->
				<div class="hidden md:flex flex-col md:gap-[24px] lg;gap-[48px]">
					<!-- 第一行（奇數步驟文字） -->
					<div class="flex justify-center items-start">
						<div v-for="(step, index) in steps" :key="index" class="flex-grow text-center">
							<div v-if="index % 2 === 1" class="w-fit">
								<h5 class="md:text-[24px] lg:text-[36px] font-bold">{{ step.title }}</h5>
								<span class="md:text-[16px] lg:text-[24px] whitespace-pre-line opacity-60">{{ step.text }}</span>
							</div>
						</div>
					</div>
					<!-- 第二行（所有步驟圖示） -->
					<div class="relative flex justify-center items-center">
						<!-- 中央曲線 -->
						<!-- <div class="absolute w-[90%] h-[10px] bg-gradient-to-r from-red-500 to-gray-500 rounded-full"></div> -->

						<!-- 圖示 -->
						<div v-for="(step, index) in steps" :key="index" class="relative w-1/5 flex justify-center">
							<div
								class="w-3/4 aspect-square rounded-full border-[16px] flex items-center justify-center"
								:class="index % 2 === 1 ? 'border-red-500' : 'border-gray-500'"
							>
								<img :src="step.icon" alt="Step Icon" class="w-3/5" />
							</div>
						</div>
					</div>
					<!-- 第三行（偶數步驟文字） -->
					<div class="flex justify-center items-start">
						<div v-for="(step, index) in steps" :key="index" class="flex-grow text-center">
							<div v-if="index % 2 === 0" class="w-fit">
								<h5 class="md:text-[24px] lg:text-[36px] font-bold">{{ step.title }}</h5>
								<span class="md:text-[16px] lg:text-[24px] whitespace-pre-line opacity-60">{{ step.text }}</span>
							</div>
						</div>
					</div>
				</div>
				<!-- product -->
				<div class="grid grid-cols-1 md:grid-cols-2 gap-[24px]">
					<!-- 訪客機 -->
					<div class="flex flex-col gap-[24px] md:items-center">
						<h5 class="text-[21px] md:text-[24px] lg:text-[36px]">訪客機</h5>
						<div class="bg-[#F3F5F7] w-full h-[200px] md:h-[282px] flex">
							<div class="w-1/3 flex flex-col justify-center items-center gap-[6px] lg:gap-[12px]">
								<img class="w-3/5 aspect-square" src="/public/product/YS-V30.png" alt="YS-V30" />
								<span class="text-[16px] md:text-[21px] lg:text-[24px]">YS-V30</span>
							</div>
							<div class="w-1/3 flex flex-col justify-center items-center gap-[6px] lg:gap-[12px]">
								<img class="w-3/5 aspect-square" src="/public/product/YS-V30.png" alt="YS-V30" />
								<span class="text-[16px] md:text-[21px] lg:text-[24px]">YS-V50</span>
							</div>
							<div class="w-1/3 flex flex-col justify-center items-center gap-[6px] lg:gap-[12px]">
								<img class="w-3/5 aspect-square" src="/public/product/YS-V50T.png" alt="YS-V50T" />
								<span class="text-[16px] md:text-[21px] lg:text-[24px]">YS-V50T</span>
							</div>
						</div>
					</div>
					<!-- YSCP 中央管理系統(軟體授權) -->
					<div class="flex flex-col gap-[24px] md:items-center">
						<h5 class="text-[21px] md:text-[24px] lg:text-[36px]">YSCP 中央管理系統</h5>
						<div class="bg-[#F3F5F7] w-full h-[200px] md:h-[282px] flex justify-center items-center gap-[6px] md:gap-[12px]">
							<img class="w-[100px] md:w-auto" src="/public/features/YSCP.png" alt="YSCP" />
							<div>
								<p class="text-[16px] md:text-[21px] lg:text-[24px]">YSCentral-P-訪客機l-1台</p>
								<p class="text-[16px] md:text-[21px] lg:text-[24px]">YSCP訪客預約模組(需額外購買)</p>
							</div>
						</div>
					</div>
					<!-- QR code 列印機 -->
					<div class="flex flex-col gap-[24px] md:items-center">
						<h5 class="text-[21px] md:text-[24px] lg:text-[36px]">QR code 列印機</h5>
						<div class="bg-[#F3F5F7] w-full h-[200px] md:h-[282px] flex flex-col justify-center items-center gap-[12px]">
							<img class="h-3/5" src="/public/product/YS-QR-PRINT-USB.png" alt="QR-PRINT-USB" />
							<span class="text-[16px] md:text-[21px] lg:text-[24px]">YS QR-PRINT-USB</span>
						</div>
					</div>
					<!-- 證件 OCR 讀取器 -->
					<div class="flex flex-col gap-[24px] md:items-center">
						<h5 class="text-[21px] md:text-[24px] lg:text-[36px]">證件 OCR 讀取器</h5>
						<div class="bg-[#F3F5F7] w-full h-[200px] md:h-[282px] flex flex-col justify-center items-center gap-[12px]">
							<img class="h-3/5" src="/public/product/YS KR420.png" alt="YS KR420" />
							<span class="text-[16px] md:text-[21px] lg:text-[24px]">YS KR420</span>
						</div>
					</div>
				</div>
			</div>

			<!-- 電梯控制 -->
			<div class="flex flex-col gap-[24px] md:gap-[36px] lg:gap-[48px]">
				<h2 class="text-center text-[24px] md:text-[36px] lg:text-[48px] font-bold py-[12px] md:py-[24px] border-b-2 border-black">電梯控制</h2>
				<!-- features -->
				<div class="grid grid-cols-1 md:grid-cols-2 gap-[24px]">
					<div class="flex items-center gap-[12px] md:gap-[24px]">
						<img src="/public/features/elevator01.png" alt="feature" />
						<p class="text-[16px] md:text-[21px] lg:text-[24px]">快速配置人與樓層之間的關係</p>
					</div>
					<div class="flex items-center gap-[12px] md:gap-[24px]">
						<img src="/public/features/elevator02.png" alt="feature" />
						<p class="text-[16px] md:text-[21px] lg:text-[24px]">能夠調整訪客的抵達樓層範圍</p>
					</div>
					<div class="flex items-center gap-[12px] md:gap-[24px]">
						<img src="/public/features/elevator03.png" alt="feature" />
						<p class="text-[16px] md:text-[21px] lg:text-[24px]">在軟體上(YSCMS)手動控制電梯，在緊急情況迅速將其停用。</p>
					</div>
					<div class="flex items-center gap-[12px] md:gap-[24px]">
						<img src="/public/features/elevator04.png" alt="feature" />
						<p class="text-[16px] md:text-[21px] lg:text-[24px]">超過50種事件和警報，即時客戶端接收和快速視頻查看</p>
					</div>
				</div>
				<!-- products -->
				<div class="grid grid-cols-1 md:grid-cols-2 gap-[24px]">
					<div class="bg-[#F3F5F7] w-full relative flex justify-center items-center">
						<span class="text-[16px] md:text-[21px] lg:text-[24px] absolute top-[12px] md:top-[24px] left-[12px] md:left-[24px]">YS-K2210</span>
						<span class="text-[16px] md:text-[21px] lg:text-[24px] absolute top-[32px] md:top-[56px] left-[12px] md:left-[24px]">主電梯控制器</span>
						<img class="h-[40%] lg:h-[70%] aspect-square" src="/public/product/YS-K2210.png" alt="主電梯控制器" />
					</div>
					<div class="bg-[#F3F5F7] relative flex justify-center items-center">
						<span class="text-[16px] md:text-[21px] lg:text-[24px] absolute top-[12px] md:top-[24px] right-[12px] md:right-[24px]">YS-K2M0016A</span>
						<span class="text-[16px] md:text-[21px] lg:text-[24px] absolute top-[32px] md:top-[56px] right-[12px] md:right-[24px]">分佈式電梯控制器</span>
						<img class="h-[40%] lg:h-[70%] aspect-square" src="/public/product/YS-K2M0016A.png" alt="分佈式電梯控制器" />
					</div>
				</div>
			</div>
		</div>
		<!-- View More -->
		<div class="w-full overflow-hidden pt-[24px] md:pt-[48px]">
			<span class="text-[48px] lg:text-[96px] text-primary opacity-50 text-nowrap">OUR SERVICE OUR SERVICE OUR SERVICE</span>
			<div class="w-fit mx-auto grid grid-cols-2 lg:grid-cols-4 gap-[12px] md:gap-[24px] pt-[24px] md:pt-[48px]">
				<ButtonCTA label="可視對講" to="/products/Video-Intercom"></ButtonCTA>
				<ButtonCTA label="影像監控" to="/products/Surveillance-Monitoring"></ButtonCTA>
				<ButtonCTA label="安全防護" to="/products/Security-Solutions"></ButtonCTA>
				<ButtonCTA label="其他設備" to="/products/Devices-Accessories"></ButtonCTA>
			</div>
		</div>
	</div>
</template>

<script setup>
const accessControl = [
	{
		id: "first",
		title: "門禁控制",
		items: ["人臉識別機", "配件＆設備", "多門控制器"]
	},
	{
		id: "second",
		title: "通關機、柵欄機",
		items: ["旋轉式", "擺閘式", "柵欄機"]
	},
	{
		id: "third",
		title: "訪客管理系統",
		items: []
	},
	{
		id: "fourth",
		title: "電梯控制",
		items: []
	}
];
const active = ref("first");

const toggleActive = (id) => {
	active.value = active.value === id ? null : id;
};

// 設定篩選分類
const filters = [
	{ name: "人臉辨識機", options: ["ALL", "4.3吋", "7吋", "模組化", "雨遮"] },
	{ name: "配件＆設備", options: ["ALL", "導入機", "指紋", "刷卡"] }
];
const activeFilters = ref("ALL");

const multi_door_features = [
	{ icon: "/features/YS-K2600T-01.png", text: "支援多門互鎖與防反潛" },
	{ icon: "/features/YS-K2600T-02.png", text: "數據加密，支持離線操作" },
	{ icon: "/features/YS-K2600T-03.png", text: "最多支持10萬張卡片" },
	{ icon: "/features/YS-K2600T-04.png", text: "斷電保存數據及防篡改功能" }
];

const images01 = [
	{ image: "/product/YS SG-3B411X.jpg", text: "YS SG-3B411X" },
	{ image: "/product/YS-K3B501SX.png", text: "YS-K3B501SX" },
	{ image: "/product/YS-K3B601.jpg", text: "YS-K3B601" },
	{ image: "/product/YS-K3B801.jpg", text: "YS-K3B801" },
	{ image: "/product/YS-K3Y501SX.png", text: "YS-K3Y501SX" }
];
const images02 = [
	{ image: "/product/YS-K3G411X.png", text: "YS-K3G411X" },
	{ image: "/product/YS-K3G501.png", text: "YS-K3G501" },
	{ image: "/product/YS-K3H4410-120.png", text: "YS-K3H4410-120" }
];
const images03 = [
	{ image: "/product/YS-K7R83X.png", text: "YS-K7R83X" },
	{ image: "/product/YS CRT-310.png", text: "YS CRT-310" }
];

const selectedImage01 = ref(images01[0].image);
const selectedImage02 = ref(images02[0].image);

const steps = [
	{ icon: "/features/visitor01.png", title: "訪客來臨", text: "訪客來到櫃檯" },
	{ icon: "/features/visitor02.png", title: "訪客登記", text: "前台接待人員上傳照片、\n身份證(ID)和一些關鍵信息" },
	{ icon: "/features/visitor03.png", title: "權限分配", text: "分配訪客的訪問權限和憑證\n（支持人臉，卡，指紋，和QR code）" },
	{ icon: "/features/visitor04.png", title: "訪客離開", text: "訪客離開，可在VMS上註銷，\n使該訪客的所有權限立即失效." },
	{ icon: "/features/visitor05.png", title: "記錄追蹤", text: "系統保存記錄，方便快速搜索。" }
];
</script>
