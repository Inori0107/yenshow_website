import { ref, computed } from "vue";
import { useRouter } from "vue-router";
import { useSearchStore } from "@/stores/core/searchStore";
import { useLanguageStore } from "@/stores/core/languageStore";

export function useGlobalSearch() {
	const searchStore = useSearchStore();
	const languageStore = useLanguageStore();
	const router = useRouter();

	// 本地輸入關鍵字，用於防抖處理
	const inputKeyword = ref("");

	// 系列 ID 到路由 slug 的映射
	const seriesIdToSlugMap = {
		"67ed0511296210e234e0ddd7": "video-intercom", // 可視對講
		"67ed0512296210e234e0de10": "access-control", // 門禁管理
		"67ed0512296210e234e0df00": "devices-accessories", // 其他設備
		"67ed0512296210e234e0deb2": "security-solutions", // 安全防護
		"67ed0512296210e234e0de64": "surveillance-monitoring" // 影像監控
		// 可以根據需要添加更多映射
	};

	// 從 series ID 獲取 slug 的輔助函數
	function getSeriesSlug(seriesId) {
		return seriesIdToSlugMap[seriesId] || null;
	}

	// 搜尋結果統計
	const resultCounts = computed(() => {
		return {
			series: searchStore.results.series?.length || 0,
			categories: searchStore.results.categories?.length || 0,
			subCategories: searchStore.results.subCategories?.length || 0,
			specifications: searchStore.results.specifications?.length || 0,
			products: searchStore.results.products?.length || 0,
			total: searchStore.totalResults
		};
	});

	// 實體類型對應的中文名稱
	const entityTypeNames = {
		series: "系列",
		categories: "分類",
		subCategories: "子分類",
		specifications: "規格",
		products: "產品"
	};

	// 獲取實體的本地化名稱
	function getEntityName(entity) {
		if (!entity) return "";
		return languageStore.getLocalizedField(entity, "name");
	}

	// 搜尋函數
	async function performSearch(keyword = inputKeyword.value) {
		if (!keyword || keyword.trim() === "") return;

		inputKeyword.value = keyword;
		await searchStore.search(keyword);
	}

	// 防抖搜尋，延遲 300ms
	let searchTimeout = null;
	function debouncedSearch(keyword) {
		inputKeyword.value = keyword;

		if (searchTimeout) {
			clearTimeout(searchTimeout);
		}

		searchTimeout = setTimeout(() => {
			performSearch(keyword);
		}, 500);
	}

	// 點擊搜尋結果進行導航
	function navigateToResult(entityType, item) {
		closeSearch();

		if (!item || !item._id) return;

		let seriesSlug = null;
		let targetPath = "/products"; // 預設回退路徑

		// 根據實體類型跳轉到不同頁面
		switch (entityType) {
			case "products":
				targetPath = `/products/${item._id}`;
				router.push({ path: targetPath });
				break;
			case "series":
				seriesSlug = getSeriesSlug(item._id);
				if (seriesSlug) {
					targetPath = `/products/${seriesSlug}`;
					router.push({ path: targetPath });
				} else {
					console.warn(`找不到系列 ID ${item._id} 對應的 slug，跳轉至產品列表`);
					router.push({ path: targetPath });
				}
				break;
			case "categories":
			case "subCategories":
			case "specifications":
				// 假設 item 中包含 series._id 來找到所屬系列
				// 注意：這需要後端 API 返回結果中包含 series._id
				const seriesId = item.series?._id;
				if (seriesId) {
					seriesSlug = getSeriesSlug(seriesId);
					if (seriesSlug) {
						targetPath = `/products/${seriesSlug}`;
						// 可以考慮添加 hash 或 query 以便在目標頁面定位
						// 例如：router.push({ path: targetPath, hash: `#${item._id}` });
						router.push({ path: targetPath });
					} else {
						console.warn(`找不到項目 ${item._id} (${entityType}) 所屬系列 ID ${seriesId} 對應的 slug，跳轉至產品列表`);
						router.push({ path: targetPath });
					}
				} else {
					console.warn(`項目 ${item._id} (${entityType}) 缺少 series._id 信息，無法跳轉至系列頁面，跳轉至產品列表`);
					router.push({ path: targetPath });
				}
				break;
			default:
				console.warn(`未知的實體類型: ${entityType}，跳轉至產品列表`);
				router.push({ path: targetPath });
		}
	}

	// 清空搜尋
	function clearSearch() {
		inputKeyword.value = "";
		searchStore.closeSearch();
	}

	// 載入最近搜尋
	function loadRecentSearches() {
		searchStore.loadRecentSearches();
	}

	// 初始化
	loadRecentSearches();

	// 修改 closeSearch 函數
	function closeSearch() {
		inputKeyword.value = "";
		searchStore.closeSearch();
	}

	return {
		// 狀態
		isVisible: computed(() => searchStore.isVisible),
		isLoading: computed(() => searchStore.isLoading),
		keyword: inputKeyword,
		activeTab: computed(() => searchStore.activeTab),

		// 結果
		results: computed(() => searchStore.results),
		resultCounts,
		hasResults: computed(() => searchStore.hasResults),
		currentTabResults: computed(() => searchStore.currentTabResults),
		recentSearches: computed(() => searchStore.recentSearches),

		// 工具函數
		toggleSearch: () => searchStore.toggleSearch(),
		closeSearch,
		setActiveTab: (tab) => searchStore.setActiveTab(tab),
		search: performSearch,
		debouncedSearch,
		navigateToResult,
		clearSearch,
		getEntityName,
		entityTypeNames,
		clearRecentSearches: () => searchStore.clearRecentSearches()
	};
}
