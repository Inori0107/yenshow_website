<template>
	<div class="parallax-bg">
		<!-- Header -->
		<AppHeader />

		<!-- Main -->
		<main>
			<slot />
		</main>

		<!-- Footer -->
		<AppFooter />
	</div>
</template>

<script setup lang="ts">
import AppHeader from "../components/layout/AppHeader.vue";
import AppFooter from "../components/layout/AppFooter.vue";
</script>

<style scoped>
.parallax-bg {
	background: url("/heroPic.jpg") no-repeat fixed center center/cover;
}
</style>
