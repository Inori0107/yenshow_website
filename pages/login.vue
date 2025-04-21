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
				<button type="submit" class="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded transition duration-200" :disabled="loading">
					<span v-if="loading">{{ $t("login.logging_in") }}</span>
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
		const result = await userStore.login({
			account: form.account,
			password: form.password
		});

		if (result.success) {
			// 登入成功，檢查是否有重定向路徑
			const redirectPath = route.query.redirect || "/";
			router.push(redirectPath);
		} else {
			error.value = result.message;
		}
	} catch (err) {
		error.value = err.message || t("login.error_unknown");
	} finally {
		loading.value = false;
	}
};

// 如果已登入，重定向到首頁或之前的頁面
onMounted(() => {
	if (userStore.isAuthenticated) {
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
