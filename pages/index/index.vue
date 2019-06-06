<template>
	<view class="content">
		<view class="item" @click="toURL('lunbo/lunbo')">轮播图</view>
		<view class="item" @click="toURL('picker/picker')">picker</view>
		<view class="item" @click="toURL('tabs/tabs')">tab</view>
		<view class="item" @click="toURL('datas/datas')">数据</view>
		<view class="item" @click="toURL('filter/filter')">筛选</view>
		<view class="item" @click="toURL('animation/animation')">动画</view>
		<view class="item" @click="toURL('order/order')">订单</view>
		<view class="item" @click="toURL('upImage/upImage')">图片上传</view>
		<view class="item" @click="toURL('taobao/taobao')">授权登录</view>
		<view class="item" @click="toURL('scan/scan')">扫码</view>
		<view class="item" @click="toURL('bottomPop/bottomPop')">底部弹窗</view>
		<view class="item" @click="toURL('panel/panel')">分类标签</view>
		<view class="item" @click="toURL('test/test')">测试</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				title: 'Hello'
			}
		},
		methods: {
			toURL(str){
				uni.navigateTo({
					url: '/pages/'+str
				});
			}
		}
	}
</script>

<style lang="scss">
	.content {
		display: flex;
		// justify-content: space-around;
		align-items: center;
		flex-wrap: wrap;
		.item{
			min-width: 186upx;
			padding: 20upx 0upx;
			text-align: center;
		}
	}
</style>
