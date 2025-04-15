<template>
	<div class="container min-h-screen p-[120px] md:p-[96px] flex flex-col gap-[48px] bg-white">
		<h2 class="text-center text-[24px] md:text-[36px] lg:text-[48px] font-bold py-[12px] md:py-[24px] border-b-2 border-black">最新消息</h2>
		<div class="flex justify-evenly">
			<ButtonCTA label="新聞稿"></ButtonCTA>
			<ButtonCTA label="小知識"></ButtonCTA>
		</div>

		<!-- News 列表 -->
		<div class="grid grid-cols-2 lg:grid-cols-3 gap-[24px]">
			<div v-for="(news, index) in newsList" :key="index" class="rounded-lg bg-[#F4F5F7] overflow-hidden">
				<img class="w-full" :src="news.image" :alt="news.title" />
				<div class="flex flex-col gap-[12px] p-[16px]">
					<h4 class="text-[16px] md:text-[24px] font-bold">{{ news.title }}</h4>
					<p class="text-[8px] md:text-[12px]">{{ news.date }}</p>
					<span class="text-[12px] md:text-[16px]">{{ news.description }}</span>
				</div>
			</div>
		</div>
	</div>
</template>

<script setup>
const newsList = ref([
	{
		title: "新聞標題 1",
		date: "2025-02-21",
		description: "這是一篇關於可視對講機的新聞，內容涵蓋最新技術與應用。",
		image: "/News.png"
	},
	{
		title: "新聞標題 2",
		date: "2025-02-19",
		description: "介紹可視對講機的市場趨勢及未來發展方向。",
		image: "/News.png"
	},
	{
		title: "新聞標題 3",
		date: "2025-02-18",
		description: "分析可視對講機如何提升社區安全管理。",
		image: "/News.png"
	},
	{
		title: "新聞標題 4",
		date: "2025-02-17",
		description: "這是一篇關於可視對講機的新聞，內容涵蓋最新技術與應用。",
		image: "/News.png"
	},
	{
		title: "新聞標題 5",
		date: "2025-02-16",
		description: "介紹可視對講機的市場趨勢及未來發展方向。",
		image: "/News.png"
	},
	{
		title: "新聞標題 6",
		date: "2025-02-15",
		description: "分析可視對講機如何提升社區安全管理。",
		image: "/News.png"
	}
]);
</script>
