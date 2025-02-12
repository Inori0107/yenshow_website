<template>
	<button>
		<span>{{ label }}</span>
		<svg xmlns="http://www.w3.org/2000/svg" height="36" width="36" viewBox="0 0 512 512">
			<path
				fill="currentColor"
				d="M0 256a256 256 0 1 0 512 0A256 256 0 1 0 0 256zM241 377c-9.4 9.4-24.6 9.4-33.9 0s-9.4-24.6 0-33.9l87-87-87-87c-9.4-9.4-9.4-24.6 0-33.9s24.6-9.4 33.9 0L345 239c9.4 9.4 9.4 24.6 0 33.9L241 377z"
			/>
		</svg>
	</button>
</template>

<script setup lang="ts">
defineProps({
	label: {
		type: String,
		default: "View More"
	}
});
</script>

<style scoped>
button {
	display: flex;
	align-items: center;
	justify-content: center;
	padding: 12px 24px;
	gap: 12px;

	width: 217px;
	min-width: 92px;
	height: 60px;

	box-shadow: inset 0 0 0 3px #212a37;
	border-radius: 25px;
	cursor: pointer;
	background: transparent;
	position: relative;
	overflow: hidden;
	transition: color 0.3s ease-in-out, background-color 0.3s ease-in-out;
}

button::before {
	content: "";
	position: absolute;
	top: 0;
	left: 0;
	width: 0;
	height: 100%;
	background-color: #212a37;
	transition: width 0.3s ease-in-out;
}

button:hover::before {
	width: 100%;
}

button span,
button svg {
	font-size: 24px;
	color: #212a37;
	transition: color 0.3s ease-in-out;
	z-index: 1;
}

button:hover span,
button:hover svg {
	color: #fff; /* 文字與 SVG 圖示變色 */
}
</style>
