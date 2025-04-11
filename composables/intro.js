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

export async function animateSection() {
	await initScrollTrigger();
	if (!scrollTriggerInitialized) return;

	const ScrollTrigger = gsap.plugins.scrollTrigger.ScrollTrigger || gsap.plugins.scrollTrigger;

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
	await initScrollTrigger();
	if (!scrollTriggerInitialized) return;

	const ScrollTrigger = gsap.plugins.scrollTrigger.ScrollTrigger || gsap.plugins.scrollTrigger;

	// 背景圖片淡入
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

	// 第一排 Hexagon 依序浮現
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

	// 第二排（Hexagon、標題、標誌）依序浮現
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

	// 第三排 Hexagon 依序浮現
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

export async function animateYSCPText() {
	await initScrollTrigger();
	if (!scrollTriggerInitialized) return;

	const ScrollTrigger = gsap.plugins.scrollTrigger.ScrollTrigger || gsap.plugins.scrollTrigger;

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
	await initScrollTrigger();
	if (!scrollTriggerInitialized) return;

	const ScrollTrigger = gsap.plugins.scrollTrigger.ScrollTrigger || gsap.plugins.scrollTrigger;

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
	await initScrollTrigger();
	if (!scrollTriggerInitialized) return;

	const ScrollTrigger = gsap.plugins.scrollTrigger.ScrollTrigger || gsap.plugins.scrollTrigger;

	const Circles = document.querySelectorAll(".animateCircle");

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
