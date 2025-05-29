<template>
	<div>
		<!-- Section 1: Vision & Core Strengths -->
		<section class="text-white py-16 md:py-24 flex flex-col justify-center items-center text-center px-4 sm:px-6 space-y-[24px] md:space-y-[48px]">
			<div ref="visionTitleRef" class="opacity-0 space-y-[24px] md:space-y-[48px]">
				<h1 class="text-[28px] sm:text-[36px] md:text-[48px] lg:text-[60px] xl:text-[72px] font-bold">智能科技，重塑體驗</h1>
				<p
					class="text-[16px] sm:text-[18px] md:text-[21px] lg:text-[24px] xl:text-[26px] 2xl:text-[28px] text-sky-200 max-w-4xl"
					style="text-shadow: 0 0 10px rgba(0, 0, 0, 0.8)"
				>
					遠岫科技致力於提供尖端智能解決方案，融合創新技術與人性化設計，為您的生活與工作空間注入前所未有的便捷、安全與高效。
				</p>
			</div>

			<div class="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12 max-w-5xl">
				<div
					v-for="(strength, index) in coreStrengths"
					:key="index"
					:ref="(el) => (coreStrengthRefs[index] = el)"
					class="bg-sky-700/40 backdrop-blur-sm p-4 rounded-lg shadow-lg opacity-0 flex flex-col items-center"
				>
					<div class="flex justify-center">
						<svg xmlns="http://www.w3.org/2000/svg" class="h-14 w-14 text-sky-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5">
							<path stroke-linecap="round" stroke-linejoin="round" :d="strength.icon" />
						</svg>
					</div>
					<h3 class="text-[16px] sm:text-[18px] md:text-[21px] lg:text-[24px] font-semibold mb-4 text-sky-300">{{ strength.title }}</h3>
					<p class="text-[12px] sm:text-[14px] md:text-[16px] lg:text-[18px] text-secondary">{{ strength.description }}</p>
				</div>
			</div>

			<div ref="galleryIntroTextRef" class="opacity-0">
				<p class="text-[16px] sm:text-[18px] md:text-[21px] lg:text-[24px] text-secondary max-w-3xl" style="text-shadow: 0 0 10px rgba(0, 0, 0, 0.8)">
					接下來，讓我們一同探索遠岫科技如何將這些核心優勢融入我們全系列的產品解決方案，為您打造卓越的智能體驗。
				</p>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					class="h-10 w-10 text-secondary mx-auto mt-8 animate-bounce"
					fill="none"
					viewBox="0 0 24 24"
					stroke="currentColor"
					stroke-width="2"
				>
					<path stroke-linecap="round" stroke-linejoin="round" d="M19 9l-7 7-7-7" />
				</svg>
			</div>
		</section>

		<!-- Section 2: Product Gallery -->
		<div class="product-gallery-container" ref="galleryContainerToPinRef">
			<header class="text-center pt-4 md:pt-8 space-y-[12px] md:space-y-[24px]">
				<h1 class="text-[24px] sm:text-[32px] md:text-[36px] lg:text-[40px] xl:text-[48px] font-bold">產品解決方案</h1>
			</header>

			<div class="gallery-scroll-container" ref="scrollContainerRef">
				<section v-for="(solution, index) in solutions" :key="solution.id" class="solution-section" :ref="(el) => (solutionElements[index] = el)">
					<div class="solution-content">
						<div class="image-container">
							<img
								:src="solution.image"
								:alt="solution.title"
								class="solution-image cursor-pointer focus:outline-none focus:ring-2 focus:ring-sky-400"
								tabindex="0"
								role="button"
								:aria-label="`放大檢視 ${solution.title} 圖片`"
								@click="openLightbox(solution, $event.target)"
								@keydown.enter="openLightbox(solution, $event.target)"
								@keydown.space.prevent="openLightbox(solution, $event.target)"
							/>
						</div>
					</div>
				</section>
			</div>

			<div class="gallery-navigation-sides" ref="galleryNavSidesRef">
				<nav class="gallery-navigation-left text-[16px] sm:text-[18px] md:text-[21px] lg:text-[24px] xl:text-[26px] 2xl:text-[28px]" ref="galleryNavLeftRef">
					<button
						v-for="(solution, index) in solutions.filter((_, i) => i < Math.ceil(solutions.length / 2))"
						:key="`nav-left-${solution.id}`"
						@click="navigateToSection(solutions.findIndex((s) => s.id === solution.id))"
						:class="{ active: currentSectionIndex === solutions.findIndex((s) => s.id === solution.id) }"
					>
						{{ solution.shortTitle || solution.title }}
					</button>
				</nav>
				<nav class="gallery-navigation-right text-[16px] sm:text-[18px] md:text-[21px] lg:text-[24px] xl:text-[26px] 2xl:text-[28px]" ref="galleryNavRightRef">
					<button
						v-for="(solution, index) in solutions.filter((_, i) => i >= Math.ceil(solutions.length / 2))"
						:key="`nav-right-${solution.id}`"
						@click="navigateToSection(solutions.findIndex((s) => s.id === solution.id))"
						:class="{ active: currentSectionIndex === solutions.findIndex((s) => s.id === solution.id) }"
					>
						{{ solution.shortTitle || solution.title }}
					</button>
				</nav>
			</div>
		</div>

		<!-- Lightbox Modal -->
		<div
			v-if="isLightboxOpen && currentSolutionInLightbox"
			class="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center p-4 overflow-y-auto"
			role="dialog"
			aria-modal="true"
			:aria-labelledby="lightboxTitleId"
			@click.self="closeLightbox"
			@keydown.esc="closeLightbox"
		>
			<div
				class="lightbox-content-wrapper bg-slate-800 rounded-lg shadow-2xl w-full max-w-4xl md:max-w-5xl lg:max-w-6xl max-h-[95vh] flex flex-col md:flex-row overflow-hidden"
			>
				<!-- Close Button (Positioned within the wrapper for better context) -->
				<button
					ref="closeModalButtonRef"
					@click="closeLightbox"
					class="absolute top-3 right-3 text-gray-300 hover:text-white focus:ring-2 focus:ring-white rounded-full p-1 z-20 bg-slate-700 hover:bg-slate-600 transition-colors"
					aria-label="關閉產品預覽"
				>
					<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="w-6 h-6 sm:w-7 sm:h-7">
						<title>關閉圖示</title>
						<path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
					</svg>
				</button>

				<!-- Left Side: Image -->
				<div class="lightbox-image-container w-full md:w-1/2 p-4 md:p-6 flex-shrink-0 bg-slate-900 flex items-center justify-center">
					<img
						:src="currentSolutionInLightbox.image"
						:alt="currentSolutionInLightbox.title"
						class="max-w-full max-h-[40vh] md:max-h-[85vh] object-contain rounded-md shadow-lg"
					/>
				</div>

				<!-- Right Side: Details -->
				<div class="lightbox-details-container w-full md:w-1/2 p-4 md:p-6 flex flex-col text-gray-200 overflow-y-auto custom-scrollbar">
					<h2 :id="lightboxTitleId" class="text-xl sm:text-2xl md:text-3xl font-bold text-sky-400 mb-3 md:mb-4">{{ currentSolutionInLightbox.title }}</h2>

					<!-- Product Description -->
					<div class="mb-4 md:mb-6">
						<h3 class="text-base sm:text-lg font-semibold text-sky-300 mb-1.5">產品方案說明</h3>
						<p class="text-xs sm:text-sm md:text-base text-gray-300 leading-relaxed">
							{{ currentSolutionInLightbox.description || "暫無詳細說明。" }}
						</p>
					</div>

					<!-- Related Products -->
					<div v-if="currentSolutionInLightbox.relatedProducts && currentSolutionInLightbox.relatedProducts.length > 0" class="mb-4 md:mb-6">
						<h3 class="text-base sm:text-lg font-semibold text-sky-300 mb-2.5">搭配的產品系列</h3>
						<div class="space-y-3">
							<div
								v-for="(product, pIndex) in currentSolutionInLightbox.relatedProducts"
								:key="`related-${pIndex}`"
								class="bg-slate-700/70 hover:bg-slate-700 p-3 rounded-lg shadow-md transition-colors duration-200 border border-slate-600/50"
							>
								<p class="text-xs sm:text-sm font-semibold text-sky-200 mb-0.5">{{ product.series }}</p>
								<p class="text-xs sm:text-sm text-gray-300 mb-1.5 leading-snug">{{ product.description }}</p>
								<NuxtLink
									:to="product.link"
									class="text-xs sm:text-sm text-sky-400 hover:text-sky-300 hover:underline focus:outline-none focus:ring-1 focus:ring-sky-300 rounded-sm inline-flex items-center"
									@click="closeLightbox"
								>
									查看系列產品
									<svg xmlns="http://www.w3.org/2000/svg" class="h-3 w-3 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5">
										<path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7" />
									</svg>
								</NuxtLink>
							</div>
						</div>
					</div>

					<!-- CTA Button -->
					<div class="mt-auto pt-4">
						<ButtonCTA label="聯絡我們了解更多" color="white" to="/contact" @click.native="closeLightbox" class="w-full md:w-auto" />
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script setup>
import { ref, onMounted, onUnmounted, nextTick, computed } from "vue";
import { useScrollAnimation } from "@/composables/useScrollAnimation";
import { useHead } from "#app";
import ButtonCTA from "@/components/common/Button-CTA.vue";

// Set page title and meta description
useHead({
	title: " - 智慧方案",
	meta: [
		{
			name: "description",
			content: "探索遠岫科技全方位的智能解決方案，從可視對講、門禁管理到影像監控與安全防護，我們致力於為您的生活與工作空間提供創新技術與卓越品質。"
		}
	]
});

const { initScrollPlugins, createElementEntrance, ScrollTrigger, gsap, cleanupScrollTriggers, isMobile } = useScrollAnimation();

const visionTitleRef = ref(null);
const coreStrengthRefs = ref([]);
const galleryIntroTextRef = ref(null);

const coreStrengths = ref([
	{
		icon: "M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.539 1.118l-3.975-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.196-1.539-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.783-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z",
		title: "卓越品質與創新",
		description: "我們堅持以最高標準打造每一款產品，從精密設計到嚴格測試，確保卓越性能與可靠性。不斷探索前沿技術，將創新融入解決方案，引領行業發展。"
	},
	{
		icon: "M17.207 14.793l-2.5-2.5a1 1 0 00-1.414 0l-7 7a1 1 0 000 1.414l2.5 2.5a1 1 0 001.414 0l7-7a1 1 0 000-1.414zM4 10a3 3 0 116 0H4zM3 18h18M10 21h4",
		title: "全方位整合方案",
		description: "提供從前端感知設備到後端管理平台的一站式解決方案。無論是可視對講、門禁控制還是智能監控，都能無縫整合，打破信息孤島，實現高效協同。"
	},
	{
		icon: "M12 6.253v11.494m0 0a2.5 2.5 0 100 5 2.5 2.5 0 000-5zM6.253 12H17.747m0 0A2.502 2.502 0 1020.25 9.5a2.5 2.5 0 00-2.503 2.5zM3.75 9.5A2.502 2.502 0 101.25 12a2.5 2.5 0 002.503-2.5z",
		title: "多樣化場景賦能",
		description: "深入理解不同行業的獨特需求，我們的產品廣泛應用於智慧社區、現代樓宇、企業園區及公共安全等多種場景，致力於提升各領域的智能化水平與運營效率。"
	}
]);

const solutions = ref([
	{
		id: "smart-property",
		title: "物業管理系統智慧生活",
		shortTitle: "物業管理",
		image: "/solutions/物業管理系統智慧生活.png",
		description:
			"遠岫科技的物業管理系統，透過整合先進的物聯網技術和雲端平台，為現代化物業管理提供全方位的智能解決方案。此系統不僅強化了社區安全，提升了管理效率，更致力於為住戶打造便捷、舒適的智慧生活體驗。我們專注於使用者需求，提供客製化的功能模組，確保系統能完美契合不同規模和型態的社區。",
		relatedProducts: [
			{ series: "智慧社區主機 YS-M800", description: "整合門禁、對講、監控等功能的核心管理設備。", link: "/products/devices-accessories" },
			{ series: "雲端管理平台", description: "提供遠程監控、數據分析、住戶服務的整合平台。", link: "/products/software-platforms" },
			{ series: "行動應用 App", description: "方便住戶進行訪客邀請、費用繳納、公告接收等操作。", link: "/products/software-platforms" }
		]
	},
	{
		id: "video-intercom",
		title: "可視對講系統",
		shortTitle: "可視對講",
		image: "/solutions/可視對講系統.png"
	},
	{
		id: "fire-alarm",
		title: "火災預警系統",
		shortTitle: "火災預警",
		image: "/solutions/火災預警系統.png"
	},
	{
		id: "central-monitoring",
		title: "中央監控",
		shortTitle: "中央監控",
		image: "/solutions/中央監控.png"
	},
	{
		id: "facial-recognition",
		title: "人臉門禁控制(社區)",
		shortTitle: "人臉門禁",
		image: "/solutions/人臉門禁控制(社區).png"
	},
	{
		id: "meeting-booking",
		title: "會議預約系統",
		shortTitle: "會議預約",
		image: "/solutions/會議預約系統.png"
	},
	{
		id: "wireless-security",
		title: "無線保全系統",
		shortTitle: "無線保全",
		image: "/solutions/無線保全系統.png"
	},
	{
		id: "smart-construction",
		title: "智慧工地管理",
		shortTitle: "智慧工地",
		image: "/solutions/智慧工地管理.png"
	},
	{
		id: "visitor-management",
		title: "訪客管理系統",
		shortTitle: "訪客管理",
		image: "/solutions/訪客管理系統.png"
	},
	{
		id: "parking-management",
		title: "停車管理系統",
		shortTitle: "停車管理",
		image: "/solutions/停車管理系統.png"
	},
	{
		id: "long-term-care",
		title: "長照",
		shortTitle: "長照關懷",
		image: "/solutions/長照.png"
	},
	{
		id: "ai-smart-factory",
		title: "AI智慧工廠強化安全與工作流程",
		shortTitle: "智慧工廠",
		image: "/solutions/AI智慧工廠強化安全與工作流程.png"
	}
]);

const galleryContainerToPinRef = ref(null);
const scrollContainerRef = ref(null);
const solutionElements = ref([]);
const currentSectionIndex = ref(0);
const galleryNavSidesRef = ref(null);
const galleryNavLeftRef = ref(null);
const galleryNavRightRef = ref(null);

// --- Lightbox State and Functions ---
const isLightboxOpen = ref(false);
const currentSolutionInLightbox = ref(null);
const closeModalButtonRef = ref(null);
let triggerElementForLightbox = null;

const lightboxTitleId = computed(() =>
	currentSolutionInLightbox.value ? `lightbox-title-${currentSolutionInLightbox.value.id}` : `lightbox-title-default-${Date.now()}`
);

const openLightbox = (solution, eventTarget) => {
	currentSolutionInLightbox.value = solution;
	isLightboxOpen.value = true;
	document.body.style.overflow = "hidden";
	triggerElementForLightbox = eventTarget || document.activeElement;
	nextTick(() => {
		if (closeModalButtonRef.value) {
			closeModalButtonRef.value.focus();
		}
	});
};

const closeLightbox = () => {
	isLightboxOpen.value = false;
	document.body.style.overflow = "";
	if (triggerElementForLightbox && typeof triggerElementForLightbox.focus === "function") {
		triggerElementForLightbox.focus();
	}
	triggerElementForLightbox = null;
	currentSolutionInLightbox.value = null;
};

onMounted(async () => {
	await initScrollPlugins();
	await nextTick();

	// --- Section 1: Vision & Strengths Animation ---
	if (visionTitleRef.value) {
		gsap.from(visionTitleRef.value.children, {
			autoAlpha: 0,
			y: 50,
			duration: 0.8,
			stagger: 0.2,
			ease: "power3.out",
			delay: 0.3
		});
		gsap.to(visionTitleRef.value, { autoAlpha: 1, duration: 0.01, delay: 0.3 });
	}
	coreStrengthRefs.value.forEach((el) => {
		if (el) {
			gsap.from(el, {
				y: 50,
				scale: 0.9
			});
			gsap.to(el, {
				autoAlpha: 1,
				y: 0,
				scale: 1,
				duration: 0.7,
				ease: "power2.out",
				scrollTrigger: {
					trigger: el,
					start: "top 85%",
					toggleActions: "play none none none"
				}
			});
		}
	});

	if (galleryIntroTextRef.value) {
		gsap.from(galleryIntroTextRef.value.children, {
			autoAlpha: 0,
			y: 40,
			duration: 0.7,
			ease: "power2.out",
			stagger: 0.15,
			scrollTrigger: {
				trigger: galleryIntroTextRef.value,
				start: "top 90%",
				toggleActions: "play none none none"
			}
		});
		gsap.to(galleryIntroTextRef.value, {
			autoAlpha: 1,
			duration: 0.01,
			scrollTrigger: {
				trigger: galleryIntroTextRef.value,
				start: "top 90%",
				toggleActions: "play none none none"
			}
		});
	}

	// --- Section 2: Gallery Scroll Animation ---
	if (!galleryContainerToPinRef.value || !scrollContainerRef.value || solutionElements.value.length === 0) {
		console.error("滾動容器、主容器或解決方案元素未找到");
	} else {
		const sections = solutionElements.value.filter((el) => el);
		if (sections.length > 0) {
			if (!isMobile.value) {
				// --- DESKTOP SPECIFIC ---
				console.log("[Desktop Init] Setting up horizontal scroll and animations.");
				gsap.to(sections, {
					xPercent: -100 * (sections.length - 1),
					ease: "none",
					scrollTrigger: {
						id: "horizontalGalleryScroll",
						trigger: galleryContainerToPinRef.value,
						pin: galleryContainerToPinRef.value,
						scrub: 1,
						start: "top top",
						end: () => `+=${galleryContainerToPinRef.value.offsetWidth * (sections.length > 1 ? sections.length - 1 : 0)}`,
						snap:
							sections.length > 1
								? {
										snapTo: 1 / (sections.length - 1),
										duration: { min: 0.2, max: 0.8 },
										delay: 0.1,
										ease: "power1.inOut"
								  }
								: false,
						onUpdate: (self) => {
							if (sections.length > 1) {
								const progress = Math.round(self.progress * (sections.length - 1));
								if (currentSectionIndex.value !== progress) {
									currentSectionIndex.value = progress;
								}
							} else {
								currentSectionIndex.value = 0;
							}
						},
						invalidateOnRefresh: true
					}
				});

				sections.forEach((section) => {
					const image = section.querySelector(".solution-image");
					if (image) {
						createElementEntrance({
							elements: image,
							trigger: section,
							start: "left 75%",
							end: "right 25%",
							horizontal: true,
							fromOpacity: 0,
							fromScale: 0.85,
							toOpacity: 1,
							toScale: 1,
							duration: 0.7,
							toggleActions: "play resume resume reverse"
						});
					}
				});

				if (galleryNavSidesRef.value && galleryNavLeftRef.value && galleryNavRightRef.value) {
					gsap.set(galleryNavSidesRef.value, { autoAlpha: 1, delay: 0.1 });
					gsap.from(galleryNavLeftRef.value, {
						xPercent: -120,
						autoAlpha: 0,
						duration: 0.8,
						ease: "power3.out",
						scrollTrigger: {
							trigger: galleryContainerToPinRef.value,
							start: "top 60%",
							end: "top 30%",
							toggleActions: "play none none reverse"
						}
					});
					gsap.from(galleryNavRightRef.value, {
						xPercent: 120,
						autoAlpha: 0,
						duration: 0.8,
						ease: "power3.out",
						scrollTrigger: {
							trigger: galleryContainerToPinRef.value,
							start: "top 60%",
							end: "top 30%",
							toggleActions: "play none none reverse"
						}
					});
				}
			} else {
				// --- MOBILE SPECIFIC ---
				console.log("[Mobile Init] Setting up vertical scroll related animations.");
				gsap.set(sections, { clearProps: "xPercent,x" });
				if (galleryContainerToPinRef.value && galleryContainerToPinRef.value.style) gsap.set(galleryContainerToPinRef.value, { clearProps: "cssText" });

				sections.forEach((section) => {
					const image = section.querySelector(".solution-image");
					if (image) {
						createElementEntrance({
							elements: image,
							trigger: section,
							start: "top 85%",
							end: "bottom 15%",
							fromOpacity: 0,
							fromScale: 0.9,
							toOpacity: 1,
							toScale: 1,
							duration: 0.6,
							toggleActions: "play none none none"
						});
					}
				});
				if (galleryNavSidesRef.value) {
					galleryNavSidesRef.value.style.opacity = "1";
				}
			}
		}
	}

	if (isLightboxOpen.value) {
		document.body.style.overflow = "";
		currentSolutionInLightbox.value = null;
	}
});

const navigateToSection = (index) => {
	console.log(`[Navigation] navigateToSection called with index: ${index}`);
	currentSectionIndex.value = index;

	if (isMobile.value) {
		const targetElement = solutionElements.value[index];
		if (targetElement) {
			console.log("[Mobile Navigate] Scrolling to element:", targetElement);
			let offsetY = 0;
			const stickyNav = document.querySelector(".gallery-navigation-sides");
			if (stickyNav && getComputedStyle(stickyNav).position === "sticky") {
				offsetY = stickyNav.offsetHeight;
			}
			console.log(`[Mobile Navigate] Sticky nav height (offsetY): ${offsetY}`);

			gsap.to(window, {
				scrollTo: {
					y: targetElement.offsetTop - offsetY,
					autoKill: true
				},
				duration: 0.8,
				ease: "power2.inOut",
				onComplete: () => {
					console.log("[Mobile Navigate] Scroll complete to Y:", targetElement.offsetTop - offsetY);
				}
			});
		} else {
			console.error("[Mobile Navigate] Target element not found for index:", index);
		}
		return;
	}

	// --- Desktop Logic ---
	if (!ScrollTrigger.value || !gsap || !galleryContainerToPinRef.value) {
		console.error("[Desktop Navigate] ScrollTrigger, GSAP, or galleryContainerToPinRef not available.");
		return;
	}
	if (solutions.value.length <= 1) {
		console.log("[Desktop Navigate] Only one or no solutions, navigation skipped.");
		return;
	}

	const stInstance = ScrollTrigger.value.getById("horizontalGalleryScroll");
	console.log("[Desktop Navigate] ScrollTrigger instance:", stInstance);

	if (stInstance) {
		const progress = solutions.value.length > 1 ? index / (solutions.value.length - 1) : 0;
		const targetScrollY = stInstance.start + progress * (stInstance.end - stInstance.start);
		console.log(`[Desktop Navigate] Calculated progress: ${progress}, targetScrollY: ${targetScrollY}`);

		gsap.to(window, {
			scrollTo: {
				y: targetScrollY,
				autoKill: true
			},
			duration: 1,
			ease: "power2.inOut",
			onComplete: () => {
				console.log("[Desktop Navigate] Scroll complete. Refreshing ScrollTrigger.");
				ScrollTrigger.value.refresh();
			}
		});
	} else {
		console.warn("[Desktop Navigate] ScrollTrigger instance 'horizontalGalleryScroll' not found.");
	}
};

onUnmounted(() => {
	cleanupScrollTriggers();
	if (isLightboxOpen.value) {
		document.body.style.overflow = "";
	}
});
</script>

<style scoped>
.product-gallery-container {
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	min-height: 100vh;
	overflow: hidden;
	color: #f0f0f0;
}

.gallery-scroll-container {
	display: flex;
	width: 100%;
	overflow: hidden;
	position: relative;
}

.solution-section {
	width: 100vw;
	height: 100%;
	flex-shrink: 0;
	display: flex;
	align-items: center;
	justify-content: center;
	padding: 40px;
	box-sizing: border-box;
	position: relative;
	overflow: hidden;
}

.solution-content {
	display: flex;
	align-items: center;
	justify-content: space-around;
	width: 100%;
	max-width: 1920px;
	gap: 40px;
}

.image-container {
	flex: 1;
	display: flex;
	justify-content: center;
	align-items: center;
	max-width: 50%;
}

.solution-image {
	max-width: 100%;
	max-height: 70vh;
	object-fit: contain;
	border-radius: 10px;
	box-shadow: 0 10px 30px rgba(0, 0, 0, 0.5);
}

.gallery-navigation-sides {
	position: fixed;
	top: 50%;
	left: 0;
	right: 0;
	transform: translateY(-50%);
	display: flex;
	justify-content: space-between;
	padding: 0 30px;
	z-index: 10;
	pointer-events: none;
	opacity: 0;
}

.gallery-navigation-left,
.gallery-navigation-right {
	display: flex;
	flex-direction: column;
	gap: 10px;
	pointer-events: auto;
	position: relative;
}

.gallery-navigation-left::before,
.gallery-navigation-right::before {
	content: "";
	position: absolute;
	top: 50%;
	width: 200px;
	height: 120%;
	background: radial-gradient(ellipse at center, rgba(70, 130, 180, 0.12), transparent 70%);
	border-radius: 50%;
	z-index: -1;
	opacity: 0.6;
}

.gallery-navigation-left::before {
	left: 50%;
	transform: translate(-55%, -50%) rotate(-10deg);
}

.gallery-navigation-right::before {
	right: 50%;
	transform: translate(55%, -50%) rotate(10deg);
}

.gallery-navigation-left button,
.gallery-navigation-right button {
	--pop-out-x: 0px;
	--pop-out-scale: 1;
	--hover-scale: 1;
	background-color: rgba(25, 35, 45, 0.65);
	color: #d0d0d0;
	border: 1px solid rgba(100, 116, 139, 0.4);
	padding: 10px 15px;
	border-radius: 8px;
	cursor: pointer;
	transition: background-color 0.3s, color 0.3s, border-color 0.3s, transform 0.3s ease-out, box-shadow 0.3s ease-out;
	font-size: 0.9em;
	text-align: center;
	box-shadow: 0 1px 3px rgba(0, 0, 0, 0.3);
	min-width: 120px;
}

.gallery-navigation-left button:hover,
.gallery-navigation-right button:hover {
	--hover-scale: 1.08;
	background-color: rgba(45, 55, 70, 0.75);
	color: #ffffff;
	border-color: rgba(120, 136, 159, 0.5);
}

.gallery-navigation-left button.active,
.gallery-navigation-right button.active {
	--pop-out-x: 18px;
	--pop-out-scale: 1.1;
	background-color: #007aff;
	color: #ffffff;
	border-color: #0056b3;
	font-weight: bold;
	box-shadow: 0 0 15px rgba(0, 123, 255, 0.6), 0 0 8px rgba(0, 123, 255, 0.4);
	z-index: 2;
}

.gallery-navigation-left button:nth-child(1) {
	transform: rotate(-12deg) translateX(calc(-18px + var(--pop-out-x))) translateY(-35px) scale(calc(var(--pop-out-scale) * var(--hover-scale)));
}
.gallery-navigation-left button:nth-child(2) {
	transform: rotate(-8deg) translateX(calc(-12px + var(--pop-out-x))) translateY(-15px) scale(calc(var(--pop-out-scale) * var(--hover-scale)));
}
.gallery-navigation-left button:nth-child(3) {
	transform: rotate(-3deg) translateX(calc(-5px + var(--pop-out-x))) translateY(0px) scale(calc(var(--pop-out-scale) * var(--hover-scale)));
}
.gallery-navigation-left button:nth-child(4) {
	transform: rotate(3deg) translateX(calc(-5px + var(--pop-out-x))) translateY(15px) scale(calc(var(--pop-out-scale) * var(--hover-scale)));
}
.gallery-navigation-left button:nth-child(5) {
	transform: rotate(8deg) translateX(calc(-12px + var(--pop-out-x))) translateY(30px) scale(calc(var(--pop-out-scale) * var(--hover-scale)));
}
.gallery-navigation-left button:nth-child(6) {
	transform: rotate(12deg) translateX(calc(-18px + var(--pop-out-x))) translateY(45px) scale(calc(var(--pop-out-scale) * var(--hover-scale)));
}

.gallery-navigation-right button:nth-child(1) {
	transform: rotate(12deg) translateX(calc(18px - var(--pop-out-x))) translateY(-35px) scale(calc(var(--pop-out-scale) * var(--hover-scale)));
}
.gallery-navigation-right button:nth-child(2) {
	transform: rotate(8deg) translateX(calc(12px - var(--pop-out-x))) translateY(-15px) scale(calc(var(--pop-out-scale) * var(--hover-scale)));
}
.gallery-navigation-right button:nth-child(3) {
	transform: rotate(3deg) translateX(calc(5px - var(--pop-out-x))) translateY(0px) scale(calc(var(--pop-out-scale) * var(--hover-scale)));
}
.gallery-navigation-right button:nth-child(4) {
	transform: rotate(-3deg) translateX(calc(5px - var(--pop-out-x))) translateY(15px) scale(calc(var(--pop-out-scale) * var(--hover-scale)));
}
.gallery-navigation-right button:nth-child(5) {
	transform: rotate(-8deg) translateX(calc(12px - var(--pop-out-x))) translateY(30px) scale(calc(var(--pop-out-scale) * var(--hover-scale)));
}
.gallery-navigation-right button:nth-child(6) {
	transform: rotate(-12deg) translateX(calc(18px - var(--pop-out-x))) translateY(45px) scale(calc(var(--pop-out-scale) * var(--hover-scale)));
}

@media (max-width: 768px) {
	.product-gallery-container {
		display: block;
		min-height: auto;
		overflow: visible;
	}

	.gallery-scroll-container {
		display: block;
		width: 100%;
		overflow: visible;
		position: static;
	}

	.solution-section {
		padding: 20px;
		width: 100%;
		flex-shrink: 1;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		box-sizing: border-box;
		position: static;
		height: auto;
		margin-bottom: 20px;
	}

	.solution-content {
		flex-direction: column;
		text-align: center;
		gap: 20px;
	}

	.image-container {
		max-width: 90%;
	}

	.solution-image {
		max-height: 40vh;
	}

	.gallery-navigation-sides {
		position: sticky;
		top: 0;
		transform: none;
		flex-direction: row;
		padding: 12px;
		background-color: rgba(10, 20, 30, 0.9);
		overflow-x: auto;
		overflow-y: hidden;
		justify-content: flex-start;
		width: 100%;
		z-index: 20;
		gap: 8px;
		flex-wrap: nowrap;
		pointer-events: auto;
		opacity: 1;
	}

	.gallery-navigation-left::before,
	.gallery-navigation-right::before {
		display: none;
	}

	.gallery-navigation-left,
	.gallery-navigation-right {
		flex-direction: row;
		gap: 12px;
		display: contents;
		opacity: 1 !important;
		visibility: visible !important;
		transform: none !important;
	}

	.gallery-navigation-left button,
	.gallery-navigation-right button {
		transform: none !important;
		padding: 8px 12px;
		margin: 0;
		white-space: nowrap;
		background-color: rgba(25, 35, 45, 0.65);
		color: #d0d0d0;
		border: 1px solid rgba(100, 116, 139, 0.4);
		border-radius: 8px;
		box-shadow: 0 1px 3px rgba(0, 0, 0, 0.3);
		text-align: center;
		transition: background-color 0.3s, color 0.3s, border-color 0.3s, box-shadow 0.3s;
	}

	.gallery-navigation-left button:hover,
	.gallery-navigation-right button:hover {
		background-color: rgba(45, 55, 70, 0.75);
		color: #ffffff;
		border-color: rgba(120, 136, 159, 0.5);
		transform: none !important;
	}

	.gallery-navigation-left button.active,
	.gallery-navigation-right button.active {
		background-color: #007aff;
		color: #ffffff;
		border-color: #0056b3;
		font-weight: bold;
		box-shadow: 0 0 15px rgba(0, 123, 255, 0.6), 0 0 8px rgba(0, 123, 255, 0.4);
		z-index: 2;
	}
}

.solution-image.cursor-pointer {
	cursor: zoom-in;
}

/* Lightbox Styles */
.lightbox-content-wrapper {
	position: relative;
}

.custom-scrollbar::-webkit-scrollbar {
	width: 6px;
	height: 6px;
}
.custom-scrollbar::-webkit-scrollbar-track {
	background: transparent;
}
.custom-scrollbar::-webkit-scrollbar-thumb {
	background: #475569;
	border-radius: 3px;
}
.custom-scrollbar::-webkit-scrollbar-thumb:hover {
	background: #334155;
}
.custom-scrollbar {
	scrollbar-width: thin;
	scrollbar-color: #475569 transparent;
}
</style>
