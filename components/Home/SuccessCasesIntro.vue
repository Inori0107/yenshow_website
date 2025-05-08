<template>
	<section
		id="cases"
		class="cases-intro py-[128px] md:py-[160px] bg-gradient-to-b from-primary to-slate-900 text-secondary overflow-hidden my-[128px] md:my-[256px]"
	>
		<div class="container mx-auto px-4 relative">
			<!-- 標題與引文 -->
			<div class="text-center mb-12 md:mb-20" ref="headerRef">
				<h2 class="text-3xl md:text-5xl font-bold mb-4">多元應用，深度合作</h2>
				<p class="text-lg md:text-xl text-secondary/80 max-w-3xl mx-auto">
					從在地經銷夥伴到大型建案整合，遠岫科技的解決方案廣泛應用於各種場景，滿足不同規模的需求。
				</p>
			</div>

			<!-- 區塊 1: 經銷商與中小型應用 -->
			<div class="mb-16 md:mb-24" ref="dealerSectionRef">
				<h3 class="text-2xl md:text-3xl font-semibold text-center mb-8 md:mb-12">經銷商與中小型應用</h3>
				<div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12">
					<div
						v-for="(area, index) in dealerApplications"
						:key="'dealer-' + index"
						class="case-area-card flex flex-col items-center text-center p-6 rounded-2xl bg-black/20 backdrop-blur-sm border border-white/10 shadow-lg transition-all duration-300 hover:shadow-secondary/20 hover:-translate-y-2"
					>
						<div class="mb-4 p-4 bg-gradient-to-br from-sky-500 to-blue-600 rounded-full inline-block shadow-md">
							<img :src="area.icon" :alt="area.title" class="w-10 h-10 md:w-12 md:h-12 invert brightness-0" />
						</div>
						<h4 class="text-xl md:text-2xl font-semibold mb-2">{{ area.title }}</h4>
						<p class="text-sm md:text-base text-secondary/70">{{ area.description }}</p>
					</div>
				</div>
			</div>

			<!-- 區塊 2: 建案類型與大型商案 -->
			<div class="mb-12 md:mb-20" ref="projectSectionRef">
				<h3 class="text-2xl md:text-3xl font-semibold text-center mb-8 md:mb-12">建案類型與大型商案</h3>
				<div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12">
					<div
						v-for="(area, index) in projectApplications"
						:key="'project-' + index"
						class="case-area-card flex flex-col items-center text-center p-6 rounded-2xl bg-black/20 backdrop-blur-sm border border-white/10 shadow-lg transition-all duration-300 hover:shadow-secondary/20 hover:-translate-y-2"
					>
						<div class="mb-4 p-4 bg-gradient-to-br from-emerald-500 to-green-600 rounded-full inline-block shadow-md">
							<img :src="area.icon" :alt="area.title" class="w-10 h-10 md:w-12 md:h-12 invert brightness-0" />
						</div>
						<h4 class="text-xl md:text-2xl font-semibold mb-2">{{ area.title }}</h4>
						<p class="text-sm md:text-base text-secondary/70">{{ area.description }}</p>
					</div>
				</div>
			</div>

			<!-- 行動呼籲按鈕 -->
			<div class="text-center" ref="ctaRef">
				<NuxtLink
					to="/Success-Stories"
					class="inline-block bg-secondary text-primary font-medium px-8 py-3 rounded-lg shadow-md hover:bg-opacity-90 transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-secondary focus:ring-offset-2 focus:ring-offset-primary"
				>
					探索成功案例
				</NuxtLink>
			</div>
		</div>
	</section>
</template>

<script setup>
import { ref, onMounted, inject, onUnmounted, nextTick } from "vue"; // 引入 nextTick
import { NuxtLink } from "#components"; // 確保 NuxtLink 被正確導入

// 注入滾動動畫控制器
const scrollAnimation = inject("scrollAnimation");
const { gsap, ScrollTrigger } = scrollAnimation || {}; // 添加保護

// DOM 引用
const headerRef = ref(null);
const dealerSectionRef = ref(null); // 新增: 經銷商區塊引用
const projectSectionRef = ref(null); // 新增: 建案區塊引用
const ctaRef = ref(null);

// 數據: 經銷商與中小型應用
const dealerApplications = ref([
	{
		title: "在地經銷夥伴",
		description: "與全台經銷商緊密合作，提供即時技術支援與產品服務。"
		// icon: "/corporation/partners.svg"
	},
	{
		title: "零售餐飲業",
		description: "為商店、餐廳提供簡易安裝、操作方便的監控與 POS 整合方案。"
		// icon: "/corporation/store.svg"
	},
	{
		title: "中小型辦公室",
		description: "彈性的門禁考勤系統，滿足企業成長中的安全管理需求。"
		// icon: "/corporation/office.svg"
	}
]);

// 數據: 建案類型與大型商案
const projectApplications = ref([
	{
		title: "智慧社區建案",
		description: "整合影像對講、人臉辨識門禁、車牌辨識，打造安全便捷的社區。"
		// icon: "/corporation/building.svg"
	},
	{
		title: "企業總部/廠房",
		description: "提供大型企業、廠區全方位的安防規劃，包含周界防護與集中管理。"
		// icon: "/corporation/company.svg"
	},
	{
		title: "公共機構/場館",
		description: "支援政府、學校、醫院等公共場所，應對高人流的安全挑戰。"
		// icon: "/corporation/government.svg"
	}
]);

let animationTimeline = null;

const setupAnimation = async () => {
	if (!gsap || !ScrollTrigger || !headerRef.value || !dealerSectionRef.value || !projectSectionRef.value || !ctaRef.value) {
		console.warn("GSAP or component refs not available for animation setup.");
		return;
	}

	try {
		await scrollAnimation.initScrollPlugins();

		// 獲取各區塊內的卡片元素
		const dealerCards = dealerSectionRef.value.querySelectorAll(".case-area-card");
		const projectCards = projectSectionRef.value.querySelectorAll(".case-area-card");
		const dealerTitle = dealerSectionRef.value.querySelector("h3");
		const projectTitle = projectSectionRef.value.querySelector("h3");

		// 初始狀態
		gsap.set([headerRef.value, dealerTitle, ...dealerCards, projectTitle, ...projectCards, ctaRef.value], {
			opacity: 0,
			y: 50
		});

		// 創建動畫時間軸
		animationTimeline = gsap.timeline({
			scrollTrigger: {
				trigger: ".cases-intro",
				start: "top 70%", // 更新 start
				end: "bottom 20%", // 更新 end
				toggleActions: "play none none reverse"
				// markers: true // 開啟標記方便調試
			}
		});

		// 編排動畫
		animationTimeline
			.to(headerRef.value, { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" })
			.to(dealerTitle, { opacity: 1, y: 0, duration: 0.6, ease: "power3.out" }, "-=0.6")
			.to(dealerCards, { opacity: 1, y: 0, duration: 0.5, stagger: 0.15, ease: "power3.out" }, "-=0.4") // 經銷商卡片交錯出現
			.to(projectTitle, { opacity: 1, y: 0, duration: 0.6, ease: "power3.out" }, "-=0.4")
			.to(projectCards, { opacity: 1, y: 0, duration: 0.5, stagger: 0.15, ease: "power3.out" }, "-=0.4") // 建案卡片交錯出現
			.to(ctaRef.value, { opacity: 1, y: 0, duration: 0.5, ease: "power3.out" }, "-=0.3"); // 按鈕最後出現
	} catch (error) {
		console.error("合作案例區塊動畫設置錯誤:", error);
	}
};

onMounted(async () => {
	await nextTick();
	if (scrollAnimation && scrollAnimation.gsap) {
		// 確保 scrollAnimation 和 gsap 都已加載
		setupAnimation();
	} else if (!scrollAnimation) {
		console.warn("Scroll animation context not provided to SuccessCasesIntro.");
	} else {
		// 如果 scrollAnimation 存在但 gsap/ScrollTrigger 未就緒，可以稍後再試或監聽事件
		console.warn("GSAP/ScrollTrigger not ready yet in SuccessCasesIntro.");
		// 可以考慮使用 watch 或 setTimeout 等待 gsap 初始化完成
		// 例如:
		// const stopWatch = watch(() => scrollAnimation.gsap, (newVal) => {
		//   if (newVal) {
		//     setupAnimation();
		//     stopWatch();
		//   }
		// });
	}
});

onUnmounted(() => {
	if (animationTimeline) {
		const st = animationTimeline.scrollTrigger;
		if (st) {
			st.kill();
		}
		animationTimeline.kill();
		animationTimeline = null;
	}
});

// 請確保 /public/corporation/ 目錄下包含 partners.svg, store.svg, office.svg 等新圖標文件
// 以及 building.svg, company.svg, government.svg (如果路徑或名稱未變)
</script>

<style scoped>
.case-area-card {
	will-change: transform, box-shadow, opacity;
	transform: translateZ(0); /* 提升性能 */
}

/* 可以為圖標添加更多樣式 */
.case-area-card img {
	filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.2));
}
</style>
