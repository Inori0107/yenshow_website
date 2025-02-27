<template>
	<div class="h-screen"></div>
	<!-- Story -->
	<section id="story" v-if="sections.length" class="my-[128px] md:my-[512px]">
		<article v-for="(section, index) in sections" :key="index" class="story-container h-screen relative">
			<div
				class="absolute -translate-x-1/2 -translate-y-1/2 flex flex-row-reverse gap-[6px] md:gap-[24px] lg:gap-[48px]"
				:style="{ top: section.position.top, left: section.position.left }"
			>
				<!-- 只有當 section.title 存在時才渲染 -->
				<h2
					v-show="section.title"
					class="vertical-title text-[24px] md:text-[48px] lg:text-[96px] p-[6px] rounded-lg opacity-0"
					v-bind:ref="(el) => setTitleRef(el, index)"
				>
					{{ section.title }}
				</h2>
				<p
					v-for="(text, i) in section.texts"
					:key="i"
					v-bind:ref="(el) => setTextRef(el, index, i)"
					class="vertical-text text-[16px] md:text-[24px] lg:text-[36px] p-[6px] opacity-0"
				>
					{{ text }}
				</p>
			</div>
		</article>
	</section>
</template>

<script setup>
import { ref, onMounted } from "vue";

// 文字區塊
const sections = [
	{
		title: null,
		texts: ["白雲升遠岫 搖曳入晴空", "啟發遠岫科技的成立與精神", "描繪了白雲從遠山升起", "飄向晴空的自然景象", "展現和諧之美與深刻人生哲理"],
		position: { top: "50%", left: "50%" }
	},
	{
		title: "白雲",
		texts: ["以其輕盈靈動的姿態", "象徵無限的創新力量", "遠岫科技以創新為核心", "提供高效且突破性的方案", "幫助客戶克服挑戰"],
		position: { top: "50%", left: "66%" }
	},
	{
		title: "遠岫",
		texts: ["遠山象徵穩重與堅實", "其精神為追求卓越與承諾可靠", "穩健可靠的態度體現對客戶的承諾", "共創長期信賴的夥伴關係"],
		position: { top: "50%", left: "33%" }
	},
	{
		title: "晴空",
		texts: ["晴朗無垠的天空", "代表對未來的啟迪與願景", "遠岫科技不僅協助客戶實現目標", "更攜手描繪長遠未來", "在廣闊藍天下實現共同成果"],
		position: { top: "50%", left: "50%" }
	}
];

const titleRefs = ref([]);
const textRefs = ref([]);

// 記錄 title DOM
const setTitleRef = (el, index) => {
	if (el) titleRefs.value[index] = el;
};

// 記錄 texts DOM
const setTextRef = (el, sectionIndex, textIndex) => {
	if (el) {
		(textRefs.value[sectionIndex] ||= [])[textIndex] = el;
	}
};

onMounted(() => {
	useTextAnimation(titleRefs, textRefs);
});
</script>
