<template>
	<div class="product-center-page overflow-x-hidden">
		<!-- 1. Three.js Smart City Canvas -->
		<div ref="threeContainer" class="fixed top-0 left-0 w-full h-screen -z-10"></div>

		<!-- Initial Viewport Section -->
		<section class="h-screen flex flex-col items-center justify-center relative">
			<!-- Optional: Title or Welcome Message -->
			<h1 class="text-4xl md:text-6xl font-bold text-white mb-8 z-10 bg-black/30 px-4 py-2 rounded">探索智慧城市解決方案</h1>

			<!-- 2. Global Search Bar -->
			<div class="w-full max-w-xl px-4 z-10">
				<div class="relative">
					<input
						type="text"
						placeholder="搜尋產品、系列或應用..."
						class="w-full p-4 pr-12 text-lg border border-gray-300 rounded-full shadow-lg focus:outline-none focus:ring-2 focus:ring-primary"
						:value="keyword"
						@input="debouncedSearch($event.target.value)"
						@keyup.enter="performSearch()"
					/>
					<button @click="performSearch()" class="absolute top-0 right-0 h-full px-4 text-gray-500 hover:text-primary">
						<svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
							<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
						</svg>
					</button>
				</div>
				<!-- Search Results Placeholder (Could be a dropdown or modal) -->
				<div v-if="isVisible && hasResults" class="mt-2 bg-white rounded shadow-lg p-4 max-h-60 overflow-y-auto">
					<ul>
						<li
							v-for="product in currentTabResults"
							:key="product._id"
							@click="navigateToResult(activeTab, product)"
							class="cursor-pointer p-2 hover:bg-gray-100"
						>
							{{ getEntityName(product) }} <span class="text-xs text-gray-500">({{ entityTypeNames[activeTab] }})</span>
						</li>
					</ul>
					<div v-if="!hasResults && keyword.trim() !== '' && !isLoading" class="text-center text-gray-500 p-2">找不到結果</div>
				</div>
			</div>
		</section>

		<!-- 3. Product Introduction Section -->
		<section id="products" class="my-[128px] md:my-[256px] flex flex-col gap-[48px] lg:gap-[96px] relative z-10 container mx-auto px-4">
			<h1 class="text-[24px] md:text-[48px] lg:text-[64px] text-white text-center">產品中心</h1>

			<!-- Product Display Area -->
			<div class="flex flex-col gap-16 md:gap-24">
				<div v-for="(product, index) in productCategories" :key="index" class="product-item bg-secondary rounded-[50px] lg:rounded-[100px]">
					<div
						class="py-[24px] px-4 md:px-8 md:py-[48px] lg:min-h-[600px] flex flex-col md:flex-row justify-evenly items-center gap-[24px]"
						:class="{ 'md:flex-row-reverse': index % 2 !== 0 }"
						Alternate
						layout
						--
					>
						>
						<!-- content -->
						<div class="flex flex-col items-center gap-[24px] lg:gap-[48px] text-primary max-w-lg">
							<div class="w-full flex gap-[32px] lg:gap-[64px] items-center">
								<span :class="['h-fit rounded-full text-[12px] md:text-[16px] lg:text-[24px] px-[12px] py-1 text-black', product.colorClass]">
									{{ product.number }}
								</span>
								<h3 class="text-[21px] md:text-[32px] lg:text-[48px] font-semibold">{{ product.title }}</h3>
							</div>
							<div class="text-[12px] md:text-[16px] lg:text-[20px] text-left w-full">
								{{ product.description }}
							</div>
							<ButtonCTA :to="product.link"></ButtonCTA>
						</div>
						<!-- image -->
						<div class="h-fit flex flex-col items-center gap-[16px] p-[16px] lg:p-[32px] bg-white rounded-[50px]">
							<!-- Image Selection Buttons -->
							<div class="flex flex-wrap justify-center gap-x-[16px] gap-y-2 lg:gap-x-[32px]">
								<span
									v-for="(item, i) in product.imageOptions"
									:key="i"
									@click="selectedImageIndices[index] = i"
									class="text-[14px] lg:text-[20px] cursor-pointer transition duration-300 text-gray-700 hover:text-primary"
									:class="{ 'text-primary font-bold border-b-2 border-primary': selectedImageIndices[index] === i }"
								>
									{{ item.label }}
								</span>
							</div>
							<!-- Image Display -->
							<div class="w-[300px] h-[225px] lg:w-[400px] lg:h-[300px] flex justify-center items-center overflow-hidden rounded-[25px] bg-gray-100">
								<img
									class="max-h-full w-auto object-contain"
									:src="getSelectedImage(product, index)"
									:alt="product.imageOptions[selectedImageIndices[index]].label"
								/>
							</div>
						</div>
					</div>
				</div>
			</div>
		</section>

		<!-- Footer or final section -->
		<footer class="h-[20vh] bg-gray-900 text-white flex items-center justify-center">
			<p>&copy; {{ new Date().getFullYear() }} Yenshow Technology. All rights reserved.</p>
		</footer>
	</div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted, computed } from "vue";
import * as THREE from "three";
// import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'; // Optional for debugging
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGlobalSearch } from "~/composables/useGlobalSearch";
// import { useHierarchyStore } from '~/stores/hierarchyStore'; // To fetch series data later
import ButtonCTA from "~/components/common/Button-CTA.vue"; // Import ButtonCTA

gsap.registerPlugin(ScrollTrigger);

const threeContainer = ref(null);
let renderer, scene, camera, animationFrameId;
// const controls = ref(null); // Optional for debugging

// Global Search
const {
	keyword,
	isVisible,
	isLoading,
	results,
	resultCounts,
	hasResults,
	currentTabResults,
	recentSearches,
	activeTab,
	entityTypeNames,
	toggleSearch,
	closeSearch,
	setActiveTab,
	search: performSearch,
	debouncedSearch,
	navigateToResult,
	clearSearch,
	getEntityName,
	clearRecentSearches
} = useGlobalSearch();

// Hierarchy Store (Placeholder for fetching actual series data)
// const hierarchyStore = useHierarchyStore();
// const productSeries = ref([]);

// --- Product Categories Data ---
interface ImageOption {
	label: string;
	src: string;
}

interface Product {
	number: string;
	title: string;
	description: string;
	colorClass: string;
	link: string;
	imageOptions: ImageOption[];
}

const productCategories = ref<Product[]>([
	{
		number: "01",
		title: "可視對講",
		description:
			"結合先進的視訊通訊與門禁控制技術，提供高品質的影像與音訊傳輸，確保訪客識別的準確性與安全性。產品設計人性化，操作簡便，適用於住宅、辦公室、工廠等多種場景，滿足不同用戶的需求。透過APP，每個室內機最多可綁定5個家人使用，實現遠端監控與管理，提升生活便利性與安全性。",
		colorClass: "bg-[#4DB6AC]",
		link: "/products/Video-Intercom",
		imageOptions: [
			{ label: "管理中心主機", src: "/product/YS-9503.png" },
			{ label: "門口機", src: "/product/YS-FTC-06.png" },
			{ label: "室內機", src: "/product/YS-9510-WTE1.jpg" }
		]
	},
	{
		number: "02",
		title: "門禁管理",
		description:
			"門禁控制產品系列，融合刷卡、指紋識別與人臉識別等多種先進技術，提供高效且安全的出入管理解決方案。產品設計靈活，適用於企業大樓、政府機構、機場、學校等多種場景，滿足不同用戶的需求。透過多樣化的識別方式，提升通行效率，確保場所安全。",
		colorClass: "bg-[#FFC857]",
		link: "/products/Access-Control",
		imageOptions: [
			{ label: "門禁控制", src: "/product/YS-AC-02F.jpg" },
			{ label: "通關柵欄", src: "/product/YS-K3Y501SX.png" },
			{ label: "訪客管理", src: "/product/YS-V50.jpg" }
		]
	},
	{
		number: "03",
		title: "影像監控",
		description:
			"結合先進的視訊通訊與門禁控制技術，提供高品質的影像與音訊傳輸，確保訪客識別的準確性與安全性。產品設計人性化，操作簡便，適用於住宅、辦公室、工廠等多種場景，滿足不同用戶的需求。透過APP，每個室內機最多可綁定5個家人使用，實現遠端監控與管理，提升生活便利性與安全性。",
		colorClass: "bg-[#66CCCC]", // Changed color for uniqueness
		link: "/products/Surveillance-Monitoring",
		imageOptions: [
			{ label: "IPC", src: "/product/iYS-2CD7A46G2_P.png" },
			{ label: "NVR", src: "/product/iYS-BA04.jpg" }
		]
	},
	{
		number: "04",
		title: "安全防護",
		description:
			"人體測溫產品專注於高精度與高效能，採用先進熱成像技術，能快速進行非接觸式體溫篩檢，有效降低交叉感染風險。適用於辦公場所、工廠、醫院、機場等高人流區域，幫助用戶建立完善的體溫監控體系，提升公共健康與安全保障。",
		colorClass: "bg-[#5E548E]",
		link: "/products/Security-Solutions",
		imageOptions: [
			{ label: "人體測溫", src: "/product/YS-TTC-01.png" },
			{ label: "無線警報", src: "/product/YS-PWA-YXPRO.jpg" },
			{ label: "火災預警", src: "/product/YS-TBC-03.png" }
		]
	}
]);

// Index for selected image in each product card
const selectedImageIndices = ref(productCategories.value.map(() => 0));

// Get the source of the currently selected image for a product
const getSelectedImage = (product: Product, productIndex: number) => {
	return product.imageOptions[selectedImageIndices.value[productIndex]]?.src || ""; // Added fallback
};

// --- Three.js Setup ---
function initThree() {
	if (!threeContainer.value) return;

	const width = window.innerWidth;
	const height = window.innerHeight;

	// Scene
	scene = new THREE.Scene();
	scene.background = new THREE.Color(0x111111); // Dark background
	scene.fog = new THREE.Fog(0x111111, 10, 50); // Add fog for depth

	// Camera
	camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
	camera.position.z = 5; // Start camera position

	// Renderer
	renderer = new THREE.WebGLRenderer({ antialias: true });
	renderer.setSize(width, height);
	renderer.setPixelRatio(window.devicePixelRatio);
	threeContainer.value.appendChild(renderer.domElement);

	// Lights
	const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
	scene.add(ambientLight);
	const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
	directionalLight.position.set(5, 10, 7.5);
	scene.add(directionalLight);

	// Example Content: Simple Cityscape Placeholder
	createCityPlaceholder();

	// Optional: OrbitControls for debugging
	// controls.value = new OrbitControls(camera, renderer.domElement);
	// controls.value.enableDamping = true;

	// Start Animation Loop
	animate();

	// Handle Window Resize
	window.addEventListener("resize", onWindowResize);
}

function createCityPlaceholder() {
	const geometry = new THREE.BoxGeometry(1, 1, 1);
	const material = new THREE.MeshStandardMaterial({ color: 0x0077ff });

	for (let i = 0; i < 100; i++) {
		const mesh = new THREE.Mesh(geometry, material);
		mesh.position.x = (Math.random() - 0.5) * 40;
		mesh.position.z = (Math.random() - 0.5) * 40;
		mesh.position.y = Math.random() * 5; // Vary height
		mesh.scale.set(
			Math.random() * 0.5 + 0.5, // Random width
			Math.random() * 5 + 1, // Random height
			Math.random() * 0.5 + 0.5 // Random depth
		);
		mesh.rotation.y = Math.random() * Math.PI;
		scene.add(mesh);
	}
}

function animate() {
	animationFrameId = requestAnimationFrame(animate);
	// Add any continuous animations here (e.g., rotating objects)

	// controls.value?.update(); // Update controls if using
	renderer.render(scene, camera);
}

function onWindowResize() {
	if (camera && renderer) {
		camera.aspect = window.innerWidth / window.innerHeight;
		camera.updateProjectionMatrix();
		renderer.setSize(window.innerWidth, window.innerHeight);
	}
}

// --- Lifecycle Hooks ---
onMounted(async () => {
	initThree();
	// setupScrollAnimations(); // Removed call

	// --- TODO: Fetch actual product series data ---
	// try {
	//   // Example: Fetch all series or specific ones needed for this page
	//   // const allSeries = await hierarchyStore.fetchHierarchy('series');
	//   // productSeries.value = allSeries; // Or filter as needed
	// } catch (error) {
	//   console.error("Error fetching product series:", error);
	// }
});

onUnmounted(() => {
	window.removeEventListener("resize", onWindowResize);
	if (animationFrameId) {
		cancelAnimationFrame(animationFrameId);
	}
	// Dispose Three.js resources
	if (renderer) {
		renderer.dispose();
	}
	if (scene) {
		// Dispose geometries, materials, textures in the scene if necessary
		scene.traverse((object) => {
			if (object.geometry) object.geometry.dispose();
			if (object.material) {
				if (Array.isArray(object.material)) {
					object.material.forEach((material) => material.dispose());
				} else {
					object.material.dispose();
				}
			}
		});
	}
	ScrollTrigger.killAll(); // Clean up ScrollTriggers
});
</script>

<style scoped>
.product-center-page {
	color: #333; /* Default text color for sections */
}

/* Style the product introduction section */
#products {
	background-color: rgba(0, 0, 0, 0.1); /* Slightly dim background to make content pop */
	padding-top: 6rem;
	padding-bottom: 6rem;
}

.product-item {
	/* Add transition for potential future animations */
	transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.product-item:hover {
	transform: translateY(-5px);
	box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
}

.text-secondary {
	/* Assuming secondary color is white or light for contrast on dark bg */
	color: #ffffff;
}

.text-primary {
	/* Define your primary text color */
	color: #333; /* Example: Dark gray */
}

.bg-secondary {
	/* Define your secondary background color - adjust as needed */
	background-color: #f8f9fa; /* Example: Light gray */
}

/* Clear default link styles within product cards if needed */
.product-link {
	text-decoration: none;
	color: inherit;
}

/* Add styles for search results dropdown */
.search-results {
	position: absolute;
	top: 100%;
	left: 0;
	right: 0;
	z-index: 100;
}

/* Ensure Three.js canvas is behind everything */
.fixed.-z-10 {
	z-index: -10;
}
</style>
