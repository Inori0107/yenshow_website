<template>
	<div class="relative">
		<button
			v-if="showLeftArrow"
			@click="scrollLeft"
			class="absolute left-[-5%] top-1/2 -translate-y-1/2 z-10 bg-white/80 hover:bg-white rounded-full p-2 shadow-md transition-opacity duration-300"
			aria-label="Scroll Left"
		>
			<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6 text-gray-700">
				<path stroke-linecap="round" stroke-linejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" />
			</svg>
		</button>

		<div v-if="loading" class="flex justify-center items-center p-8">
			<div class="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
		</div>
		<div v-else-if="!products || products.length === 0" class="text-center py-8 text-gray-500">目前沒有符合條件的產品</div>
		<div
			v-else
			ref="scrollContainerRef"
			class="flex overflow-x-auto whitespace-nowrap space-x-6 px-4 py-4 horizontal-scroll-container"
			@scroll="updateArrowVisibility"
		>
			<div
				v-for="product in products"
				:key="product._id"
				class="bg-white p-4 rounded-lg hover:shadow-lg transition-all duration-300 w-72 flex-shrink-0 cursor-pointer"
				@click="viewProduct(product)"
			>
				<div class="aspect-square rounded-md mb-4 flex items-center justify-center">
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
				<h4 class="text-[16px] md:text-[18px] font-medium text-gray-800 overflow-hidden text-ellipsis">
					{{ product.displayName || product.model || "未命名產品" }}
				</h4>
				<p v-if="product.model" class="text-[14px] text-gray-500 overflow-hidden text-ellipsis">{{ product.model }}</p>
			</div>
		</div>

		<button
			v-if="showRightArrow"
			@click="scrollRight"
			class="absolute right-[-5%] top-1/2 -translate-y-1/2 z-10 bg-white/80 hover:bg-white rounded-full p-2 shadow-md transition-opacity duration-300"
			aria-label="Scroll Right"
		>
			<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6 text-gray-700">
				<path stroke-linecap="round" stroke-linejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
			</svg>
		</button>
	</div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount, nextTick } from "vue";
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

const scrollContainerRef = ref(null);
const showLeftArrow = ref(false);
const showRightArrow = ref(false);

const SCROLL_AMOUNT = 300;

const scrollLeft = () => {
	if (scrollContainerRef.value) {
		scrollContainerRef.value.scrollBy({
			left: -SCROLL_AMOUNT,
			behavior: "smooth"
		});
	}
};

const scrollRight = () => {
	if (scrollContainerRef.value) {
		scrollContainerRef.value.scrollBy({
			left: SCROLL_AMOUNT,
			behavior: "smooth"
		});
	}
};

const updateArrowVisibility = () => {
	if (!scrollContainerRef.value) return;

	const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.value;
	const tolerance = 1;

	showLeftArrow.value = scrollLeft > tolerance;
	showRightArrow.value = scrollLeft < scrollWidth - clientWidth - tolerance;
};

const viewProduct = (product) => {
	emit("view-product", product);
};

onMounted(() => {
	nextTick(() => {
		updateArrowVisibility();
	});
});

onBeforeUnmount(() => {
	if (scrollContainerRef.value) {
		scrollContainerRef.value.removeEventListener("scroll", updateArrowVisibility);
	}
});

watch(
	() => props.products,
	() => {
		nextTick(() => {
			updateArrowVisibility();
		});
	},
	{ deep: true, immediate: true }
);
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

/* Style adjustments for arrow positioning if needed */
/* Ensure the parent div has position: relative */
</style>
