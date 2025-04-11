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

export async function animateQuoteText() {
	// 初始化並獲取 ScrollTrigger
	const ScrollTrigger = await initScrollTrigger();
	if (!ScrollTrigger) return;

	// 確保在瀏覽器環境中執行
	if (typeof document === "undefined") return;

	const sentences = document.querySelectorAll(".quote-sentence");
	if (!sentences || sentences.length === 0) return;

	let tl = gsap.timeline({
		scrollTrigger: {
			trigger: ".quote-container",
			start: "top 50%",
			end: "bottom 0%",
			toggleActions: "play none none reverse"
		}
	});

	sentences.forEach((sentence, index) => {
		let chars = sentence.querySelectorAll(".quote-char");
		if (chars && chars.length > 0) {
			tl.to(
				chars,
				{
					opacity: 1,
					y: 0,
					duration: 0.5,
					stagger: 0.1,
					ease: "power2.out"
				},
				`+=0.2`
			);
		}
	});
}
