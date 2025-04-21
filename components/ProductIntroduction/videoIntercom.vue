<template>
	<div ref="componentRef" class="video-intercom-container my-[128px]">
		<!-- 標題區塊 -->
		<div class="title-container relative mb-[48px] lg:mb-[96px]">
			<span class="absolute left-0 top-1/2 h-12 w-12 rounded-full bg-[#4DB6AC] flex items-center justify-center text-[24px] transform -translate-y-1/2"
				>01</span
			>
			<h2 ref="titleRef" class="ml-20 text-[32px] lg:text-[48px] text-secondary overflow-hidden">可視對講</h2>
			<div ref="titleUnderline" class="ml-20 h-1 w-0 bg-[#4DB6AC]"></div>
		</div>

		<!-- 內容區塊 -->
		<div class="content-container grid grid-cols-1 lg:grid-cols-2 gap-[48px] lg:gap-[96px]">
			<!-- 左側信息 -->
			<div ref="infoRef" class="info-section flex flex-col gap-[32px]">
				<p class="description text-[16px] lg:text-[20px] text-primary">
					結合先進的視訊通訊與門禁控制技術，提供高品質的影像與音訊傳輸，確保訪客識別的準確性與安全性。產品設計人性化，操作簡便，適用於住宅、辦公室、工廠等多種場景，滿足不同用戶的需求。
				</p>

				<!-- 特色功能區塊 -->
				<div ref="featuresRef" class="features-grid grid grid-cols-1 md:grid-cols-2 gap-[24px]">
					<div
						class="feature-item p-[24px] bg-white/10 backdrop-blur-sm rounded-[24px] border border-[#4DB6AC]/30 transform hover:scale-105 transition-all duration-300"
					>
						<div class="icon-container mb-[16px]">
							<div class="w-[48px] h-[48px] rounded-full bg-[#4DB6AC]/20 flex items-center justify-center">
								<span class="material-icons text-[#4DB6AC]">videocam</span>
							</div>
						</div>
						<h4 class="text-[18px] font-bold mb-[8px]">高清視訊</h4>
						<p class="text-[14px]">提供1080p高清視訊傳輸，確保清晰辨識訪客</p>
					</div>

					<div
						class="feature-item p-[24px] bg-white/10 backdrop-blur-sm rounded-[24px] border border-[#4DB6AC]/30 transform hover:scale-105 transition-all duration-300"
					>
						<div class="icon-container mb-[16px]">
							<div class="w-[48px] h-[48px] rounded-full bg-[#4DB6AC]/20 flex items-center justify-center">
								<span class="material-icons text-[#4DB6AC]">smartphone</span>
							</div>
						</div>
						<h4 class="text-[18px] font-bold mb-[8px]">APP連接</h4>
						<p class="text-[14px]">最多支持5個使用者，實現遠端監控與管理</p>
					</div>

					<div
						class="feature-item p-[24px] bg-white/10 backdrop-blur-sm rounded-[24px] border border-[#4DB6AC]/30 transform hover:scale-105 transition-all duration-300"
					>
						<div class="icon-container mb-[16px]">
							<div class="w-[48px] h-[48px] rounded-full bg-[#4DB6AC]/20 flex items-center justify-center">
								<span class="material-icons text-[#4DB6AC]">security</span>
							</div>
						</div>
						<h4 class="text-[18px] font-bold mb-[8px]">安全保障</h4>
						<p class="text-[14px]">加密通訊協議，保護使用者隱私與安全</p>
					</div>

					<div
						class="feature-item p-[24px] bg-white/10 backdrop-blur-sm rounded-[24px] border border-[#4DB6AC]/30 transform hover:scale-105 transition-all duration-300"
					>
						<div class="icon-container mb-[16px]">
							<div class="w-[48px] h-[48px] rounded-full bg-[#4DB6AC]/20 flex items-center justify-center">
								<span class="material-icons text-[#4DB6AC]">touch_app</span>
							</div>
						</div>
						<h4 class="text-[18px] font-bold mb-[8px]">簡易操作</h4>
						<p class="text-[14px]">直覺式界面設計，適合各年齡層用戶使用</p>
					</div>
				</div>

				<!-- 行動號召 -->
				<ButtonCTA :to="'/products/Video-Intercom'" class="self-start mt-[16px]"></ButtonCTA>
			</div>

			<!-- 右側產品展示 -->
			<div ref="productDisplayRef" class="product-display relative">
				<div class="bg-gradient-to-br from-[#111] to-[#333] rounded-[32px] p-[32px] lg:p-[48px] shadow-xl relative overflow-hidden">
					<!-- 動態背景效果 -->
					<div class="absolute inset-0 bg-grid-pattern opacity-20"></div>
					<div class="absolute top-0 right-0 w-[200px] h-[200px] bg-[#4DB6AC] rounded-full blur-[120px] opacity-20"></div>

					<!-- 產品選擇區 -->
					<div class="product-selector flex gap-[16px] mb-[32px]">
						<span
							v-for="(item, i) in productImages"
							:key="i"
							@click="selectedProductIndex = i"
							class="cursor-pointer text-[16px] py-[8px] px-[16px] rounded-full transition duration-300"
							:class="selectedProductIndex === i ? 'bg-[#4DB6AC] text-white font-bold' : 'text-[#ddd] hover:bg-white/10'"
						>
							{{ item.label }}
						</span>
					</div>

					<!-- 產品圖展示 -->
					<div ref="productImageRef" class="product-image-container h-[300px] lg:h-[400px] flex items-center justify-center relative">
						<transition name="product-fade" mode="out-in">
							<img
								:key="selectedProductIndex"
								:src="productImages[selectedProductIndex].src"
								:alt="productImages[selectedProductIndex].label"
								class="max-h-full max-w-[80%] object-contain drop-shadow-2xl"
							/>
						</transition>

						<!-- 產品特性標籤 -->
						<div class="product-tags">
							<div
								v-for="(tag, i) in productTags"
								:key="i"
								:class="[
									'product-tag absolute text-[12px] lg:text-[14px] py-[4px] px-[12px] bg-white/10 backdrop-blur-sm border border-[#4DB6AC]/30 rounded-full',
									tag.position
								]"
							>
								{{ tag.text }}
							</div>
						</div>
					</div>

					<!-- 產品規格 -->
					<div ref="specsRef" class="product-specs mt-[32px] grid grid-cols-3 gap-[16px] text-center">
						<div class="spec-item">
							<div class="text-[#4DB6AC] text-[24px] font-bold">1080p</div>
							<div class="text-[14px] text-[#bbb]">解析度</div>
						</div>
						<div class="spec-item">
							<div class="text-[#4DB6AC] text-[24px] font-bold">7"</div>
							<div class="text-[14px] text-[#bbb]">螢幕尺寸</div>
						</div>
						<div class="spec-item">
							<div class="text-[#4DB6AC] text-[24px] font-bold">IP65</div>
							<div class="text-[14px] text-[#bbb]">防護等級</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import ButtonCTA from "~/components/common/Button-CTA.vue";
import { useScrollAnimation } from "~/composables/useScrollAnimation";

// 產品圖片數據
const productImages = [
	{ label: "管理中心主機", src: "/product/YS-9503.png" },
	{ label: "門口機", src: "/product/YS-FTC-06.png" },
	{ label: "室內機", src: "/product/YS-9510-WTE1.jpg" }
];

// 產品特性標籤
const productTags = [
	{ text: "觸控操作", position: "top-[30%] left-[10%]" },
	{ text: "高清攝像頭", position: "top-[20%] right-[15%]" },
	{ text: "智能連接", position: "bottom-[25%] right-[20%]" }
];

// 當前選擇的產品索引
const selectedProductIndex = ref(0);

// 動畫相關的ref
const componentRef = ref(null);
const titleRef = ref(null);
const titleUnderline = ref(null);
const infoRef = ref(null);
const featuresRef = ref(null);
const productDisplayRef = ref(null);
const productImageRef = ref(null);
const specsRef = ref(null);

onMounted(async () => {
	const { initScrollPlugins, createBasicAnimation, createTimelineAnimation, createTextAnimation, createElementEntrance, gsap } = useScrollAnimation();

	// 初始化滾動插件
	await initScrollPlugins();

	// 標題動畫
	const titleTl = createTimelineAnimation({
		trigger: titleRef.value,
		start: "top 80%"
	});

	titleTl
		.fromTo(titleRef.value, { y: 50, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8, ease: "power3.out" })
		.fromTo(titleUnderline.value, { width: 0 }, { width: "70%", duration: 1.2, ease: "power2.inOut" }, "-=0.4");

	// 信息區塊動畫
	createTextAnimation({
		elements: infoRef.value.querySelectorAll(".description"),
		trigger: infoRef.value,
		start: "top 75%",
		fromY: 40,
		duration: 0.8
	});

	// 特色功能動畫
	createElementEntrance({
		elements: featuresRef.value.querySelectorAll(".feature-item"),
		trigger: featuresRef.value,
		start: "top 70%",
		fromY: 30,
		fromOpacity: 0,
		staggerAmount: 0.15,
		duration: 0.7
	});

	// 產品展示動畫
	createBasicAnimation({
		elements: productDisplayRef.value,
		trigger: productDisplayRef.value,
		start: "top 70%",
		fromProps: { opacity: 0, scale: 0.9, y: 40 },
		toProps: { opacity: 1, scale: 1, y: 0 },
		duration: 1,
		ease: "power3.out"
	});

	// 產品規格動畫
	createElementEntrance({
		elements: specsRef.value.querySelectorAll(".spec-item"),
		trigger: specsRef.value,
		start: "top 85%",
		fromY: 20,
		fromOpacity: 0,
		staggerAmount: 0.1,
		duration: 0.6
	});

	// 產品標籤動畫 - 使用vanilla GSAP
	gsap.fromTo(
		".product-tag",
		{
			opacity: 0,
			scale: 0.8
		},
		{
			opacity: 1,
			scale: 1,
			duration: 0.6,
			stagger: 0.2,
			delay: 1,
			ease: "back.out(1.7)"
		}
	);

	// 懸浮效果
	gsap.to(productImageRef.value.querySelector("img"), {
		y: -10,
		duration: 2,
		repeat: -1,
		yoyo: true,
		ease: "power1.inOut"
	});
});
</script>

<style scoped>
.product-fade-enter-active,
.product-fade-leave-active {
	transition: all 0.4s ease;
}

.product-fade-enter-from,
.product-fade-leave-to {
	opacity: 0;
	transform: scale(0.95);
}

.bg-grid-pattern {
	background-image: radial-gradient(rgba(255, 255, 255, 0.1) 1px, transparent 1px);
	background-size: 20px 20px;
}
</style>
