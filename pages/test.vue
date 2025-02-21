<template>
	<div class="bg-white py-12">
		<div class="container mx-auto">
			<!-- 第一行（奇數步驟文字） -->
			<div class="flex justify-center items-start mb-6">
				<div v-for="(step, index) in steps" :key="index" class="flex-grow text-center">
					<div v-if="index % 2 === 1" class="w-fit">
						<h5 class="md:text-[24px] lg:text-[36px] font-bold">{{ step.title }}</h5>
						<span class="md:text-[16px] lg:text-[24px] whitespace-pre-line opacity-60">{{ step.text }}</span>
					</div>
				</div>
			</div>

			<!-- 第二行（所有步驟圖示） -->
			<div class="relative flex justify-center items-center">
				<!-- 中央曲線 -->
				<!-- <div class="absolute w-[90%] h-[10px] bg-gradient-to-r from-red-500 to-gray-500 rounded-full"></div> -->

				<!-- 圖示 -->
				<div v-for="(step, index) in steps" :key="index" class="relative w-1/5 flex justify-center">
					<div
						class="w-3/4 aspect-square rounded-full border-[16px] flex items-center justify-center"
						:class="index % 2 === 1 ? 'border-red-500' : 'border-gray-500'"
					>
						<img :src="step.icon" alt="Step Icon" class="w-3/5" />
					</div>
				</div>
			</div>

			<!-- 第三行（偶數步驟文字） -->
			<div class="flex justify-center items-start mt-6">
				<div v-for="(step, index) in steps" :key="index" class="flex-grow text-center">
					<div v-if="index % 2 === 0" class="w-fit">
						<h5 class="md:text-[24px] lg:text-[36px] font-bold">{{ step.title }}</h5>
						<span class="md:text-[16px] lg:text-[24px] whitespace-pre-line opacity-60">{{ step.text }}</span>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script setup>
const steps = [
	{ icon: "/features/visitor01.png", title: "訪客來臨", text: "訪客來到櫃檯" },
	{ icon: "/features/visitor02.png", title: "訪客登記", text: "前台接待人員上傳照片、\n身份證(ID)和一些關鍵信息" },
	{ icon: "/features/visitor03.png", title: "權限分配", text: "分配訪客的訪問權限和憑證\n（支持人臉，卡，指紋，和QR code）" },
	{ icon: "/features/visitor04.png", title: "訪客離開", text: "訪客離開，可在VMS上註銷，\n使該訪客的所有權限立即失效." },
	{ icon: "/features/visitor05.png", title: "記錄追蹤", text: "系統保存記錄，方便快速搜索。" }
];
</script>
