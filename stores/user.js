import { defineStore } from "pinia";
import { ref, computed } from "vue";
import { useAPI } from "../composables/useAPI";
import { useNuxtApp } from "#app";

export const useUserStore = defineStore("user", () => {
	// 在 setup store 頂層調用 useAPI 一次
	const { auth, apiAuth } = useAPI(); // 假設 useAPI 在此處是安全的

	// === 狀態 (State) ===
	const token = ref(null); // 初始化 token 為 null，稍後從 cookie 讀取
	const user = ref(null); // 用戶資料對象
	const loading = ref(false);
	const error = ref(null);

	// === 計算屬性 (Getters) ===
	const isAuthenticated = computed(() => !!token.value);
	const isAdmin = computed(() => user.value?.role === "ADMIN"); // 假設 role 存在 user 對象中

	// === 函數 (Actions) ===

	// 安全地獲取 cookies 的輔助函數
	function getCookies() {
		try {
			// 只有在可以調用 useNuxtApp 時才獲取
			const { $cookies } = useNuxtApp();
			return $cookies;
		} catch (e) {
			// 在無法獲取上下文時 (例如 SSR 早期階段)，記錄警告並返回 null
			console.warn("無法在當前上下文中獲取 $cookies:", e);
			return null;
		}
	}

	// 設置 token (用於登入和持久化)
	function setToken(newToken) {
		token.value = newToken || "";
		const $cookies = getCookies();
		// 如果無法獲取 cookies (例如在伺服器端)，則跳過 cookie 操作
		if (!$cookies) {
			console.warn("無法設置 cookie，因為 $cookies 不可用。");
			return;
		}

		if (newToken) {
			$cookies.set("auth_token", newToken, {
				path: "/",
				maxAge: 60 * 60 * 24 * 7 // 7 days (或者根據需要調整)
			});
		} else {
			$cookies.remove("auth_token", { path: "/" }); // 確保提供 path
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
		// 檢查 token ref 的值，而不是依賴 isAuthenticated (它也依賴 token ref)
		if (!token.value) return null;

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
			// 確保在清除本地狀態之前調用 API
			await auth.logout();
		} catch (err) {
			// 登出 API 失敗通常不影響客戶端登出流程
			console.error("登出 API 請求失敗:", err);
		} finally {
			clearUser(); // 清除本地 token 和 user data
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

	// 初始化函數: 嘗試從 cookie 讀取 token 並獲取資料
	// 這個函數應該在 store setup 結束時，或者更安全地在 Nuxt plugin 中調用
	async function initializeAuth() {
		// 只有在客戶端執行，或者在可以安全獲取 cookie 的伺服器端環境
		if (process.server && !process.env.NITRO_PRESET) {
			// 在某些 SSR 環境下可能無法安全獲取 cookie，可以選擇跳過
			console.log("在伺服器端初始化期間跳過 cookie 讀取。");
			return;
		}

		const $cookies = getCookies();
		if ($cookies) {
			const initialToken = $cookies.get("auth_token");
			if (initialToken && !token.value) {
				// 檢查 token 是否已被設置
				console.log("從 cookie 初始化 token");
				token.value = initialToken; // 直接設置 ref 的值
				// token 設置後，isAuthenticated 計算屬性會更新
				await fetchProfile(); // 嘗試獲取用戶資料
			}
		} else {
			console.log("初始化時 $cookies 不可用。");
		}
	}

	// 在 store setup 的最後階段調用初始化邏輯
	// 注意：如果 `useNuxtApp` 在這裡仍然失敗，需要將 initializeAuth 的調用移至 Nuxt plugin
	initializeAuth();

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
		setToken, // 暴露 setToken 以便外部（如 OAuth 回調）使用
		initializeAuth // 暴露初始化函數，可能用於插件
	};
});
