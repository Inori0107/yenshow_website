<template>
	<div class="bg-secondary">
		<div v-if="loading" class="container min-h-screen p-8 text-center">載入中...</div>
		<div v-else-if="error" class="min-h-screen flex items-center justify-center">
			<div class="bg-red-50 text-red-500 p-8 rounded-lg text-center">
				<h2 class="text-2xl font-bold mb-4">無法載入新聞內容</h2>
				<p>{{ error }}</p>
				<NuxtLink to="/News" class="text-blue-600 hover:underline">返回最新消息</NuxtLink>
			</div>
		</div>
		<article v-else-if="newsDetail" class="pb-8 md:pb-12 lg:pb-16">
			<!-- 麵包屑導航 -->
			<div class="p-4 md:p-6 lg:p-8">
				<nav class="text-[12px] md:text-[16px] lg:text-[21px] text-gray-500">
					<ol class="flex flex-wrap items-center">
						<li><NuxtLink to="/" class="hover:text-primary">首頁</NuxtLink></li>
						<li class="mx-2">/</li>
						<li><NuxtLink to="/News" class="hover:text-primary">最新消息</NuxtLink></li>
						<li class="mx-2">/</li>
						<li class="text-gray-700 font-medium truncate">{{ getLocalizedText(newsDetail.title) }}</li>
					</ol>
				</nav>
			</div>

			<!-- 新聞主體區塊 -->
			<section class="container flex flex-col md:flex-row items-start gap-4 md:gap-8 lg:gap-12 py-4 md:py-6 lg:py-8">
				<!-- 左側: 封面圖片 (可選) -->
				<div v-if="newsDetail.coverImageUrl" class="w-full md:w-1/3 lg:w-2/5">
					<img
						:src="getImageUrl(newsDetail.coverImageUrl)"
						:alt="getLocalizedText(newsDetail.title)"
						class="w-full h-auto max-h-[400px] md:max-h-[500px] object-cover rounded-lg shadow-md"
					/>
				</div>

				<!-- 右側: 標題、日期、分類 -->
				<div :class="newsDetail.coverImageUrl ? 'w-full md:w-2/3 lg:w-3/5' : 'w-full'">
					<h1 class="text-2xl md:text-3xl lg:text-4xl font-bold mb-2 theme-text">
						{{ getLocalizedText(newsDetail.title) }}
					</h1>
					<p class="text-sm text-gray-500 dark:text-gray-400 mb-6 md:mb-8">發布於 {{ formatDate(newsDetail.publishDate) }} | 分類: {{ newsDetail.category }}</p>
				</div>
			</section>

			<!-- 主要內容渲染 -->
			<section class="container pt-4 md:pt-0">
				<div class="prose dark:prose-invert max-w-none news-content-render bg-white p-4 md:p-6 lg:p-8 rounded-lg shadow">
					<template v-for="(block, index) in newsDetail.content" :key="block._id || `block-${index}`">
						<!-- 富文本區塊 -->
						<template v-if="block.itemType === 'richText'">
							<div v-for="(rtBlock, rtIndex) in getLocalizedRichText(block.richTextData)" :key="`rt-${index}-${rtIndex}`" class="rich-text-segment">
								<component v-if="rtBlock.type === 'heading'" :is="`h${rtBlock.level || 2}`" :style="rtBlock.style" class="font-bold">
									{{ rtBlock.text }}
								</component>
								<p
									v-else-if="rtBlock.type === 'paragraph'"
									:style="rtBlock.style"
									:class="{
										'remark-style': rtBlock.purpose === 'remark',
										'news-paragraph-title': rtBlock.purpose === 'title'
									}"
								>
									<a
										v-if="rtBlock.purpose === 'remark' && isPotentialLink(rtBlock.text)"
										:href="rtBlock.text"
										target="_blank"
										rel="noopener noreferrer"
										class="text-blue-600 hover:underline"
									>
										{{ rtBlock.text }}
									</a>
									<template v-else>
										{{ rtBlock.text }}
									</template>
								</p>
							</div>
						</template>

						<!-- 圖片區塊 -->
						<div v-else-if="block.itemType === 'image'" class="my-4 lg:my-6">
							<img
								:src="getImageUrl(block.imageUrl)"
								:alt="getLocalizedText(block.imageAltText)"
								class="w-full h-auto rounded-md object-contain max-h-[600px] bg-gray-100 dark:bg-gray-800"
							/>
							<p v-if="getLocalizedText(block.imageCaption)" class="text-center text-sm italic mt-2 text-gray-600 dark:text-gray-400">
								{{ getLocalizedText(block.imageCaption) }}
							</p>
						</div>

						<!-- 影片嵌入區塊 -->
						<div v-else-if="block.itemType === 'videoEmbed'" class="my-4 lg:my-6 aspect-video">
							<iframe
								width="100%"
								height="100%"
								:src="getEmbedVideoUrl(block.videoEmbedUrl)"
								frameborder="0"
								allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
								allowfullscreen
								class="rounded-md"
								:title="getLocalizedText(block.videoCaption) || '嵌入影片'"
							></iframe>
							<p v-if="getLocalizedText(block.videoCaption)" class="text-center text-sm italic mt-2 text-gray-600 dark:text-gray-400">
								{{ getLocalizedText(block.videoCaption) }}
							</p>
						</div>
					</template>
				</div>
			</section>

			<!-- 返回按鈕 -->
			<div class="mt-8 md:mt-12 text-center">
				<NuxtLink to="/News" class="text-blue-600 hover:underline"> &larr; 返回新聞列表 </NuxtLink>
			</div>
		</article>
		<div v-else class="min-h-screen flex items-center justify-center">
			<div class="text-center py-12 text-gray-500">
				<h2 class="text-2xl font-bold mb-4">找不到指定的新聞</h2>
				<NuxtLink to="/News" class="mt-4 inline-block text-blue-600 hover:underline">返回新聞列表</NuxtLink>
			</div>
		</div>
	</div>
</template>

<script setup>
import { ref, onMounted, computed } from "vue";
import { useRoute } from "vue-router";
import { useNewsStore } from "~/stores/newsStore";
import { useLanguageStore } from "~/stores/core/languageStore";
import { useHead } from "#app";

const route = useRoute();
const newsStore = useNewsStore();
const languageStore = useLanguageStore();
const config = useRuntimeConfig();

const newsDetail = ref(null);
const loading = ref(true);
const error = ref("");

const newsId = computed(() => route.params.id);

// 處理圖片 URL (與列表頁相同)
const getImageUrl = (imageUrl) => {
	if (!imageUrl) return "/placeholder-image.png"; // 詳情頁的預設圖或不顯示
	if (imageUrl.startsWith("http://") || imageUrl.startsWith("https://")) {
		return imageUrl;
	}
	const base = config.public.apiBaseUrl?.replace(/\/$/, "") || "";
	const imagePath = imageUrl.replace(/^\//, "");
	return `${base}/${imagePath}`;
};

// 獲取本地化文字 (用於標題、Alt、Caption)
const getLocalizedText = (field) => {
	if (typeof field === "object" && field !== null) {
		const lang = languageStore.currentLang.toUpperCase();
		return field[lang] || field.TW || field.EN || "";
	} else if (typeof field === "string") {
		return field;
	}
	return "";
};

// 從 richTextData 中獲取當前語言的內容陣列
const getLocalizedRichText = (richTextDataObject) => {
	if (typeof richTextDataObject === "object" && richTextDataObject !== null) {
		const lang = languageStore.currentLang.toUpperCase();
		return richTextDataObject[lang] || richTextDataObject.TW || []; // 回退到 TW 或空陣列
	}
	return [];
};

// 格式化日期 (與列表頁相同)
const formatDate = (dateString) => {
	if (!dateString) return "無日期";
	try {
		return new Date(dateString).toLocaleDateString("sv-SE"); // YYYY-MM-DD format
	} catch (e) {
		return "日期無效";
	}
};

// 檢查文字是否為潛在連結 (用於備註)
const isPotentialLink = (text) => {
	if (typeof text !== "string") return false;
	return text.startsWith("http://") || text.startsWith("https://");
};

// 轉換影片 URL 為可嵌入的 URL (簡易版)
const getEmbedVideoUrl = (url) => {
	if (!url) return "";
	// YouTube: youtu.be/<id> or youtube.com/watch?v=<id>
	let youtubeMatch = url.match(/^https?:\/\/(?:www\.)?(?:youtube\.com\/(?:watch\?v=|embed\/)|youtu\.be\/)([a-zA-Z0-9_-]{11})/);
	if (youtubeMatch && youtubeMatch[1]) {
		return `https://www.youtube.com/embed/${youtubeMatch[1]}`;
	}
	// Vimeo: vimeo.com/<id>
	let vimeoMatch = url.match(/^https?:\/\/(?:www\.)?vimeo\.com\/(\d+)/);
	if (vimeoMatch && vimeoMatch[1]) {
		return `https://player.vimeo.com/video/${vimeoMatch[1]}`;
	}
	if (url.includes("/embed/")) return url;
	return url;
};

onMounted(async () => {
	if (newsId.value) {
		loading.value = true;
		error.value = "";
		try {
			const fetchedNewsResponse = await newsStore.fetchNewsById(newsId.value);

			if (fetchedNewsResponse && fetchedNewsResponse.News) {
				newsDetail.value = fetchedNewsResponse.News;

				// --- SEO Meta Tags ---
				useHead(() => {
					const title = getLocalizedText(newsDetail.value.metaTitle) || getLocalizedText(newsDetail.value.title) || "新聞詳情";
					let description = getLocalizedText(newsDetail.value.metaDescription);
					if (!description) {
						description = getLocalizedText(newsDetail.value.summary); // Fallback to summary
					}

					const metaTags = [];
					if (description) {
						metaTags.push({ name: "description", content: description });
					}
					return {
						title: title,
						meta: metaTags
					};
				});
				console.log("新聞詳情 (修正後直接為新聞數據):", newsDetail.value);
				// --- End SEO Meta Tags ---
			} else {
				error.value = "找不到該新聞的內容數據或資料結構不正確。";
			}
		} catch (e) {
			console.error("獲取新聞詳情失敗:", e);
			error.value = e.message || "無法載入新聞詳情。";
		} finally {
			loading.value = false;
		}
	} else {
		error.value = "新聞 ID 或 Slug 未提供。";
		loading.value = false;
	}
});
</script>

<style scoped>
.theme-text {
	/* 假設這是您的主題色文字 class，如果沒有，可以替換或移除 */
	/* color: #yourthemecolor; */
}

.remark-style {
	font-style: italic;
	opacity: 0.9;
	border-left-width: 3px;
	padding-left: 0.75em;
	margin-top: 0.8em;
	margin-bottom: 0.8em;
}

.news-paragraph-title {
	font-weight: 600;
	font-size: 1.125rem;
	margin-top: 1.75em;
	margin-bottom: 0.75em;
	line-height: 1.6;
}
</style>
