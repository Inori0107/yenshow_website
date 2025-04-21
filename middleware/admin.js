// 驗證用戶是否具有管理員權限的中間件
export default defineNuxtRouteMiddleware(async (to, from) => {
	const { $cookies } = useNuxtApp();
	const userStore = useUserStore();

	// 先檢查是否有 token
	const token = $cookies.get("auth_token");

	// 如果沒有 token，重定向到登入頁面
	if (!token) {
		return navigateTo(`/login?redirect=${encodeURIComponent(to.fullPath)}`);
	}

	// 如果 userStore 中沒有用戶資訊，嘗試獲取
	if (!userStore.user) {
		try {
			await userStore.fetchProfile();
		} catch (error) {
			console.error("無法獲取用戶資料:", error);
			// 如果無法獲取資料，清除 token 並重定向到登入頁面
			$cookies.remove("auth_token");
			return navigateTo("/login");
		}
	}

	// 檢查是否為管理員
	if (!userStore.isAdmin) {
		// 如果不是管理員，重定向到沒有權限頁面或首頁
		return navigateTo("/unauthorized");
	}
});
