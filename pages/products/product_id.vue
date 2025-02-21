<template>
	<div class="container min-h-screen px-0 pt-[120px] pb-[48px] md:py-[96px] flex flex-col gap-[48px] items-center bg-white overflow-hidden">
		<!-- info -->
		<div class="w-2/3 grid grid-cols-1 place-items-center lg:grid-cols-2 gap-[48px]">
			<!-- image -->
			<div class="bg-[#F3F5F7] w-[250px] md:w-[384px] aspect-square relative flex justify-center items-center">
				<img class="w-[70%] aspect-square" src="/public/product/YS-9503.png" alt="管理中心主機" />
			</div>
			<!-- content -->
			<div class="flex flex-col gap-[24px]">
				<h4 class="text-[24px] lg:text-[36px] text-center font-bold">管理中心主機</h4>
				<p class="text-[16px] lg:text-[24px]">產品編號 : YS-9503</p>
				<p class="text-[16px] lg:text-[24px]">產品說明 : 遠岫科技YS- 9503 ， Android系統的管理中心主機，內置SIP專用服務器，最多可以添加10000個可視對講設備。</p>
				<ButtonCTA class="w-fit mx-auto" label="產品諮詢" to="/contact"></ButtonCTA>
			</div>
		</div>
		<!-- feature -->
		<div class="bg-[#C3CEDA] w-full py-[24px] md:py-[48px]">
			<div class="mx-auto px-[24px] flex flex-col gap-[24px] w-fit">
				<h4 class="text-[24px] lg:text-[36px] text-center font-bold">產品特點</h4>
				<p class="text-[16px] lg:text-[24px]">◎ 10.1英寸IPS觸摸屏，分辨率為1280×800</p>
				<p class="text-[16px] lg:text-[24px]">◎ 最多可將128個網路攝影機添加到設備</p>
				<p class="text-[16px] lg:text-[24px]">◎ 內置SIP專用服務器，最多可以添加10000個視頻對講設備</p>
				<p class="text-[16px] lg:text-[24px]">◎ 支持2個以上的喇叭和麥克風：連接到外部耳機</p>
				<p class="text-[16px] lg:text-[24px]">◎ （3.5毫米），外部鵝頸式麥克風</p>
				<p class="text-[16px] lg:text-[24px]">◎ 通過HDMI顯示操作頁面</p>
				<p class="text-[16px] lg:text-[24px]">◎ 電源：標準PoE＆12 VDC</p>
				<p class="text-[16px] lg:text-[24px]">◎ 可視對講和門禁功能</p>
			</div>
		</div>
		<!-- View More -->
		<span class="text-[48px] lg:text-[96px] text-primary opacity-50 text-nowrap">OUR SERVICE OUR SERVICE OUR SERVICE</span>
		<div class="grid grid-cols-2 lg:grid-cols-4 gap-[12px] md:gap-[24px]">
			<ButtonCTA label="門禁管理" to="/products/Access-Control"></ButtonCTA>
			<ButtonCTA label="影像監控" to="/products/Surveillance-Monitoring"></ButtonCTA>
			<ButtonCTA label="安全防護" to="/products/Security-Solutions"></ButtonCTA>
			<ButtonCTA label="其他設備" to="/products/Devices-Accessories"></ButtonCTA>
		</div>
	</div>
</template>
