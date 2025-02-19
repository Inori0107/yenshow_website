<template>
	<div class="w-full bg-white pt-[144px]">
		<!-- 擺閘式 -->
		<div class="w-full md:w-1/3 flex flex-row md:flex-col gap-[16px] md:gap-[24px]">
			<h4 class="vertical-text text-[21px] md:text-[24px] lg:text-[36px] text-center">擺閘式</h4>
			<!-- 預覽圖 -->
			<div class="hidden md:flex bg-[#F3F5F7] w-[250px] md:w-full aspect-square justify-center items-center">
				<img class="w-[60%] aspect-square" :src="selectedImage" alt="預覽圖" />
			</div>
			<!-- 小圖滾動區 -->
			<div class="scroll-container w-full flex gap-[24px]">
				<div v-for="image in images" :key="image" class="scroll-item" :class="{ active: selectedImage === image }" @mouseenter="selectedImage = image">
					<img class="w-3/5 aspect-square" :src="image" alt="產品圖片" />
				</div>
			</div>
		</div>
	</div>
</template>

<script setup>
import { ref } from "vue";

const images = ["/product/YS-K3B501SX.png", "/product/YS-K3G411X.png", "/product/YS-K7R83X.png"];

const selectedImage = ref(images[0]);
</script>

<style scoped>
/* 小圖滾動區 */
.scroll-container {
	overflow-x: auto;
	scroll-behavior: smooth;
	-webkit-overflow-scrolling: touch;
	scroll-snap-type: x mandatory;
}

/* 隱藏滾動軸 */
.scroll-container::-webkit-scrollbar {
	display: none;
}

.scroll-item {
	width: 50%;
	aspect-ratio: 1;
	background: #f4f5f7;
	flex-shrink: 0;
	scroll-snap-align: start;
	cursor: pointer;

	display: flex;
	justify-content: center;
	align-items: center;
}
.active {
	border: 4px solid rgba(33, 42, 55, 0.8);
}

/* 選中圖片的 active 樣式 */
@media (max-width: 768px) {
	.scroll-item {
		width: 250px;
		height: auto;
	}
}
</style>
