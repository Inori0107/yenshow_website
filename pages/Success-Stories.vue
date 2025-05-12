<template>
	<div>
		<!-- Entrance -->
		<nav class="h-screen container flex flex-col justify-center relative">
			<!-- 標題 -->
			<div class="z-10 mb-12" ref="titleRef">
				<h1 class="text-[36px] md:text-[96px] text-secondary">Success Stories</h1>
				<h3 class="text-[24px] md:text-[64px] text-secondary">合作案例</h3>
			</div>

			<!-- 標語區塊 -->
			<div class="flex flex-col md:flex-row gap-8 md:gap-6 z-10" ref="heroBlocks">
				<!-- 主標語區塊 -->
				<div class="block-bg w-full md:w-1/2 rounded-xl p-6 md:p-8 transition-all duration-500">
					<div class="absolute inset-0 rounded-xl overflow-hidden">
						<div class="block-pattern pattern-1"></div>
					</div>
					<div class="relative z-10">
						<div class="text-[16px] md:text-[18px] text-white/70 mb-2">OUR MISSION</div>
						<h4 class="text-[20px] md:text-[28px] text-white font-medium mb-4">見證我們如何為各行各業提供安全可靠的解決方案</h4>
						<p class="text-[14px] md:text-[16px] text-white/80">我們致力於打造高度安全可靠的門禁系統與監控設備，為您的空間提供全方位的保護，讓安心無所不在。</p>
					</div>
				</div>

				<!-- 數據統計區塊 -->
				<div class="flex flex-col gap-4 md:w-1/2">
					<!-- 成功案例 -->
					<div class="block-bg rounded-xl p-6 transition-all duration-500">
						<div class="absolute inset-0 rounded-xl overflow-hidden">
							<div class="block-pattern pattern-2"></div>
						</div>
						<div class="relative z-10 flex items-center">
							<div class="mr-4">
								<div class="text-[32px] md:text-[48px] text-white font-bold">50+</div>
								<div class="text-[14px] md:text-[16px] text-white/70">成功案例</div>
							</div>
							<p class="text-[14px] text-white/80 max-w-[200px]">橫跨不同行業的成功實例，每個案例都是我們實力的見證</p>
						</div>
					</div>

					<!-- 服務年資 -->
					<div class="block-bg rounded-xl p-6 transition-all duration-500">
						<div class="absolute inset-0 rounded-xl overflow-hidden">
							<div class="block-pattern pattern-3"></div>
						</div>
						<div class="relative z-10 flex items-center">
							<div class="mr-4">
								<div class="text-[32px] md:text-[48px] text-white font-bold">10+</div>
								<div class="text-[14px] md:text-[16px] text-white/70">服務年資</div>
							</div>
							<p class="text-[14px] text-white/80 max-w-[200px]">十餘年專業經驗，為客戶提供最穩定可靠的解決方案</p>
						</div>
					</div>
				</div>
			</div>
		</nav>

		<!-- 合作夥伴 -->
		<div class="bg-primary rounded-[100px] p-12">
			<section ref="sectionRef" class="relative min-h-screen">
				<!-- 企業與商業合作 -->
				<article ref="businessRef" class="absolute inset-0 flex flex-col justify-center items-center">
					<h4 class="text-[24px] md:text-[48px] lg:text-[64px] text-secondary text-center mb-12">企業與商業合作</h4>
					<div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
						<div v-for="(feature, index) in business_feature" :key="index" class="feature flex flex-col items-center text-center text-secondary">
							<img :src="feature.image" alt="feature" class="w-[100px] lg:w-[150px] aspect-square" />
							<h5 class="text-[16px] md:text-[24px] lg:text-[36px]">{{ feature.title }}</h5>
							<p class="text-[12px] md:text-[16px] lg:text-[24px]">{{ feature.description }}</p>
						</div>
					</div>
				</article>

				<!-- 公共與專業場域支援 -->
				<article ref="publicRef" class="absolute inset-0 flex flex-col justify-center items-center opacity-0">
					<h4 class="text-[24px] md:text-[48px] lg:text-[64px] text-secondary text-center mb-12">公共與專業場域支援</h4>
					<div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
						<div v-for="(feature, index) in public_feature" :key="index" class="feature flex flex-col items-center text-center text-secondary">
							<img :src="feature.image" alt="feature" class="w-[100px] lg:w-[150px] aspect-square" />
							<h5 class="text-[16px] md:text-[24px] lg:text-[36px]">{{ feature.title }}</h5>
							<p class="text-[12px] md:text-[16px] lg:text-[24px]">{{ feature.description }}</p>
						</div>
					</div>
				</article>
			</section>
		</div>

		<!-- Success Cases Section -->
		<section class="min-h-screen flex flex-col justify-center">
			<!-- Light background -->
			<div class="container mx-auto px-4">
				<h2 class="text-3xl md:text-5xl font-semibold text-center mb-12 md:mb-16 text-secondary">實績案例</h2>

				<!-- Single Case Example -->
				<div
					class="flex flex-col md:flex-row items-center gap-8 md:gap-12 bg-white p-8 md:p-12 rounded-2xl shadow-lg relative overflow-hidden border border-gray-100"
				>
					<!-- Left Column: Text Details -->
					<div class="w-full md:w-1/2 space-y-6 z-10 order-2 md:order-1">
						<h3 class="text-2xl md:text-3xl font-bold text-neutral-800">合總君悅</h3>
						<p class="text-lg md:text-xl text-neutral-600">集合式住宅建案</p>
						<div class="border-l-4 border-blue-500 pl-4 space-y-2 text-gray-700">
							<p><strong class="font-medium text-gray-800">基地位置：</strong> 雲林縣斗南鎮延平路二段455號旁</p>
							<p><strong class="font-medium text-gray-800">基地面積：</strong> 541坪</p>
							<p><strong class="font-medium text-gray-800">產品類型：</strong> 電梯大樓</p>
							<p><strong class="font-medium text-gray-800">坪數規劃：</strong> 23-34坪</p>
							<p><strong class="font-medium text-gray-800">戶數：</strong> 91戶、2戶店鋪</p>
						</div>
						<p class="text-sm md:text-base text-gray-600 leading-relaxed bg-gray-50 p-4 rounded-md border border-gray-200">
							該項目使用遠岫全住可視對講系統，採用10寸室內機YS-9510，4.3吋人臉辨識住戶門口機，整社區人臉辨識通行不須再攜帶磁卡。其他配套產品包含：視頻監控前後端產品、傳輸、門禁、集中管理平臺軟體。
						</p>
					</div>

					<!-- Right Column: Image -->
					<div class="w-full md:w-1/2 z-10 order-1 md:order-2">
						<!-- TODO: Replace with actual image path -->
						<!-- <img src="/success_cases/case_01.jpg" alt="合總君悅 建案外觀" class="rounded-lg shadow-md w-full h-auto object-cover aspect-[4/3]" /> -->
					</div>

					<!-- Pagination Dots (Simple) -->
					<div class="absolute bottom-6 right-8 flex space-x-2 z-10">
						<span class="w-3 h-3 bg-blue-500 rounded-full cursor-pointer"></span>
						<span class="w-3 h-3 bg-gray-300 rounded-full cursor-pointer hover:bg-gray-400 transition-colors"></span>
						<span class="w-3 h-3 bg-gray-300 rounded-full cursor-pointer hover:bg-gray-400 transition-colors"></span>
					</div>
				</div>
			</div>
		</section>
	</div>
</template>

<script setup>
import { ref, onMounted, nextTick } from "vue";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

// --- Refs for Entrance Animation ---
const titleRef = ref(null);
const heroBlocks = ref(null);

// --- Refs for ScrollTrigger Animation ---
const sectionRef = ref(null);
const businessRef = ref(null);
const publicRef = ref(null);

const business_feature = ref([
	{
		title: "系統整合商",
		description: "為弱電合作夥伴提供高規格、安全的產品和服務。",
		image: "/corporation/Networking Manager.svg"
	},
	{
		title: "品牌客戶",
		description: "與知名品牌合作，客製化需求，以專業性達到客戶需求。",
		image: "/corporation/customers.svg"
	},
	{
		title: "公司行號",
		description: "為企業提供安全便利的門禁考勤解決方案",
		image: "/corporation/company.svg"
	}
]);

const public_feature = ref([
	{
		title: "建設公司",
		description: "提供完整弱電系統規劃，新穎設備提高銷售機會",
		image: "/corporation/building.svg"
	},
	{
		title: "醫療院所",
		description: "提供醫療機構的安全解決方案，包括醫院、診所等。",
		image: "/corporation/hospital.svg"
	},
	{
		title: "學校",
		description: "提供學校安全解決方案，包括學校、幼兒園等。",
		image: "/corporation/school.svg"
	},
	{
		title: "公家機關",
		description: "與政府機構合作，提供安全技術解決方案。",
		image: "/corporation/government.svg"
	}
]);

onMounted(async () => {
	await nextTick();

	// --- Entrance Animation ---
	if (titleRef.value && heroBlocks.value) {
		gsap.set(titleRef.value, { autoAlpha: 0, y: 30 });
		gsap.set(heroBlocks.value.children, { autoAlpha: 0, y: 30 });

		const entranceTl = gsap.timeline({ delay: 0.2 }); // Add a small delay
		entranceTl
			.to(titleRef.value, { autoAlpha: 1, y: 0, duration: 0.8, ease: "power2.out" })
			.to(heroBlocks.value.children, { autoAlpha: 1, y: 0, duration: 0.6, stagger: 0.2, ease: "power2.out" }, "-=0.4"); // Start slightly before title finishes
	}

	// --- ScrollTrigger Animations ---
	// 使用可選鏈 ?. 增加安全性
	const businessTitle = businessRef.value?.querySelector("h4");
	const businessFeatures = businessRef.value?.querySelectorAll(".feature");
	const publicTitle = publicRef.value?.querySelector("h4");
	const publicFeatures = publicRef.value?.querySelectorAll(".feature");

	// 檢查必要的 refs 和元素是否存在
	if (!sectionRef.value || !businessRef.value || !publicRef.value || !businessTitle || !publicTitle) {
		console.error("GSAP 動畫所需的元素未在 DOM 中找到。");
		return; // 如果缺少關鍵元素則退出
	}

	ScrollTrigger.matchMedia({
		// --- 大螢幕 (>= 768px) ---
		"(min-width: 768px)": function () {
			// --- 初始狀態設定 ---
			gsap.set(businessRef.value, { autoAlpha: 1 });
			gsap.set(publicRef.value, { autoAlpha: 0 });

			// 確保 features 存在再設定
			const allFeaturesExist = businessFeatures?.length && publicFeatures?.length;
			const elementsToSet = allFeaturesExist ? [businessTitle, ...businessFeatures, publicTitle, ...publicFeatures] : [businessTitle, publicTitle];
			gsap.set(elementsToSet, { autoAlpha: 0, y: 30 });

			// --- 主時間軸設定 ---
			const tl = gsap.timeline({
				scrollTrigger: {
					trigger: sectionRef.value,
					start: "top top",
					end: "+=350%",
					scrub: 1,
					pin: true,
					markers: false // 除非需要調試，否則保持 false
				}
			});

			// --- 動畫序列編排 ---
			// 檢查 features 是否存在
			if (businessFeatures?.length) {
				tl.to(businessTitle, { autoAlpha: 1, y: 0, duration: 1, ease: "power2.out" })
					.to(businessFeatures, { autoAlpha: 1, y: 0, stagger: 0.3, duration: 1, ease: "power2.out" }, "-=0.5")
					.to(businessTitle, { autoAlpha: 0, y: -30, duration: 1, ease: "power2.in" }, "+=1") // 增加顯示時間
					.to(businessFeatures, { autoAlpha: 0, y: -30, stagger: 0.2, duration: 1, ease: "power2.in" }, "<"); // 同步開始淡出 features
			} else {
				// 如果 features 不存在時的備案
				tl.to(businessTitle, { autoAlpha: 1, y: 0, duration: 1, ease: "power2.out" }).to(
					businessTitle,
					{ autoAlpha: 0, y: -30, duration: 1, ease: "power2.in" },
					"+=1.5"
				); // 調整時間
			}

			// 將 businessRef 隱藏，publicRef 顯示
			// 使用 "<" 確保與上一個動畫的結束同步或稍微提前
			tl.set(businessRef.value, { autoAlpha: 0 }, "<+0.8") // 在 features 完全淡出後再隱藏 businessRef
				.set(publicRef.value, { autoAlpha: 1 }, "<"); // 同步顯示 publicRef

			// 淡入 Public 區塊
			if (publicFeatures?.length) {
				tl.to(publicTitle, { autoAlpha: 1, y: 0, duration: 1, ease: "power2.out" }, "<") // 與 set 同步開始
					.to(publicFeatures, { autoAlpha: 1, y: 0, stagger: 0.3, duration: 1, ease: "power2.out" }, "-=0.5");
			} else {
				tl.to(publicTitle, { autoAlpha: 1, y: 0, duration: 1, ease: "power2.out" }, "<");
			}

			// 返回清理函數
			return () => {
				if (tl && tl.scrollTrigger) {
					tl.scrollTrigger.kill();
				}
				if (tl) tl.kill();
				// 重置樣式，避免影響手機版佈局
				gsap.set(elementsToSet, { clearProps: "all" });
				gsap.set([businessRef.value, publicRef.value], { clearProps: "all" });
			};
		},

		// --- 小螢幕 (< 768px) ---
		"(max-width: 767px)": function () {
			const mobileTriggers = []; // 用於收集手機版的 ScrollTriggers

			// 初始狀態設定 (手機版)
			gsap.set([businessRef.value, publicRef.value], { autoAlpha: 1 }); // 容器可見

			const allFeaturesExist = businessFeatures?.length && publicFeatures?.length;
			const elementsToSet = allFeaturesExist ? [businessTitle, ...businessFeatures, publicTitle, ...publicFeatures] : [businessTitle, publicTitle];
			gsap.set(elementsToSet, { autoAlpha: 0, y: 20 }); // 內容準備進場

			// 為 Business 區塊創建簡單進場動畫
			const businessTl = gsap.timeline({ paused: true });
			businessTl.to(businessTitle, { autoAlpha: 1, y: 0, duration: 0.6 });
			if (businessFeatures?.length) {
				businessTl.to(businessFeatures, { autoAlpha: 1, y: 0, stagger: 0.15, duration: 0.5 }, "-=0.3");
			}

			mobileTriggers.push(
				ScrollTrigger.create({
					trigger: businessRef.value,
					start: "top 85%",
					animation: businessTl,
					toggleActions: "play none none none", // 進入時播放一次
					once: true // 確保只觸發一次
				})
			);

			// 為 Public 區塊創建簡單進場動畫
			const publicTl = gsap.timeline({ paused: true });
			publicTl.to(publicTitle, { autoAlpha: 1, y: 0, duration: 0.6 });
			if (publicFeatures?.length) {
				publicTl.to(publicFeatures, { autoAlpha: 1, y: 0, stagger: 0.15, duration: 0.5 }, "-=0.3");
			}

			mobileTriggers.push(
				ScrollTrigger.create({
					trigger: publicRef.value,
					start: "top 85%",
					animation: publicTl,
					toggleActions: "play none none none",
					once: true
				})
			);

			// 返回清理函數
			return () => {
				mobileTriggers.forEach((trigger) => trigger.kill());
				if (businessTl) businessTl.kill();
				if (publicTl) publicTl.kill();
				// 重置樣式
				gsap.set(elementsToSet, { clearProps: "all" });
				gsap.set([businessRef.value, publicRef.value], { clearProps: "all" });
			};
		},

		// --- 通用設定 (可選) ---
		all: function () {
			// 這裡可以放所有螢幕尺寸都需要的設定 (如果有的話)
		}
	});

	// 選項：可以在稍後強制刷新 ScrollTrigger，以防動態內容影響佈局
	// setTimeout(() => ScrollTrigger.refresh(), 500);
});
</script>

<style scoped>
/* 在手機版移除 pin 效果 */
@media (max-width: 767px) {
	section {
		position: relative !important;
		transform: none !important;
	}

	article {
		position: relative !important;
		opacity: 1 !important;
		transform: none !important;
		margin-bottom: 4rem; /* 在手機版增加區塊間距 */
	}

	/* 移除最後一個 article 的 margin-bottom */
	article:last-child {
		margin-bottom: 0;
	}
}

.feature {
	background: linear-gradient(135deg, rgba(50, 60, 75, 0.8), rgba(80, 100, 120, 0.8));
	border-radius: 50px;
	padding: 24px;
	box-shadow: inset 0 0 10px rgba(255, 255, 255, 0.1), 0 4px 12px rgba(0, 0, 0, 0.5);
	will-change: transform, opacity;
	transform: translateZ(0);
}

/* 入口區塊樣式 */
.block-bg {
	position: relative;
	background-color: rgba(0, 0, 0, 0.3);
	backdrop-filter: blur(10px);
	border: 1px solid rgba(255, 255, 255, 0.1);
	box-shadow: 0 8px 32px rgba(0, 0, 0, 0.2);
	overflow: hidden;
	transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.block-pattern {
	width: 100%;
	height: 100%;
	opacity: 0.15;
}

.pattern-1 {
	background: radial-gradient(circle at 30% 50%, #4facfe 0%, #00f2fe 100%);
}

.pattern-2 {
	background: linear-gradient(45deg, #fa709a 0%, #fee140 100%);
}

.pattern-3 {
	background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
}
</style>
