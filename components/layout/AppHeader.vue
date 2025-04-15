<template>
	<!-- 行動裝置的 Header (sm 以下才顯示) -->
	<header class="md:hidden fixed top-0 left-0 w-full bg-primary h-[84px] z-50 shadow-md transition-all duration-300">
		<!-- Logo -->
		<img class="yenshow-logo" src="/yenshow.png" alt="yenshow-logo" />

		<!-- 漢堡菜單按鈕 -->
		<button
			@click="toggleMenu"
			aria-label="切換菜單"
			class="hamburger-btn absolute top-[35px] right-[24px] z-50 flex flex-col items-end justify-center gap-[6px] group"
		>
			<span class="w-[24px] h-[4px] bg-white transition-transform duration-300 origin-center" :class="{ 'rotate-45 translate-y-[5px]': isOpen }"></span>
			<span
				class="w-[16px] h-[4px] bg-white transition-transform duration-300 origin-center"
				:class="{ '-rotate-45 -translate-y-[5px] w-[24px]': isOpen }"
			></span>
		</button>

		<!-- 行動裝置菜單覆蓋層 -->
		<nav
			:class="isOpen ? 'translate-y-0 opacity-100' : 'translate-y-[-100%] opacity-0 pointer-events-none'"
			class="fixed inset-0 bg-primary bg-opacity-95 flex flex-col items-center justify-center text-white z-40 transition-all duration-500 ease-in-out"
			aria-hidden="true"
		>
			<ul class="space-y-6 text-center text-xl">
				<li v-for="(item, index) in navItems" :key="index" class="transform transition-all duration-300" :style="{ transitionDelay: `${index * 50}ms` }">
					<a :href="item.link" class="block px-4 py-3 hover:bg-white hover:bg-opacity-10 rounded-lg transition-colors duration-200" @click="toggleMenu">
						{{ item.label }}
					</a>
				</li>
			</ul>

			<!-- 語言切換 -->
			<div class="mt-8 flex items-center text-white">
				<svg xmlns="http://www.w3.org/2000/svg" height="20" width="20" viewBox="0 0 512 512" class="mr-2">
					<path fill="currentColor" d="M352 256c0 22.2-1.2 43.6-3.3 64l-185.3 0c-2.2-20.4-3.3-41.8-3.3-64s1.2-43.6 3.3-64l185.3 0c2.2 20.4 3.3 41.8 3.3 64z" />
				</svg>
				<LanguageSwitcher />
			</div>
		</nav>
	</header>

	<!-- 頁面頂部間距 (只在小螢幕需要) -->
	<div class="h-[84px] sm:h-0"></div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import LanguageSwitcher from "~/components/common/LanguageSwitcher.vue";

const isOpen = ref(false);

// 導航選項
const navItems = [
	{ label: "首頁", link: "#" },
	{ label: "關於我們", link: "#" },
	{ label: "服務", link: "#" },
	{ label: "聯絡我們", link: "#" }
];

const toggleMenu = () => {
	isOpen.value = !isOpen.value;

	// 防止菜單開啟時頁面滾動
	if (isOpen.value) {
		document.body.style.overflow = "hidden";
	} else {
		document.body.style.overflow = "";
	}
};
</script>

<style scoped>
.yenshow-logo {
	width: 150px;
	height: 60px;
	position: absolute;
	top: 50%;
	left: 50%;
	transform: translate(-50%, -50%);
}

/* 漢堡菜單按鈕懸停效果 */
.hamburger-btn:hover span {
	background-color: var(--color-secondary, #ffffff);
}

.hamburger-btn::after {
	content: "";
	position: absolute;
	top: -10px;
	right: -10px;
	bottom: -10px;
	left: -10px;
	border-radius: 50%;
	opacity: 0;
	transition: opacity 0.3s ease;
}

.hamburger-btn:hover::after {
	opacity: 0.1;
}

/* 菜單項目動畫 */
nav ul li {
	opacity: 0;
	transform: translateY(20px);
	transition: transform 0.5s ease, opacity 0.5s ease;
}

nav:not(.pointer-events-none) ul li {
	opacity: 1;
	transform: translateY(0);
}
</style>
