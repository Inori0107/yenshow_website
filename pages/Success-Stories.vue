<template>
	<!-- Entrance -->
	<nav class="h-screen container flex flex-col justify-center">
		<h1 class="text-[36px] md:text-[96px] text-secondary">Success Stories</h1>
		<h3 class="text-[24px] md:text-[64px] text-secondary">合作案例</h3>
	</nav>

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
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

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

onMounted(() => {
	// 檢查螢幕寬度是否大於 md 斷點 (768px)
	const isMdScreen = window.matchMedia("(min-width: 768px)").matches;

	if (isMdScreen) {
		const tl = gsap.timeline({
			scrollTrigger: {
				trigger: sectionRef.value,
				start: "top top",
				end: "+=200%",
				pin: true,
				scrub: 1,
				markers: true
			}
		});

		// 第一部分動畫
		const businessTl = gsap.timeline().fromTo(businessRef.value, { opacity: 0, y: 50 }, { opacity: 1, y: 0, duration: 1 }).fromTo(
			businessRef.value.querySelectorAll(".feature"),
			{ opacity: 0, y: 30 },
			{
				opacity: 1,
				y: 0,
				stagger: 0.2,
				duration: 0.8
			},
			"-=0.5"
		);

		// 第二部分動畫
		const publicTl = gsap.timeline().fromTo(publicRef.value, { opacity: 0, y: 50 }, { opacity: 1, y: 0, duration: 1 }).fromTo(
			publicRef.value.querySelectorAll(".feature"),
			{ opacity: 0, y: 30 },
			{
				opacity: 1,
				y: 0,
				stagger: 0.2,
				duration: 0.8
			},
			"-=0.5"
		);

		// 主時間軸編排
		tl.add(businessTl)
			.to(businessRef.value, {
				opacity: 0,
				y: -50,
				duration: 1
			})
			.add(publicTl);
	} else {
		// 手機版直接顯示所有內容，不使用動畫
		gsap.set([businessRef.value, publicRef.value], { opacity: 1 });
		gsap.set([...businessRef.value.querySelectorAll(".feature"), ...publicRef.value.querySelectorAll(".feature")], { opacity: 1 });
	}

	// 監聽螢幕寬度變化
	window.matchMedia("(min-width: 768px)").addEventListener("change", (e) => {
		if (e.matches) {
			// 重新整理頁面以重新初始化動畫
			window.location.reload();
		}
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
</style>
