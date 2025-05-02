<template>
	<div>
		<div v-if="loading" class="flex justify-center items-center p-8">
			<div class="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
		</div>
		<div v-else-if="!products || products.length === 0" class="text-center py-8 text-gray-500">目前沒有符合條件的產品</div>
		<div v-else class="flex overflow-x-auto whitespace-nowrap space-x-6 px-4 py-4 horizontal-scroll-container">
			<div
				v-for="product in products"
				:key="product._id"
				class="bg-white p-4 rounded-lg hover:shadow-lg transition-all duration-300 w-72 flex-shrink-0"
				@click="viewProduct(product)"
			>
				<div class="aspect-square rounded-md mb-4 cursor-pointer flex items-center justify-center">
					<NuxtImg
						v-if="product.images && product.images.length > 0"
						:src="product.images[0]"
						:alt="product.displayName || product.model || '產品圖片'"
						class="h-[80%] object-contain"
						loading="lazy"
						format="webp"
						sizes="288px"
					/>
					<div v-else class="w-full h-full flex items-center justify-center text-gray-400">尚無圖片</div>
				</div>
				<h4 class="text-[16px] md:text-[18px] font-medium text-gray-800 whitespace-normal">{{ product.displayName || product.model || "未命名產品" }}</h4>
				<p v-if="product.model" class="text-[14px] text-gray-500 whitespace-normal">{{ product.model }}</p>
			</div>
		</div>
	</div>
</template>

<script setup>
import { useRouter } from "vue-router";

const props = defineProps({
	products: {
		type: Array,
		default: () => []
	},
	loading: {
		type: Boolean,
		default: false
	}
});

const emit = defineEmits(["view-product"]);
const router = useRouter();

const viewProduct = (product) => {
	emit("view-product", product);
	// Example navigation (can be uncommented if needed)
	// router.push(`/products/${product._id}`);
};
</script>

<style scoped>
/* Target the container to hide scrollbar */
.horizontal-scroll-container {
	scrollbar-width: none; /* For Firefox */
	-ms-overflow-style: none; /* For Internet Explorer and Edge */
}

/* For Webkit browsers (Chrome, Safari) */
.horizontal-scroll-container::-webkit-scrollbar {
	display: none;
}

.scrollbar-thin {
	scrollbar-width: thin; /* For Firefox */
}

/* For Webkit browsers (Chrome, Safari) */
.scrollbar-thumb-gray-300::-webkit-scrollbar-thumb {
	background-color: #d1d5db; /* gray-300 */
	border-radius: 6px;
}
.scrollbar-track-gray-100::-webkit-scrollbar-track {
	background-color: #f3f4f6; /* gray-100 */
	border-radius: 6px;
}
::-webkit-scrollbar {
	height: 8px; /* Height of the horizontal scrollbar */
}
</style>
