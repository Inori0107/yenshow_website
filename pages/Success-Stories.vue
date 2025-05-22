<template>
	<div>
		<!-- Entrance -->
		<nav class="h-screen container flex flex-col justify-center relative">
			<!-- 標題 -->
			<div class="z-10 mb-12" ref="titleRef">
				<h1 class="text-[24px] md:text-[48px] lg:text-[64px] text-secondary">合作案例</h1>
			</div>

			<!-- 標語區塊 -->
			<div class="flex flex-col md:flex-row gap-8 md:gap-6 z-10" ref="heroBlocks">
				<!-- 主標語區塊 -->
				<div class="block-bg w-full md:w-1/2 rounded-xl p-6 md:p-8 transition-all duration-500">
					<div class="absolute inset-0 rounded-xl overflow-hidden">
						<div class="block-pattern pattern-1"></div>
					</div>
					<div class="relative z-10">
						<div class="text-[16px] md:text-[18px] text-white/70 mb-2">OUR MISSION</div>
						<h4 class="text-[20px] md:text-[28px] text-white font-medium mb-4">以創新科技提供多元解決方案<br />推動智能安全與管理系統的全面應用</h4>
						<p class="text-[14px] md:text-[16px] lg:text-[18px] text-white/80">
							我們致力於結合先進技術和本地化服務，為客戶提供高度整合、高效且可靠的系統支持。通過不斷提升技術能力和深入了解客戶需求，遠岫科技目標成為亞太地區值得信賴的夥伴，推動產業轉型，提升整體安全與管理效能，並為社會創造更安全、更智慧的生活環境。
						</p>
					</div>
				</div>

				<!-- 數據統計區塊 -->
				<div class="flex flex-col gap-4 md:w-1/2">
					<!-- 合作夥伴 -->
					<div class="block-bg rounded-xl p-6 transition-all duration-500" ref="partnersSectionRef">
						<div class="absolute inset-0 rounded-xl overflow-hidden">
							<div class="block-pattern"></div>
						</div>
						<div class="relative z-10">
							<div>
								<div class="text-[24px] md:text-[32px] text-white font-bold text-center">合作夥伴</div>
							</div>
							<div class="logo-carousel-container">
								<div class="logo-track flex items-center h-full" ref="logoTrackRef">
									<!-- Logos duplicated for seamless loop -->
									<img v-for="(logo, index) in partnerLogos" :key="'logo-a-' + index" :src="logo.src" :alt="logo.alt" class="partner-logo" />
									<img v-for="(logo, index) in partnerLogos" :key="'logo-b-' + index" :src="logo.src" :alt="logo.alt" class="partner-logo" />
								</div>
							</div>
						</div>
					</div>
					<!-- 成功案例 -->
					<div class="block-bg rounded-xl p-6 transition-all duration-500">
						<div class="absolute inset-0 rounded-xl overflow-hidden">
							<div class="block-pattern pattern-2"></div>
						</div>
						<div class="relative z-10">
							<div>
								<div class="text-[24px] md:text-[32px] text-white font-bold text-center">成功案例</div>
							</div>
							<div class="grid grid-cols-3 gap-2 md:gap-4 text-center">
								<div>
									<div class="text-[28px] md:text-[36px] text-white font-bold">50+</div>
									<div class="text-[12px] md:text-[14px] text-white/70">成功專案</div>
								</div>
								<div>
									<div class="text-[28px] md:text-[36px] text-white font-bold">10+</div>
									<div class="text-[12px] md:text-[14px] text-white/70">年行業經驗</div>
								</div>
								<div>
									<div class="text-[28px] md:text-[36px] text-white font-bold">98%</div>
									<div class="text-[12px] md:text-[14px] text-white/70">客戶滿意度</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</nav>

		<!-- 合作夥伴 -->
		<div class="bg-primary rounded-[100px] p-12">
			<section ref="sectionRef" class="relative min-h-screen">
				<!-- 企業與商業合作 -->
				<article ref="businessRef" class="absolute inset-0 flex flex-col justify-center items-center">
					<h4 class="text-[24px] md:text-[48px] lg:text-[64px] text-secondary text-center mb-12">企業與商業合作</h4>
					<div class="grid grid-cols-1 lg:grid-cols-3 gap-8 place-items-center">
						<!-- 卡片容器 -->
						<div
							v-for="(feature, index) in business_feature"
							:key="index"
							class="card-container w-[260px] h-[360px] sm:w-[280px] sm:h-[390px] md:w-[300px] md:h-[420px] lg:w-[320px] lg:h-[440px] perspective group cursor-pointer transition-all duration-300 ease-out hover:shadow-xl hover:-translate-y-1.5 hover:scale-[1.03]"
							@click="toggleFlip('business', index)"
						>
							<div
								class="card-inner w-full h-full relative text-center transition-transform duration-500 ease-in-out transform-style-preserve-3d"
								:class="{ 'is-flipped': flippedCards[`business-${index}`] }"
							>
								<!-- 卡片正面 -->
								<div
									class="card-face card-front absolute w-full h-full backface-hidden bg-neutral-800 text-white p-4 sm:p-6 rounded-xl flex flex-col justify-center items-center shadow-lg"
								>
									<h5 class="text-md sm:text-lg md:text-xl lg:text-2xl font-semibold mb-3">{{ feature.title }}</h5>
									<p class="text-xs sm:text-sm md:text-base lg:text-lg">{{ feature.pain_point }}</p>
									<span class="text-xs mt-4 opacity-70">點擊查看方案</span>
								</div>
								<!-- 卡片背面 -->
								<div
									class="card-face card-back absolute w-full h-full backface-hidden bg-primary text-secondary p-4 sm:p-6 rounded-xl flex flex-col justify-center items-center shadow-lg transform rotate-y-180"
								>
									<img :src="feature.image" alt="feature" class="w-[60px] sm:w-[80px] lg:w-[100px] aspect-square mb-2 sm:mb-4" />
									<h5 class="text-sm sm:text-base md:text-lg lg:text-xl font-semibold">{{ feature.title }}</h5>
									<p class="text-xs sm:text-sm md:text-base">{{ feature.description }}</p>
								</div>
							</div>
						</div>
					</div>
				</article>

				<!-- 公共與專業場域支援 -->
				<article ref="publicRef" class="absolute inset-0 flex flex-col justify-center items-center opacity-0">
					<h4 class="text-[24px] md:text-[48px] lg:text-[64px] text-secondary text-center mb-12">公共與專業場域支援</h4>
					<div class="grid grid-cols-1 lg:grid-cols-2 gap-8 place-items-center">
						<!-- 卡片容器 -->
						<div
							v-for="(feature, index) in public_feature"
							:key="index"
							class="card-container w-[280px] h-[390px] sm:w-[300px] sm:h-[420px] md:w-[330px] md:h-[450px] lg:w-[360px] lg:h-[480px] perspective group cursor-pointer transition-all duration-300 ease-out hover:shadow-xl hover:-translate-y-1.5 hover:scale-[1.03]"
							@click="toggleFlip('public', index)"
						>
							<div
								class="card-inner w-full h-full relative text-center transition-transform duration-500 ease-in-out transform-style-preserve-3d"
								:class="{ 'is-flipped': flippedCards[`public-${index}`] }"
							>
								<!-- 卡片正面 -->
								<div
									class="card-face card-front absolute w-full h-full backface-hidden bg-neutral-800 text-white p-4 sm:p-6 rounded-xl flex flex-col justify-center items-center shadow-lg"
								>
									<h5 class="text-md sm:text-lg md:text-xl lg:text-2xl font-semibold mb-3">{{ feature.title }}</h5>
									<p class="text-xs sm:text-sm md:text-base lg:text-lg">{{ feature.pain_point }}</p>
									<span class="text-xs mt-4 opacity-70">點擊查看方案</span>
								</div>
								<!-- 卡片背面 -->
								<div
									class="card-face card-back absolute w-full h-full backface-hidden bg-primary text-secondary p-4 sm:p-6 rounded-xl flex flex-col justify-center items-center shadow-lg transform rotate-y-180"
								>
									<img :src="feature.image" alt="feature" class="w-[60px] sm:w-[80px] lg:w-[100px] aspect-square mb-2 sm:mb-4" />
									<h5 class="text-sm sm:text-base md:text-lg lg:text-xl font-semibold">{{ feature.title }}</h5>
									<p class="text-xs sm:text-sm md:text-base">{{ feature.description }}</p>
								</div>
							</div>
						</div>
					</div>
				</article>
			</section>
		</div>

		<!-- Success Cases Section -->
		<section class="min-h-screen flex flex-col justify-center">
			<!-- Light background -->
			<div class="container mx-auto px-4">
				<h2 class="text-3xl md:text-5xl font-semibold text-center mb-12 md:mb-16 text-secondary">實績案例</h2>

				<!-- Single Case Example -->
				<div
					class="flex flex-col md:flex-row items-center gap-8 md:gap-12 bg-white p-8 md:p-12 rounded-2xl shadow-lg relative overflow-hidden border border-gray-100"
				>
					<!-- Left Column: Text Details -->
					<div class="w-full md:w-1/2 space-y-6 z-10 order-2 md:order-1">
						<h3 class="text-2xl md:text-3xl font-bold text-neutral-800">合總君悅</h3>
						<p class="text-lg md:text-xl text-neutral-600">集合式住宅建案</p>
						<div class="border-l-4 border-blue-500 pl-4 space-y-2 text-gray-700">
							<p><strong class="font-medium text-gray-800">基地位置：</strong> 雲林縣斗南鎮</p>
							<p><strong class="font-medium text-gray-800">基地面積：</strong> 541坪</p>
							<p><strong class="font-medium text-gray-800">戶數：</strong> 91戶、2戶店鋪</p>
						</div>
						<p class="text-sm md:text-base text-gray-600 leading-relaxed bg-gray-50 p-4 rounded-md border border-gray-200">
							該項目使用遠岫全住可視對講系統，採用10寸室內機YS-9510，4.3吋人臉辨識住戶門口機，整社區人臉辨識通行不須再攜帶磁卡。其他配套產品包含：視頻監控前後端產品、傳輸、門禁、集中管理平臺軟體。
						</p>
					</div>

					<!-- Right Column: Image -->
					<div class="w-full md:w-1/2 z-10 order-1 md:order-2"></div>

					<!-- Pagination Dots (Simple) -->
					<div class="absolute bottom-6 right-8 flex space-x-2 z-10">
						<span class="w-3 h-3 bg-blue-500 rounded-full cursor-pointer"></span>
						<span class="w-3 h-3 bg-gray-300 rounded-full cursor-pointer hover:bg-gray-400 transition-colors"></span>
						<span class="w-3 h-3 bg-gray-300 rounded-full cursor-pointer hover:bg-gray-400 transition-colors"></span>
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
	title: " - 合作案例",
	meta: [{ name: "description", content: "查看遠岫科技在不同行業的成功合作案例，了解我們如何以創新科技推動智能安全與管理系統的全面應用。" }]
});

// --- Refs for Entrance Animation ---
const titleRef = ref(null);
const heroBlocks = ref(null);

// --- Refs for ScrollTrigger Animation ---
const sectionRef = ref(null);
const businessRef = ref(null);
const publicRef = ref(null);

// --- Refs for Partner Logo Carousel ---
const partnersSectionRef = ref(null);
const logoTrackRef = ref(null);
let logoScrollAnimation = null; // 用於保存GSAP動畫實例

const business_feature = ref([
	{
		pain_point: "整合多種弱電系統是否讓您頭痛不已？",
		title: "系統整合商",
		description: "為弱電合作夥伴提供高規格、安全的產品和服務。",
		image: "/corporation/Networking Manager.svg"
	},
	{
		pain_point: "如何滿足品牌客戶多變且客製化的需求？",
		title: "品牌客戶",
		description: "與知名品牌合作，客製化需求，以專業性達到客戶需求。",
		image: "/corporation/customers.svg"
	},
	{
		pain_point: "傳統門禁考勤是否已無法滿足現代企業的高效管理？",
		title: "公司行號",
		description: "為企業提供安全便利的門禁考勤解決方案",
		image: "/corporation/company.svg"
	}
]);

const public_feature = ref([
	{
		pain_point: "如何在眾多建案中脫穎而出，提升銷售吸引力？",
		title: "建設公司",
		description: "提供完整弱電系統規劃，新穎設備提高銷售機會",
		image: "/corporation/building.svg"
	},
	{
		pain_point: "醫療院所對安全與管理有著極高標準，如何應對？",
		title: "醫療院所",
		description: "提供醫療機構的安全解決方案，包括醫院、診所等。",
		image: "/corporation/hospital.svg"
	},
	{
		pain_point: "校園安全事件頻傳，如何打造更安全的學習環境？",
		title: "學校",
		description: "提供學校安全解決方案，包括學校、幼兒園等。",
		image: "/corporation/school.svg"
	},
	{
		pain_point: "公家機關資訊安全與進出管理是否讓您感到挑戰？",
		title: "公家機關",
		description: "與政府機構合作，提供安全技術解決方案。",
		image: "/corporation/government.svg"
	}
]);

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

onMounted(async () => {
	await nextTick();

	// --- Initialize Scroll Animation Composable ---
	const { initScrollPlugins, isMobile } = useScrollAnimation();
	await initScrollPlugins(); // 等待 GSAP 和 ScrollTrigger 初始化

	// --- Entrance Animation ---
	if (titleRef.value && heroBlocks.value) {
		gsap.set(titleRef.value, { autoAlpha: 0, y: 30 });
		gsap.set(heroBlocks.value.children, { autoAlpha: 0, y: 30 });

		const entranceTl = gsap.timeline({ delay: 0.2 }); // Add a small delay
		entranceTl
			.to(titleRef.value, { autoAlpha: 1, y: 0, duration: 0.8, ease: "power2.out" })
			.to(heroBlocks.value.children, { autoAlpha: 1, y: 0, duration: 0.6, stagger: 0.2, ease: "power2.out" }, "-=0.4"); // Start slightly before title finishes
	}

	// --- Partner Logo Carousel Animation ---
	if (logoTrackRef.value && partnersSectionRef.value && partnerLogos.value.length > 0) {
		const logos = logoTrackRef.value.querySelectorAll(".partner-logo");
		let totalWidth = 0;
		// 等待所有圖片加載完成
		const imageLoadPromises = Array.from(logos)
			.slice(0, partnerLogos.value.length)
			.map((img) => {
				return new Promise((resolve) => {
					if (img.complete) {
						totalWidth += img.offsetWidth + parseInt(getComputedStyle(img).marginRight);
						resolve();
					} else {
						img.onload = () => {
							totalWidth += img.offsetWidth + parseInt(getComputedStyle(img).marginRight);
							resolve();
						};
						img.onerror = resolve; // 即使圖片加載失敗也繼續
					}
				});
			});

		await Promise.all(imageLoadPromises);

		if (totalWidth > 0) {
			const animationDuration = totalWidth / (isMobile.value ? 30 : 50); // 根據總寬度和屏幕調整速度

			logoScrollAnimation = gsap.to(logoTrackRef.value, {
				xPercent: -50, // 因為我們複製了logo，所以移動50%就是一組的寬度
				ease: "none",
				duration: animationDuration,
				repeat: -1,
				paused: true // 初始時暫停
			});

			ScrollTrigger.create({
				trigger: partnersSectionRef.value,
				start: "top bottom", // 當區塊頂部接觸視窗底部時
				end: "bottom top", // 當區塊底部接觸視窗頂部時
				onEnter: () => logoScrollAnimation && logoScrollAnimation.play(),
				onLeave: () => logoScrollAnimation && logoScrollAnimation.pause(),
				onEnterBack: () => logoScrollAnimation && logoScrollAnimation.play(),
				onLeaveBack: () => logoScrollAnimation && logoScrollAnimation.pause(),
				invalidateOnRefresh: true // 確保在 resize 時重新計算
			});
		}
	}

	// --- ScrollTrigger Animations ---
	// 使用可選鏈 ?. 增加安全性
	const businessTitle = businessRef.value?.querySelector("h4");
	const businessFeatures = businessRef.value?.querySelectorAll(".card-container");
	const publicTitle = publicRef.value?.querySelector("h4");
	const publicFeatures = publicRef.value?.querySelectorAll(".card-container");

	// 檢查必要的 refs 和元素是否存在
	if (!sectionRef.value || !businessRef.value || !publicRef.value || !businessTitle || !publicTitle) {
		console.error("GSAP 動畫所需的元素未在 DOM 中找到。");
		return; // 如果缺少關鍵元素則退出
	}

	ScrollTrigger.matchMedia({
		// --- 大螢幕 (>= 768px) ---
		"(min-width: 768px)": function () {
			// --- 初始狀態設定 ---
			gsap.set(businessRef.value, { autoAlpha: 1 });
			gsap.set(publicRef.value, { autoAlpha: 0 });

			// 確保 features 存在再設定
			const allFeaturesExist = businessFeatures?.length && publicFeatures?.length;
			const elementsToSet = allFeaturesExist ? [businessTitle, ...businessFeatures, publicTitle, ...publicFeatures] : [businessTitle, publicTitle];
			gsap.set(elementsToSet, { autoAlpha: 0, y: 30 });

			// --- 主時間軸設定 ---
			const tl = gsap.timeline({
				scrollTrigger: {
					trigger: sectionRef.value,
					start: "top top",
					end: "+=350%",
					scrub: 1,
					pin: true,
					markers: false // 除非需要調試，否則保持 false
				}
			});

			// --- 動畫序列編排 ---
			// 檢查 features 是否存在
			if (businessFeatures?.length) {
				tl.to(businessTitle, { autoAlpha: 1, y: 0, duration: 1, ease: "power2.out" })
					.to(businessFeatures, { autoAlpha: 1, y: 0, stagger: 0.3, duration: 1, ease: "power2.out" }, "-=0.5")
					.to(businessTitle, { autoAlpha: 0, y: -30, duration: 1, ease: "power2.in" }, "+=1") // 增加顯示時間
					.to(businessFeatures, { autoAlpha: 0, y: -30, stagger: 0.2, duration: 1, ease: "power2.in" }, "<"); // 同步開始淡出 features
			} else {
				// 如果 features 不存在時的備案
				tl.to(businessTitle, { autoAlpha: 1, y: 0, duration: 1, ease: "power2.out" }).to(
					businessTitle,
					{ autoAlpha: 0, y: -30, duration: 1, ease: "power2.in" },
					"+=1.5"
				); // 調整時間
			}

			// 將 businessRef 隱藏，publicRef 顯示
			// 使用 "<" 確保與上一個動畫的結束同步或稍微提前
			tl.set(businessRef.value, { autoAlpha: 0 }, "<+0.8") // 在 features 完全淡出後再隱藏 businessRef
				.set(publicRef.value, { autoAlpha: 1 }, "<"); // 同步顯示 publicRef

			// 淡入 Public 區塊
			if (publicFeatures?.length) {
				tl.to(publicTitle, { autoAlpha: 1, y: 0, duration: 1, ease: "power2.out" }, "<") // 與 set 同步開始
					.to(publicFeatures, { autoAlpha: 1, y: 0, stagger: 0.3, duration: 1, ease: "power2.out" }, "-=0.5");
			} else {
				tl.to(publicTitle, { autoAlpha: 1, y: 0, duration: 1, ease: "power2.out" }, "<");
			}

			// 返回清理函數
			return () => {
				if (tl && tl.scrollTrigger) {
					tl.scrollTrigger.kill();
				}
				if (tl) tl.kill();
				// 重置樣式，避免影響手機版佈局
				gsap.set(elementsToSet, { clearProps: "all" });
				gsap.set([businessRef.value, publicRef.value], { clearProps: "all" });
			};
		},

		// --- 小螢幕 (< 768px) ---
		"(max-width: 767px)": function () {
			const mobileTriggers = []; // 用於收集手機版的 ScrollTriggers

			// 初始狀態設定 (手機版)
			gsap.set([businessRef.value, publicRef.value], { autoAlpha: 1 }); // 容器可見

			const allFeaturesExist = businessFeatures?.length && publicFeatures?.length;
			const elementsToSet = allFeaturesExist ? [businessTitle, ...businessFeatures, publicTitle, ...publicFeatures] : [businessTitle, publicTitle];
			gsap.set(elementsToSet, { autoAlpha: 0, y: 20 }); // 內容準備進場

			// 為 Business 區塊創建簡單進場動畫
			const businessTl = gsap.timeline({ paused: true });
			businessTl.to(businessTitle, { autoAlpha: 1, y: 0, duration: 0.6 });
			if (businessFeatures?.length) {
				businessTl.to(businessFeatures, { autoAlpha: 1, y: 0, stagger: 0.15, duration: 0.5 }, "-=0.3");
			}

			mobileTriggers.push(
				ScrollTrigger.create({
					trigger: businessRef.value,
					start: "top 85%",
					animation: businessTl,
					toggleActions: "play none none none", // 進入時播放一次
					once: true // 確保只觸發一次
				})
			);

			// 為 Public 區塊創建簡單進場動畫
			const publicTl = gsap.timeline({ paused: true });
			publicTl.to(publicTitle, { autoAlpha: 1, y: 0, duration: 0.6 });
			if (publicFeatures?.length) {
				publicTl.to(publicFeatures, { autoAlpha: 1, y: 0, stagger: 0.15, duration: 0.5 }, "-=0.3");
			}

			mobileTriggers.push(
				ScrollTrigger.create({
					trigger: publicRef.value,
					start: "top 85%",
					animation: publicTl,
					toggleActions: "play none none none",
					once: true
				})
			);

			// 返回清理函數
			return () => {
				mobileTriggers.forEach((trigger) => trigger.kill());
				if (businessTl) businessTl.kill();
				if (publicTl) publicTl.kill();
				// 重置樣式
				gsap.set(elementsToSet, { clearProps: "all" });
				gsap.set([businessRef.value, publicRef.value], { clearProps: "all" });
			};
		},

		// --- 通用設定 (可選) ---
		all: function () {
			// 這裡可以放所有螢幕尺寸都需要的設定 (如果有的話)
		}
	});

	// 選項：可以在稍後強制刷新 ScrollTrigger，以防動態內容影響佈局
	// setTimeout(() => ScrollTrigger.refresh(), 500);
});
</script>

<style scoped>
/* 在手機版移除 pin 效果 */
@media (max-width: 767px) {
	section {
		position: relative !important;
		transform: none !important;
	}

	article {
		position: relative !important;
		opacity: 1 !important;
		transform: none !important;
		margin-bottom: 4rem; /* 在手機版增加區塊間距 */
	}

	/* 移除最後一個 article 的 margin-bottom */
	article:last-child {
		margin-bottom: 0;
	}
}

.feature {
	background: linear-gradient(135deg, rgba(50, 60, 75, 0.8), rgba(80, 100, 120, 0.8));
	border-radius: 50px;
	padding: 24px;
	box-shadow: inset 0 0 10px rgba(255, 255, 255, 0.1), 0 4px 12px rgba(0, 0, 0, 0.5);
	will-change: transform, opacity;
	transform: translateZ(0);
}

/* 入口區塊樣式 */
.block-bg {
	position: relative;
	background-color: rgba(0, 0, 0, 0.3);
	backdrop-filter: blur(10px);
	border: 1px solid rgba(255, 255, 255, 0.1);
	box-shadow: 0 8px 32px rgba(0, 0, 0, 0.2);
	overflow: hidden;
	transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.block-pattern {
	width: 100%;
	height: 100%;
	opacity: 0.15;
}

.pattern-1 {
	background: radial-gradient(circle at 30% 50%, #4facfe 0%, #00f2fe 100%);
}

.pattern-2 {
	background: linear-gradient(45deg, #fa709a 0%, #fee140 100%);
}

.pattern-3 {
	background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
}

/* Logo Carousel Styles */
.logo-carousel-container {
	height: 100%;
	overflow: hidden; /* 隱藏超出容器的內容 */
	position: relative;
	mask-image: linear-gradient(to right, transparent, black 10%, black 90%, transparent); /* 兩端淡化效果 */
	-webkit-mask-image: linear-gradient(to right, transparent, black 10%, black 90%, transparent);
}

.logo-track {
	display: flex;
	/* width 將由 JS 設定為 (單組logo總寬度 * 2) */
	will-change: transform; /* 提示瀏覽器此元素將會變形，以進行優化 */
}

.partner-logo {
	height: 80px; /* 調整 Logo 高度 */
	max-width: 160px; /* 限制 Logo 最大寬度，避免過大 */
	object-fit: contain; /* 保持圖片比例 */
	margin-right: 30px; /* Logo 之間的間距 */
}

.perspective {
	perspective: 1000px;
}

.transform-style-preserve-3d {
	transform-style: preserve-3d;
}

.backface-hidden {
	backface-visibility: hidden;
	-webkit-backface-visibility: hidden; /* Safari */
}

.rotate-y-180 {
	transform: rotateY(180deg);
}

.card-inner.is-flipped {
	transform: rotateY(180deg);
}

.card-face {
	border: 1px solid rgba(255, 255, 255, 0.1);
	box-sizing: border-box;
}

/* Responsive adjustments for card grid if necessary */
@media (max-width: 1024px) {
	/* For lg breakpoint and below */
	/* publicRef uses lg:grid-cols-2, businessRef uses lg:grid-cols-3 */
	/* Ensure cards in publicRef don't become too large on medium screens if it's still 2 cols */
}

@media (max-width: 768px) {
	/* For md breakpoint and below */
	/* Cards will stack to 1 column by default based on grid-cols-1 from Tailwind */
	/* Adjust card sizes if they are too wide or tall for mobile */
	.card-container {
		width: 85vw; /* Make cards occupy more screen width */
		max-width: 340px; /* But not excessively wide */
		/* Height is now primarily controlled by Tailwind classes, 
		   but we can set a min-height if dynamic content is very short */
		min-height: 300px;
		margin-left: auto; /* Center the card if the grid doesn't fully handle it */
		margin-right: auto;
		margin-bottom: 2rem; /* Add more space between stacked cards */
	}
	.card-container:last-child {
		margin-bottom: 0; /* Remove margin for the last card in a group */
	}

	/* Adjust font sizes for cards on mobile */
	.card-face h5 {
		font-size: 1rem; /* Adjust title size */
	}
	.card-face p {
		font-size: 0.875rem; /* Adjust paragraph text size */
	}
	.card-face .text-xs.mt-4.opacity-70 {
		/* Targeting '點擊查看方案' span */
		font-size: 0.75rem;
	}
}
</style>
