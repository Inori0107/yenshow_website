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

export async function animateMarquee() {
	// 初始化並獲取 ScrollTrigger
	const ScrollTrigger = await initScrollTrigger();
	if (!ScrollTrigger) return;

	// 確保在瀏覽器環境中執行
	if (typeof document === "undefined") return;

	const leftMarquee = document.querySelector(".marquee-left");
	const rightMarquee = document.querySelector(".marquee-right");

	if (!leftMarquee || !rightMarquee) return;

	gsap.to(".marquee-left", {
		x: -100,
		scrollTrigger: {
			trigger: ".marquee-left",
			start: "top bottom",
			end: "bottom top",
			scrub: 1.5
		}
	});

	gsap.to(".marquee-right", {
		x: 100,
		scrollTrigger: {
			trigger: ".marquee-right",
			start: "top bottom",
			end: "bottom top",
			scrub: 1.5
		}
	});
}
