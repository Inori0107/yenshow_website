<template>
	<div class="space-y-[12px] md:space-y-[16px] lg:space-y-[24px]">
		<div v-for="category in categories" :key="getCategoryId(category)">
			<button
				type="button"
				@click="toggleActive(getCategoryId(category))"
				:class="[
					'trapezoid py-2 md:py-3 text-left ps-4 md:ps-6 transition-all duration-300 ease-in-out relative focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-1',
					isCategoryActive(category) ? 'bg-primary text-white w-[300px] lg:w-[504px]' : 'bg-gray-100 hover:bg-gray-200 text-gray-600 w-[185px] lg:w-[300px]'
				]"
				:aria-expanded="isCategoryActive(category) ? 'true' : 'false'"
				:aria-controls="`sublist-${getCategoryId(category)}`"
			>
				<span :class="['transition-all duration-300', isCategoryActive(category) ? 'text-[24px] md:text-[36px]' : 'text-[16px] md:text-[24px]']">{{
					getCategoryName(category)
				}}</span>
			</button>
			<div
				v-if="isCategoryActive(category) && getSubItems(category)"
				class="mt-3 md:mt-4 lg:mt-6 ms-6 ps-4 py-2 border-l-2 border-primary-light w-[300px] lg:w-[504px]"
				:id="`sublist-${getCategoryId(category)}`"
				role="region"
				:aria-labelledby="getCategoryId(category)"
			>
				<ul class="list-none space-y-[8px] md:space-y-[12px] lg:space-y-[16px]">
					<li
						v-for="item in getSubItems(category)"
						:key="item._id || item"
						class="text-[16px] md:text-[24px] text-gray-700 hover:text-primary transition-all duration-200 group"
						role="button"
						tabindex="0"
						@click="selectSubItem(category, item)"
						@keydown.enter="selectSubItem(category, item)"
						@keydown.space.prevent="selectSubItem(category, item)"
					>
						<span class="opacity-60 group-hover:opacity-100 transition-opacity">-&nbsp;</span>
						{{ typeof item === "string" ? item : getCategoryName(item) }}
					</li>
				</ul>
			</div>
		</div>
	</div>
</template>

<script setup>
import { ref, watch } from "vue";
import { useLanguageStore } from "~/stores/core/languageStore";

const props = defineProps({
	categories: {
		type: Array,
		required: true
	},
	initialActiveId: {
		type: String,
		default: null
	}
});

const emit = defineEmits(["category-selected", "subitem-selected"]);

const languageStore = useLanguageStore();
const activeId = ref(props.initialActiveId);

// Helper functions
const getCategoryId = (category) => category?._id || category?.id || null;
const isCategoryActive = (category) => activeId.value === getCategoryId(category);
const getSubItems = (category) => category?.subCategories || category?.items || category?.features;

// 如果沒有初始 activeId 且 categories 存在，預設選中第一個
if (!activeId.value && props.categories && props.categories.length > 0) {
	activeId.value = props.categories[0]._id || props.categories[0].id;
}

watch(
	() => props.initialActiveId,
	(newId) => {
		activeId.value = newId;
	}
);

watch(
	() => props.categories,
	(newCategories) => {
		// 當 categories 列表變化時，檢查當前 activeId 是否仍然有效
		if (newCategories && newCategories.length > 0) {
			const currentCategoryExists = newCategories.some((cat) => getCategoryId(cat) === activeId.value);
			// 如果當前選中的分類不存在於新列表中，或者沒有任何選中項，則默認選中第一個
			if (!currentCategoryExists || !activeId.value) {
				const firstCategory = newCategories[0];
				activeId.value = getCategoryId(firstCategory);
				emit("category-selected", firstCategory);
			}
		} else {
			// 如果新列表為空，則清除選中狀態
			activeId.value = null;
			emit("category-selected", null);
		}
	},
	{ immediate: true }
);

const getCategoryName = (item) => {
	if (!item) return "";
	return languageStore.getLocalizedField(item, "name") || item.title || "";
};

const toggleActive = (id) => {
	const newActiveId = activeId.value === id ? null : id;
	activeId.value = newActiveId;

	// 找到對應的 category 物件並發送事件
	const selectedCategory = props.categories.find((cat) => getCategoryId(cat) === newActiveId);
	// 即使 newActiveId 為 null (取消選擇)，也觸發事件讓父元件知道
	emit("category-selected", selectedCategory || null);
};

const selectSubItem = (category, subItem) => {
	emit("subitem-selected", { category, subItem });
	// 這裡可以根據需要添加更多邏輯，例如導航或觸發其他操作
	console.log("Subitem selected:", category, subItem);
};
</script>

<style scoped>
.trapezoid {
	clip-path: polygon(0 0, 100% 0, 85% 100%, 0 100%);
	/* 微調 15px 來改變斜角幅度 */
}
</style>
