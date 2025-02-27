import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export function animateQuoteText() {
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
