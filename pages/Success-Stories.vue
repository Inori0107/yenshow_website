<template>
	<!-- Entrance -->
	<nav class="h-screen container flex flex-col justify-center relative">
		<!-- 標題 -->
		<div class="z-10 mb-12" ref="titleRef">
			<h1 class="text-[36px] md:text-[96px] text-secondary">Success Stories</h1>
			<h3 class="text-[24px] md:text-[64px] text-secondary">合作案例</h3>
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
					<h4 class="text-[20px] md:text-[28px] text-white font-medium mb-4">見證我們如何為各行各業提供安全可靠的解決方案</h4>
					<p class="text-[14px] md:text-[16px] text-white/80">我們致力於打造高度安全可靠的門禁系統與監控設備，為您的空間提供全方位的保護，讓安心無所不在。</p>
				</div>
			</div>

			<!-- 數據統計區塊 -->
			<div class="flex flex-col gap-4 md:w-1/2">
				<!-- 成功案例 -->
				<div class="block-bg rounded-xl p-6 transition-all duration-500">
					<div class="absolute inset-0 rounded-xl overflow-hidden">
						<div class="block-pattern pattern-2"></div>
					</div>
					<div class="relative z-10 flex items-center">
						<div class="mr-4">
							<div class="text-[32px] md:text-[48px] text-white font-bold">50+</div>
							<div class="text-[14px] md:text-[16px] text-white/70">成功案例</div>
						</div>
						<p class="text-[14px] text-white/80 max-w-[200px]">橫跨不同行業的成功實例，每個案例都是我們實力的見證</p>
					</div>
				</div>

				<!-- 服務經驗 -->
				<div class="block-bg rounded-xl p-6 transition-all duration-500">
					<div class="absolute inset-0 rounded-xl overflow-hidden">
						<div class="block-pattern pattern-3"></div>
					</div>
					<div class="relative z-10 flex items-center">
						<div class="mr-4">
							<div class="text-[32px] md:text-[48px] text-white font-bold">10+</div>
							<div class="text-[14px] md:text-[16px] text-white/70">服務年資</div>
						</div>
						<p class="text-[14px] text-white/80 max-w-[200px]">十餘年專業經驗，為客戶提供最穩定可靠的解決方案</p>
					</div>
				</div>
			</div>
		</div>
	</nav>

	<!-- 合作夥伴 -->
	<div class="bg-primary rounded-[100px] p-12">
		<section ref="sectionRef" class="relative min-h-screen">
			<!-- 企業與商業合作 -->
			<article ref="businessRef" class="mb-12 absolute inset-0 flex flex-col justify-center items-center opacity-0">
				<h4 class="text-[24px] md:text-[48px] lg:text-[64px] text-secondary text-center mb-12">企業與商業合作</h4>
				<div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
					<div v-for="(feature, index) in business_feature" :key="index" class="feature flex flex-col items-center text-center text-secondary">
						<img :src="feature.image" alt="feature" class="w-[100px] lg:w-[150px] aspect-square" />
						<h5 class="text-[16px] md:text-[24px] lg:text-[36px]">{{ feature.title }}</h5>
						<p class="text-[12px] md:text-[16px] lg:text-[24px]">{{ feature.description }}</p>
					</div>
				</div>
			</article>
			<!-- 公共與專業場域支援 -->
			<article ref="publicRef" class="absolute inset-0 flex flex-col justify-center items-center opacity-0">
				<h4 class="text-[24px] md:text-[48px] lg:text-[64px] text-secondary text-center mb-12">公共與專業場域支援</h4>
				<div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
					<div v-for="(feature, index) in public_feature" :key="index" class="feature flex flex-col items-center text-center text-secondary">
						<img :src="feature.image" alt="feature" class="w-[100px] lg:w-[150px] aspect-square" />
						<h5 class="text-[16px] md:text-[24px] lg:text-[36px]">{{ feature.title }}</h5>
						<p class="text-[12px] md:text-[16px] lg:text-[24px]">{{ feature.description }}</p>
					</div>
				</div>
			</article>
		</section>
	</div>
	<!-- 案例介紹 -->
	<section class="container flex flex-col justify-center items-center bg-[#F2F2F2] min-h-screen my-[128px] lg:my-[512px] py-[64px] px-4 md:px-8 rounded-[50px]">
		<h2 class="text-[24px] md:text-[48px] lg:text-[64px] font-bold mb-[64px]">實績案例</h2>
		<!-- 案例列表 -->
		<div class="flex flex-col w-full max-w-7xl gap-[96px]">
			<article v-for="(example, index) in examples" :key="index" class="w-full grid grid-cols-1 md:grid-cols-2 gap-[32px] md:gap-[48px]">
				<!-- 左側內容 -->
				<div class="flex flex-col justify-center gap-[12px] md:gap-[24px]">
					<!-- <h3 class="text-[24px] md:text-[36px] lg:text-[48px] font-bold">
						{{ example.title }}
					</h3> -->
					<h4 class="text-[21px] md:text-[28px] lg:text-[36px] font-bold">
						{{ example.subtitle }}
					</h4>

					<!-- 詳細資訊 -->
					<div class="border-s-2 border-primary px-[24px] flex flex-col gap-[12px]">
						<span v-for="(detail, dIndex) in example.details" :key="dIndex" class="text-[12px] md:text-[16px] lg:text-[24px]">
							{{ detail.label }}：{{ detail.value }}
						</span>
					</div>

					<!-- 描述 -->
					<p class="text-[12px] md:text-[16px] lg:text-[24px]">
						{{ example.description }}
					</p>
				</div>

				<!-- 右側圖片 -->
				<div class="relative w-full aspect-[3/4] rounded-lg overflow-hidden shadow-lg">
					<img :src="example.image" :alt="example.title" class="absolute inset-0 w-full h-full object-cover" />
				</div>
			</article>
		</div>
	</section>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useScrollAnimation } from "~/composables/useScrollAnimation";
import gsap from "gsap";

// 使用自定義滾動動畫
const scrollAnimation = useScrollAnimation();

const business_feature = ref([
	{
		title: "系統整合商",
		description: "為弱電合作夥伴提供高規格、安全的產品和服務。",
		image: "/corporation/Networking Manager.svg"
	},
	{
		title: "品牌客戶",
		description: "與知名品牌合作，客製化需求，以專業性達到客戶需求。",
		image: "/corporation/customers.svg"
	},
	{
		title: "公司行號",
		description: "為企業提供安全便利的門禁考勤解決方案",
		image: "/corporation/company.svg"
	}
]);

const public_feature = ref([
	{
		title: "建設公司",
		description: "提供完整弱電系統規劃，新穎設備提高銷售機會",
		image: "/corporation/building.svg"
	},
	{
		title: "醫療院所",
		description: "提供醫療機構的安全解決方案，包括醫院、診所等。",
		image: "/corporation/hospital.svg"
	},
	{
		title: "學校和補習班",
		description: "提供學校和補習班門禁出勤，安全監控設備。",
		image: "/corporation/school.svg"
	},
	{
		title: "公家機關",
		description: "與政府機構合作，提供安全技術解決方案。",
		image: "/corporation/government.svg"
	}
]);

const sectionRef = ref(null);
const businessRef = ref(null);
const publicRef = ref(null);

// 添加入口動畫相關引用
const heroBlocks = ref(null);
const titleRef = ref(null);

// 新增案例資料
const examples = ref([
	{
		title: "合總君悅",
		subtitle: "集合式住宅建築",
		details: [
			{ label: "基地位置", value: "雲林縣" },
			{ label: "基地面積", value: "541坪" },
			{ label: "產品類型", value: "電梯大樓" },
			{ label: "戶數", value: "91戶、2戶店鋪" }
		],
		description:
			"該項目使用遠岫全往可視對講系統，採用10寸室內機YS-9510，4.3吋人臉辨識住戶門口機,整社區人臉辨識通行不須再攜帶磁卡。其他配套產品包含：視頻監控前後端產品、傳輸、門禁、集中管理平臺軟體。",
		image: "/corporation/example01.png"
	}
]);

onMounted(async () => {
	// 初始化滾動插件
	await scrollAnimation.initScrollPlugins();

	// 入口動畫
	const entranceTl = scrollAnimation.gsap.timeline({ delay: 0.5 });
	entranceTl
		.fromTo(titleRef.value, { opacity: 0, y: -30 }, { opacity: 1, y: 0, duration: 1 })
		.fromTo(heroBlocks.value.querySelectorAll(".block-bg"), { opacity: 0, y: 30 }, { opacity: 1, y: 0, stagger: 0.2, duration: 0.8 }, "-=0.5");

	// 檢查是否為桌面版
	const isMdScreen = window.matchMedia("(min-width: 768px)").matches;

	if (isMdScreen) {
		// 創建固定區塊動畫
		const pinnedSection = scrollAnimation.createPinnedSection({
			trigger: sectionRef.value,
			start: "top top",
			end: "+=200%",
			scrub: 1.5, // 增加滾動的平滑度
			markers: false
		});

		// 創建內容過渡時間軸
		const contentTimeline = scrollAnimation.createTimelineAnimation({
			trigger: sectionRef.value,
			start: "top top",
			end: "+=200%",
			scrub: 1.5, // 和固定區塊保持一致
			toggleActions: "play none none reverse"
		});

		if (contentTimeline) {
			// 第一部分動畫 - 企業合作
			contentTimeline
				.fromTo(businessRef.value, { opacity: 0, y: 50 }, { opacity: 1, y: 0, duration: 1, ease: "power2.out" })
				.fromTo(
					businessRef.value.querySelectorAll(".feature"),
					{ opacity: 0, y: 30 },
					{
						opacity: 1,
						y: 0,
						stagger: 0.2,
						duration: 0.8,
						ease: "back.out(1.7)"
					},
					"-=0.5"
				)
				// 滾動到中間位置
				.to(
					businessRef.value,
					{
						opacity: 0,
						y: -50,
						duration: 2,
						ease: "power2.inOut"
					},
					"+=1" // 稍微延遲，讓第一部分有更多顯示時間
				)
				// 第二部分動畫 - 公共支援
				.fromTo(publicRef.value, { opacity: 0, y: 50 }, { opacity: 1, y: 0, duration: 1, ease: "power2.out" })
				.fromTo(
					publicRef.value.querySelectorAll(".feature"),
					{ opacity: 0, y: 30 },
					{
						opacity: 1,
						y: 0,
						stagger: 0.2,
						duration: 0.8,
						ease: "back.out(1.7)"
					},
					"-=0.5"
				);
		}

		// 為案例區塊添加入場動畫
		scrollAnimation.createElementEntrance({
			elements: ".flex.flex-col.w-full.max-w-7xl > article",
			trigger: ".bg-[#F2F2F2]",
			start: "top 70%",
			fromY: 50,
			fromOpacity: 0,
			duration: 1,
			staggerAmount: 0.3
		});
	} else {
		// 手機版直接顯示所有內容
		scrollAnimation.gsap.set([businessRef.value, publicRef.value], { opacity: 1 });
		scrollAnimation.gsap.set([...businessRef.value.querySelectorAll(".feature"), ...publicRef.value.querySelectorAll(".feature")], { opacity: 1 });

		// 為案例區塊添加簡單的淡入效果
		scrollAnimation.createElementEntrance({
			elements: ".flex.flex-col.w-full.max-w-7xl > article",
			trigger: ".bg-[#F2F2F2]",
			start: "top 90%",
			fromY: 30,
			fromOpacity: 0,
			duration: 0.8
		});
	}

	// 監聽螢幕變化
	window.matchMedia("(min-width: 768px)").addEventListener("change", () => {
		// 重新整理頁面以重新初始化動畫
		window.location.reload();
	});
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
</style>
