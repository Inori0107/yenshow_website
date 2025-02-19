<template>
	<div class="hexagon h-[72px] md:h-[128px] lg:h-[200px]">
		<img :src="imageSrc" :alt="title" class="w-[24px] h-[24px] md:w-[50px] md:h-[50px]" />
		<span class="text-[8px] md:text-[16px] lg:text-[24px]">{{ title }}</span>
	</div>
</template>

<script setup lang="ts">
defineProps({
	imageSrc: {
		type: String,
		default: "/YSCP/board-game.jpg"
	},
	title: {
		type: String,
		default: "數位看板"
	}
});
</script>

<style scoped>
.hexagon {
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
</style>
