<template>
	<div>
		<section id="story" class="my-[128px] md:my-[256px] space-y-[128px] md:space-y-[256px]">
			<!-- Block 1: Intro Section -->
			<div id="story-intro-block" class="min-h-screen relative flex justify-center items-center overflow-hidden">
				<!-- Centered Intro text container, arranging vertical texts horizontally -->
				<div ref="introContainerRef" class="flex flex-row-reverse gap-[6px] md:gap-[24px] lg:gap-[48px] opacity-0">
					<p v-for="(text, i) in introTexts" :key="i" :ref="(el) => (introTextRefs[i] = el)" class="vertical-text text-[16px] md:text-[24px] lg:text-[36px]">
						{{ $t(text) }}
					</p>
				</div>
			</div>

			<!-- Block 2: Themes Section -->
			<div
				id="story-themes-block"
				ref="storyThemesBlockRef"
				class="h-screen relative flex justify-center items-center py-[64px] md:py-[128px] overflow-visible"
			>
				<!-- Theme Items -->
				<div
					v-for="(theme, key) in themes"
					:key="key"
					:ref="(el) => (themeRefs[key].container = el)"
					class="absolute transition-opacity duration-300"
					:class="getThemePositionClass(key)"
					@mouseenter="handleThemeMouseEnter(key)"
					@mouseleave="handleThemeMouseLeave(key)"
				>
					<!-- Aura Effect Div -->
					<div :class="['theme-aura', `aura-${key}`]" :ref="(el) => (themeRefs[key].aura = el)"></div>

					<button
						type="button"
						:ref="(el) => (themeRefs[key].title = el)"
						class="vertical-title text-[36px] md:text-[60px] lg:text-[80px] p-[8px] rounded-lg opacity-0 cursor-pointer font-semibold focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-opacity-75"
						style="position: relative; z-index: 10"
						@click="handleThemeClick(key)"
						:aria-expanded="activeThemeKey === key ? 'true' : 'false'"
						:aria-controls="`theme-details-${key}`"
					>
						{{ $t(theme.title) }}
					</button>
				</div>

				<!-- Unified Details Box - Replaced with individual theme detail containers -->
				<div ref="cloudDetailsContainerRef" class="details-set" :id="`theme-details-cloud`">
					<p
						v-for="(text, i) in themes.cloud.texts"
						:key="`cloud-${i}`"
						:ref="(el) => (cloudDetailParaRefs[i] = el)"
						class="vertical-text text-[16px] md:text-[21px] lg:text-[28px] opacity-0"
					>
						{{ $t(text) }}
					</p>
				</div>
				<div ref="mountainDetailsContainerRef" class="details-set" :id="`theme-details-mountain`">
					<p
						v-for="(text, i) in themes.mountain.texts"
						:key="`mountain-${i}`"
						:ref="(el) => (mountainDetailParaRefs[i] = el)"
						class="vertical-text text-[16px] md:text-[21px] lg:text-[28px] opacity-0"
					>
						{{ $t(text) }}
					</p>
				</div>
				<div ref="skyDetailsContainerRef" class="details-set" :id="`theme-details-sky`">
					<p
						v-for="(text, i) in themes.sky.texts"
						:key="`sky-${i}`"
						:ref="(el) => (skyDetailParaRefs[i] = el)"
						class="vertical-text text-[16px] md:text-[21px] lg:text-[28px] opacity-0"
					>
						{{ $t(text) }}
					</p>
				</div>
			</div>
		</section>
	</div>
</template>

<script setup>
import { ref, onMounted, nextTick, inject, reactive, watch } from "vue";
import gsap from "gsap"; // Import GSAP

// Keep intro texts separate
const introTexts = ["poem intro", "story inspiration", "cloud mountain description", "natural scenery", "harmony philosophy"];

// Main themes data
const themes = reactive({
	cloud: {
		title: "cloud title",
		texts: ["cloud agile", "symbolizes innovation", "innovation core", "breakthrough solutions", "overcoming challenges"],
		auraOpacity: 0.45
	},
	mountain: {
		title: "mountain title",
		texts: ["mountain symbolizes", "excellence commitment", "reliable attitude", "long term partnership"],
		auraOpacity: 0.4
	},
	sky: {
		title: "sky title",
		texts: ["clear sky", "future vision", "helping clients", "shaping future", "achieving results"],
		auraOpacity: 0.5
	}
});

// Refs for intro section
const introContainerRef = ref(null);
const introTextRefs = ref([]);

// Refs for main themes
const themeRefs = reactive({
	cloud: { container: null, title: null, aura: null },
	mountain: { container: null, title: null, aura: null },
	sky: { container: null, title: null, aura: null }
});

const storyThemesBlockRef = ref(null);

// Refs for individual theme detail containers and their paragraphs
const cloudDetailsContainerRef = ref(null);
const mountainDetailsContainerRef = ref(null);
const skyDetailsContainerRef = ref(null);
const cloudDetailParaRefs = ref([]);
const mountainDetailParaRefs = ref([]);
const skyDetailParaRefs = ref([]);

const activeThemeKey = ref(null);
const clickedThemeKey = ref(null); // To store the key of the clicked theme on desktop

const scrollAnimation = inject("scrollAnimation");

const AURA_TARGET_SCALE = 1.8;
const AURA_INITIAL_SCALE = 0.3;

let detailAnimationTl = null;
let introTl = null;
let themesTl = null;

const themeElementMap = {
	cloud: { container: cloudDetailsContainerRef, paras: cloudDetailParaRefs },
	mountain: { container: mountainDetailsContainerRef, paras: mountainDetailParaRefs },
	sky: { container: skyDetailsContainerRef, paras: skyDetailParaRefs }
};

const showAura = (key) => {
	const auraEl = themeRefs[key]?.aura;
	const themeData = themes[key];
	if (auraEl && themeData) {
		auraEl.style.opacity = String(themeData.auraOpacity || 0.45);
		auraEl.style.transform = `translate(-50%, -50%) scale(${AURA_TARGET_SCALE})`;
	}
};

const hideAura = (key) => {
	const auraEl = themeRefs[key]?.aura;
	if (auraEl) {
		auraEl.style.opacity = "0";
		auraEl.style.transform = `translate(-50%, -50%) scale(${AURA_INITIAL_SCALE})`;
	}
};

watch(activeThemeKey, async (newKey, oldKey) => {
	await nextTick(); // Ensure Vue has processed any pending DOM updates and refs are settled

	if (detailAnimationTl) detailAnimationTl.kill();

	if (oldKey) hideAura(oldKey);
	if (newKey) showAura(newKey);

	const oldElements = oldKey ? themeElementMap[oldKey] : null;
	const newElements = newKey ? themeElementMap[newKey] : null;

	// Animate out old elements if they exist and are different from new ones
	if (oldElements && oldKey !== newKey) {
		const parasToHide = oldElements.paras.value.filter(Boolean);
		if (parasToHide.length > 0) {
			await gsap
				.to(parasToHide, {
					opacity: 0,
					y: -20, // Animate upwards for exit
					duration: 0.3,
					ease: "power3.in",
					stagger: 0.05
				})
				.then();
		}
		if (oldElements.container.value) {
			gsap.to(oldElements.container.value, { opacity: 0, duration: 0.2 }); // Quick fade for container
			oldElements.container.value.style.pointerEvents = "none";
		}
	}

	// Animate in new elements if they exist
	if (newElements) {
		if (newElements.container.value) {
			newElements.container.value.style.pointerEvents = "auto";
			// Ensure container is set to opacity 0 before fade in, in case it wasn't fully faded out by a rapid switch
			if (oldKey !== null) {
				gsap.set(newElements.container.value, { opacity: 0 });
			}
			gsap.to(newElements.container.value, { opacity: 1, duration: 0.3, ease: "power3.out", delay: oldElements && oldKey !== newKey ? 0.1 : 0 }); // Slight delay if old one was fading
		}

		const parasToShow = newElements.paras.value.filter(Boolean);
		if (parasToShow.length > 0) {
			// Reset starting state for paragraphs before animating them in
			gsap.set(parasToShow, { opacity: 0, y: 20 }); // Animate from downwards

			detailAnimationTl = gsap.timeline();
			detailAnimationTl.to(
				parasToShow,
				{
					opacity: 1,
					y: 0,
					duration: 0.7,
					ease: "power3.out",
					stagger: { each: 0.2, from: "start" }
				},
				oldElements && oldKey !== newKey ? "+=0.2" : "+=0.1"
			); // Delay based on whether an old element was present
		}
	} else if (oldElements) {
		// If newKey is null, but there was an oldKey, ensure it's hidden
		const parasToHide = oldElements.paras.value.filter(Boolean);
		if (parasToHide.length > 0) {
			// No await needed if we just want to kick off the hide animation
			gsap.to(parasToHide, { opacity: 0, y: -20, duration: 0.3, ease: "power3.in", stagger: 0.05 });
		}
		if (oldElements.container.value) {
			gsap.to(oldElements.container.value, { opacity: 0, duration: 0.2 });
			oldElements.container.value.style.pointerEvents = "none";
		}
	}
});

const handleThemeClick = (key) => {
	if (scrollAnimation.isMobile.value) {
		if (activeThemeKey.value === key) {
			activeThemeKey.value = null;
		} else {
			activeThemeKey.value = key;
		}
	} else {
		// Desktop: click to pin/unpin
		if (clickedThemeKey.value === key) {
			clickedThemeKey.value = null; // Unpin, activeThemeKey remains to keep content visible
		} else {
			activeThemeKey.value = key; // Set active and pin
			clickedThemeKey.value = key;
		}
	}
};

const handleThemeMouseEnter = (key) => {
	if (!scrollAnimation.isMobile.value && !clickedThemeKey.value) {
		// Only hover if not mobile and no theme is pinned
		activeThemeKey.value = key;
	}
};

const handleThemeMouseLeave = (key) => {
	if (!scrollAnimation.isMobile.value && clickedThemeKey.value && activeThemeKey.value !== clickedThemeKey.value) {
		activeThemeKey.value = clickedThemeKey.value;
	}
};

const getThemePositionClass = (key) => {
	switch (key) {
		case "cloud":
			return "top-[15%] right-[10%] md:right-[15%]";
		case "mountain":
			return "bottom-[5%] left-[30%]";
		case "sky":
			return "top-[20%] left-[10%] md:left-[15%]";
		default:
			return "";
	}
};

const setupStoryAnimation = () => {
	introTl = scrollAnimation.createTimelineAnimation({
		trigger: `#story-intro-block`,
		start: "top 70%",
		end: "bottom 20%",
		toggleActions: "play none none reverse"
	});

	if (introContainerRef.value && introTextRefs.value.length) {
		introTl
			.fromTo(introContainerRef.value, { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 1.2, ease: "power3.out" })
			.fromTo(
				introTextRefs.value,
				{ opacity: 0, y: 20 },
				{ opacity: 1, y: 0, duration: 0.9, ease: "power3.out", stagger: { each: 0.4, from: "start" } },
				"-=0.5"
			);
	}

	themesTl = scrollAnimation.createTimelineAnimation({
		trigger: `#story-themes-block`,
		start: "top 70%",
		end: "bottom 20%",
		toggleActions: "play none none reverse"
	});

	const THEME_ANIM_STAGGER = 0.3;
	const THEME_ANIM_DURATION = 1.0;
	const themeOrder = ["cloud", "mountain", "sky"];
	const lastThemeKey = themeOrder[themeOrder.length - 1];

	themeOrder.forEach((themeKey, index) => {
		const titleEl = themeRefs[themeKey]?.title;
		if (titleEl) {
			const startTime = index * THEME_ANIM_STAGGER;
			themesTl.fromTo(titleEl, { opacity: 0, y: 50 }, { opacity: 1, y: 0, duration: THEME_ANIM_DURATION, ease: "power3.out" }, startTime);
			// If this is the last theme's title animation, add a label at its theoretical end point
			if (themeKey === lastThemeKey) {
				themesTl.addLabel("lastTitleAnimationEnd", startTime + THEME_ANIM_DURATION - 0.2);
			}
		}
	});

	// Use the label for the .call() to trigger it precisely when the last title animation should end
	themesTl.call(
		() => {
			if (activeThemeKey.value === null) {
				activeThemeKey.value = "cloud";
			}
		},
		[],
		"lastTitleAnimationEnd"
	);
};

onMounted(async () => {
	try {
		await nextTick();
		introTextRefs.value = introTextRefs.value.filter(Boolean);

		// Initialize auras and detail containers to hidden state
		Object.keys(themes).forEach((key) => {
			const auraEl = themeRefs[key]?.aura;
			if (auraEl) {
				auraEl.style.opacity = "0";
				auraEl.style.transform = `translate(-50%, -50%) scale(${AURA_INITIAL_SCALE})`;
			}
			// Initialize detail containers
			const elements = themeElementMap[key];
			if (elements && elements.container.value) {
				elements.container.value.style.opacity = "0";
				elements.container.value.style.pointerEvents = "none";
			}
		});

		await scrollAnimation.initScrollPlugins();
		setupStoryAnimation();
	} catch (error) {
		console.error("Story 動畫設置錯誤:", error);
	}
});

import { onUnmounted } from "vue";
onUnmounted(() => {
	if (detailAnimationTl) {
		detailAnimationTl.kill();
	}
	if (introTl) {
		introTl.kill();
	}
	if (themesTl) {
		themesTl.kill();
	}
});
</script>

<style scoped>
.vertical-text,
.vertical-title {
	writing-mode: vertical-lr;
	height: fit-content;
	padding-top: 10px;
	letter-spacing: 10px;
	text-orientation: upright;
	background: linear-gradient(45deg, transparent, #f2f2f2);
	box-shadow: 2px 2px 10px rgba(0, 0, 0, 0.5);
	font-family: "LXGW WenKai Mono TC";
}

.details-set {
	position: absolute;
	display: flex;
	flex-direction: row-reverse;
	gap: 6px;
	opacity: 0;
	pointer-events: none;
}

@media (min-width: 768px) {
	/* md */
	.details-set {
		gap: 24px;
	}
}

@media (min-width: 1024px) {
	/* lg */
	.details-set {
		gap: 48px;
	}
}

.theme-aura {
	position: absolute;
	top: 50%;
	left: 50%;
	transform: translate(-50%, -50%) scale(0.3);
	border-radius: 50%;
	pointer-events: none;
	z-index: 0;
	opacity: 0;
	transition: opacity 0.3s ease-out, transform 0.4s ease-out;
	width: 100px;
	height: 100px;
}

@media (min-width: 448px) {
	.theme-aura {
		width: 100px;
		height: 100px;
	}
}

/* Medium screens (md) aura size adjustment */
@media (min-width: 768px) {
	.theme-aura {
		width: 200px;
		height: 200px;
	}
}

/* Large screens (lg) aura size adjustment */
@media (min-width: 1024px) {
	.theme-aura {
		width: 300px;
		height: 300px;
	}
}

/* Color definitions remain specific */
.aura-cloud {
	background: radial-gradient(circle, rgba(235, 245, 255, 0.6) 10%, rgba(200, 220, 255, 0) 70%);
	box-shadow: 0 0 30px 15px rgba(210, 230, 250, 0.25);
}

.aura-mountain {
	background: radial-gradient(ellipse at center, rgba(60, 90, 70, 0.5) 15%, rgba(40, 60, 50, 0) 70%);
	box-shadow: 0 0 35px 15px rgba(50, 80, 60, 0.2);
}

.aura-sky {
	background: radial-gradient(circle, rgba(120, 220, 180, 0.55) 15%, rgba(80, 180, 150, 0) 70%);
	box-shadow: 0 0 30px 15px rgba(100, 200, 160, 0.25);
}
</style>
