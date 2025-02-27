import gsap from "gsap";

export function useEntranceAnimation(logo, heroText, blocksRef) {
	gsap.to(logo.value, { opacity: 1, scale: 1, duration: 2, ease: "power3.out" });

	gsap.fromTo(heroText.value, { opacity: 0, x: -50 }, { opacity: 1, x: 0, duration: 1.2, ease: "power2.out", delay: 0.5 });

	gsap.to(blocksRef.value, {
		opacity: 1,
		scale: 1,
		duration: 0.8,
		stagger: 0.3,
		ease: "power2.out",
		delay: 1
	});
}
