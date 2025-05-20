<template>
	<div>
		<!-- 系列介紹 -->
		<section class="bg-white relative overflow-hidden space-y-[24px] md:space-y-[36px] lg:space-y-[48px] pb-[24px] md:pb-[36px] lg:pb-[48px]">
			<article class="w-[400px] md:w-2/3 aspect-square absolute right-0 bottom-0 lg:top-0 translate-x-1/3 lg:-translate-y-1/3">
				<span class="text-[24px] md:text-[36px] lg:text-[48px] absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">應用介紹</span>
				<svg viewBox="0 0 800 800" class="circles">
					<circle cx="400" cy="400" r="200" class="circle-inline" />
					<circle cx="400" cy="400" r="400" class="circle-outline" />
				</svg>
			</article>
			<!-- content -->
			<aside class="md:min-h-screen flex flex-col" style="margin-top: 0px !important">
				<!-- title -->
				<div class="ms-[32px] md:ms-[48px] lg:ms-[64px]">
					<h1 class="text-[48px] md:text-[64px] lg:text-[96px] xl:text-[128px] opacity-50 font-bold">門禁管理</h1>
					<p class="text-[16px] md:text-[28px] lg:text-[36px] opacity-30">以人臉、卡片、QR Code 或車牌等多元識別技術</p>
					<p class="text-[16px] md:text-[28px] lg:text-[36px] opacity-30 ms-[64px] md:ms-[96px] lg:ms-[128px]">打造可追蹤的出入口權限控制</p>
				</div>
				<!-- List CTA -->
				<div class="mt-[24px] md:mt-[36px] lg:mt-[48px]">
					<div v-if="navError" class="text-red-500">{{ navError }}</div>
					<NavList
						v-show="!isLoadingNav && !navError"
						ref="navListRef"
						:categories="productCategories"
						@category-selected="handleCategorySelected"
						@subitem-selected="handleSubItemSelected"
					/>
				</div>
			</aside>
			<!-- introduction -->
			<div class="md:absolute md:top-2/3 md:left-1/2 md:-translate-x-1/2 md:-translate-y-1/2 z-10 w-1/2 xl:w-2/3 px-4 md:px-0" ref="introductionContainerRef">
				<SkeletonIntroduction v-if="isLoadingNav" />
				<TransitionGroup
					v-else-if="currentIntroductionDisplayItems.length > 0"
					tag="div"
					name="introduction-card-list"
					class="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-4 gap-4"
				>
					<div
						v-for="(item, index) in currentIntroductionDisplayItems"
						:key="item.title"
						:data-index="index"
						class="bg-slate-50 border border-slate-200 rounded-lg shadow-md p-4 text-center"
					>
						<h4 class="text-[16px] md:text-[21px] lg:text-[24px] font-bold text-slate-800 mb-2">{{ item.title }}</h4>
						<p class="text-[12px] md:text-[16px] text-slate-600">{{ item.content }}</p>
					</div>
				</TransitionGroup>
				<div v-else-if="!isLoadingNav && productCategories.length > 0 && currentIntroductionDisplayItems.length === 0" class="text-center text-gray-600 py-8">
					<p>請從上方導覽選擇一個項目以查看詳細介紹。</p>
				</div>
				<div v-else-if="!isLoadingNav && productCategories.length === 0" class="text-center text-gray-500 py-8">
					<p>目前沒有可供選擇的介紹項目。</p>
				</div>
			</div>
		</section>

		<!-- 產品列表 -->
		<section class="bg-gray-50">
			<div class="container mx-auto px-4 py-16 space-y-[24px] md:space-y-[48px] lg:space-y-[144px]">
				<!-- 載入狀態和錯誤處理 -->
				<div v-if="isLoadingProducts" class="text-center py-12">
					<!-- Skeleton Loader -->
					<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
						<SkeletonProductCard v-for="n in 8" :key="n" />
					</div>
				</div>
				<div v-else-if="productsError" class="bg-red-50 text-red-500 p-4 rounded-lg my-4">{{ productsError }}</div>
				<div v-else>
					<!-- 各分類區塊 -->
					<div v-for="category in computedDisplayCategories" :key="category._id" class="space-y-[12px] md:space-y-[24px] lg:space-y-[48px]">
						<!-- 分類標題 -->
						<h2 class="text-[32px] md:text-[48px] font-bold py-[24px] text-center border-b-2 border-primary/50">{{ getCategoryName(category) }}</h2>
						<!-- 子分類內容 -->
						<div v-for="subCategory in category.subCategories || []" :key="subCategory._id" class="mb-16 space-y-6">
							<div class="flex flex-col md:flex-row justify-between items-center gap-4">
								<!-- 子分類標題 -->
								<h3 class="text-[24px] md:text-[36px] font-semibold text-primary/80 flex-shrink-0">{{ getCategoryName(subCategory) }}</h3>
								<!-- 規格篩選器 (只在子分類級別有規格時顯示) -->
								<div v-if="hasSpecifications(subCategory)" class="w-fit">
									<FilterSection
										:options="getSpecifications(subCategory)"
										v-model="filterValues[subCategory._id]"
										:filter-key="String(subCategory._id)"
										:is-localized-options="true"
									/>
								</div>
							</div>
							<!-- 產品展示 (使用 ProductList) -->
							<ProductList :products="prepareProductsForList(getFilteredProducts(subCategory))" :loading="false" @view-product="handleViewProduct" />
						</div>
					</div>
					<!-- 如果 computedDisplayCategories 為空 -->
					<div v-if="computedDisplayCategories.length === 0 && !isLoadingProducts" class="text-center py-12 text-gray-500">沒有找到符合條件的分類或產品。</div>
				</div>
			</div>
		</section>
	</div>
</template>

<script setup>
import { ref, onMounted, reactive, computed, watch, nextTick } from "vue";
import { useLanguageStore } from "~/stores/core/languageStore";
import { useHierarchyStore } from "~/stores/hierarchyStore";
import { useScrollAnimation } from "~/composables/useScrollAnimation";
import NavList from "~/components/products/NavList.vue";
import FilterSection from "~/components/products/FilterSection.vue";
import SkeletonProductCard from "~/components/products/SkeletonProductCard.vue";
import ProductList from "~/components/products/ProductList.vue";
import SkeletonIntroduction from "~/components/products/SkeletonIntroduction.vue";
import { useRouter } from "vue-router";

const languageStore = useLanguageStore();
const hierarchyStore = useHierarchyStore();
const { gsap } = useScrollAnimation();
const router = useRouter();

// 導航相關狀態
const isLoadingNav = ref(false);
const navError = ref(null);
const navListRef = ref(null);
const activeIntroductionCategoryName = ref(""); // 新增狀態來追蹤當前選擇的介紹內容
const introductionContainerRef = ref(null); // Added ref for introduction container

// 介紹內容數據
const introductionItemsMap = {
	門禁控制: [
		{ title: "辦公大樓", content: "員工刷臉即通行，無接觸、卡片遺失困擾" },
		{ title: "工業園區", content: "結合人臉+排班資料控管進出紀錄，強化考勤與權限管理" },
		{ title: "住宅社區", content: "住戶刷臉進出社區、電梯自動到樓層，提升尊榮感與安全" },
		{ title: "校園與補習班", content: "師生/學生進出刷臉紀錄，家長即時接收進出通知" }
	],
	通關機: [
		{ title: "學校/補習班", content: "學生臉部識別＋體溫偵測，結合家長通報系統" },
		{ title: "醫療場域", content: "自動化訪客控管流程，降低人力負擔、提升通行效率" },
		{ title: "建案社區", content: "結合門禁及電梯通行權限，打造智能化社區通行體驗" },
		{ title: "工地管理", content: "工人刷臉進出、搭配工時與出勤紀錄，強化現場安全與紀律管理" }
	],
	車牌辨識管理系統: [
		{ title: "社區與建案停車場", content: "自動辨識住戶車牌，自動開啟柵欄，提升通行效率與便利性" },
		{ title: "企業/工廠車道管理", content: "自動記錄員工與物流車輛出入時間，結合雷達偵測防止追車闖關" },
		{ title: "收費停車場", content: "搭配通關機與票證系統，整合臨停與月租邏輯" },
		{ title: "物流倉儲中心", content: "系統化管理貨車進出時段，結合監控即時畫面與資料留存" }
	],
	訪客管理系統: [
		{ title: "企業辦公大樓", content: "訪客預約與到場身份驗證，提升櫃台效率與專業形象" },
		{ title: "科技廠區/物流場域", content: "控管訪客、外包人員進出紀錄與逗留時長，落實安控紀錄" },
		{ title: "醫療院所/養護機構", content: "每日訪客實名制與健康資料快篩，提高感染防控力" },
		{ title: "社區建案接待中心", content: "搭配人臉建檔、動線引導與臨時通行整合，提升住戶與訪客雙方體驗" }
	]
};

const currentIntroductionDisplayItems = computed(() => {
	return introductionItemsMap[activeIntroductionCategoryName.value] || [];
});

// 產品相關狀態
const productCategories = ref([]);
const filterValues = reactive({});
const isLoadingProducts = ref(false);
const productsError = ref(null);

// 假設 'video-intercom' 是此系列在資料庫中的 ID 或唯一標識符
const SERIES_ID = "67ed0512296210e234e0de10";

// 獲取本地化名稱的輔助函數
const getCategoryName = (item) => {
	if (!item) return "";
	return languageStore.getLocalizedField(item, "name") || item.title || "";
};

// 檢查子分類是否有規格
const hasSpecifications = (subCategory) => {
	return subCategory && Array.isArray(subCategory.specifications) && subCategory.specifications.length > 0;
};

// 獲取子分類的規格選項
const getSpecifications = (subCategory) => {
	if (!hasSpecifications(subCategory)) return [];
	return [{ _id: "ALL", name: { zh: "ALL" } }, ...subCategory.specifications];
};

// 獲取經過篩選的產品
const getFilteredProducts = (subCategory) => {
	// 檢查 subCategory 和 specifications 是否有效
	if (!subCategory || !Array.isArray(subCategory.specifications)) {
		return [];
	}

	const filterValue = filterValues[subCategory._id] || "ALL";
	let productsToShow = [];

	// 遍歷子分類下的所有規格
	for (const specification of subCategory.specifications) {
		// 檢查該規格下是否有產品陣列
		if (specification && Array.isArray(specification.products)) {
			if (filterValue === "ALL") {
				// 如果篩選器是 ALL，添加該規格下的所有產品
				productsToShow = productsToShow.concat(specification.products);
			} else if (specification._id === filterValue) {
				// 如果篩選器匹配當前規格 ID，只添加該規格下的產品
				productsToShow = productsToShow.concat(specification.products);
				// 因為篩選器值對應單一規格，找到匹配的就可以停止遍歷此子分類的規格了
				break;
			}
		}
	}

	return productsToShow;
};

// 使用 Computed Property 計算需要顯示的分類
const computedDisplayCategories = computed(() => {
	return productCategories.value;
});

// NavList 選擇事件處理
const handleCategorySelected = (category) => {
	const name = getCategoryName(category);
	activeIntroductionCategoryName.value = name;
};

const handleSubItemSelected = ({ category, subItem }) => {
	console.log("SubItem selected (but ignored for product list filtering):", subItem, "for category:", category);
};

// Handle product click from ProductList
const handleViewProduct = (product) => {
	console.log("Navigating to product:", product._id);
	if (product && product._id) {
		router.push(`/products/${product._id}`);
	} else {
		console.error("Product ID is missing, cannot navigate.");
	}
};

// 添加 watch 來監控 filterValues 的變化
watch(filterValues, (newValue, oldValue) => {}, { deep: true });

// 監聽導航載入狀態，觸發動畫
watch(isLoadingNav, (newVal, oldVal) => {
	if (gsap) {
		// NavList animation
		if (!newVal && oldVal === true && navListRef.value) {
			nextTick(() => {
				const targetNavList = navListRef.value.$el || navListRef.value;
				if (targetNavList && targetNavList.offsetParent !== null) {
					gsap.from(targetNavList, {
						x: -50,
						opacity: 0,
						duration: 0.8,
						ease: "power3.out"
					});
				}
			});
		}
	}
});

const prepareProductsForList = (products) => {
	if (!products) return [];
	return products.map((product) => ({
		...product,
		displayName: getCategoryName(product)
	}));
};

onMounted(async () => {
	isLoadingNav.value = true;
	isLoadingProducts.value = true;
	navError.value = null;
	productsError.value = null;
	activeIntroductionCategoryName.value = ""; // 初始化

	try {
		const subHierarchy = await hierarchyStore.fetchSubHierarchy("series", SERIES_ID);

		// 處理 productCategories 資料
		if (subHierarchy && Array.isArray(subHierarchy.categories)) {
			productCategories.value = subHierarchy.categories;
		} else if (Array.isArray(subHierarchy)) {
			// 兼容直接返回陣列的情況
			productCategories.value = subHierarchy;
		} else {
			console.warn(`[Access Control] fetchSubHierarchy did not return expected categories for series '${SERIES_ID}'. Received:`, subHierarchy);
			productCategories.value = [];
		}

		// 初始化 filterValues 之前
		productCategories.value.forEach((category) => {
			filterValues[category._id] = "ALL";
			if (category.subCategories) {
				category.subCategories.forEach((subCategory) => {
					filterValues[subCategory._id] = "ALL";
				});
			}
		});

		// 設置默認選中的介紹內容
		if (productCategories.value.length > 0) {
			const firstCategoryName = getCategoryName(productCategories.value[0]);
			activeIntroductionCategoryName.value = firstCategoryName;
		}

		isLoadingNav.value = false;
	} catch (error) {
		console.error(`[Access Control] Error fetching sub-hierarchy for series '${SERIES_ID}':`, error);
		navError.value = "無法載入導覽選單：" + (error.message || "未知錯誤");
		productsError.value = "無法載入產品資料：" + (error.message || "未知錯誤");
		productCategories.value = [];
		isLoadingNav.value = false;
	} finally {
		isLoadingProducts.value = false;
	}
});
</script>

<style scoped>
.circles {
	width: 100%;
	height: 100%;
	overflow: visible;
}

.circle-inline,
.circle-outline {
	fill: none;
	stroke-width: 2;
	stroke-dasharray: 100 50;
	animation-duration: 20s;
	animation-timing-function: linear;
	animation-iteration-count: infinite;
}

.circle-inline {
	stroke: #00a8a9;
	animation-name: dash-clockwise;
}

.circle-outline {
	stroke: #39b3cc;
	animation-name: dash-counter-clockwise;
}

@keyframes dash-clockwise {
	from {
		stroke-dashoffset: 0;
	}
	to {
		stroke-dashoffset: 300;
	}
}

@keyframes dash-counter-clockwise {
	from {
		stroke-dashoffset: 300;
	}
	to {
		stroke-dashoffset: 0;
	}
}

/* Introduction Card List Animations */
.introduction-card-list-enter-active,
.introduction-card-list-leave-active {
	transition: all 0.5s ease;
}
.introduction-card-list-enter-from,
.introduction-card-list-leave-to {
	opacity: 0;
	transform: translateY(30px);
}

/* Staggering effect for enter */
.introduction-card-list-enter-active {
	transition-delay: calc(0.1s * var(--stagger-index, 0));
}

/* For leave, items usually disappear more simultaneously or with a reverse stagger if desired */
.introduction-card-list-leave-active {
	position: absolute; /* Important for leave animations to not affect layout */
}
</style>
