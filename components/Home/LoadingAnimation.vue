<template>
	<div class="loading-animation fixed inset-0 z-50 flex justify-center items-center bg-primary">
		<!-- Three.js 背景 -->
		<canvas ref="threeCanvas" class="absolute inset-0 w-full h-full opacity-100 transition-opacity duration-1000"></canvas>

		<!-- Logo 元素 -->
		<div class="logo-container flex flex-col items-center z-10">
			<img ref="logoRef" src="/public/yenshow.png" alt="遠岫科技 Logo" class="logo w-[150px] md:w-[250px]" />
		</div>
	</div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from "vue";
import gsap from "gsap";
import * as THREE from "three";

const logoRef = ref(null);
const threeCanvas = ref(null);
const emit = defineEmits(["loading-complete"]);

let scene, camera, renderer;
let networkSphere;
let animationId;
let isAnimating = true;

const createNetworkSphere = () => {
	const width = window.innerWidth;
	let particleCount;

	if (width < 640) particleCount = 500;
	else if (width < 768) particleCount = 700;
	else if (width < 1024) particleCount = 1000;
	else particleCount = 1200;

	const particles = new THREE.BufferGeometry();
	const positions = new Float32Array(particleCount * 3);
	const colors = new Float32Array(particleCount * 3);

	const lineMaterial = new THREE.LineBasicMaterial({
		color: 0x00d4ff,
		transparent: true,
		opacity: 0.3
	});

	const radius = 10;
	for (let i = 0; i < particleCount; i++) {
		const theta = Math.random() * Math.PI * 2;
		const phi = Math.acos(2 * Math.random() - 1);

		const x = radius * Math.sin(phi) * Math.cos(theta);
		const y = radius * Math.sin(phi) * Math.sin(theta);
		const z = radius * Math.cos(phi);

		positions[i * 3] = x;
		positions[i * 3 + 1] = y;
		positions[i * 3 + 2] = z;

		colors[i * 3] = 0.2 + Math.random() * 0.8;
		colors[i * 3 + 1] = 0.8 + Math.random() * 0.2;
		colors[i * 3 + 2] = 0.8 + Math.random() * 0.2;
	}

	particles.setAttribute("position", new THREE.BufferAttribute(positions, 3));
	particles.setAttribute("color", new THREE.BufferAttribute(colors, 3));

	const particleSize = width < 640 ? 0.18 : width < 768 ? 0.15 : 0.1;
	const particleMaterial = new THREE.PointsMaterial({
		size: particleSize,
		vertexColors: true,
		transparent: true,
		opacity: 0.8
	});

	networkSphere = new THREE.Points(particles, particleMaterial);
	scene.add(networkSphere);

	const lineGeometry = new THREE.BufferGeometry();
	const linePositions = [];

	const connectionsPerParticle = width < 768 ? 1 : width < 1024 ? 2 : 3;
	for (let i = 0; i < particleCount; i++) {
		const x1 = positions[i * 3];
		const y1 = positions[i * 3 + 1];
		const z1 = positions[i * 3 + 2];

		const connectionsCount = connectionsPerParticle + Math.floor(Math.random() * (width < 768 ? 1 : 2));
		for (let j = 0; j < connectionsCount; j++) {
			const particleIndex = Math.floor(Math.random() * particleCount);
			const x2 = positions[particleIndex * 3];
			const y2 = positions[particleIndex * 3 + 1];
			const z2 = positions[particleIndex * 3 + 2];

			const distance = Math.sqrt((x2 - x1) ** 2 + (y2 - y1) ** 2 + (z2 - z1) ** 2);
			if (distance < 5) {
				linePositions.push(x1, y1, z1, x2, y2, z2);
			}
		}
	}

	lineGeometry.setAttribute("position", new THREE.Float32BufferAttribute(linePositions, 3));
	const lines = new THREE.LineSegments(lineGeometry, lineMaterial);
	scene.add(lines);

	networkSphere.userData.lines = lines;
};

const initThree = () => {
	scene = new THREE.Scene();
	const width = window.innerWidth;
	const height = window.innerHeight;

	camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
	camera.position.z = 25;

	renderer = new THREE.WebGLRenderer({ canvas: threeCanvas.value, alpha: true });
	renderer.setSize(width, height);
	renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

	createNetworkSphere();
	animate();
};

const animate = () => {
	animationId = requestAnimationFrame(animate);

	if (networkSphere) {
		networkSphere.rotation.y += 0.002;
		networkSphere.rotation.x += 0.001;

		if (networkSphere.userData.lines) {
			networkSphere.userData.lines.rotation.y += 0.002;
			networkSphere.userData.lines.rotation.x += 0.001;
		}

		if (isAnimating) {
			const time = Date.now() * 0.001;
			const positions = networkSphere.geometry.attributes.position.array;
			const radius = 10;

			for (let i = 0; i < positions.length; i += 3) {
				const i3 = i / 3;
				const theta = Math.random() * Math.PI * 2;
				const phi = Math.acos(2 * Math.random() - 1);
				const offset = Math.sin(time + i3) * 0.2;

				positions[i] = (radius + offset) * Math.sin(phi) * Math.cos(theta);
				positions[i + 1] = (radius + offset) * Math.sin(phi) * Math.sin(theta);
				positions[i + 2] = (radius + offset) * Math.cos(phi);
			}

			networkSphere.geometry.attributes.position.needsUpdate = true;
		}
	}

	renderer.render(scene, camera);
};

const handleResize = () => {
	if (camera && renderer) {
		const width = window.innerWidth;
		const height = window.innerHeight;

		camera.aspect = width / height;
		camera.updateProjectionMatrix();
		renderer.setSize(width, height);
	}
};

onMounted(() => {
	initThree();

	const tl = gsap.timeline({
		onComplete: () => {
			isAnimating = false;
			emit("loading-complete");
		}
	});

	tl.fromTo(
		logoRef.value,
		{
			scale: 0.75,
			opacity: 0,
			filter: "blur(6px) grayscale(100%)"
		},
		{
			scale: 1,
			opacity: 1,
			filter: "blur(0px) grayscale(0%) drop-shadow(0 0 15px #00d4ff)",
			duration: 1.5,
			ease: "power4.out"
		}
	)
		.to(
			camera.position,
			{
				z: 5,
				duration: 2,
				ease: "power2.inOut"
			},
			"+=0.5"
		)
		.to(
			logoRef.value,
			{
				scale: 5,
				opacity: 0.4,
				duration: 2,
				ease: "power2.inOut"
			},
			"-=2"
		)
		.to(
			threeCanvas.value,
			{
				opacity: 0,
				duration: 1
			},
			"-=0.5"
		)
		.to(
			".loading-animation",
			{
				opacity: 0,
				duration: 0.8,
				onComplete: () => {
					document.querySelector(".loading-animation").style.display = "none";
				}
			},
			"-=0.8"
		)
		.to(
			"#hero-section",
			{
				opacity: 1,
				duration: 1
			},
			"-=0.5"
		)
		.to(logoRef.value, {
			opacity: 1,
			scale: 5.2,
			duration: 0.2,
			yoyo: true,
			repeat: 1,
			ease: "power1.inOut"
		});

	window.addEventListener("resize", handleResize);
});

onUnmounted(() => {
	cancelAnimationFrame(animationId);
	window.removeEventListener("resize", handleResize);
	if (scene) scene.clear();
	if (renderer) renderer.dispose();
});
</script>

<style scoped>
.loading-animation {
	backdrop-filter: blur(0px);
	transition: opacity 0.8s ease;
	background-color: var(--color-primary);
}

.logo {
	transition: transform 0.8s ease, filter 0.8s ease;
	will-change: transform, opacity, filter;
	filter: drop-shadow(0 0 10px rgba(255, 255, 255, 0.5));
}
</style>
