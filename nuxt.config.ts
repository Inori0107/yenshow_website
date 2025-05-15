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
		},
		pageTransition: { name: "page", mode: "out-in" }
	},
	css: ["~/assets/css/global.css"],
	modules: ["@nuxtjs/tailwindcss", "@nuxtjs/i18n", "@nuxtjs/google-fonts", "@pinia/nuxt", "@nuxtjs/sitemap", "@nuxtjs/device", "@nuxt/image"],
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
	},
	runtimeConfig: {
		apiSecret: process.env.API_SECRET || "",
		apiKey: process.env.API_KEY || "",
		public: {
			apiBaseUrl: process.env.API_BASE_URL || "/api",
			storagePath: process.env.STORAGE_PATH || "/storage",
			fileServiceBaseUrl: process.env.NUXT_PUBLIC_FILE_SERVICE_BASE_URL || "https://api.yenshow.com"
		}
	},
	nitro: {
		devProxy: {
			"/api": {
				target: process.env.API_TARGET_URL || "http://localhost:4000/api",
				changeOrigin: true,
				prependPath: false
			},
			"/storage": {
				target: process.env.NUXT_DEV_STORAGE_PROXY_TARGET || "http://localhost:4000/storage",
				changeOrigin: true
			}
		}
	},
	site: {
		url: "https://www.yenshow.com",
		name: "遠岫科技"
	},
	sitemap: {
		sitemaps: {
			pages: {
				include: ["/"],
				exclude: ["/products/**"]
			},
			products: {
				include: ["/products/**"]
			}
		}
	}
});
