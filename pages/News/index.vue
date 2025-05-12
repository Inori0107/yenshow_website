<template>
	<div class="container min-h-screen p-[120px] md:p-[96px] flex flex-col gap-[48px]">
		<h2 class="text-center text-[24px] md:text-[36px] lg:text-[48px] font-bold py-[12px] md:pt-[24px] md:pb-[48px] text-white">最新消息</h2>
		<!-- 顯示載入狀態 with Skeleton -->
		<div v-if="newsStore.isLoading" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[24px]">
			<SkeletonNewsCard v-for="n in 3" :key="`skeleton-${n}`" />
		</div>

		<!-- 顯示錯誤訊息 -->
		<div v-else-if="newsStore.error" class="text-center text-red-500">
			<p>無法載入新聞：{{ newsStore.error }}</p>
		</div>

		<!-- News 列表 -->
		<div v-else-if="newsStore.newsList && newsStore.newsList.length > 0" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[32px]">
			<NuxtLink
				:to="`/News/${newsItem.slug || newsItem._id}`"
				v-for="newsItem in newsStore.newsList"
				:key="newsItem._id || newsItem.id"
				class="rounded-lg bg-white/90 backdrop-blur-sm overflow-hidden flex flex-col no-underline shadow-md hover:shadow-xl transition-shadow duration-300 group"
			>
				<img
					class="w-full h-48 object-cover transform transition-transform duration-300 ease-in-out group-hover:scale-105"
					:src="getImageUrl(newsItem.coverImageUrl)"
					:alt="getLocalizedText(newsItem.title, languageStore.currentLang)"
				/>
				<div class="flex flex-col gap-[12px] p-[20px] flex-grow">
					<h4 class="text-[18px] md:text-[22px] font-bold text-primary overflow-hidden whitespace-nowrap text-ellipsis">
						{{ getLocalizedText(newsItem.title, languageStore.currentLang) }}
					</h4>
					<p class="text-[10px] md:text-[12px] text-slate-500">{{ formatDate(newsItem.publishDate) }}</p>
					<p class="text-[13px] md:text-[15px] text-slate-600 mt-auto break-words line-clamp-3">
						{{ generateSummary(newsItem, languageStore.currentLang) }}
					</p>
				</div>
			</NuxtLink>
		</div>
	</div>
</template>

<script setup>
import { onMounted } from "vue"; // computed 可能不再需要，除非有其他用途
import { useNewsStore } from "~/stores/newsStore";
import ButtonCTA from "~/components/common/Button-CTA.vue"; // 更新後的路徑
import { useLanguageStore } from "~/stores/core/languageStore"; // 用於多語言支援
import SkeletonNewsCard from "~/components/news/SkeletonNewsCard.vue";

const newsStore = useNewsStore();
const languageStore = useLanguageStore(); // 用於獲取當前語言
const config = useRuntimeConfig(); // 用於獲取 apiBaseUrl

// 處理圖片 URL
const getImageUrl = (coverImgUrl) => {
	if (!coverImgUrl) return "/News.png"; // 預設圖片
	if (coverImgUrl.startsWith("http://") || coverImgUrl.startsWith("https://")) {
		return coverImgUrl;
	}
	const base = config.public.apiBaseUrl?.replace(/\/$/, "") || "";
	const imagePath = coverImgUrl.replace(/^\//, "");
	return `${base}/${imagePath}`;
};

// 獲取本地化文字 (主要用於 title)
const getLocalizedText = (field, lang) => {
	const currentLang = lang.toUpperCase();
	if (typeof field === "object" && field !== null) {
		return field[currentLang] || field.TW || field.EN || "";
	} else if (typeof field === "string") {
		return field;
	}
	return "";
};

// 生成新聞摘要
const generateSummary = (newsItem, lang) => {
	const currentLang = lang.toUpperCase();
	// 優先使用 newsItem.summary
	if (newsItem.summary && typeof newsItem.summary === "object") {
		const localizedSummary = newsItem.summary[currentLang] || newsItem.summary.TW || newsItem.summary.EN;
		if (localizedSummary && localizedSummary.trim() !== "") {
			return localizedSummary;
		}
	}

	// 若無摘要，則從 contentBlocks 生成
	if (Array.isArray(newsItem.content) && newsItem.content.length > 0) {
		for (const block of newsItem.content) {
			if (block.itemType === "richText" && block.richTextData) {
				const langContent = block.richTextData[currentLang] || block.richTextData.TW;
				if (Array.isArray(langContent)) {
					for (const richTextBlock of langContent) {
						if (richTextBlock.type === "paragraph" && richTextBlock.text) {
							return richTextBlock.text; // 返回第一個段落的文字
						}
					}
				}
			}
		}
	}
	return "閱讀更多..."; // 如果沒有合適的段落或摘要
};

// 格式化日期
const formatDate = (dateString) => {
	if (!dateString) return "無日期";
	try {
		return new Date(dateString).toLocaleDateString("sv-SE"); // YYYY-MM-DD
	} catch (e) {
		console.warn("日期格式錯誤:", dateString);
		return "日期無效";
	}
};

onMounted(() => {
	newsStore.fetchAllNews();
});
</script>
