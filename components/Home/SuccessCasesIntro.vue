<template>
	<section
		id="cases"
		class="cases-intro py-[128px] md:py-[160px] bg-gradient-to-b from-primary to-slate-900 text-secondary overflow-hidden my-[128px] md:my-[256px]"
	>
		<div class="container mx-auto px-4 relative">
			<!-- 標題與引文 -->
			<div class="text-center mb-12 md:mb-20" ref="headerRef">
				<h2 class="text-3xl md:text-5xl font-bold mb-4">合作夥伴與案例</h2>
				<p class="text-lg md:text-xl text-secondary/80 max-w-3xl mx-auto">
					從企業辦公室到公共建設，我們致力於提供最先進、最可靠的安防解決方案，見證我們如何協助各行各業提升安全與效率。
				</p>
			</div>

			<!-- 合作領域展示 -->
			<div class="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12 mb-12 md:mb-20" ref="casesGridRef">
				<!-- 單個領域 -->
				<div
					v-for="(area, index) in collaborationAreas"
					:key="index"
					class="case-area-card flex flex-col items-center text-center p-6 rounded-2xl bg-black/20 backdrop-blur-sm border border-white/10 shadow-lg transition-all duration-300 hover:shadow-secondary/20 hover:-translate-y-2"
				>
					<div class="mb-4 p-4 bg-gradient-to-br from-sky-500 to-blue-600 rounded-full inline-block shadow-md">
						<img :src="area.icon" :alt="area.title" class="w-10 h-10 md:w-12 md:h-12 invert brightness-0" />
					</div>
					<h3 class="text-xl md:text-2xl font-semibold mb-2">{{ area.title }}</h3>
					<p class="text-sm md:text-base text-secondary/70">{{ area.description }}</p>
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
import { ref, onMounted, inject, onUnmounted } from "vue";
import { NuxtLink } from "#components"; // 確保 NuxtLink 被正確導入

// 注入滾動動畫控制器
const scrollAnimation = inject("scrollAnimation");
const { gsap, ScrollTrigger } = scrollAnimation || {}; // 添加保護，防止 scrollAnimation 未定義

// DOM 引用
const headerRef = ref(null);
const casesGridRef = ref(null);
const ctaRef = ref(null);

// 合作領域數據
const collaborationAreas = ref([
	{
		title: "企業整合",
		description: "提供辦公大樓、廠房完整的門禁考勤與監控系統。",
		icon: "/corporation/company.svg" // 更新路徑
	},
	{
		title: "公共建設",
		description: "支援政府機關、學校、醫療院所等大型場域安全規劃。",
		icon: "/corporation/government.svg" // 更新路徑
	},
	{
		title: "住宅建案",
		description: "為新建案導入智慧社區影像對講與人臉辨識方案。",
		icon: "/corporation/building.svg" // 更新路徑
	}
]);

let animationTimeline = null;

const setupAnimation = async () => {
	if (!gsap || !ScrollTrigger || !headerRef.value || !casesGridRef.value || !ctaRef.value) {
		console.warn("GSAP or component refs not available for animation setup.");
		return; // 如果 GSAP 或 Refs 未就緒，則不執行動畫
	}

	try {
		await scrollAnimation.initScrollPlugins(); // 確保插件已初始化

		// 獲取網格卡片元素
		const caseCards = casesGridRef.value.querySelectorAll(".case-area-card");

		// 初始狀態
		gsap.set([headerRef.value, ...caseCards, ctaRef.value], {
			opacity: 0,
			y: 50
		});

		// 創建動畫時間軸
		animationTimeline = gsap.timeline({
			scrollTrigger: {
				trigger: ".cases-intro",
				start: "top 70%", // 當區塊頂部進入視窗 70% 時觸發
				end: "bottom 80%",
				toggleActions: "play none none reverse" // 進入時播放，離開時反向播放
				// markers: true // 開啟標記方便調試
			}
		});

		// 編排動畫
		animationTimeline
			.to(headerRef.value, { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" })
			.to(caseCards, { opacity: 1, y: 0, duration: 0.6, stagger: 0.2, ease: "power3.out" }, "-=0.5") // 卡片交錯出現
			.to(ctaRef.value, { opacity: 1, y: 0, duration: 0.5, ease: "power3.out" }, "-=0.3"); // 按鈕最後出現
	} catch (error) {
		console.error("合作案例區塊動畫設置錯誤:", error);
	}
};

onMounted(async () => {
	// 延遲執行動畫設置，確保 DOM 完全渲染且 scrollAnimation 已注入
	await nextTick();
	if (scrollAnimation) {
		setupAnimation();
	} else {
		console.warn("Scroll animation context not provided to SuccessCasesIntro.");
	}
});

onUnmounted(() => {
	// 清理動畫和 ScrollTrigger 實例
	if (animationTimeline) {
		const st = animationTimeline.scrollTrigger;
		if (st) {
			st.kill();
		}
		animationTimeline.kill();
		animationTimeline = null;
	}
});

// 確保圖標目錄存在且圖標文件可用
// 建議在 public/icons/ 目錄下放置 corporate.svg, public.svg, residential.svg
</script>

<style scoped>
.cases-intro {
	/* 可以添加背景圖片或更複雜的漸變 */
	background-image: linear-gradient(to bottom, rgba(20, 27, 45, 0.9), rgba(15, 23, 42, 0.95)), url("/path/to/your/background-image.jpg"); /* 可選背景圖 */
	background-size: cover;
	background-position: center;
}

.case-area-card {
	will-change: transform, box-shadow, opacity;
	transform: translateZ(0); /* 提升性能 */
}

/* 可以為圖標添加更多樣式 */
.case-area-card img {
	filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.2));
}
</style>
