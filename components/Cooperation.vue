<template>
	<!-- Cooperation -->
	<div class="bg-primary relative overflow-hidden">
		<div class="bg-overlay absolute inset-0 z-50 flex flex-col justify-center items-center gap-[12px] md:gap-[24px] lg:gap-[48px] text-secondary text-center">
			<h3 class="text-[24px] md:text-[48px] lg:text-[64px] font-bold">合作案例</h3>
			<p class="text-[16px] md:text-[24px] lg:text-[36px] font-bold">打造科技便捷的生活</p>
			<span class="text-[12px] md:text-[16px] lg:text-[24px] font-light"
				>各類產品系統整合，提供多種優質的安全產品和服務，<br />
				不用複雜的管理軟體，便可創造無限的價值</span
			>
			<Button-CTA label="View More" color="white" to="/cooperation"></Button-CTA>
		</div>
		<div class="h-screen lg:h-[120vh] flex flex-col justify-center items-center">
			<div class="w-[1440px] lg:w-[2560px] -rotate-6 flex gap-[24px]" v-for="(row, rowIndex) in rows" :key="rowIndex">
				<div class="animate-scroll py-[12px]" v-for="(image, index) in images" :key="index">
					<img class="w-[200px] h-[150px] lg:w-[400px] lg:h-[300px]" :src="getImage(rowIndex, index)" alt="Slide image" />
				</div>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
import { ref } from "vue";

const images = ref([
	"/Location/location01.png",
	"/Location/location02.png",
	"/Location/location03.png",
	"/Location/location04.png",
	"/Location/location05.png",
	"/Location/location06.png"
]);

const rows = ref(5);

// 取得對應 rowIndex 開始的圖片陣列
const getImage = (rowIndex: number, imageIndex: number) => {
	const startIndex = rowIndex % images.value.length; // 確保 index 不會超過圖片數量
	return images.value[(startIndex + imageIndex) % images.value.length];
};
</script>

<style scoped>
.bg-overlay {
	background-color: rgba(33, 42, 55, 0.4);
}
</style>
