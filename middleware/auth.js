// 驗證用戶是否已登入的中間件
export default defineNuxtRouteMiddleware((to, from) => {
	const { $cookies } = useNuxtApp();

	// 從 Cookie 檢查是否有 token
	const token = $cookies.get("auth_token");

	// 如果沒有 token 且不是已經在登入頁面，則重定向到登入頁面
	if (!token && to.path !== "/login") {
		// 儲存原始目標路徑，以便登入後重定向回去
		return navigateTo(`/login?redirect=${encodeURIComponent(to.fullPath)}`);
	}
});
