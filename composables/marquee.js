import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export function animateMarquee() {
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
