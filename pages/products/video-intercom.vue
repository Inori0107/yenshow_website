<template>
	<div class="w-full bg-white relative overflow-hidden">
		<!-- 系列介紹 -->
		<!-- <div class="w-[400px] md:w-2/3 aspect-square absolute right-0 bottom-0 lg:top-0 translate-x-1/3 lg:-translate-y-1/3">
			<span class="text-[24px] md:text-[36px] lg:text-[48px] absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">暢銷商品</span>
			<svg viewBox="0 0 800 800" class="circles">
				<circle cx="400" cy="400" r="200" class="circle-inline dashed" />
				<circle cx="400" cy="400" r="400" class="circle-outline dashed" />
			</svg>
		</div> -->
		<!-- content -->
		<div class="min-h-screen flex flex-col gap-[24px] md:gap-[36px] lg:gap-[48px]">
			<!-- title -->
			<h1 class="text-[48px] md:text-[64px] lg:text-[96px] xl:text-[128px] opacity-50 mt-[96px] md:mt-[48px] ms-[32px] md:ms-[48px] lg:ms-[64px] font-bold">
				可視對講
			</h1>
			<!-- List CTA -->
			<div>
				<div v-if="isLoadingNav">正在載入選單...</div>
				<div v-else-if="navError" class="text-red-500">{{ navError }}</div>
				<NavList v-else :categories="productCategories" @category-selected="handleCategorySelected" @subitem-selected="handleSubItemSelected" />
			</div>
		</div>

		<!-- 產品列表 -->
		<div class="container mx-auto px-4 py-16 space-y-[24px] md:space-y-[48px] lg:space-y-[144px]">
			<!-- 載入狀態和錯誤處理 -->
			<div v-if="isLoadingProducts" class="text-center py-12">
				<div class="inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
				<p class="mt-4 text-lg text-gray-600">正在載入產品資料...</p>
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
							<div v-if="hasSpecifications(subCategory)" class="w-full md:w-auto">
								<FilterSection
									:options="getSpecifications(subCategory)"
									v-model="filterValues[subCategory._id]"
									:filter-key="String(subCategory._id)"
									:is-localized-options="true"
								/>
							</div>
						</div>

						<!-- 產品展示 -->
						<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
							<div
								v-for="product in getFilteredProducts(subCategory)"
								:key="product._id"
								class="bg-gray-50 p-4 rounded-lg hover:shadow-lg transition-all duration-300"
							>
								<!-- 產品圖片 -->
								<div class="aspect-square bg-gray-100 rounded-md mb-4">
									<img
										v-if="product.images && product.images.length > 0"
										:src="product.images[0]"
										:alt="getCategoryName(product)"
										class="w-full h-full object-contain"
									/>
									<div v-else class="w-full h-full flex items-center justify-center text-gray-400">尚無圖片</div>
								</div>
								<!-- 產品名稱 -->
								<h4 class="text-[16px] md:text-[18px] font-medium text-gray-800">{{ getCategoryName(product) }}</h4>
								<!-- 產品型號/簡短描述 -->
								<p v-if="product.model" class="text-[14px] text-gray-500">{{ product.model }}</p>
							</div>

							<!-- 如果沒有產品則顯示提示 -->
							<div v-if="getFilteredProducts(subCategory).length === 0" class="col-span-full text-center py-8 text-gray-500">目前沒有符合條件的產品</div>
						</div>
					</div>
				</div>
				<!-- 如果 computedDisplayCategories 為空 -->
				<div v-if="computedDisplayCategories.length === 0 && !isLoadingProducts" class="text-center py-12 text-gray-500">沒有找到符合條件的分類或產品。</div>
			</div>
		</div>
	</div>
</template>

<script setup>
import { ref, onMounted, reactive, computed, watch } from "vue";
import { useLanguageStore } from "~/stores/core/languageStore";
import { useHierarchyStore } from "~/stores/hierarchyStore";
import NavList from "~/components/products/NavList.vue";
import FilterSection from "~/components/products/FilterSection.vue";

const languageStore = useLanguageStore();
const hierarchyStore = useHierarchyStore();

// 導航相關狀態
// const navCategories = ref([]);
const isLoadingNav = ref(false);
const navError = ref(null);

// 產品相關狀態
const productCategories = ref([]);
// const displayCategories = ref([]);
const filterValues = reactive({});
const isLoadingProducts = ref(false);
const productsError = ref(null);
const selectedCategory = ref(null);
const selectedSubItem = ref(null);

// 假設 'video-intercom' 是此系列在資料庫中的 ID 或唯一標識符
const SERIES_ID = "67ed0511296210e234e0ddd7";

// 獲取本地化名稱的輔助函數
const getCategoryName = (item) => {
	if (!item) return "";
	return languageStore.getLocalizedField(item, "name") || item.title || "";
};

// 檢查子分類是否有規格 (修正)
const hasSpecifications = (subCategory) => {
	return subCategory && Array.isArray(subCategory.specifications) && subCategory.specifications.length > 0;
};

// 獲取子分類的規格選項 (修正)
const getSpecifications = (subCategory) => {
	// 參數改為 subCategory
	if (!hasSpecifications(subCategory)) return []; // 調用修正後的函數

	return [{ _id: "ALL", name: { zh: "ALL" } }, ...subCategory.specifications];
};

// 獲取經過篩選的產品 (重寫邏輯)
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
	if (!selectedCategory.value) {
		// 沒有選擇任何分類，顯示所有
		return productCategories.value;
	}

	// 找到匹配的父分類
	const matchingCategory = productCategories.value.find((c) => c._id === selectedCategory.value._id);
	if (!matchingCategory) {
		// 理論上不應發生，但作為防禦性措施
		return [];
	}

	// 如果同時選擇了子項目 (且不是 'ALL' 字符串)
	if (selectedSubItem.value && typeof selectedSubItem.value !== "string") {
		// 找到匹配的子分類
		const subCategory = matchingCategory.subCategories?.find((sc) => sc._id === selectedSubItem.value._id);
		if (subCategory) {
			// 只顯示這個子分類，但結構上仍然是在父分類下
			return [
				{
					...matchingCategory,
					subCategories: [subCategory]
				}
			];
		}
		// 如果找不到子分類，或選擇的是 'ALL'，則回退到顯示整個父分類
		return [matchingCategory];
	} else {
		// 只選擇了父分類，顯示該父分類及其所有子分類
		return [matchingCategory];
	}
});

// NavList 選擇事件處理
const handleCategorySelected = (category) => {
	selectedCategory.value = category;
	selectedSubItem.value = null;
};

const handleSubItemSelected = ({ category, subItem }) => {
	selectedCategory.value = category;
	selectedSubItem.value = subItem && typeof subItem === "object" && subItem._id ? subItem : null;
};

// 添加 watch 來監控 filterValues 的變化
watch(
	filterValues,
	(newValue, oldValue) => {
		console.log("filterValues changed:");
		console.log("New:", newValue);
		console.log("Old:", oldValue);
	},
	{ deep: true }
); // 使用 deep watch 來監控物件內部的變化

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
	} catch (error) {
		console.error(`[Video Intercom] Error fetching sub-hierarchy for series '${SERIES_ID}':`, error);
		navError.value = "無法載入導覽選單：" + (error.message || "未知錯誤");
		productsError.value = "無法載入產品資料：" + (error.message || "未知錯誤");
		productCategories.value = [];
	} finally {
		isLoadingNav.value = false;
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
	stroke: #00a8a9;
	stroke-width: 2;
	transition: all 0.5s ease;
}

.circle-outline {
	stroke: #39b3cc;
}

.dashed {
	stroke-dasharray: 100 50;
	animation: dash 20s linear infinite;
}

@keyframes dash {
	to {
		stroke-dashoffset: 1000;
	}
}
</style>
