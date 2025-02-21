<template>
	<div class="bg-secondary rounded-[50px] lg:rounded-[100px]">
		<div class="container py-[24px] md:py-[48px] lg:h-[793px] flex flex-col-reverse md:flex-row justify-evenly items-center gap-[24px]">
			<!-- content -->
			<div class="px-[24px] md:px-[36px] lg:px-[64px] flex flex-col items-center gap-[24px] lg:gap-[48px] text-primary">
				<div class="w-full flex gap-[32px] lg:gap-[64px]">
					<span class="bg-[#5E548E] text-secondary h-fit rounded-full text-[12px] md:text-[16px] lg:text-[24px] px-[12px]">04</span>
					<h3 class="text-[21px] md:text-[32px] lg:text-[48px]">安全防護</h3>
				</div>
				<div class="text-[12px] md:text-[16px] lg:text-[24px]">
					人體測溫產品專注於高精度與高效能，採用先進熱成像技術，能快速進行非接觸式體溫篩檢，有效降低交叉感染風險。適用於辦公場所、工廠、醫院、機場等高人流區域，幫助用戶建立完善的體溫監控體系，提升公共健康與安全保障。
				</div>
				<ButtonCTA to="/products/Security-Solutions"></ButtonCTA>
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
	{ label: "人體測溫", src: "/product/YS-TTC-01.png" },
	{ label: "無線警報", src: "/product/YS-PWA-YXPRO.jpg" },
	{ label: "火災預警", src: "/product/YS-TBC-03.png" }
]);

const selectedImageIndex = ref(0); // 預設顯示第一張
const selectedImage = ref(imageOptions.value[selectedImageIndex.value].src);

// 點擊時變更圖片
const setImage = (index: number) => {
	selectedImageIndex.value = index;
	selectedImage.value = imageOptions.value[index].src;
};
</script>
