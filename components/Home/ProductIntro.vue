<template>
	<section class="product-intro min-h-screen relative flex justify-center items-center my-[128px] md:my-[256px] overflow-hidden">
		<!-- 中央搜尋區 -->
		<div class="search-container w-full max-w-[80%] md:max-w-[60%] lg:max-w-[40%] z-10 transition-all duration-300 relative">
			<h2 class="text-center text-secondary text-[24px] md:text-[36px] lg:text-[48px] font-bold mb-[24px]">探索產品</h2>

			<!-- 搜尋輸入區域 -->
			<div class="relative mb-[8px]">
				<input
					ref="searchInput"
					v-model="keyword"
					@input="handleInput"
					@focus="handleFocus"
					@blur="handleBlur"
					@keydown.esc="closeResultsPanel"
					@keydown.enter="triggerSearchFromEnter"
					class="w-full rounded-lg px-[48px] py-[12px] outline-none focus:ring-2 focus:ring-blue-500 bg-slate-100 text-slate-700 border border-slate-200 shadow-sm hover:shadow-md transition-shadow placeholder-slate-400"
					placeholder="搜尋產品、系列、分類..."
				/>
				<svg
					class="absolute left-[16px] top-1/2 transform -translate-y-1/2 w-[20px] h-[20px] text-slate-400"
					fill="none"
					stroke="currentColor"
					viewBox="0 0 24 24"
					xmlns="http://www.w3.org/2000/svg"
				>
					<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
				</svg>
				<button
					v-if="keyword"
					@click="clearInputAndSearch"
					class="absolute right-[16px] top-1/2 transform -translate-y-1/2 text-slate-400 hover:text-slate-700 p-1 rounded-full hover:bg-slate-200 transition-colors"
				>
					<svg class="w-[20px] h-[20px]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
						<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
					</svg>
				</button>
			</div>

			<!-- 搜尋結果面板 -->
			<div
				v-if="showResults"
				class="search-results absolute top-full left-0 right-0 mt-[2px] bg-white border border-slate-200 rounded-xl max-h-[60vh] overflow-hidden z-20 shadow-xl flex flex-col"
				@mousedown.prevent
			>
				<!-- 內容區域 -->
				<div class="flex-1 overflow-y-auto scrollbar-thin scrollbar-thumb-slate-300 scrollbar-track-transparent">
					<!-- 加載中 -->
					<div v-if="isLoading" class="p-[24px] text-center text-slate-400">
						<div class="animate-spin inline-block w-[32px] h-[32px] border-4 rounded-full border-slate-200 border-t-blue-500"></div>
						<p class="mt-[12px]">搜尋中...</p>
					</div>

					<!-- 最近搜尋 -->
					<div v-else-if="!keyword && recentSearches.length > 0" class="p-[16px]">
						<div class="flex justify-between items-center mb-[12px]">
							<h3 class="text-[16px] text-slate-500">最近搜尋</h3>
							<button @click="clearRecentSearchesAndClose" class="text-[14px] text-blue-400 hover:text-blue-300 transition-colors">清除</button>
						</div>
						<div class="flex flex-wrap gap-[8px]">
							<button
								v-for="(item, index) in recentSearches"
								:key="index"
								@click="searchRecent(item)"
								class="px-[12px] py-[6px] rounded-full text-[14px] bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors"
							>
								{{ item }}
							</button>
						</div>
					</div>

					<!-- 無結果 -->
					<div v-else-if="keyword && !isLoading && !hasResults" class="p-[24px] text-center text-slate-500">
						<p>找不到與「{{ keyword }}」相關的結果</p>
					</div>

					<!-- 搜尋結果 -->
					<div v-else-if="keyword && hasResults" class="flex flex-col">
						<!-- 分類標籤 -->
						<div
							class="flex overflow-x-auto whitespace-nowrap px-[16px] py-[8px] gap-[12px] bg-slate-100 border-b border-slate-200 scrollbar-thin scrollbar-thumb-slate-300 scrollbar-track-transparent sticky top-0 z-10"
						>
							<button
								class="px-[12px] py-[6px] rounded-full transition-colors text-sm"
								:class="activeTab === 'all' ? 'bg-blue-600 text-white' : 'text-slate-600 hover:bg-slate-200'"
								@click="setActiveTab('all')"
							>
								全部 ({{ resultCounts.total }})
							</button>
							<button
								v-for="(count, type) in resultCounts"
								:key="type"
								v-show="type !== 'total' && count > 0"
								class="px-[12px] py-[6px] rounded-full transition-colors text-sm"
								:class="activeTab === type ? 'bg-blue-600 text-white' : 'text-slate-600 hover:bg-slate-200'"
								@click="setActiveTab(type)"
							>
								{{ entityTypeNames[type] }} ({{ count }})
							</button>
						</div>

						<!-- 結果列表 -->
						<div class="p-[16px]">
							<template v-if="activeTab === 'all'">
								<!-- 所有結果 -->
								<div v-for="(items, type) in currentTabResults" :key="type" v-show="items.length > 0">
									<h3 class="text-[16px] mb-[8px] text-slate-500 font-medium mt-4 first:mt-0">{{ entityTypeNames[type] }}</h3>
									<div class="mb-[16px] space-y-1">
										<button
											v-for="item in items.slice(0, 3)"
											:key="item._id"
											@mousedown="handleResultClick(type, item)"
											class="block w-full text-left px-[12px] py-[8px] rounded-lg transition-colors hover:bg-slate-100 text-slate-800"
										>
											<div class="text-[16px]">{{ getEntityName(item) }}</div>
											<div v-if="item.code" class="text-[14px] text-slate-500">{{ item.code }}</div>
										</button>
									</div>
									<button v-if="items.length > 3" @click="setActiveTab(type)" class="text-[14px] text-blue-400 hover:text-blue-300 mt-[4px] transition-colors">
										查看更多 {{ entityTypeNames[type] }} ({{ items.length }})
									</button>
								</div>
							</template>
							<template v-else>
								<!-- 特定分類結果 -->
								<div v-for="(items, type) in currentTabResults" :key="type" v-show="items.length > 0">
									<h3 class="text-[16px] mb-[8px] text-slate-500 font-medium">{{ entityTypeNames[type] }}</h3>
									<div class="mb-[16px] space-y-1">
										<button
											v-for="item in items"
											:key="item._id"
											@mousedown="handleResultClick(type, item)"
											class="block w-full text-left px-[12px] py-[8px] rounded-lg transition-colors hover:bg-slate-100 text-slate-800"
										>
											<div class="text-[16px]">{{ getEntityName(item) }}</div>
											<div v-if="item.code" class="text-[14px] text-slate-500">{{ item.code }}</div>
										</button>
									</div>
								</div>
							</template>
						</div>
					</div>

					<!-- 初始提示或無最近搜尋 -->
					<div v-else-if="!keyword && recentSearches.length === 0" class="p-[24px] text-center text-slate-400">
						<span class="material-icons text-3xl">search</span>
						<p class="mt-2">輸入關鍵字開始搜尋</p>
					</div>
				</div>

				<!-- 底部操作區 -->
				<div class="p-[16px] border-t border-slate-200">
					<div class="flex justify-end">
						<button @click="closeResultsPanel" class="px-[16px] py-[8px] rounded-lg bg-slate-100 text-slate-700 hover:bg-slate-200 transition-colors">
							關閉
						</button>
					</div>
				</div>
			</div>
		</div>

		<!-- 產品區塊 - 左上 -->
		<div class="product-block top-left">
			<div class="product-card">
				<div class="card-icon">
					<span class="material-icons">security</span>
				</div>
				<h3 class="card-title">門禁控制系統</h3>
				<p class="card-desc">結合人臉辨識及身份驗證技術，提供高安全性的出入管理</p>
			</div>
		</div>

		<!-- 產品區塊 - 右上 -->
		<div class="product-block top-right">
			<div class="product-card">
				<div class="card-icon">
					<span class="material-icons">visibility</span>
				</div>
				<h3 class="card-title">智能監控系統</h3>
				<p class="card-desc">AI 驅動的即時監控解決方案，具備行為分析及異常偵測功能</p>
			</div>
		</div>

		<!-- 產品區塊 - 左下 -->
		<div class="product-block bottom-left">
			<div class="product-card">
				<div class="card-icon">
					<span class="material-icons">analytics</span>
				</div>
				<h3 class="card-title">數據分析平台</h3>
				<p class="card-desc">全面的數據收集與分析工具，協助優化營運效率與安全管理</p>
			</div>
		</div>

		<!-- 產品區塊 - 右下 -->
		<div class="product-block bottom-right">
			<div class="product-card">
				<div class="card-icon">
					<span class="material-icons">cloud</span>
				</div>
				<h3 class="card-title">雲端解決方案</h3>
				<p class="card-desc">安全可靠的雲端服務，實現跨設備資料同步與靈活擴展</p>
			</div>
		</div>
	</section>
</template>

<script setup>
import { ref, onMounted, inject, onUnmounted, watch } from "vue";
import { useGlobalSearch } from "~/composables/useGlobalSearch";

// 注入滾動動畫控制器
const scrollAnimation = inject("scrollAnimation");
const { gsap, ScrollTrigger } = scrollAnimation;

// DOM 引用
const searchInput = ref(null);

// 全局搜尋 Composable
const {
	isLoading,
	keyword,
	activeTab,
	resultCounts,
	hasResults,
	currentTabResults, // Results filtered by activeTab
	recentSearches,
	setActiveTab,
	debouncedSearch,
	performSearch, // 直接觸發搜尋，會更新 store
	navigateToResult,
	clearSearch, // 清空 store 內的 keyword 和 results
	getEntityName,
	entityTypeNames,
	clearRecentSearches, // 清空 store 內的最近搜尋
	search // 設置 keyword 並觸發 performSearch
} = useGlobalSearch();

// 本地狀態
const showResults = ref(false); // 控制結果面板顯示
let blurTimeout = null;

// --- 事件處理 ---

const handleInput = () => {
	showResults.value = true;
	// Composable 內部的 debouncedSearch 會處理空關鍵字情況
	debouncedSearch(keyword.value);
};

const handleFocus = () => {
	showResults.value = true;
	// 如果輸入框為空，useGlobalSearch 內部會處理顯示最近搜尋
	if (!keyword.value) {
		// 可能需要確保 composable 正確處理了空關鍵字的 focus 事件
	}
};

const handleBlur = () => {
	// 延遲關閉，允許點擊結果項
	blurTimeout = setTimeout(() => {
		showResults.value = false;
	}, 150); // 縮短延遲，避免感覺遲鈍
};

// 關閉結果面板
const closeResultsPanel = () => {
	showResults.value = false;
	searchInput.value?.blur();
};

// 處理結果項點擊 (@mousedown)
const handleResultClick = (entityType, item) => {
	if (blurTimeout) clearTimeout(blurTimeout);
	navigateToResult(entityType, item);
	closeResultsPanel();
};

// 處理最近搜尋項點擊
const searchRecent = (term) => {
	if (blurTimeout) clearTimeout(blurTimeout);
	search(term); // 使用 composable 的 search 方法
	showResults.value = true; // 確保面板打開
	searchInput.value?.focus(); // 點擊後聚焦，方便繼續編輯
};

// 清除輸入框並重新聚焦
const clearInputAndSearch = () => {
	clearSearch(); // 清空 store 狀態
	keyword.value = ""; // 確保本地 v-model 也清空
	showResults.value = true; // 顯示最近搜尋
	searchInput.value?.focus();
};

// 清除最近搜尋並保持焦點
const clearRecentSearchesAndClose = () => {
	clearRecentSearches();
	searchInput.value?.focus(); // 清除後聚焦，方便用戶輸入
};

// Enter 鍵觸發搜索（如果需要立即搜索）
const triggerSearchFromEnter = () => {
	if (keyword.value.trim()) {
		performSearch(keyword.value.trim());
		// searchInput.value?.blur(); // 可以選擇是否失焦
	} else {
		// 如果關鍵字為空，可以選擇關閉面板或不執行任何操作
		closeResultsPanel();
	}
};

// --- 動畫與生命週期 (保留不變) ---

const setupAnimation = async () => {
	await scrollAnimation.initScrollPlugins();
	gsap.set(".search-container, .product-block", { opacity: 0, y: 30 });

	const tl = gsap.timeline({
		scrollTrigger: {
			trigger: ".product-intro",
			start: "top 60%",
			end: "bottom 80%",
			toggleActions: "play none none reverse"
		}
	});

	tl.to(".search-container", { opacity: 1, y: 0, duration: 1, ease: "power2.out" })
		.fromTo(".product-block.top-left", { opacity: 0, x: -50, y: -50 }, { opacity: 1, x: 0, y: 0, duration: 0.8, ease: "back.out(1.7)" }, "-=0.7")
		.fromTo(".product-block.top-right", { opacity: 0, x: 50, y: -50 }, { opacity: 1, x: 0, y: 0, duration: 0.8, ease: "back.out(1.7)" }, "-=0.6")
		.fromTo(".product-block.bottom-left", { opacity: 0, x: -50, y: 50 }, { opacity: 1, x: 0, y: 0, duration: 0.8, ease: "back.out(1.7)" }, "-=0.6")
		.fromTo(".product-block.bottom-right", { opacity: 0, x: 50, y: 50 }, { opacity: 1, x: 0, y: 0, duration: 0.8, ease: "back.out(1.7)" }, "-=0.6");

	gsap.utils.toArray(".product-card").forEach((card) => {
		gsap.set(card, { transformOrigin: "center bottom" });
		card.addEventListener("mouseenter", () =>
			gsap.to(card, { y: -8, scale: 1.03, boxShadow: "0 12px 25px rgba(0, 0, 0, 0.25)", duration: 0.3, ease: "power1.out" })
		);
		card.addEventListener("mouseleave", () => gsap.to(card, { y: 0, scale: 1, boxShadow: "0 5px 15px rgba(0, 0, 0, 0.2)", duration: 0.3, ease: "power1.out" }));
	});
};

onMounted(async () => {
	try {
		await setupAnimation();
	} catch (error) {
		console.error("產品介紹動畫設置錯誤:", error);
	}
});

onUnmounted(() => {
	if (blurTimeout) clearTimeout(blurTimeout);
	try {
		// 只有當 ScrollTrigger 存在且 getAll 是函數時才執行
		if (ScrollTrigger && typeof ScrollTrigger.getAll === "function") {
			ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
		} else {
			console.warn("ScrollTrigger.getAll is not available or ScrollTrigger is not correctly defined. Cannot kill triggers.");
		}
	} catch (error) {
		console.error("Error during ScrollTrigger cleanup:", error);
	}
});
</script>

<style scoped>
.product-intro {
	perspective: 1000px;
}

.search-container {
	will-change: transform, opacity;
}

.product-block {
	position: absolute;
	width: 280px;
	z-index: 5; /* 低於搜尋結果面板 (z-20) */
	will-change: transform, opacity;
}

.top-left {
	top: 10%;
	left: 5%;
}

.top-right {
	top: 10%;
	right: 5%;
}

.bottom-left {
	bottom: 10%;
	left: 5%;
}

.bottom-right {
	bottom: 10%;
	right: 5%;
}

.product-card {
	background: rgba(0, 0, 0, 0.3);
	backdrop-filter: blur(10px);
	border: 1px solid rgba(58, 209, 152, 0.2);
	border-radius: 16px;
	padding: 24px;
	box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
	transition: all 0.3s ease;
	height: 100%;
	display: flex;
	flex-direction: column;
	align-items: center;
	text-align: center;
	color: var(--color-secondary);
}

.card-icon {
	width: 64px;
	height: 64px;
	border-radius: 50%;
	background: rgba(58, 209, 152, 0.2);
	display: flex;
	justify-content: center;
	align-items: center;
	margin-bottom: 16px;
}

.card-icon .material-icons {
	font-size: 32px;
	color: rgba(58, 209, 152, 0.9);
}

.card-title {
	font-size: 20px;
	font-weight: bold;
	margin-bottom: 12px;
	color: var(--color-secondary);
}

.card-desc {
	font-size: 14px;
	opacity: 0.8;
	line-height: 1.5;
}

.search-results {
	transform-origin: top center;
	box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
	animation: fadeInScale 0.2s ease-out;
}

@keyframes fadeInScale {
	from {
		opacity: 0;
		transform: translateY(-10px) scale(0.98);
	}
	to {
		opacity: 1;
		transform: translateY(0) scale(1);
	}
}

/* 自定義滾動條 */
.scrollbar-thin::-webkit-scrollbar {
	width: 6px;
	height: 6px;
}

.scrollbar-thumb-slate-300::-webkit-scrollbar-thumb {
	background-color: #cbd5e1; /* slate-300 */
	border-radius: 6px;
}

.scrollbar-thumb-slate-300:hover::-webkit-scrollbar-thumb {
	background-color: #94a3b8; /* slate-400 */
}

.scrollbar-track-transparent::-webkit-scrollbar-track {
	background-color: transparent;
}

/* 響應式調整 */
@media (max-width: 1280px) {
	.product-block {
		width: 240px;
	}

	.top-left,
	.bottom-left {
		left: 5%;
	}

	.top-right,
	.bottom-right {
		right: 5%;
	}

	.top-left,
	.top-right {
		top: 15%;
	}

	.bottom-left,
	.bottom-right {
		bottom: 15%;
	}
}

@media (max-width: 768px) {
	.product-block {
		width: 200px;
	}

	.top-left,
	.bottom-left {
		left: 2%;
	}

	.top-right,
	.bottom-right {
		right: 2%;
	}

	.top-left,
	.top-right {
		top: 20%;
	}

	.bottom-left,
	.bottom-right {
		bottom: 20%;
	}

	.card-icon {
		width: 48px;
		height: 48px;
	}

	.card-icon .material-icons {
		font-size: 24px;
	}

	.card-title {
		font-size: 16px;
	}

	.card-desc {
		font-size: 12px;
	}
}

@media (max-width: 640px) {
	.product-block {
		width: 140px;
	}

	.card-icon {
		width: 36px;
		height: 36px;
		margin-bottom: 8px;
	}

	.card-icon .material-icons {
		font-size: 18px;
	}

	.card-title {
		font-size: 14px;
		margin-bottom: 8px;
	}

	.card-desc {
		font-size: 10px;
	}
}
</style>
