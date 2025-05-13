<template>
	<!-- Filter Buttons -->
	<div class="flex flex-wrap bg-[#F1F5F9] p-[2px] rounded-[10px] z-30" role="group" :aria-label="props.name || '篩選選項'">
		<button
			v-for="option in processedOptions"
			:key="option.value"
			@click="setFilter(option.value)"
			:class="[
				'text-[16px] px-[8px] md:px-[14px] lg:px-[18px] py-[6px] md:py-[12px] lg:py-[16px] rounded-[10px]',
				selectedOption === option.value ? 'bg-white shadow-md' : 'bg-[#F1F5F9]'
			]"
			:aria-pressed="selectedOption === option.value ? 'true' : 'false'"
		>
			{{ option.label }}
		</button>
	</div>
</template>

<script setup>
import { ref, computed, watch } from "vue";
import { useLanguageStore } from "~/stores/core/languageStore";

// Define `props`
const props = defineProps({
	name: {
		type: String,
		default: null
	},
	options: {
		type: Array,
		required: true
	},
	modelValue: {
		type: String,
		default: "ALL"
	},
	filterKey: {
		type: String,
		default: ""
	},
	// Support for localized option objects
	isLocalizedOptions: {
		type: Boolean,
		default: false
	}
});

// Define `emit`
const emit = defineEmits(["update:modelValue"]);

// Currently selected filter option
const selectedOption = ref(props.modelValue);

// Watch for external modelValue changes
watch(
	() => props.modelValue,
	(newValue) => {
		selectedOption.value = newValue || "ALL";
	}
);

// Process options for display, handling localization
const languageStore = useLanguageStore();
const processedOptions = computed(() => {
	// Add 'ALL' option consistently at the beginning
	const allOption = { value: "ALL", label: "ALL" };
	let sourceOptions = [];

	// If options are simple strings
	if (!props.isLocalizedOptions) {
		sourceOptions = props.options.map((option) => ({
			value: option,
			label: option
		}));
	}
	// If options are objects (with localization info)
	else {
		sourceOptions = props.options.map((option) => {
			if (typeof option === "string") {
				return { value: option, label: option };
			}
			// Handle potential object structure variations
			const value = option.value || option._id;
			const label = languageStore.getLocalizedField(option, "name") || option.label || value;
			return {
				value: value,
				label: label
			};
		});
	}

	// Ensure 'ALL' is not duplicated if already present in source options
	const hasAllOption = sourceOptions.some((opt) => opt.value === "ALL");
	return hasAllOption ? sourceOptions : [allOption, ...sourceOptions];
});

// Update selection and notify parent component when a button is clicked
const setFilter = (value) => {
	selectedOption.value = value;
	emit("update:modelValue", value);
};
</script>
