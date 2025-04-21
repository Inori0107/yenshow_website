<template>
	<section class="quote-section h-screen flex flex-col justify-center items-center relative my-[128px] md:my-[512px] overflow-hidden">
		<!-- 背景裝飾 - 降低不透明度讓原背景透出 -->
		<div class="absolute inset-0 backdrop-blur-sm bg-gradient-nature"></div>
		<div class="quote-frame"></div>

		<!-- 科技線條裝飾 -->
		<div class="tech-line left"></div>
		<div class="tech-line right"></div>

		<!-- 替換靜態圓圈為動態電流效果 -->
		<div class="tech-circuit top-left">
			<div class="circuit-ring outer"></div>
			<div class="circuit-ring middle"></div>
			<div class="circuit-ring inner"></div>
			<div class="circuit-pulse"></div>
		</div>
		<div class="tech-circuit bottom-right">
			<div class="circuit-ring outer"></div>
			<div class="circuit-ring middle"></div>
			<div class="circuit-ring inner"></div>
			<div class="circuit-pulse"></div>
		</div>

		<!-- 引號裝飾 - 使用更現代的設計 -->
		<div class="quote-marks left">
			<svg width="60" height="60" viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg">
				<path d="M12 36H24L18 24H30V12H12V36Z" fill="rgba(58, 209, 152, 0.2)" />
			</svg>
		</div>
		<div class="quote-marks right">
			<svg width="60" height="60" viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg">
				<path d="M48 24H36L42 36H30V48H48V24Z" fill="rgba(58, 209, 152, 0.2)" />
			</svg>
		</div>

		<!-- 引用內容 -->
		<div class="quote-container relative z-10 max-w-4xl text-center text-[24px] md:text-[36px] text-secondary px-8" style="font-family: 'LXGW WenKai Mono TC'">
			<div v-for="(sentence, index) in sentences" :key="index" class="quote-sentence mb-6">
				<span v-for="(char, i) in localizedSentence(sentence)" :key="i" class="quote-char">{{ char }}</span>
			</div>

			<!-- 署名 -->
			<div class="quote-signature text-right mt-12 opacity-0">
				<div class="text-[16px] md:text-[24px] font-light">{{ $t("quote signature") }}</div>
			</div>
		</div>
	</section>
</template>

<script setup>
import { ref, onMounted, onUnmounted, nextTick } from "vue";
import { useScrollAnimation } from "~/composables/useScrollAnimation";
import { useI18n } from "vue-i18n";

// 使用 i18n
const { t } = useI18n();

// 使用滾動動畫控制器
const scrollAnimation = useScrollAnimation();
const { gsap, ScrollTrigger } = scrollAnimation;

// 引用語句鍵名
const sentences = ref(["遠岫科技", "既是一段故事，也是一份使命", "我們期待與每一位客戶攜手", "如白雲般靈活，如遠岫般穩固", "共創晴空般廣闊的願景"]);

// 將本地化的句子轉為字符數組，用於逐字動畫
const localizedSentence = (key) => {
	// 直接返回字符串，不需要i18n翻譯
	return typeof key === "string" ? key.split("") : [];
};

// 設置引用動畫
const setupQuoteAnimation = async () => {
	// 確保 ScrollTrigger 已初始化
	await scrollAnimation.initScrollPlugins();
	if (!ScrollTrigger.value) return;

	// 初始設置 - 確保所有字符一開始都是不可見的
	gsap.set(".quote-char", {
		opacity: 0,
		y: 15,
		filter: "blur(3px)"
	});

	// 設置畫框初始狀態
	gsap.set(".quote-frame", {
		width: "80%",
		height: "70%",
		opacity: 0,
		borderRadius: "2px"
	});

	// 設置科技線條初始狀態
	gsap.set(".tech-line", {
		height: "0%",
		opacity: 0
	});

	// 設置電路圓環初始狀態
	gsap.set(".tech-circuit", {
		opacity: 0
	});

	gsap.set(".circuit-ring", {
		opacity: 0,
		scale: 0.8
	});

	gsap.set(".circuit-pulse", {
		opacity: 0,
		scale: 0.6
	});

	// 設置引號初始狀態
	gsap.set(".quote-marks", {
		opacity: 0,
		scale: 0,
		filter: "blur(10px)"
	});

	// 設置背景初始狀態
	gsap.set(".bg-gradient-nature", {
		opacity: 0
	});

	// 設置引用容器初始狀態
	gsap.set(".quote-container", {
		opacity: 0,
		scale: 0.95
	});

	// 創建主時間軸
	const tl = gsap.timeline({
		scrollTrigger: {
			trigger: ".quote-section",
			start: "top 60%", // 調整為滾動到 40% 時觸發
			end: "bottom 20%",
			toggleActions: "play none none reverse",
			markers: false
		}
	});

	// 先顯示背景效果 - 降低不透明度使背景圖更明顯
	tl.to(".bg-gradient-nature", {
		opacity: 0.7, // 降低不透明度
		duration: 1.2,
		ease: "power2.out"
	});

	// 顯示引用容器
	tl.to(
		".quote-container",
		{
			opacity: 1,
			scale: 1,
			duration: 1,
			ease: "expo.out"
		},
		"-=0.8"
	);

	// 顯示畫框 - 使用更現代的動畫方式
	tl.to(
		".quote-frame",
		{
			opacity: 0.4, // 降低不透明度
			width: "90%",
			height: "85%",
			duration: 1,
			borderRadius: "4px",
			ease: "expo.out"
		},
		"-=0.8"
	);

	// 顯示左右科技線條 - 從上到下擴展
	tl.to(
		".tech-line",
		{
			height: "70%",
			opacity: 0.8, // 調整不透明度
			stagger: 0.2,
			duration: 1.2,
			ease: "power4.out"
		},
		"-=0.8"
	);

	// 顯示電路圓環
	tl.to(
		".tech-circuit",
		{
			opacity: 1,
			stagger: 0.3,
			duration: 0.8,
			ease: "power2.out"
		},
		"-=1.2"
	);

	// 顯示電路圓環各層
	tl.to(
		".circuit-ring",
		{
			opacity: function (i) {
				return 0.2 + i * 0.15; // 由內到外透明度遞減
			},
			scale: 1,
			stagger: {
				each: 0.1,
				from: "end" // 由內到外顯示
			},
			duration: 1,
			ease: "expo.out"
		},
		"-=0.6"
	);

	// 顯示脈衝
	tl.to(
		".circuit-pulse",
		{
			opacity: 0.8,
			scale: 1,
			stagger: 0.3,
			duration: 0.5,
			ease: "power2.out"
		},
		"-=0.8"
	);

	// 顯示引號
	tl.to(
		".quote-marks",
		{
			opacity: 0.8,
			scale: 1,
			filter: "blur(0px)",
			stagger: 0.3,
			duration: 0.8,
			ease: "back.out(1.7)"
		},
		"-=1"
	);

	// 為每個句子中的每個字符添加更柔和的動畫效果
	sentences.value.forEach((sentence, sentenceIndex) => {
		const chars = document.querySelectorAll(`.quote-sentence:nth-child(${sentenceIndex + 1}) .quote-char`);

		// 使用更柔和的動畫效果
		tl.fromTo(
			chars,
			{
				opacity: 0,
				y: 15,
				filter: "blur(3px)"
			},
			{
				opacity: 1,
				y: 0,
				filter: "blur(0px)",
				duration: 0.08, // 增加持續時間使過渡更柔和
				stagger: {
					each: 0.08, // 增加字符之間的延遲
					from: "start",
					ease: "power1.inOut" // 使用更柔和的緩動函數
				},
				ease: "power1.out" // 更柔和的緩動
			},
			sentenceIndex === 0 ? "-=0.5" : ">=0.3" // 增加句子之間的間隔
		);

		// 每句話完成後添加更長的停頓
		if (sentenceIndex < sentences.value.length - 1) {
			tl.to({}, { duration: 0.5 }); // 增加句子間停頓時間
		}
	});

	// 顯示署名，使用更柔和的動畫
	tl.fromTo(
		".quote-signature",
		{
			opacity: 0,
			y: 20,
			filter: "blur(3px)"
		},
		{
			opacity: 1,
			y: 0,
			filter: "blur(0px)",
			duration: 1.2,
			ease: "power1.inOut"
		},
		">"
	);

	// 添加懸浮效果 - 畫框
	gsap.to(".quote-frame", {
		borderColor: "rgba(58, 209, 152, 0.3)",
		boxShadow: "0 0 30px rgba(58, 209, 152, 0.15)",
		duration: 2,
		repeat: -1,
		yoyo: true,
		ease: "sine.inOut"
	});

	// 電路效果動畫 - 取代原本的圓圈回放效果

	// 外環旋轉
	gsap.to(".circuit-ring.outer", {
		rotation: 360,
		duration: 40,
		repeat: -1,
		ease: "none"
	});

	// 中環反向旋轉
	gsap.to(".circuit-ring.middle", {
		rotation: -360,
		duration: 30,
		repeat: -1,
		ease: "none"
	});

	// 內環慢速旋轉
	gsap.to(".circuit-ring.inner", {
		rotation: 180,
		duration: 20,
		repeat: -1,
		ease: "none",
		yoyo: true
	});

	// 脈衝效果
	gsap.to(".circuit-pulse", {
		scale: 1.3,
		opacity: function (i, el) {
			// 根據元素位置設置不同的最大透明度
			const parent = el.parentNode;
			return parent.classList.contains("top-left") ? 0.7 : 0.5;
		},
		duration: 1.5,
		repeat: -1,
		repeatDelay: 0.5,
		ease: "sine.inOut"
	});

	// 電流流動效果 - 模擬電流在電路間流動
	const circuitTimeline = gsap.timeline({ repeat: -1 });

	// 添加閃爍效果
	circuitTimeline.to(".tech-circuit .circuit-ring", {
		boxShadow: "0 0 15px rgba(58, 209, 152, 0.8), inset 0 0 8px rgba(58, 209, 152, 0.8)",
		duration: 0.2,
		stagger: {
			each: 0.1,
			repeat: 1,
			yoyo: true
		}
	});

	// 延遲後再次閃爍
	circuitTimeline.to(
		".tech-circuit .circuit-ring",
		{
			boxShadow: "0 0 5px rgba(58, 209, 152, 0.3), inset 0 0 3px rgba(58, 209, 152, 0.3)",
			duration: 0.2
		},
		"+=1.5"
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

.bg-gradient-nature {
	background: radial-gradient(circle at 50% 50%, rgba(16, 48, 39, 0.3) 0%, rgba(17, 48, 39, 0.5) 100%);
	backdrop-filter: blur(6px); /* 減少模糊效果，讓背景更清晰 */
	transition: opacity 0.8s ease-in-out;
}

.quote-frame {
	position: absolute;
	border: 1px solid rgba(58, 209, 152, 0.2);
	box-shadow: 0 0 30px rgba(58, 209, 152, 0.1), inset 0 0 40px rgba(58, 209, 152, 0.05);
	z-index: 2;
	pointer-events: none;
	transition: border-color 0.5s ease, box-shadow 0.5s ease;
}

.tech-line {
	position: absolute;
	width: 2px;
	background: linear-gradient(to bottom, transparent, rgba(58, 209, 152, 0.8), transparent);
	z-index: 3;
	box-shadow: 0 0 15px rgba(58, 209, 152, 0.4);
}

.tech-line.left {
	top: 15%;
	left: 15%;
	height: 70%;
}

.tech-line.right {
	top: 15%;
	right: 15%;
	height: 70%;
}

/* 替換原本的圓圈為電路效果 */
.tech-circuit {
	position: absolute;
	width: 150px;
	height: 150px;
	z-index: 2;
	display: flex;
	justify-content: center;
	align-items: center;
}

.tech-circuit.top-left {
	top: 15%;
	left: 10%;
}

.tech-circuit.bottom-right {
	bottom: 15%;
	right: 10%;
}

/* 電路環效果 */
.circuit-ring {
	position: absolute;
	border-radius: 50%;
	border: 1px dashed rgba(58, 209, 152, 0.3);
	box-shadow: 0 0 5px rgba(58, 209, 152, 0.3), inset 0 0 3px rgba(58, 209, 152, 0.3);
	will-change: transform;
}

.circuit-ring.outer {
	width: 100%;
	height: 100%;
	background: radial-gradient(circle at center, transparent 88%, rgba(58, 209, 152, 0.2) 90%, transparent 100%);
}

.circuit-ring.middle {
	width: 80%;
	height: 80%;
	border-style: solid;
	background: radial-gradient(circle at center, transparent 85%, rgba(58, 209, 152, 0.3) 88%, transparent 100%);
}

.circuit-ring.inner {
	width: 60%;
	height: 60%;
	border-width: 2px;
	border-style: dotted;
	background: radial-gradient(circle at center, rgba(58, 209, 152, 0.05) 20%, transparent 80%);
}

/* 脈衝效果 */
.circuit-pulse {
	position: absolute;
	width: 30%;
	height: 30%;
	background: radial-gradient(circle at center, rgba(58, 209, 152, 0.4) 0%, transparent 70%);
	border-radius: 50%;
	box-shadow: 0 0 15px rgba(58, 209, 152, 0.5);
}

/* 在電路上增加節點 */
.tech-circuit::before,
.tech-circuit::after {
	content: "";
	position: absolute;
	width: 6px;
	height: 6px;
	background-color: rgba(58, 209, 152, 0.8);
	border-radius: 50%;
	box-shadow: 0 0 8px rgba(58, 209, 152, 0.8);
}

.tech-circuit::before {
	top: 10%;
	left: 50%;
}

.tech-circuit::after {
	bottom: 10%;
	right: 50%;
}

.tech-circuit.top-left::before {
	top: 15%;
	left: 15%;
}

.tech-circuit.top-left::after {
	bottom: 15%;
	right: 15%;
}

.tech-circuit.bottom-right::before {
	top: 20%;
	right: 20%;
}

.tech-circuit.bottom-right::after {
	bottom: 20%;
	left: 20%;
}

.quote-marks {
	position: absolute;
	z-index: 4;
	opacity: 0.8;
}

.quote-marks.left {
	top: 25%;
	left: 5%;
	transform: scale(1.5);
}

.quote-marks.right {
	bottom: 25%;
	right: 5%;
	transform: scale(1.5);
}

.quote-container {
	display: flex;
	flex-direction: column;
	align-items: center;
	gap: 16px;
	padding: 3rem;
	border-radius: 8px;
	background-color: rgba(17, 48, 39, 0.4); /* 降低不透明度 */
	box-shadow: 0 8px 32px rgba(0, 0, 0, 0.15);
	backdrop-filter: blur(8px);
	z-index: 5;
	border: 1px solid rgba(58, 209, 152, 0.1);
}

.quote-sentence {
	display: block;
	position: relative;
	text-shadow: 0 2px 10px rgba(58, 209, 152, 0.3);
	letter-spacing: 1px;
}

.quote-char {
	display: inline-block;
	opacity: 0;
	transform: translateY(20px);
	will-change: transform, opacity, filter;
}

.quote-signature {
	align-self: flex-end;
	margin-top: 2rem;
	transform: translateY(20px);
	opacity: 0;
	text-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
	position: relative;
	overflow: hidden;
	padding-left: 20px;
}

@media (max-width: 768px) {
	.quote-marks.left {
		left: 5%;
		transform: scale(1.2);
	}

	.quote-marks.right {
		right: 5%;
		transform: scale(1.2);
	}

	.tech-line.left {
		left: 8%;
	}

	.tech-line.right {
		right: 8%;
	}

	.tech-circuit {
		width: 100px;
		height: 100px;
	}

	.quote-container {
		padding: 2rem;
	}
}

@media (max-width: 640px) {
	.quote-marks.left,
	.quote-marks.right {
		transform: scale(1);
	}

	.quote-frame {
		width: 95% !important;
		height: 85% !important;
	}

	.tech-circuit {
		width: 80px;
		height: 80px;
	}
}
</style>
