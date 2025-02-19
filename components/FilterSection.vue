<template>
	<!-- Filter Buttons -->
	<div class="flex justify-between items-center">
		<!-- Class Name -->
		<h4 class="text-[16px] md:text-[24px] lg:text-[36px]">{{ name }}</h4>
		<!-- Button -->
		<div class="flex bg-[#F1F5F9] p-[2px] rounded-[10px] z-50">
			<button
				v-for="(option, idx) in options"
				:key="idx"
				@click="setFilter(option)"
				:class="[
					'text-[12px] md:text-[16px] px-[8px] md:px-[14px] lg:px-[18px] py-[6px] md:py-[12px] lg:py-[16px] rounded-[10px]',
					selectedOption === option ? 'bg-white shadow-md' : 'bg-[#F1F5F9]'
				]"
			>
				{{ option }}
			</button>
		</div>
	</div>
	<!-- List -->
	<div class="scroll-container">
		<div class="scroll-content">
			<div class="scroll-item"></div>
			<div class="scroll-item"></div>
			<div class="scroll-item"></div>
			<div class="scroll-item"></div>
			<div class="scroll-item"></div>
			<div class="scroll-item"></div>
			<div class="scroll-item"></div>
		</div>
	</div>
</template>

<script setup>
// 定義 `props`
defineProps({
	name: String, // 篩選類別名稱
	options: Array // 篩選選項
});

// 定義 `emit`
const emit = defineEmits(["update:modelValue"]);

// 當前選擇的篩選條件
const selectedOption = ref("ALL");

// 當按鈕被點擊時，更新 `selectedOption` 並通知父元件
const setFilter = (option) => {
	selectedOption.value = option;
	emit("update:modelValue", option);
};
</script>

<style scoped>
.scroll-container {
	width: 100%;
	max-width: 90vw;
	overflow-x: auto;
	scroll-behavior: smooth;
	-webkit-overflow-scrolling: touch;
	scroll-snap-type: x mandatory;
}

/* 隱藏滾動軸 */
.scroll-container::-webkit-scrollbar {
	display: none;
}

.scroll-content {
	display: flex;
	gap: 24px;
	white-space: nowrap;
}

.scroll-item {
	width: 282px;
	aspect-ratio: 1;
	background: #f4f5f7;
	border-radius: 8px;
	flex-shrink: 0;
	scroll-snap-align: start; /* 讓滾動對齊每個卡片 */
}

@media (max-width: 768px) {
	.scroll-content {
		display: grid;
		grid-template-columns: repeat(4, 1fr);
		grid-template-rows: repeat(2, 1fr);
	}
	.scroll-item {
		width: 180px;
	}
}
</style>
