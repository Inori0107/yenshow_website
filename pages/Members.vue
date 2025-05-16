<template>
	<div class="member-page">
		<h1>成員介紹</h1>
		<div class="member-list">
			<!-- 成員卡片將放在這裡 -->
		</div>
	</div>
</template>

<script setup>
// 在這裡可以定義成員數據和邏輯
</script>

<style scoped>
.member-page {
	max-width: 800px;
	margin: 0 auto;
	padding: 20px;
	text-align: center;
}

.member-list {
	display: grid;
	grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
	gap: 20px;
	margin-top: 30px;
}
</style>
