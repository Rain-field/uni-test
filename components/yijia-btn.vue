<template>
	<view>
		<view class="yijia-confirm" @click="$emit('yConfirm')" :style="{ width: yWidth, borderRadius: yBorderRadius, marginTop: yMarginTop, marginBottom: yMarginBottom, backgroundColor: yBackgroundColor }">
			{{ title }}
		</view>
	</view>
</template>

<script>
export default {
	props: {
		title: {
			type: String,
			default: '确认'
		},
		yWidth: {
			type: String,
			default: '85%'
		},
		yBorderRadius: {
			type: String,
			default() {
				return uni.upx2px(20) + 'px';
			}
		},
		yMarginTop: {
			type: String,
			default() {
				return uni.upx2px(30) + 'px';
			}
		},
		yMarginBottom: {
			type: String,
			default() {
				return uni.upx2px(30) + 'px';
			}
		},
		yBackgroundColor: {
			type: String,
			default:'deepskyblue'
		}
	},
	data() {
		return {};
	}
};
</script>

<style>
.yijia-confirm {
	margin: auto;
	text-align: center;
	padding: 10upx 0;
	font-size: 32upx;
	color: #fff;
}
</style>
