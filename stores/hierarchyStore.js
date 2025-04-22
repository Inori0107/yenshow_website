import { defineStore } from "pinia";
import { ref } from "vue";
import { useAPI } from "~/composables/useAPI";
import { useLanguageStore } from "~/stores/language";

export const useHierarchyStore = defineStore("hierarchy", () => {
	// === 狀態 (State) ===
	const hierarchyData = ref([]); // 存儲完整的層級樹結構
	const currentChildren = ref([]); // 存儲當前父項的子項列表
	const currentPath = ref([]); // 存儲從根到當前項的路徑
	const isLoading = ref(false);
	const error = ref(null);

	// === API 實例 ===
	const getApi = () => {
		try {
			return useAPI();
		} catch (e) {
			console.error("無法在 HierarchyStore 中獲取 API 實例:", e);
			return {
				hierarchy: {
					getFullHierarchy: () => Promise.reject(new Error("API 不可用")),
					getChildrenByParent: () => Promise.reject(new Error("API 不可用")),
					getParentHierarchy: () => Promise.reject(new Error("API 不可用"))
				}
			};
		}
	};

	// === 語言 Store ===
	const getLanguageStore = () => {
		try {
			return useLanguageStore();
		} catch (e) {
			console.error("無法在 HierarchyStore 中獲取 LanguageStore:", e);
			return { currentLang: "zh" };
		}
	};

	// === Actions ===
	const fetchFullHierarchy = async (params = {}) => {
		isLoading.value = true;
		error.value = null;
		try {
			const { hierarchy } = getApi();
			const languageStore = getLanguageStore();
			const updatedParams = {
				...params,
				lang: languageStore.currentLang
			};
			// useAPI().hierarchy.getFullHierarchy 預期返回 { hierarchy: [] }
			const result = await hierarchy.getFullHierarchy(updatedParams);
			hierarchyData.value = result.hierarchy || [];
			return hierarchyData.value;
		} catch (err) {
			error.value = err.message || "獲取完整層級結構失敗";
			hierarchyData.value = [];
			console.error("[HierarchyStore] fetchFullHierarchy 錯誤:", err);
			return [];
		} finally {
			isLoading.value = false;
		}
	};

	const fetchChildrenByParent = async (parentType, parentId, params = {}) => {
		isLoading.value = true;
		error.value = null;
		currentChildren.value = [];
		try {
			const { hierarchy } = getApi();
			const languageStore = getLanguageStore();
			const updatedParams = {
				...params,
				lang: languageStore.currentLang
			};
			// useAPI().hierarchy.getChildrenByParent 返回 { [childResponseKey]: [], parent: {} }
			const result = await hierarchy.getChildrenByParent(parentType, parentId, updatedParams);

			// 從 result 中提取子項列表，鍵名是動態的（如 categories, subCategories 等）
			const childKey = Object.keys(result).find((key) => key !== "parent" && Array.isArray(result[key]));
			currentChildren.value = childKey ? result[childKey] : [];

			return currentChildren.value;
		} catch (err) {
			error.value = err.message || `獲取 ${parentType} (ID: ${parentId}) 的子項失敗`;
			console.error("[HierarchyStore] fetchChildrenByParent 錯誤:", err);
			return [];
		} finally {
			isLoading.value = false;
		}
	};

	const fetchParentHierarchy = async (itemType, itemId, params = {}) => {
		isLoading.value = true;
		error.value = null;
		currentPath.value = [];
		try {
			const { hierarchy } = getApi();
			const languageStore = getLanguageStore();
			const updatedParams = {
				...params,
				lang: languageStore.currentLang
			};
			// useAPI().hierarchy.getParentHierarchy 返回 { hierarchy: [] }
			const result = await hierarchy.getParentHierarchy(itemType, itemId, updatedParams);
			currentPath.value = result.hierarchy || [];
			return currentPath.value;
		} catch (err) {
			error.value = err.message || `獲取 ${itemType} (ID: ${itemId}) 的父層路徑失敗`;
			console.error("[HierarchyStore] fetchParentHierarchy 錯誤:", err);
			return [];
		} finally {
			isLoading.value = false;
		}
	};

	// 清除狀態的方法 (可選)
	const clearHierarchyData = () => {
		hierarchyData.value = [];
		currentChildren.value = [];
		currentPath.value = [];
		error.value = null;
	};

	return {
		// State
		hierarchyData,
		currentChildren,
		currentPath,
		isLoading,
		error,
		// Actions
		fetchFullHierarchy,
		fetchChildrenByParent,
		fetchParentHierarchy,
		clearHierarchyData
	};
});
