<template>
	<div v-if="modelValue" class="fixed inset-0 bg-black/10 backdrop-blur-[1px] flex justify-center items-center z-50" @click.self="closeDialog">
		<transition name="slide-up">
			<div v-if="modelValue" class="login-box relative p-6 sm:p-8 md:p-10 lg:p-12 rounded-2xl sm:rounded-3xl md:rounded-[35px] lg:rounded-[50px]">
				<button @click="closeDialog" class="absolute top-2 right-2 sm:top-3 sm:right-3 md:top-4 md:right-4 text-white hover:text-gray-300 text-xl sm:text-2xl">
					&times;
				</button>
				<div class="title-container">
					<h2 class="title-text text-2xl sm:text-3xl md:text-4xl font-semibold text-center mb-4 sm:mb-5 md:mb-6">登入系統</h2>
					<div class="title-decoration"></div>
				</div>
				<form @submit.prevent="handleLogin" class="flex flex-col gap-4 sm:gap-5 md:gap-6">
					<!-- 帳號 -->
					<div>
						<label for="dialog-account" class="text-white text-sm sm:text-base md:text-lg mb-1 md:mb-2">帳號</label>
						<div class="relative">
							<input
								type="text"
								id="dialog-account"
								v-model="account"
								required
								placeholder="請輸入帳號"
								class="bg-white/10 text-white placeholder-white/50 w-full px-3 py-2 sm:px-4 sm:py-2.5 text-sm sm:text-base rounded-md sm:rounded-lg"
							/>
						</div>
					</div>
					<!-- 密碼 -->
					<div>
						<label for="dialog-password" class="text-white text-sm sm:text-base md:text-lg mb-1 md:mb-2">密碼</label>
						<div class="relative">
							<input
								type="password"
								id="dialog-password"
								v-model="password"
								required
								placeholder="請輸入密碼"
								class="bg-white/10 text-white placeholder-white/50 w-full px-3 py-2 sm:px-4 sm:py-2.5 text-sm sm:text-base rounded-md sm:rounded-lg"
							/>
						</div>
					</div>
					<!-- 錯誤訊息 -->
					<div v-if="error" class="error-message text-xs sm:text-sm mt-2">
						{{ error }}
					</div>

					<!-- 登入按鈕 -->
					<button
						type="submit"
						:disabled="loading"
						class="bg-white text-[#212a37] hover:bg-white/90 flex items-center justify-center w-full px-4 py-2.5 sm:px-5 sm:py-3 text-base sm:text-lg md:text-xl rounded-md sm:rounded-lg"
					>
						<span v-if="loading" class="mr-2">
							<svg class="animate-spin h-4 w-4 sm:h-5 sm:w-5" viewBox="0 0 24 24">
								<circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
								<path
									class="opacity-75"
									fill="currentColor"
									d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
								></path>
							</svg>
						</span>
						{{ loading ? "登入中..." : "登入" }}
					</button>
					<!-- 導航到聯絡頁面 -->
					<div class="mt-3 sm:mt-4 text-center">
						<p class="text-xs sm:text-sm text-white/80">
							沒有帳號或遇到問題？
							<a @click="navigateToContact" class="text-white hover:underline cursor-pointer">點此聯繫我們</a>
						</p>
					</div>
				</form>
			</div>
		</transition>
	</div>
</template>

<script setup>
import { ref, watch } from "vue";
import { useUserStore } from "~/stores/userStore";
import { useRouter } from "vue-router";

const props = defineProps({
	modelValue: {
		type: Boolean,
		required: true
	}
});

const emit = defineEmits(["update:modelValue", "login-success"]);

const userStore = useUserStore();
const router = useRouter();

// 表單狀態
const account = ref("");
const password = ref("");
const loading = ref(false);
const error = ref("");

// 登入處理
const handleLogin = async () => {
	if (!account.value || !password.value) {
		error.value = "請輸入帳號和密碼";
		return;
	}

	loading.value = true;
	error.value = "";

	try {
		const response = await userStore.login({
			account: account.value,
			password: password.value
		});

		if (response.success) {
			emit("login-success"); // 發送成功事件
			closeDialog(); // 關閉對話框
			// 延遲跳轉可以在父元件中處理，或者如果希望在這裡處理，可以這樣：
			// setTimeout(() => {
			//   window.location.href = "/";
			// }, 500); // 短暫延遲讓使用者看到成功狀態
		} else {
			error.value = response.message || "登入失敗";
		}
	} catch (err) {
		error.value = err?.response?.data?.message || err?.message || "登入失敗，請稍後再試";
	} finally {
		loading.value = false;
	}
};

// 關閉對話框
const closeDialog = () => {
	emit("update:modelValue", false);
};

// 導航到聯絡頁面
const navigateToContact = () => {
	closeDialog(); // 關閉對話框
	router.push("/contact"); // 導航到聯絡頁面
};

// 當對話框關閉時重置表單狀態
watch(
	() => props.modelValue,
	(newValue) => {
		if (!newValue) {
			account.value = "";
			password.value = "";
			error.value = "";
			loading.value = false;
		}
	}
);
</script>

<style scoped>
/* 沿用 login.vue 的樣式 */
.login-box {
	background: rgb(33, 42, 55);
	/* padding: 48px; REMOVED - Handled by Tailwind */
	/* border-radius: 50px; REMOVED - Handled by Tailwind */
	box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
	width: fit-content; /* 保持內容寬度 */
	max-width: 90vw; /* Fallback max-width */
	backdrop-filter: blur(10px);
	border: 1px solid rgba(255, 255, 255, 0.1);
	position: relative; /* 確保關閉按鈕定位 */
	z-index: 50;
}

.title-container {
	position: relative;
	text-align: center;
	margin-bottom: 24px; /* Default small */
	padding: 12px 0; /* Default small py-3 */
}

@media (min-width: 640px) {
	/* sm */
	.title-container {
		margin-bottom: 32px;
		padding: 16px 0; /* py-4 */
	}
}
@media (min-width: 768px) {
	/* md */
	.title-container {
		margin-bottom: 40px;
		padding: 20px 0; /* py-5 */
	}
}
@media (min-width: 1024px) {
	/* lg */
	.title-container {
		margin-bottom: 48px;
		padding: 24px 0; /* py-6 */
	}
}

.title-text {
	/* font-size: 48px; REMOVED - Handled by Tailwind */
	font-weight: bold;
	background: linear-gradient(135deg, #ffffff 0%, #e0e0e0 100%);
	-webkit-background-clip: text;
	background-clip: text;
	-webkit-text-fill-color: transparent;
	position: relative;
	z-index: 1;
	text-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.title-decoration {
	position: absolute;
	bottom: 0;
	left: 50%;
	transform: translateX(-50%);
	width: 96px; /* Default small, w-24 */
	height: 2px; /* h-0.5 or h-1 */
	background: linear-gradient(90deg, rgba(255, 255, 255, 0) 0%, rgba(255, 255, 255, 0.8) 50%, rgba(255, 255, 255, 0) 100%);
	border-radius: 2px;
}

@media (min-width: 640px) {
	/* sm */
	.title-decoration {
		width: 128px; /* w-32 */
	}
}
@media (min-width: 768px) {
	/* md */
	.title-decoration {
		width: 160px; /* w-40 */
	}
}
@media (min-width: 1024px) {
	/* lg */
	.title-decoration {
		width: 180px;
		height: 4px;
	}
}

input {
	/* width: 360px; REMOVED - Handled by Tailwind */
	max-width: 100%; /* 確保在小螢幕上正常 */
	/* padding: 12px 24px; REMOVED - Handled by Tailwind */
	border: 1px solid rgba(255, 255, 255, 0.2);
	/* border-radius: 10px; REMOVED - Handled by Tailwind */
	/* font-size: 1rem; REMOVED - Handled by Tailwind */
	transition: all 0.3s ease;
}

input:focus {
	outline: none;
	border-color: rgba(255, 255, 255, 0.5);
	background-color: rgba(255, 255, 255, 0.15);
}

button[type="submit"] {
	/* width: 360px; REMOVED - Handled by Tailwind */
	max-width: 100%; /* 確保在小螢幕上正常 */
	/* padding: 12px 24px; REMOVED - Handled by Tailwind */
	/* border-radius: 10px; REMOVED - Handled by Tailwind */
	/* font-size: 24px; REMOVED - Handled by Tailwind */
	cursor: pointer;
	transition: all 0.3s ease;
	font-weight: bold;
}

button:disabled {
	background-color: rgba(255, 255, 255, 0.3);
	cursor: not-allowed;
}

.error-message {
	color: #ff6b6b;
	text-align: center;
	/* font-size: 16px; REMOVED - Handled by Tailwind */
}

label {
	display: block;
	/* font-size: 24px; REMOVED - Handled by Tailwind */
	/* margin-bottom: 12px; REMOVED - Handled by Tailwind */
	opacity: 0.9;
}

/* Dialog specific styles */
.fixed {
	position: fixed;
}
.inset-0 {
	top: 0;
	right: 0;
	bottom: 0;
	left: 0;
}
.bg-black\/50 {
	background-color: rgba(0, 0, 0, 0.5);
}
.backdrop-blur-sm {
	backdrop-filter: blur(4px);
}
.flex {
	display: flex;
}
.justify-center {
	justify-content: center;
}
.items-center {
	align-items: center;
}
.z-50 {
	z-index: 50;
}
.absolute {
	position: absolute;
}
.top-4 {
	top: 1rem; /* 16px */
}
.right-4 {
	right: 1rem; /* 16px */
}
.text-white {
	color: white;
}
.hover\:text-gray-300:hover {
	color: #d1d5db; /* gray-300 */
}
.text-2xl {
	font-size: 1.5rem; /* 24px */
	line-height: 2rem; /* 32px */
}

/* Slide-up transition */
.slide-up-enter-active,
.slide-up-leave-active {
	transition: transform 0.3s ease-out, opacity 0.3s ease-out;
}
.slide-up-enter-from,
.slide-up-leave-to {
	opacity: 0;
	transform: translateY(30px);
}
.slide-up-enter-to,
.slide-up-leave-from {
	opacity: 1;
	transform: translateY(0);
}
</style>
