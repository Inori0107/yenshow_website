<template>
	<div class="bg-secondary rounded-[50px] lg:rounded-[100px]">
		<div class="container py-[24px] md:py-[48px] lg:h-[793px] flex flex-col-reverse md:flex-row justify-evenly items-center gap-[24px]">
			<!-- content -->
			<div class="px-[24px] md:px-[36px] lg:px-[64px] flex flex-col items-center gap-[24px] lg:gap-[48px] text-primary">
				<div class="w-full flex gap-[32px] lg:gap-[64px]">
					<span class="bg-[#4DB6AC] h-fit rounded-full text-[12px] md:text-[16px] lg:text-[24px] px-[12px]">03</span>
					<h3 class="text-[21px] md:text-[32px] lg:text-[48px]">影像監控</h3>
				</div>
				<div class="text-[12px] md:text-[16px] lg:text-[24px]">
					結合先進的視訊通訊與門禁控制技術，提供高品質的影像與音訊傳輸，確保訪客識別的準確性與安全性。產品設計人性化，操作簡便，適用於住宅、辦公室、工廠等多種場景，滿足不同用戶的需求。透過APP，每個室內機最多可綁定5個家人使用，實現遠端監控與管理，提升生活便利性與安全性。
				</div>
				<ButtonCTA></ButtonCTA>
			</div>
			<!-- image -->
			<div class="h-fit flex flex-col items-center gap-[16px] p-[16px] lg:p-[32px] bg-white rounded-[50px]">
				<!-- 選擇按鈕區 -->
				<div class="flex gap-[16px] lg:gap-[32px]">
					<span
						v-for="(item, index) in imageOptions"
						:key="index"
						@click="setImage(index)"
						class="text-[16px] lg:text-[24px] cursor-pointer transition duration-300"
						:class="{ 'text-primary font-bold border-b-2 border-primary': selectedImageIndex === index }"
					>
						{{ item.label }}
					</span>
				</div>
				<!-- 切換圖片 -->
				<div class="w-[300px] h-[225px] lg:w-[400px] lg:h-[300px] flex justify-center items-center rounded-[25px]">
					<img class="max-h-full w-auto object-contain" :src="selectedImage" alt="選擇的圖片" />
				</div>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
// 定義圖片選項
const imageOptions = ref([
	{ label: "IPC", src: "/product/iYS-2CD7A46G2_P.png" },
	{ label: "NVR", src: "/product/iYS-BA04.jpg" }
]);

const selectedImageIndex = ref(0); // 預設顯示第一張
const selectedImage = ref(imageOptions.value[selectedImageIndex.value].src);

// 點擊時變更圖片
const setImage = (index: number) => {
	selectedImageIndex.value = index;
	selectedImage.value = imageOptions.value[index].src;
};
</script>
