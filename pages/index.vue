<template>
	<!-- HeroPic -->
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

	<!-- Story -->
	<section id="story" v-if="sections.length" class="my-[128px] md:my-[512px]">
		<article v-for="(section, index) in sections" :key="index" class="story-container h-screen relative">
			<div
				class="absolute -translate-x-1/2 -translate-y-1/2 flex flex-row-reverse gap-[6px] md:gap-[24px] lg:gap-[48px]"
				:style="{ top: section.position.top, left: section.position.left }"
			>
				<!-- 只有當 section.title 存在時才渲染 -->
				<h2
					v-show="section.title"
					class="vertical-title text-[24px] md:text-[48px] lg:text-[96px] p-[6px] rounded-lg opacity-0"
					v-bind:ref="(el) => setTitleRef(el, index)"
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

	<!-- Intro -->
	<section class="intro-animation bg-secondary py-[48px] flex flex-col gap-[48px] lg:gap-[144px]">
		<div class="marquee-container text-[48px] lg:text-[96px]">
			<div class="marquee-left">OUR SERVICE OUR SERVICE OUR SERVICE OUR SERVICE OUR SERVICE</div>
			<div class="marquee-right">OUR SERVICE OUR SERVICE OUR SERVICE OUR SERVICE OUR SERVICE</div>
		</div>
		<!-- feature -->
		<article class="relative flex flex-col items-center">
			<img class="absolute top-2/3 w-screen intro-background" src="/public/YSCP/intro-background.png" alt="" />
			<!-- row -->
			<div class="flex gap-[12px] md:gap-[16px] lg:gap-[24px] hexagon-row-1">
				<Hexagon imageSrc="/YSCP/board-game.png" title="數位看板" />
				<Hexagon imageSrc="/YSCP/intelligent-analytics.png" title="智能分析" />
				<Hexagon imageSrc="/YSCP/vehicle.png" title="車輛" />
				<Hexagon imageSrc="/YSCP/visitor.png" title="訪客" />
			</div>
			<!-- row -->
			<div class="flex gap-[12px] md:gap-[16px] lg:gap-[24px] items-center hexagon-row-2">
				<Hexagon imageSrc="/YSCP/image.png" title="影像" />
				<div class="hexagon-title h-[96px] md:h-[169px] lg:h-[225px] text-[12px] md:text-[24px]">數據與監控</div>
				<div class="w-full flex flex-col gap-[4px] items-center">
					<img class="w-[24px] h-[24px] md:w-[50px] md:h-[50px]" src="/public/yenshow icon.png" alt="遠岫科技" />
					<span class="text-[12px] md:text-[24px] lg:text-[36px]">遠岫科技</span>
				</div>
				<div class="hexagon-title h-[96px] md:h-[169px] lg:h-[225px] text-[12px] md:text-[24px]">安全與管理</div>
				<Hexagon imageSrc="/YSCP/guarded-entrance.png" title="門禁" />
			</div>
			<!-- row -->
			<div class="flex gap-[12px] md:gap-[16px] lg:gap-[24px] hexagon-row-3">
				<Hexagon imageSrc="/YSCP/route.png" title="路線管理" />
				<Hexagon imageSrc="/YSCP/attendance.png" title="考勤管理" />
				<Hexagon imageSrc="/YSCP/alarm.png" title="警報" />
				<Hexagon imageSrc="/YSCP/maintain.png" title="維護" />
			</div>
		</article>
		<!-- YSCP -->
		<article class="container relative py-[144px] flex flex-col lg:flex-row justify-center items-center gap-[48px]">
			<!-- content -->
			<div class="flex flex-col gap-[24px] lg:gap-[48px] z-10 yscp-text">
				<h3 class="text-[24px] md:text-[36px] lg:text-[48px]">YSCentral Professional</h3>
				<h5 class="text-[12px] md:text-[18px] lg:text-[24px] opacity-80">
					一款整合式安全性軟體，<br />
					旨在透過一個「直覺」的平台來應對多種安全挑戰。
				</h5>
				<h4 class="text-[16px] md:text-[24px] lg:text-[36px]">
					在保護人員和財產安全的同時，<br />
					讓日常營運更有效率，<br />
					幫助使用者做出更明智的決策。
				</h4>
			</div>
			<!-- image -->
			<div class="grid grid-cols-2 relative">
				<div class="animateCircle"></div>
				<div class="animateCircle"></div>
				<div class="animateCircle"></div>
				<div class="animateCircle"></div>
				<!-- feature01 -->
				<div class="w-[200px] h-[200px] md:w-[300px] md:h-[300px] ml-[-25px] md:ml-0 YSCP-circle shadow-lg col-span-2 col-start-2">
					<h4 class="text-[24px] md:text-[36px] opacity-80">01</h4>
					<h4 class="text-[16px] md:text-[24px]">中央管理平台</h4>
				</div>
				<!-- feature02 -->
				<div
					class="w-[200px] h-[200px] md:w-[300px] md:h-[300px] mt-[-100px] ml-[5px] md:mt-[-150px] md:ml-[75px] YSCP-circle shadow-lg col-span-2 col-start-1"
				>
					<h4 class="text-[24px] md:text-[36px] opacity-80">02</h4>
					<h4 class="text-[16px] md:text-[24px]">軟體與硬體整合</h4>
				</div>
				<!-- feature03 -->
				<div
					class="w-[200px] h-[200px] md:w-[300px] md:h-[300px] mt-[-125px] ml-[-25px] md:mt-[-175px] md:ml-[-25px] YSCP-circle shadow-lg col-span-2 col-start-2"
				>
					<h4 class="text-[24px] md:text-[36px] opacity-80">03</h4>
					<h4 class="text-[16px] md:text-[24px]">完整的解決方案</h4>
				</div>
			</div>
		</article>
		<!-- 合作經驗談 -->
		<div class="container"></div>
	</section>

	<!-- Quote -->
	<section class="h-screen flex justify-center items-center my-[128px] md:my-[512px]">
		<div class="quote-container text-center text-[24px] md:text-[36px] text-secondary" style="font-family: 'LXGW WenKai Mono TC'">
			<div v-for="(sentence, index) in sentences" :key="index" class="quote-sentence">
				<span v-for="(char, i) in sentence" :key="i" class="quote-char">{{ char }}</span>
			</div>
		</div>
	</section>

	<!-- Cooperation -->
	<Cooperation id="cases"></Cooperation>

	<!-- Product -->
	<section id="products" class="my-[128px] md:my-[512px]">
		<h1 class="mb-[32px] lg:mb-[48px] text-[24px] md:text-[48px] lg:text-[64px] text-secondary text-center">產品中心</h1>
		<article class="h-[793px] overflow-scroll">
			<ProductIntroduction01></ProductIntroduction01>
			<ProductIntroduction02></ProductIntroduction02>
			<ProductIntroduction03></ProductIntroduction03>
			<ProductIntroduction04></ProductIntroduction04>
		</article>
	</section>

	<!-- News & Events -->
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
				<ButtonCTA class="w-fit h-fit"></ButtonCTA>
			</nav>
			<!-- Content -->
			<div class="w-full max-w-[880px] border-y-2 border-primary divide-y-2 divide-primary">
				<!-- New01 -->
				<div class="px-[24px] py-[12px] flex items-center gap-[24px]">
					<h5 class="text-[12px] lg:text-[16px] font-bold">2025.02.17</h5>
					<div class="text-[8px] lg:text-[12px] px-[4px] py-[2px] lg:px-[6px] lg:py-[4px] rounded-full border-2 border-primary opacity-80">小知識</div>
					<span class="text-[12px] lg:text-[24px]">我是標題</span>
				</div>
				<!-- New02 -->
				<div class="px-[24px] py-[12px] flex items-center gap-[24px]">
					<h5 class="text-[12px] lg:text-[16px] font-bold">2025.02.17</h5>
					<div class="text-[8px] lg:text-[12px] px-[4px] py-[2px] lg:px-[6px] lg:py-[4px] rounded-full border-2 border-primary opacity-80">新聞稿</div>
					<span class="text-[12px] lg:text-[24px]">我是標題</span>
				</div>
				<!-- New03 -->
				<div class="px-[24px] py-[12px] flex items-center gap-[24px]">
					<h5 class="text-[12px] lg:text-[16px] font-bold">2025.02.17</h5>
					<div class="text-[8px] lg:text-[12px] px-[4px] py-[2px] lg:px-[6px] lg:py-[4px] rounded-full border-2 border-primary opacity-80">小知識</div>
					<span class="text-[12px] lg:text-[24px]">我是標題</span>
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
				<ButtonCTA class="w-fit h-fit"></ButtonCTA>
			</nav>
			<!-- Content -->
			<div class="w-full max-w-[880px] border-y-2 border-primary divide-y-2 divide-primary">
				<!-- Problems01 -->
				<div class="px-[24px] py-[12px] flex items-center gap-[24px]">
					<h5 class="text-[12px] lg:text-[24px]">Q1</h5>
					<span class="text-[12px] lg:text-[24px]">我是標題</span>
				</div>
				<!-- Problems02 -->
				<div class="px-[24px] py-[12px] flex items-center gap-[24px]">
					<h5 class="text-[12px] lg:text-[24px]">Q2</h5>
					<span class="text-[12px] lg:text-[24px]">我是標題</span>
				</div>
				<!-- Problems03 -->
				<div class="px-[24px] py-[12px] flex items-center gap-[24px]">
					<h5 class="text-[12px] lg:text-[24px]">Q3</h5>
					<span class="text-[12px] lg:text-[24px]">我是標題</span>
				</div>
			</div>
		</article>
	</aside>
</template>

<script setup>
import gsap from "gsap";

useHead({
	title: "遠岫科技",
	meta: [{ name: "description", content: "這是我的 Nuxt 網站" }]
});

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

// 文字區塊
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

const titleRefs = ref([]);
const textRefs = ref([]);

// 記錄 title DOM
const setTitleRef = (el, index) => {
	if (el) titleRefs.value[index] = el;
};

// 記錄 texts DOM
const setTextRef = (el, sectionIndex, textIndex) => {
	if (el) {
		(textRefs.value[sectionIndex] ||= [])[textIndex] = el;
	}
};

const sentences = ref(["遠岫科技，既是一段故事，也是一份使命。", "我們期待與每一位客戶攜手，如白雲般靈活，如遠岫般穩固，", "共創晴空般廣闊的願景。"]);

onMounted(async () => {
	// 動態導入 ScrollTrigger 和 ScrollToPlugin
	try {
		// 導入 ScrollToPlugin 用於滾動
		const { default: ScrollToPlugin } = await import("gsap/ScrollToPlugin");
		gsap.registerPlugin(ScrollToPlugin);

		// 導入 ScrollTrigger 用於動畫
		const { default: ScrollTrigger } = await import("gsap/ScrollTrigger");
		gsap.registerPlugin(ScrollTrigger);

		// 導入動畫函數
		const { animateMarquee } = await import("~/composables/marquee");
		const { animateSection, animateFeatures, animateCircle, animateYSCPText, animateFeaturesFadeIn } = await import("~/composables/intro");
		const { animateQuoteText } = await import("~/composables/quote");

		// 自訂入場動畫
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

		// 文字動畫
		const setupTextAnimation = () => {
			if (!ScrollTrigger) return;

			sections.forEach((section, index) => {
				const tl = gsap.timeline({
					scrollTrigger: {
						trigger: ".story-container",
						start: "top 60%",
						end: "top 20%",
						toggleActions: "play none none reverse"
					}
				});

				// 如果有標題且有對應的 ref
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

		// 執行動畫
		setupEntranceAnimation();
		setupTextAnimation();
		await animateMarquee();
		await animateSection();
		await animateFeatures();
		await animateCircle();
		await animateYSCPText();
		await animateFeaturesFadeIn();
		await animateQuoteText();
	} catch (error) {
		console.error("Error initializing animations:", error);
	}
});
</script>

<style scoped>
.hexagon-title {
	aspect-ratio: cos(30deg);
	clip-path: polygon(-50% 50%, 50% 100%, 150% 50%, 50% 0);
	background: linear-gradient(#dd1c1c, #770f0f);
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	color: #f2f2f2;
	gap: 4px;
}
.hexagon-background {
	position: absolute;
	width: 150px; /* 控制六角形大小 */
	aspect-ratio: cos(30deg); /* 保持六角形比例 */
	clip-path: polygon(-50% 50%, 50% 100%, 150% 50%, 50% 0);
	background: rgba(0, 0, 0, 1); /* 半透明白色 */
	opacity: 1;
}

.YSCP-circle {
	color: #212a37;
	font-weight: bold;
	background: radial-gradient(closest-side, #d9d9d9, #ffffff);
	border-radius: 100%;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
}
.animateCircle {
	position: absolute;
	top: 30%;
	left: 40%;
	transform: translate(-50%, -50%);
	width: 40%;
	aspect-ratio: 1;
	border-radius: 100%;
	border: 2px solid #d9d9d9;
	z-index: -1;
	transform: scale(0.1);
}
.quote-container {
	display: flex;
	flex-direction: column;
	align-items: center;
	gap: 16px; /* 句子間距 */
}

.quote-sentence {
	display: block;
}

.quote-char {
	display: inline-block; /* 確保每個字可以獨立動畫 */
	opacity: 0; /* 預設隱藏，等待動畫 */
	transform: translateY(20px);
}
</style>
