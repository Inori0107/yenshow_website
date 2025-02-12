<template>
	<div class="flex items-center gap-3 text-[16px] leading-[21px] pointer-auto">
		<button
			@click="toggleLocale($event, 'zh')"
			:class="locale === 'zh' ? 'font-bold opacity-100' : 'opacity-50'"
			class="transition-opacity hover:opacity-100 cursor-pointer"
		>
			TW
		</button>
		<span>/</span>
		<button
			@click="toggleLocale($event, 'en')"
			:class="locale === 'en' ? 'font-bold opacity-100' : 'opacity-50'"
			class="transition-opacity hover:opacity-100 cursor-pointer"
		>
			EN
		</button>
	</div>
</template>

<script setup>
import { nextTick } from "vue";
const { locale, setLocale } = useI18n();

// 確保點擊時語言切換有效
const toggleLocale = async (event, lang) => {
	event.stopPropagation(); // 防止外層 `div` 攔截事件
	console.log(`切換語言到: ${lang}`);

	if (locale.value !== lang) {
		await setLocale(lang); // 確保語言切換完成
		await nextTick(); // 強制 Vue 重新渲染
	}
};
</script>
