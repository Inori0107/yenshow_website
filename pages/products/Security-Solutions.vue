<template>
	<div>
		<!-- 系列介紹 -->
		<section class="bg-white relative max-h-screen overflow-hidden">
			<div class="w-[400px] md:w-2/3 aspect-square absolute right-0 bottom-0 lg:top-0 translate-x-1/3 lg:-translate-y-1/3">
				<span class="text-[24px] md:text-[36px] lg:text-[48px] absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">暢銷商品</span>
				<svg viewBox="0 0 800 800" class="circles">
					<circle cx="400" cy="400" r="200" class="circle-inline" />
					<circle cx="400" cy="400" r="400" class="circle-outline" />
				</svg>
			</div>
			<!-- content -->
			<div class="min-h-screen flex flex-col gap-[24px] md:gap-[36px] lg:gap-[48px]">
				<!-- title -->
				<h1 class="text-[48px] md:text-[64px] lg:text-[96px] xl:text-[128px] opacity-50 mt-[24px] md:mt-[48px] ms-[32px] md:ms-[48px] lg:ms-[64px] font-bold">
					安全防護
				</h1>
				<!-- List CTA -->
				<div>
					<div v-if="navError" class="text-red-500">{{ navError }}</div>
					<NavList
						v-show="!isLoadingNav && !navError"
						ref="navListRef"
						:categories="productCategories"
						@category-selected="handleCategorySelected"
						@subitem-selected="handleSubItemSelected"
					/>
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
import { useRouter } from "vue-router";

const languageStore = useLanguageStore();
const hierarchyStore = useHierarchyStore();
const { gsap } = useScrollAnimation();
const router = useRouter();

// 導航相關狀態
const isLoadingNav = ref(false);
const navError = ref(null);
const navListRef = ref(null);

// 產品相關狀態
const productCategories = ref([]);
const filterValues = reactive({});
const isLoadingProducts = ref(false);
const productsError = ref(null);

// 假設 'video-intercom' 是此系列在資料庫中的 ID 或唯一標識符
const SERIES_ID = "67ed0512296210e234e0deb2";

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
	console.log("Category selected (but ignored for product list filtering):", category);
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
watch(isLoadingNav, (newValue, oldValue) => {
	if (gsap && !newValue && oldValue === true && navListRef.value) {
		nextTick(() => {
			const targetElement = navListRef.value.$el || navListRef.value;
			if (targetElement && targetElement.offsetParent !== null) {
				gsap.from(targetElement, {
					x: -50,
					opacity: 0,
					duration: 0.8,
					ease: "power3.out"
				});
			}
		});
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

	try {
		const subHierarchy = await hierarchyStore.fetchSubHierarchy("series", SERIES_ID);

		// 處理 productCategories 資料
		if (subHierarchy && Array.isArray(subHierarchy.categories)) {
			productCategories.value = subHierarchy.categories;
		} else if (Array.isArray(subHierarchy)) {
			// 兼容直接返回陣列的情況
			productCategories.value = subHierarchy;
		} else {
			console.warn(`[Video Intercom] fetchSubHierarchy did not return expected categories for series '${SERIES_ID}'. Received:`, subHierarchy);
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

		isLoadingNav.value = false;
	} catch (error) {
		console.error(`[Video Intercom] Error fetching sub-hierarchy for series '${SERIES_ID}':`, error);
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
</style>
