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
					<p
						ref="clarifyingNeedsSubtitleRef"
						class="text-[12px] sm:text-[14px] md:text-[16px] lg:text-[18px] xl:text-[21px] text-gray-600 max-w-3xl mx-auto opacity-0"
					>
						我們深入了解各行業在導入智慧解決方案時可能遇到的常見問題。<br />看看這些場景是否與您相關，並探索可能的解決之道。
					</p>
				</div>

				<!-- Unified Challenges Section -->
				<div ref="allChallengesContainerRef" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10 mb-16 md:mb-20">
					<div
						v-for="(item, index) in allChallenges"
						:key="'challenge-' + index"
						class="flip-card-container perspective opacity-0 h-[380px] md:h-[420px]"
						@mouseenter="toggleFlip('challenge', index)"
						@mouseleave="toggleFlip('challenge', index)"
					>
						<div class="flip-card-inner transform-style-preserve-3d" :class="{ 'is-flipped': flippedCards['challenge-' + index] }">
							<!-- Front Face -->
							<div class="card-face backface-hidden bg-white rounded-xl shadow-xl p-6 text-center flex flex-col items-center justify-center">
								<h4 class="text-[16px] sm:text-[18px] md:text-[21px] lg:text-[24px] xl:text-[26px] 2xl:text-[28px] font-semibold text-gray-800 mb-3">
									{{ item.title }}
								</h4>
								<p class="text-gray-600 text-[12px] sm:text-[14px] md:text-[16px] lg:text-[18px] xl:text-[21px]">
									{{ item.pain_point }}
								</p>
								<span class="absolute bottom-4 text-sm font-medium text-sky-600 group-hover:text-sky-700">
									查看解決方案
									<svg
										xmlns="http://www.w3.org/2000/svg"
										class="h-4 w-4 ml-1 inline-block"
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
								<h4 class="text-[16px] sm:text-[18px] md:text-[21px] lg:text-[24px] xl:text-[26px] 2xl:text-[28px] mb-3">{{ item.title }}</h4>
								<p class="text-[12px] sm:text-[14px] md:text-[16px] lg:text-[18px] xl:text-[21px] opacity-80">{{ item.description }}</p>
							</div>
						</div>
					</div>
				</div>
			</div>
		</section>

		<!-- Section 3: Case Studies (Builders with Taiwan Map) -->
		<section ref="buildersCaseStudiesSectionRef" class="py-16 md:py-24 bg-white">
			<div class="container mx-auto px-4 sm:px-6 lg:px-8">
				<!-- Section Title -->
				<div class="text-center mb-12 md:mb-16">
					<h2 ref="buildersCaseStudiesTitleRef" class="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-800 mb-4 opacity-0">
						建商合作案例：深耕台灣，共築理想家園
					</h2>
					<p
						ref="buildersCaseStudiesSubtitleRef"
						class="text-[12px] sm:text-[14px] md:text-[16px] lg:text-[18px] xl:text-[21px] text-gray-600 max-w-3xl mx-auto opacity-0"
					>
						我們與全台各地的建商緊密合作，從智慧住宅到大型社區，提供全面的弱電整合與智能建築解決方案。
					</p>
				</div>

				<!-- Main Content: Map and Case Details -->
				<div class="flex flex-col lg:flex-row gap-8 md:gap-12 relative overflow-hidden">
					<!-- Taiwan Map Placeholder -->
					<div
						ref="taiwanMapContainerRef"
						class="w-full lg:w-1/2 h-[400px] md:h-[500px] lg:h-[600px] p-4 bg-sky-50 rounded-lg shadow-md flex items-center justify-center opacity-0 relative z-0"
					>
						<img src="/case/Taiwan.svg" alt="台灣地圖" class="w-full h-full object-contain" />

						<!-- Case Markers -->
						<button
							v-for="caseItem in builderCaseStudies"
							:key="caseItem.id"
							@click="handleSelectBuilderCase(caseItem)"
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

					<!-- Original Right Column for Intro Card (Remains visible) -->
					<div ref="caseDetailsContainerRef" class="w-full lg:w-1/2 opacity-0 h-[400px] md:h-[500px] lg:h-[600px] flex relative z-10">
						<!-- Intro Card (Always takes full width of its container and is visible) -->
						<div v-if="selectedBuilderCase" :key="'intro-' + selectedBuilderCase.id" class="w-full h-full bg-sky-50 shadow-lg flex flex-col">
							<div class="flex justify-between items-center p-3 md:p-4">
								<div class="flex flex-col">
									<h4 class="text-[16px] sm:text-[18px] md:text-[21px] lg:text-[24px] xl:text-[26px] 2xl:text-[28px] font-bold text-sky-700 mb-0.5">
										{{ selectedBuilderCase.name }}
									</h4>
									<p class="text-[12px] sm:text-[14px] md:text-[16px] lg:text-[18px] xl:text-[21px] text-gray-400">
										{{ selectedBuilderCase.location }}
									</p>
								</div>
								<p class="text-[16px] sm:text-[18px] md:text-[21px] lg:text-[24px] xl:text-[26px] 2xl:text-[28px] text-gray-800">集合式住宅建案</p>
							</div>

							<div class="relative min-h-[150px] md:min-h-[200px] lg:min-h-[250px]">
								<img :src="selectedBuilderCase.image" :alt="selectedBuilderCase.image_alt || '案例圖片'" class="w-full h-full object-contain bg-gray-100" />
								<button
									@click="toggleExpandedDetails"
									class="absolute bottom-2 right-2 bg-primary/80 text-white px-2.5 py-1.5 rounded-md text-[8px] sm:text-[10px] md:text-[12px] lg:text-[14px] xl:text-[16px] 2xl:text-[18px] hover:bg-primary backdrop-blur-sm transition-all duration-300 flex items-center focus:outline-none focus:ring-2 focus:ring-sky-500 focus:ring-opacity-75"
									:aria-label="isDetailedViewExpanded ? '收合詳情' : '了解更多'"
								>
									{{ isDetailedViewExpanded ? "收合內容" : "了解更多" }}
									<svg
										v-if="!isDetailedViewExpanded"
										xmlns="http://www.w3.org/2000/svg"
										class="h-3.5 w-3.5 ml-1"
										fill="none"
										viewBox="0 0 24 24"
										stroke="currentColor"
										stroke-width="2.5"
									>
										<path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7" />
									</svg>
									<svg
										v-else
										xmlns="http://www.w3.org/2000/svg"
										class="h-3.5 w-3.5 ml-1"
										fill="none"
										viewBox="0 0 24 24"
										stroke="currentColor"
										stroke-width="2.5"
									>
										<path stroke-linecap="round" stroke-linejoin="round" d="M15 19l-7-7 7-7" />
									</svg>
								</button>
							</div>
						</div>

						<!-- Placeholder if no case is selected -->
						<div
							v-if="!selectedBuilderCase"
							class="w-full h-full text-center py-10 text-gray-500 bg-gray-50/70 rounded-lg flex flex-col justify-center items-center"
						>
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
							<p class="mt-2 text-base">請點擊地圖上的標記，以查看案例詳情。</p>
						</div>
					</div>

					<!-- Detailed Info Panel (Absolutely Positioned, Slides from Left to cover Map area) -->
					<transition
						enter-active-class="transition-all duration-500 ease-in-out"
						enter-from-class="-translate-x-full opacity-0"
						enter-to-class="translate-x-0 opacity-100"
						leave-active-class="transition-all duration-500 ease-in-out"
						leave-from-class="translate-x-0 opacity-100"
						leave-to-class="-translate-x-full opacity-0"
					>
						<div
							v-if="selectedBuilderCase && isDetailedViewExpanded"
							class="detailed-info-panel absolute top-0 left-0 h-full w-full lg:w-1/2 bg-sky-700 text-white p-4 md:p-6 shadow-2xl overflow-y-auto custom-scrollbar z-20"
						>
							<div class="min-w-[200px] md:min-w-[250px]">
								<div class="flex justify-between items-center mb-3">
									<h5 class="text-[16px] sm:text-[18px] md:text-[21px] lg:text-[24px] xl:text-[26px] 2xl:text-[28px] font-semibold">
										{{ selectedBuilderCase.name }}
									</h5>
									<button @click="toggleExpandedDetails" aria-label="收起詳情" class="text-sky-200 hover:text-white p-1.5 rounded-full hover:bg-sky-600">
										<svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2">
											<path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12"></path>
										</svg>
									</button>
								</div>
								<p class="text-[12px] sm:text-[14px] md:text-[16px] lg:text-[18px] xl:text-[21px] text-sky-300 mb-4 border-b border-sky-600 pb-3">
									專案詳細資訊
								</p>

								<div class="space-y-5 text-sm md:text-base">
									<div>
										<h6 class="font-semibold text-sky-200 mb-1.5 text-[12px] sm:text-[14px] md:text-[16px] lg:text-[18px] xl:text-[21px]">面臨挑戰</h6>
										<p class="leading-relaxed opacity-90">{{ selectedBuilderCase.challenge }}</p>
									</div>
									<div>
										<h6 class="font-semibold text-sky-200 mb-1.5 text-[12px] sm:text-[14px] md:text-[16px] lg:text-[18px] xl:text-[21px]">解決方案</h6>
										<p class="leading-relaxed opacity-90">{{ selectedBuilderCase.solution }}</p>
									</div>
									<div>
										<h6 class="font-semibold text-sky-200 mb-1.5 text-[12px] sm:text-[14px] md:text-[16px] lg:text-[18px] xl:text-[21px]">達成成果</h6>
										<p class="leading-relaxed opacity-90">{{ selectedBuilderCase.result }}</p>
									</div>
								</div>
							</div>
						</div>
					</transition>
				</div>
			</div>
		</section>
	</div>
</template>

<script setup>
import { ref, onMounted, nextTick, computed } from "vue";
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
const allChallengesContainerRef = ref(null); // New ref for the unified container

// Data for Section 2 Challenges
const business_feature = ref([
	{
		pain_point: "整合多種弱電系統是否讓您頭痛不已？",
		title: "系統整合商",
		description: "為弱電合作夥伴提供高規格、安全的產品和服務，簡化複雜的系統架構，實現高效協同作業。"
	},
	{
		pain_point: "如何滿足品牌客戶多變且客製化的需求？",
		title: "品牌客戶",
		description: "與知名品牌深度合作，提供彈性的客製化解決方案，以專業技術實現客戶的獨特需求與品牌價值。"
	},
	{
		pain_point: "傳統門禁考勤是否已無法滿足現代企業的高效管理？",
		title: "公司行號",
		description: "為各類型企業導入智慧化門禁考勤系統，提升管理效率，保障辦公環境安全，優化員工體驗。"
	}
]);

const public_feature = ref([
	{
		pain_point: "如何在眾多建案中脫穎而出，提升銷售吸引力？",
		title: "建設公司",
		description: "提供完整的社區弱電系統規劃與新穎的智慧家庭設備，提高建案附加價值與市場競爭力，加速銷售。"
	},
	{
		pain_point: "醫療院所對安全與管理有著極高標準，如何應對？",
		title: "醫療院所",
		description: "為醫院、診所等醫療機構量身打造高可靠度的安全解決方案，符合嚴格的行業規範，保障醫病安全。"
	},
	{
		pain_point: "校園安全事件頻傳，如何打造更安全的學習環境？",
		title: "學校",
		description: "針對各級學校、幼兒園等教育場所，提供全方位的校園安全解決方案，建構安心的學習成長環境。"
	},
	{
		pain_point: "公家機關資訊安全與進出管理是否讓您感到挑戰？",
		title: "公家機關",
		description: "與政府機構緊密合作，提供符合高度資安需求的門禁管理與數據保護技術解決方案。"
	}
]);

const allChallenges = computed(() => {
	const combined = [...business_feature.value, ...public_feature.value];
	return combined.filter((item) => item.title !== "公家機關");
});

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
const taiwanMapContainerRef = ref(null);
const caseDetailsContainerRef = ref(null);

const builderCaseStudies = ref([
	{
		id: 1,
		name: "合總君悅",
		location: "雲林縣斗南鎮",
		challenge: "因應現代住宅需求，提升社區門禁系統的安全性、便利性與科技感，以吸引潛在住戶並提升建案價值。",
		solution:
			"導入遠岫全戶型智慧可視對講系統，採用10吋室內機YS-9510與4.3吋人臉辨識住戶門口機。系統整合視頻監控前後端產品、傳輸設備、門禁控制及集中管理平台軟體。",
		result: "實現全社區及各戶人臉辨識無卡通行，大幅提升居住便利性與安全管理水平。基地面積541坪，規劃91戶住家及2戶店鋪，坪數規劃23-34坪。",
		image: "/case/huzong.png",
		image_alt: "合總君悅建案外觀",
		mapPosition: { x: "35%", y: "47%" }
	},
	{
		id: 2,
		name: "小時代 III",
		location: "台中市沙鹿區",
		challenge: "大型社區（129戶）對門禁管理效率與住戶通行便利性有較高要求，需現代化解決方案取代傳統磁卡。",
		solution: "採用遠岫全社區可視對講系統，配置10吋室內機YS-8520及4.3吋人臉辨識住戶門口機。整合方案包括視頻監控、傳輸、門禁系統及集中管理平台。",
		result:
			"成功讓129戶住家實現無磁卡人臉辨識通行，提升社區安全與住戶體驗。項目基地1369坪，建蔽率22.04%，公設31%，樓層為地上14層、地下2層，規劃2房23-26坪及3房36坪。",
		image: "/case/little-3.png",
		image_alt: "小時代 III 建案",
		mapPosition: { x: "43%", y: "33%" }
	},
	{
		id: 3,
		name: "日光天晴",
		location: "新竹縣竹北市",
		challenge:
			"為位於新竹縣竹北市新寮街的「日光天晴」建案 (電梯大樓，60戶，基地520坪，坪數23~38坪)，導入先進的社區門禁解決方案，提升住戶的生活品質與建案價值。",
		solution:
			"採用遠岫全住戶可視對講系統，核心設備為7寸室內機YS-6320-LE1。系統整合人臉辨識技術，讓住戶進出社區及家門均無需攜帶磁卡。整體方案亦包含視頻監控前後端產品、傳輸設備、門禁控制以及集中管理平台軟體。",
		result: "成功實現全社區人臉辨識門禁系統，為60戶住戶帶來無卡化的便捷通行體驗，有效提升社區安全管理水平與居住便利性。",
		image: "/case/sunshine.jpg",
		image_alt: "日光天晴建案",
		mapPosition: { x: "54%", y: "22%" }
	}
]);

const selectedBuilderCase = ref(null);
const isDetailedViewExpanded = ref(false); // New state for expanded details

const handleSelectBuilderCase = (caseItem) => {
	selectedBuilderCase.value = caseItem;
	isDetailedViewExpanded.value = false; // Reset expanded state when new case is selected
};

const toggleExpandedDetails = () => {
	isDetailedViewExpanded.value = !isDetailedViewExpanded.value;
};

// Initialize with the first case or null - currently commented out
onMounted(() => {
	if (builderCaseStudies.value.length > 0) {
		// selectedBuilderCase.value = builderCaseStudies.value[0]; // Optionally select the first case by default
		// if (selectedBuilderCase.value) isDetailedViewExpanded.value = false;
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
		gsap.set([clarifyingNeedsTitleRef.value, clarifyingNeedsSubtitleRef.value], {
			y: 30,
			autoAlpha: 0
		});

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
			.to(
				allChallengesContainerRef.value ? allChallengesContainerRef.value.querySelectorAll(".flip-card-container") : [],
				{ autoAlpha: 1, y: 0, scale: 1, duration: 0.5, stagger: 0.15, ease: "back.out(1.7)" },
				"+=0.1"
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

/* Custom Scrollbar for Webkit browsers */
.custom-scrollbar::-webkit-scrollbar {
	width: 6px;
}
.custom-scrollbar::-webkit-scrollbar-track {
	background: transparent; /* Or use theme-appropriate color e.g., #f1f1f1 */
	border-radius: 10px;
}
.custom-scrollbar::-webkit-scrollbar-thumb {
	background: #60a5fa; /* Tailwind's blue-400, or sky-400 for consistency */
	border-radius: 10px;
	transition: background 0.2s ease-in-out;
}
.custom-scrollbar::-webkit-scrollbar-thumb:hover {
	background: #3b82f6; /* Tailwind's blue-500, or sky-500 */
}

/* Firefox scrollbar minimal styling */
.custom-scrollbar {
	scrollbar-width: thin;
	scrollbar-color: #60a5fa transparent; /* thumb and track */
}

/* Ensure map container text is visually below markers if image fails or for placeholder */
.taiwanMapContainerRef > p {
	position: relative;
	z-index: 0;
}
</style>
