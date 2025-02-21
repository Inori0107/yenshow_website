<template>
	<!-- HeroPic -->
	<div class="container min-h-screen flex flex-col justify-end md:justify-center items-center gap-[24px] xl:gap-[128px]">
		<!-- Logo -->
		<img class="hidden md:block w-[500px] h-[200px] mt-[128px]" src="/public/yenshow.png" alt="Hero Pic" />
		<!-- Content -->
		<div class="flex flex-col xl:flex-row gap-[24px] xl:gap-[48px]">
			<!-- HeroText -->
			<span class="text-secondary text-[36px] md:text-[48px]">
				智慧防護，<br />
				<span class="text-[24px] md:text-[36px] ms-[48px]">讓安心無所不在</span>
			</span>
			<!-- block CTA -->
			<div class="md:h-[293px] grid grid-cols-1 md:grid-cols-3 gap-[24px]">
				<div
					v-for="block in blocks"
					:key="block.number"
					@mouseenter="setActiveBlock(block.number)"
					class="bg-primary flex flex-col gap-4 cursor-pointer transition-all duration-300 rounded-lg shadow-lg border border-gray-200"
					:class="{
						'w-full h-[168px] md:w-[270px] md:h-[293px] text-secondary': block.number === activeBlock,
						'w-[0px] h-[168px] md:w-[270px] md:h-[0px] text-primary ': block.number !== activeBlock
					}"
				>
					<h4 class="mt-4 mx-4 md:mt-8 md:mx-8 w-[28px] text-[24px] border-b-2 border-current pb-1">0{{ block.number }}</h4>
					<p class="mx-4 md:mx-8 w-[96px] text-[24px] font-bold">{{ block.title }}</p>
					<span class="mx-4 md:mx-8 w-[200px] text-[16px] opacity-70">{{ block.description }}</span>
				</div>
			</div>
		</div>
	</div>

	<!-- Story -->
	<div class="my-[128px] md:my-[512px]">
		<!-- 引言 -->
		<div class="h-screen relative">
			<div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-row-reverse gap-[24px] md:gap-[36px] lg:gap-[48px]">
				<div class="vertical-text text-[21px] md:text-[28px] lg:text-[36px] p-[6px]">白雲升遠岫 搖曳入晴空</div>
				<div class="vertical-text text-[21px] md:text-[28px] lg:text-[36px] p-[6px]">啟發遠岫科技的成立與精神</div>
				<div class="vertical-text text-[21px] md:text-[28px] lg:text-[36px] p-[6px]">描繪了白雲從遠山升起</div>
				<div class="vertical-text text-[21px] md:text-[28px] lg:text-[36px] p-[6px]">飄向晴空的自然景象</div>
				<div class="vertical-text text-[21px] md:text-[28px] lg:text-[36px] p-[6px]">展現和諧之美與深刻人生哲理</div>
			</div>
		</div>
		<!-- 白雲 -->
		<div class="h-screen relative">
			<div class="absolute top-1/2 left-1/2 md:left-2/3 -translate-x-1/2 -translate-y-1/2 flex flex-row-reverse gap-[24px] md:gap-[36px] lg:gap-[48px]">
				<div class="vertical-title text-[36px] md:text-[64px] lg:text-[96px] p-[6px] rounded-lg">白雲</div>
				<div class="vertical-text text-[21px] md:text-[28px] lg:text-[36px] p-[6px]">以其輕盈靈動的姿態</div>
				<div class="vertical-text text-[21px] md:text-[28px] lg:text-[36px] p-[6px]">象徵無限的創新力量</div>
				<div class="vertical-text text-[21px] md:text-[28px] lg:text-[36px] p-[6px]">遠岫科技以創新為核心</div>
				<div class="vertical-text text-[21px] md:text-[28px] lg:text-[36px] p-[6px]">提供高效且突破性的方案</div>
				<div class="vertical-text text-[21px] md:text-[28px] lg:text-[36px] p-[6px]">幫助客戶克服挑戰</div>
			</div>
		</div>
		<!-- 遠岫 -->
		<div class="h-screen relative">
			<div class="absolute top-1/2 left-1/3 -translate-x-1/2 -translate-y-1/2 flex flex-row-reverse gap-[24px] md:gap-[36px] lg:gap-[48px]">
				<div class="vertical-title text-[36px] md:text-[64px] lg:text-[96px] p-[6px] rounded-lg">遠岫</div>
				<div class="vertical-text text-[21px] md:text-[28px] lg:text-[36px] p-[6px]">遠山象徵穩重與堅實</div>
				<div class="vertical-text text-[21px] md:text-[28px] lg:text-[36px] p-[6px]">其精神為追求卓越與承諾可靠</div>
				<div class="vertical-text text-[21px] md:text-[28px] lg:text-[36px] p-[6px]">穩健可靠的態度體現對客戶的承諾</div>
				<div class="vertical-text text-[21px] md:text-[28px] lg:text-[36px] p-[6px]">共創長期信賴的夥伴關係</div>
			</div>
		</div>
		<!-- 晴空 -->
		<div class="h-screen relative">
			<div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-row-reverse gap-[24px] md:gap-[36px] lg:gap-[48px]">
				<div class="vertical-title text-[36px] md:text-[64px] lg:text-[96px] p-[6px] rounded-lg">晴空</div>
				<div class="vertical-text text-[21px] md:text-[28px] lg:text-[36px] p-[6px]">晴朗無垠的天空</div>
				<div class="vertical-text text-[21px] md:text-[28px] lg:text-[36px] p-[6px]">代表對未來的啟迪與願景</div>
				<div class="vertical-text text-[21px] md:text-[28px] lg:text-[36px] p-[6px]">遠岫科技不僅協助客戶實現目標</div>
				<div class="vertical-text text-[21px] md:text-[28px] lg:text-[36px] p-[6px]">更攜手描繪長遠未來</div>
				<div class="vertical-text text-[21px] md:text-[28px] lg:text-[36px] p-[6px]">在廣闊藍天下實現共同成果</div>
			</div>
		</div>
	</div>

	<!-- Intro -->
	<div class="bg-secondary rounded-[100px] py-[48px] flex flex-col gap-[48px] lg:gap-[144px]">
		<span class="overflow-hidden text-[48px] lg:text-[96px] text-primary opacity-50 text-nowrap">OUR SERVICE OUR SERVICE OUR SERVICE</span>
		<!-- feature -->
		<div class="relative flex flex-col items-center">
			<img class="absolute top-2/3 w-screen" src="/public/YSCP/intro-background.png" alt="" />
			<!-- row -->
			<div class="flex gap-[12px] md:gap-[16px] lg:gap-[24px]">
				<Hexagon imageSrc="/YSCP/board-game.png" title="數位看板" />
				<Hexagon imageSrc="/YSCP/intelligent-analytics.png" title="智能分析" />
				<Hexagon imageSrc="/YSCP/vehicle.png" title="車輛" />
				<Hexagon imageSrc="/YSCP/visitor.png" title="訪客" />
			</div>
			<!-- row -->
			<div class="flex gap-[12px] md:gap-[16px] lg:gap-[24px] items-center">
				<Hexagon imageSrc="/YSCP/image.png" title="影像" />
				<div class="hexagon-title h-[96px] md:h-[169px] lg:h-[225px] text-[12px] md:text-[24px]">數據與監控</div>
				<div class="w-full flex flex-col gap-[4px] items-center">
					<img class="w-[24px] h-[24px] md:w-[50px] md:h-[50px]" src="/public/yenshow icon.png" alt="遠岫科技" />
					<span class="text-[12px] md:text-[24px] lg:text-[36px]">遠岫科技</span>
				</div>
				<div class="hexagon-title h-[96px] md:h-[169px] lg:h-[225px] text-[12px] md:text-[24px]">安全與管理</div>
				<Hexagon imageSrc="/YSCP/guarded-entrance.png" title="門禁" />
			</div>
			<!-- row -->
			<div class="flex gap-[12px] md:gap-[16px] lg:gap-[24px]">
				<Hexagon imageSrc="/YSCP/route.png" title="路線管理" />
				<Hexagon imageSrc="/YSCP/attendance.png" title="考勤管理" />
				<Hexagon imageSrc="/YSCP/alarm.png" title="警報" />
				<Hexagon imageSrc="/YSCP/maintain.png" title="維護" />
			</div>
		</div>
		<!-- YSCP -->
		<div class="container py-[144px] flex flex-col lg:flex-row justify-center items-center gap-[48px]">
			<!-- content -->
			<div class="flex flex-col gap-[24px] lg:gap-[48px]">
				<h3 class="text-[24px] md:text-[36px] lg:text-[48px]">YSCentral Professional</h3>
				<span class="text-[12px] md:text-[18px] lg:text-[24px] opacity-80">
					一款整合式安全性軟體，<br />
					旨在透過一個「直覺」的平台來應對多種安全挑戰。
				</span>
				<p class="text-[16px] md:text-[24px] lg:text-[36px]">
					在保護人員和財產安全的同時，<br />
					讓日常營運更有效率，<br />
					幫助使用者做出更明智的決策。
				</p>
			</div>
			<!-- image -->
			<div class="grid grid-cols-2">
				<!-- feature01 -->
				<div class="w-[200px] h-[200px] md:w-[300px] md:h-[300px] ml-[-25px] md:ml-0 YSCP-circle shadow-lg col-span-2 col-start-2">
					<span class="text-[24px] md:text-[36px] opacity-80">01</span>
					<span class="text-[16px] md:text-[24px]">中央管理平台</span>
				</div>
				<!-- feature02 -->
				<div
					class="w-[200px] h-[200px] md:w-[300px] md:h-[300px] mt-[-100px] ml-[5px] md:mt-[-150px] md:ml-[75px] YSCP-circle shadow-lg col-span-2 col-start-1"
				>
					<span class="text-[24px] md:text-[36px] opacity-80">02</span>
					<span class="text-[16px] md:text-[24px]">軟體與硬體整合</span>
				</div>
				<!-- feature03 -->
				<div
					class="w-[200px] h-[200px] md:w-[300px] md:h-[300px] mt-[-125px] ml-[-25px] md:mt-[-175px] md:ml-[-25px] YSCP-circle shadow-lg col-span-2 col-start-2"
				>
					<span class="text-[24px] md:text-[36px] opacity-80">03</span>
					<span class="text-[16px] md:text-[24px]">完整的解決方案</span>
				</div>
			</div>
		</div>
		<!-- 合作經驗談 -->
		<div class="container"></div>
	</div>

	<!-- Quote -->
	<div class="h-screen flex justify-center items-center my-[128px] md:my-[512px]">
		<span class="text-center text-[36px] text-secondary" style="font-family: 'LXGW WenKai Mono TC'">
			遠岫科技，既是一段故事，也是一份使命。<br />
			我們期待與每一位客戶攜手，如白雲般靈活，如遠岫般穩固，<br />
			共創晴空般廣闊的願景。
		</span>
	</div>

	<!-- Cooperation -->
	<Cooperation></Cooperation>

	<!-- Product -->
	<div class="my-[128px] md:my-[512px]">
		<h1 class="mb-[32px] lg:mb-[48px] text-[24px] md:text-[48px] lg:text-[64px] text-secondary text-center">產品中心</h1>
		<div class="h-[793px] overflow-scroll">
			<ProductIntroduction01></ProductIntroduction01>
			<ProductIntroduction02></ProductIntroduction02>
			<ProductIntroduction03></ProductIntroduction03>
			<ProductIntroduction04></ProductIntroduction04>
		</div>
	</div>

	<!-- News & Events -->
	<div class="bg-secondary rounded-[100px] flex flex-col pt-[24px] lg:pt-[48px] pb-[72px] lg:pb-[144px] gap-[24px] md:gap-[48px]">
		<span class="overflow-hidden text-[48px] lg:text-[96px] text-primary opacity-50 text-nowrap">LEARN MORE LEARN MORE LEARN MORE</span>
		<!-- News -->
		<div class="container px-[48px] lg:px-[120px] text-primary flex flex-col lg:flex-row justify-between lg:items-center gap-[24px] lg:gap-0">
			<!-- CTA -->
			<div class="min-w-[328px] flex items-end lg:items-start lg:flex-col gap-[12px] lg:gap-[24px]">
				<div class="flex flex-col gap-[12px] lg:gap-[24px] me-auto">
					<h3 class="text-[24px] md:text-[36px] lg:text-[64px]">News</h3>
					<span class="text-[12px] md:text-[16px] lg:text-[24px] opacity-80">最新消息</span>
				</div>
				<ButtonCTA class="w-fit h-fit"></ButtonCTA>
			</div>
			<!-- Content -->
			<div class="w-full max-w-[880px] border-y-2 border-primary divide-y-2 divide-primary">
				<!-- New01 -->
				<div class="px-[24px] py-[12px] flex items-center gap-[24px]">
					<h5 class="text-[12px] lg:text-[16px] font-bold">2025.02.17</h5>
					<div class="text-[8px] lg:text-[12px] px-[4px] py-[2px] lg:px-[6px] lg:py-[4px] rounded-full border-2 border-primary opacity-80">小知識</div>
					<span class="text-[12px] lg:text-[24px]">我是標題</span>
				</div>
				<!-- New02 -->
				<div class="px-[24px] py-[12px] flex items-center gap-[24px]">
					<h5 class="text-[12px] lg:text-[16px] font-bold">2025.02.17</h5>
					<div class="text-[8px] lg:text-[12px] px-[4px] py-[2px] lg:px-[6px] lg:py-[4px] rounded-full border-2 border-primary opacity-80">新聞稿</div>
					<span class="text-[12px] lg:text-[24px]">我是標題</span>
				</div>
				<!-- New03 -->
				<div class="px-[24px] py-[12px] flex items-center gap-[24px]">
					<h5 class="text-[12px] lg:text-[16px] font-bold">2025.02.17</h5>
					<div class="text-[8px] lg:text-[12px] px-[4px] py-[2px] lg:px-[6px] lg:py-[4px] rounded-full border-2 border-primary opacity-80">小知識</div>
					<span class="text-[12px] lg:text-[24px]">我是標題</span>
				</div>
			</div>
		</div>
		<!-- Problems -->
		<div class="container px-[48px] lg:px-[120px] text-primary flex flex-col lg:flex-row justify-between lg:items-center gap-[24px] lg:gap-0">
			<!-- CTA -->
			<div class="min-w-[328px] flex items-end lg:items-start lg:flex-col gap-[12px] lg:gap-[24px]">
				<div class="flex flex-col gap-[12px] lg:gap-[24px] me-auto">
					<h3 class="text-[24px] md:text-[36px] lg:text-[64px]">Problems</h3>
					<span class="text-[12px] md:text-[16px] lg:text-[24px] opacity-80">常見問題</span>
				</div>
				<ButtonCTA class="w-fit h-fit"></ButtonCTA>
			</div>
			<!-- Content -->
			<div class="w-full max-w-[880px] border-y-2 border-primary divide-y-2 divide-primary">
				<!-- Problems01 -->
				<div class="px-[24px] py-[12px] flex items-center gap-[24px]">
					<h5 class="text-[12px] lg:text-[24px]">Q1</h5>
					<span class="text-[12px] lg:text-[24px]">我是標題</span>
				</div>
				<!-- Problems02 -->
				<div class="px-[24px] py-[12px] flex items-center gap-[24px]">
					<h5 class="text-[12px] lg:text-[24px]">Q2</h5>
					<span class="text-[12px] lg:text-[24px]">我是標題</span>
				</div>
				<!-- Problems03 -->
				<div class="px-[24px] py-[12px] flex items-center gap-[24px]">
					<h5 class="text-[12px] lg:text-[24px]">Q3</h5>
					<span class="text-[12px] lg:text-[24px]">我是標題</span>
				</div>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
import Cooperation from "~/components/Cooperation.vue";

useHead({
	title: "遠岫科技",
	meta: [{ name: "description", content: "這是我的 Nuxt 網站" }]
});

const activeBlock = ref(1);
const setActiveBlock = (number: any) => {
	activeBlock.value = number;
};
const blocks = ref([
	{ number: 1, title: "品牌故事", description: "了解我們的品牌歷史與願景" },
	{ number: 2, title: "合作案例", description: "探索我們成功合作的案例" },
	{ number: 3, title: "產品中心", description: "查看我們的產品與解決方案" }
]);
</script>

<style scoped>
html {
	scroll-behavior: smooth;
}

.vertical-text {
	writing-mode: vertical-lr;
	height: fit-content;
	letter-spacing: 10px;
	text-orientation: upright;
	background-color: #f2f2f2;
	box-shadow: 2px 2px 10px rgba(0, 0, 0, 0.5);
	font-family: "LXGW WenKai Mono TC";
}
.vertical-title {
	writing-mode: vertical-lr;
	height: fit-content;
	letter-spacing: 10px;
	text-orientation: upright;
	background: linear-gradient(45deg, transparent, #f2f2f2);
	box-shadow: 2px 2px 10px rgba(0, 0, 0, 0.5);
	font-family: "LXGW WenKai Mono TC";
}
.hexagon-title {
	aspect-ratio: cos(30deg);
	clip-path: polygon(-50% 50%, 50% 100%, 150% 50%, 50% 0);
	background: linear-gradient(#dd1c1c, #770f0f);
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	color: #f2f2f2;
	gap: 4px;
}
.YSCP-circle {
	color: #212a37;
	font-weight: bold;
	background: radial-gradient(closest-side, #d9d9d9, #ffffff);
	border-radius: 100%;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
}
</style>
