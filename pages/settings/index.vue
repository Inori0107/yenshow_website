<template>
	<div class="settings-page p-6 bg-white">
		<h1 class="text-2xl font-semibold mb-6">{{ $t("settings.title") }}</h1>

		<div class="grid grid-cols-1 md:grid-cols-2 gap-8">
			<!-- API 連接信息 -->
			<div class="card p-6 border rounded-lg shadow-sm">
				<h2 class="text-xl font-medium mb-4">{{ $t("settings.api_connection") }}</h2>

				<div class="space-y-4">
					<div>
						<h3 class="text-sm font-medium text-gray-500">{{ $t("settings.api_status") }}</h3>
						<div class="flex items-center mt-1">
							<div :class="apiStatus.connected ? 'bg-green-500' : 'bg-red-500'" class="w-3 h-3 rounded-full mr-2"></div>
							<span>{{ apiStatus.connected ? $t("settings.connected") : $t("settings.disconnected") }}</span>
						</div>
					</div>

					<div>
						<h3 class="text-sm font-medium text-gray-500">{{ $t("settings.api_url") }}</h3>
						<p class="mt-1">{{ apiBaseUrl }}</p>
					</div>

					<button @click="testConnection" class="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition" :disabled="isLoading">
						{{ isLoading ? $t("settings.testing") : $t("settings.test_connection") }}
					</button>
				</div>
			</div>

			<!-- 用戶資料 -->
			<div v-if="isAuthenticated" class="card p-6 border rounded-lg shadow-sm">
				<h2 class="text-xl font-medium mb-4">{{ $t("settings.user_info") }}</h2>

				<div v-if="user" class="space-y-4">
					<div>
						<h3 class="text-sm font-medium text-gray-500">{{ $t("settings.account") }}</h3>
						<p class="mt-1">{{ user.account }}</p>
					</div>

					<div>
						<h3 class="text-sm font-medium text-gray-500">{{ $t("settings.role") }}</h3>
						<p class="mt-1">{{ user.role }}</p>
					</div>

					<div>
						<h3 class="text-sm font-medium text-gray-500">{{ $t("settings.language") }}</h3>
						<select
							v-model="currentLanguage"
							@change="changeLanguage"
							class="mt-1 block w-full pl-3 pr-10 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
						>
							<option value="zh">繁體中文</option>
							<option value="en">English</option>
						</select>
					</div>

					<div class="pt-2">
						<button @click="logout" class="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition">
							{{ $t("settings.logout") }}
						</button>
					</div>
				</div>
			</div>

			<!-- 未登入提示 -->
			<div v-else class="card p-6 border rounded-lg shadow-sm">
				<h2 class="text-xl font-medium mb-4">{{ $t("settings.user_info") }}</h2>
				<p class="text-gray-500">{{ $t("settings.not_logged_in") }}</p>
				<NuxtLink to="/login" class="inline-block mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition">
					{{ $t("settings.login") }}
				</NuxtLink>
			</div>
		</div>
	</div>
</template>

<script setup>
// 引入 composables 和 stores
import { useUserStore } from "~/stores/user";

const config = useRuntimeConfig();
const { locale, setLocale, t } = useI18n();
const router = useRouter();

// 初始化 API
const { api } = useAPI();

// 用戶 store
const userStore = useUserStore();

// 計算屬性與狀態
const isAuthenticated = computed(() => userStore.isAuthenticated);
const user = computed(() => userStore.user);
const apiBaseUrl = config.public.apiBaseUrl;
const currentLanguage = ref(locale.value);

// API 連接狀態
const apiStatus = reactive({
	connected: false,
	lastChecked: null
});

const isLoading = ref(false);

// 測試 API 連接
const testConnection = async () => {
	isLoading.value = true;

	try {
		const startTime = Date.now();
		const response = await api.get("/api/ping");
		const endTime = Date.now();

		if (response.status === 200) {
			apiStatus.connected = true;
			apiStatus.lastChecked = new Date().toLocaleString();
			apiStatus.latency = `${endTime - startTime}ms`;
			alert(t("settings.connection_success", { latency: apiStatus.latency }));
		} else {
			apiStatus.connected = false;
			alert(t("settings.connection_failed"));
		}
	} catch (error) {
		apiStatus.connected = false;
		console.error("API 連接測試失敗:", error);
		alert(t("settings.connection_error", { error: error.message }));
	} finally {
		isLoading.value = false;
	}
};

// 變更語言
const changeLanguage = async () => {
	await setLocale(currentLanguage.value);
};

// 登出
const logout = async () => {
	await userStore.logout();
	router.push("/");
};

// 頁面載入時測試連接
onMounted(async () => {
	await testConnection();
});
</script>
