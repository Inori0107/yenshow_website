<template>
	<span class="text-[24px] leading-[32px] opacity-50 cursor-pointer hover:opacity-100">{{ label }}</span>
</template>

<script setup lang="ts">
defineProps({
	label: {
		type: String,
		default: "品牌故事"
	}
});
</script>
