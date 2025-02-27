<template>
	<!-- Cooperation -->
	<section class="marquee-background bg-primary relative overflow-hidden">
		<article
			class="bg-overlay absolute inset-0 z-50 flex flex-col justify-center items-center gap-[12px] md:gap-[24px] lg:gap-[48px] text-secondary text-center"
		>
			<h3 class="text-[24px] md:text-[48px] lg:text-[64px] font-bold">合作案例</h3>
			<h5 class="text-[16px] md:text-[24px] lg:text-[36px] font-bold">打造科技便捷的生活</h5>
			<span class="text-[12px] md:text-[16px] lg:text-[24px] font-light"
				>各類產品系統整合，提供多種優質的安全產品和服務，<br />
				不用複雜的管理軟體，便可創造無限的價值</span
			>
			<Button-CTA label="View More" color="white" to="/cooperation"></Button-CTA>
		</article>
		<aside class="h-screen lg:h-[120vh] flex flex-col justify-center items-center -rotate-6">
			<div class="animate-row w-[1440px] lg:w-[2560px] flex gap-[24px]" v-for="(row, rowIndex) in rows" :key="rowIndex">
				<div class="animate-scroll py-[12px]" v-for="(image, index) in images" :key="index">
					<img class="w-[200px] h-[150px] lg:w-[400px] lg:h-[300px]" :src="getImage(rowIndex, index)" alt="Slide image" />
				</div>
			</div>
		</aside>
	</section>
</template>

<script setup lang="ts">
import { ref } from "vue";

const images = ref([
	"/Location/location01.png",
	"/Location/location02.png",
	"/Location/location03.png",
	"/Location/location04.png",
	"/Location/location05.png",
	"/Location/location06.png"
]);

const rows = ref(5);

// 取得對應 rowIndex 開始的圖片陣列
const getImage = (rowIndex: number, imageIndex: number) => {
	const startIndex = rowIndex % images.value.length; // 確保 index 不會超過圖片數量
	return images.value[(startIndex + imageIndex) % images.value.length];
};

import { gsap } from "gsap";

onMounted(() => {
	let tl = gsap.timeline({
		scrollTrigger: {
			trigger: ".bg-overlay",
			start: "top 80%",
			toggleActions: "play none none reverse"
		}
	});

	// **標題 & 文字依序浮現**
	tl.fromTo(".cooperation-title", { opacity: 0, y: 32 }, { opacity: 1, y: 0, duration: 0.8, ease: "power2.out" }, "-=0.5")
		.fromTo(".cooperation-subtitle", { opacity: 0, y: 32 }, { opacity: 1, y: 0, duration: 0.8, ease: "power2.out" }, "-=0.4")
		.fromTo(".cooperation-desc", { opacity: 0, y: 32 }, { opacity: 1, y: 0, duration: 0.8, ease: "power2.out" }, "-=0.4")
		.fromTo(".cooperation-btn", { opacity: 0, y: 32 }, { opacity: 1, y: 0, duration: 0.8, ease: "power2.out" }, "-=0.3");

	// **滾動圖片動畫 - 每個 row 速度 & 方向不同**
	// document.querySelectorAll(".animate-row").forEach((row, index) => {
	// 	let isEven = index % 2 === 0;

	// 	gsap.to(row, {
	// 		x: isEven ? "-100%" : "100%",
	// 		duration: 100,
	// 		repeat: -1,
	// 		ease: "linear"
	// 	});
	// });
});
</script>

<style scoped>
.bg-overlay {
	background-color: rgba(33, 42, 55, 0.4);
}
</style>
