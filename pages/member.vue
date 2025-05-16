<template>
	<div class="bg-gradient-to-r from-[#0f172a] to-[#1e293b] min-h-screen py-[80px] md:py-[120px] overflow-hidden text-secondary">
		<div class="tech-grid absolute inset-0 z-0 opacity-10"></div>
		<div class="container relative z-10 mx-auto px-4">
			<!-- Page Title Section -->
			<div class="mb-[48px] md:mb-[64px] text-center">
				<h1 class="text-[36px] md:text-[64px] lg:text-[72px] font-bold animate-title text-white">認識我們的團隊</h1>
				<p class="text-[16px] md:text-[20px] text-gray-300 opacity-80 mt-[12px] animate-subtitle">驅動創新的核心力量，一群對技術充滿熱情的專家。</p>
			</div>

			<!-- Member List -->
			<div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8">
				<div v-for="(member, index) in teamMembers" :key="member.id" class="member-card animate-card" :style="{ animationDelay: `${index * 0.1}s` }">
					<div class="member-photo">
						<!-- Placeholder SVG icon for member photo -->
						<svg
							xmlns="http://www.w3.org/2000/svg"
							width="48"
							height="48"
							viewBox="0 0 24 24"
							fill="none"
							stroke="currentColor"
							stroke-width="1.5"
							class="text-cyan-400"
						>
							<path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
							<circle cx="12" cy="7" r="4"></circle>
						</svg>
					</div>
					<h3 class="member-name">{{ member.name }}</h3>
					<p class="member-title">{{ member.title }}</p>
					<p class="member-bio">{{ member.bio }}</p>
					<div class="member-socials" v-if="member.socials && member.socials.length > 0">
						<a
							v-for="social in member.socials"
							:key="social.icon"
							:href="social.url"
							target="_blank"
							rel="noopener noreferrer"
							class="social-link"
							:aria-label="member.name + ' ' + social.icon"
						>
							<svg
								v-if="social.icon === 'linkedin'"
								xmlns="http://www.w3.org/2000/svg"
								width="24"
								height="24"
								viewBox="0 0 24 24"
								fill="none"
								stroke="currentColor"
								stroke-width="2"
								stroke-linecap="round"
								stroke-linejoin="round"
							>
								<path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
								<rect x="2" y="9" width="4" height="12"></rect>
								<circle cx="4" cy="4" r="2"></circle>
							</svg>
							<svg
								v-if="social.icon === 'github'"
								xmlns="http://www.w3.org/2000/svg"
								width="24"
								height="24"
								viewBox="0 0 24 24"
								fill="none"
								stroke="currentColor"
								stroke-width="2"
								stroke-linecap="round"
								stroke-linejoin="round"
							>
								<path
									d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"
								></path>
							</svg>
							<svg
								v-if="social.icon === 'twitter'"
								xmlns="http://www.w3.org/2000/svg"
								width="24"
								height="24"
								viewBox="0 0 24 24"
								fill="none"
								stroke="currentColor"
								stroke-width="2"
								stroke-linecap="round"
								stroke-linejoin="round"
							>
								<path
									d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"
								></path>
							</svg>
						</a>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script setup>
import { ref } from "vue";

useHead({
	title: "團隊成員 - 遠岫科技",
	meta: [{ name: "description", content: "認識遠岫科技背後的創新團隊，了解我們的專業與熱情。" }]
});

const teamMembers = ref([
	{
		id: 1,
		name: "陳大明",
		title: "執行長 & 首席架構師",
		bio: "擁有十五年以上軟體開發與跨國大型系統架構經驗，專注於將複雜的技術挑戰轉化為商業價值。",
		photo: null,
		socials: [
			{ icon: "linkedin", url: "https://linkedin.com/in/johndoe" },
			{ icon: "github", url: "https://github.com/johndoe" }
		]
	},
	{
		id: 2,
		name: "林小芳",
		title: "技術長 & AI 研究科學家",
		bio: "機器學習與深度學習領域的頂尖專家，致力於探索AI前沿技術並推動其在各行業的創新應用。",
		photo: null,
		socials: [
			{ icon: "linkedin", url: "https://linkedin.com/in/janesmith" },
			{ icon: "twitter", url: "https://twitter.com/janesmith" }
		]
	},
	{
		id: 3,
		name: "張偉強",
		title: "營運長 & 產品策略總監",
		bio: "兼具市場洞察與產品運營的豐富經驗，確保我們的技術方案能精準滿足客戶需求並創造卓越價值。",
		photo: null,
		socials: [{ icon: "linkedin", url: "https://linkedin.com/in/charliebrown" }]
	},
	{
		id: 4,
		name: "黃美玲",
		title: "資深使用者體驗設計師",
		bio: "專注於打造直觀、流暢且富有美感的使用者介面，堅信卓越的設計是提升產品體驗的關鍵。",
		photo: null,
		socials: [
			{ icon: "linkedin", url: "https://linkedin.com/in/dianaross" },
			{ icon: "github", url: "https://github.com/dianaross" }
		]
	}
]);
</script>

<style scoped>
.text-secondary {
	/* Tailwind text-secondary equivalent if not globally defined */
	color: #e2e8f0; /* A light gray/white for text on dark backgrounds */
}

.tech-grid {
	background-image: linear-gradient(rgba(255, 255, 255, 0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255, 255, 255, 0.05) 1px, transparent 1px);
	background-size: 40px 40px;
}

.member-card {
	background: rgba(255, 255, 255, 0.03); /* Subtle white */
	border-radius: 16px;
	border: 1px solid rgba(56, 189, 248, 0.25); /* Cyan accent border */
	padding: 24px;
	text-align: center;
	transition: transform 0.3s ease, box-shadow 0.3s ease;
	backdrop-filter: blur(10px);
	-webkit-backdrop-filter: blur(10px); /* Safari support */
	box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
	display: flex;
	flex-direction: column;
	height: 100%; /* Make cards in a row same height */
}

.member-card:hover {
	transform: translateY(-8px);
	box-shadow: 0 10px 25px rgba(56, 189, 248, 0.2); /* Cyan glow on hover */
}

.member-photo {
	width: 100px;
	height: 100px;
	border-radius: 50%;
	background-color: rgba(56, 189, 248, 0.1); /* Light cyan bg */
	margin: 0 auto 20px;
	display: flex;
	align-items: center;
	justify-content: center;
	border: 2px solid rgba(56, 189, 248, 0.4);
}

.member-name {
	font-size: 20px;
	font-weight: 600;
	color: #fff;
	margin-bottom: 6px;
}

.member-title {
	font-size: 14px;
	color: #38bdf8; /* Cyan for title */
	margin-bottom: 12px;
	font-weight: 500;
}

.member-bio {
	font-size: 14px;
	color: rgba(226, 232, 240, 0.8); /* Slightly brighter bio text */
	line-height: 1.6;
	margin-bottom: 16px;
	flex-grow: 1; /* Allows bio to take up space for consistent card height */
	min-height: 70px;
}

.member-socials {
	display: flex;
	justify-content: center;
	gap: 16px; /* Increased gap */
	margin-top: auto; /* Pushes socials to the bottom if card height varies */
}

.social-link svg {
	width: 22px; /* Slightly larger icons */
	height: 22px;
	color: rgba(226, 232, 240, 0.7);
	transition: color 0.3s ease, transform 0.3s ease;
}

.social-link:hover svg {
	color: #38bdf8; /* Cyan on hover */
	transform: scale(1.1);
}

/* Animations */
.animate-title {
	animation: fadeInUp 0.8s ease forwards;
}

.animate-subtitle {
	animation: fadeInUp 0.8s ease 0.2s forwards;
	opacity: 0;
}

.animate-card {
	opacity: 0;
	transform: translateY(30px);
	animation: fadeInUpCard 0.6s ease forwards;
}

@keyframes fadeInUp {
	from {
		opacity: 0;
		transform: translateY(30px);
	}
	to {
		opacity: 1;
		transform: translateY(0);
	}
}

@keyframes fadeInUpCard {
	from {
		opacity: 0;
		transform: translateY(30px);
	}
	to {
		opacity: 1;
		transform: translateY(0);
	}
}
</style>
