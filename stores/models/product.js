import { createEntityStore } from "../entityStore";

// ProductsController 可能有特殊的 responseKey 或行為，但 BaseController 預設為 'products'
// 讀取操作通常不需要驗證
export const useProductsStore = createEntityStore("products", {
	requiresAuth: false
	// 如果 ProductsController 返回的列表鍵名不同，在這裡指定 responseKey
	// responseKey: 'productList'
});
