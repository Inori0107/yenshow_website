<template>
	<div class="bg-secondary rounded-[50px] lg:rounded-[100px]">
		<div class="container py-[24px] md:py-[48px] lg:h-[793px] flex flex-col-reverse md:flex-row justify-evenly items-center gap-[24px]">
			<!-- content -->
			<div class="px-[24px] md:px-[36px] lg:px-[64px] flex flex-col items-center gap-[24px] lg:gap-[48px] text-primary">
				<div class="w-full flex gap-[32px] lg:gap-[64px]">
					<span class="bg-[#FFC857] h-fit rounded-full text-[12px] md:text-[16px] lg:text-[24px] px-[12px]">02</span>
					<h3 class="text-[21px] md:text-[32px] lg:text-[48px]">門禁管理</h3>
				</div>
				<div class="text-[12px] md:text-[16px] lg:text-[24px]">
					門禁控制產品系列，融合刷卡、指紋識別與人臉識別等多種先進技術，提供高效且安全的出入管理解決方案。產品設計靈活，適用於企業大樓、政府機構、機場、學校等多種場景，滿足不同用戶的需求。透過多樣化的識別方式，提升通行效率，確保場所安全。
				</div>
				<ButtonCTA to="/products/Access-Control"></ButtonCTA>
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
	{ label: "門禁控制", src: "/product/YS-AC-02F.jpg" },
	{ label: "通關柵欄", src: "/product/YS-K3Y501SX.png" },
	{ label: "訪客管理", src: "/product/YS-V50.jpg" }
]);

const selectedImageIndex = ref(0); // 預設顯示第一張
const selectedImage = ref(imageOptions.value[selectedImageIndex.value].src);

// 點擊時變更圖片
const setImage = (index: number) => {
	selectedImageIndex.value = index;
	selectedImage.value = imageOptions.value[index].src;
};
</script>
