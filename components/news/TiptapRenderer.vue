<template>
	<editor-content v-if="editor" :editor="editor" class="tiptap-renderer-content" />
</template>

<script setup>
import { ref, watch, onUnmounted } from "vue";
import { useEditor, EditorContent } from "@tiptap/vue-3";
import StarterKit from "@tiptap/starter-kit";
import TextStyle from "@tiptap/extension-text-style";
import Color from "@tiptap/extension-color";
import Link from "@tiptap/extension-link";

const props = defineProps({
	content: {
		type: Object,
		required: true,
		default: () => ({ type: "doc", content: [{ type: "paragraph" }] })
	}
});

const getValidTiptapContent = (contentInput) => {
	if (contentInput && typeof contentInput === "object" && contentInput.type === "doc" && Array.isArray(contentInput.content)) {
		if (contentInput.content.length === 0) {
			return { ...contentInput, content: [{ type: "paragraph" }] };
		}
		return contentInput;
	}
	return { type: "doc", content: [{ type: "paragraph" }] };
};

const editor = useEditor({
	content: getValidTiptapContent(props.content),
	extensions: [
		StarterKit.configure({
			heading: { levels: [1, 2, 3, 4, 5, 6] },
			blockquote: {} // Enable blockquote if used
		}),
		TextStyle, // To render color styles
		Color, // To render color styles
		Link.configure({
			openOnClick: true, // Make links clickable
			autolink: true, // Automatically detect links
			linkOnPaste: false, // Not relevant for read-only
			HTMLAttributes: {
				target: "_blank",
				rel: "noopener noreferrer nofollow"
			}
		})
	],
	editable: false // IMPORTANT: Set to read-only
});

watch(
	() => props.content,
	(newContent) => {
		if (editor.value) {
			const validContent = getValidTiptapContent(newContent);
			if (JSON.stringify(editor.value.getJSON()) !== JSON.stringify(validContent)) {
				editor.value.commands.setContent(validContent, false); // Use false to avoid emitting update event
			}
		}
	},
	{ deep: true }
);

// Destroy the editor instance on unmount
onUnmounted(() => {
	if (editor.value) {
		editor.value.destroy();
	}
});
</script>

<style scoped>
.tiptap-renderer-content ::v-deep(p) {
	margin-bottom: 1em; /* Default for small screens */
	line-height: 1.6; /* Default for small screens */
}

@media (min-width: 640px) {
	/* sm and up */
	.tiptap-renderer-content ::v-deep(p) {
		margin-bottom: 1.25em;
		line-height: 1.7;
	}
}

@media (min-width: 1280px) {
	/* xl and up */
	.tiptap-renderer-content ::v-deep(p) {
		margin-bottom: 1.35em;
		line-height: 1.75;
	}
}

.tiptap-renderer-content ::v-deep(p:last-child) {
	margin-bottom: 0; /* 最後一個段落不需要底部間距 */
}

/* 確保列表項內的段落也有間距，但小於獨立段落 */
.tiptap-renderer-content ::v-deep(li p) {
	margin-bottom: 0.5em;
}
.tiptap-renderer-content ::v-deep(li > p:last-child) {
	margin-bottom: 0;
}

.tiptap-renderer-content ::v-deep(h1),
.tiptap-renderer-content ::v-deep(h2),
.tiptap-renderer-content ::v-deep(h3),
.tiptap-renderer-content ::v-deep(h4),
.tiptap-renderer-content ::v-deep(h5),
.tiptap-renderer-content ::v-deep(h6) {
	margin-top: 1.5em; /* Default for small screens */
	margin-bottom: 0.6em; /* Default for small screens */
	line-height: 1.35; /* Default for small screens */
}

@media (min-width: 640px) {
	/* sm and up */
	.tiptap-renderer-content ::v-deep(h1),
	.tiptap-renderer-content ::v-deep(h2),
	.tiptap-renderer-content ::v-deep(h3),
	.tiptap-renderer-content ::v-deep(h4),
	.tiptap-renderer-content ::v-deep(h5),
	.tiptap-renderer-content ::v-deep(h6) {
		margin-top: 1.8em;
		margin-bottom: 0.8em;
		line-height: 1.4;
	}
}

@media (min-width: 1280px) {
	/* xl and up */
	.tiptap-renderer-content ::v-deep(h1),
	.tiptap-renderer-content ::v-deep(h2),
	.tiptap-renderer-content ::v-deep(h3),
	.tiptap-renderer-content ::v-deep(h4),
	.tiptap-renderer-content ::v-deep(h5),
	.tiptap-renderer-content ::v-deep(h6) {
		margin-top: 2em;
		margin-bottom: 1em;
		line-height: 1.45;
	}
}

.tiptap-renderer-content ::v-deep(ul),
.tiptap-renderer-content ::v-deep(ol) {
	margin-top: 1em;
	margin-bottom: 1em;
	padding-left: 1.75em; /* Default for small screens */
}

@media (min-width: 640px) {
	/* sm and up */
	.tiptap-renderer-content ::v-deep(ul),
	.tiptap-renderer-content ::v-deep(ol) {
		padding-left: 2.5em;
	}
}

.tiptap-renderer-content ::v-deep(blockquote) {
	margin-top: 1.5em;
	margin-bottom: 1.5em;
	padding-left: 1em; /* Default for small screens */
	border-left-width: 2px; /* Default for small screens */
	opacity: 0.85;
	border-color: #e2e8f0; /* Tailwind gray-200 */
}

@media (min-width: 640px) {
	/* sm and up */
	.tiptap-renderer-content ::v-deep(blockquote) {
		padding-left: 1.5em;
		border-left-width: 3px;
	}
}

/* 可以在此處添加更多樣式，例如連結顏色等 */
.tiptap-renderer-content ::v-deep(a) {
	color: #2563eb; /* Tailwind blue-600 */
	text-decoration: underline;
	&:hover {
		color: #1d4ed8; /* Tailwind blue-700 */
	}
}

/* 如果需要針對暗色模式調整 Tiptap 內容樣式 */
.dark .tiptap-renderer-content ::v-deep(blockquote) {
	border-color: #475569; /* Tailwind slate-600 */
}

.dark .tiptap-renderer-content ::v-deep(a) {
	color: #60a5fa; /* Tailwind blue-400 */
	&:hover {
		color: #3b82f6; /* Tailwind blue-500 */
	}
}
</style>
