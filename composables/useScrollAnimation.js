import { ref, onMounted, onUnmounted } from "vue";
import gsap from "gsap";

export function useScrollAnimation() {
	const ScrollTrigger = ref(null);
	const ScrollToPlugin = ref(null);
	const isInitialized = ref(false);

	// 初始化GSAP插件
	const initScrollPlugins = async () => {
		if (isInitialized.value) return { ScrollTrigger: ScrollTrigger.value, ScrollToPlugin: ScrollToPlugin.value };

		try {
			const ST = await import("gsap/ScrollTrigger");
			ScrollTrigger.value = ST.default || ST.ScrollTrigger;

			const STP = await import("gsap/ScrollToPlugin");
			ScrollToPlugin.value = STP.default || STP.ScrollToPlugin;

			gsap.registerPlugin(ScrollTrigger.value, ScrollToPlugin.value);
			isInitialized.value = true;

			return { ScrollTrigger: ScrollTrigger.value, ScrollToPlugin: ScrollToPlugin.value };
		} catch (error) {
			console.error("初始化滾動插件錯誤:", error);
			return { ScrollTrigger: null, ScrollToPlugin: null };
		}
	};

	// 刷新所有滾動觸發器
	const refreshScrollTriggers = () => {
		if (ScrollTrigger.value) {
			ScrollTrigger.value.refresh();
		}
	};

	// 導航到指定區塊
	const scrollToSection = (id, offset = 50) => {
		const target = document.getElementById(id);
		if (target && ScrollToPlugin.value) {
			gsap.to(window, {
				duration: 2.5,
				scrollTo: {
					y: target,
					offsetY: offset,
					autoKill: false
				},
				ease: "power3.inOut",
				onStart: () => {
					document.body.style.pointerEvents = "none";
				},
				onComplete: () => {
					document.body.style.pointerEvents = "auto";
				}
			});
		} else if (!target) {
			console.warn(`無法找到目標區塊: #${id}，請確認該元素存在於頁面中`);
		}
	};

	// 設置基本滾動動畫
	const createScrollAnimation = (params) => {
		const { trigger, animation, start = "top 80%", end = "bottom 20%", toggleActions = "play none none reverse" } = params;

		if (!ScrollTrigger.value) return null;

		return gsap
			.timeline({
				scrollTrigger: {
					trigger,
					start,
					end,
					toggleActions
				}
			})
			.add(animation);
	};

	// 創建固定區塊
	const createPinnedSection = (params) => {
		const { trigger, start = "top top", end, scrub = 1, markers = false, onUpdate } = params;

		if (!ScrollTrigger.value) return null;

		return ScrollTrigger.value.create({
			trigger,
			pin: true,
			start,
			end: end || (() => `+=${window.innerHeight}`),
			markers,
			pinSpacing: true,
			anticipatePin: 1,
			scrub,
			snap: params.snap || {
				snapTo: 1,
				duration: 0.8,
				ease: "power2.out"
			},
			onUpdate
		});
	};

	// 創建字符動畫 - 為字符逐個添加動畫效果
	const createCharAnimation = (params) => {
		const {
			selector,
			trigger,
			start = "top 80%",
			end = "bottom 20%",
			staggerAmount = 0.05,
			duration = 0.7,
			fromY = 20,
			fromOpacity = 0,
			toY = 0,
			toOpacity = 1,
			ease = "power3.out",
			delay = 0
		} = params;

		if (!ScrollTrigger.value) return null;

		// 選擇所有字符元素
		const chars = document.querySelectorAll(selector);
		if (chars.length === 0) return null;

		// 創建時間軸
		return gsap
			.timeline({
				scrollTrigger: {
					trigger,
					start,
					end,
					toggleActions: "play none none reverse"
				}
			})
			.fromTo(
				chars,
				{
					y: fromY,
					opacity: fromOpacity
				},
				{
					y: toY,
					opacity: toOpacity,
					duration,
					stagger: staggerAmount,
					ease,
					delay
				}
			);
	};

	// 創建文字動畫 - 為文字塊添加動畫效果
	const createTextAnimation = (params) => {
		const {
			elements,
			trigger,
			start = "top 80%",
			end,
			staggerAmount = 0.2,
			staggerFrom = "start",
			fromY = 30,
			fromOpacity = 0,
			toY = 0,
			toOpacity = 1,
			duration = 1,
			delay = 0,
			ease = "power2.out"
		} = params;

		if (!ScrollTrigger.value) return null;

		// 選擇所有文字元素
		const textElements = document.querySelectorAll(elements);
		if (textElements.length === 0) return null;

		// 創建時間軸
		return gsap
			.timeline({
				scrollTrigger: {
					trigger,
					start,
					end: end || "bottom 20%",
					toggleActions: "play none none reverse"
				}
			})
			.fromTo(
				textElements,
				{
					y: fromY,
					opacity: fromOpacity
				},
				{
					y: toY,
					opacity: toOpacity,
					duration,
					stagger: {
						amount: staggerAmount,
						from: staggerFrom
					},
					ease,
					delay
				}
			);
	};

	// 創建元素入場動畫 - 針對一般元素的動畫效果
	const createElementEntrance = (params) => {
		const {
			elements,
			trigger,
			start = "top 80%",
			end,
			fromY = 30,
			fromOpacity = 0,
			fromScale = 1,
			toY = 0,
			toOpacity = 1,
			toScale = 1,
			duration = 1,
			delay = 0,
			ease = "power2.out"
		} = params;

		if (!ScrollTrigger.value) return null;

		// 選擇所有目標元素
		const targetElements = document.querySelectorAll(elements);
		if (targetElements.length === 0) return null;

		// 創建時間軸
		return gsap
			.timeline({
				scrollTrigger: {
					trigger,
					start,
					end: end || "bottom 20%",
					toggleActions: "play none none reverse"
				}
			})
			.fromTo(
				targetElements,
				{
					y: fromY,
					opacity: fromOpacity,
					scale: fromScale
				},
				{
					y: toY,
					opacity: toOpacity,
					scale: toScale,
					duration,
					ease,
					delay
				}
			);
	};

	// 清理所有滾動觸發器
	const cleanupScrollTriggers = () => {
		if (ScrollTrigger.value) {
			ScrollTrigger.value.getAll().forEach((trigger) => trigger.kill());
		}
	};

	// 窗口大小變化處理
	const handleResize = () => refreshScrollTriggers();

	// 基礎元素動畫 - 用於創建從一種狀態到另一種狀態的過渡
	const createBasicAnimation = (params) => {
		const {
			elements,
			trigger,
			start = "top 80%",
			end = "bottom 20%",
			fromProps = { opacity: 0, y: 30 },
			toProps = { opacity: 1, y: 0 },
			duration = 1,
			delay = 0,
			stagger = 0,
			ease = "power2.out",
			scrub = false,
			toggleActions = "play none none reverse"
		} = params;

		if (!elements || !ScrollTrigger.value) return null;

		return gsap.fromTo(
			elements,
			{ ...fromProps },
			{
				...toProps,
				duration,
				delay,
				stagger: stagger > 0 ? stagger : undefined,
				ease,
				scrollTrigger: {
					trigger,
					start,
					end,
					scrub,
					toggleActions
				}
			}
		);
	};

	// 創建時間軸動畫 - 用於更複雜的連續動畫
	const createTimelineAnimation = (params) => {
		const { trigger, start = "top 80%", end = "bottom 20%", scrub = false, toggleActions = "play none none reverse" } = params;

		if (!ScrollTrigger.value) return null;

		return gsap.timeline({
			scrollTrigger: {
				trigger,
				start,
				end,
				scrub,
				toggleActions
			}
		});
	};

	// 基礎視差效果
	const createParallax = (params) => {
		const { element, trigger, start = "top bottom", end = "bottom top", fromProps = { yPercent: 0 }, toProps = { yPercent: 30 }, scrub = true } = params;

		if (!element || !ScrollTrigger.value) return null;

		return gsap.fromTo(
			element,
			{ ...fromProps },
			{
				...toProps,
				ease: "none",
				scrollTrigger: {
					trigger,
					start,
					end,
					scrub
				}
			}
		);
	};

	onMounted(async () => {
		await initScrollPlugins();
		window.addEventListener("resize", handleResize);
	});

	onUnmounted(() => {
		window.removeEventListener("resize", handleResize);
		cleanupScrollTriggers();
	});

	// 核心功能
	const core = {
		ScrollTrigger,
		ScrollToPlugin,
		initScrollPlugins,
		refreshScrollTriggers,
		scrollToSection,
		cleanupScrollTriggers,
		handleResize
	};

	// 基本動畫工具
	const animationTools = {
		createScrollAnimation,
		createPinnedSection,
		createBasicAnimation,
		createTimelineAnimation,
		createCharAnimation,
		createTextAnimation,
		createElementEntrance,
		createParallax
	};

	return {
		...core,
		...animationTools,
		gsap // 導出 gsap 實例，允許元件直接訪問更高級的功能
	};
}
