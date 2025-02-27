import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { nextTick } from "vue";

gsap.registerPlugin(ScrollTrigger);

export function useTextAnimation(titleRefs, textRefs) {
	nextTick(() => {
		titleRefs.value.forEach((title, index) => {
			const texts = textRefs.value[index] || [];

			const container = texts.length > 0 ? texts[0].closest(".story-container") : title?.closest(".story-container");

			if (!container) return;

			const tl = gsap.timeline({
				scrollTrigger: {
					trigger: container,
					start: "top 0%",
					end: "bottom 0%",
					// pin: true,
					scrub: false,
					toggleActions: "play none none none"
				}
			});

			// 先讓 title 出現
			if (title) {
				tl.fromTo(title, { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 1, ease: "power3.out" });
			}

			// 再讓 texts 依序出現
			if (texts.length) {
				tl.fromTo(texts, { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 1, stagger: 0.5, ease: "power3.out" });
			}
		});
	});
}
