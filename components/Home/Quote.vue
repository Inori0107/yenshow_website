<template>
	<section class="quote-section h-screen flex flex-col justify-center items-center relative my-[128px] md:my-[256px] overflow-hidden">
		<!-- 背景裝飾 -->
		<div class="absolute inset-0 backdrop-blur-sm bg-gradient-radial"></div>
		<div class="quote-frame"></div>
		<div class="quote-decoration-line top"></div>
		<div class="quote-decoration-line bottom"></div>

		<!-- 引號裝飾 -->
		<div class="quote-marks left">"</div>
		<div class="quote-marks right">"</div>

		<!-- 引用內容 -->
		<div class="quote-container relative z-10 max-w-4xl text-center text-[24px] md:text-[36px] text-secondary px-8" style="font-family: 'LXGW WenKai Mono TC'">
			<div v-for="(sentence, index) in sentences" :key="index" class="quote-sentence mb-6">
				<span v-for="(char, i) in localizedSentence(sentence)" :key="i" class="quote-char">{{ char }}</span>
			</div>

			<!-- 署名 -->
			<div class="quote-signature text-right mt-12 opacity-0">
				<div class="text-[16px] md:text-[24px] font-light italic">{{ $t("quote signature") }}</div>
			</div>
		</div>
	</section>
</template>

<script setup>
import { ref, onMounted, onUnmounted, nextTick, computed } from "vue";
import { useScrollAnimation } from "~/composables/useScrollAnimation";
import { useI18n } from "vue-i18n";

// 使用 i18n
const { t } = useI18n();

// 使用滾動動畫控制器
const scrollAnimation = useScrollAnimation();
const { gsap, ScrollTrigger } = scrollAnimation;

// 引用語句鍵名
const sentences = ref(["quote sentence 1", "quote sentence 2", "quote sentence 3"]);

// 將本地化的句子轉為字符數組，用於逐字動畫
const localizedSentence = (key) => {
	return t(key).split("");
};

// 設置引用動畫
const setupQuoteAnimation = async () => {
	// 確保 ScrollTrigger 已初始化
	await scrollAnimation.initScrollPlugins();
	if (!ScrollTrigger.value) return;

	// 初始設置 - 確保所有字符一開始都是不可見的
	gsap.set(".quote-char", {
		opacity: 0,
		y: 25
	});

	// 設置畫框初始狀態
	gsap.set(".quote-frame", {
		width: "80%",
		height: "80%",
		opacity: 0
	});

	// 設置裝飾線初始狀態
	gsap.set(".quote-decoration-line.top", {
		width: "0%",
		opacity: 0
	});

	gsap.set(".quote-decoration-line.bottom", {
		width: "0%",
		opacity: 0
	});

	// 設置引號初始狀態
	gsap.set(".quote-marks", {
		opacity: 0,
		scale: 0.5
	});

	// 設置背景初始狀態
	gsap.set(".bg-gradient-radial", {
		opacity: 0
	});

	// 創建主時間軸
	const tl = gsap.timeline({
		scrollTrigger: {
			trigger: ".quote-section",
			start: "top 70%", // 調整為滾動到 30% 時觸發
			end: "bottom 20%",
			toggleActions: "play none none reverse",
			markers: false
		}
	});

	// 先顯示背景模糊效果
	tl.to(".bg-gradient-radial", {
		opacity: 1,
		duration: 1.5,
		ease: "power2.inOut"
	});

	// 顯示畫框
	tl.to(
		".quote-frame",
		{
			opacity: 1,
			width: "90%",
			height: "90%",
			duration: 1.2,
			ease: "power2.out"
		},
		"-=1"
	);

	// 顯示上裝飾線
	tl.to(
		".quote-decoration-line.top",
		{
			width: "70%",
			opacity: 0.8,
			duration: 1.2,
			ease: "power3.out"
		},
		"-=0.8"
	);

	// 顯示下裝飾線
	tl.to(
		".quote-decoration-line.bottom",
		{
			width: "70%",
			opacity: 0.8,
			duration: 1.2,
			ease: "power3.out"
		},
		"-=1"
	);

	// 顯示引號
	tl.to(
		".quote-marks",
		{
			opacity: 0.4,
			scale: 1,
			stagger: 0.3,
			duration: 1,
			ease: "back.out(1.7)"
		},
		"-=0.8"
	);

	// 為每個句子中的每個字符添加動畫
	sentences.value.forEach((sentence, sentenceIndex) => {
		const chars = document.querySelectorAll(`.quote-sentence:nth-child(${sentenceIndex + 1}) .quote-char`);

		tl.fromTo(
			chars,
			{
				opacity: 0,
				y: 25
			},
			{
				opacity: 1,
				y: 0,
				duration: 0.7,
				stagger: 0.05,
				ease: "power3.out"
			},
			sentenceIndex === 0 ? "-=0.4" : ">=0.1" // 第一句與裝飾重疊，後續句子略微重疊
		);
	});

	// 顯示署名
	tl.to(
		".quote-signature",
		{
			opacity: 1,
			y: 0,
			duration: 1,
			ease: "power2.out"
		},
		">"
	);
};

onMounted(async () => {
	try {
		// 等待 DOM 更新完成後再初始化
		await nextTick();

		// 設置動畫
		await setupQuoteAnimation();

		// 監聽視窗調整事件
		window.addEventListener("resize", scrollAnimation.handleResize);
	} catch (error) {
		console.error("Quote 動畫設置錯誤:", error);
	}
});

// 清理動畫
onUnmounted(() => {
	window.removeEventListener("resize", scrollAnimation.handleResize);
	scrollAnimation.cleanupScrollTriggers();
});
</script>

<style scoped>
.quote-section {
	position: relative;
	padding: 4rem 0;
}

.bg-gradient-radial {
	background: radial-gradient(circle at 50% 50%, rgba(33, 42, 55, 0.5) 0%, rgba(33, 42, 55, 0.8) 100%);
	backdrop-filter: blur(8px);
	transition: opacity 0.8s ease-in-out;
}

.quote-frame {
	position: absolute;
	border: 2px solid rgba(221, 28, 28, 0.2);
	box-shadow: 0 0 20px rgba(221, 28, 28, 0.1), inset 0 0 30px rgba(221, 28, 28, 0.05);
	z-index: 2;
	pointer-events: none;
}

.quote-decoration-line {
	position: absolute;
	height: 2px;
	background: linear-gradient(to right, transparent, rgba(221, 28, 28, 0.8), transparent);
	z-index: 3;
	box-shadow: 0 0 10px rgba(221, 28, 28, 0.3);
}

.quote-decoration-line.top {
	top: 20%;
	left: 15%;
}

.quote-decoration-line.bottom {
	bottom: 20%;
	right: 15%;
}

.quote-marks {
	position: absolute;
	font-size: 200px;
	font-family: serif;
	color: rgba(221, 28, 28, 0.2);
	text-shadow: 0 0 15px rgba(221, 28, 28, 0.1);
	z-index: 2;
	line-height: 0;
}

.quote-marks.left {
	top: 30%;
	left: 10%;
}

.quote-marks.right {
	bottom: 30%;
	right: 10%;
}

.quote-container {
	display: flex;
	flex-direction: column;
	align-items: center;
	gap: 16px;
	padding: 3rem;
	border-radius: 0.5rem;
	background-color: rgba(255, 255, 255, 0.1);
	box-shadow: 0 8px 32px rgba(0, 0, 0, 0.2);
	backdrop-filter: blur(5px);
	z-index: 5;
}

.quote-sentence {
	display: block;
	position: relative;
	text-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
}

.quote-char {
	display: inline-block;
	opacity: 0;
	transform: translateY(20px);
	will-change: transform, opacity;
}

.quote-signature {
	align-self: flex-end;
	margin-top: 2rem;
	transform: translateY(20px);
	opacity: 0;
	text-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
}

@media (max-width: 768px) {
	.quote-marks {
		font-size: 150px;
	}

	.quote-marks.left {
		left: 5%;
	}

	.quote-marks.right {
		right: 5%;
	}

	.quote-decoration-line.top {
		left: 10%;
	}

	.quote-decoration-line.bottom {
		right: 10%;
	}

	.quote-container {
		padding: 2rem;
	}
}

@media (max-width: 640px) {
	.quote-marks {
		font-size: 100px;
	}

	.quote-frame {
		width: 95% !important;
		height: 85% !important;
	}
}
</style>
