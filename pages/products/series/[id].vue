<template>
	<div class="series-detail-page container mx-auto py-8 px-4">
		<!-- 加載指示器 -->
		<div v-if="loading" class="flex justify-center items-center py-20">
			<div class="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-700"></div>
		</div>

		<!-- 錯誤訊息 -->
		<div v-else-if="error" class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded my-6">
			<p class="font-bold">{{ $t("common.error") }}</p>
			<p>{{ error }}</p>
			<button @click="fetchData" class="mt-4 bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded">
				{{ $t("common.retry") }}
			</button>
			<NuxtLink to="/products" class="mt-4 ml-4 bg-gray-600 hover:bg-gray-700 text-white py-2 px-4 rounded inline-block">
				{{ $t("common.back") }}
			</NuxtLink>
		</div>

		<template v-else>
			<!-- 麵包屑導航 -->
			<div class="mb-6 text-sm text-gray-600">
				<NuxtLink to="/" class="hover:text-blue-600">{{ $t("nav.home") }}</NuxtLink>
				<span class="mx-2">/</span>
				<NuxtLink to="/products" class="hover:text-blue-600">{{ $t("nav.products") }}</NuxtLink>
				<span class="mx-2">/</span>
				<span>{{ seriesData.name || $t("products.unnamed_series") }}</span>
			</div>

			<!-- 系列信息 -->
			<div class="bg-white rounded-lg shadow-md p-6 mb-8">
				<div class="flex flex-col md:flex-row">
					<div class="md:w-1/3 mb-6 md:mb-0 md:mr-8">
						<div class="aspect-w-4 aspect-h-3 bg-gray-100 rounded-lg overflow-hidden">
							<img v-if="seriesData.image" :src="getImageUrl(seriesData.image)" :alt="seriesData.name || ''" class="object-cover w-full h-full" />
							<div v-else class="flex items-center justify-center h-full bg-gray-200">
								<span class="text-gray-500">{{ $t("products.no_image") }}</span>
							</div>
						</div>
					</div>

					<div class="md:w-2/3">
						<h1 class="text-3xl font-bold mb-4">{{ seriesData.name || $t("products.unnamed_series") }}</h1>

						<div v-if="seriesData.description" class="text-gray-700 mb-6">
							{{ seriesData.description }}
						</div>

						<div class="mt-4">
							<h2 class="text-xl font-semibold mb-2">{{ $t("products.specifications") }}</h2>
							<div v-if="seriesData.specifications && seriesData.specifications.length > 0" class="grid grid-cols-1 md:grid-cols-2 gap-4">
								<div v-for="spec in seriesData.specifications" :key="spec.name" class="flex">
									<span class="font-medium mr-2">{{ spec.name }}:</span>
									<span>{{ spec.value }}</span>
								</div>
							</div>
							<div v-else class="text-gray-500">
								{{ $t("products.no_specifications") }}
							</div>
						</div>
					</div>
				</div>
			</div>

			<!-- 產品列表標題 -->
			<h2 class="text-2xl font-bold mb-6">{{ $t("products.in_this_series") }}</h2>

			<!-- 產品列表 -->
			<div v-if="productsList.length > 0" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
				<NuxtLink
					v-for="product in productsList"
					:key="product._id"
					:to="`/products/${product._id}`"
					class="product-card bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
				>
					<div class="aspect-w-16 aspect-h-9 overflow-hidden bg-gray-100">
						<img
							v-if="product.images && product.images.length > 0"
							:src="getImageUrl(product.images[0])"
							:alt="product.name || ''"
							class="object-cover w-full h-full"
						/>
						<div v-else class="flex items-center justify-center h-full bg-gray-200">
							<span class="text-gray-500">{{ $t("products.no_image") }}</span>
						</div>
					</div>

					<div class="p-4">
						<h3 class="text-lg font-semibold mb-2">{{ product.name || $t("products.unnamed_product") }}</h3>
						<p class="text-gray-600 line-clamp-2">{{ product.description || $t("products.no_description") }}</p>

						<div class="mt-4 flex justify-end">
							<span class="inline-block bg-blue-600 text-white text-sm px-3 py-1 rounded-full">
								{{ $t("products.view_details") }}
							</span>
						</div>
					</div>
				</NuxtLink>
			</div>

			<!-- 無產品提示 -->
			<div v-else class="text-center py-12 bg-gray-50 rounded-lg">
				<svg class="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
					<path
						stroke-linecap="round"
						stroke-linejoin="round"
						stroke-width="2"
						d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"
					></path>
				</svg>
				<h3 class="mt-4 text-lg font-medium text-gray-900">{{ $t("products.no_products_in_series") }}</h3>
				<p class="mt-1 text-gray-500">{{ $t("products.check_back_products") }}</p>
			</div>
		</template>
	</div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useProductsStore } from "~/stores/product";

// 路由參數
const route = useRoute();
const seriesId = route.params.id;

// 定義響應式狀態
const loading = ref(true);
const error = ref(null);
const seriesData = ref({});
const productsList = ref([]);

// 注入 composables 和 store
const productsStore = useProductsStore();
const config = useRuntimeConfig();

// 獲取系列和產品資料
const fetchData = async () => {
	loading.value = true;
	error.value = null;

	try {
		// 1. 使用 hierarchy API 獲取系列資料
		const hierarchyData = await productsStore.fetchHierarchy();

		// 尋找對應 ID 的系列
		if (Array.isArray(hierarchyData)) {
			const series = hierarchyData.find((item) => item.type === "series" && item._id === seriesId);

			if (series) {
				seriesData.value = series;
			} else {
				throw new Error("找不到指定的產品系列");
			}
		} else {
			throw new Error("階層資料格式不符預期");
		}

		// 2. 獲取該系列下的產品
		const childrenData = await productsStore.fetchChildrenByParent("series", seriesId);

		if (childrenData && childrenData.children) {
			// 篩選產品類型的項目
			productsList.value = childrenData.children.filter((item) => item.type === "products") || [];
		} else {
			productsList.value = [];
		}
	} catch (err) {
		console.error("獲取系列詳情失敗:", err);
		error.value = err.message || "無法獲取產品系列詳情";
	} finally {
		loading.value = false;
	}
};

// 處理圖片 URL
const getImageUrl = (imagePath) => {
	if (!imagePath) return "";

	// 如果是完整 URL，直接返回
	if (imagePath.startsWith("http")) {
		return imagePath;
	}

	// 否則拼接儲存路徑
	const storagePath = config.public.storagePath || "/storage";
	return `${storagePath}/${imagePath}`;
};

// 頁面載入時獲取資料
onMounted(() => {
	fetchData();
});
</script>

<style scoped>
.aspect-w-16,
.aspect-w-4 {
	position: relative;
}

.aspect-w-16 {
	padding-bottom: 56.25%; /* 16:9 比例 */
}

.aspect-w-4 {
	padding-bottom: 75%; /* 4:3 比例 */
}

.aspect-h-9,
.aspect-h-3 {
	position: absolute;
	height: 100%;
	width: 100%;
	top: 0;
	left: 0;
	right: 0;
	bottom: 0;
}

.line-clamp-2 {
	display: -webkit-box;
	-webkit-line-clamp: 2;
	line-clamp: 2;
	-webkit-box-orient: vertical;
	overflow: hidden;
}

.product-card {
	display: flex;
	flex-direction: column;
	height: 100%;
}
</style>
