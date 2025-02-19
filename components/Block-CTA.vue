<template>
	<div
		@mouseenter="$emit('hoverBlock', number)"
		class="bg-primary flex flex-col gap-4 cursor-pointer transition-all duration-300 rounded-lg shadow-lg border border-gray-200"
		:class="{
			'w-full h-[168px] md:w-[270px] md:h-[293px] text-secondary': isHovered,
			'w-[0px] h-[168px] md:w-[270px] md:h-[0px] text-primary ': !isHovered
		}"
	>
		<h4 class="mt-4 mx-4 md:mt-8 md:mx-8 w-[28px] text-[24px] border-b-2 border-current pb-1">0{{ number }}</h4>
		<p class="mx-4 md:mx-8 w-[96px] text-[24px] font-bold">{{ title }}</p>
		<span class="mx-4 md:mx-8 w-[200px] text-[16px] opacity-70">{{ description }}</span>
	</div>
</template>

<script setup lang="ts">
const props = defineProps({
	number: { type: Number, required: true },
	title: { type: String, required: true },
	description: { type: String, required: true },
	activeBlock: { type: Number, required: true }
});

// 判斷當前區塊是否為 active
const isHovered = computed(() => props.number === props.activeBlock);
</script>
