<template>
	<section class="product-intro-section py-16 md:py-24 bg-gray-50 overflow-hidden">
		<div class="container mx-auto px-4">
			<div
				v-for="(product, index) in products"
				:key="product.id"
				class="product-item flex flex-col md:flex-row items-center mb-16 md:mb-24"
				:class="{ 'md:flex-row-reverse': index % 2 !== 0 }"
				:ref="(el) => (productRefs[index] = el)"
			>
				<!-- Content Section -->
				<div class="w-full md:w-1/2 text-center md:text-left px-4 md:px-8 mb-8 md:mb-0">
					<div class="inline-flex items-center justify-center w-12 h-12 rounded-full bg-primary-light text-primary mb-4">
						<span class="text-xl font-bold">{{ String(index + 1).padStart(2, "0") }}</span>
					</div>
					<h2 class="text-3xl md:text-4xl font-bold text-gray-800 mb-4">{{ product.title }}</h2>
					<p class="text-gray-600 mb-6 leading-relaxed">{{ product.description }}</p>
					<!-- Bullet points for features (Suggestion 2) -->
					<ul class="list-disc list-inside text-left mb-8 space-y-2 text-gray-700 pl-4 md:pl-0">
						<li v-for="feature in product.features" :key="feature">{{ feature }}</li>
					</ul>
					<button class="btn btn-primary group">
						了解更多
						<svg
							class="w-5 h-5 ml-2 transition-transform duration-300 group-hover:translate-x-1"
							fill="none"
							stroke="currentColor"
							viewBox="0 0 24 24"
							xmlns="http://www.w3.org/2000/svg"
						>
							<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3"></path>
						</svg>
					</button>
				</div>

				<!-- Image/Tab Section -->
				<div class="w-full md:w-1/2 px-4 md:px-8 relative">
					<div class="bg-white rounded-lg shadow-lg p-4 md:p-6 aspect-video overflow-hidden">
						<!-- Tabs (Optional based on design) -->
						<div class="flex space-x-4 mb-4 border-b border-gray-200">
							<button
								v-for="tab in product.tabs"
								:key="tab.id"
								@click="setActiveTab(product, tab.id)"
								:class="[
									'py-2 px-4 text-sm font-medium',
									product.activeTab === tab.id ? 'text-primary border-b-2 border-primary' : 'text-gray-500 hover:text-gray-700'
								]"
							>
								{{ tab.name }}
							</button>
						</div>
						<!-- Image Placeholder (Suggestion 5 - Use scene/detail shots) -->
						<img
							:src="getActiveTabImage(product)"
							:alt="product.title"
							class="w-full h-auto object-cover rounded transition-opacity duration-300 ease-in-out"
							:key="product.activeTab"
						/>
					</div>
				</div>
			</div>
		</div>
	</section>
</template>

<script setup>
import { ref, onMounted, nextTick } from "vue";
import { useScrollAnimation } from "@/composables/useScrollAnimation";

const { createTextAnimation, createElementEntrance, initScrollPlugins } = useScrollAnimation();

const productRefs = ref([]);

// 示範資料 - 後續應從 API 或 Store 取得
const products = ref([
	{
		id: "intercom",
		title: "可視對講",
		description:
			"結合先進的視訊通訊與門禁控制技術，提供高品質的影像與音訊傳輸，確保訪客識別的準確性與安全性。產品設計人性化，操作簡便，適用於住宅、辦公室、工廠等多種場景，滿足不同用戶的需求。",
		features: ["高解析度視訊通話", "遠端門禁控制", "APP 綁定 (最多5個家人)", "多場景適用"],
		tabs: [
			{ id: "master", name: "管理中心主機", image: "/images/placeholder-product-1a.jpg" },
			{ id: "door", name: "門口機", image: "/images/placeholder-product-1b.jpg" },
			{ id: "indoor", name: "室內機", image: "/images/placeholder-product-1c.jpg" }
		],
		activeTab: "master",
		image: "/images/placeholder-product-1.jpg" // 主圖片或預設圖片
	},
	{
		id: "parking",
		title: "智慧停車",
		description: "利用車牌辨識、自動柵欄等技術，實現停車場的自動化管理。提供便捷的出入體驗，提高停車場運營效率，並整合線上支付功能。",
		features: ["車牌自動辨識", "快速進出場", "多元支付整合", "即時車位查詢"],
		tabs: [
			{ id: "gate", name: "出入口管制", image: "/images/placeholder-product-2a.jpg" },
			{ id: "payment", name: "自助繳費機", image: "/images/placeholder-product-2b.jpg" }
		],
		activeTab: "gate",
		image: "/images/placeholder-product-2.jpg"
	},
	{
		id: "access",
		title: "門禁管理",
		description: "提供多樣化的身份驗證方式，如卡片、密碼、指紋、人臉辨識等，搭配靈活的權限設定，確保場所安全，並可與其他系統連動。",
		features: ["多重身份驗證", "彈性權限管理", "進出紀錄查詢", "系統整合連動"],
		tabs: [
			{ id: "reader", name: "讀卡機", image: "/images/placeholder-product-3a.jpg" },
			{ id: "controller", name: "控制器", image: "/images/placeholder-product-3b.jpg" }
		],
		activeTab: "reader",
		image: "/images/placeholder-product-3.jpg"
	},
	{
		id: "cctv",
		title: "影像監控",
		description: "採用高清攝影機與智慧影像分析技術，提供全天候的安全監控。支援遠端即時觀看與回放，異常事件自動告警，提升安全防護等級。",
		features: ["高清影像錄製", "智慧影像分析", "遠端監控與回放", "事件觸發告警"],
		tabs: [
			{ id: "camera", name: "網路攝影機", image: "/images/placeholder-product-4a.jpg" },
			{ id: "nvr", name: "錄影主機", image: "/images/placeholder-product-4b.jpg" }
		],
		activeTab: "camera",
		image: "/images/placeholder-product-4.jpg"
	}
]);

const setActiveTab = (product, tabId) => {
	const targetProduct = products.value.find((p) => p.id === product.id);
	if (targetProduct) {
		targetProduct.activeTab = tabId;
	}
};

const getActiveTabImage = (product) => {
	const activeTabData = product.tabs.find((tab) => tab.id === product.activeTab);
	return activeTabData ? activeTabData.image : product.image; // Fallback to main image
};

onMounted(async () => {
	await nextTick();
	await initScrollPlugins();

	productRefs.value.forEach((el, index) => {
		if (el) {
			// Animate title and description
			createTextAnimation({
				elements: el.querySelectorAll("h2, p, ul"),
				trigger: el,
				staggerAmount: 0.1,
				delay: 0.1
			});
			// Animate button
			createElementEntrance({
				elements: el.querySelector(".btn"),
				trigger: el,
				delay: 0.3
			});
			// Animate number circle
			createElementEntrance({
				elements: el.querySelector(".inline-flex"),
				trigger: el,
				fromScale: 0.5,
				delay: 0
			});
			// Animate image/tab section
			createElementEntrance({
				elements: el.querySelector(".relative .bg-white"),
				trigger: el,
				fromX: index % 2 !== 0 ? -50 : 50, // Animate from opposite side based on row direction
				fromY: 0,
				delay: 0.2
			});
		}
	});
});
</script>

<style scoped>
/* Basic styles - consider moving to a global CSS or using Tailwind */
.container {
	max-width: 1200px;
}

.product-item {
	/* Add any specific item styling here */
}

/* Add Tailwind CSS classes directly in the template or define custom styles here */
.btn {
	@apply inline-block px-6 py-3 rounded-full text-base font-medium transition duration-300 ease-in-out;
}

.btn-primary {
	@apply bg-primary text-white hover:bg-primary-dark shadow-md hover:shadow-lg;
}

.bg-primary {
	background-color: #4a90e2; /* Example primary color - adjust as needed */
}

.bg-primary-light {
	background-color: #eaf2fa; /* Example light primary color */
}

.text-primary {
	color: #4a90e2;
}

.border-primary {
	border-color: #4a90e2;
}

.hover\:bg-primary-dark:hover {
	background-color: #357abd; /* Example dark primary color */
}

/* Ensure images don't exceed their container */
img {
	max-width: 100%;
	height: auto;
	display: block;
}

/* Animation starting states (using setup for simplicity, could use GSAP's set method) */
.gsap-fade-in-up {
	opacity: 0;
	transform: translateY(20px);
}

.aspect-video {
	aspect-ratio: 16 / 9;
}
</style>
