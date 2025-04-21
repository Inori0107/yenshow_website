<template>
	<section id="intro-section" ref="introSection" class="bg-secondary my-[128px] md:my-[512px] opacity-0">
		<!-- 服務特點區 -->
		<article class="relative min-h-screen flex flex-col justify-center items-center feature-section">
			<canvas ref="threeCanvas" class="absolute top-0 w-screen h-full z-0"></canvas>
			<!-- 頂部功能列 -->
			<div ref="hexagonRow1" class="flex gap-[12px] md:gap-[16px] lg:gap-[24px] hexagon-row-1 z-10 opacity-0">
				<Hexagon imageSrc="/YSCP/board-game.png" title="數位看板" />
				<Hexagon imageSrc="/YSCP/intelligent-analytics.png" title="智能分析" />
				<Hexagon imageSrc="/YSCP/vehicle.png" title="車輛" />
				<Hexagon imageSrc="/YSCP/visitor.png" title="訪客" />
			</div>

			<!-- 中間功能列 -->
			<div ref="hexagonRow2" class="flex gap-[12px] md:gap-[16px] lg:gap-[24px] items-center hexagon-row-2 z-10 opacity-0">
				<Hexagon imageSrc="/YSCP/image.png" title="影像" />
				<div class="hexagon-title h-[96px] md:h-[169px] lg:h-[225px] text-[12px] md:text-[24px]">數據與監控</div>
				<div class="brand-icon w-full flex flex-col gap-[4px] items-center">
					<span class="text-[12px] md:text-[24px] lg:text-[36px]">遠岫科技</span>
				</div>
				<div class="hexagon-title h-[96px] md:h-[169px] lg:h-[225px] text-[12px] md:text-[24px]">安全與管理</div>
				<Hexagon imageSrc="/YSCP/guarded-entrance.png" title="門禁" />
			</div>

			<!-- 底部功能列 -->
			<div ref="hexagonRow3" class="flex gap-[12px] md:gap-[16px] lg:gap-[24px] hexagon-row-3 z-10 opacity-0">
				<Hexagon imageSrc="/YSCP/route.png" title="路線管理" />
				<Hexagon imageSrc="/YSCP/attendance.png" title="考勤管理" />
				<Hexagon imageSrc="/YSCP/alarm.png" title="警報" />
				<Hexagon imageSrc="/YSCP/maintain.png" title="維護" />
			</div>
		</article>

		<!-- YSCP 產品介紹 -->
		<article
			id="yscp-article"
			ref="yscpSection"
			class="relative container min-h-screen flex flex-col lg:flex-row justify-center items-center gap-[48px] yscp-section opacity-0"
		>
			<!-- 左側內容說明 -->
			<div ref="yscpText" class="flex flex-col gap-[24px] lg:gap-[48px] z-10 yscp-text">
				<div class="relative">
					<h3 class="text-[24px] md:text-[36px] lg:text-[48px] section-title product-title">YSCentral Professional</h3>
					<div class="title-decoration absolute bottom-[-5px] left-[-5px] w-[70%] h-[3px] bg-gradient-to-r from-primary to-transparent"></div>
				</div>

				<div class="feature-tag-container">
					<span class="feature-tag">整合性</span>
					<span class="feature-tag">安全性</span>
					<span class="feature-tag">高效能</span>
					<span class="feature-tag">易用性</span>
				</div>

				<h5 class="text-[12px] md:text-[18px] lg:text-[24px] opacity-80">
					一款整合式安全性軟體，<br />
					旨在透過一個「直覺」的平台來應對多種安全挑戰。
				</h5>

				<div class="relative benefit-section">
					<div class="benefit-decorative-line"></div>
					<h4 class="text-[16px] md:text-[24px] lg:text-[36px]">
						在保護人員和財產安全的同時，<br />
						讓日常營運更有效率，<br />
						幫助使用者做出更明智的決策。
					</h4>
				</div>
			</div>

			<!-- 右側功能圓圈 -->
			<div ref="featureCircles" class="grid grid-cols-2 relative feature-circles">
				<!-- 背景幾何裝飾 -->
				<div class="decorative-lines"></div>

				<!-- 功能特點 1 -->
				<div
					ref="circleOne"
					class="w-[200px] h-[200px] md:w-[300px] md:h-[300px] ml-[-25px] md:ml-0 YSCP-circle shadow-lg col-span-2 col-start-2 feature-circle"
				>
					<h4 class="text-[24px] md:text-[36px] opacity-80">01</h4>
					<h4 class="text-[16px] md:text-[24px]">中央管理平台</h4>
				</div>

				<!-- 功能特點 2 -->
				<div
					ref="circleTwo"
					class="w-[200px] h-[200px] md:w-[300px] md:h-[300px] mt-[-100px] ml-[5px] md:mt-[-150px] md:ml-[75px] YSCP-circle shadow-lg col-span-2 col-start-1 feature-circle"
				>
					<h4 class="text-[24px] md:text-[36px] opacity-80">02</h4>
					<h4 class="text-[16px] md:text-[24px]">軟體與硬體整合</h4>
				</div>

				<!-- 功能特點 3 -->
				<div
					ref="circleThree"
					class="w-[200px] h-[200px] md:w-[300px] md:h-[300px] mt-[-125px] ml-[-25px] md:mt-[-175px] md:ml-[-25px] YSCP-circle shadow-lg col-span-2 col-start-2 feature-circle"
				>
					<h4 class="text-[24px] md:text-[36px] opacity-80">03</h4>
					<h4 class="text-[16px] md:text-[24px]">完整的解決方案</h4>
				</div>
			</div>
		</article>
	</section>
</template>

<script setup>
import { ref, onMounted, onUnmounted, nextTick, inject } from "vue";
import Hexagon from "~/components/Hexagon.vue";
import * as THREE from "three";
import gsap from "gsap";

// DOM 引用
const introSection = ref(null);
const threeCanvas = ref(null);
const hexagonRow1 = ref(null);
const hexagonRow2 = ref(null);
const hexagonRow3 = ref(null);
const yscpSection = ref(null);
const yscpText = ref(null);
const featureCircles = ref(null);
const circleOne = ref(null);
const circleTwo = ref(null);
const circleThree = ref(null);

// Three.js 變數
let scene, camera, renderer;
let hexGrid;
let animationId;
let hexagons = [];
let hexMaterial = null;
let sharedGeometry = null;

// 注入滾動動畫控制器
const scrollAnimation = inject("scrollAnimation");

// 用於存儲創建的波紋元素引用
let waveElements = [];

// 初始化 Three.js
const initThree = () => {
	scene = new THREE.Scene();
	const width = threeCanvas.value.clientWidth;
	const height = threeCanvas.value.clientHeight;

	camera = new THREE.PerspectiveCamera(60, width / height, 0.1, 1000);
	camera.position.set(0, 6, 10); // 提高Y軸位置，更俯視
	camera.rotation.x = -0.5; // 增加向下傾斜角度

	renderer = new THREE.WebGLRenderer({ canvas: threeCanvas.value, alpha: true });
	renderer.setSize(width, height);
	renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

	createHexagonGrid();
	animate();

	// 初始設置所有六角形為隱藏狀態
	resetHexagons();

	window.addEventListener("resize", onWindowResize);
};

// 重置六角形網格，用於反覆觸發動畫
const resetHexagons = () => {
	hexagons.forEach((hex) => {
		hex.mesh.scale.set(0, 0, 0);
	});
};

// 動畫循環 - 波浪效果
const animate = () => {
	animationId = requestAnimationFrame(animate);

	// 創建向外擴散的波浪效果
	if (hexagons.length > 0) {
		const time = Date.now() * 0.001; // 秒為單位

		// 為每個六角形應用獨立的波浪動畫
		hexagons.forEach((hexInfo) => {
			// 獲取當前六角形
			const hex = hexInfo.mesh;
			const distance = hexInfo.distance;

			// 創建基於距離的波浪效果參數
			const waveSpeed = 0.8; // 波浪速度
			const waveLength = 8; // 波浪長度
			const waveHeight = 0.2; // 波浪高度

			// 計算波動值 - 使波浪從中心向外擴散
			const wave = Math.sin(time * waveSpeed - distance / waveLength) * waveHeight;

			// 應用波浪效果到Y坐標
			hex.position.y = wave;

			// 添加輕微的旋轉
			const rotationAmount = Math.sin(time * 0.5 + distance * 0.1) * 0.05;
			hex.rotation.z = rotationAmount;

			// 輕微的呼吸效果 - 通過距離調整相位
			const breathingScale = 1 + Math.sin(time * 0.7 + distance * 0.2) * 0.05;

			// 應用到已經顯示的六角形的縮放
			if (hex.scale.x > 0.1) {
				hex.scale.set(breathingScale, breathingScale, breathingScale);
			}
		});
	}

	renderer.render(scene, camera);
};

// 處理窗口大小變化
const onWindowResize = () => {
	if (!threeCanvas.value) return;

	const width = threeCanvas.value.clientWidth;
	const height = threeCanvas.value.clientHeight;

	camera.aspect = width / height;
	camera.updateProjectionMatrix();
	renderer.setSize(width, height);
};

// 設置 section 背景轉場動畫
const setupSectionBgAnimation = () => {
	scrollAnimation.createBasicAnimation({
		elements: introSection.value,
		trigger: "#intro-section",
		start: "top 60%",
		fromProps: {
			opacity: 0,
			y: 30
		},
		toProps: {
			opacity: 1,
			y: 0
		},
		duration: 1.8,
		ease: "power3.out",
		toggleActions: "play none none reverse" // 確保可以反覆觸發
	});
};

// 設置 Hexagon 行的滾動觸發動畫 - 調整為section出現後再觸發
const setupHexagonRowAnimations = async () => {
	scrollAnimation.createBasicAnimation({
		elements: ".feature-title",
		trigger: ".feature-section",
		start: "top 60%",
		fromProps: {
			opacity: 0,
			y: 20
		},
		toProps: {
			opacity: 1,
			y: 0
		},
		delay: 0.6 // 增加延遲，確保在section出現後再顯示
	});

	// 行動畫 - 在標題出現後觸發
	const rows = [hexagonRow1.value, hexagonRow2.value, hexagonRow3.value];
	rows.forEach((row, index) => {
		scrollAnimation.createBasicAnimation({
			elements: row,
			trigger: ".feature-section",
			start: "top 60%",
			fromProps: {
				opacity: 0,
				y: 50
			},
			toProps: {
				opacity: 1,
				y: 0
			},
			delay: 1.0 + index * 0.3, // 增加延遲，確保section和標題都出現後再顯示
			duration: 1.2
		});
	});

	// 六角形元素動畫 - 最後顯示
	const hexagonElements = document.querySelectorAll(".hexagon");
	scrollAnimation.createBasicAnimation({
		elements: hexagonElements,
		trigger: ".feature-section",
		start: "top 60%", // 保持同樣的觸發位置
		fromProps: {
			opacity: 0,
			y: 30
		},
		toProps: {
			opacity: 1,
			y: 0
		},
		delay: 2.0, // 增加更多延遲，確保在rows出現後再顯示
		duration: 0.6,
		stagger: 0.1,
		ease: "back.out(1.7)"
	});
};

// 創建波紋動畫 - 從容器中心發散
const createWaveAnimation = (container) => {
	// 確保容器存在
	if (!container || !document.body.contains(container)) {
		console.warn("波紋動畫容器不存在或未附加到DOM");
		return;
	}

	// 移除現有的波紋元素
	const existingCircles = container.querySelectorAll(".wave-circle");
	existingCircles.forEach((circle) => circle.remove());

	const waveCount = 4;
	const containerRect = container.getBoundingClientRect();
	const maxSize = Math.sqrt(Math.pow(containerRect.width, 2) + Math.pow(containerRect.height, 2)) * 1.1;
	const totalDuration = 4; // 縮短總持續時間
	const visibleDuration = 3; // 縮短可見持續時間

	// 創建波紋元素陣列以便追蹤
	const waves = [];

	for (let i = 0; i < waveCount; i++) {
		const wave = document.createElement("div");
		wave.classList.add("wave-circle");
		container.appendChild(wave);
		waves.push(wave);

		wave.style.position = "absolute";
		wave.style.top = "50%";
		wave.style.left = "50%";
		wave.style.transform = "translate(-50%, -50%)";
		wave.style.borderRadius = "50%";
		wave.style.border = "1.5px solid rgba(221, 28, 28, 0.6)";
		wave.style.width = "0px";
		wave.style.height = "0px";
		wave.style.opacity = "0";
		wave.style.zIndex = "1";

		const linearDelay = i * (totalDuration / waveCount);

		// 創建動畫時確保元素仍然存在於DOM中
		if (document.body.contains(wave)) {
			const waveTl = gsap.timeline({
				repeat: -1,
				delay: linearDelay,
				repeatDelay: totalDuration - visibleDuration,
				onComplete: () => {
					// 檢查元素是否仍然在DOM中
					if (wave && !document.body.contains(wave)) {
						waveTl.kill(); // 如果元素已從DOM中移除，則殺死動畫時間軸
					}
				}
			});

			waveTl
				.fromTo(
					wave,
					{ width: "0px", height: "0px", opacity: 0.8, borderWidth: "2px" },
					{ width: `${maxSize}px`, height: `${maxSize}px`, opacity: 0, borderWidth: "0.5px", duration: visibleDuration, ease: "linear" }
				)
				.set(wave, { width: "0px", height: "0px", opacity: 0 });
		}
	}

	// 返回創建的波紋元素，以便需要時可以引用
	return waves;
};

// 設置 YSCP 部分的滾動觸發動畫
const setupYSCPAnimations = async () => {
	// 建立時間軸動畫來替代組合動畫
	const tl = scrollAnimation.createTimelineAnimation({
		trigger: "#yscp-article",
		start: "top 60%"
	});

	// 1. 整個區塊淡入
	tl.fromTo(yscpSection.value, { opacity: 0, y: 40 }, { opacity: 1, y: 0, duration: 1.2, ease: "power2.out" });

	// 2. 標題與裝飾線條
	tl.fromTo(
		".product-title",
		{ opacity: 0, scale: 0.9, textShadow: "0 0 0px rgba(221, 28, 28, 0)", color: "#770f0f" },
		{ opacity: 1, scale: 1, textShadow: "0 0 5px rgba(221, 28, 28, 0.3)", color: "#dd1c1c", duration: 1.2, ease: "power3.out" },
		"-=0.9"
	);

	// 3. 標題裝飾線
	tl.fromTo(".title-decoration", { scaleX: 0, opacity: 0 }, { scaleX: 1, opacity: 1, duration: 0.8, ease: "power2.out" }, "-=0.8");

	// 4. 特性標籤
	tl.fromTo(".feature-tag", { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.6, stagger: 0.1, ease: "back.out(1.5)" }, "-=0.5");

	// 5. 描述文字
	tl.fromTo("h5", { y: 20, opacity: 0 }, { y: 0, opacity: 0.8, duration: 0.8, ease: "power2.out" }, "-=0.3");

	// 6. 裝飾線
	tl.fromTo(".benefit-decorative-line", { height: 0 }, { height: "80%", duration: 1.2, ease: "power2.inOut" }, "-=0.5");

	// 7. 主要描述文字
	tl.fromTo(".benefit-section h4", { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 1, ease: "power2.out" }, "-=0.8");

	// 裝飾線背景
	scrollAnimation.createBasicAnimation({
		elements: ".decorative-lines",
		trigger: ".feature-circles",
		start: "top 60%",
		fromProps: {
			opacity: 0,
			scale: 0.8
		},
		toProps: {
			opacity: 1,
			scale: 1
		},
		delay: 0.5,
		duration: 1,
		ease: "power2.out"
	});

	// 功能圓圈動畫 - 使用序列風格，確保在滾動到時觸發
	const circlesArray = [circleOne.value, circleTwo.value, circleThree.value];

	const masterTimeline = gsap.timeline({
		scrollTrigger: {
			trigger: ".feature-circles",
			start: "top 60%",
			toggleActions: "play none none reverse"
		},
		delay: 0.5 // 縮短延遲時間，加快第一次出現時間
	});

	circlesArray.forEach((circle, index) => {
		masterTimeline.fromTo(
			circle,
			{ scale: 0.7, opacity: 0, y: 30 },
			{ scale: 1, opacity: 1, y: 0, duration: 0.8, ease: "elastic.out(1, 0.75)" }, // 縮短持續時間
			index * 0.3 // 減少時差，讓圓圈出現更快
		);
	});

	// 波紋動畫添加在最後，作為最終效果，但更早出現
	masterTimeline.call(
		() => {
			// 確保元素仍存在於DOM中
			if (featureCircles.value && document.body.contains(featureCircles.value)) {
				waveElements = createWaveAnimation(featureCircles.value);
			} else {
				console.warn("功能圓圈容器不存在或未附加到DOM，無法創建波紋");
			}
		},
		null,
		"+=0.1" // 縮短等待時間
	);
};

// 設置網格動畫
const setupHexGridAnimation = () => {
	if (hexagons.length > 0) {
		hexagons.sort((a, b) => a.distance - b.distance);

		const tl = gsap.timeline({
			scrollTrigger: {
				trigger: "#intro-section",
				start: "top 60%",
				end: "top 20%",
				toggleActions: "play none none reverse", // 確保反覆滾動時動畫會重置
				onEnter: () => {
					// 當進入觸發區域時播放動畫
					console.log("Three.js animation triggered - enter");
				},
				onLeaveBack: () => {
					// 當離開觸發區域時重置動畫
					console.log("Three.js animation reset - leave back");
					resetHexagons();
				}
			}
		});

		// 為每個六角形添加動畫
		tl.to(
			hexagons.map((h) => h.mesh.scale),
			{
				x: 1,
				y: 1,
				z: 1,
				duration: 1.2,
				stagger: 0.008,
				ease: "power2.out"
			}
		);
	}
};

// 創建六角形網格背景 - 3D化，呈現在底部，作為鋪陳
const createHexagonGrid = () => {
	if (hexGrid) {
		scene.remove(hexGrid);
		hexagons = [];
	}
	if (sharedGeometry) {
		sharedGeometry.dispose();
		sharedGeometry = null;
	}
	if (hexMaterial) {
		hexMaterial.dispose();
		hexMaterial = null;
	}

	hexMaterial = new THREE.LineBasicMaterial({
		color: 0xdd1c1c,
		transparent: true,
		opacity: 0.3
	});

	hexGrid = new THREE.Group();
	// 設置初始位置
	hexGrid.position.y = -4;

	const hexRadius = 1.5;
	const rows = 15;
	const cols = 20;
	const vertDist = hexRadius * Math.sqrt(3);
	const horizDist = hexRadius * 1.5;

	function createHexagonGeometry(radius = 1) {
		const shape = new THREE.Shape();
		for (let i = 0; i < 6; i++) {
			const angle = (Math.PI / 3) * i;
			const x = radius * Math.cos(angle);
			const y = radius * Math.sin(angle);
			if (i === 0) shape.moveTo(x, y);
			else shape.lineTo(x, y);
		}
		shape.closePath();

		const points = shape.getPoints();
		const geometry = new THREE.BufferGeometry().setFromPoints(points);
		return geometry;
	}

	sharedGeometry = createHexagonGeometry(hexRadius);

	const gridOffsetX = (-cols * horizDist) / 2 + horizDist / 2;
	const gridOffsetZ = (-rows * vertDist) / 2 + vertDist / 2;

	// 計算中心點位置 - 用於計算距離
	const centerX = 0;
	const centerZ = 0;

	for (let i = 0; i < cols; i++) {
		for (let j = 0; j < rows; j++) {
			const hex = new THREE.LineLoop(sharedGeometry, hexMaterial);

			let xPos = i * horizDist + gridOffsetX;
			let yPos = 0; // 使用hexGrid.position.y來控制整體網格的高度
			let zPos = j * vertDist + (i % 2) * (vertDist / 2) + gridOffsetZ;

			hex.position.set(xPos, yPos, zPos);
			hex.rotation.x = -Math.PI / 2;

			// 計算到中心的距離 - 用於波浪動畫
			const distanceToCenter = Math.sqrt(Math.pow(xPos - centerX, 2) + Math.pow(zPos - centerZ, 2));

			// 設置初始比例為0
			hex.scale.set(0, 0, 0);

			// 儲存距離和初始位置信息 - 用於動畫
			hexGrid.add(hex);
			hexagons.push({
				mesh: hex,
				distance: distanceToCenter,
				originalY: yPos,
				xPos: xPos,
				zPos: zPos
			});
		}
	}

	scene.add(hexGrid);
};

// 生命週期鉤子
onMounted(async () => {
	if (typeof window !== "undefined") {
		await nextTick();

		// 確保 ScrollTrigger 已初始化
		await scrollAnimation.initScrollPlugins();

		// 設置 section 背景轉場動畫
		setupSectionBgAnimation();

		// 初始化三維場景 - 確保在section動畫的同時出現
		initThree();

		// 設置網格動畫 - 獨立函數便於管理
		setupHexGridAnimation();

		// 設置六角形動畫 - 在網格動畫後觸發
		setupHexagonRowAnimations();

		// 設置產品介紹動畫
		await setupYSCPAnimations();
	}
});

onUnmounted(() => {
	if (animationId) {
		cancelAnimationFrame(animationId);
	}
	window.removeEventListener("resize", onWindowResize);

	// 清理 GSAP 動畫
	if (gsap && gsap.globalTimeline) {
		gsap.globalTimeline.clear(); // 清除所有 GSAP 動畫
	}

	// 清理波紋元素
	waveElements.forEach((wave) => {
		if (wave && document.body.contains(wave)) {
			wave.remove();
		}
	});
	waveElements = [];

	// 清理ScrollTrigger實例，防止記憶體洩漏
	if (scrollAnimation && scrollAnimation.ScrollTrigger && scrollAnimation.ScrollTrigger.value) {
		const triggers = scrollAnimation.ScrollTrigger.value.getAll();
		triggers.forEach((trigger) => trigger.kill());
	}

	if (renderer) {
		renderer.dispose();
		renderer = null;
	}
	if (sharedGeometry) {
		sharedGeometry.dispose();
		sharedGeometry = null;
	}
	if (hexMaterial) {
		hexMaterial.dispose();
		hexMaterial = null;
	}
	if (scene) {
		scene.clear();
		scene = null;
	}
	hexagons = [];
});
</script>

<style scoped>
.hexagon-title {
	aspect-ratio: cos(30deg);
	clip-path: polygon(-50% 50%, 50% 100%, 150% 50%, 50% 0);
	background: linear-gradient(#dd1c1c, #770f0f);
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	color: #f2f2f2;
	gap: 4px;
	transition: transform 0.3s ease;
}

.section-title {
	position: relative;
	display: inline-block;
	font-weight: 700;
	background: linear-gradient(to right, #dd1c1c, #212a37);
	-webkit-background-clip: text;
	background-clip: text;
	color: transparent;
	margin-bottom: 10px;
}

canvas {
	position: absolute;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	z-index: 0;
}

.hexagon-row-1,
.hexagon-row-2,
.hexagon-row-3 {
	position: relative;
	z-index: 10;
}

.YSCP-circle {
	color: #212a37;
	font-weight: bold;
	background: radial-gradient(closest-side, #d9d9d9, #ffffff);
	border-radius: 100%;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	position: relative;
	transition: transform 0.3s ease, box-shadow 0.3s ease;
	z-index: 3;
}

.feature-tag-container {
	display: flex;
	flex-wrap: wrap;
	gap: 8px;
	margin-bottom: 12px;
}

.feature-tag {
	background: linear-gradient(135deg, #dd1c1c 0%, #9e0e0e 100%);
	color: white;
	padding: 6px 12px;
	border-radius: 20px;
	font-size: 14px;
	font-weight: 600;
	box-shadow: 0 2px 4px rgba(221, 28, 28, 0.3);
}

.benefit-decorative-line {
	position: absolute;
	left: -20px;
	top: 15px;
	width: 5px;
	height: 80%;
	background: linear-gradient(to bottom, #dd1c1c, transparent);
}

.benefit-section {
	padding-left: 15px;
	margin-top: 15px;
}

.decorative-lines {
	position: absolute;
	top: -10%;
	right: -20%;
	width: 90%;
	height: 120%;
	opacity: 0.3 !important;
	background-image: linear-gradient(
			0deg,
			transparent 24%,
			rgba(221, 28, 28, 0.5) 25%,
			rgba(221, 28, 28, 0.5) 26%,
			transparent 27%,
			transparent 74%,
			rgba(221, 28, 28, 0.5) 75%,
			rgba(221, 28, 28, 0.5) 76%,
			transparent 77%,
			transparent
		),
		linear-gradient(
			90deg,
			transparent 24%,
			rgba(221, 28, 28, 0.5) 25%,
			rgba(221, 28, 28, 0.5) 26%,
			transparent 27%,
			transparent 74%,
			rgba(221, 28, 28, 0.5) 75%,
			rgba(221, 28, 28, 0.5) 76%,
			transparent 77%,
			transparent
		);
	background-size: 50px 50px;
	z-index: 0;
}

.feature-circles {
	position: relative;
	overflow: visible;
}

.wave-circle {
	pointer-events: none;
	box-shadow: 0 0 8px rgba(221, 28, 28, 0.4);
}

.brand-icon {
	transition: transform 0.3s ease;
}

.brand-icon:hover {
	transform: scale(1.1);
}

@media (max-width: 768px) {
	.feature-section {
		padding: 0 12px;
	}

	.yscp-section {
		padding-top: 72px;
		padding-bottom: 72px;
	}
}
</style>
