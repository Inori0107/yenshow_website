<template>
	<div class="product-detail-page container mx-auto py-8 px-4">
		<!-- 加載指示器 -->
		<div v-if="loading" class="flex justify-center items-center py-20">
			<div class="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-700"></div>
		</div>

		<!-- 錯誤訊息 -->
		<div v-else-if="error" class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded my-6">
			<p class="font-bold">{{ $t("common.error") }}</p>
			<p>{{ error }}</p>
			<button @click="fetchProductData" class="mt-4 bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded">
				{{ $t("common.retry") }}
			</button>
			<NuxtLink to="/products" class="mt-4 ml-4 bg-gray-600 hover:bg-gray-700 text-white py-2 px-4 rounded inline-block">
				{{ $t("common.back") }}
			</NuxtLink>
		</div>

		<template v-else-if="product">
			<!-- 麵包屑導航 -->
			<div class="mb-6 text-sm text-gray-600">
				<NuxtLink to="/" class="hover:text-blue-600">{{ $t("nav.home") }}</NuxtLink>
				<span class="mx-2">/</span>
				<NuxtLink to="/products" class="hover:text-blue-600">{{ $t("nav.products") }}</NuxtLink>
				<template v-if="parentSeries">
					<span class="mx-2">/</span>
					<NuxtLink :to="`/products/series/${parentSeries._id}`" class="hover:text-blue-600">
						{{ parentSeries.name }}
					</NuxtLink>
				</template>
				<span class="mx-2">/</span>
				<span>{{ product.name || $t("products.unnamed_product") }}</span>
			</div>

			<!-- 產品詳情 -->
			<div class="bg-white rounded-lg shadow-lg overflow-hidden">
				<!-- 產品圖片和主要信息 -->
				<div class="flex flex-col md:flex-row">
					<!-- 圖片區塊 -->
					<div class="md:w-1/2 p-6">
						<div v-if="product.images && product.images.length > 0" class="product-gallery">
							<!-- 主圖片 -->
							<div class="main-image mb-4 bg-gray-100 rounded-lg overflow-hidden">
								<img :src="getImageUrl(product.images[currentImageIndex])" :alt="product.name || ''" class="object-contain w-full h-96" />
							</div>

							<!-- 縮圖選擇器 -->
							<div v-if="product.images.length > 1" class="thumbnails grid grid-cols-5 gap-2">
								<div
									v-for="(image, index) in product.images"
									:key="index"
									@click="currentImageIndex = index"
									class="thumbnail cursor-pointer bg-gray-100 rounded overflow-hidden"
									:class="{ 'ring-2 ring-blue-600': currentImageIndex === index }"
								>
									<img :src="getImageUrl(image)" :alt="`${product.name} - 圖片 ${index + 1}`" class="object-cover w-full h-16" />
								</div>
							</div>
						</div>

						<div v-else class="flex items-center justify-center h-96 bg-gray-200 rounded-lg">
							<span class="text-gray-500">{{ $t("products.no_image") }}</span>
						</div>
					</div>

					<!-- 產品信息 -->
					<div class="md:w-1/2 p-6 bg-gray-50">
						<h1 class="text-3xl font-bold mb-4">{{ product.name || $t("products.unnamed_product") }}</h1>

						<div v-if="product.description" class="text-gray-700 mb-6">
							{{ product.description }}
						</div>

						<!-- 產品屬性 -->
						<div v-if="product.attributes && Object.keys(product.attributes).length > 0" class="mb-6">
							<h2 class="text-xl font-semibold mb-3">{{ $t("products.attributes") }}</h2>
							<div class="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-2">
								<div v-for="(value, key) in product.attributes" :key="key" class="flex">
									<span class="font-medium mr-2">{{ key }}:</span>
									<span>{{ value }}</span>
								</div>
							</div>
						</div>

						<!-- 系列信息 -->
						<div v-if="parentSeries" class="mb-6">
							<h2 class="text-xl font-semibold mb-2">{{ $t("products.series") }}</h2>
							<NuxtLink :to="`/products/series/${parentSeries._id}`" class="inline-flex items-center text-blue-600 hover:text-blue-800">
								{{ parentSeries.name }}
								<svg class="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
									<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
								</svg>
							</NuxtLink>
						</div>
					</div>
				</div>

				<!-- 產品規格 -->
				<div class="p-6 border-t">
					<h2 class="text-2xl font-semibold mb-4">{{ $t("products.specifications") }}</h2>

					<div v-if="product.specifications && product.specifications.length > 0" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-4">
						<div v-for="spec in product.specifications" :key="spec.name" class="flex">
							<span class="font-medium mr-2 min-w-32">{{ spec.name }}:</span>
							<span>{{ spec.value }}</span>
						</div>
					</div>

					<div v-else class="text-gray-500">
						{{ $t("products.no_specifications") }}
					</div>
				</div>

				<!-- 相關檔案下載 -->
				<div v-if="product.files && product.files.length > 0" class="p-6 border-t">
					<h2 class="text-2xl font-semibold mb-4">{{ $t("products.downloads") }}</h2>

					<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
						<a
							v-for="file in product.files"
							:key="file.path"
							:href="getFileUrl(file.path)"
							target="_blank"
							rel="noopener noreferrer"
							class="flex items-center p-3 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
						>
							<svg class="w-6 h-6 mr-2 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
								<path
									stroke-linecap="round"
									stroke-linejoin="round"
									stroke-width="2"
									d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"
								></path>
							</svg>
							<span>{{ file.name || file.path.split("/").pop() }}</span>
							<svg class="w-5 h-5 ml-auto text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
								<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"></path>
							</svg>
						</a>
					</div>
				</div>
			</div>

			<!-- 相關產品 -->
			<div v-if="relatedProducts.length > 0" class="mt-12">
				<h2 class="text-2xl font-bold mb-6">{{ $t("products.related") }}</h2>

				<div class="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
					<NuxtLink
						v-for="relatedProduct in relatedProducts"
						:key="relatedProduct._id"
						:to="`/products/${relatedProduct._id}`"
						class="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
					>
						<div class="aspect-w-16 aspect-h-9 overflow-hidden bg-gray-100">
							<img
								v-if="relatedProduct.images && relatedProduct.images.length > 0"
								:src="getImageUrl(relatedProduct.images[0])"
								:alt="relatedProduct.name || ''"
								class="object-cover w-full h-full"
							/>
							<div v-else class="flex items-center justify-center h-full bg-gray-200">
								<span class="text-gray-500">{{ $t("products.no_image") }}</span>
							</div>
						</div>

						<div class="p-4">
							<h3 class="text-lg font-semibold mb-2 truncate">{{ relatedProduct.name }}</h3>
						</div>
					</NuxtLink>
				</div>
			</div>
		</template>

		<!-- 產品未找到提示 -->
		<div v-else class="text-center py-20">
			<svg class="mx-auto h-16 w-16 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
				<path
					stroke-linecap="round"
					stroke-linejoin="round"
					stroke-width="2"
					d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
				></path>
			</svg>
			<h3 class="mt-4 text-lg font-medium text-gray-900">{{ $t("products.product_not_found") }}</h3>
			<p class="mt-1 text-gray-500">{{ $t("products.product_not_found_message") }}</p>
			<NuxtLink to="/products" class="mt-6 inline-block bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded transition-colors">
				{{ $t("products.browse_all_products") }}
			</NuxtLink>
		</div>
	</div>
</template>

<script setup>
import { ref, onMounted, computed } from "vue";
import { useProductsStore } from "~/stores/product";

// 路由參數
const route = useRoute();
const productId = route.params.id;

// 響應式狀態
const loading = ref(true);
const error = ref(null);
const product = ref(null);
const currentImageIndex = ref(0);
const parentSeries = ref(null);
const relatedProducts = ref([]);

// 注入 composables 和 store
const productsStore = useProductsStore();
const config = useRuntimeConfig();

// 獲取產品資料
const fetchProductData = async () => {
	loading.value = true;
	error.value = null;

	try {
		// 1. 獲取產品詳情
		const productData = await productsStore.fetchProductById(productId);
		if (productData) {
			product.value = productData;

			// 2. 獲取父階層資訊
			const parentData = await productsStore.fetchHierarchy();
			const hierarchy = await productsStore.getParentHierarchy("products", productId);

			// 查找系列信息
			if (Array.isArray(hierarchy) && hierarchy.length > 0) {
				const seriesNode = hierarchy.find((item) => item.type === "series");
				if (seriesNode) {
					parentSeries.value = seriesNode;

					// 3. 獲取同系列的其他產品，作為相關產品
					const seriesProducts = await productsStore.fetchChildrenByParent("series", seriesNode._id);
					if (seriesProducts && seriesProducts.children) {
						// 篩選其他產品（排除當前產品）
						relatedProducts.value = seriesProducts.children.filter((item) => item.type === "products" && item._id !== productId).slice(0, 4); // 最多顯示4個相關產品
					}
				}
			}
		} else {
			product.value = null;
			error.value = "產品不存在或已被移除";
		}
	} catch (err) {
		console.error("獲取產品詳情失敗:", err);
		error.value = err.message || "無法獲取產品詳情";
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

// 處理檔案 URL
const getFileUrl = (filePath) => {
	if (!filePath) return "";

	// 如果是完整 URL，直接返回
	if (filePath.startsWith("http")) {
		return filePath;
	}

	// 否則拼接儲存路徑
	const storagePath = config.public.storagePath || "/storage";
	return `${storagePath}/${filePath}`;
};

// 頁面載入時獲取資料
onMounted(() => {
	fetchProductData();
});
</script>

<style scoped>
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

.thumbnail {
	transition: all 0.2s ease-in-out;
}

.thumbnail:hover {
	transform: scale(1.05);
}
</style>
