import { defineStore } from "pinia";
import { ref, computed } from "vue";
import { useAPI } from "../composables/useAPI";
import { useNuxtApp } from "#app";
import UserRole from "../enums/UserRole";

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
	const isAdmin = computed(() => user.value?.role === UserRole.ADMIN); // 保留 isAdmin 判斷本身
	const account = computed(() => user.value?.account || "");
	const email = computed(() => user.value?.email || "");
	const role = computed(() => user.value?.role || UserRole.USER);

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
		error.value = null; // 同時清除錯誤狀態
	}

	// 登入 - 手動處理，確保 loading 和 error 狀態
	async function login(credentials) {
		loading.value = true;
		error.value = null;
		try {
			console.log(
				"開始登入流程，發送憑證:",
				JSON.stringify({
					account: credentials.account,
					passwordProvided: !!credentials.password
				})
			);

			const response = await auth.login(credentials);
			console.log("登入API回應:", response);

			let tokenValue = null;
			let userData = null;

			if (response && typeof response === "object") {
				if (response.token) {
					tokenValue = response.token;
					userData = response.user;
				} else if (response.result?.token) {
					tokenValue = response.result.token;
					userData = response.result.user;
				}
			}

			if (!tokenValue) {
				console.error("回應中找不到有效的token:", response);
				throw new Error(response?.message || "登入失敗: 無法獲取認證信息");
			}

			console.log("登入成功，取得 token:", { tokenLength: tokenValue.length });
			setToken(tokenValue);

			if (userData) {
				user.value = userData;
				console.log("已從登入回應設置用戶資料");
			} else {
				console.log("登入回應未包含用戶資料，嘗試獲取個人資料");
				await fetchProfile();
			}

			return {
				success: true,
				message: response.message || "登入成功"
			};
		} catch (err) {
			console.error("登入錯誤:", err);
			error.value = err.message || "登入失敗"; // 設置錯誤狀態
			clearUser();
			return { success: false, message: error.value };
		} finally {
			loading.value = false; // 確保 loading 狀態被重置
		}
	}

	// 獲取個人資料 - 手動處理，確保 loading 和 error 狀態
	async function fetchProfile() {
		if (!token.value) {
			console.log("無法獲取個人資料：未設置 token");
			return null;
		}

		loading.value = true;
		error.value = null;
		try {
			console.log("開始獲取個人資料...");
			const profileData = await auth.getProfile(); // 假設 auth.getProfile 內部會處理 401 並觸發 clearUser
			console.log("獲取個人資料回應:", profileData);

			const userData = profileData?.result?.user || profileData?.result;

			if (userData && (userData.account || userData._id)) {
				console.log("成功獲取用戶資料:", { id: userData._id, account: userData.account });
				user.value = userData;
				return userData;
			} else {
				console.error("獲取資料失敗: 無法從回應中提取有效的用戶資料", profileData);
				// 不主動 clearUser，讓 API 攔截器處理 401
				throw new Error(profileData?.message || "獲取個人資料失敗：無效的回應格式");
			}
		} catch (err) {
			console.error("獲取個人資料處理錯誤:", err);
			error.value = err.message || "獲取資料失敗"; // 設置錯誤狀態
			// 不主動 clearUser，讓 API 攔截器處理 401
			return null;
		} finally {
			loading.value = false; // 確保 loading 狀態被重置
		}
	}

	// 登出 - 手動處理，確保 loading 狀態
	async function logout() {
		loading.value = true;
		try {
			// 只有在登入狀態下才嘗試調用 API 登出
			if (token.value) {
				await auth.logout();
			}
		} catch (err) {
			console.error("登出 API 請求失敗:", err);
		} finally {
			clearUser(); // 清除本地 token 和 user data
			loading.value = false;
			// 可以導航到首頁或登入頁
			// navigateTo('/');
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
	if (process.client) {
		initializeAuth().catch((err) => {
			console.error("初始化認證失敗:", err);
		});
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
		account,
		email,
		role,
		// Actions
		login,
		fetchProfile,
		logout,
		setToken,
		clearUser,
		initializeAuth
	};
});
