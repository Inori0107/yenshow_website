<template>
	<section id="products" class="my-[128px] md:my-[512px] flex flex-col gap-[48px] lg:gap-[96px]">
		<h1 class="text-[24px] md:text-[48px] lg:text-[64px] text-secondary text-center">產品中心</h1>

		<!-- 滾動指示器 -->
		<div class="flex justify-center gap-4 md:gap-8">
			<div
				v-for="(product, index) in productCategories"
				:key="index"
				:class="[
					'h-2 w-2 md:h-3 md:w-3 rounded-full transition-all duration-300',
					currentProductIndex === index ? product.colorClass + ' scale-125' : 'bg-gray-200 opacity-60'
				]"
			></div>
		</div>

		<!-- 產品顯示區塊 -->
		<div ref="productContainer" class="product-container relative">
			<!-- 滾動觸發區域 -->
			<div ref="scrollTriggerArea" class="scroll-trigger-area">
				<div v-for="(_, index) in productCategories" :key="index" class="scroll-trigger-item"></div>
			</div>

			<!-- 產品內容 -->
			<div
				v-for="(product, index) in productCategories"
				:key="index"
				ref="productContainers"
				class="product-item absolute top-0 left-0 w-full bg-secondary rounded-[50px] lg:rounded-[100px]"
				:class="{ 'opacity-0': currentProductIndex !== index }"
			>
				<div
					class="container py-[24px] md:py-[48px] lg:min-h-[600px] flex flex-col md:flex-row justify-evenly items-center gap-[24px]"
					:class="{ 'md:flex-row-reverse': index % 2 === 0 }"
				>
					<!-- content -->
					<div ref="productContents" class="px-[24px] md:px-[36px] lg:px-[64px] flex flex-col items-center gap-[24px] lg:gap-[48px] text-primary">
						<div class="w-full flex gap-[32px] lg:gap-[64px] items-center">
							<span :class="['h-fit rounded-full text-[12px] md:text-[16px] lg:text-[24px] px-[12px]', product.colorClass]">
								{{ product.number }}
							</span>
							<h3 class="text-[21px] md:text-[32px] lg:text-[48px]">{{ product.title }}</h3>
						</div>
						<div class="text-[12px] md:text-[16px] lg:text-[24px]">
							{{ product.description }}
						</div>
						<ButtonCTA :to="product.link"></ButtonCTA>
					</div>
					<!-- image -->
					<div class="h-fit flex flex-col items-center gap-[16px] p-[16px] lg:p-[32px] bg-white rounded-[50px]">
						<!-- 選擇按鈕區 -->
						<div class="flex gap-[16px] lg:gap-[32px]">
							<span
								v-for="(item, i) in product.imageOptions"
								:key="i"
								@click="selectedImageIndices[index] = i"
								class="text-[16px] lg:text-[24px] cursor-pointer transition duration-300"
								:class="{ 'text-primary font-bold border-b-2 border-primary': selectedImageIndices[index] === i }"
							>
								{{ item.label }}
							</span>
						</div>
						<!-- 切換圖片 -->
						<div class="w-[300px] h-[225px] lg:w-[400px] lg:h-[300px] flex justify-center items-center rounded-[25px]">
							<!-- <img class="max-h-full w-auto object-contain" :src="getSelectedImage(product, index)" alt="選擇的圖片" /> -->
						</div>
					</div>
				</div>
			</div>
		</div>
	</section>
</template>

<script setup lang="ts">
import { ref, onMounted, nextTick, inject, onUnmounted } from "vue";
import ButtonCTA from "~/components/common/Button-CTA.vue";
import gsap from "gsap";

// 定義 ScrollTrigger API 類型
interface ScrollTriggerAPI {
	getScrollTrigger: () => any;
	refresh: () => void;
}

// 注入 ScrollTrigger API，提供類型定義
const scrollTriggerAPI = inject<ScrollTriggerAPI>("scrollTrigger");

// 動態初始化 ScrollTrigger
const initScrollTrigger = async () => {
	try {
		// 優先使用父組件提供的 ScrollTrigger
		if (scrollTriggerAPI?.getScrollTrigger()) {
			return scrollTriggerAPI.getScrollTrigger();
		}

		// 如果父組件未提供，則自行初始化
		if (typeof window !== "undefined") {
			const ScrollTriggerModule = await import("gsap/ScrollTrigger");
			const ScrollTrigger = ScrollTriggerModule.default || ScrollTriggerModule.ScrollTrigger;
			gsap.registerPlugin(ScrollTrigger);
			return ScrollTrigger;
		}
	} catch (error) {
		console.error("Error initializing ScrollTrigger:", error);
	}
	return null;
};

interface ImageOption {
	label: string;
	src: string;
}

interface Product {
	number: string;
	title: string;
	description: string;
	colorClass: string;
	link: string;
	imageOptions: ImageOption[];
}

// 定義產品滾動事件介面
interface ProductScrollEvent extends CustomEvent {
	detail: {
		progress: number;
	};
}

// 產品分類數據
const productCategories = ref<Product[]>([
	{
		number: "01",
		title: "可視對講",
		description:
			"結合先進的視訊通訊與門禁控制技術，提供高品質的影像與音訊傳輸，確保訪客識別的準確性與安全性。產品設計人性化，操作簡便，適用於住宅、辦公室、工廠等多種場景，滿足不同用戶的需求。透過APP，每個室內機最多可綁定5個家人使用，實現遠端監控與管理，提升生活便利性與安全性。",
		colorClass: "bg-[#4DB6AC]",
		link: "/products/Video-Intercom",
		imageOptions: [
			// { label: "管理中心主機", src: "/product/YS-9503.png" },
			// { label: "門口機", src: "/product/YS-FTC-06.png" },
			// { label: "室內機", src: "/product/YS-9510-WTE1.jpg" }
		]
	},
	{
		number: "02",
		title: "門禁管理",
		description:
			"門禁控制產品系列，融合刷卡、指紋識別與人臉識別等多種先進技術，提供高效且安全的出入管理解決方案。產品設計靈活，適用於企業大樓、政府機構、機場、學校等多種場景，滿足不同用戶的需求。透過多樣化的識別方式，提升通行效率，確保場所安全。",
		colorClass: "bg-[#FFC857]",
		link: "/products/Access-Control",
		imageOptions: [
			// { label: "門禁控制", src: "/product/YS-AC-02F.jpg" },
			// { label: "通關柵欄", src: "/product/YS-K3Y501SX.png" },
			// { label: "訪客管理", src: "/product/YS-V50.jpg" }
		]
	},
	{
		number: "03",
		title: "影像監控",
		description:
			"結合先進的視訊通訊與門禁控制技術，提供高品質的影像與音訊傳輸，確保訪客識別的準確性與安全性。產品設計人性化，操作簡便，適用於住宅、辦公室、工廠等多種場景，滿足不同用戶的需求。透過APP，每個室內機最多可綁定5個家人使用，實現遠端監控與管理，提升生活便利性與安全性。",
		colorClass: "bg-[#4DB6AC]", // Note: Same color as 01, consider changing if needed
		link: "/products/Surveillance-Monitoring",
		imageOptions: [
			// { label: "IPC", src: "/product/iYS-2CD7A46G2_P.png" },
			// { label: "NVR", src: "/product/iYS-BA04.jpg" }
		]
	},
	{
		number: "04",
		title: "安全防護",
		description:
			"人體測溫產品專注於高精度與高效能，採用先進熱成像技術，能快速進行非接觸式體溫篩檢，有效降低交叉感染風險。適用於辦公場所、工廠、醫院、機場等高人流區域，幫助用戶建立完善的體溫監控體系，提升公共健康與安全保障。",
		colorClass: "bg-[#5E548E] text-secondary",
		link: "/products/Security-Solutions",
		imageOptions: [
			// { label: "人體測溫", src: "/product/YS-TTC-01.png" },
			// { label: "無線警報", src: "/product/YS-PWA-YXPRO.jpg" },
			// { label: "火災預警", src: "/product/YS-TBC-03.png" }
		]
	}
]);

// 當前顯示的產品索引
const currentProductIndex = ref(0);

// 每個產品的選擇圖片索引
const selectedImageIndices = ref(productCategories.value.map(() => 0));

// 獲取當前顯示的圖片
const getSelectedImage = (product: Product, productIndex: number) => {
	return product.imageOptions[selectedImageIndices.value[productIndex]].src;
};

// DOM refs for animation
const productContainer = ref<HTMLDivElement | null>(null);
const productContainers = ref<HTMLDivElement[]>([]);
const scrollTriggerArea = ref<HTMLDivElement | null>(null);

// 切換產品
const changeProduct = (index: number) => {
	if (index === currentProductIndex.value) return;

	// 如果元素存在，執行淡入淡出動畫
	if (productContainers.value && productContainers.value.length > 0) {
		// 淡出當前產品
		gsap.to(productContainers.value[currentProductIndex.value], {
			opacity: 0,
			duration: 0.4,
			ease: "power1.out",
			onComplete: () => {
				// 更新當前產品索引
				currentProductIndex.value = index;

				// 淡入新產品
				gsap.fromTo(
					productContainers.value[index],
					{ opacity: 0 },
					{
						opacity: 1,
						duration: 0.6,
						ease: "power2.inOut"
					}
				);
			}
		});
	} else {
		// 如果元素不存在，直接更新索引
		currentProductIndex.value = index;
	}
};

// 產品切換邏輯
const handleProductScroll = (event: ProductScrollEvent) => {
	const { progress } = event.detail;
	// 基於滾動進度計算應該顯示哪個產品
	const index = Math.floor(progress * productCategories.value.length);
	changeProduct(Math.min(index, productCategories.value.length - 1));
};

onMounted(async () => {
	await nextTick(); // 確保 DOM 元素已渲染

	// 獲取 ScrollTrigger 實例
	const ScrollTrigger = await initScrollTrigger();
	if (!ScrollTrigger || !productContainers.value?.length || !productContainer.value || !scrollTriggerArea.value) return;

	// 計算整個產品區塊的高度，確保滾動區域足夠長
	const containerHeight = productContainer.value.clientHeight;
	const sectionsCount = productCategories.value.length;

	// 設置滾動觸發區域的高度 (每個產品區塊分配足夠的滾動空間)
	scrollTriggerArea.value.style.height = `${containerHeight * sectionsCount}px`;

	// 設置每個觸發區域的高度
	const triggerItems = scrollTriggerArea.value.querySelectorAll(".scroll-trigger-item");
	triggerItems.forEach((item: Element) => {
		(item as HTMLElement).style.height = `${containerHeight}px`;
	});

	// 整個產品區塊的進入動畫
	gsap.from(productContainer.value, {
		opacity: 0,
		y: 50,
		duration: 0.8,
		ease: "power2.out",
		scrollTrigger: {
			trigger: "#products",
			start: "top 75%",
			once: true
		}
	});

	// 確保初始產品可見
	gsap.set(productContainers.value[currentProductIndex.value], {
		opacity: 1
	});

	// 隱藏其他產品
	productContainers.value.forEach((container, index) => {
		if (index !== currentProductIndex.value) {
			gsap.set(container, { opacity: 0 });
		}
	});

	// 判斷是否使用父組件提供的滾動控制
	const useParentScrollControl = !!scrollTriggerAPI?.getScrollTrigger();

	if (!useParentScrollControl) {
		// 使用自己的滾動邏輯
		// 為每個產品設置滾動觸發器
		triggerItems.forEach((item: Element, index: number) => {
			ScrollTrigger.create({
				trigger: item,
				start: "top center",
				end: "bottom center",
				onEnter: () => changeProduct(index),
				onEnterBack: () => changeProduct(index)
			});
		});

		// 使產品容器保持固定位置
		ScrollTrigger.create({
			trigger: scrollTriggerArea.value,
			start: "top top",
			end: "bottom bottom",
			pin: productContainer.value,
			pinSpacing: false
		});
	}

	// 監聽從父組件發出的滾動事件
	window.addEventListener("product-scroll", handleProductScroll as EventListener);
});

onUnmounted(() => {
	// 清理事件監聽
	window.removeEventListener("product-scroll", handleProductScroll as EventListener);
});
</script>

<style scoped>
.product-container {
	position: relative;
	height: 700px; /* 固定高度，適應產品內容 */
}

.product-item {
	transition: opacity 0.4s ease;
}

.scroll-trigger-area {
	position: absolute;
	width: 100%;
	z-index: -1;
}

.scroll-trigger-item {
	width: 100%;
}
</style>
