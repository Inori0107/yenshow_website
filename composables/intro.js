import { gsap } from "gsap";

// 動態初始化 ScrollTrigger
let scrollTriggerInitialized = false;
const initScrollTrigger = async () => {
	if (scrollTriggerInitialized) return;

	try {
		// 檢查是否在瀏覽器環境中
		if (typeof window !== "undefined") {
			const ScrollTriggerModule = await import("gsap/ScrollTrigger");
			// 處理不同模塊格式的導入
			const ScrollTrigger = ScrollTriggerModule.default || ScrollTriggerModule.ScrollTrigger;
			gsap.registerPlugin(ScrollTrigger);
			scrollTriggerInitialized = true;
			return ScrollTrigger; // 返回插件以便後續使用
		}
	} catch (error) {
		console.error("Error initializing ScrollTrigger:", error);
	}
	return null;
};

// 輔助函數：檢查元素是否存在
const elementExists = (selector) => {
	if (typeof document === "undefined") return false;
	return document.querySelector(selector) !== null;
};

export async function animateSection() {
	// 初始化並獲取 ScrollTrigger
	const ScrollTrigger = await initScrollTrigger();
	if (!ScrollTrigger) return;

	// 確保在瀏覽器環境中執行
	if (typeof document === "undefined") return;

	// 確認動畫目標元素存在
	if (!elementExists(".intro-animation")) return;

	gsap.fromTo(
		".intro-animation",
		{
			scaleX: 0.5, // 初始狀態較小
			opacity: 0,
			borderRadius: "0px",
			transformOrigin: "bottom center" // 讓展開感覺從底部出現
		},
		{
			scaleX: 1,
			opacity: 1,
			borderRadius: "100px",
			duration: 1.8,
			ease: "expo.out", // 更有展開感的緩動
			scrollTrigger: {
				trigger: ".intro-animation",
				start: "top 80%",
				end: "top 20%",
				scrub: 1, // 增加滾動同步感
				toggleActions: "play none none reverse"
			}
		}
	);
}

export async function animateFeatures() {
	// 初始化並獲取 ScrollTrigger
	const ScrollTrigger = await initScrollTrigger();
	if (!ScrollTrigger) return;

	// 確保在瀏覽器環境中執行
	if (typeof document === "undefined") return;

	// 檢查目標元素是否存在
	const hasBackground = elementExists(".intro-background");
	const hasRow1 = elementExists(".hexagon-row-1");
	const hasRow2 = elementExists(".hexagon-row-2");
	const hasRow3 = elementExists(".hexagon-row-3");

	try {
		// 背景圖片淡入
		if (hasBackground) {
			gsap.from(".intro-background", {
				opacity: 0,
				y: 50,
				duration: 1.2,
				ease: "power2.out",
				scrollTrigger: {
					trigger: ".intro-background",
					start: "top 80%",
					toggleActions: "play none none reverse"
				}
			});
		}

		// 第一排 Hexagon 依序浮現
		if (hasRow1) {
			gsap.from(".hexagon-row-1 .hexagon", {
				opacity: 0,
				y: 30,
				stagger: 0.3,
				duration: 1,
				ease: "power3.out",
				scrollTrigger: {
					trigger: ".hexagon-row-1",
					start: "top 80%"
				}
			});
		}

		// 第二排（Hexagon、標題、標誌）依序浮現
		if (hasRow2) {
			gsap.from(".hexagon-row-2 > *", {
				opacity: 0,
				y: 40,
				stagger: 0.3,
				duration: 1,
				ease: "power3.out",
				scrollTrigger: {
					trigger: ".hexagon-row-2",
					start: "top 75%"
				}
			});
		}

		// 第三排 Hexagon 依序浮現
		if (hasRow3) {
			gsap.from(".hexagon-row-3 .hexagon", {
				opacity: 0,
				y: 30,
				stagger: 0.3,
				duration: 1,
				ease: "power3.out",
				scrollTrigger: {
					trigger: ".hexagon-row-3",
					start: "top 70%"
				}
			});
		}
	} catch (error) {
		console.error("Error in animateFeatures:", error);
	}
}

export async function animateYSCPText() {
	// 初始化並獲取 ScrollTrigger
	const ScrollTrigger = await initScrollTrigger();
	if (!ScrollTrigger) return;

	// 確保在瀏覽器環境中執行
	if (typeof document === "undefined") return;

	// 檢查元素是否存在
	if (!elementExists(".yscp-text")) return;

	gsap.from(".yscp-text", {
		opacity: 0,
		y: 50,
		duration: 1.2,
		ease: "power3.out",
		scrollTrigger: {
			trigger: ".yscp-text",
			start: "top 80%",
			toggleActions: "play none none reverse"
		}
	});
}

export async function animateFeaturesFadeIn() {
	// 初始化並獲取 ScrollTrigger
	const ScrollTrigger = await initScrollTrigger();
	if (!ScrollTrigger) return;

	// 確保在瀏覽器環境中執行
	if (typeof document === "undefined") return;

	// 檢查元素是否存在
	if (!elementExists(".YSCP-circle")) return;

	gsap.from(".YSCP-circle", {
		opacity: 0,
		duration: 1.5,
		delay: 1,
		ease: "power3.out",
		stagger: 0.3, // 依序出現
		scrollTrigger: {
			trigger: ".YSCP-circle",
			start: "top 80%",
			toggleActions: "play none none reverse"
		}
	});
}

export async function animateCircle() {
	// 初始化並獲取 ScrollTrigger
	const ScrollTrigger = await initScrollTrigger();
	if (!ScrollTrigger) return;

	// 確保在瀏覽器環境中執行
	if (typeof document === "undefined") return;

	const Circles = document.querySelectorAll(".animateCircle");
	if (!Circles || Circles.length === 0) return;

	gsap.to(Circles, {
		delay: 2,
		scale: 4,
		opacity: 0,
		duration: 3,
		repeat: -1,
		stagger: 1,
		ease: "power2.out",
		scrollTrigger: {
			trigger: Circles,
			start: "top 80%",
			toggleActions: "play none none reverse"
		}
	});
}
