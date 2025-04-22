import { computed } from "vue";
import { useLanguageStore } from "~/stores/language"; // Adjusted path for yenshow

/**
 * 統一的多語言處理工具
 * @param {Object} options - 配置選項
 * @returns {Object} 多語言處理工具函數集
 */
export function useLanguage(options = {}) {
	const useStore = options.useStore !== false;
	let languageStore = null;
	try {
		languageStore = useStore ? useLanguageStore() : null;
	} catch (e) {
		console.warn("useLanguageStore could not be instantiated, possibly outside setup context.");
	}

	const supportedLanguages = options.languages || (languageStore ? languageStore.supportedLangs.map((l) => l.code) : ["TW", "EN"]);
	const defaultLanguage = options.defaultLanguage || (languageStore ? languageStore.currentLang : "TW");

	const currentLang = languageStore ? computed(() => languageStore.currentLang) : ref(defaultLanguage); // Use ref if store is not available

	const getLocalizedField = (entity, field = "name", fallback = "", preferredLang = null) => {
		if (!entity) return fallback;

		const fieldValue = entity[field];

		if (fieldValue && typeof fieldValue === "object" && fieldValue !== null) {
			const targetLang = preferredLang || currentLang.value;

			if (fieldValue[targetLang]) {
				return fieldValue[targetLang];
			}
			if (fieldValue[defaultLanguage]) {
				return fieldValue[defaultLanguage];
			}
			for (const supportedLang of supportedLanguages) {
				if (fieldValue[supportedLang]) {
					return fieldValue[supportedLang];
				}
			}
		}
		// Fallback to the direct field value if it's not an object or no language matched
		return fieldValue || fallback;
	};

	const toFormFormat = (apiData, fields = ["name"]) => {
		if (!apiData) return {};
		const result = { ...apiData };

		fields.forEach((field) => {
			if (apiData[field] && typeof apiData[field] === "object") {
				supportedLanguages.forEach((lang) => {
					result[`${field}_${lang}`] = apiData[field][lang] || "";
				});
				delete result[field];
			}
		});

		return result;
	};

	const toApiFormat = (formData, fields = ["name"]) => {
		if (!formData) return {};
		const result = { ...formData };

		fields.forEach((field) => {
			result[field] = {};

			supportedLanguages.forEach((lang) => {
				const fieldKey = `${field}_${lang}`;
				if (formData[fieldKey] !== undefined) {
					result[field][lang] = formData[fieldKey] || "";
				}
				delete result[fieldKey];
			});

			const hasValue = Object.values(result[field]).some((v) => v && v.trim() !== "");
			if (!hasValue) {
				delete result[field];
			}
		});

		return result;
	};

	const validateField = (multilingualObject, requiredLanguages = [defaultLanguage], minLength = 2) => {
		if (!multilingualObject || typeof multilingualObject !== "object") {
			return { valid: false, message: "欄位為必填項" };
		}

		for (const lang of requiredLanguages) {
			if (!multilingualObject[lang] || multilingualObject[lang].trim().length < minLength) {
				return {
					valid: false,
					message: `欄位必須包含${lang}版本，且至少包含 ${minLength} 個字符`
				};
			}
		}

		return { valid: true };
	};

	const validateFieldByType = (value, fieldType = "name", requiredLanguages = [defaultLanguage], options = {}) => {
		const { minLength = 2, maxLength = null } = options;
		const result = validateField(value, requiredLanguages, minLength);
		if (!result.valid) {
			if (result.message === "欄位為必填項") {
				return { valid: false, message: `${fieldType}為必填項` };
			}
			if (result.message.includes("欄位必須包含")) {
				return {
					valid: false,
					message: result.message.replace("欄位", fieldType)
				};
			}
			return result;
		}

		if (maxLength) {
			for (const lang of Object.keys(value)) {
				if (value[lang] && value[lang].length > maxLength) {
					return {
						valid: false,
						message: `${fieldType}的${lang}版本不能超過 ${maxLength} 個字符`
					};
				}
			}
		}

		return { valid: true };
	};

	const setLanguage = (langCode) => {
		if (languageStore) {
			languageStore.setLanguage(langCode);
		}
	};

	const getFieldNameForLang = (baseField, lang = defaultLanguage) => {
		return `${baseField}_${lang}`;
	};

	const createEmptyMultilingualForm = (fields = ["name"]) => {
		const result = {};
		fields.forEach((field) => {
			supportedLanguages.forEach((lang) => {
				result[`${field}_${lang}`] = "";
			});
		});
		return result;
	};

	return {
		currentLang,
		supportedLanguages,
		defaultLanguage,
		getLocalizedField,
		toFormFormat,
		toApiFormat,
		validateField,
		validateFieldByType,
		getFieldNameForLang,
		createEmptyMultilingualForm,
		setLanguage,
		parseApiData: toFormFormat, // Alias
		formatFormData: toApiFormat, // Alias
		formatToForm: toFormFormat, // Alias
		formatToApi: toApiFormat, // Alias
		validateMultilingualField: validateField // Alias
	};
}
