<template>
	<section class="container min-h-screen flex flex-col justify-center items-center gap-[24px] xl:gap-[128px]">
		<!-- Logo -->
		<img ref="logo" class="hidden md:block w-[500px] h-[200px] mt-[128px] opacity-0" src="/public/yenshow.png" alt="Hero Pic" />
		<!-- Content -->
		<div class="flex flex-col xl:flex-row gap-[24px] xl:gap-[48px] mt-[96px]">
			<!-- HeroText -->
			<section ref="heroText" class="text-secondary opacity-0 transform -translate-x-10">
				<p class="text-[36px] md:text-[48px]">智慧防護</p>
				<p class="text-[24px] md:text-[36px] ms-[48px]">讓安心無所不在</p>
			</section>
			<!-- block CTA -->
			<nav class="md:h-[293px] grid grid-cols-1 md:grid-cols-3 gap-[24px]">
				<article
					v-for="(block, index) in blocks"
					:key="block.number"
					ref="blocksRef"
					@mouseenter="setActiveBlock(block.number)"
					@click="scrollToSection(block.id)"
					class="bg-primary flex flex-col gap-4 cursor-pointer transition-all duration-300 rounded-lg shadow-lg border border-gray-200 opacity-0 transform scale-75"
					:class="{
						'w-full h-[168px] md:w-[270px] md:h-[293px] text-secondary': block.number === activeBlock,
						'w-[0px] h-[168px] md:w-[270px] md:h-[0px] text-primary ': block.number !== activeBlock
					}"
				>
					<h4 class="mt-4 mx-4 md:mt-8 md:mx-8 w-[28px] text-[24px] border-b-2 border-current pb-1">0{{ block.number }}</h4>
					<p class="mx-4 md:mx-8 w-[96px] text-[24px] font-bold">{{ block.title }}</p>
					<span class="mx-4 md:mx-8 w-[200px] text-[16px] opacity-70">{{ block.description }}</span>
				</article>
			</nav>
		</div>
	</section>
</template>

<script setup>
import { ref, onMounted } from "vue";
import gsap from "gsap";

const blocks = ref([
	{ number: 1, title: "品牌故事", description: "了解我們的品牌歷史與願景", id: "story" },
	{ number: 2, title: "合作案例", description: "探索我們成功合作的案例", id: "cases" },
	{ number: 3, title: "產品中心", description: "查看我們的產品與解決方案", id: "products" }
]);

const activeBlock = ref(1);
const setActiveBlock = (number) => {
	activeBlock.value = number;
};

const scrollToSection = (id) => {
	const target = document.getElementById(id);
	if (target) {
		// 確保 ScrollToPlugin 已被加載
		if (gsap.plugins && gsap.plugins.scrollTo) {
			gsap.to(window, {
				scrollTo: { y: target },
				ease: "power2.out"
			});
		} else {
			// 插件未加載時的備用方案
			window.scrollTo({
				top: target.offsetTop,
				behavior: "smooth"
			});
		}
	}
};

const logo = ref(null);
const heroText = ref(null);
const blocksRef = ref([]);

// 整合 entrance animation
const setupEntranceAnimation = () => {
	gsap.to(logo.value, {
		opacity: 1,
		scale: 1,
		duration: 2,
		ease: "power3.out"
	});

	gsap.fromTo(heroText.value, { opacity: 0, x: -50 }, { opacity: 1, x: 0, duration: 1.2, ease: "power2.out", delay: 0.5 });

	gsap.to(blocksRef.value, {
		opacity: 1,
		scale: 1,
		duration: 0.8,
		stagger: 0.3,
		ease: "power2.out",
		delay: 1
	});
};

onMounted(() => {
	// 動態導入和註冊 ScrollToPlugin
	import("gsap/ScrollToPlugin").then((ScrollToPlugin) => {
		gsap.registerPlugin(ScrollToPlugin.default);
	});

	setupEntranceAnimation();
});
</script>
