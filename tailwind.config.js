/** @type {import('tailwindcss').Config} */
export default {
	content: [],
	theme: {
		extend: {
			fontFamily: {
				sans: ["Noto Sans TC", "Arial", "sans-serif"], // 設定主要無襯線字體
				serif: ["Noto Serif TC", "Times New Roman", "serif"], // 設定襯線字體
				mono: ["Courier New", "monospace"] // 設定等寬字體
			},
			colors: {
				primary: "#212A37",
				secondary: "#F2F2F2",
				tertiary: "#000000"
			}
		}
	},
	plugins: []
};
