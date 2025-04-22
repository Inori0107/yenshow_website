import { createEntityStore } from "../entityStore";

// BaseController 預設 responseKey 為 'specifications'
// 讀取操作通常不需要驗證
export const useSpecificationsStore = createEntityStore("specifications", {
	requiresAuth: false
});
