<template>
	<div>
		<div v-if="loading" class="flex justify-center items-center p-8">
			<div class="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
		</div>
		<div v-else-if="!products || products.length === 0" class="text-center py-8">
			<p class="text-gray-500 text-[16px] md:text-[21px]">沒有符合條件的產品</p>
		</div>
		<div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
			<div
				v-for="product in products"
				:key="product._id"
				class="bg-[#F3F5F7] rounded-lg overflow-hidden transition-transform duration-300 hover:shadow-lg hover:-translate-y-1 cursor-pointer"
				@click="viewProduct(product)"
			>
				<div class="aspect-square p-4 flex items-center justify-center">
					<img :src="product.imageUrl || '/product/placeholder.png'" :alt="getProductName(product)" class="max-h-full max-w-full object-contain" />
				</div>
				<div class="p-4 bg-white">
					<h3 class="text-[16px] md:text-[18px] font-medium truncate">{{ getProductName(product) }}</h3>
					<p class="text-gray-500 text-[14px] mt-1 truncate">{{ getProductDescription(product) }}</p>
				</div>
			</div>
		</div>
		<div v-if="showMore && products && products.length > 0 && products.length < totalProducts" class="text-center mt-8">
			<button @click="loadMore" class="bg-primary text-white px-6 py-2 rounded-md hover:bg-primary-dark transition-colors duration-300">載入更多</button>
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
	},
	showMore: {
		type: Boolean,
		default: false
	},
	totalProducts: {
		type: Number,
		default: 0
	}
});

const emit = defineEmits(["load-more", "view-product"]);
const router = useRouter();

// 獲取產品名稱 (處理本地化)
const getProductName = (product) => {
	return product.name?.zh || product.name || product.model || "未命名產品";
};

// 獲取產品描述 (處理本地化)
const getProductDescription = (product) => {
	return product.description?.zh || product.description || product.model || "";
};

// 查看產品詳情
const viewProduct = (product) => {
	emit("view-product", product);
	// 可以導航到產品詳情頁
	// router.push(`/products/${product._id}`);
};

// 加載更多產品
const loadMore = () => {
	emit("load-more");
};
</script>
