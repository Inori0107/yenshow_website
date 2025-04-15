<template>
	<section id="story" class="my-[128px] md:my-[512px]">
		<!-- 使用 v-for 來減少重複的 article 結構 -->
		<article v-for="(section, index) in sections" :key="index" :id="`story-${storyContainers[index]}`" class="story-container h-screen relative">
			<div
				class="absolute -translate-x-1/2 -translate-y-1/2 flex flex-row-reverse gap-[6px] md:gap-[24px] lg:gap-[48px]"
				:style="`top: ${section.position.top}; left: ${section.position.left}`"
			>
				<h2
					v-if="section.title"
					:ref="(el) => setTitleRef(el, index)"
					class="vertical-title text-[24px] md:text-[48px] lg:text-[96px] p-[6px] rounded-lg opacity-0"
				>
					{{ section.title }}
				</h2>
				<p
					v-for="(text, i) in section.texts"
					:key="i"
					v-bind:ref="(el) => setTextRef(el, index, i)"
					class="vertical-text text-[16px] md:text-[24px] lg:text-[36px] p-[6px] opacity-0"
				>
					{{ text }}
				</p>
			</div>
		</article>
	</section>
</template>

<script setup>
import { ref, onMounted, nextTick, onUnmounted, inject } from "vue";
import gsap from "gsap";

// 將 storyContainers 提到外面作為共用變數
const storyContainers = ["intro", "cloud", "mountain", "sky"];

const sections = [
	{
		title: null,
		texts: ["白雲升遠岫 搖曳入晴空", "啟發遠岫科技的成立與精神", "描繪了白雲從遠山升起", "飄向晴空的自然景象", "展現和諧之美與深刻人生哲理"],
		position: { top: "50%", left: "50%" }
	},
	{
		title: "白雲",
		texts: ["以其輕盈靈動的姿態", "象徵無限的創新力量", "遠岫科技以創新為核心", "提供高效且突破性的方案", "幫助客戶克服挑戰"],
		position: { top: "50%", left: "66%" }
	},
	{
		title: "遠岫",
		texts: ["遠山象徵穩重與堅實", "其精神為追求卓越與承諾可靠", "穩健可靠的態度體現對客戶的承諾", "共創長期信賴的夥伴關係"],
		position: { top: "50%", left: "33%" }
	},
	{
		title: "晴空",
		texts: ["晴朗無垠的天空", "代表對未來的啟迪與願景", "遠岫科技不僅協助客戶實現目標", "更攜手描繪長遠未來", "在廣闊藍天下實現共同成果"],
		position: { top: "50%", left: "50%" }
	}
];

const titleRefs = ref(Array(4).fill(null));
const textRefs = ref([[], [], [], []]);

const setTitleRef = (el, index) => {
	if (index > 0) {
		// 因為第一個 section 沒有 title
		titleRefs.value[index] = el;
	}
};

const setTextRef = (el, sectionIndex, textIndex) => {
	if (el) {
		textRefs.value[sectionIndex][textIndex] = el;
	}
};

// 注入滾動動畫控制器
const scrollAnimation = inject("scrollAnimation");

// 設置區塊固定效果
const setupPinEffects = () => {
	storyContainers.forEach((section, index) => {
		scrollAnimation.createPinnedSection({
			trigger: `#story-${section}`,
			start: "top top",
			end: () => `+=${window.innerHeight * 1.5}`,
			markers: false,
			pinSpacing: true,
			anticipatePin: 1,
			scrub: 1.5,
			snap: {
				snapTo: (progress, direction) => {
					return direction > 0 ? 1 : 0;
				},
				duration: { min: 0.5, max: 1.2 },
				delay: 0.1,
				ease: "power2.inOut"
			}
		});
	});
};

// 設置文字動畫
const setupTextAnimation = () => {
	sections.forEach((section, index) => {
		// 創建時間軸動畫
		const tl = scrollAnimation.createTimelineAnimation({
			trigger: `#story-${storyContainers[index]}`,
			start: "top 60%",
			end: "top 20%"
		});

		// 如果有標題且有對應的元素
		if (section.title && titleRefs.value[index]) {
			tl.fromTo(titleRefs.value[index], { opacity: 0, y: 50 }, { opacity: 1, y: 0, duration: 1.2, ease: "power2.out" });
		}

		if (textRefs.value[index] && textRefs.value[index].length) {
			tl.fromTo(
				textRefs.value[index],
				{ opacity: 0, y: 30 },
				{
					opacity: 1,
					y: 0,
					duration: 1.5,
					stagger: 0.5,
					ease: "power2.out"
				},
				section.title ? "-=0.8" : 0
			);
		}
	});
};

onMounted(async () => {
	try {
		// 等待 DOM 更新完成後再初始化
		await nextTick();

		// 確保 ScrollTrigger 已初始化
		await scrollAnimation.initScrollPlugins();

		// 設置動畫效果
		setupPinEffects();
		setupTextAnimation();
	} catch (error) {
		console.error("Story 動畫設置錯誤:", error);
	}
});

// 無需手動清理動畫，由父組件的 cleanupScrollTriggers 統一處理
</script>

<style scoped>
.story-container {
	z-index: 1;
	transition: opacity 0.5s ease;
}

.vertical-title,
.vertical-text {
	will-change: transform, opacity;
	backface-visibility: hidden;
}
</style>
