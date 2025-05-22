<template>
	<div>
		<section class="bg-secondary rounded-[100px] min-h-screen flex flex-col justify-center gap-[24px] md:gap-[48px]">
			<!-- News -->
			<article
				class="container px-[24px] sm:px-[48px] lg:px-[120px] text-primary flex flex-col lg:flex-row justify-between lg:items-center gap-[24px] lg:gap-0"
			>
				<!-- CTA -->
				<nav class="min-w-[auto] lg:min-w-[328px] flex items-end lg:items-start lg:flex-col gap-[12px] lg:gap-[24px]">
					<div class="flex flex-col gap-[12px] lg:gap-[24px] me-auto">
						<h3 class="text-[24px] md:text-[36px] lg:text-[64px] xl:text-[72px] 2xl:text-[80px]">{{ $t("news title") }}</h3>
					</div>
					<ButtonCTA class="w-fit h-fit" :label="$t('view all')" to="/news"></ButtonCTA>
				</nav>
				<!-- Content -->
				<div class="w-full max-w-[880px] xl:max-w-[960px] 2xl:max-w-[1024px] border-y-2 border-primary divide-y-2 divide-primary">
					<div v-for="(item, index) in newsItems" :key="index" class="px-[16px] sm:px-[24px] py-[12px] flex items-center gap-[12px] sm:gap-[24px]">
						<h5 class="text-[12px] lg:text-[16px] xl:text-[18px] font-bold">{{ item.date }}</h5>
						<div
							class="text-[8px] sm:text-[10px] lg:text-[12px] xl:text-[14px] px-[4px] py-[2px] lg:px-[6px] lg:py-[4px] rounded-full border-2 border-primary opacity-80"
						>
							{{ $t(item.category) }}
						</div>
						<span class="text-[12px] sm:text-[16px] lg:text-[24px] xl:text-[28px]">{{ $t(item.title) }}</span>
					</div>
				</div>
			</article>
			<!-- Problems -->
			<article
				class="container px-[24px] sm:px-[48px] lg:px-[120px] text-primary flex flex-col lg:flex-row justify-between lg:items-center gap-[24px] lg:gap-0"
			>
				<!-- CTA -->
				<nav class="min-w-[auto] lg:min-w-[328px] flex items-end lg:items-start lg:flex-col gap-[12px] lg:gap-[24px]">
					<div class="flex flex-col gap-[12px] lg:gap-[24px] me-auto">
						<h3 class="text-[24px] md:text-[36px] lg:text-[64px] xl:text-[72px] 2xl:text-[80px]">{{ $t("problems title") }}</h3>
					</div>
					<ButtonCTA class="w-fit h-fit" :label="$t('view all')" to="/faq"></ButtonCTA>
				</nav>
				<!-- Content -->
				<div class="w-full max-w-[880px] xl:max-w-[960px] 2xl:max-w-[1024px] border-y-2 border-primary divide-y-2 divide-primary">
					<div v-for="(item, index) in faqItems" :key="index" class="px-[16px] sm:px-[24px] py-[12px] flex items-center gap-[12px] sm:gap-[24px]">
						<h5 class="text-[12px] sm:text-[16px] lg:text-[24px] xl:text-[28px]">Q{{ index + 1 }}</h5>
						<span class="text-[12px] sm:text-[16px] lg:text-[24px] xl:text-[28px]">{{ $t(item.question) }}</span>
					</div>
				</div>
			</article>
		</section>
	</div>
</template>

<script setup>
import { ref, onMounted, inject, onUnmounted } from "vue";
import ButtonCTA from "~/components/common/Button-CTA.vue";

// 引入滾動動畫控制器
const scrollAnimation = inject("scrollAnimation");

// 新聞資料 - 未來可從後端 API 獲取
const newsItems = ref([
	{ date: "2025.02.17", category: "tips", title: "yenshow access control upgrade" },
	{ date: "2025.02.10", category: "press release", title: "yenshow taipei government cooperation" },
	{ date: "2025.02.03", category: "tips", title: "security management trends 2025" }
]);

// 常見問題資料 - 未來可從後端 API 獲取
const faqItems = ref([{ question: "faq question 1" }, { question: "faq question 2" }, { question: "faq question 3" }]);

let titleAndTextAnimation = null;
let listItemsAnimation = null;
let buttonAnimation = null;

// 設置動畫
onMounted(async () => {
	// 確保 ScrollTrigger 已初始化
	await scrollAnimation.initScrollPlugins();

	// 1. 標題與說明文字
	titleAndTextAnimation = scrollAnimation.createTextAnimation({
		elements: "article h3, article span:not(.text-nowrap)",
		trigger: "aside",
		start: "top 70%",
		end: "bottom 20%",
		staggerAmount: 0.2,
		staggerFrom: "start",
		fromY: 35,
		duration: 1,
		delay: 0.3
	});

	// 2. 文章內容項目 - 逐個顯示
	listItemsAnimation = scrollAnimation.createTextAnimation({
		elements: ".border-y-2 > div",
		trigger: "aside",
		start: "top 70%",
		end: "bottom 20%",
		staggerAmount: 0.25,
		staggerFrom: "start",
		fromY: 15,
		duration: 0.6,
		delay: 0.7,
		ease: "power1.out"
	});

	// 4. 按鈕元素進場動畫
	buttonAnimation = scrollAnimation.createElementEntrance({
		elements: ".view-all-button",
		trigger: "aside",
		start: "top 70%",
		end: "bottom 20%",
		delay: 0.9,
		fromY: 20,
		fromScale: 0.9,
		duration: 0.8,
		ease: "back.out(1.5)"
	});
});

onUnmounted(() => {
	if (titleAndTextAnimation) {
		titleAndTextAnimation.kill();
	}
	if (listItemsAnimation) {
		listItemsAnimation.kill();
	}
	if (buttonAnimation) {
		buttonAnimation.kill();
	}
});
</script>

<style scoped>
.text-nowrap {
	white-space: nowrap;
	overflow: hidden;
}
</style>
