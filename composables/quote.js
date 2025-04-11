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

export async function animateQuoteText() {
	await initScrollTrigger();
	if (!scrollTriggerInitialized) return;

	const ScrollTrigger = gsap.plugins.scrollTrigger.ScrollTrigger || gsap.plugins.scrollTrigger;

	const sentences = document.querySelectorAll(".quote-sentence");

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
	});
}
