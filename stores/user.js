import { defineStore } from "pinia";
import { ref, computed } from "vue";
import { useAPI } from "../composables/useAPI";
import { useNuxtApp } from "#app";

export const useUserStore = defineStore("user", () => {
	// 在 setup store 頂層調用 useAPI 一次
	const { auth, apiAuth } = useAPI(); // 解構出需要的方法集合
	const { $cookies } = useNuxtApp();

	// === 狀態 (State) ===
	const token = ref($cookies.get("auth_token") || ""); // 嘗試從 cookie 初始化 token
	const user = ref(null); // 用戶資料對象
	const loading = ref(false);
	const error = ref(null);

	// === 計算屬性 (Getters) ===
	const isAuthenticated = computed(() => !!token.value);
	const isAdmin = computed(() => user.value?.role === "ADMIN"); // 假設 role 存在 user 對象中

	// === 函數 (Actions) ===

	// 設置 token (用於登入和持久化)
	function setToken(newToken) {
		token.value = newToken || "";
		if (newToken) {
			$cookies.set("auth_token", newToken, {
				path: "/",
				maxAge: 60 * 60 * 24 * 7 // 7 days (或者根據需要調整)
				// secure: process.env.NODE_ENV === 'production', // 建議生產環境使用 secure
				// sameSite: 'lax'
			});
		} else {
			$cookies.remove("auth_token");
		}
	}

	// 清除用戶狀態
	function clearUser() {
		setToken("");
		user.value = null;
	}

	// 登入
	async function login(credentials) {
		loading.value = true;
		error.value = null;
		try {
			// 使用頂層獲取的 auth.login
			const response = await auth.login(credentials);
			// 假設成功響應包含 token 和 user 對象
			if (response && response.token) {
				setToken(response.token);
				// 登入成功後嘗試獲取用戶資料
				await fetchProfile();
				// 返回成功狀態和消息
				return { success: true, message: response.message || "登入成功" };
			} else {
				// 處理登入失敗，即使 API 調用本身沒拋錯
				throw new Error(response?.message || "登入失敗：無效的回應");
			}
		} catch (err) {
			error.value = err.message || "登入失敗";
			clearUser();
			return { success: false, message: error.value };
		} finally {
			loading.value = false;
		}
	}

	// 獲取個人資料
	async function fetchProfile() {
		if (!isAuthenticated.value) return null; // 如果沒有 token，不執行

		loading.value = true;
		try {
			// 使用頂層獲取的 auth.getProfile (需要 token，apiAuth 實例會處理)
			const profileData = await auth.getProfile();
			// 假設成功時 profileData 包含 user 對象
			if (profileData) {
				user.value = profileData.user || profileData; // 處理可能的嵌套 user
				error.value = null;
				return user.value;
			} else {
				throw new Error("獲取個人資料失敗：無效的回應");
			}
		} catch (err) {
			console.error("獲取個人資料錯誤:", err);
			error.value = err.message || "獲取資料失敗";
			// 如果獲取失敗 (例如 token 失效導致 401)，清除本地狀態
			clearUser();
			return null;
		} finally {
			loading.value = false;
		}
	}

	// 登出
	async function logout() {
		loading.value = true;
		try {
			// 調用 API 登出 (即使失敗也要清除本地狀態)
			await auth.logout();
		} catch (err) {
			// 登出 API 失敗通常不影響客戶端登出流程
			console.error("登出 API 請求失敗:", err);
		} finally {
			clearUser();
			loading.value = false;
			// 可以導航到首頁或登入頁
			// navigateTo('/');
		}
	}

	// 變更密碼
	async function changePassword(currentPassword, newPassword) {
		loading.value = true;
		error.value = null;
		try {
			const response = await auth.changePassword({ currentPassword, newPassword });
			// 假設成功響應包含 success: true
			if (response && response.success) {
				return { success: true, message: response.message || "密碼已更新" };
			} else {
				throw new Error(response?.message || "變更密碼失敗：無效的回應");
			}
		} catch (err) {
			error.value = err.message || "變更密碼失敗";
			return { success: false, message: error.value };
		} finally {
			loading.value = false;
		}
	}

	// 初始化時嘗試獲取用戶資料 (如果已有 token)
	if (token.value) {
		fetchProfile();
	}

	// 返回所有需要從 store 外部訪問的內容
	return {
		// State
		token,
		user,
		loading,
		error,
		// Getters
		isAuthenticated,
		isAdmin,
		// Actions
		login,
		fetchProfile,
		logout,
		changePassword,
		setToken // 可能需要外部調用（例如 OAuth 回調）
	};
});
