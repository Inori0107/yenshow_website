<template>
	<!-- 聯絡表單 -->
	<form
		v-if="step === 1"
		class="container flex flex-col items-center gap-[48px] py-[120px] md:py-[96px] bg-gradient-to-r from-[#0f172a] to-[#1e293b] rounded-xl border border-[#38bdf8] shadow-lg shadow-cyan-500/50"
	>
		<!-- 需求說明 -->
		<h2 class="text-[24p] md:text-[36px] font-semibold text-center text-[#38bdf8]">需求說明</h2>
		<div class="w-2/3 md:w-1/2 flex flex-col gap-[12px] md:gap-[24px] text-white">
			<!-- 需求類型 -->
			<label class="text-[21px] md:text-[24px]">需求類型 *</label>
			<div class="grid grid-cols-2 md:grid-cols-4 gap-[6px] lg:gap-[12px]">
				<label class="hover:text-[#38bdf8] text-[16px] md:text-[18px]"><input type="checkbox" v-model="form.type" value="產品諮詢" /> 產品諮詢</label>
				<label class="hover:text-[#38bdf8] text-[16px] md:text-[18px]"><input type="checkbox" v-model="form.type" value="合作洽談" /> 合作洽談</label>
				<label class="hover:text-[#38bdf8] text-[16px] md:text-[18px]"><input type="checkbox" v-model="form.type" value="報價需求" /> 報價需求</label>
				<label class="hover:text-[#38bdf8] text-[16px] md:text-[18px]"><input type="checkbox" v-model="form.type" value="其他事項" /> 其他事項</label>
			</div>
			<p v-if="errors.type" class="text-red-500">{{ errors.type }}</p>

			<!-- 聯絡主旨 -->
			<label class="text-[21px] md:text-[24px] mt-4">聯絡主旨 *</label>
			<input v-model="form.subject" class="input-glass" type="text" placeholder="請輸入聯絡主旨" />
			<p v-if="errors.subject" class="text-red-500">{{ errors.subject }}</p>

			<!-- 詳細說明 -->
			<label class="text-[21px] md:text-[24px] mt-4">詳細說明 *</label>
			<textarea v-model="form.details" class="input-glass" rows="4" placeholder="請詳細描述您的需求"></textarea>
			<p v-if="errors.details" class="text-red-500">{{ errors.details }}</p>
		</div>

		<!-- 聯絡資訊 -->
		<h2 class="text-[24p] md:text-[36px] font-semibold text-center text-[#38bdf8]">聯絡資訊</h2>
		<div class="w-2/3 md:w-1/2 bg-white p-6 rounded-xl border border-gray-300 shadow-lg shadow-gray-500/50">
			<div class="flex flex-col gap-[12px] md:gap-[24px]">
				<!-- 姓名 -->
				<div class="flex flex-col gap-[6px] lg:gap-[12px]">
					<label class="text-[21px] md:text-[24px] text-gray-800">姓名 *</label>
					<input v-model="form.name" class="input-neon" type="text" placeholder="請輸入您的姓名" />
					<p v-if="errors.name" class="text-red-500">{{ errors.name }}</p>
				</div>
				<!-- 聯絡電話 -->
				<div class="flex flex-col gap-[6px] lg:gap-[12px]">
					<label class="text-[21px] md:text-[24px] text-gray-800">聯絡電話 *</label>
					<input v-model="form.phone" class="input-neon" type="tel" placeholder="0912-345-678" />
					<p v-if="errors.phone" class="text-red-500">{{ errors.phone }}</p>
				</div>
				<!-- 電子信箱 -->
				<div class="flex flex-col gap-[6px] lg:gap-[12px]">
					<label class="text-[21px] md:text-[24px] text-gray-800">電子信箱 *</label>
					<input v-model="form.email" class="input-neon" type="email" placeholder="example@mail.com" />
					<p v-if="errors.email" class="text-red-500">{{ errors.email }}</p>
				</div>
				<!-- 公司 / 部門 -->
				<div class="flex flex-col gap-[6px] lg:gap-[12px]">
					<label class="text-[21px] md:text-[24px] text-gray-800">公司 / 部門</label>
					<input v-model="form.company" class="input-neon" type="email" placeholder="請輸入貴公司名稱" />
				</div>
			</div>
		</div>

		<!-- 提交按鈕 -->
		<ButtonCTA color="white" class="w-fit mx-auto" label="提交" @click="submitForm" />
	</form>

	<!-- 提交成功畫面 -->
	<div
		v-if="step === 2"
		class="container flex flex-col min-h-screen justify-center items-center gap-[48px] py-[120px] md:py-[96px] bg-gradient-to-r from-[#0f172a] to-[#1e293b] rounded-xl border border-[#38bdf8] shadow-lg shadow-cyan-500/50 text-center text-white"
	>
		<h2 class="text-[24px] md:text-[36px] font-semibold text-[#38bdf8]">感謝您的聯繫！</h2>
		<p class="text-[16px] md:text-[24px]">
			我們的員工將在幾個工作日內回覆您，敬請耐心等候。<br />
			如有其他需求，歡迎隨時與我們聯繫。感謝您的理解與支持！
		</p>
		<p class="text-[16px] md:text-[24px]">
			Mail : jerry@yenshow.com <br />
			聯絡電話 : +886-2-222-333-55
		</p>
		<ButtonCTA color="white" class="w-fit mx-auto" label="回首頁" to="/"></ButtonCTA>
	</div>
</template>

<script setup>
const step = ref(1);
const form = ref({
	name: "",
	phone: "",
	email: "",
	company: "",
	subject: "",
	type: [],
	details: ""
});

const errors = ref({});

// 表單驗證
const validateForm = () => {
	errors.value = {};
	if (!form.value.name) errors.value.name = "請輸入姓名";
	if (!form.value.phone) errors.value.phone = "請輸入電話";
	if (!form.value.email || !form.value.email.includes("@")) errors.value.email = "請輸入有效的 Email";
	if (!form.value.subject) errors.value.subject = "請輸入聯絡主旨";
	if (form.value.type.length === 0) errors.value.type = "請選擇需求類型";
	if (!form.value.details) errors.value.details = "請輸入詳細說明";

	return Object.keys(errors.value).length === 0;
};

// 處理提交
const submitForm = () => {
	if (!validateForm()) return;
	console.log("表單資料:", form.value);
	step.value = 2;
};
</script>

<style>
/* 玻璃風格輸入框 */
.input-glass {
	width: 100%;
	padding: 12px;
	border-radius: 8px;
	background: rgba(255, 255, 255, 0.1);
	border: 1px solid rgba(255, 255, 255, 0.3);
	backdrop-filter: blur(10px);
	color: white;
	outline: none;
	transition: border 0.3s ease-in-out;
}
.input-glass:focus {
	border-color: #38bdf8;
}

/* 霓虹邊框輸入框 */
.input-neon {
	width: 100%;
	padding: 12px;
	border-radius: 8px;
	border: 1px solid #ccc;
	outline: none;
	transition: box-shadow 0.3s ease-in-out;
}
.input-neon:focus {
	box-shadow: 0 0 12px rgba(56, 189, 248, 0.7);
	border-color: #38bdf8;
}

/* 需求說明區塊 */
.bg-gradient-to-r {
	border-radius: 12px;
	transition: transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out;
}

/* 聯絡資訊區塊 */
.bg-white {
	border-radius: 12px;
	transition: transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out;
}
</style>
