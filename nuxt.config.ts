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
	modules: ["@nuxtjs/tailwindcss", "@nuxtjs/i18n", "@nuxtjs/google-fonts", "@pinia/nuxt", "@nuxtjs/sitemap", "@nuxtjs/device"],
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
			apiBaseUrl: process.env.API_BASE_URL || "http://localhost:4000",
			storagePath: process.env.STORAGE_PATH || "/storage"
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
	},
	// 配置 Nitro 以處理 API 代理
	nitro: {
		devProxy: {
			"/api": {
				target: process.env.API_BASE_URL || "http://localhost:4000",
				changeOrigin: true,
				prependPath: true,
				headers: {
					"Access-Control-Allow-Origin": "*",
					"Access-Control-Allow-Methods": "GET,POST,PUT,DELETE,OPTIONS",
					"Access-Control-Allow-Headers": "Content-Type, Authorization"
				}
			},
			"/storage": {
				target: process.env.API_BASE_URL || "http://localhost:4000",
				changeOrigin: true
			}
		}
	}
});
