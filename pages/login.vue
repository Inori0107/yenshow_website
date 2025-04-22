<template>
	<div class="login-container min-h-screen flex items-center justify-center">
		<div class="login-form-container p-8 bg-white shadow-lg rounded-lg w-full max-w-md">
			<h1 class="text-2xl font-bold mb-6 text-center">{{ $t("login.title") }}</h1>

			<form @submit.prevent="handleLogin" class="space-y-5">
				<!-- 帳號輸入 -->
				<div>
					<label for="account" class="block text-sm font-medium mb-1">
						{{ $t("login.account") }}
					</label>
					<input
						id="account"
						v-model="form.account"
						type="text"
						required
						class="input-field w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
					/>
				</div>

				<!-- 密碼輸入 -->
				<div>
					<label for="password" class="block text-sm font-medium mb-1">
						{{ $t("login.password") }}
					</label>
					<input
						id="password"
						v-model="form.password"
						type="password"
						required
						class="input-field w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
					/>
				</div>

				<!-- 錯誤訊息 -->
				<div v-if="error" class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative">
					{{ error }}
				</div>

				<!-- 登入按鈕 -->
				<button
					type="submit"
					class="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded transition duration-200"
					:disabled="loading"
					:class="{ 'opacity-70 cursor-not-allowed': loading }"
				>
					<span v-if="loading" class="flex items-center justify-center">
						<svg class="animate-spin -ml-1 mr-2 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
							<circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
							<path
								class="opacity-75"
								fill="currentColor"
								d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
							></path>
						</svg>
						{{ $t("login.logging_in") }}
					</span>
					<span v-else>{{ $t("login.submit") }}</span>
				</button>
			</form>
		</div>
	</div>
</template>

<script setup>
// 引入 stores
import { useUserStore } from "~/stores/user";

// 路由與 i18n
const route = useRoute();
const router = useRouter();
const { t } = useI18n();

// 用戶 store
const userStore = useUserStore();

// 表單數據
const form = reactive({
	account: "",
	password: ""
});

// 狀態
const loading = ref(false);
const error = ref("");

// 處理登入
const handleLogin = async () => {
	if (!form.account || !form.password) {
		error.value = t("login.error_fields");
		return;
	}

	loading.value = true;
	error.value = "";

	try {
		console.log("準備登入...", { account: form.account, passwordLength: form.password.length });

		// 創建登入憑證
		const credentials = {
			account: form.account,
			password: form.password
		};

		// 發送登入請求
		const result = await userStore.login(credentials);
		console.log("登入結果:", result);

		if (result.success) {
			console.log("登入成功，準備重定向...");

			// 短暫延遲以確保狀態更新
			setTimeout(() => {
				// 登入成功，檢查是否有重定向路徑
				const redirectPath = route.query.redirect || "/";
				router.push(redirectPath);
			}, 500);
		} else {
			error.value = result.message || t("login.error_unknown");
			console.error("登入失敗:", error.value);
		}
	} catch (err) {
		console.error("登入過程錯誤:", err);
		error.value = err.message || t("login.error_unknown");
	} finally {
		loading.value = false;
	}
};

// 如果已登入，重定向到首頁或之前的頁面
onMounted(() => {
	if (userStore.isAuthenticated) {
		console.log("用戶已登入，重定向...");
		const redirectPath = route.query.redirect || "/";
		router.push(redirectPath);
	}
});
</script>

<style scoped>
.login-container {
	background-color: #f9fafb;
}

.login-form-container {
	box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
}

.input-field:focus {
	border-color: transparent;
}
</style>
