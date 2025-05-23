<template>
	<div>
		<!-- Section 1: Hero - Title, Intro, Logo Wall -->
		<section ref="heroSectionRef" class="relative text-white overflow-hidden min-h-screen flex flex-col justify-center items-center">
			<div class="container mx-auto relative space-y-[24px] md:space-y-[48px] px-4 sm:px-6 lg:px-8 z-10">
				<!-- Page Title -->
				<div class="text-center">
					<h1 ref="pageTitleRef" class="text-[36px] md:text-[64px] lg:text-[80px] font-bold opacity-0">攜手共進，成就卓越</h1>
					<p
						ref="pageSubtitleRef"
						class="max-w-5xl mt-[24px] md:mt-[48px] text-[16px] sm:text-[18px] md:text-[21px] lg:text-[24px] xl:text-[26px] 2xl:text-[28px] text-sky-200 mx-auto opacity-0"
						style="text-shadow: 0 0 10px rgba(0, 0, 0, 0.5)"
					>
						探索我們與各行各業夥伴的合作故事，見證如何透過創新技術與專業服務，共同應對挑戰，創造非凡價值。
					</p>
				</div>

				<!-- Cooperation Philosophy (Intro Text) -->
				<div ref="philosophyRef" class="max-w-5xl mx-auto bg-black/20 backdrop-blur-md p-6 md:p-8 rounded-xl shadow-xl opacity-0">
					<h2 class="text-[16px] sm:text-[18px] md:text-[21px] lg:text-[24px] xl:text-[26px] 2xl:text-[28px] font-semibold text-secondary mb-4 text-center">
						我們的合作理念
					</h2>
					<p class="text-[12px] sm:text-[14px] md:text-[16px] lg:text-[18px] xl:text-[20px] 2xl:text-[22px] text-secondary/80 leading-relaxed">
						在遠岫科技，我們深信夥伴關係的力量。我們不僅是技術提供者，更是與客戶並肩作戰的夥伴。我們致力於深入理解您的業務需求與挑戰，量身打造最合適的解決方案。我們相信，透明的溝通、專業的執行以及對卓越成果的共同追求，是每一段成功合作的基石。
					</p>
				</div>

				<!-- Logo Wall -->
				<div ref="logoWallRef" class="opacity-0">
					<h3
						class="text-[16px] sm:text-[18px] md:text-[21px] lg:text-[24px] xl:text-[26px] 2xl:text-[28px] font-semibold text-secondary mb-6 md:mb-8 text-center"
					>
						信賴我們的夥伴
					</h3>
					<div class="logo-carousel-container relative w-full h-24 md:h-28 mx-auto overflow-hidden">
						<div ref="logoTrackRef" class="logo-track absolute top-0 left-0 flex items-center whitespace-nowrap">
							<!-- Logos will be dynamically added here by GSAP for seamless loop -->
							<img
								v-for="(logo, index) in partnerLogos"
								:key="'logo-initial-' + index"
								:src="logo.src"
								:alt="logo.alt"
								class="partner-logo mx-4 md:mx-6 h-12 sm:h-16 md:h-20 lg:h-24 object-contain"
							/>
							<!-- Duplicates for seamless scroll -->
							<img
								v-for="(logo, index) in partnerLogos"
								:key="'logo-duplicate-' + index"
								:src="logo.src"
								:alt="logo.alt"
								class="partner-logo mx-4 md:mx-6 h-12 sm:h-16 md:h-20 lg:h-24 object-contain"
							/>
						</div>
					</div>
				</div>
			</div>
		</section>

		<!-- Section 2: Clarifying Needs / Common Challenges -->
		<section ref="clarifyingNeedsSectionRef" class="clarifying-needs-section py-16 md:py-24 bg-gray-100">
			<div class="container mx-auto px-4 sm:px-6 lg:px-8">
				<div class="text-center mb-12 md:mb-16">
					<h2 ref="clarifyingNeedsTitleRef" class="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-800 mb-4 opacity-0">您是否正為以下挑戰煩惱？</h2>
					<p ref="clarifyingNeedsSubtitleRef" class="text-lg text-gray-600 max-w-3xl mx-auto opacity-0">
						我們深入了解各行業在導入智慧解決方案時可能遇到的常見問題。看看這些場景是否與您相關，並探索可能的解決之道。
					</p>
				</div>

				<!-- Business Challenges -->
				<div class="mb-16 md:mb-20">
					<h3 ref="businessChallengesTitleRef" class="text-2xl sm:text-3xl lg:text-4xl font-semibold text-gray-700 mb-8 md:mb-12 text-center opacity-0">
						企業客戶的常見挑戰
					</h3>
					<div ref="businessCardsContainerRef" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
						<div
							v-for="(item, index) in business_feature"
							:key="'biz-' + index"
							class="flip-card-container perspective opacity-0 h-[380px] md:h-[420px]"
							@mouseenter="toggleFlip('biz', index)"
							@mouseleave="toggleFlip('biz', index)"
						>
							<div class="flip-card-inner transform-style-preserve-3d" :class="{ 'is-flipped': flippedCards['biz-' + index] }">
								<!-- Front Face -->
								<div
									class="flip-card-front card-face backface-hidden bg-white rounded-xl shadow-xl hover:shadow-2xl transition-shadow duration-300 p-6 flex flex-col items-center text-center"
								>
									<img :src="item.image" :alt="item.title" class="w-20 h-20 mb-5 object-contain text-sky-600" />
									<h4 class="text-xl font-semibold text-gray-800 mb-3">{{ item.title }}</h4>
									<p class="text-gray-600 text-sm leading-relaxed mb-4 flex-grow">{{ item.pain_point }}</p>
									<span class="mt-auto text-sm font-medium text-sky-600 group-hover:text-sky-700">
										查看解決方案
										<svg
											xmlns="http://www.w3.org/2000/svg"
											class="h-4 w-4 ml-1 inline-block transition-transform duration-200 ease-in-out transform group-hover:translate-x-1"
											fill="none"
											viewBox="0 0 24 24"
											stroke="currentColor"
											stroke-width="2"
										>
											<path stroke-linecap="round" stroke-linejoin="round" d="M13 5l7 7-7 7" />
										</svg>
									</span>
								</div>
								<!-- Back Face -->
								<div
									class="flip-card-back card-face backface-hidden rotate-y-180 bg-sky-600 text-white rounded-xl shadow-xl p-6 flex flex-col items-center justify-center text-center"
								>
									<h4 class="text-xl font-semibold mb-3">{{ item.title }}</h4>
									<p class="text-sm leading-relaxed">{{ item.description }}</p>
								</div>
							</div>
						</div>
					</div>
				</div>

				<!-- Public Sector Challenges -->
				<div>
					<h3 ref="publicChallengesTitleRef" class="text-2xl sm:text-3xl lg:text-4xl font-semibold text-gray-700 mb-8 md:mb-12 text-center opacity-0">
						公共事業的常見挑戰
					</h3>
					<div ref="publicCardsContainerRef" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
						<div
							v-for="(item, index) in public_feature"
							:key="'pub-' + index"
							class="flip-card-container perspective opacity-0 h-[380px] md:h-[420px]"
							@mouseenter="toggleFlip('pub', index)"
							@mouseleave="toggleFlip('pub', index)"
						>
							<div class="flip-card-inner transform-style-preserve-3d" :class="{ 'is-flipped': flippedCards['pub-' + index] }">
								<!-- Front Face -->
								<div
									class="flip-card-front card-face backface-hidden bg-white rounded-xl shadow-xl hover:shadow-2xl transition-shadow duration-300 p-6 flex flex-col items-center text-center"
								>
									<img :src="item.image" :alt="item.title" class="w-20 h-20 mb-5 object-contain text-teal-600" />
									<h4 class="text-xl font-semibold text-gray-800 mb-3">{{ item.title }}</h4>
									<p class="text-gray-600 text-sm leading-relaxed mb-4 flex-grow">{{ item.pain_point }}</p>
									<span class="mt-auto text-sm font-medium text-teal-600 group-hover:text-teal-700">
										查看解決方案
										<svg
											xmlns="http://www.w3.org/2000/svg"
											class="h-4 w-4 ml-1 inline-block transition-transform duration-200 ease-in-out transform group-hover:translate-x-1"
											fill="none"
											viewBox="0 0 24 24"
											stroke="currentColor"
											stroke-width="2"
										>
											<path stroke-linecap="round" stroke-linejoin="round" d="M13 5l7 7-7 7" />
										</svg>
									</span>
								</div>
								<!-- Back Face -->
								<div
									class="flip-card-back card-face backface-hidden rotate-y-180 bg-teal-600 text-white rounded-xl shadow-xl p-6 flex flex-col items-center justify-center text-center"
								>
									<h4 class="text-xl font-semibold mb-3">{{ item.title }}</h4>
									<p class="text-sm leading-relaxed">{{ item.description }}</p>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</section>

		<!-- Section 3: Case Studies (Builders with Taiwan Map) -->
		<section ref="buildersCaseStudiesSectionRef" class="builders-case-studies-section py-16 md:py-24 bg-white">
			<div class="container mx-auto px-4 sm:px-6 lg:px-8">
				<!-- Section Title -->
				<div class="text-center mb-12 md:mb-16">
					<h2 ref="buildersCaseStudiesTitleRef" class="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-800 mb-4 opacity-0">
						建商合作案例：深耕台灣，共築理想家園
					</h2>
					<p ref="buildersCaseStudiesSubtitleRef" class="text-lg text-gray-600 max-w-2xl mx-auto opacity-0">
						我們與全台各地的建商緊密合作，從智慧住宅到大型社區，提供全面的弱電整合與智能建築解決方案。
					</p>
				</div>

				<!-- Main Content: Map and Case Details -->
				<div class="flex flex-col lg:flex-row gap-8 md:gap-12 items-start">
					<!-- Taiwan Map Placeholder -->
					<div
						ref="taiwanMapContainerRef"
						class="w-full lg:w-1/2 h-[400px] md:h-[500px] lg:h-[600px] bg-gray-200 rounded-lg shadow-md flex items-center justify-center text-gray-500 opacity-0 relative"
					>
						<!-- Placeholder background for the map -->
						<img
							src="/images/taiwan-map-placeholder.svg"
							alt="台灣地圖輪廓"
							class="absolute inset-0 w-full h-full object-contain opacity-30 pointer-events-none"
						/>
						<!-- User should replace with an actual map SVG or a more detailed placeholder -->
						<!-- For now, it's just an opacity layer over bg-gray-200 if the image is not found -->

						<!-- Case Markers -->
						<button
							v-for="caseItem in builderCaseStudies"
							:key="caseItem.id"
							@click="selectBuilderCase(caseItem)"
							class="absolute w-3 h-3 md:w-4 md:h-4 bg-sky-600 rounded-full shadow-md transform -translate-x-1/2 -translate-y-1/2 hover:bg-sky-400 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:ring-opacity-50 transition-all duration-150 ease-in-out cursor-pointer"
							:style="{
								left: caseItem.mapPosition.x,
								top: caseItem.mapPosition.y,
								zIndex: selectedBuilderCase && selectedBuilderCase.id === caseItem.id ? 10 : 1
							}"
							:class="{
								'bg-red-600 scale-150 ring-2 ring-red-400 ring-offset-2 ring-offset-gray-200': selectedBuilderCase && selectedBuilderCase.id === caseItem.id
							}"
							:aria-label="`查看 ${caseItem.name} 案例`"
						>
							<span class="sr-only">{{ caseItem.name }}</span>
							<!-- Pulsing animation for selected marker -->
							<span
								v-if="selectedBuilderCase && selectedBuilderCase.id === caseItem.id"
								class="absolute inset-[-2px] rounded-full bg-red-500 animate-ping-slow opacity-75"
							></span>
						</button>
						<p v-if="!builderCaseStudies || builderCaseStudies.length === 0" class="text-center z-0">暫無建商案例標記</p>
					</div>

					<!-- Case Details / List -->
					<div ref="caseDetailsContainerRef" class="w-full lg:w-1/2 opacity-0">
						<h3 class="text-2xl font-semibold text-gray-700 mb-6">精選案例</h3>
						<div v-if="selectedBuilderCase" :key="selectedBuilderCase.id" class="case-detail-card bg-sky-50 p-4 md:p-6 rounded-lg shadow-lg mb-6">
							<h4 class="text-xl font-bold text-sky-700 mb-2">{{ selectedBuilderCase.name }}</h4>
							<p class="text-sm text-gray-500 mb-3">地點：{{ selectedBuilderCase.location }}</p>
							<div v-if="selectedBuilderCase.image" class="my-4 h-48 bg-gray-300 rounded overflow-hidden">
								<img
									:src="selectedBuilderCase.image"
									:alt="selectedBuilderCase.image_alt || '案例圖片'"
									class="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
								/>
							</div>
							<p class="text-gray-700 my-3 text-sm leading-relaxed"><strong class="font-medium">挑戰：</strong>{{ selectedBuilderCase.challenge }}</p>
							<p class="text-gray-700 my-3 text-sm leading-relaxed"><strong class="font-medium">解決方案：</strong>{{ selectedBuilderCase.solution }}</p>
							<p class="text-gray-700 text-sm leading-relaxed"><strong class="font-medium">成果：</strong>{{ selectedBuilderCase.result }}</p>
						</div>
						<div v-else class="text-center py-10 text-gray-500 bg-gray-50/70 rounded-lg">
							<svg
								xmlns="http://www.w3.org/2000/svg"
								class="mx-auto h-12 w-12 text-gray-400"
								fill="none"
								viewBox="0 0 24 24"
								stroke="currentColor"
								stroke-width="1"
							>
								<path stroke-linecap="round" stroke-linejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
								<path stroke-linecap="round" stroke-linejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
							</svg>
							<p class="mt-2 text-base">請點擊地圖上的標記，或從下方列表選擇，以查看案例詳情。</p>
						</div>

						<!-- Alternative List View -->
						<div class="mt-8" v-if="builderCaseStudies && builderCaseStudies.length > 0">
							<h4 class="text-xl font-semibold text-gray-700 mb-4">或從列表選擇：</h4>
							<ul class="space-y-2 max-h-[250px] md:max-h-[300px] overflow-y-auto pr-2 custom-scrollbar">
								<li v-for="caseItem in builderCaseStudies" :key="'list-' + caseItem.id">
									<button
										@click="selectBuilderCase(caseItem)"
										class="w-full text-left p-3 rounded-md transition-all duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-sky-300"
										:class="
											selectedBuilderCase && selectedBuilderCase.id === caseItem.id
												? 'bg-sky-100 text-sky-700 shadow-md scale-[1.02]'
												: 'hover:bg-gray-100 text-gray-600 hover:text-gray-800'
										"
									>
										<span class="font-medium text-sm md:text-base">{{ caseItem.name }}</span>
										<span class="text-xs block text-gray-500">{{ caseItem.location }}</span>
									</button>
								</li>
							</ul>
						</div>
					</div>
				</div>
			</div>
		</section>
	</div>
</template>

<script setup>
import { ref, onMounted, nextTick } from "vue";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useScrollAnimation } from "@/composables/useScrollAnimation"; // 引入 useScrollAnimation
import { useHead } from "#app";

gsap.registerPlugin(ScrollTrigger);

useHead({
	title: "遠岫科技 - 合作案例",
	meta: [{ name: "description", content: "深入探索遠岫科技與各行業夥伴的成功合作案例，了解我們如何以創新技術與專業服務，應對挑戰，共創價值。" }]
});

// --- Refs for Partner Logo Carousel ---
const logoTrackRef = ref(null);

const partnerLogos = ref([
	{ src: "/logo/Chung king logo 1.png", alt: "Chung King" },
	{ src: "/logo/familyMart logo 1.png", alt: "FamilyMart" },
	{ src: "/logo/fetnet-logo 1.png", alt: "Fetnet" },
	{ src: "/logo/greatg logo 1.png", alt: "GreatG" },
	{ src: "/logo/he-tzung logo 1.png", alt: "He Tzung" },
	{ src: "/logo/jianyang-logo 1.png", alt: "Jian Yang" },
	{ src: "/logo/joy English logo 1.png", alt: "Joy English" },
	{ src: "/logo/NAMR logo 1.png", alt: "NAMR" },
	{ src: "/logo/TCPA logo 1.png", alt: "TCPA" },
	{ src: "/logo/ttu logo 1.png", alt: "TTU" },
	{ src: "/logo/wangbang logo 1.png", alt: "Wang Bang" },
	{ src: "/logo/zongtai logo 1.png", alt: "Zongtai" }
]);

const flippedCards = ref({});

function toggleFlip(type, index) {
	const key = `${type}-${index}`;
	flippedCards.value[key] = !flippedCards.value[key];
}

const scrollAnimation = useScrollAnimation();

// Refs for Section 2: Clarifying Needs
const clarifyingNeedsSectionRef = ref(null);
const clarifyingNeedsTitleRef = ref(null);
const clarifyingNeedsSubtitleRef = ref(null);
const businessChallengesTitleRef = ref(null);
const businessCardsContainerRef = ref(null);
const publicChallengesTitleRef = ref(null);
const publicCardsContainerRef = ref(null);

// Data for Section 2 Challenges
const business_feature = ref([
	{
		pain_point: "整合多種弱電系統是否讓您頭痛不已？",
		title: "系統整合商",
		description: "為弱電合作夥伴提供高規格、安全的產品和服務，簡化複雜的系統架構，實現高效協同作業。",
		image: "/corporation/Networking Manager.svg"
	},
	{
		pain_point: "如何滿足品牌客戶多變且客製化的需求？",
		title: "品牌客戶",
		description: "與知名品牌深度合作，提供彈性的客製化解決方案，以專業技術實現客戶的獨特需求與品牌價值。",
		image: "/corporation/customers.svg"
	},
	{
		pain_point: "傳統門禁考勤是否已無法滿足現代企業的高效管理？",
		title: "公司行號",
		description: "為各類型企業導入智慧化門禁考勤系統，提升管理效率，保障辦公環境安全，優化員工體驗。",
		image: "/corporation/company.svg"
	}
]);

const public_feature = ref([
	{
		pain_point: "如何在眾多建案中脫穎而出，提升銷售吸引力？",
		title: "建設公司",
		description: "提供完整的社區弱電系統規劃與新穎的智慧家庭設備，提高建案附加價值與市場競爭力，加速銷售。",
		image: "/corporation/building.svg"
	},
	{
		pain_point: "醫療院所對安全與管理有著極高標準，如何應對？",
		title: "醫療院所",
		description: "為醫院、診所等醫療機構量身打造高可靠度的安全解決方案，符合嚴格的行業規範，保障醫病安全。",
		image: "/corporation/hospital.svg"
	},
	{
		pain_point: "校園安全事件頻傳，如何打造更安全的學習環境？",
		title: "學校",
		description: "針對各級學校、幼兒園等教育場所，提供全方位的校園安全解決方案，建構安心的學習成長環境。",
		image: "/corporation/school.svg"
	},
	{
		pain_point: "公家機關資訊安全與進出管理是否讓您感到挑戰？",
		title: "公家機關",
		description: "與政府機構緊密合作，提供符合高度資安需求的門禁管理與數據保護技術解決方案。",
		image: "/corporation/government.svg"
	}
]);

const handleChallengeClick = (challenge) => {
	console.log("Challenge clicked:", challenge.title);
	// Later, this could navigate to a specific section or open a modal
	if (challenge.linkUrl && challenge.linkUrl.startsWith("#")) {
		// Simple anchor link navigation for now
		// const element = document.getElementById(challenge.linkUrl.substring(1));
		// if (element) element.scrollIntoView({ behavior: 'smooth' });
	} else if (challenge.linkUrl) {
		// window.location.href = challenge.linkUrl; // Or use router.push for internal links
	}
};

// Refs for section 1 elements
const heroSectionRef = ref(null);
const pageTitleRef = ref(null);
const pageSubtitleRef = ref(null);
const philosophyRef = ref(null);
const logoWallRef = ref(null);

// --- Refs for Section 3: Builder Case Studies ---
const buildersCaseStudiesSectionRef = ref(null);
const buildersCaseStudiesTitleRef = ref(null);
const buildersCaseStudiesSubtitleRef = ref(null);
const taiwanMapContainerRef = ref(null); // Placeholder for map interactions
const caseDetailsContainerRef = ref(null);

const builderCaseStudies = ref([
	{
		id: 1,
		name: "合總君悅 (範例)",
		location: "雲林縣斗南鎮",
		challenge: "傳統對講系統老舊，住戶期望更現代化、更安全的門禁管理方式。",
		solution: "引入遠岫全戶型智慧可視對講系統，整合人臉辨識門口機與高清室內機。",
		result: "大幅提升社區安全性與便利性，住戶無需攜帶磁卡即可通行，管理中心亦可高效管理。",
		image: "/images/case-studies/hetzong-junyue.jpg", // Replace with actual image path
		image_alt: "合總君悅建案外觀",
		mapPosition: { x: "40%", y: "65%" } // Example coordinates for map marker
	},
	{
		id: 2,
		name: "城市核心 (範例)",
		location: "台中市西屯區",
		challenge: "新建案需導入高規格智慧家庭解決方案，提升建案價值與吸引力。",
		solution: "提供全套智慧家庭系統，包括智能照明、環境控制、安全監控及影音娛樂整合。",
		result: "打造科技豪宅形象，提供住戶便捷舒適的智慧生活體驗，促進建案銷售。",
		image: "/images/case-studies/city-core.jpg", // Replace with actual image path
		image_alt: "城市核心建案大樓",
		mapPosition: { x: "50%", y: "50%" }
	},
	{
		id: 3,
		name: "海景一號院 (範例)",
		location: "高雄市鼓山區",
		challenge: "濱海高級住宅對安全監控與環境適應性有極高要求。",
		solution: "部署耐候型高清監控攝影機，結合AI影像分析與周界防護系統，並整合社區緊急應變通報機制。",
		result: "提供全天候無死角的安全監控，有效預防潛在風險，保障住戶生命財產安全。",
		image: "/images/case-studies/sea-view-one.jpg", // Replace with actual image path
		image_alt: "海景一號院社區",
		mapPosition: { x: "45%", y: "80%" }
	}
]);

const selectedBuilderCase = ref(null);

const selectBuilderCase = (caseItem) => {
	selectedBuilderCase.value = caseItem;
};

// Initialize with the first case or null
onMounted(() => {
	if (builderCaseStudies.value.length > 0) {
		// selectedBuilderCase.value = builderCaseStudies.value[0]; // Optionally select the first case by default
	}
});

onMounted(async () => {
	await nextTick();
	let logoScrollAnimation = null;

	if (scrollAnimation && typeof scrollAnimation.initScrollPlugins === "function") {
		await scrollAnimation.initScrollPlugins();
	}

	// --- Hero Section Animation ---
	if (pageTitleRef.value && pageSubtitleRef.value && philosophyRef.value && logoWallRef.value) {
		const tlHero = gsap.timeline({ delay: 0.2 });
		tlHero
			.to(pageTitleRef.value, { autoAlpha: 1, y: 0, duration: 0.8, ease: "power2.out" }, "+=0.2")
			.to(pageSubtitleRef.value, { autoAlpha: 1, y: 0, duration: 0.7, ease: "power2.out" }, "-=0.5")
			.to(philosophyRef.value, { autoAlpha: 1, y: 0, scale: 1, duration: 0.7, ease: "back.out(1.7)" }, "-=0.4")
			.to(logoWallRef.value, { autoAlpha: 1, y: 0, duration: 0.6, ease: "power2.out" }, "-=0.4");
		gsap.set(pageTitleRef.value, { y: 30, autoAlpha: 0 });
		gsap.set(pageSubtitleRef.value, { y: 25, autoAlpha: 0 });
		gsap.set(philosophyRef.value, { y: 20, scale: 0.95, autoAlpha: 0 });
		gsap.set(logoWallRef.value, { y: 20, autoAlpha: 0 });
	}

	// --- Partner Logo Carousel Animation ---
	if (logoTrackRef.value && partnerLogos.value.length > 0) {
		const logos = Array.from(logoTrackRef.value.querySelectorAll(".partner-logo")).slice(0, partnerLogos.value.length);
		let totalWidth = 0;
		const imageLoadPromises = logos.map(
			(img) =>
				new Promise((resolve) => {
					if (img.complete) {
						totalWidth += img.offsetWidth + (parseInt(getComputedStyle(img).marginLeft) || 0) + (parseInt(getComputedStyle(img).marginRight) || 0);
						resolve();
					} else {
						img.onload = () => {
							totalWidth += img.offsetWidth + (parseInt(getComputedStyle(img).marginLeft) || 0) + (parseInt(getComputedStyle(img).marginRight) || 0);
							resolve();
						};
						img.onerror = () => {
							console.warn(`Logo image failed to load: ${img.src}`);
							resolve();
						};
					}
				})
		);
		await Promise.all(imageLoadPromises);
		if (totalWidth > 0 && logoTrackRef.value.parentElement.offsetWidth < totalWidth) {
			const animationDuration = totalWidth / 50;
			logoScrollAnimation = gsap.to(logoTrackRef.value, { x: -totalWidth, ease: "none", duration: animationDuration, repeat: -1 });
			logoTrackRef.value.parentElement.addEventListener("mouseenter", () => logoScrollAnimation && logoScrollAnimation.pause());
			logoTrackRef.value.parentElement.addEventListener("mouseleave", () => logoScrollAnimation && logoScrollAnimation.play());
		} else if (logoTrackRef.value) {
			logoTrackRef.value.style.justifyContent = "center";
		}
	}

	// --- Section 2: Clarifying Needs Animation ---
	if (clarifyingNeedsSectionRef.value) {
		gsap.set([clarifyingNeedsTitleRef.value, clarifyingNeedsSubtitleRef.value, businessChallengesTitleRef.value, publicChallengesTitleRef.value], {
			y: 30,
			autoAlpha: 0
		});
		gsap.set(".flip-card-container", { y: 30, autoAlpha: 0, scale: 0.95 });

		const tlNeeds = gsap.timeline({
			scrollTrigger: {
				trigger: clarifyingNeedsSectionRef.value,
				start: "top 85%", // Adjust as needed
				toggleActions: "play none none none"
			}
		});

		tlNeeds
			.to(clarifyingNeedsTitleRef.value, { autoAlpha: 1, y: 0, duration: 0.7, ease: "power2.out" })
			.to(clarifyingNeedsSubtitleRef.value, { autoAlpha: 1, y: 0, duration: 0.7, ease: "power2.out" }, "-=0.4")
			.to(businessChallengesTitleRef.value, { autoAlpha: 1, y: 0, duration: 0.6, ease: "power2.out" }, "-=0.3")
			.to(
				businessCardsContainerRef.value
					? businessCardsContainerRef.value.querySelectorAll(".flip-card-container")
					: ".business-challenge-card-selector-placeholder", // Placeholder if ref not used
				{ autoAlpha: 1, y: 0, scale: 1, duration: 0.5, stagger: 0.15, ease: "back.out(1.7)" },
				"-=0.2"
			)
			.to(publicChallengesTitleRef.value, { autoAlpha: 1, y: 0, duration: 0.6, ease: "power2.out" }, "+=0.2") // Add some delay before next section title
			.to(
				publicCardsContainerRef.value ? publicCardsContainerRef.value.querySelectorAll(".flip-card-container") : ".public-challenge-card-selector-placeholder", // Placeholder if ref not used
				{ autoAlpha: 1, y: 0, scale: 1, duration: 0.5, stagger: 0.15, ease: "back.out(1.7)" },
				"-=0.2"
			);
	}

	// --- Section 3: Builder Case Studies Animation ---
	if (buildersCaseStudiesSectionRef.value) {
		gsap.set([buildersCaseStudiesTitleRef.value, buildersCaseStudiesSubtitleRef.value, taiwanMapContainerRef.value, caseDetailsContainerRef.value], {
			autoAlpha: 0,
			y: 30
		});

		const tlBuilderCases = gsap.timeline({
			scrollTrigger: {
				trigger: buildersCaseStudiesSectionRef.value,
				start: "top 80%",
				toggleActions: "play none none none"
			}
		});

		tlBuilderCases
			.to(buildersCaseStudiesTitleRef.value, { autoAlpha: 1, y: 0, duration: 0.7, ease: "power2.out" })
			.to(buildersCaseStudiesSubtitleRef.value, { autoAlpha: 1, y: 0, duration: 0.7, ease: "power2.out" }, "-=0.4")
			.to(taiwanMapContainerRef.value, { autoAlpha: 1, y: 0, duration: 0.8, ease: "power2.out" }, "-=0.3")
			.to(caseDetailsContainerRef.value, { autoAlpha: 1, y: 0, duration: 0.8, ease: "power2.out" }, "-=0.5");
	}
});
</script>

<style scoped>
.logo-carousel-container {
	overflow: hidden; /* 隱藏超出容器的內容 */
	position: relative;
	mask-image: linear-gradient(to right, transparent, black 10%, black 90%, transparent); /* 兩端淡化效果 */
	-webkit-mask-image: linear-gradient(to right, transparent, black 10%, black 90%, transparent);
}

.partner-logo {
	transition: transform 0.3s ease, filter 0.3s ease;
}
.partner-logo:hover {
	transform: scale(1.1);
	filter: brightness(1.2);
}

/* Logo Carousel Styles */
.logo-carousel-container {
	overflow: hidden; /* 隱藏超出容器的內容 */
	position: relative;
	mask-image: linear-gradient(to right, transparent, black 10%, black 90%, transparent); /* 兩端淡化效果 */
	-webkit-mask-image: linear-gradient(to right, transparent, black 10%, black 90%, transparent);
}

.logo-track {
	display: flex;
	will-change: transform; /* 提示瀏覽器此元素將會變形，以進行優化 */
}

.partner-logo {
	height: 80px; /* 調整 Logo 高度 */
	max-width: 160px; /* 限制 Logo 最大寬度，避免過大 */
	object-fit: contain; /* 保持圖片比例 */
	margin-right: 30px; /* Logo 之間的間距 */
}

/* Flip Card Styles */
.perspective {
	perspective: 1000px;
}
.transform-style-preserve-3d {
	transform-style: preserve-3d;
}
.backface-hidden {
	backface-visibility: hidden;
	-webkit-backface-visibility: hidden;
}
.rotate-y-180 {
	transform: rotateY(180deg);
}

.flip-card-inner {
	position: relative;
	width: 100%;
	height: 100%;
	text-align: center;
	transition: transform 0.7s cubic-bezier(0.4, 0.2, 0.2, 1); /* Smoother transition */
	transform-style: preserve-3d;
}

.flip-card-inner.is-flipped {
	transform: rotateY(180deg);
}

.card-face {
	position: absolute;
	width: 100%;
	height: 100%;
	-webkit-backface-visibility: hidden;
	backface-visibility: hidden;
	overflow-wrap: break-word; /* ensure long words break */
	word-wrap: break-word;
	hyphens: auto; /* auto hyphenate if supported */
}

@keyframes ping-slow {
	75%,
	100% {
		transform: scale(2.5);
		opacity: 0;
	}
}
.animate-ping-slow {
	animation: ping-slow 1.8s cubic-bezier(0, 0, 0.2, 1) infinite;
}

.case-detail-card {
	opacity: 0;
	transform: translateY(15px) scale(0.98);
	animation: fadeInDetail 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards;
}

@keyframes fadeInDetail {
	to {
		opacity: 1;
		transform: translateY(0) scale(1);
	}
}

/* Custom Scrollbar for Webkit browsers */
.custom-scrollbar::-webkit-scrollbar {
	width: 6px;
}
.custom-scrollbar::-webkit-scrollbar-track {
	background: transparent; /* Or use theme-appropriate color e.g., #f1f1f1 */
	border-radius: 10px;
}
.custom-scrollbar::-webkit-scrollbar-thumb {
	background: #cbd5e1; /* Tailwind's gray-300 */
	border-radius: 10px;
	transition: background 0.2s ease-in-out;
}
.custom-scrollbar::-webkit-scrollbar-thumb:hover {
	background: #94a3b8; /* Tailwind's gray-400 or 500 */
}

/* Firefox scrollbar minimal styling */
.custom-scrollbar {
	scrollbar-width: thin;
	scrollbar-color: #cbd5e1 transparent; /* thumb and track */
}

/* Ensure map container text is visually below markers if image fails or for placeholder */
.taiwanMapContainerRef > p {
	position: relative;
	z-index: 0;
}
</style>
