<template>
	<!-- Cooperation -->
	<section class="marquee-background bg-primary relative overflow-hidden my-[128px] md:my-[512px] flex items-center">
		<article
			class="bg-overlay absolute inset-0 z-50 flex flex-col justify-center items-center gap-[12px] md:gap-[24px] lg:gap-[48px] text-secondary text-center"
		>
			<h3 class="cooperation-title text-[24px] md:text-[48px] lg:text-[64px] font-bold">{{ $t("Success Stories") }}</h3>
			<h5 class="cooperation-subtitle text-[16px] md:text-[24px] lg:text-[36px] font-bold">{{ $t("building tech life") }}</h5>
			<span class="cooperation-desc text-[12px] md:text-[16px] lg:text-[24px] font-light"
				>{{ $t("cooperation description line1") }}<br />
				{{ $t("cooperation description line2") }}</span
			>
			<Button-CTA class="cooperation-btn" :label="$t('view more')" color="white" to="/success-stories"></Button-CTA>
		</article>
		<aside class="flex flex-col justify-center items-center -rotate-6">
			<div v-for="(row, rowIndex) in rows" :key="rowIndex" class="marquee-wrapper w-[120%]">
				<div class="marquee" :class="rowIndex % 2 === 0 ? '' : 'marquee--reverse'">
					<div class="marquee__group">
						<div v-for="(image, index) in getRowImages(rowIndex)" :key="index" class="marquee__item py-[12px]">
							<img class="w-[200px] h-[150px] lg:w-[400px] lg:h-[300px]" :src="image" alt="Slide image" />
						</div>
					</div>

					<div aria-hidden="true" class="marquee__group">
						<div v-for="(image, index) in getRowImages(rowIndex)" :key="index" class="marquee__item py-[12px]">
							<img class="w-[200px] h-[150px] lg:w-[400px] lg:h-[300px]" :src="image" alt="Slide image" />
						</div>
					</div>
				</div>
			</div>
		</aside>
	</section>
</template>

<script setup>
import { ref, onMounted, nextTick, onUnmounted } from "vue";
import ButtonCTA from "~/components/common/Button-CTA.vue";
import { useScrollAnimation } from "~/composables/useScrollAnimation";

// 注入滾動動畫控制器
const scrollAnimation = useScrollAnimation();
const { gsap, ScrollTrigger } = scrollAnimation;

// 基本圖片資源
const baseImages = ref([
	"/Location/location01.png",
	"/Location/location02.png",
	"/Location/location03.png",
	"/Location/location04.png",
	"/Location/location05.png",
	"/Location/location06.png"
]);

const rows = ref(5);

// 為不同的行生成不同順序的圖片陣列，增加視覺多樣性
const getRowImages = (rowIndex) => {
	// 根據行號創建一個獨特的排序
	const shuffled = [...baseImages.value];

	// 簡單的移位算法，根據行號調整起始位置
	const offset = rowIndex % shuffled.length;
	const reordered = [...shuffled.slice(offset), ...shuffled.slice(0, offset)];

	return reordered;
};

// 設置跑馬燈動畫
const setupMarqueeAnimation = async () => {
	// 確保 ScrollTrigger 已初始化
	await scrollAnimation.initScrollPlugins();
	if (!ScrollTrigger.value) return;

	// 初始設置 - 隱藏所有元素
	gsap.set(".cooperation-title, .cooperation-subtitle, .cooperation-desc, .cooperation-btn", {
		opacity: 0,
		y: 32
	});

	// 初始設置 section 的背景色為透明
	gsap.set(".marquee-background", {
		backgroundColor: "rgba(33, 42, 55, 0)"
	});

	// 初始設置 overlay 為透明
	gsap.set(".bg-overlay", {
		opacity: 0
	});

	// 為奇偶行設定不同的初始位置 - 奇數行從左側進入，偶數行從右側進入
	document.querySelectorAll(".marquee-wrapper").forEach((row, index) => {
		gsap.set(row, {
			opacity: 0,
			x: index % 2 === 0 ? -100 : 100, // 偶數行從右側進入，奇數行從左側進入
			scale: 0.95
		});
	});

	// 主時間軸 - 統一控制所有動畫
	const mainTl = gsap.timeline({
		scrollTrigger: {
			trigger: ".marquee-background",
			start: "top 50%",
			end: "top 0%",
			toggleActions: "play none none reverse",
			scrub: 1, // 平滑過渡效果
			markers: false
		}
	});

	// 1. 背景色和 overlay 的淡入效果
	mainTl
		.to(".marquee-background", {
			backgroundColor: "rgba(33, 42, 55, 1)", // 背景色由透明變為實心
			duration: 2,
			ease: "power1.inOut"
		})
		.to(
			".bg-overlay",
			{
				opacity: 1, // overlay 淡入
				duration: 1.5,
				ease: "power1.inOut"
			},
			"-=1.5" // 與背景色變化有些重疊
		);

	// 2. 跑馬燈的層疊進入效果
	document.querySelectorAll(".marquee-wrapper").forEach((row, index) => {
		mainTl.to(
			row,
			{
				opacity: 1,
				x: 0,
				scale: 1,
				duration: 0.8,
				ease: "power2.out"
			},
			">-0.6" // 稍微重疊前一個動畫
		);
	});

	// 3. 文字元素的動畫 - 依序出現
	mainTl
		.to(".cooperation-title", { opacity: 1, y: 0, duration: 0.6, ease: "power2.out" }, ">-0.3")
		.to(".cooperation-subtitle", { opacity: 1, y: 0, duration: 0.6, ease: "power2.out" }, ">-0.4")
		.to(".cooperation-desc", { opacity: 1, y: 0, duration: 0.6, ease: "power2.out" }, ">-0.3")
		.to(".cooperation-btn", { opacity: 1, y: 0, duration: 0.6, ease: "power2.out" }, ">-0.2");
};

onMounted(async () => {
	try {
		// 等待 DOM 更新完成後再初始化
		await nextTick();

		// 設置動畫效果
		await setupMarqueeAnimation();

		// 監聽視窗調整事件
		window.addEventListener("resize", scrollAnimation.handleResize);
	} catch (error) {
		console.error("Cooperation 動畫設置錯誤:", error);
	}
});

// 清理動畫
onUnmounted(() => {
	window.removeEventListener("resize", scrollAnimation.handleResize);
	scrollAnimation.cleanupScrollTriggers();
});
</script>

<style scoped>
.bg-overlay {
	background-color: rgba(33, 42, 55, 0.6); /* 增加透明度，讓文字更加清晰 */
}

/* 跑馬燈基本樣式 */
.marquee-wrapper {
	position: relative;
	overflow: hidden;
	--gap: 24px;
	margin-bottom: 16px;
	will-change: transform, opacity;
}

.marquee {
	display: flex;
	position: relative;
	overflow: hidden;
	user-select: none;
	gap: var(--gap);
	will-change: transform; /* 提高動畫性能 */
}

.marquee__group {
	flex-shrink: 0;
	display: flex;
	align-items: center;
	justify-content: space-around;
	gap: var(--gap);
	min-width: 100%;
	animation: scroll 40s linear infinite;
	will-change: transform; /* 提高動畫性能 */
}

.marquee--reverse .marquee__group {
	animation-direction: reverse;
	animation-duration: 50s;
}

.marquee__item {
	flex: 0 0 auto;
	max-width: 100%;
	transform: translateZ(0); /* 促進硬體加速 */
	backface-visibility: hidden; /* 減少閃爍 */
}

/* 為不同行設定不同速度 */
.marquee-wrapper:nth-child(1) .marquee__group {
	animation-duration: 80s;
}

.marquee-wrapper:nth-child(2) .marquee__group {
	animation-duration: 100s;
}

.marquee-wrapper:nth-child(3) .marquee__group {
	animation-duration: 120s;
}

.marquee-wrapper:nth-child(4) .marquee__group {
	animation-duration: 90s;
}

.marquee-wrapper:nth-child(5) .marquee__group {
	animation-duration: 110s;
}

@keyframes scroll {
	0% {
		transform: translateX(0);
	}
	100% {
		transform: translateX(calc(-100% - var(--gap)));
	}
}
</style>
