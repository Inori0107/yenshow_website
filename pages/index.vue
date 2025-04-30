<template>
	<!-- HeroPic -->
	<HeroPic />

	<!-- Story -->
	<Story id="story" />

	<!-- Intro -->
	<Intro />

	<!-- Quote -->
	<Quote />

	<!-- Cooperation -->
	<Cooperation id="cases" />

	<!-- Product -->
	<ProductIntro />

	<!-- News & Events -->
	<NewsEvents id="products" />
</template>

<script setup>
import { provide, onMounted, onUnmounted } from "vue";
import HeroPic from "~/components/Home/HeroPic.vue";
import Story from "~/components/Home/Story.vue";
import Intro from "~/components/Home/Intro.vue";
import Cooperation from "~/components/Home/Cooperation.vue";
import Quote from "~/components/Home/Quote.vue";
import NewsEvents from "~/components/Home/NewsEvents.vue";
import ProductIntro from "~/components/Home/ProductIntro.vue";
import { useScrollAnimation } from "~/composables/useScrollAnimation";

useHead({
	title: "遠岫科技",
	meta: [{ name: "description", content: "遠岫科技，既是一段故事，也是一份使命。" }]
});

// 使用滾動動畫 composable
const scrollAnimation = useScrollAnimation();
// 提供給子組件，使其可以共享相同的滾動管理器
provide("scrollAnimation", scrollAnimation);

// 全局滾動設置
onMounted(async () => {
	try {
		// 初始化 ScrollTrigger
		await scrollAnimation.initScrollPlugins();

		// 監聽窗口大小變化
		window.addEventListener("resize", scrollAnimation.handleResize);
	} catch (error) {
		console.error("初始化錯誤:", error);
	}
});

onUnmounted(() => {
	// 清理全局事件監聽
	window.removeEventListener("resize", scrollAnimation.handleResize);

	// 清理所有 ScrollTrigger 實例
	scrollAnimation.cleanupScrollTriggers();
});
</script>

<style scoped>
/* Index 頁面的基本樣式 */
</style>
