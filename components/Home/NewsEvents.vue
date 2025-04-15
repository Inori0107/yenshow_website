<template>
	<aside class="bg-secondary rounded-[100px] flex flex-col pt-[24px] lg:pt-[48px] pb-[72px] lg:pb-[144px] gap-[24px] md:gap-[48px]">
		<span class="overflow-hidden text-[48px] lg:text-[96px] text-primary opacity-50 text-nowrap">LEARN MORE LEARN MORE LEARN MORE</span>
		<!-- News -->
		<article class="container px-[48px] lg:px-[120px] text-primary flex flex-col lg:flex-row justify-between lg:items-center gap-[24px] lg:gap-0">
			<!-- CTA -->
			<nav class="min-w-[328px] flex items-end lg:items-start lg:flex-col gap-[12px] lg:gap-[24px]">
				<div class="flex flex-col gap-[12px] lg:gap-[24px] me-auto">
					<h3 class="text-[24px] md:text-[36px] lg:text-[64px]">News</h3>
					<span class="text-[12px] md:text-[16px] lg:text-[24px] opacity-80">最新消息</span>
				</div>
				<ButtonCTA class="w-fit h-fit" label="查看全部" to="/news"></ButtonCTA>
			</nav>
			<!-- Content -->
			<div class="w-full max-w-[880px] border-y-2 border-primary divide-y-2 divide-primary">
				<div v-for="(item, index) in newsItems" :key="index" class="px-[24px] py-[12px] flex items-center gap-[24px]">
					<h5 class="text-[12px] lg:text-[16px] font-bold">{{ item.date }}</h5>
					<div class="text-[8px] lg:text-[12px] px-[4px] py-[2px] lg:px-[6px] lg:py-[4px] rounded-full border-2 border-primary opacity-80">
						{{ item.category }}
					</div>
					<span class="text-[12px] lg:text-[24px]">{{ item.title }}</span>
				</div>
			</div>
		</article>
		<!-- Problems -->
		<article class="container px-[48px] lg:px-[120px] text-primary flex flex-col lg:flex-row justify-between lg:items-center gap-[24px] lg:gap-0">
			<!-- CTA -->
			<nav class="min-w-[328px] flex items-end lg:items-start lg:flex-col gap-[12px] lg:gap-[24px]">
				<div class="flex flex-col gap-[12px] lg:gap-[24px] me-auto">
					<h3 class="text-[24px] md:text-[36px] lg:text-[64px]">Problems</h3>
					<span class="text-[12px] md:text-[16px] lg:text-[24px] opacity-80">常見問題</span>
				</div>
				<ButtonCTA class="w-fit h-fit" label="查看全部" to="/faq"></ButtonCTA>
			</nav>
			<!-- Content -->
			<div class="w-full max-w-[880px] border-y-2 border-primary divide-y-2 divide-primary">
				<div v-for="(item, index) in faqItems" :key="index" class="px-[24px] py-[12px] flex items-center gap-[24px]">
					<h5 class="text-[12px] lg:text-[24px]">Q{{ index + 1 }}</h5>
					<span class="text-[12px] lg:text-[24px]">{{ item.question }}</span>
				</div>
			</div>
		</article>
	</aside>
</template>

<script setup>
import { ref, onMounted, inject } from "vue";
import ButtonCTA from "~/components/common/Button-CTA.vue";

// 引入滾動動畫控制器
const scrollAnimation = inject("scrollAnimation");

// 新聞資料 - 未來可從後端 API 獲取
const newsItems = ref([
	{ date: "2025.02.17", category: "小知識", title: "遠岫科技智慧門禁系統升級功能一覽" },
	{ date: "2025.02.10", category: "新聞稿", title: "遠岫科技與台北市政府合作案例介紹" },
	{ date: "2025.02.03", category: "小知識", title: "2025年企業安全管理新趨勢" }
]);

// 常見問題資料 - 未來可從後端 API 獲取
const faqItems = ref([
	{ question: "智慧門禁系統如何整合現有建築？" },
	{ question: "遠岫科技的監控系統支援哪些設備？" },
	{ question: "企業導入安全管理平台的流程是什麼？" }
]);

// 設置動畫
onMounted(async () => {
	// 確保 ScrollTrigger 已初始化
	await scrollAnimation.initScrollPlugins();

	// 1. 標題與說明文字
	scrollAnimation.createTextAnimation({
		elements: "article h3, article span:not(.text-nowrap)",
		trigger: "aside",
		start: "top 70%",
		staggerAmount: 0.2,
		staggerFrom: "start",
		fromY: 35,
		duration: 1,
		delay: 0.3
	});

	// 2. 文章內容項目 - 逐個顯示
	scrollAnimation.createTextAnimation({
		elements: ".border-y-2 > div",
		trigger: "aside",
		start: "top 70%",
		staggerAmount: 0.25,
		staggerFrom: "start",
		fromY: 15,
		duration: 0.6,
		delay: 0.7,
		ease: "power1.out"
	});

	// 3. LEARN MORE 文字橫幅動畫
	scrollAnimation.createScrollAnimation({
		trigger: "aside",
		start: "top 80%",
		animation: scrollAnimation.gsap.fromTo(
			".text-nowrap",
			{
				opacity: 0,
				x: -50
			},
			{
				opacity: 0.5,
				x: 0,
				duration: 1.5,
				ease: "power2.out",
				delay: 0.1
			}
		)
	});

	// 4. 按鈕元素進場動畫
	scrollAnimation.createElementEntrance({
		elements: "button-c-t-a",
		trigger: "aside",
		start: "top 65%",
		delay: 0.9,
		fromY: 20,
		fromScale: 0.9,
		duration: 0.8,
		ease: "back.out(1.5)"
	});
});
</script>

<style scoped>
.text-nowrap {
	white-space: nowrap;
	overflow: hidden;
}
</style>
