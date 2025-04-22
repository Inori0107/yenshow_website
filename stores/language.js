import { defineStore } from "pinia";

export const useLanguageStore = defineStore("language", {
	state: () => ({
		currentLang: "TW", // Default language
		supportedLangs: [
			{ code: "TW", name: "繁體中文" },
			{ code: "EN", name: "English" }
		],
		translations: {
			TW: {}, // Populate with actual translations if needed
			EN: {} // Populate with actual translations if needed
		}
	}),

	getters: {
		currentLangCode: (state) => state.currentLang,
		currentLangName: (state) => {
			const lang = state.supportedLangs.find((l) => l.code === state.currentLang);
			return lang ? lang.name : state.currentLang;
		},
		t:
			(state) =>
			(key, params = {}) => {
				const translation = state.translations[state.currentLang]?.[key] || key;
				if (params && Object.keys(params).length) {
					return Object.keys(params).reduce((result, param) => {
						return result.replace(new RegExp(`{${param}}`, "g"), params[param]);
					}, translation);
				}
				return translation;
			},
		getLocalizedField: (state) => (entity, field) => {
			if (!entity || !entity[field]) return "";
			if (typeof entity[field] === "object" && entity[field] !== null) {
				if (entity[field][state.currentLang]) {
					return entity[field][state.currentLang];
				}
				// Fallback to default or first available if current lang not found
				const defaultLang = "TW"; // Or your primary default
				if (entity[field][defaultLang]) {
					return entity[field][defaultLang];
				}
				// Fallback to the first key found if default isn't available
				const firstKey = Object.keys(entity[field])[0];
				if (firstKey) {
					return entity[field][firstKey];
				}
			}
			// If field is not an object or no language keys match, return the field value itself
			return entity[field];
		}
	},

	actions: {
		setLanguage(langCode) {
			if (this.supportedLangs.some((l) => l.code === langCode)) {
				this.currentLang = langCode;
				if (process.client) {
					localStorage.setItem("appLanguage", langCode);
					document.documentElement.setAttribute("lang", langCode);
				}
				// Potentially trigger i18n update if integrated
				// const { setLocale } = useI18n(); // Requires useI18n setup
				// setLocale(langCode);
			}
		},
		loadTranslations(langCode, translations) {
			if (this.supportedLangs.some((l) => l.code === langCode)) {
				this.translations[langCode] = {
					...this.translations[langCode],
					...translations
				};
			}
		},
		initLanguage() {
			if (process.client) {
				const savedLang = localStorage.getItem("appLanguage");
				if (savedLang && this.supportedLangs.some((l) => l.code === savedLang)) {
					this.currentLang = savedLang;
				} else {
					// Determine default based on browser or system preference
					const browserLang = navigator.language || navigator.userLanguage || "en";
					const langCode = browserLang.startsWith("zh") ? "TW" : "EN";
					this.currentLang = this.supportedLangs.some((l) => l.code === langCode) ? langCode : "TW"; // Fallback
					localStorage.setItem("appLanguage", this.currentLang);
				}
				document.documentElement.setAttribute("lang", this.currentLang);
			} else {
				// Server-side default (can be overridden by request headers later)
				this.currentLang = "TW";
			}
		}
	}
});
