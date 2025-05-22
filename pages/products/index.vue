<template>
	<div class="min-h-screen flex flex-col">
		<!-- 1. Hero Section with Text Overlay -->
		<section
			class="h-screen flex flex-col justify-center items-center text-center text-white relative p-4 sm:p-6 md:p-8 lg:p-12 pt-[var(--header-height,80px)]"
		>
			<!-- Overlay to ensure text readability if background is too bright -->
			<div class="relative z-10 space-y-4 sm:space-y-6">
				<h1 class="text-2xl sm:text-3xl md:text-5xl lg:text-6xl xl:text-7xl text-secondary">智慧方案</h1>
				<p class="text-base sm:text-lg md:text-xl lg:text-2xl text-gray-200 max-w-md sm:max-w-lg md:max-w-2xl lg:max-w-3xl xl:max-w-4xl mx-auto">
					我們融合尖端技術與行業洞察，為您的特定需求量身打造門禁、監控、安防等整合應用方案。探索我們如何為您的業務帶來卓越價值。
				</p>
			</div>
		</section>

		<!-- Solutions Showcase: Horizontal Scrolling Section -->
		<section id="solutions-showcase" class="relative w-full h-screen overflow-hidden">
			<!-- Scroll Container -->
			<div class="flex transition-transform duration-500 ease-in-out" :style="{ transform: `translateX(-${currentSolutionSlide * 100}%)` }">
				<!-- 區塊一: 車牌辨識 - Hero / Value Proposition + Pain Points vs. Benefits -->
				<div
					class="w-full h-screen flex-shrink-0 flex flex-col justify-center items-center p-4 py-8 sm:p-8 md:p-12 lg:p-16 space-y-6 sm:space-y-8 bg-slate-700"
				>
					<div class="text-center space-y-3 sm:space-y-4">
						<h2 class="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold theme-text-color">車牌辨識管理系統</h2>
						<p class="text-base sm:text-lg md:text-xl max-w-lg sm:max-w-xl md:max-w-2xl lg:max-w-3xl mx-auto">
							AI 車牌辨識 + 車道聯動，實現自動放行、零接觸、全程留證。雷達／感應線圈精準觸發，通過率 > 99%，誤砸率 0%。與柵欄機、LED
							顯示、門禁／對講平台無縫串接，共同打造智慧車道。
						</p>
					</div>

					<div class="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 w-full max-w-md sm:max-w-xl md:max-w-3xl lg:max-w-5xl">
						<!-- 翻轉卡片 1 -->
						<div class="flip-card solution-card-container min-h-[200px] sm:min-h-[220px]">
							<div class="flip-card-inner">
								<div class="flip-card-front bg-slate-600 p-4 sm:p-6 rounded-lg shadow-xl flex flex-col items-center text-center">
									{/* Placeholder for icon */}
									<div class="text-3xl sm:text-4xl mb-2 sm:mb-3 text-rose-400">⚠️</div>
									<h4 class="font-semibold text-lg sm:text-xl mb-1 sm:mb-2 text-rose-300">痛點：社區/建案 高峰塞車</h4>
									<p class="text-xs sm:text-sm">住戶一卡多車，管理不易，尖峰時段車輛進出緩慢。</p>
								</div>
								<div class="flip-card-back bg-emerald-700 p-4 sm:p-6 rounded-lg shadow-xl flex flex-col items-center text-center justify-center">
									{/* Placeholder for icon */}
									<div class="text-3xl sm:text-4xl mb-2 sm:mb-3 text-emerald-300">✅</div>
									<h4 class="font-semibold text-lg sm:text-xl mb-1 sm:mb-2 text-emerald-200">效益：通行效率提升</h4>
									<p class="text-xs sm:text-sm text-emerald-100">通行效率提升 50%，大幅減少管委會收到的抱怨。</p>
								</div>
							</div>
						</div>
						<!-- 翻轉卡片 2 -->
						<div class="flip-card solution-card-container min-h-[200px] sm:min-h-[220px]">
							<div class="flip-card-inner">
								<div class="flip-card-front bg-slate-600 p-4 sm:p-6 rounded-lg shadow-xl flex flex-col items-center text-center">
									{/* Placeholder for icon */}
									<div class="text-3xl sm:text-4xl mb-2 sm:mb-3 text-rose-400">🚚</div>
									<h4 class="font-semibold text-lg sm:text-xl mb-1 sm:mb-2 text-rose-300">痛點：企業/工廠 物流壅塞</h4>
									<p class="text-xs sm:text-sm">物流車輛排隊等候，或發生追車闖關，影響安全與效率。</p>
								</div>
								<div class="flip-card-back bg-emerald-700 p-4 sm:p-6 rounded-lg shadow-xl flex flex-col items-center text-center justify-center">
									{/* Placeholder for icon */}
									<div class="text-3xl sm:text-4xl mb-2 sm:mb-3 text-emerald-300">🛡️</div>
									<h4 class="font-semibold text-lg sm:text-xl mb-1 sm:mb-2 text-emerald-200">效益：零誤砸率 & 效率提升</h4>
									<p class="text-xs sm:text-sm text-emerald-100">誤砸率降至 0%，車流調度效率提升 20%。</p>
								</div>
							</div>
						</div>
						<!-- 翻轉卡片 3 -->
						<div class="flip-card solution-card-container min-h-[200px] sm:min-h-[220px]">
							<div class="flip-card-inner">
								<div class="flip-card-front bg-slate-600 p-4 sm:p-6 rounded-lg shadow-xl flex flex-col items-center text-center">
									{/* Placeholder for icon */}
									<div class="text-3xl sm:text-4xl mb-2 sm:mb-3 text-rose-400">🅿️</div>
									<h4 class="font-semibold text-lg sm:text-xl mb-1 sm:mb-2 text-rose-300">痛點：收費停車場 管理複雜</h4>
									<p class="text-xs sm:text-sm">ETC/票證多系統併行，人工收費效率低，且易有逃費情況。</p>
								</div>
								<div class="flip-card-back bg-emerald-700 p-4 sm:p-6 rounded-lg shadow-xl flex flex-col items-center text-center justify-center">
									{/* Placeholder for icon */}
									<div class="text-3xl sm:text-4xl mb-2 sm:mb-3 text-emerald-300">💸</div>
									<h4 class="font-semibold text-lg sm:text-xl mb-1 sm:mb-2 text-emerald-200">效益：自動化管理 & 減少逃費</h4>
									<p class="text-xs sm:text-sm text-emerald-100">實現自動計費、逃費追蹤，並有效分流月租與臨停車輛。</p>
								</div>
							</div>
						</div>
					</div>
				</div>

				<!-- 區塊二: 車牌辨識 - System Overview (Architecture + Workflow + Scenarios) -->
				<div
					class="w-full h-screen flex-shrink-0 flex flex-col justify-center items-center p-4 py-8 sm:p-8 md:p-12 lg:p-16 space-y-6 sm:space-y-8 bg-slate-800"
				>
					<h2 class="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold theme-text-color mb-4 sm:mb-6">系統架構與運作流程</h2>
					<div class="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 w-full max-w-md sm:max-w-xl md:max-w-3xl lg:max-w-5xl xl:max-w-6xl">
						<div class="space-y-3 sm:space-y-4">
							<h3 class="text-xl sm:text-2xl font-semibold">系統架構總覽</h3>
							<div class="bg-slate-700 p-3 sm:p-4 rounded-lg text-xs sm:text-sm space-y-1">
								<p><strong class="text-cyan-400">輸入設備：</strong>攝影機 (IPC LPR)、感應線圈 / 雷達</p>
								<p><strong class="text-cyan-400">核心處理：</strong>中央平台 / NVR (可連接監控螢幕)</p>
								<p><strong class="text-cyan-400">連動輸出：</strong>柵欄機、LED 字幕機</p>
								<p><strong class="text-cyan-400">通訊方式：</strong>RS-485 / TCP/IP</p>
								<p><strong class="text-cyan-400">備援機制：</strong>對講機 → 控制中心 (人工協助)</p>
								<p class="text-xs mt-2 italic">(詳細拓撲圖請參考相關附件 slide ①②)</p>
							</div>
							<h3 class="text-xl sm:text-2xl font-semibold mt-4 sm:mt-6">應用場域</h3>
							<ul class="list-disc list-inside bg-slate-700 p-3 sm:p-4 rounded-lg text-xs sm:text-sm space-y-1">
								<li>社區／建案停車場</li>
								<li>企業 / 工廠車道</li>
								<li>學校 / 醫療停車區</li>
								<li>收費停車場</li>
							</ul>
						</div>
						<div class="space-y-3 sm:space-y-4">
							<h3 class="text-xl sm:text-2xl font-semibold">工作流程</h3>
							<ol class="list-decimal list-inside bg-slate-700 p-3 sm:p-4 rounded-lg text-xs sm:text-sm space-y-1 sm:space-y-2">
								<li><strong class="text-amber-400">車輛偵測:</strong> 感應線圈 / 雷達偵測車輛，觸發LPR攝影機。</li>
								<li><strong class="text-amber-400">車牌辨識:</strong> IPC讀取車牌，即時傳輸圖像與號碼至中央平台。</li>
								<li><strong class="text-amber-400">平台比對:</strong> 進行白名單比對或事件存證。</li>
								<li><strong class="text-amber-400">自動放行:</strong> 符合規則即驅動柵欄機抬桿，LED顯示對應資訊。</li>
								<li><strong class="text-amber-400">備援處理:</strong> 若辨識失敗，駕駛可按對講機呼叫中控人工放行。</li>
							</ol>
						</div>
					</div>
				</div>

				<!-- 區塊三: 車牌辨識 - Key Modules / Features + Advantages + Related Products + CTA -->
				<div
					class="w-full h-screen flex-shrink-0 flex flex-col justify-center items-center p-4 py-8 sm:p-8 md:p-12 lg:p-16 space-y-6 sm:space-y-8 bg-slate-700"
				>
					<h2 class="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold theme-text-color mb-4 sm:mb-6">核心亮點與應用</h2>
					<div class="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 w-full max-w-md sm:max-w-xl md:max-w-3xl lg:max-w-5xl xl:max-w-6xl mb-4 sm:mb-6">
						<div class="space-y-3 sm:space-y-4">
							<h3 class="text-xl sm:text-2xl font-semibold">關鍵模組 & 功能亮點</h3>
							<div class="bg-slate-600 p-3 sm:p-4 rounded-lg text-xs sm:text-sm space-y-2 sm:space-y-3">
								<p><strong>IPC 車牌辨識:</strong> -30 ~ 70 °C環境、逆光仍 > 98% OCR準確度；白/黑名單雙庫管理。</p>
								<p><strong>雷達 / 線圈:</strong> 毫米波距離偵測 & 速度計算；判斷車輛完全離開防砸。</p>
								<p><strong>柵欄機:</strong> 0.8-1.5s高速抬桿，2000萬次MTBF，支援UPS斷電自動升桿。</p>
								<p><strong>LED 字幕機:</strong> 6000 nits高亮，JSON指令動態顯示車牌/剩餘時數。</p>
								<p><strong>後端平台 / NVR:</strong> 影像+數據整合檢索，事件Tag、報表匯出；Webhook API串接第三方收費。</p>
							</div>
						</div>
						<div class="space-y-3 sm:space-y-4">
							<h3 class="text-xl sm:text-2xl font-semibold">方案優勢</h3>
							<ul class="list-disc list-inside bg-slate-600 p-3 sm:p-4 rounded-lg text-xs sm:text-sm space-y-1 sm:space-y-2">
								<li>前端辨識即決策，平均通行時間 &lt; 0.5s，尖峰車流塞車率降低 40%。</li>
								<li>多重備援機制，辨識失效時可人工放行，確保車道不阻塞。</li>
								<li>全程記錄且可稽核，圖片、車號、時間戳綁定，稽核查詢 &lt; 3秒。</li>
								<li>模組化擴充，同一平台可加購訪客QR通關、支付票證、AI車型偵測。</li>
							</ul>
						</div>
					</div>
					<div class="text-center space-y-3 sm:space-y-4">
						<h3 class="text-xl sm:text-2xl font-semibold">相關產品應用</h3>
						<div class="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
							<router-link
								to="/products/Access-Control"
								class="solution-button bg-sky-500 hover:bg-sky-600 px-4 py-2 text-sm sm:px-5 sm:py-2.5 sm:text-base md:px-6 md:py-3 md:text-lg"
								>門禁管理系統</router-link
							>
							<router-link
								to="/products/Devices-Accessories"
								class="solution-button bg-teal-500 hover:bg-teal-600 px-4 py-2 text-sm sm:px-5 sm:py-2.5 sm:text-base md:px-6 md:py-3 md:text-lg"
								>設備配件</router-link
							>
						</div>
					</div>
					<div class="mt-6 sm:mt-8 flex flex-col sm:flex-row gap-3 sm:gap-4 items-center justify-center w-full max-w-xs sm:max-w-none">
						<button
							class="solution-button bg-indigo-500 hover:bg-indigo-600 w-full sm:w-auto px-4 py-2 text-sm sm:px-5 sm:py-2.5 sm:text-base md:px-6 md:py-3 md:text-lg"
							@click="requestCatalog('車牌辨識管理系統')"
						>
							索取型錄
						</button>
						<button
							class="solution-button bg-green-500 hover:bg-green-600 w-full sm:w-auto px-4 py-2 text-sm sm:px-5 sm:py-2.5 sm:text-base md:px-6 md:py-3 md:text-lg"
							@click="requestDemo('車牌辨識管理系統')"
						>
							預約 Demo
						</button>
						<router-link
							to="/contact?subject=車牌辨識管理系統諮詢"
							class="solution-button bg-orange-500 hover:bg-orange-600 w-full sm:w-auto text-center px-4 py-2 text-sm sm:px-5 sm:py-2.5 sm:text-base md:px-6 md:py-3 md:text-lg"
							>聯絡業務</router-link
						>
					</div>
				</div>
			</div>

			<!-- Navigation Dots -->
			<div class="absolute bottom-4 sm:bottom-6 md:bottom-8 left-1/2 -translate-x-1/2 flex space-x-2 sm:space-x-3 z-20">
				<button
					v-for="(slide, index) in 3"
					:key="index"
					@click="currentSolutionSlide = index"
					:class="[
						'w-2 h-2 sm:w-3 sm:h-3 rounded-full transition-all duration-300',
						currentSolutionSlide === index ? 'bg-primary scale-125' : 'bg-gray-400 hover:bg-gray-200'
					]"
					:aria-label="`跳至方案區塊 ${index + 1}`"
				></button>
			</div>

			<!-- Navigation Arrows -->
			<button
				@click="prevSolutionSlide"
				class="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 z-20 p-1 sm:p-2 bg-black/30 hover:bg-black/50 rounded-full transition-colors"
				aria-label="上一個方案區塊"
				v-show="currentSolutionSlide > 0"
			>
				<svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 sm:h-6 sm:w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
					<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
				</svg>
			</button>
			<button
				@click="nextSolutionSlide"
				class="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 z-20 p-1 sm:p-2 bg-black/30 hover:bg-black/50 rounded-full transition-colors"
				aria-label="下一個方案區塊"
				v-show="currentSolutionSlide < 2"
			>
				<svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 sm:h-6 sm:w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
					<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
				</svg>
			</button>
		</section>

		<!-- Placeholder for "Why Choose Yenshow Solutions?" -->
		<section class="py-12 sm:py-16 md:py-20 lg:py-24 bg-white text-center">
			<div class="container mx-auto px-4">
				<h2 class="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-800 mb-4 sm:mb-6 md:mb-8">為何選擇遠岫方案？</h2>
				<div
					class="min-h-[20vh] sm:min-h-[25vh] md:min-h-[30vh] flex justify-center items-center border-2 border-dashed border-gray-400 rounded-lg p-4 sm:p-6 md:p-8"
				>
					<p class="text-base sm:text-lg md:text-xl text-gray-500">[為何選擇我們的詳細說明 - 此處為內容預留空間]</p>
				</div>
			</div>
		</section>
	</div>
</template>

<script setup>
import { ref } from "vue";
import { useHead } from "#app";
import { useRouter } from "vue-router";

const router = useRouter();

useHead({
	title: " - 產品方案",
	meta: [{ name: "description", content: "探索遠岫科技如何整合門禁、監控、安防等技術，為不同行業量身打造智慧解決方案，塑造安全高效的未來。" }]
});

const currentSolutionSlide = ref(0);
const totalSolutionSlides = 3; // 目前只有一個方案，所以只有3個內部區塊

const nextSolutionSlide = () => {
	if (currentSolutionSlide.value < totalSolutionSlides - 1) {
		currentSolutionSlide.value++;
	}
};

const prevSolutionSlide = () => {
	if (currentSolutionSlide.value > 0) {
		currentSolutionSlide.value--;
	}
};

// CTA Button Handlers
const requestCatalog = (solutionName) => {
	// Logic to handle catalog request, e.g., show a modal or redirect
	router.push(`/contact?subject=型錄索取：${solutionName}&type=報價需求`);
	console.log(`索取型錄: ${solutionName}`);
};

const requestDemo = (solutionName) => {
	// Logic to handle demo request
	router.push(`/contact?subject=預約DEMO：${solutionName}&type=產品諮詢`);
	console.log(`預約 Demo: ${solutionName}`);
};
</script>

<style scoped>
/*確保 Hero Section 的文字疊加在背景圖片之上，並且考慮到可能的 header 高度*/
.h-screen.flex.flex-col.justify-center.items-center {
	/* padding-top: var(--header-height, 80px);  Ensured by pt-[var(--header-height,80px)] in class */
	box-sizing: border-box;
}

html {
	scroll-behavior: smooth;
}

/* Custom theme text color for solution showcase titles */
.theme-text-color {
	color: #67e8f9; /* A light cyan, adjust as needed */
}

/* Styles for flip card */
.solution-card-container {
	background-color: transparent;
	min-height: 200px; /* Adjust as needed based on content */
	perspective: 1000px; /* Remove this if you don't want the 3D effect */
}

.flip-card-inner {
	position: relative;
	width: 100%;
	height: 100%;
	text-align: center;
	transition: transform 0.6s;
	transform-style: preserve-3d;
	display: flex; /* Ensure children take full height */
	flex-direction: column; /* Ensure children take full height */
}

.solution-card-container:hover .flip-card-inner {
	transform: rotateY(180deg);
}

.flip-card-front,
.flip-card-back {
	position: absolute;
	width: 100%;
	height: 100%;
	-webkit-backface-visibility: hidden; /* Safari */
	backface-visibility: hidden;
	border-radius: 0.5rem; /* Match with rounded-lg */
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	padding: 1.5rem; /* Match p-6 */
}

.flip-card-back {
	/* bg-emerald-700 is handled by inline class */
	transform: rotateY(180deg);
}
</style>
