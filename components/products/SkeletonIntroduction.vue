<template>
	<div class="flex flex-col md:flex-row justify-center gap-4 animate-pulse">
		<div v-for="n in 4" :key="n" class="bg-gray-50 border rounded-lg shadow-md p-4 w-[250px]">
			<div class="h-6 bg-gray-200 rounded mb-3"></div>
			<div class="h-4 bg-gray-200 rounded mb-1"></div>
			<div class="h-4 bg-gray-200 rounded w-5/6"></div>
		</div>
	</div>
</template>
