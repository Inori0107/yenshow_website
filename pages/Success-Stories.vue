<template>
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
</template>

<script setup>
import { ref, onMounted } from "vue";
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

onMounted(() => {
	// --- Entrance Animation ---
	if (titleRef.value && heroBlocks.value) {
		gsap.set(titleRef.value, { autoAlpha: 0, y: 30 });
		gsap.set(heroBlocks.value.children, { autoAlpha: 0, y: 30 });

		const entranceTl = gsap.timeline({ delay: 0.2 }); // Add a small delay
		entranceTl
			.to(titleRef.value, { autoAlpha: 1, y: 0, duration: 0.8, ease: "power2.out" })
			.to(heroBlocks.value.children, { autoAlpha: 1, y: 0, duration: 0.6, stagger: 0.2, ease: "power2.out" }, "-=0.4"); // Start slightly before title finishes
	}

	// --- ScrollTrigger Animations (Existing Code) ---
	const businessTitle = businessRef.value.querySelector("h4");
	const businessFeatures = businessRef.value.querySelectorAll(".feature");
	const publicTitle = publicRef.value.querySelector("h4");
	const publicFeatures = publicRef.value.querySelectorAll(".feature");

	ScrollTrigger.matchMedia({
		// --- 大螢幕 (>= 768px) ---
		"(min-width: 768px)": function () {
			// --- 初始狀態設定 ---
			gsap.set(businessRef.value, { autoAlpha: 1 });
			gsap.set(publicRef.value, { autoAlpha: 0 });
			gsap.set([businessTitle, ...businessFeatures, publicTitle, ...publicFeatures], {
				autoAlpha: 0,
				y: 30
			});

			// --- 主時間軸設定 ---
			const tl = gsap.timeline({
				scrollTrigger: {
					trigger: sectionRef.value,
					start: "top top",
					end: "+=350%",
					scrub: 1,
					pin: true,
					markers: false
				}
			});

			// --- 動畫序列編排 ---
			tl.to(businessTitle, { autoAlpha: 1, y: 0, duration: 1, ease: "power2.out" })
				.to(businessFeatures, { autoAlpha: 1, y: 0, stagger: 0.3, duration: 1, ease: "power2.out" }, "-=0.5")
				.to(businessTitle, { autoAlpha: 0, y: -30, duration: 1, ease: "power2.in" }, "+=1")
				.to(businessFeatures, { autoAlpha: 0, y: -30, stagger: 0.2, duration: 1, ease: "power2.in" }, "<+0.3")
				.set(businessRef.value, { autoAlpha: 0 }, "<+0.5")
				.set(publicRef.value, { autoAlpha: 1 }, "<+0.5")
				.to(publicTitle, { autoAlpha: 1, y: 0, duration: 1, ease: "power2.out" }, "<+0.2")
				.to(publicFeatures, { autoAlpha: 1, y: 0, stagger: 0.3, duration: 1, ease: "power2.out" }, "-=0.5");

			// 返回一個清理函數，當條件不再匹配時執行
			return () => {
				if (tl && tl.scrollTrigger) {
					tl.scrollTrigger.kill();
				}
				tl.kill(); // 清理 timeline 本身
				// 重置樣式，避免影響手機版佈局
				gsap.set([businessRef.value, publicRef.value, businessTitle, ...businessFeatures, publicTitle, ...publicFeatures], { clearProps: "all" });
			};
		},

		// --- 小螢幕 (< 768px) ---
		"(max-width: 767px)": function () {
			const mobileTriggers = []; // 用於收集手機版的 ScrollTriggers

			// 初始狀態設定 (手機版)
			gsap.set([businessRef.value, publicRef.value], { autoAlpha: 1 }); // 容器可見
			gsap.set([businessTitle, ...businessFeatures, publicTitle, ...publicFeatures], { autoAlpha: 0, y: 20 }); // 內容準備進場

			// 為 Business 區塊創建簡單進場動畫
			const businessTl = gsap
				.timeline({ paused: true })
				.to(businessTitle, { autoAlpha: 1, y: 0, duration: 0.6 })
				.to(businessFeatures, { autoAlpha: 1, y: 0, stagger: 0.15, duration: 0.5 }, "-=0.3");

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
			const publicTl = gsap
				.timeline({ paused: true })
				.to(publicTitle, { autoAlpha: 1, y: 0, duration: 0.6 })
				.to(publicFeatures, { autoAlpha: 1, y: 0, stagger: 0.15, duration: 0.5 }, "-=0.3");

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
				gsap.set([businessRef.value, publicRef.value, businessTitle, ...businessFeatures, publicTitle, ...publicFeatures], { clearProps: "all" });
			};
		},

		// --- 通用設定 (可選) ---
		all: function () {
			// 這裡可以放所有螢幕尺寸都需要的設定 (如果有的話)
		}
	});
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
