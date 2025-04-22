import axios from "axios";
import { useUserStore } from "../stores/user.js";
import { useLanguageStore } from "~/stores/language";

export function useAPI() {
	const config = useRuntimeConfig();
	const { $cookies } = useNuxtApp();
	const userStore = useUserStore();

	// 從 runtimeConfig 獲取基礎 URL
	// 注意：在開發模式下，由於 devProxy，請求仍會發往相對路徑 '/'
	// 但 config.public.apiBaseUrl 存儲了實際的後端 URL，可用於某些情況或生產環境
	const apiBaseUrl = config.public.apiBaseUrl;

	// 創建基礎 API 實例 (公共)
	// 基礎 URL 使用相對路徑以利用 devProxy
	const api = axios.create({
		baseURL: "/",
		timeout: 10000,
		headers: {
			"Content-Type": "application/json"
		},
		withCredentials: true // 允許跨域請求攜帶憑證
	});

	// 創建需要認證的 API 實例
	const apiAuth = axios.create({
		baseURL: "/",
		timeout: 10000,
		headers: {
			"Content-Type": "application/json"
		},
		withCredentials: true // 允許跨域請求攜帶憑證
	});

	// --- 攔截器 ---

	// apiAuth 請求攔截器：自動添加 token
	apiAuth.interceptors.request.use(
		(config) => {
			const token = userStore.token;
			if (token) {
				config.headers.Authorization = `Bearer ${token}`;
			} else {
				const cookieToken = $cookies.get("auth_token");
				if (cookieToken) {
					config.headers.Authorization = `Bearer ${cookieToken}`;
				}
			}
			return config;
		},
		(error) => {
			return Promise.reject(error);
		}
	);

	// apiAuth 響應攔截器：處理 401 未授權 (例如 token 過期) 或嘗試延長 token
	apiAuth.interceptors.response.use(
		(response) => response,
		async (error) => {
			if (error.response && error.response.status === 401) {
				console.error("API Auth Error 401: Token 可能已過期或無效。清除本地狀態。");
				userStore.clearUser();
			} else if (error.response) {
				console.error(`API Auth Error ${error.response.status}:`, error.response.data);
			} else if (error.request) {
				console.error("API Auth Error: No response received", error.request);
			} else {
				console.error("API Auth Error:", error.message);
			}
			const errorData = error.response?.data || {};
			return Promise.reject({
				success: false,
				message: errorData.message || error.message || "請求失敗",
				status: error.response?.status,
				error: error.error || error
			});
		}
	);

	// --- API 方法 ---

	// 安全調用封裝
	const safeApiCall = async (apiCall, errorOptions = {}) => {
		try {
			const response = await apiCall();
			return handleSuccessResponse(response);
		} catch (error) {
			console.error("API請求錯誤:", error.message || error);

			const errorMessage = error.message || errorOptions.defaultMessage || "請求失敗";
			const errorStatus = error.status;

			if (errorOptions.onError) {
				errorOptions.onError({ ...error, message: errorMessage, status: errorStatus });
			}

			if (errorOptions.onFinally) {
				errorOptions.onFinally();
			}

			throw {
				success: false,
				message: errorMessage,
				status: errorStatus,
				error: error.error || error
			};
		}
	};

	// 認證相關方法
	const auth = {
		login: async (credentials) => {
			return await api.post("/users/login", credentials);
		},
		getProfile: async () => {
			return await apiAuth.get("/users/profile");
		},
		logout: async () => {
			try {
				await apiAuth.delete("/users/logout");
				return { success: true };
			} catch (error) {
				console.error("Logout API call failed:", error);
				return { success: true };
			}
		}
	};

	// 產品相關
	const products = {
		getAll: async (params = {}) => {
			return await safeApiCall(() => api.get("/api/products", { params }));
		},
		getById: async (id) => {
			return await safeApiCall(() => api.get(`/api/products/${id}`));
		},
		search: async (params) => {
			return await safeApiCall(() => api.get("/api/products/search", { params }));
		}
	};

	// 層次結構相關
	const hierarchy = {
		getFullHierarchy: async (params = {}) => {
			return await safeApiCall(() => api.get("/api/hierarchy", { params }));
		},
		getChildrenByParent: async (parentType, parentId) => {
			return await safeApiCall(() => api.get(`/api/hierarchy/children/${parentType}/${parentId}`));
		},
		getParentHierarchy: async (itemType, itemId) => {
			return await safeApiCall(() => api.get(`/api/hierarchy/parents/${itemType}/${itemId}`));
		}
	};

	// 實體通用API工廠
	const entityApi = (entityType, options = {}) => {
		const responseKey = options.responseKey || `${entityType}List`;
		// 假設所有實體瀏覽操作都使用公共 api 實例
		const instance = api;

		return {
			getAll: async (params = {}) => {
				const response = await safeApiCall(() => instance.get(`/api/${entityType}`, { params }));
				return response?.[responseKey] || [];
			},
			getById: async (id, params = {}) => {
				const singleEntityKey = entityType; // BaseController 返回 { success: true, result: { [entityType]: data } }
				const response = await safeApiCall(() => instance.get(`/api/${entityType}/${id}`, { params }));
				return response?.[singleEntityKey] || null;
			},
			// 搜索項目 (對應 BaseController.searchItems)
			search: async (params = {}) => {
				const response = await safeApiCall(() => instance.get(`/api/${entityType}/search`, { params }));
				return {
					items: response?.[responseKey] || [],
					pagination: response?.pagination || null
				};
			}
		};
	};

	// 返回所有需要使用的部分
	return {
		api, // 公共 axios 實例
		apiAuth, // 帶認證的 axios 實例
		safeApiCall, // 安全調用封裝
		auth, // 認證方法集合
		products, // 產品方法集合
		hierarchy, // 層次結構方法集合
		entityApi, // 實體API工廠
		// 處理響應格式
		handleSuccessResponse: (response) => {
			if (response.data && response.data.success === true) {
				return response.data.result || {};
			}
			return response.data;
		}
	};
}
