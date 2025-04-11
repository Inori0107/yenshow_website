import { gsap } from "gsap";

// 動態初始化 ScrollTrigger
let scrollTriggerInitialized = false;
const initScrollTrigger = async () => {
	if (scrollTriggerInitialized) return;

	try {
		// 檢查是否在瀏覽器環境中
		if (typeof window !== "undefined") {
			const { ScrollTrigger } = await import("gsap/ScrollTrigger");
			gsap.registerPlugin(ScrollTrigger);
			scrollTriggerInitialized = true;
		}
	} catch (error) {
		console.error("Error initializing ScrollTrigger:", error);
	}
};

export async function animateMarquee() {
	await initScrollTrigger();
	if (!scrollTriggerInitialized) return;

	const ScrollTrigger = gsap.plugins.scrollTrigger.ScrollTrigger || gsap.plugins.scrollTrigger;

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
