import axios from "axios";

export function useAPI() {
	const config = useRuntimeConfig();
	const { $cookies } = useNuxtApp();

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
		}
	});

	// 創建需要認證的 API 實例
	const apiAuth = axios.create({
		baseURL: "/",
		timeout: 10000,
		headers: {
			"Content-Type": "application/json"
		}
	});

	// --- 攔截器 ---

	// apiAuth 請求攔截器：自動添加 token
	apiAuth.interceptors.request.use(
		(config) => {
			const token = $cookies.get("auth_token");
			if (token) {
				config.headers.Authorization = `Bearer ${token}`;
			}
			return config;
		},
		(error) => {
			return Promise.reject(error);
		}
	);

	// apiAuth 響應攔截器：處理 401 未授權 (例如 token 過期)
	apiAuth.interceptors.response.use(
		(response) => response,
		(error) => {
			if (error.response && error.response.status === 401) {
				console.error("API Auth Error 401: Token 可能已過期或無效。");
				// 清除 token 並可能觸發重新登入
				$cookies.remove("auth_token");
				// 可以在這裡觸發全局事件或導航到登入頁
				// navigateTo('/login'); // 需要確保在正確上下文調用
			} else if (error.response) {
				// 其他響應錯誤
				console.error(`API Auth Error ${error.response.status}:`, error.response.data);
			} else if (error.request) {
				// 請求已發出但沒有收到響應
				console.error("API Auth Error: No response received", error.request);
			} else {
				// 設置請求時觸發的錯誤
				console.error("API Auth Error:", error.message);
			}
			return Promise.reject(error);
		}
	);

	// --- API 方法 ---

	// 安全調用封裝 (可選，用於統一錯誤處理)
	const safeApiCall = async (apiCall) => {
		try {
			const response = await apiCall();
			// 可以在這裡添加通用的成功響應處理邏輯
			return response.data; // 通常返回 data 部分
		} catch (error) {
			console.error("safeApiCall 捕獲錯誤:", error);
			// 返回一個標準錯誤結構或重新拋出
			throw {
				success: false,
				message: error.response?.data?.message || error.message || "請求失敗",
				status: error.response?.status
			};
		}
	};

	// 認證相關方法 (使用公共 api 實例登入，其他使用 apiAuth)
	const auth = {
		login: async (credentials) => {
			// 登入通常不需要 token，使用公共 api 實例
			return await safeApiCall(() => api.post("/api/users/login", credentials));
		},
		getProfile: async () => {
			// 獲取個人資料需要 token，使用 apiAuth
			return await safeApiCall(() => apiAuth.get("/api/users/profile"));
		},
		logout: async () => {
			// 登出需要 token，使用 apiAuth
			// 即使失敗也應清除客戶端狀態，錯誤處理可在 store 中進行
			try {
				await apiAuth.delete("/api/users/logout");
				return { success: true };
			} catch (error) {
				console.error("Logout API call failed:", error);
				// 即使API調用失敗，也返回成功，讓 store 清除狀態
				return { success: true };
			}
		},
		changePassword: async (data) => {
			// 變更密碼需要 token，使用 apiAuth
			return await safeApiCall(() => apiAuth.post("/api/users/change-password", data));
		}
	};

	// 產品相關 (示例，根據需要擴展)
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

	// 層次結構相關 (示例，根據需要擴展)
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

	// 返回所有需要使用的部分
	return {
		api, // 公共 axios 實例
		apiAuth, // 帶認證的 axios 實例
		safeApiCall, // (可選) 安全調用封裝
		auth, // 認證方法集合
		products, // 產品方法集合
		hierarchy // 層次結構方法集合
		// ... 可以添加其他 API 模塊
	};
}
