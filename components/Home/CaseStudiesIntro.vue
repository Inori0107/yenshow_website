<template>
	<div>
		<section
			ref="caseStudiesIntroSection"
			id="case-studies-intro"
			class="bg-secondary/90 my-[64px] sm:my-[128px] md:my-[256px] lg:my-[512px] xl:my-[580px] 2xl:my-[640px]"
		>
			<article class="container min-h-screen flex flex-col justify-center items-center gap-[24px] md:gap-[48px] py-[24px] md:py-[48px]">
				<!-- 標題與引言 -->
				<div class="text-center">
					<h2
						ref="headline"
						class="text-[24px] md:text-[36px] lg:text-[64px] xl:text-[72px] 2xl:text-[80px] font-bold mb-4 text-transparent bg-gradient-to-r from-green-600 to-green-300 bg-clip-text"
					>
						我們的亮眼實績
					</h2>
					<p
						ref="introParagraph1"
						class="text-[16px] sm:text-[18px] md:text-[21px] lg:text-[24px] xl:text-[26px] 2xl:text-[28px] text-primary/80 max-w-[80%] mx-auto"
					>
						透過深入了解客戶環境，我們能準確判斷最適用的技術方案，從企業總部到校園場域、從智慧社區到高安管場所，我們累積了大量跨領域實績。
					</p>
				</div>

				<!-- 關鍵數據指標 -->
				<div class="grid grid-cols-1 lg:grid-cols-3 gap-8 md:gap-10">
					<!-- 卡片一：客戶關鍵效益 -->
					<div ref="statCard1" class="bg-white/80 px-4 py-6 md:px-6 md:py-8 rounded-xl shadow-lg hover:shadow-2xl transition-shadow duration-300">
						<h3 class="text-[16px] sm:text-[18px] md:text-[21px] lg:text-[24px] xl:text-[26px] 2xl:text-[28px] font-semibold text-primary/80 mb-6 text-center">
							客戶關鍵效益
						</h3>
						<div class="space-y-3 md:space-y-6 w-[80%] mx-auto">
							<div class="flex items-center justify-between">
								<p class="text-primary/60 text-[12px] sm:text-[14px] md:text-[16px] lg:text-[18px] xl:text-[21px]">客戶滿意</p>
								<p class="text-[16px] sm:text-[18px] md:text-[21px] lg:text-[24px] xl:text-[26px] 2xl:text-[28px] font-bold text-primary">
									<span ref="satisfactionRate">0</span>%
								</p>
							</div>
							<div class="flex items-center justify-between">
								<p class="text-primary/60 text-[12px] sm:text-[14px] md:text-[16px] lg:text-[18px] xl:text-[21px]">效率提升</p>
								<p class="text-[16px] sm:text-[18px] md:text-[21px] lg:text-[24px] xl:text-[26px] 2xl:text-[28px] font-bold text-primary">
									+<span ref="efficiencyBoost">0</span>%
								</p>
							</div>
							<div class="flex items-center justify-between">
								<p class="text-primary/60 text-[12px] sm:text-[14px] md:text-[16px] lg:text-[18px] xl:text-[21px]">產品精準</p>
								<p class="text-[16px] sm:text-[18px] md:text-[21px] lg:text-[24px] xl:text-[26px] 2xl:text-[28px] font-bold text-primary">
									<span ref="accuracyRate">0</span>%
								</p>
							</div>
						</div>
					</div>

					<!-- 卡片二：長期合作夥伴趨勢 -->
					<div ref="statCard2" class="bg-white/80 px-4 py-6 md:px-6 md:py-8 rounded-xl shadow-lg hover:shadow-2xl transition-shadow duration-300">
						<h3 class="text-[16px] sm:text-[18px] md:text-[21px] lg:text-[24px] xl:text-[26px] 2xl:text-[28px] font-semibold text-primary/80 mb-6 text-center">
							長期合作夥伴增長
						</h3>
						<div class="flex items-center justify-center">
							<svg ref="barChart" class="w-full h-48 md:h-56" viewBox="0 0 280 180"></svg>
						</div>
					</div>

					<!-- 卡片三：多元客戶群體 -->
					<div ref="statCard3" class="bg-white/80 px-4 py-6 md:px-6 md:py-8 rounded-xl shadow-lg hover:shadow-2xl transition-shadow duration-300 flex flex-col">
						<h3 class="text-[16px] sm:text-[18px] md:text-[21px] lg:text-[24px] xl:text-[26px] 2xl:text-[28px] font-semibold text-primary/80 mb-6 text-center">
							多元客戶群體
						</h3>
						<div class="flex items-center justify-center relative">
							<svg ref="pieChart" class="w-48 h-48 md:w-56 md:h-56" viewBox="0 0 200 200"></svg>
							<div ref="pieChartLegend" class="text-xs space-y-1 ml-4">
								<!-- Legend will be populated by script -->
							</div>
						</div>
					</div>
				</div>

				<!-- 行動呼籲 -->
				<div ref="ctaButtonContainer" class="w-fit">
					<ButtonCTA to="/Success-Stories" label="合作案例" />
				</div>
			</article>
		</section>
	</div>
</template>

<script setup>
import { ref, onMounted, inject } from "vue";
import ButtonCTA from "@/components/common/Button-CTA.vue";
import gsap from "gsap";

const scrollAnimation = inject("scrollAnimation");

const caseStudiesIntroSection = ref(null);
const headline = ref(null);
const introParagraph1 = ref(null);
// const introParagraph2 = ref(null); // No longer used, can be removed
// const introParagraph3 = ref(null); // No longer used, can be removed
// const processHeadline = ref(null); // No longer used, can be removed

const statCard1 = ref(null);
const statCard2 = ref(null);
const statCard3 = ref(null);

const satisfactionRate = ref(null);
const efficiencyBoost = ref(null);
const accuracyRate = ref(null);

const barChart = ref(null);
const pieChart = ref(null);
const pieChartLegend = ref(null);
const ctaButtonContainer = ref(null);

// --- Chart Data (Placeholders) ---
const barChartData = [
	{ year: "2020", value: 60 },
	{ year: "2021", value: 80 },
	{ year: "2022", value: 110 },
	{ year: "2023", value: 150 },
	{ year: "2024", value: 190 }
];

const pieChartData = [
	{ label: "科技業", value: 40, color: "#34D399" }, // Emerald 400
	{ label: "製造業", value: 25, color: "#60A5FA" }, // Blue 400
	{ label: "教育單位", value: 20, color: "#FBBF24" }, // Amber 400
	{ label: "其他", value: 15, color: "#A78BFA" } // Violet 400
];
// --- End Chart Data ---

const animateStatNumbers = () => {
	if (satisfactionRate.value) {
		gsap.to(satisfactionRate.value, {
			textContent: 98,
			duration: 2,
			ease: "power2.out",
			snap: { textContent: 1 },
			delay: 0.8, // Card animation is 0.8s
			scrollTrigger: { trigger: statCard1.value, start: "top 80%" }
		});
	}
	if (efficiencyBoost.value) {
		gsap.to(efficiencyBoost.value, {
			textContent: 35,
			duration: 2,
			ease: "power2.out",
			snap: { textContent: 1 },
			delay: 1.0, // 0.8s (card anim) + 0.2s (stagger)
			scrollTrigger: { trigger: statCard1.value, start: "top 80%" }
		});
	}
	if (accuracyRate.value) {
		gsap.to(accuracyRate.value, {
			textContent: 99.7,
			duration: 2,
			ease: "power2.out",
			snap: { textContent: 0.1 },
			delay: 1.2, // 0.8s (card anim) + 0.4s (stagger)
			scrollTrigger: { trigger: statCard1.value, start: "top 80%" }
		});
	}
};

const createBarChart = () => {
	if (!barChart.value) return;
	const svg = barChart.value;
	const svgWidth = 280;
	const svgHeight = 180;
	const barPadding = 15;
	const chartPadding = { top: 20, right: 20, bottom: 30, left: 30 }; // Adjusted for labels
	const chartWidth = svgWidth - chartPadding.left - chartPadding.right;
	const chartHeight = svgHeight - chartPadding.top - chartPadding.bottom;

	const barWidth = (chartWidth - (barChartData.length - 1) * barPadding) / barChartData.length;
	const maxValue = Math.max(...barChartData.map((d) => d.value), 0) * 1.2; // Add some headroom

	barChartData.forEach((d, i) => {
		const barHeight = (d.value / maxValue) * chartHeight;
		const x = chartPadding.left + i * (barWidth + barPadding);
		const y = chartPadding.top + chartHeight - barHeight;

		// Bar
		const rect = document.createElementNS("http://www.w3.org/2000/svg", "rect");
		gsap.set(rect, {
			attr: { x, y: chartPadding.top + chartHeight, width: barWidth, height: 0, fill: "#059669" /* bg-primary */, rx: 3, ry: 3 },
			opacity: 0.7
		});
		svg.appendChild(rect);
		gsap.to(rect, {
			attr: { height: barHeight, y },
			opacity: 1,
			duration: 1.5,
			ease: "elastic.out(1, 0.6)",
			delay: i * 0.15 + 0.5 + 0.8, // Staggered delay + card entry delay
			scrollTrigger: { trigger: statCard2.value, start: "top 80%" }
		});

		// Year Label
		const yearLabel = document.createElementNS("http://www.w3.org/2000/svg", "text");
		gsap.set(yearLabel, {
			attr: { x: x + barWidth / 2, y: chartPadding.top + chartHeight + 15, "text-anchor": "middle", fill: "#6B7280", "font-size": "10px" },
			textContent: d.year,
			opacity: 0
		});
		svg.appendChild(yearLabel);
		gsap.to(yearLabel, { opacity: 1, delay: i * 0.15 + 0.7 + 0.8, scrollTrigger: { trigger: statCard2.value, start: "top 80%" } });

		// Value Label (on hover, or always visible if design allows)
		// For simplicity, let's make it appear with the bar
		const valueLabel = document.createElementNS("http://www.w3.org/2000/svg", "text");
		gsap.set(valueLabel, {
			attr: { x: x + barWidth / 2, y: y - 5, "text-anchor": "middle", fill: "#059669", "font-size": "10px", "font-weight": "bold" },
			textContent: d.value,
			opacity: 0
		});
		svg.appendChild(valueLabel);
		gsap.to(valueLabel, { opacity: 1, delay: i * 0.15 + 1.2 + 0.8, scrollTrigger: { trigger: statCard2.value, start: "top 80%" } });
	});
};

const getPathDForPieSlice = (cx, cy, r, startAngleRad, sweepAngleRad) => {
	if (sweepAngleRad <= 0.001) return `M ${cx},${cy}`; // Effectively invisible or a point
	const almostFullCircle = Math.PI * 2 - 0.00001;
	if (sweepAngleRad >= almostFullCircle) sweepAngleRad = almostFullCircle;

	const endAngleRad = startAngleRad + sweepAngleRad;

	const x1 = cx + r * Math.cos(startAngleRad);
	const y1 = cy + r * Math.sin(startAngleRad);
	const x2 = cx + r * Math.cos(endAngleRad);
	const y2 = cy + r * Math.sin(endAngleRad);

	const largeArcFlag = sweepAngleRad > Math.PI ? 1 : 0;

	return [`M ${cx},${cy}`, `L ${x1},${y1}`, `A ${r},${r} 0 ${largeArcFlag} 1 ${x2},${y2}`, "Z"].join(" ");
};

const createPieChart = () => {
	if (!pieChart.value || !pieChartLegend.value) return;
	const svg = pieChart.value;
	const legendContainer = pieChartLegend.value;
	legendContainer.innerHTML = ""; // Clear previous legend

	const radius = 80;
	const centerX = 100;
	const centerY = 100;
	let cumulativeAngle = -Math.PI / 2; // Start from 12 o'clock

	const totalValue = pieChartData.reduce((sum, d) => sum + d.value, 0);

	pieChartData.forEach((slice, index) => {
		const sliceTrueAngleSpan = (slice.value / totalValue) * 2 * Math.PI;

		const path = document.createElementNS("http://www.w3.org/2000/svg", "path");
		gsap.set(path, {
			attr: { fill: slice.color, d: getPathDForPieSlice(centerX, centerY, radius, cumulativeAngle, 0) }, // Initial zero sweep
			opacity: 0 // Start hidden then fade in on animation start
		});
		svg.appendChild(path);

		const animProxy = { currentSweep: 0 };
		const currentSliceStartAngle = cumulativeAngle; // Capture start angle for this slice

		gsap.to(animProxy, {
			currentSweep: sliceTrueAngleSpan,
			duration: 0.7, // Duration for one slice to draw
			ease: "power1.inOut",
			delay: index * 0.2 + 0.5 + 0.8, // Staggered delay + card entry delay
			scrollTrigger: { trigger: statCard3.value, start: "top 80%" },
			onStart: () => {
				gsap.set(path, { opacity: 1 });
			},
			onUpdate: function () {
				const d = getPathDForPieSlice(centerX, centerY, radius, currentSliceStartAngle, animProxy.currentSweep);
				gsap.set(path, { attr: { d } });
			}
		});

		// Legend item
		const legendItem = document.createElement("div");
		legendItem.className = "flex items-center";
		legendItem.innerHTML = `
			<span class="inline-block w-3 h-3 rounded-sm mr-2" style="background-color: ${slice.color};"></span>
			<span>${slice.label} (${slice.value}%)</span>
		`;
		legendContainer.appendChild(legendItem);

		cumulativeAngle += sliceTrueAngleSpan;
	});
};

onMounted(async () => {
	if (scrollAnimation && typeof scrollAnimation.createBasicAnimation === "function") {
		await scrollAnimation.initScrollPlugins();

		const sectionNode = caseStudiesIntroSection.value;

		scrollAnimation.createBasicAnimation({
			elements: sectionNode,
			trigger: sectionNode,
			start: "top 85%",
			toProps: { opacity: 1 }, // Fade in section
			duration: 0.5,
			toggleActions: "play none none none"
		});

		// Animate Headline and Intro Paragraph
		[headline.value, introParagraph1.value].forEach((el, index) => {
			if (el) {
				scrollAnimation.createBasicAnimation({
					elements: el,
					trigger: sectionNode,
					start: "top 80%",
					fromProps: { opacity: 0, y: 30 },
					toProps: { opacity: 1, y: 0 },
					duration: 0.8,
					delay: index * 0.15,
					ease: "power3.out",
					toggleActions: "play none none none"
				});
			}
		});

		// Animate Stat Cards (as a group first, then individual elements within them)
		const cards = [statCard1.value, statCard2.value, statCard3.value];
		cards.forEach((cardEl, index) => {
			if (cardEl) {
				scrollAnimation.createBasicAnimation({
					elements: cardEl,
					trigger: cardEl, // card itself as trigger
					start: "top 85%",
					fromProps: { opacity: 0, y: 50, scale: 0.95 },
					toProps: { opacity: 1, y: 0, scale: 1 },
					duration: 0.8,
					delay: index * 0.2 + 0.3, // Stagger after headline
					ease: "power2.out",
					toggleActions: "play none none none"
				});
			}
		});

		// Trigger individual animations within cards (numbers, charts)
		animateStatNumbers();
		createBarChart();
		createPieChart();

		if (ctaButtonContainer.value) {
			scrollAnimation.createBasicAnimation({
				elements: ctaButtonContainer.value,
				trigger: ctaButtonContainer.value,
				start: "top 90%",
				fromProps: { opacity: 0, y: 20, scale: 0.9 },
				toProps: { opacity: 1, y: 0, scale: 1 },
				duration: 0.8,
				delay: 0.8, // Delay after cards start animating
				ease: "elastic.out(1, 0.75)",
				toggleActions: "play none none none"
			});
		}
	} else {
		console.warn("CaseStudiesIntro: scrollAnimation or createBasicAnimation is not available.");
		if (caseStudiesIntroSection.value) caseStudiesIntroSection.value.style.opacity = 1;
	}
});
</script>

<style scoped>
/* Primary color for texts and icons where needed */
.text-primary {
	color: #059669; /* Tailwind green-600 */
}

/* Button colors (already defined in your previous CSS) */
.bg-primary {
	background-color: #059669;
}
.hover\\:bg-primary-dark:hover {
	background-color: #047857;
}

/* Additional styling for chart elements if needed */
svg text {
	font-family: inherit; /* Inherit font from page */
}
</style>
