<template>
	<view>
		<button type="primary" @tap="scan">扫一扫</button>
		<view class="cu-bar bg-white solid-bottom">
			<view class="action">
				<text class="cuIcon-title text-blue"></text>按钮形状
			</view>
			<view class="action">
				<navigator class="action" url="design" hover-class="none">
					<text class="cuIcon-skinfill"></text>
					<text class="text-df">设计</text>
				</navigator>
			</view>
		</view>
		<LotusLoading :lotusLoadingData="lotusLoadingData"></LotusLoading>
	</view>
</template>

<script>
	import LotusLoading from "../../components/showLoading.vue";
	export default {
		components:{
			LotusLoading
		},
		data() {
			return {
				 lotusLoadingData:{
					isShow:true//设置显示加载中组件true显示false隐藏
				}
			}
		},
		methods: {
			scan(){
				uni.scanCode({
					success: function (res) {
						console.log('条码类型：' + res.scanType);
						console.log('条码内容：' + res.result);
					},
					fail() {
						console.log('失败了');
					}
				});
			}
		}
	}
</script>

<style>

</style>
