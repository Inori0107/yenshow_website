import type { RouterConfig } from "@nuxt/schema";

export default <RouterConfig>{
	scrollBehavior(to, from, savedPosition) {
		// 如果有儲存的滾動位置 (通常是瀏覽器歷史操作，例如點擊上一頁/下一頁)
		if (savedPosition) {
			return savedPosition;
		}

		// 如果目標路由帶有 hash (錨點)
		if (to.hash) {
			return {
				el: to.hash,
				behavior: "smooth" // 平滑滾動到錨點, 可改為 'instant'
			};
		}

		// 對於所有其他新的路由導航，都滾動到頁面頂部
		return { top: 0, behavior: "instant" }; // 確保立即到頂部
	}
};
