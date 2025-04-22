import { defineStore } from "pinia";
import { ref } from "vue";
import { useAPI } from "~/composables/useAPI";
import { useLanguageStore } from "~/stores/language";

// 通用實體 store 工廠函數
export const createEntityStore = (entityType, options = {}) => {
	// responseKey 仍然可能有用，取決於 BaseController 的實際返回
	const { responseKey = `${entityType}List` } = options;

	return defineStore(`${entityType}Store`, () => {
		// === 狀態 (State) ===
		const items = ref([]);
		const currentItem = ref(null);
		const pagination = ref({
			page: 1,
			limit: 20,
			total: 0,
			pages: 0
		});
		const isLoading = ref(false);
		const error = ref(null);

		// === API 實例 ===
		const getApi = () => {
			try {
				return useAPI();
			} catch (e) {
				console.error(`無法在 ${entityType}Store 中獲取 API 實例:`, e);
				return {
					entityApi: () => ({
						getAll: () => Promise.reject(new Error("API 不可用")),
						getById: () => Promise.reject(new Error("API 不可用")),
						search: () => Promise.reject(new Error("API 不可用"))
					})
				};
			}
		};

		// === 語言 Store ===
		const getLanguageStore = () => {
			try {
				return useLanguageStore();
			} catch (e) {
				console.error(`無法在 ${entityType}Store 中獲取 LanguageStore:`, e);
				return { currentLang: "zh" }; // 提供預設值
			}
		};

		// === Getters (模擬) ===
		const getItemById = (id) => {
			return items.value.find((item) => item._id === id);
		};

		const getItemName = (item) => {
			if (!item) return "";
			const languageStore = getLanguageStore();
			return item.name?.[languageStore.currentLang.toUpperCase()] || item.name?.TW || item.name?.EN || item.code || item._id || "";
		};

		// === Actions ===
		const fetchAll = async (params = {}) => {
			isLoading.value = true;
			error.value = null;
			try {
				const { entityApi } = getApi();
				const languageStore = getLanguageStore();
				const updatedParams = {
					...params,
					lang: languageStore.currentLang
				};
				// 移除 requiresAuth 選項，因為 entityApi 已簡化
				items.value = await entityApi(entityType, { responseKey }).getAll(updatedParams);
			} catch (err) {
				error.value = err.message || `獲取${entityType}列表失敗`;
				items.value = [];
				console.error(`[${entityType}Store] fetchAll 錯誤:`, err);
			} finally {
				isLoading.value = false;
			}
		};

		const fetchById = async (id, params = {}) => {
			isLoading.value = true;
			error.value = null;
			currentItem.value = null;
			try {
				const { entityApi } = getApi();
				const languageStore = getLanguageStore();
				const updatedParams = {
					...params,
					lang: languageStore.currentLang
				};
				// 移除 requiresAuth 選項
				currentItem.value = await entityApi(entityType).getById(id, updatedParams);
				return currentItem.value;
			} catch (err) {
				error.value = err.message || `獲取${entityType} (ID: ${id}) 失敗`;
				console.error(`[${entityType}Store] fetchById 錯誤:`, err);
				return null;
			} finally {
				isLoading.value = false;
			}
		};

		const search = async (keyword, params = {}) => {
			isLoading.value = true;
			error.value = null;
			try {
				const { entityApi } = getApi();
				const languageStore = getLanguageStore();
				const searchParams = {
					keyword,
					page: params.page || pagination.value.page,
					limit: params.limit || pagination.value.limit,
					sort: params.sort || "createdAt",
					sortDirection: params.sortDirection || "asc",
					...params,
					lang: languageStore.currentLang
				};
				// 移除 requiresAuth 選項
				const result = await entityApi(entityType, { responseKey }).search(searchParams);

				items.value = result.items;
				if (result.pagination) {
					pagination.value = result.pagination;
				} else {
					pagination.value = { page: 1, limit: searchParams.limit, total: result.items.length, pages: 1 };
				}
				return items.value;
			} catch (err) {
				error.value = err.message || `搜尋${entityType}失敗`;
				items.value = [];
				pagination.value = { page: 1, limit: 20, total: 0, pages: 0 };
				console.error(`[${entityType}Store] search 錯誤:`, err);
				return [];
			} finally {
				isLoading.value = false;
			}
		};

		// 返回 state 和 actions
		return {
			// State
			items,
			currentItem,
			pagination,
			isLoading,
			error,
			// Getters (函數形式)
			getItemById,
			getItemName,
			// Actions
			fetchAll,
			fetchById,
			search
		};
	});
};
