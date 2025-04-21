<template>
	<div class="product-series-page container mx-auto py-8 px-4">
		<h1 class="text-3xl font-bold mb-8 text-center">{{ $t("products.series_title") }}</h1>

		<!-- 加載指示器 -->
		<div v-if="loading" class="flex justify-center items-center py-20">
			<div class="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-700"></div>
		</div>

		<!-- 錯誤訊息 -->
		<div v-else-if="error" class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded my-6">
			<p class="font-bold">{{ $t("common.error") }}</p>
			<p>{{ error }}</p>
			<button @click="fetchSeriesData" class="mt-4 bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded">
				{{ $t("common.retry") }}
			</button>
		</div>

		<!-- 系列列表 -->
		<div v-else-if="seriesList.length > 0" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
			<NuxtLink
				v-for="series in seriesList"
				:key="series._id"
				:to="`/products/series/${series._id}`"
				class="series-card bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
			>
				<div class="aspect-w-16 aspect-h-9 overflow-hidden bg-gray-100">
					<img v-if="series.image" :src="getImageUrl(series.image)" :alt="series.name || ''" class="object-cover w-full h-full" />
					<div v-else class="flex items-center justify-center h-full bg-gray-200">
						<span class="text-gray-500">{{ $t("products.no_image") }}</span>
					</div>
				</div>

				<div class="p-4">
					<h2 class="text-xl font-semibold mb-2">{{ series.name || "unnamed" }}</h2>
					<p class="text-gray-600 line-clamp-3">{{ series.description || $t("products.no_description") }}</p>

					<div class="mt-4 flex justify-between items-center">
						<span class="text-sm text-gray-500"> {{ series.productCount || 0 }} {{ $t("products.products") }} </span>
						<span class="inline-block bg-blue-600 text-white text-sm px-3 py-1 rounded-full">
							{{ $t("products.view_series") }}
						</span>
					</div>
				</div>
			</NuxtLink>
		</div>

		<!-- 無資料提示 -->
		<div v-else class="text-center py-20">
			<svg class="mx-auto h-16 w-16 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
				<path
					stroke-linecap="round"
					stroke-linejoin="round"
					stroke-width="2"
					d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
				></path>
			</svg>
			<h3 class="mt-4 text-lg font-medium text-gray-900">{{ $t("products.no_series") }}</h3>
			<p class="mt-1 text-gray-500">{{ $t("products.check_back") }}</p>
		</div>
	</div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useProductsStore } from "~/stores/product";

// 定義響應式狀態
const loading = ref(true);
const error = ref(null);
const seriesList = ref([]);

// 注入 composables 和 store
const productsStore = useProductsStore();
const config = useRuntimeConfig();

// 獲取系列資料
const fetchSeriesData = async () => {
	loading.value = true;
	error.value = null;

	try {
		// 使用 hierarchy API 獲取系列資料
		const data = await productsStore.fetchHierarchy();

		// 篩選出系列資料
		if (Array.isArray(data)) {
			seriesList.value = data.filter((item) => item.type === "series") || [];
		} else {
			console.error("階層資料格式不符預期:", data);
			seriesList.value = [];
		}
	} catch (err) {
		console.error("獲取系列資料失敗:", err);
		error.value = err.message || "無法獲取產品系列資料";
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
	fetchSeriesData();
});
</script>

<style scoped>
.series-card {
	display: flex;
	flex-direction: column;
	height: 100%;
}

.aspect-w-16 {
	position: relative;
	padding-bottom: 56.25%; /* 16:9 比例 */
}

.aspect-h-9 {
	position: absolute;
	height: 100%;
	width: 100%;
	top: 0;
	left: 0;
	right: 0;
	bottom: 0;
}

.line-clamp-3 {
	display: -webkit-box;
	-webkit-line-clamp: 3;
	line-clamp: 3;
	-webkit-box-orient: vertical;
	overflow: hidden;
}
</style>
