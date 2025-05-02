<template>
	<!-- 主容器 -->
	<div class="bg-secondary">
		<SkeletonProductDetail v-if="isLoading" />
		<div v-else-if="error" class="min-h-screen flex items-center justify-center">
			<div class="bg-red-50 text-red-500 p-8 rounded-lg text-center">
				<h2 class="text-2xl font-bold mb-4">無法載入產品資訊</h2>
				<p>{{ error }}</p>
				<NuxtLink to="/Products" class="text-blue-600 hover:underline">返回產品列表</NuxtLink>
			</div>
		</div>
		<div v-else-if="product">
			<!-- 麵包屑導航 -->
			<div class="p-4 md:p-6 lg:p-8">
				<nav class="text-[12px] md:text-[16px] lg:text-[21px] text-gray-500">
					<ol class="flex flex-wrap items-center">
						<li><NuxtLink to="/" class="hover:text-primary">首頁</NuxtLink></li>
						<li class="mx-2">/</li>
						<li><NuxtLink to="/products" class="hover:text-primary">產品</NuxtLink></li>
						<li class="mx-2">/</li>
						<li><NuxtLink :to="parentCategoryLink" class="hover:text-primary">可視對講</NuxtLink></li>
						<li class="mx-2">/</li>
						<li class="text-gray-700 font-medium truncate">{{ getLocalizedName(product) }}</li>
					</ol>
				</nav>
			</div>

			<!-- 產品主體區塊 -->
			<section class="container flex flex-col md:flex-row py-4 md:py-6 lg:py-8 justify-center items-center gap-4 md:gap-8 lg:gap-12">
				<!-- 產品圖片區 -->
				<div class="bg-white rounded-lg overflow-hidden flex items-center justify-center aspect-square w-[282px] md:w-[384px]">
					<img
						v-if="currentImage"
						:src="currentImage"
						:alt="getLocalizedName(product)"
						class="w-3/4 aspect-square object-contain cursor-pointer"
						@click="openImageModal(currentImage)"
					/>
					<div v-else class="text-gray-500 py-20">尚無圖片</div>
				</div>

				<!-- 產品信息區 -->
				<div class="text-gray-800 space-y-2 md:space-y-4 lg:space-y-6 py-4 md:py-6 lg:py-8 w-1/2">
					<!-- 產品基本信息 -->
					<h1 class="text-[21px] md:text-[28px] lg:text-[36px] font-bold text-gray-900">{{ getLocalizedName(product) }}</h1>
					<p v-if="product.code" class="text-gray-500 text-[12px] md:text-[16px] lg:text-[21px]">產品編號：{{ product.code }}</p>

					<!-- 產品說明 -->
					<div v-if="getLocalizedDescription(product)">
						<h2 class="text-[12px] md:text-[16px] lg:text-[21px] font-semibold">產品說明</h2>
						<p class="text-gray-700 text-[12px] md:text-[16px] lg:text-[21px]">{{ getLocalizedDescription(product) }}</p>
					</div>

					<Button-CTA label="免費諮詢" to="/contact" class="w-fit mx-auto"></Button-CTA>
				</div>
			</section>

			<!-- 詳細特點與規格區塊 -->
			<section class="bg-gray-50 py-8 md:py-12 lg:py-16">
				<div class="container">
					<!-- 特點區塊 -->
					<div v-show="activeTab === 'features'" class="space-y-6 md:space-y-8">
						<h2 class="text-xl md:text-2xl lg:text-3xl font-bold text-gray-800 mb-4 md:mb-8 text-center">產品特點</h2>

						<div v-if="product.features && product.features.length > 0">
							<ul class="mx-auto feature-list space-y-4 md:space-y-6 md:max-w-4xl">
								<li v-for="feature in product.features" :key="feature._id" class="flex items-start bg-white p-4 rounded-lg shadow-sm border border-gray-100">
									<span class="feature-marker shrink-0 text-primary text-lg md:text-xl mr-3 mt-0.5">◎</span>
									<div>
										<h3 class="text-base md:text-lg font-medium text-gray-800">
											{{ getLocalizedFeature(feature) }}
										</h3>
									</div>
								</li>
							</ul>
						</div>
					</div>
				</div>
			</section>

			<!-- 諮詢區塊 -->
			<section class="bg-primary bg-opacity-5 py-8 md:py-12 space-y-2 md:space-y-4 lg:space-y-6 text-center">
				<h2 class="text-[24px] md:text-[28px] lg:text-[36px] font-bold text-gray-800">了解更多產品資訊？</h2>
				<p class="text-[16px] md:text-[21px] lg:text-[24px] text-gray-600">我們的專業團隊隨時為您提供諮詢服務，解答所有關於產品的疑問</p>
				<div class="flex justify-center gap-3 md:gap-4">
					<Button-CTA label="立即諮詢" to="/contact" class="w-fit"></Button-CTA>
					<Button-CTA label="產品一覽" to="/Products" class="w-fit"></Button-CTA>
				</div>
			</section>
		</div>
		<div v-else class="min-h-screen flex items-center justify-center">
			<div class="text-center py-12 text-gray-500">
				<h2 class="text-2xl font-bold mb-4">找不到指定的產品</h2>
				<NuxtLink to="/products" class="mt-4 inline-block text-blue-600 hover:underline">返回產品列表</NuxtLink>
			</div>
		</div>

		<!-- 圖片預覽彈窗 -->
		<div v-if="isImageModalOpen" class="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center p-4" @click="closeImageModal">
			<button class="absolute top-4 right-4 text-white hover:text-gray-300">
				<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6 md:w-8 md:h-8">
					<path stroke-linecap="round" stroke-linejoin="round" d="M6 18 18 6M6 6l12 12" />
				</svg>
			</button>
			<div class="max-w-5xl max-h-[90vh]">
				<img :src="modalImage" :alt="getLocalizedName(product)" class="max-w-full max-h-[90vh] object-contain" />
			</div>
		</div>
	</div>
</template>

<script setup>
import { ref, onMounted, computed } from "vue";
import { useRoute } from "vue-router";
import { useLanguageStore } from "~/stores/core/languageStore";
import { useProductsStore } from "~/stores/models/products";
import ButtonCTA from "~/components/common/Button-CTA.vue";
import SkeletonProductDetail from "~/components/products/SkeletonProductDetail.vue";

const route = useRoute();
const languageStore = useLanguageStore();
const productsStore = useProductsStore();

const productId = ref(route.params.id);
const product = ref(null);
const isLoading = ref(false);
const error = ref(null);
const relatedProducts = ref([]);

// 圖片展示相關
const currentImage = ref(null);
const isImageModalOpen = ref(false);
const modalImage = ref(null);

// 標籤頁相關
const tabs = [
	{ id: "features", label: "產品特點" },
	{ id: "specs", label: "技術規格" },
	{ id: "applications", label: "應用場景" }
];
const activeTab = ref("features");

// 推薦語輪播相關
const testimonialIndex = ref(0);
const currentTestimonial = computed(() => {
	if (!product.value?.testimonials?.length) return { content: "", author: "" };
	return product.value.testimonials[testimonialIndex.value];
});

const getLocalizedField = (item, field) => {
	return item ? languageStore.getLocalizedField(item, field) : "";
};

const getLocalizedName = (item) => getLocalizedField(item, "name");
const getLocalizedDescription = (item) => getLocalizedField(item, "description");

const getLocalizedFeature = (feature) => {
	if (!feature) return "";
	const currentLang = languageStore.currentLanguage ? languageStore.currentLanguage.toUpperCase() : "TW";
	return feature[currentLang] || feature["TW"] || feature["EN"] || Object.values(feature)[0] || "";
};

const parentCategoryLink = "/products/video-intercom";

// 圖片預覽功能
const openImageModal = (image) => {
	modalImage.value = image;
	isImageModalOpen.value = true;
	document.body.style.overflow = "hidden";
};

const closeImageModal = () => {
	isImageModalOpen.value = false;
	document.body.style.overflow = "";
};

// 推薦語輪播
const nextTestimonial = () => {
	if (!product.value?.testimonials?.length) return;
	testimonialIndex.value = (testimonialIndex.value + 1) % product.value.testimonials.length;
};

const prevTestimonial = () => {
	if (!product.value?.testimonials?.length) return;
	testimonialIndex.value = testimonialIndex.value === 0 ? product.value.testimonials.length - 1 : testimonialIndex.value - 1;
};

// 型錄下載功能
const downloadCatalog = () => {
	if (product.value?.catalogUrl) {
		window.open(product.value.catalogUrl, "_blank");
	} else {
		// 如果沒有型錄，可以改為導向到聯絡頁面
		navigateTo("/contact?subject=產品型錄索取&product=" + productId.value);
	}
};

onMounted(async () => {
	isLoading.value = true;
	error.value = null;
	try {
		product.value = await productsStore.fetchProductById(productId.value);
		if (!product.value) {
			error.value = `找不到 ID 為 ${productId.value} 的產品。`;
		} else {
			// 設置當前顯示圖片為第一張
			if (product.value.images && product.value.images.length > 0) {
				currentImage.value = product.value.images[0];
			}

			// 獲取相關產品
			if (product.value.category) {
				relatedProducts.value = await productsStore.fetchRelatedProducts(productId.value, product.value.category);
			}
		}
	} catch (err) {
		console.error("獲取產品資料時發生錯誤:", err);
		error.value = err.message || "無法載入產品資訊，請稍後再試。";
		product.value = null;
	} finally {
		isLoading.value = false;
	}
});
</script>
