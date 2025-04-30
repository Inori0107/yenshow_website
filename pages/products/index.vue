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

		<!-- 3. Product Series Introduction Sections (Scroll-triggered) -->
		<section
			id="video-intercom"
			class="series-section h-screen bg-gradient-to-b from-transparent via-blue-900/80 to-blue-900 text-white flex items-center justify-center"
		>
			<div class="text-center">
				<h2 class="text-4xl font-bold mb-4">可視對講</h2>
				<p class="max-w-2xl mx-auto">創新的可視對講系統，提升居家與社區安全。</p>
				<!-- Add more details or link -->
			</div>
		</section>

		<section
			id="access-control"
			class="series-section h-screen bg-gradient-to-b from-blue-900 via-purple-900/80 to-purple-900 text-white flex items-center justify-center"
		>
			<div class="text-center">
				<h2 class="text-4xl font-bold mb-4">門禁管理</h2>
				<p class="max-w-2xl mx-auto">智慧化門禁解決方案，管理人流與進出權限。</p>
				<!-- Add more details or link -->
			</div>
		</section>

		<section
			id="surveillance-monitoring"
			class="series-section h-screen bg-gradient-to-b from-purple-900 via-teal-900/80 to-teal-900 text-white flex items-center justify-center"
		>
			<div class="text-center">
				<h2 class="text-4xl font-bold mb-4">影像監控</h2>
				<p class="max-w-2xl mx-auto">高清影像監控，守護您的財產與安全。</p>
				<!-- Add more details or link -->
			</div>
		</section>

		<section
			id="security-solutions"
			class="series-section h-screen bg-gradient-to-b from-teal-900 via-indigo-900/80 to-indigo-900 text-white flex items-center justify-center"
		>
			<div class="text-center">
				<h2 class="text-4xl font-bold mb-4">安全防護</h2>
				<p class="max-w-2xl mx-auto">全方位的安全防護系統，應對各種挑戰。</p>
				<!-- Add more details or link -->
			</div>
		</section>

		<section
			id="devices-accessories"
			class="series-section h-screen bg-gradient-to-b from-indigo-900 via-gray-800/80 to-gray-900 text-white flex items-center justify-center"
		>
			<div class="text-center">
				<h2 class="text-4xl font-bold mb-4">其他設備</h2>
				<p class="max-w-2xl mx-auto">多樣化的週邊設備與配件，完善您的系統。</p>
				<!-- Add more details or link -->
			</div>
		</section>

		<!-- Footer or final section -->
		<footer class="h-[20vh] bg-gray-900 text-white flex items-center justify-center">
			<p>&copy; {{ new Date().getFullYear() }} Yenshow Technology. All rights reserved.</p>
		</footer>
	</div>
</template>

<script setup>
import { ref, onMounted, onUnmounted, computed } from "vue";
import * as THREE from "three";
// import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'; // Optional for debugging
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGlobalSearch } from "~/composables/useGlobalSearch";
// import { useHierarchyStore } from '~/stores/hierarchyStore'; // To fetch series data later

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

// --- GSAP Scroll Animations ---
function setupScrollAnimations() {
	// Example: Basic camera movement on scroll
	gsap.to(camera.position, {
		z: 20, // Zoom out further
		y: 5, // Move camera up slightly
		scrollTrigger: {
			trigger: ".product-center-page",
			start: "top top",
			end: "bottom bottom",
			scrub: 1 // Smooth scrubbing effect
			// markers: true, // Uncomment for debugging
		}
	});

	// Example: Animate sections based on scroll (Could involve camera focusing)
	const sections = gsap.utils.toArray(".series-section");
	sections.forEach((section, index) => {
		// Placeholder: Fade in section content
		gsap.from(section.children, {
			// Animate direct children (div)
			opacity: 0,
			y: 50,
			duration: 1,
			stagger: 0.2,
			scrollTrigger: {
				trigger: section,
				start: "top 70%", // Start animation when section is 70% in view
				// end: "bottom top",
				toggleActions: "play none none reverse" // Play on enter, reverse on leave
				// markers: true, // Uncomment for debugging
				// scrub: true // Optional: scrub animation along with scroll
			}
		});

		// --- TODO: Add Three.js camera animations per section ---
		// Example: Move camera to a specific point when a section is active
		// ScrollTrigger.create({
		//   trigger: section,
		//   start: "top center",
		//   end: "bottom center",
		//   onEnter: () => {
		//       gsap.to(camera.position, { x: index * 5, z: 10, duration: 1.5, ease: 'power2.inOut' });
		//       gsap.to(camera.rotation, { y: index * Math.PI / 4, duration: 1.5, ease: 'power2.inOut' }); // Rotate camera too
		//   },
		//   onLeaveBack: () => { // Handle scrolling back up
		//      // Determine previous section's target or default
		//      const prevTargetX = (index > 0) ? (index - 1) * 5 : 0;
		//      const prevTargetZ = (index > 0) ? 10 : 5; // Default Z
		//      const prevTargetRotY = (index > 0) ? (index - 1) * Math.PI / 4 : 0;
		//      gsap.to(camera.position, { x: prevTargetX, z: prevTargetZ, duration: 1.5, ease: 'power2.inOut' });
		//      gsap.to(camera.rotation, { y: prevTargetRotY, duration: 1.5, ease: 'power2.inOut' });
		//   }
		// });
	});
}

// --- Lifecycle Hooks ---
onMounted(async () => {
	initThree();
	setupScrollAnimations();

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

/* Style the sections */
.series-section {
	/* Ensures sections take full viewport height */
	padding: 4rem 1rem; /* Add padding */
	position: relative; /* Needed for absolute positioning inside if required */
	box-sizing: border-box;
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
