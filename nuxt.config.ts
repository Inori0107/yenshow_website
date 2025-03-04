// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
	compatibilityDate: "2025-02-11",
	devtools: { enabled: true },
	app: {
		head: {
			charset: "utf-8",
			viewport: "width=device-width, initial-scale=1",
			// 添加平滑滾動效果
			htmlAttrs: {
				style: "scroll-behavior: smooth"
			}
		}
	},
	css: ["~/assets/css/global.css"],
	modules: ["@nuxtjs/tailwindcss", "@nuxtjs/i18n", "@nuxtjs/google-fonts", "@pinia/nuxt"],
	i18n: {
		locales: [
			{ code: "zh", iso: "zh-TW", name: "繁體中文", file: "zh.json" },
			{ code: "en", iso: "en-US", name: "English", file: "en.json" }
		],
		defaultLocale: "zh",
		strategy: "prefix_except_default", // 預設語言無前綴
		lazy: true, // 延遲載入語言檔案，提高效能
		langDir: "locales/"
	},
	googleFonts: {
		families: {
			"LXGW WenKai Mono TC": [300, 500, 700]
		}
	}
});
